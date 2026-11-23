using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checklists;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Checklists/CLEditLink content-item representation (edit-link
// target for cells that pass the SetCellEditability permission check)
// Method: EditLinkItem (CLEditLink)
// Maps to: EXT-010 (data models), data-contracts.md §3.5
/// <summary>
/// Edit-link content item carrying the BBB/CCC/VVV reference that the UI opens when
/// the user clicks the edit link. Present only when VAL-007 conditions are met.
/// See data-contracts.md §3.5.
/// </summary>
[method: JsonConstructor]
public record EditLinkItem(int BookNum, int ChapterNum, int VerseNum) : ChecklistContentItem;
