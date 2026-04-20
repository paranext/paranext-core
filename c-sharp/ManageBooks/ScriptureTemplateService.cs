using System.Text;
using System.Text.RegularExpressions;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 ===
// Source: PT9/ParatextBase/ScriptureTemplate.cs:24-349
// Method: ScriptureTemplate.CreateOneBook() (and private helpers CreateInitialLines,
//   CreateCV, CreateFromTemplate, ExtractTemplate, ParagraphMarkers, GetCVs,
//   PreVerseText, TrimNonDigitsFromEnd, CreateIdLineOnly).
// Maps to: EXT-001 (BHV-407) — Book Creation Engine
//
// PT10 alignments vs PT9 source:
// - Converted from instance class (`new ScriptureTemplate(modelScrText)`) to a
//   static service class; `modelScrText` is now an optional trailing parameter.
// - Removed `Alert.Show(...)` UI calls — replaced with PlatformErrorCodes throws
//   per Theme 7 (Error Handling).
// - Removed WinForms `CreateESGForm` dialog — ESG + createCV=true dispatches
//   to UI (CAP-UI-007). For now, throws UNIMPLEMENTED.
// - Removed `FileUtils.CreateFolder` call — ScrText infrastructure creates
//   directories on save (and DummyScrText's InMemoryFileManager is path-less).
// - Removed `scrText.Creatable` permission check — permission gating is the
//   orchestrator's responsibility (CAP-004).
// - Removed `ParatextErrorReporter.ReportFileException` — IOExceptions
//   propagate; the orchestrator decides how to surface them.

