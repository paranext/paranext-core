using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;
using Paranext.DataProvider.BackupRestore;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using PtxUtils;
using SIL.Scripture;

namespace TestParanextDataProvider.BackupRestore
{
    // === TEST SCOPE ===
    // CAP-002 (M-001 createBackup wire method). Outside-In TDD: the OUTER acceptance test
    // (CreateBackup_HappyPath_ResolvesProjectAndReturnsSuccessEnvelope) constrains the
    // wire-layer responsibilities — project resolution + argument conversion +
    // delegation to BackupOrchestrator.ExecuteBackup. CAP-022 (BackupOrchestrator) is
    // already GREEN at 14/14, so these tests focus on the wire envelope contract
    // (BackupRequest → BackupResult) rather than re-testing the pipeline.
    //
    // Wire layer responsibilities (per data-contracts.md §4.1):
    //   (1) Resolve `request.ProjectId` → ScrText via LocalParatextProjects.GetParatextProject
    //       → unknown/malformed id maps to Error(InvalidProject)
    //   (2) Resource-project gate (VAL-B01)             → Error(ResourceNotBackupable)
    //   (3) userName non-empty gate (VAL-B02)            → Error(UserNameRequired)
    //   (4) selectedBookIds non-empty unless Notes-type  → Error(NoBooksSelected)
    //   (5) Convert selectedBookIds (string[]) → BookSet (Canon.BookIdToNumber)
    //       null selectedBookIds → full project BooksPresentSet
    //   (6) Delegate to BackupOrchestrator.ExecuteBackup; return envelope
    //   (7) BHV-655: callable from non-UI context (Problem Report delegate)
    //
    // Test infrastructure:
    //   * Base class PapiTestBase — provides DummyLocalParatextProjects.FakeAddProject
    //     for registering test projects with the in-process ScrTextCollection so
    //     LocalParatextProjects.GetParatextProject resolves them.
    //   * BackupLogService.LogFilePathOverride — redirects Backup.txt to a per-test
    //     temp file (CAP-023 test seam reused).
    //   * BackupOrchestrator.PersistChangesOverride — defaulted to `true` so wire-
    //     layer tests do not need to exercise the PersistChanges branch (CAP-022
    //     covers it directly).
    //
    // RED-state expectation: every test fails because
    // BackupRestoreDataProvider.CreateBackupAsync throws NotImplementedException.

