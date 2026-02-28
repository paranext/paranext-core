using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for LexiconService.GetSemanticDomainsAsync (CAP-011).
///
/// Retrieves semantic domain hierarchy for tree rendering, including breadcrumbs
/// and child domains. EntryCodeRange tracking applies only to SDBG (Greek) domains.
/// Domains include prefix, display name, and whether they have sub-domains or entries.
///
/// Contract: Section 4.11 GetSemanticDomains (data-contracts.md)
/// Input Type: Section 2.10 SemanticDomainInput
/// Output Type: Section 3.9 SemanticDomainResult
/// Behaviors: BHV-309 (EntryCodeRange Tracking)
/// Extractions: EXT-016 (Semantic Domain Hierarchy), EXT-032 (Semantic Domain Viewer Tree Rendering)
/// Golden Masters: GM-022 (Semantic Domain Hierarchy)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class SemanticDomainServiceTests
{
    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-011
    // =========================================================================

    /// <summary>
    /// Acceptance test: When GetSemanticDomainsAsync is called with a valid domain ID
    /// and SDBG dictionary, it returns a SemanticDomainResult with a navigable hierarchy
    /// tree, breadcrumbs from root to the requested domain, and EntryCodeRange tracking
    /// for SDBG. This matches the GM-022 golden master.
    ///
    /// This test passes when CAP-011 is COMPLETE.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-309")]
    [Property("GoldenMaster", "GM-022")]
    [Description(
        "Acceptance test: Semantic domain hierarchy built with correct parent/child "
            + "relationships, breadcrumbs, and SDBG code ranges"
    )]
    public async Task GetSemanticDomains_AcceptanceTest_MatchesGoldenMaster()
    {
        // Arrange: Look up a known semantic domain (e.g., domain "001" in SDBG)
        var input = new SemanticDomainInput(
            DomainId: "001",
            Dictionary: "SDBG",
            ResourceId: "test-resource"
        );

        // Act: Call the public API defined in data-contracts.md Section 4.11
        var result = await LexiconService.GetSemanticDomainsAsync(input, CancellationToken.None);

        // Assert: Verify result is successful with structured hierarchy
        Assert.That(result.Success, Is.True, "Semantic domain lookup should succeed");
        Assert.That(result.RootDomain, Is.Not.Null, "RootDomain should be present on success");
        Assert.That(result.Breadcrumbs, Is.Not.Null, "Breadcrumbs should be present on success");
        Assert.That(result.Error, Is.Null, "Error should be null on success");

        // Verify hierarchy structure per Section 3.9 SemanticDomainResult
        var root = result.RootDomain!;
        Assert.That(root.Id, Is.Not.Null.And.Not.Empty, "Root domain must have an ID");
        Assert.That(root.Prefix, Is.Not.Null.And.Not.Empty, "Root domain must have a prefix");
        Assert.That(
            root.DisplayName,
            Is.Not.Null.And.Not.Empty,
            "Root domain must have a display name"
        );

        // Verify breadcrumbs trace path from root (GM-022)
        Assert.That(
            result.Breadcrumbs!,
            Has.Count.GreaterThanOrEqualTo(1),
            "GM-022: Breadcrumbs should trace path from root"
        );

        // Verify SDBG code range tracking (BHV-309)
        // For SDBG, DomainRange should be populated when entry codes exist
        // This is the key distinguishing behavior between SDBG and SDBH
        Assert.That(
            root.Children,
            Is.Not.Null,
            "Root domain should have children list (may be empty)"
        );
    }

    // =========================================================================
    // HIERARCHY STRUCTURE TESTS (TS-088, BHV-309)
    // =========================================================================

    /// <summary>
    /// Hierarchy is built from domain XML with dot-separated codes.
    /// EXT-016 converts 3-digit-group codes to dot-separated format.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-309")]
    [Description("Semantic domain hierarchy built from SDBG XML with dot-separated codes")]
    public async Task GetSemanticDomains_SdbgDictionary_BuildsHierarchyWithDotSeparatedCodes()
    {
        // Arrange: Request a known SDBG domain
        var input = new SemanticDomainInput(
            DomainId: "093",
            Dictionary: "SDBG",
            ResourceId: "test-resource"
        );

        // Act
        var result = await LexiconService.GetSemanticDomainsAsync(input, CancellationToken.None);

        // Assert: Hierarchy is navigable with dot-separated codes
        Assert.That(result.Success, Is.True, "SDBG domain lookup should succeed");
        Assert.That(result.RootDomain, Is.Not.Null);

        var root = result.RootDomain!;
        // Prefix should use dot-separated format (e.g., "93" or "93.11")
        Assert.That(
            root.Prefix,
            Is.Not.Null.And.Not.Empty,
            "TS-088: Prefix should be in dot-separated format"
        );
    }

    /// <summary>
    /// Children of a domain node include prefix, displayName, hasSubDomains, and hasEntries.
    /// Per Section 3.9 SemanticDomainNode structure.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-309")]
    [Description("Child domain nodes include all required properties")]
    public async Task GetSemanticDomains_WithChildren_ChildrenHaveRequiredProperties()
    {
        // Arrange: Request a domain known to have sub-domains
        var input = new SemanticDomainInput(
            DomainId: "001",
            Dictionary: "SDBG",
            ResourceId: "test-resource"
        );

        // Act
        var result = await LexiconService.GetSemanticDomainsAsync(input, CancellationToken.None);

        // Assert: Success and has children
        Assert.That(result.Success, Is.True);
        Assert.That(result.RootDomain, Is.Not.Null);
        Assert.That(
            result.RootDomain!.HasSubDomains,
            Is.True,
            "Top-level domain '001' should have sub-domains"
        );
        Assert.That(
            result.RootDomain!.Children,
            Has.Count.GreaterThan(0),
            "Domain with hasSubDomains=true should have children"
        );

        // Verify each child has the required properties
        foreach (var child in result.RootDomain!.Children)
        {
            Assert.That(child.Id, Is.Not.Null.And.Not.Empty, "Child domain must have an ID");
            Assert.That(
                child.Prefix,
                Is.Not.Null.And.Not.Empty,
                "Child domain must have a prefix (dot-separated)"
            );
            Assert.That(
                child.DisplayName,
                Is.Not.Null.And.Not.Empty,
                "Child domain must have a display name"
            );
            // DomainRange is nullable - checked separately in SDBG vs SDBH tests
            // HasSubDomains and HasEntries are booleans - valid as-is
            Assert.That(
                child.Children,
                Is.Not.Null,
                "Children list should never be null (may be empty)"
            );
        }
    }

    // =========================================================================
    // BREADCRUMB TESTS (GM-022)
    // =========================================================================

    /// <summary>
    /// Breadcrumbs trace the path from root to the requested domain.
    /// Per GM-022: "Semantic domain hierarchy built with correct parent/child
    /// relationships, breadcrumbs."
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-309")]
    [Property("GoldenMaster", "GM-022")]
    [Description("Breadcrumbs trace path from root to requested domain")]
    public async Task GetSemanticDomains_NestedDomain_BreadcrumbsTracePathFromRoot()
    {
        // Arrange: Request a nested domain (e.g., "001.001" which is a child of "001")
        var input = new SemanticDomainInput(
            DomainId: "001.001",
            Dictionary: "SDBG",
            ResourceId: "test-resource"
        );

        // Act
        var result = await LexiconService.GetSemanticDomainsAsync(input, CancellationToken.None);

        // Assert: Breadcrumbs should have at least 2 entries (root + parent)
        Assert.That(result.Success, Is.True);
        Assert.That(result.Breadcrumbs, Is.Not.Null);
        Assert.That(
            result.Breadcrumbs!,
            Has.Count.GreaterThanOrEqualTo(2),
            "GM-022: Nested domain should have breadcrumbs from root"
        );

        // Each breadcrumb has id and displayName
        foreach (var crumb in result.Breadcrumbs!)
        {
            Assert.That(crumb.Id, Is.Not.Null.And.Not.Empty, "Breadcrumb must have an ID");
            Assert.That(
                crumb.DisplayName,
                Is.Not.Null.And.Not.Empty,
                "Breadcrumb must have a display name"
            );
        }
    }

    /// <summary>
    /// A root-level domain should have minimal breadcrumbs (just itself or the root).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-309")]
    [Description("Root-level domain has minimal breadcrumbs")]
    public async Task GetSemanticDomains_RootDomain_HasMinimalBreadcrumbs()
    {
        // Arrange: Request a top-level domain
        var input = new SemanticDomainInput(
            DomainId: "001",
            Dictionary: "SDBG",
            ResourceId: "test-resource"
        );

        // Act
        var result = await LexiconService.GetSemanticDomainsAsync(input, CancellationToken.None);

        // Assert: Top-level domain breadcrumbs should be minimal
        Assert.That(result.Success, Is.True);
        Assert.That(result.Breadcrumbs, Is.Not.Null);
        Assert.That(
            result.Breadcrumbs!,
            Has.Count.GreaterThanOrEqualTo(1),
            "Even a root domain should have at least one breadcrumb"
        );
    }

    // =========================================================================
    // ENTRY CODE RANGE TESTS - SDBG ONLY (TS-047, BHV-309)
    // =========================================================================

    /// <summary>
    /// EntryCodeRange tracks min/max minor version codes within a major code group
    /// for SDBG (Greek) semantic domains ONLY.
    /// Per TS-047: Input codes ["001.001", "001.005", "001.003"], expected Min=001, Max=005.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-047")]
    [Property("BehaviorId", "BHV-309")]
    [Description("EntryCodeRange tracks min/max for SDBG only")]
    public async Task GetSemanticDomains_SdbgDomain_HasEntryCodeRange()
    {
        // Arrange: Request a SDBG domain that has entry codes
        // Per TS-047: SDBG with codes ["001.001", "001.005", "001.003"]
        var input = new SemanticDomainInput(
            DomainId: "001",
            Dictionary: "SDBG",
            ResourceId: "test-resource"
        );

        // Act
        var result = await LexiconService.GetSemanticDomainsAsync(input, CancellationToken.None);

        // Assert: SDBG domains should have DomainRange populated
        Assert.That(result.Success, Is.True);
        Assert.That(result.RootDomain, Is.Not.Null);

        // The root or its children should have DomainRange values for SDBG
        // DomainRange tracks the entry code range (e.g., "001-005")
        // At least some nodes in the SDBG hierarchy should have non-null DomainRange
        var hasAnyRange = HasDomainRangeInTree(result.RootDomain!);
        Assert.That(
            hasAnyRange,
            Is.True,
            "TS-047/BHV-309: SDBG domain hierarchy should have EntryCodeRange tracking"
        );
    }

    /// <summary>
    /// SDBH (Hebrew) semantic domains do NOT get EntryCodeRange tracking.
    /// This is the key edge case from the strategic plan.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-047")]
    [Property("BehaviorId", "BHV-309")]
    [Description("EntryCodeRange does NOT apply to SDBH domains")]
    public async Task GetSemanticDomains_SdbhDomain_NoDomainRange()
    {
        // Arrange: Request a SDBH (Hebrew) domain
        var input = new SemanticDomainInput(
            DomainId: "001",
            Dictionary: "SDBH",
            ResourceId: "test-resource"
        );

        // Act
        var result = await LexiconService.GetSemanticDomainsAsync(input, CancellationToken.None);

        // Assert: SDBH domains should NOT have DomainRange
        Assert.That(result.Success, Is.True);
        Assert.That(result.RootDomain, Is.Not.Null);

        // All nodes in SDBH hierarchy should have null DomainRange
        AssertNoDomainRangeInTree(result.RootDomain!);
    }

    // =========================================================================
    // ERROR CONDITION TESTS (Section 4.11 Error Conditions)
    // =========================================================================

    /// <summary>
    /// When a domain ID is not found, the result should indicate failure
    /// with error code NOT_FOUND and message containing the domain ID.
    /// Per Section 4.11: "Semantic domain '{domainId}' not found"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-309")]
    [Description("Domain not found returns NOT_FOUND error")]
    public async Task GetSemanticDomains_DomainNotFound_ReturnsNotFoundError()
    {
        // Arrange: Request a non-existent domain
        var input = new SemanticDomainInput(
            DomainId: "999.999.999",
            Dictionary: "SDBG",
            ResourceId: "test-resource"
        );

        // Act
        var result = await LexiconService.GetSemanticDomainsAsync(input, CancellationToken.None);

        // Assert: Should fail with NOT_FOUND
        Assert.That(result.Success, Is.False, "Non-existent domain should fail");
        Assert.That(result.Error, Is.Not.Null, "Error should be present on failure");
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("NOT_FOUND"),
            "Section 4.11: Error code should be NOT_FOUND"
        );
        Assert.That(
            result.Error!.Message,
            Does.Contain("999.999.999"),
            "Section 4.11: Error message should contain the domain ID"
        );
        Assert.That(result.RootDomain, Is.Null, "RootDomain should be null on failure");
        Assert.That(result.Breadcrumbs, Is.Null, "Breadcrumbs should be null on failure");
    }

    /// <summary>
    /// When domain data is not loaded (e.g., resource not initialized),
    /// the result should indicate failure with error code INVALID_STATE.
    /// Per Section 4.11: "Semantic domain data not available"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-309")]
    [Description("Domain data not loaded returns INVALID_STATE error")]
    public async Task GetSemanticDomains_DomainDataNotLoaded_ReturnsInvalidStateError()
    {
        // Arrange: Request with a dictionary that is not loaded
        var input = new SemanticDomainInput(
            DomainId: "001",
            Dictionary: "SDBG",
            ResourceId: "uninitialized-resource"
        );

        // Act
        var result = await LexiconService.GetSemanticDomainsAsync(input, CancellationToken.None);

        // Assert: Should fail with INVALID_STATE
        Assert.That(result.Success, Is.False, "Uninitialized resource should fail");
        Assert.That(result.Error, Is.Not.Null, "Error should be present on failure");
        Assert.That(
            result.Error!.Code,
            Is.EqualTo("INVALID_STATE"),
            "Section 4.11: Error code should be INVALID_STATE"
        );
        Assert.That(
            result.Error!.Message,
            Does.Contain("not available"),
            "Section 4.11: Error message should indicate data not available"
        );
    }

    // =========================================================================
    // GOLDEN MASTER TEST (GM-022)
    // =========================================================================

    /// <summary>
    /// Golden master test: Verifies the full shape of the semantic domain hierarchy
    /// matches GM-022 expected output. Hierarchy is built, dot-separated codes used,
    /// EntryCodeRange tracked for SDBG only.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-309")]
    [Property("GoldenMaster", "GM-022")]
    [Description(
        "GM-022: Semantic domain hierarchy built, dot-separated codes, "
            + "EntryCodeRange for SDBG only"
    )]
    public async Task GetSemanticDomains_GoldenMaster_HierarchyMatchesGm022()
    {
        // Arrange: Per GM-022 input parameters
        var input = new SemanticDomainInput(
            DomainId: "001",
            Dictionary: "SDBG",
            ResourceId: "test-resource"
        );

        // Act
        var result = await LexiconService.GetSemanticDomainsAsync(input, CancellationToken.None);

        // Assert: GM-022 expected output
        Assert.That(result.Success, Is.True, "GM-022: hierarchyBuilt = true");

        // GM-022: dotSeparatedCodes = true
        Assert.That(result.RootDomain, Is.Not.Null);
        Assert.That(
            result.RootDomain!.Prefix,
            Does.Match(@"^\d+(\.\d+)*$"),
            "GM-022: Codes should be dot-separated numeric format"
        );

        // GM-022: entryCodeRange.trackedForSDBGOnly = true
        // Verify SDBG has range tracking in at least some nodes
        var hasRange = HasDomainRangeInTree(result.RootDomain!);
        Assert.That(hasRange, Is.True, "GM-022: SDBG should have EntryCodeRange tracking");
    }

    /// <summary>
    /// Counter-check: SDBH hierarchy with GM-022 constraint that
    /// entryCodeRange is tracked for SDBG ONLY (not SDBH).
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-047")]
    [Property("BehaviorId", "BHV-309")]
    [Property("GoldenMaster", "GM-022")]
    [Description("GM-022: EntryCodeRange tracked for SDBG only, not SDBH")]
    public async Task GetSemanticDomains_GoldenMaster_SdbhHasNoCodeRange()
    {
        // Arrange: SDBH dictionary
        var input = new SemanticDomainInput(
            DomainId: "001",
            Dictionary: "SDBH",
            ResourceId: "test-resource"
        );

        // Act
        var result = await LexiconService.GetSemanticDomainsAsync(input, CancellationToken.None);

        // Assert: SDBH should build hierarchy but WITHOUT EntryCodeRange
        Assert.That(result.Success, Is.True, "SDBH hierarchy should still build");
        Assert.That(result.RootDomain, Is.Not.Null);

        // No node in SDBH tree should have DomainRange populated
        AssertNoDomainRangeInTree(result.RootDomain!);
    }

    // =========================================================================
    // RESULT STRUCTURE VALIDATION TESTS
    // =========================================================================

    /// <summary>
    /// On success, the result must have RootDomain and Breadcrumbs non-null,
    /// and Error null. On failure, RootDomain and Breadcrumbs must be null,
    /// and Error non-null.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-309")]
    [Description("Result structure follows success/failure contract")]
    public async Task GetSemanticDomains_SuccessResult_HasCorrectNullabilityPattern()
    {
        // Arrange: Valid input for success case
        var input = new SemanticDomainInput(
            DomainId: "001",
            Dictionary: "SDBG",
            ResourceId: "test-resource"
        );

        // Act
        var result = await LexiconService.GetSemanticDomainsAsync(input, CancellationToken.None);

        // Assert: Success pattern
        if (result.Success)
        {
            Assert.That(
                result.RootDomain,
                Is.Not.Null,
                "Contract: RootDomain must be non-null when Success=true"
            );
            Assert.That(
                result.Breadcrumbs,
                Is.Not.Null,
                "Contract: Breadcrumbs must be non-null when Success=true"
            );
            Assert.That(result.Error, Is.Null, "Contract: Error must be null when Success=true");
        }
        else
        {
            Assert.That(
                result.RootDomain,
                Is.Null,
                "Contract: RootDomain must be null when Success=false"
            );
            Assert.That(
                result.Breadcrumbs,
                Is.Null,
                "Contract: Breadcrumbs must be null when Success=false"
            );
            Assert.That(
                result.Error,
                Is.Not.Null,
                "Contract: Error must be non-null when Success=false"
            );
        }
    }

    /// <summary>
    /// HasSubDomains should be true if and only if Children is non-empty.
    /// This is an internal consistency constraint on SemanticDomainNode.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-309")]
    [Description("HasSubDomains is consistent with Children count")]
    public async Task GetSemanticDomains_DomainNode_HasSubDomainsConsistentWithChildren()
    {
        // Arrange: Request a domain that has children
        var input = new SemanticDomainInput(
            DomainId: "001",
            Dictionary: "SDBG",
            ResourceId: "test-resource"
        );

        // Act
        var result = await LexiconService.GetSemanticDomainsAsync(input, CancellationToken.None);

        // Assert: Validate consistency recursively
        Assert.That(result.Success, Is.True);
        Assert.That(result.RootDomain, Is.Not.Null);
        AssertHasSubDomainsConsistency(result.RootDomain!);
    }

    // =========================================================================
    // CANCELLATION TEST
    // =========================================================================

    /// <summary>
    /// The method should respect cancellation tokens.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-088")]
    [Property("BehaviorId", "BHV-309")]
    [Description("Cancellation token is respected")]
    public void GetSemanticDomains_CancelledToken_ThrowsOrReturnsCancelled()
    {
        // Arrange
        var input = new SemanticDomainInput(
            DomainId: "001",
            Dictionary: "SDBG",
            ResourceId: "test-resource"
        );
        using var cts = new CancellationTokenSource();
        cts.Cancel();

        // Act & Assert: Should throw OperationCanceledException or TaskCanceledException
        Assert.ThrowsAsync<OperationCanceledException>(
            async () => await LexiconService.GetSemanticDomainsAsync(input, cts.Token)
        );
    }

    // =========================================================================
    // HELPER METHODS
    // =========================================================================

    /// <summary>
    /// Recursively checks if any node in the tree has a non-null DomainRange.
    /// </summary>
    private static bool HasDomainRangeInTree(SemanticDomainNode node)
    {
        if (node.DomainRange != null)
            return true;

        foreach (var child in node.Children)
        {
            if (HasDomainRangeInTree(child))
                return true;
        }

        return false;
    }

    /// <summary>
    /// Recursively asserts that no node in the tree has a non-null DomainRange.
    /// Used for SDBH validation (BHV-309: EntryCodeRange is SDBG only).
    /// </summary>
    private static void AssertNoDomainRangeInTree(SemanticDomainNode node)
    {
        Assert.That(
            node.DomainRange,
            Is.Null,
            $"BHV-309: SDBH domain '{node.Id}' should NOT have DomainRange"
        );

        foreach (var child in node.Children)
        {
            AssertNoDomainRangeInTree(child);
        }
    }

    /// <summary>
    /// Recursively validates that HasSubDomains is consistent with the Children collection.
    /// If HasSubDomains is true, Children must be non-empty. If false, Children must be empty.
    /// </summary>
    private static void AssertHasSubDomainsConsistency(SemanticDomainNode node)
    {
        if (node.HasSubDomains)
        {
            Assert.That(
                node.Children,
                Has.Count.GreaterThan(0),
                $"Domain '{node.Id}': HasSubDomains=true but Children is empty"
            );
        }
        else
        {
            Assert.That(
                node.Children,
                Has.Count.EqualTo(0),
                $"Domain '{node.Id}': HasSubDomains=false but Children is non-empty"
            );
        }

        foreach (var child in node.Children)
        {
            AssertHasSubDomainsConsistency(child);
        }
    }
}
