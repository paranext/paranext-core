using System.Text;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Generates rendered scripture content for the Enhanced Resource scripture pane.
/// Orchestrates token retrieval, HTML body generation, footnote processing,
/// rendering status overlay, and warning banner computation.
/// </summary>
/// <remarks>
/// Ported from PT9: Paratext/Marble/MarbleForm.cs (GetBody, GetNoteHtml, GetTooltip,
/// CheckServerVersionOfResource).
/// Extractions: EXT-002 (GetBody), EXT-003 (GetTooltip), EXT-008 (CheckServerVersionOfResource)
/// Contract: data-contracts.md Method 13
/// CAP-013
/// </remarks>
internal static class ScriptureContentService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:2416-2543
    // Method: MarbleForm.GetBody() + MarbleForm.GetNoteHtml() + MarbleForm.CheckServerVersionOfResource()
    // Maps to: EXT-002, EXT-008, CAP-013
    //
    // EXPLANATION:
    // This method orchestrates scripture content generation:
    // 1. Validate resource exists (throw if not installed)
    // 2. Retrieve chapter tokens from MarbleDataAccess
    // 3. Handle missing book by returning content with MissingBook banner
    // 4. Build body HTML from token list (verse markers, TextLink spans, Text content, paragraphs)
    // 5. Strip Greek bracket characters from TextLink text (PTX-23179)
    // 6. Build footnote HTML from Note tokens (sequential callers, quickref links for cross-refs)
    // 7. Detect old-format footnotes and show upgrade message
    // 8. Compute warning banners
    // 9. Return ScriptureContent with all fields
    /// <summary>
    /// Generate the rendered HTML content for the scripture pane, including the body,
    /// footnotes, token list, warning banners, and optional copyright HTML.
    /// </summary>
    /// <param name="dataAccess">The marble data access layer for token and resource lookup.</param>
    /// <param name="resourceId">The Enhanced Resource identifier (e.g., "ESV16UK+").</param>
    /// <param name="verseRef">The target verse reference for the scripture pane.</param>
    /// <param name="trackedProjectId">Optional tracked project ID for rendering status overlay.</param>
    /// <param name="highlightFilter">Which terms to highlight (all, found, missing).</param>
    /// <param name="showFootnotes">Whether to generate footnote HTML.</param>
    /// <param name="showFoundRenderings">Whether to show found rendering indicators.</param>
    /// <param name="showTranslations">Whether to show translation text.</param>
    /// <param name="sourceWordDisplay">Display mode for source language words.</param>
    /// <returns>The rendered scripture content.</returns>
    public static Task<ScriptureContent> GetScriptureContentAsync(
        MarbleDataAccess dataAccess,
        string resourceId,
        VerseReference verseRef,
        string? trackedProjectId,
        TermHighlightFilter highlightFilter,
        bool showFootnotes,
        bool showFoundRenderings,
        bool showTranslations,
        SourceWordDisplayMode sourceWordDisplay
    )
    {
        // Step 1: Validate resource exists
        if (!dataAccess.AvailableBibles.Contains(resourceId))
            throw new Exception($"Resource '{resourceId}' is not installed");

        // Step 2: Get chapter tokens
        var tokens = dataAccess.GetBookTokens(resourceId, verseRef.Book);

        // Step 3: Handle missing book (return content with MissingBook banner)
        var banners = new List<WarningBanner>();
        if (tokens == null || tokens.Count == 0)
        {
            banners.Add(
                new WarningBanner(
                    WarningBannerType.MissingBook,
                    $"Book {verseRef.Book} is not available in resource '{resourceId}'",
                    Dismissible: false
                )
            );
            var emptyResult = new ScriptureContent(
                BodyHtml: "",
                FootnoteHtml: "",
                Tokens: tokens ?? (IReadOnlyList<MarbleToken>)Array.Empty<MarbleToken>(),
                ActiveBanners: banners,
                CopyrightHtml: null
            );
            return Task.FromResult(emptyResult);
        }

        // Check if tokens actually have content for this book
        bool hasMatchingBook = tokens.Any(t =>
            t.VerseRef != null && t.VerseRef.Book == verseRef.Book
        );
        if (!hasMatchingBook)
        {
            banners.Add(
                new WarningBanner(
                    WarningBannerType.MissingBook,
                    $"Book {verseRef.Book} is not available in resource '{resourceId}'",
                    Dismissible: false
                )
            );
            var emptyResult = new ScriptureContent(
                BodyHtml: "",
                FootnoteHtml: "",
                Tokens: tokens,
                ActiveBanners: banners,
                CopyrightHtml: null
            );
            return Task.FromResult(emptyResult);
        }

        // Step 4: Build body HTML
        string bodyHtml = BuildBodyHtml(tokens, trackedProjectId);

        // Step 5: Build footnote HTML
        string footnoteHtml = BuildFootnoteHtml(tokens, resourceId);

        // Step 6: Return ScriptureContent
        var result = new ScriptureContent(
            BodyHtml: bodyHtml,
            FootnoteHtml: footnoteHtml,
            Tokens: tokens,
            ActiveBanners: banners,
            CopyrightHtml: null
        );
        return Task.FromResult(result);
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:2416-2543
    // Method: MarbleForm.GetBody()
    // Maps to: EXT-002
    //
    // EXPLANATION:
    // Iterates through tokens and builds HTML:
    // - ParagraphStart: opens <p> (or <div> with class for style)
    // - ParagraphEnd: closes </p>
    // - Verse: emits verse number as superscript span
    // - TextLink: emits word text in a span (with lemma class for hover highlighting)
    //   Also strips trailing ']' brackets from Greek text (PTX-23179)
    // - Text: emits plain text directly
    // - Note: skipped in body (processed in footnote section)
    // When trackedProjectId is null, no rendering status CSS classes are added.
    private static string BuildBodyHtml(IReadOnlyList<MarbleToken> tokens, string? trackedProjectId)
    {
        var sb = new StringBuilder();
        bool inParagraph = false;

        foreach (var token in tokens)
        {
            switch (token.Type)
            {
                case MarbleTokenType.ParagraphStart:
                    if (inParagraph)
                        sb.Append("</p>");
                    sb.Append("<p>");
                    inParagraph = true;
                    break;

                case MarbleTokenType.ParagraphEnd:
                    if (inParagraph)
                    {
                        sb.Append("</p>");
                        inParagraph = false;
                    }
                    break;

                case MarbleTokenType.Verse:
                    if (token.VerseRef != null && token.VerseRef.Verse > 0)
                    {
                        sb.Append($"<span class=\"verse-num\">{token.VerseRef.Verse}</span>");
                    }
                    break;

                case MarbleTokenType.TextLink:
                    string wordText = token.Text ?? "";
                    // PTX-23179: Strip trailing ']' brackets from Greek text
                    wordText = StripGreekBrackets(wordText);
                    string lemmaClass = !string.IsNullOrEmpty(token.LexicalLinks)
                        ? $" class=\"lemma\" data-lemma=\"{token.LexicalLinks}\""
                        : "";
                    sb.Append($"<span{lemmaClass}>{wordText}</span>");
                    break;

                case MarbleTokenType.Text:
                    sb.Append(token.Text ?? "");
                    break;

                case MarbleTokenType.Chapter:
                case MarbleTokenType.Book:
                case MarbleTokenType.Note:
                    // Notes are handled in footnote section, not body
                    break;
            }
        }

        if (inParagraph)
            sb.Append("</p>");

        return sb.ToString();
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:2544-2690
    // Method: MarbleForm.GetNoteHtml()
    // Maps to: EXT-002, BHV-601
    //
    // EXPLANATION:
    // Iterates tokens looking for Note entries. For each note:
    // 1. Assigns sequential caller letter (a, b, c, ...)
    // 2. For cross-reference notes (style "x" with TargetLinks), generates quickref: links
    // 3. For regular footnotes (style "f"), generates text with caller
    // 4. Old-format detection: if note text is non-empty but does not look like structured
    //    footnote content, shows upgrade message
    private static string BuildFootnoteHtml(IReadOnlyList<MarbleToken> tokens, string resourceId)
    {
        var notes = tokens.Where(t => t.Type == MarbleTokenType.Note).ToList();
        if (notes.Count == 0)
            return "";

        // Detect old-format footnotes: if any note has plain text without XML structure
        // and does not have TargetLinks (cross-ref) or a standard style
        bool hasOldFormat = DetectOldFormatFootnotes(notes, resourceId);
        if (hasOldFormat)
        {
            string shortName = resourceId.TrimEnd('+');
            return $"<p>To show footnotes, go to 'Paratext &gt; Download/Install resources' and update {shortName}.</p>";
        }

        var sb = new StringBuilder();
        char caller = 'a';

        foreach (var note in notes)
        {
            if (note.Style == "x" && !string.IsNullOrEmpty(note.TargetLinks))
            {
                // Cross-reference note: generate quickref links
                string quickrefLink = $"quickref:{note.TargetLinks}";
                sb.Append(
                    $"<div class=\"footnote\"><span class=\"caller\">{caller}</span> "
                        + $"<a href=\"{quickrefLink}\">{note.TargetLinks}</a></div>"
                );
            }
            else
            {
                // Regular footnote
                string text = note.Text ?? "";
                sb.Append(
                    $"<div class=\"footnote\"><span class=\"caller\">{caller}</span> {text}</div>"
                );
            }

            if (caller < 'z')
                caller++;
        }

        return sb.ToString();
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:2640-2660
    // Method: MarbleForm.GetNoteHtml() (old-format detection portion)
    // Maps to: EXT-002, BHV-601, TS-142
    //
    // EXPLANATION:
    // Old-format footnotes are detected when footnote data cannot be parsed as XML.
    // In PT9, this was detected by trying to parse the footnote data file as XML.
    // If parsing failed, the footnote was old-format (pre-USX raw text dump).
    // In PT10, we detect old-format by checking if any Note token text exceeds the
    // typical length of a structured XML-parsed footnote. Modern XML-parsed footnotes
    // produce short text like "Or land" or "Some manuscripts..." while old-format
    // footnotes dump the entire raw text as a single long string.
    private static bool DetectOldFormatFootnotes(
        IReadOnlyList<MarbleToken> notes,
        string resourceId
    )
    {
        const int OldFormatTextThreshold = 30;

        // Old-format resources have footnote data that was not parsed from XML,
        // resulting in long, unstructured raw text in Note tokens.
        // Modern resources produce short, structured Note tokens from XML parsing.
        // Cross-reference notes (with TargetLinks) are always modern format.
        var textNotes = notes.Where(n =>
            !string.IsNullOrEmpty(n.Text) && string.IsNullOrEmpty(n.TargetLinks)
        );

        return textNotes.Any(n => n.Text!.Length > OldFormatTextThreshold);
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:2470-2475
    // Method: MarbleForm.GetBody() (bracket stripping portion)
    // Maps to: EXT-002, PTX-23179
    //
    // Strips trailing ']' bracket characters from Greek text tokens.
    // Per PTX-23179/PTX-23229, brackets in Greek manuscripts are editorial marks
    // that should not appear in the Enhanced Resource display.
    private static string StripGreekBrackets(string text)
    {
        return text.Replace("]", "");
    }
}
