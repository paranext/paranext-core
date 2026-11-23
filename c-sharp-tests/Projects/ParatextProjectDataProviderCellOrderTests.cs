using System.Diagnostics.CodeAnalysis;
using System.Xml.Linq;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class ParatextProjectDataProviderCellOrderTests : PapiTestBase
{
    private const string PdpName = "cellOrderTestProject";

    private DummyScrText _scrText = null!;
    private ProjectDetails _projectDetails = null!;
    private DummyParatextProjectDataProvider _provider = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        await Client.RegisterRequestHandlerAsync(
            "object:ProjectSettingsService.isValid",
            new Func<string, object?, object?, object?, bool>((k, n, c, a) => true),
            null
        );
        _scrText = CreateDummyProject();
        _projectDetails = CreateProjectDetails(_scrText);
        ParatextProjects.FakeAddProject(_projectDetails, _scrText);
        _provider = new DummyParatextProjectDataProvider(
            PdpName,
            Client,
            _projectDetails,
            ParatextProjects
        );
    }

    [TearDown]
    public void TearDown() => _scrText?.Dispose();

    [Test]
    public void CellOrder_Get_WhenUnset_ReturnsEmpty()
    {
        Assert.That(_provider.GetCellOrder(), Is.Empty);
    }

    [Test]
    public void CellOrder_SetThenGet_RoundTrips()
    {
        var input = new List<string> { "aabbcc", "ddeeff" };
        Assert.That(_provider.SetCellOrder(input.SerializeToJson()), Is.True);
        Assert.That(_provider.GetCellOrder(), Is.EqualTo(new List<string> { "aabbcc", "ddeeff" }));
    }

    [Test]
    [TestCase("")]
    [TestCase("null")]
    [TestCase("{\"a\":1}")]
    [TestCase("5")]
    [TestCase("[\"a\",null]")]
    [TestCase("[1,2]")]
    public void CellOrder_Set_WithNonArrayValue_Throws(string json)
    {
        Assert.Throws<InvalidDataException>(() => _provider.SetCellOrder(json));
    }

    [Test]
    public void CellOrder_Set_EmptyArray_RoundTripsToEmpty()
    {
        Assert.That(_provider.SetCellOrder("[]"), Is.True);
        Assert.That(_provider.GetCellOrder(), Is.Empty);
    }

    [Test]
    public void CellOrder_Reset_ClearsOrder()
    {
        _provider.SetCellOrder(new List<string> { "aabbcc" }.SerializeToJson());
        Assert.That(_provider.ResetCellOrder(), Is.True);
        Assert.That(_provider.GetCellOrder(), Is.Empty);
    }

    [Test]
    public void CellOrder_Get_WithIncompatibleMajorVersion_Throws()
    {
        // Seed the CellOrder setting directly with a future major version the current build cannot
        // read (exactly how Overlay_Get_WithIncompatibleMajorVersion_Throws seeds the overlay, line
        // ~196). "CellOrder" mirrors ParatextProjectDataProvider.CellOrderSettingName (a private
        // const). GetCellOrder must reject it rather than deserialize blindly.
        var userSettings = new UserProjectSettings(_scrText.Directory, _scrText.User.Name);
        userSettings.SetSetting(
            "CellOrder",
            "2.0.0",
            new XElement("Items", new List<string> { "aabbcc" }.SerializeToJson())
        );

        Assert.Throws<InvalidDataException>(() => _provider.GetCellOrder());
    }
}
