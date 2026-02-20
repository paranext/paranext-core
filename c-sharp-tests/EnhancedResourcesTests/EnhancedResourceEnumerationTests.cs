using Paranext.DataProvider.EnhancedResources;
using Paratext.Data;
using PtxUtils;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-001: GetAvailableEnhancedResources.
/// Verifies that the resource enumeration service correctly identifies and
/// returns metadata for installed Enhanced Resources (MarbleResource projects),
/// excluding them from regular resource/project lists per INV-006.
///
/// PT9 Source: ParatextData/Plugins/Host.cs:52-63, IEnhancedResourceProvider.cs:5-10
/// Spec: spec-005-provider-and-host.json
/// Contract: data-contracts.md Method 1 (GetAvailableEnhancedResources)
///
/// These tests will FAIL in RED state because:
/// - EnhancedResourceInfo record does not yet exist
/// - EnhancedResourceEnumerationService does not yet exist
/// </summary>
[TestFixture]
internal class EnhancedResourceEnumerationTests : PapiTestBase
{
    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-001 (spec-005).
    /// Verifies that Enhanced Resources are enumerated correctly with all metadata
    /// populated, and that MarbleResource projects are excluded from regular resource
    /// lists. When this test passes, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-001")]
    [Property("SpecId", "spec-005")]
    [Property("ScenarioId", "TS-024")]
    [Property("BehaviorId", "BHV-111")]
    [Description(
        "Acceptance test: Enhanced resources enumerated correctly, excluding regular resources"
    )]
    public void GetAvailableEnhancedResources_AcceptanceTest()
    {
        // Arrange: Register two ER projects in ScrTextCollection
        // The service should find them and return EnhancedResourceInfo for each
        var erInfo1 = new EnhancedResourceInfoTestData(
            id: "ESV16UK+",
            name: "ESV with Marble Data",
            shortName: "ESV+",
            language: "English",
            version: "2.0.0.0",
            hasResearchData: true
        );
        var erInfo2 = new EnhancedResourceInfoTestData(
            id: "KJV+",
            name: "KJV with Marble Data",
            shortName: "KJV+",
            language: "English",
            version: "1.5.0.0",
            hasResearchData: true
        );

        SetupMarbleResource(erInfo1);
        SetupMarbleResource(erInfo2);

        // Also add a regular (non-Marble) resource to verify exclusion
        SetupRegularProject("GNT5");

        // Act
        IReadOnlyList<EnhancedResourceInfo> result =
            EnhancedResourceEnumerationService.GetAvailableEnhancedResources();

        // Assert: spec-005 assertions
        Assert.Multiple(() =>
        {
            // TS-024: Returns wrapped ER projects (count matches)
            Assert.That(result, Has.Count.EqualTo(2), "spec-005: Returns all registered ER bibles");

            // INV-006: Only MarbleResource projects returned
            Assert.That(
                result.All(r => r.IsInstalled),
                Is.True,
                "All returned resources should be marked as installed"
            );

            // All metadata fields populated
            var esv = result.FirstOrDefault(r => r.Id == "ESV16UK+");
            Assert.That(esv, Is.Not.Null, "ESV16UK+ should be in results");
            Assert.That(esv!.Name, Is.EqualTo("ESV with Marble Data"));
            Assert.That(esv.ShortName, Is.EqualTo("ESV+"));
            Assert.That(esv.Language, Is.EqualTo("English"));
            Assert.That(esv.Version, Is.EqualTo("2.0.0.0"));
            Assert.That(esv.HasResearchData, Is.True);

            // Verify regular resource is NOT in the list
            Assert.That(
                result.Any(r => r.Id == "GNT5"),
                Is.False,
                "INV-006: Regular resources must NOT appear in enhanced resource list"
            );
        });
    }

    #endregion

    #region Contract Tests - Happy Path

