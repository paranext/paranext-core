using System;
using System.Collections.Concurrent;
using System.Security.Cryptography;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: backend-alignment.md §114, §124, §543, §807 — the stateful Worker
//   that tracks live restore sessions across JSON-RPC calls. PT9 had no
//   equivalent — RestoreForm's instance field IS the session, and it lives
//   only for the form's modal lifetime. PT10's React UI is process-separate
//   from the data provider; the registry replaces "form instance lifetime"
//   with explicit Open / Close semantics.
//
// Pattern: ConcurrentDictionary-backed Worker (backend-alignment.md §807 —
//   "RestoreSessionRegistry uses ConcurrentDictionary<string, RestoreSession>
//   keyed by sessionId. Multiple concurrent sessions are explicitly
//   supported by the data contract."). Precedent: InventoryWorker
//   (per-job state) in c-sharp/Checks/. The registry is instance-scoped on
//   BackupRestoreDataProvider (one registry per data-provider instance) so it
//   can be lifecycle-managed by the data-provider's lifetime.
//
// Concurrency invariants (pinned by RestoreSessionRegistryTests):
//   * INV-REGISTRY-UNIQUE — session ids are unique across concurrent Opens
//     (verified via 200-element parallel Open loop).
//   * INV-REGISTRY-FORMAT — session id is 12 lowercase hex characters
//     (= 6 bytes of randomness = 48 bits). 12-char form is the strategic-plan
//     success criterion.
//   * INV-REGISTRY-DISPOSE-SAFETY — if the underlying Restorer's Dispose
//     throws, Close MUST still remove the entry from the dict (no leak).
//     Implementer wraps Dispose in try/catch and TryRemoves before Dispose.
//   * INV-REGISTRY-IDEMPOTENT-CLOSE — Close on an unknown sessionId is a no-
//     op (returns false). Close on the same sessionId twice is a no-op the
//     second time.
//
// TTL sweep — backend-alignment.md §809 calls for a 30-minute idle-session
// sweep. CAP-003 RED-state explicitly defers this to a follow-up (DEC-310
// note in test-writer-plan §Resolved Ambiguities). The core correctness
// invariants (uniqueness, dispose safety) are owned here; TTL sweep is a
// nice-to-have.

/// <summary>
/// Tracks live <see cref="RestoreSession"/> instances by session id. Backed
/// by a <see cref="System.Collections.Concurrent.ConcurrentDictionary{TKey,
/// TValue}"/> per backend-alignment.md §807. One registry per
/// <see cref="BackupRestoreDataProvider"/> instance.
/// </summary>
/// <remarks>
/// Public surface:
/// <list type="bullet">
///   <item><see cref="Open"/> — mint a new 12-char hex session id; insert a
///     fresh <see cref="RestoreSession"/>; return the id.</item>
///   <item><see cref="Get"/> — lookup a session by id;
///     <c>null</c> if not found (e.g., expired / closed).</item>
///   <item><see cref="Close"/> — atomically remove the session from the dict
///     AND dispose the underlying Restorer; returns
///     <c>true</c> if removed.</item>
///   <item><see cref="Count"/> — for tests / instrumentation.</item>
/// </list>
/// </remarks>
internal sealed class RestoreSessionRegistry
{
    private readonly ConcurrentDictionary<string, RestoreSession> _sessions =
        new(StringComparer.Ordinal);

    /// <summary>
    /// Mint a new 12-char hex session id, create a fresh
    /// <see cref="RestoreSession"/> wrapping <paramref name="restorer"/> +
    /// <paramref name="metadata"/>, insert the session into the dict, and
    /// return the id.
    /// </summary>
    /// <param name="restorer">IDisposable handle to the underlying backup ZIP
    /// (typically the PT10 Restorer port). Will be disposed by
    /// <see cref="Close"/> — caller MUST NOT retain a separate disposing
    /// reference.</param>
    /// <param name="metadata">Immutable per-session view of the ZIP contents
    /// (BHV-104).</param>
    /// <returns>The new session's 12-char hex id.</returns>
    public string Open(IDisposable restorer, RestorerMetadata metadata)
    {
        // EXPLANATION:
        // Mint a 12-char lowercase hex sessionId from 6 bytes (48 bits) of
        // crypto random. 2^48 = ~281 trillion possible values — a collision
        // even at thousands of concurrent open sessions has negligible
        // probability. The retry loop below handles the extraordinarily-rare
        // collision deterministically (TryAdd returns false; we mint again).
        while (true)
        {
            string sessionId = MintSessionId();
            var session = new RestoreSession(sessionId, restorer, metadata);
            if (_sessions.TryAdd(sessionId, session))
                return sessionId;
        }
    }

    /// <summary>
    /// Look up a session by id. Returns <c>null</c> if no session with that id
    /// is currently registered (e.g., the id is unknown, the session was
    /// closed, or the TTL sweep removed it).
    /// </summary>
    /// <param name="sessionId">The session id returned by an earlier
    /// <see cref="Open"/>.</param>
    public RestoreSession? Get(string sessionId)
    {
        return _sessions.TryGetValue(sessionId, out RestoreSession? session) ? session : null;
    }

    /// <summary>
    /// Atomically remove the session from the dict and dispose the underlying
    /// Restorer. Returns <c>true</c> if a session with that id existed and was
    /// removed; <c>false</c> if the id was unknown (idempotent — INV-REGISTRY-
    /// IDEMPOTENT-CLOSE).
    /// </summary>
    /// <remarks>
    /// INV-REGISTRY-DISPOSE-SAFETY: TryRemoves the entry FIRST
    /// (so an exception from Dispose can't leak the dict entry), THEN calls
    /// <c>session.Dispose()</c> inside a try/catch — Dispose failures are
    /// best-effort.
    /// </remarks>
    /// <param name="sessionId">The session id to close.</param>
    public bool Close(string sessionId)
    {
        // EXPLANATION:
        // Order matters: TryRemove FIRST (the dict entry is gone the moment
        // TryRemove returns true) THEN Dispose inside try/catch. If we called
        // Dispose first and Dispose threw, the dict entry would be leaked.
        // INV-REGISTRY-DISPOSE-SAFETY (RestoreSessionRegistryTests
        // .Open_DisposeFailure_DoesNotLeakDictEntry) pins this ordering.
        if (!_sessions.TryRemove(sessionId, out RestoreSession? session))
            return false;

        try
        {
            session.Dispose();
        }
        catch
        {
            // Best-effort — Dispose failures must not propagate; the dict
            // entry is already removed at this point so there's no leak.
        }
        return true;
    }

    /// <summary>
    /// Number of currently-registered sessions. For tests and instrumentation.
    /// </summary>
    public int Count => _sessions.Count;

    /// <summary>
    /// Mint a fresh 12-char lowercase hex session id from 6 bytes of
    /// cryptographic randomness. Format pinned by
    /// <c>RestoreSessionRegistryTests.SessionId_Format_Is12CharLowercaseHex</c>.
    /// </summary>
    private static string MintSessionId()
    {
        return Convert.ToHexString(RandomNumberGenerator.GetBytes(6)).ToLowerInvariant();
    }
}
