using System.Diagnostics.CodeAnalysis;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.RegularExpressions;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Corpus sweep: every Paratext-flavored USFM fixture in
    /// <c>lib/platform-bible-utils/src/scripture/usj-reader-writer-test-data/</c> is put through the
    /// provider's real chapter conversion path — <see cref="ParatextProjectDataProvider.GetChapterUsx"/>
    /// (forExport, chapter-scoped), <see cref="ParatextProjectDataProvider.SetChapterUsx"/>, and
    /// <see cref="ParatextProjectDataProvider.GetChapterUsfm"/> — and every byte that changes is pinned
    /// in <c>UsfmUsxRoundTripCorpusSweep.expected-diffs.json</c>.
    ///
    /// <para>
    /// Fixtures are discovered at run time (<c>testUSFM-*.usfm</c> and <c>web-matthew-*.usfm</c>,
    /// skipping the <c>-canonical-</c> USFM 3.1 spec variants, which ParatextData 9.5 cannot read), and
    /// every <c>\c</c> in a fixture becomes its own test case, so a new fixture is swept without
    /// touching this file.
    /// </para>
    ///
    /// <para>
    /// Each case seeds the fixture as a whole book with <c>ScrText.PutText</c> (the write that
    /// <see cref="ParatextProjectDataProvider.SetBookUsfm"/> performs), then compares these legs:
    /// </para>
    /// <list type="bullet">
    ///   <item><c>load</c>: the fixture's chapter bytes against <c>GetChapterUsfm</c> straight after
    ///   seeding — what ParatextData's write normalization does to authored USFM.</item>
    ///   <item><c>trip1</c>: that stored chapter against <c>GetChapterUsfm</c> after one
    ///   <c>GetChapterUsx</c> → <c>SetChapterUsx</c> trip — what the editor's first save does.</item>
    ///   <item><c>trip2-usfm</c> / <c>trip2-usx</c>: the trip1 output against a second trip's USFM, and
    ///   the first trip's USX against the second trip's USX. Both must be empty: a non-fixed point
    ///   means every save rewrites the chapter again.</item>
    ///   <item><c>neighbor-chN</c>: every OTHER chapter of the fixture, before seeding the trips versus
    ///   after both — a chapter save must not touch its neighbors.</item>
    /// </list>
    ///
    /// <para>
    /// Two seeding choices are deliberate. Paratext stores every book with CRLF line endings
    /// regardless of platform (<c>ScrText.PutText</c> standardizes them), so the fixture's chapter is
    /// compared after the same LF → CRLF standardization; line endings are not content. And
    /// <c>PutText</c> refuses a book without an <c>\id</c> line, so a fixture that holds a later
    /// chapter only (no <c>\id</c>) is seeded behind a bare <c>\id BOOK</c> line taken from its file
    /// name; that line belongs to chapter 1, so the fixture's own chapters are compared unchanged.
    /// </para>
    ///
    /// <para>
    /// The project uses the real <c>usfm.sty</c> (see <see cref="DummyScrText.UseStandardStylesheet"/>):
    /// the corpus exercises the whole USFM 3.0 marker set. The markers it uses that usfm.sty does not
    /// define (<c>\ref</c> among them) are deliberate — they round-trip as unknown markers, exactly
    /// as in a real project.
    /// </para>
    ///
    /// <para>
    /// The expected-diff list is SHRINK-ONLY. A diff that is not listed fails its case, and so does
    /// a listed diff that no longer occurs — remove the entry. A failure prints ready-to-paste
    /// entries; every entry needs a one-line reason.
    /// </para>
    ///
    /// <para>
    /// Every case also compares the first <c>GetChapterUsx</c> output with its committed capture in
    /// <c>usj-reader-writer-test-data/pdp-usx/</c>, which scripture-editors consumes as real provider
    /// output. Run with <c>PDP_USX_CAPTURE=1</c> to rewrite the captures instead of comparing them.
    /// </para>
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class UsfmUsxRoundTripCorpusSweepTests : PapiTestBase
    {
        private const string PdpName = "usfm-usx-corpus-sweep";
        private const string CaptureEnvironmentVariable = "PDP_USX_CAPTURE";

        private static readonly string s_repoRoot = FindRepoRoot();
        private static readonly string s_corpusDirectory = Path.Combine(
            s_repoRoot,
            "lib",
            "platform-bible-utils",
            "src",
            "scripture",
            "usj-reader-writer-test-data"
        );
        private static readonly string s_captureDirectory = Path.Combine(
            s_corpusDirectory,
            "pdp-usx"
        );
        private static readonly string s_expectedDiffsPath = Path.Combine(
            s_repoRoot,
            "c-sharp-tests",
            "Projects",
            "UsfmUsxRoundTripCorpusSweep.expected-diffs.json"
        );

        private static readonly UTF8Encoding s_utf8NoBom = new(false);

        // A chapter marker: `\c` then whitespace then the number. `\ca`, `\cat`, `\cp` and `\cd`
        // never match because the marker name must end right after the `c`.
        private static readonly Regex s_chapterMarker =
            new(@"(?<=^|\s)\\c\s+(\d+)", RegexOptions.Multiline);

        private static readonly JsonSerializerOptions s_jsonOptions =
            new()
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                PropertyNameCaseInsensitive = true,
                WriteIndented = true,
                Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
            };

        private DummyScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _scrText = CreateDummyProject();
            _scrText.UseStandardStylesheet();
            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
        }

        public static IEnumerable<TestCaseData> FixtureChapters()
        {
            foreach (string fixture in DiscoverFixtures())
            {
                foreach (int chapter in ReadFixture(fixture).Chapters.Keys)
                {
                    yield return new TestCaseData(fixture, chapter).SetName(
                        $"RoundTrip({fixture}, ch{chapter})"
                    );
                }
            }
        }

        [TestCaseSource(nameof(FixtureChapters))]
        public void FixtureChapter_RoundTripsThroughProvider_WithOnlyListedDiffs(
            string fixture,
            int chapter
        )
        {
            CorpusFixture corpus = ReadFixture(fixture);
            int bookNum = Canon.BookIdToNumber(corpus.BookId);
            _scrText.PutText(bookNum, 0, false, corpus.SeededBookUsfm, null);

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            var verseRef = new VerseRef(bookNum, chapter, 0);

            Dictionary<int, string> neighborsBefore = corpus
                .Chapters.Keys.Where(other => other != chapter)
                .ToDictionary(
                    other => other,
                    other => provider.GetChapterUsfm(new VerseRef(bookNum, other, 0))
                );

            string stored = provider.GetChapterUsfm(verseRef);
            string usx1 = provider.GetChapterUsx(verseRef);
            provider.SetChapterUsx(verseRef, usx1);
            string usfm1 = provider.GetChapterUsfm(verseRef);
            string usx2 = provider.GetChapterUsx(verseRef);
            provider.SetChapterUsx(verseRef, usx2);
            string usfm2 = provider.GetChapterUsfm(verseRef);

            List<DiffHunk> actual = [];
            actual.AddRange(
                ComputeHunks("load", ToCrLf(corpus.Chapters[chapter]), stored, TokenizeLines)
            );
            actual.AddRange(ComputeHunks("trip1", stored, usfm1, TokenizeLines));
            actual.AddRange(ComputeHunks("trip2-usfm", usfm1, usfm2, TokenizeLines));
            actual.AddRange(ComputeHunks("trip2-usx", usx1, usx2, TokenizeXmlTags));
            foreach ((int other, string before) in neighborsBefore)
            {
                string after = provider.GetChapterUsfm(new VerseRef(bookNum, other, 0));
                actual.AddRange(ComputeHunks($"neighbor-ch{other}", before, after, TokenizeLines));
            }

            List<string> problems = CompareWithExpectedDiffs(fixture, chapter, actual);
            problems.AddRange(CheckCapture(fixture, chapter, usx1));

            Assert.That(
                problems,
                Is.Empty,
                string.Join(Environment.NewLine + Environment.NewLine, problems)
            );
        }

        [Test]
        public void ExpectedDiffsAndCaptures_NameOnlyDiscoveredFixtureChapters()
        {
            HashSet<(string Fixture, int Chapter)> discovered = DiscoverFixtures()
                .SelectMany(fixture =>
                    ReadFixture(fixture).Chapters.Keys.Select(chapter => (fixture, chapter))
                )
                .ToHashSet();

            List<string> problems = [];
            foreach (ExpectedDiff entry in LoadExpectedDiffs())
            {
                if (!discovered.Contains((entry.Fixture, entry.Chapter)))
                    problems.Add(
                        $"Expected-diff entry names {entry.Fixture} ch{entry.Chapter}, which is "
                            + "not a discovered fixture chapter; remove it."
                    );
                if (string.IsNullOrWhiteSpace(entry.Reason) || entry.Reason == "TODO")
                    problems.Add(
                        $"Expected-diff entry {entry.Fixture} ch{entry.Chapter} {entry.Leg} line "
                            + $"{entry.Line} has no reason."
                    );
            }

            HashSet<string> expectedCaptures = discovered
                .Select(fixtureChapter =>
                    CaptureFileName(fixtureChapter.Fixture, fixtureChapter.Chapter)
                )
                .ToHashSet();
            foreach (
                string capture in Directory
                    .EnumerateFiles(s_captureDirectory, "*.usx")
                    .Select(path => Path.GetFileName(path))
            )
            {
                if (!expectedCaptures.Contains(capture))
                    problems.Add(
                        $"Capture pdp-usx/{capture} has no matching fixture chapter; remove it."
                    );
            }

            Assert.That(problems, Is.Empty, string.Join(Environment.NewLine, problems));
        }

        #region Fixtures

        private sealed record CorpusFixture(
            string BookId,
            string SeededBookUsfm,
            SortedDictionary<int, string> Chapters
        );

        private static IEnumerable<string> DiscoverFixtures() =>
            Directory
                .EnumerateFiles(s_corpusDirectory, "*.usfm")
                .Select(path => Path.GetFileName(path))
                .Where(name =>
                    (
                        name.StartsWith("testUSFM-", StringComparison.Ordinal)
                        || name.StartsWith("web-matthew-", StringComparison.Ordinal)
                    ) && !name.Contains("-canonical-", StringComparison.Ordinal)
                )
                .OrderBy(name => name, StringComparer.Ordinal);

        /// <summary>
        /// Reads a fixture and splits it into chapters the way ParatextData does: a chapter runs from
        /// its <c>\c</c> marker to the next one, and the first chapter also owns everything before
        /// its marker (the book header).
        /// </summary>
        private static CorpusFixture ReadFixture(string fixture)
        {
            string usfm = File.ReadAllText(Path.Combine(s_corpusDirectory, fixture), s_utf8NoBom);

            Match idLine = Regex.Match(usfm, @"^\\id\s+(\S+)");
            string bookId = idLine.Success ? idLine.Groups[1].Value : BookIdFromFileName(fixture);
            string seeded = idLine.Success ? usfm : $"\\id {bookId}\n{usfm}";

            MatchCollection markers = s_chapterMarker.Matches(usfm);
            if (markers.Count == 0)
                throw new InvalidDataException($"Fixture {fixture} has no \\c marker.");

            SortedDictionary<int, string> chapters = [];
            for (int i = 0; i < markers.Count; i++)
            {
                int start = i == 0 ? 0 : markers[i].Index;
                int end = i + 1 < markers.Count ? markers[i + 1].Index : usfm.Length;
                chapters.Add(int.Parse(markers[i].Groups[1].Value), usfm[start..end]);
            }

            return new CorpusFixture(bookId, seeded, chapters);
        }

        private static string BookIdFromFileName(string fixture)
        {
            Match testUsfm = Regex.Match(fixture, @"^testUSFM-([0-9A-Z]{3})-");
            if (testUsfm.Success)
                return testUsfm.Groups[1].Value;
            if (fixture.StartsWith("web-matthew-", StringComparison.Ordinal))
                return "MAT";
            throw new InvalidDataException(
                $"Fixture {fixture} has no \\id line and its file name names no book."
            );
        }

        private static string ToCrLf(string text) => text.Replace("\r", "").Replace("\n", "\r\n");

        private static string FindRepoRoot()
        {
            for (
                DirectoryInfo? directory = new(AppContext.BaseDirectory);
                directory != null;
                directory = directory.Parent
            )
            {
                if (
                    Directory.Exists(
                        Path.Combine(directory.FullName, "lib", "platform-bible-utils")
                    ) && Directory.Exists(Path.Combine(directory.FullName, "c-sharp-tests"))
                )
                    return directory.FullName;
            }
            throw new DirectoryNotFoundException(
                $"No paranext-core repo root above {AppContext.BaseDirectory}"
            );
        }

        #endregion

        #region Captures

        private static string CaptureFileName(string fixture, int chapter) =>
            $"{Path.GetFileNameWithoutExtension(fixture)}-ch{chapter}.usx";

        private static IEnumerable<string> CheckCapture(string fixture, int chapter, string usx)
        {
            string path = Path.Combine(s_captureDirectory, CaptureFileName(fixture, chapter));
            if (Environment.GetEnvironmentVariable(CaptureEnvironmentVariable) == "1")
            {
                Directory.CreateDirectory(s_captureDirectory);
                File.WriteAllText(path, usx, s_utf8NoBom);
                yield break;
            }

            string regenerate =
                $"Regenerate with {CaptureEnvironmentVariable}=1 dotnet test --filter "
                + $"FullyQualifiedName~{nameof(UsfmUsxRoundTripCorpusSweepTests)}.";
            if (!File.Exists(path))
                yield return $"Capture pdp-usx/{CaptureFileName(fixture, chapter)} is missing. {regenerate}";
            else if (File.ReadAllText(path, s_utf8NoBom) != usx)
                yield return $"Capture pdp-usx/{CaptureFileName(fixture, chapter)} no longer matches "
                    + $"GetChapterUsx. {regenerate}";
        }

        #endregion

        #region Expected diffs

        private sealed record ExpectedDiff(
            string Fixture,
            int Chapter,
            string Leg,
            int Line,
            string Before,
            string After,
            string Reason
        );

        private sealed record ExpectedDiffFile(string About, List<ExpectedDiff> Entries);

        private static List<ExpectedDiff> LoadExpectedDiffs() =>
            JsonSerializer
                .Deserialize<ExpectedDiffFile>(File.ReadAllText(s_expectedDiffsPath), s_jsonOptions)
                ?.Entries ?? [];

        private static List<string> CompareWithExpectedDiffs(
            string fixture,
            int chapter,
            List<DiffHunk> actual
        )
        {
            List<ExpectedDiff> listed = LoadExpectedDiffs()
                .Where(entry => entry.Fixture == fixture && entry.Chapter == chapter)
                .ToList();

            List<DiffHunk> unlisted = [];
            foreach (DiffHunk hunk in actual)
            {
                int match = listed.FindIndex(entry =>
                    entry.Leg == hunk.Leg
                    && entry.Line == hunk.Line
                    && entry.Before == hunk.Before
                    && entry.After == hunk.After
                );
                if (match < 0)
                    unlisted.Add(hunk);
                else
                    listed.RemoveAt(match);
            }

            List<string> problems = [];
            if (unlisted.Count > 0)
            {
                var suggestions = unlisted.Select(hunk => new ExpectedDiff(
                    fixture,
                    chapter,
                    hunk.Leg,
                    hunk.Line,
                    hunk.Before,
                    hunk.After,
                    "TODO"
                ));
                problems.Add(
                    $"{unlisted.Count} unlisted diff(s) in {fixture} ch{chapter}:"
                        + Environment.NewLine
                        + string.Join(
                            Environment.NewLine,
                            unlisted.Select(hunk =>
                                $"  {hunk.Leg} line {hunk.Line}: …{hunk.ContextBefore}[{hunk.Before}→{hunk.After}]{hunk.ContextAfter}…"
                            )
                        )
                        + Environment.NewLine
                        + "Triage each one; if it is accepted, add it with a reason:"
                        + Environment.NewLine
                        + JsonSerializer.Serialize(suggestions, s_jsonOptions)
                );
            }
            if (listed.Count > 0)
            {
                problems.Add(
                    $"{listed.Count} listed diff(s) in {fixture} ch{chapter} no longer occur; the "
                        + "list only shrinks, so remove them:"
                        + Environment.NewLine
                        + JsonSerializer.Serialize(listed, s_jsonOptions)
                );
            }
            return problems;
        }

        #endregion

        #region Diffing

        /// <summary>
        /// One contiguous difference between two texts. <see cref="Before"/> and
        /// <see cref="After"/> are trimmed to the differing characters, and <see cref="Line"/> is the
        /// 1-based line of the left text where they start, so a hunk names its bytes exactly.
        /// </summary>
        private sealed record DiffHunk(
            string Leg,
            int Line,
            string Before,
            string After,
            string ContextBefore,
            string ContextAfter
        );

        private static List<string> TokenizeLines(string text) =>
            Regex.Split(text, @"(?<=\n)").Where(token => token.Length > 0).ToList();

        private static List<string> TokenizeXmlTags(string text) =>
            Regex.Split(text, @"(?=<)").Where(token => token.Length > 0).ToList();

        /// <summary>
        /// Token-level LCS diff, with each hunk then trimmed to the characters that differ.
        /// </summary>
        private static List<DiffHunk> ComputeHunks(
            string leg,
            string left,
            string right,
            Func<string, List<string>> tokenize
        )
        {
            if (left == right)
                return [];

            List<string> a = tokenize(left);
            List<string> b = tokenize(right);

            int prefix = 0;
            while (prefix < a.Count && prefix < b.Count && a[prefix] == b[prefix])
                prefix++;
            int suffix = 0;
            while (
                suffix < a.Count - prefix
                && suffix < b.Count - prefix
                && a[a.Count - 1 - suffix] == b[b.Count - 1 - suffix]
            )
                suffix++;

            int n = a.Count - prefix - suffix;
            int m = b.Count - prefix - suffix;
            var lcs = new int[n + 1, m + 1];
            for (int i = n - 1; i >= 0; i--)
            for (int j = m - 1; j >= 0; j--)
                lcs[i, j] =
                    a[prefix + i] == b[prefix + j]
                        ? lcs[i + 1, j + 1] + 1
                        : Math.Max(lcs[i + 1, j], lcs[i, j + 1]);

            List<DiffHunk> hunks = [];
            int leftOffset = a.Take(prefix).Sum(token => token.Length);
            int x = 0;
            int y = 0;
            while (x < n || y < m)
            {
                if (x < n && y < m && a[prefix + x] == b[prefix + y])
                {
                    leftOffset += a[prefix + x].Length;
                    x++;
                    y++;
                    continue;
                }

                int hunkOffset = leftOffset;
                StringBuilder removed = new();
                StringBuilder added = new();
                while ((x < n || y < m) && !(x < n && y < m && a[prefix + x] == b[prefix + y]))
                {
                    if (y >= m || (x < n && lcs[x + 1, y] >= lcs[x, y + 1]))
                    {
                        removed.Append(a[prefix + x]);
                        leftOffset += a[prefix + x].Length;
                        x++;
                    }
                    else
                    {
                        added.Append(b[prefix + y]);
                        y++;
                    }
                }
                hunks.Add(TrimHunk(leg, left, hunkOffset, removed.ToString(), added.ToString()));
            }
            return hunks;
        }

        private static DiffHunk TrimHunk(
            string leg,
            string left,
            int offset,
            string removed,
            string added
        )
        {
            int head = 0;
            while (head < removed.Length && head < added.Length && removed[head] == added[head])
                head++;
            int tail = 0;
            while (
                tail < removed.Length - head
                && tail < added.Length - head
                && removed[removed.Length - 1 - tail] == added[added.Length - 1 - tail]
            )
                tail++;

            string before = removed[head..(removed.Length - tail)];
            string after = added[head..(added.Length - tail)];
            int start = offset + head;
            int line = 1 + left.AsSpan(0, start).Count('\n');
            string contextBefore = left[Math.Max(0, start - 40)..start];
            int contextStart = start + before.Length;
            string contextAfter = left[contextStart..Math.Min(left.Length, contextStart + 40)];
            return new DiffHunk(leg, line, before, after, contextBefore, contextAfter);
        }

        #endregion
    }
}
