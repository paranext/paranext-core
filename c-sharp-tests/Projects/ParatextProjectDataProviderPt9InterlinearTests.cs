using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Text;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.Users;

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

    // Snapshot of every project setting, for asserting a read writes none of them - not even
    // the conversion stamp PT9's own loader writes when rebuilding setups from settings.
    private static Dictionary<string, string> SnapshotSettings(ScrText scrText) =>
        scrText
            .Settings.GetSettingNamesMatchingPrefix("")
            .ToDictionary(name => name, name => scrText.Settings.GetSetting(name));

    // A fixed registration for tests that need RegistrationInfo.DefaultUser to carry a name on
    // machines with no Paratext registration. Assigning RegistrationInfo.Implementation clears
    // the cached user in both directions, so swapping this in and back out leaks no state.
    private sealed class DummyRegistrationInfo : RegistrationInfo
    {
        protected override bool AcceptLicense(UserLicenseFlags licenseFlags) => true;

        protected override RegistrationData GetRegistrationData() => new("Test User", "");

        protected override void HandleDeletedRegistration() { }

        protected override void HandleChangedRegistrationData(RegistrationData registrationData) { }
    }

    #region Manifest

    [Test]
    [Description(
        "Every file hashes to its own pinned digest, so a path-to-digest mis-pairing cannot "
            + "pass, and a byte order mark is part of the hashed bytes."
    )]
    public void GetPt9InterlinearManifest_HashesEveryFileToItsOwnDigest()
    {
        WriteProjectFile("Lexicon.xml", "<Lexicon />");
        WriteProjectFile("WordAnalyses.xml", "<WordAnalyses />");
        var bom = new byte[] { 0xEF, 0xBB, 0xBF };
        WriteProjectFile(
            "Interlinear_en/Interlinear_en_MAT.xml",
            [
                .. bom,
                .. Encoding.UTF8.GetBytes(
                    """<InterlinearData GlossLanguage="en" BookId="MAT" />"""
                ),
            ]
        );

        var manifest = _provider.GetPt9InterlinearManifest();

        Assert.That(
            manifest,
            Is.EqualTo(
                new Dictionary<string, string>
                {
                    ["Lexicon.xml"] = EmptyLexiconSha256,
                    ["WordAnalyses.xml"] =
                        "2f15afee7dcc2e42656055ac25edb582e9416bf64cc1f9a9c522c89651237a0d",
                    // The digest of the byte order mark plus the content, so the BOM bytes are
                    // change-detected too.
                    ["Interlinear_en/Interlinear_en_MAT.xml"] =
                        "41ad49b32868973eca592a8fb4e77f8d69301af221e408b4ed9d962d9f6916f3",
                }
            )
        );
    }

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
        // Windows. Unix maps that state to directory-not-found, which legitimately reads as a
        // project with no data, so there a directory with no permissions provides the unreadable
        // state instead.
        string unreadablePath;
        if (OperatingSystem.IsWindows())
        {
            unreadablePath = Path.GetTempFileName();
        }
        else
        {
            // Permissions do not bind root, so the unreadable state cannot be constructed there.
            if (Environment.IsPrivilegedProcess)
                Assert.Ignore("Running privileged; an unreadable directory cannot be constructed.");
            unreadablePath = Directory.CreateTempSubdirectory().FullName;
            File.SetUnixFileMode(unreadablePath, UnixFileMode.None);
        }
        try
        {
            var details = new ProjectDetails(
                "BadDir",
                new ProjectMetadata(HexId.CreateNew().ToString(), []),
                unreadablePath
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
            if (OperatingSystem.IsWindows())
            {
                File.Delete(unreadablePath);
            }
            else
            {
                File.SetUnixFileMode(
                    unreadablePath,
                    UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.UserExecute
                );
                Directory.Delete(unreadablePath, true);
            }
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
        "Setups parse from the setups file with their type, language identity, and display "
            + "fields, and a model-less setup serves absent model fields."
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
            Assert.That(data.Setups[0].FontName, Is.EqualTo("Sylfaen"));
            Assert.That(data.Setups[0].FontSize, Is.EqualTo(14));
            Assert.That(data.Setups[0].RightToLeft, Is.False);
            Assert.That(data.Setups[0].ModelScrTextName, Is.Null);
            Assert.That(data.Setups[0].ModelScrTextId, Is.Null);
            Assert.That(data.Setups[0].ExportOnApprove, Is.False);
            Assert.That(data.Setups[0].ExportScrTextName, Is.Null);
        });
    }

    [Test]
    [Description(
        "A setup's model and export fields are served as written; PT9's __EMPTY__ sentinel "
            + "means no model text, so the model name is absent while the id PT9 minted for the "
            + "setup still serves, and empty strings serve as absent."
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
                <MdlIsResource>true</MdlIsResource>
                <RelatedLanguages>true</RelatedLanguages>
                <ExportOnApprove>true</ExportOnApprove>
                <ExportScrTextName>EXP</ExportScrTextName>
                <ExportScrTextId>abcdef1234567890</ExportScrTextId>
              </InterlinearSetup>
              <InterlinearSetup type="Glossing" language="de">
                <MdlScrTextName>__EMPTY__</MdlScrTextName>
                <MdlScrTextId>fedcba0987654321</MdlScrTextId>
                <ExportScrTextName></ExportScrTextName>
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
            Assert.That(data.Setups[0].ModelIsResource, Is.True);
            Assert.That(data.Setups[0].RelatedLanguages, Is.True);
            Assert.That(data.Setups[0].ExportOnApprove, Is.True);
            Assert.That(data.Setups[0].ExportScrTextName, Is.EqualTo("EXP"));
            Assert.That(data.Setups[0].ExportScrTextId, Is.EqualTo("abcdef1234567890"));
            Assert.That(data.Setups[1].ModelScrTextName, Is.Null);
            Assert.That(data.Setups[1].ModelScrTextId, Is.EqualTo("fedcba0987654321"));
            Assert.That(data.Setups[1].ExportScrTextName, Is.Null);
        });
    }

    [Test]
    [Description(
        "With no setups file, setups are reconstructed from the legacy InterlinearRelatedLanguages project settings the way PT9 rebuilds them, including the export half, and the read writes nothing back to the project."
    )]
    public void GetPt9InterlinearData_RebuildsSetupsFromLegacySettingsWithoutWriting()
    {
        using var modelScrText = new DummyScrText(
            CreateProjectDetails(HexId.CreateNew().ToString(), "MDL")
        );
        ParatextProjects.FakeAddProject(CreateProjectDetails(modelScrText), modelScrText);
        _scrText.Settings.SetSetting("InterlinearRelatedLanguages." + modelScrText.Name, "True");
        _scrText.Settings.SetSetting("InterlinearExportText." + modelScrText.Name, "EXP");
        _scrText.Settings.SetSetting(
            "InterlinearExportTextId." + modelScrText.Name,
            "abcdef1234567890"
        );
        _scrText.Settings.SetSetting("InterlinearExportOnApprove." + modelScrText.Name, "True");
        var settingsBefore = SnapshotSettings(_scrText);

        var data = _provider.GetPt9InterlinearData();

        Assert.That(data.Setups, Has.Count.EqualTo(1));
        Assert.Multiple(() =>
        {
            Assert.That(data.Setups[0].Type, Is.EqualTo("Glossing"));
            Assert.That(data.Setups[0].LanguageId, Is.EqualTo("dmy"));
            Assert.That(data.Setups[0].ModelScrTextName, Is.EqualTo(modelScrText.Name));
            Assert.That(data.Setups[0].ModelScrTextId, Is.EqualTo(modelScrText.Guid.ToString()));
            Assert.That(data.Setups[0].RelatedLanguages, Is.True);
            Assert.That(data.Setups[0].ExportOnApprove, Is.True);
            Assert.That(data.Setups[0].ExportScrTextName, Is.EqualTo("EXP"));
            Assert.That(data.Setups[0].ExportScrTextId, Is.EqualTo("abcdef1234567890"));
        });
        Assert.That(_scrText.FileManager.Exists("InterlinearSetup.xml"), Is.False);
        // Not even the conversion stamp PT9's own loader writes on this path is written.
        Assert.That(SnapshotSettings(_scrText), Is.EqualTo(settingsBefore));
    }

    [Test]
    [Description(
        "A malformed export text id in the legacy settings reads as no id rather than failing "
            + "the request; the rest of the setup still serves."
    )]
    public void GetPt9InterlinearData_ToleratesAMalformedLegacyExportTextId()
    {
        using var modelScrText = new DummyScrText(
            CreateProjectDetails(HexId.CreateNew().ToString(), "MDL")
        );
        ParatextProjects.FakeAddProject(CreateProjectDetails(modelScrText), modelScrText);
        _scrText.Settings.SetSetting("InterlinearRelatedLanguages." + modelScrText.Name, "True");
        _scrText.Settings.SetSetting("InterlinearExportTextId." + modelScrText.Name, "not hex");

        var data = _provider.GetPt9InterlinearData();

        Assert.That(data.Setups, Has.Count.EqualTo(1));
        Assert.That(data.Setups[0].ExportScrTextId, Is.Null);
    }

    [Test]
    [Description(
        "Legacy settings are not merged for a user PT9 has already stamped as converted, so a "
            + "setup deleted after conversion stays deleted."
    )]
    public void GetPt9InterlinearData_SkipsSettingsMergeForAConvertedUser()
    {
        using var modelScrText = new DummyScrText(
            CreateProjectDetails(HexId.CreateNew().ToString(), "MDL")
        );
        ParatextProjects.FakeAddProject(CreateProjectDetails(modelScrText), modelScrText);
        _scrText.Settings.SetSetting("InterlinearRelatedLanguages." + modelScrText.Name, "True");

        // A fixed registration, so the stamp can name a user on machines with no Paratext
        // registration (the hosted CI runners) too.
        var previousRegistration = RegistrationInfo.Implementation;
        RegistrationInfo.Implementation = new DummyRegistrationInfo();
        try
        {
            _scrText.Settings.InterlinearConversionCompletedBy =
            [
                RegistrationInfo.DefaultUser.Name,
            ];

            var data = _provider.GetPt9InterlinearData();

            Assert.That(data.Setups, Is.Empty);
        }
        finally
        {
            RegistrationInfo.Implementation = previousRegistration;
        }
    }

    [Test]
    [Description(
        "A legacy-settings model whose language id cannot be resolved contributes no setup; a "
            + "setup without a language id has no interlinear data to key."
    )]
    public void GetPt9InterlinearData_SkipsSettingsSetupWhoseModelHasNoLanguageId()
    {
        using var modelScrText = new DummyScrText(
            CreateProjectDetails(HexId.CreateNew().ToString(), "MDL")
        );
        modelScrText.Settings.LanguageID = null;
        ParatextProjects.FakeAddProject(CreateProjectDetails(modelScrText), modelScrText);
        _scrText.Settings.SetSetting("InterlinearRelatedLanguages." + modelScrText.Name, "True");

        var data = _provider.GetPt9InterlinearData();

        Assert.That(data.Setups, Is.Empty);
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
        // The project's language id replaces the file's value, exactly as PT9 rewrites it on read.
        Assert.That(data.Lexicon!.Language, Is.EqualTo("dmy"));
        Assert.That(data.Lexicon.Entries, Has.Count.EqualTo(1));
        var entry = data.Lexicon.Entries[0];
        Assert.Multiple(() =>
        {
            // Homograph 1 is PT9's default, so the composed id omits it.
            Assert.That(entry.Id, Is.EqualTo("Word:greetings"));
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
        "The lexicon is cleaned the way PT9 cleans it on every read: forms are corrected to the "
            + "project's normalization and empty legacy analyses are dropped."
    )]
    public void GetPt9InterlinearData_CleansTheLexiconAsPt9Reads()
    {
        // A decomposed form (e plus combining acute); the project's normalization composes it.
        string decomposed = "cafe\u0301";
        WriteProjectFile(
            "Lexicon.xml",
            $"""
            <Lexicon>
              <Analyses>
                <item>
                  <string>{decomposed}s</string>
                  <ArrayOfLexeme>
                    <Lexeme Type="Stem" Form="{decomposed}" Homograph="1" />
                  </ArrayOfLexeme>
                </item>
                <item>
                  <string>empty</string>
                  <ArrayOfLexeme />
                </item>
              </Analyses>
              <Entries>
                <item>
                  <Lexeme Type="Word" Form="{decomposed}" Homograph="1" />
                  <Entry />
                </item>
                <item>
                  <Lexeme Type="Word" Form="{decomposed}" Homograph="2" />
                  <Entry />
                </item>
              </Entries>
            </Lexicon>
            """
        );

        var data = _provider.GetPt9InterlinearData();

        Assert.Multiple(() =>
        {
            Assert.That(data.Lexicon!.Entries[0].Form, Is.EqualTo("caf\u00e9"));
            // Ids are composed from the cleaned form; a homograph other than 1 is appended.
            Assert.That(data.Lexicon.Entries[0].Id, Is.EqualTo("Word:caf\u00e9"));
            Assert.That(data.Lexicon.Entries[1].Id, Is.EqualTo("Word:caf\u00e9:2"));
            Assert.That(data.Lexicon.LegacyAnalyses, Has.Count.EqualTo(1));
            Assert.That(data.Lexicon.LegacyAnalyses[0].Word, Is.EqualTo("caf\u00e9s"));
            Assert.That(
                data.Lexicon.LegacyAnalyses[0].Analyses,
                Is.EqualTo(new[] { new[] { "Stem:caf\u00e9" } })
            );
        });
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
            Assert.That(book.FilePath, Is.EqualTo("Interlinear_en/Interlinear_en_JAS.xml"));
            Assert.That(book.IsCanonicalPath, Is.True);
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
        Assert.That(data.Books[0].IsCanonicalPath, Is.False);
    }

    [Test]
    [Description(
        "A Send/Receive merge can leave a root-level twin beside the canonical file; both are "
            + "served, distinguished by path, and only the canonical one is marked as the file "
            + "PT9 reads."
    )]
    public void GetPt9InterlinearData_ServesMergeResidueTwinsDistinguishedByPath()
    {
        WriteProjectFile("Interlinear_en/Interlinear_en_JAS.xml", InterlinearEnJasXml);
        WriteProjectFile("Interlinear_en_JAS.xml", InterlinearEnJasXml);

        var data = _provider.GetPt9InterlinearData();

        Assert.That(
            data.Books.Select(book => (book.FilePath, book.IsCanonicalPath)),
            Is.EquivalentTo(
                new[]
                {
                    ("Interlinear_en/Interlinear_en_JAS.xml", true),
                    ("Interlinear_en_JAS.xml", false),
                }
            )
        );
    }

    [Test]
    [Description(
        "A verse key that does not parse as a verse reference (e.g. a Send/Receive conflict "
            + "marker) is dropped exactly as PT9's own read drops it; parseable verses still serve."
    )]
    public void GetPt9InterlinearData_DropsVerseKeysThatDoNotParse()
    {
        WriteProjectFile(
            "Interlinear_en/Interlinear_en_JAS.xml",
            """
            <InterlinearData GlossLanguage="en" BookId="JAS">
              <Verses>
                <item>
                  <string>JAS 1:2</string>
                  <VerseData>
                    <Cluster>
                      <Range Index="0" Length="4" />
                      <Lexeme Id="Word:this" />
                    </Cluster>
                  </VerseData>
                </item>
                <item>
                  <string>&lt;&lt;&lt;&lt;&lt;&lt;&lt; local</string>
                  <VerseData />
                </item>
              </Verses>
            </InterlinearData>
            """
        );

        var data = _provider.GetPt9InterlinearData();

        Assert.That(data.Books, Has.Count.EqualTo(1));
        Assert.That(data.Books[0].Verses, Has.Count.EqualTo(1));
        Assert.That(data.Books[0].Verses[0].Reference, Is.EqualTo("JAS 1:2"));
    }

    [Test]
    [Description(
        "A nil verse entry, which PT9's own dictionary reader admits but nothing can carry, "
            + "fails the request with the typed error rather than an unhandled null reference."
    )]
    public void GetPt9InterlinearData_NilVerseData_ThrowsTheTypedError()
    {
        WriteProjectFile(
            "Interlinear_en/Interlinear_en_JAS.xml",
            """
            <InterlinearData GlossLanguage="en" BookId="JAS"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
              <Verses>
                <item>
                  <string>JAS 1:2</string>
                  <VerseData xsi:nil="true" />
                </item>
              </Verses>
            </InterlinearData>
            """
        );

        var exception = Assert.Throws<InvalidDataException>(
            () => _provider.GetPt9InterlinearData()
        );

        Assert.That(exception!.Message, Does.Contain("PT9 interlinear data"));
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
        "Bytes PT9's tolerant decoding accepts are served, not failed: the declaration's legacy "
            + "encoding is ignored and an invalid byte becomes the replacement character."
    )]
    public void GetPt9InterlinearData_ReadsLegacyEncodingsAsPt9Does()
    {
        // The form ends in windows-1252 0xE9, which is not valid UTF-8; the placeholder keeps
        // this source ASCII-only.
        byte[] xmlBytes =
        [
            .. Encoding
                .UTF8.GetBytes(
                    """
                    <?xml version="1.0" encoding="windows-1252"?>
                    <Lexicon>
                      <Entries>
                        <item>
                          <Lexeme Type="Word" Form="caf#" Homograph="1" />
                          <Entry />
                        </item>
                      </Entries>
                    </Lexicon>
                    """
                )
                .Select(b => b == (byte)'#' ? (byte)0xE9 : b),
        ];
        WriteProjectFile("Lexicon.xml", xmlBytes);

        var data = _provider.GetPt9InterlinearData();

        Assert.That(data.Lexicon!.Entries[0].Form, Is.EqualTo("caf\uFFFD"));
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
        // The cause chain is stripped at the read boundary: inner exceptions serialize across
        // the RPC boundary and can carry absolute filesystem paths.
        Assert.That(exception.InnerException, Is.Null);
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
        "Files whose total exceeds the response cap throw the documented too-large error before the crossing file is parsed."
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
        // The machine-readable channel, preserved across the boundary's cause-chain strip.
        Assert.That(
            exception.Data[PlatformErrorCodes.PlatformErrorCodeDataKey],
            Is.EqualTo(PlatformErrorCodes.ResourceExhausted)
        );
    }

    [Test]
    [Description(
        "The manifest shares the size cap: files whose total exceeds it throw the documented "
            + "too-large error instead of hashing an arbitrarily large corpus on every probe."
    )]
    public void GetPt9InterlinearManifest_FilesOverSizeLimit_ThrowsTooLarge()
    {
        // Content is never hashed when the size guard trips, so padding bytes suffice.
        var padding = new byte[51 * 1024 * 1024];
        WriteProjectFile("Interlinear_en/Interlinear_en_JAS.xml", padding);

        var exception = Assert.Throws<InvalidDataException>(
            () => _provider.GetPt9InterlinearManifest()
        );

        Assert.That(
            exception!.Message,
            Does.StartWith(Pt9InterlinearReader.Pt9InterlinearDataTooLargeMessagePrefix)
        );
        // The machine-readable channel, preserved across the boundary's cause-chain strip.
        Assert.That(
            exception.Data[PlatformErrorCodes.PlatformErrorCodeDataKey],
            Is.EqualTo(PlatformErrorCodes.ResourceExhausted)
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
        "The link containment guard runs against the real filesystem during a read: a scanned "
            + "file that is a link out of the project fails the whole request through the public "
            + "API."
    )]
    public void GetPt9InterlinearData_FileLinkingOutOfTheProject_ThrowsThroughThePublicApi()
    {
        string projectDirectory = Directory.CreateTempSubdirectory().FullName;
        string outsideDirectory = Directory.CreateTempSubdirectory().FullName;
        try
        {
            File.WriteAllText(Path.Join(outsideDirectory, "target.xml"), "<Lexicon />");
            CreateLinkOrIgnore(
                Path.Join(projectDirectory, "Lexicon.xml"),
                Path.Join(outsideDirectory, "target.xml"),
                isDirectory: false
            );
            var details = new ProjectDetails(
                "LinkProj",
                new ProjectMetadata(HexId.CreateNew().ToString(), []),
                projectDirectory
            );
            using var scrText = new DummyScrText(details);
            ParatextProjects.FakeAddProject(details, scrText);
            var provider = new DummyParatextProjectDataProvider(
                PdpName,
                Client,
                details,
                ParatextProjects
            );
            // The scan lists files from the project file manager, so the linked file must exist
            // there too; the guard then checks the real path on disk.
            using (var writer = scrText.FileManager.OpenFileForByteWrite("Lexicon.xml"))
                writer.Write(Encoding.UTF8.GetBytes("<Lexicon />"));

            var exception = Assert.Throws<InvalidDataException>(
                () => provider.GetPt9InterlinearData()
            );

            Assert.That(exception!.Message, Does.Contain("outside the project"));
        }
        finally
        {
            Directory.Delete(projectDirectory, true);
            Directory.Delete(outsideDirectory, true);
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
        "Both getters declare a two-minute request timeout, so a cold cap-sized read is not cut off by the client default."
    )]
    public void Pt9InterlinearGetters_CarryAnExplicitNetworkTimeout()
    {
        foreach (var methodName in new[] { "GetPt9InterlinearManifest", "GetPt9InterlinearData" })
        {
            var attribute = typeof(ParatextProjectDataProvider)
                .GetMethod(methodName)!
                .GetCustomAttribute<NetworkTimeoutAttribute>();
            Assert.That(attribute!.TimeoutMilliseconds, Is.EqualTo(120_000), methodName);
        }
    }

    [Test]
    [Description(
        "A project advertising the interface puts the PT9 wire methods on the wire through real "
            + "registration, not a reflection shortcut."
    )]
    public async Task RegisterDataProviderAsync_ProjectAdvertisingPt9Interlinear_PutsTheWireMethodsOnTheWireAsync()
    {
        var details = CreateProjectDetails(
            HexId.CreateNew().ToString(),
            "Pt9WireProj",
            [ProjectInterfaces.PT9_INTERLINEAR]
        );
        ParatextProjects.FakeAddProject(details);
        var provider = new ParatextProjectDataProvider(
            "pt9WirePdp",
            Client,
            details,
            ParatextProjects
        );
        await provider.RegisterDataProviderAsync();

        foreach (var methodName in s_pt9InterlinearWireMethods)
        {
            Assert.That(
                Client.RegisteredRequestTypes.Any(type => type.EndsWith($".{methodName}")),
                Is.True,
                methodName
            );
        }
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
        "A project that does not advertise the interface puts none of the PT9 wire methods on "
            + "the wire, so the wire surface matches the advertisement."
    )]
    public async Task RegisterDataProviderAsync_ProjectNotAdvertisingPt9Interlinear_PutsNoneOfTheWireMethodsOnTheWireAsync()
    {
        // Project details carrying no projectInterfaces: the same shape a published PDP's
        // interface list has for PT9 interlinear.
        var details = CreateProjectDetails(HexId.CreateNew().ToString(), "PlainWireProj");
        ParatextProjects.FakeAddProject(details);
        var provider = new ParatextProjectDataProvider(
            "plainWirePdp",
            Client,
            details,
            ParatextProjects
        );
        await provider.RegisterDataProviderAsync();

        foreach (var methodName in s_pt9InterlinearWireMethods)
        {
            Assert.That(
                Client.RegisteredRequestTypes.Any(type => type.EndsWith($".{methodName}")),
                Is.False,
                methodName
            );
        }
    }

    #endregion
}
