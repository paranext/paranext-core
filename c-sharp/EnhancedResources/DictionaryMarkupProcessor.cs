using System.Text.RegularExpressions;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Processes dictionary markup patterns into HTML.
/// 8+ patterns: {A:}, {L:}, {D:}, {N:}, {S:}, |i, |u, |b
///
/// === PORTED FROM PT9 ===
/// Source: PT9/Paratext/Marble/DictionaryTab.cs:1185-1275
/// Method: DictionaryTab.ProcessMarkup()
/// Maps to: EXT-056, CAP-014
///
/// EXPLANATION:
/// This method processes dictionary-specific markup patterns in a fixed order:
/// 1. Curly-brace patterns first ({A:}, {L:}, {D:}, {N:}, {S:})
/// 2. Pipe-delimited formatting patterns second (|i, |b, |u)
/// Each pattern is replaced via regex. Unrecognized patterns pass through unchanged.
/// The {S:} pattern delegates to EncyclopediaContentService.FormatBCVRefs for
/// versification-aware scripture reference formatting.
/// </summary>
internal static partial class DictionaryMarkupProcessor
{
    // === Curly-brace pattern regexes (ported from PT9 DictionaryTab.cs:36-43) ===

    [GeneratedRegex(@"\{A:(.*?)\}")]
    private static partial Regex AuthorReferenceRegex();

    [GeneratedRegex(@"\{L:(.*?)\}")]
    private static partial Regex LexicalLinkRegex();

    [GeneratedRegex(@"\{D:(.*?)\}")]
    private static partial Regex DomainReferenceRegex();

    [GeneratedRegex(@"\{N:\s*(\d+)\}")]
    private static partial Regex NoteReferenceRegex();

    [GeneratedRegex(@"\{S:\s*([\d\s\-]+)\}")]
    private static partial Regex ScriptureReferenceRegex();

    // === Pipe-delimited formatting regexes (ported from PT9 MarbleTabBase.cs:49,58-59) ===

    [GeneratedRegex(@"\|i(.*?)\|i")]
    private static partial Regex ItalicFormattingRegex();

    [GeneratedRegex(@"\|b(.*?)\|b")]
    private static partial Regex BoldFormattingRegex();

    [GeneratedRegex(@"\|u(.*?)\|u")]
    private static partial Regex UnderlineFormattingRegex();

    /// <summary>
    /// Processes dictionary markup patterns replacing them with HTML.
    ///
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/Marble/DictionaryTab.cs:1185-1275
    /// Method: DictionaryTab.ProcessMarkup()
    /// Maps to: EXT-056, CAP-014
    /// </summary>
    /// <param name="rawMarkup">Raw markup text containing dictionary patterns.</param>
    /// <param name="dictionary">Dictionary identifier ("SDBG" or "SDBH").</param>
    /// <returns>HTML string with all markup patterns replaced.</returns>
    public static string ProcessDictionaryMarkup(string rawMarkup, string dictionary)
    {
        if (string.IsNullOrEmpty(rawMarkup))
            return "";

        string content = rawMarkup;

        // Phase 1: Process curly-brace patterns (fixed order per PT9)
        content = AuthorReferenceRegex().Replace(content, FormatAuthorReference);
        content = LexicalLinkRegex().Replace(content, FormatLexicalLink);
        content = DomainReferenceRegex().Replace(content, FormatDomainReference);
        content = NoteReferenceRegex().Replace(content, FormatNoteReference);
        content = ScriptureReferenceRegex().Replace(content, FormatScriptureReference);

        // Phase 2: Process pipe-delimited formatting patterns
        content = ItalicFormattingRegex().Replace(content, "<i>$1</i>");
        content = BoldFormattingRegex().Replace(content, "<b>$1</b>");
        content = UnderlineFormattingRegex().Replace(content, "<u>$1</u>");

        return content;
    }

    /// <summary>
    /// Formats an {A:text} author reference as an HTML span.
    /// </summary>
    private static string FormatAuthorReference(Match match) =>
        $"<span class='author'>{match.Groups[1].Value}</span>";

    /// <summary>
    /// Formats an {L:dict:lemma:sense} lexical link as a clickable HTML anchor
    /// with the displaylemma: URL scheme.
    /// </summary>
    private static string FormatLexicalLink(Match match)
    {
        string parts = match.Groups[1].Value;
        return $"<a class='lemmaref' href='displaylemma:{parts}'>{parts}</a>";
    }

    /// <summary>
    /// Formats a {D:text} domain reference as a clickable HTML anchor
    /// with the displaycat: URL scheme.
    /// </summary>
    private static string FormatDomainReference(Match match)
    {
        string domainText = match.Groups[1].Value;
        return $"<a class='domainref' href='displaycat:{domainText}'>{domainText}</a>";
    }

    /// <summary>
    /// Formats a {N:number} note reference as an HTML superscript element.
    /// </summary>
    private static string FormatNoteReference(Match match) => $"<sup>{match.Groups[1].Value}</sup>";

    /// <summary>
    /// Formats a {S:BBBCCCVVV ...} scripture reference by delegating to
    /// EncyclopediaContentService.FormatBCVRefs for versification-aware formatting.
    /// </summary>
    private static string FormatScriptureReference(Match match)
    {
        string refs = match.Groups[1].Value.Trim();
        return EncyclopediaContentService.FormatBCVRefs(refs, ScrVers.Original);
    }
}
