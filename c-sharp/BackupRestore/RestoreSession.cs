using System;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: backend-alignment.md §114, §123-125 — the stateful Worker pattern for
//   the multi-stage Restore flow. PT9 had no session concept — RestoreForm held
//   the IDisposable Restorer in a field (Paratext/BackupRestore/RestoreForm.cs:
//   `private Restorer restorer`) for the form's lifetime; Form.Dispose closed
//   it. PT10's React UI lives in a separate process; the data provider must
//   own the long-lived state across multiple JSON-RPC calls (openRestoreSession
//   → compareBackupFile* → performRestore → closeRestoreSession).
//
// PT10 deltas:
//   * Session id replaces "the form instance" as the lifecycle handle. The id
//     is a 12-char hex string minted by RestoreSessionRegistry on Open.
//   * The session owns the IDisposable Restorer handle (whatever the
//     implementer chose — could be the ported PT9 Restorer, or a wrapper over
//     SharpZipLib's ZipFile). Disposing the session forwards to disposing the
//     Restorer.
//   * Metadata is immutable post-construction (RestorerMetadata record). The
//     React UI fetches it once via openRestoreSession's Success payload, and
//     the data provider replays it on subsequent calls without recompute.
//
// Maps to: backend-alignment.md §125 ("RestoreSession — Owns IDisposable
//   Restorer + source token map"). The "source token map" half is owned by
//   CAP-024 (CompareSourceContentResolver / M-011) — for CAP-003 this stub
//   only carries the Restorer + metadata; the token map will be added by a
//   later partial-class extension.

/// <summary>
/// One live restore session. Owns an <see cref="IDisposable"/> handle to the
/// backup ZIP (typically a <c>Restorer</c> wrapping a SharpZipLib
/// <c>ZipFile</c>) plus an immutable <see cref="RestorerMetadata"/> snapshot
/// projected from it.
/// </summary>
/// <remarks>
/// <para>
/// Lifecycle: created by <see cref="RestoreSessionRegistry.Open"/>; retrieved
/// by <see cref="RestoreSessionRegistry.Get"/>; disposed by
/// <see cref="RestoreSessionRegistry.Close"/>. Callers MUST NOT dispose a
/// session directly — go through the registry so the dictionary entry is
/// removed atomically.
/// </para>
/// <para>
/// The session is intentionally a <c>sealed class</c> rather than a
/// <c>record</c> because it owns a mutable disposal lifecycle (IDisposable
/// underneath) that records don't model well; record value-equality has no
/// meaning for sessions either — two sessions over the same ZIP are NOT
/// equal, they're independent live handles.
/// </para>
/// </remarks>
internal sealed class RestoreSession : IDisposable
{
    private readonly IDisposable _restorer;
    private bool _disposed;

    /// <summary>
    /// Constructs a new session. Called only by
    /// <see cref="RestoreSessionRegistry.Open"/> — application code MUST NOT
    /// instantiate sessions directly.
    /// </summary>
    /// <param name="sessionId">12-char hex id minted by the registry.</param>
    /// <param name="restorer">IDisposable handle to the underlying ZIP /
    /// Restorer object. Disposing the session forwards to disposing this.</param>
    /// <param name="metadata">Immutable per-session view of the ZIP contents
    /// (BHV-104).</param>
    public RestoreSession(string sessionId, IDisposable restorer, RestorerMetadata metadata)
    {
        SessionId = sessionId;
        _restorer = restorer;
        Metadata = metadata;
    }

    /// <summary>
    /// The 12-char hex session id minted by
    /// <see cref="RestoreSessionRegistry.Open"/>. Caller passes this back to
    /// every subsequent restore-flow call.
    /// </summary>
    public string SessionId { get; }

    /// <summary>
    /// Immutable per-session view of the backup ZIP contents (BHV-104).
    /// </summary>
    public RestorerMetadata Metadata { get; }

    /// <summary>
    /// The underlying IDisposable handle (typically the PT10 port of PT9's
    /// <c>Restorer</c>, or a SharpZipLib <c>ZipFile</c> wrapper). Exposed
    /// internally for late-binding consumers (CAP-004 RestoreOrchestrator,
    /// CAP-005 compareBackupFile, CAP-024 CompareSourceContentResolver) that
    /// need to read additional bytes from the ZIP after the session is open.
    /// </summary>
    public IDisposable Restorer => _restorer;

    /// <summary>
    /// Disposes the underlying Restorer handle. Idempotent — second call is a
    /// no-op. Called by <see cref="RestoreSessionRegistry.Close"/>; application
    /// code MUST go through the registry.
    /// </summary>
    public void Dispose()
    {
        // Idempotent — guard against double-dispose so a defensive caller (or a
        // racing Close + finalizer) cannot trigger _restorer.Dispose() twice.
        // INV-REGISTRY-IDEMPOTENT-CLOSE is enforced primarily by the registry
        // (TryRemove returns false on the second Close), but this guard makes
        // RestoreSession safe to call Dispose on directly too.
        if (_disposed)
            return;
        _disposed = true;
        _restorer.Dispose();
    }
}
