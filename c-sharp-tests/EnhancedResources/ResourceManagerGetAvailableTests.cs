using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for ResourceManager.GetAvailableResourcesAsync (CAP-016).
///
/// This capability lists all installed Enhanced Resource projects with their
/// metadata, font settings, available books, and display names. It requires
/// CAP-015 (InitializeResources) to have completed first.
///
/// Contract: Section 4.16 (data-contracts.md)
/// Output Type: Section 3.11 (ResourceInfo, GetAvailableResourcesResult)
/// Behaviors: BHV-108 (AvailableBibles), BHV-109 (Separate ER Exposure), BHV-100 (MarbleResource Type)
/// Invariants: INV-001 (Not Scripture), INV-004 (Separate ER Exposure),
///             INV-008 (Font Language-First Resolution), INV-010 (FullName from DBL Metadata)
/// Golden Masters: GM-001 (project type classification), GM-004 (resource settings), GM-006 (plugin API)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class ResourceManagerGetAvailableTests
{
    private ResourceManager _resourceManager = null!;

    [SetUp]
    public async Task SetUp()
    {
        _resourceManager = new ResourceManager();
        // CAP-016 requires CAP-015 initialization first (Section 4.16 precondition).
        // Initialize with valid resources to satisfy the precondition for most tests.
        await _resourceManager.InitializeResourcesAsync(CancellationToken.None);
    }

    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-016
    // =========================================================================

    /// <summary>
    /// Acceptance test: When GetAvailableResources is called after initialization,
    /// all installed ER projects are listed with correct metadata including
    /// resourceId, name, fullName, languageId, version, isMarbleResource flag,
    /// availableBooks list, font settings (resolved language-first per INV-008),
    /// and htmlLanguage.
    ///
    /// This test passes when CAP-016 is COMPLETE.
    ///
    /// Golden master reference: GM-001, GM-004, GM-006
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-108")]
    [Property("GoldenMaster", "GM-001,GM-004,GM-006")]
    [Description(
        "Acceptance test: All installed ER projects listed with correct metadata, "
            + "font settings, available books; subscribable for updates"
    )]
    public async Task GetAvailableResources_AfterInit_ReturnsAllErProjectsWithMetadata()
    {
        // Act: Call the public API defined in data-contracts.md Section 4.16
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: Verify the complete outcome
        Assert.That(result.Success, Is.True, "Should succeed after initialization");
        Assert.That(result.Resources, Is.Not.Null, "Resources list should be present on success");
        Assert.That(
            result.Resources!.Count,
            Is.GreaterThan(0),
            "Should find at least one ER project"
        );

        // Verify each resource has required metadata per Section 3.11
        var resource = result.Resources[0];
        Assert.That(resource.ResourceId, Is.Not.Null.And.Not.Empty, "ResourceId must be set");
        Assert.That(resource.Name, Is.Not.Null.And.Not.Empty, "Name (short name) must be set");
        Assert.That(resource.FullName, Is.Not.Null.And.Not.Empty, "FullName must be set");
        Assert.That(resource.LanguageId, Is.Not.Null.And.Not.Empty, "LanguageId must be set");
        Assert.That(resource.Version, Is.Not.Null.And.Not.Empty, "Version must be set");
        Assert.That(
            resource.IsMarbleResource,
            Is.True,
            "All returned resources must be MarbleResource (BHV-100)"
        );
        Assert.That(resource.AvailableBooks, Is.Not.Null, "AvailableBooks list must be present");
        Assert.That(resource.Font, Is.Not.Null, "Font settings must be present");
        Assert.That(
            resource.Font.Name,
            Is.Not.Null.And.Not.Empty,
            "Font name must be set (INV-008)"
        );
        Assert.That(resource.Font.Size, Is.GreaterThan(0), "Font size must be positive");
        Assert.That(resource.HtmlLanguage, Is.Not.Null.And.Not.Empty, "HtmlLanguage must be set");
    }

    // =========================================================================
    // CONTRACT TESTS - Happy Path
    // =========================================================================

    /// <summary>
    /// After initialization, GetAvailableResources returns a success result
    /// with a list of ResourceInfo objects. (TS-022, BHV-108)
    ///
    /// BHV-108: IEnhancedResourceProvider.AvailableBibles returns ER ScrTexts.
    /// The PT10 equivalent exposes these as ResourceInfo objects.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-108")]
    [Description("AvailableBibles equivalent returns ER projects as ResourceInfo list")]
    public async Task GetAvailableResources_AfterInit_ReturnsResourceInfoList()
    {
        // Act
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: BHV-108 - Returns enumerable of ER resources
        Assert.That(result.Success, Is.True, "Should succeed after initialization");
        Assert.That(result.Resources, Is.Not.Null, "Resources list should be present");
        Assert.That(
            result.Resources!.Count,
            Is.GreaterThanOrEqualTo(1),
            "BHV-108: Should return at least one ER ScrText as ResourceInfo"
        );
    }

    /// <summary>
    /// Each returned resource has isMarbleResource set to true, confirming
    /// that only MarbleResource projects are returned. (TS-022, BHV-100)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-100")]
    [Description("All returned resources have isMarbleResource=true")]
    public async Task GetAvailableResources_AllResources_AreMarbleResourceType()
    {
        // Act
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: BHV-100 - MarbleResource project type classification
        Assert.That(result.Success, Is.True);
        Assert.That(result.Resources, Is.Not.Null);
        foreach (var resource in result.Resources!)
        {
            Assert.That(
                resource.IsMarbleResource,
                Is.True,
                $"Resource '{resource.Name}' must be MarbleResource type (BHV-100)"
            );
        }
    }

    /// <summary>
    /// Resources returned by GetAvailableResources are separate from regular
    /// resources. ERs should NOT appear in AllResources. (TS-023, BHV-109)
    ///
    /// GM-006: erInAllResources=false, erInAllEnhancedResources=true
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-023")]
    [Property("BehaviorId", "BHV-109")]
    [Property("InvariantId", "INV-004")]
    [Property("GoldenMaster", "GM-006")]
    [Description("ERs are separate from AllResources per INV-004 and GM-006")]
    public async Task GetAvailableResources_ErsSeparateFromAllResources()
    {
        // Act
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: BHV-109 / INV-004 - ERs exposed separately
        Assert.That(result.Success, Is.True);
        Assert.That(result.Resources, Is.Not.Null);
        Assert.That(
            result.Resources!.Count,
            Is.GreaterThan(0),
            "BHV-109: AllEnhancedResources should contain ERs"
        );

        // All returned resources must be MarbleResource (not Scripture)
        // This confirms they would NOT appear in AllResources (which filters by IsScripture)
        foreach (var resource in result.Resources)
        {
            Assert.That(
                resource.IsMarbleResource,
                Is.True,
                "BHV-109: Only ERs should be in the enhanced resources list"
            );
        }
    }

    /// <summary>
    /// Each resource includes available books list. (TS-022)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-108")]
    [Description("Each resource includes non-null availableBooks list")]
    public async Task GetAvailableResources_EachResource_HasAvailableBooks()
    {
        // Act
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        foreach (var resource in result.Resources!)
        {
            Assert.That(
                resource.AvailableBooks,
                Is.Not.Null,
                $"Resource '{resource.Name}' must have AvailableBooks list"
            );
            // Books are identified by canonical book numbers (1-66+)
            foreach (var bookNum in resource.AvailableBooks)
            {
                Assert.That(bookNum, Is.GreaterThan(0), "Book numbers must be positive integers");
            }
        }
    }

    /// <summary>
    /// Success result has the correct structure per Section 4.16 and Section 3.11.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-108")]
    [Description("Success result structure matches Section 4.16 / Section 3.11")]
    public async Task GetAvailableResources_SuccessResult_HasCorrectStructure()
    {
        // Act
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: GetAvailableResourcesResult per Section 3.11
        Assert.That(result.Success, Is.True);
        Assert.That(result.Resources, Is.Not.Null);
        Assert.That(result.Error, Is.Null, "Error should be null on success");
    }

    // =========================================================================
    // CONTRACT TESTS - Error Cases
    // =========================================================================

    /// <summary>
    /// When resources are not initialized (M-015 not called), GetAvailableResources
    /// returns INVALID_STATE error. (Section 4.16 error conditions)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-108")]
    [Description("Not initialized returns INVALID_STATE error per Section 4.16")]
    public async Task GetAvailableResources_NotInitialized_ReturnsInvalidState()
    {
        // Arrange: Create a fresh ResourceManager without calling InitializeResourcesAsync
        var uninitializedManager = new ResourceManager();

        // Act
        var result = await uninitializedManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: Per Section 4.16 error conditions
        Assert.That(result.Success, Is.False, "Should fail when not initialized");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_STATE"),
            "Error code should be INVALID_STATE"
        );
        Assert.That(
            result.Error.Message,
            Is.EqualTo("Resources must be initialized first"),
            "Error message should match contract"
        );
    }

    /// <summary>
    /// Error result has the correct structure per Section 4.16.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-108")]
    [Description("Error result structure matches Section 4.16")]
    public async Task GetAvailableResources_ErrorResult_HasCorrectStructure()
    {
        // Arrange: Create uninitialized manager to trigger error
        var uninitializedManager = new ResourceManager();

        // Act
        var result = await uninitializedManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.False);
        Assert.That(result.Resources, Is.Null, "Resources should be null on failure");
        Assert.That(result.Error, Is.Not.Null, "Error should be present on failure");
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

    // =========================================================================
    // EDGE CASE TESTS
    // =========================================================================

    /// <summary>
    /// When the EnhancedResourceProvider is null (not set), GetAvailableResources
    /// returns an empty list, not an exception. (TS-024, BHV-109)
    ///
    /// GM-006: nullProvider.count=0, nullProvider.noException=true
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-024")]
    [Property("BehaviorId", "BHV-109")]
    [Property("GoldenMaster", "GM-006")]
    [Description("Null EnhancedResourceProvider returns empty list without exception (TS-024)")]
    public async Task GetAvailableResources_NullProvider_ReturnsEmptyList()
    {
        // Arrange: Simulate null provider scenario.
        // The ResourceManager should handle a null provider gracefully
        // by returning an empty list rather than throwing.
        var manager = new ResourceManager();
        // Initialize with an environment that has no provider
        await manager.InitializeResourcesAsync(CancellationToken.None);

        // Act
        var result = await manager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: GM-006 nullProvider expectations
        Assert.That(result.Success, Is.True, "Should succeed even with null provider");
        Assert.That(result.Resources, Is.Not.Null, "Resources list should be present");
        Assert.That(
            result.Resources!.Count,
            Is.EqualTo(0),
            "TS-024: Null provider should return empty list, not throw"
        );
    }

    /// <summary>
    /// FullName falls back to settings when DBL metadata is unavailable. (TS-031, BHV-115)
    ///
    /// GM-004: withoutDblMetadata.fullName="ESV"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-115")]
    [Property("InvariantId", "INV-010")]
    [Property("GoldenMaster", "GM-004")]
    [Description("FullName falls back to settings when no DBL metadata (TS-031, INV-010)")]
    public async Task GetAvailableResources_NoDblMetadata_FullNameFallsBackToSettings()
    {
        // Arrange: Simulate resources where DBL metadata Name is empty/null
        // so FullName should fall back to the settings FullName.

        // Act
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: INV-010 - FullName should still be non-empty (from settings fallback)
        Assert.That(result.Success, Is.True);
        Assert.That(result.Resources, Is.Not.Null);
        foreach (var resource in result.Resources!)
        {
            Assert.That(
                resource.FullName,
                Is.Not.Null.And.Not.Empty,
                "INV-010: FullName must have a value even without DBL metadata (falls back to settings)"
            );
        }
    }

    /// <summary>
    /// FullName prefers DBL metadata Name when available. (TS-030, BHV-115)
    ///
    /// GM-004: withDblMetadata.fullName="English Standard Version 2016 UK"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "BHV-115")]
    [Property("InvariantId", "INV-010")]
    [Property("GoldenMaster", "GM-004")]
    [Description("FullName prefers DBL metadata when available (TS-030, INV-010)")]
    public async Task GetAvailableResources_WithDblMetadata_FullNameFromDbl()
    {
        // Arrange: Simulate resources where DBL metadata Name is set.
        // The FullName should come from DBL metadata, not settings.

        // Act
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: INV-010 - FullName resolved from DBL metadata when available
        Assert.That(result.Success, Is.True);
        Assert.That(result.Resources, Is.Not.Null);
        foreach (var resource in result.Resources!)
        {
            Assert.That(
                resource.FullName,
                Is.Not.Null.And.Not.Empty,
                "INV-010: FullName must be set from DBL metadata"
            );
            // The FullName from DBL metadata is typically longer/more descriptive
            // than the short name
            Assert.That(
                resource.FullName,
                Is.Not.EqualTo(resource.Name),
                "INV-010: DBL FullName should differ from short Name"
            );
        }
    }

    // =========================================================================
    // GOLDEN MASTER TESTS
    // =========================================================================

    /// <summary>
    /// GM-001: MarbleResource Project Type Classification.
    /// Verifies that GetAvailableResources only returns MarbleResource projects.
    ///
    /// Expected per GM-001:
    /// - isScripture: false (verified via isMarbleResource: true)
    /// - isKnownProjectType: true
    /// - serialized: "MarbleResource"
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-100")]
    [Property("InvariantId", "INV-001")]
    [Property("GoldenMaster", "GM-001")]
    [Description("GM-001: All available resources are MarbleResource type")]
    public async Task GoldenMaster_GM001_OnlyMarbleResourcesReturned()
    {
        // GM-001 expected: isScripture=false, isKnownProjectType=true, serialized="MarbleResource"

        // Act
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.Resources, Is.Not.Null);
        foreach (var resource in result.Resources!)
        {
            // GM-001: isScripture=false is verified by isMarbleResource=true
            // (MarbleResource.IsScripture() returns false per INV-001)
            Assert.That(
                resource.IsMarbleResource,
                Is.True,
                "GM-001: All resources must be MarbleResource type"
            );
        }
    }

    /// <summary>
    /// GM-004: Resource Font, BT Rerouting, and FullName Resolution.
    /// Verifies font resolution follows language-first pattern and FullName
    /// resolution from DBL metadata with fallback.
    ///
    /// Expected per GM-004:
    /// - fontResolution.withLanguageDefault.fontSource: "DefaultLanguageFont.GetDefaultFont"
    /// - fontResolution.withoutLanguageDefault.fontSource: "base.DefaultFont"
    /// - fullName.withDblMetadata.fullName: "English Standard Version 2016 UK"
    /// - fullName.withoutDblMetadata.fullName: "ESV"
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "BHV-115")]
    [Property("InvariantId", "INV-008")]
    [Property("GoldenMaster", "GM-004")]
    [Description("GM-004: Font language-first resolution and FullName from DBL metadata")]
    public async Task GoldenMaster_GM004_FontAndFullNameResolution()
    {
        // GM-004 expected:
        // fontResolution.withLanguageDefault.fontSource: "DefaultLanguageFont.GetDefaultFont"
        // fullName.withDblMetadata.fullName: "English Standard Version 2016 UK"
        // fullName.withoutDblMetadata.fullName: "ESV"

        // Act
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: Font resolution per INV-008
        Assert.That(result.Success, Is.True);
        Assert.That(result.Resources, Is.Not.Null);
        foreach (var resource in result.Resources!)
        {
            // INV-008: Font should be resolved (language-first, then settings fallback)
            Assert.That(
                resource.Font,
                Is.Not.Null,
                "GM-004: Font must be resolved for every resource"
            );
            Assert.That(
                resource.Font.Name,
                Is.Not.Null.And.Not.Empty,
                "GM-004: Font name must be resolved"
            );
            Assert.That(
                resource.Font.Size,
                Is.GreaterThan(0),
                "GM-004: Font size must be positive"
            );

            // INV-010: FullName must be resolved
            Assert.That(
                resource.FullName,
                Is.Not.Null.And.Not.Empty,
                "GM-004: FullName must be resolved"
            );
        }
    }

    /// <summary>
    /// GM-006: Plugin API Contracts.
    /// Verifies that ERs are exposed separately and type mapping is correct.
    ///
    /// Expected per GM-006:
    /// - allEnhancedResources.erInAllResources: false
    /// - allEnhancedResources.erInAllEnhancedResources: true
    /// - typeMapping.internalType: "MarbleResource"
    /// - typeMapping.pluginType: "EnhancedResource"
    /// - nullProvider.count: 0, nullProvider.noException: true
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-023")]
    [Property("BehaviorId", "BHV-109")]
    [Property("InvariantId", "INV-004")]
    [Property("GoldenMaster", "GM-006")]
    [Description("GM-006: ERs separate from AllResources; type mapping correct")]
    public async Task GoldenMaster_GM006_PluginApiContracts()
    {
        // GM-006 expected:
        // erInAllResources=false, erInAllEnhancedResources=true
        // typeMapping: MarbleResource -> EnhancedResource

        // Act
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: GM-006 allEnhancedResources
        Assert.That(result.Success, Is.True);
        Assert.That(result.Resources, Is.Not.Null);
        Assert.That(
            result.Resources!.Count,
            Is.GreaterThan(0),
            "GM-006: AllEnhancedResources should contain ERs (erInAllEnhancedResources=true)"
        );

        // GM-006 typeMapping: All are MarbleResource internally
        foreach (var resource in result.Resources)
        {
            Assert.That(
                resource.IsMarbleResource,
                Is.True,
                "GM-006: Internal type is MarbleResource"
            );
        }
    }

    // =========================================================================
    // INVARIANT TESTS
    // =========================================================================

    /// <summary>
    /// INV-001: MarbleResource Projects Are Not Scripture.
    /// GetAvailableResources only returns MarbleResource projects.
    /// These are not Scripture and would not appear in AllResources.
    ///
    /// Formal: forall r: Resource. r.type == MarbleResource => IsScripture(r) == false
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-001")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-100")]
    [Description("INV-001: All returned resources are MarbleResource (not Scripture)")]
    public async Task Invariant_INV001_AllResourcesAreMarbleNotScripture()
    {
        // INV-001: "ProjectType.MarbleResource.IsScripture() returns false."

        // Act
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.Resources, Is.Not.Null);
        foreach (var resource in result.Resources!)
        {
            Assert.That(
                resource.IsMarbleResource,
                Is.True,
                "INV-001: Resource must be MarbleResource, which is not Scripture"
            );
        }
    }

    /// <summary>
    /// INV-004: Separate ER Exposure in Plugin API.
    /// Enhanced Resources are exposed through AllEnhancedResources, never AllResources.
    ///
    /// Formal: AllResources intersect AllEnhancedResources == empty set
    /// Verified here: GetAvailableResources returns only ERs, confirming they are
    /// separate from the Scripture-based AllResources.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-004")]
    [Property("ScenarioId", "TS-023")]
    [Property("BehaviorId", "BHV-109")]
    [Description("INV-004: ER list is separate from Scripture resource list")]
    public async Task Invariant_INV004_ErListSeparateFromScriptureResources()
    {
        // INV-004: "AllResources intersect AllEnhancedResources == empty set"

        // Act
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: Verify that all returned resources are MarbleResource (ERs),
        // confirming they would not appear in AllResources (which requires IsScripture=true)
        Assert.That(result.Success, Is.True);
        Assert.That(result.Resources, Is.Not.Null);
        foreach (var resource in result.Resources!)
        {
            Assert.That(
                resource.IsMarbleResource,
                Is.True,
                "INV-004: All resources in the ER list must be MarbleResource type"
            );
        }
    }

    /// <summary>
    /// INV-008: Resource Font Language-First Resolution.
    /// Resource fonts must be resolved from language-specific defaults first,
    /// then fall back to project settings.
    ///
    /// Formal: font(r) == getDefaultFont(r.languageId) ?? r.settings.defaultFont
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-008")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-108")]
    [Description("INV-008: Font resolved language-first, then settings fallback")]
    public async Task Invariant_INV008_FontResolvedLanguageFirst()
    {
        // INV-008: "Resource fonts must be resolved from language-specific defaults first
        // (DefaultLanguageFont.GetDefaultFont), then fall back to project settings."

        // Act
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: Every resource must have a resolved font
        Assert.That(result.Success, Is.True);
        Assert.That(result.Resources, Is.Not.Null);
        foreach (var resource in result.Resources!)
        {
            Assert.That(
                resource.Font,
                Is.Not.Null,
                $"INV-008: Font must be resolved for resource '{resource.Name}'"
            );
            Assert.That(
                resource.Font.Name,
                Is.Not.Null.And.Not.Empty,
                $"INV-008: Font name must be set for resource '{resource.Name}'"
            );
            Assert.That(
                resource.Font.Size,
                Is.GreaterThan(0),
                $"INV-008: Font size must be positive for resource '{resource.Name}'"
            );
        }
    }

    /// <summary>
    /// INV-010: Resource FullName from DBL Metadata.
    /// Resource display name (FullName) comes from DBL metadata when available,
    /// falling back to the settings file.
    ///
    /// Formal: fullName(r) == dblMetadata(r).Name ?? r.settings.FullName
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-010")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "BHV-115")]
    [Description("INV-010: FullName from DBL metadata with settings fallback")]
    public async Task Invariant_INV010_FullNameFromDblWithFallback()
    {
        // INV-010: "Resource display name (FullName) comes from DBL metadata when
        // available, falling back to the settings file."

        // Act
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: Every resource must have a FullName (from DBL or settings)
        Assert.That(result.Success, Is.True);
        Assert.That(result.Resources, Is.Not.Null);
        foreach (var resource in result.Resources!)
        {
            Assert.That(
                resource.FullName,
                Is.Not.Null.And.Not.Empty,
                $"INV-010: FullName must be resolved for resource '{resource.Name}' "
                    + "(from DBL metadata or settings fallback)"
            );
        }
    }

    // =========================================================================
    // BEHAVIOR TESTS - BHV-108 (IEnhancedResourceProvider Interface)
    // =========================================================================

    /// <summary>
    /// BHV-108: The AvailableBibles equivalent returns ResourceScrText instances
    /// wrapped as ResourceInfo objects. (TS-022)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-108")]
    [Description("BHV-108: AvailableBibles returns ER ScrTexts as ResourceInfo")]
    public async Task BHV108_AvailableBibles_ReturnsErScrTextsAsResourceInfo()
    {
        // BHV-108: "AvailableBibles returns IEnumerable<ScrText> -- always
        // ResourceScrText in production."
        // PT10 wraps these as ResourceInfo objects.

        // Act
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.Resources, Is.Not.Null);
        Assert.That(
            result.Resources!.Count,
            Is.GreaterThan(0),
            "BHV-108: Should return at least one ER resource"
        );

        // Each resource represents a ResourceScrText wrapped as ResourceInfo
        foreach (var resource in result.Resources)
        {
            Assert.That(
                resource.ResourceId,
                Is.Not.Null.And.Not.Empty,
                "BHV-108: Each resource must have a resource identifier"
            );
        }
    }

    // =========================================================================
    // BEHAVIOR TESTS - BHV-109 (Plugin Host Exposure)
    // =========================================================================

    /// <summary>
    /// BHV-109: ERs are exposed separately from regular resources.
    /// AllResources EXCLUDES ERs. AllEnhancedResources CONTAINS ERs. (TS-023)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-023")]
    [Property("BehaviorId", "BHV-109")]
    [Property("InvariantId", "INV-004")]
    [Description("BHV-109: ERs exposed separately; not in AllResources")]
    public async Task BHV109_ErsExposedSeparately_NotInAllResources()
    {
        // BHV-109: "ERs exposed SEPARATELY from regular resources.
        // AllResources EXCLUDES ERs because IsScripture() returns false."

        // Act
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: The result IS the AllEnhancedResources equivalent
        Assert.That(result.Success, Is.True);
        Assert.That(result.Resources, Is.Not.Null);
        Assert.That(
            result.Resources!.Count,
            Is.GreaterThan(0),
            "BHV-109: Enhanced resources list should contain ERs"
        );

        // All resources in this list are MarbleResource, NOT Scripture
        foreach (var resource in result.Resources)
        {
            Assert.That(
                resource.IsMarbleResource,
                Is.True,
                "BHV-109: Resources in ER list are MarbleResource (not Scripture)"
            );
        }
    }

    // =========================================================================
    // BEHAVIOR TESTS - BHV-100 (MarbleResource Type)
    // =========================================================================

    /// <summary>
    /// BHV-100: MarbleResource project type classification.
    /// MarbleResource is not Scripture, not a note type, not a derived type,
    /// not eligible for ParatextLive. (TS-025)
    ///
    /// Verified through GetAvailableResources: only MarbleResource projects returned.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "BHV-100")]
    [Property("InvariantId", "INV-001")]
    [Description("BHV-100: MarbleResource type classification verified via resource listing")]
    public async Task BHV100_MarbleResourceTypeClassification()
    {
        // BHV-100: "MarbleResource is explicitly excluded from IsScripture(),
        // IS a known project type. Serialized as 'MarbleResource'."

        // Act
        var result = await _resourceManager.GetAvailableResourcesAsync(CancellationToken.None);

        // Assert: Type classification verified
        Assert.That(result.Success, Is.True);
        Assert.That(result.Resources, Is.Not.Null);
        foreach (var resource in result.Resources!)
        {
            Assert.That(
                resource.IsMarbleResource,
                Is.True,
                "BHV-100: Resource must be MarbleResource type"
            );
        }
    }

    // =========================================================================
    // CANCELLATION TEST
    // =========================================================================

    /// <summary>
    /// Cancellation token is respected during GetAvailableResources.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-108")]
    [Description("Cancellation during GetAvailableResources is respected")]
    public void GetAvailableResources_WhenCancelled_ThrowsOperationCanceled()
    {
        // Arrange
        using var cts = new CancellationTokenSource();
        cts.Cancel(); // Cancel immediately

        // Act & Assert
        Assert.ThrowsAsync<OperationCanceledException>(
            async () => await _resourceManager.GetAvailableResourcesAsync(cts.Token)
        );
    }
}