    /// <summary>
    /// TS-001: AvailableBibles returns all registered ER bibles.
    /// In PT10 context, this means ScrTextCollection.ScrTexts() filtered to
    /// MarbleResource type returns all installed ERs.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-100")]
    [Description("AvailableBibles returns IEnumerable of ScrText instances")]
    public void GetAvailableEnhancedResources_WithRegisteredERs_ReturnsAll()
    {
        // Arrange
        SetupMarbleResource(
            new EnhancedResourceInfoTestData(
                id: "ESV16UK+",
                name: "ESV with Marble Data",
                shortName: "ESV+",
                language: "English",
                version: "2.0.0.0",
                hasResearchData: true
            )
        );
        SetupMarbleResource(
            new EnhancedResourceInfoTestData(
                id: "KJV+",
                name: "KJV with Marble Data",
                shortName: "KJV+",
                language: "English",
                version: "1.5.0.0",
                hasResearchData: true
            )
        );

        // Act
        IReadOnlyList<EnhancedResourceInfo> result =
            EnhancedResourceEnumerationService.GetAvailableEnhancedResources();

        // Assert
        Assert.That(result, Has.Count.EqualTo(2), "Returns all registered ER bibles");
    }

    /// <summary>
    /// TS-024: AllEnhancedResources returns wrapped ER projects with correct metadata.
    /// Each EnhancedResourceInfo must have all fields populated from ScrText settings.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Critical")]
    [Property("ScenarioId", "TS-024")]
    [Property("BehaviorId", "BHV-111")]
    [Property("InvariantId", "INV-006")]
    [Description("AllEnhancedResources returns wrapped ER projects with metadata")]
    public void GetAvailableEnhancedResources_ReturnsEnhancedResourceInfoWithAllFields()
    {
        // Arrange
        SetupMarbleResource(
            new EnhancedResourceInfoTestData(
                id: "ESV16UK+",
                name: "ESV with Marble Data",
                shortName: "ESV+",
                language: "English",
                version: "2.0.0.0",
                hasResearchData: true
            )
        );

        // Act
        IReadOnlyList<EnhancedResourceInfo> result =
            EnhancedResourceEnumerationService.GetAvailableEnhancedResources();

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        var info = result[0];
        Assert.Multiple(() =>
        {
            Assert.That(info.Id, Is.Not.Null.And.Not.Empty, "Id must be populated");
            Assert.That(info.Name, Is.Not.Null.And.Not.Empty, "Name must be populated");
            Assert.That(info.ShortName, Is.Not.Null.And.Not.Empty, "ShortName must be populated");
            Assert.That(info.Language, Is.Not.Null.And.Not.Empty, "Language must be populated");
            Assert.That(info.Version, Is.Not.Null.And.Not.Empty, "Version must be populated");
            Assert.That(info.IsInstalled, Is.True, "Installed resources are marked as installed");
        });
    }

    /// <summary>
    /// TS-026: HasResearchData is correctly read from the MarbleResearchData setting.
    /// When a resource has MarbleResearchData setting value of "T", the field is true.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-112")]
    [Description("HasResearchData correctly read from MarbleResearchData settings")]
    public void GetAvailableEnhancedResources_HasResearchData_ReadFromSettings()
    {
        // Arrange: ER with research data
        SetupMarbleResource(
            new EnhancedResourceInfoTestData(
                id: "ESV16UK+",
                name: "ESV",
                shortName: "ESV+",
                language: "English",
                version: "2.0.0.0",
                hasResearchData: true
            )
        );

        // Act
        IReadOnlyList<EnhancedResourceInfo> result =
            EnhancedResourceEnumerationService.GetAvailableEnhancedResources();

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(
            result[0].HasResearchData,
            Is.True,
            "Resource with MarbleResearchData='T' should have HasResearchData=true"
        );
    }

