using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checklists;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Checklists/CLMessage content-item representation (empty-result
// message rendered inline in lieu of a row; cf. PostProcessRows empty-handling)
// Method: MessageItem (CLMessage)
// Maps to: EXT-010 (data models), data-contracts.md §3.5
/// <summary>
/// Inline message content item. Used for empty-result messages (INV-008). See
/// data-contracts.md §3.5.
/// </summary>
[method: JsonConstructor]
public record MessageItem(string Message) : ChecklistContentItem;
