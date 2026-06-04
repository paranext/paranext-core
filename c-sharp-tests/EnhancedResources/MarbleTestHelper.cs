using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Runtime.CompilerServices;
using Paranext.DataProvider.EnhancedResources;
using Paratext.Data;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Test helper for constructing MarbleDataAccessService / related services from
/// fixture records. No static seams; services are immutable.
/// </summary>
[ExcludeFromCodeCoverage]
internal static class MarbleTestHelper
{
    // Hebrew Elohim lemma used across golden masters gm-020, gm-021, gm-022.
    internal const string Elohim = "אֱלֹהִים";

    // Chinese gloss for Elohim (gm-022).
    internal const string ElohimChineseGloss = "上帝；神"; // 上帝；神

    /// <summary>
    /// Builds a GlossData record matching the pre-refactor MarbleTestHelper test data.
    /// </summary>
    internal static GlossData BuildTestGlossData()
    {
        var byLanguage = new Dictionary<string, IReadOnlyDictionary<string, IReadOnlyList<string>>>(
            StringComparer.OrdinalIgnoreCase
        )
        {
            ["en"] = new Dictionary<string, IReadOnlyList<string>>(StringComparer.Ordinal)
            {
                [Elohim] = new List<string> { "God" },
                ["sampleTerm"] = new List<string> { "sample gloss" },
                ["λόγος"] = new List<string> { "word", "speech", "reason" },
            },
            ["zh-Hans"] = new Dictionary<string, IReadOnlyList<string>>(StringComparer.Ordinal)
            {
                [Elohim] = new List<string> { ElohimChineseGloss },
                ["sampleTerm"] = new List<string> { "样本" },
            },
        };

        return new GlossData(byLanguage, ["en", "zh-Hans"]);
    }

    /// <summary>
    /// LanguageMapping matching pre-refactor MarbleTestHelper defaults: zh-Hant -> zh-Hans, zh -> zh-Hans.
    /// </summary>
    internal static LanguageMapping BuildTestLanguageMapping() =>
        new(
            new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
            {
                ["zh-Hant"] = "zh-Hans",
                ["zh"] = "zh-Hans",
            }
        );

    /// <summary>
    /// Builds a service with gloss data and the supplied bible list. Pass a non-empty
    /// list for HaveMarbleData=true; pass [] for the "no data" case.
    /// </summary>
    internal static MarbleDataAccessService BuildServiceWithBibles(
        IReadOnlyList<ResourceScrText> bibles
    ) => new(BuildTestGlossData(), BuildTestLanguageMapping(), bibles);

    /// <summary>Builds a service with empty gloss data and no bibles (HaveMarbleData=false).</summary>
    internal static MarbleDataAccessService BuildServiceWithNoData() =>
        new(GlossData.Empty, LanguageMapping.Empty, []);

    /// <summary>
    /// Builds a service whose HaveMarbleData is true via a sentinel ResourceScrText.
    /// For tests that only need HaveMarbleData=true without inspecting AvailableBibles
    /// contents. Tests that need to read bible properties should construct the service
    /// directly with real ResourceScrText instances loaded from a fixture zip.
    /// </summary>
    internal static MarbleDataAccessService BuildServiceWithTestData() =>
        BuildServiceWithBibles([Fixtures.FakeResourceScrText.Instance]);

    /// <summary>
    /// Creates an uninitialized ResourceScrText and reflectively sets its ProjectName
    /// so that .Name returns the requested short name. Used by factory tests that need
    /// AvailableBibles to contain a specific ID. No other members are safe to touch.
    /// </summary>
    internal static ResourceScrText CreateFakeMarbleScrText(string shortName)
    {
        var instance = (ResourceScrText)
            RuntimeHelpers.GetUninitializedObject(typeof(ResourceScrText));

        var projectName = new ProjectName { ShortName = shortName, ProjectPath = string.Empty };
        var projectNameField =
            typeof(ScrText).GetField("projectName", BindingFlags.NonPublic | BindingFlags.Instance)
            ?? throw new InvalidOperationException(
                "ScrText.projectName field not found - ParatextData layout changed"
            );
        projectNameField.SetValue(instance, projectName);

        return instance;
    }
}