    /// <summary>
    /// TS-026 complement: Resource without research data should have HasResearchData=false.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-112")]
    [Description("HasResearchData false when MarbleResearchData setting not 'T'")]
    public void GetAvailableEnhancedResources_NoResearchData_HasResearchDataFalse()
    {
        // Arrange: ER without research data
        SetupMarbleResource(
            new EnhancedResourceInfoTestData(
                id: "PLAIN_ER",
                name: "Plain ER",
                shortName: "PLN+",
                language: "English",
                version: "1.0.0.0",
                hasResearchData: false
            )
        );

        // Act
        IReadOnlyList<EnhancedResourceInfo> result =
            EnhancedResourceEnumerationService.GetAvailableEnhancedResources();

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(
            result[0].HasResearchData,
            Is.False,
            "Resource without research data should have HasResearchData=false"
        );
    }

    /// <summary>
    /// TS-039: MarbleResource excluded from GetAllProjects.
    /// ERs must not appear in regular project enumeration lists.
    /// CanBeRegistered returns false for MarbleResource.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Critical")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-603")]
    [Description("MarbleResource excluded from GetAllProjects")]
    public void GetAvailableEnhancedResources_MarbleResource_ExcludedFromGetAllProjects()
    {
        // Arrange: Set up an ER and a regular project
        SetupMarbleResource(
            new EnhancedResourceInfoTestData(
                id: "ESV16UK+",
                name: "ESV",
                shortName: "ESV+",
                language: "English",
                version: "2.0.0.0",
                hasResearchData: true
            )
        );
        SetupRegularProject("TestProject");

        // Act: Get all regular projects (should NOT contain the ER)
        IReadOnlyList<EnhancedResourceInfo> erList =
            EnhancedResourceEnumerationService.GetAvailableEnhancedResources();

        // Assert: ER is in the ER list but not in regular project collections
        Assert.Multiple(() =>
        {
            Assert.That(
                erList.Any(r => r.Id == "ESV16UK+"),
                Is.True,
                "ER should appear in the enhanced resource list"
            );

            // Verify that the MarbleResource type is NOT scripture
            // (which is the mechanism that excludes it from AllResources)
            Assert.That(
                ProjectType.MarbleResource.IsScripture(),
                Is.False,
                "MarbleResource.IsScripture() must be false (drives AllResources exclusion)"
            );
        });
    }

    #endregion

    #region Contract Tests - Edge Cases

    /// <summary>
    /// TS-035: AllEnhancedResources returns empty list when no provider registered.
    /// In the PT10 context this means: when no MarbleResource projects are installed,
    /// the service returns an empty list (not null).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-111")]
    [Description("AllEnhancedResources returns empty list when no provider")]
    public void GetAvailableEnhancedResources_NoProvider_ReturnsEmptyList()
    {
        // Arrange: No MarbleResource projects registered (only regular projects)
        SetupRegularProject("GNT5");

        // Act
        IReadOnlyList<EnhancedResourceInfo> result =
            EnhancedResourceEnumerationService.GetAvailableEnhancedResources();

        // Assert
        Assert.That(result, Is.Not.Null, "Result must not be null -- returns empty list instead");
        Assert.That(result, Has.Count.EqualTo(0), "Returns empty list when no ERs installed");
    }

    /// <summary>
    /// TS-002: When there are no resources at all, returns empty (not null).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-002")]
    [Property("BehaviorId", "BHV-100")]
    [Description("Returns empty list (not null) when ScrTextCollection is empty")]
    public void GetAvailableEnhancedResources_EmptyCollection_ReturnsEmptyList()
    {
        // Arrange: ScrTextCollection is empty (default after TearDown/SetUp cycle)

        // Act
        IReadOnlyList<EnhancedResourceInfo> result =
            EnhancedResourceEnumerationService.GetAvailableEnhancedResources();

        // Assert
        Assert.That(result, Is.Not.Null, "Must return empty list, not null");
        Assert.That(result, Is.Empty, "No resources installed means empty list");
    }

