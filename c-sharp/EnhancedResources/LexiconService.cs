using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for lexical link parsing, dictionary lookups, gloss retrieval,
/// and abbreviation lookups.
///
/// Contract: Section 4.1 ParseLexicalLinks (data-contracts.md)
/// Extraction: EXT-001 (Lexical Link Parsing and Format Handling)
/// Behavior: BHV-302 (Lexical Link Data Model)
/// </summary>
internal static class LexiconService
{
    /// <summary>
    /// Parse semicolon-separated lexical link strings from USX character elements
    /// into structured <see cref="LexicalLink"/> objects.
    /// </summary>
    /// <remarks>
    /// Format: "Dictionary:Lemma:BBBMMM" where BBB and MMM are 3-digit zero-padded indices.
    /// Multiple links separated by semicolons.
    ///
    /// Ported from PT9 MarbleLexicalLink.cs:30-57 (EXT-001).
    /// PT9 silently drops malformed links; PT10 returns explicit error results per contract.
    /// </remarks>
    public static Task<ParseLexicalLinksResult> ParseLexicalLinksAsync(
        LexicalLinkInput input,
        CancellationToken ct
    )
    {
        if (string.IsNullOrEmpty(input.LinkString))
            return CreateErrorResult("INVALID_INPUT", "Link string must not be null or empty");

        string[] linkParts = input.LinkString.Split(';');
        var links = new List<LexicalLink>(linkParts.Length);

        foreach (string linkPart in linkParts)
        {
            ParseLexicalLinksResult? error = ParseSingleLink(linkPart, out LexicalLink? link);
            if (error is not null)
                return Task.FromResult(error);

            links.Add(link!);
        }

        return Task.FromResult(new ParseLexicalLinksResult(true, links));
    }

    /// <summary>
    /// Parse a single "Dictionary:Lemma:BBBMMM" link string into a <see cref="LexicalLink"/>.
    /// </summary>
    /// <returns>
    /// An error result if the link is malformed; <c>null</c> on success
    /// (with <paramref name="link"/> populated).
    /// </returns>
    private static ParseLexicalLinksResult? ParseSingleLink(string linkPart, out LexicalLink? link)
    {
        link = null;

        string[] parts = linkPart.Split(':');
        if (parts.Length != 3)
            return CreateParseError(
                "Invalid lexical link format: expected 'Dictionary:Lemma:BBBMMM'"
            );

        string indices = parts[2];
        if (
            indices.Length < 6
            || !int.TryParse(indices[..3], out int baseFormIndex)
            || !int.TryParse(indices[3..6], out int meaningIndex)
        )
            return CreateParseError("Invalid base form or meaning index in link");

        link = new LexicalLink(parts[0], parts[1], baseFormIndex, meaningIndex);
        return null;
    }

    /// <summary>
    /// Determines the dictionary name for a given book number based on testament.
    /// </summary>
    /// <remarks>
    /// Invariant INV-013: OT -> SDBH, NT -> SDBG, DC -> DCLEX.
    /// Ported from PT9 MarbleDataAccess.cs:373-376.
    /// </remarks>
    public static string GetDictionaryForBook(int bookNumber)
    {
        if (Canon.IsBookOT(bookNumber))
            return "SDBH";
        if (Canon.IsBookNT(bookNumber))
            return "SDBG";
        return "DCLEX";
    }

    /// <summary>
    /// Look up a lexicon entry by dictionary, lemma, and indices, returning
    /// structured entry data with localized glosses.
    /// </summary>
    /// <remarks>
    /// Contract: Section 4.4 GetDictionaryEntry (data-contracts.md)
    /// Behaviors: BHV-302, BHV-303, BHV-308
    /// Invariant: INV-016 (Lemma Unicode normalization to FormD)
    ///
    /// RED phase stub: throws NotImplementedException until CAP-004 is implemented.
    /// </remarks>
    public static Task<DictionaryResult> GetDictionaryEntryAsync(
        DictionaryLookupInput input,
        CancellationToken ct
    )
    {
        // RED phase: stub - will be implemented in GREEN phase
        throw new NotImplementedException("CAP-004: GetDictionaryEntryAsync not yet implemented");
    }

    /// <summary>
    /// Deduplicates dictionary display items based on BHV-302 rules:
    /// - Same translation + same surface form = one row
    /// - Same translation + different surface forms = separate rows
    /// - Different translations + same lemma = separate rows
    /// </summary>
    /// <remarks>
    /// Extraction: EXT-027 (Dictionary Tab Loading)
    /// Golden Master: GM-036 (Dictionary Deduplication)
    ///
    /// RED phase stub: throws NotImplementedException until CAP-004 is implemented.
    /// </remarks>
    public static IReadOnlyList<DictionaryDisplayItem> DeduplicateDictionaryItems(
        IReadOnlyList<DictionaryDisplayItem> items
    )
    {
        // RED phase: stub - will be implemented in GREEN phase
        throw new NotImplementedException(
            "CAP-004: DeduplicateDictionaryItems not yet implemented"
        );
    }

    private static Task<ParseLexicalLinksResult> CreateErrorResult(string code, string message) =>
        Task.FromResult(new ParseLexicalLinksResult(false, Error: new ErrorInfo(code, message)));

    private static ParseLexicalLinksResult CreateParseError(string message) =>
        new(false, Error: new ErrorInfo("PARSE_ERROR", message));
}
