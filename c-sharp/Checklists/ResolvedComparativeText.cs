using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checklists;

// === NEW IN PT10 ===
// Reason: PT9 represents resolved comparative texts as in-memory ScrText
// references inside ChecklistsTool.comparativeTexts. PT10 must return a
// serializable shape across the PAPI boundary so the UI can render the
// resolved names / availability.
// Maps to: data-contracts.md §3.10 (ResolvedComparativeText)
/// <summary>
/// A single resolved comparative text with display information and
/// availability status. See data-contracts.md §3.10.
/// </summary>
/// <remarks>
/// <list type="bullet">
/// <item><see cref="Available"/> is false when the text could not be
/// resolved by either GUID or name (INV-014).</item>
/// <item><see cref="Id"/> preserves the originally-requested GUID even
/// when resolution fell back to name.</item>
/// <item><see cref="FullName"/> is the human-readable full project/text
/// name (may differ from the short <see cref="Name"/>).</item>
/// </list>
/// </remarks>
[method: JsonConstructor]
public record ResolvedComparativeText(string Id, string Name, string FullName, bool Available);
