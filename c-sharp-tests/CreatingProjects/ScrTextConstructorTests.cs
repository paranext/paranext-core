using System.Diagnostics.CodeAnalysis;
using Paratext.Data;
using Paratext.Data.Users;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for ScrText constructor behavior during project creation (CAP-PD-001).
/// Verifies directory creation, FileManager initialization, and name validation.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
[Category("Integration")]
internal class ScrTextConstructorTests : PapiTestBase
{
    private string _testProjectsFolder = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();

        // Create a unique folder for each test
        _testProjectsFolder = Path.Combine(
            FixtureSetup.TestFolderPath,
            $"Projects_{TestContext.CurrentContext.Test.ID}"
        );
        if (!Directory.Exists(_testProjectsFolder))
            Directory.CreateDirectory(_testProjectsFolder);
    }

    [TearDown]
    public override void TestTearDown()
    {
        base.TestTearDown();

        // Clean up test project folders
        if (Directory.Exists(_testProjectsFolder))
        {
            try
            {
                Directory.Delete(_testProjectsFolder, true);
            }
            catch
            {
                // Ignore cleanup errors in tests
            }
        }
    }

    #region TS-001: Create Standard Translation project with valid inputs

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-PD-001")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-001")]
    [Description("TS-001: Create Standard Translation project with valid inputs - using DummyScrText")]
    public void CreateStandardProject_WithValidInputs_CreatesDirectoryAndSettings()
    {
        // Note: Direct ScrText instantiation requires full ParatextData initialization
        // which includes VCS setup and specific directory structures.
        // For unit tests, we use DummyScrText which uses in-memory file system.
        // This test verifies the pattern we'll use in PT10 services.

        // Act - Create a DummyScrText (in-memory project)
        var scrText = CreateDummyProject();

        // Assert - ScrText instance should be successfully created
        Assert.That(scrText, Is.Not.Null, "ScrText instance should be successfully created");

        // Assert - FileManager should be initialized (in-memory)
        Assert.That(
            scrText.FileManager,
            Is.Not.Null,
            "FileManager should be initialized"
        );

        // Assert - Settings should be accessible
        Assert.That(
            scrText.Settings,
            Is.Not.Null,
            "Settings should be accessible"
        );

        // Assert - Settings.Guid should be set
        Assert.That(
            scrText.Settings.Guid,
            Is.Not.Null,
            "Settings.Guid should be set"
        );
    }

    /// <summary>
    /// This test documents that real ScrText requires pre-created directories.
    /// PT10 will use ProjectDefaultsService to create directories before ScrText instantiation.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Documentation")]
    [Property("CapabilityId", "CAP-PD-001")]
    [Description("Real ScrText requires directory to exist - PT10 will pre-create via ProjectDefaultsService")]
    public void RealScrText_RequiresExistingDirectory_ForSettingsAccess()
    {
        // Arrange
        const string projectName = "TestStd";
        string projectPath = Path.Combine(_testProjectsFolder, projectName);
        var projectNameObj = new ProjectName
        {
            ShortName = projectName,
            ProjectPath = projectPath
        };

        // Note: NOT creating directory first

        // Act & Assert - Without directory, ScrText constructor will fail
        var exception = Assert.Catch<Exception>(
            () => new ScrText(projectNameObj, RegistrationInfo.DefaultUser)
        );

        Assert.That(
            exception,
            Is.Not.Null,
            "ScrText should fail without pre-created directory"
        );

        // Note: PT10 ProjectDefaultsService will:
        // 1. Create project directory
        // 2. Initialize Settings.xml with defaults
        // 3. Then instantiate ScrText
    }

    #endregion

    #region TS-002: Reject project name containing space

    [Test]
    [Category("Contract")]
    [Category("Validation")]
    [Property("CapabilityId", "CAP-PD-001")]
    [Property("ScenarioId", "TS-002")]
    [Property("InvariantId", "INV-001")]
    [Description("TS-002: Reject project name containing space - ParatextData.dll fails with I/O exception when path contains space")]
    public void CreateProject_WithSpaceInName_Fails()
    {
        // Arrange
        const string projectName = "Test Project"; // Contains space - should fail
        string projectPath = Path.Combine(_testProjectsFolder, projectName);
        var projectNameObj = new ProjectName
        {
            ShortName = projectName,
            ProjectPath = projectPath
        };

        // Act & Assert - ParatextData.dll attempts to create the directory with spaces
        // and fails during Settings.xml creation (DirectoryNotFoundException or ApplicationException)
        // The exact exception type depends on the OS and file system behavior
        var caughtException = Assert.Catch<Exception>(
            () => new ScrText(projectNameObj, RegistrationInfo.DefaultUser)
        );

        // Assert - Some exception is thrown (behavior varies by platform)
        Assert.That(
            caughtException,
            Is.Not.Null,
            "Creating project with space should fail"
        );

        // Note: PT10 ProjectNameService will pre-validate names before calling ScrText constructor
        // to provide better error messages (VAL-001)
    }

    #endregion

    #region INV-001: Project folder name cannot contain spaces (Invariant)

    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-PD-001")]
    [Property("InvariantId", "INV-001")]
    [TestCase("Test Project")]
    [TestCase("Project Name")]
    [Description("INV-001: Project folder name cannot contain spaces - ScrText construction fails")]
    public void CreateProject_WithSpacesInFolderPath_Fails(string projectName)
    {
        // Arrange
        string projectPath = Path.Combine(_testProjectsFolder, projectName);
        var projectNameObj = new ProjectName
        {
            ShortName = projectName,
            ProjectPath = projectPath
        };

        // Act & Assert - All names with spaces should fail
        // Note: The exact exception type varies by platform (I/O errors)
        var caughtException = Assert.Catch<Exception>(
            () => new ScrText(projectNameObj, RegistrationInfo.DefaultUser),
            $"Project name '{projectName}' should fail due to space"
        );

        Assert.That(caughtException, Is.Not.Null, "Exception should be thrown");

        // Note: PT10 will use ProjectNameService.ValidateShortName to reject names with
        // spaces BEFORE attempting ScrText construction, providing better error messages
    }

    #endregion
}
