namespace Paranext.WireSurface;

/// <summary>
/// The outcome of resolving a registration's documentation argument: whether it carries any
/// documentation, whether that answer (and <see cref="Experimental"/>) was resolved statically
/// rather than guessed at, and whether it marks the registration experimental.
/// </summary>
/// <param name="Experimental">
/// Whether the documentation marks the registration experimental, or <c>null</c> when
/// <see cref="DocsStaticallyResolved"/> is <c>false</c> and there is therefore no proven answer.
/// Reporting <c>null</c> instead of <c>false</c> keeps a <c>false</c> in the emitted snapshot
/// meaning the marker is genuinely absent, rather than merely unreadable from here.
/// </param>
public sealed record DocumentationResolution(
    bool Documented,
    bool DocsStaticallyResolved,
    bool? Experimental
);
