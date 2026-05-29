using System;
using Paratext.Data;
using Paratext.Data.Repository;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: CAP-004 / M-003 / data-contracts.md §4.3 — owns the mutating
//   "execute the overlay restore" step. PT9 anchor: `Restorer.PerformRestore`
//   (Paratext/BackupRestore/Restorer.cs:144-199). The orchestrator pattern
//   mirrors `c-sharp/ManageBooks/DeleteBooksOrchestrator.cs:46` (orchestrator
//   + WriteLockManager + LockNotObtainedException + Theme-6 post-mutation
//   event).
//
// Responsibilities (orchestrator-level; the handle owns file-copy mechanics):
//   (1) Acquire `WriteLockManager.Default.ObtainLock(WriteScope.EntireProject(dest))`
//       — INV-A18 / TS-022.
//   (2) Invoke `handle.PerformOverlayRestore(dest, request)` inside a
//       try/finally so the lock is released on every exit path including
//       exceptions.
//   (3) Catch `LockNotObtainedException` (either from the obtainer or from a
//       nested call inside the handle) → return `Error(LockNotObtained)`.
//   (4) Catch `MigrationFailedException` (from the handle's PTMigration step,
//       BHV-509 / TS-023) → return `Error(MigrationFailed)`.
//   (5) On success → return `Success(dest.Guid, dest.Settings.TranslationInfo.Type.IsNoteType())`.
//
// Test seam: `WriteLockObtainerOverride` (Func<ScrText, IDisposable?>?).
//   * Default = real `WriteLockManager.Default.ObtainLock`.
//   * Tests set it to return either a no-op IDisposable (success) or null
//     (lock contention).
//   * `WriteLockManager.ObtainLock` is non-virtual — the seam is the only
//     way to control its outcome from unit tests. See DEC-CAP-004-C in the
//     test-writer plan.

/// <summary>
/// Owns the overlay-restore execution step for <c>performRestore</c> (M-003).
/// Stateless static class — mirrors
/// <see cref="Paranext.DataProvider.ManageBooks.DeleteBooksOrchestrator"/>'s
/// shape. Acquires the project write-lock, invokes the underlying
/// <see cref="IRestorerHandle.PerformOverlayRestore"/> body, classifies the
/// outcome to a wire-stable <see cref="RestoreOperationResult"/>, and releases
/// the lock on every exit path.
/// </summary>
internal static class RestoreOrchestrator
{
    /// <summary>
    /// Test seam — overrides
    /// <see cref="WriteLockManager.ObtainLock(WriteScope, string)"/> (which is
    /// non-virtual). Default = the real <see cref="WriteLockManager"/>.
    /// </summary>
    /// <remarks>
    /// The override returns:
    /// <list type="bullet">
    ///   <item>Non-null <see cref="IDisposable"/> → lock acquired; orchestrator
    ///     proceeds with the overlay and disposes the handle in a
    ///     <c>finally</c> block (the wrapper is responsible for forwarding
    ///     <c>Dispose</c> to <c>WriteLock.Release()</c> in production).</item>
    ///   <item><c>null</c> → lock contention; orchestrator returns
    ///     <see cref="RestoreOperationErrorCode.LockNotObtained"/>.</item>
    /// </list>
    /// Tests reset to <c>null</c> in <c>[TearDown]</c>. Production code MUST
    /// NOT touch this.
    /// </remarks>
    internal static Func<ScrText, IDisposable?>? WriteLockObtainerOverride { get; set; }

