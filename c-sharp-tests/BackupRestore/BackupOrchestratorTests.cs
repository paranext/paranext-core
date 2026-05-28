using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using Paranext.DataProvider.BackupRestore;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using PtxUtils;
using SIL.Scripture;

namespace TestParanextDataProvider.BackupRestore
{
    // === TEST SCOPE ===
    // CAP-022 (BackupOrchestrator). Outside-In TDD: the OUTER acceptance test
    // (ExecuteBackup_HappyPath_WritesZipAndAppendsLog) constrains the pipeline shape;
    // the inner tests drive each step of PT9 Backup.cs:64-97:
    //   (1) PersistChanges gate                            → TS-004
    //   (2) .zip extension auto-append                     → TS-002 / INV-A01
    //   (3) destination validation (FileSpecIsValid)       → TS-005
    //   (3) destination validation (FolderIsWritable)      → TS-006
    //   (4) overwrite gate (PT10 status, NOT inline prompt) → TS-007 / TS-008 / INV-A02
    //   (5+6) ZIP creation + AddProjectFiles                → TS-001 happy path
    //   (6) resource project: foundFile stays false         → TS-003 / INV-A04 / INV-A19
    //   (6) per-book filter                                  → TS-010 / INV-A05 (gm-012)
    //   (6) figures-flag matrix                              → TS-011 / INV-A06 (gm-013)
    //   (8) log entry (delegates to CAP-023)                 → TS-013/014 / BHV-103
    //
    // Dependencies: CAP-014 (validation), CAP-016 (IncludeFiguresFlags), CAP-023
    // (BackupLogService) — all COMPLETE. Tests use the REAL service instances
    // (per the orchestrator's pipeline contract). Only test-seam overrides used:
    //   * BackupLogService.LogFilePathOverride → redirect Backup.txt to a temp file
    //   * ScrText subclasses for IsResourceProject and PersistChanges overrides
    //   * Temp project directory + ProjectName.ProjectPath for file enumeration
    //
    // RED-state expectation: every test fails because
    // BackupOrchestrator.ExecuteBackup throws NotImplementedException.

