using System.Diagnostics.CodeAnalysis;
using System.Text;
using System.Text.Json;
using System.Xml.Linq;
using Paranext.DataProvider.Checks;
using Paratext.Checks;
using Paratext.Data;
using TestParanextDataProvider.Projects;

namespace TestParanextDataProvider.Checks;

/// <summary>
/// Starting the inventory data provider describes the available inventories using the first
/// project it finds. Nobody asked for anything to be written to that project, so starting must not
/// write to it, nor leave changes behind for the project's next save to write. Runs against an
/// on-disk copy of the bundled sample project, which has never had the characters inventory used.
/// </summary>
[ExcludeFromCodeCoverage]
[TestFixture]
internal class InventoryDataProviderStartupTests
{
    private const string SAMPLE_PROJECT_OPT_IN_VARIABLE = "PLATFORM_BIBLE_INSTALL_SAMPLE_PROJECT";
    private const string SAMPLE_PROJECT_FOLDER = "WEB";
    private const string SETTINGS_FILE = "Settings.xml";

    private TestLocalParatextProjectsInTempDir _localProjects = null!;
    private DummyPapiClient _client = null!;
    private string _projectFolder = null!;

    [OneTimeSetUp]
    public void FixtureSetUp()
    {
        // Required for the Paratext.Data.Encodings.StringEncoders static constructor
        Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
    }

    [SetUp]
    public void SetUp()
    {
        // The constructor reads the opt-in once, so it is restored right after construction
        string? original = Environment.GetEnvironmentVariable(SAMPLE_PROJECT_OPT_IN_VARIABLE);
        Environment.SetEnvironmentVariable(SAMPLE_PROJECT_OPT_IN_VARIABLE, "true");
        try
        {
            _localProjects = new TestLocalParatextProjectsInTempDir();
        }
        finally
        {
            Environment.SetEnvironmentVariable(SAMPLE_PROJECT_OPT_IN_VARIABLE, original);
        }
        _client = new DummyPapiClient();

        _localProjects.Initialize();
        _projectFolder = Path.Join(_localProjects.TestProjectRootFolder, SAMPLE_PROJECT_FOLDER);
    }

    [TearDown]
    public void TearDown()
    {
        foreach (ScrText project in ScrTextCollection.ScrTexts(IncludeProjects.Everything).ToList())
            ScrTextCollection.Remove(project, false);
        _client.Dispose();
        _localProjects.Dispose();
    }

    private Task StartProviderAsync() =>
        new InventoryDataProvider(_client, _localProjects).RegisterDataProviderAsync();

    private static ScrText SampleProject() =>
        ScrTextCollection.ScrTexts(IncludeProjects.Everything).Single();

    private Dictionary<string, byte[]> SnapshotProjectFolder() =>
        Directory
            .GetFiles(_projectFolder, "*", SearchOption.AllDirectories)
            .ToDictionary(path => Path.GetRelativePath(_projectFolder, path), File.ReadAllBytes);

    private HashSet<string> SettingNamesOnDisk() =>
        XDocument
            .Load(Path.Join(_projectFolder, SETTINGS_FILE))
            .Root!.Elements()
            .Select(element => element.Name.LocalName)
            .ToHashSet();

    [Test]
    public async Task RegisterDataProviderAsync_WritesNothingToTheProject()
    {
        var before = SnapshotProjectFolder();

        await StartProviderAsync();

        var after = SnapshotProjectFolder();
        Assert.That(after.Keys, Is.EquivalentTo(before.Keys), "files added or removed");
        Assert.Multiple(() =>
        {
            foreach (var (file, bytes) in before)
                Assert.That(
                    Encoding.UTF8.GetString(after[file]),
                    Is.EqualTo(Encoding.UTF8.GetString(bytes)),
                    file
                );
        });
    }

    [Test]
    public async Task RegisterDataProviderAsync_LeavesNoSettingForTheProjectsNextSaveToWrite()
    {
        var settingNamesBefore = SettingNamesOnDisk();

        await StartProviderAsync();
        // Stands in for whatever the user saves next, such as a project setting they change
        SampleProject().Save();

        Assert.That(SettingNamesOnDisk(), Is.EquivalentTo(settingNamesBefore));
    }

    [Test]
    public void CreateInventoryToDescribe_DescribesEveryInventoryAsAnInitializedOneDoes()
    {
        var dataSource = new ChecksDataSource(SampleProject());

        Assert.Multiple(() =>
        {
            foreach (string inventoryId in InventoryFactory.GetAvailableInventoryIds())
            {
                ScriptureInventoryBase described = InventoryFactory.CreateInventoryToDescribe(
                    inventoryId,
                    dataSource
                );
                ScriptureInventoryBase initialized = InventoryFactory.CreateInventory(
                    inventoryId,
                    dataSource
                );

                Assert.That(
                    JsonSerializer.Serialize(new InventoryDetails(described)),
                    Is.EqualTo(JsonSerializer.Serialize(new InventoryDetails(initialized))),
                    inventoryId
                );
            }
        });
    }
}
