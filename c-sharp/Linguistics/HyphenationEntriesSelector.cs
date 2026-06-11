namespace Paranext.DataProvider.Linguistics;

/// <summary>
/// Selector for hyphenation entries of a project.
/// This class corresponds to the HyphenationEntriesSelector type defined in
/// platform-scripture.d.ts. Keep their structures in sync for serialization compatibility.
/// </summary>
// === NEW IN PT10 ===
// Reason: PAPI data provider selector convention does not exist in PT9
// Maps to: Infrastructure
internal sealed class HyphenationEntriesSelector
{
    /// <summary>ID of the project</summary>
    public string ProjectId { get; set; } = string.Empty;

    /// <summary>
    /// Optional word to select a single entry (any casing). When getting, only the matching entry
    /// is returned. Required when setting.
    /// </summary>
    public string? Word { get; set; }
}
