using System.Text.RegularExpressions;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Paranext.WireSurface;

/// <summary>
/// Resolves a registration-name expression to the compile-time-constant string(s) it can produce,
/// or reports it as dynamic. A missing symbol never falls back to text matching: every answer comes
/// from Roslyn's semantic model, so formatting can never change a resolved value.
/// </summary>
public sealed class NameResolver(Compilation compilation)
{
    private readonly Dictionary<SyntaxTree, SemanticModel> _semanticModels = [];

    /// <summary>
    /// The semantic model for <paramref name="tree"/>, cached per tree so every rule and resolver
    /// can share the same (expensive to build, cheap to reuse) models over one compilation.
    /// </summary>
    public SemanticModel GetSemanticModel(SyntaxTree tree)
    {
        if (!_semanticModels.TryGetValue(tree, out var model))
        {
            model = compilation.GetSemanticModel(tree);
            _semanticModels[tree] = model;
        }
        return model;
    }

    public NameResolution Resolve(ExpressionSyntax expression, SemanticModel model)
    {
        if (TryGetConstant(expression, model, out var constant))
            return new NameResolution.Constant(constant);

        var symbol = model.GetSymbolInfo(expression).Symbol;
        NameResolution.Constants? propagated = symbol switch
        {
            IFieldSymbol field => ResolveField(field),
            IPropertySymbol property => ResolveProperty(property),
            IParameterSymbol parameter => ResolveParameter(parameter),
            _ => null,
        };

        return (NameResolution?)propagated
            ?? new NameResolution.Dynamic(CollapseWhitespace(expression.ToString()));
    }

    /// <summary>
    /// Rule 1: a compile-time constant — literals, references to <c>const</c> fields/locals,
    /// constant concatenations, and interpolated strings whose every hole is itself constant. Roslyn
    /// folds all of these; nothing here is text-based.
    /// </summary>
    private static bool TryGetConstant(
        ExpressionSyntax expression,
        SemanticModel model,
        out string value
    )
    {
        var constant = model.GetConstantValue(expression);
        if (constant.HasValue && constant.Value is string stringValue)
        {
            value = stringValue;
            return true;
        }

        value = "";
        return false;
    }

    /// <summary>
    /// Rule 2, field case: a non-<c>const</c> field resolves only when it is <c>readonly</c> (static
    /// or instance) with a constant initializer, or has no initializer but is assigned exactly once
    /// in a constructor body from that constructor's own parameter (rule 2, propagation case).
    /// </summary>
    private NameResolution.Constants? ResolveField(IFieldSymbol field)
    {
        if (field.IsConst || !field.IsReadOnly)
            return null;

        var declaration = field
            .DeclaringSyntaxReferences.Select(r => r.GetSyntax())
            .OfType<VariableDeclaratorSyntax>()
            .FirstOrDefault();
        if (declaration is null)
            return null;

        if (declaration.Initializer is not null)
        {
            var initializerModel = GetSemanticModel(declaration.SyntaxTree);
            return TryGetConstant(declaration.Initializer.Value, initializerModel, out var value)
                ? new NameResolution.Constants([value])
                : null;
        }

        return TryFindSingleParameterAssignment(field, out var parameter)
            ? ResolveParameter(parameter!)
            : null;
    }

    /// <summary>Rule 2, property case: the get-only-auto-property counterpart of <see cref="ResolveField"/>.</summary>
    private NameResolution.Constants? ResolveProperty(IPropertySymbol property)
    {
        if (property.SetMethod is not null)
            return null;

        var declaration = property
            .DeclaringSyntaxReferences.Select(r => r.GetSyntax())
            .OfType<PropertyDeclarationSyntax>()
            .FirstOrDefault();
        if (declaration is null)
            return null;

        if (declaration.Initializer is not null)
        {
            var initializerModel = GetSemanticModel(declaration.SyntaxTree);
            return TryGetConstant(declaration.Initializer.Value, initializerModel, out var value)
                ? new NameResolution.Constants([value])
                : null;
        }

        return TryFindSingleParameterAssignment(property, out var parameter)
            ? ResolveParameter(parameter!)
            : null;
    }

