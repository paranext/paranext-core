using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources
{
    /// <summary>
    /// Golden master tests for CAP-001 gloss localization behavior.
    /// Verifies FindLocalizedGlossesForTerm matches PT9 captured outputs exactly.
    ///
    /// Source: gm-020, gm-021, gm-022
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class EnhancedResourceGoldenMasterTests : PapiTestBase
    {
        #region gm-020: Gloss Localization (English)

        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-001")]
        [Property("ScenarioId", "TS-005")]
        [Property("BehaviorId", "BHV-105")]
        [Property("GoldenMasterId", "gm-020")]
        [Description(
            "gm-020: FindLocalizedGlossesForTerm returns 'God' for Hebrew Elohim in English"
        )]
        public void FindLocalizedGlosses_HebrewElohimEnglish_ReturnsGod()
        {
            // Arrange: Build marble data access with test data
            var service = MarbleTestHelper.BuildServiceWithTestData();

            // Golden master input:
            //   termLemma: "אֱלֹהִים" (Elohim)
            //   language: "en"
            string termLemma = "\u05D0\u05B1\u05DC\u05B9\u05D4\u05B4\u05D9\u05DD"; // אֱלֹהִים
            string language = "en";

            // Act
            var glosses = service.FindLocalizedGlossesForTerm(termLemma, language);

            // Assert: Golden master expected output
            //   glossCount: 1
            //   glosses: ["God"]
            Assert.That(glosses, Is.Not.Null);
            Assert.That(glosses.Count, Is.EqualTo(1), "gm-020: Expected exactly 1 gloss");
            Assert.That(glosses[0], Is.EqualTo("God"), "gm-020: Elohim in English should be 'God'");
        }

        #endregion

        #region gm-021: Gloss Language Fallback

        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-001")]
        [Property("ScenarioId", "TS-006")]
        [Property("BehaviorId", "BHV-105")]
        [Property("GoldenMasterId", "gm-021")]
        [Description(
            "gm-021: FindLocalizedGlossesForTerm falls back to English for unavailable language"
        )]
        public void FindLocalizedGlosses_UnavailableLanguage_FallsBackToEnglishGod()
        {
            // Arrange
            var service = MarbleTestHelper.BuildServiceWithTestData();

            // Golden master input:
            //   termLemma: "אֱלֹהִים" (Elohim)
            //   language: "xx-unavailable"
            string termLemma = "\u05D0\u05B1\u05DC\u05B9\u05D4\u05B4\u05D9\u05DD"; // אֱלֹהִים
            string language = "xx-unavailable";

            // Act
            var glosses = service.FindLocalizedGlossesForTerm(termLemma, language);

            // Assert: Golden master expected output - falls back to English
            //   glossCount: 1
            //   glosses: ["God"]
            Assert.That(glosses, Is.Not.Null);
            Assert.That(
                glosses.Count,
                Is.EqualTo(1),
                "gm-021: Should fall back to English and return 1 gloss"
            );
            Assert.That(
                glosses[0],
                Is.EqualTo("God"),
                "gm-021: Fallback to English should return 'God'"
            );
        }

        #endregion

        #region gm-022: Chinese Mapping

        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-001")]
        [Property("ScenarioId", "TS-007")]
        [Property("BehaviorId", "BHV-105")]
        [Property("GoldenMasterId", "gm-022")]
        [Description("gm-022: FindLocalizedGlossesForTerm maps zh-Hant to Chinese gloss data")]
        public void FindLocalizedGlosses_ChineseTraditional_ReturnsMappedChineseGloss()
        {
            // Arrange
            var service = MarbleTestHelper.BuildServiceWithTestData();

            // Golden master input:
            //   termLemma: "אֱלֹהִים" (Elohim)
            //   language: "zh-Hant"
            string termLemma = "\u05D0\u05B1\u05DC\u05B9\u05D4\u05B4\u05D9\u05DD"; // אֱלֹהִי��
            string language = "zh-Hant";

            // Act
            var glosses = service.FindLocalizedGlossesForTerm(termLemma, language);

            // Assert: Golden master expected output
            //   glossCount: 1
            //   glosses: ["上帝；神"]
            Assert.That(glosses, Is.Not.Null);
            Assert.That(glosses.Count, Is.EqualTo(1), "gm-022: Should return 1 Chinese gloss");
            Assert.That(
                glosses[0],
                Is.EqualTo("\u4E0A\u5E1D\uFF1B\u795E"), // 上帝；神
                "gm-022: Chinese mapping should return '上帝；神'"
            );
        }

        #endregion
    }
}
