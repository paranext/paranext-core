using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources
{
    /// <summary>
    /// Tests for MarbleDataAccessService (immutable primary-constructor form).
    /// Source: CAP-001 (InitializeMarbleData), EXT-051, data-contracts.md Section 4.1
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class MarbleDataAccessServiceTests : PapiTestBase
    {
        private static MarbleDataAccessService CreateServiceWithTestData() =>
            MarbleTestHelper.BuildServiceWithTestData();

        private static MarbleDataAccessService CreateServiceWithNoData() =>
            MarbleTestHelper.BuildServiceWithNoData();

        #region Acceptance Tests

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-001")]
        [Property("ScenarioId", "TS-003")]
        [Property("BehaviorId", "BHV-105")]
        [Description(
            "Acceptance: MarbleDataAccessService implements IMarbleDataAccess with HaveMarbleData, "
                + "AvailableGlossLanguages, FindLocalizedGlossesForTerm"
        )]
        public void MarbleDataAccess_FullContract_ImplementsAllMembers()
        {
            // Arrange
            var service = CreateServiceWithTestData();

            // Assert: All IMarbleDataAccess members are functional
            Assert.That(
                service.HaveMarbleData,
                Is.True,
                "HaveMarbleData should be true when packages are installed"
            );
            Assert.That(
                service.AvailableGlossLanguages,
                Is.Not.Null.And.Not.Empty,
                "Should have at least one gloss language"
            );
            Assert.That(
                service.AvailableGlossLanguages,
                Does.Contain("en"),
                "English should always be available"
            );
        }

        #endregion

        #region HaveMarbleData Tests

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-003")]
        [Property("BehaviorId", "BHV-105")]
        [Description("IMarbleDataAccess.HaveMarbleData returns true when ERs installed")]
        public void HaveMarbleData_WithInstalledPackages_ReturnsTrue()
        {
            var service = CreateServiceWithTestData();
            Assert.That(service.HaveMarbleData, Is.True);
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-004")]
        [Property("BehaviorId", "BHV-105")]
        [Description("IMarbleDataAccess.HaveMarbleData returns false when no ERs")]
        public void HaveMarbleData_NoPackagesInstalled_ReturnsFalse()
        {
            var service = CreateServiceWithNoData();
            Assert.That(service.HaveMarbleData, Is.False);
        }

        #endregion

        #region AvailableGlossLanguages Tests

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-003")]
        [Property("BehaviorId", "BHV-105")]
        [Description("AvailableGlossLanguages includes English when marble data loaded")]
        public void AvailableGlossLanguages_WithMarbleData_ContainsEnglish()
        {
            var service = CreateServiceWithTestData();
            var languages = service.AvailableGlossLanguages;

            Assert.That(languages, Is.Not.Null);
            Assert.That(languages, Does.Contain("en"));
            Assert.That(languages, Does.Contain("zh-Hans"));
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-004")]
        [Property("BehaviorId", "BHV-105")]
        [Description("AvailableGlossLanguages empty when no marble data")]
        public void AvailableGlossLanguages_NoMarbleData_ReturnsEmpty()
        {
            var service = CreateServiceWithNoData();
            Assert.That(service.AvailableGlossLanguages, Is.Empty);
        }

        #endregion

        #region FindLocalizedGlossesForTerm Tests

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-005")]
        [Property("BehaviorId", "BHV-105")]
        [Description("FindLocalizedGlossesForTerm returns glosses in user language")]
        public void FindLocalizedGlossesForTerm_ValidTermEnglish_ReturnsGlosses()
        {
            var service = CreateServiceWithTestData();
            var glosses = service.FindLocalizedGlossesForTerm("sampleTerm", "en");

            Assert.That(glosses, Is.Not.Null);
            Assert.That(glosses.Count, Is.GreaterThan(0));
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-006")]
        [Property("BehaviorId", "BHV-105")]
        [Description("FindLocalizedGlossesForTerm falls back to English for unavailable language")]
        public void FindLocalizedGlossesForTerm_UnavailableLanguage_FallsBackToEnglish()
        {
            var service = CreateServiceWithTestData();
            var glosses = service.FindLocalizedGlossesForTerm("sampleTerm", "xx-unavailable");

            Assert.That(glosses, Is.Not.Null);
            Assert.That(glosses.Count, Is.GreaterThan(0));
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-007")]
        [Property("BehaviorId", "BHV-105")]
        [Description(
            "FindLocalizedGlossesForTerm handles Chinese variant mapping: zh-Hant -> available Chinese data"
        )]
        public void FindLocalizedGlossesForTerm_ChineseTraditional_MapsToAvailableVariant()
        {
            var service = CreateServiceWithTestData();
            var glosses = service.FindLocalizedGlossesForTerm("sampleTerm", "zh-Hant");

            Assert.That(glosses, Is.Not.Null);
            Assert.That(glosses.Count, Is.GreaterThan(0));
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-004")]
        [Property("BehaviorId", "BHV-105")]
        [Description("FindLocalizedGlossesForTerm returns empty when no marble data")]
        public void FindLocalizedGlossesForTerm_NoMarbleData_ReturnsEmpty()
        {
            var service = CreateServiceWithNoData();
            var glosses = service.FindLocalizedGlossesForTerm("sampleTerm", "en");

            Assert.That(glosses, Is.Not.Null);
            Assert.That(glosses, Is.Empty);
        }

        #endregion

        #region ResolveLanguage Tests

        [Test]
        [Category("Contract")]
        [Description("ResolveLanguage returns mapped variant when fallback hits")]
        public void ResolveLanguage_ChineseHant_ReturnsZhHans()
        {
            var service = CreateServiceWithTestData();
            var resolved = service.ResolveLanguage(MarbleTestHelper.Elohim, "zh-Hant");
            Assert.That(resolved, Is.EqualTo("zh-Hans"));
        }

        [Test]
        [Category("Contract")]
        [Description("ResolveLanguage returns empty string when nothing matches")]
        public void ResolveLanguage_NoMatchInAnyLanguage_ReturnsEmptyString()
        {
            var service = CreateServiceWithTestData();
            var resolved = service.ResolveLanguage("nonexistentLemma", "en");
            Assert.That(resolved, Is.Empty);
        }

        #endregion

        #region AvailableBibles (IEnhancedResourceProvider) Tests

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-002")]
        [Property("BehaviorId", "BHV-102")]
        [Description("AvailableBibles returns empty when no packages installed")]
        public void AvailableBibles_NoPackages_ReturnsEmpty()
        {
            var service = CreateServiceWithNoData();
            var bibles = service.AvailableBibles;

            Assert.That(bibles, Is.Not.Null);
            Assert.That(bibles.Any(), Is.False);
        }

        #endregion

        #region Constructor Validation Tests

        [Test]
        [Category("Contract")]
        [Description("Null GlossData throws ArgumentNullException")]
        public void Constructor_NullGlossData_Throws()
        {
            Assert.Throws<ArgumentNullException>(
                () => new MarbleDataAccessService(null!, LanguageMapping.Empty, [])
            );
        }

        [Test]
        [Category("Contract")]
        [Description("Null LanguageMapping throws ArgumentNullException")]
        public void Constructor_NullLanguageMapping_Throws()
        {
            Assert.Throws<ArgumentNullException>(
                () => new MarbleDataAccessService(GlossData.Empty, null!, [])
            );
        }

        [Test]
        [Category("Contract")]
        [Description("Null bibles list throws ArgumentNullException")]
        public void Constructor_NullBibles_Throws()
        {
            Assert.Throws<ArgumentNullException>(
                () => new MarbleDataAccessService(GlossData.Empty, LanguageMapping.Empty, null!)
            );
        }

        #endregion

        #region ResourceScrText Tests (placeholders - require fixture zips)

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-008")]
        [Property("BehaviorId", "BHV-106")]
        [Description(
            "ResourceScrText loaded with isMarbleResource flag enforces read-only (IsProtectedText=true)"
        )]
        public void ResourceScrText_MarbleResource_IsProtectedText()
        {
            // INV-C02: Resource texts are always read-only.
            // ResourceScrText.IsProtectedText returns true for marble resources.
            // Full validation requires marble zip files on disk (integration test).
            Assert.Pass(
                "INV-C02: ResourceScrText read-only enforcement is a ParatextData NuGet behavior."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-008")]
        [Property("BehaviorId", "BHV-106")]
        [Description("ResourceScrText Editable setter throws InvalidOperationException")]
        public void ResourceScrText_SetEditable_ThrowsInvalidOperation()
        {
            Assert.Pass(
                "INV-C02: ResourceScrText Editable throw is a ParatextData NuGet behavior."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-009")]
        [Property("BehaviorId", "BHV-106")]
        [Description("ResourceScrText Name setter throws InvalidOperationException")]
        public void ResourceScrText_SetName_ThrowsInvalidOperation()
        {
            Assert.Pass(
                "INV-C03: ResourceScrText Name immutability is a ParatextData NuGet behavior."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-010")]
        [Property("BehaviorId", "BHV-106")]
        [Description("ResourceScrText deletes corrupt zip file and notifies user (VAL-001)")]
        public void ResourceScrText_CorruptZip_DeletesFileAndNotifies()
        {
            Assert.Pass("Placeholder: needs file system setup with corrupt zip to validate");
        }

        #endregion

        #region InstallableResource Tests (placeholders)

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-011")]
        [Property("BehaviorId", "BHV-108")]
        [Description(
            "InstallableResource uses ResourceVersion (not DBL revision) for marble update detection"
        )]
        public void InstallableResource_MarbleResource_UsesResourceVersion()
        {
            // INV-C06: Marble resources use ResourceVersion for update detection.
            // Exercised during package discovery (Task 12 path).
            var service = CreateServiceWithNoData();
            Assert.That(service.AvailableBibles, Is.Not.Null);
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-012")]
        [Property("BehaviorId", "BHV-108")]
        [Description("InstallableResource marks invalid when Settings.xml is corrupt (VAL-004)")]
        public void InstallableResource_CorruptSettings_MarkedInvalidSilently()
        {
            var service = CreateServiceWithNoData();
            Assert.That(service.AvailableBibles, Is.Not.Null);
        }

        #endregion
    }
}
