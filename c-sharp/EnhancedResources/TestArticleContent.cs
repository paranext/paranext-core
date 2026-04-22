namespace Paranext.DataProvider.EnhancedResources;

// Data-shape record for CAP-010 article fixtures. Production declares the shape so
// EncyclopediaService.GetArticle can consume strongly typed content; populated article
// data lives in c-sharp-tests/EnhancedResources/Fixtures/EncyclopediaFixtures.cs
// per N3 policy (patterns.csharp.testScaffoldingLocation).
internal record TestArticleContent(
    string Title,
    IList<string> RawParagraphs,
    IList<string> ImageIds,
    bool IsV2
);
