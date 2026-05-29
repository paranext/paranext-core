using System.Threading;
using System.Threading.Tasks;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: CAP-011 partial-class fragment for M-010 closeRestoreSession (per
//   data-contracts.md §4.10 + strategic-plan-backend.md §CAP-011). This file
//   SUPPLIES the CloseRestoreSessionAsync method onto the
//   `BackupRestoreDataProvider` partial-class declared in
//   BackupRestoreDataProvider.cs (CAP-002).
//
// Mirrors CAP-002 / CAP-003 / CAP-009's file-split convention: each capability
// owns its own partial-class fragment (one method per file) to avoid edit-
// collision with parallel agents.
//
// Wire-layer responsibilities (per data-contracts.md §4.10):
//   (1) Always return CloseRestoreSessionResult.Success — no preconditions, no
//       error matrix. The contract is idempotent ("Error conditions: None —
//       idempotent").
//   (2) Delegate to SessionRegistry.Close(sessionId) — fire-and-forget. The
//       boolean return (true = closed an existing session; false = unknown
//       session id) is intentionally ignored at the wire layer because both
//       cases map to the same Success envelope.
//   (3) Rely on CAP-003's INV-REGISTRY-DISPOSE-SAFETY: if the underlying
//       Restorer's Dispose throws, the registry TryRemoves the entry FIRST
//       and catches the Dispose exception. The wire layer never sees the
//       exception and always returns Success.
//
// PT9 anchors:
//   * MainForm.cs:1027-1046 — RestoreForm dispose-on-close lifetime, implicit.
//     PT10's React UI is process-separated, so the implicit lifecycle is
//     replaced by an explicit wire call. BHV-652 (cancel-surface parity)
//     pins the symmetry: every UI cancel surface MUST emit a
//     closeRestoreSession call.
//
// Implementation (CAP-011 GREEN):
//   * Body delegates to SessionRegistry.Close(sessionId) and always returns
//     CloseRestoreSessionResult.Success. The boolean return from Close is
//     discarded — both true (closed) and false (unknown) map to Success per
//     §4.10's "Error conditions: None — idempotent".
//
// Maps to: data-contracts.md §4.10 (M-010 closeRestoreSession);
//   strategic-plan-backend.md §CAP-011.
// Behaviors: BHV-652 (cancel-surface parity for Restore two-stage modality).

internal sealed partial class BackupRestoreDataProvider
{
    /// <summary>
    /// Wire entry point for M-010 closeRestoreSession (data-contracts.md
    /// §4.10). Releases the resources associated with
    /// <paramref name="request"/>'s <c>SessionId</c> by delegating to
    /// <see cref="SessionRegistry"/>'s <c>Close</c>. Idempotent — always
    /// returns <see cref="CloseRestoreSessionResult.Success"/> regardless of
    /// whether the session existed.
    /// </summary>
    /// <remarks>
    /// <para>
    /// Preconditions: <c>None</c>. <paramref name="request"/>'s
    /// <c>SessionId</c> may be a stale, already-closed, or never-issued handle.
    /// </para>
    /// <para>
    /// Postconditions:
    /// </para>
    /// <list type="bullet">
    ///   <item>If <c>SessionId</c> matched an open session, that session's
    ///     resources (in-memory <c>Restorer</c> instance, extracted-zip
    ///     handle) are released. Registry-eviction is best-effort —
    ///     CAP-003's <c>INV-REGISTRY-DISPOSE-SAFETY</c> ensures the registry
    ///     entry is removed even if <c>Restorer.Dispose()</c> throws.</item>
    ///   <item>If <c>SessionId</c> did not match any open session, the call
    ///     is a no-op (idempotent — same result).</item>
    ///   <item>Subsequent calls referencing the same <c>SessionId</c>
    ///     (e.g., <c>performRestore</c>, <c>compareBackupFile</c>) MUST
    ///     return <c>INVALID_SESSION</c> — verified transitively by CAP-004 /
    ///     CAP-005 (M-003 / M-004 own those tests).</item>
    ///   <item>Side-effect free with respect to anything outside the
    ///     session's allocated resources.</item>
    /// </list>
    /// <para>
    /// Error conditions: <c>None</c> — idempotent. Implementations MAY emit
    /// telemetry on unknown-session calls but MUST NOT surface them as
    /// errors.
    /// </para>
    /// </remarks>
    /// <param name="request">Close-session request payload. See
    /// <see cref="CloseRestoreSessionRequest"/>.</param>
    /// <param name="cancellationToken">Cancellation token from the JSON-RPC
    /// dispatcher. Currently unused — close is synchronous and short.
    /// Reserved for future asynchronicity.</param>
    /// <returns>Always
    /// <see cref="CloseRestoreSessionResult.Success"/>.</returns>
    public Task<CloseRestoreSessionResult> CloseRestoreSessionAsync(
        CloseRestoreSessionRequest request,
        CancellationToken cancellationToken = default
    )
    {
        // Reserved for future asynchronicity — close is synchronous and short.
        _ = cancellationToken;

        // Delegate to the session registry. The boolean return (true = closed
        // an existing session; false = unknown session id) is intentionally
        // ignored — per data-contracts.md §4.10 both cases map to the same
        // Success envelope. CAP-003's INV-REGISTRY-DISPOSE-SAFETY guarantees
        // that the registry TryRemoves the entry FIRST and catches any
        // Dispose-exception thrown by the underlying Restorer, so the wire
        // layer never sees the exception itself.
        SessionRegistry.Close(request.SessionId);
        return Task.FromResult<CloseRestoreSessionResult>(new CloseRestoreSessionResult.Success());
    }
}
