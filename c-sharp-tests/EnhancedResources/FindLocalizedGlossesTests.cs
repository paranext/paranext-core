using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources
{
    /// <summary>
    /// Tests for CAP-006: FindLocalizedGlosses NetworkObject function contract.
    /// Verifies gloss lookup through GlossLookupInput/GlossLookupResult records
    /// with language fallback chain (user > English > any), Chinese variant mapping,
    /// and Portuguese variant handling.
    ///
    /// Source: CAP-006, EXT-051, EXT-007, data-contracts.md Section 4.6
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class FindLocalizedGlossesTests : PapiTestBase
    {
        /// <summary>
        /// Creates a MarbleDataAccessService pre-populated with test data.
        /// Reuses MarbleTestHelper for consistent golden master data.
        /// </summary>
        private static MarbleDataAccessService CreateServiceWithTestData()
        {
            var service = new MarbleDataAccessService();
            MarbleTestHelper.InitializeWithTestData(service);
            return service;
        }

        /// <summary>
        /// Creates a MarbleDataAccessService with no data (simulates no packages installed).
        /// </summary>
        private static MarbleDataAccessService CreateServiceWithNoData()
        {
            var service = new MarbleDataAccessService();
            MarbleTestHelper.InitializeWithNoData(service);
            return service;
        }

        /// <summary>
        /// Invokes the FindLocalizedGlosses contract: maps GlossLookupInput to
        /// GlossLookupResult by delegating to MarbleDataAccessService.
        /// This is the function that will be exposed on EnhancedResourceNetworkObject.
        /// </summary>
        private static GlossLookupResult FindLocalizedGlosses(
            MarbleDataAccessService service,
            GlossLookupInput input
        )
        {
            // Delegates to service and wraps result in GlossLookupResult
            return GlossLookupFunction.Execute(service, input);
        }

        #region Acceptance Tests

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-005")]
        [Property("BehaviorId", "BHV-105")]
        [Property("GoldenMasterId", "gm-020")]
        [Description(
            "Acceptance: FindLocalizedGlosses returns glosses in user language via "
                + "GlossLookupInput/GlossLookupResult contract (gm-020)"
        )]
        public void FindLocalizedGlosses_EnglishGlossLookup_ReturnsGlossLookupResultWithCorrectFields()
        {
            // Arrange: Service with test data, input using contract types
            var service = CreateServiceWithTestData();
            var input = new GlossLookupInput(
                TermId: MarbleTestHelper.Elohim,
                PreferredLanguage: "en",
                ResourceId: "SDBH"
            );

            // Act: Call through the contract
            GlossLookupResult result = FindLocalizedGlosses(service, input);

            // Assert: Full contract verification
            // gm-020: glosses=["God"], actualLanguage="en", haveMarbleData=true
            Assert.That(result, Is.Not.Null, "Result should not be null");
            Assert.That(result.HaveMarbleData, Is.True, "Should report marble data available");
            Assert.That(
                result.Glosses,
                Is.Not.Null.And.Not.Empty,
                "Should return glosses for valid term"
            );
            Assert.That(
                result.Glosses[0],
                Is.EqualTo("God"),
                "gm-020: Elohim in English should be 'God'"
            );
            Assert.That(
                result.ActualLanguage,
                Is.EqualTo("en"),
                "Actual language should be 'en' when English is requested and available"
            );
            Assert.That(
                result.AvailableLanguages,
                Is.Not.Null.And.Not.Empty,
                "Should report available gloss languages"
            );
            Assert.That(
                result.AvailableLanguages,
                Does.Contain("en"),
                "English should be in available languages"
            );
        }

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-006")]
        [Property("BehaviorId", "BHV-105")]
        [Property("GoldenMasterId", "gm-021")]
        [Description(
            "Acceptance: FindLocalizedGlosses falls back to English when requested "
                + "language unavailable (gm-021)"
        )]
        public void FindLocalizedGlosses_UnavailableLanguage_FallsBackToEnglishWithCorrectActualLanguage()
        {
            // Arrange
            var service = CreateServiceWithTestData();
            var input = new GlossLookupInput(
                TermId: MarbleTestHelper.Elohim,
                PreferredLanguage: "xx-unavailable",
                ResourceId: "SDBH"
            );

            // Act
            GlossLookupResult result = FindLocalizedGlosses(service, input);

            // Assert: gm-021 fallback behavior
            Assert.That(result.HaveMarbleData, Is.True);
            Assert.That(
                result.Glosses.Count,
                Is.EqualTo(1),
                "gm-021: Should fall back to English and return 1 gloss"
            );
            Assert.That(
                result.Glosses[0],
                Is.EqualTo("God"),
                "gm-021: Fallback should return 'God'"
            );
            // ActualLanguage should reflect the language actually used (English fallback)
            Assert.That(
                result.ActualLanguage,
                Is.EqualTo("en"),
                "ActualLanguage should be 'en' when falling back to English"
            );
        }

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-007")]
        [Property("BehaviorId", "BHV-105")]
        [Property("GoldenMasterId", "gm-022")]
        [Description(
            "Acceptance: FindLocalizedGlosses handles Chinese variant mapping "
                + "zh-Hant -> zh-Hans (gm-022)"
        )]
        public void FindLocalizedGlosses_ChineseTraditional_MapsToSimplifiedAndReturnsChineseGloss()
        {
            // Arrange
            var service = CreateServiceWithTestData();
            var input = new GlossLookupInput(
                TermId: MarbleTestHelper.Elohim,
                PreferredLanguage: "zh-Hant",
                ResourceId: "SDBH"
            );

            // Act
            GlossLookupResult result = FindLocalizedGlosses(service, input);

            // Assert: gm-022 Chinese mapping
            Assert.That(result.HaveMarbleData, Is.True);
            Assert.That(
                result.Glosses.Count,
                Is.EqualTo(1),
                "gm-022: Should return 1 Chinese gloss"
            );
            Assert.That(
                result.Glosses[0],
                Is.EqualTo(MarbleTestHelper.ElohimChineseGloss),
                "gm-022: Chinese mapping should return '\u4E0A\u5E1D\uFF1B\u795E'"
            );
            // ActualLanguage should reflect the mapped Chinese variant
            Assert.That(
                result.ActualLanguage,
                Is.EqualTo("zh-Hans").Or.EqualTo("zh-Hant"),
                "ActualLanguage should be a Chinese variant after mapping"
            );
        }

        #endregion

        #region Contract Tests - Happy Path

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-005")]
        [Property("BehaviorId", "BHV-105")]
        [Description("FindLocalizedGlosses returns non-null GlossLookupResult for valid input")]
        public void FindLocalizedGlosses_ValidInput_ReturnsNonNullResult()
        {
            // Arrange
            var service = CreateServiceWithTestData();
            var input = new GlossLookupInput(
                TermId: "sampleTerm",
                PreferredLanguage: "en",
                ResourceId: "SDBG"
            );

            // Act
            GlossLookupResult result = FindLocalizedGlosses(service, input);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Glosses, Is.Not.Null, "Glosses list should never be null");
            Assert.That(
                result.AvailableLanguages,
                Is.Not.Null,
                "AvailableLanguages should never be null"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-005")]
        [Property("BehaviorId", "BHV-105")]
        [Description("FindLocalizedGlosses AvailableLanguages reflects all loaded gloss languages")]
        public void FindLocalizedGlosses_WithMarbleData_AvailableLanguagesPopulated()
        {
            // Arrange
            var service = CreateServiceWithTestData();
            var input = new GlossLookupInput(
                TermId: "sampleTerm",
                PreferredLanguage: "en",
                ResourceId: "SDBG"
            );

            // Act
            GlossLookupResult result = FindLocalizedGlosses(service, input);

            // Assert: AvailableLanguages reflects the loaded languages
            Assert.That(result.AvailableLanguages, Is.Not.Empty);
            Assert.That(
                result.AvailableLanguages,
                Does.Contain("en"),
                "English should always be in available languages"
            );
            Assert.That(
                result.AvailableLanguages,
                Does.Contain("zh-Hans"),
                "Chinese Simplified should be in available languages from test data"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-005")]
        [Property("BehaviorId", "BHV-105")]
        [Description(
            "FindLocalizedGlosses returns multiple glosses for term with multiple entries"
        )]
        public void FindLocalizedGlosses_TermWithMultipleGlosses_ReturnsAll()
        {
            // Arrange: logos has multiple glosses in test data
            var service = CreateServiceWithTestData();
            var input = new GlossLookupInput(
                TermId: "\u03BB\u03CC\u03B3\u03BF\u03C2", // logos
                PreferredLanguage: "en",
                ResourceId: "SDBG"
            );

            // Act
            GlossLookupResult result = FindLocalizedGlosses(service, input);

            // Assert: logos has 3 English glosses in MarbleTestHelper
            Assert.That(result.Glosses.Count, Is.EqualTo(3));
            Assert.That(result.Glosses, Does.Contain("word"));
            Assert.That(result.Glosses, Does.Contain("speech"));
            Assert.That(result.Glosses, Does.Contain("reason"));
            Assert.That(result.ActualLanguage, Is.EqualTo("en"));
        }

        #endregion

        #region Contract Tests - Language Fallback Chain

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-006")]
        [Property("BehaviorId", "BHV-105")]
        [Description(
            "Fallback chain: requested language > mapped variant > English > any available"
        )]
        public void FindLocalizedGlosses_FallbackChain_TriesRequestedThenMappedThenEnglish()
        {
            // Arrange: Request in a language that doesn't exist, no mapping either
            var service = CreateServiceWithTestData();
            var input = new GlossLookupInput(
                TermId: MarbleTestHelper.Elohim,
                PreferredLanguage: "fr",
                ResourceId: "SDBH"
            );

            // Act: French doesn't exist in test data, no mapping, falls back to English
            GlossLookupResult result = FindLocalizedGlosses(service, input);

            // Assert
            Assert.That(result.Glosses, Is.Not.Empty, "Should find glosses via English fallback");
            Assert.That(
                result.ActualLanguage,
                Is.EqualTo("en"),
                "Should fall back to English when French unavailable"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-007")]
        [Property("BehaviorId", "BHV-105")]
        [Description("Chinese bare 'zh' code also maps to available variant")]
        public void FindLocalizedGlosses_BareChineseCode_MapsToAvailableVariant()
        {
            // Arrange: 'zh' maps to 'zh-Hans' in MarbleTestHelper language mapping
            var service = CreateServiceWithTestData();
            var input = new GlossLookupInput(
                TermId: MarbleTestHelper.Elohim,
                PreferredLanguage: "zh",
                ResourceId: "SDBH"
            );

            // Act
            GlossLookupResult result = FindLocalizedGlosses(service, input);

            // Assert: Should map zh -> zh-Hans and return Chinese gloss
            Assert.That(result.Glosses, Is.Not.Empty);
            Assert.That(
                result.Glosses[0],
                Is.EqualTo(MarbleTestHelper.ElohimChineseGloss),
                "Bare 'zh' should map to available Chinese variant"
            );
        }

        #endregion

        #region Contract Tests - HaveMarbleData False

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-004")]
        [Property("BehaviorId", "BHV-105")]
        [Description(
            "FindLocalizedGlosses returns empty result with haveMarbleData=false when no data"
        )]
        public void FindLocalizedGlosses_NoMarbleData_ReturnsEmptyResultWithHaveMarbleDataFalse()
        {
            // Arrange: Service with no marble data (CAP-006 precondition check)
            var service = CreateServiceWithNoData();
            var input = new GlossLookupInput(
                TermId: "anyTerm",
                PreferredLanguage: "en",
                ResourceId: "SDBH"
            );

            // Act
            GlossLookupResult result = FindLocalizedGlosses(service, input);

            // Assert: Contract says returns empty glosses with haveMarbleData=false
            Assert.That(result, Is.Not.Null, "Should return a result, not null");
            Assert.That(result.HaveMarbleData, Is.False, "Should report no marble data");
            Assert.That(result.Glosses, Is.Empty, "No data means no glosses");
            Assert.That(
                result.AvailableLanguages,
                Is.Empty,
                "No data means no available languages"
            );
            Assert.That(
                result.ActualLanguage,
                Is.Empty.Or.EqualTo(string.Empty),
                "No data means no actual language"
            );
        }

        #endregion

        #region Contract Tests - Unknown Term

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-005")]
        [Property("BehaviorId", "BHV-105")]
        [Description(
            "FindLocalizedGlosses returns empty glosses for unknown term (no error thrown)"
        )]
        public void FindLocalizedGlosses_UnknownTerm_ReturnsEmptyGlossesNoError()
        {
            // Arrange: Term that doesn't exist in test data
            var service = CreateServiceWithTestData();
            var input = new GlossLookupInput(
                TermId: "nonexistent-term-xyz",
                PreferredLanguage: "en",
                ResourceId: "SDBH"
            );

            // Act: Per contract, term not found returns empty glosses (no error)
            GlossLookupResult result = FindLocalizedGlosses(service, input);

            // Assert
            Assert.That(result, Is.Not.Null, "Should return result, not null");
            Assert.That(
                result.HaveMarbleData,
                Is.True,
                "Data is available; just the term wasn't found"
            );
            Assert.That(result.Glosses, Is.Empty, "Unknown term should produce empty glosses");
            Assert.That(
                result.AvailableLanguages,
                Is.Not.Empty,
                "Available languages should still be populated"
            );
        }

        #endregion

        #region Golden Master Tests

        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-005")]
        [Property("BehaviorId", "BHV-105")]
        [Property("GoldenMasterId", "gm-020")]
        [Description(
            "gm-020: FindLocalizedGlosses returns 'God' for Hebrew Elohim in English "
                + "via GlossLookupInput/GlossLookupResult contract"
        )]
        public void GoldenMaster_gm020_ElohimEnglish_ReturnsGod()
        {
            // Arrange: Exact golden master input
            var service = CreateServiceWithTestData();
            var input = new GlossLookupInput(
                TermId: MarbleTestHelper.Elohim, // "אֱלֹהִים"
                PreferredLanguage: "en",
                ResourceId: "SDBH"
            );

            // Act
            GlossLookupResult result = FindLocalizedGlosses(service, input);

            // Assert: Exact golden master expected output
            // gm-020: glossCount=1, glosses=["God"], language="en"
            Assert.That(result.HaveMarbleData, Is.True);
            Assert.That(result.Glosses.Count, Is.EqualTo(1), "gm-020: Expected exactly 1 gloss");
            Assert.That(
                result.Glosses[0],
                Is.EqualTo("God"),
                "gm-020: Elohim in English should be 'God'"
            );
            Assert.That(
                result.ActualLanguage,
                Is.EqualTo("en"),
                "gm-020: Actual language should be 'en'"
            );
        }

        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-006")]
        [Property("BehaviorId", "BHV-105")]
        [Property("GoldenMasterId", "gm-021")]
        [Description(
            "gm-021: FindLocalizedGlosses falls back to English for unavailable language "
                + "via GlossLookupInput/GlossLookupResult contract"
        )]
        public void GoldenMaster_gm021_UnavailableLanguage_FallsBackToEnglish()
        {
            // Arrange: Exact golden master input
            var service = CreateServiceWithTestData();
            var input = new GlossLookupInput(
                TermId: MarbleTestHelper.Elohim, // "אֱלֹהִים"
                PreferredLanguage: "xx-unavailable",
                ResourceId: "SDBH"
            );

            // Act
            GlossLookupResult result = FindLocalizedGlosses(service, input);

            // Assert: Exact golden master expected output
            // gm-021: glossCount=1, glosses=["God"] (English fallback)
            Assert.That(result.HaveMarbleData, Is.True);
            Assert.That(
                result.Glosses.Count,
                Is.EqualTo(1),
                "gm-021: Should fall back to English and return 1 gloss"
            );
            Assert.That(
                result.Glosses[0],
                Is.EqualTo("God"),
                "gm-021: Fallback to English should return 'God'"
            );
            Assert.That(
                result.ActualLanguage,
                Is.EqualTo("en"),
                "gm-021: ActualLanguage should be 'en' after fallback"
            );
        }

        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-007")]
        [Property("BehaviorId", "BHV-105")]
        [Property("GoldenMasterId", "gm-022")]
        [Description(
            "gm-022: FindLocalizedGlosses maps zh-Hant to Chinese gloss data "
                + "via GlossLookupInput/GlossLookupResult contract"
        )]
        public void GoldenMaster_gm022_ChineseTraditional_ReturnsMappedChineseGloss()
        {
            // Arrange: Exact golden master input
            var service = CreateServiceWithTestData();
            var input = new GlossLookupInput(
                TermId: MarbleTestHelper.Elohim, // "אֱלֹהִים"
                PreferredLanguage: "zh-Hant",
                ResourceId: "SDBH"
            );

            // Act
            GlossLookupResult result = FindLocalizedGlosses(service, input);

            // Assert: Exact golden master expected output
            // gm-022: glossCount=1, glosses=["上帝；神"]
            Assert.That(result.HaveMarbleData, Is.True);
            Assert.That(
                result.Glosses.Count,
                Is.EqualTo(1),
                "gm-022: Should return 1 Chinese gloss"
            );
            Assert.That(
                result.Glosses[0],
                Is.EqualTo(MarbleTestHelper.ElohimChineseGloss),
                "gm-022: Chinese mapping should return '\u4E0A\u5E1D\uFF1B\u795E'"
            );
        }

        #endregion
    }
}
