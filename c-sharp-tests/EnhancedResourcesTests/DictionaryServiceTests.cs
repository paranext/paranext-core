using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-023: GetHomonymGroups.
/// Validates that Biblical Terms are grouped by base lemma for dictionary lookup,
/// correctly handling homonym suffixes (-N). The suffix indicates different senses
/// of the same root word (e.g., "logos-1", "logos-2" both map to base lemma "logos").
///
/// This is a pure function with no external dependencies.
///
/// PT9 Source: BiblicalTerms matching logic, MarbleForm.cs:3060-3163
/// Golden Master: gm-017-homonym-grouping
/// Contract: data-contracts.md Method 23
///
/// The method strips trailing -N suffixes (where N is one or more digits) from term IDs
/// to determine the base lemma, then groups all term IDs sharing the same base lemma.
///
/// Input: IReadOnlyList&lt;string&gt; termIds - term IDs potentially with -N suffixes
/// Output: IReadOnlyDictionary&lt;string, IReadOnlyList&lt;string&gt;&gt; - base lemma -> term IDs
/// </summary>
[TestFixture]
public class DictionaryServiceTests
{
    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-023.
    /// Verifies gm-017 golden master scenarios in a single comprehensive test.
    /// When this test passes, the capability is complete.
    ///
    /// Golden master scenarios from gm-017:
    /// - HG-01: "logos-1" -> base lemma "logos", grouped with other logos variants
    /// - HG-02: "logos-2" -> base lemma "logos", grouped with other logos variants
    /// - HG-03: "logos" (no suffix) -> base lemma "logos", treated as base form
    /// - Mixed input: homonyms and non-homonyms in same call
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-023")]
    [Property("GoldenMasterId", "gm-017")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Description(
        "Acceptance test: Terms grouped by base lemma for dictionary lookup"
    )]
    public void GetHomonymGroups_AllGoldenMasterScenarios_Pass()
    {
        // Arrange: Mix of homonym variants and standalone terms
        var termIds = new List<string> { "logos-1", "logos-2", "logos", "abc-1", "notfound-1" };

        // Act
        var result = DictionaryService.GetHomonymGroups(termIds);

        // Assert
        Assert.Multiple(() =>
        {
            // HG-01 + HG-02 + HG-03: All "logos" variants grouped under "logos"
            Assert.That(
                result.ContainsKey("logos"),
                Is.True,
                "Must have 'logos' as a group key"
            );
            Assert.That(
                result["logos"],
                Is.EquivalentTo(new[] { "logos-1", "logos-2", "logos" }),
                "All logos variants must be grouped together"
            );

            // HG-04: "abc-1" grouped under "abc"
            Assert.That(
                result.ContainsKey("abc"),
                Is.True,
                "Must have 'abc' as a group key"
            );
            Assert.That(
                result["abc"],
                Has.Count.EqualTo(1),
                "abc group should have one entry"
            );
            Assert.That(
                result["abc"],
                Does.Contain("abc-1"),
                "abc group must contain 'abc-1'"
            );

            // HG-05: "notfound-1" grouped under "notfound"
            Assert.That(
                result.ContainsKey("notfound"),
                Is.True,
                "Must have 'notfound' as a group key"
            );
            Assert.That(
                result["notfound"],
                Does.Contain("notfound-1"),
                "notfound group must contain 'notfound-1'"
            );

            // Total groups: logos, abc, notfound = 3
            Assert.That(
                result.Count,
                Is.EqualTo(3),
                "Must have exactly 3 groups"
            );
        });
    }

    #endregion

    #region Golden Master Tests - Individual Scenarios

    /// <summary>
    /// HG-01: Term with -1 suffix is grouped by base lemma.
    /// The "-1" suffix indicates the first homonym sense.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-023")]
    [Property("GoldenMasterId", "gm-017")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Property("GoldenMasterRow", "HG-01")]
    [Description("Term 'logos-1' grouped under base lemma 'logos'")]
    public void GetHomonymGroups_TermWithSuffix1_GroupedByBaseLemma()
    {
        var termIds = new List<string> { "logos-1" };

        var result = DictionaryService.GetHomonymGroups(termIds);

        Assert.That(result.ContainsKey("logos"), Is.True, "Base lemma 'logos' must be key");
        Assert.That(result["logos"], Does.Contain("logos-1"), "Group must contain original term ID");
    }

