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
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleLexicalLink.cs:30-57
    // Method: MarbleLexicalLink.ParseLexicalLinks() + ParseOneLexicalLink() + ParseLexicalIndices()
    // Maps to: EXT-001
    //
    // EXPLANATION:
    // Parses semicolon-separated lexical link strings into structured LexicalLink objects.
    // Each link has format "Dictionary:Lemma:BBBMMM" where BBB is the 3-digit zero-padded
    // base form index and MMM is the 3-digit zero-padded meaning index.
    // PT9 silently drops malformed links; PT10 returns explicit error results per contract.
    /// <summary>
    /// Parse semicolon-separated lexical link strings from USX character elements
    /// into structured <see cref="LexicalLink"/> objects.
    ///
    /// Format: "Dictionary:Lemma:BBBMMM" where BBB and MMM are 3-digit zero-padded indices.
    /// Multiple links separated by semicolons.
    ///
    /// Contract: Section 4.1 (data-contracts.md)
    /// Behavior: BHV-302
    /// Extraction: EXT-001
    /// </summary>
    public static Task<ParseLexicalLinksResult> ParseLexicalLinksAsync(
        LexicalLinkInput input,
        CancellationToken ct
    )
    {
        if (string.IsNullOrEmpty(input.LinkString))
        {
            return Task.FromResult(
                new ParseLexicalLinksResult(
                    false,
                    Error: new ErrorInfo("INVALID_INPUT", "Link string must not be null or empty")
                )
            );
        }

        string[] linkParts = input.LinkString.Split(';');
        var links = new List<LexicalLink>(linkParts.Length);

        foreach (string linkPart in linkParts)
        {
            string[] parts = linkPart.Split(':');
            if (parts.Length != 3)
            {
                return Task.FromResult(
                    new ParseLexicalLinksResult(
                        false,
                        Error: new ErrorInfo(
                            "PARSE_ERROR",
                            "Invalid lexical link format: expected 'Dictionary:Lemma:BBBMMM'"
                        )
                    )
                );
            }

            string indices = parts[2];
            if (indices.Length < 6)
            {
                return Task.FromResult(
                    new ParseLexicalLinksResult(
                        false,
                        Error: new ErrorInfo(
                            "PARSE_ERROR",
                            "Invalid base form or meaning index in link"
                        )
                    )
                );
            }

            if (
                !int.TryParse(indices.Substring(0, 3), out int baseFormIndex)
                || !int.TryParse(indices.Substring(3, 3), out int meaningIndex)
            )
            {
                return Task.FromResult(
                    new ParseLexicalLinksResult(
                        false,
                        Error: new ErrorInfo(
                            "PARSE_ERROR",
                            "Invalid base form or meaning index in link"
                        )
                    )
                );
            }

            links.Add(new LexicalLink(parts[0], parts[1], baseFormIndex, meaningIndex));
        }

        return Task.FromResult(new ParseLexicalLinksResult(true, links));
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs:373-376
    // Method: MarbleDataAccess.GetDictionaryProject()
    // Maps to: INV-013
    /// <summary>
    /// Determines the dictionary name for a given book number based on testament.
    ///
    /// Invariant: INV-013 (Book-to-Dictionary Mapping)
    /// - OT books -> SDBH (Hebrew dictionary)
    /// - NT books -> SDBG (Greek dictionary)
    /// - DC books -> DCLEX (Deuterocanon dictionary)
    ///
    /// Uses Canon.IsBookOT / Canon.IsBookNT for determination.
    /// </summary>
    public static string GetDictionaryForBook(int bookNumber)
    {
        if (Canon.IsBookOT(bookNumber))
            return "SDBH";
        if (Canon.IsBookNT(bookNumber))
            return "SDBG";
        return "DCLEX";
    }
}
