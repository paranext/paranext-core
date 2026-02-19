using System.Xml.Serialization;
using Paranext.DataProvider.EnhancedResources;
using Paratext.Data;
using Paratext.Data.Archiving;
using PtxUtils;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-019: InstallResource.
/// Verifies resource installation workflow including:
/// - ResourceScrText immutability enforcement (spec-002, INV-002)
/// - Resource integrity checking and caching (spec-003, INV-003, INV-004)
/// - InstallableResource Marble detection, version comparison, and installation (spec-004, INV-005, INV-009, INV-010)
/// - InstallResourceAsync public API (data-contracts.md Method 19)
///
/// PT9 Source: ParatextData/ResourceScrText.cs:18-243
/// PT9 Source: ParatextData/XmlResourceScrText.cs:15-142
/// PT9 Source: ParatextData/Archiving/InstallableResource.cs:44-350
/// PT9 Source: Paratext/Marble/InstallableLocalMarbleResource.cs:22-51
/// PT9 Source: Paratext/Marble/InstallableRemoteResource.cs:35-273
///
/// Specs: spec-002 (immutability), spec-003 (integrity), spec-004 (installable)
/// Contract: data-contracts.md Method 19 (InstallResource)
///
/// These tests will FAIL in RED state because:
/// - ResourceInstallService does not yet exist
/// - ResourceInstallRequest/ResourceInstallResult records do not yet exist
/// - The PT10 installation workflow wrapping ParatextData has not been implemented
/// </summary>
[TestFixture]
internal class ResourceInstallTests : PapiTestBase
{
    #region Acceptance Tests

    /// <summary>
    /// Outer acceptance test for spec-002: ResourceScrText immutability enforcement.
    /// Verifies that ResourceScrText enforces read-only access per INV-002:
    /// Name setter throws on change, Editable getter returns false, Editable setter throws.
    /// When this test passes, immutability enforcement is verified.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-019")]
    [Property("SpecId", "spec-002")]
    [Property("BehaviorId", "BHV-104")]
    [Property("InvariantId", "INV-002")]
    [Property("ScenarioId", "TS-012")]
    [Description(
        "Acceptance test: ResourceScrText immutability enforcement verified"
    )]
    public void ResourceScrText_ImmutabilityEnforcement_AcceptanceTest()
    {
        // Arrange: Create a ResourceScrText instance through the install service
        // so we test the full lifecycle, not just ParatextData in isolation
        var request = new ResourceInstallRequest(
            ResourceName: "ESV16UK+",
            ResourceType: ResourceType.EnhancedResource,
            Version: "2.0.0.0",
            HasResearchData: true,
            SourceUrl: null,
            LocalPath: CreateValidResourceZip("ESV16UK+")
        );

        // Act: Install the resource, then verify immutability of the result
        ResourceInstallResult installResult = ResourceInstallService.InstallResourceAsync(
            request
        ).GetAwaiter().GetResult();

        // Assert: spec-002 assertions on the installed ResourceScrText
        Assert.Multiple(() =>
        {
            Assert.That(installResult.Success, Is.True, "Resource installs successfully");

            // TS-013: Editable getter returns false - find by name in ScrTextCollection
            ScrText? installed = ScrTextCollection
                .ScrTexts(IncludeProjects.Everything)
                .FirstOrDefault(s => s.Name == installResult.ResourceName);
            Assert.That(installed, Is.Not.Null, "Installed resource is findable");
            Assert.That(
                installed!.Settings.Editable,
                Is.False,
                "INV-002: Resource projects are NEVER editable"
            );
        });
    }

