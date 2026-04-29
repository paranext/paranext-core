using MarbleSchemaExtractor.Tests.Fixtures;

namespace MarbleSchemaExtractor.Tests;

[TestFixture]
public class ArchiveListingDeserializerTests
{
    private const string TestPassword = "test-pw";
    private string? _zipPath;

    [TearDown]
    public void TearDown()
    {
        if (_zipPath != null && File.Exists(_zipPath))
            File.Delete(_zipPath);
    }

    [Test]
    public void CollectStats_ReportsExtensionCountsAndTopLevelXmlTags()
    {
        _zipPath = MakeFixtureZip.CreatePasswordedZip(
            new Dictionary<string, string>
            {
                ["MAT.SFM"] = "\\id MAT\n\\c 1\n\\v 1 In the beginning",
                ["LUK.SFM"] = "\\id LUK",
                ["TokenIndex.xml"] = "<TokenIndex><Book code='MAT'/></TokenIndex>",
                ["Settings.xml"] = "<Settings/>",
            },
            TestPassword
        );

        using var archive = ResourceArchive.Open(_zipPath, () => TestPassword);
        var sut = new ArchiveListingDeserializer();
        string statsJson = sut.CollectStats(archive);

        Assert.That(statsJson, Does.Contain("\"entries.total\""));
        Assert.That(statsJson, Does.Contain("\"entries.byExtension..SFM\""));
        Assert.That(statsJson, Does.Contain("\"entries.byExtension..xml\""));
        Assert.That(statsJson, Does.Contain("\"xml.rootElements.TokenIndex\""));
        Assert.That(statsJson, Does.Contain("\"xml.rootElements.Settings\""));
    }
}
