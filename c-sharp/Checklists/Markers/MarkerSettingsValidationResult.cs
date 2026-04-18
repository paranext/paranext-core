using System.Collections.Generic;

namespace Paranext.DataProvider.Checklists.Markers;

/// <summary>
/// RED-phase skeleton. See data-contracts.md §3.13.
/// </summary>
public record MarkerSettingsValidationResult(
    bool Valid,
    IReadOnlyList<MarkerPair>? ParsedPairs,
    string? ErrorMessage
);
