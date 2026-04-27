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

        var result = MarbleLexiconLoader.Load(research, EmptyKnownBibleIds);

        Assert.That(result.Dictionary.ByDictionary, Is.Empty);
        Assert.That(result.Gloss.ByLanguage, Is.Empty);
        Assert.That(result.Gloss.AvailableLanguages, Is.Empty);
    }

    // Real PT9 SDBG/SDBH/DCLEX schema (per MarbleLexiconEntry.cs XmlSerializer
    // attributes): Lemma is an attribute on <Lexicon_Entry>; PartOfSpeech is
    // wrapped in <PartsOfSpeech>; Gloss is wrapped in <Glosses>; LanguageCode
    // is an attribute on <LEXSense>; references are wrapped in <LEXReferences>.
    private const string SdbgLexiconXml =
        @"<?xml version=""1.0""?>
<Lexicon_Main>
  <Lexicon_Entry Id=""logos-entry"" Lemma=""logos"">
    <BaseForms>
      <BaseForm>
        <LEXMeanings>
          <LEXMeaning>
            <LEXSenses>
              <LEXSense LanguageCode=""en""><Glosses><Gloss>word</Gloss><Gloss>message</Gloss></Glosses></LEXSense>
              <LEXSense LanguageCode=""es""><Glosses><Gloss>palabra</Gloss></Glosses></LEXSense>
            </LEXSenses>
            <LEXDomains><LEXDomain>Communication</LEXDomain></LEXDomains>
          </LEXMeaning>
        </LEXMeanings>
      </BaseForm>
    </BaseForms>
  </Lexicon_Entry>
  <Lexicon_Entry Id=""graphe-entry"" Lemma=""graphe"">
    <BaseForms>
      <BaseForm>
        <LEXMeanings>
          <LEXMeaning>
            <LEXSenses>
              <LEXSense LanguageCode=""en""><Glosses><Gloss>scripture</Gloss><Gloss>writing</Gloss></Glosses></LEXSense>
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
            "SDBG.XML",
            SdbgLexiconXml
        );
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["SDBG"] = sdbg,
        };

        var result = MarbleLexiconLoader.Load(research, EmptyKnownBibleIds);
        var dict = result.Dictionary;
        var gloss = result.Gloss;

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
    public void Load_LemmaInBothDicts_UnionsGlossesAndPreservesPerDictionaryView()
    {
        // PT9 keeps each MarbleScrText's cachedLemmaToEntry separate
        // (MarbleDataAccess.cs:1401-1456) so a Greek lemma authored by both
        // SDBG and DCLEX surfaces the dict-specific sense in each context. PT10
        // mirrors that with a per-dictionary view; the union view is what
        // unqualified callers (e.g. findLocalizedGlosses with no dict context)
        // see, and it must include both dicts' glosses to avoid silent loss.
        var sdbh = new FakeMarblePackage("SDBH", isResearchData: true).WithFile(
            "SDBH.XML",
            BuildLexiconXml("gamal", "camel")
        );
        var dclex = new FakeMarblePackage("DCLEX", isResearchData: true).WithFile(
            "DCLEX.XML",
            BuildLexiconXml("gamal", "beast-of-burden")
        );
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["SDBH"] = sdbh,
            ["DCLEX"] = dclex,
        };

        var gloss = MarbleLexiconLoader.Load(research, EmptyKnownBibleIds).Gloss;

        Assert.That(
            gloss.ByLanguage["en"]["gamal"],
            Is.EquivalentTo(new[] { "camel", "beast-of-burden" }),
            "Union view must surface every dictionary's sense - no silent drops"
        );
        Assert.That(gloss.ByDictionary, Is.Not.Null);
        Assert.That(gloss.ByDictionary!["SDBH"]["en"]["gamal"], Is.EquivalentTo(new[] { "camel" }));
        Assert.That(
            gloss.ByDictionary["DCLEX"]["en"]["gamal"],
            Is.EquivalentTo(new[] { "beast-of-burden" })
        );
    }

    [Test]
    public void Load_LemmaInOneDict_PerDictViewIsolatesDictionaries()
    {
        var sdbg = new FakeMarblePackage("SDBG", isResearchData: true).WithFile(
            "SDBG.XML",
            BuildLexiconXml("logos", "word")
        );
        var dclex = new FakeMarblePackage("DCLEX", isResearchData: true).WithFile(
            "DCLEX.XML",
            BuildLexiconXml("sophia", "wisdom")
        );
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["SDBG"] = sdbg,
            ["DCLEX"] = dclex,
        };

        var gloss = MarbleLexiconLoader.Load(research, EmptyKnownBibleIds).Gloss;

        Assert.That(gloss.ByDictionary, Is.Not.Null);
        Assert.That(gloss.ByDictionary!["SDBG"]["en"], Does.ContainKey("logos"));
        Assert.That(gloss.ByDictionary["SDBG"]["en"], Does.Not.ContainKey("sophia"));
        Assert.That(gloss.ByDictionary["DCLEX"]["en"], Does.ContainKey("sophia"));
        Assert.That(gloss.ByDictionary["DCLEX"]["en"], Does.Not.ContainKey("logos"));
    }

    private static string BuildLexiconXml(string lemma, string glossEn) =>
        $@"<?xml version=""1.0""?>
