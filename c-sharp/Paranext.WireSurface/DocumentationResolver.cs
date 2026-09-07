using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Paranext.WireSurface;

/// <summary>
/// Resolves a registration's documentation argument to whether it is documented, whether that
/// answer (and <see cref="DocumentationResolution.Experimental"/>) was resolved statically, and
/// whether it marks the registration experimental — all by reading the framework's documentation
/// types through their symbols, never by matching identifier text or nesting depth textually.
/// </summary>
public sealed class DocumentationResolver(Compilation compilation, FrameworkSymbols symbols)
{
    private static readonly DocumentationResolution Undocumented = new(false, true, false);
    private static readonly DocumentationResolution Unresolved = new(true, false, false);

    private readonly Dictionary<SyntaxTree, SemanticModel> _semanticModels = [];
    private readonly IPropertySymbol _methodWrapperProperty = symbols
        .OpenRpcSingleMethodDocumentation.GetMembers("Method")
        .OfType<IPropertySymbol>()
        .Single();
    private readonly IPropertySymbol _notificationWrapperProperty = symbols
        .OpenRpcSingleNotificationDocumentation.GetMembers("Notification")
        .OfType<IPropertySymbol>()
        .Single();

    public DocumentationResolution Resolve(
        ExpressionSyntax? documentationArgument,
        SemanticModel model
    )
    {
        if (documentationArgument is null)
            return Undocumented;

        return ResolveExpression(
            documentationArgument,
            model,
            new HashSet<ISymbol>(SymbolEqualityComparer.Default)
        );
    }

    private SemanticModel GetSemanticModel(SyntaxTree tree)
    {
        if (!_semanticModels.TryGetValue(tree, out var model))
        {
            model = compilation.GetSemanticModel(tree);
            _semanticModels[tree] = model;
        }
        return model;
    }

    private DocumentationResolution ResolveExpression(
        ExpressionSyntax expression,
        SemanticModel model,
        HashSet<ISymbol> visited
    )
    {
        var constant = model.GetConstantValue(expression);
        if (constant is { HasValue: true, Value: null })
            return Undocumented;

        if (expression is InvocationExpressionSyntax invocation)
        {
            var invokedMethod = model.GetSymbolInfo(invocation).Symbol as IMethodSymbol;
            return
                invokedMethod is not null
                && symbols.AlwaysExperimentalHelpers.Any(helper =>
                    symbols.IsSameMethod(invokedMethod, helper)
                )
                ? new DocumentationResolution(true, true, true)
                : Unresolved;
        }

        if (expression is BaseObjectCreationExpressionSyntax objectCreation)
            return ResolveObjectCreation(objectCreation, model, visited);

        var symbol = model.GetSymbolInfo(expression).Symbol;
        if (symbol is IFieldSymbol or IPropertySymbol or ILocalSymbol)
        {
            if (!visited.Add(symbol))
                return Unresolved; // a cycle is never resolvable.

            var initializer = FindSingleDeclarationInitializer(symbol);
            if (initializer is { } found)
                return ResolveExpression(found.Expression, found.Model, visited);
        }

        return Unresolved;
    }

    private DocumentationResolution ResolveObjectCreation(
        BaseObjectCreationExpressionSyntax objectCreation,
        SemanticModel model,
        HashSet<ISymbol> visited
    )
    {
        if (model.GetTypeInfo(objectCreation).Type is not INamedTypeSymbol type)
            return Unresolved;

        var experimentalProperty = symbols.ExperimentalProperties.FirstOrDefault(property =>
            IsType(type, property.ContainingType)
        );
        if (experimentalProperty is not null)
            return ResolveExperimentalPropertyOnly(objectCreation, experimentalProperty, model);

        if (IsType(type, symbols.OpenRpcSingleMethodDocumentation))
            return ResolveWrapped(objectCreation, _methodWrapperProperty, model, visited);

        if (IsType(type, symbols.OpenRpcSingleNotificationDocumentation))
            return ResolveWrapped(objectCreation, _notificationWrapperProperty, model, visited);

        return Unresolved;
    }

    /// <summary>
    /// <see cref="Paranext.DataProvider.NetworkObjects.Documentation.NetworkObjectDocumentation"/>,
    /// <c>OpenRpcMethodDocumentation</c> and <c>OpenRpcNotificationDocumentation</c> all read their
    /// own <c>Experimental</c> property directly. For
    /// <see cref="Paranext.DataProvider.NetworkObjects.Documentation.NetworkObjectDocumentation"/>
    /// specifically, its <c>Methods</c> entries are never folded into this answer — the runtime
    /// (<c>NetworkObject.RegisterNetworkObjectAsync</c>) only ever reads the object-level flag, and
    /// <c>Methods</c> is routinely used to annotate a subset of a network object's methods while the
    /// object itself, and its unlisted methods, stay stable.
    /// </summary>
    private static DocumentationResolution ResolveExperimentalPropertyOnly(
        BaseObjectCreationExpressionSyntax objectCreation,
        IPropertySymbol experimentalProperty,
        SemanticModel model
    )
    {
        var value = FindInitializerValue(objectCreation, experimentalProperty, model);
        if (value is null)
            return new DocumentationResolution(true, true, false);

        var constant = model.GetConstantValue(value);
        if (constant.HasValue && constant.Value is bool boolValue)
            return new DocumentationResolution(true, true, boolValue);

        // An explicit `Experimental = null` is equivalent to omitting the property.
        return constant is { HasValue: true, Value: null }
            ? new DocumentationResolution(true, true, false)
            : Unresolved;
    }

