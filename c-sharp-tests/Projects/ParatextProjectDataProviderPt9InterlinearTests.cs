using System.Diagnostics.CodeAnalysis;
using System.Text;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class ParatextProjectDataProviderPt9InterlinearTests : PapiTestBase
{
    private const string PdpName = "pt9InterlinearTestProject";

    // SHA-256 of the exact bytes "<Lexicon />", pinned so the manifest's hash contract (lowercase
    // hex over raw bytes) is asserted against a known answer rather than a mirror of the
    // implementation.
    private const string EmptyLexiconSha256 =
        "2ad3a102d833fd2128e242272aa3f1c914e6c092e2bb10f834f9ca59b4a0c9c1";

    private const string SetupXml = """
        <?xml version="1.0" encoding="utf-8"?>
        <InterlinearSetupList>
          <InterlinearSetup type="GlossingWithoutModel" language="en">
            <LanguageName>English</LanguageName>
            <FontName>Sylfaen</FontName>
            <FontSize>14</FontSize>
            <RightToLeft>false</RightToLeft>
          </InterlinearSetup>
        </InterlinearSetupList>
        """;

    private const string LexiconXml = """
        <?xml version="1.0" encoding="utf-8"?>
        <Lexicon>
          <Language>kal</Language>
          <FontName>Arial</FontName>
          <FontSize>10</FontSize>
          <Analyses>
            <item>
              <string>runs</string>
              <ArrayOfLexeme>
                <Lexeme Type="Stem" Form="run" Homograph="1" />
                <Lexeme Type="Suffix" Form="s" Homograph="1" />
              </ArrayOfLexeme>
            </item>
          </Analyses>
          <Entries>
            <item>
              <Lexeme Type="Word" Form="greetings" Homograph="1" />
              <Entry>
                <Sense Id="LIdslQen">
                  <Gloss Language="en">greetings</Gloss>
                  <Gloss Language="es">saludos</Gloss>
                </Sense>
              </Entry>
            </item>
          </Entries>
        </Lexicon>
        """;

    private const string WordAnalysesXml = """
        <?xml version="1.0" encoding="utf-8"?>
        <WordAnalyses>
          <Entry Word="walked">
            <Analysis>
              <Lexeme>Stem:walk</Lexeme>
              <Lexeme>Suffix:ed</Lexeme>
            </Analysis>
          </Entry>
        </WordAnalyses>
        """;

    private const string InterlinearEnJasXml = """
        <?xml version="1.0" encoding="utf-8"?>
        <InterlinearData GlossLanguage="en" BookId="JAS">
          <Verses>
            <item>
              <string>JAS 1:2</string>
              <VerseData Hash="approvedhash123">
                <Cluster>
                  <Range Index="5" Length="9" />
                  <Lexeme Id="Word:greetings" GlossId="LIdslQen" />
                </Cluster>
                <Cluster>
                  <Range Index="15" Length="2" />
                  <Lexeme Id="Word:to" />
                  <Excluded>true</Excluded>
                </Cluster>
                <Punctuation>
                  <Range Index="27" Length="1" />
                  <BeforeText>,</BeforeText>
                  <AfterText>;</AfterText>
                </Punctuation>
              </VerseData>
            </item>
            <item>
              <string>JAS 1:3</string>
              <VerseData>
                <Cluster>
                  <Range Index="0" Length="3" />
                  <Lexeme Id="Stem:fo" />
                  <Lexeme Id="Suffix:r" />
                </Cluster>
              </VerseData>
            </item>
          </Verses>
        </InterlinearData>
        """;

    private const string InterlinearEsMatXml = """
        <?xml version="1.0" encoding="utf-8"?>
        <InterlinearData GlossLanguage="es" BookId="MAT">
          <Verses>
            <item>
              <string>MAT 1:1</string>
              <VerseData>
                <Cluster>
                  <Range Index="0" Length="4" />
                  <Lexeme Id="Word:esto" />
                </Cluster>
              </VerseData>
            </item>
          </Verses>
        </InterlinearData>
        """;

    private DummyScrText _scrText = null!;
    private DummyParatextProjectDataProvider _provider = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        _scrText = CreateDummyProject();
        ProjectDetails projectDetails = CreateProjectDetails(_scrText);
        ParatextProjects.FakeAddProject(projectDetails, _scrText);
        _provider = new DummyParatextProjectDataProvider(
            PdpName,
            Client,
            projectDetails,
            ParatextProjects
        );
    }

    [TearDown]
    public void TearDown()
    {
        _scrText?.Dispose();
    }

    // Writes bytes to a project-relative path (forward slashes) through the project's file
    // manager, so the provider under test reads exactly what the test seeded.
    private void WriteProjectFile(string relativePath, byte[] bytes)
    {
        using var writer = _scrText.FileManager.OpenFileForByteWrite(relativePath);
        writer.Write(bytes);
    }

    private void WriteProjectFile(string relativePath, string text) =>
        WriteProjectFile(relativePath, Encoding.UTF8.GetBytes(text));

    #region Manifest

    [Test]
    public void GetPt9InterlinearManifest_NoInterlinearFiles_ReturnsEmpty()
    {
        WriteProjectFile("Settings.xml", "<ScriptureText />");

        var manifest = _provider.GetPt9InterlinearManifest();

        Assert.That(manifest, Is.Empty);
    }

    [Test]
    public void GetPt9InterlinearManifest_ListsRootAndPerLanguageFiles()
    {
        WriteProjectFile("Lexicon.xml", LexiconXml);
        WriteProjectFile("WordAnalyses.xml", WordAnalysesXml);
        WriteProjectFile("InterlinearSetup.xml", SetupXml);
        WriteProjectFile("Interlinear_en/Interlinear_en_JAS.xml", InterlinearEnJasXml);
        WriteProjectFile("Interlinear_es/Interlinear_es_MAT.xml", InterlinearEsMatXml);
        WriteProjectFile("Notes_reviewer.xml", "<CommentList />");

        var manifest = _provider.GetPt9InterlinearManifest();

        Assert.That(
            manifest.Keys,
            Is.EquivalentTo(
                new[]
                {
                    "Lexicon.xml",
                    "WordAnalyses.xml",
                    "InterlinearSetup.xml",
                    "Interlinear_en/Interlinear_en_JAS.xml",
                    "Interlinear_es/Interlinear_es_MAT.xml",
                }
            )
        );
    }

    [Test]
    public void GetPt9InterlinearManifest_HashesRawBytesAsLowercaseHex()
    {
        WriteProjectFile("Lexicon.xml", "<Lexicon />");

        var manifest = _provider.GetPt9InterlinearManifest();

        Assert.That(manifest["Lexicon.xml"], Is.EqualTo(EmptyLexiconSha256));
    }

    [Test]
    public void SetPt9InterlinearManifest_Throws()
    {
        Assert.Throws<NotSupportedException>(() => _provider.SetPt9InterlinearManifest(null));
    }

    #endregion

    #region Parsed data

    [Test]
    public void GetPt9InterlinearData_NoInterlinearFiles_ReturnsEmptyPayload()
    {
        var data = _provider.GetPt9InterlinearData();

        Assert.Multiple(() =>
        {
            Assert.That(data.Setups, Is.Empty);
            Assert.That(data.Books, Is.Empty);
            Assert.That(data.Lexicon, Is.Null);
            Assert.That(data.WordAnalyses, Is.Empty);
            Assert.That(data.HasAssociatedLexicalProject, Is.False);
        });
    }

    [Test]
    public void GetPt9InterlinearData_ParsesSetups()
    {
        WriteProjectFile("InterlinearSetup.xml", SetupXml);

        var data = _provider.GetPt9InterlinearData();

        Assert.That(data.Setups, Has.Count.EqualTo(1));
        Assert.Multiple(() =>
        {
            Assert.That(data.Setups[0].LanguageId, Is.EqualTo("en"));
            Assert.That(data.Setups[0].LanguageName, Is.EqualTo("English"));
        });
    }

    [Test]
    public void GetPt9InterlinearData_ParsesLexiconEntriesSensesAndGlosses()
    {
        WriteProjectFile("Lexicon.xml", LexiconXml);

        var data = _provider.GetPt9InterlinearData();

        Assert.That(data.Lexicon, Is.Not.Null);
        Assert.That(data.Lexicon!.Language, Is.EqualTo("kal"));
        Assert.That(data.Lexicon.Entries, Has.Count.EqualTo(1));
        var entry = data.Lexicon.Entries[0];
        Assert.Multiple(() =>
        {
            Assert.That(entry.Type, Is.EqualTo("Word"));
            Assert.That(entry.Form, Is.EqualTo("greetings"));
            Assert.That(entry.Homograph, Is.EqualTo(1));
        });
        Assert.That(entry.Senses, Has.Count.EqualTo(1));
        Assert.That(entry.Senses[0].Id, Is.EqualTo("LIdslQen"));
        Assert.That(
            entry.Senses[0].Glosses.Select(gloss => (gloss.Language, gloss.Text)),
            Is.EqualTo(new[] { ("en", "greetings"), ("es", "saludos") })
        );
    }

    [Test]
    public void GetPt9InterlinearData_ParsesLegacyLexiconAnalyses()
    {
        WriteProjectFile("Lexicon.xml", LexiconXml);

        var data = _provider.GetPt9InterlinearData();

        Assert.That(data.Lexicon!.LegacyAnalyses, Has.Count.EqualTo(1));
        Assert.Multiple(() =>
        {
            Assert.That(data.Lexicon.LegacyAnalyses[0].Word, Is.EqualTo("runs"));
            Assert.That(
                data.Lexicon.LegacyAnalyses[0].Analyses,
                Is.EqualTo(new[] { new[] { "Stem:run", "Suffix:s" } })
            );
        });
    }

    [Test]
    public void GetPt9InterlinearData_ParsesWordAnalyses()
    {
        WriteProjectFile("WordAnalyses.xml", WordAnalysesXml);

        var data = _provider.GetPt9InterlinearData();

        Assert.That(data.WordAnalyses, Has.Count.EqualTo(1));
        Assert.Multiple(() =>
        {
            Assert.That(data.WordAnalyses[0].Word, Is.EqualTo("walked"));
            Assert.That(
                data.WordAnalyses[0].Analyses,
                Is.EqualTo(new[] { new[] { "Stem:walk", "Suffix:ed" } })
            );
        });
    }

    [Test]
    public void GetPt9InterlinearData_ParsesBookVersesClustersAndLexemes()
    {
        WriteProjectFile("Interlinear_en/Interlinear_en_JAS.xml", InterlinearEnJasXml);

        var data = _provider.GetPt9InterlinearData();

        Assert.That(data.Books, Has.Count.EqualTo(1));
        var book = data.Books[0];
        Assert.Multiple(() =>
        {
            Assert.That(book.GlossLanguage, Is.EqualTo("en"));
            Assert.That(book.BookId, Is.EqualTo("JAS"));
        });

        var verse2 = book.Verses.Single(verse => verse.Reference == "JAS 1:2");
        Assert.That(verse2.ApprovedHash, Is.EqualTo("approvedhash123"));
        Assert.That(verse2.Clusters, Has.Count.EqualTo(2));
        Assert.Multiple(() =>
        {
            Assert.That(verse2.Clusters[0].Index, Is.EqualTo(5));
            Assert.That(verse2.Clusters[0].Length, Is.EqualTo(9));
            Assert.That(verse2.Clusters[0].Excluded, Is.False);
            Assert.That(verse2.Clusters[0].Lexemes[0].LexemeId, Is.EqualTo("Word:greetings"));
            Assert.That(verse2.Clusters[0].Lexemes[0].SenseId, Is.EqualTo("LIdslQen"));
            Assert.That(verse2.Clusters[1].Excluded, Is.True);
            Assert.That(verse2.Clusters[1].Lexemes[0].SenseId, Is.Null);
        });
        Assert.That(verse2.Punctuations, Has.Count.EqualTo(1));
        Assert.Multiple(() =>
        {
            Assert.That(verse2.Punctuations[0].BeforeText, Is.EqualTo(","));
            Assert.That(verse2.Punctuations[0].AfterText, Is.EqualTo(";"));
        });

        var verse3 = book.Verses.Single(verse => verse.Reference == "JAS 1:3");
        Assert.That(verse3.ApprovedHash, Is.Null);
        Assert.That(
            verse3.Clusters[0].Lexemes.Select(lexeme => lexeme.LexemeId),
            Is.EqualTo(new[] { "Stem:fo", "Suffix:r" })
        );
    }

    [Test]
    public void GetPt9InterlinearData_ParsesEveryLanguageAndBook()
    {
        WriteProjectFile("Interlinear_en/Interlinear_en_JAS.xml", InterlinearEnJasXml);
        WriteProjectFile("Interlinear_es/Interlinear_es_MAT.xml", InterlinearEsMatXml);

        var data = _provider.GetPt9InterlinearData();

        Assert.That(
            data.Books.Select(book => (book.GlossLanguage, book.BookId)),
            Is.EquivalentTo(new[] { ("en", "JAS"), ("es", "MAT") })
        );
    }

    [Test]
    public void GetPt9InterlinearData_ParsesFileWithByteOrderMark()
    {
        var bom = new byte[] { 0xEF, 0xBB, 0xBF };
        WriteProjectFile("InterlinearSetup.xml", [.. bom, .. Encoding.UTF8.GetBytes(SetupXml)]);

        var data = _provider.GetPt9InterlinearData();

        Assert.That(data.Setups, Has.Count.EqualTo(1));
        Assert.That(data.Setups[0].LanguageId, Is.EqualTo("en"));
    }

    [Test]
    public void GetPt9InterlinearData_CorruptFile_ThrowsNamingThePathAndLeavesFileUntouched()
    {
        WriteProjectFile("Lexicon.xml", "this is not xml");

        var exception = Assert.Throws<InvalidDataException>(
            () => _provider.GetPt9InterlinearData()
        );

        Assert.That(exception!.Message, Does.Contain("Lexicon.xml"));
        // The read must never fall into ParatextData's corrupt-file recovery, which renames the
        // file on disk; the project's file must remain exactly where it was.
        Assert.That(_scrText.FileManager.Exists("Lexicon.xml"), Is.True);
    }

    [Test]
    public void SetPt9InterlinearData_Throws()
    {
        Assert.Throws<NotSupportedException>(() => _provider.SetPt9InterlinearData(null));
    }

    #endregion
}
