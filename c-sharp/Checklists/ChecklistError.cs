using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checklists;

// === NEW IN PT10 ===
// Reason: PT9 surfaces errors via WinForms MessageBox; PT10 uses a structured
// wire-level error record over PAPI.
// Maps to: data-contracts.md §3.6 (ChecklistError)
/// <summary>
/// Standard error response record for all checklist PAPI methods. See
/// data-contracts.md §3.6.
/// </summary>
[method: JsonConstructor]
public record ChecklistError(string ErrorCode, string Message, string? Details);
