using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checklists;

// === NEW IN PT10 ===
// Reason: Container for the resolved-comparative-texts list returned by
// ChecklistService.ResolveComparativeTexts. PT9 held this as an
// in-memory List<ScrText> inside ChecklistsTool.comparativeTexts; PT10
// needs a serializable wrapper.
// Maps to: data-contracts.md §3.11 (ResolvedComparativeTexts)
/// <summary>
/// Container for the resolved-comparative-texts list returned by
/// <c>ChecklistService.ResolveComparativeTexts</c>. Wraps an ordered list
/// of <see cref="ResolvedComparativeText"/> preserving request order with
/// the active project excluded (INV-014). See data-contracts.md §3.11.
/// </summary>
/// <remarks>
/// <list type="bullet">
/// <item><see cref="Texts"/> preserves the order of the input
/// <c>requestedTexts</c> argument (minus the active project).</item>
/// <item>Unresolvable entries appear with <see
/// cref="ResolvedComparativeText.Available"/>=<c>false</c> rather than
/// being omitted.</item>
/// </list>
/// </remarks>
[method: JsonConstructor]
public record ResolvedComparativeTexts(IReadOnlyList<ResolvedComparativeText> Texts);
