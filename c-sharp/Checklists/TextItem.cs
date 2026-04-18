using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checklists;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Checklists/CLText content-item representation
// Method: TextItem (CLText)
// Maps to: EXT-010 (data models), data-contracts.md §3.5
/// <summary>
/// Plain text fragment within a paragraph. <c>CharacterStyle</c> is non-null when the
/// text is within a character style span (BHV-604). See data-contracts.md §3.5.
/// </summary>
[method: JsonConstructor]
public record TextItem(string Text, string? CharacterStyle) : ChecklistContentItem;
