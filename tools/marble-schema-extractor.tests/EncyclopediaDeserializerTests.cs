using MarbleSchemaExtractor.Tests.Fixtures;

namespace MarbleSchemaExtractor.Tests;

[TestFixture]
public class EncyclopediaDeserializerTests
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
    public void CollectStats_HandlesV1ParagraphsAndIndexItems()
    {
        var v1Xml = """
            <Thematic_Lexicon>
              <ThemLex_Entry Key="REALIA:1.1.1.1">
                <Title>donkey</Title>
                <Index>
                  <IndexItem Number="1" Description="...">target</IndexItem>
                </Index>
                <Sections>
                  <Section Type="0" Content="Description">
                    <Heading>Donkey</Heading>
                    <Paragraphs>
                      <Paragraph>A small horse-like mammal.</Paragraph>
                    </Paragraphs>
                  </Section>
                </Sections>
              </ThemLex_Entry>
            </Thematic_Lexicon>
            """;
        _zipPath = MakeFixtureZip.CreatePasswordedZip(
            new Dictionary<string, string> { ["FAUNA.XML"] = v1Xml },
            TestPassword
        );

        using var archive = ResourceArchive.Open(_zipPath, () => TestPassword);
        var deserializer = new EncyclopediaDeserializer();
        string statsJson = deserializer.CollectStats(archive);

        Assert.That(statsJson, Does.Contain("\"Entry.Title\""));
        Assert.That(statsJson, Does.Contain("\"Entry.Sections[].Heading\""));
        Assert.That(statsJson, Does.Contain("\"Entry.Sections[].Paragraphs\""));
    }

    [Test]
    public void CollectSamples_EmitsRequestedCount()
    {
        var xml = """
            <Thematic_Lexicon>
              <ThemLex_Entry Key="A"><Title>One</Title><Sections/></ThemLex_Entry>
              <ThemLex_Entry Key="B"><Title>Two</Title><Sections/></ThemLex_Entry>
            </Thematic_Lexicon>
            """;
        _zipPath = MakeFixtureZip.CreatePasswordedZip(
            new Dictionary<string, string> { ["FAUNA.XML"] = xml },
            TestPassword
        );

        using var archive = ResourceArchive.Open(_zipPath, () => TestPassword);
        var deserializer = new EncyclopediaDeserializer();
        string samplesJson = deserializer.CollectSamples(archive, count: 1);

        Assert.That(samplesJson, Does.Contain("\"Title\": \"One\""));
        Assert.That(samplesJson, Does.Not.Contain("\"Title\": \"Two\""));
    }
}
