namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Structured article data with cross-references, verse links, abbreviation data, and image references.
/// [Revised: Theme 2] Returns structured data, not HTML.
/// Source: Section 4.10 M-010, BHV-606, BHV-607, BHV-608, BHV-457
/// </summary>
public record ArticleData(
    string ArticleId,
    string Title,
    IList<ArticleParagraph> Paragraphs,
    IList<ArticleCrossRef> CrossReferences,
    IList<string> ImageIds
);

/// <summary>
/// A paragraph within an article, containing text with inline verse links,
/// abbreviation data, and image references.
/// </summary>
public record ArticleParagraph(
    string Text,
    IList<ArticleVerseLink> VerseLinks,
    IList<ArticleAbbreviation> Abbreviations,
    IList<string> InlineImageIds
);

/// <summary>
/// A verse reference link within an article paragraph.
/// Pattern: G04300301600000 = G + BookCode(3) + Chapter(3) + Verse(3) + CharOffset(5)
/// Source: BHV-607
/// </summary>
public record ArticleVerseLink(
    SIL.Scripture.VerseRef Reference,
    string DisplayText,
    /// <summary>Pattern: G04300301600000 = BookCode + Chapter + Verse + CharOffset</summary>
    string RawReference
);

/// <summary>
/// A cross-reference to another article or image viewer.
/// Source: BHV-606, BHV-457
/// </summary>
public record ArticleCrossRef(
    string TargetArticleId,
    string DisplayText,
    /// <summary>One of: 'seealso', 'launchViewer'</summary>
    string Type
);

/// <summary>
/// An abbreviation with its full-text expansion for tooltip rendering.
/// Source: BHV-608
/// </summary>
public record ArticleAbbreviation(string Abbrev, string FullText);