    /// <summary>
    /// CAP-002 unit-tests for the wire-layer
    /// <see cref="BackupRestoreDataProvider.CreateBackupAsync"/> method (M-001 createBackup).
    /// Outside-In TDD fixture (Testing-Guide.md §Outside-In). Uses the real
    /// <see cref="BackupOrchestrator"/> as a collaborator (CAP-022 GREEN) so the wire-layer
    /// envelope contract is validated end-to-end against the actual pipeline.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal partial class BackupRestoreDataProviderTests : PapiTestBase
    {
        private string _testTempDir = string.Empty;
        private string _logFilePath = string.Empty;
        private BackupRestoreDataProvider _provider = null!;

        public override Task TestSetupAsync()
        {
            // Call base to wire up DummyPapiClient + DummyLocalParatextProjects + reset
            // the in-process ScrTextCollection. Then layer CAP-002-specific seams on top.
            base.TestSetupAsync();

            _testTempDir = Path.Combine(
                Path.GetTempPath(),
                "paranext-cap-002-tests",
                Guid.NewGuid().ToString("N")
            );
            Directory.CreateDirectory(_testTempDir);

            _logFilePath = Path.Combine(_testTempDir, "Backup.txt");
            BackupLogService.LogFilePathOverride = _logFilePath;

            // Default PersistChanges to true — wire-layer tests do not exercise the
            // PersistChanges branch; CAP-022 owns that path (TS-004).
            BackupOrchestrator.PersistChangesOverride = _ => true;

            _provider = new BackupRestoreDataProvider();

            return Task.CompletedTask;
        }

        public override void TestTearDown()
        {
            BackupLogService.LogFilePathOverride = null;
            BackupOrchestrator.PersistChangesOverride = null;
            // CAP-003 — reset the openRestoreSession test seam.
            BackupRestoreDataProvider.RestorerFactoryOverride = null;
            // CAP-009 — reset the getRestoreDestinationProjects test seam.
            BackupRestoreDataProvider.RestoreDestinationProjectsServiceOverride = null;
            // CAP-004 — reset the performRestore test seams.
            BackupRestoreDataProvider.SendFullProjectUpdateEventOverride = null;
            BackupRestoreDataProvider.PersistCurrentChangesOverride = null;
            RestoreOrchestrator.WriteLockObtainerOverride = null;
            try
            {
                if (Directory.Exists(_testTempDir))
                    Directory.Delete(_testTempDir, recursive: true);
            }
            catch
            {
                // Best-effort cleanup.
            }
            base.TestTearDown();
        }

        // =====================================================================
        // ACCEPTANCE TEST (outer) — must pass for CAP-002 to be considered done.
        // =====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-002")]
        [Property("BehaviorId", "BHV-100")]
        [Property("ScenarioId", "TS-001")]
        public async Task CreateBackup_HappyPath_ResolvesProjectAndReturnsSuccessEnvelope()
        {
            // Arrange — register an editable, non-resource project with a real on-disk
            // directory containing one SFM file so the orchestrator pipeline can produce
            // a non-empty ZIP. The project id is the HexId form (BackupRequest.ProjectId).
            var projectDir = CreateRealTempProject("HappyPathProj", out var scrText);
            File.WriteAllText(
                Path.Combine(projectDir, "01GENHappyPathProj.SFM"),
                "\\id GEN happy path\n\\c 1\n\\v 1 Test.\n"
            );
            string projectId = scrText.Guid.ToString();
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var destinationPath = Path.Combine(_testTempDir, "happy-path.zip");
            var request = new BackupRequest
            {
                ProjectId = projectId,
                DestinationPath = destinationPath,
                SelectedBookIds = null, // null → full project BooksPresentSet
                IncludeFiguresFlags = IncludeFiguresFlags.Figures,
                Description = "2026-05-28@10:00, jdoe - cap-002 happy path",
                ConfirmOverwrite = false,
                UserName = "jdoe",
            };

            // Act
            BackupResult result = await _provider.CreateBackupAsync(request);

            // Assert — Success envelope produced by orchestrator round-trip
            Assert.That(
                result,
                Is.InstanceOf<BackupResult.Success>(),
                "Wire layer delegates to orchestrator and returns Success envelope unmodified"
            );
            var success = (BackupResult.Success)result;
            Assert.That(success.DestinationPath, Is.EqualTo(destinationPath));
            Assert.That(File.Exists(destinationPath), Is.True, "ZIP file is created on disk");
            Assert.That(success.FileSizeBytes, Is.GreaterThan(0), "ZIP has non-zero size");
        }

        // =====================================================================
        // (1) Project resolution — InvalidProject error envelope
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-002")]
        [Property("BehaviorId", "BHV-100")]
        [Description(
            "Wire layer guard: unknown projectId resolves to Error(InvalidProject) per data-contracts.md §4.1 error matrix"
        )]
        public async Task CreateBackup_UnknownProjectId_ReturnsInvalidProjectError()
        {
            // Arrange — DO NOT register any project. A valid HexId string that isn't in
            // ScrTextCollection causes GetParatextProject to throw ProjectNotFoundException,
            // which the wire layer must convert into the Error envelope.
            string unknownProjectId = HexId.CreateNew().ToString();
            var request = new BackupRequest
            {
                ProjectId = unknownProjectId,
                DestinationPath = Path.Combine(_testTempDir, "unknown.zip"),
                Description = "desc",
                UserName = "jdoe",
            };

            // Act
            BackupResult result = await _provider.CreateBackupAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<BackupResult.Error>());
            var err = (BackupResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(BackupErrorCode.InvalidProject));
            Assert.That(err.ErrorKey, Is.EqualTo("%backup_invalidProject%"));
            Assert.That(
                File.Exists(request.DestinationPath),
                Is.False,
                "No ZIP written when project resolution fails"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-002")]
        [Property("BehaviorId", "BHV-100")]
        [Description(
            "Wire layer guard: a malformed (non-hex) projectId maps to Error(InvalidProject), not a thrown exception (envelope shape per §3.1)"
        )]
        public async Task CreateBackup_MalformedProjectId_ReturnsInvalidProjectError()
        {
            // Arrange — supply a clearly malformed id. HexId.FromStr throws ArgumentException
            // for non-hex input ("not-a-hex-id" contains '-' and letters past F).
            var request = new BackupRequest
            {
                ProjectId = "not-a-hex-id",
                DestinationPath = Path.Combine(_testTempDir, "malformed.zip"),
                Description = "desc",
                UserName = "jdoe",
            };

            // Act
            BackupResult result = await _provider.CreateBackupAsync(request);

            // Assert
            Assert.That(
                result,
                Is.InstanceOf<BackupResult.Error>(),
                "Malformed projectId returns Error envelope; never throws past the wire boundary"
            );
            var err = (BackupResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(BackupErrorCode.InvalidProject));
            Assert.That(err.ErrorKey, Is.EqualTo("%backup_invalidProject%"));
        }

        // =====================================================================
        // (2) Resource-project gate (VAL-B01 / INV-B01)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-002")]
        [Property("BehaviorId", "BHV-100")]
        [Property("InvariantId", "INV-B01")]
        [Description(
            "Wire layer guard VAL-B01: resource projects cannot be backed up; returns Error(ResourceNotBackupable) with errorField='projectId'"
        )]
        public async Task CreateBackup_ResourceProject_ReturnsResourceNotBackupableError()
        {
            // Arrange — register a resource project (IsProtectedText == true).
            var (scrText, _) = CreateResourceTempProject("ResourceProj");
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var request = new BackupRequest
            {
                ProjectId = scrText.Guid.ToString(),
                DestinationPath = Path.Combine(_testTempDir, "resource.zip"),
                SelectedBookIds = new[] { "GEN" },
                Description = "desc",
                UserName = "jdoe",
            };

            // Act
            BackupResult result = await _provider.CreateBackupAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<BackupResult.Error>());
            var err = (BackupResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(BackupErrorCode.ResourceNotBackupable));
            Assert.That(err.ErrorKey, Is.EqualTo("%backup_resourceProjectNotBackupable%"));
            Assert.That(
                err.ErrorField,
                Is.EqualTo("projectId"),
                "Error binds to projectId field for the React form's ErrorProvider equivalent"
            );
            Assert.That(
                File.Exists(request.DestinationPath),
                Is.False,
                "No ZIP written when resource gate fires"
            );
        }

        // =====================================================================
        // (3) userName non-empty gate (VAL-B02 / TS-049 cluster)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-002")]
        [Property("BehaviorId", "BHV-100")]
        [Description(
            "Wire layer guard VAL-B02: empty userName returns Error(UserNameRequired) with errorField='userName'"
        )]
        public async Task CreateBackup_EmptyUserName_ReturnsUserNameRequiredError()
        {
            // Arrange — valid project, but userName is empty.
            var projectDir = CreateRealTempProject("UserNameProj", out var scrText);
            File.WriteAllText(
                Path.Combine(projectDir, "01GENUserNameProj.SFM"),
                "\\id GEN\n\\c 1\n\\v 1 .\n"
            );
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var request = new BackupRequest
            {
                ProjectId = scrText.Guid.ToString(),
                DestinationPath = Path.Combine(_testTempDir, "no-username.zip"),
                Description = "desc",
                UserName = "", // empty per VAL-B02
            };

            // Act
            BackupResult result = await _provider.CreateBackupAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<BackupResult.Error>());
            var err = (BackupResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(BackupErrorCode.UserNameRequired));
            Assert.That(err.ErrorKey, Is.EqualTo("%backup_userNameRequired%"));
            Assert.That(err.ErrorField, Is.EqualTo("userName"));
        }

