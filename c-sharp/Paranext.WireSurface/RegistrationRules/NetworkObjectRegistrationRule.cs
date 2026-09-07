using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Paranext.WireSurface.RegistrationRules;

/// <summary>
/// Recognises every invocation of <c>NetworkObject.RegisterNetworkObjectAsync</c> — a network
/// object's, a data provider's, or a PDP factory's registration call — categorised by the class that
/// physically contains the call, never by the class hierarchy of whoever happens to instantiate it.
/// The framework's own two calls (inside <c>DataProvider.RegisterDataProviderAsync</c> and
/// <c>ProjectDataProviderFactory.InitializeAsync</c>) are ordinary invocations under this rule and
/// resolve to dynamic entries because their name arguments are runtime values.
/// </summary>
public sealed class NetworkObjectRegistrationRule : IRegistrationRule
{
    public IEnumerable<ScanEntry> Scan(SyntaxTree tree, SemanticModel model, RuleContext context)
    {
        foreach (
            var invocation in tree.GetRoot().DescendantNodes().OfType<InvocationExpressionSyntax>()
        )
        {
            var invokedMethod = model.GetSymbolInfo(invocation).Symbol as IMethodSymbol;
            if (
                !context.Symbols.IsSameMethod(
                    invokedMethod,
                    context.Symbols.RegisterNetworkObjectAsync
                )
            )
                continue;

            var containingType = model.GetEnclosingSymbol(invocation.SpanStart)?.ContainingType;
            if (containingType is null)
                continue;

            var nameArgument = invocation.ArgumentList.Arguments.ElementAtOrDefault(0)?.Expression;
            if (nameArgument is null)
                continue;

            var (category, registeredVia) = Classify(containingType, context.Symbols);
            var documentationArgument = ArgumentBinding.FindArgumentExpression(
                invocation.ArgumentList,
                "documentation",
                parameterIndex: 3
            );
            var documentation = context.Docs.Resolve(documentationArgument, model);
            var file = context.RepoRelativePath(tree);

            foreach (
                var entry in BuildEntries(
                    context.Names.Resolve(nameArgument, model),
                    category,
                    file,
                    registeredVia,
                    documentation
                )
            )
                yield return entry;
        }
    }

    /// <summary>
    /// The framework's own registration call sites (inside <c>DataProvider</c> and
    /// <c>ProjectDataProviderFactory</c> themselves) get their dedicated category and
    /// <c>registeredVia</c>; every other containing type is an ordinary network object.
    /// </summary>
    private static (string Category, string RegisteredVia) Classify(
        INamedTypeSymbol containingType,
        FrameworkSymbols symbols
    )
    {
        if (
            SymbolEqualityComparer.Default.Equals(
                containingType.OriginalDefinition,
                symbols.ProjectDataProviderFactory
            )
        )
            return (
                RegistrationCategory.PdpFactory,
                RegisteredVia.ProjectDataProviderFactoryInitializeAsync
            );

        if (
            SymbolEqualityComparer.Default.Equals(
                containingType.OriginalDefinition,
                symbols.DataProvider
            )
        )
            return (
                RegistrationCategory.DataProvider,
                RegisteredVia.DataProviderRegisterDataProviderAsync
            );

        return (
            RegistrationCategory.NetworkObject,
            RegisteredVia.NetworkObjectRegisterNetworkObjectAsync
        );
    }

    private static IEnumerable<ScanEntry> BuildEntries(
        NameResolution name,
        string category,
        string file,
        string registeredVia,
        DocumentationResolution documentation
    )
    {
        switch (name)
        {
            case NameResolution.Constant constant:
                yield return ToStatic(constant.Value);
                break;
            case NameResolution.Constants constants:
                foreach (var value in constants.Values)
                    yield return ToStatic(value);
                break;
            case NameResolution.Dynamic dynamic:
                yield return new ScanEntry.Dynamic(
                    new DynamicRegistration(category, file, registeredVia, dynamic.ExpressionText)
                );
                break;
        }

        ScanEntry.Static ToStatic(string value) =>
            new(
                new StaticRegistration(
                    category,
                    value,
                    file,
                    registeredVia,
                    documentation.Documented,
                    documentation.DocsStaticallyResolved,
                    documentation.Experimental
                )
            );
    }
}
