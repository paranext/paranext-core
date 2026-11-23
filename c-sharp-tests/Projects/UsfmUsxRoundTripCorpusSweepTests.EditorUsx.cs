using System.Text.RegularExpressions;
using Paranext.DataProvider.Projects;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// The editor's half of the corpus sweep: what ParatextData does with the USX the EDITOR writes,
    /// as opposed to the USX the provider itself serves.
    ///
    /// <para>
    /// Each <c>usj-reader-writer-test-data/editor-usx/&lt;fixture&gt;-ch&lt;N&gt;.&lt;case&gt;.usx</c>
    /// is what the web view would hand <see cref="ParatextProjectDataProvider.SetChapterUsx"/> for
    /// chapter <c>N</c> of that fixture: written by paranext-core's
    /// <c>editor-usx-round-trip.test.tsx</c>, which edits the chapter in the real editor (or, for a
    /// <c>resave</c> case, converts it without an edit) and prepares the save as the web view does.
    /// Each case seeds the fixture, saves the provider's own USX once (what <c>trip1</c> of the sweep
    /// does), then saves the editor's USX over it and compares these legs:
    /// </para>
    /// <list type="bullet">
    ///   <item><c>write</c>: the chapter's USFM after the provider's own USX against after the
    ///   editor's — exactly what the edit changes on disk, and anything else the editor's USX
    ///   changes with it.</item>
    ///   <item><c>rewrite</c>: that USFM against the USFM after one more
    ///   <c>GetChapterUsx</c> → <c>SetChapterUsx</c> trip. Must be empty: the editor's save leaves the
    ///   chapter at rest.</item>
    ///   <item><c>neighbor-chN</c>: every other chapter, before the saves against after.</item>
    /// </list>
    ///
    /// <para>
    /// The diffs are pinned, shrink-only, in <c>EditorUsxRoundTrip.expected-diffs.json</c>, keyed by
    /// capture name. What the provider serves back after the editor's save
    /// (<c>GetChapterUsx</c>) is written to <c>editor-usx-returned/</c> under the same name, where the
    /// TypeScript test checks that it reads back as the document the editor saved. Run with
    /// <c>PDP_USX_CAPTURE=1</c> to rewrite those captures instead of comparing them.
    /// </para>
    /// </summary>
    internal partial class UsfmUsxRoundTripCorpusSweepTests
    {
        private static readonly string s_editorCaptureDirectory = Path.Combine(
            s_corpusDirectory,
            "editor-usx"
        );
        private static readonly string s_returnedCaptureDirectory = Path.Combine(
            s_corpusDirectory,
            "editor-usx-returned"
        );
        private static readonly string s_editorExpectedDiffsPath = Path.Combine(
            s_repoRoot,
            "c-sharp-tests",
            "Projects",
            "EditorUsxRoundTrip.expected-diffs.json"
        );

        // `<fixture stem>-ch<N>.<case>.usx`, the case being `resave` or `<view>.<gesture>`.
        private static readonly Regex s_editorCaptureName = new(@"^(.+)-ch(\d+)\.(.+)\.usx$");

        public static IEnumerable<TestCaseData> EditorCaptures() =>
            DiscoverEditorCaptures()
                .Select(capture => new TestCaseData(capture).SetName($"EditorUsx({capture})"));

        private static IEnumerable<string> DiscoverEditorCaptures() =>
            Directory.Exists(s_editorCaptureDirectory)
                ? Directory
                    .EnumerateFiles(s_editorCaptureDirectory, "*.usx")
                    .Select(path => Path.GetFileName(path))
                    .OrderBy(name => name, StringComparer.Ordinal)
                : [];

        private static (string Fixture, int Chapter) EditorCaptureSource(string capture)
        {
            Match match = s_editorCaptureName.Match(capture);
            if (!match.Success)
                throw new InvalidDataException(
                    $"editor-usx/{capture} is not named <fixture>-ch<N>.<case>.usx."
                );
            return ($"{match.Groups[1].Value}.usfm", int.Parse(match.Groups[2].Value));
        }

        [TestCaseSource(nameof(EditorCaptures))]
        public void EditorUsx_WritesThroughProvider_WithOnlyListedDiffs(string capture)
        {
            (string fixture, int chapter) = EditorCaptureSource(capture);
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

            provider.SetChapterUsx(verseRef, provider.GetChapterUsx(verseRef));
            string providerSaved = provider.GetChapterUsfm(verseRef);

            string editorUsx = File.ReadAllText(
                Path.Combine(s_editorCaptureDirectory, capture),
                s_utf8NoBom
            );
            provider.SetChapterUsx(verseRef, editorUsx);
            string editorSaved = provider.GetChapterUsfm(verseRef);
            string returned = provider.GetChapterUsx(verseRef);
            provider.SetChapterUsx(verseRef, returned);
            string resaved = provider.GetChapterUsfm(verseRef);

            List<DiffHunk> actual = [];
            actual.AddRange(ComputeHunks("write", providerSaved, editorSaved, TokenizeLines));
            actual.AddRange(ComputeHunks("rewrite", editorSaved, resaved, TokenizeLines));
            foreach ((int other, string before) in neighborsBefore)
            {
                string after = provider.GetChapterUsfm(new VerseRef(bookNum, other, 0));
                actual.AddRange(ComputeHunks($"neighbor-ch{other}", before, after, TokenizeLines));
            }

            List<string> problems = CompareWithExpectedDiffs(
                capture,
                chapter,
                actual,
                s_editorExpectedDiffsPath
            );
            problems.AddRange(CheckReturnedCapture(capture, returned));

            Assert.That(
                problems,
                Is.Empty,
                string.Join(Environment.NewLine + Environment.NewLine, problems)
            );
        }

        [Test]
        public void EditorUsxExpectedDiffsAndCaptures_NameOnlyEditorCaptures()
        {
            HashSet<string> captures = DiscoverEditorCaptures().ToHashSet();
            Assert.That(captures, Is.Not.Empty, "No editor-usx captures found.");

            List<string> problems = [];
            foreach (string capture in captures)
            {
                (string fixture, _) = EditorCaptureSource(capture);
                if (!File.Exists(Path.Combine(s_corpusDirectory, fixture)))
                    problems.Add($"editor-usx/{capture} names no fixture {fixture}.");
            }
            foreach (ExpectedDiff entry in LoadExpectedDiffs(s_editorExpectedDiffsPath))
            {
                if (!captures.Contains(entry.Fixture))
                    problems.Add(
                        $"Expected-diff entry names editor-usx/{entry.Fixture}, which does not "
                            + "exist; remove it."
                    );
                if (string.IsNullOrWhiteSpace(entry.Reason) || entry.Reason == "TODO")
                    problems.Add(
                        $"Expected-diff entry {entry.Fixture} {entry.Leg} line {entry.Line} has no "
                            + "reason."
                    );
            }
            if (Directory.Exists(s_returnedCaptureDirectory))
            {
                foreach (
                    string returned in Directory
                        .EnumerateFiles(s_returnedCaptureDirectory, "*.usx")
                        .Select(path => Path.GetFileName(path))
                )
                {
                    if (!captures.Contains(returned))
                        problems.Add(
                            $"editor-usx-returned/{returned} has no editor-usx capture; remove it."
                        );
                }
            }

            Assert.That(problems, Is.Empty, string.Join(Environment.NewLine, problems));
        }

        private static IEnumerable<string> CheckReturnedCapture(string capture, string usx)
        {
            string path = Path.Combine(s_returnedCaptureDirectory, capture);
            if (Environment.GetEnvironmentVariable(CaptureEnvironmentVariable) == "1")
            {
                Directory.CreateDirectory(s_returnedCaptureDirectory);
                File.WriteAllText(path, usx, s_utf8NoBom);
                yield break;
            }

            const string regenerate =
                "Regenerate with `npm run test:editor-usx-round-trip:capture` (see "
                + "editor-usx/README.md).";
            if (!File.Exists(path))
                yield return $"Capture editor-usx-returned/{capture} is missing. {regenerate}";
            else if (File.ReadAllText(path, s_utf8NoBom) != usx)
                yield return $"Capture editor-usx-returned/{capture} no longer matches "
                    + $"GetChapterUsx. {regenerate}";
        }
    }
}
