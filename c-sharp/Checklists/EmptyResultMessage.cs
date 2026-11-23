using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checklists;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Checklists empty-result branches that emit one of two static
// messages ("identical markers" vs "no rows found with searched markers")
// Method: EmptyResultMessage (derived from PT9 string-message paths; extended to carry
// structured fields so the UI can render a localized message)
// Maps to: data-contracts.md §3.8
/// <summary>
/// Structured empty-result message. The <c>Variant</c> field is one of
/// <c>"identical"</c> or <c>"noResults"</c>. See data-contracts.md §3.8.
/// </summary>
[method: JsonConstructor]
public record EmptyResultMessage(
    string Variant,
    string Message,
    IReadOnlyList<string>? SearchedMarkers,
    IReadOnlyList<string>? SearchedBooks
);
