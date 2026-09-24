namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for GetArticle: retrieves structured article data for a single encyclopedia article.
/// Source: Section 4.10 M-010, BHV-606, BHV-607, BHV-608, BHV-457
/// </summary>
public record ArticleInput(string ArticleId, string ResourceId, string UserLanguage);
