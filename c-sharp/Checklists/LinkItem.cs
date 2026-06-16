using System.Text.Json.Serialization;
using Paranext.DataProvider.Scripture;

namespace Paranext.DataProvider.Checklists;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Checklists/CLLink content-item representation (cross-reference
// link rendered in the row data)
// Method: LinkItem (CLLink)
// Maps to: EXT-010 (data models), data-contracts.md §3.5
/// <summary>
/// Reference link content item: a canonical scripture reference plus its display text.
/// See data-contracts.md §3.5. <c>Reference</c> is a bridge-capable
/// <see cref="ScriptureRange"/> (the canonical platform scripture-reference type) — a
/// cross-reference link always targets a real reference, so it is non-nullable.
/// </summary>
[method: JsonConstructor]
public record LinkItem(ScriptureRange Reference, string DisplayText) : ChecklistContentItem;
