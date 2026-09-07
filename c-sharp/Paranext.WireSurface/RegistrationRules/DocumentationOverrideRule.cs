using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Paranext.WireSurface.RegistrationRules;

/// <summary>
/// Recognises a method whose override chain reaches <c>DataProvider.GetNetworkObjectDocumentation</c>
/// and attributes the entry to that method's own declaring class — via
/// <see cref="IMethodSymbol.ContainingType"/> — never to whichever class happens to appear first in
/// the file.
/// </summary>
public sealed class DocumentationOverrideRule : IRegistrationRule
{
    public IEnumerable<ScanEntry> Scan(SyntaxTree tree, SemanticModel model, RuleContext context)
    {
        foreach (
            var methodDeclaration in tree.GetRoot()
                .DescendantNodes()
                .OfType<MethodDeclarationSyntax>()
        )
        {
            if (model.GetDeclaredSymbol(methodDeclaration) is not IMethodSymbol methodSymbol)
                continue;

            if (!OverridesGetNetworkObjectDocumentation(methodSymbol, context.Symbols))
                continue;

            var returnedExpression = FindSingleReturnedExpression(methodDeclaration);
            var documentation = returnedExpression is null
                ? new DocumentationResolution(true, false, false)
                : context.Docs.Resolve(returnedExpression, model);
            var file = context.RepoRelativePath(tree);

            yield return new ScanEntry.Static(
                new StaticRegistration(
                    RegistrationCategory.DataProvider,
                    methodSymbol.ContainingType.Name,
                    file,
                    RegisteredVia.DataProviderGetNetworkObjectDocumentationOverride,
                    documentation.Documented,
                    documentation.DocsStaticallyResolved,
                    documentation.Experimental
                )
            );
        }
    }

    private static bool OverridesGetNetworkObjectDocumentation(
        IMethodSymbol methodSymbol,
        FrameworkSymbols symbols
    )
    {
        for (
            var current = methodSymbol.OverriddenMethod;
            current is not null;
            current = current.OverriddenMethod
        )
        {
            if (symbols.IsSameMethod(current, symbols.GetNetworkObjectDocumentation))
                return true;
        }
        return false;
    }

    /// <summary>
    /// The single expression an overriding method returns: an expression-bodied member's expression,
    /// or the sole <c>return</c> statement's expression when the method body contains exactly one.
    /// Any other shape — no <c>return</c>, more than one, or a bare <c>return;</c> — cannot be
    /// resolved to a single value.
    /// </summary>
    private static ExpressionSyntax? FindSingleReturnedExpression(MethodDeclarationSyntax method)
    {
        if (method.ExpressionBody is { } expressionBody)
            return expressionBody.Expression;

        if (method.Body is not { } body)
            return null;

        var returns = body.DescendantNodes().OfType<ReturnStatementSyntax>().ToList();
        return returns.Count == 1 ? returns[0].Expression : null;
    }
}
