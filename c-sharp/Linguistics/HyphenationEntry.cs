namespace Paranext.DataProvider.Linguistics;

/// <summary>
/// A single word's hyphenation data from a project's hyphenatedWords.txt file.
/// This class corresponds to the HyphenationEntry type defined in platform-scripture.d.ts.
/// Keep their structures in sync for serialization compatibility.
/// </summary>
// === PORTED FROM PT9 ===
// Source: PT9/ParatextData/Linguistics/Hyphenation.cs:237-272
// Method: HyphenationDataEntry (wire-shape mirror; PT9 "Guess" flag is inverted to "IsApproved"
// for clarity in the PT10 API)
// Maps to: research/paratext-9-features/05_Spelling_Wordlist.md §5.6
internal sealed class HyphenationEntry(string word, string hyphenation, bool isApproved)
{
    /// <summary>Word without hyphens, lowercase</summary>
    public string Word { get; set; } = word;

    /// <summary>Word hyphenated, with "=" signs at hyphenation points, lowercase</summary>
    public string Hyphenation { get; set; } = hyphenation;

    /// <summary>
    /// True if a user explicitly approved/edited this hyphenation (PT9: non-guess, written with a
    /// leading "*" in hyphenatedWords.txt). False if it was machine-guessed.
    /// </summary>
    public bool IsApproved { get; set; } = isApproved;
}
