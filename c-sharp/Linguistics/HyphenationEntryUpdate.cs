namespace Paranext.DataProvider.Linguistics;

/// <summary>
/// Update payload for a single word's hyphenation.
/// This class corresponds to the HyphenationEntryUpdate type defined in platform-scripture.d.ts.
/// Keep their structures in sync for serialization compatibility.
/// </summary>
// === NEW IN PT10 ===
// Reason: PAPI data provider set-payload convention does not exist in PT9 (PT9 equivalent calls:
// HyphenationEngine.RecordHyphenation / RemoveHyphenation)
// Maps to: Infrastructure
internal sealed class HyphenationEntryUpdate
{
    /// <summary>
    /// Word hyphenated, with "=" signs at hyphenation points. Stripped of "=", it must match the
    /// selected word (case-insensitive).
    /// </summary>
    public string Hyphenation { get; set; } = string.Empty;

    /// <summary>True to mark the hyphenation approved, false to mark it as a guess</summary>
    public bool IsApproved { get; set; }
}