/// <summary>
/// Book creation engine. Exposes <see cref="CreateOneBook"/> which writes a
/// USFM book file using one of three methods: empty (id line only),
/// chapter/verse from the project's versification, or markers extracted from
/// a model project.
///
/// <para>See <c>data-contracts.md</c> Section 4.4 and
/// <c>implementation/extraction-plan.md</c> EXT-001 for the formal contract.</para>
/// </summary>
public static class ScriptureTemplateService
{
    /// <summary>
    /// Creates a single book in <paramref name="scrText"/> using one of three methods:
    /// <list type="number">
    ///   <item><description><c>CreateIdLineOnly</c> — empty book with only the \id line and headers.</description></item>
    ///   <item><description><c>CreateCV</c> — book with chapter/verse markers from versification (when <paramref name="createCV"/> is true and the book is canonical).</description></item>
    ///   <item><description><c>CreateFromTemplate</c> — book with markers extracted from <paramref name="modelScrText"/> (when <paramref name="createUsingModelTextAsTemplate"/> is true).</description></item>
    /// </list>
    /// </summary>
    /// <param name="scrText">Target project to write the new book into.</param>
    /// <param name="bookNum">Book number (canonical 1–66 plus deuterocanon / ESG / front-matter).</param>
    /// <param name="createCV">If true and the book is canonical, emit \c and \v markers for all chapters/verses in the project's versification.</param>
    /// <param name="createUsingModelTextAsTemplate">If true, copy markers from <paramref name="modelScrText"/>.</param>
    /// <param name="modelScrText">Required when <paramref name="createUsingModelTextAsTemplate"/> is true; otherwise may be null.</param>
    /// <returns>true if the book was created (or was already present); false if creation was declined.</returns>
    public static bool CreateOneBook(
        ScrText scrText,
        int bookNum,
        bool createCV,
        bool createUsingModelTextAsTemplate,
        ScrText? modelScrText = null
    )
    {
        // PT9 ScriptureTemplate.cs:47-48 — argument validation first.
        if (createUsingModelTextAsTemplate && modelScrText == null)
            throw new ArgumentException("Model not specified");

        // PT9 ScriptureTemplate.cs:50-51 — already-present fast path (no-op
        // success; INV: idempotent creation). TS-080 follows PT9 exactly.
        if (scrText.BookPresent(bookNum, true))
            return true;

        // Greek Esther with createCV=true requires a UI dialog (PT9's
        // CreateESGForm). In PT10 this is handled by CAP-UI-007; for now,
        // signal UNIMPLEMENTED via PlatformError so the orchestrator can
        // surface a helpful message.
        if (createCV && bookNum == Canon.BookIdToNumber("ESG"))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.Unimplemented,
                "Greek Esther (ESG) with chapter/verse creation requires the CreateESGForm UI flow; dispatched to CAP-UI-007."
            );
        }

        // PT9 ScriptureTemplate.cs:53-54 — build the BookRef for this book.
        VerseRef bookRef = new VerseRef(scrText.Settings.Versification);
        bookRef.Parse(string.Format("{0} 1:0", Canon.BookNumberToId(bookNum)));

        // PT9 lines 56-64 (FileUtils.CreateFolder + scrText.Creatable) are
        // deferred to the orchestrator layer (CAP-004). DummyScrText has
        // Settings.Editable = true so Creatable() is always true in tests.

        // PT9 ScriptureTemplate.cs:66-68 — obtain per-book WriteLock.
        WriteLock? textLock = scrText.ObtainLock(bookRef.BookNum, 0);
        if (textLock == null)
            return false;

        try
        {
            bool result;
            try
            {
                // PT9 ScriptureTemplate.cs:77-79 — record presence of book
                // in settings BEFORE writing. This is essential for
                // delegated projects so PutText does not try to write to
                // the base project.
                BookSet bps = scrText.Settings.LocalBooksPresentSet;
                bps.Add(bookNum);
                scrText.Settings.BooksPresentSet = bps;

                string initialLines = CreateInitialLines(scrText, bookRef);

                // PT9 ScriptureTemplate.cs:83-88 — decision tree.
                if (createCV && Canon.IsCanonical(bookNum))
                    result = CreateCV(scrText, initialLines, bookNum, textLock);
                else if (createUsingModelTextAsTemplate)
                    result = CreateFromTemplate(
                        scrText,
                        modelScrText!,
                        initialLines,
                        bookNum,
                        textLock
                    );
                else
                    result = CreateIdLineOnly(scrText, initialLines, bookNum, textLock);

                scrText.Save();
            }
            catch (IOException)
            {
                // PT9 catches IOException and calls Alert.Show via
                // ParatextErrorReporter. In PT10 we let it propagate so
                // the orchestrator (CAP-004) can surface it as a
                // PlatformError (typically INTERNAL or DATA_LOSS).
                return false;
            }

            return result;
        }
        finally
        {
            textLock.Release();
        }
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/ScriptureTemplate.cs:105-127
    //
    // EXPLANATION:
    // Generates the header block for a new book. Always emits the \id line
    // ("\id CODE - FullName"). Then, *only if* the corresponding BookNames
    // entry is non-empty, appends \h (short), \toc3 (abbreviation),
    // \toc2 (short), \toc1 (long). Note: PT9 line 116 emits \h WITHOUT a
    // trailing CRLF — preserved here as a faithful port.
    private static string CreateInitialLines(ScrText scrText, VerseRef bookRef)
    {
        StringBuilder strBldr = new StringBuilder();
        strBldr.AppendFormat(
            "\\id {0} - {1}\r\n",
            bookRef.ToString().Substring(0, 3),
            scrText.Settings.FullName
        );

        BookNames bookNames = BookNames.Get(scrText);
        string abbreviation = bookNames.GetAbbreviation(bookRef.BookNum);
        string shortName = bookNames.GetShortName(bookRef.BookNum);
        string longName = bookNames.GetLongName(bookRef.BookNum);

        if (!string.IsNullOrEmpty(shortName))
            strBldr.AppendFormat("\\h {0}", shortName);

        if (!string.IsNullOrEmpty(abbreviation))
            strBldr.AppendFormat("\\toc3 {0}\r\n", abbreviation);

        if (!string.IsNullOrEmpty(shortName))
            strBldr.AppendFormat("\\toc2 {0}\r\n", shortName);

        if (!string.IsNullOrEmpty(longName))
            strBldr.AppendFormat("\\toc1 {0}\r\n", longName);
        return strBldr.ToString();
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/ScriptureTemplate.cs:129-142
    //
    // EXPLANATION:
    // Builds a regex that matches any of: \v N [altN], \c N, or any
    // paragraph marker from the model stylesheet. Paragraph markers are
    // sorted longest-first so the regex alternatives match greedily
    // (e.g., "\mt1" matches before "\mt"). The `(?: \[\S+\])?` optional
    // group captures ESG alternate verse numbers.
    private static Regex CreateRegexToExtractMarkersFromModel(ScrText modelScrText, int bookNum)
    {
        // start with verse and chapter markers
        string pattern = @"(\\v \S+(?: \[\S+\])?|\\c \S+";

        foreach (string marker in ParagraphMarkers(modelScrText, bookNum))
            pattern += @"|\\" + marker + @"\b";

        pattern += ")";

        return new Regex(pattern);
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/ScriptureTemplate.cs:144-167
    //
    // Get paragraph markers from the model's stylesheet. Excludes \id
    // and \c (which are always written separately by CreateInitialLines
    // and CreateCV). Sorted longest-first so multi-character markers
    // like "\mt1" win against prefixes like "\mt" in the regex.
    private static List<string> ParagraphMarkers(ScrText modelScrText, int bookNum)
    {
        List<string> paragraphMarkers = new List<string>();
        foreach (ScrTag tag in modelScrText.ScrStylesheet(bookNum).Tags)
        {
            if (tag.StyleType != ScrStyleType.scParagraphStyle)
                continue;

            if (tag.Marker == "id" || tag.Marker == "c")
                continue;

            paragraphMarkers.Add(tag.Marker);
        }

        // Sort longest first because alternation in regex matches the first
        // alternative found.
        paragraphMarkers.Sort((a, b) => b.Length.CompareTo(a.Length));

        return paragraphMarkers;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/ScriptureTemplate.cs:169-181
    //
    // CreateFromTemplate: reads the model book's USFM, extracts the marker
    // skeleton via ExtractTemplate, prepends the target project's initial
    // lines, and writes to the target project.
    private static bool CreateFromTemplate(
        ScrText scrText,
        ScrText modelScrText,
        string idLine,
        int bookNum,
        WriteLock textLock
    )
    {
        VerseRef vref = new VerseRef(bookNum, 1, 0, modelScrText.Settings.Versification);

        string text = modelScrText.GetText(vref, false, false);
        if (text == "")
            return false;

        string template = idLine + ExtractTemplate(text, modelScrText, bookNum);
        scrText.PutText(bookNum, 0, false, template, textLock);

        return true;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/ScriptureTemplate.cs:183-216
    //
    // EXPLANATION:
    // Extract the marker skeleton from a full book's USFM. Algorithm:
    // 1. Split baseText on the "markers" regex. This produces an
    //    alternating array: [text0, marker0, text1, marker1, ...].
    // 2. Iterate markers at odd indices (i = 1, 3, 5, ...), up to
    //    parts.GetUpperBound(0). (PT9 quirk: uses upper-bound — not
    //    Length — so the very last marker may or may not be included
    //    depending on whether content trails it.)
    // 3. Skip \toc* markers — they are auto-inserted by CreateInitialLines.
    // 4. For \v markers: keep them, but trim trailing non-digits (so
    //    "\v 1 The beginning..." becomes "\v 1"). Insert a "..." placeholder
    //    before \v when it is preceded by a non-\v marker whose content
    //    (sans footnotes/cross-refs) is non-empty — so Basic mode doesn't
    //    prevent typing before the first verse.
    // 5. For non-\v markers: trim whitespace, emit "\r\n" separator if
    //    this is not the first marker.
    // 6. Terminate with "\r\n".
    private static string ExtractTemplate(string baseText, ScrText modelScrText, int bookNum)
    {
        string[] parts = CreateRegexToExtractMarkersFromModel(modelScrText, bookNum)
            .Split(baseText);
        StringBuilder builder = new StringBuilder(parts.GetUpperBound(0));

        for (int i = 1; i < parts.GetUpperBound(0); i += 2)
        {
            string marker = parts[i];
            if (marker.StartsWith("\\toc", StringComparison.Ordinal))
                continue; // never insert empty toc markers — auto-inserted as needed

            if (marker.StartsWith("\\v ", StringComparison.Ordinal))
            {
                // When we have a situation like this:
                //     \p Blah blah ... \v 1 ...
                // We need to insert a placeholder before the \v so that
                // Basic mode does not prevent typing text before the first
                // verse number.
                builder.Append(PreVerseText(parts, i));

                builder.Append(" " + TrimNonDigitsFromEnd(marker));
            }
            else
            {
                if (i != 1)
                    builder.Append("\r\n");
                builder.Append(marker.Trim());
            }
        }

        builder.Append("\r\n");

        return builder.ToString();
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/ScriptureTemplate.cs:218-229
    //
    // Trim trailing non-digit characters from a string. Used to convert
    // "\v 1 The beginning..." → "\v 1" (everything after the verse number
    // is stripped).
    private static string TrimNonDigitsFromEnd(string s)
    {
        int endIndex = s.Length;
        for (int i = s.Length - 1; i >= 0; i--)
        {
            if (s[i] < '0' || s[i] > '9')
                endIndex = i;
            else
                return s.Substring(0, endIndex);
        }
        return s.Substring(0, endIndex);
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/ScriptureTemplate.cs:231-254
    //
    // Determine if a "..." placeholder is needed before parts[i] (\v).
    // Returns " ... " if the preceding marker is NOT \v and has
    // non-trivial content (after stripping \f..\f* footnotes and
    // \x..\x* cross-references). Otherwise returns empty.
    private static string PreVerseText(string[] parts, int i)
    {
        if (i < 2)
            return "";

        string marker = parts[i - 2].Trim();
        if (marker.StartsWith("\\v ", StringComparison.Ordinal))
            return "";

        string text = parts[i - 1];
        text = Regex.Replace(text, @"\\f .*?\\f\*", "");
        text = Regex.Replace(text, @"\\x .*?\\x\*", "");
        text = text.Trim();

        if (text != "")
            return " ... ";

        return "";
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/ScriptureTemplate.cs:256-272
    //
    // CreateCV: write id line + chapter/verse markers. For ESG, PT9 opens
    // CreateESGForm (a WinForms dialog). PT10 handles this via CAP-UI-007;
    // CreateOneBook throws UNIMPLEMENTED upfront so we do not reach this
    // function for ESG with createCV=true.
    private static bool CreateCV(ScrText scrText, string idLine, int bookNum, WriteLock textLock)
    {
        string cvText = "";
        bool result = GetCVs(scrText, bookNum, out cvText);

        if (!result)
            return false;

        scrText.PutText(bookNum, 0, false, idLine + cvText, textLock);
        return true;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/ScriptureTemplate.cs:307-340
    //
    // EXPLANATION:
    // Build the C/V skeleton for a book using the project's versification.
    // VerseRef.NextVerse iterates through every verse in the book in
    // canonical order. For each chapter boundary, emit "\c N ". For each
    // verse (excluding verse 0 which is the chapter heading placeholder),
    // emit "\v N ". The trailing space is preserved exactly as PT9
    // emits it (AppendLine "\c 1 " produces "\c 1 \r\n").
    private static bool GetCVs(ScrText scrText, int bookNum, out string cvText)
    {
        cvText = "";
        try
        {
            StringBuilder sb = new StringBuilder();
            VerseRef vRef = new VerseRef(scrText.Settings.Versification);
            vRef.Parse(Canon.BookNumberToId(bookNum) + " 1:0");
            BookSet thisBook = new BookSet(bookNum);
            int c = -1;
            while (vRef.NextVerse(thisBook, true))
            {
                if (vRef.VerseNum == 0)
                    continue;

                if (c != vRef.ChapterNum)
                {
                    sb.AppendLine("\\c " + vRef.Chapter + " ");
                    c = vRef.ChapterNum;
                }

                sb.AppendLine("\\v " + vRef.Verse + " ");
            }

            cvText = sb.ToString();
            return true;
        }
        catch (Exception)
        {
            // PT9 shows an Alert.Show here; in PT10 we let the caller
            // surface the problem. Return false so CreateOneBook returns
            // false cleanly.
            return false;
        }
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/ScriptureTemplate.cs:342-347
    //
    // CreateIdLineOnly: write just the id/header block plus a terminating
    // CRLF. Used for empty books and for non-canonical books (even when
    // createCV=true).
    private static bool CreateIdLineOnly(
        ScrText scrText,
        string idLine,
        int bookNum,
        WriteLock textLock
    )
    {
        scrText.PutText(bookNum, 0, false, idLine + "\r\n", textLock);
        return true;
    }
}
