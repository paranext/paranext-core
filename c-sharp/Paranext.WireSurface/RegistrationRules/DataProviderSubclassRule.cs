using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Paranext.WireSurface.RegistrationRules;

/// <summary>
/// Recognises a class's own base-constructor call into <c>DataProvider</c>'s
/// <c>(string name, PapiClient, string)</c> constructor — primary-constructor syntax or a
/// traditional constructor's <c>: base(...)</c> initializer — and resolves the argument bound to
/// <c>name</c>. A class whose base call targets an intermediate provider, not <c>DataProvider</c>
/// itself, contributes nothing here: the intermediate class's own base call already reported it.
/// </summary>
public sealed class DataProviderSubclassRule : IRegistrationRule
{
    public IEnumerable<ScanEntry> Scan(SyntaxTree tree, SemanticModel model, RuleContext context)
    {
        foreach (
            var classDeclaration in tree.GetRoot()
                .DescendantNodes()
                .OfType<ClassDeclarationSyntax>()
        )
        {
            if (model.GetDeclaredSymbol(classDeclaration) is not { } classSymbol)
                continue;

            // DerivesFrom walks strictly from classSymbol.BaseType, so it is already false when
            // classSymbol is DataProvider itself — no separate self-exclusion check is needed.
            if (!context.Symbols.DerivesFrom(classSymbol, context.Symbols.DataProvider))
                continue;

            var file = context.RepoRelativePath(tree);
            foreach (var site in FindOwnBaseCallSites(classDeclaration))
            {
                if (ResolveNameArgument(site, model, context.Symbols) is not { } nameArgument)
                    continue;

                foreach (
                    var entry in BuildEntries(context.Names.Resolve(nameArgument, model), file)
                )
                    yield return entry;
            }
        }
    }

    /// <summary>
    /// The base-constructor call sites a class declares for itself: its primary-constructor base
    /// type argument list (if it has a primary constructor), and every traditional constructor's
    /// own <c>: base(...)</c> initializer — never a <c>: this(...)</c> delegation, which belongs to
    /// whichever constructor in the same class it eventually reaches.
    /// </summary>
    private static IEnumerable<SyntaxNode> FindOwnBaseCallSites(
        ClassDeclarationSyntax classDeclaration
    )
    {
        var primaryBaseType = classDeclaration
            .BaseList?.Types.OfType<PrimaryConstructorBaseTypeSyntax>()
            .FirstOrDefault();
        if (primaryBaseType is not null)
            yield return primaryBaseType;

        foreach (var constructor in classDeclaration.Members.OfType<ConstructorDeclarationSyntax>())
        {
            if (
                constructor.Initializer is { } initializer
                && initializer.ThisOrBaseKeyword.IsKind(SyntaxKind.BaseKeyword)
            )
                yield return initializer;
        }
    }

    /// <summary>
    /// Binds a base-call site to its target constructor symbol; only when that constructor is
    /// declared directly on <c>DataProvider</c> does its <c>name</c> argument belong to this class.
    /// </summary>
    private static ExpressionSyntax? ResolveNameArgument(
        SyntaxNode site,
        SemanticModel model,
        FrameworkSymbols symbols
    )
    {
        IMethodSymbol? boundConstructor;
        ArgumentListSyntax argumentList;
        switch (site)
        {
            case PrimaryConstructorBaseTypeSyntax primaryBaseType:
                boundConstructor = model.GetSymbolInfo(primaryBaseType).Symbol as IMethodSymbol;
                argumentList = primaryBaseType.ArgumentList;
                break;
            case ConstructorInitializerSyntax initializer:
                boundConstructor = model.GetSymbolInfo(initializer).Symbol as IMethodSymbol;
                argumentList = initializer.ArgumentList;
                break;
            default:
                return null;
        }

        if (
            boundConstructor is null
            || !SymbolEqualityComparer.Default.Equals(
                boundConstructor.ContainingType.OriginalDefinition,
                symbols.DataProvider
            )
        )
            return null;

        var parameterIndex = ArgumentBinding.IndexOfByName(boundConstructor.Parameters, "name");
        return parameterIndex < 0
            ? null
            : ArgumentBinding.FindArgumentExpression(argumentList, "name", parameterIndex);
    }

    private static IEnumerable<ScanEntry> BuildEntries(NameResolution name, string file)
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
                        RegistrationCategory.DataProvider,
                        file,
                        RegisteredVia.DataProviderConstructor,
                        dynamic.ExpressionText
                    )
                );
                break;
        }

        ScanEntry.Static ToStatic(string value) =>
            new(
                new StaticRegistration(
                    RegistrationCategory.DataProvider,
                    value,
                    file,
                    RegisteredVia.DataProviderConstructor,
                    Documented: false,
                    DocsStaticallyResolved: true,
                    Experimental: false
                )
            );
    }
}
