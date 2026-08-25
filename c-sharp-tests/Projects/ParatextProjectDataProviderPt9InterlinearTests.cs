using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Text;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paratext.Data;

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
    [Description(
        "A project with no interlinear files answers the change probe with an empty manifest, which consumers read as nothing to import."
    )]
    public void GetPt9InterlinearManifest_NoInterlinearFiles_ReturnsEmpty()
    {
        WriteProjectFile("Settings.xml", "<ScriptureText />");

        var manifest = _provider.GetPt9InterlinearManifest();

        Assert.That(manifest, Is.Empty);
    }

    [Test]
    [Description(
        "The manifest covers the interlinear book files, the lexicon, and the stored word analyses; the setups file rides the data payload without change detection, so its edits never signal change."
    )]
    public void GetPt9InterlinearManifest_ListsConvertedFilesButNeverTheSetupsFile()
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
                    "Interlinear_en/Interlinear_en_JAS.xml",
                    "Interlinear_es/Interlinear_es_MAT.xml",
                }
            )
        );
    }

    [Test]
    [Description(
        "File and directory casing never hides interlinear data: the scan matches lowercased names the way PT9 classifies files."
    )]
    public void GetPt9InterlinearManifest_FindsFilesWhateverTheirCasing()
    {
        WriteProjectFile("lexicon.xml", LexiconXml);
        WriteProjectFile("interlinear_en/interlinear_en_jas.xml", InterlinearEnJasXml);
        WriteProjectFile("Interlinear_fr.xml", InterlinearEsMatXml);

        var manifest = _provider.GetPt9InterlinearManifest();

        Assert.That(
            manifest.Keys,
            Is.EquivalentTo(
                new[]
                {
                    "lexicon.xml",
                    "interlinear_en/interlinear_en_jas.xml",
                    "Interlinear_fr.xml",
                }
            )
        );
    }

    [Test]
    [Description(
        "Only real path separators are normalized to forward slashes, so where the separator is a forward slash, a backslash inside a file name stays a name character and cannot smuggle path segments into a key."
    )]
    public void GetPt9InterlinearManifest_KeepsALiteralBackslashFileNameCharacterInTheKey()
    {
        // A backslash is a file-name character only where the separator is '/', so this scenario
        // cannot exist on Windows.
        if (OperatingSystem.IsWindows())
            Assert.Ignore("Backslash file names are impossible on Windows");
        WriteProjectFile("Interlinear_en_..\\evil.xml", InterlinearEsMatXml);

        var manifest = _provider.GetPt9InterlinearManifest();

        Assert.That(manifest.Keys, Is.EquivalentTo(new[] { "Interlinear_en_..\\evil.xml" }));
    }

    [Test]
    [Description(
        "An unreadable project directory throws the typed error rather than posing as a project with no interlinear data."
    )]
    public void GetPt9InterlinearManifest_UnreadableProjectDirectory_ThrowsInsteadOfReadingEmpty()
    {
        // A file where the project directory should be makes enumeration fail with an IO error on
        // every platform, standing in for an unreadable or unreachable directory.
        string fileAsDirectory = Path.GetTempFileName();
        try
        {
            var details = new ProjectDetails(
                "BadDir",
                new ProjectMetadata(HexId.CreateNew().ToString(), []),
                fileAsDirectory
            );
            using var scrText = new DummyScrText(details);
            ParatextProjects.FakeAddProject(details, scrText);
            var provider = new DummyParatextProjectDataProvider(
                PdpName,
                Client,
                details,
                ParatextProjects
            );

            var exception = Assert.Throws<InvalidDataException>(
                () => provider.GetPt9InterlinearManifest()
            );

            Assert.That(exception!.Message, Does.Contain("cannot be read"));
        }
        finally
        {
            File.Delete(fileAsDirectory);
        }
    }

    [Test]
    [Description(
        "Manifest values are the lowercase SHA-256 hex of the file's raw bytes, pinned against a known-answer digest so the contract cannot drift with the implementation."
    )]
    public void GetPt9InterlinearManifest_HashesRawBytesAsLowercaseHex()
    {
        WriteProjectFile("Lexicon.xml", "<Lexicon />");

        var manifest = _provider.GetPt9InterlinearManifest();

        Assert.That(manifest["Lexicon.xml"], Is.EqualTo(EmptyLexiconSha256));
    }

    [Test]
    [Description("The manifest is read-only; the setter always throws.")]
    public void SetPt9InterlinearManifest_Throws()
    {
        Assert.Throws<NotSupportedException>(() => _provider.SetPt9InterlinearManifest(null));
    }

    #endregion

    #region Parsed data

    [Test]
    [Description(
        "A project with no interlinear files yields an empty payload rather than an error."
    )]
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
    [Description(
        "Setups parse from the setups file with their type and language identity, and a model-less setup serves absent model fields."
    )]
    public void GetPt9InterlinearData_ParsesSetups()
    {
        WriteProjectFile("InterlinearSetup.xml", SetupXml);

        var data = _provider.GetPt9InterlinearData();

        Assert.That(data.Setups, Has.Count.EqualTo(1));
        Assert.Multiple(() =>
        {
            Assert.That(data.Setups[0].Type, Is.EqualTo("GlossingWithoutModel"));
            Assert.That(data.Setups[0].LanguageId, Is.EqualTo("en"));
            Assert.That(data.Setups[0].LanguageName, Is.EqualTo("English"));
            Assert.That(data.Setups[0].ModelScrTextName, Is.Null);
            Assert.That(data.Setups[0].ModelScrTextId, Is.Null);
        });
    }

    [Test]
    [Description(
        "A setup's model text name and id are served as written, and PT9's __EMPTY__ sentinel means no model, so both model fields are absent."
    )]
    public void GetPt9InterlinearData_ServesSetupModelTextAndTreatsTheEmptySentinelAsNone()
    {
        WriteProjectFile(
            "InterlinearSetup.xml",
            """
            <InterlinearSetupList>
              <InterlinearSetup type="BackTranslation" language="fr">
                <MdlScrTextName>MDL</MdlScrTextName>
                <MdlScrTextId>1234567890abcdef</MdlScrTextId>
              </InterlinearSetup>
              <InterlinearSetup type="Glossing" language="de">
                <MdlScrTextName>__EMPTY__</MdlScrTextName>
              </InterlinearSetup>
            </InterlinearSetupList>
            """
        );

        var data = _provider.GetPt9InterlinearData();

        Assert.That(data.Setups, Has.Count.EqualTo(2));
        Assert.Multiple(() =>
        {
            Assert.That(data.Setups[0].Type, Is.EqualTo("BackTranslation"));
            Assert.That(data.Setups[0].ModelScrTextName, Is.EqualTo("MDL"));
            Assert.That(data.Setups[0].ModelScrTextId, Is.EqualTo("1234567890abcdef"));
            Assert.That(data.Setups[1].ModelScrTextName, Is.Null);
            Assert.That(data.Setups[1].ModelScrTextId, Is.Null);
        });
    }

    [Test]
    [Description(
        "With no setups file, setups are reconstructed from the legacy InterlinearRelatedLanguages project settings the way PT9 rebuilds them, and the read writes nothing back to the project."
    )]
    public void GetPt9InterlinearData_RebuildsSetupsFromLegacySettingsWithoutWriting()
    {
        using var modelScrText = new DummyScrText(
            CreateProjectDetails(HexId.CreateNew().ToString(), "MDL")
        );
        ParatextProjects.FakeAddProject(CreateProjectDetails(modelScrText), modelScrText);
        _scrText.Settings.SetSetting("InterlinearRelatedLanguages." + modelScrText.Name, "True");

        var data = _provider.GetPt9InterlinearData();

        Assert.That(data.Setups, Has.Count.EqualTo(1));
        Assert.Multiple(() =>
        {
            Assert.That(data.Setups[0].Type, Is.EqualTo("Glossing"));
            Assert.That(data.Setups[0].LanguageId, Is.EqualTo("dmy"));
            Assert.That(data.Setups[0].ModelScrTextName, Is.EqualTo(modelScrText.Name));
            Assert.That(data.Setups[0].ModelScrTextId, Is.EqualTo(modelScrText.Guid.ToString()));
        });
        Assert.That(_scrText.FileManager.Exists("InterlinearSetup.xml"), Is.False);
    }

    [Test]
    [Description(
        "A settings-derived setup is skipped when the setups file already covers its language, matching PT9's own merge."
    )]
    public void GetPt9InterlinearData_SkipsSettingsSetupWhoseLanguageTheFileAlreadyCovers()
    {
        using var modelScrText = new DummyScrText(
            CreateProjectDetails(HexId.CreateNew().ToString(), "MDL")
        );
        ParatextProjects.FakeAddProject(CreateProjectDetails(modelScrText), modelScrText);
        _scrText.Settings.SetSetting("InterlinearRelatedLanguages." + modelScrText.Name, "True");
        // The dummy model project's language id, so the settings-derived setup is a duplicate.
        WriteProjectFile(
            "InterlinearSetup.xml",
            """
            <InterlinearSetupList>
              <InterlinearSetup type="Glossing" language="dmy" />
            </InterlinearSetupList>
            """
        );

        var data = _provider.GetPt9InterlinearData();

        Assert.That(data.Setups, Has.Count.EqualTo(1));
        Assert.That(data.Setups[0].ModelScrTextName, Is.Null);
    }

    [Test]
    [Description(
        "Lexicon entries serve their lexeme identity, senses, and per-language glosses as PT9 stores them."
    )]
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
    [Description(
        "The legacy analyses PT8-era projects keep inside Lexicon.xml are served as word parses of composed lexeme ids."
    )]
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
    [Description("Stored word analyses serve each wordform's ordered lexeme-id breakdowns.")]
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
    [Description(
        "One book file serves its language and book identity from its own attributes plus every verse's approval hash, clusters, ranges, exclusion flags, and lexeme references."
    )]
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
    [Description(
        "Every language directory's book files are served, each identified by its own attributes."
    )]
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
    [Description(
        "Lowercase-named files parse as their kind, and a root-level book file is served with identity from its attributes, never from its file name."
    )]
    public void GetPt9InterlinearData_ParsesLowercaseNamedFilesAndRootLevelBookFiles()
    {
        WriteProjectFile("lexicon.xml", LexiconXml);
        WriteProjectFile("Interlinear_fr.xml", InterlinearEsMatXml);

        var data = _provider.GetPt9InterlinearData();

        Assert.That(data.Lexicon, Is.Not.Null);
        // Book identity comes from the data's own attributes, never from the file name.
        Assert.That(
            data.Books.Select(book => (book.GlossLanguage, book.BookId)),
            Is.EqualTo(new[] { ("es", "MAT") })
        );
    }

    [Test]
    [Description("A UTF-8 byte order mark does not fail the parse.")]
    public void GetPt9InterlinearData_ParsesFileWithByteOrderMark()
    {
        var bom = new byte[] { 0xEF, 0xBB, 0xBF };
        WriteProjectFile("InterlinearSetup.xml", [.. bom, .. Encoding.UTF8.GetBytes(SetupXml)]);

        var data = _provider.GetPt9InterlinearData();

        Assert.That(data.Setups, Has.Count.EqualTo(1));
        Assert.That(data.Setups[0].LanguageId, Is.EqualTo("en"));
    }

    [Test]
    [Description(
        "A corrupt file fails the whole request with the typed error naming the project-relative path, and the file is never renamed or recovered."
    )]
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
    [Description(
        "A word-analyses entry missing its Word attribute fails the file as corrupt, exactly as "
            + "PT9's own load fails it, so the served word field is never absent."
    )]
    public void GetPt9InterlinearData_WordAnalysesEntryMissingItsWord_ThrowsAsCorrupt()
    {
        WriteProjectFile(
            "WordAnalyses.xml",
            """
            <WordAnalyses>
              <Entry>
                <Analysis>
                  <Lexeme>Stem:walk</Lexeme>
                </Analysis>
              </Entry>
            </WordAnalyses>
            """
        );

        var exception = Assert.Throws<InvalidDataException>(
            () => _provider.GetPt9InterlinearData()
        );

        Assert.That(exception!.Message, Does.Contain("WordAnalyses.xml"));
    }

    [Test]
    [Description(
        "A lexicon key missing its Form attribute fails the file as corrupt, exactly as PT9's "
            + "own load fails it, so the served form field is never absent."
    )]
    public void GetPt9InterlinearData_LexiconKeyMissingItsForm_ThrowsAsCorrupt()
    {
        WriteProjectFile(
            "Lexicon.xml",
            """
            <Lexicon>
              <Entries>
                <item>
                  <Lexeme Type="Word" />
                  <Entry />
                </item>
              </Entries>
            </Lexicon>
            """
        );

        var exception = Assert.Throws<InvalidDataException>(
            () => _provider.GetPt9InterlinearData()
        );

        Assert.That(exception!.Message, Does.Contain("Lexicon.xml"));
    }

    [Test]
    [Description(
        "A file carrying a DOCTYPE fails as corrupt exactly as it would in Paratext 9, which "
            + "prohibits DTDs, so entity expansion can never run."
    )]
    public void GetPt9InterlinearData_FileWithDoctype_ThrowsAsCorrupt()
    {
        WriteProjectFile(
            "Lexicon.xml",
            """
            <?xml version="1.0"?>
            <!DOCTYPE Lexicon [<!ENTITY a "aaaa">]>
            <Lexicon />
            """
        );

        var exception = Assert.Throws<InvalidDataException>(
            () => _provider.GetPt9InterlinearData()
        );

        Assert.That(exception!.Message, Does.Contain("Lexicon.xml"));
    }

    [Test]
    [Description(
        "A cluster element with no lexeme children serves an empty lexeme list rather than "
            + "failing the read."
    )]
    public void GetPt9InterlinearData_ClusterWithNoLexemes_ServesEmptyLexemeList()
    {
        WriteProjectFile(
            "Interlinear_en/Interlinear_en_JAS.xml",
            """
            <InterlinearData GlossLanguage="en" BookId="JAS">
              <Verses>
                <item>
                  <string>JAS 1:1</string>
                  <VerseData>
                    <Cluster>
                      <Range Index="0" Length="4" />
                      <Excluded>true</Excluded>
                    </Cluster>
                  </VerseData>
                </item>
              </Verses>
            </InterlinearData>
            """
        );

        var data = _provider.GetPt9InterlinearData();

        var cluster = data.Books[0].Verses[0].Clusters[0];
        Assert.Multiple(() =>
        {
            Assert.That(cluster.Lexemes, Is.Empty);
            Assert.That(cluster.Excluded, Is.True);
        });
    }

    [Test]
    [Description(
        "Files whose total exceeds the response cap throw the documented too-large error before the crossing file is parsed, so a response can never tear down the connection."
    )]
    public void GetPt9InterlinearData_FilesOverSizeLimit_ThrowsTooLargeInsteadOfResponding()
    {
        // Content is never parsed when the size guard trips, so padding bytes suffice.
        var padding = new byte[51 * 1024 * 1024];
        WriteProjectFile("Interlinear_en/Interlinear_en_JAS.xml", padding);

        var exception = Assert.Throws<InvalidDataException>(
            () => _provider.GetPt9InterlinearData()
        );

        Assert.That(
            exception!.Message,
            Does.StartWith(Pt9InterlinearReader.Pt9InterlinearDataTooLargeMessagePrefix)
        );
    }

    [Test]
    [Description("The parsed data is read-only; the setter always throws.")]
    public void SetPt9InterlinearData_Throws()
    {
        Assert.Throws<NotSupportedException>(() => _provider.SetPt9InterlinearData(null));
    }

    #endregion

    #region Path containment

    // Symbolic-link creation can be a privileged operation (e.g. Windows without developer
    // mode), so tests that need one skip rather than fail where the OS refuses.
    private static void CreateLinkOrIgnore(string linkPath, string targetPath, bool isDirectory)
    {
        try
        {
            if (isDirectory)
                Directory.CreateSymbolicLink(linkPath, targetPath);
            else
                File.CreateSymbolicLink(linkPath, targetPath);
        }
        catch (Exception e) when (e is IOException or UnauthorizedAccessException)
        {
            Assert.Ignore($"Symbolic links cannot be created in this environment: {e.Message}");
        }
    }

    [Test]
    [Description(
        "A regular file and a link whose target stays inside the project both pass the containment guard."
    )]
    public void EnsurePt9PathStaysInProject_RegularFileAndInProjectLink_Pass()
    {
        string projectDirectory = Directory.CreateTempSubdirectory().FullName;
        try
        {
            File.WriteAllText(Path.Join(projectDirectory, "Lexicon.xml"), "<Lexicon />");
            Assert.DoesNotThrow(
                () =>
                    Pt9InterlinearReader.EnsurePt9PathStaysInProject(
                        projectDirectory,
                        "Lexicon.xml"
                    )
            );

            CreateLinkOrIgnore(
                Path.Join(projectDirectory, "link.xml"),
                Path.Join(projectDirectory, "Lexicon.xml"),
                isDirectory: false
            );
            Assert.DoesNotThrow(
                () => Pt9InterlinearReader.EnsurePt9PathStaysInProject(projectDirectory, "link.xml")
            );
        }
        finally
        {
            Directory.Delete(projectDirectory, true);
        }
    }

    [Test]
    [Description(
        "A file link resolving outside the project throws rather than serving foreign content."
    )]
    public void EnsurePt9PathStaysInProject_FileLinkOutOfProject_Throws()
    {
        string projectDirectory = Directory.CreateTempSubdirectory().FullName;
        string outsideFile = Path.GetTempFileName();
        try
        {
            CreateLinkOrIgnore(
                Path.Join(projectDirectory, "Lexicon.xml"),
                outsideFile,
                isDirectory: false
            );

            var exception = Assert.Throws<InvalidDataException>(
                () =>
                    Pt9InterlinearReader.EnsurePt9PathStaysInProject(
                        projectDirectory,
                        "Lexicon.xml"
                    )
            );

            Assert.That(exception!.Message, Does.Contain("outside the project"));
        }
        finally
        {
            Directory.Delete(projectDirectory, true);
            File.Delete(outsideFile);
        }
    }

    [Test]
    [Description(
        "A directory link resolving outside the project throws rather than enumerating foreign content."
    )]
    public void EnsurePt9PathStaysInProject_DirectoryLinkOutOfProject_Throws()
    {
        string projectDirectory = Directory.CreateTempSubdirectory().FullName;
        string outsideDirectory = Directory.CreateTempSubdirectory().FullName;
        try
        {
            CreateLinkOrIgnore(
                Path.Join(projectDirectory, "Interlinear_en"),
                outsideDirectory,
                isDirectory: true
            );

            Assert.Throws<InvalidDataException>(
                () =>
                    Pt9InterlinearReader.EnsurePt9PathStaysInProject(
                        projectDirectory,
                        "Interlinear_en"
                    )
            );
        }
        finally
        {
            Directory.Delete(projectDirectory, true);
            Directory.Delete(outsideDirectory, true);
        }
    }

    #endregion

    #region Wire surface

    private static readonly string[] s_pt9InterlinearWireMethods =
    [
        "getPt9InterlinearManifest",
        "setPt9InterlinearManifest",
        "getPt9InterlinearData",
        "setPt9InterlinearData",
    ];

    [Test]
    [Description(
        "Both getters declare their own request timeout, so a cold cap-sized read is not cut off by the client default."
    )]
    public void Pt9InterlinearGetters_CarryAnExplicitNetworkTimeout()
    {
        foreach (var methodName in new[] { "GetPt9InterlinearManifest", "GetPt9InterlinearData" })
        {
            var attribute = typeof(ParatextProjectDataProvider)
                .GetMethod(methodName)!
                .GetCustomAttribute<NetworkTimeoutAttribute>();
            Assert.That(attribute, Is.Not.Null, methodName);
        }
    }

    [Test]
    [Description("A project advertising the interface registers the PT9 wire methods.")]
    public void GetFunctions_ProjectAdvertisingPt9Interlinear_RegistersTheWireMethods()
    {
        var details = CreateProjectDetails(
            _scrText.Guid.ToString(),
            _scrText.Name,
            [ProjectInterfaces.PT9_INTERLINEAR]
        );
        var provider = new DummyParatextProjectDataProvider(
            PdpName,
            Client,
            details,
            ParatextProjects
        );

        Assert.That(
            provider.GetRegisteredFunctionNames(),
            Is.SupersetOf(s_pt9InterlinearWireMethods)
        );
    }

    [Test]
    [Description(
        "PT9 interlinear is advertised to unpublished projects and never to published ones."
    )]
    public void GetParatextProjectInterfaces_AdvertisesPt9InterlinearOnlyForUnpublishedProjects()
    {
        Assert.Multiple(() =>
        {
            Assert.That(
                LocalParatextProjects.GetParatextProjectInterfaces(isPublished: false),
                Does.Contain(ProjectInterfaces.PT9_INTERLINEAR)
            );
            Assert.That(
                LocalParatextProjects.GetParatextProjectInterfaces(isPublished: true),
                Does.Not.Contain(ProjectInterfaces.PT9_INTERLINEAR)
            );
        });
    }

    [Test]
    [Description(
        "A project that does not advertise the interface exposes none of the PT9 wire methods, so the wire surface matches the advertisement."
    )]
    public void GetFunctions_ProjectNotAdvertisingPt9Interlinear_RegistersNoneOfTheWireMethods()
    {
        // The fixture's project details carry no projectInterfaces, the same shape a published
        // PDP's interface list has for PT9 interlinear.
        Assert.That(
            _provider.GetRegisteredFunctionNames().Intersect(s_pt9InterlinearWireMethods),
            Is.Empty
        );
    }

    #endregion
}
