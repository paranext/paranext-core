namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Reference to an encyclopedia entry returned by <c>loadEncyclopedia</c>.
/// Source: CAP-009, EXT-014, BHV-604.
/// <para>
/// <c>ArticleId</c> is the typed lookup key ("FAUNA:2.31", "REALIA:6.13.1", ...)
/// - the same value <c>readArticle</c> expects in <c>ArticleInput.ArticleId</c>
/// (PT9 MarbleEncyclopediaEntry.cs / MarbleDataAccess article-key construction).
/// <c>Key</c> is the bare entry key inside its type (without the "TYPE:" prefix);
/// retained for display contexts that already know the encyclopedia type.
/// </para>
/// <para>
/// Cross-references, verse references, and the rendered article body live on
/// <see cref="ArticleData"/>, returned by <c>readArticle</c> - they are not
/// duplicated on this list-row record. Inline image ids are kept on the row so
/// the list can show image counts without a second round trip.
/// </para>
/// </summary>
public record EncyclopediaEntryRef(
    string ArticleId,
    string Key,
    string Title,
    string TeaserText,
    int FormatVersion,
    IList<string>? InlineImageIds = null
);
