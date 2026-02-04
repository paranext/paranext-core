using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.Repository;
using PtxUtils;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Tests for ProjectRestoreService - CAP-012 (RestoreProject) and CAP-013 (AnalyzeBackup)
/// Reference: gm-007-project-creation-flow, EXT-301
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class ProjectRestoreServiceTests : PapiTestBase
{
    #region Acceptance Test - CAP-013

    /// <summary>
    /// Acceptance test for CAP-013: Backup analysis capability.
    /// When this test passes, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ScenarioId", "TS-005")]
    [Description("Acceptance test: AnalyzeBackup correctly parses backup ZIP and returns analysis")]
    public async Task AnalyzeBackup_AcceptanceTest()
    {
        // This acceptance test verifies the complete AnalyzeBackup capability
        // by testing that a backup file is correctly analyzed

        // Create a test backup file path (actual implementation will need a real ZIP)
        var testBackupPath = Path.Combine(Path.GetTempPath(), "test-backup.zip");

        try
        {
            // Create a minimal test backup ZIP
            CreateTestBackupZip(testBackupPath, "TESTPROJ", "Test Project");

            // Analyze the backup
            var result = await ProjectRestoreService.AnalyzeBackupAsync(testBackupPath);

            // Verify project info is extracted
            Assert.That(result, Is.Not.Null, "Result should not be null");
            Assert.That(result.ProjectInfo, Is.Not.Null, "Project info should be extracted");
            Assert.That(
                result.ProjectInfo.ShortName,
                Is.EqualTo("TESTPROJ"),
                "Short name should match"
            );
            Assert.That(
                result.ProjectInfo.FullName,
                Is.EqualTo("Test Project"),
                "Full name should match"
            );

            // Verify files list is populated
            Assert.That(result.Files, Is.Not.Null, "Files list should not be null");
        }
        finally
        {
            // Clean up
            if (File.Exists(testBackupPath))
                File.Delete(testBackupPath);
        }
    }

    #endregion

    #region Golden Master Tests - gm-007 (Backup Analysis portion)

    /// <summary>
    /// gm-007: Analyze backup returns project info with correct short name
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-007-analysis-01")]
    [Property("ScenarioId", "TS-RESTORE-001")]
    [Property("BehaviorId", "BHV-501")]
    public async Task AnalyzeBackup_ValidBackup_ReturnsProjectShortName()
    {
        var testBackupPath = Path.Combine(Path.GetTempPath(), $"test-backup-{Guid.NewGuid()}.zip");

        try
        {
            CreateTestBackupZip(testBackupPath, "STDTEST", "Standard Test Project");

            var result = await ProjectRestoreService.AnalyzeBackupAsync(testBackupPath);

            Assert.That(result.ProjectInfo.ShortName, Is.EqualTo("STDTEST"));
        }
        finally
        {
            if (File.Exists(testBackupPath))
                File.Delete(testBackupPath);
        }
    }

    /// <summary>
    /// gm-007: Analyze backup returns project info with GUID
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-007-analysis-02")]
    [Property("ScenarioId", "TS-RESTORE-002")]
    [Property("BehaviorId", "BHV-501")]
    public async Task AnalyzeBackup_ValidBackup_ReturnsProjectGuid()
    {
        var testBackupPath = Path.Combine(Path.GetTempPath(), $"test-backup-{Guid.NewGuid()}.zip");
        var expectedGuid = "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2";

        try
        {
            CreateTestBackupZip(testBackupPath, "STDTEST", "Standard Test Project", expectedGuid);

            var result = await ProjectRestoreService.AnalyzeBackupAsync(testBackupPath);

            Assert.That(result.ProjectInfo.Guid.ToString(), Is.EqualTo(expectedGuid).IgnoreCase);
        }
        finally
        {
            if (File.Exists(testBackupPath))
                File.Delete(testBackupPath);
        }
    }

    /// <summary>
    /// gm-007: Analyze backup returns correct project type
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-007-analysis-03")]
    [Property("ScenarioId", "TS-RESTORE-003")]
    [Property("BehaviorId", "BHV-501")]
    public async Task AnalyzeBackup_ValidBackup_ReturnsProjectType()
    {
        var testBackupPath = Path.Combine(Path.GetTempPath(), $"test-backup-{Guid.NewGuid()}.zip");

        try
        {
            CreateTestBackupZipWithType(
                testBackupPath,
                "STDTEST",
                "Standard Test Project",
                null,
                ProjectType.Standard,
                false
            );

            var result = await ProjectRestoreService.AnalyzeBackupAsync(testBackupPath);

            Assert.That(result.ProjectInfo.ProjectType, Is.EqualTo(ProjectType.Standard));
        }
        finally
        {
            if (File.Exists(testBackupPath))
                File.Delete(testBackupPath);
        }
    }

    /// <summary>
    /// gm-007: Analyze shared project backup returns IsSharedProjectBackup = true
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-007-analysis-04")]
    [Property("ScenarioId", "TS-RESTORE-004")]
    [Property("BehaviorId", "BHV-502")]
    public async Task AnalyzeBackup_SharedProjectBackup_ReturnsIsSharedTrue()
    {
        var testBackupPath = Path.Combine(Path.GetTempPath(), $"test-backup-{Guid.NewGuid()}.zip");

        try
        {
            CreateTestBackupZip(testBackupPath, "SHRDPROJ", "Shared Project", isShared: true);

            var result = await ProjectRestoreService.AnalyzeBackupAsync(testBackupPath);

            Assert.That(result.IsSharedProjectBackup, Is.True);
        }
        finally
        {
            if (File.Exists(testBackupPath))
                File.Delete(testBackupPath);
        }
    }

    #endregion

    #region Contract Tests - Error Handling

    /// <summary>
    /// AnalyzeBackup with non-existent file throws appropriate exception
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-RESTORE-005")]
    [Property("BehaviorId", "BHV-501")]
    public void AnalyzeBackup_NonExistentFile_ThrowsFileNotFoundException()
    {
        var nonExistentPath = Path.Combine(Path.GetTempPath(), "non-existent-backup.zip");

        Assert.ThrowsAsync<FileNotFoundException>(
            async () => await ProjectRestoreService.AnalyzeBackupAsync(nonExistentPath)
        );
    }

    /// <summary>
    /// AnalyzeBackup with invalid ZIP file throws appropriate exception
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-RESTORE-006")]
    [Property("BehaviorId", "BHV-501")]
    public async Task AnalyzeBackup_InvalidZipFile_ThrowsInvalidDataException()
    {
        var testPath = Path.Combine(Path.GetTempPath(), $"invalid-backup-{Guid.NewGuid()}.zip");

        try
        {
            // Create an invalid ZIP (just text content)
            await File.WriteAllTextAsync(testPath, "This is not a ZIP file");

            Assert.ThrowsAsync<InvalidDataException>(
                async () => await ProjectRestoreService.AnalyzeBackupAsync(testPath)
            );
        }
        finally
        {
            if (File.Exists(testPath))
                File.Delete(testPath);
        }
    }

    /// <summary>
    /// AnalyzeBackup with empty path throws ArgumentException
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-RESTORE-007")]
    [Property("BehaviorId", "BHV-501")]
    public void AnalyzeBackup_EmptyPath_ThrowsArgumentException()
    {
        Assert.ThrowsAsync<ArgumentException>(
            async () => await ProjectRestoreService.AnalyzeBackupAsync("")
        );
    }

    /// <summary>
    /// AnalyzeBackup with null path throws ArgumentNullException
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-RESTORE-008")]
    [Property("BehaviorId", "BHV-501")]
    public void AnalyzeBackup_NullPath_ThrowsArgumentNullException()
    {
        Assert.ThrowsAsync<ArgumentNullException>(
            async () => await ProjectRestoreService.AnalyzeBackupAsync(null!)
        );
    }

    #endregion

    #region Acceptance Test - CAP-012 (RestoreProject)

    /// <summary>
    /// Acceptance test for CAP-012: RestoreProject capability.
    /// When this test passes, the capability is complete.
    /// Verifies: Files restored, VCS commits "Before restoring" and "After restoring" created.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-RESTORE-009")]
    [Property("BehaviorId", "BHV-501")]
    [Property("BehaviorId", "BHV-502")]
    [Description("Acceptance test: RestoreProject restores files with VCS commits")]
    [Ignore("DummyScrText VCS limitation: VersioningManager.Get() requires real project with repository initialization. Run integration tests for VCS verification.")]
    public async Task RestoreProject_AcceptanceTest()
    {
        // Arrange - Create a project to restore to
        var scrText = CreateDummyProject("RSTACC");
        ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

        // Create a backup file
        var testBackupPath = Path.Combine(Path.GetTempPath(), $"restore-acc-{Guid.NewGuid()}.zip");

        try
        {
            CreateTestBackupZipWithBooks(
                testBackupPath,
                "RSTACC",
                "Restore Acceptance Test",
                scrText.Guid.ToString(),
                new[] { "GEN", "EXO" }
            );

            var request = new RestoreProjectRequest(
                BackupFilePath: testBackupPath,
                TargetProjectGuid: scrText.Guid,
                BookIds: null // Restore all books
            );

            // Act
            var result = await ProjectRestoreService.RestoreProjectAsync(request);

            // Assert
            Assert.That(result, Is.Not.Null, "Result should not be null");
            Assert.That(result.Success, Is.True, "Restore should succeed");
            Assert.That(result.RestoredBooks, Is.Not.Empty, "Should have restored books");

            // Verify VCS commits were created (side-effect verification)
            // The implementation should create "Before restoring" and "After restoring" commits
            var versionedText = VersioningManager.Get(scrText);
            Assert.That(
                versionedText.HasUncommittedChanges(),
                Is.False,
                "All changes should be committed after restore"
            );
        }
        finally
        {
            if (File.Exists(testBackupPath))
                File.Delete(testBackupPath);
        }
    }

    #endregion

    #region Golden Master Tests - gm-007 (RestoreProject portion)

    /// <summary>
    /// gm-007: RestoreProject with valid backup restores successfully
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-007-restore-01")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-RESTORE-009")]
    [Property("BehaviorId", "BHV-501")]
    public async Task RestoreProject_ValidBackup_Succeeds()
    {
        // Arrange
        var scrText = CreateDummyProject("RSTGM1");
        ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

        var testBackupPath = Path.Combine(Path.GetTempPath(), $"restore-gm1-{Guid.NewGuid()}.zip");

        try
        {
            CreateTestBackupZipWithBooks(
                testBackupPath,
                "RSTGM1",
                "Restore Golden Master Test",
                scrText.Guid.ToString(),
                new[] { "GEN" }
            );

            var request = new RestoreProjectRequest(
                BackupFilePath: testBackupPath,
                TargetProjectGuid: scrText.Guid,
                BookIds: null
            );

            // Act
            var result = await ProjectRestoreService.RestoreProjectAsync(request);

            // Assert
            Assert.That(result.Success, Is.True);
        }
        finally
        {
            if (File.Exists(testBackupPath))
                File.Delete(testBackupPath);
        }
    }

    /// <summary>
    /// gm-007: RestoreProject creates "Before restoring" VCS commit
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-007-restore-02")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-RESTORE-009")]
    [Property("BehaviorId", "BHV-502")]
    [Ignore("DummyScrText VCS limitation: VersioningManager.Get() requires real project with repository initialization.")]
    public async Task RestoreProject_CreatesBeforeRestoringCommit()
    {
        // Arrange
        var scrText = CreateDummyProject("RSTBEF");
        ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

        // Make some initial changes
        scrText.PutText(1, 1, false, @"\id GEN Before restore content", null);
        var versionedText = VersioningManager.Get(scrText);
        versionedText.Commit("Initial content", null, false, null);

        var testBackupPath = Path.Combine(Path.GetTempPath(), $"restore-bef-{Guid.NewGuid()}.zip");

        try
        {
            CreateTestBackupZipWithBooks(
                testBackupPath,
                "RSTBEF",
                "Before Restore Test",
                scrText.Guid.ToString(),
                new[] { "GEN" }
            );

            var request = new RestoreProjectRequest(
                BackupFilePath: testBackupPath,
                TargetProjectGuid: scrText.Guid,
                BookIds: null
            );

            // Act
            var result = await ProjectRestoreService.RestoreProjectAsync(request);

            // Assert - The "Before restoring" commit should have been created
            // We verify by checking that there are no uncommitted changes
            // (meaning all changes including the pre-restore state were committed)
            Assert.That(result.Success, Is.True);
            Assert.That(
                versionedText.HasUncommittedChanges(),
                Is.False,
                "All changes should be committed"
            );
        }
        finally
        {
            if (File.Exists(testBackupPath))
                File.Delete(testBackupPath);
        }
    }

    /// <summary>
    /// gm-007: RestoreProject creates "After restoring" VCS commit
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-007-restore-03")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-RESTORE-009")]
    [Property("BehaviorId", "BHV-502")]
    [Ignore("DummyScrText VCS limitation: VersioningManager.Get() requires real project with repository initialization.")]
    public async Task RestoreProject_CreatesAfterRestoringCommit()
    {
        // Arrange
        var scrText = CreateDummyProject("RSTAFT");
        ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

        var testBackupPath = Path.Combine(Path.GetTempPath(), $"restore-aft-{Guid.NewGuid()}.zip");

        try
        {
            CreateTestBackupZipWithBooks(
                testBackupPath,
                "RSTAFT",
                "After Restore Test",
                scrText.Guid.ToString(),
                new[] { "GEN" }
            );

            var request = new RestoreProjectRequest(
                BackupFilePath: testBackupPath,
                TargetProjectGuid: scrText.Guid,
                BookIds: null
            );

            // Act
            var result = await ProjectRestoreService.RestoreProjectAsync(request);

            // Assert - The "After restoring" commit should have been created
            var versionedText = VersioningManager.Get(scrText);
            Assert.That(result.Success, Is.True);
            Assert.That(
                versionedText.HasUncommittedChanges(),
                Is.False,
                "No uncommitted changes after restore (After restoring commit made)"
            );
        }
        finally
        {
            if (File.Exists(testBackupPath))
                File.Delete(testBackupPath);
        }
    }

    /// <summary>
    /// gm-007: RestoreProject with specific books restores only those books
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-007-restore-04")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-RESTORE-011")]
    [Property("BehaviorId", "BHV-501")]
    public async Task RestoreProject_WithSpecificBooks_RestoresOnlySpecifiedBooks()
    {
        // Arrange
        var scrText = CreateDummyProject("RSTSPB");
        ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

        var testBackupPath = Path.Combine(Path.GetTempPath(), $"restore-spb-{Guid.NewGuid()}.zip");

        try
        {
            // Backup has GEN and EXO
            CreateTestBackupZipWithBooks(
                testBackupPath,
                "RSTSPB",
                "Specific Books Test",
                scrText.Guid.ToString(),
                new[] { "GEN", "EXO" }
            );

            // Request only GEN
            var request = new RestoreProjectRequest(
                BackupFilePath: testBackupPath,
                TargetProjectGuid: scrText.Guid,
                BookIds: new List<string> { "GEN" }
            );

            // Act
            var result = await ProjectRestoreService.RestoreProjectAsync(request);

            // Assert
            Assert.That(result.Success, Is.True);
            Assert.That(result.RestoredBooks, Does.Contain("GEN"));
            Assert.That(
                result.RestoredBooks,
                Does.Not.Contain("EXO"),
                "EXO should not be restored"
            );
        }
        finally
        {
            if (File.Exists(testBackupPath))
                File.Delete(testBackupPath);
        }
    }

    #endregion

    #region Contract Tests - RestoreProject Error Handling

    /// <summary>
    /// RestoreProject with non-existent backup file fails gracefully
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-RESTORE-010")]
    [Property("BehaviorId", "BHV-501")]
    public async Task RestoreProject_NonExistentFile_ReturnsFailure()
    {
        var request = new RestoreProjectRequest(
            BackupFilePath: "/nonexistent/path/backup.zip",
            TargetProjectGuid: null,
            BookIds: null
        );

        var result = await ProjectRestoreService.RestoreProjectAsync(request);

        Assert.That(result.Success, Is.False, "Restore should fail for non-existent file");
        Assert.That(result.Errors, Is.Not.Null.And.Not.Empty, "Should have error message");
    }

    /// <summary>
    /// RestoreProject with invalid backup file fails gracefully
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-RESTORE-010")]
    [Property("BehaviorId", "BHV-501")]
    public async Task RestoreProject_InvalidBackupFile_ReturnsFailure()
    {
        var testPath = Path.Combine(Path.GetTempPath(), $"invalid-restore-{Guid.NewGuid()}.zip");

        try
        {
            // Create an invalid ZIP file
            await File.WriteAllTextAsync(testPath, "Not a ZIP file");

            var request = new RestoreProjectRequest(
                BackupFilePath: testPath,
                TargetProjectGuid: null,
                BookIds: null
            );

            var result = await ProjectRestoreService.RestoreProjectAsync(request);

            Assert.That(result.Success, Is.False, "Restore should fail for invalid file");
            Assert.That(result.Errors, Is.Not.Null.And.Not.Empty, "Should have error message");
        }
        finally
        {
            if (File.Exists(testPath))
                File.Delete(testPath);
        }
    }

    /// <summary>
    /// RestoreProject with empty book filter restores nothing
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-RESTORE-011")]
    [Property("BehaviorId", "BHV-501")]
    public async Task RestoreProject_EmptyBookList_RestoresNothing()
    {
        // Arrange
        var scrText = CreateDummyProject("RSTEMB");
        ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);

        var testBackupPath = Path.Combine(Path.GetTempPath(), $"restore-emb-{Guid.NewGuid()}.zip");

        try
        {
            CreateTestBackupZipWithBooks(
                testBackupPath,
                "RSTEMB",
                "Empty Books Test",
                scrText.Guid.ToString(),
                new[] { "GEN" }
            );

            // Request with empty book list
            var request = new RestoreProjectRequest(
                BackupFilePath: testBackupPath,
                TargetProjectGuid: scrText.Guid,
                BookIds: new List<string>() // Empty list
            );

            // Act
            var result = await ProjectRestoreService.RestoreProjectAsync(request);

            // Assert
            Assert.That(result.Success, Is.True, "Restore with empty filter should succeed");
            Assert.That(result.RestoredBooks, Is.Empty, "Should restore no books");
        }
        finally
        {
            if (File.Exists(testBackupPath))
                File.Delete(testBackupPath);
        }
    }

    /// <summary>
    /// RestoreProject with null target creates new project
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-RESTORE-009")]
    [Property("BehaviorId", "BHV-501")]
    public async Task RestoreProject_NullTargetGuid_CreatesNewProject()
    {
        var testBackupPath = Path.Combine(Path.GetTempPath(), $"restore-new-{Guid.NewGuid()}.zip");

        try
        {
            var backupGuid = "b1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2";
            CreateTestBackupZipWithBooks(
                testBackupPath,
                "RSTNEW",
                "New Project From Restore",
                backupGuid,
                new[] { "GEN" }
            );

            // Request with null target - should create new project
            var request = new RestoreProjectRequest(
                BackupFilePath: testBackupPath,
                TargetProjectGuid: null, // No target = create new
                BookIds: null
            );

            // Act
            var result = await ProjectRestoreService.RestoreProjectAsync(request);

            // Assert
            Assert.That(result.Success, Is.True, "Restore to new project should succeed");
            Assert.That(result.ProjectGuid, Is.Not.Null, "Should return new project GUID");
        }
        finally
        {
            if (File.Exists(testBackupPath))
                File.Delete(testBackupPath);
        }
    }

    #endregion

    #region Helper Methods

    /// <summary>
    /// Creates a test backup ZIP file with book content
    /// </summary>
    private static void CreateTestBackupZipWithBooks(
        string zipPath,
        string shortName,
        string fullName,
        string guid,
        string[] bookIds
    )
    {
        using var zipStream = new FileStream(zipPath, FileMode.Create);
        using var archive = new System.IO.Compression.ZipArchive(
            zipStream,
            System.IO.Compression.ZipArchiveMode.Create
        );

        // Create Settings.xml entry
        var settingsEntry = archive.CreateEntry("Settings.xml");
        using (var writer = new StreamWriter(settingsEntry.Open()))
        {
            writer.Write(
                $@"<?xml version=""1.0"" encoding=""utf-8""?>
<ScriptureText>
  <Name>{shortName}</Name>
  <FullName>{fullName}</FullName>
  <Guid>{guid}</Guid>
  <TranslationInfo>
    <Type>Standard</Type>
  </TranslationInfo>
  <Editable>T</Editable>
  <Versification>4</Versification>
</ScriptureText>"
            );
        }

        // Create book files
        foreach (var bookId in bookIds)
        {
            var bookEntry = archive.CreateEntry($"{bookId}.usfm");
            using var bookWriter = new StreamWriter(bookEntry.Open());
            bookWriter.Write($@"\id {bookId} Restored content");
        }
    }

    /// <summary>
    /// Creates a minimal test backup ZIP file for testing
    /// </summary>
    private static void CreateTestBackupZip(
        string zipPath,
        string shortName,
        string fullName,
        string? guid = null,
        bool isShared = false
    )
    {
        CreateTestBackupZipWithType(
            zipPath,
            shortName,
            fullName,
            guid,
            ProjectType.Standard,
            isShared
        );
    }

    /// <summary>
    /// Creates a minimal test backup ZIP file for testing with explicit project type
    /// </summary>
    private static void CreateTestBackupZipWithType(
        string zipPath,
        string shortName,
        string fullName,
        string? guid,
        PtxUtils.Enum<ProjectType> projectType,
        bool isShared
    )
    {
        using var zipStream = new FileStream(zipPath, FileMode.Create);
        using var archive = new System.IO.Compression.ZipArchive(
            zipStream,
            System.IO.Compression.ZipArchiveMode.Create
        );

        // Create Settings.xml entry
        var settingsEntry = archive.CreateEntry("Settings.xml");
        using (var writer = new StreamWriter(settingsEntry.Open()))
        {
            var actualGuid = guid ?? "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2";
            writer.Write(
                $@"<?xml version=""1.0"" encoding=""utf-8""?>
<ScriptureText>
  <Name>{shortName}</Name>
  <FullName>{fullName}</FullName>
  <Guid>{actualGuid}</Guid>
  <TranslationInfo>
    <Type>{projectType}</Type>
  </TranslationInfo>
  <Editable>T</Editable>
  <Versification>4</Versification>
</ScriptureText>"
            );
        }

        // If shared project, add unique.id file to indicate it
        if (isShared)
        {
            var uniqueIdEntry = archive.CreateEntry("unique.id");
            using var uniqueWriter = new StreamWriter(uniqueIdEntry.Open());
            uniqueWriter.Write("shared-project-marker");
        }
    }

    #endregion
}