    /// <summary>
    /// <c>OpenRpcSingleMethodDocumentation</c>/<c>OpenRpcSingleNotificationDocumentation</c> carry
    /// their flag one level down, under <c>Method</c>/<c>Notification</c> respectively.
    /// </summary>
    private DocumentationResolution ResolveWrapped(
        BaseObjectCreationExpressionSyntax objectCreation,
        IPropertySymbol wrapperProperty,
        SemanticModel model,
        HashSet<ISymbol> visited
    )
    {
        var innerValue = FindInitializerValue(objectCreation, wrapperProperty, model);
        return innerValue is null
            ? new DocumentationResolution(true, true, false)
            : ResolveExpression(innerValue, model, visited);
    }

    private (ExpressionSyntax Expression, SemanticModel Model)? FindSingleDeclarationInitializer(
        ISymbol symbol
    )
    {
        switch (symbol)
        {
            case IFieldSymbol field:
            {
                var declarator = field
                    .DeclaringSyntaxReferences.Select(r => r.GetSyntax())
                    .OfType<VariableDeclaratorSyntax>()
                    .FirstOrDefault();
                return declarator?.Initializer is null
                    ? null
                    : (declarator.Initializer.Value, GetSemanticModel(declarator.SyntaxTree));
            }
            case IPropertySymbol property:
            {
                var declaration = property
                    .DeclaringSyntaxReferences.Select(r => r.GetSyntax())
                    .OfType<PropertyDeclarationSyntax>()
                    .FirstOrDefault();
                return declaration?.Initializer is null
                    ? null
                    : (declaration.Initializer.Value, GetSemanticModel(declaration.SyntaxTree));
            }
            case ILocalSymbol local:
            {
                var declarator = local
                    .DeclaringSyntaxReferences.Select(r => r.GetSyntax())
                    .OfType<VariableDeclaratorSyntax>()
                    .FirstOrDefault();
                if (declarator?.Initializer is null)
                    return null;
                return HasAnyOtherAssignment(local, declarator)
                    ? null
                    : (declarator.Initializer.Value, GetSemanticModel(declarator.SyntaxTree));
            }
            default:
                return null;
        }
    }

    /// <summary>
    /// A local reassigned anywhere in its enclosing member after its declaration cannot be resolved
    /// through "its single initializer" — which value applies at the point of use is ambiguous.
    /// </summary>
    private bool HasAnyOtherAssignment(ILocalSymbol local, VariableDeclaratorSyntax declarator)
    {
        SyntaxNode scope =
            declarator
                .Ancestors()
                .FirstOrDefault(a =>
                    a
                        is BaseMethodDeclarationSyntax
                            or AccessorDeclarationSyntax
                            or LocalFunctionStatementSyntax
                ) ?? declarator.SyntaxTree.GetRoot();
        var model = GetSemanticModel(declarator.SyntaxTree);
        return scope
            .DescendantNodes()
            .OfType<AssignmentExpressionSyntax>()
            .Where(a => a.IsKind(SyntaxKind.SimpleAssignmentExpression))
            .Any(a =>
                SymbolEqualityComparer.Default.Equals(model.GetSymbolInfo(a.Left).Symbol, local)
            );
    }

    private static ExpressionSyntax? FindInitializerValue(
        BaseObjectCreationExpressionSyntax objectCreation,
        IPropertySymbol property,
        SemanticModel model
    )
    {
        if (objectCreation.Initializer is null)
            return null;

        foreach (var expression in objectCreation.Initializer.Expressions)
        {
            if (
                expression
                    is AssignmentExpressionSyntax
                    {
                        Left: IdentifierNameSyntax identifier
                    } assignment
                && SymbolEqualityComparer.Default.Equals(
                    model.GetSymbolInfo(identifier).Symbol?.OriginalDefinition,
                    property.OriginalDefinition
                )
            )
                return assignment.Right;
        }
        return null;
    }

    private static bool IsType(INamedTypeSymbol candidate, INamedTypeSymbol expected) =>
        SymbolEqualityComparer.Default.Equals(candidate.OriginalDefinition, expected);
}
