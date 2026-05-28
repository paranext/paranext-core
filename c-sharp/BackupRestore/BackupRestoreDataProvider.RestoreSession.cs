using System;
using System.Threading;
using System.Threading.Tasks;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: CAP-003 partial-class fragment for M-002 openRestoreSession (per
//   data-contracts.md §4.2 + backend-alignment.md §JSON-RPC Wire Contract
//   M-002). This file SUPPLIES the OpenRestoreSessionAsync method onto the
//   `BackupRestoreDataProvider` partial-class declared in
//   BackupRestoreDataProvider.cs (CAP-002).
//
// Mirrors CAP-002's file-split convention: each capability owns its own
// partial-class fragment (one method per file) to avoid edit-collision with
// parallel agents.
//
// Class organization:
//   * BackupRestoreDataProvider.cs (CAP-002) — declares the class +
//     CreateBackupAsync (M-001).
//   * BackupRestoreDataProvider.RestoreSession.cs (THIS file, CAP-003) — adds
//     OpenRestoreSessionAsync (M-002), the per-instance RestoreSessionRegistry,
//     the RestorerFactoryOverride test seam, and the IRestorerHandle
//     abstraction the test seam binds to.
//   * Future partial fragments (CAP-004..CAP-011) will add their M-### method
//     here as additional partial-class files.
//
// Test seam — RestorerFactoryOverride:
//   PT9's `Restorer` class lives in Paratext.exe, not ParatextData.dll
//   (verified via `strings ParatextData.dll | grep Restorer` — 0 hits). PT10
//   therefore either ports Restorer or stubs it. CAP-003 RED-state does NOT
//   prescribe — the test seam (`RestorerFactoryOverride`) lets the implementer
//   choose. Tests inject a fake `IRestorerHandle` factory; the GREEN-state
//   implementer can wire the default factory to a real port without changing
//   the test contract.
//
// Maps to: data-contracts.md §4.2 (M-002 openRestoreSession); backend-
//   alignment.md §JSON-RPC Wire Contract; strategic-plan-backend.md §CAP-003.

internal sealed partial class BackupRestoreDataProvider
{
    /// <summary>
    /// Per-instance registry tracking live restore sessions for this data
    /// provider. One registry per data-provider lifetime. Exposed
    /// <c>internal</c> for late-binding consumers (CAP-004 perform-restore,
    /// CAP-005 compare-backup-file, CAP-010 close-restore-session, CAP-024
    /// compare-source-content) that look up sessions by id.
    /// </summary>
    internal RestoreSessionRegistry SessionRegistry { get; } = new();

    /// <summary>
    /// Test seam — replace the default Restorer construction with a factory of
    /// <see cref="IRestorerHandle"/>. Mirrors
    /// <c>BackupOrchestrator.PersistChangesOverride</c> precedent. Tests set
    /// this in <c>[SetUp]</c> and reset to <c>null</c> in
    /// <c>[TearDown]</c>. Production code MUST NOT touch this.
    /// </summary>
    /// <remarks>
    /// The factory receives the resolved absolute path and returns an
    /// <see cref="IRestorerHandle"/> (IDisposable + metadata builder). When
    /// <c>null</c>, the default factory (real ZIP open) is used.
    /// </remarks>
    internal static Func<string, IRestorerHandle>? RestorerFactoryOverride { get; set; }

    /// <summary>
    /// Wire entry point for M-002 openRestoreSession (data-contracts.md §4.2).
    /// Constructs a <see cref="IRestorerHandle"/> over the backup ZIP at
    /// <paramref name="request"/>'s <c>ZipPath</c>, projects its metadata,
    /// registers a session in
    /// <see cref="SessionRegistry"/>, and returns the
    /// <see cref="RestoreSessionResult.Success"/> envelope. On any open failure
    /// returns the corresponding
    /// <see cref="RestoreSessionResult.Error"/> envelope — no exceptions cross
    /// the wire boundary per data-contracts.md §3.2 / §4.2.
    /// </summary>
    /// <param name="request">Open-session request payload. See
    /// <see cref="OpenRestoreSessionRequest"/>.</param>
    /// <param name="cancellationToken">Cancellation token from the JSON-RPC
    /// dispatcher. Currently unused — open is synchronous and short. Reserved
    /// for future asynchronicity (e.g., streaming large-ZIP open).</param>
    /// <returns>One of
    /// <see cref="RestoreSessionResult.Success"/> (session registered,
    /// metadata included) or
    /// <see cref="RestoreSessionResult.Error"/> (no session created).</returns>
    public Task<RestoreSessionResult> OpenRestoreSessionAsync(
        OpenRestoreSessionRequest request,
        CancellationToken cancellationToken = default
    )
    {
        _ = request;
        _ = cancellationToken;
        // STUB: CAP-003 RED state. Implementer will:
        //   1. Guard zipPath non-empty AND File.Exists(zipPath) → Error
        //      (MissingBackupFile, "%restore_missingBackupFile%", [zipPath])
        //   2. Resolve factory = RestorerFactoryOverride ?? DefaultRestorerFactory
        //   3. try {
        //          handle = factory(absoluteZipPath);
        //          metadata = handle.BuildMetadata(...);
        //          sessionId = SessionRegistry.Open(handle, metadata);
        //          return Success(sessionId, metadata);
        //      }
        //      catch (ZipException) {
        //          return Error(InvalidBackupFile, "%restore_invalidBackupFile%");
        //      }
        //      catch (FileNotFoundException) {
        //          return Error(MissingBackupFile, "%restore_missingBackupFile%");
        //      }
        //      catch (IOException) {
        //          return Error(IoError, "%restore_ioError%");
        //      }
        //   4. return Task.FromResult(result)
        throw new NotImplementedException(
            "OpenRestoreSessionAsync not implemented yet — CAP-003 GREEN."
        );
    }
}
