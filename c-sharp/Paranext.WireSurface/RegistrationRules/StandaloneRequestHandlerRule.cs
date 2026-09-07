using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Paranext.WireSurface.RegistrationRules;

/// <summary>
/// Recognises a standalone <c>PapiClient.RegisterRequestHandlerAsync</c> invocation — a command or
/// method registered outside a network object's own per-function fan-out. That fan-out, declared
/// inside <c>NetworkObject.RegisterNetworkObjectAsync</c> itself, is excluded by containing-type
/// identity; a <c>NetworkObject</c> subclass registering an extra handler from its own method has a
/// different containing type and is an ordinary standalone registration.
/// </summary>
public sealed class StandaloneRequestHandlerRule : IRegistrationRule
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
                    context.Symbols.RegisterRequestHandlerAsync
                )
            )
                continue;

            var containingType = model.GetEnclosingSymbol(invocation.SpanStart)?.ContainingType;
            if (containingType is null)
                continue;

            if (
                SymbolEqualityComparer.Default.Equals(
                    containingType.OriginalDefinition,
                    context.Symbols.NetworkObject
                )
            )
                continue;

            var nameArgument = invocation.ArgumentList.Arguments.ElementAtOrDefault(0)?.Expression;
            if (nameArgument is null)
                continue;

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
                    file,
                    documentation
                )
            )
                yield return entry;
        }
    }

    private static IEnumerable<ScanEntry> BuildEntries(
        NameResolution name,
        string file,
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
                    new DynamicRegistration(
                        RegistrationCategory.StandaloneMethod,
                        file,
                        RegisteredVia.PapiClientRegisterRequestHandlerAsync,
                        dynamic.ExpressionText
                    )
                );
                break;
        }

        ScanEntry.Static ToStatic(string value) =>
            new(
                new StaticRegistration(
                    RegistrationCategory.StandaloneMethod,
                    value,
                    file,
                    RegisteredVia.PapiClientRegisterRequestHandlerAsync,
                    documentation.Documented,
                    documentation.DocsStaticallyResolved,
                    documentation.Experimental
                )
            );
    }
}
