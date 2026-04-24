using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class MarbleSourceLanguageLoaderTests
{
    private const string GntLexiconXml =
        @"<?xml version=""1.0""?>
<Lexicon_Main>
  <Lexicon_Entry>
    <Lemma>logos</Lemma>
    <NativeLemma>&#955;&#972;&#947;&#959;&#962;</NativeLemma>
    <StrongNumber>G3056</StrongNumber>
    <PartOfSpeech>Noun</PartOfSpeech>
    <BaseForms><BaseForm><LEXMeanings><LEXMeaning>
      <LEXSenses>
        <LEXSense><LanguageCode>en</LanguageCode><Gloss>word</Gloss></LEXSense>
        <LEXSense><LanguageCode>en</LanguageCode><Gloss>message</Gloss></LEXSense>
      </LEXSenses>
      <LEXDomains></LEXDomains>
    </LEXMeaning></LEXMeanings></BaseForm></BaseForms>
    <Occurrences>
      <Occurrence ref=""JHN 1:1"" />
      <Occurrence ref=""JHN 1:14"" />
    </Occurrences>
  </Lexicon_Entry>
</Lexicon_Main>";

    private const string BhsLexiconXml =
        @"<?xml version=""1.0""?>
<Lexicon_Main>
  <Lexicon_Entry>
    <Lemma>elohim</Lemma>
    <NativeLemma>&#1488;&#1457;&#1500;&#1465;&#1492;&#1460;&#1497;&#1501;</NativeLemma>
    <StrongNumber>H0430</StrongNumber>
    <PartOfSpeech>Noun</PartOfSpeech>
    <BaseForms><BaseForm><LEXMeanings><LEXMeaning>
      <LEXSenses><LEXSense><LanguageCode>en</LanguageCode><Gloss>God</Gloss></LEXSense></LEXSenses>
      <LEXDomains></LEXDomains>
    </LEXMeaning></LEXMeanings></BaseForm></BaseForms>
    <Occurrences>
      <Occurrence ref=""GEN 1:1"" />
    </Occurrences>
  </Lexicon_Entry>
</Lexicon_Main>";

    [Test]
    public void Load_NoPackages_ReturnsEmptyData()
    {
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase);

        var data = MarbleSourceLanguageLoader.Load(research);

        Assert.That(data, Is.Not.Null);
        Assert.That(data.ByLemma, Is.Empty);
    }

    [Test]
    public void Load_GntPackage_ParsesSingleLemma()
    {
        var gnt = new FakeMarblePackage("GNT", isResearchData: true).WithFile(
            "Lexicon.xml",
            GntLexiconXml
        );
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["GNT"] = gnt,
        };

        var data = MarbleSourceLanguageLoader.Load(research);

        Assert.That(data.ByLemma.ContainsKey("logos"), Is.True);
        var entries = data.ByLemma["logos"];
        Assert.That(entries, Has.Count.EqualTo(1));
        Assert.That(entries[0].Translit, Is.EqualTo("logos"));
        Assert.That(entries[0].StrongNumber, Is.EqualTo("G3056"));
        Assert.That(entries[0].Gloss, Is.EqualTo("word"));
        Assert.That(entries[0].PartOfSpeech, Is.EqualTo("Noun"));
        Assert.That(entries[0].Occurrences, Has.Count.EqualTo(2));
        Assert.That(entries[0].Occurrences[0].BookNum, Is.EqualTo(43)); // John
    }

    [Test]
    public void Load_GntAndBhs_ProducesBothLemmas()
    {
        var gnt = new FakeMarblePackage("GNT", isResearchData: true).WithFile(
            "Lexicon.xml",
            GntLexiconXml
        );
        var bhs = new FakeMarblePackage("BHS", isResearchData: true).WithFile(
            "Lexicon.xml",
            BhsLexiconXml
        );
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["GNT"] = gnt,
            ["BHS"] = bhs,
        };

        var data = MarbleSourceLanguageLoader.Load(research);

        Assert.That(data.ByLemma.Keys, Is.EquivalentTo(new[] { "logos", "elohim" }));
        Assert.That(data.ByLemma["elohim"][0].StrongNumber, Is.EqualTo("H0430"));
    }

    [Test]
    public void Load_PackageWithoutLexiconFile_IsSkipped()
    {
        var gnt = new FakeMarblePackage("GNT", isResearchData: true); // no files
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["GNT"] = gnt,
        };

        var data = MarbleSourceLanguageLoader.Load(research);

        Assert.That(data.ByLemma, Is.Empty);
    }
}
