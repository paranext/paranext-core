namespace Paranext.WireSurface;

/// <summary>
/// The result of scanning a compilation: every recognised registration, plus the two ways the
/// compilation's file set and the caller's tracked-file set can disagree — a compiled file the
/// tracked set doesn't mention, and a tracked path with no matching compiled file.
/// </summary>
public sealed record ScanReport(
    WireSurfaceScanResult Result,
    IReadOnlyList<string> CompiledButUntracked,
    IReadOnlyList<string> TrackedButNotCompiled
);
