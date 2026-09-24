using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checklists;

// === NEW IN PT10 ===
// Reason: PT9 represents comparative texts via in-memory ScrText references; PT10
// needs a serializable id/name pair to cross the PAPI boundary.
// Maps to: data-contracts.md §2.4 (ComparativeTextRef)
/// <summary>
/// Identifier/name pair describing a comparative text (reference text, back
/// translation, etc.) as exposed over the PAPI. See data-contracts.md §2.4.
/// </summary>
[method: JsonConstructor]
public record ComparativeTextRef(string Id, string Name);
