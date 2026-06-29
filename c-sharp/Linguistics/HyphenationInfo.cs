namespace Paranext.DataProvider.Linguistics;

/// <summary>
/// Project-level hyphenation metadata from hyphenatedWords.txt.
/// This class corresponds to the HyphenationInfo type defined in platform-scripture.d.ts.
/// Keep their structures in sync for serialization compatibility.
/// </summary>
// === PORTED FROM PT9 ===
// Source: PT9/ParatextData/Linguistics/Hyphenation.cs:67-81, 107-111
// Method: Hyphenation.SoftHyphenOut / HyphenatedMarkers / HadRedundancy / HadUppperCase
// Maps to: research/paratext-9-features/05_Spelling_Wordlist.md §5.6
internal sealed class HyphenationInfo
{
    /// <summary>True if hyphenatedWords.txt exists in the project directory</summary>
    public bool FileExists { get; set; }

    /// <summary>The hyphen character that should be output for printing (default U+00AD)</summary>
    public string SoftHyphenOut { get; set; } = string.Empty;

    /// <summary>USFM paragraph markers whose text should be hyphenated when publishing</summary>
    public List<string> HyphenatedMarkers { get; set; } = [];

    /// <summary>
    /// True if duplicate words with conflicting hyphenation were found when reading the file (can
    /// only occur if the file was edited outside Paratext)
    /// </summary>
    public bool HadRedundancy { get; set; }

    /// <summary>
    /// True if words with capital letters were detected in the file (Paratext stores only
    /// lowercase words; cased forms are normalized on read)
    /// </summary>
    public bool HadUppercase { get; set; }
}
