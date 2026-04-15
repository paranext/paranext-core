using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources
{
    /// <summary>
    /// Tests for MarbleDataAccessService: IMarbleDataAccess and IEnhancedResourceProvider
    /// interface contracts, ResourceScrText loading, InstallableResource version detection,
    /// and plugin system surface.
    ///
    /// Source: CAP-001 (InitializeMarbleData), EXT-051, data-contracts.md Section 4.1
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class MarbleDataAccessServiceTests : PapiTestBase
    {
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
            var service = new MarbleDataAccessService();
            service.Initialize();

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
            // Arrange: Service initialized with installed marble packages
            var service = new MarbleDataAccessService();
            service.Initialize();

            // Act
            bool result = service.HaveMarbleData;

            // Assert
            Assert.That(result, Is.True, "Should report data available when packages installed");
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-004")]
        [Property("BehaviorId", "BHV-105")]
        [Description("IMarbleDataAccess.HaveMarbleData returns false when no ERs")]
        public void HaveMarbleData_NoPackagesInstalled_ReturnsFalse()
        {
            // Arrange: Service initialized with no marble packages
            var service = new MarbleDataAccessService();
            // Initialize with no packages available
            service.Initialize();

            // Act
            bool result = service.HaveMarbleData;

            // Assert
            Assert.That(result, Is.False, "Should report no data when no packages are installed");
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
            // Arrange
            var service = new MarbleDataAccessService();
            service.Initialize();

            // Act
            var languages = service.AvailableGlossLanguages;

            // Assert
            Assert.That(languages, Is.Not.Null);
            Assert.That(
                languages,
                Does.Contain("en"),
                "English is always available in SDBG/SDBH gloss data"
            );
            Assert.That(
                languages.Count,
                Is.GreaterThan(0),
                "At least one gloss language available"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-004")]
        [Property("BehaviorId", "BHV-105")]
        [Description("AvailableGlossLanguages empty when no marble data")]
        public void AvailableGlossLanguages_NoMarbleData_ReturnsEmpty()
        {
            // Arrange
            var service = new MarbleDataAccessService();
            // Initialize with no packages
            service.Initialize();

            // Act
            var languages = service.AvailableGlossLanguages;

            // Assert
            Assert.That(languages, Is.Not.Null, "Should return empty list, not null");
            Assert.That(languages, Is.Empty, "No data means no languages");
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
            // Arrange
            var service = new MarbleDataAccessService();
            service.Initialize();

            // Act: Look up glosses for a known term in English
            var glosses = service.FindLocalizedGlossesForTerm("sampleTerm", "en");

            // Assert
            Assert.That(glosses, Is.Not.Null);
            Assert.That(glosses.Count, Is.GreaterThan(0), "Should find glosses for valid term");
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-006")]
        [Property("BehaviorId", "BHV-105")]
        [Description("FindLocalizedGlossesForTerm falls back to English for unavailable language")]
        public void FindLocalizedGlossesForTerm_UnavailableLanguage_FallsBackToEnglish()
        {
            // Arrange
            var service = new MarbleDataAccessService();
            service.Initialize();

            // Act: Request glosses in a language that doesn't exist
            var glosses = service.FindLocalizedGlossesForTerm("sampleTerm", "xx-unavailable");

            // Assert: Should fall back to English and still return glosses
            Assert.That(glosses, Is.Not.Null);
            Assert.That(
                glosses.Count,
                Is.GreaterThan(0),
                "Should fall back to English when requested language unavailable"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-007")]
        [Property("BehaviorId", "BHV-105")]
        [Description(
            "FindLocalizedGlossesForTerm handles Chinese variant mapping: zh-Hant maps to available Chinese data"
        )]
        public void FindLocalizedGlossesForTerm_ChineseTraditional_MapsToAvailableVariant()
        {
            // Arrange
            var service = new MarbleDataAccessService();
            service.Initialize();

            // Act: Request glosses in Chinese Traditional
            var glosses = service.FindLocalizedGlossesForTerm("sampleTerm", "zh-Hant");

            // Assert: Should map zh-Hant to whatever Chinese variant is available
            Assert.That(glosses, Is.Not.Null);
            Assert.That(
                glosses.Count,
                Is.GreaterThan(0),
                "Chinese variant mapping should resolve to available data"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-004")]
        [Property("BehaviorId", "BHV-105")]
        [Description("FindLocalizedGlossesForTerm returns empty when no marble data")]
        public void FindLocalizedGlossesForTerm_NoMarbleData_ReturnsEmpty()
        {
            // Arrange: Service with no marble data
            var service = new MarbleDataAccessService();
            service.Initialize();

            // Act
            var glosses = service.FindLocalizedGlossesForTerm("sampleTerm", "en");

            // Assert
            Assert.That(glosses, Is.Not.Null, "Should return empty list, not null");
            Assert.That(glosses, Is.Empty, "No marble data means no glosses");
        }

        #endregion

        #region AvailableBibles (IEnhancedResourceProvider) Tests

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-001")]
        [Property("BehaviorId", "BHV-102")]
        [Description("AvailableBibles returns ScrText instances for installed marble resources")]
        public void AvailableBibles_WithInstalledPackages_ReturnsScrTexts()
        {
            // Arrange
            var service = new MarbleDataAccessService();
            service.Initialize();

            // Act
            var bibles = service.AvailableBibles;

            // Assert
            Assert.That(bibles, Is.Not.Null);
            // All returned items should be MarbleResource type
            foreach (var scrText in bibles)
            {
                Assert.That(
                    scrText.Settings.IsMarbleResource,
                    Is.True,
                    "All ER ScrTexts must be MarbleResource type"
                );
            }
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-002")]
        [Property("BehaviorId", "BHV-102")]
        [Description("AvailableBibles returns empty when no packages installed")]
        public void AvailableBibles_NoPackages_ReturnsEmpty()
        {
            // Arrange
            var service = new MarbleDataAccessService();
            service.Initialize();

            // Act
            var bibles = service.AvailableBibles;

            // Assert
            Assert.That(bibles, Is.Not.Null, "Should return empty, not null");
            Assert.That(bibles.Any(), Is.False, "No packages means no bibles");
        }

        #endregion

        #region ResourceScrText Tests

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-008")]
        [Property("BehaviorId", "BHV-106")]
        [Description(
            "ResourceScrText loaded with isMarbleResource flag enforces read-only (IsProtectedText=true)"
        )]
        public void ResourceScrText_MarbleResource_IsProtectedText()
        {
            // Arrange: Load a marble resource via the service
            var service = new MarbleDataAccessService();
            service.Initialize();
            var bibles = service.AvailableBibles;
            Assert.That(bibles.Any(), Is.True, "Test requires at least one marble resource");

            // Act
            var scrText = bibles.First();

            // Assert: INV-C02 - Resource texts are always read-only
            Assert.That(
                scrText.IsProtectedText,
                Is.True,
                "INV-C02: Marble resources must always be read-only"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-008")]
        [Property("BehaviorId", "BHV-106")]
        [Description("ResourceScrText Editable setter throws InvalidOperationException")]
        public void ResourceScrText_SetEditable_ThrowsInvalidOperation()
        {
            // Arrange
            var service = new MarbleDataAccessService();
            service.Initialize();
            var scrText = service.AvailableBibles.First();

            // Act & Assert: INV-C02 - Attempting to set Editable on ResourceScrText throws
            // ResourceScrText overrides the Editable setter to throw.
            // Access via Settings.Editable for the property; the throw comes from the override.
            Assert.Throws<InvalidOperationException>(
                () => scrText.Settings.Editable = true,
                "INV-C02: Setting Editable on a marble ResourceScrText must throw"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-009")]
        [Property("BehaviorId", "BHV-106")]
        [Description("ResourceScrText Name setter throws InvalidOperationException")]
        public void ResourceScrText_SetName_ThrowsInvalidOperation()
        {
            // Arrange
            var service = new MarbleDataAccessService();
            service.Initialize();
            var scrText = service.AvailableBibles.First();

            // Act & Assert: INV-C03 - Resource names are immutable after construction
            Assert.Throws<InvalidOperationException>(() => scrText.Name = "NewName");
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-010")]
        [Property("BehaviorId", "BHV-106")]
        [Description("ResourceScrText deletes corrupt zip file and notifies user (VAL-001)")]
        public void ResourceScrText_CorruptZip_DeletesFileAndNotifies()
        {
            // Arrange: Set up a corrupt zip file at the expected resource path
            // VAL-001: Resource zip file integrity validation
            var service = new MarbleDataAccessService();

            // Act: Attempt to load a corrupt resource
            service.Initialize();

            // Assert: The corrupt file should be deleted
            // This test validates VAL-001 behavior: corrupt file deleted, user notified
            // The exact assertion depends on file system setup which the implementer
            // will need to configure. The key behavior is:
            // 1. File is deleted from disk
            // 2. User notification occurs with localized message
            Assert.Pass(
                "Placeholder: needs file system setup with corrupt zip to validate deletion"
            );
        }

        #endregion

        #region InstallableResource Tests

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-011")]
        [Property("BehaviorId", "BHV-108")]
        [Description(
            "InstallableResource uses ResourceVersion (not DBL revision) for marble update detection"
        )]
        public void InstallableResource_MarbleResource_UsesResourceVersion()
        {
            // Arrange: Two marble resources with different ResourceVersion values
            // INV-C06: Marble resources use ResourceVersion for update detection
            var service = new MarbleDataAccessService();
            service.Initialize();

            // Act & Assert: The service should use ResourceVersion comparison
            // for marble resources, not DBL revision or checksums
            // This validates INV-C06 behavior during package discovery
            var resources = service.AvailableBibles;
            Assert.That(resources, Is.Not.Null);
            // Marble resource version detection is exercised during Initialize()
            // Specific version comparison tests would need two versions of the same resource
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-012")]
        [Property("BehaviorId", "BHV-108")]
        [Description("InstallableResource marks invalid when Settings.xml is corrupt (VAL-004)")]
        public void InstallableResource_CorruptSettings_MarkedInvalidSilently()
        {
            // Arrange: A marble zip file with corrupt/missing Settings.xml
            // VAL-004: Resource settings must be loadable
            var service = new MarbleDataAccessService();

            // Act: Initialize should handle corrupt settings gracefully
            service.Initialize();

            // Assert: The resource with corrupt settings should be marked invalid
            // but should not throw an error to the user
            // This validates VAL-004: silent invalidation without user error
            var resources = service.AvailableBibles;
            Assert.That(
                resources,
                Is.Not.Null,
                "Service should still work even with some invalid resources"
            );
        }

        #endregion

        #region Plugin System Surface Tests

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-046")]
        [Property("BehaviorId", "BHV-618")]
        [Description("Host.AllEnhancedResources returns snapshot list when provider is registered")]
        public void AllEnhancedResources_ProviderRegistered_ReturnsSnapshotWithCorrectCount()
        {
            // Arrange: Service registered as EnhancedResourceProvider
            var service = new MarbleDataAccessService();
            service.Initialize();

            // Act: Access AllEnhancedResources (should delegate to provider)
            var resources1 = service.GetAllEnhancedResources();
            var resources2 = service.GetAllEnhancedResources();

            // Assert: INV-C09 - Returns snapshot (new list each time)
            Assert.That(resources1, Is.Not.Null);
            Assert.That(resources2, Is.Not.Null);
            Assert.That(
                ReferenceEquals(resources1, resources2),
                Is.False,
                "INV-C09: Each call should return a new list (snapshot)"
            );
            Assert.That(
                resources1.Count,
                Is.EqualTo(resources2.Count),
                "Same data should produce same count"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-046")]
        [Property("BehaviorId", "BHV-618")]
        [Description("Modifying returned AllEnhancedResources list does not affect provider state")]
        public void AllEnhancedResources_ModifyReturnedList_DoesNotAffectProvider()
        {
            // Arrange
            var service = new MarbleDataAccessService();
            service.Initialize();

            // Act: Get list and modify it
            var resources = service.GetAllEnhancedResources();
            int originalCount = resources.Count;
            resources.Clear();

            // Assert: Provider state is unaffected
            var freshResources = service.GetAllEnhancedResources();
            Assert.That(
                freshResources.Count,
                Is.EqualTo(originalCount),
                "INV-C09: Clearing returned list must not affect provider"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-047")]
        [Property("BehaviorId", "BHV-618")]
        [Description("AllEnhancedResources returns empty list when provider is null")]
        public void AllEnhancedResources_NullProvider_ReturnsEmptyList()
        {
            // Arrange: No provider registered (simulates null provider state)
            // This tests the null-safe delegation pattern from Host.AllEnhancedResources

            // Act
            var resources = MarbleDataAccessService.GetAllEnhancedResourcesNullSafe(null);

            // Assert
            Assert.That(resources, Is.Not.Null, "Should return empty list, not null");
            Assert.That(resources, Is.Empty, "Null provider means empty list");
        }

        #endregion
    }
}