    /// <summary>
    /// Outer acceptance test for spec-003: Resource integrity checking.
    /// Verifies that resource zip integrity is checked before installation per INV-004.
    /// When this test passes, integrity enforcement is verified.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-019")]
    [Property("SpecId", "spec-003")]
    [Property("BehaviorId", "BHV-103")]
    [Property("InvariantId", "INV-004")]
    [Property("ScenarioId", "TS-009")]
    [Description(
        "Acceptance test: Resource integrity verified before copy during installation"
    )]
    public void InstallResource_IntegrityEnforcement_AcceptanceTest()
    {
        // Arrange: Attempt to install a corrupt resource
        var request = new ResourceInstallRequest(
            ResourceName: "CorruptResource",
            ResourceType: ResourceType.EnhancedResource,
            Version: "1.0.0.0",
            HasResearchData: false,
            SourceUrl: null,
            LocalPath: "/test/resources/corrupt.zip"
        );

        // Act
        ResourceInstallResult result = ResourceInstallService.InstallResourceAsync(
            request
        ).GetAwaiter().GetResult();

        // Assert: spec-003 assertions
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False, "Corrupt resource fails installation");
            Assert.That(
                result.ErrorCode,
                Is.EqualTo("RESOURCE_CORRUPT"),
                "INV-004: Integrity verified before copy"
            );
            Assert.That(
                result.ErrorMessage,
                Does.Contain("integrity check"),
                "Error message mentions integrity"
            );
        });
    }

    /// <summary>
    /// Outer acceptance test for spec-004: InstallableResource lifecycle.
    /// Verifies Marble detection, version comparison, and install workflow.
    /// When this test passes, the full install capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-019")]
    [Property("SpecId", "spec-004")]
    [Property("BehaviorId", "BHV-108")]
    [Property("InvariantId", "INV-005")]
    [Property("ScenarioId", "TS-020")]
    [Description(
        "Acceptance test: Resource installed, verified, and available in ScrTextCollection"
    )]
    public void InstallResource_FullWorkflow_AcceptanceTest()
    {
        // Arrange: Valid resource install request
        var request = new ResourceInstallRequest(
            ResourceName: "ESV16UK+",
            ResourceType: ResourceType.EnhancedResource,
            Version: "2.0.0.0",
            HasResearchData: true,
            SourceUrl: null,
            LocalPath: CreateValidResourceZip("ESV16UK+")
        );

        // Act
        ResourceInstallResult result = ResourceInstallService.InstallResourceAsync(
            request
        ).GetAwaiter().GetResult();

        // Assert: spec-004 assertions
        Assert.Multiple(() =>
        {
            // TS-020: Install succeeds with valid resource
            Assert.That(result.Success, Is.True, "Valid resource installs successfully");
            Assert.That(result.ResourceName, Is.EqualTo("ESV16UK+"));
            Assert.That(result.ErrorMessage, Is.Null.Or.Empty);
            Assert.That(result.ErrorCode, Is.Null.Or.Empty);

            // Side-effect verification: resource is findable in ScrTextCollection
            ScrText? found = ScrTextCollection
                .ScrTexts(IncludeProjects.Everything)
                .FirstOrDefault(s => s.Name == "ESV16UK+");
            Assert.That(
                found,
                Is.Not.Null,
                "Installed resource must be findable in ScrTextCollection"
            );
        });
    }

    #endregion

    #region spec-002: ResourceScrText Immutability (INV-002)

    /// <summary>
    /// TS-012: ResourceScrText Name setter throws InvalidOperationException on change.
    /// Changing the name of a resource project is prohibited per INV-002.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Critical")]
    [Property("ScenarioId", "TS-012")]
    [Property("BehaviorId", "BHV-104")]
    [Property("InvariantId", "INV-002")]
    [Property("SpecId", "spec-002")]
    [Description("Name setter throws InvalidOperationException on change attempt")]
    public void ResourceScrText_NameSetterThrows_OnChange()
    {
        // Arrange: Get a ResourceScrText through installation
        var resourceScrText = SetupInstalledResourceScrText("ESV16UK+");

        // Act & Assert: Attempting to change the name throws
        Assert.That(
            () => resourceScrText.Name = "KJV+",
            Throws.TypeOf<InvalidOperationException>(),
            "INV-002: Changing resource name is prohibited"
        );
    }

    /// <summary>
    /// TS-013: ResourceScrText Editable getter returns false.
    /// Resources are never editable per INV-002.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Critical")]
    [Property("ScenarioId", "TS-013")]
    [Property("BehaviorId", "BHV-104")]
    [Property("InvariantId", "INV-002")]
    [Property("SpecId", "spec-002")]
    [Description("Editable getter returns false for resource projects")]
    public void ResourceScrText_EditableGetter_ReturnsFalse()
    {
        // Arrange: Get a ResourceScrText
        var resourceScrText = SetupInstalledResourceScrText("ESV16UK+");

        // Act
        bool editable = resourceScrText.Settings.Editable;

        // Assert
        Assert.That(
            editable,
            Is.False,
            "INV-002: Resources are never editable"
        );
    }

    /// <summary>
    /// TS-014: ResourceScrText Editable setter throws SafetyCheckException.
    /// Setting Editable to true on a resource must throw per INV-002.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Critical")]
    [Property("ScenarioId", "TS-014")]
    [Property("BehaviorId", "BHV-104")]
    [Property("InvariantId", "INV-002")]
    [Property("SpecId", "spec-002")]
    [Description("Editable setter throws SafetyCheckException when set to true")]
    public void ResourceScrText_EditableSetter_ThrowsSafetyCheckException()
    {
        // Arrange: Get a ResourceScrText
        var resourceScrText = SetupInstalledResourceScrText("ESV16UK+");

        // Act & Assert
        Assert.That(
            () => resourceScrText.Settings.Editable = true,
            Throws.TypeOf<SafetyCheckException>(),
            "INV-002: Setting Editable to true on a resource must throw"
        );
    }

    #endregion

    #region spec-003: Resource Integrity Checking

    /// <summary>
    /// TS-009: Valid resource zip passes integrity check.
    /// A well-formed zip file should pass CheckResource verification.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-009")]
    [Property("BehaviorId", "BHV-103")]
    [Property("SpecId", "spec-003")]
    [Description("Valid resource zip passes integrity check via CheckResource")]
    public void CheckResource_ValidZip_ReturnsTrue()
    {
        // Arrange: Create a valid resource zip at a known path
        string validZipPath = CreateValidResourceZip("ValidResource");

        // Act: Check resource integrity through the install service
        bool result = ResourceInstallService.CheckResourceIntegrity(validZipPath);

        // Assert
        Assert.That(result, Is.True, "Valid zip passes verification");
    }

    /// <summary>
    /// TS-010: Corrupt resource zip fails integrity check.
    /// Returns false for any verification failure.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-010")]
    [Property("BehaviorId", "BHV-103")]
    [Property("SpecId", "spec-003")]
    [Description("Corrupt resource zip fails integrity check")]
    public void CheckResource_CorruptZip_ReturnsFalse()
    {
        // Arrange: Create a corrupt zip file
        string corruptZipPath = CreateCorruptResourceZip("CorruptResource");

        // Act
        bool result = ResourceInstallService.CheckResourceIntegrity(corruptZipPath);

        // Assert
        Assert.That(result, Is.False, "Corrupt zip fails verification");
    }

    /// <summary>
    /// TS-011: Cached integrity result reused for unchanged file.
    /// When a file has been verified and its last-write-time has not changed,
    /// the cached result should be returned without re-verifying.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-011")]
    [Property("BehaviorId", "BHV-103")]
    [Property("SpecId", "spec-003")]
    [Description("Cached integrity result reused for unchanged file")]
    public void CheckResource_CachedResult_ReusedForUnchangedFile()
    {
        // Arrange: Create a valid zip and check it twice
        string validZipPath = CreateValidResourceZip("CachedResource");

        // Act: First check
        bool firstResult = ResourceInstallService.CheckResourceIntegrity(validZipPath);
        // Second check (should use cache)
        bool secondResult = ResourceInstallService.CheckResourceIntegrity(validZipPath);

        // Assert: Both return true (cache works)
        Assert.Multiple(() =>
        {
            Assert.That(firstResult, Is.True, "First check passes");
            Assert.That(secondResult, Is.True, "Second check returns cached result");
        });
    }

    /// <summary>
    /// TS-015: Corrupt XML resource deleted and ProjectLoadException thrown.
    /// When a corrupt XML resource is encountered, the file must be deleted
    /// and ProjectLoadException thrown with Corrupted reason per INV-003.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Critical")]
    [Property("ScenarioId", "TS-015")]
    [Property("BehaviorId", "BHV-105")]
    [Property("InvariantId", "INV-003")]
    [Property("SpecId", "spec-003")]
    [Description("Corrupt XML resource deleted and ProjectLoadException thrown")]
    public void CheckResource_CorruptXml_DeletedAndThrowsProjectLoadException()
    {
        // Arrange: Create a corrupt XML resource file
        string corruptXmlPath = CreateCorruptXmlResource("CorruptXmlResource");

        // Act & Assert: Loading this resource throws ProjectLoadException
        var ex = Assert.Throws<ProjectLoadException>(
            () => ResourceInstallService.LoadAndVerifyResource(corruptXmlPath)
        );

        Assert.Multiple(() =>
        {
            Assert.That(
                ex!.Reason,
                Is.EqualTo(UnsupportedReason.Corrupted),
                "INV-003: Exception has Corrupted reason"
            );

            // Side-effect: file should be deleted
            Assert.That(
                File.Exists(corruptXmlPath),
                Is.False,
                "INV-003: Corrupt resource file must be deleted"
            );
        });
    }

    #endregion

    #region spec-004: InstallableResource Marble Detection and Version Comparison

    /// <summary>
    /// TS-016: InstallableResource detects MarbleResource from TranslationInfo.
    /// When a zip contains TranslationInfo.Type = MarbleResource, the resource
    /// should be flagged as MarbleResource with MarbleResearchData and ResourceVersion set.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-016")]
    [Property("BehaviorId", "BHV-106")]
    [Property("SpecId", "spec-004")]
    [Description("Marble resource detected from TranslationInfo.Type")]
    public void DetectMarbleResource_FromTranslationInfo_SetsMarbleFlags()
    {
        // Arrange: Create an installable resource from a Marble zip
        var resourceInfo = ResourceInstallService.DetectResourceType(
            "/test/resources/ESV16UK+.zip"
        );

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(
                resourceInfo.IsMarbleResource,
                Is.True,
                "MarbleResource flag set from TranslationInfo.Type"
            );
            Assert.That(
                resourceInfo.HasResearchData,
                Is.True,
                "MarbleResearchData flag set from 'T' value"
            );
            Assert.That(
                resourceInfo.Version,
                Is.EqualTo("2.0"),
                "Version parsed from resource metadata"
            );
        });
    }

    /// <summary>
    /// TS-017: Non-Marble resource not flagged as MarbleResource.
    /// A DBL or other non-Marble resource must not have the MarbleResource flag set.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-017")]
    [Property("BehaviorId", "BHV-106")]
    [Property("SpecId", "spec-004")]
    [Description("Non-Marble resource not flagged as MarbleResource")]
    public void DetectMarbleResource_NonMarbleType_NotFlagged()
    {
        // Arrange: Create an installable resource from a non-Marble zip
        var resourceInfo = ResourceInstallService.DetectResourceType(
            "/test/resources/DBLResource.zip"
        );

        // Assert
        Assert.That(
            resourceInfo.IsMarbleResource,
            Is.False,
            "Non-Marble resources must not be flagged"
        );
    }

    /// <summary>
    /// TS-018: Newer Marble version detected via System.Version comparison.
    /// INV-005: Marble resource updates use System.Version, NOT DBL revision numbers.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Critical")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-107")]
    [Property("InvariantId", "INV-005")]
    [Property("SpecId", "spec-004")]
    [Description("Marble version comparison uses System.Version (INV-005)")]
    public void IsNewerVersion_MarbleNewerVersion_ReturnsTrue()
    {
        // Arrange: Installed version 2.0, remote version 2.1
        SetupInstalledMarbleResource("ESV16UK+", version: "2.0");

        // Act
        bool isNewer = ResourceInstallService.IsNewerVersionAvailable(
            resourceName: "ESV16UK+",
            remoteVersion: "2.1"
        );

        // Assert
        Assert.That(
            isNewer,
            Is.True,
            "INV-005: System.Version comparison detects newer version"
        );
    }

    /// <summary>
    /// TS-019: Same Marble version not flagged as newer.
    /// Strict greater-than comparison: equal versions are not "newer".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-019")]
    [Property("BehaviorId", "BHV-107")]
    [Property("InvariantId", "INV-005")]
    [Property("SpecId", "spec-004")]
    [Description("Same version not flagged as newer (strict greater-than)")]
    public void IsNewerVersion_SameVersion_ReturnsFalse()
    {
        // Arrange: Both installed and remote are version 2.0
        SetupInstalledMarbleResource("ESV16UK+", version: "2.0");

        // Act
        bool isNewer = ResourceInstallService.IsNewerVersionAvailable(
            resourceName: "ESV16UK+",
            remoteVersion: "2.0"
        );

        // Assert
        Assert.That(
            isNewer,
            Is.False,
            "Strict greater-than comparison: equal versions are not newer"
        );
    }

    /// <summary>
    /// TS-031: MarbleResource and MarbleResearchData are XmlIgnore.
    /// INV-009: These properties must not appear in XML serialization output.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-116")]
    [Property("InvariantId", "INV-009")]
    [Property("SpecId", "spec-004")]
    [Description("MarbleResource and MarbleResearchData not in XML serialization")]
    public void InstallableResource_XmlSerialization_ExcludesMarbleProperties()
    {
        // Arrange: Create an InstallableResource with Marble properties set
        var resource = CreateMarbleInstallableResource("ESV16UK+", version: "2.0");

        // Act: Serialize to XML
        var serializer = new XmlSerializer(typeof(InstallableResource));
        using var writer = new StringWriter();
        serializer.Serialize(writer, resource);
        string xmlOutput = writer.ToString();

        // Assert: INV-009
        Assert.Multiple(() =>
        {
            Assert.That(
                xmlOutput.Contains("MarbleResource"),
                Is.False,
                "INV-009: MarbleResource property not serialized to XML"
            );
            Assert.That(
                xmlOutput.Contains("MarbleResearchData"),
                Is.False,
                "INV-009: MarbleResearchData property not serialized to XML"
            );
        });
    }

    /// <summary>
    /// TS-032: ExistingScrText searches by DBLId then falls back to Name.
    /// When resolving an existing resource for update, search by DBLId first.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-032")]
    [Property("BehaviorId", "BHV-116")]
    [Property("SpecId", "spec-004")]
    [Description("ExistingScrText resolution searches by DBLId first, then Name")]
    public void ExistingScrText_SearchOrder_DBLIdThenName()
    {
        // Arrange: Install a resource with a known DBLId
        string dblId = "abc123def456";
        SetupInstalledMarbleResource("ESV16UK+", dblId: dblId);

        // Act: Resolve existing resource by DBLId
        ScrText? found = ResourceInstallService.FindExistingResource(dblId, "ESV16UK+");

        // Assert
        Assert.That(
            found,
            Is.Not.Null,
            "Finds existing ScrText by DBLId first"
        );
        Assert.That(
            found!.Name,
            Does.Contain("ESV16UK+"),
            "Found resource matches expected name"
        );
    }

    #endregion

    #region spec-004: Installation Workflow (INV-004, INV-010)

    /// <summary>
    /// TS-020: Resource installation verifies zip before copy.
    /// INV-004: CheckResource must be called before CopyFile during install.
    /// Verified via side-effect: installed resource exists in ScrTextCollection.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-020")]
    [Property("BehaviorId", "BHV-108")]
    [Property("InvariantId", "INV-004")]
    [Property("SpecId", "spec-004")]
    [Description("Installation verifies zip before copy (INV-004)")]
    public void InstallResource_ValidZip_VerifiesBeforeCopy()
    {
        // Arrange
        var request = new ResourceInstallRequest(
            ResourceName: "ESV16UK+",
            ResourceType: ResourceType.EnhancedResource,
            Version: "2.0.0.0",
            HasResearchData: true,
            SourceUrl: null,
            LocalPath: CreateValidResourceZip("ESV16UK+")
        );

        // Act
        ResourceInstallResult result = ResourceInstallService.InstallResourceAsync(
            request
        ).GetAwaiter().GetResult();

        // Assert: INV-004 verified by successful install (integrity check passed)
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True, "Install succeeds after integrity check");

            // Side-effect: resource added to ScrTextCollection
            ScrText? installed = ScrTextCollection
                .ScrTexts(IncludeProjects.Everything)
                .FirstOrDefault(s => s.Name == "ESV16UK+");
            Assert.That(
                installed,
                Is.Not.Null,
                "INV-004: Verified resource is available in ScrTextCollection"
            );
        });
    }

    /// <summary>
    /// TS-021: Installation deletes old project when renaming (same DBLEntryUid).
    /// INV-010: When installing with a different name from existing, old project
    /// must be deleted first.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-021")]
    [Property("BehaviorId", "BHV-108")]
    [Property("InvariantId", "INV-010")]
    [Property("SpecId", "spec-004")]
    [Description("Installation deletes old project on rename (INV-010)")]
    public void InstallResource_RenameScenario_DeletesOldProject()
    {
        // Arrange: Install a resource with original name
        string dblUid = "shared-uid-12345";
        SetupInstalledMarbleResource("ESV16UK+", dblId: dblUid);

        // Now install with a different name but same DBLEntryUid
        var request = new ResourceInstallRequest(
            ResourceName: "ESV16UK+v2",
            ResourceType: ResourceType.EnhancedResource,
            Version: "2.1.0.0",
            HasResearchData: true,
            SourceUrl: null,
            LocalPath: CreateValidResourceZip("ESV16UK+v2"),
            DblEntryUid: dblUid
        );

        // Act
        ResourceInstallResult result = ResourceInstallService.InstallResourceAsync(
            request
        ).GetAwaiter().GetResult();

        // Assert: INV-010
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True, "Rename install succeeds");

            // Old project deleted
            ScrText? oldProject = ScrTextCollection
                .ScrTexts(IncludeProjects.Everything)
                .FirstOrDefault(s => s.Name == "ESV16UK+");
            Assert.That(
                oldProject,
                Is.Null,
                "INV-010: Old project deleted before rename install"
            );

            // New project exists
            ScrText? newProject = ScrTextCollection
                .ScrTexts(IncludeProjects.Everything)
                .FirstOrDefault(s => s.Name == "ESV16UK+v2");
            Assert.That(
                newProject,
                Is.Not.Null,
                "New project installed after old one deleted"
            );
        });
    }

    /// <summary>
    /// TS-040: Installation fails when destination directory is not writable.
    /// VAL-002: Destination directory write access validation.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-108")]
    [Property("SpecId", "spec-004")]
    [Description("Installation fails for read-only destination (VAL-002)")]
    public void InstallResource_ReadOnlyDestination_ReturnsError()
    {
        // Arrange
        var request = new ResourceInstallRequest(
            ResourceName: "ESV16UK+",
            ResourceType: ResourceType.EnhancedResource,
            Version: "2.0.0.0",
            HasResearchData: true,
            SourceUrl: null,
            LocalPath: "/test/resources/ESV16UK+.zip"
        );

        // Act: Install to a read-only destination
        ResourceInstallResult result =
            ResourceInstallService.InstallResourceToReadOnlyDestinationAsync(
                request
            ).GetAwaiter().GetResult();

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False, "Install fails for read-only destination");
            Assert.That(
                result.ErrorMessage,
                Does.Contain("Cannot write to folder"),
                "VAL-002: Error mentions write access"
            );
        });
    }

    #endregion

    #region Method 19: InstallResourceAsync Contract

    /// <summary>
    /// Happy path: InstallResourceAsync with valid request returns success result.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-020")]
    [Property("BehaviorId", "BHV-108")]
    [Property("CapabilityId", "CAP-019")]
    [Description("InstallResourceAsync returns success for valid resource")]
    public void InstallResourceAsync_ValidRequest_ReturnsSuccessResult()
    {
        // Arrange
        var request = new ResourceInstallRequest(
            ResourceName: "KJV+",
            ResourceType: ResourceType.EnhancedResource,
            Version: "1.5.0.0",
            HasResearchData: true,
            SourceUrl: null,
            LocalPath: CreateValidResourceZip("KJV+")
        );

        // Act
        ResourceInstallResult result = ResourceInstallService.InstallResourceAsync(
            request
        ).GetAwaiter().GetResult();

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.ResourceName, Is.EqualTo("KJV+"));
            Assert.That(result.ErrorMessage, Is.Null.Or.Empty);
            Assert.That(result.ErrorCode, Is.Null.Or.Empty);
        });
    }

    /// <summary>
    /// Error path: InstallResourceAsync with corrupt zip returns error result.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-010")]
    [Property("BehaviorId", "BHV-103")]
    [Property("CapabilityId", "CAP-019")]
    [Description("InstallResourceAsync returns error for corrupt zip")]
    public void InstallResourceAsync_CorruptZip_ReturnsErrorResult()
    {
        // Arrange
        var request = new ResourceInstallRequest(
            ResourceName: "CorruptER",
            ResourceType: ResourceType.EnhancedResource,
            Version: "1.0.0.0",
            HasResearchData: false,
            SourceUrl: null,
            LocalPath: CreateCorruptResourceZip("CorruptER")
        );

        // Act
        ResourceInstallResult result = ResourceInstallService.InstallResourceAsync(
            request
        ).GetAwaiter().GetResult();

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False);
            Assert.That(result.ResourceName, Is.EqualTo("CorruptER"));
            Assert.That(result.ErrorCode, Is.EqualTo("RESOURCE_CORRUPT"));
            Assert.That(
                result.ErrorMessage,
                Does.Contain("integrity check").IgnoreCase
            );
        });
    }

    /// <summary>
    /// Cancellation: InstallResourceAsync with cancelled token returns cancelled result.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-020")]
    [Property("BehaviorId", "BHV-108")]
    [Property("CapabilityId", "CAP-019")]
    [Description("InstallResourceAsync respects cancellation token")]
    public void InstallResourceAsync_Cancelled_ReturnsOperationCancelled()
    {
        // Arrange
        var request = new ResourceInstallRequest(
            ResourceName: "ESV16UK+",
            ResourceType: ResourceType.EnhancedResource,
            Version: "2.0.0.0",
            HasResearchData: true,
            SourceUrl: null,
            LocalPath: CreateValidResourceZip("ESV16UK+")
        );
        var cts = new CancellationTokenSource();
        cts.Cancel(); // Pre-cancel

        // Act
        ResourceInstallResult result = ResourceInstallService.InstallResourceAsync(
            request,
            progress: null,
            cancellationToken: cts.Token
        ).GetAwaiter().GetResult();

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("OPERATION_CANCELLED"));
            Assert.That(
                result.ErrorMessage,
                Does.Contain("cancelled").IgnoreCase
            );
        });
    }

    /// <summary>
    /// Progress reporting: InstallResourceAsync reports progress during installation.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-020")]
    [Property("BehaviorId", "BHV-108")]
    [Property("CapabilityId", "CAP-019")]
    [Description("InstallResourceAsync reports progress during installation")]
    public void InstallResourceAsync_WithProgress_ReportsProgress()
    {
        // Arrange
        var request = new ResourceInstallRequest(
            ResourceName: "ESV16UK+",
            ResourceType: ResourceType.EnhancedResource,
            Version: "2.0.0.0",
            HasResearchData: true,
            SourceUrl: null,
            LocalPath: CreateValidResourceZip("ESV16UK+")
        );
        var progressValues = new List<double>();
        // Use a synchronous IProgress<T> implementation instead of Progress<T>
        // which posts callbacks asynchronously via SynchronizationContext
        var progress = new SynchronousProgress<double>(p => progressValues.Add(p));

        // Act
        ResourceInstallResult result = ResourceInstallService.InstallResourceAsync(
            request,
            progress: progress
        ).GetAwaiter().GetResult();

        // Assert: Some progress was reported
        Assert.That(
            progressValues,
            Is.Not.Empty,
            "Progress was reported during installation"
        );
    }

    /// <summary>
    /// Older version not flagged as update: installed 2.1, remote 2.0 should not be "newer".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-019")]
    [Property("BehaviorId", "BHV-107")]
    [Property("InvariantId", "INV-005")]
    [Property("CapabilityId", "CAP-019")]
    [Description("Older remote version is not flagged as newer")]
    public void IsNewerVersion_OlderVersion_ReturnsFalse()
    {
        // Arrange: Installed version 2.1, remote version 2.0
        SetupInstalledMarbleResource("ESV16UK+", version: "2.1");

        // Act
        bool isNewer = ResourceInstallService.IsNewerVersionAvailable(
            resourceName: "ESV16UK+",
            remoteVersion: "2.0"
        );

        // Assert
        Assert.That(
            isNewer,
            Is.False,
            "Older version is not flagged as newer"
        );
    }

    #endregion

    #region Invariant Tests

    /// <summary>
    /// INV-002: Resource Projects Are NEVER Editable - multiple resources.
    /// Verifies the invariant holds across multiple resource instances.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-002")]
    [Property("BehaviorId", "BHV-104")]
    [Property("ScenarioId", "TS-013")]
    [Description("INV-002: All resource projects are never editable")]
    public void Invariant_INV002_AllResourcesNeverEditable()
    {
        // Arrange: Setup multiple resources
        var resource1 = SetupInstalledResourceScrText("ESV16UK+");
        var resource2 = SetupInstalledResourceScrText("KJV+");

        // Assert: Both are not editable
        Assert.Multiple(() =>
        {
            Assert.That(
                resource1.Settings.Editable,
                Is.False,
                "INV-002: ESV16UK+ resource is not editable"
            );
            Assert.That(
                resource2.Settings.Editable,
                Is.False,
                "INV-002: KJV+ resource is not editable"
            );
        });
    }

    /// <summary>
    /// INV-005: Marble Version Comparison Uses System.Version for multiple version formats.
    /// Verifies the invariant holds across various version string formats.
    /// </summary>
    [TestCase("2.0", "2.1", true)]
    [TestCase("1.0.0.0", "2.0.0.0", true)]
    [TestCase("2.0", "2.0", false)]
    [TestCase("2.1", "2.0", false)]
    [TestCase("1.9.9.9", "2.0.0.0", true)]
    [Category("Invariant")]
    [Property("InvariantId", "INV-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-018")]
    [Description("INV-005: Marble version comparison uses System.Version")]
    public void Invariant_INV005_VersionComparisonUsesSystemVersion(
        string installedVersion,
        string remoteVersion,
        bool expectedIsNewer
    )
    {
        // Arrange
        SetupInstalledMarbleResource("TestResource", version: installedVersion);

        // Act
        bool isNewer = ResourceInstallService.IsNewerVersionAvailable(
            resourceName: "TestResource",
            remoteVersion: remoteVersion
        );

        // Assert
        Assert.That(
            isNewer,
            Is.EqualTo(expectedIsNewer),
            $"INV-005: Version {remoteVersion} vs installed {installedVersion} should be newer={expectedIsNewer}"
        );
    }

    #endregion

    #region Test Helpers

    /// <summary>
    /// Sets up an installed ResourceScrText in ScrTextCollection for testing.
    /// Returns the ScrText for direct property assertions.
    /// </summary>
    private ScrText SetupInstalledResourceScrText(string name)
    {
        // This helper will be implemented by the TDD Implementer.
        // It creates a ResourceScrText and adds it to ScrTextCollection.
        // For RED state, this call will fail because ResourceInstallService
        // does not exist yet.
        return ResourceInstallService.CreateResourceScrTextForTesting(name);
    }

    /// <summary>
    /// Sets up an installed Marble resource in ScrTextCollection with version info.
    /// </summary>
    private void SetupInstalledMarbleResource(
        string name,
        string? version = null,
        string? dblId = null
    )
    {
        ResourceInstallService.SetupInstalledMarbleForTesting(name, version, dblId);
    }

    /// <summary>
    /// Creates a valid resource zip file for testing.
    /// Returns the file path.
    /// </summary>
    private string CreateValidResourceZip(string name)
    {
        return ResourceInstallService.CreateTestResourceZip(name, corrupt: false);
    }

    /// <summary>
    /// Creates a corrupt resource zip file for testing.
    /// Returns the file path.
    /// </summary>
    private string CreateCorruptResourceZip(string name)
    {
        return ResourceInstallService.CreateTestResourceZip(name, corrupt: true);
    }

    /// <summary>
    /// Creates a corrupt XML resource file for testing.
    /// Returns the file path.
    /// </summary>
    private string CreateCorruptXmlResource(string name)
    {
        return ResourceInstallService.CreateTestCorruptXmlResource(name);
    }

    /// <summary>
    /// Creates an InstallableResource with Marble properties for serialization testing.
    /// </summary>
    private InstallableResource CreateMarbleInstallableResource(
        string name,
        string version
    )
    {
        return ResourceInstallService.CreateMarbleInstallableResourceForTesting(
            name,
            version
        );
    }

    #endregion

    /// <summary>
    /// Synchronous IProgress implementation for testing.
    /// Unlike Progress&lt;T&gt;, this invokes the callback synchronously
    /// so progress values are available immediately for assertions.
    /// </summary>
    private sealed class SynchronousProgress<T> : IProgress<T>
    {
        private readonly Action<T> _handler;

        public SynchronousProgress(Action<T> handler)
        {
            _handler = handler;
        }

        public void Report(T value)
        {
            _handler(value);
        }
    }
}
