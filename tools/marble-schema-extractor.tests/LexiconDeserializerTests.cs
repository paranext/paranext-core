using MarbleSchemaExtractor.Tests.Fixtures;

namespace MarbleSchemaExtractor.Tests;

[TestFixture]
public class LexiconDeserializerTests
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
    public void CollectStats_FieldsPresentAndPopulated()
    {
        // Note: the Lexicon_Main : List<Lexicon_Entry> POCO uses default XmlSerializer
        // element naming, which emits/expects <Lexicon_Entry> (the type name) rather than
        // <Entry>. The PT9-verbatim POCO has no [XmlType("Entry")] override.
        var lexiconXml = """
            <Lexicon>
              <Lexicon_Entry Id="ABC" Lemma="ἀγάπη" Version="1">
                <Authors>
                  <Author>Anon</Author>
                </Authors>
                <BaseForms>
                  <BaseForm Id="0">
                    <PartsOfSpeech>
                      <PartOfSpeech>noun</PartOfSpeech>
                    </PartsOfSpeech>
                    <LEXMeanings>
                      <LEXMeaning Id="0:0" EntryCode="EC1">
                        <LEXDomains>
                          <LEXDomain>love</LEXDomain>
                        </LEXDomains>
                        <LEXSenses>
                          <LEXSense LanguageCode="en">
                            <DefinitionLong>love (long form)</DefinitionLong>
                            <Glosses>
                              <Gloss>love</Gloss>
                              <Gloss>charity</Gloss>
                            </Glosses>
                          </LEXSense>
                        </LEXSenses>
                      </LEXMeaning>
                    </LEXMeanings>
                  </BaseForm>
                </BaseForms>
              </Lexicon_Entry>
            </Lexicon>
            """;
        _zipPath = MakeFixtureZip.CreatePasswordedZip(
            new Dictionary<string, string> { ["Lexicon.xml"] = lexiconXml },
            TestPassword
        );

        using var archive = ResourceArchive.Open(_zipPath, () => TestPassword);
        var deserializer = new LexiconDeserializer();
        string statsJson = deserializer.CollectStats(archive);

        Assert.That(statsJson, Does.Contain("\"Entry.Lemma\""));
        Assert.That(statsJson, Does.Contain("\"BaseForms[].LEXMeanings[].LEXSenses[].Glosses\""));
    }

    [Test]
    public void CollectSamples_EmitsRequestedCount()
    {
        var lexiconXml = """
            <Lexicon>
              <Lexicon_Entry Id="A" Lemma="ἀγάπη"><BaseForms/></Lexicon_Entry>
              <Lexicon_Entry Id="B" Lemma="βίβλος"><BaseForms/></Lexicon_Entry>
              <Lexicon_Entry Id="C" Lemma="γῆ"><BaseForms/></Lexicon_Entry>
            </Lexicon>
            """;
        _zipPath = MakeFixtureZip.CreatePasswordedZip(
            new Dictionary<string, string> { ["Lexicon.xml"] = lexiconXml },
            TestPassword
        );

        using var archive = ResourceArchive.Open(_zipPath, () => TestPassword);
        var deserializer = new LexiconDeserializer();
        string samplesJson = deserializer.CollectSamples(archive, count: 2);

        // expect samples array with 2 items
        Assert.That(samplesJson, Does.Contain("\"Lemma\": \"ἀγάπη\""));
        Assert.That(samplesJson, Does.Contain("\"Lemma\": \"βίβλος\""));
        Assert.That(samplesJson, Does.Not.Contain("\"Lemma\": \"γῆ\""));
    }
}