    /// <summary>
    /// Finds exactly one <c>_field = parameter;</c>-shaped assignment, in any constructor body of
    /// the member's containing type, whose right-hand side is a parameter of that same constructor.
    /// More than one such assignment (or none) is reported as not found, never guessed at.
    /// </summary>
    private bool TryFindSingleParameterAssignment(
        ISymbol fieldOrProperty,
        out IParameterSymbol? parameter
    )
    {
        IParameterSymbol? found = null;
        var count = 0;

        foreach (var constructor in fieldOrProperty.ContainingType.InstanceConstructors)
        {
            foreach (var syntaxReference in constructor.DeclaringSyntaxReferences)
            {
                if (
                    syntaxReference.GetSyntax()
                    is not ConstructorDeclarationSyntax constructorSyntax
                )
                    continue;

                SyntaxNode? body =
                    (SyntaxNode?)constructorSyntax.Body
                    ?? constructorSyntax.ExpressionBody?.Expression;
                if (body is null)
                    continue;

                var model = GetSemanticModel(constructorSyntax.SyntaxTree);
                foreach (
                    var assignment in body.DescendantNodesAndSelf()
                        .OfType<AssignmentExpressionSyntax>()
                        .Where(a => a.IsKind(SyntaxKind.SimpleAssignmentExpression))
                )
                {
                    var leftSymbol = model.GetSymbolInfo(assignment.Left).Symbol;
                    if (
                        leftSymbol is null
                        || !SymbolEqualityComparer.Default.Equals(
                            leftSymbol.OriginalDefinition,
                            fieldOrProperty.OriginalDefinition
                        )
                    )
                        continue;

                    if (assignment.Right is not IdentifierNameSyntax rightIdentifier)
                        continue;

                    if (
                        model.GetSymbolInfo(rightIdentifier).Symbol
                            is IParameterSymbol rightParameter
                        && SymbolEqualityComparer.Default.Equals(
                            rightParameter.ContainingSymbol,
                            constructor
                        )
                    )
                    {
                        found = rightParameter;
                        count++;
                    }
                }
            }
        }

        parameter = count == 1 ? found : null;
        return count == 1;
    }

    /// <summary>
    /// Rule 2, propagation case: every call site that invokes <paramref name="parameter"/>'s
    /// containing member contributes the argument bound to that parameter (by name, by position, or
    /// its declared default when omitted). Each contributed argument must itself be a plain constant
    /// — rule 1, or rule 2's non-propagating field case — so propagation never chains more than one
    /// call site deep. No call site, or any non-constant argument, makes the whole parameter dynamic.
    /// </summary>
    private NameResolution.Constants? ResolveParameter(IParameterSymbol parameter)
    {
        if (parameter.ContainingSymbol is not IMethodSymbol containingMember)
            return null;

        var parameterIndex = IndexOfByName(containingMember.Parameters, parameter.Name);
        if (parameterIndex < 0)
            return null;

        var values = new List<string>();
        var foundAnySite = false;

        foreach (var tree in compilation.SyntaxTrees)
        {
            var model = GetSemanticModel(tree);
            foreach (var node in tree.GetRoot().DescendantNodes())
            {
                (IMethodSymbol? boundMethod, BaseArgumentListSyntax? argumentList) = node switch
                {
                    InvocationExpressionSyntax invocation => (
                        model.GetSymbolInfo(invocation).Symbol as IMethodSymbol,
                        invocation.ArgumentList
                    ),
                    BaseObjectCreationExpressionSyntax creation => (
                        model.GetSymbolInfo(creation).Symbol as IMethodSymbol,
                        creation.ArgumentList
                    ),
                    ConstructorInitializerSyntax initializer => (
                        model.GetSymbolInfo(initializer).Symbol as IMethodSymbol,
                        initializer.ArgumentList
                    ),
                    _ => (null, null),
                };

                if (
                    boundMethod is null
                    || argumentList is null
                    || !SymbolEqualityComparer.Default.Equals(
                        boundMethod.OriginalDefinition,
                        containingMember.OriginalDefinition
                    )
                )
                    continue;

                foundAnySite = true;

                var argumentExpression = FindArgumentExpression(
                    argumentList,
                    parameter.Name,
                    parameterIndex
                );
                if (argumentExpression is null)
                {
                    if (
                        parameter.HasExplicitDefaultValue
                        && parameter.ExplicitDefaultValue is string defaultValue
                    )
                    {
                        values.Add(defaultValue);
                        continue;
                    }
                    return null;
                }

                if (!TryGetConstantForPropagationSite(argumentExpression, model, out var value))
                    return null;

                values.Add(value);
            }
        }

        if (!foundAnySite)
            return null;

        return new NameResolution.Constants(
            values.Distinct(StringComparer.Ordinal).OrderBy(v => v, StringComparer.Ordinal).ToList()
        );
    }

