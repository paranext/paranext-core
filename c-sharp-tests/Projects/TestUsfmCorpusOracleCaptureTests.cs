using System.Diagnostics.CodeAnalysis;
using System.Text;
using System.Text.RegularExpressions;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Capture harness for the testUSFM fidelity corpus
    /// (<c>lib/platform-bible-utils/src/scripture/usj-reader-writer-test-data/</c>). Given an
    /// as-typed chapter of USFM, it reports what ParatextData keeps of it at rest and what
    /// ParatextData's own USX for it is — the two artifacts a corpus fixture is derived from.
    ///
    /// It is a tool, not a regression test: it does nothing unless
    /// <see cref="InputEnvironmentVariable"/> names one or more input files, so a normal
    /// <c>dotnet test</c> run skips it. Run it as
    /// <code>
    /// CORPUS_CAPTURE_INPUT=/abs/a.usfm:/abs/b.usfm CORPUS_CAPTURE_OUTPUT_DIR=/abs/out \
    ///   dotnet test c-sharp-tests --filter FullyQualifiedName~TestUsfmCorpusOracleCaptureTests
    /// </code>
    ///
    /// Each input is one chapter starting at its <c>\c N</c> line, or a chapter-1 file that starts
    /// with <c>\id</c>. The harness builds a book from it (stub chapters <c>1..N-1</c> in front when
    /// it does not start with <c>\id</c>), loads it into a project that uses the real
    /// <c>usfm.sty</c>, and writes, per input stem:
    /// <list type="bullet">
    /// <item><c>&lt;stem&gt;.as-stored.usfm</c> — the chapter after a raw <c>ScrText.PutText</c>
    /// (what Platform.Bible's <c>SetChapterUsfm</c> stores; <c>PutText</c> itself does not
    /// re-tokenize).</item>
    /// <item><c>&lt;stem&gt;.at-rest.usfm</c> — the chapter after <c>UsfmToken.NormalizeUsfm</c>
    /// and a <c>PutText</c>/<c>GetText</c> round trip: the form a shape must already be in to
    /// count as at rest. Line endings are written as LF to match the corpus files. Paratext 9's
    /// formatted views run <c>NormalizeUsfm</c> on every save; its Unformatted view preserves
    /// whitespace, so a chapter last saved there can keep layout this form drops (the line break
    /// between <c>\c</c> and <c>\ca</c> in testUSFM 2SA 1-3, for example).</item>
    /// <item><c>&lt;stem&gt;.provider.usx</c> — <c>GetChapterUsx</c> of the at-rest chapter,
    /// i.e. ParatextData's <c>UsfmToUsx</c> (forExport, chapter-scoped), unmodified. This is for
    /// probing a shape; the committed captures for corpus fixtures live in
    /// <c>usj-reader-writer-test-data/pdp-usx/</c> and are written by
    /// <c>UsfmUsxRoundTripCorpusSweepTests</c>.</item>
    /// <item><c>&lt;stem&gt;.capture-report.txt</c> — whether each stage changed the text, and
    /// whether the at-rest text survives ParatextData's own USX → USFM leg
    /// (<c>SetChapterUsx</c> then <c>GetChapterUsfm</c>).</item>
    /// </list>
    ///
    /// ParatextData (9.5 and the 9.6 betas) has no USJ writer. The corpus's <c>.usj</c> files are
    /// Platform.Bible's <c>usxStringToUsj</c> applied to this USX, so they are not independent of
    /// the TypeScript converters; this harness deliberately stops at the USX.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class TestUsfmCorpusOracleCaptureTests : PapiTestBase
    {
        /// <summary>Input files, separated by the platform path separator (<c>:</c> on Linux).</summary>
        internal const string InputEnvironmentVariable = "CORPUS_CAPTURE_INPUT";

        /// <summary>Directory the artifacts are written to; defaults to each input's directory.</summary>
        internal const string OutputEnvironmentVariable = "CORPUS_CAPTURE_OUTPUT_DIR";

        /// <summary>Book id to load the chapter into; defaults to <c>2SA</c>.</summary>
        internal const string BookEnvironmentVariable = "CORPUS_CAPTURE_BOOK";

        private const string PdpName = "test-usfm-corpus-capture";

        private static readonly Regex s_firstChapterRegex =
            new(@"\\c\s+(\d+)", RegexOptions.CultureInvariant);

        private ScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            DummyScrText scrText = CreateDummyProject();
            scrText.UseStandardStylesheet();
            _scrText = scrText;
            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
        }

        [Test]
        public void CaptureAtRestUsfmAndParatextDataUsx()
        {
            string? inputs = Environment.GetEnvironmentVariable(InputEnvironmentVariable);
            if (string.IsNullOrWhiteSpace(inputs))
                Assert.Ignore(
                    $"Set {InputEnvironmentVariable} to capture testUSFM corpus artifacts."
                );

            string bookId = Environment.GetEnvironmentVariable(BookEnvironmentVariable) ?? "2SA";
            int bookNum = Canon.BookIdToNumber(bookId);
            string? outputDir = Environment.GetEnvironmentVariable(OutputEnvironmentVariable);

            foreach (
                string inputPath in inputs.Split(
                    Path.PathSeparator,
                    StringSplitOptions.RemoveEmptyEntries
                )
            )
                Capture(inputPath, bookId, bookNum, outputDir ?? Path.GetDirectoryName(inputPath)!);
        }

        private void Capture(string inputPath, string bookId, int bookNum, string outputDir)
        {
            string asTyped = CorpusLineEndings.ToCrLf(File.ReadAllText(inputPath));
            bool startsWithId = asTyped.TrimStart().StartsWith(@"\id ", StringComparison.Ordinal);
            Match chapterMatch = s_firstChapterRegex.Match(asTyped);
            Assert.That(chapterMatch.Success, Is.True, $"{inputPath} has no \\c line");
            int chapterNum = int.Parse(chapterMatch.Groups[1].Value);

            var book = new StringBuilder();
            if (!startsWithId)
            {
                book.Append($"\\id {bookId} testUSFM corpus capture\r\n");
                for (int stub = 1; stub < chapterNum; stub++)
                    book.Append($"\\c {stub}\r\n\\p\r\n");
            }
            book.Append(asTyped);

            var verseRef = new VerseRef(bookNum, chapterNum, 0, _scrText.Settings.Versification);
            var report = new StringBuilder();
            report.AppendLine($"input: {inputPath}");
            report.AppendLine($"book: {bookId} chapter: {chapterNum}");

            _scrText.PutText(bookNum, 0, false, book.ToString(), null);
            string asStored = _scrText.GetText(verseRef, true, true);
            string asTypedChapter = startsWithId ? asTyped : asTyped.TrimStart();
            report.AppendLine(
                $"raw PutText changed the chapter: {!SameIgnoringFinalNewline(asStored, asTypedChapter)}"
            );

            string normalized = UsfmToken.NormalizeUsfm(_scrText, bookNum, asStored);
            _scrText.PutText(bookNum, chapterNum, false, normalized, null);
            string atRest = _scrText.GetText(verseRef, true, true);
            report.AppendLine(
                $"NormalizeUsfm changed the stored chapter (as-typed is NOT at rest): {asStored != atRest}"
            );
            report.AppendLine(
                $"at-rest text is a NormalizeUsfm fixed point: {UsfmToken.NormalizeUsfm(_scrText, bookNum, atRest) == atRest}"
            );

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            string usx = provider.GetChapterUsx(verseRef);

            bool usxAccepted = provider.SetChapterUsx(verseRef, usx);
            string usfmFromUsx = provider.GetChapterUsfm(verseRef);
            report.AppendLine(
                $"ParatextData USX -> USFM reproduces the at-rest chapter: {usfmFromUsx == atRest}"
                    + (usxAccepted ? "" : " (SetChapterUsx reported no change)")
            );
            if (usfmFromUsx != atRest)
            {
                report.AppendLine("---- USFM from ParatextData's own USX ----");
                report.AppendLine(ToLf(usfmFromUsx));
            }

            Directory.CreateDirectory(outputDir);
            string stem = Path.Combine(outputDir, Path.GetFileNameWithoutExtension(inputPath));
            File.WriteAllText($"{stem}.as-stored.usfm", ToLf(asStored));
            File.WriteAllText($"{stem}.at-rest.usfm", ToLf(atRest));
            File.WriteAllText($"{stem}.provider.usx", usx);
            File.WriteAllText($"{stem}.capture-report.txt", report.ToString());
            TestContext.Out.WriteLine(report.ToString());
        }

        private static string ToLf(string text) =>
            text.Replace("\r\n", "\n", StringComparison.Ordinal);

        private static bool SameIgnoringFinalNewline(string a, string b) =>
            a.TrimEnd('\r', '\n') == b.TrimEnd('\r', '\n');
    }
}
