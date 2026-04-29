using MarbleSchemaExtractor.Tests.Fixtures;

namespace MarbleSchemaExtractor.Tests;

[TestFixture]
public class ResourceArchiveTests
{
    private const string TestPassword = "test-fixture-pw";
    private string? _zipPath;

    [TearDown]
    public void TearDown()
    {
        if (_zipPath != null && File.Exists(_zipPath))
            File.Delete(_zipPath);
    }

    [Test]
    public void ListEntries_ReturnsAllMembersOfZip()
    {
        _zipPath = MakeFixtureZip.CreatePasswordedZip(
            new Dictionary<string, string>
            {
                ["Lexicon.xml"] = "<Lexicon/>",
                ["Settings.xml"] = "<Settings/>",
            },
            TestPassword
        );

        using var archive = ResourceArchive.Open(_zipPath, () => TestPassword);
        var names = archive.ListEntries().ToList();

        Assert.That(names, Is.EquivalentTo(new[] { "Lexicon.xml", "Settings.xml" }));
    }

    [Test]
    public void ReadEntryText_ReturnsDecryptedContent()
    {
        _zipPath = MakeFixtureZip.CreatePasswordedZip(
            new Dictionary<string, string> { ["Lexicon.xml"] = "<Lexicon/>" },
            TestPassword
        );

        using var archive = ResourceArchive.Open(_zipPath, () => TestPassword);
        string content = archive.ReadEntryText("Lexicon.xml");

        Assert.That(content, Is.EqualTo("<Lexicon/>"));
    }

    [Test]
    public void ReadEntryText_ThrowsWhenPasswordWrong()
    {
        _zipPath = MakeFixtureZip.CreatePasswordedZip(
            new Dictionary<string, string> { ["Lexicon.xml"] = "<Lexicon/>" },
            TestPassword
        );

        using var archive = ResourceArchive.Open(_zipPath, () => "wrong-password");

        Assert.That(() => archive.ReadEntryText("Lexicon.xml"), Throws.Exception);
    }
}
