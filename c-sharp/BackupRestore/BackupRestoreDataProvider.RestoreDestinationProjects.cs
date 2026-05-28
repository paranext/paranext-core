using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: CAP-009 partial-class fragment for M-008 getRestoreDestinationProjects (per
//   strategic-plan-backend.md §CAP-009 + data-contracts.md §5.2). This file SUPPLIES
//   the GetRestoreDestinationProjectsAsync method onto the `BackupRestoreDataProvider`
//   partial-class declared in BackupRestoreDataProvider.cs (CAP-002).
//
// Mirrors CAP-002 / CAP-003's file-split convention: each capability owns its own
// partial-class fragment (one method per file) to avoid edit-collision with parallel
// agents.
//
// Wire-layer responsibilities (per data-contracts.md §5.2 + CAP-009 strategic plan):
//   (1) Throw ArgumentException("INVALID_SESSION") when
//       request.OnlyAllowNewProjects == true. The field is preserved for re-add
//       traceability per scope-cascade-pattern.md / FN-010; PT10 has no
//       cmdNewProject sub-flow so the only-new-projects code path is unreachable.
//   (2) Read the snapshot from the RestoreDestinationProjectsServiceOverride
//       (test seam) or — when GREEN-state lands a default-injection mechanism —
//       a per-instance service.
//   (3) Return a fresh List<RestoreDestinationProject> (defensive copy so callers
//       cannot mutate the cached internal snapshot).
//
// Wire event surface (E-002 onDidUpdateRestoreDestinationProjects):
//   The event is emitted by CAP-021's RestoreDestinationProjectsService via its
//   inherited SubscribableSnapshotService.NotifyProjectsChanged. CAP-009's wire
//   method does NOT itself emit events — it only READS from the snapshot. Admin-
//   permission flips fire E-002 through CAP-021's machinery; the next call to
//   GetRestoreDestinationProjectsAsync returns the updated CurrentUserIsAdmin flag.
//
// Test seam — RestoreDestinationProjectsServiceOverride:
//   PT10 GREEN-state will inject the service via the eventual constructor on the
//   facade. CAP-009 RED-state uses a static-property test seam (mirrors
//   `RestorerFactoryOverride` precedent from CAP-003) so unit tests can plug in a
//   service built against the PapiTestBase's `DummyPapiClient` +
//   `DummyLocalParatextProjects`. Production code MUST NOT touch this.
//
// Maps to: data-contracts.md §3.11 (RestoreDestinationProject element shape);
//   data-contracts.md §5.2 (DT-002 selector); strategic-plan-backend.md §CAP-009
//   (M-008 wire shape).
// Behaviors: BHV-315 (cmbScrTextDest populated with editable non-resource projects —
//   Scope Note: PT10 narrow to existing-only post-FN-010).
// Invariants: INV-B05 (Restoring over an existing project requires admin permission —
//   surfaced via the `CurrentUserIsAdmin` flag on each list element).

internal sealed partial class BackupRestoreDataProvider
{
    /// <summary>
    /// Test seam — replace the default <see cref="RestoreDestinationProjectsService"/>
    /// with one built against the test fixture's <c>DummyPapiClient</c> +
    /// <c>DummyLocalParatextProjects</c>. Mirrors
    /// <see cref="RestorerFactoryOverride"/> precedent. Tests set this in
    /// <c>[SetUp]</c> and reset to <c>null</c> in <c>[TearDown]</c>. Production code
    /// MUST NOT touch this.
    /// </summary>
    /// <remarks>
    /// When <c>null</c>, the GREEN-state implementer SHOULD wire the default to a
    /// per-instance service injected via the facade's constructor (CAP-001 BE-7).
    /// CAP-009 RED-state ships only the test seam — production wiring is GREEN-state
    /// work.
    /// </remarks>
    internal static RestoreDestinationProjectsService? RestoreDestinationProjectsServiceOverride { get; set; }

    /// <summary>
    /// Wire entry point for M-008 getRestoreDestinationProjects
    /// (strategic-plan-backend.md §CAP-009; data-contracts.md §5.2 DT-002 surface).
    /// Returns the current snapshot of <see cref="RestoreDestinationProject"/>
    /// records from the underlying CAP-021
    /// <see cref="RestoreDestinationProjectsService"/>.
    /// </summary>
    /// <param name="request">Request payload. See
    /// <see cref="GetRestoreDestinationProjectsRequest"/>.</param>
    /// <param name="cancellationToken">Cancellation token from the JSON-RPC
    /// dispatcher. Currently unused — snapshot reads are synchronous and short.
    /// Reserved for future asynchronicity.</param>
    /// <returns>
    /// A fresh <see cref="List{T}"/> of <see cref="RestoreDestinationProject"/>
    /// records — defensive copy so caller mutations do not affect the service's
    /// cached snapshot.
    /// </returns>
    /// <exception cref="ArgumentException">
    /// Thrown with message <c>"INVALID_SESSION"</c> when
    /// <see cref="GetRestoreDestinationProjectsRequest.OnlyAllowNewProjects"/> is
    /// <c>true</c>. The field is preserved for re-add traceability per
    /// <c>scope-cascade-pattern.md</c>; PT10's wire surface stays stable even though
    /// the only-new-projects code path is unreachable post-FN-010.
    /// </exception>
    public Task<List<RestoreDestinationProject>> GetRestoreDestinationProjectsAsync(
        GetRestoreDestinationProjectsRequest request,
        CancellationToken cancellationToken = default
    )
    {
        _ = cancellationToken;
        // RED-state stub — Implementer agent (CAP-009 GREEN) replaces this body with
        // the guard chain + RestoreDestinationProjectsService.GetSnapshot read.
        throw new NotImplementedException(
            "CAP-009 GetRestoreDestinationProjectsAsync is not yet implemented — RED state."
        );
    }
}
