using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using ICSharpCode.SharpZipLib.Zip;
using Paranext.DataProvider.BackupRestore;

namespace TestParanextDataProvider.BackupRestore
{
    // === TEST SCOPE ===
    // CAP-003 OUTER acceptance tests for `OpenRestoreSessionAsync` (M-002) on the
    // wire-facade `BackupRestoreDataProvider`. Outside-In TDD: the OUTER tests pin
    // the wire envelope contract (data-contracts.md §4.2); INNER tests in
    // RestoreSessionRegistryTests.cs pin the registry.
    //
    // Test seam: BackupRestoreDataProvider.RestorerFactoryOverride. Tests inject a
    // fake Func<string, IRestorerHandle> that returns canned RestorerMetadata +
    // tracks dispose. ONE test goes through the default factory with a real
    // corrupt-ZIP fixture (gm-014/input-corrupt.zip) to validate the end-to-end
    // error-classification path.
    //
    // Wire-layer responsibilities (per data-contracts.md §4.2):
    //   (1) Precondition: File.Exists(zipPath)   → MissingBackupFile envelope
    //   (2) Restorer ctor success                → Success envelope (sessionId
    //                                              + metadata), session registered
    //   (3) Restorer ctor throws ZipException    → InvalidBackupFile envelope
    //                                              (gm-014 / gm-025 wire-side)
    //   (4) Restorer ctor throws FileNotFound    → MissingBackupFile envelope
    //   (5) Restorer ctor throws IOException     → IoError envelope
    //   (6) On success, registry.Get(returnedId) returns the same session
    //   (7) On error, registry.Count is unchanged
    //
    // RED-state expectation: every test fails because
    // BackupRestoreDataProvider.OpenRestoreSessionAsync throws
    // NotImplementedException.

    internal partial class BackupRestoreDataProviderTests
    {
        // =====================================================================
        // OUTER ACCEPTANCE TEST — must pass for CAP-003 to be considered done.
        // =====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-104")]
        [Property("ScenarioId", "TS-015")]
        [Property("SpecId", "spec-004")]
        public async Task OpenRestoreSession_HappyPath_ReturnsSuccessWithSessionIdAndMetadata()
        {
            // Arrange — fake Restorer factory returns canned metadata. The wire
            // layer constructs a session via the factory, projects metadata, and
            // returns Success with the registry-minted sessionId.
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "happy.zip"));
            var cannedMetadata = new RestorerMetadata
            {
                FilePath = zipPath,
                Description = "Happy path",
                ProjectName = "HAPPY",
                ProjectGuid = "abcdef0123456789",
                IsLegacyBackup = false,
                SharedProjectMarkers = false,
                AllFiles = new[]
                {
                    new RestoreFileEntry
                    {
                        Id = "F-GEN",
                        SourceDisplayName = "01GENHAPPY.SFM",
                        DestinationDisplayName = null,
                        ComparisonResult = ComparisonResult.DestDoesNotExist,
                        IsNormallyRestored = true,
                        CanViewDifferences = false,
                        TooltipKey = "RestoreForm_18",
                        SourceCrc = 0x12345678u,
                        DestinationCrc = null,
                    },
                },
                HasFigures = false,
            };
            var fakeRestorer = new FakeRestorerHandle(cannedMetadata);
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var request = new OpenRestoreSessionRequest { ZipPath = zipPath };

            // Act
            RestoreSessionResult result = await _provider.OpenRestoreSessionAsync(request);

