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

/// <summary>
/// Tests for CAP-026: DictionaryDeduplication (TryMerge).
/// Validates that dictionary display items with the same (Term, SourceText, LexicalLinks)
/// tuple are merged into a single display item per INV-015. Status codes are combined
/// via the CombineTermStatusCodes state machine (CAP-008, EXT-051). Occurrence references
/// from merged items are combined.
///
/// This is a pure function that depends only on CombineTermStatusCodes (already implemented).
///
/// PT9 Source: Paratext/Marble/DictionaryTab.cs:796-810 (UpdateDisplayedItem)
/// Golden Master: gm-013-dictionary-deduplication
/// Extraction: EXT-059
/// Invariant: INV-015 (Deduplication Groups by Term + SourceText + LexicalLinks)
/// Contract: data-contracts.md (DictionaryDisplayItem)
///
/// The merge key is the 3-tuple (Term, SourceText, LexicalLinks). When a match is found,
/// the existing item is updated: OccurrenceCount incremented, OccurrenceReferences extended,
/// RenderingStatus combined via CombineTermStatusCodes.
///
/// Input: DictionaryDisplayItem newItem, List&lt;DictionaryDisplayItem&gt; existing
/// Output: bool (true if merged with existing item, false if added as new)
/// </summary>
[TestFixture]
public class DictionaryDeduplicationTests
{
    #region Test Helpers

    /// <summary>
    /// Creates a DictionaryDisplayItem with the specified merge-key fields and defaults for others.
    /// This helper reduces noise in test Arrange sections by only requiring the fields
    /// that matter for deduplication behavior.
    /// </summary>
    private static DictionaryDisplayItem CreateItem(
        string term,
        string sourceText,
        string lexicalLinks,
        TermRenderingStatusCode status = TermRenderingStatusCode.NotDefined,
        int occurrenceCount = 1,
        IReadOnlyList<VerseReference>? occurrenceReferences = null,
        IReadOnlyList<string>? translations = null
    )
    {
        return new DictionaryDisplayItem(
            Id: $"{term}_{sourceText}_{lexicalLinks}",
            Lemma: term,
            Transliteration: "",
            SurfaceForm: sourceText,
            SourceText: sourceText,
            LexicalLinks: lexicalLinks,
            PartOfSpeech: "",
            PartOfSpeechShort: "",
            Gloss: "",
            Translations: translations ?? Array.Empty<string>(),
            Definitions: Array.Empty<DictionarySenseDefinition>(),
            OccurrenceCount: occurrenceCount,
            OccurrenceReferences: occurrenceReferences ?? Array.Empty<VerseReference>(),
            RenderingStatus: status,
            Expanded: false
        );
    }

