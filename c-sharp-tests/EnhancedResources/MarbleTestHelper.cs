using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using Paratext.Data;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Test helper for setting up MarbleDataAccessService with test data.
/// Provides canned gloss data matching the golden master expectations.
/// </summary>
[ExcludeFromCodeCoverage]
internal static class MarbleTestHelper
{
    // Hebrew Elohim lemma used across golden masters gm-020, gm-021, gm-022
    internal const string Elohim = "\u05D0\u05B1\u05DC\u05B9\u05D4\u05B4\u05D9\u05DD";

    // Chinese gloss for Elohim (gm-022)
    internal const string ElohimChineseGloss = "\u4E0A\u5E1D\uFF1B\u795E"; // 上帝；神

    /// <summary>
    /// Initializes a MarbleDataAccessService with test data that simulates
    /// installed marble packages with English and Chinese gloss data.
    /// </summary>
    internal static void InitializeWithTestData(MarbleDataAccessService service)
    {
        var glossData = new Dictionary<string, Dictionary<string, List<string>>>
        {
            ["en"] = new Dictionary<string, List<string>>
            {
                [Elohim] = ["God"],
                ["sampleTerm"] = ["sample gloss"],
            },
            ["zh-Hans"] = new Dictionary<string, List<string>>
            {
                [Elohim] = [ElohimChineseGloss],
                ["sampleTerm"] = ["样本"],
            },
        };

        var languageMapping = new Dictionary<string, string>
        {
            ["zh-Hant"] = "zh-Hans",
            ["zh"] = "zh-Hans",
        };

        service.SetTestData(
            haveMarbleData: true,
            glossLanguages: ["en", "zh-Hans"],
            glossData: glossData,
            languageMapping: languageMapping
        );
    }

    /// <summary>
    /// Initializes a MarbleDataAccessService with no data (simulates no packages installed).
    /// </summary>
    internal static void InitializeWithNoData(MarbleDataAccessService service)
    {
        service.SetTestData(haveMarbleData: false, glossLanguages: []);
    }

    // Test resource IDs for factory tests
    internal static readonly string[] TestResourceIds = ["SDBG", "SDBH"];

    /// <summary>
    /// Initializes the factory with test data by configuring its underlying service
    /// and setting test resource IDs.
    /// </summary>
    internal static void InitializeFactoryWithTestData(EnhancedResourceFactory factory)
    {
        InitializeWithTestData(factory.DataAccessService);
        factory.SetTestResourceIds(TestResourceIds);
    }
}
