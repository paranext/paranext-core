using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Paranext.WireSurface.RegistrationRules;

/// <summary>
/// Recognises a C# network event registered through
/// <c>PapiClient.SendRequestAsync("network:registerEvent", [name, documentation])</c> — the generic
/// request path Send/Receive's snapshot notifiers use because <c>PapiClient</c> has no dedicated
/// wrapper for the central event registry's registration method. Every other request type sent
/// through <c>SendRequestAsync</c> is a client-side call into a TypeScript-registered object and is
/// deliberately excluded — not reported at all, not even as dynamic.
/// </summary>
public sealed class NetworkEventRule : IRegistrationRule
{
    private const string RegisterEventRequestType = "network:registerEvent";

    public IEnumerable<ScanEntry> Scan(SyntaxTree tree, SemanticModel model, RuleContext context)
    {
        foreach (
            var invocation in tree.GetRoot().DescendantNodes().OfType<InvocationExpressionSyntax>()
        )
        {
            var invokedMethod = model.GetSymbolInfo(invocation).Symbol as IMethodSymbol;
            if (
                invokedMethod is null
                || !context.Symbols.SendRequestAsyncOverloads.Any(overload =>
                    context.Symbols.IsSameMethod(invokedMethod, overload)
                )
            )
                continue;

            var requestTypeArgument = ArgumentBinding.FindArgumentExpression(
                invocation.ArgumentList,
                "requestType",
                parameterIndex: 0
            );
            if (requestTypeArgument is null)
                continue;
            if (
                context.Names.Resolve(requestTypeArgument, model)
                is not NameResolution.Constant { Value: RegisterEventRequestType }
            )
                continue;

            var contentsArgument = ArgumentBinding.FindArgumentExpression(
                invocation.ArgumentList,
                "requestContents",
                parameterIndex: 1
            );
            if (contentsArgument is null)
                continue;

            var file = context.RepoRelativePath(tree);
            var elements = GetCollectionElements(contentsArgument);
            if (elements is null || elements.Count < 1)
            {
                yield return new ScanEntry.Dynamic(
                    new DynamicRegistration(
                        RegistrationCategory.NetworkEvent,
                        file,
                        RegisteredVia.PapiClientSendRequestAsyncRegisterEvent,
                        NameResolver.CollapseWhitespace(contentsArgument.ToString())
                    )
                );
                continue;
            }

            // Documentation is optional on the wire handler (`registerEvent(eventName,
            // documentation?)`), so a one-element collection is a fully resolved, undocumented entry.
            var documentation = context.Docs.Resolve(
                elements.Count > 1 ? elements[1] : null,
                model
            );
            foreach (
                var entry in ScanEntry.FromNameResolution(
                    context.Names.Resolve(elements[0], model),
                    RegistrationCategory.NetworkEvent,
                    file,
                    RegisteredVia.PapiClientSendRequestAsyncRegisterEvent,
                    documentation
                )
            )
                yield return entry;
        }
    }

    /// <summary>
    /// The element expressions of the collection-shaped argument-1 forms this rule recognises — a
    /// collection expression, an implicitly-typed array, or an explicitly-typed array with an
    /// initializer — or <see langword="null"/> when the argument is none of these (a variable, a
    /// method call, or an array creation with no initializer), which the caller treats as dynamic.
    /// </summary>
    private static IReadOnlyList<ExpressionSyntax>? GetCollectionElements(
        ExpressionSyntax expression
    ) =>
        expression switch
        {
            CollectionExpressionSyntax collection => collection
                .Elements.OfType<ExpressionElementSyntax>()
                .Select(element => element.Expression)
                .ToList(),
            ImplicitArrayCreationExpressionSyntax implicitArray =>
                implicitArray.Initializer.Expressions.ToList(),
            ArrayCreationExpressionSyntax arrayCreation =>
                arrayCreation.Initializer?.Expressions.ToList(),
            _ => null,
        };
}