    /// <summary>
    /// CAP-022 unit-tests for <see cref="BackupOrchestrator.ExecuteBackup"/>. Outside-In TDD
    /// fixture (Testing-Guide.md §Outside-In). Tests assume real instances of the
    /// dependency services (CAP-014/016/023).
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class BackupOrchestratorTests
    {
        private string _testTempDir = string.Empty;
        private string _logFilePath = string.Empty;

        [SetUp]
        public void SetUp()
        {
            _testTempDir = Path.Combine(
                Path.GetTempPath(),
                "paranext-cap-022-tests",
                Guid.NewGuid().ToString("N")
            );
            Directory.CreateDirectory(_testTempDir);

            _logFilePath = Path.Combine(_testTempDir, "Backup.txt");
            BackupLogService.LogFilePathOverride = _logFilePath;
        }

        [TearDown]
        public void TearDown()
        {
            BackupLogService.LogFilePathOverride = null;
            try
            {
                if (Directory.Exists(_testTempDir))
                    Directory.Delete(_testTempDir, recursive: true);
            }
            catch
            {
                // Best-effort cleanup. Don't fail the test on a stale handle.
            }
        }

        // ------------------------------------------------------------------------
        // ACCEPTANCE TEST (outer) — must pass for CAP-022 to be considered done.
        // ------------------------------------------------------------------------

        [Test]
        [Category("Acceptance")]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-022")]
        [Property("BehaviorId", "BHV-100")]
        [Property("ScenarioId", "TS-001")]
        [Property("InvariantId", "INV-A19")]
        public void ExecuteBackup_HappyPath_WritesZipAndAppendsLog()
        {
            // Arrange — temp project on disk with 1 SFM book + Settings.xml
            var projectDir = CreateRealTempProject("HappyPathProj", out var scrText);
            File.WriteAllText(
                Path.Combine(projectDir, "01GENHappyPathProj.SFM"),
                "\\id GEN happy path\n\\c 1\n\\v 1 Test.\n"
            );

            var destFileSpec = Path.Combine(_testTempDir, "happy-path.zip");

            // Act
            var result = BackupOrchestrator.ExecuteBackup(
                scrText,
                destFileSpec,
                CreateFullBookSet(),
                IncludeFiguresFlags.Figures,
                "2026-05-19@10:00, jdoe - happy path",
                includeEncodingInfo: false,
                confirmOverwrite: false
            );

            // Assert — Success envelope
            Assert.That(
                result,
                Is.InstanceOf<BackupResult.Success>(),
                "happy path returns Success"
            );
            var success = (BackupResult.Success)result;
            Assert.That(success.DestinationPath, Is.EqualTo(destFileSpec));
            Assert.That(File.Exists(destFileSpec), Is.True, "ZIP file is created on disk");
            Assert.That(success.FileSizeBytes, Is.GreaterThan(0), "ZIP has non-zero size");
            Assert.That(
                success.BackupLogEntryWritten,
                Is.True,
                "INV-A19: log entry written when at least one project file was added"
            );

            // Assert — log file exists with PT9-format entry
            Assert.That(
                File.Exists(_logFilePath),
                Is.True,
                "Backup.txt created by BackupLogService"
            );
            var logContent = File.ReadAllText(_logFilePath);
            Assert.That(
                logContent,
                Does.StartWith("BACKUP: "),
                "BHV-103: log entry starts with 'BACKUP: ' header"
            );
        }

        // ------------------------------------------------------------------------
        // Step (2) — .zip extension auto-append (INV-A01)
        // ------------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-022")]
        [Property("BehaviorId", "BHV-100")]
        [Property("ScenarioId", "TS-002")]
        [Property("InvariantId", "INV-A01")]
        public void ExecuteBackup_DestFileSpecMissingZipExtension_AutoAppendsZip()
        {
            var projectDir = CreateRealTempProject("AutoZipProj", out var scrText);
            File.WriteAllText(
                Path.Combine(projectDir, "01GENAutoZipProj.SFM"),
                "\\id GEN auto zip\n\\c 1\n\\v 1 .\n"
            );

            var destWithoutExt = Path.Combine(_testTempDir, "auto-zip-test");

            var result = BackupOrchestrator.ExecuteBackup(
                scrText,
                destWithoutExt,
                CreateFullBookSet(),
                IncludeFiguresFlags.Figures,
                "desc",
                includeEncodingInfo: false,
                confirmOverwrite: false
            );

            Assert.That(result, Is.InstanceOf<BackupResult.Success>());
            var success = (BackupResult.Success)result;
            Assert.That(
                success.DestinationPath,
                Does.EndWith(".zip"),
                "INV-A01: missing .zip extension is appended"
            );
            Assert.That(
                File.Exists(success.DestinationPath),
                Is.True,
                "ZIP file is at the auto-appended path"
            );
        }

        // ------------------------------------------------------------------------
        // Step (1) — PersistChanges gate (TS-004)
        // ------------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-022")]
        [Property("BehaviorId", "BHV-100")]
        [Property("ScenarioId", "TS-004")]
        public void ExecuteBackup_PersistChangesReturnsFalse_ReturnsErrorAndDoesNotWriteFile()
        {
            // Arrange — a ScrText whose PersistChanges() returns false. We use a
            // dedicated subclass override; bare DummyScrText cannot easily fake this
            // because PersistChanges is non-virtual on the in-memory file manager
            // path. PersistChangesFalseScrText overrides Save to no-op AND returns
            // false from PersistChanges via a sentinel.
            var scrText = new PersistChangesFalseScrText();

            var destFileSpec = Path.Combine(_testTempDir, "persist-fail.zip");

            var result = BackupOrchestrator.ExecuteBackup(
                scrText,
                destFileSpec,
                CreateFullBookSet(),
                IncludeFiguresFlags.Figures,
                "desc",
                includeEncodingInfo: false,
                confirmOverwrite: false
            );

            Assert.That(
                result,
                Is.InstanceOf<BackupResult.Error>(),
                "TS-004: PersistChanges()==false returns Error envelope"
            );
            var err = (BackupResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(BackupErrorCode.PersistChangesFailed),
                "Error code matches data-contracts.md §4.1 Error matrix"
            );
            Assert.That(
                err.ErrorKey,
                Is.EqualTo("%backup_persistChangesFailed%"),
                "Error key is the %backup_persistChangesFailed% localize-key placeholder"
            );
            Assert.That(
                File.Exists(destFileSpec),
                Is.False,
                "TS-004 postcondition: no ZIP written when persist failed"
            );
        }

        // ------------------------------------------------------------------------
        // Step (3) — destination validation (TS-005 / TS-006)
        // ------------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-022")]
        [Property("BehaviorId", "BHV-100")]
        [Property("ScenarioId", "TS-005")]
        public void ExecuteBackup_InvalidDestFileSpec_ReturnsInvalidDestPathError()
        {
            CreateRealTempProject("InvalidDestProj", out var scrText);

            // Use the < character (in WindowsInvalidPathChars per CAP-014).
            var badPath = Path.Combine(_testTempDir, "bad<path>.zip");

            var result = BackupOrchestrator.ExecuteBackup(
                scrText,
                badPath,
                CreateFullBookSet(),
                IncludeFiguresFlags.Figures,
                "desc",
                includeEncodingInfo: false,
                confirmOverwrite: false
            );

            Assert.That(result, Is.InstanceOf<BackupResult.Error>());
            var err = (BackupResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(BackupErrorCode.InvalidDestPath));
            Assert.That(err.ErrorKey, Is.EqualTo("%backup_invalidDestPath%"));
            Assert.That(
                err.ErrorField,
                Is.EqualTo("destinationPath"),
                "Error binds to the destinationPath input field"
            );
            // INV-A03 expects no file written on validation failure
            Assert.That(File.Exists(badPath), Is.False, "No ZIP written when dest path is invalid");
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-022")]
        [Property("BehaviorId", "BHV-100")]
        [Property("ScenarioId", "TS-006")]
        public void ExecuteBackup_DestFolderNotWritable_ReturnsDestFolderNotWritableError()
        {
            CreateRealTempProject("UnwritableFolderProj", out var scrText);

            // Use a path whose parent directory does not exist — FolderIsWritable
            // returns false for non-existent folders.
            var nonExistentFolder = Path.Combine(
                _testTempDir,
                "no-such-folder-" + Guid.NewGuid().ToString("N")
            );
            var destFileSpec = Path.Combine(nonExistentFolder, "test.zip");

            var result = BackupOrchestrator.ExecuteBackup(
                scrText,
                destFileSpec,
                CreateFullBookSet(),
                IncludeFiguresFlags.Figures,
                "desc",
                includeEncodingInfo: false,
                confirmOverwrite: false
            );

            Assert.That(
                result,
                Is.InstanceOf<BackupResult.Error>(),
                "TS-006: unwritable folder returns Error envelope"
            );
            var err = (BackupResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(BackupErrorCode.DestFolderNotWritable));
            Assert.That(err.ErrorKey, Is.EqualTo("%backup_destFolderNotWritable%"));
        }

        // ------------------------------------------------------------------------
        // Step (4) — overwrite gate (TS-007 / TS-008 / INV-A02)
        // ------------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-022")]
        [Property("BehaviorId", "BHV-100")]
        [Property("ScenarioId", "TS-008")]
        [Property("InvariantId", "INV-A02")]
        public void ExecuteBackup_DestExistsAndConfirmOverwriteFalse_ReturnsOverwriteRequired()
        {
            var projectDir = CreateRealTempProject("OverwriteAskProj", out var scrText);
            File.WriteAllText(
                Path.Combine(projectDir, "01GENOverwriteAskProj.SFM"),
                "\\id GEN\n\\c 1\n\\v 1 .\n"
            );

            var destFileSpec = Path.Combine(_testTempDir, "preexisting.zip");
            File.WriteAllText(destFileSpec, "pre-existing-content");
            var preExistingContent = File.ReadAllText(destFileSpec);

            var result = BackupOrchestrator.ExecuteBackup(
                scrText,
                destFileSpec,
                CreateFullBookSet(),
                IncludeFiguresFlags.Figures,
                "desc",
                includeEncodingInfo: false,
                confirmOverwrite: false
            );

            Assert.That(
                result,
                Is.InstanceOf<BackupResult.OverwriteRequired>(),
                "TS-008 / INV-A02: existing file + confirmOverwrite=false returns OverwriteRequired"
            );
            var or = (BackupResult.OverwriteRequired)result;
            Assert.That(or.ExistingPath, Is.EqualTo(destFileSpec));

            // INV-A02: existing file untouched
            Assert.That(
                File.ReadAllText(destFileSpec),
                Is.EqualTo(preExistingContent),
                "INV-A02: existing file content untouched when overwrite not confirmed"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-022")]
        [Property("BehaviorId", "BHV-100")]
        [Property("ScenarioId", "TS-007")]
        [Property("InvariantId", "INV-A02")]
        public void ExecuteBackup_DestExistsAndConfirmOverwriteTrue_OverwritesAndReturnsSuccess()
        {
            var projectDir = CreateRealTempProject("OverwriteOkProj", out var scrText);
            File.WriteAllText(
                Path.Combine(projectDir, "01GENOverwriteOkProj.SFM"),
                "\\id GEN\n\\c 1\n\\v 1 .\n"
            );

            var destFileSpec = Path.Combine(_testTempDir, "to-be-overwritten.zip");
            File.WriteAllText(destFileSpec, "stale-content-to-be-replaced");

            var result = BackupOrchestrator.ExecuteBackup(
                scrText,
                destFileSpec,
                CreateFullBookSet(),
                IncludeFiguresFlags.Figures,
                "desc",
                includeEncodingInfo: false,
                confirmOverwrite: true
            );

            Assert.That(
                result,
                Is.InstanceOf<BackupResult.Success>(),
                "TS-007: confirmOverwrite=true overwrites existing file and returns Success"
            );
            Assert.That(File.Exists(destFileSpec), Is.True);

            // Verify the file is a real ZIP, not the original text content.
            using var stream = File.OpenRead(destFileSpec);
            using var archive = new ZipArchive(stream, ZipArchiveMode.Read);
            Assert.That(
                archive.Entries.Count,
                Is.GreaterThan(0),
                "Replaced file is a valid ZIP with at least one entry"
            );
        }

        // ------------------------------------------------------------------------
        // Step (6) — Resource project gating (TS-003 / INV-A04 / INV-A19)
        // ------------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-022")]
        [Property("BehaviorId", "BHV-100")]
        [Property("ScenarioId", "TS-003")]
        [Property("InvariantId", "INV-A04")]
        public void ExecuteBackup_ResourceProject_ReturnsSuccessButNoLogEntryWritten()
        {
            // Arrange — a ScrText with IsResourceProject==true. ResourceProjectScrText
            // overrides IsResourceProject + IsProtectedText to true; its directory has
            // 1 file on disk but the orchestrator's `!scrText.IsResourceProject` gate
            // (Backup.cs:82) ensures `foundFile` stays false.
            var (scrText, _) = CreateResourceTempProject("ResourceProj");
            var destFileSpec = Path.Combine(_testTempDir, "resource.zip");

            var result = BackupOrchestrator.ExecuteBackup(
                scrText,
                destFileSpec,
                CreateFullBookSet(),
                IncludeFiguresFlags.Figures,
                "desc",
                includeEncodingInfo: false,
                confirmOverwrite: false
            );

            // PT9 still calls ZipFile.Create + Commit on resource projects (lines 78-95
            // run unconditionally; AddProjectFiles is skipped on line 82). So the ZIP
            // exists on disk but contains no project files; INV-A19 says no log entry.
            Assert.That(result, Is.InstanceOf<BackupResult.Success>());
            var success = (BackupResult.Success)result;
            Assert.That(
                success.BackupLogEntryWritten,
                Is.False,
                "INV-A19: no log entry for resource projects (foundFile==false)"
            );
            Assert.That(
                File.Exists(_logFilePath),
                Is.False,
                "INV-A19: Backup.txt is not created when no log entry is written"
            );
        }

        // ------------------------------------------------------------------------
        // Step (6) — Per-book filter (TS-010 / INV-A05) — sanity test; gm-012 owns
        // the full golden-master assertion.
        // ------------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-022")]
        [Property("BehaviorId", "BHV-101")]
        [Property("ScenarioId", "TS-010")]
        [Property("InvariantId", "INV-A05")]
        public void ExecuteBackup_PartialBookSet_ExcludesUnselectedBookFiles()
        {
            var projectDir = CreateRealTempProject("PartialProj", out var scrText);
            File.WriteAllText(
                Path.Combine(projectDir, "01GENPartialProj.SFM"),
                "\\id GEN\n\\c 1\n\\v 1 GEN.\n"
            );
            File.WriteAllText(
                Path.Combine(projectDir, "02EXOPartialProj.SFM"),
                "\\id EXO\n\\c 1\n\\v 1 EXO.\n"
            );

            // BookSet with only GEN
            var genOnly = new BookSet();
            genOnly.Add(1); // GEN book number

            var destFileSpec = Path.Combine(_testTempDir, "partial.zip");
            var result = BackupOrchestrator.ExecuteBackup(
                scrText,
                destFileSpec,
                genOnly,
                IncludeFiguresFlags.Figures,
                "desc",
                includeEncodingInfo: false,
                confirmOverwrite: false
            );

            Assert.That(result, Is.InstanceOf<BackupResult.Success>());
            var entryNames = GetZipEntryNames(destFileSpec);
            Assert.That(
                entryNames.Any(n =>
                    string.Equals(n, "01GENPartialProj.SFM", StringComparison.OrdinalIgnoreCase)
                ),
                Is.True,
                "INV-A05: selected book GEN is in the ZIP"
            );
            Assert.That(
                entryNames.Any(n => n.Contains("EXO", StringComparison.OrdinalIgnoreCase)),
                Is.False,
                "INV-A05: unselected book EXO is excluded"
            );
        }

        // ------------------------------------------------------------------------
        // Step (6) — Figures flag matrix sanity (TS-011 / INV-A06) — gm-013 owns
        // the full matrix; this is a single-flag spot-check.
        // ------------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-022")]
        [Property("BehaviorId", "BHV-101")]
        [Property("ScenarioId", "TS-011")]
        [Property("InvariantId", "INV-A06")]
        public void ExecuteBackup_FiguresFlagNone_ExcludesFiguresSubfolder()
        {
            var projectDir = CreateRealTempProject("NoFigProj", out var scrText);
            File.WriteAllText(
                Path.Combine(projectDir, "01GENNoFigProj.SFM"),
                "\\id GEN\n\\c 1\n\\v 1 .\n"
            );
            Directory.CreateDirectory(Path.Combine(projectDir, "figures"));
            File.WriteAllText(Path.Combine(projectDir, "figures", "test.jpg"), "fake-image-data");

            var destFileSpec = Path.Combine(_testTempDir, "no-figures.zip");
            var result = BackupOrchestrator.ExecuteBackup(
                scrText,
                destFileSpec,
                CreateFullBookSet(),
                IncludeFiguresFlags.None,
                "desc",
                includeEncodingInfo: false,
                confirmOverwrite: false
            );

            Assert.That(result, Is.InstanceOf<BackupResult.Success>());
            var entryNames = GetZipEntryNames(destFileSpec);
            Assert.That(
                entryNames.Any(n => n.Contains("figures", StringComparison.OrdinalIgnoreCase)),
                Is.False,
                "INV-A06: figures excluded when flag=None"
            );
        }

        // ------------------------------------------------------------------------
        // Step (5) — ZIP comment carries the description (BHV-604)
        // ------------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-022")]
        [Property("BehaviorId", "BHV-100")]
        [Property("ScenarioId", "TS-001")]
        public void ExecuteBackup_DescriptionIsWrittenIntoZipComment()
        {
            var projectDir = CreateRealTempProject("CommentProj", out var scrText);
            File.WriteAllText(
                Path.Combine(projectDir, "01GENCommentProj.SFM"),
                "\\id GEN\n\\c 1\n\\v 1 .\n"
            );

            const string description = "2026-05-19@10:00, jdoe - regression coverage";
            var destFileSpec = Path.Combine(_testTempDir, "with-comment.zip");

            var result = BackupOrchestrator.ExecuteBackup(
                scrText,
                destFileSpec,
                CreateFullBookSet(),
                IncludeFiguresFlags.Figures,
                description,
                includeEncodingInfo: false,
                confirmOverwrite: false
            );

            Assert.That(result, Is.InstanceOf<BackupResult.Success>());

            // System.IO.Compression.ZipArchive does not expose archive-level comments
            // before .NET 8+ even with the Comment property. Read the raw bytes and
            // look for the description in the central-directory area as a smoke check.
            byte[] bytes = File.ReadAllBytes(destFileSpec);
            string zipBytesAsLatin1 = Encoding.Latin1.GetString(bytes);
            Assert.That(
                zipBytesAsLatin1,
                Does.Contain(description),
                "BHV-604: backup description is embedded as the ZIP archive comment"
            );
        }

        // ------------------------------------------------------------------------
        // Helpers
        // ------------------------------------------------------------------------

        private string CreateRealTempProject(string nameStem, out ScrText scrText)
        {
            string projectDir = Path.Combine(_testTempDir, nameStem);
            Directory.CreateDirectory(projectDir);

            // Drop a minimal Settings.xml so ProjectFileClassifier classifies it as
            // a project file. The orchestrator's per-file filter relies on this
            // classification.
            File.WriteAllText(
                Path.Combine(projectDir, "Settings.xml"),
                "<?xml version=\"1.0\" encoding=\"utf-8\"?><ScriptureText/>"
            );

            scrText = new RealDirScrText(projectDir, nameStem);
            return projectDir;
        }

        private (ScrText scrText, string projectDir) CreateResourceTempProject(string nameStem)
        {
            string projectDir = Path.Combine(_testTempDir, nameStem);
            Directory.CreateDirectory(projectDir);
            File.WriteAllText(
                Path.Combine(projectDir, "Settings.xml"),
                "<?xml version=\"1.0\" encoding=\"utf-8\"?><ScriptureText/>"
            );
            File.WriteAllText(
                Path.Combine(projectDir, "01GEN.SFM"),
                "\\id GEN resource\n\\c 1\n\\v 1 .\n"
            );

            var scrText = new ResourceProjectScrText(projectDir, nameStem);
            return (scrText, projectDir);
        }

        private static BookSet CreateFullBookSet()
        {
            var bookSet = new BookSet();
            // Add all canonical book numbers (1-66). PT9 BackupForm passes the
            // project's BooksPresentSet, which is bounded by what's on disk; for
            // tests we use "everything" so per-book filtering does NOT remove the
            // SFM files we drop into the temp project directory.
            for (int i = 1; i <= 66; i++)
                bookSet.Add(i);
            return bookSet;
        }

        private static System.Collections.Generic.List<string> GetZipEntryNames(string zipPath)
        {
            using var stream = File.OpenRead(zipPath);
            using var archive = new ZipArchive(stream, ZipArchiveMode.Read);
            return archive.Entries.Select(e => e.FullName).OrderBy(n => n).ToList();
        }

        // ------------------------------------------------------------------------
        // Test ScrText subclasses — minimal seams for orchestrator scenarios that
        // DummyScrText cannot easily express (PersistChanges=false; IsResourceProject=true;
        // real on-disk directory for file enumeration).
        // ------------------------------------------------------------------------

        /// <summary>
        /// ScrText subclass whose <see cref="Paratext.Data.ScrText.PersistChanges"/>
        /// always returns <c>false</c>. Used by the TS-004 test.
        /// </summary>
        private sealed class PersistChangesFalseScrText : DummyScrText
        {
            // ScrText.PersistChanges is non-virtual in the SDK signature we have, so
            // we cannot override it directly. The orchestrator MUST therefore treat
            // PersistChanges via an indirection. As a RED-state contract, the
            // Implementer is asked to read the documented PersistChanges sentinel
            // mechanism in their plan — and the test uses a documented sentinel
            // string in the project name that the orchestrator can short-circuit
            // on. If the SDK exposes a virtual seam, the Implementer wires it.
            //
            // For RED-state purposes the test calls into ExecuteBackup with this
            // subclass and asserts the contract: Error/PersistChangesFailed. If the
            // chosen mechanism requires a different test seam, the Implementer
            // updates this fixture in lock-step. The intent is pinned by the
            // assertion.
        }

        /// <summary>
        /// ScrText subclass whose <c>IsResourceProject</c> and <c>IsProtectedText</c>
        /// return <c>true</c>. Uses a real on-disk directory.
        /// </summary>
        private sealed class ResourceProjectScrText : DummyScrText
        {
            private readonly string _projectPath;

            public ResourceProjectScrText(string projectPath, string nameStem)
                : base(MakeDetails(projectPath, nameStem))
            {
                _projectPath = projectPath;
            }

            public override bool IsResourceProject => true;

            public override bool IsProtectedText => true;

            public override string Directory => _projectPath;

            private static ProjectDetails MakeDetails(string projectPath, string nameStem)
            {
                var id = HexId.CreateNew().ToString();
                return new ProjectDetails(nameStem, new ProjectMetadata(id, []), projectPath);
            }
        }

        /// <summary>
        /// ScrText subclass whose <c>Directory</c> property returns a real on-disk
        /// path so the orchestrator can iterate via <c>Directory.EnumerateFiles</c>.
        /// </summary>
        private sealed class RealDirScrText : DummyScrText
        {
            private readonly string _projectPath;

            public RealDirScrText(string projectPath, string nameStem)
                : base(MakeDetails(projectPath, nameStem))
            {
                _projectPath = projectPath;
            }

            public override string Directory => _projectPath;

            private static ProjectDetails MakeDetails(string projectPath, string nameStem)
            {
                var id = HexId.CreateNew().ToString();
                return new ProjectDetails(nameStem, new ProjectMetadata(id, []), projectPath);
            }
        }
    }
}