        // =====================================================================
        // (4) Empty book list (VAL-B04 / INV-A05) — non-Notes-type fails, null OK
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-002")]
        [Property("BehaviorId", "BHV-101")]
        [Property("InvariantId", "INV-A05")]
        [Description(
            "Wire layer guard VAL-B04: empty selectedBookIds (length 0) on a non-Notes-type project returns Error(NoBooksSelected)"
        )]
        public async Task CreateBackup_EmptyBookListAndNotNotesType_ReturnsNoBooksSelectedError()
        {
            // Arrange — valid project, but user explicitly selected zero books.
            var projectDir = CreateRealTempProject("EmptyBooksProj", out var scrText);
            File.WriteAllText(
                Path.Combine(projectDir, "01GENEmptyBooksProj.SFM"),
                "\\id GEN\n\\c 1\n\\v 1 .\n"
            );
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var request = new BackupRequest
            {
                ProjectId = scrText.Guid.ToString(),
                DestinationPath = Path.Combine(_testTempDir, "no-books.zip"),
                SelectedBookIds = Array.Empty<string>(), // explicit empty
                Description = "desc",
                UserName = "jdoe",
            };

            // Act
            BackupResult result = await _provider.CreateBackupAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<BackupResult.Error>());
            var err = (BackupResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(BackupErrorCode.NoBooksSelected));
            Assert.That(err.ErrorKey, Is.EqualTo("%backup_atLeastOneBookRequired%"));
            Assert.That(
                File.Exists(request.DestinationPath),
                Is.False,
                "No ZIP written when book-count gate fires"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-002")]
        [Property("BehaviorId", "BHV-100")]
        [Description(
            "Wire layer behavior: null selectedBookIds is the documented default — substitutes the project's full BooksPresentSet (data-contracts.md §2.1)"
        )]
        public async Task CreateBackup_NullSelectedBookIds_DefaultsToFullProjectBookSet()
        {
            // Arrange — valid project with GEN on disk; pass null selectedBookIds.
            var projectDir = CreateRealTempProject("NullBooksProj", out var scrText);
            File.WriteAllText(
                Path.Combine(projectDir, "01GENNullBooksProj.SFM"),
                "\\id GEN\n\\c 1\n\\v 1 .\n"
            );
            // Ensure GEN is in the project's BooksPresentSet so the wire-layer's default
            // substitution exercises a non-empty fallback.
            scrText.Settings.BooksPresentSet = SeedBookSet(1);
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var request = new BackupRequest
            {
                ProjectId = scrText.Guid.ToString(),
                DestinationPath = Path.Combine(_testTempDir, "null-books.zip"),
                SelectedBookIds = null, // null → full BooksPresentSet per §2.1
                Description = "desc",
                UserName = "jdoe",
            };

            // Act
            BackupResult result = await _provider.CreateBackupAsync(request);

            // Assert — GEN ends up in the ZIP because the wire layer substituted the
            // project's BooksPresentSet (which contains GEN) for the null book list.
            Assert.That(
                result,
                Is.InstanceOf<BackupResult.Success>(),
                "Null selectedBookIds substitutes full BooksPresentSet, not an empty set"
            );
            var entryNames = GetZipEntryNames(request.DestinationPath);
            Assert.That(
                entryNames.Any(n => n.Contains("GEN", StringComparison.OrdinalIgnoreCase)),
                Is.True,
                "Null selectedBookIds → full BooksPresentSet → GEN included in ZIP"
            );
        }

        // =====================================================================
        // (5) selectedBookIds string[] → BookSet conversion
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-002")]
        [Property("BehaviorId", "BHV-101")]
        [Property("ScenarioId", "TS-010")]
        [Property("InvariantId", "INV-A05")]
        [Description(
            "Wire layer behavior: selectedBookIds (string[]) is converted to BookSet via Canon.BookIdToNumber and passed to the orchestrator's per-book filter"
        )]
        public async Task CreateBackup_SelectedBookIdsSubset_ConvertsToBookSetAndDelegates()
        {
            // Arrange — project with GEN + EXO files on disk; select only GEN.
            var projectDir = CreateRealTempProject("SubsetProj", out var scrText);
            File.WriteAllText(
                Path.Combine(projectDir, "01GENSubsetProj.SFM"),
                "\\id GEN\n\\c 1\n\\v 1 GEN content.\n"
            );
            // Note: orchestrator's per-book filter uses ProjectFileClassifier which derives
            // the book number from the filename's stem ("01GEN" → book 1, "02EXO" → book 2)
            // via the configured FileNamePostPart. The RealDirScrText helper sets postPart
            // to nameStem + ".SFM" so we name files accordingly.
            File.WriteAllText(
                Path.Combine(projectDir, "02EXOSubsetProj.SFM"),
                "\\id EXO\n\\c 1\n\\v 1 EXO content.\n"
            );
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var request = new BackupRequest
            {
                ProjectId = scrText.Guid.ToString(),
                DestinationPath = Path.Combine(_testTempDir, "subset.zip"),
                SelectedBookIds = new[] { "GEN" },
                Description = "desc",
                UserName = "jdoe",
            };

            // Act
            BackupResult result = await _provider.CreateBackupAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<BackupResult.Success>());
            var entryNames = GetZipEntryNames(request.DestinationPath);
            Assert.That(
                entryNames.Any(n =>
                    string.Equals(n, "01GENSubsetProj.SFM", StringComparison.OrdinalIgnoreCase)
                ),
                Is.True,
                "Selected book GEN is in the ZIP (wire layer converted 'GEN' → book 1)"
            );
            Assert.That(
                entryNames.Any(n => n.Contains("EXO", StringComparison.OrdinalIgnoreCase)),
                Is.False,
                "Unselected book EXO is excluded (INV-A05)"
            );
        }

