using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.Linguistics;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.Linguistics;

namespace TestParanextDataProvider.Linguistics;

/// <summary>
/// Tests for <see cref="HyphenationDataProvider"/>.
///
/// <para>
/// PT9 behavior comparison: PT9 cannot run on this machine, so these tests are fixture-based and
/// source-derived. Fixtures and expected values are taken from the PT9 sources at
/// ParatextData/Linguistics/Hyphenation.cs (read/write/merge rules, default settings values),
/// ParatextData.Tests/Linguistics/HyphenationDataTests.cs (the PT9 test fixture file), and
/// Paratext/Linguistics/HyphenationEngine.cs (record/remove/obliterate semantics). Because the
/// provider persists through ParatextData's own <c>Hyphenation</c>/<c>HyphenationData</c> classes
/// (the identical code PT9 ships), these tests verify both the provider's behavior and that the
/// PT9 file format round-trips byte-for-byte.
/// </para>
/// </summary>
[ExcludeFromCodeCoverage]
internal class HyphenationDataProviderTests : PapiTestBase
{
    // PT9 default values from ParatextData/Linguistics/Hyphenation.cs (HyphenationData ctor)
    private const string PT9_DEFAULT_SOFT_HYPHEN_OUT = "­";
    private const string PT9_DEFAULT_HYPHENATED_MARKERS =
        "cd iex im imi imq ip ipi ipq ipr m mi nb p p1 p2 p3 ph ph1 ph2 ph3 pi pi1 pi2 pi3 pm pmc pmo pmr";

    // PT9 file fixture from ParatextData.Tests/Linguistics/HyphenationDataTests.cs
    // (Read_RealExample_ReadsEntriesAsExpected), reproduced with explicit CRLF line endings
    private static readonly string s_pt9FixtureFile =
        "#Hyphenated Word List v2.0\r\n"
        + "#You may edit words and force them to stay as you edit them by putting an * in front of the line.\r\n"
        + "#Special equate lines used by Publishing Assistant\r\n"
        + "HardHyphen = \"-\"\r\n"
        + "SoftHyphen = \"=\"\r\n"
        + "SoftHyphenOut = \"­\"\r\n"
        + $"HyphenatedMarkers = \"{PT9_DEFAULT_HYPHENATED_MARKERS}\"\r\n"
        + "*hel=lo\r\n"
        + "a\r\n"
        + "df\r\n"
        + "f\r\n"
        + "hel\r\n"
        + "is\r\n"
        + "lo\r\n"
        + "test\r\n"
        + "this\r\n"
        + "world\r\n";

