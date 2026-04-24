using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class MarbleLexiconLoaderTests
{
    [Test]
    public void Load_NoDictionaries_ReturnsEmptyData()
    {
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase);

        var (dict, gloss) = MarbleLexiconLoader.Load(research);

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

        var (dict, gloss) = MarbleLexiconLoader.Load(research);

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

        var (_, gloss) = MarbleLexiconLoader.Load(research);

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
}
