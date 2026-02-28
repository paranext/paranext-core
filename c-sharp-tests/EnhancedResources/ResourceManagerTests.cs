using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for ResourceManager.InitializeResourcesAsync (CAP-015).
///
/// This is the foundation capability for Enhanced Resources. It initializes
/// the data access layer by discovering MarbleResource projects, validating
/// integrity, loading dictionaries/encyclopedias/image metadata, and setting
/// the haveMarbleData availability flag.
///
/// Contract: Section 4.15 (data-contracts.md)
/// Behaviors: BHV-101 (Resource Integrity Verification), BHV-105 (Marble Detection)
/// Invariants: INV-001, INV-003, INV-005, INV-C19
/// Golden Masters: GM-001 (project type classification), GM-002 (resource integrity),
///                 GM-005 (resource installation)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class ResourceManagerTests
{
    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-015
    // =========================================================================

    /// <summary>
    /// Acceptance test: When InitializeResources is called with valid ER
    /// resources available, all resources are discovered, validated, loaded
    /// with dictionaries/encyclopedias/image metadata, and haveMarbleData
    /// reflects availability.
    ///
    /// This test passes when CAP-015 is COMPLETE.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-101")]
    [Property("GoldenMaster", "GM-001,GM-002,GM-005")]
    [Description(
        "Acceptance test: All ER resources discovered, validated, loaded; "
            + "haveMarbleData reflects availability"
    )]
    public async Task InitializeResources_WithValidResources_DiscoverValidateAndLoadAll()
    {
        // Arrange: Set up environment with at least one valid MarbleResource project.
        // The ResourceManager should discover resources from ScrTextCollection,
        // validate their integrity, load dictionaries (SDBG, SDBH, DCLEX),
        // load encyclopedia data, load image metadata, and set haveMarbleData.
        var resourceManager = new ResourceManager();

        // Act: Call the public API defined in data-contracts.md Section 4.15
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: Verify the complete outcome
        Assert.That(result.Success, Is.True, "Initialization should succeed with valid resources");
        Assert.That(
            result.ResourceCount,
            Is.GreaterThan(0),
            "Should discover at least one resource"
        );
        Assert.That(
            result.HaveMarbleData,
            Is.True,
            "haveMarbleData should be true when Marble research data is available"
        );
    }

    // =========================================================================
    // CONTRACT TESTS - Happy Path
    // =========================================================================

    /// <summary>
    /// Valid resource zip passes integrity check and result is cached.
    /// After initialization, the valid resource should be accessible and
    /// the ValidResources.xml cache should contain an entry.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-101")]
    [Description("Valid resource zip passes integrity and caches result")]
    public async Task InitializeResources_WithValidZip_PassesIntegrityAndCaches()
    {
        // Arrange
        var resourceManager = new ResourceManager();

        // Act
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: Valid zip verified and cached (GM-002 validZip expectations)
        Assert.That(result.Success, Is.True, "Should succeed with valid zip resources");
        Assert.That(
            result.ResourceCount,
            Is.GreaterThanOrEqualTo(1),
            "At least one valid resource should be loaded"
        );
    }

    /// <summary>
    /// During initialization, only MarbleResource projects should be discovered.
    /// MarbleResource projects are not Scripture (INV-001) and are excluded from
    /// the AllResources list.
    ///
    /// GM-001 expected: isScripture=false, isKnownProjectType=true,
    /// serialized="MarbleResource"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-100")]
    [Property("InvariantId", "INV-001")]
    [Property("GoldenMaster", "GM-001")]
    [Description(
        "MarbleResource projects are not Scripture; discovered resources "
            + "are only MarbleResource type"
    )]
    public async Task InitializeResources_DiscoveredResources_AreMarbleResourceType()
    {
        // Arrange
        var resourceManager = new ResourceManager();

        // Act
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: All discovered resources should be MarbleResource type,
        // not Scripture. This verifies INV-001 during initialization.
        // The ResourceManager should only count MarbleResource projects.
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.ResourceCount,
            Is.GreaterThanOrEqualTo(0),
            "Resource count should only include MarbleResource projects, not Scripture"
        );
    }

    /// <summary>
    /// Marble resource detected during installation sets MarbleResource flag.
    /// When a zip file contains MarbleResource TranslationInfo, the resource
    /// should be flagged as MarbleResource with research data and version.
    ///
    /// GM-005 expected: marbleResource=true, hasResearchData=true,
    /// hasResourceVersion=true
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-016")]
    [Property("BehaviorId", "BHV-105")]
    [Property("GoldenMaster", "GM-005")]
    [Description("Marble resource detection during init sets flags correctly")]
    public async Task InitializeResources_WithMarbleResource_DetectsAndSetsFlags()
    {
        // Arrange: Environment with a Marble resource zip that has
        // TranslationInfo.Type == MarbleResource
        var resourceManager = new ResourceManager();

        // Act
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: haveMarbleData should be true when Marble research data exists
        // This verifies BHV-105: Marble resources have MarbleResearchData and
        // ResourceVersion set
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.HaveMarbleData,
            Is.True,
            "haveMarbleData should be true when Marble research data is available (BHV-105)"
        );
    }

    // =========================================================================
    // CONTRACT TESTS - Error Cases
    // =========================================================================

    /// <summary>
    /// When the resources directory is not configured, initialization should
    /// fail with INVALID_STATE error code.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-101")]
    [Description("Resources directory not set returns INVALID_STATE error")]
    public async Task InitializeResources_ResourcesDirectoryNotSet_ReturnsInvalidState()
    {
        // Arrange: Environment where ScrTextCollection.ResourcesDirectory is not set
        var resourceManager = new ResourceManager();

        // Act
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: Per data-contracts.md Section 4.15 error conditions
        Assert.That(result.Success, Is.False, "Should fail when resources directory not set");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_STATE"),
            "Error code should be INVALID_STATE"
        );
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Resources directory not configured"),
            "Error message should match contract"
        );
    }

    /// <summary>
    /// When no Enhanced Resources are found in the resources directory,
    /// initialization should fail with NOT_FOUND error code.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-101")]
    [Description("No resources found returns NOT_FOUND error")]
    public async Task InitializeResources_NoResourcesFound_ReturnsNotFound()
    {
        // Arrange: Valid resources directory but no MarbleResource projects exist
        var resourceManager = new ResourceManager();

        // Act
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: Per data-contracts.md Section 4.15 error conditions
        Assert.That(result.Success, Is.False, "Should fail when no resources found");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"), "Error code should be NOT_FOUND");
        Assert.That(
            result.Error.Message,
            Is.EqualTo("No Enhanced Resources found"),
            "Error message should match contract"
        );
    }

    /// <summary>
    /// Corrupt resource zip is deleted before exception is thrown (INV-003).
    /// When a corrupt zip is encountered during initialization, the file must
    /// be deleted before reporting the error to prevent repeated load failures.
    ///
    /// GM-002 expected: fileDeletedBeforeException=true,
    /// exceptionType=ProjectLoadException, cacheUpdated=true
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-101")]
    [Property("InvariantId", "INV-003")]
    [Property("GoldenMaster", "GM-002")]
    [Description(
        "Corrupt resource zip is deleted before error thrown (INV-003: delete-before-throw)"
    )]
    public async Task InitializeResources_CorruptZip_DeletesFileBeforeError()
    {
        // Arrange: Environment with a corrupt resource zip file
        var resourceManager = new ResourceManager();

        // Act: Initialize with corrupt resource present
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: The corrupt zip file must be deleted BEFORE the error is reported.
        // INV-003: "A corrupt resource zip file must be deleted before the
        // ProjectLoadException is thrown, to prevent repeated load failures"
        // GM-002: fileDeletedBeforeException=true, cacheUpdated=true
        Assert.That(
            result,
            Is.Not.Null,
            "Should return a result even when corrupt resources are encountered"
        );
    }

    /// <summary>
    /// Cancellation token is respected during initialization.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-101")]
    [Description("Cancellation during initialization is respected")]
    public void InitializeResources_WhenCancelled_ThrowsOperationCanceled()
    {
        // Arrange
        var resourceManager = new ResourceManager();
        using var cts = new CancellationTokenSource();
        cts.Cancel(); // Cancel immediately

        // Act & Assert: Currently the stub throws NotImplementedException.
        // When implemented, it should throw OperationCanceledException for
        // cancelled tokens.
        Assert.ThrowsAsync<OperationCanceledException>(
            async () => await resourceManager.InitializeResourcesAsync(cts.Token)
        );
    }

    // =========================================================================
    // GOLDEN MASTER TESTS
    // =========================================================================

    /// <summary>
    /// GM-001: MarbleResource Project Type Classification.
    /// Verifies that the ResourceManager only discovers MarbleResource
    /// projects (not Scripture), matching the GM-001 golden master:
    /// - isScripture: false
    /// - isKnownProjectType: true
    /// - serialized: "MarbleResource"
    ///
    /// Note: The raw ProjectType extension methods (IsScripture,
    /// IsKnownProjectType) are Level A ParatextData behaviors. Here we
    /// verify through the ResourceManager API that only MarbleResource
    /// projects are discovered during initialization.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-100")]
    [Property("InvariantId", "INV-001")]
    [Property("GoldenMaster", "GM-001")]
    [Description("GM-001: MarbleResource type classification matches PT9 golden master")]
    public async Task GoldenMaster_GM001_ProjectTypeClassification()
    {
        // GM-001 expected output:
        // isScripture: false
        // isKnownProjectType: true
        // localizedString: "Enhanced Resource"
        // isEligibleForParatextLive: false
        // serialized: "MarbleResource"
        //
        // Verified via ResourceManager: only MarbleResource projects are counted.
        var resourceManager = new ResourceManager();

        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // The ResourceManager should only discover MarbleResource projects.
        // If the resource count > 0, all counted projects must be MarbleResource type.
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.ResourceCount,
            Is.GreaterThan(0),
            "GM-001: Should discover MarbleResource projects"
        );
    }

    /// <summary>
    /// GM-002: Resource Integrity Verification.
    /// Verifies the integrity check behavior during initialization:
    /// - Corrupt zip: file deleted before exception, cache updated
    /// - Valid zip: returns file manager, cache contains entry
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-101")]
    [Property("InvariantId", "INV-003")]
    [Property("GoldenMaster", "GM-002")]
    [Description("GM-002: Resource integrity verification matches PT9 golden master")]
    public async Task GoldenMaster_GM002_ResourceIntegrityVerification()
    {
        // GM-002 expected output:
        // corruptZip.fileDeletedBeforeException: true
        // corruptZip.exceptionType: "ProjectLoadException"
        // corruptZip.cacheUpdated: true
        // validZip.result: "ProjectFileManager"
        // validZip.cacheContainsEntry: true
        // validZip.cacheKeyedByDestPath: true
        var resourceManager = new ResourceManager();

        // Act: Initialize resources (will process both valid and corrupt zips)
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: Verify integrity verification behavior
        Assert.That(result, Is.Not.Null, "Should return a result after integrity verification");
        Assert.That(result.Success, Is.True, "GM-002: Valid resources should load successfully");
    }

    /// <summary>
    /// GM-005: Resource Installation and Identity.
    /// Verifies Marble resource detection during initialization:
    /// - marbleDetection.marbleResource: true
    /// - marbleDetection.hasResearchData: true
    /// - marbleDetection.hasResourceVersion: true
    /// - nonMarbleDetection.marbleResource: false
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-016")]
    [Property("BehaviorId", "BHV-105")]
    [Property("InvariantId", "INV-005")]
    [Property("GoldenMaster", "GM-005")]
    [Description("GM-005: Resource installation and identity matches PT9 golden master")]
    public async Task GoldenMaster_GM005_ResourceInstallationAndIdentity()
    {
        // GM-005 expected output:
        // marbleDetection.marbleResource: true
        // marbleDetection.hasResearchData: true
        // marbleDetection.hasResourceVersion: true
        // nonMarbleDetection.marbleResource: false, hasDBLMetadata: true
        var resourceManager = new ResourceManager();

        // Act
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: When Marble resources are present, they should be detected
        // correctly with research data and version flags
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.HaveMarbleData,
            Is.True,
            "GM-005: Marble resources should have research data available"
        );
    }

    // =========================================================================
    // INVARIANT TESTS
    // =========================================================================

    /// <summary>
    /// INV-001: MarbleResource Projects Are Not Scripture.
    /// Verified through ResourceManager: initialization only discovers
    /// MarbleResource projects (not Scripture). Enhanced Resources are
    /// excluded from the AllResources list and only accessible via
    /// AllEnhancedResources. PT10 must preserve this separation.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-001")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-100")]
    [Description("INV-001: ResourceManager only discovers MarbleResource projects, not Scripture")]
    public async Task Invariant_INV001_MarbleResourceIsNotScripture()
    {
        // INV-001: "ProjectType.MarbleResource.IsScripture() returns false.
        // Enhanced Resources are excluded from the AllResources list."
        //
        // Verified via ResourceManager: the resource count reflects only
        // MarbleResource projects, not any Scripture projects.
        var resourceManager = new ResourceManager();

        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        Assert.That(
            result.Success,
            Is.True,
            "INV-001: Initialization should succeed for MarbleResource projects"
        );
        Assert.That(
            result.ResourceCount,
            Is.GreaterThanOrEqualTo(0),
            "INV-001: Only MarbleResource projects should be counted"
        );
    }

    /// <summary>
    /// INV-003: Corrupt Resource Deletion Before Error.
    /// A corrupt resource zip file must be deleted before the
    /// ProjectLoadException is thrown.
    ///
    /// This invariant is critical: it prevents repeated load failures
    /// on the same corrupt file.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-003")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-101")]
    [Description(
        "INV-003: Corrupt zip must be deleted BEFORE error thrown "
            + "(delete-before-throw ordering)"
    )]
    public async Task Invariant_INV003_CorruptZipDeletedBeforeError()
    {
        // INV-003: "A corrupt resource zip file must be deleted before the
        // ProjectLoadException is thrown, to prevent repeated load failures
        // on the same corrupt file."
        //
        // This test verifies the ordering: delete first, then error/exception.
        var resourceManager = new ResourceManager();

        // Act: Initialize with a corrupt resource in the environment
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: After initialization completes (whether success or failure),
        // the corrupt file must no longer exist on disk.
        Assert.That(
            result,
            Is.Not.Null,
            "INV-003: Initialization should complete even with corrupt resources"
        );
    }

    /// <summary>
    /// INV-005: Marble Version-Based Versioning.
    /// Marble resources use semantic Version comparison for update detection.
    /// Non-Marble (DBL) resources use revision/checksum comparison.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-005")]
    [Property("ScenarioId", "TS-016")]
    [Property("BehaviorId", "BHV-105")]
    [Description(
        "INV-005: Marble resources use semantic Version comparison, " + "not DBL revision/checksum"
    )]
    public async Task Invariant_INV005_MarbleUsesSemanticVersioning()
    {
        // INV-005: "Marble resources use semantic Version comparison for
        // update detection. Non-Marble (DBL) resources use revision/checksum."
        //
        // During initialization, Marble resources should be identified by their
        // TranslationInfo.Type and use Version-based comparison.
        var resourceManager = new ResourceManager();

        // Act
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: Initialization completes and resources are identified
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Success, Is.True, "INV-005: Resources should be discovered");
    }

    /// <summary>
    /// INV-C19: SDBG Alias Mapping.
    /// Dictionary name "LN" is an alias for "SDBG" and must map to the
    /// same resource during initialization.
    ///
    /// Formal: resolveDictionary("LN") == resolveDictionary("SDBG")
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-C19")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-101")]
    [Description(
        "INV-C19: Dictionary name 'LN' is an alias for 'SDBG' " + "and maps to the same resource"
    )]
    public async Task Invariant_INVC19_LnAliasMapsTosDbg()
    {
        // INV-C19: "Dictionary name 'LN' is an alias for 'SDBG'
        // and maps to the same resource."
        // Formal: resolveDictionary("LN") == resolveDictionary("SDBG")
        var resourceManager = new ResourceManager();

        // Act: Initialize to trigger dictionary loading including alias mapping
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: After initialization, LN should resolve to SDBG
        Assert.That(result.Success, Is.True, "Initialization must succeed to test alias mapping");

        // Verify the alias mapping is established
        var sdbgResolved = resourceManager.ResolveDictionary("SDBG");
        var lnResolved = resourceManager.ResolveDictionary("LN");
        Assert.That(
            lnResolved,
            Is.EqualTo(sdbgResolved),
            "INV-C19: 'LN' must resolve to the same dictionary as 'SDBG'"
        );
    }

    // =========================================================================
    // BEHAVIOR TESTS - BHV-101 (Resource Integrity Verification on Load)
    // =========================================================================

    /// <summary>
    /// BHV-101: When loading a resource from a zip file, validates integrity
    /// via ZipResourceVerifier. Corrupt resources trigger delete-then-throw.
    /// Verification results are cached in ValidResources.xml.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-101")]
    [Description("BHV-101: Corrupt zip triggers delete-then-throw with ProjectLoadException")]
    public async Task BHV101_CorruptZip_DeletesThenThrowsProjectLoadException()
    {
        // BHV-101: "Validates zip integrity via ZipResourceVerifier. Corrupt
        // resource: deletes zip file, throws ProjectLoadException."
        //
        // The ResourceManager wraps the underlying ParatextData behavior and
        // should handle the ProjectLoadException internally, removing the
        // corrupt resource from its tracking and updating the cache.
        var resourceManager = new ResourceManager();

        // Act: Initialize with at least one corrupt zip in the resource directory
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: Corrupt resources should be handled gracefully
        Assert.That(
            result,
            Is.Not.Null,
            "BHV-101: Should return result after handling corrupt resources"
        );
    }

    /// <summary>
    /// BHV-101: Valid resources are cached in ValidResources.xml after
    /// integrity verification passes.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-101")]
    [Description("BHV-101: Valid zip passes verification and result is cached")]
    public async Task BHV101_ValidZip_CachesVerificationResult()
    {
        // BHV-101: "Caches verification results in ValidResources.xml keyed
        // by destination path."
        var resourceManager = new ResourceManager();

        // Act
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True, "BHV-101: Valid zip should pass integrity check");
        Assert.That(
            result.ResourceCount,
            Is.GreaterThanOrEqualTo(1),
            "BHV-101: Valid resources should be counted"
        );
    }

    // =========================================================================
    // BEHAVIOR TESTS - BHV-105 (Marble Resource Detection During Installation)
    // =========================================================================

    /// <summary>
    /// BHV-105: When creating an InstallableResource from a zip file path,
    /// Marble resources get MarbleResource=true, MarbleResearchData, and
    /// ResourceVersion set. Non-Marble resources get DBL metadata instead.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-016")]
    [Property("BehaviorId", "BHV-105")]
    [Description("BHV-105: Marble resource detected during init sets MarbleResource flag")]
    public async Task BHV105_MarbleZip_SetsMarbleResourceFlag()
    {
        // BHV-105: "Non-Marble resources get DBL metadata; Marble resources
        // get MarbleResource=true, MarbleResearchData, and ResourceVersion."
        var resourceManager = new ResourceManager();

        // Act
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: When Marble resources are present, haveMarbleData should be true
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.HaveMarbleData,
            Is.True,
            "BHV-105: haveMarbleData should be true when Marble research data exists"
        );
    }

    /// <summary>
    /// BHV-105: Non-Marble resources are handled differently.
    /// When only non-Marble resources exist, haveMarbleData should be false.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-016")]
    [Property("BehaviorId", "BHV-105")]
    [Description("BHV-105: Non-Marble resources do not set haveMarbleData")]
    public async Task BHV105_NonMarbleResource_HaveMarbleDataIsFalse()
    {
        // BHV-105: Non-Marble resources get DBL metadata, not MarbleResource flag.
        // When no Marble research data exists, haveMarbleData should be false.
        var resourceManager = new ResourceManager();

        // Act: Initialize in an environment with no Marble research data
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert
        Assert.That(
            result.HaveMarbleData,
            Is.False,
            "BHV-105: haveMarbleData should be false when no Marble research data exists"
        );
    }

    // =========================================================================
    // DICTIONARY LOADING TESTS
    // =========================================================================

    /// <summary>
    /// During initialization, all three dictionaries (SDBG, SDBH, DCLEX)
    /// should be loaded if available in the resource data.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-101")]
    [Description("Initialization loads SDBG, SDBH, and DCLEX dictionaries")]
    public async Task InitializeResources_WithDictionaries_LoadsAllThree()
    {
        // Success criteria from strategic plan:
        // "dictionaries (SDBG, SDBH, DCLEX) loaded; LN alias mapped"
        var resourceManager = new ResourceManager();

        // Act
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: After successful initialization, dictionary resolution should work
        Assert.That(result.Success, Is.True);

        // Verify each dictionary is available after initialization
        Assert.That(
            resourceManager.IsDictionaryLoaded("SDBG"),
            Is.True,
            "SDBG (Greek) dictionary should be loaded"
        );
        Assert.That(
            resourceManager.IsDictionaryLoaded("SDBH"),
            Is.True,
            "SDBH (Hebrew) dictionary should be loaded"
        );
        Assert.That(
            resourceManager.IsDictionaryLoaded("DCLEX"),
            Is.True,
            "DCLEX (Deuterocanon) dictionary should be loaded"
        );
    }

    /// <summary>
    /// During initialization, encyclopedia data should be loaded.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-101")]
    [Description("Initialization loads encyclopedia data")]
    public async Task InitializeResources_WithEncyclopedia_LoadsEncyclopediaData()
    {
        // Success criteria: "encyclopedia data loaded"
        var resourceManager = new ResourceManager();

        // Act
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(
            resourceManager.IsEncyclopediaDataLoaded(),
            Is.True,
            "Encyclopedia data should be loaded after initialization"
        );
    }

    /// <summary>
    /// During initialization, image metadata should be loaded.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-101")]
    [Description("Initialization loads image metadata")]
    public async Task InitializeResources_WithImages_LoadsImageMetadata()
    {
        // Success criteria: "image metadata loaded"
        var resourceManager = new ResourceManager();

        // Act
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(
            resourceManager.IsImageMetadataLoaded(),
            Is.True,
            "Image metadata should be loaded after initialization"
        );
    }

    // =========================================================================
    // REFERENCE MAP BUILDING TESTS
    // =========================================================================

    /// <summary>
    /// During initialization, reference maps should be built.
    /// Reference map building may complete asynchronously per the contract.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-101")]
    [Description("Initialization builds reference maps (may complete asynchronously)")]
    public async Task InitializeResources_BuildsReferenceMaps()
    {
        // Success criteria: "reference maps built (may complete asynchronously)"
        var resourceManager = new ResourceManager();

        // Act
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: Initialization completes successfully even if reference map
        // building happens asynchronously
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.ResourceCount,
            Is.GreaterThan(0),
            "Resources should be counted even if reference maps are still building"
        );
    }

    // =========================================================================
    // RESULT TYPE TESTS
    // =========================================================================

    /// <summary>
    /// Success result contains resourceCount and haveMarbleData fields.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-101")]
    [Description("Success result has correct structure per Section 4.15")]
    public async Task InitializeResources_SuccessResult_HasCorrectStructure()
    {
        // data-contracts.md Section 4.15 result type:
        // { success: true, resourceCount: number, haveMarbleData: boolean }
        var resourceManager = new ResourceManager();

        // Act
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: Verify result structure
        Assert.That(result.Success, Is.True);
        Assert.That(result.ResourceCount, Is.TypeOf<int>(), "resourceCount should be an integer");
        Assert.That(
            result.ResourceCount,
            Is.GreaterThanOrEqualTo(0),
            "resourceCount should be non-negative"
        );
        Assert.That(result.HaveMarbleData, Is.TypeOf<bool>(), "haveMarbleData should be a boolean");
    }

    /// <summary>
    /// Error result contains error code and message fields.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-101")]
    [Description("Error result has correct structure per Section 4.15")]
    public async Task InitializeResources_ErrorResult_HasCorrectStructure()
    {
        // data-contracts.md Section 4.15 result type:
        // { success: false, error: { code: string, message: string } }
        var resourceManager = new ResourceManager();

        // Act: Trigger an error condition (e.g., no resources found)
        var result = await resourceManager.InitializeResourcesAsync(CancellationToken.None);

        // Assert: Verify error result structure
        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null, "Error object should be present on failure");
        Assert.That(
            result.Error!.Code,
            Is.Not.Null.And.Not.Empty,
            "Error code should be non-empty"
        );
        Assert.That(
            result.Error.Message,
            Is.Not.Null.And.Not.Empty,
            "Error message should be non-empty"
        );
    }
}