        // =====================================================================
        // (6) Overwrite-required pass-through (delegate)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-002")]
        [Property("BehaviorId", "BHV-100")]
        [Property("InvariantId", "INV-A02")]
        [Description(
            "Wire layer behavior: orchestrator's OverwriteRequired envelope is returned unmodified when destinationPath exists and confirmOverwrite=false"
        )]
        public async Task CreateBackup_DestExistsAndConfirmOverwriteFalse_ReturnsOverwriteRequired()
        {
            // Arrange — valid project + pre-existing destination file + confirmOverwrite=false.
            var projectDir = CreateRealTempProject("OverwriteProj", out var scrText);
            File.WriteAllText(
                Path.Combine(projectDir, "01GENOverwriteProj.SFM"),
                "\\id GEN\n\\c 1\n\\v 1 .\n"
            );
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var destinationPath = Path.Combine(_testTempDir, "pre-existing.zip");
            File.WriteAllText(destinationPath, "pre-existing-content");

            var request = new BackupRequest
            {
                ProjectId = scrText.Guid.ToString(),
                DestinationPath = destinationPath,
                SelectedBookIds = new[] { "GEN" },
                Description = "desc",
                UserName = "jdoe",
                ConfirmOverwrite = false,
            };

            // Act
            BackupResult result = await _provider.CreateBackupAsync(request);

            // Assert — wire layer returns orchestrator's OverwriteRequired envelope as-is.
            Assert.That(result, Is.InstanceOf<BackupResult.OverwriteRequired>());
            var or = (BackupResult.OverwriteRequired)result;
            Assert.That(or.ExistingPath, Is.EqualTo(destinationPath));
            Assert.That(
                File.ReadAllText(destinationPath),
                Is.EqualTo("pre-existing-content"),
                "INV-A02: existing file content untouched when overwrite not confirmed"
            );
        }