    /// <summary>
    /// The constant check applied to a single propagation-site argument: rule 1, or rule 2's
    /// constant-initializer field/property case — deliberately not rule 2's parameter case, so
    /// propagation never recurses through a second call site.
    /// </summary>
    private bool TryGetConstantForPropagationSite(
        ExpressionSyntax expression,
        SemanticModel model,
        out string value
    )
    {
        if (TryGetConstant(expression, model, out value))
            return true;

        var symbol = model.GetSymbolInfo(expression).Symbol;
        NameResolution.Constants? resolved = symbol switch
        {
            IFieldSymbol field when HasConstantInitializerOnly(field, out var fieldValue) => new(
                [fieldValue]
            ),
            IPropertySymbol property
                when HasConstantInitializerOnly(property, out var propertyValue) => new(
                [propertyValue]
            ),
            _ => null,
        };

        if (resolved is { Values.Count: 1 })
        {
            value = resolved.Values[0];
            return true;
        }

        value = "";
        return false;
    }

    private bool HasConstantInitializerOnly(IFieldSymbol field, out string value)
    {
        value = "";
        if (field.IsConst || !field.IsReadOnly)
            return false;

        var declaration = field
            .DeclaringSyntaxReferences.Select(r => r.GetSyntax())
            .OfType<VariableDeclaratorSyntax>()
            .FirstOrDefault();
        if (declaration?.Initializer is null)
            return false;

        return TryGetConstant(
            declaration.Initializer.Value,
            GetSemanticModel(declaration.SyntaxTree),
            out value
        );
    }

    private bool HasConstantInitializerOnly(IPropertySymbol property, out string value)
    {
        value = "";
        if (property.SetMethod is not null)
            return false;

        var declaration = property
            .DeclaringSyntaxReferences.Select(r => r.GetSyntax())
            .OfType<PropertyDeclarationSyntax>()
            .FirstOrDefault();
        if (declaration?.Initializer is null)
            return false;

        return TryGetConstant(
            declaration.Initializer.Value,
            GetSemanticModel(declaration.SyntaxTree),
            out value
        );
    }

    private static int IndexOfByName(IReadOnlyList<IParameterSymbol> parameters, string name)
    {
        for (var i = 0; i < parameters.Count; i++)
        {
            if (parameters[i].Name == name)
                return i;
        }
        return -1;
    }

    private static ExpressionSyntax? FindArgumentExpression(
        BaseArgumentListSyntax argumentList,
        string parameterName,
        int parameterIndex
    )
    {
        var namedArgument = argumentList.Arguments.FirstOrDefault(a =>
            a.NameColon?.Name.Identifier.Text == parameterName
        );
        if (namedArgument is not null)
            return namedArgument.Expression;

        var positionalArguments = argumentList.Arguments.Where(a => a.NameColon is null).ToList();
        return parameterIndex < positionalArguments.Count
            ? positionalArguments[parameterIndex].Expression
            : null;
    }

    private static string CollapseWhitespace(string text) =>
        Regex.Replace(text, @"\s+", " ").Trim();
}
