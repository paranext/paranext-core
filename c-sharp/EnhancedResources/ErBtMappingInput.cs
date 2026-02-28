using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for the three-dimensional ER-to-Biblical Terms mapping analysis engine.
///
/// Contract: Section 2.9 (data-contracts.md)
/// Behavior: BHV-404 (three-dimensional matching)
/// Extraction: EXT-019 (ER-to-Biblical Terms Mapping Analysis)
/// </summary>
public record ErBtMappingInput(
    /// <summary>Tracked project ID.</summary>
    string TrackedProjectId,
    /// <summary>Resource ID for the Enhanced Resource.</summary>
    string ResourceId,
    /// <summary>Verse reference for scope.</summary>
    VerseRef VerseRef,
    /// <summary>Scope filter value.</summary>
    string Scope
);
