using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Reference to an encyclopedia entry. V1 entries have simpler paragraph structure;
/// V2 entries have sections, BibleImageIds, and cross-references.
/// Source: CAP-009, EXT-014, BHV-604
/// </summary>
public record EncyclopediaEntryRef(
    string Key,
    string Title,
    string TeaserText,
    int FormatVersion,
    string? ArticleHtml = null,
    IList<string>? SeeAlsoIds = null,
    IList<VerseRef>? VerseReferences = null,
    IList<string>? InlineImageIds = null
);
