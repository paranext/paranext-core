using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checklists;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Checklists/CLError content-item representation (cell-level
// error string surfaced inline)
// Method: ErrorItem (CLError)
// Maps to: EXT-010 (data models), data-contracts.md §3.5
/// <summary>
/// Cell-level error content item. Carries a message string that the UI renders inline
/// where a normal paragraph would appear. See data-contracts.md §3.5.
/// </summary>
[method: JsonConstructor]
public record ErrorItem(string Message) : ChecklistContentItem;