        // =====================================================================
        // (7) Description plumbing — BHV-604
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-002")]
        [Property("BehaviorId", "BHV-604")]
        [Description(
            "Wire layer behavior: request.Description is passed through to the orchestrator and written into the ZIP archive comment (BHV-604)"
        )]
        public async Task CreateBackup_DescriptionPropagatedToOrchestrator()
        {
            // Arrange — valid project + unique description that we can sniff out of the
            // ZIP's central-directory bytes.
            var projectDir = CreateRealTempProject("DescProj", out var scrText);
            File.WriteAllText(
                Path.Combine(projectDir, "01GENDescProj.SFM"),
                "\\id GEN\n\\c 1\n\\v 1 .\n"
            );
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            const string uniqueDescription =
                "2026-05-28@11:00, jdoe - cap-002 wire-layer description sniff";
            var request = new BackupRequest
            {
                ProjectId = scrText.Guid.ToString(),
                DestinationPath = Path.Combine(_testTempDir, "desc.zip"),
                SelectedBookIds = new[] { "GEN" },
                Description = uniqueDescription,
                UserName = "jdoe",
            };

            // Act
            BackupResult result = await _provider.CreateBackupAsync(request);

            // Assert
            Assert.That(result, Is.InstanceOf<BackupResult.Success>());
            byte[] bytes = File.ReadAllBytes(request.DestinationPath);
            string zipBytesAsLatin1 = System.Text.Encoding.Latin1.GetString(bytes);
            Assert.That(
                zipBytesAsLatin1,
                Does.Contain(uniqueDescription),
                "BHV-604: request.Description ends up in the ZIP archive comment via the orchestrator"
            );
        }

