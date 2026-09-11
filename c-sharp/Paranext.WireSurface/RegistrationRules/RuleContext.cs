using Microsoft.CodeAnalysis;

namespace Paranext.WireSurface.RegistrationRules;

/// <summary>
/// The shared framework symbols and resolvers every recognition rule reads from, built once per
/// compilation, plus the repo-relative path mapping used to fill in each entry's <c>file</c> field.
/// </summary>
public sealed record RuleContext(
    FrameworkSymbols Symbols,
    NameResolver Names,
    DocumentationResolver Docs,
    Func<SyntaxTree, string> RepoRelativePath
);