    private DummyScrText _scrText = null!; // Will be non-null when the test runs
    private ProjectDetails _projectDetails = null!; // Will be non-null when the test runs
    private HyphenationDataProvider _provider = null!; // Will be non-null when the test runs
    private string _projectId = null!; // Will be non-null when the test runs

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        _scrText = CreateDummyProject();
        _projectDetails = CreateProjectDetails(_scrText);
        ParatextProjects.FakeAddProject(_projectDetails, _scrText);
        _projectId = _projectDetails.Metadata.Id;
        _provider = new HyphenationDataProvider(Client);
    }

    [TearDown]
    public void TearDown()
    {
        _scrText?.Dispose();
    }

    #region GetHyphenationInfo

    [Test]
    public void GetHyphenationInfo_NoFile_ReturnsPt9Defaults()
    {
        HyphenationInfo info = _provider.GetHyphenationInfo(CreateSelector());

        Assert.Multiple(() =>
        {
            Assert.That(info.FileExists, Is.False);
            Assert.That(info.SoftHyphenOut, Is.EqualTo(PT9_DEFAULT_SOFT_HYPHEN_OUT));
            Assert.That(
                info.HyphenatedMarkers,
                Is.EqualTo(PT9_DEFAULT_HYPHENATED_MARKERS.Split(' ')).AsCollection
            );
            Assert.That(info.HadRedundancy, Is.False);
            Assert.That(info.HadUppercase, Is.False);
        });
    }

    [Test]
    public void GetHyphenationInfo_CustomSettingsInFile_ReturnsFileValues()
    {
        // Custom settings line format from PT9 Hyphenation.cs GetQuotedValue
        SeedHyphenationFile(
            "HardHyphen = \"-\"\r\nSoftHyphen = \"=\"\r\nSoftHyphenOut = \"~\"\r\n"
                + "HyphenatedMarkers = \"p q\"\r\n*hel=lo\r\n"
        );

        HyphenationInfo info = _provider.GetHyphenationInfo(CreateSelector());

        Assert.Multiple(() =>
        {
            Assert.That(info.FileExists, Is.True);
            Assert.That(info.SoftHyphenOut, Is.EqualTo("~"));
            Assert.That(info.HyphenatedMarkers, Is.EqualTo(new[] { "p", "q" }).AsCollection);
        });
    }

    [Test]
    public void GetHyphenationInfo_UppercaseWordInFile_ReportsHadUppercase()
    {
        SeedHyphenationFile("*Hel=lo\r\n");

        HyphenationInfo info = _provider.GetHyphenationInfo(CreateSelector());
        List<HyphenationEntry> entries = _provider.GetHyphenationEntries(CreateSelector());

        Assert.Multiple(() =>
        {
            Assert.That(info.HadUppercase, Is.True);
            // PT9 normalizes cased words to lowercase on read (FB-24204)
            Assert.That(entries, Has.Count.EqualTo(1));
            Assert.That(entries[0].Word, Is.EqualTo("hello"));
            Assert.That(entries[0].Hyphenation, Is.EqualTo("hel=lo"));
        });
    }

    #endregion

    #region GetHyphenationEntries

    [Test]
    public void GetHyphenationEntries_NoFile_ReturnsEmpty()
    {
        Assert.That(_provider.GetHyphenationEntries(CreateSelector()), Is.Empty);
    }

    [Test]
    public void GetHyphenationEntries_Pt9FixtureFile_ParsesLikePt9()
    {
        // PT9's own test expects 10 entries: 1 approved (starred) and 9 guesses
        SeedHyphenationFile(s_pt9FixtureFile);

        List<HyphenationEntry> entries = _provider.GetHyphenationEntries(CreateSelector());

        Assert.Multiple(() =>
        {
            Assert.That(entries, Has.Count.EqualTo(10));
            Assert.That(entries.Count(e => e.IsApproved), Is.EqualTo(1));
            Assert.That(entries.Count(e => !e.IsApproved), Is.EqualTo(9));
            Assert.That(entries.Single(e => e.Word == "hello").Hyphenation, Is.EqualTo("hel=lo"));
            Assert.That(entries.Single(e => e.Word == "hello").IsApproved, Is.True);
            Assert.That(entries.Any(e => e.Word == "world"), Is.True);
            // Returned in ordinal word order
            Assert.That(
                entries.Select(e => e.Word),
                Is.EqualTo(
                    entries.Select(e => e.Word).OrderBy(w => w, StringComparer.Ordinal)
                ).AsCollection
            );
        });
    }

    [TestCase("hello")]
    [TestCase("HELLO")] // Selector word is matched case-insensitively, like PT9 lookups
    public void GetHyphenationEntries_WordSelector_ReturnsSingleEntry(string selectorWord)
    {
        SeedHyphenationFile(s_pt9FixtureFile);

        List<HyphenationEntry> entries = _provider.GetHyphenationEntries(
            CreateSelector(selectorWord)
        );

        Assert.Multiple(() =>
        {
            Assert.That(entries, Has.Count.EqualTo(1));
            Assert.That(entries[0].Word, Is.EqualTo("hello"));
        });
    }

    [Test]
    public void GetHyphenationEntries_WordSelectorNoMatch_ReturnsEmpty()
    {
        SeedHyphenationFile(s_pt9FixtureFile);

        Assert.That(_provider.GetHyphenationEntries(CreateSelector("nonexistent")), Is.Empty);
    }

    [Test]
    public void GetHyphenationEntries_DuplicateGuessLines_FirstGuessWins()
    {
        // Derived from the PT9 duplicate-handling rules documented at
        // ParatextData/Linguistics/Hyphenation.cs:161-176: "if there is no approved form, the
        // first guess will be used". (Note: row 3 of the example table in that PT9 comment block
        // contradicts both this prose and the code — the code skips any duplicate guess line.)
        SeedHyphenationFile("a=ba=Fa=ri=si\r\nAba=Fa=risi\r\na=bafar=isi\r\n");

        List<HyphenationEntry> entries = _provider.GetHyphenationEntries(CreateSelector());
        HyphenationInfo info = _provider.GetHyphenationInfo(CreateSelector());

        Assert.Multiple(() =>
        {
            Assert.That(entries, Has.Count.EqualTo(1));
            Assert.That(entries[0].Word, Is.EqualTo("abafarisi"));
            Assert.That(entries[0].Hyphenation, Is.EqualTo("a=ba=fa=ri=si"));
            Assert.That(entries[0].IsApproved, Is.False);
            Assert.That(info.HadRedundancy, Is.True);
        });
    }

    [Test]
    public void GetHyphenationEntries_DuplicateApprovedLines_LastApprovedLowercaseWins()
    {
        // Derived from ParatextData/Linguistics/Hyphenation.cs:161-189: an approved (starred)
        // line replaces a guess; a later approved lowercase line replaces an earlier approved
        // line; an approved line with uppercase does NOT replace an existing approved entry.
        SeedHyphenationFile("aba=fari=si\r\n* aba=Farisi\r\n* AbaFarisi\r\n* aba=far=isi\r\n");

        List<HyphenationEntry> entries = _provider.GetHyphenationEntries(CreateSelector());

        Assert.Multiple(() =>
        {
            Assert.That(entries, Has.Count.EqualTo(1));
            Assert.That(entries[0].Word, Is.EqualTo("abafarisi"));
            Assert.That(entries[0].Hyphenation, Is.EqualTo("aba=far=isi"));
            Assert.That(entries[0].IsApproved, Is.True);
        });
    }

    #endregion

    #region SetHyphenationEntries

    [Test]
    public void SetHyphenationEntries_NewWord_PersistsPt9FileFormat()
    {
        bool result = _provider.SetHyphenationEntries(
            CreateSelector("example"),
            CreateUpdateValue("ex=am=ple", isApproved: true)
        );

        // Expected file content matches PT9 HyphenationData.Write exactly
        // (ParatextData/Linguistics/Hyphenation.cs:194-218)
        string expectedFile =
            "#Hyphenated Word List v2.0\r\n"
            + "#You may edit words and force them to stay as you edit them by putting an * in front of the line.\r\n"
            + "#Special equate lines used by Publishing Assistant\r\n"
            + "HardHyphen = \"-\"\r\n"
            + "SoftHyphen = \"=\"\r\n"
            + "SoftHyphenOut = \"­\"\r\n"
            + $"HyphenatedMarkers = \"{PT9_DEFAULT_HYPHENATED_MARKERS}\"\r\n"
            + "*ex=am=ple\r\n";

        Assert.Multiple(() =>
        {
            Assert.That(result, Is.True);
            Assert.That(ReadHyphenationFile(), Is.EqualTo(expectedFile));
        });
    }

    [Test]
    public void SetHyphenationEntries_MixedEntries_WritesApprovedFirstThenGuessesSorted()
    {
        _provider.SetHyphenationEntries(
            CreateSelector("zebra"),
            CreateUpdateValue("ze=bra", isApproved: true)
        );
        _provider.SetHyphenationEntries(
            CreateSelector("apple"),
            CreateUpdateValue("ap=ple", isApproved: false)
        );
        _provider.SetHyphenationEntries(
            CreateSelector("banana"),
            CreateUpdateValue("ba=na=na", isApproved: true)
        );

        // PT9 writes starred (approved) entries first, then guesses, each sorted ordinally
        string fileContent = ReadHyphenationFile();
        string[] entryLines = fileContent
            .Split("\r\n", StringSplitOptions.RemoveEmptyEntries)
            .Where(line => !line.StartsWith('#') && !line.Contains('"'))
            .ToArray();

        Assert.That(
            entryLines,
            Is.EqualTo(new[] { "*ba=na=na", "*ze=bra", "ap=ple" }).AsCollection
        );
    }

    [Test]
    public void SetHyphenationEntries_RoundTrip_ReadBackThroughParatextDataMatches()
    {
        _provider.SetHyphenationEntries(
            CreateSelector("example"),
            CreateUpdateValue("ex=am=ple", isApproved: true)
        );
        _provider.SetHyphenationEntries(
            CreateSelector("guessword"),
            CreateUpdateValue("guess=word", isApproved: false)
        );

        // Parse the written file with ParatextData's own reader (the PT9 oracle)
        HyphenationData readBack = HyphenationData.Read(ReadHyphenationFile());

        Assert.Multiple(() =>
        {
            Assert.That(readBack.Entries, Has.Count.EqualTo(2));
            Assert.That(readBack.Entries["example"].Hyphenation, Is.EqualTo("ex=am=ple"));
            Assert.That(readBack.Entries["example"].Guess, Is.False);
            Assert.That(readBack.Entries["guessword"].Hyphenation, Is.EqualTo("guess=word"));
            Assert.That(readBack.Entries["guessword"].Guess, Is.True);
            Assert.That(readBack.HadRedundancy, Is.False);
            Assert.That(readBack.HadUppperCase, Is.False);
        });
    }

    [Test]
    public void SetHyphenationEntries_CasedWord_StoredLowercase()
    {
        // PT9 HyphenationEngine.RecordHyphenationInternal lowercases both word and hyphenation
        // using the project's CharacterCategorizer
        _provider.SetHyphenationEntries(
            CreateSelector("Hello"),
            CreateUpdateValue("Hel=lo", isApproved: true)
        );

        List<HyphenationEntry> entries = _provider.GetHyphenationEntries(CreateSelector());

        Assert.Multiple(() =>
        {
            Assert.That(entries, Has.Count.EqualTo(1));
            Assert.That(entries[0].Word, Is.EqualTo("hello"));
            Assert.That(entries[0].Hyphenation, Is.EqualTo("hel=lo"));
        });
    }

    [TestCase("example", "ex=apmle")] // letters don't match
    [TestCase("example", "exam=pleX")] // extra character
    [TestCase("example", "")] // empty hyphenation
    [TestCase("example", "ex-am-ple")] // wrong hyphen character (PT9 requires '=')
    public void SetHyphenationEntries_InvalidHyphenation_ThrowsAndDoesNotSave(
        string word,
        string hyphenation
    )
    {
        // PT9 validation message from WordListForm.EditHyphenation (WordListForm_43)
        Assert.That(
            () =>
                _provider.SetHyphenationEntries(
                    CreateSelector(word),
                    CreateUpdateValue(hyphenation, isApproved: true)
                ),
            Throws.ArgumentException.With.Message.Contains(
                "Hyphenation must be done with '=' character and match original word"
            )
        );
        Assert.That(_provider.GetHyphenationEntries(CreateSelector()), Is.Empty);
        Assert.That(_scrText.FileManager.Exists(Hyphenation.fileName), Is.False);
    }

    [Test]
    public void SetHyphenationEntries_NoHyphensInHyphenation_IsValid()
    {
        // PT9 allows recording a word with no hyphen points (e.g., proper-name hyphenation
        // removal records word == hyphenation; WordListForm.AddRemoveNameHyphenation)
        _provider.SetHyphenationEntries(
            CreateSelector("jerusalem"),
            CreateUpdateValue("jerusalem", isApproved: true)
        );

        List<HyphenationEntry> entries = _provider.GetHyphenationEntries(CreateSelector());

        Assert.That(entries.Single().Hyphenation, Is.EqualTo("jerusalem"));
    }

    [Test]
    public void SetHyphenationEntries_Unapprove_ConvertsToGuess()
    {
        // PT9 HyphenationEngine.RemoveHyphenation converts an approved entry to a guess
        _provider.SetHyphenationEntries(
            CreateSelector("example"),
            CreateUpdateValue("ex=am=ple", isApproved: true)
        );
        _provider.SetHyphenationEntries(
            CreateSelector("example"),
            CreateUpdateValue("ex=am=ple", isApproved: false)
        );

        List<HyphenationEntry> entries = _provider.GetHyphenationEntries(CreateSelector());

        Assert.Multiple(() =>
        {
            Assert.That(entries.Single().IsApproved, Is.False);
            Assert.That(ReadHyphenationFile(), Does.Contain("ex=am=ple\r\n"));
            Assert.That(ReadHyphenationFile(), Does.Not.Contain("*ex=am=ple"));
        });
    }

    [Test]
    public void SetHyphenationEntries_Null_DeletesEntry()
    {
        // PT9 HyphenationEngine.ObliterateHyphenation removes the entry entirely
        _provider.SetHyphenationEntries(
            CreateSelector("example"),
            CreateUpdateValue("ex=am=ple", isApproved: true)
        );

        bool result = _provider.SetHyphenationEntries(CreateSelector("example"), CreateNullValue());

        Assert.Multiple(() =>
        {
            Assert.That(result, Is.True);
            Assert.That(_provider.GetHyphenationEntries(CreateSelector()), Is.Empty);
            Assert.That(ReadHyphenationFile(), Does.Not.Contain("ex=am=ple"));
        });
    }

    [Test]
    public void SetHyphenationEntries_DeleteNonexistentWord_IsIdempotentNoOp()
    {
        Assert.That(
            _provider.SetHyphenationEntries(CreateSelector("missing"), CreateNullValue()),
            Is.True
        );
        Assert.Multiple(() =>
        {
            Assert.That(_scrText.FileManager.Exists(Hyphenation.fileName), Is.False);
            // The no-op must not leave the cached Hyphenation flagged as modified — a dangling
            // "modified" write lock would later flush a phantom header-only file to disk
            Assert.That(Hyphenation.Get(_scrText).IsModified, Is.False);
        });
    }

    [TestCase("two words")] // whitespace would split the entry across lines
    [TestCase("tab\tword")]
    [TestCase("a=b")] // "=" is the hyphen marker
    [TestCase("*word")] // leading "*" is the approved-entry marker
    [TestCase("#word")] // leading "#" is the comment marker
    public void SetHyphenationEntries_UnstorableWord_ThrowsAndDoesNotSave(string word)
    {
        // NEW IN PT10 guard: PT9's Wordlist only ever supplies words tokenized from project text,
        // but PT10 exposes this as a public PAPI API, so malformed words must be rejected to
        // protect the line-based hyphenatedWords.txt format
        string hyphenation = word; // letters match, so only the word-shape check can reject it
        Assert.That(
            () =>
                _provider.SetHyphenationEntries(
                    CreateSelector(word),
                    CreateUpdateValue(hyphenation.Replace("\t", "\\t"), isApproved: true)
                ),
            Throws.ArgumentException
        );
        Assert.That(_scrText.FileManager.Exists(Hyphenation.fileName), Is.False);
    }

    [Test]
    public void SetHyphenationEntries_EmitsDataUpdateEvent()
    {
        int eventsBefore = Client.SentEventCount;

        _provider.SetHyphenationEntries(
            CreateSelector("example"),
            CreateUpdateValue("ex=am=ple", isApproved: true)
        );

        Assert.That(Client.SentEventCount, Is.EqualTo(eventsBefore + 1));
        (string eventType, object? _) = DequeueLastEvent();
        Assert.That(
            eventType,
            Is.EqualTo("platformScripture.hyphenationDataProvider-data:onDidUpdate")
        );
    }

    [Test]
    public void SetHyphenationEntries_MissingWordInSelector_Throws()
    {
        Assert.That(
            () =>
                _provider.SetHyphenationEntries(
                    CreateSelector(),
                    CreateUpdateValue("ex=am=ple", isApproved: true)
                ),
            // ArgumentNullException (a subclass) is what ThrowIfNullOrEmpty raises for null
            Throws.InstanceOf<ArgumentException>()
        );
    }

    #endregion

    #region Helper methods

    private HyphenationEntriesSelector CreateSelector(string? word = null)
    {
        return new HyphenationEntriesSelector { ProjectId = _projectId, Word = word };
    }

    private static JsonElement CreateUpdateValue(string hyphenation, bool isApproved)
    {
        return JsonDocument
            .Parse(
                $"{{\"hyphenation\":\"{hyphenation}\",\"isApproved\":{(isApproved ? "true" : "false")}}}"
            )
            .RootElement;
    }

    private static JsonElement CreateNullValue()
    {
        return JsonDocument.Parse("null").RootElement;
    }

    private void SeedHyphenationFile(string content)
    {
        _scrText.FileManager.WriteAllText(Hyphenation.fileName, content);
    }

    private string ReadHyphenationFile()
    {
        return _scrText.FileManager.ReadAllText(Hyphenation.fileName);
    }

    private (string eventType, object? eventParameters) DequeueLastEvent()
    {
        (string eventType, object? eventParameters) lastEvent = default;
        while (Client.SentEventCount > 0)
            lastEvent = Client.NextSentEvent;
        return lastEvent;
    }

    #endregion
}