        // =====================================================================
        // (8) IncludeFiguresFlags defaulting — record default is Figures
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-002")]
        [Property("BehaviorId", "BHV-101")]
        [Description(
            "Wire layer behavior: BackupRequest.IncludeFiguresFlags defaults to Figures per data-contracts.md §2.1; orchestrator uses that value"
        )]
        public async Task CreateBackup_OmittedIncludeFiguresFlags_DefaultsToFigures()
        {
            // Arrange — valid project + a `figures/` subfolder containing one image.
            // When IncludeFiguresFlags is omitted from the request, the record default
            // (Figures) MUST be in effect, so the figures/ subtree ends up in the ZIP.
            var projectDir = CreateRealTempProject("DefaultFiguresProj", out var scrText);
            File.WriteAllText(
                Path.Combine(projectDir, "01GENDefaultFiguresProj.SFM"),
                "\\id GEN\n\\c 1\n\\v 1 .\n"
            );
            Directory.CreateDirectory(Path.Combine(projectDir, "figures"));
            File.WriteAllText(Path.Combine(projectDir, "figures", "fig.jpg"), "fake-image-data");
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            // Construct the request WITHOUT specifying IncludeFiguresFlags — relies on
            // the record default.
            var request = new BackupRequest
            {
                ProjectId = scrText.Guid.ToString(),
                DestinationPath = Path.Combine(_testTempDir, "default-figures.zip"),
                SelectedBookIds = new[] { "GEN" },
                Description = "desc",
                UserName = "jdoe",
            };

            // Sanity check the record-level default — pins the contract independently
            // of the wire-layer behavior.
            Assert.That(
                request.IncludeFiguresFlags,
                Is.EqualTo(IncludeFiguresFlags.Figures),
                "Record default per data-contracts.md §2.1: IncludeFiguresFlags.Figures"
            );

            // Act
            BackupResult result = await _provider.CreateBackupAsync(request);

            // Assert — figures/* present (the default Figures flag was honored).
            Assert.That(result, Is.InstanceOf<BackupResult.Success>());
            var entryNames = GetZipEntryNames(request.DestinationPath);
            Assert.That(
                entryNames.Any(n => n.Contains("figures", StringComparison.OrdinalIgnoreCase)),
                Is.True,
                "Default IncludeFiguresFlags.Figures → figures/ subtree included"
            );
        }

        // =====================================================================
        // (9) BHV-655 — non-UI caller path (Problem Report delegate / spec-015 / TS-113)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-002")]
        [Property("BehaviorId", "BHV-655")]
        [Property("ScenarioId", "TS-113")]
        [Description(
            "BHV-655 / spec-015: CreateBackupAsync is callable from non-UI code (e.g., Problem Report) — passing IncludeFiguresFlags.None produces a Success envelope with no figures in the ZIP, mirroring the PT9 in-process delegate at Program.cs:1380"
        )]
        public async Task CreateBackup_NonUiCallerWithIncludeFiguresFlagsNone_ReturnsSuccessWithNoFigures()
        {
            // Arrange — valid project + figures/ subfolder. The Problem Report caller
            // passes IncludeFiguresFlags.None to keep backup size minimal (per spec-015
            // assertion: Backup.BackupScrText.LastCallArgs.IncludeFiguresFlags == None).
            // The wire-layer test asserts the request is honored end-to-end without
            // requiring any UI infrastructure.
            var projectDir = CreateRealTempProject("ProblemReportProj", out var scrText);
            File.WriteAllText(
                Path.Combine(projectDir, "01GENProblemReportProj.SFM"),
                "\\id GEN\n\\c 1\n\\v 1 .\n"
            );
            Directory.CreateDirectory(Path.Combine(projectDir, "figures"));
            File.WriteAllText(Path.Combine(projectDir, "figures", "fig.jpg"), "fake-image-data");
            ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

            var request = new BackupRequest
            {
                ProjectId = scrText.Guid.ToString(),
                DestinationPath = Path.Combine(_testTempDir, "problem-report.zip"),
                SelectedBookIds = new[] { "GEN" },
                IncludeFiguresFlags = IncludeFiguresFlags.None, // spec-015 assertion
                Description = "Problem report backup",
                UserName = "problem-reporter",
                ConfirmOverwrite = false,
            };

            // Act — call from a "non-UI" surface. The wire layer has no UI dependency;
            // this test is the proof.
            BackupResult result = await _provider.CreateBackupAsync(request);

            // Assert — Success + figures/ excluded (per spec-015 INV-PROBLEM-REPORT-FIGURES).
            Assert.That(
                result,
                Is.InstanceOf<BackupResult.Success>(),
                "BHV-655: CreateBackupAsync produces Success for a non-UI caller"
            );
            var entryNames = GetZipEntryNames(request.DestinationPath);
            Assert.That(
                entryNames.Any(n => n.Contains("figures", StringComparison.OrdinalIgnoreCase)),
                Is.False,
                "spec-015 / TS-113: IncludeFiguresFlags.None excludes the figures/ subtree"
            );
        }