    /// <summary>
    /// Execute the overlay-restore step. Pre-flight gating
    /// (session lookup, admin gate, shared-project filter, confirmation
    /// matrix) is the wire-layer's responsibility (see
    /// <see cref="BackupRestoreDataProvider.PerformRestoreAsync"/>); this
    /// method assumes the input is fully validated.
    /// </summary>
    /// <param name="destination">Resolved destination project. The wire layer
    /// fetched this via <c>LocalParatextProjects.GetParatextProject(request.DestinationProjectId)</c>
    /// and confirmed editability + admin permission before calling.</param>
    /// <param name="session">Open restore session carrying the
    /// <see cref="IRestorerHandle"/> + metadata.</param>
    /// <param name="overlayRequest">Per-call overlay payload — already
    /// stripped of permission files if the caller acknowledged the
    /// shared-project warning, already cross-checked against the downgrade
    /// list.</param>
    /// <returns>One of
    /// <see cref="RestoreOperationResult.Success"/> (overlay completed),
    /// or <see cref="RestoreOperationResult.Error"/> for
    /// <c>LockNotObtained</c> / <c>MigrationFailed</c> / <c>IoError</c>.</returns>
    public static RestoreOperationResult ExecuteOverlay(
        ScrText destination,
        RestoreSession session,
        RestoreOverlayRequest overlayRequest
    )
    {
        // EXPLANATION:
        // (1) Resolve the obtainer — test seam takes precedence over the real
        //     WriteLockManager. The seam returns IDisposable?; the production
        //     adapter wraps WriteLock so Dispose() forwards to Release().
        // (2) Null obtainer result = lock contention (TS-022 / INV-A18); the
        //     handle MUST NOT be invoked.
        // (3) Lock acquired → invoke handle inside try; release in finally so
        //     the lock is released on every exit path.
        // (4) Exception classification mirrors data-contracts.md §3.7:
        //       LockNotObtainedException  → Error(LockNotObtained)
        //       MigrationFailedException  → Error(MigrationFailed)
        //       any other exception       → rethrow (per DEC-CAP-004-IMPL-B —
        //         tests only pin the lock-release invariant on unexpected
        //         throws).
        Func<ScrText, IDisposable?> obtainer = WriteLockObtainerOverride ?? DefaultObtainer;

        IDisposable? lockHandle = obtainer(destination);
        if (lockHandle == null)
        {
            return new RestoreOperationResult.Error(
                RestoreOperationErrorCode.LockNotObtained,
                "%restore_lockNotObtained%"
            );
        }

        try
        {
            // The session's IDisposable Restorer IS the IRestorerHandle in
            // production — CAP-003's factory returns DefaultRestorerHandle,
            // which implements IRestorerHandle. We cast through the interface
            // here so the orchestrator only depends on the interface, never
            // on the concrete handle type.
            IRestorerHandle handle = (IRestorerHandle)session.Restorer;
            handle.PerformOverlayRestore(destination, overlayRequest);
            return new RestoreOperationResult.Success(
                destination.Guid.ToString(),
                IsNoteType(destination)
            );
        }
        catch (LockNotObtainedException)
        {
            return new RestoreOperationResult.Error(
                RestoreOperationErrorCode.LockNotObtained,
                "%restore_lockNotObtained%"
            );
        }
        catch (MigrationFailedException)
        {
            return new RestoreOperationResult.Error(
                RestoreOperationErrorCode.MigrationFailed,
                "%restore_migrationFailed%"
            );
        }
        finally
        {
            lockHandle.Dispose();
        }
    }

    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/Restorer.cs:160
    // Method: WriteLockManager.Default.ObtainLock(WriteScope.EntireProject(ScrTextDestination))
    // Maps to: INV-A18 / TS-022 / BHV-105
    //
    // EXPLANATION:
    // `Paratext.Data.WriteLock` is a non-disposable interface (Release() only).
    // The orchestrator's lock-handle seam is `IDisposable?` so tests can hand
    // back any IDisposable; in production we wrap WriteLock so Dispose() →
    // Release() (Paratext semantics: Release returns the lock without firing
    // change notifications — Notify happens elsewhere via PdpFactory in
    // CAP-001 BE-7, so plain Release here is correct).
    private static readonly Func<ScrText, IDisposable?> DefaultObtainer = static dest =>
    {
        WriteLock? writeLock = WriteLockManager.Default.ObtainLock(
            WriteScope.EntireProject(dest),
            "Restore"
        );
        return writeLock == null ? null : new WriteLockDisposable(writeLock);
    };

    /// <summary>
    /// Wraps a <see cref="WriteLock"/> as an <see cref="IDisposable"/> so it
    /// can be released via <c>using</c> / <c>finally</c>-Dispose semantics.
    /// </summary>
    private sealed class WriteLockDisposable : IDisposable
    {
        private readonly WriteLock _writeLock;
        private bool _disposed;

        public WriteLockDisposable(WriteLock writeLock)
        {
            _writeLock = writeLock;
        }

        public void Dispose()
        {
            if (_disposed)
                return;
            _disposed = true;
            _writeLock.Release();
        }
    }

    // === PORTED FROM PT9 ===
    // Source: Paratext/CommentThread.cs:261 (TranslationInfo.Type.IsNoteType())
    // Maps to: BHV-105 / BHV-653 (UI dispatch hint)
    private static bool IsNoteType(ScrText scrText)
    {
        try
        {
            return scrText.Settings?.TranslationInfo?.Type.IsNoteType() ?? false;
        }
        catch
        {
            return false;
        }
    }
}
