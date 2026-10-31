using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.Checks;
using Paratext.Checks;
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
    private SampleProjectInTempDir? _sample;

    [TearDown]
    public void TearDown()
    {
        _sample?.Dispose();
        _sample = null;
    }

    private SampleProjectInTempDir InstallSample() => _sample = SampleProjectInTempDir.Install();

    private static Task StartProviderAsync(SampleProjectInTempDir sample) =>
        new InventoryDataProvider(sample.Client, sample.LocalProjects).RegisterDataProviderAsync();

    [Test]
    public async Task RegisterDataProviderAsync_WritesNothingToTheProject()
    {
        var sample = InstallSample();
        var installed = sample.SnapshotProjectFolder();

        await StartProviderAsync(sample);

        SampleProjectInTempDir.AssertSameFiles(
            installed,
            sample.SnapshotProjectFolder(),
            "after starting the inventory data provider"
        );
    }

    [Test]
    public async Task RegisterDataProviderAsync_LeavesNothingForTheProjectsNextSaveToWrite()
    {
        var untouchedSave = SampleProjectInTempDir.SnapshotAfterSavingAnUntouchedCopy();
        var sample = InstallSample();

        await StartProviderAsync(sample);
        // Stands in for whatever the user saves next, such as a project setting they change
        SampleProjectInTempDir.Project.Save();

        SampleProjectInTempDir.AssertSameFiles(
            untouchedSave,
            sample.SnapshotProjectFolder(),
            "the next save after starting, against the same save of a copy never started on"
        );
    }

    [Test]
    public void CreateInventoryToDescribe_DescribesEveryInventoryAsAnInitializedOneDoes()
    {
        InstallSample();
        var dataSource = new ChecksDataSource(SampleProjectInTempDir.Project);

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
