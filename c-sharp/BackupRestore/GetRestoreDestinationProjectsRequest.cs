namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §5.2 + strategic-plan-backend.md §CAP-009 — the
//   wire-stable request payload for M-008 getRestoreDestinationProjects on the
//   `BackupRestoreDataProvider` partial-class facade. Replaces PT9's
//   `RestoreForm.UpdateScrTextCombo` inline call into `ParatextUtils.FillProjectCombo`
//   (`RestoreForm.cs:315-320`): PT9 read the destination project list inline from the
//   in-process `ScrTextCollection`; PT10's React UI lives in a separate process so the
//   list must cross the JSON-RPC boundary.
//
// Field preservation (per scope-cascade-pattern.md / FN-010 / Decision 24):
//   * `SessionId` — nullable. Optional selector that filters to projects valid as the
//     destination of the named session. Null/omitted → all editable, non-resource
//     projects (BHV-315 base behavior).
//   * `OnlyAllowNewProjects` — bool, default false. The legacy-backup branch in PT9
//     (`!onlyAllowNewProjects || newProjects.Contains(scr)` per `RestoreForm.cs:316`)
//     restricted the combo to projects newly created via the `cmdNewProject` sub-flow
//     (BHV-316 / SUBFLOW-002). That sub-flow is EXCLUDED post-FN-010 (Decision 24)
//     because PT10 does not yet have a `ProjectPropertiesForm` equivalent. The field is
//     preserved in the schema for re-add traceability (scope-cascade-pattern.md) and
//     PT10 currently throws `ArgumentException("INVALID_SESSION")` when set to `true`
//     so the wire surface stays stable even though the only-new-projects code path is
//     unreachable.
//
// Maps to: data-contracts.md §5.2 (DT-002 — selector shape); strategic-plan-backend.md
//   §CAP-009 (M-008 wire shape: `Func<GetRestoreDestinationProjectsRequest, Task<List<RestoreDestinationProject>>>`).

/// <summary>
/// Request payload for <c>M-008 getRestoreDestinationProjects</c>
/// (<see cref="BackupRestoreDataProvider.GetRestoreDestinationProjectsAsync"/>).
/// </summary>
/// <remarks>
/// <para>
/// <b>Selector semantics</b> (per data-contracts.md §5.2): when
/// <see cref="SessionId"/> is non-null the resulting list is filtered to projects valid
/// as the destination of that specific session. When null the list contains every
/// editable, non-resource project (BHV-315 base behavior).
/// </para>
///
/// <para>
/// <b>OnlyAllowNewProjects re-add stub</b> (per FN-010 / Decision 24): the field is
/// preserved in the schema for re-add traceability per <c>scope-cascade-pattern.md</c>.
/// PT10 throws <see cref="System.ArgumentException"/> with message
/// <c>"INVALID_SESSION"</c> when set to <c>true</c> because the only-new-projects code
/// path is unreachable post-FN-010 (no <c>cmdNewProject</c> sub-flow). The wire surface
/// stays stable so callers don't have to be re-coded if PT10 later regains the
/// new-project primitive.
/// </para>
/// </remarks>
internal sealed record GetRestoreDestinationProjectsRequest
{
    /// <summary>
    /// Optional session-scoped filter. When non-null, the result is filtered to
    /// projects valid as the destination of the named restore session. Null/omitted →
    /// all editable, non-resource projects (BHV-315 base behavior).
    /// </summary>
    public string? SessionId { get; init; }

    /// <summary>
    /// EXCLUDED post-FN-010 (Decision 24). Preserved in the schema for re-add
    /// traceability per <c>scope-cascade-pattern.md</c>. PT10 throws
    /// <see cref="System.ArgumentException"/> when set to <c>true</c>; default
    /// <c>false</c> is the only currently-supported value.
    /// </summary>
    public bool OnlyAllowNewProjects { get; init; }
}
