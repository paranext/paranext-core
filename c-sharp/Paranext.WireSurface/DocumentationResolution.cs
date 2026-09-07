namespace Paranext.WireSurface;

/// <summary>
/// The outcome of resolving a registration's documentation argument: whether it carries any
/// documentation, whether that answer (and <see cref="Experimental"/>) was resolved statically
/// rather than guessed at, and whether it marks the registration experimental.
/// </summary>
public sealed record DocumentationResolution(
    bool Documented,
    bool DocsStaticallyResolved,
    bool Experimental
);
