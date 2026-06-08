using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: CAP-008 partial-class fragment for M-007 getBackupableProjects (per
//   strategic-plan-backend.md §CAP-008 + data-contracts.md §5.1). This file SUPPLIES
//   the GetBackupableProjectsAsync method onto the `BackupRestoreDataProvider`
//   partial-class declared in BackupRestoreDataProvider.cs (CAP-002).
//
// Mirrors CAP-009 (RestoreDestinationProjects) byte-for-byte at the structural
// level — each capability owns its own partial-class fragment (one method per
// file) to avoid edit-collision with parallel agents.
//
// Wire-layer responsibilities (per data-contracts.md §5.1 + CAP-008 strategic plan):
//   (1) Read the snapshot from CAP-021's BackupableProjectsService. Today the
//       service is provided via the BackupableProjectsServiceOverride test seam;
//       CAP-001 BE-7 will land the production wiring (constructor-injected
//       per-instance service) and remove the need for the seam outside tests.
//   (2) Return a fresh List<BackupableProject> (defensive copy so callers cannot
//       mutate the cached internal snapshot).
//
// Wire event surface (E-001 onDidUpdateBackupableProjects):
//   The event is emitted by CAP-021's BackupableProjectsService via its
//   inherited SubscribableSnapshotService.NotifyProjectsChanged. CAP-008's wire
//   method does NOT itself emit events — it only READS from the snapshot.
//   §5.1 trigger conditions (project added/removed/renamed; IsProtectedText flip;
//   HasFiguresFolder flip; IsNoteType change) fire E-001 through CAP-021's
//   machinery; the next call to GetBackupableProjectsAsync returns the updated
//   list.
//
// Test seam — BackupableProjectsServiceOverride:
//   Today this static-property seam is the ONLY injection mechanism for the
//   underlying BackupableProjectsService — unit tests plug in a service built
//   against the PapiTestBase's `DummyPapiClient` + `DummyLocalParatextProjects`.
//   CAP-001 BE-7 owns the production wiring: it will inject a per-instance
//   service via the facade's constructor and remove the need for this seam
//   outside tests. Mirrors CAP-009's `RestoreDestinationProjectsServiceOverride`
//   precedent. Production code MUST NOT touch this.
//
// Maps to: data-contracts.md §3.10 (BackupableProject element shape);
//   data-contracts.md §5.1 (DT-001 selector + trigger conditions);
//   strategic-plan-backend.md §CAP-008 (M-007 wire shape).
// Behaviors: BHV-650 (Main-menu Backup entry — consumes this list via the
//   backup dialog).
// Invariants: INV-B01 (resource projects filtered upstream by CAP-021 —
//   surfaced to the wire layer only as the absence of those entries),
//   INV-B03 (Notes-type projects flagged via `IsNoteType` on each list element).

internal sealed partial class BackupRestoreDataProvider
{
    /// <summary>
    /// Test seam — replace the default <see cref="BackupableProjectsService"/>
    /// with one built against the test fixture's <c>DummyPapiClient</c> +
    /// <c>DummyLocalParatextProjects</c>. Mirrors
    /// <see cref="RestoreDestinationProjectsServiceOverride"/> precedent
    /// (CAP-009). Tests set this in <c>[SetUp]</c> and reset to <c>null</c>
    /// in <c>[TearDown]</c>. Production code MUST NOT touch this.
    /// </summary>
    /// <remarks>
    /// Today this seam is the ONLY injection mechanism for the underlying
    /// <see cref="BackupableProjectsService"/>. CAP-001 BE-7 owns the production
    /// wiring — it will inject a per-instance service via the facade's
    /// constructor and remove the need for this seam outside tests.
    /// </remarks>
    internal static BackupableProjectsService? BackupableProjectsServiceOverride { get; set; }

    /// <summary>
    /// Wire entry point for M-007 getBackupableProjects
    /// (strategic-plan-backend.md §CAP-008; data-contracts.md §5.1 DT-001 surface).
    /// Returns the current snapshot of <see cref="BackupableProject"/> records
    /// from the underlying CAP-021 <see cref="BackupableProjectsService"/>.
    /// </summary>
    /// <param name="request">Request payload. See
    /// <see cref="GetBackupableProjectsRequest"/>. Currently has no selector
    /// fields per data-contracts.md §5.1 — the provider always returns the full
    /// list of editable, non-resource projects.</param>
    /// <param name="cancellationToken">Cancellation token from the JSON-RPC
    /// dispatcher. Currently unused — snapshot reads are synchronous and short.
    /// Reserved for future asynchronicity.</param>
    /// <returns>
    /// A fresh <see cref="List{T}"/> of <see cref="BackupableProject"/> records
    /// — defensive copy so caller mutations do not affect the service's cached
    /// snapshot. Empty when no editable projects exist (per TS-107: silent
    /// empty list, NOT error).
    /// </returns>
    public Task<List<BackupableProject>> GetBackupableProjectsAsync(
        GetBackupableProjectsRequest request,
        CancellationToken cancellationToken = default
    )
    {
        _ = request;
        _ = cancellationToken;

        // EXPLANATION:
        // CAP-008 GREEN body — mirrors CAP-009's GetRestoreDestinationProjectsAsync
        // (BackupRestoreDataProvider.RestoreDestinationProjects.cs:93-141) minus the
        // OnlyAllowNewProjects guard (DT-001's selector is `undefined` per
        // data-contracts.md §5.1, so the request record is parameterless).
        //   (1) Read the snapshot from CAP-021's BackupableProjectsService via the
        //       test seam. CAP-001 BE-7 will land the production injection mechanism
        //       (constructor-injected default) — until then, only the test seam is wired.
        //   (2) Return a fresh `List<BackupableProject>` (defensive copy). The
        //       underlying `GetSnapshot()` already returns an immutable copy, but
        //       wrapping it in a fresh mutable List ensures caller
        //       `Clear`/`Add`/`Remove` cannot affect the service's cached snapshot
        //       AND honors the wire-method's declared `List<T>` return shape.
        //
        // Per TS-107: when the project source is empty, return an empty list — never
        // throw. The wire surface is "the snapshot is always the full list, which may
        // be empty" per §5.1; no guard is needed because `GetSnapshot()` already
        // returns an empty list when the upstream source is empty.
        //
        // E-001 emission is NOT done here. CAP-021's BackupableProjectsService.
        // NotifyProjectsChanged owns event emission via its inherited
        // SubscribableSnapshotService. §5.1 trigger conditions (project added/
        // removed/renamed; IsProtectedText flip; HasFiguresFolder flip; IsNoteType
        // change) fire E-001 through that machinery; this wire method only READS
        // the post-change snapshot.

        // The test seam is the only injection mechanism in CAP-008 GREEN. CAP-001 BE-7
        // will add a constructor-injected default for production. Until then, callers
        // outside tests will hit an InvalidOperationException — by design — because
        // the production wiring is not yet in place.
        BackupableProjectsService service =
            BackupableProjectsServiceOverride
            ?? throw new InvalidOperationException(
                "BackupableProjectsService is not wired. "
                    + "Tests must set BackupableProjectsServiceOverride; "
                    + "production wiring is CAP-001 BE-7 work."
            );

        IReadOnlyList<BackupableProject> snapshot = service.GetSnapshot();
        return Task.FromResult(new List<BackupableProject>(snapshot));
    }
}
