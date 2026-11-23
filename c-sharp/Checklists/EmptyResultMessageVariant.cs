namespace Paranext.DataProvider.Checklists;

// === NEW IN PT10 ===
// Reason: data-contracts.md §3.8 constrains EmptyResultMessage.Variant to a
// two-value literal union on the TS side ('identical' | 'noResults'). The C#
// record exposes Variant as a plain string; these constants pin the canonical
// values so call sites can't drift to typos, and future checklist types can
// extend the union by adding new constants here.
// Maps to: data-contracts.md §3.8 EmptyResultMessage — Variant constants.
/// <summary>
/// Canonical string values for <see cref="EmptyResultMessage.Variant"/>.
/// Mirrors the TypeScript literal union in data-contracts.md §3.8 and is the
/// single source of truth used at construction sites in
/// <c>MarkersDataSource.PostProcessRows</c> and at assertion sites in the test
/// suite. Other checklist types (cross references, punctuation, etc.) should
/// extend this class with their own variant constants when they port.
/// </summary>
public static class EmptyResultMessageVariant
{
    /// <summary>
    /// Emitted when all comparative texts had identical markers — no
    /// difference to render (BHV-600).
    /// </summary>
    public const string Identical = "identical";

    /// <summary>
    /// Emitted when the marker filter is non-empty but no paragraphs in the
    /// scanned books matched (BHV-106).
    /// </summary>
    public const string NoResults = "noResults";
}
