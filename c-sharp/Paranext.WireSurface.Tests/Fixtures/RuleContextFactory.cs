using Microsoft.CodeAnalysis;
using Paranext.WireSurface.RegistrationRules;

namespace Paranext.WireSurface.Tests.Fixtures;

/// <summary>
/// Builds a <see cref="RuleContext"/> over a fixture compilation so rule tests exercise the same
/// resolvers production scanning does, without needing a real repo root — the path mapping simply
/// returns each tree's own <see cref="SyntaxTree.FilePath"/>, which <see cref="FixtureCompilation"/>
/// already sets to a repo-relative-looking path.
/// </summary>
public static class RuleContextFactory
{
    public static RuleContext Create(Compilation compilation)
    {
        var symbols = FrameworkSymbols.Resolve(compilation);
        var semanticModels = new SemanticModelCache(compilation);
        return new RuleContext(
            symbols,
            new NameResolver(compilation, semanticModels),
            new DocumentationResolver(semanticModels, symbols),
            tree => tree.FilePath
        );
    }
}
