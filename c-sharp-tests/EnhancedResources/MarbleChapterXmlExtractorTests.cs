using System.Diagnostics.CodeAnalysis;
using System.Xml.Linq;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for MarbleChapterXmlExtractor.ExtractChapter - chapter-scoped slice of
/// marble USX with stable token-id stamping on wg/note elements.
///
/// CAP-019: LoadMarbleChapterXml (M-019)
/// Source: data-contracts.md Section 4.19, FN-014, FN-013
///
/// The extractor must round-trip with <see cref="MarbleTokenParser"/>:
/// every <c>id</c> stamped on a <c>&lt;wg&gt;</c>/<c>&lt;note&gt;</c> in the
/// output must equal the <c>Index</c> the parser assigns to the corresponding
/// MarbleToken when parsing the WHOLE BOOK. This invariant is what allows
/// <see cref="TooltipService"/> and <see cref="NoteService"/> to look up by
/// the IDs the TS converter sees.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class MarbleChapterXmlExtractorTests
{
    private static string GetGoldenMasterPath(string fileName)
    {
        var testDir = TestContext.CurrentContext.TestDirectory;
        return Path.Combine(testDir, "EnhancedResources", "GoldenMasters", fileName);
    }

    #region Edge cases

    [Test]
    [Category("EdgeCase")]
    public void ExtractChapter_NullInput_ReturnsNull()
    {
        var result = MarbleChapterXmlExtractor.ExtractChapter(null, 1);
        Assert.That(result, Is.Null);
    }

    [Test]
    [Category("EdgeCase")]
    public void ExtractChapter_EmptyInput_ReturnsNull()
    {
        var result = MarbleChapterXmlExtractor.ExtractChapter("", 1);
        Assert.That(result, Is.Null);
    }

    [Test]
    [Category("EdgeCase")]
    public void ExtractChapter_MalformedXml_ReturnsNull()
    {
        var result = MarbleChapterXmlExtractor.ExtractChapter("<not-closed", 1);
        Assert.That(result, Is.Null);
    }

    [Test]
    [Category("EdgeCase")]
    public void ExtractChapter_NoUsxBook_ReturnsNull()
    {
        // <root><something/></root> - no <usx_book> anywhere
        var result = MarbleChapterXmlExtractor.ExtractChapter("<root><x/></root>", 1);
        Assert.That(result, Is.Null);
    }

    [Test]
    [Category("EdgeCase")]
    public void ExtractChapter_RequestedChapterMissing_ReturnsNull()
    {
        // gm-001 contains chapter 1 only; ask for chapter 99
        var bookXml = File.ReadAllText(GetGoldenMasterPath("gm-001-input-usx-gen1.xml"));

        var result = MarbleChapterXmlExtractor.ExtractChapter(bookXml, 99);

        Assert.That(result, Is.Null);
    }

    #endregion

    #region Single-chapter extraction (gm-001 GEN 1)

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-019")]
    [Description("Extracts chapter 1 from gm-001 and returns a valid usx_book root with code")]
    public void ExtractChapter_Gen1_ReturnsUsxBookRootWithCode()
    {
        var bookXml = File.ReadAllText(GetGoldenMasterPath("gm-001-input-usx-gen1.xml"));

        var result = MarbleChapterXmlExtractor.ExtractChapter(bookXml, 1);

        Assert.That(result, Is.Not.Null);
        var doc = XDocument.Parse(result!);
        Assert.That(doc.Root!.Name.LocalName, Is.EqualTo("usx_book"));
        Assert.That(doc.Root.Attribute("code")?.Value, Is.EqualTo("GEN"));
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-019")]
    [Description("Extracted chapter 1 contains all 19 wg elements from gm-001 with id attributes")]
    public void ExtractChapter_Gen1_StampsIdOnEveryWg()
    {
        var bookXml = File.ReadAllText(GetGoldenMasterPath("gm-001-input-usx-gen1.xml"));

        var result = MarbleChapterXmlExtractor.ExtractChapter(bookXml, 1);

        Assert.That(result, Is.Not.Null);
        var doc = XDocument.Parse(result!);
        var wgs = doc.Descendants("wg").ToList();
        Assert.That(wgs, Has.Count.EqualTo(19), "gm-001 has 19 wg elements in chapter 1");
        foreach (var wg in wgs)
        {
            Assert.That(
                wg.Attribute("id")?.Value,
                Is.Not.Null.And.Not.Empty,
                "Every <wg> must carry a non-empty id attribute"
            );
            Assert.That(
                int.TryParse(wg.Attribute("id")!.Value, out _),
                Is.True,
                "id attribute must be a parseable integer"
            );
        }
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-019")]
    [Description("Extracted wg ids are unique within the chapter")]
    public void ExtractChapter_Gen1_WgIdsAreUnique()
    {
        var bookXml = File.ReadAllText(GetGoldenMasterPath("gm-001-input-usx-gen1.xml"));

        var result = MarbleChapterXmlExtractor.ExtractChapter(bookXml, 1);

        var doc = XDocument.Parse(result!);
        var ids = doc.Descendants("wg").Select(wg => wg.Attribute("id")!.Value).ToList();
        Assert.That(ids, Is.Unique);
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-019")]
    [Description("Marble attributes (strong, target_links, lexical_links) are preserved on wg")]
    public void ExtractChapter_Gen1_PreservesMarbleAttributesOnWg()
    {
        var bookXml = File.ReadAllText(GetGoldenMasterPath("gm-001-input-usx-gen1.xml"));

        var result = MarbleChapterXmlExtractor.ExtractChapter(bookXml, 1);

        var doc = XDocument.Parse(result!);
        var firstWg = doc.Descendants("wg").First();
        Assert.That(
            firstWg.Attribute("strong")?.Value,
            Is.EqualTo("H7225"),
            "First wg in GEN 1:1 has strong=H7225 (\"beginning\")"
        );
        Assert.That(firstWg.Attribute("target_links")?.Value, Is.Not.Null.And.Not.Empty);
        // SDBH lexical link present (avoid asserting on Hebrew text directly to dodge NFC/NFD
        // normalization issues in source-file encoding).
        Assert.That(firstWg.Attribute("lexical_links")?.Value, Does.StartWith("SDBH:"));
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-019")]
    [Description("Notes are preserved with id stamped (gm-001 has cross-reference notes)")]
    public void ExtractChapter_Gen1_StampsIdOnEveryNote()
    {
        var bookXml = File.ReadAllText(GetGoldenMasterPath("gm-001-input-usx-gen1.xml"));

        var result = MarbleChapterXmlExtractor.ExtractChapter(bookXml, 1);

        var doc = XDocument.Parse(result!);
        var notes = doc.Descendants("note").ToList();
        // Notes nested inside char xt/xo are children, not separate <note> ancestors;
        // we only stamp the top-level <note> elements.
        Assert.That(notes, Is.Not.Empty, "gm-001 has at least one cross-reference <note>");
        foreach (var note in notes)
        {
            Assert.That(note.Attribute("id")?.Value, Is.Not.Null.And.Not.Empty);
        }
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-019")]
    [Description("Paragraph and verse structure is preserved in extracted chapter")]
    public void ExtractChapter_Gen1_PreservesParaAndVerseStructure()
    {
        var bookXml = File.ReadAllText(GetGoldenMasterPath("gm-001-input-usx-gen1.xml"));

        var result = MarbleChapterXmlExtractor.ExtractChapter(bookXml, 1);

        var doc = XDocument.Parse(result!);
        Assert.That(doc.Descendants("para"), Is.Not.Empty);
        Assert.That(doc.Descendants("verse"), Is.Not.Empty);
        Assert.That(doc.Descendants("chapter"), Has.Exactly(1).Items);
    }

    #endregion

    #region Round-trip with MarbleTokenParser

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-019")]
    [Description(
        "wg ids stamped by extractor exactly match Index values that MarbleTokenParser assigns when parsing the whole book - this is the contract that lets TooltipService look up by ID"
    )]
    public void ExtractChapter_WgIds_MatchMarbleTokenParserIndices()
    {
        var bookXml = File.ReadAllText(GetGoldenMasterPath("gm-001-input-usx-gen1.xml"));

        // Reference: parse the whole book; collect (Index, Text) for every TextLink
        var parsed = MarbleTokenParser.Parse(bookXml, "TEST", bookNumber: 1, chapterNumber: 0);
        var expectedTextLinks = parsed
            .Where(t => t.Type == MarbleTokenType.TextLink)
            .Select(t => (Index: t.Index, Text: t.Text))
            .ToList();

        // Extract chapter 1; pull (id, text) from each wg
        var extracted = MarbleChapterXmlExtractor.ExtractChapter(bookXml, 1);
        var doc = XDocument.Parse(extracted!);
        var actualWgs = doc.Descendants("wg")
            .Select(wg => (Id: int.Parse(wg.Attribute("id")!.Value), Text: wg.Value))
            .ToList();

        Assert.That(actualWgs, Has.Count.EqualTo(expectedTextLinks.Count));
        for (var i = 0; i < expectedTextLinks.Count; i++)
        {
            Assert.That(
                actualWgs[i].Id,
                Is.EqualTo(expectedTextLinks[i].Index),
                $"wg #{i} id mismatch: extractor stamped {actualWgs[i].Id} but parser assigned {expectedTextLinks[i].Index} for text='{expectedTextLinks[i].Text}'"
            );
            Assert.That(
                actualWgs[i].Text,
                Is.EqualTo(expectedTextLinks[i].Text),
                $"wg #{i} text divergence at id={actualWgs[i].Id}"
            );
        }
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-019")]
    [Description(
        "note ids stamped by extractor match Index values for Note tokens from MarbleTokenParser"
    )]
    public void ExtractChapter_NoteIds_MatchMarbleTokenParserIndices()
    {
        var bookXml = File.ReadAllText(GetGoldenMasterPath("gm-001-input-usx-gen1.xml"));

        var parsed = MarbleTokenParser.Parse(bookXml, "TEST", bookNumber: 1, chapterNumber: 0);
        var expectedNoteIndices = parsed
            .Where(t => t.Type == MarbleTokenType.Note)
            .Select(t => t.Index)
            .ToList();

        var extracted = MarbleChapterXmlExtractor.ExtractChapter(bookXml, 1);
        var doc = XDocument.Parse(extracted!);
        var actualNoteIds = doc.Descendants("note")
            .Select(n => int.Parse(n.Attribute("id")!.Value))
            .ToList();

        Assert.That(actualNoteIds, Has.Count.EqualTo(expectedNoteIndices.Count));
        Assert.That(actualNoteIds, Is.EqualTo(expectedNoteIndices));
    }

    #endregion

    #region Multi-chapter slicing

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-019")]
    [Description(
        "Two-chapter book: extracting chapter 2 yields content from chapter 2 only, with token IDs that already account for chapter 1 walk"
    )]
    public void ExtractChapter_TwoChapterBook_ChapterTwoIdsContinueFromChapterOneCount()
    {
        var twoChapterXml = BuildTwoChapterBookXml();

        // Whole-book reference indices
        var parsed = MarbleTokenParser.Parse(
            twoChapterXml,
            "TEST",
            bookNumber: 1,
            chapterNumber: 0
        );
        var ch2WgIndices = parsed
            .Where(t => t.Type == MarbleTokenType.TextLink && t.Text.Trim() == "ch2word")
            .Select(t => t.Index)
            .ToList();

        // Extract chapter 2 only
        var extracted = MarbleChapterXmlExtractor.ExtractChapter(twoChapterXml, 2);
        Assert.That(extracted, Is.Not.Null);
        var doc = XDocument.Parse(extracted!);

        // Chapter element should be chapter=2 only
        var chapters = doc.Descendants("chapter").ToList();
        Assert.That(chapters, Has.Count.EqualTo(1));
        Assert.That(chapters[0].Attribute("chapter")?.Value, Is.EqualTo("2"));

        // wg "ch1word" must NOT appear in extracted chapter 2
        var allWgTexts = doc.Descendants("wg").Select(wg => wg.Value.Trim()).ToList();
        Assert.That(allWgTexts, Does.Not.Contain("ch1word"));
        Assert.That(allWgTexts, Does.Contain("ch2word"));

        // wg ids in chapter 2 should match the indices assigned by the whole-book parser
        var actualCh2Ids = doc.Descendants("wg")
            .Where(wg => wg.Value.Trim() == "ch2word")
            .Select(wg => int.Parse(wg.Attribute("id")!.Value))
            .ToList();
        Assert.That(actualCh2Ids, Is.EqualTo(ch2WgIndices));
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-019")]
    [Description("Extracting chapter 1 from a two-chapter book yields chapter-1-only content")]
    public void ExtractChapter_TwoChapterBook_ChapterOneSliced()
    {
        var twoChapterXml = BuildTwoChapterBookXml();

        var extracted = MarbleChapterXmlExtractor.ExtractChapter(twoChapterXml, 1);

        Assert.That(extracted, Is.Not.Null);
        var doc = XDocument.Parse(extracted!);
        var chapters = doc.Descendants("chapter").ToList();
        Assert.That(chapters, Has.Count.EqualTo(1));
        Assert.That(chapters[0].Attribute("chapter")?.Value, Is.EqualTo("1"));

        var allWgTexts = doc.Descendants("wg").Select(wg => wg.Value.Trim()).ToList();
        Assert.That(allWgTexts, Does.Contain("ch1word"));
        Assert.That(allWgTexts, Does.Not.Contain("ch2word"));
    }

    private static string BuildTwoChapterBookXml() =>
        """
            <?xml version='1.0' encoding='utf-8'?>
            <EmdrosDump>
            <usx version="2.0">
            <book code="GEN">
            <usx_book style="id" code="GEN">
            <chapter style="c" code="GEN" pubnumber="" chapter="1" altnumber=""/>
            <para style="p">
            <verse chapter="1" style="v" code="GEN" pubnumber="1"/>
            <wg target_links="00100100100004" strong="H1111" thematic_links="" lexical_links="" textual_links="" image_links="" map_links="">
            ch1word
            </wg>
            </para>
            <chapter style="c" code="GEN" pubnumber="" chapter="2" altnumber=""/>
            <para style="p">
            <verse chapter="2" style="v" code="GEN" pubnumber="1"/>
            <wg target_links="00100100200004" strong="H2222" thematic_links="" lexical_links="" textual_links="" image_links="" map_links="">
            ch2word
            </wg>
            </para>
            </usx_book>
            </book>
            </usx>
            </EmdrosDump>
            """;

    #endregion
}