    #endregion

    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-026.
    /// Verifies all gm-013 golden master scenarios (DD-01 through DD-04) in a single
    /// comprehensive test. When this test passes, the capability is complete.
    ///
    /// Golden master scenarios:
    /// - DD-01: Two tokens with identical (Term, SourceText, LexicalLinks) -> merged into 1
    /// - DD-02: Two tokens with same lemma but different meanings -> separate (different LexicalLinks)
    /// - DD-03: Three tokens merging sequentially -> merged into 1
    /// - DD-04: Token with no lexical link -> not eligible for merge (standalone)
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-026")]
    [Property("GoldenMasterId", "gm-013")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Description(
        "Acceptance test: Dictionary items deduplicated by Term+SourceText+LexicalLinks"
    )]
    public void TryMerge_AllGoldenMasterScenarios_Pass()
    {
        var existing = new List<DictionaryDisplayItem>();

        // DD-01: Two tokens with identical merge key -> merged
        var item1 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            TermRenderingStatusCode.RenderingFound,
            occurrenceReferences: new[] { new VerseReference(43, 1, 1) }
        );
        var item2 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            TermRenderingStatusCode.RenderingMissingInVerse,
            occurrenceReferences: new[] { new VerseReference(43, 1, 14) }
        );

        bool merged1 = DictionaryService.TryMerge(item1, existing);
        bool merged2 = DictionaryService.TryMerge(item2, existing);

        Assert.Multiple(() =>
        {
            // DD-01: First item added as new, second merged
            Assert.That(merged1, Is.False, "DD-01: First item has nothing to merge with");
            Assert.That(merged2, Is.True, "DD-01: Second item with same key must merge");
            Assert.That(
                existing.Count,
                Is.EqualTo(1),
                "DD-01: After merge, only 1 display item"
            );

            // Verify status was combined via CombineTermStatusCodes
            // RenderingFound + RenderingMissingInVerse = SomeRenderingsFound (per gm-002)
            Assert.That(
                existing[0].RenderingStatus,
                Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound),
                "DD-01: Status combined via CombineTermStatusCodes"
            );

            // DD-02: Different LexicalLinks -> separate
            var item3 = CreateItem("logos", "logos", "SDBG:logos:001002");
            bool merged3 = DictionaryService.TryMerge(item3, existing);
            Assert.That(
                merged3,
                Is.False,
                "DD-02: Different LexicalLinks means separate item"
            );
            Assert.That(
                existing.Count,
                Is.EqualTo(2),
                "DD-02: Two separate items after different links"
            );

            // DD-03: Third token with same key as first -> merges again
            var item4 = CreateItem(
                "logos",
                "logos",
                "SDBG:logos:001001",
                TermRenderingStatusCode.GuessedRendingFound,
                occurrenceReferences: new[] { new VerseReference(43, 1, 18) }
            );
            bool merged4 = DictionaryService.TryMerge(item4, existing);
            Assert.That(
                merged4,
                Is.True,
                "DD-03: Third token with same key merges with existing"
            );
            Assert.That(
                existing.Count,
                Is.EqualTo(2),
                "DD-03: Still 2 items (second merge into first group)"
            );

            // DD-04: Token with empty lexical link -> added as standalone
            var item5 = CreateItem("nolink", "nolink", "");
            bool merged5 = DictionaryService.TryMerge(item5, existing);
            Assert.That(
                merged5,
                Is.False,
                "DD-04: Empty link item has unique key, added as new"
            );
            Assert.That(
                existing.Count,
                Is.EqualTo(3),
                "DD-04: 3 items total"
            );
        });
    }

    #endregion

    #region Golden Master Tests - Individual Scenarios

    /// <summary>
    /// DD-01: Two tokens with identical (Term, SourceText, LexicalLinks) are merged
    /// into a single display item. The status codes are combined via CombineTermStatusCodes.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-026")]
    [Property("GoldenMasterId", "gm-013")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Property("GoldenMasterRow", "DD-01")]
    [Description("Two identical items merged into one, status codes combined")]
    public void TryMerge_TwoIdenticalItems_MergedIntoOne()
    {
        // Arrange
        var existing = new List<DictionaryDisplayItem>();
        var item1 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            TermRenderingStatusCode.RenderingFound,
            occurrenceReferences: new[] { new VerseReference(43, 1, 1) }
        );
        var item2 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            TermRenderingStatusCode.RenderingMissingInVerse,
            occurrenceReferences: new[] { new VerseReference(43, 1, 14) }
        );

        // Act
        DictionaryService.TryMerge(item1, existing);
        bool merged = DictionaryService.TryMerge(item2, existing);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(merged, Is.True, "Second item must merge with first");
            Assert.That(existing.Count, Is.EqualTo(1), "Only 1 item after merge");
            Assert.That(
                existing[0].RenderingStatus,
                Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound),
                "RenderingFound + RenderingMissingInVerse = SomeRenderingsFound"
            );
            Assert.That(
                existing[0].OccurrenceCount,
                Is.EqualTo(2),
                "Occurrence count combined"
            );
        });
    }

    /// <summary>
    /// DD-02: Two tokens with same lemma but different meanings (different LexicalLinks)
    /// remain as separate display items.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-026")]
    [Property("GoldenMasterId", "gm-013")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-159")]
    [Property("GoldenMasterRow", "DD-02")]
    [Description("Items with different LexicalLinks remain separate")]
    public void TryMerge_DifferentLexicalLinks_RemainSeparate()
    {
        // Arrange
        var existing = new List<DictionaryDisplayItem>();
        var item1 = CreateItem("logos", "logos", "SDBG:logos:001001");
        var item2 = CreateItem("logos", "logos", "SDBG:logos:001002");

        // Act
        DictionaryService.TryMerge(item1, existing);
        bool merged = DictionaryService.TryMerge(item2, existing);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(merged, Is.False, "Different LexicalLinks = no merge");
            Assert.That(
                existing.Count,
                Is.EqualTo(2),
                "Two separate display items"
            );
        });
    }

    /// <summary>
    /// DD-03: Three tokens with same merge key are merged sequentially into one item.
    /// Status codes are combined at each merge step.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-026")]
    [Property("GoldenMasterId", "gm-013")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Property("GoldenMasterRow", "DD-03")]
    [Description("Three items merged sequentially, status combined twice")]
    public void TryMerge_ThreeItems_MergedSequentially()
    {
        // Arrange
        var existing = new List<DictionaryDisplayItem>();
        var item1 = CreateItem(
            "theos",
            "theos",
            "SDBG:theos:001001",
            TermRenderingStatusCode.RenderingFound,
            occurrenceReferences: new[] { new VerseReference(43, 1, 1) }
        );
        var item2 = CreateItem(
            "theos",
            "theos",
            "SDBG:theos:001001",
            TermRenderingStatusCode.RenderingFound,
            occurrenceReferences: new[] { new VerseReference(43, 1, 2) }
        );
        var item3 = CreateItem(
            "theos",
            "theos",
            "SDBG:theos:001001",
            TermRenderingStatusCode.RenderingMissingInVerse,
            occurrenceReferences: new[] { new VerseReference(43, 1, 3) }
        );

        // Act
        DictionaryService.TryMerge(item1, existing);
        bool merged2 = DictionaryService.TryMerge(item2, existing);
        bool merged3 = DictionaryService.TryMerge(item3, existing);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(merged2, Is.True, "Second item merges");
            Assert.That(merged3, Is.True, "Third item merges");
            Assert.That(existing.Count, Is.EqualTo(1), "All merged into 1");
            Assert.That(
                existing[0].OccurrenceCount,
                Is.EqualTo(3),
                "Three occurrences combined"
            );
            // RenderingFound + RenderingFound = RenderingFound (no change)
            // Then RenderingFound + RenderingMissingInVerse = SomeRenderingsFound
            Assert.That(
                existing[0].RenderingStatus,
                Is.EqualTo(TermRenderingStatusCode.SomeRenderingsFound),
                "Status combined: Found + Found + Missing = SomeRenderingsFound"
            );
        });
    }

    /// <summary>
    /// DD-04: Token with no lexical link is not eligible for deduplication in the sense
    /// that its empty LexicalLinks string becomes part of the merge key. It may still merge
    /// with another item that also has empty LexicalLinks and matching Term/SourceText.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-026")]
    [Property("GoldenMasterId", "gm-013")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Property("GoldenMasterRow", "DD-04")]
    [Description("Item with empty LexicalLinks added as standalone")]
    public void TryMerge_EmptyLexicalLinks_AddedAsStandalone()
    {
        // Arrange
        var existing = new List<DictionaryDisplayItem>();
        var item = CreateItem("nolink", "nolink", "");

        // Act
        bool merged = DictionaryService.TryMerge(item, existing);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(merged, Is.False, "First item with empty links is added as new");
            Assert.That(existing.Count, Is.EqualTo(1), "One item in list");
        });
    }

    #endregion

    #region Contract Tests - Merge Key Components

    /// <summary>
    /// Items with same Term and LexicalLinks but different SourceText are NOT merged.
    /// SourceText is part of the 3-tuple merge key.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-026")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-159")]
    [Property("InvariantId", "INV-015")]
    [Description("Different SourceText prevents merge")]
    public void TryMerge_DifferentSourceText_NotMerged()
    {
        var existing = new List<DictionaryDisplayItem>();
        var item1 = CreateItem("logos", "logon", "SDBG:logos:001001");
        var item2 = CreateItem("logos", "logou", "SDBG:logos:001001");

        DictionaryService.TryMerge(item1, existing);
        bool merged = DictionaryService.TryMerge(item2, existing);

        Assert.Multiple(() =>
        {
            Assert.That(merged, Is.False, "Different SourceText = no merge");
            Assert.That(existing.Count, Is.EqualTo(2), "Two separate items");
        });
    }

    /// <summary>
    /// Items with same SourceText and LexicalLinks but different Term are NOT merged.
    /// Term (lemma) is part of the 3-tuple merge key.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-026")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-159")]
    [Property("InvariantId", "INV-015")]
    [Description("Different Term prevents merge")]
    public void TryMerge_DifferentTerm_NotMerged()
    {
        var existing = new List<DictionaryDisplayItem>();
        var item1 = CreateItem("logos", "logos", "SDBG:logos:001001");
        var item2 = CreateItem("rhema", "logos", "SDBG:logos:001001");

        DictionaryService.TryMerge(item1, existing);
        bool merged = DictionaryService.TryMerge(item2, existing);

        Assert.Multiple(() =>
        {
            Assert.That(merged, Is.False, "Different Term = no merge");
            Assert.That(existing.Count, Is.EqualTo(2), "Two separate items");
        });
    }

    /// <summary>
    /// Items with all three merge key fields identical are merged.
    /// This is the core happy path for INV-015.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-026")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Property("InvariantId", "INV-015")]
    [Description("Matching 3-tuple causes merge")]
    public void TryMerge_AllThreeFieldsMatch_Merged()
    {
        var existing = new List<DictionaryDisplayItem>();
        var item1 = CreateItem("agape", "agape", "SDBG:agape:001001");
        var item2 = CreateItem("agape", "agape", "SDBG:agape:001001");

        DictionaryService.TryMerge(item1, existing);
        bool merged = DictionaryService.TryMerge(item2, existing);

        Assert.Multiple(() =>
        {
            Assert.That(merged, Is.True, "All 3 fields match = merge");
            Assert.That(existing.Count, Is.EqualTo(1), "One merged item");
        });
    }

    #endregion

    #region Contract Tests - Merge Side Effects

    /// <summary>
    /// When items merge, OccurrenceCount is the sum of both items' counts.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-026")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Description("Merged item has combined occurrence count")]
    public void TryMerge_MergedItem_OccurrenceCountCombined()
    {
        var existing = new List<DictionaryDisplayItem>();
        var item1 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            occurrenceCount: 3,
            occurrenceReferences: new[]
            {
                new VerseReference(43, 1, 1),
                new VerseReference(43, 1, 2),
                new VerseReference(43, 1, 3),
            }
        );
        var item2 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            occurrenceCount: 2,
            occurrenceReferences: new[]
            {
                new VerseReference(43, 1, 14),
                new VerseReference(43, 1, 18),
            }
        );

        DictionaryService.TryMerge(item1, existing);
        DictionaryService.TryMerge(item2, existing);

        Assert.That(
            existing[0].OccurrenceCount,
            Is.EqualTo(5),
            "3 + 2 = 5 occurrences"
        );
    }

    /// <summary>
    /// When items merge, OccurrenceReferences from both items are combined.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-026")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Description("Merged item has combined occurrence references")]
    public void TryMerge_MergedItem_OccurrenceReferencesCombined()
    {
        var ref1 = new VerseReference(43, 1, 1);
        var ref2 = new VerseReference(43, 1, 14);

        var existing = new List<DictionaryDisplayItem>();
        var item1 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            occurrenceReferences: new[] { ref1 }
        );
        var item2 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            occurrenceReferences: new[] { ref2 }
        );

        DictionaryService.TryMerge(item1, existing);
        DictionaryService.TryMerge(item2, existing);

        Assert.Multiple(() =>
        {
            Assert.That(
                existing[0].OccurrenceReferences,
                Has.Count.EqualTo(2),
                "Both references combined"
            );
            Assert.That(
                existing[0].OccurrenceReferences,
                Does.Contain(ref1),
                "First reference preserved"
            );
            Assert.That(
                existing[0].OccurrenceReferences,
                Does.Contain(ref2),
                "Second reference preserved"
            );
        });
    }

    /// <summary>
    /// When items merge, RenderingStatus is combined via CombineTermStatusCodes.
    /// This test verifies delegation to the state machine (CAP-008).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-026")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Description("Merged item status combined via CombineTermStatusCodes")]
    public void TryMerge_MergedItem_StatusCombinedViaCombineTermStatusCodes()
    {
        var existing = new List<DictionaryDisplayItem>();

        // RenderingFound + GuessedRendingFound -> current stays Found
        // (per CombineTermStatusCodes: GuessedRendingFound does not override RenderingFound)
        var item1 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            TermRenderingStatusCode.RenderingFound
        );
        var item2 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            TermRenderingStatusCode.GuessedRendingFound
        );

        DictionaryService.TryMerge(item1, existing);
        DictionaryService.TryMerge(item2, existing);

        // Per CombineTermStatusCodes state machine: if current is RenderingFound and new is
        // GuessedRendingFound, neither is NotDefined/Denied/NoVerseText so current stays unchanged.
        Assert.That(
            existing[0].RenderingStatus,
            Is.EqualTo(TermRenderingStatusCode.RenderingFound),
            "CombineTermStatusCodes: RenderingFound is kept when new is Guessed"
        );
    }

    /// <summary>
    /// Verify global override codes propagate through merge.
    /// If second item has NoRenderingsEntered, the merged status should be NoRenderingsEntered.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-026")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Property("InvariantId", "INV-015")]
    [Description("Global override status propagates through merge")]
    public void TryMerge_GlobalOverrideStatus_PropagatesThroughMerge()
    {
        var existing = new List<DictionaryDisplayItem>();
        var item1 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            TermRenderingStatusCode.RenderingFound
        );
        var item2 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            TermRenderingStatusCode.NoRenderingsEntered
        );

        DictionaryService.TryMerge(item1, existing);
        DictionaryService.TryMerge(item2, existing);

        Assert.That(
            existing[0].RenderingStatus,
            Is.EqualTo(TermRenderingStatusCode.NoRenderingsEntered),
            "Global override NoRenderingsEntered replaces RenderingFound"
        );
    }

    #endregion

    #region Contract Tests - Return Value

    /// <summary>
    /// TryMerge returns false when the item is added as a new entry (no match found).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-026")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-159")]
    [Description("Returns false when item added as new")]
    public void TryMerge_NoMatchInExisting_ReturnsFalse()
    {
        var existing = new List<DictionaryDisplayItem>();
        var item = CreateItem("logos", "logos", "SDBG:logos:001001");

        bool result = DictionaryService.TryMerge(item, existing);

        Assert.That(result, Is.False, "First item always returns false (no merge target)");
    }

    /// <summary>
    /// TryMerge returns true when the item is merged with an existing entry.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-026")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Description("Returns true when item merged with existing")]
    public void TryMerge_MatchInExisting_ReturnsTrue()
    {
        var existing = new List<DictionaryDisplayItem>();
        var item1 = CreateItem("logos", "logos", "SDBG:logos:001001");
        var item2 = CreateItem("logos", "logos", "SDBG:logos:001001");

        DictionaryService.TryMerge(item1, existing);
        bool result = DictionaryService.TryMerge(item2, existing);

        Assert.That(result, Is.True, "Matching item returns true");
    }

    /// <summary>
    /// When TryMerge returns false, the new item is added to the existing list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-026")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-159")]
    [Description("Non-merged item added to existing list")]
    public void TryMerge_NoMatch_ItemAddedToList()
    {
        var existing = new List<DictionaryDisplayItem>();
        var item = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            TermRenderingStatusCode.RenderingFound
        );

        DictionaryService.TryMerge(item, existing);

        Assert.Multiple(() =>
        {
            Assert.That(existing.Count, Is.EqualTo(1), "Item added to list");
            Assert.That(existing[0].Lemma, Is.EqualTo("logos"), "Correct item in list");
        });
    }

    #endregion

    #region Contract Tests - Empty Existing List

    /// <summary>
    /// TryMerge with empty existing list always adds the item and returns false.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-026")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Description("Empty list always adds item")]
    public void TryMerge_EmptyList_AddsItemReturnsFalse()
    {
        var existing = new List<DictionaryDisplayItem>();
        var item = CreateItem("agape", "agape", "SDBG:agape:001001");

        bool result = DictionaryService.TryMerge(item, existing);

        Assert.Multiple(() =>
        {
            Assert.That(result, Is.False, "No merge target in empty list");
            Assert.That(existing.Count, Is.EqualTo(1), "Item added");
        });
    }

    #endregion

    #region Invariant Tests - INV-015

    /// <summary>
    /// INV-015: Merge(a, b) iff a.Term == b.Term AND a.SourceText == b.SourceText
    /// AND a.LexicalLinks == b.LexicalLinks.
    /// This test systematically varies one field at a time to prove the invariant.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-026")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Property("InvariantId", "INV-015")]
    [Description("INV-015: Merge key is exactly (Term, SourceText, LexicalLinks)")]
    public void TryMerge_Invariant015_MergeKeyIsExactlyThreeFields()
    {
        // Baseline: all three match -> merge
        var baselineExisting = new List<DictionaryDisplayItem>();
        var baseline1 = CreateItem("term", "source", "links");
        var baseline2 = CreateItem("term", "source", "links");
        DictionaryService.TryMerge(baseline1, baselineExisting);
        bool baselineMerged = DictionaryService.TryMerge(baseline2, baselineExisting);

        // Vary Term only -> no merge
        var varyTermExisting = new List<DictionaryDisplayItem>();
        var varyTerm1 = CreateItem("termA", "source", "links");
        var varyTerm2 = CreateItem("termB", "source", "links");
        DictionaryService.TryMerge(varyTerm1, varyTermExisting);
        bool varyTermMerged = DictionaryService.TryMerge(varyTerm2, varyTermExisting);

        // Vary SourceText only -> no merge
        var varySourceExisting = new List<DictionaryDisplayItem>();
        var varySource1 = CreateItem("term", "sourceA", "links");
        var varySource2 = CreateItem("term", "sourceB", "links");
        DictionaryService.TryMerge(varySource1, varySourceExisting);
        bool varySourceMerged = DictionaryService.TryMerge(varySource2, varySourceExisting);

        // Vary LexicalLinks only -> no merge
        var varyLinksExisting = new List<DictionaryDisplayItem>();
        var varyLinks1 = CreateItem("term", "source", "linksA");
        var varyLinks2 = CreateItem("term", "source", "linksB");
        DictionaryService.TryMerge(varyLinks1, varyLinksExisting);
        bool varyLinksMerged = DictionaryService.TryMerge(varyLinks2, varyLinksExisting);

        Assert.Multiple(() =>
        {
            Assert.That(
                baselineMerged,
                Is.True,
                "INV-015: All three fields match -> must merge"
            );
            Assert.That(
                baselineExisting.Count,
                Is.EqualTo(1),
                "INV-015: Merged items produce 1 result"
            );

            Assert.That(
                varyTermMerged,
                Is.False,
                "INV-015: Different Term -> must NOT merge"
            );
            Assert.That(
                varyTermExisting.Count,
                Is.EqualTo(2),
                "INV-015: Different Term -> 2 separate items"
            );

            Assert.That(
                varySourceMerged,
                Is.False,
                "INV-015: Different SourceText -> must NOT merge"
            );
            Assert.That(
                varySourceExisting.Count,
                Is.EqualTo(2),
                "INV-015: Different SourceText -> 2 separate items"
            );

            Assert.That(
                varyLinksMerged,
                Is.False,
                "INV-015: Different LexicalLinks -> must NOT merge"
            );
            Assert.That(
                varyLinksExisting.Count,
                Is.EqualTo(2),
                "INV-015: Different LexicalLinks -> 2 separate items"
            );
        });
    }

    /// <summary>
    /// INV-015: Status codes merged via CombineTermStatusCodes state machine.
    /// Verify that TryMerge delegates to CombineTermStatusCodes for every merge.
    /// Uses the NotDefined initial state to verify the first merge takes the new status.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-026")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Property("InvariantId", "INV-015")]
    [Description(
        "INV-015: Status combination uses CombineTermStatusCodes for each merge"
    )]
    public void TryMerge_Invariant015_StatusMergeUsesCombineTermStatusCodes()
    {
        var existing = new List<DictionaryDisplayItem>();

        // NotDefined + RenderingFound -> RenderingFound (per CombineTermStatusCodes)
        var item1 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            TermRenderingStatusCode.NotDefined
        );
        var item2 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            TermRenderingStatusCode.RenderingFound
        );

        DictionaryService.TryMerge(item1, existing);
        DictionaryService.TryMerge(item2, existing);

        Assert.That(
            existing[0].RenderingStatus,
            Is.EqualTo(TermRenderingStatusCode.RenderingFound),
            "NotDefined + RenderingFound -> RenderingFound (per CombineTermStatusCodes)"
        );
    }

    #endregion

    #region Edge Case Tests

    /// <summary>
    /// Items merge in document order: first match in existing list is the merge target.
    /// The O(n^2) linear scan finds the first matching item.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-026")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Description("Merge finds first matching item in existing list")]
    public void TryMerge_MultipleExisting_MergesWithFirstMatch()
    {
        var existing = new List<DictionaryDisplayItem>();

        // Add two different items, then add a third that matches the first
        var item1 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            TermRenderingStatusCode.RenderingFound
        );
        var item2 = CreateItem("rhema", "rhema", "SDBG:rhema:001001");
        var item3 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            TermRenderingStatusCode.RenderingMissingInVerse
        );

        DictionaryService.TryMerge(item1, existing);
        DictionaryService.TryMerge(item2, existing);
        bool merged = DictionaryService.TryMerge(item3, existing);

        Assert.Multiple(() =>
        {
            Assert.That(merged, Is.True, "Third item merges with first");
            Assert.That(existing.Count, Is.EqualTo(2), "Still 2 items (logos merged, rhema separate)");
            Assert.That(
                existing[0].OccurrenceCount,
                Is.EqualTo(2),
                "First item (logos) received the merge"
            );
        });
    }

    /// <summary>
    /// Case sensitivity: merge key comparison should be exact (case-sensitive).
    /// "Logos" and "logos" are different terms.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-026")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-159")]
    [Description("Merge key comparison is case-sensitive")]
    public void TryMerge_DifferentCase_NotMerged()
    {
        var existing = new List<DictionaryDisplayItem>();
        var item1 = CreateItem("logos", "logos", "SDBG:logos:001001");
        var item2 = CreateItem("Logos", "logos", "SDBG:logos:001001");

        DictionaryService.TryMerge(item1, existing);
        bool merged = DictionaryService.TryMerge(item2, existing);

        Assert.Multiple(() =>
        {
            Assert.That(merged, Is.False, "Case-sensitive: 'logos' != 'Logos'");
            Assert.That(existing.Count, Is.EqualTo(2), "Two separate items");
        });
    }

    /// <summary>
    /// When merging with translations, the translations from the new item should be preserved
    /// or combined (behavior depends on implementation -- test verifies some content is there).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-026")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Description("Merged item preserves core fields from original")]
    public void TryMerge_MergedItem_PreservesOriginalCoreFields()
    {
        var existing = new List<DictionaryDisplayItem>();
        var item1 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            TermRenderingStatusCode.RenderingFound,
            translations: new[] { "word", "message" }
        );
        var item2 = CreateItem(
            "logos",
            "logos",
            "SDBG:logos:001001",
            TermRenderingStatusCode.RenderingMissingInVerse
        );

        DictionaryService.TryMerge(item1, existing);
        DictionaryService.TryMerge(item2, existing);

        Assert.Multiple(() =>
        {
            // The merged item should preserve the original's identity fields
            Assert.That(existing[0].Lemma, Is.EqualTo("logos"), "Lemma preserved");
            Assert.That(existing[0].SourceText, Is.EqualTo("logos"), "SourceText preserved");
            Assert.That(
                existing[0].LexicalLinks,
                Is.EqualTo("SDBG:logos:001001"),
                "LexicalLinks preserved"
            );
        });
    }

    /// <summary>
    /// Multiple distinct items interleaved with merging items: verify correct counting.
    /// Simulates a realistic scenario with mixed terms in a chapter scope.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-026")]
    [Property("BehaviorId", "BHV-413")]
    [Property("ScenarioId", "TS-158")]
    [Description("Realistic mixed input: some merge, some stay separate")]
    public void TryMerge_MixedInput_CorrectMergeAndSeparation()
    {
        var existing = new List<DictionaryDisplayItem>();

        // Add 5 items: A, B, A, C, A -> should result in 3 items (A:3, B:1, C:1)
        var itemA1 = CreateItem("logos", "logos", "SDBG:logos:001001");
        var itemB = CreateItem("theos", "theos", "SDBG:theos:001001");
        var itemA2 = CreateItem("logos", "logos", "SDBG:logos:001001");
        var itemC = CreateItem("agape", "agape", "SDBG:agape:001001");
        var itemA3 = CreateItem("logos", "logos", "SDBG:logos:001001");

        DictionaryService.TryMerge(itemA1, existing);
        DictionaryService.TryMerge(itemB, existing);
        DictionaryService.TryMerge(itemA2, existing);
        DictionaryService.TryMerge(itemC, existing);
        DictionaryService.TryMerge(itemA3, existing);

        Assert.Multiple(() =>
        {
            Assert.That(existing.Count, Is.EqualTo(3), "3 distinct items: logos, theos, agape");
            Assert.That(
                existing[0].OccurrenceCount,
                Is.EqualTo(3),
                "logos merged 3 times"
            );
            Assert.That(
                existing[1].OccurrenceCount,
                Is.EqualTo(1),
                "theos: 1 occurrence"
            );
            Assert.That(
                existing[2].OccurrenceCount,
                Is.EqualTo(1),
                "agape: 1 occurrence"
            );
        });
    }

    #endregion
}
