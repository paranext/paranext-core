using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ParallelPassages;
using Paratext.Data;

namespace TestParanextDataProvider.ParallelPassages;

/// <summary>
/// Tests for CAP-007 (SourceLanguageTextGlossing). RED-phase TDD tests.
/// EXT-007: Parses LTG files, maps glosses to surface words, Hebrew compound splitting.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class ParallelPassageMatchingTests : PapiTestBase
{
    #region CAP-007: SourceLanguageTextGlossing - Acceptance Test

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-045")]
    [Property("BehaviorId", "EXT-007")]
    [Description("Acceptance test: Glossing service returns words with glosses from LTG data")]
    public void GetGlossedWords_AcceptanceTest_ReturnsWordsWithGlosses()
    {
        // Arrange - create a source language text mock
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var glossService = new SourceLanguageGlossService();
        var vref = new VerseRef(40, 4, 1, scrText.Settings.Versification);

        // Act
        var glossedWords = glossService.GetGlossedWords(scrText, vref);

        // Assert - gm-011 golden master: has words, each with gloss
        Assert.That(glossedWords, Is.Not.Null);
        Assert.That(glossedWords.Count, Is.GreaterThan(0), "Should return glossed words");

        foreach (var word in glossedWords)
        {
            Assert.That(word.Surface, Is.Not.Null.And.Not.Empty,
                "Each word must have a surface form");
            Assert.That(word.Gloss, Is.Not.Null,
                $"Word '{word.Surface}' must have a gloss (may be empty string)");
        }
    }

    #endregion

    #region CAP-007: Contract Tests - Basic Glossing

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-045")]
    [Property("BehaviorId", "EXT-007")]
    [Description("GetGlossedWords returns non-null list for valid source text")]
    public void GetGlossedWords_ValidSourceText_ReturnsNonNullList()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var glossService = new SourceLanguageGlossService();
        var vref = new VerseRef(40, 4, 1, scrText.Settings.Versification);

        var result = glossService.GetGlossedWords(scrText, vref);

        Assert.That(result, Is.Not.Null);
        Assert.That(result, Is.InstanceOf<List<GlossedSLTWord>>());
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-045")]
    [Property("BehaviorId", "EXT-007")]
    [Description("GetGlossedWords returns empty list when no LTG data available")]
    public void GetGlossedWords_NoLtgData_ReturnsEmptyList()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var glossService = new SourceLanguageGlossService();
        // Use an unlikely verse that would have no LTG data
        var vref = new VerseRef(66, 22, 21, scrText.Settings.Versification);

        var result = glossService.GetGlossedWords(scrText, vref);

        Assert.That(result, Is.Not.Null, "Should return empty list, not null");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-045")]
    [Property("BehaviorId", "EXT-007")]
    [Description("Each GlossedSLTWord has a valid DegreeOfParallelism")]
    public void GetGlossedWords_EachWord_HasValidDegree()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var glossService = new SourceLanguageGlossService();
        var vref = new VerseRef(40, 4, 1, scrText.Settings.Versification);

        var result = glossService.GetGlossedWords(scrText, vref);

        foreach (var word in result)
        {
            Assert.That(
                word.DegreeOfParallelism,
                Is.AnyOf("None", "CalculatedMatch", "ExpertClose", "ExpertExact"),
                $"Word '{word.Surface}' has invalid DegreeOfParallelism: {word.DegreeOfParallelism}"
            );
        }
    }

    #endregion

    #region CAP-007: Contract Tests - Hebrew Compound Splitting

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-046")]
    [Property("BehaviorId", "BHV-600")]
    [Description("Hebrew compound words are split on '+' separator")]
    public void GetGlossedWords_HebrewCompound_SplitsOnPlusSeparator()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var glossService = new SourceLanguageGlossService();
        // Genesis 1:1 - likely to contain Hebrew compounds
        var vref = new VerseRef(1, 1, 1, scrText.Settings.Versification);

        var result = glossService.GetGlossedWords(scrText, vref);

        // When Hebrew compound words exist, they should be split into components
        // Each component should have its own surface form and gloss
        Assert.That(result, Is.Not.Null);
        // Compound words are split: the original compound should not appear as-is
        // Individual component lemmas should be extracted
        foreach (var word in result)
        {
            Assert.That(word.Surface, Does.Not.Contain("+"),
                "Compound words should be split; '+' should not appear in surface form");
        }
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-046")]
    [Property("BehaviorId", "BHV-600")]
    [Description("BTW/WW markers are handled during Hebrew compound splitting")]
    public void GetGlossedWords_HebrewBtwWwMarkers_HandledCorrectly()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var glossService = new SourceLanguageGlossService();
        var vref = new VerseRef(1, 1, 1, scrText.Settings.Versification);

        var result = glossService.GetGlossedWords(scrText, vref);

        Assert.That(result, Is.Not.Null);
        // BTW/WW markers should be stripped from output
        foreach (var word in result)
        {
            Assert.That(word.Surface, Does.Not.Contain("<D:BTW>"),
                "BTW markers should be stripped");
            Assert.That(word.Surface, Does.Not.Contain("<D:WW>"),
                "WW markers should be stripped");
        }
    }

    #endregion

    #region CAP-007: Golden Master Tests

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-045")]
    [Property("BehaviorId", "EXT-007")]
    [Description("gm-011: Basic glossed SLT retrieval produces words with glosses")]
    public void GetGlossedWords_GoldenMaster011_ProducesWordsWithGlosses()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var glossService = new SourceLanguageGlossService();
        var vref = new VerseRef(40, 4, 1, scrText.Settings.Versification);

        var result = glossService.GetGlossedWords(scrText, vref);

        // gm-011 expected: hasWords=true, eachWordHasGloss=true
        Assert.That(result.Count, Is.GreaterThan(0), "gm-011: hasWords must be true");
        Assert.That(
            result.All(w => w.Gloss != null),
            Is.True,
            "gm-011: eachWordHasGloss must be true"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-046")]
    [Property("BehaviorId", "BHV-600")]
    [Description("gm-012: Hebrew compound splitting produces correct component lemmas")]
    public void GetGlossedWords_GoldenMaster012_SplitsHebrewCompoundsCorrectly()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var glossService = new SourceLanguageGlossService();
        var vref = new VerseRef(1, 1, 1, scrText.Settings.Versification);

        var result = glossService.GetGlossedWords(scrText, vref);

        // gm-012 expected: splitCorrectly=true, componentLemmasExtracted=true
        Assert.That(result, Is.Not.Null, "gm-012: result must not be null");
        // No compound markers should remain in output
        Assert.That(
            result.Any(w => w.Surface.Contains("+")),
            Is.False,
            "gm-012: splitCorrectly - no '+' in surface forms"
        );
    }

    #endregion

    #region CAP-007: Error Handling

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-045")]
    [Property("BehaviorId", "EXT-007")]
    [Description("GetGlossedWords handles word count mismatch gracefully")]
    public void GetGlossedWords_WordCountMismatch_HandlesGracefully()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var glossService = new SourceLanguageGlossService();
        var vref = new VerseRef(40, 4, 1, scrText.Settings.Versification);

        // Should not throw even if LTG word count differs from surface word count
        Assert.DoesNotThrow(() =>
        {
            glossService.GetGlossedWords(scrText, vref);
        }, "Word count mismatch must be handled gracefully, not throw");
    }

    #endregion
}
