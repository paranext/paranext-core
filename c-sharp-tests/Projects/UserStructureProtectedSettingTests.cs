using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using PtxUtils;

namespace TestParanextDataProvider.Projects;

[ExcludeFromCodeCoverage]
[TestFixture]
internal class UserStructureProtectedSettingTests : PapiTestBase
{
    private const string PdpName = "userStructureProtectedTestProject";

    private string _tempDir = null!;
    private DummyScrText _scrText = null!;
    private ProjectDetails _projectDetails = null!;
    private DummyParatextProjectDataProvider _provider = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();

        _tempDir = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString());
        Directory.CreateDirectory(_tempDir);

        var metadata = new ProjectMetadata(HexId.CreateNew().ToString(), []);
        _projectDetails = new ProjectDetails(
            "UserStructureProtectedTestProject",
            metadata,
            _tempDir
        );
        _scrText = new DummyScrText(_projectDetails);
        ParatextProjects.FakeAddProject(_projectDetails, _scrText);

        _provider = new DummyParatextProjectDataProvider(
            PdpName,
            Client,
            _projectDetails,
            ParatextProjects
        );
    }

    [TearDown]
    public void TearDown()
    {
        _scrText?.Dispose();
        if (Directory.Exists(_tempDir))
            Directory.Delete(_tempDir, recursive: true);
    }

    /// <summary>Build a <see cref="JsonElement"/> exactly as a value arrives over JSON-RPC.</summary>
    private static JsonElement JsonBool(bool value) =>
        JsonDocument.Parse(value ? "true" : "false").RootElement;

    [Test]
    public void GetUserStructureProtected_NoFileExists_ReturnsNull()
    {
        Assert.That(_provider.GetUserStructureProtected(), Is.Null);
    }

    // The frontend's setter call crosses the JSON-RPC boundary, so the value arrives as a
    // JsonElement, not a native bool. These two are the regression tests for that path.

    [Test]
    public void SetUserStructureProtected_WithJsonElementTrue_Persists()
    {
        _provider.SetUserStructureProtected(JsonBool(true));
        Assert.That(_provider.GetUserStructureProtected(), Is.True);
    }

    [Test]
    public void SetUserStructureProtected_WithJsonElementFalse_Persists()
    {
        _provider.SetUserStructureProtected(JsonBool(false));
        Assert.That(_provider.GetUserStructureProtected(), Is.False);
    }

    [Test]
    public void SetUserStructureProtected_WithNativeBool_Persists()
    {
        _provider.SetUserStructureProtected(true);
        Assert.That(_provider.GetUserStructureProtected(), Is.True);
    }

    [Test]
    public void SetUserStructureProtected_NonBoolean_Throws()
    {
        Assert.That(
            () => _provider.SetUserStructureProtected("not a bool"),
            Throws.TypeOf<InvalidDataException>()
        );
    }

    [Test]
    public void ResetUserStructureProtected_AfterSet_ReturnsNull()
    {
        _provider.SetUserStructureProtected(JsonBool(true));
        _provider.ResetUserStructureProtected();
        Assert.That(_provider.GetUserStructureProtected(), Is.Null);
    }
}