    /// <summary>
    /// HG-02: Term with -2 suffix is grouped by same base lemma as -1 variant.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-023")]
    [Property("GoldenMasterId", "gm-017")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Property("GoldenMasterRow", "HG-02")]
    [Description("Term 'logos-2' grouped under same base lemma 'logos'")]
    public void GetHomonymGroups_TermWithSuffix2_GroupedBySameBaseLemma()
    {
        var termIds = new List<string> { "logos-1", "logos-2" };

        var result = DictionaryService.GetHomonymGroups(termIds);

        Assert.Multiple(() =>
        {
            Assert.That(result.ContainsKey("logos"), Is.True, "Base lemma 'logos' must be key");
            Assert.That(
                result["logos"],
                Is.EquivalentTo(new[] { "logos-1", "logos-2" }),
                "Both homonym variants must be in same group"
            );
        });
    }

    /// <summary>
    /// HG-03: Term without suffix treated as base form, grouped under itself.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-023")]
    [Property("GoldenMasterId", "gm-017")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Property("GoldenMasterRow", "HG-03")]
    [Description("Term 'logos' without suffix is treated as base form")]
    public void GetHomonymGroups_TermWithoutSuffix_TreatedAsBaseForm()
    {
        var termIds = new List<string> { "logos" };

        var result = DictionaryService.GetHomonymGroups(termIds);

        Assert.Multiple(() =>
        {
            Assert.That(result.ContainsKey("logos"), Is.True, "Base lemma 'logos' must be key");
            Assert.That(result["logos"], Does.Contain("logos"), "Group must contain the unsuffixed term");
            Assert.That(result["logos"], Has.Count.EqualTo(1), "Single term should produce single-element group");
        });
    }

    /// <summary>
    /// HG-03 variant: Term without suffix is grouped with suffixed variants of same base.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-023")]
    [Property("GoldenMasterId", "gm-017")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Property("GoldenMasterRow", "HG-03")]
    [Description("Unsuffixed term grouped with suffixed variants")]
    public void GetHomonymGroups_MixedSuffixedAndUnsuffixed_GroupedTogether()
    {
        var termIds = new List<string> { "logos-1", "logos-2", "logos" };

        var result = DictionaryService.GetHomonymGroups(termIds);

        Assert.Multiple(() =>
        {
            Assert.That(result.Count, Is.EqualTo(1), "All variants share same base lemma");
            Assert.That(result.ContainsKey("logos"), Is.True);
            Assert.That(
                result["logos"],
                Is.EquivalentTo(new[] { "logos-1", "logos-2", "logos" }),
                "All three terms must be in same group"
            );
        });
    }

    #endregion

    #region Contract Tests - Happy Path

