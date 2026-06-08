using System;
using ICSharpCode.SharpZipLib.Zip;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: Default factory implementation of IRestorerHandle for the wire layer
//   (BackupRestoreDataProvider.OpenRestoreSessionAsync). PT9's `Restorer` class
//   lives in `Paratext.exe`, not `ParatextData.dll`, so PT10 cannot reuse it
//   directly. The strategic plan offered two paths for the default factory:
//     (a) Port the full PT9 Restorer + SimpleZipFileManager from Paratext.exe.
//     (b) Build a minimum-surface IRestorerHandle over SharpZipLib's ZipFile.
//
//   CAP-003 chooses (b) — the only acceptance test that exercises the default
//   factory is the gm-014 corrupt-ZIP test (verifies ZipException → wire-stable
//   InvalidBackupFile code). Beyond opening the ZIP and propagating the right
//   exception, CAP-003 needs no Restorer behavior. Later capabilities (CAP-004
//   perform-restore, CAP-005 compare-backup-file) will extend or replace this
//   handle as their own tests demand richer projection.
//
//   This keeps the GREEN-state implementation strictly minimal — TDD discipline:
//   write only enough code to make the failing tests pass.
//
// Wire contract (IRestorerHandle):
//   * IDisposable                              — owns the ZipFile lifetime
//   * BuildMetadata(string?) -> RestorerMetadata  — minimum-viable metadata
//                                                   (FilePath only; richer
//                                                   projection deferred)
//
// gm-014 behavior: ICSharpCode.SharpZipLib.Zip.ZipFile's ctor reads the
// central directory eagerly; on a corrupt ZIP it throws
// ICSharpCode.SharpZipLib.Zip.ZipException("Cannot find central directory"),
// which the wire layer's catch(ZipException) clause maps to
// RestoreSessionErrorCode.InvalidBackupFile per data-contracts.md §4.2.
//
// Maps to: data-contracts.md §4.2 (M-002 openRestoreSession default factory);
//          strategic-plan-backend.md §CAP-003 (factory implementation choice).

/// <summary>
/// Default <see cref="IRestorerHandle"/> implementation that opens a backup
/// ZIP via SharpZipLib's <see cref="ZipFile"/>. Used by
/// <see cref="BackupRestoreDataProvider.OpenRestoreSessionAsync"/> when no
/// test-seam <c>RestorerFactoryOverride</c> is set.
/// </summary>
/// <remarks>
/// <para>
/// Minimum-surface CAP-003 implementation: opens the ZIP eagerly (so corrupt
/// ZIPs throw <see cref="ZipException"/> on construct — exactly the gm-014
/// behavior) and returns a minimum-viable
/// <see cref="RestorerMetadata"/> with <see cref="RestorerMetadata.FilePath"/>
/// set to the requested path. Richer projection (ProjectName, Description,
/// AllFiles, etc.) is deferred to later capabilities that extend this handle
/// as their own tests demand.
/// </para>
/// </remarks>
internal sealed class DefaultRestorerHandle : IRestorerHandle
{
    private readonly string _zipPath;
    private readonly ZipFile _zipFile;
    private bool _disposed;

    /// <summary>
    /// Open the ZIP at <paramref name="zipPath"/>. Throws
    /// <see cref="ZipException"/> on a corrupt ZIP (gm-014 path);
    /// <see cref="System.IO.FileNotFoundException"/> if the file does not exist
    /// (defensive against race vs file deletion — the wire-layer's File.Exists
    /// precondition fires first); <see cref="System.IO.IOException"/> for other
    /// IO failures. All three are classified by the wire layer per the
    /// data-contracts.md §4.2 error matrix.
    /// </summary>
    /// <param name="zipPath">Absolute path to the backup ZIP.</param>
    public DefaultRestorerHandle(string zipPath)
    {
        _zipPath = zipPath;
        _zipFile = new ZipFile(zipPath);
    }

    /// <summary>
    /// Minimum-viable per-session metadata projection (CAP-003 only):
    /// <see cref="RestorerMetadata.FilePath"/> reflects the open path; all
    /// other fields are record defaults. Later capabilities will extend this
    /// to project full ZIP metadata.
    /// </summary>
    /// <param name="preferredDestinationProjectId">Unused at CAP-003; reserved
    /// for the comparison-precomputation work owned by CAP-004 / CAP-005.</param>
    public RestorerMetadata BuildMetadata(string? preferredDestinationProjectId)
    {
        _ = preferredDestinationProjectId;
        return new RestorerMetadata { FilePath = _zipPath };
    }

    /// <summary>
    /// Closes the underlying <see cref="ZipFile"/>. Idempotent.
    /// </summary>
    public void Dispose()
    {
        if (_disposed)
            return;
        _disposed = true;
        _zipFile.Close();
    }

    /// <summary>
    /// CAP-004 RED-state stub. The full PT9 <c>Restorer.PerformRestore</c>
    /// port lives here in GREEN; for now the default factory throws so the
    /// CAP-004 wire-layer unit tests (which use <c>FakeRestorerHandle</c>
    /// injected via <c>BackupRestoreDataProvider.RestorerFactoryOverride</c>)
    /// cover the contract without depending on the real port.
    /// </summary>
    public RestoreOverlayOutcome PerformOverlayRestore(
        ScrText destination,
        RestoreOverlayRequest request
    )
    {
        _ = destination;
        _ = request;
        throw new NotImplementedException(
            "DefaultRestorerHandle.PerformOverlayRestore not implemented yet — CAP-004 GREEN."
                + " Port PT9 Restorer.PerformRestore (Restorer.cs:144-199) here, honoring"
                + " INV-A13 (legacy-skip-list augmentation) when request.IsLegacyBackup."
        );
    }

    /// <summary>
    /// CAP-024 stub. The full PT9 IGetText port lives here in a future GREEN;
    /// for now the default factory throws so the CAP-024 wire-layer / resolver
    /// tests (which use a test-seam <see cref="IRestorerHandle"/> injected via
    /// <see cref="BackupRestoreDataProvider.RestorerFactoryOverride"/>)
    /// cover the contract without depending on the real port. Mirrors the
    /// CAP-004 RED-state pattern for <see cref="PerformOverlayRestore"/>.
    /// </summary>
    public string ReadFileText(string fileName, VerseRef verseRef, bool singleChapter)
    {
        _ = fileName;
        _ = verseRef;
        _ = singleChapter;
        throw new NotImplementedException(
            "DefaultRestorerHandle.ReadFileText not implemented yet — CAP-024 RED."
                + " Port PT9 IGetText.GetText-equivalent over SharpZipLib's ZipFile here"
                + " (extract entry stream, parse USFM, return chapter or whole-book text)."
        );
    }
}
