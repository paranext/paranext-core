using System.Diagnostics.CodeAnalysis;
using System.Xml.Linq;
using NUnit.Framework;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

[TestFixture]
[ExcludeFromCodeCoverage]
public class UserProjectSettingsTests
{
    private string _tempDir = null!;

    [SetUp]
    public void SetUp()
    {
        _tempDir = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString());
        Directory.CreateDirectory(_tempDir);
    }

    [TearDown]
    public void TearDown()
    {
        if (Directory.Exists(_tempDir))
            Directory.Delete(_tempDir, recursive: true);
    }

    private UserProjectSettings CreateSettings(string userId = "TestUser") => new(_tempDir, userId);

    // --- GetSetting: file absent ---

    [Test]
    public void GetSetting_FileAbsent_ReturnsNullPair()
    {
        var settings = CreateSettings();
        var (version, content) = settings.GetSetting("ModelTexts");
        Assert.That(version, Is.Null);
        Assert.That(content, Is.Null);
    }

    // --- GetSetting: element absent ---

    [Test]
    public void GetSetting_FileExistsButElementAbsent_ReturnsNullPair()
    {
        var settings = CreateSettings();
        // Write one setting so the file exists
        settings.SetSetting("OtherSetting", "1.0.0", new XElement("Items"));
        var (version, content) = settings.GetSetting("ModelTexts");
        Assert.That(version, Is.Null);
        Assert.That(content, Is.Null);
    }

    // --- SetSetting: creates file and directory ---

    [Test]
    public void SetSetting_FileAndDirectoryAbsent_CreatesFileAtCorrectPath()
    {
        var settings = CreateSettings("Alice");
        settings.SetSetting("ModelTexts", "1.0.0", new XElement("Items"));

        string expectedPath = Path.Combine(_tempDir, "Extensions", "UserSettings-Alice.xml");
        Assert.That(File.Exists(expectedPath), Is.True);
    }

    // --- SetSetting then GetSetting round-trip ---

    [Test]
    public void SetThenGet_RoundTripsVersionAndContent()
    {
        var settings = CreateSettings();
        var content = new XElement(
            "Items",
            new XElement(
                "Item",
                new XAttribute("type", "project"),
                new XAttribute("name", "ESV"),
                new XAttribute("id", "aabb")
            )
        );

        settings.SetSetting("ModelTexts", "1.0.0", content);
        var (version, retrieved) = settings.GetSetting("ModelTexts");

        Assert.That(version, Is.EqualTo("1.0.0"));
        Assert.That(retrieved, Is.Not.Null);
        Assert.That(retrieved!.Elements("Item").Count(), Is.EqualTo(1));
        Assert.That(
            retrieved.Elements("Item").Single().Attribute("name")?.Value,
            Is.EqualTo("ESV")
        );
    }

    // --- SetSetting: updates existing element ---

    [Test]
    public void SetSetting_CalledTwice_UpdatesElement()
    {
        var settings = CreateSettings();
        settings.SetSetting(
            "ModelTexts",
            "1.0.0",
            new XElement(
                "Items",
                new XElement(
                    "Item",
                    new XAttribute("type", "project"),
                    new XAttribute("name", "First"),
                    new XAttribute("id", "111")
                )
            )
        );
        settings.SetSetting(
            "ModelTexts",
            "1.0.0",
            new XElement(
                "Items",
                new XElement(
                    "Item",
                    new XAttribute("type", "project"),
                    new XAttribute("name", "Second"),
                    new XAttribute("id", "222")
                )
            )
        );

        var (_, content) = settings.GetSetting("ModelTexts");
        Assert.That(
            content!.Elements("Item").Single().Attribute("name")?.Value,
            Is.EqualTo("Second")
        );
    }

    // --- Multiple settings coexist ---

    [Test]
    public void SetSetting_TwoDistinctSettings_BothPersistedIndependently()
    {
        var settings = CreateSettings();
        settings.SetSetting(
            "ModelTexts",
            "1.0.0",
            new XElement(
                "Items",
                new XElement(
                    "Item",
                    new XAttribute("type", "project"),
                    new XAttribute("name", "A"),
                    new XAttribute("id", "aaa")
                )
            )
        );
        settings.SetSetting(
            "ReferencedProjectsAndResources",
            "1.0.0",
            new XElement(
                "Items",
                new XElement(
                    "Item",
                    new XAttribute("type", "project"),
                    new XAttribute("name", "B"),
                    new XAttribute("id", "bbb")
                )
            )
        );

        var (_, modelContent) = settings.GetSetting("ModelTexts");
        var (_, refContent) = settings.GetSetting("ReferencedProjectsAndResources");

        Assert.That(
            modelContent!.Elements("Item").Single().Attribute("name")?.Value,
            Is.EqualTo("A")
        );
        Assert.That(
            refContent!.Elements("Item").Single().Attribute("name")?.Value,
            Is.EqualTo("B")
        );
    }

    // --- Persistence across instances ---

    [Test]
    public void GetSetting_FreshInstance_ReadsPersistedDataFromDisk()
    {
        var first = CreateSettings();
        first.SetSetting(
            "ModelTexts",
            "1.0.0",
            new XElement(
                "Items",
                new XElement(
                    "Item",
                    new XAttribute("type", "project"),
                    new XAttribute("name", "ESV"),
                    new XAttribute("id", "aabb")
                )
            )
        );

        var second = CreateSettings();
        var (version, content) = second.GetSetting("ModelTexts");

        Assert.That(version, Is.EqualTo("1.0.0"));
        Assert.That(content, Is.Not.Null);
        Assert.That(content!.Elements("Item").Single().Attribute("name")?.Value, Is.EqualTo("ESV"));
    }

    // --- Different users have separate files ---

    [Test]
    public void SetSetting_DifferentUsers_WriteToSeparateFiles()
    {
        var alice = new UserProjectSettings(_tempDir, "Alice");
        var bob = new UserProjectSettings(_tempDir, "Bob");

        alice.SetSetting(
            "ModelTexts",
            "1.0.0",
            new XElement(
                "Items",
                new XElement(
                    "Item",
                    new XAttribute("type", "project"),
                    new XAttribute("name", "AliceProj"),
                    new XAttribute("id", "aaa")
                )
            )
        );
        bob.SetSetting(
            "ModelTexts",
            "1.0.0",
            new XElement(
                "Items",
                new XElement(
                    "Item",
                    new XAttribute("type", "project"),
                    new XAttribute("name", "BobProj"),
                    new XAttribute("id", "bbb")
                )
            )
        );

        var (_, aliceContent) = alice.GetSetting("ModelTexts");
        var (_, bobContent) = bob.GetSetting("ModelTexts");

        Assert.That(
            aliceContent!.Elements("Item").Single().Attribute("name")?.Value,
            Is.EqualTo("AliceProj")
        );
        Assert.That(
            bobContent!.Elements("Item").Single().Attribute("name")?.Value,
            Is.EqualTo("BobProj")
        );
    }
}
