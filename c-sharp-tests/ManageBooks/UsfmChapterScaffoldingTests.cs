using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ManageBooks;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Direct unit tests for <see cref="UsfmChapterScaffolding.HasContentBeyondScaffolding"/>,
    /// the safety core of the Copy/Import merge mode ("Only copy/import non-existing chapters",
    /// UX Manila follow-up). A false "scaffolding-only" classification would let merge mode
    /// overwrite real user content, so every recognized scaffolding shape is pinned here.
    ///
    /// The recognized shapes mirror exactly what PT9's create-books scaffolding emits
    /// (ParatextBase/ScriptureTemplate.cs): CreateInitialLines (\id, \h, \toc1-3),
    /// CreateCV ("\c N " / "\v N " with no text), and CreateFromTemplate (bare paragraph
    /// markers, "\v N" tokens, literal " ... " pre-verse placeholders).
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class UsfmChapterScaffoldingTests
    {
        // ------------------------------------------------------------------
        // Empty / whitespace inputs are never content
        // ------------------------------------------------------------------

        [TestCase(null)]
        [TestCase("")]
        [TestCase("   ")]
        [TestCase("\r\n\r\n")]
        [Category("Contract")]
        public void HasContentBeyondScaffolding_EmptyOrWhitespace_IsFalse(string? usfm)
        {
            Assert.That(UsfmChapterScaffolding.HasContentBeyondScaffolding(usfm), Is.False);
        }

        // ------------------------------------------------------------------
        // CreateInitialLines shapes: \id line and book-name headers
        // ------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        public void HasContentBeyondScaffolding_IdLineWithBookName_IsFalse()
        {
            // The \id line carries the English book name — metadata, never user content.
            Assert.That(
                UsfmChapterScaffolding.HasContentBeyondScaffolding("\\id GEN - Genesis Test\r\n"),
                Is.False
            );
        }

        [Test]
        [Category("Contract")]
        public void HasContentBeyondScaffolding_HeaderAndTocLines_IsFalse()
        {
            // \h and \toc1-3 text comes from BookNames scaffolding, not the user.
            const string usfm =
                "\\id GEN\r\n\\h Genesis\r\n\\toc1 The Book of Genesis\r\n\\toc2 Genesis\r\n\\toc3 Gen\r\n";
            Assert.That(UsfmChapterScaffolding.HasContentBeyondScaffolding(usfm), Is.False);
        }

        // ------------------------------------------------------------------
        // CreateCV shapes: chapter/verse markers without text
        // ------------------------------------------------------------------

        [TestCase("\\c 1\r\n")]
        [TestCase("\\c 1\r\n\\p\r\n\\v 1 \r\n\\v 2 \r\n")]
        [TestCase("\\c 23\r\n\\q1\r\n\\v 1\r\n\\q2\r\n\\v 2\r\n\\b\r\n")]
        [Category("Contract")]
        public void HasContentBeyondScaffolding_ChapterVerseScaffold_IsFalse(string usfm)
        {
            Assert.That(UsfmChapterScaffolding.HasContentBeyondScaffolding(usfm), Is.False);
        }

        // ------------------------------------------------------------------
        // CreateFromTemplate shapes: placeholders, bridges, alternate numbers
        // ------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        public void HasContentBeyondScaffolding_TemplatePlaceholders_IsFalse()
        {
            // CreateFromTemplate emits literal " ... " pre-verse placeholders.
            const string usfm = "\\c 1\r\n\\p\r\n\\v 1 ...\r\n\\v 2 ......\r\n";
            Assert.That(UsfmChapterScaffolding.HasContentBeyondScaffolding(usfm), Is.False);
        }

        [TestCase("\\c 1\r\n\\p\r\n\\v 1-2 \r\n")]
        [TestCase("\\c 1\r\n\\p\r\n\\v 1,3 \r\n")]
        [TestCase("\\c 1\r\n\\p\r\n\\v 1–3 \r\n")] // en-dash bridge
        [Category("Contract")]
        public void HasContentBeyondScaffolding_VerseBridges_IsFalse(string usfm)
        {
            Assert.That(UsfmChapterScaffolding.HasContentBeyondScaffolding(usfm), Is.False);
        }

        [Test]
        [Category("Contract")]
        public void HasContentBeyondScaffolding_EsgAlternateVerseNumbers_IsFalse()
        {
            // ESG-style alternates: lettered verses with a bracketed alternate number.
            const string usfm = "\\c 1\r\n\\p\r\n\\v 1a [2]\r\n\\v 1b [3]\r\n";
            Assert.That(UsfmChapterScaffolding.HasContentBeyondScaffolding(usfm), Is.False);
        }

        [Test]
        [Category("Contract")]
        public void HasContentBeyondScaffolding_EndMarkers_IsFalse()
        {
            // Bare end-markers (e.g. an empty footnote skeleton) are still scaffolding.
            const string usfm = "\\c 1\r\n\\p\r\n\\v 1 \\f \\f*\r\n";
            Assert.That(UsfmChapterScaffolding.HasContentBeyondScaffolding(usfm), Is.False);
        }

        // ------------------------------------------------------------------
        // Real content must be detected — the data-loss-prevention direction
        // ------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        public void HasContentBeyondScaffolding_VerseWithText_IsTrue()
        {
            const string usfm = "\\c 1\r\n\\p\r\n\\v 1 In the beginning\r\n";
            Assert.That(UsfmChapterScaffolding.HasContentBeyondScaffolding(usfm), Is.True);
        }

        [Test]
        [Category("Contract")]
        public void HasContentBeyondScaffolding_SingleCharacterOfText_IsTrue()
        {
            // Even one character beyond the scaffold counts as existing content —
            // merge mode must never overwrite it.
            const string usfm = "\\c 1\r\n\\p\r\n\\v 1 a\r\n\\v 2 \r\n";
            Assert.That(UsfmChapterScaffolding.HasContentBeyondScaffolding(usfm), Is.True);
        }

        [Test]
        [Category("Contract")]
        public void HasContentBeyondScaffolding_TextAmidScaffolding_IsTrue()
        {
            // Headers + empty verses + ONE translated verse → content.
            const string usfm =
                "\\id GEN\r\n\\h Genesis\r\n\\c 1\r\n\\p\r\n\\v 1 \r\n\\v 2 Na God i mekim\r\n\\v 3 \r\n";
            Assert.That(UsfmChapterScaffolding.HasContentBeyondScaffolding(usfm), Is.True);
        }

        [Test]
        [Category("Contract")]
        public void HasContentBeyondScaffolding_FootnoteWithText_IsTrue()
        {
            // A footnote with actual text is content even though its markers are stripped.
            const string usfm = "\\c 1\r\n\\p\r\n\\v 1 \\f + \\ft See introduction\\f*\r\n";
            Assert.That(UsfmChapterScaffolding.HasContentBeyondScaffolding(usfm), Is.True);
        }

        [Test]
        [Category("Contract")]
        public void HasContentBeyondScaffolding_TextOnIdLikeLineMidChapter_IsTrue()
        {
            // \id stripping is line-anchored: an "id" word inside verse text is not a marker.
            const string usfm = "\\c 1\r\n\\p\r\n\\v 1 the id of the house\r\n";
            Assert.That(UsfmChapterScaffolding.HasContentBeyondScaffolding(usfm), Is.True);
        }
    }
}
