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
internal static class DictionaryMarkupProcessor
{
    // === Curly-brace pattern regexes (ported from PT9 DictionaryTab.cs:36-43) ===
    private static readonly Regex AbbrevRegex = new(@"\{A:(.*?)\}", RegexOptions.Compiled);
    private static readonly Regex LemmaRefRegex = new(@"\{L:(.*?)\}", RegexOptions.Compiled);
    private static readonly Regex DomainRefRegex = new(@"\{D:(.*?)\}", RegexOptions.Compiled);
    private static readonly Regex NotesRegex = new(@"\{N:\s*(\d+)\}", RegexOptions.Compiled);
    private static readonly Regex ScriptureRefRegex =
        new(@"\{S:\s*([\d\s\-]+)\}", RegexOptions.Compiled);

    // === Pipe-delimited formatting regexes (ported from PT9 MarbleTabBase.cs:49,58-59) ===
    private static readonly Regex ItalicRegex = new(@"\|i(.*?)\|i", RegexOptions.Compiled);
    private static readonly Regex BoldRegex = new(@"\|b(.*?)\|b", RegexOptions.Compiled);
    private static readonly Regex UnderlineRegex = new(@"\|u(.*?)\|u", RegexOptions.Compiled);

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

        // {A:text} -> author-styled HTML span
        content = AbbrevRegex.Replace(
            content,
            match => $"<span class='author'>{match.Groups[1].Value}</span>"
        );

        // {L:dict:lemma:sense} -> clickable lexical link with displaylemma: URL
        content = LemmaRefRegex.Replace(
            content,
            match =>
            {
                string parts = match.Groups[1].Value;
                return $"<a class='lemmaref' href='displaylemma:{parts}'>{parts}</a>";
            }
        );

        // {D:text} -> domain reference with displaycat: URL
        content = DomainRefRegex.Replace(
            content,
            match =>
            {
                string domainText = match.Groups[1].Value;
                return $"<a class='domainref' href='displaycat:{domainText}'>{domainText}</a>";
            }
        );

        // {N:number} -> superscript note reference
        content = NotesRegex.Replace(content, match => $"<sup>{match.Groups[1].Value}</sup>");

        // {S:BBBCCCVVV ...} -> versification-aware verse links via FormatBCVRefs
        content = ScriptureRefRegex.Replace(
            content,
            match =>
            {
                string refs = match.Groups[1].Value.Trim();
                return EncyclopediaContentService.FormatBCVRefs(refs, ScrVers.Original);
            }
        );

        // Phase 2: Process pipe-delimited formatting patterns

        // |itext|i -> <i>text</i>
        content = ItalicRegex.Replace(content, "<i>$1</i>");

        // |btext|b -> <b>text</b>
        content = BoldRegex.Replace(content, "<b>$1</b>");

        // |utext|u -> <u>text</u>
        content = UnderlineRegex.Replace(content, "<u>$1</u>");

        return content;
    }
}