            // Assert — Success envelope
            Assert.That(
                result,
                Is.InstanceOf<RestoreSessionResult.Success>(),
                "Wire layer returns Success envelope when Restorer construction succeeds"
            );
            var success = (RestoreSessionResult.Success)result;
            Assert.That(
                Regex.IsMatch(success.SessionId, "^[0-9a-f]{12}$"),
                Is.True,
                $"sessionId is 12 lowercase hex chars; was '{success.SessionId}'"
            );
            Assert.That(
                success.Metadata,
                Is.SameAs(cannedMetadata),
                "Success.Metadata is the projection the IRestorerHandle produced"
            );
            Assert.That(success.Metadata.AllFiles, Has.Count.EqualTo(1));
            Assert.That(success.Metadata.AllFiles[0].Id, Is.EqualTo("F-GEN"));
        }

        // =====================================================================
        // Session registration — Success path registers in registry for lookup
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-104")]
        [Property("ScenarioId", "TS-015")]
        [Description(
            "After OpenRestoreSession success, registry.Get(returnedSessionId) returns a live RestoreSession the next wire call can fetch (CAP-004 / CAP-005 lookup precondition)"
        )]
        public async Task OpenRestoreSession_HappyPath_RegistersSessionInRegistryForLaterLookup()
        {
            // Arrange
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "register.zip"));
            var cannedMetadata = MakeBareMetadata(zipPath);
            var fakeRestorer = new FakeRestorerHandle(cannedMetadata);
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            // Act
            RestoreSessionResult result = await _provider.OpenRestoreSessionAsync(
                new OpenRestoreSessionRequest { ZipPath = zipPath }
            );

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreSessionResult.Success>());
            var success = (RestoreSessionResult.Success)result;

            RestoreSession? session = _provider.SessionRegistry.Get(success.SessionId);
            Assert.That(session, Is.Not.Null, "Session is registered with the minted id");
            Assert.That(session!.SessionId, Is.EqualTo(success.SessionId));
            Assert.That(session.Metadata, Is.SameAs(cannedMetadata));
            Assert.That(
                _provider.SessionRegistry.Count,
                Is.EqualTo(1),
                "Registry holds exactly one session"
            );
        }

        // =====================================================================
        // Error path — MissingBackupFile (TS-017)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-313")]
        [Property("ScenarioId", "TS-017")]
        [Description(
            "Path does not exist on disk → Error(MissingBackupFile, %restore_missingBackupFile%); no session created (data-contracts.md §4.2 error matrix)"
        )]
        public async Task OpenRestoreSession_MissingFile_ReturnsErrorMissingBackupFile()
        {
            // Arrange — non-existent path. RestorerFactoryOverride is null so the
            // wire-layer's File.Exists precondition fires first; the factory is
            // never invoked.
            string missingPath = Path.Combine(_testTempDir, "does-not-exist.zip");
            Assert.That(File.Exists(missingPath), Is.False, "Pre-condition: file absent");

            var request = new OpenRestoreSessionRequest { ZipPath = missingPath };

            // Act
            RestoreSessionResult result = await _provider.OpenRestoreSessionAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreSessionResult.Error>());
            var err = (RestoreSessionResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(RestoreSessionErrorCode.MissingBackupFile));
            Assert.That(err.ErrorKey, Is.EqualTo("%restore_missingBackupFile%"));
            Assert.That(
                _provider.SessionRegistry.Count,
                Is.EqualTo(0),
                "No session created on missing-file error"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-313")]
        [Description(
            "Empty zipPath → Error(MissingBackupFile, %restore_missingBackupFile%) — the precondition File.Exists check fires first (data-contracts.md §2.2 'Non-empty; file must exist')"
        )]
        public async Task OpenRestoreSession_EmptyZipPath_ReturnsErrorMissingBackupFile()
        {
            // Arrange
            var request = new OpenRestoreSessionRequest { ZipPath = string.Empty };

            // Act
            RestoreSessionResult result = await _provider.OpenRestoreSessionAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreSessionResult.Error>());
            var err = (RestoreSessionResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(RestoreSessionErrorCode.MissingBackupFile));
            Assert.That(err.ErrorKey, Is.EqualTo("%restore_missingBackupFile%"));
        }

        // =====================================================================
        // Error path — InvalidBackupFile (TS-016, gm-014, gm-025 backend half)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-104")]
        [Property("ScenarioId", "TS-016")]
        [Description(
            "Test-seam Restorer factory throws ZipException → Error(InvalidBackupFile, %restore_invalidBackupFile%). React UI maps the wire key to RestoreForm_31 alert (gm-025 backend half; backend-alignment.md §584-592 PT9-keys-to-PT10-key fold)"
        )]
        public async Task OpenRestoreSession_CorruptZip_ReturnsErrorInvalidBackupFile()
        {
            // Arrange — factory throws on construct
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "fake-corrupt.zip"));
            BackupRestoreDataProvider.RestorerFactoryOverride = _ =>
                throw new ZipException("Cannot find central directory");

            // Act
            RestoreSessionResult result = await _provider.OpenRestoreSessionAsync(
                new OpenRestoreSessionRequest { ZipPath = zipPath }
            );

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreSessionResult.Error>());
            var err = (RestoreSessionResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(RestoreSessionErrorCode.InvalidBackupFile));
            Assert.That(err.ErrorKey, Is.EqualTo("%restore_invalidBackupFile%"));
            Assert.That(
                _provider.SessionRegistry.Count,
                Is.EqualTo(0),
                "No session created when factory throws"
            );
        }

        [Test]
        [Category("Contract")]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-104")]
        [Property("ScenarioId", "TS-016")]
        [Property("GoldenMaster", "gm-014")]
        [Description(
            "gm-014: real corrupt-ZIP fixture (input-corrupt.zip) routed through the DEFAULT Restorer factory produces Error(InvalidBackupFile). End-to-end verification that the default factory's exception classification maps PT9-era ZipException to the wire-stable error code."
        )]
        public async Task OpenRestoreSession_CorruptZip_GoldenMaster_gm014_ReturnsErrorInvalidBackupFile()
        {
            // Arrange — copy the gm-014 corrupt ZIP into the test temp dir so we
            // don't hold the golden-master fixture open across tests.
            string gmDir = LocateGoldenMasterDir("gm-014-restorer-corrupt-zip");
            string corruptZipSource = Path.Combine(gmDir, "input-corrupt.zip");
            Assert.That(
                File.Exists(corruptZipSource),
                Is.True,
                $"Pre-condition: gm-014 corrupt-zip fixture exists at {corruptZipSource}"
            );

            string corruptZip = Path.Combine(_testTempDir, "gm-014-corrupt.zip");
            File.Copy(corruptZipSource, corruptZip);

            // No RestorerFactoryOverride — default factory exercises the real ZIP
            // open path that gm-014's expectedOutput.json captures
            // (ICSharpCode.SharpZipLib.Zip.ZipException "Cannot find central directory").
            BackupRestoreDataProvider.RestorerFactoryOverride = null;

            // Act
            RestoreSessionResult result = await _provider.OpenRestoreSessionAsync(
                new OpenRestoreSessionRequest { ZipPath = corruptZip }
            );

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreSessionResult.Error>());
            var err = (RestoreSessionResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(RestoreSessionErrorCode.InvalidBackupFile),
                "gm-014's ZipException maps to InvalidBackupFile"
            );
            Assert.That(err.ErrorKey, Is.EqualTo("%restore_invalidBackupFile%"));
            Assert.That(
                _provider.SessionRegistry.Count,
                Is.EqualTo(0),
                "gm-014 corrupt-zip leaves no session in the registry"
            );
        }

        // =====================================================================
        // Error path — IoError (generic IO failure)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-507")]
        [Description(
            "Test-seam Restorer factory throws IOException (NOT ZipException / FileNotFound) → Error(IoError, %restore_ioError%). Catches the residue not classified above per data-contracts.md §4.2 error matrix"
        )]
        public async Task OpenRestoreSession_GenericIoError_ReturnsErrorIoError()
        {
            // Arrange — factory throws an unclassified IOException
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "io-fail.zip"));
            BackupRestoreDataProvider.RestorerFactoryOverride = _ =>
                throw new IOException("Network drive disconnected");

            // Act
            RestoreSessionResult result = await _provider.OpenRestoreSessionAsync(
                new OpenRestoreSessionRequest { ZipPath = zipPath }
            );

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreSessionResult.Error>());
            var err = (RestoreSessionResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(RestoreSessionErrorCode.IoError));
            Assert.That(err.ErrorKey, Is.EqualTo("%restore_ioError%"));
            Assert.That(
                _provider.SessionRegistry.Count,
                Is.EqualTo(0),
                "No session created on IO error"
            );
        }

        // =====================================================================
        // Error path — Factory throws after allocation (defensive — no leak)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("InvariantId", "INV-REGISTRY-LEAK")]
        [Description(
            "Even when the Restorer factory throws AFTER allocating its IDisposable handle, no session is registered (the wire-layer must catch the exception before insertion)"
        )]
        public async Task OpenRestoreSession_FactoryThrowsAfterAllocation_DoesNotLeakSession()
        {
            // Arrange — factory allocates a fake handle but then throws before
            // returning it. We simulate this by throwing from inside the lambda
            // after creating a handle (the handle just goes out of scope and is
            // GC'd; what matters is no session ends up in the registry).
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "leak.zip"));
            int factoryInvocations = 0;
            BackupRestoreDataProvider.RestorerFactoryOverride = path =>
            {
                factoryInvocations++;
                _ = new FakeRestorerHandle(MakeBareMetadata(path)); // allocated then orphaned
                throw new ZipException("Crash after allocation");
            };

            // Act
            RestoreSessionResult result = await _provider.OpenRestoreSessionAsync(
                new OpenRestoreSessionRequest { ZipPath = zipPath }
            );

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreSessionResult.Error>());
            Assert.That(factoryInvocations, Is.EqualTo(1), "Factory invoked exactly once");
            Assert.That(
                _provider.SessionRegistry.Count,
                Is.EqualTo(0),
                "No session registered when factory throws"
            );
        }

        // =====================================================================
        // Metadata projection — happy-path FilePath reflects request
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-104")]
        [Property("ScenarioId", "TS-015")]
        [Description(
            "Success.Metadata.FilePath reflects the request's ZipPath (the IRestorerHandle's BuildMetadata sees the resolved path)"
        )]
        public async Task OpenRestoreSession_MetadataReflectsRequestPath()
        {
            // Arrange
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "path-reflect.zip"));
            string capturedPath = string.Empty;
            BackupRestoreDataProvider.RestorerFactoryOverride = path =>
            {
                capturedPath = path;
                return new FakeRestorerHandle(MakeBareMetadata(path));
            };

            // Act
            RestoreSessionResult result = await _provider.OpenRestoreSessionAsync(
                new OpenRestoreSessionRequest { ZipPath = zipPath }
            );

            // Assert
            Assert.That(result, Is.InstanceOf<RestoreSessionResult.Success>());
            var success = (RestoreSessionResult.Success)result;
            Assert.That(
                capturedPath,
                Is.EqualTo(zipPath),
                "Factory was invoked with the request's ZipPath"
            );
            Assert.That(success.Metadata.FilePath, Is.EqualTo(zipPath));
        }

        // =====================================================================
        // Helpers (RestoreSession test-only)
        // =====================================================================

        /// <summary>
        /// Writes a minimal valid ZIP file (one entry containing "x") at the
        /// requested path. Used by tests that need a "file on disk" to satisfy
        /// the File.Exists precondition without exercising the real Restorer
        /// open path (the test-seam factory takes over from there).
        /// </summary>
        private static string WriteEmptyZip(string zipPath)
        {
            using (var fs = File.Create(zipPath))
            using (var archive = new ZipArchive(fs, ZipArchiveMode.Create))
            {
                var entry = archive.CreateEntry("placeholder.txt");
                using var sw = new StreamWriter(entry.Open());
                sw.Write("x");
            }
            return zipPath;
        }

        private static RestorerMetadata MakeBareMetadata(string filePath)
        {
            return new RestorerMetadata
            {
                FilePath = filePath,
                Description = string.Empty,
                ProjectName = "TEST",
                ProjectGuid = null,
                IsLegacyBackup = false,
                SharedProjectMarkers = false,
                AllFiles = Array.Empty<RestoreFileEntry>(),
                HasFigures = false,
            };
        }

        private static string LocateGoldenMasterDir(string gmName)
        {
            const string relPath = ".context/features/project-backup-and-restore/golden-masters";
            var current = new DirectoryInfo(AppContext.BaseDirectory);
            while (current != null)
            {
                var candidate = Path.Combine(current.FullName, relPath, gmName);
                if (Directory.Exists(candidate))
                    return candidate;
                current = current.Parent;
            }
            throw new DirectoryNotFoundException(
                $"Golden master '{gmName}' not found by walking up from '{AppContext.BaseDirectory}'."
                    + $" Expected at '<repo>/{relPath}/{gmName}'."
            );
        }

        /// <summary>
        /// Fake IRestorerHandle for wire-layer tests. Returns the canned metadata
        /// supplied at construction; tracks dispose-call count for assertions.
        /// </summary>
        private sealed class FakeRestorerHandle : IRestorerHandle
        {
            private readonly RestorerMetadata _metadata;
            private int _disposeCount;

            public FakeRestorerHandle(RestorerMetadata metadata)
            {
                _metadata = metadata;
            }

            public int DisposeCount => _disposeCount;

            public RestorerMetadata BuildMetadata(string? preferredDestinationProjectId) =>
                _metadata;

            public void Dispose() => _disposeCount++;

            // CAP-004 added PerformOverlayRestore to IRestorerHandle. CAP-003's tests
            // never invoke it; this stub keeps the interface satisfied. CAP-004's tests
            // use a dedicated CAP004_FakeRestorerHandle (declared in the CAP-004 test
            // fragment) which IS exercised through PerformOverlayRestore.
            public RestoreOverlayOutcome PerformOverlayRestore(
                Paratext.Data.ScrText destination,
                RestoreOverlayRequest request
            )
            {
                _ = destination;
                _ = request;
                throw new System.NotSupportedException(
                    "CAP-003 FakeRestorerHandle does not implement PerformOverlayRestore — use CAP004_FakeRestorerHandle in CAP-004 tests."
                );
            }
        }
    }
}
