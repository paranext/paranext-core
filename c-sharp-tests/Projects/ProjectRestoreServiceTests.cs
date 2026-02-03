using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using PtxUtils;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Tests for ProjectRestoreService.AnalyzeBackup() - CAP-013
/// Reference: gm-007-project-creation-flow (partial), EXT-301
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class ProjectRestoreServiceTests
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

    #region Helper Methods

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
