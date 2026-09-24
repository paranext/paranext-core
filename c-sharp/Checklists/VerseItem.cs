using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checklists;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Checklists/CLVerse content-item representation
// Method: VerseItem (CLVerse)
// Maps to: EXT-010 (data models), data-contracts.md §3.5
/// <summary>
/// Verse-number marker within a paragraph. <c>VerseNumber</c> is a string to carry
/// bridge notation (e.g., <c>"24-38"</c>). See data-contracts.md §3.5.
/// </summary>
[method: JsonConstructor]
public record VerseItem(string VerseNumber) : ChecklistContentItem;
