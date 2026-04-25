using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class MarbleLexiconLoaderTests
{
    private static readonly IReadOnlySet<string> EmptyKnownBibleIds = new HashSet<string>(
        StringComparer.OrdinalIgnoreCase
    );

    [Test]
    public void Load_NoDictionaries_ReturnsEmptyData()
    {
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase);

        var (dict, gloss) = MarbleLexiconLoader.Load(research, EmptyKnownBibleIds);

        Assert.That(dict.ByDictionary, Is.Empty);
        Assert.That(gloss.ByLanguage, Is.Empty);
        Assert.That(gloss.AvailableLanguages, Is.Empty);
    }

    private const string SdbgLexiconXml =
        @"<?xml version=""1.0""?>
<Lexicon_Main>
  <Lexicon_Entry>
    <Lemma>logos</Lemma>
    <BaseForms>
      <BaseForm>
        <LEXMeanings>
          <LEXMeaning>
            <LEXSenses>
              <LEXSense><LanguageCode>en</LanguageCode><Gloss>word</Gloss></LEXSense>
              <LEXSense><LanguageCode>en</LanguageCode><Gloss>message</Gloss></LEXSense>
              <LEXSense><LanguageCode>es</LanguageCode><Gloss>palabra</Gloss></LEXSense>
            </LEXSenses>
            <LEXDomains><LEXDomain>Communication</LEXDomain></LEXDomains>
          </LEXMeaning>
        </LEXMeanings>
      </BaseForm>
    </BaseForms>
  </Lexicon_Entry>
  <Lexicon_Entry>
    <Lemma>graphe</Lemma>
    <BaseForms>
      <BaseForm>
        <LEXMeanings>
          <LEXMeaning>
            <LEXSenses>
              <LEXSense><LanguageCode>en</LanguageCode><Gloss>scripture</Gloss></LEXSense>
              <LEXSense><LanguageCode>en</LanguageCode><Gloss>writing</Gloss></LEXSense>
            </LEXSenses>
            <LEXDomains><LEXDomain>Sacred Texts</LEXDomain></LEXDomains>
          </LEXMeaning>
        </LEXMeanings>
      </BaseForm>
    </BaseForms>
  </Lexicon_Entry>
</Lexicon_Main>";

    [Test]
    public void Load_SdbgOnly_PopulatesByDictionaryAndGlossData()
    {
        var sdbg = new FakeMarblePackage("SDBG", isResearchData: true).WithFile(
            "Lexicon.xml",
            SdbgLexiconXml
        );
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["SDBG"] = sdbg,
        };

        var (dict, gloss) = MarbleLexiconLoader.Load(research, EmptyKnownBibleIds);

        Assert.That(dict.ByDictionary.ContainsKey("SDBG"), Is.True);
        var sdbgData = dict.ByDictionary["SDBG"];
        Assert.That(sdbgData.Lexicon.ContainsKey("logos"), Is.True);
        Assert.That(
            sdbgData.Lexicon["logos"].Glosses,
            Is.EquivalentTo(new[] { "word", "message" })
        );
        Assert.That(sdbgData.Lexicon["logos"].Domains, Is.EquivalentTo(new[] { "Communication" }));

        Assert.That(gloss.ByLanguage.ContainsKey("en"), Is.True);
        Assert.That(gloss.ByLanguage["en"]["logos"], Is.EquivalentTo(new[] { "word", "message" }));

        // Spanish has 1 of 3 senses - below 50% threshold, excluded from AvailableLanguages.
        // English has 3 of 3 senses - above threshold.
        Assert.That(gloss.AvailableLanguages, Does.Contain("en"));
        Assert.That(gloss.AvailableLanguages, Does.Not.Contain("es"));
    }

    [Test]
    public void Load_GlossCollision_SdbhWinsOverDclex()
    {
        var sdbh = new FakeMarblePackage("SDBH", isResearchData: true).WithFile(
            "Lexicon.xml",
            BuildLexiconXml("gamal", "camel")
        );
        var dclex = new FakeMarblePackage("DCLEX", isResearchData: true).WithFile(
            "Lexicon.xml",
            BuildLexiconXml("gamal", "beast-of-burden")
        );
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["SDBH"] = sdbh,
            ["DCLEX"] = dclex,
        };

        var (_, gloss) = MarbleLexiconLoader.Load(research, EmptyKnownBibleIds);

        Assert.That(
            gloss.ByLanguage["en"]["gamal"],
            Is.EquivalentTo(new[] { "camel" }),
            "SDBH should win over DCLEX per spec Section 6"
        );
    }

    private static string BuildLexiconXml(string lemma, string glossEn) =>
        $@"<?xml version=""1.0""?>
<Lexicon_Main>
  <Lexicon_Entry>
    <Lemma>{lemma}</Lemma>
    <BaseForms><BaseForm><LEXMeanings><LEXMeaning>
      <LEXSenses><LEXSense><LanguageCode>en</LanguageCode><Gloss>{glossEn}</Gloss></LEXSense></LEXSenses>
      <LEXDomains></LEXDomains>
    </LEXMeaning></LEXMeanings></BaseForm></BaseForms>
  </Lexicon_Entry>
</Lexicon_Main>";

    [Test]
    public void Load_SdbgPackage_PopulatesEntriesByIdWithRecord()
    {
        const string xml =
            @"<?xml version=""1.0""?>
<Lexicon_Main>
  <Lexicon_Entry Code=""logos-001"">
    <Lemma>logos</Lemma>
    <BaseForms>
      <BaseForm>
        <PartOfSpeech>N</PartOfSpeech>
        <LEXMeanings>
          <LEXMeaning Code=""logos-001-s1"">
            <LEXSenses>
              <LEXSense><LanguageCode>en</LanguageCode><Gloss>word</Gloss></LEXSense>
              <LEXSense><LanguageCode>fr</LanguageCode><Gloss>parole</Gloss></LEXSense>
            </LEXSenses>
            <DefinitionShort>a word</DefinitionShort>
            <LEXDomains><LEXDomain>Communication</LEXDomain></LEXDomains>
          </LEXMeaning>
        </LEXMeanings>
      </BaseForm>
    </BaseForms>
  </Lexicon_Entry>
</Lexicon_Main>";
        var package = new FakeMarblePackage("SDBG", isResearchData: true).WithFile(
            "Lexicon.xml",
            xml
        );
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["SDBG"] = package,
        };

        var (dict, _) = MarbleLexiconLoader.Load(research, EmptyKnownBibleIds);

        Assert.That(dict.ByDictionary.ContainsKey("SDBG"), Is.True);
        var pkg = dict.ByDictionary["SDBG"];
        Assert.That(pkg.EntriesById.ContainsKey("logos-001"), Is.True, "Entry not populated by id");
        var entry = pkg.EntriesById["logos-001"];
        Assert.That(entry.Lemma, Is.EqualTo("logos"));
        Assert.That(entry.Senses, Has.Count.EqualTo(1));
        Assert.That(entry.Senses[0].SenseId, Is.EqualTo("logos-001-s1"));
        Assert.That(entry.Senses[0].Glosses, Has.Count.EqualTo(2));
        Assert.That(
            entry.Senses[0].Glosses.Any(g => g.Language == "en" && g.Text == "word"),
            Is.True
        );
        Assert.That(entry.SemanticDomains, Is.EquivalentTo(new[] { "Communication" }));
        Assert.That(entry.Morphology, Is.EqualTo("N"));
        Assert.That(entry.SubItemIds, Is.EquivalentTo(new[] { "logos-001-s1" }));
    }
}