    /// <summary>
    /// TS-025: AllResources excludes MarbleResource projects.
    /// Mixed collection of regular resources and ERs: only ERs returned.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Critical")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "BHV-111")]
    [Property("InvariantId", "INV-006")]
    [Description("AllResources excludes MarbleResource projects")]
    public void GetAvailableEnhancedResources_MixedProjects_OnlyMarbleResourceReturned()
    {
        // Arrange: Add both types
        SetupMarbleResource(
            new EnhancedResourceInfoTestData(
                id: "ESV16UK+",
                name: "ESV with Marble Data",
                shortName: "ESV+",
                language: "English",
                version: "2.0.0.0",
                hasResearchData: true
            )
        );
        SetupRegularProject("GNT5");

        // Act
        IReadOnlyList<EnhancedResourceInfo> result =
            EnhancedResourceEnumerationService.GetAvailableEnhancedResources();

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(
                result,
                Has.Count.EqualTo(1),
                "Only MarbleResource projects should be returned"
            );
            Assert.That(
                result[0].Id,
                Is.EqualTo("ESV16UK+"),
                "The MarbleResource should be the one returned"
            );
            Assert.That(
                result.Any(r => r.Id == "GNT5"),
                Is.False,
                "INV-006: Regular resources must NOT appear in enhanced resource list"
            );
        });
    }

    /// <summary>
    /// Verifies that multiple ERs are returned when multiple are installed.
    /// This tests the full enumeration path with several resources.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-100")]
    [Description("Multiple ERs all returned in list")]
    public void GetAvailableEnhancedResources_MultipleERs_AllReturned()
    {
        // Arrange: Three ERs
        SetupMarbleResource(
            new EnhancedResourceInfoTestData("ESV16UK+", "ESV", "ESV+", "English", "2.0.0.0", true)
        );
        SetupMarbleResource(
            new EnhancedResourceInfoTestData("KJV+", "KJV", "KJV+", "English", "1.5.0.0", true)
        );
        SetupMarbleResource(
            new EnhancedResourceInfoTestData("RVR09+", "RVR09", "RVR+", "Spanish", "1.0.0.0", false)
        );

        // Act
        IReadOnlyList<EnhancedResourceInfo> result =
            EnhancedResourceEnumerationService.GetAvailableEnhancedResources();

        // Assert
        Assert.That(result, Has.Count.EqualTo(3), "All three ERs should be returned");
    }

    #endregion

    #region Invariant Tests

    /// <summary>
    /// INV-006: ERs Appear Only in AllEnhancedResources, NEVER through AllResources.
    /// This invariant ensures that Enhanced Resources are separated from regular resources.
    /// The mechanism is: AllResources filters by IsScripture(), which returns false for
    /// MarbleResource (INV-001). Therefore ERs are excluded from AllResources.
    /// GetAvailableEnhancedResources returns ONLY MarbleResource projects.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-006")]
    [Property("BehaviorId", "BHV-111")]
    [Property("ScenarioId", "TS-025")]
    [Description(
        "INV-006: ERs appear ONLY in AllEnhancedResources, NEVER in regular resource lists"
    )]
    public void Invariant_ERsOnlyInAllEnhancedResources()
    {
        // Arrange: Install both types
        SetupMarbleResource(
            new EnhancedResourceInfoTestData(
                id: "ESV16UK+",
                name: "ESV",
                shortName: "ESV+",
                language: "English",
                version: "2.0.0.0",
                hasResearchData: true
            )
        );
        SetupRegularProject("GNT5");

        // Act
        IReadOnlyList<EnhancedResourceInfo> enhancedResources =
            EnhancedResourceEnumerationService.GetAvailableEnhancedResources();

        // The regular resources list should exclude MarbleResource.
        // We verify this by checking that IsScripture is false for MarbleResource,
        // which is the filter used by Host.AllResources in PT9.
        var scrTexts = ScrTextCollection.ScrTexts(IncludeProjects.Everything).ToList();
        var scriptureResources = scrTexts
            .Where(s => s.Settings.TranslationInfo.Type.IsScripture())
            .ToList();

        // Assert the invariant
        Assert.Multiple(() =>
        {
            // ERs ARE in the enhanced resources list
            Assert.That(
                enhancedResources.Any(r => r.Id == "ESV16UK+"),
                Is.True,
                "ER must appear in enhanced resources list"
            );

            // ERs are NOT in the scripture resources list (which powers AllResources)
            Assert.That(
                scriptureResources.Any(s => s.Name.Contains("ESV16UK+")),
                Is.False,
                "INV-006: ER must NOT appear in scripture resources (AllResources)"
            );

            // Regular resources are NOT in enhanced resources list
            Assert.That(
                enhancedResources.Any(r => r.Id == "GNT5"),
                Is.False,
                "INV-006: Regular resources must NOT appear in enhanced resources"
            );
        });
    }

    /// <summary>
    /// INV-006 complement: Verifies the invariant holds with an empty ER list.
    /// When no ERs are installed, enhanced resources list is empty.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-006")]
    [Property("BehaviorId", "BHV-111")]
    [Property("ScenarioId", "TS-035")]
    [Description("INV-006: Empty ER list when no MarbleResource installed")]
    public void Invariant_NoMarbleResources_EmptyEnhancedList()
    {
        // Arrange: Only regular projects
        SetupRegularProject("TestProject1");
        SetupRegularProject("TestProject2");

        // Act
        IReadOnlyList<EnhancedResourceInfo> result =
            EnhancedResourceEnumerationService.GetAvailableEnhancedResources();

        // Assert
        Assert.That(
            result,
            Is.Empty,
            "INV-006: No MarbleResource installed means empty enhanced resources list"
        );
    }

    #endregion

    #region Contract Tests - Version Information

    /// <summary>
    /// Verifies that the Version field is populated from the resource's settings.
    /// Version uses System.Version format (e.g., "2.0.0.0") per INV-005.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-024")]
    [Property("BehaviorId", "BHV-111")]
    [Description("Version field populated from resource settings")]
    public void GetAvailableEnhancedResources_Version_PopulatedFromSettings()
    {
        // Arrange
        SetupMarbleResource(
            new EnhancedResourceInfoTestData(
                id: "ESV16UK+",
                name: "ESV",
                shortName: "ESV+",
                language: "English",
                version: "2.0.0.0",
                hasResearchData: true
            )
        );

        // Act
        IReadOnlyList<EnhancedResourceInfo> result =
            EnhancedResourceEnumerationService.GetAvailableEnhancedResources();

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(
            result[0].Version,
            Is.EqualTo("2.0.0.0"),
            "Version should match the resource's settings version"
        );
    }

    #endregion

    #region Contract Tests - HasUpdate Field

    /// <summary>
    /// Verifies that the HasUpdate field defaults to false for installed resources.
    /// HasUpdate is only set to true after CheckForResourceUpdates runs.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-024")]
    [Property("BehaviorId", "BHV-111")]
    [Description("HasUpdate defaults to false for installed resources")]
    public void GetAvailableEnhancedResources_HasUpdate_DefaultsFalse()
    {
        // Arrange
        SetupMarbleResource(
            new EnhancedResourceInfoTestData(
                id: "ESV16UK+",
                name: "ESV",
                shortName: "ESV+",
                language: "English",
                version: "2.0.0.0",
                hasResearchData: true
            )
        );

        // Act
        IReadOnlyList<EnhancedResourceInfo> result =
            EnhancedResourceEnumerationService.GetAvailableEnhancedResources();

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(
            result[0].HasUpdate,
            Is.False,
            "HasUpdate defaults to false until CheckForResourceUpdates runs"
        );
    }

    #endregion

    #region Contract Tests - Language Field

    /// <summary>
    /// Verifies that the Language field is populated from the resource's language setting.
    /// Different resources may have different languages.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-024")]
    [Property("BehaviorId", "BHV-111")]
    [Description("Language field populated from resource language setting")]
    public void GetAvailableEnhancedResources_DifferentLanguages_CorrectlyReported()
    {
        // Arrange: Two resources with different languages
        SetupMarbleResource(
            new EnhancedResourceInfoTestData("ESV16UK+", "ESV", "ESV+", "English", "2.0.0.0", true)
        );
        SetupMarbleResource(
            new EnhancedResourceInfoTestData("RVR09+", "RVR09", "RVR+", "Spanish", "1.0.0.0", false)
        );

        // Act
        IReadOnlyList<EnhancedResourceInfo> result =
            EnhancedResourceEnumerationService.GetAvailableEnhancedResources();

        // Assert
        Assert.That(result, Has.Count.EqualTo(2));
        var esv = result.First(r => r.Id == "ESV16UK+");
        var rvr = result.First(r => r.Id == "RVR09+");
        Assert.That(esv.Language, Is.EqualTo("English"));
        Assert.That(rvr.Language, Is.EqualTo("Spanish"));
    }

    #endregion

    #region Test Helpers

    /// <summary>
    /// Test data record for setting up MarbleResource projects in tests.
    /// </summary>
    private record EnhancedResourceInfoTestData(
        string id,
        string name,
        string shortName,
        string language,
        string version,
        bool hasResearchData
    );

    /// <summary>
    /// Sets up a MarbleResource project in ScrTextCollection for testing.
    /// This creates a fake ScrText and registers it with a valid HexId.
    /// The test data's logical "id" (e.g. "ESV16UK+") represents how the
    /// service should identify resources; the actual ScrText Guid is a HexId.
    ///
    /// PT9 Reference: ScrText.Settings.TranslationInfo.Type returns the ProjectType.
    /// A Settings.xml with &lt;TranslationInfo&gt;MarbleResource::&lt;/TranslationInfo&gt;
    /// causes Settings.TranslationInfo.Type == ProjectType.MarbleResource.
    ///
    /// NOTE: In RED phase, the service under test (EnhancedResourceEnumerationService)
    /// throws NotImplementedException, so these tests will fail at the Act step.
    /// The implementer will need to ensure the service correctly detects
    /// MarbleResource projects from ScrText.Settings.TranslationInfo.Type.
    /// </summary>
    private void SetupMarbleResource(EnhancedResourceInfoTestData data)
    {
        // Use a valid HexId for the project metadata (required by DummyScrText)
        var hexId = HexId.CreateNew().ToString();
        var details = CreateProjectDetails(hexId, data.id);

        // Add to ScrTextCollection via DummyLocalParatextProjects
        var scrText = new DummyScrText(details);

        // Set TranslationInfo.Type to MarbleResource so the service can filter correctly.
        // DummyScrText defaults to Standard type; we need to override it.
        scrText.Settings.TranslationInfo =
            new Paratext.Data.ProjectSettingsAccess.TranslationInformation(
                ProjectType.MarbleResource
            );

        // Set metadata fields the service reads via ProjectSettings:
        // FullName: the display name (e.g. "ESV with Marble Data")
        scrText.Settings.FullName = data.name;
        // Id and other metadata stored via SetSetting for custom project settings.
        // The service reads these to populate EnhancedResourceInfo fields.
        scrText.Settings.SetSetting("ResourceId", data.id);
        scrText.Settings.SetSetting("ResourceShortName", data.shortName);
        scrText.Settings.SetSetting("ResourceLanguage", data.language);
        scrText.Settings.SetSetting("MarbleVersion", data.version);
        scrText.Settings.SetSetting("MarbleResearchData", data.hasResearchData ? "T" : "F");

        ParatextProjects.FakeAddProject(details, scrText);
    }

    /// <summary>
    /// Sets up a regular (non-Marble) project in ScrTextCollection.
    /// Default DummyScrText has TranslationInfo.Type == Standard (not MarbleResource).
    /// Used to verify that regular projects are excluded from ER enumeration.
    /// </summary>
    private void SetupRegularProject(string projectName)
    {
        var details = CreateProjectDetails(HexId.CreateNew().ToString(), projectName);
        var scrText = new DummyScrText(details);
        // Default project type is Standard (not MarbleResource)
        ParatextProjects.FakeAddProject(details, scrText);
    }

    #endregion
}
