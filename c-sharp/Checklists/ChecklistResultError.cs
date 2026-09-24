using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checklists;

// === NEW IN PT10 ===
// Reason: PT9 surfaces errors via WinForms MessageBox; PT10 uses a structured
// wire-level error record over PAPI, served from the discriminated-union
// response defined in data-contracts.md §3.1 (ChecklistResultResponse =
// ChecklistResult | ChecklistResultError).
// Maps to: data-contracts.md §3.1 / §3.6 / §4.1 error conditions, CAP-011
// structured-error wiring
/// <summary>
/// Wire-format error returned by the checklist NetworkObject when a contract-listed
/// exception is caught inside the <c>buildChecklistData</c> delegate target. See
/// <c>ChecklistNetworkObject.BuildChecklistData</c> for the catch-and-convert path,
/// and <see cref="ChecklistErrorCodes"/> for the canonical <see cref="Code"/> values.
/// </summary>
/// <param name="Code">Machine-readable code from <see cref="ChecklistErrorCodes"/>.</param>
/// <param name="Message">Human-readable message for the UI layer to render.</param>
[method: JsonConstructor]
public record ChecklistResultError(string Code, string Message);