        // =====================================================================
        // Helpers
        // =====================================================================

        private string CreateRealTempProject(string nameStem, out ScrText scrText)
        {
            string projectDir = Path.Combine(_testTempDir, nameStem);
            Directory.CreateDirectory(projectDir);

            // Settings.xml so ProjectFileClassifier classifies dropped SFM files as
            // Books-type project files. Mirrors CAP-022's helper.
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

            var scrText = new ResourceProjectScrText(projectDir, nameStem);
            return (scrText, projectDir);
        }

        private static BookSet SeedBookSet(params int[] bookNums)
        {
            var bookSet = new BookSet();
            foreach (int n in bookNums)
                bookSet.Add(n);
            return bookSet;
        }

        private static List<string> GetZipEntryNames(string zipPath)
        {
            using var stream = File.OpenRead(zipPath);
            using var archive = new ZipArchive(stream, ZipArchiveMode.Read);
            return archive.Entries.Select(e => e.FullName).OrderBy(n => n).ToList();
        }

        // =====================================================================
        // Test ScrText subclasses — minimal seams for orchestrator scenarios that
        // DummyScrText cannot easily express. Mirror CAP-022's helpers exactly so
        // the test fixtures stay consistent across CAP-002 / CAP-022 / future caps.
        // =====================================================================

        /// <summary>
        /// ScrText subclass whose <c>Directory</c> property returns a real on-disk path so
        /// the orchestrator can iterate via <c>Directory.EnumerateFiles</c>.
        /// </summary>
        private sealed class RealDirScrText : DummyScrText
        {
            private readonly string _projectPath;

            public RealDirScrText(string projectPath, string nameStem)
                : base(MakeDetails(projectPath, nameStem))
            {
                _projectPath = projectPath;
                ConfigureBookFilenameConvention(this, postPart: nameStem + ".SFM");
            }

            public override string Directory => _projectPath;

            private static ProjectDetails MakeDetails(string projectPath, string nameStem)
            {
                var id = HexId.CreateNew().ToString();
                return new ProjectDetails(nameStem, new ProjectMetadata(id, []), projectPath);
            }
        }

        /// <summary>
        /// ScrText subclass whose <c>IsResourceProject</c> and <c>IsProtectedText</c>
        /// return <c>true</c>. Used by the VAL-B01 resource-gate test.
        /// </summary>
        private sealed class ResourceProjectScrText : DummyScrText
        {
            private readonly string _projectPath;

            public ResourceProjectScrText(string projectPath, string nameStem)
                : base(MakeDetails(projectPath, nameStem))
            {
                _projectPath = projectPath;
                ConfigureBookFilenameConvention(this, postPart: ".SFM");
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

        private static void ConfigureBookFilenameConvention(ScrText scrText, string postPart)
        {
            scrText.Settings.FileNamePrePart = string.Empty;
            scrText.Settings.FileNameForm = string.Empty;
            scrText.Settings.FileNamePostPart = postPart;
        }
    }
}