<Lexicon_Main>
  <Lexicon_Entry Id=""{lemma}-entry"" Lemma=""{lemma}"">
    <BaseForms><BaseForm><LEXMeanings><LEXMeaning>
      <LEXSenses><LEXSense LanguageCode=""en""><Glosses><Gloss>{glossEn}</Gloss></Glosses></LEXSense></LEXSenses>
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
  <Lexicon_Entry Id=""logos-001"" Lemma=""logos"">
    <BaseForms>
      <BaseForm>
        <PartsOfSpeech><PartOfSpeech>N</PartOfSpeech></PartsOfSpeech>
        <LEXMeanings>
          <LEXMeaning EntryCode=""logos-001-s1"">
            <LEXSenses>
              <LEXSense LanguageCode=""en""><Glosses><Gloss>word</Gloss></Glosses></LEXSense>
              <LEXSense LanguageCode=""fr""><Glosses><Gloss>parole</Gloss></Glosses></LEXSense>
            </LEXSenses>
            <DefinitionShort>a word</DefinitionShort>
            <LEXDomains><LEXDomain>Communication</LEXDomain></LEXDomains>
          </LEXMeaning>
        </LEXMeanings>
      </BaseForm>
    </BaseForms>
  </Lexicon_Entry>
</Lexicon_Main>";
        var package = new FakeMarblePackage("SDBG", isResearchData: true).WithFile("SDBG.XML", xml);
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["SDBG"] = package,
        };

        var dict = MarbleLexiconLoader.Load(research, EmptyKnownBibleIds).Dictionary;

        Assert.That(dict.ByDictionary.ContainsKey("SDBG"), Is.True);
        var pkg = dict.ByDictionary["SDBG"];
        // Lookup key is the NFD-normalized lemma (PT9 MarbleDataAccess.cs:1444);
        // ASCII "logos" round-trips unchanged.
        Assert.That(pkg.EntriesById.ContainsKey("logos"), Is.True, "Entry not populated by lemma");
        var entry = pkg.EntriesById["logos"];
        Assert.That(entry.Lemma, Is.EqualTo("logos"));
        Assert.That(entry.Senses, Has.Count.EqualTo(1));
        // SenseId comes from the LEXMeaning EntryCode attribute when present;
        // otherwise it falls back to "{xmlEntryId}-s{index}" using the
        // <Lexicon_Entry Id="..."> attribute (here "logos-001").
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

    [Test]
    public void Load_LexReferences_PopulateSourceLanguageOccurrences()
    {
        // Real PT9 lemma occurrences: <LEXReference> children of <LEXReferences>,
        // each a "BBBCCCVVV<5-digit word offset>" string. Format documented at
        // PT9 FindReplaceForm.cs:856 (refStr.Substring(0, 9) carries bbbcccvvv).
        const string xml =
            @"<?xml version=""1.0""?>
<Lexicon_Main>
  <Lexicon_Entry Id=""logos-001"" Lemma=""λόγος"">
    <StrongCodes><Strong>3056</Strong></StrongCodes>
    <BaseForms>
      <BaseForm>
        <PartsOfSpeech><PartOfSpeech>n</PartOfSpeech></PartsOfSpeech>
        <LEXMeanings>
          <LEXMeaning EntryCode=""logos-001-s1"">
            <LEXSenses>
              <LEXSense LanguageCode=""en""><Glosses><Gloss>word</Gloss></Glosses></LEXSense>
            </LEXSenses>
            <LEXReferences>
              <LEXReference>04300100100001</LEXReference>
              <LEXReference>04300101400003</LEXReference>
            </LEXReferences>
          </LEXMeaning>
        </LEXMeanings>
      </BaseForm>
    </BaseForms>
  </Lexicon_Entry>
</Lexicon_Main>";
        var package = new FakeMarblePackage("SDBG", isResearchData: true).WithFile("SDBG.XML", xml);
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["SDBG"] = package,
        };

        var sourceLanguage = MarbleLexiconLoader.Load(research, EmptyKnownBibleIds).SourceLanguage;

        // ByLemma is keyed by NFD-normalized lemma (PT9 MarbleDataAccess.cs:1444);
        // the Greek "λόγος" picks up combining-accent decomposition under FormD.
        var lemmaKey = "λόγος".Normalize(System.Text.NormalizationForm.FormD);
        Assert.That(sourceLanguage.ByLemma.ContainsKey(lemmaKey), Is.True);
        var entry = sourceLanguage.ByLemma[lemmaKey][0];
        Assert.That(entry.StrongNumber, Is.EqualTo("3056"));
        Assert.That(entry.PartOfSpeech, Is.EqualTo("n"));
        Assert.That(entry.Gloss, Is.EqualTo("word"));
        Assert.That(entry.Occurrences, Has.Count.EqualTo(2));
        // 04300100100001 -> JHN 1:1 (book 43, chapter 1, verse 1 after dropping
        // the trailing 5-digit word offset).
        Assert.That(entry.Occurrences[0].BookNum, Is.EqualTo(43));
        Assert.That(entry.Occurrences[0].ChapterNum, Is.EqualTo(1));
        Assert.That(entry.Occurrences[0].VerseNum, Is.EqualTo(1));
        Assert.That(entry.Occurrences[1].VerseNum, Is.EqualTo(14));
    }
}