    /// <summary>
    /// Single term with no suffix returns a dictionary with one group.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Description("Single unsuffixed term returns single group")]
    public void GetHomonymGroups_SingleUnsuffixedTerm_ReturnsSingleGroup()
    {
        var termIds = new List<string> { "agape" };

        var result = DictionaryService.GetHomonymGroups(termIds);

        Assert.Multiple(() =>
        {
            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result.ContainsKey("agape"), Is.True);
            Assert.That(result["agape"], Is.EqualTo(new[] { "agape" }));
        });
    }

    /// <summary>
    /// Multiple distinct terms with no suffixes produce separate groups.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Description("Multiple distinct terms produce separate groups")]
    public void GetHomonymGroups_MultipleDistinctTerms_ProduceSeparateGroups()
    {
        var termIds = new List<string> { "agape", "pistis", "charis" };

        var result = DictionaryService.GetHomonymGroups(termIds);

        Assert.Multiple(() =>
        {
            Assert.That(result.Count, Is.EqualTo(3));
            Assert.That(result.ContainsKey("agape"), Is.True);
            Assert.That(result.ContainsKey("pistis"), Is.True);
            Assert.That(result.ContainsKey("charis"), Is.True);
            Assert.That(result["agape"], Is.EqualTo(new[] { "agape" }));
            Assert.That(result["pistis"], Is.EqualTo(new[] { "pistis" }));
            Assert.That(result["charis"], Is.EqualTo(new[] { "charis" }));
        });
    }

    /// <summary>
    /// Multiple homonym variants of same base produce one group with all variants.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Description("Homonym variants grouped into single group")]
    public void GetHomonymGroups_HomonymVariants_ProduceSingleGroup()
    {
        var termIds = new List<string> { "pistis-1", "pistis-2", "pistis-3" };

        var result = DictionaryService.GetHomonymGroups(termIds);

        Assert.Multiple(() =>
        {
            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result.ContainsKey("pistis"), Is.True);
            Assert.That(
                result["pistis"],
                Is.EquivalentTo(new[] { "pistis-1", "pistis-2", "pistis-3" })
            );
        });
    }

    /// <summary>
    /// Mixed input: some terms with suffixes, some without, some sharing base lemma.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Description("Mixed input with various suffix patterns")]
    public void GetHomonymGroups_MixedInput_CorrectlyGrouped()
    {
        var termIds = new List<string>
        {
            "logos-1",
            "logos-2",
            "agape",
            "pistis-1",
            "charis",
            "pistis-2",
        };

        var result = DictionaryService.GetHomonymGroups(termIds);

        Assert.Multiple(() =>
        {
            Assert.That(result.Count, Is.EqualTo(4), "logos, agape, pistis, charis = 4 groups");
            Assert.That(
                result["logos"],
                Is.EquivalentTo(new[] { "logos-1", "logos-2" })
            );
            Assert.That(result["agape"], Is.EqualTo(new[] { "agape" }));
            Assert.That(
                result["pistis"],
                Is.EquivalentTo(new[] { "pistis-1", "pistis-2" })
            );
            Assert.That(result["charis"], Is.EqualTo(new[] { "charis" }));
        });
    }

    #endregion

    #region Contract Tests - Empty and Null Input

    /// <summary>
    /// Empty input returns empty dictionary per data-contracts.md:
    /// "returns empty dictionary for empty input"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Description("Empty input returns empty dictionary")]
    public void GetHomonymGroups_EmptyInput_ReturnsEmptyDictionary()
    {
        var termIds = new List<string>();

        var result = DictionaryService.GetHomonymGroups(termIds);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Count, Is.EqualTo(0));
    }

    #endregion

    #region Edge Case Tests - Suffix Patterns

    /// <summary>
    /// Term with multi-digit suffix (e.g., "-10") should still strip correctly.
    /// While typical MARBLE data uses single-digit suffixes, the stripping logic
    /// should handle multi-digit numbers robustly.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Description("Multi-digit suffix stripped correctly")]
    public void GetHomonymGroups_MultiDigitSuffix_StrippedCorrectly()
    {
        var termIds = new List<string> { "word-10", "word-2" };

        var result = DictionaryService.GetHomonymGroups(termIds);

        Assert.Multiple(() =>
        {
            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result.ContainsKey("word"), Is.True);
            Assert.That(
                result["word"],
                Is.EquivalentTo(new[] { "word-10", "word-2" })
            );
        });
    }

    /// <summary>
    /// Term ending with hyphen followed by non-digit (e.g., "al-Masih")
    /// should NOT have the suffix stripped. Only -N where N is digits should strip.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Description("Hyphen with non-digit text is NOT treated as homonym suffix")]
    public void GetHomonymGroups_HyphenWithNonDigit_NotTreatedAsSuffix()
    {
        var termIds = new List<string> { "al-Masih" };

        var result = DictionaryService.GetHomonymGroups(termIds);

        Assert.Multiple(() =>
        {
            Assert.That(result.Count, Is.EqualTo(1));
            // "al-Masih" should be kept as-is since "Masih" is not digits
            Assert.That(result.ContainsKey("al-Masih"), Is.True, "Non-digit hyphenated term is not split");
            Assert.That(result["al-Masih"], Is.EqualTo(new[] { "al-Masih" }));
        });
    }

    /// <summary>
    /// Term with mixed digits and letters after hyphen (e.g., "term-1a")
    /// should NOT strip since "1a" is not purely numeric.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Description("Hyphen with mixed digits and letters is NOT treated as suffix")]
    public void GetHomonymGroups_HyphenWithMixedContent_NotTreatedAsSuffix()
    {
        var termIds = new List<string> { "term-1a" };

        var result = DictionaryService.GetHomonymGroups(termIds);

        Assert.Multiple(() =>
        {
            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result.ContainsKey("term-1a"), Is.True);
        });
    }

    /// <summary>
    /// Term that is just a number should not be treated as having a suffix.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Description("Bare hyphen-number at start is handled gracefully")]
    public void GetHomonymGroups_TermIsHyphenNumber_HandledGracefully()
    {
        // Edge case: what if term ID is "-1" (unlikely but defensive)
        var termIds = new List<string> { "-1" };

        var result = DictionaryService.GetHomonymGroups(termIds);

        // Should not crash; exact behavior depends on implementation
        // but the result should contain the term in some group
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Count, Is.GreaterThanOrEqualTo(1));
    }

    /// <summary>
    /// Term with multiple hyphens (e.g., "beth-el-1") should only strip the last -N suffix.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Description("Multiple hyphens: only trailing -N stripped")]
    public void GetHomonymGroups_MultipleHyphens_OnlyTrailingSuffixStripped()
    {
        var termIds = new List<string> { "beth-el-1", "beth-el-2" };

        var result = DictionaryService.GetHomonymGroups(termIds);

        Assert.Multiple(() =>
        {
            Assert.That(result.Count, Is.EqualTo(1));
            // Base lemma should be "beth-el" (stripping only trailing "-1"/"-2")
            Assert.That(result.ContainsKey("beth-el"), Is.True, "Base lemma preserves internal hyphens");
            Assert.That(
                result["beth-el"],
                Is.EquivalentTo(new[] { "beth-el-1", "beth-el-2" })
            );
        });
    }

    /// <summary>
    /// Duplicate term IDs in input should be preserved in output groups.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Description("Duplicate term IDs preserved in groups")]
    public void GetHomonymGroups_DuplicateTermIds_PreservedInGroups()
    {
        var termIds = new List<string> { "logos-1", "logos-1" };

        var result = DictionaryService.GetHomonymGroups(termIds);

        Assert.Multiple(() =>
        {
            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result.ContainsKey("logos"), Is.True);
            // Both duplicates should be in the group
            Assert.That(result["logos"], Has.Count.EqualTo(2));
        });
    }

    /// <summary>
    /// Term ending with "-0" should be treated as a homonym suffix.
    /// Zero is a valid digit.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Description("Suffix -0 is treated as valid homonym number")]
    public void GetHomonymGroups_SuffixZero_TreatedAsHomonym()
    {
        var termIds = new List<string> { "term-0" };

        var result = DictionaryService.GetHomonymGroups(termIds);

        Assert.Multiple(() =>
        {
            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result.ContainsKey("term"), Is.True, "Base lemma is 'term' with -0 stripped");
        });
    }

    #endregion

    #region Contract Tests - Return Type Properties

    /// <summary>
    /// Keys in the returned dictionary are base lemmas (suffix stripped).
    /// Values are the original full term IDs (suffix preserved).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Description("Keys are base lemmas, values are full term IDs")]
    public void GetHomonymGroups_ReturnStructure_KeysAreBaseLemmasValuesAreFullIds()
    {
        var termIds = new List<string> { "logos-1", "logos-2", "agape" };

        var result = DictionaryService.GetHomonymGroups(termIds);

        Assert.Multiple(() =>
        {
            // Verify keys are base lemmas (no suffix)
            Assert.That(result.Keys, Does.Contain("logos"));
            Assert.That(result.Keys, Does.Contain("agape"));
            Assert.That(result.Keys, Does.Not.Contain("logos-1"), "Keys must not contain suffixed IDs");
            Assert.That(result.Keys, Does.Not.Contain("logos-2"), "Keys must not contain suffixed IDs");

            // Verify values contain full original term IDs
            Assert.That(result["logos"], Does.Contain("logos-1"), "Values must contain original suffixed IDs");
            Assert.That(result["logos"], Does.Contain("logos-2"), "Values must contain original suffixed IDs");
            Assert.That(result["agape"], Does.Contain("agape"), "Unsuffixed term preserved as-is in values");
        });
    }

    /// <summary>
    /// Every input term ID appears in exactly one group in the output.
    /// No terms are lost and no terms appear in multiple groups.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-023")]
    [Property("BehaviorId", "BHV-600")]
    [Property("ScenarioId", "TS-163")]
    [Description("Every input term appears in exactly one output group")]
    public void GetHomonymGroups_AllInputTerms_AppearInOutput()
    {
        var termIds = new List<string> { "logos-1", "logos-2", "agape", "pistis-1" };

        var result = DictionaryService.GetHomonymGroups(termIds);

        var allOutputTerms = result.Values.SelectMany(v => v).ToList();

        Assert.Multiple(() =>
        {
            foreach (var termId in termIds)
            {
                Assert.That(
                    allOutputTerms,
                    Does.Contain(termId),
                    $"Input term '{termId}' must appear in output"
                );
            }

            Assert.That(
                allOutputTerms.Count,
                Is.EqualTo(termIds.Count),
                "Total output terms must equal total input terms"
            );
        });
    }

    #endregion
}
