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
//   (1) Read the snapshot from the BackupableProjectsServiceOverride (test seam)
//       or — when CAP-008 GREEN lands the default-injection mechanism — a
//       per-instance service.
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
//   PT10 GREEN-state will inject the service via the eventual constructor on
//   the facade. CAP-008 RED-state uses a static-property test seam (mirrors
//   CAP-009's `RestoreDestinationProjectsServiceOverride` precedent) so unit
//   tests can plug in a service built against the PapiTestBase's
//   `DummyPapiClient` + `DummyLocalParatextProjects`. Production code MUST NOT
//   touch this.
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

        // RED state — implementation lands in CAP-008 GREEN. Message names the
        // owning capability so a future grep finds the slot. Mirrors CAP-009's
        // RED-state shape (`GetRestoreDestinationProjectsAsync` had the same
        // pattern before its GREEN landing).
        throw new NotImplementedException(
            "CAP-008 GetBackupableProjectsAsync is not yet implemented — RED state."
        );
    }
}
