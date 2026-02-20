// === TEST FILE: CAP-003 CreateOrActivateTextCollection ===
// TDD Phase: RED (tests should fail -- implementation does not exist yet)
// Capability: CAP-003 (CreateOrActivateTextCollection)
// Micro-Phase: BE-6 (Orchestration and Integration)
// Sources: PT9/Paratext/WindowCollection.cs:518-528 (single-text fallback),
//          PT9/Paratext/WindowCollection.cs:910-917 (duplicate detection),
//          PT9/Paratext/TextCollectionForm.cs:364-380 (eligibility filter)
// Dependencies: CAP-001 (FilterEligibleTexts), CAP-002 (AreEquivalent)
// Golden Masters: gm-010 (single-text fallback), gm-011 (duplicate detection)

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.TextCollection;
using Paratext.Data;

namespace TestParanextDataProvider.TextCollection;

/// <summary>
/// Tests for CAP-003: CreateOrActivateTextCollection
///
/// This is an Integration capability that orchestrates CAP-001 (FilterEligibleTexts)
/// and CAP-002 (AreEquivalent) to determine the correct outcome when a user requests
/// to open a Text Collection.
///
/// Three paths:
/// 1. Single text (1 projectId) => fallback to TextForm (BHV-606, INV-010, gm-010)
/// 2. Duplicate detection: same texts in same order => reuse existing TC (BHV-501, INV-009, gm-011)
/// 3. New creation: 2+ eligible texts, no duplicate => create new TC (BHV-500)
///
/// Error paths:
/// - Zero projectIds => INSUFFICIENT_TEXTS error
/// - All texts rejected by filter => INELIGIBLE_TEXT error
///
/// Source: PT9/Paratext/WindowCollection.cs:518-528 (fallback),
///         PT9/Paratext/WindowCollection.cs:910-917 (duplicate detection)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class TextCollectionIntegrationTests : PapiTestBase
{
    #region Acceptance Test

    /// <summary>
    /// OUTER ACCEPTANCE TEST: Full orchestration of CreateOrActivateTextCollection.
    /// Given 2+ valid project IDs, the method filters eligible texts, checks for
    /// existing equivalent TCs, and returns a success result with the created items.
    ///
    /// This is the "done signal" for CAP-003. When this passes, the capability is complete.
    ///
    /// Covers: gm-010 (single-text fallback path), gm-011 (duplicate detection path),
    /// BHV-500 (new TC creation), BHV-501 (duplicate reuse), BHV-606 (single fallback)
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-010,gm-011")]
    [Property("ScenarioId", "TS-069,TS-070,TS-071")]
    [Property("BehaviorId", "BHV-500,BHV-501,BHV-606")]
    public void CreateOrActivateTextCollection_FullOrchestration_HandlesAllPaths()
    {
        // Arrange: Create 3 eligible projects
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string id2 = project2.Guid.ToString();

        DummyScrText project3 = CreateDummyProject();
        ScrTextCollection.Add(project3, true);
        string id3 = project3.Guid.ToString();

        // Path 1: Single text => fallback (gm-010)
        var singleRequest = new TextCollectionCreateRequest(new List<string> { id1 });
        TextCollectionCreateResult singleResult =
            TextCollectionService.CreateOrActivateTextCollection(
                singleRequest,
                new List<IList<string>>()
            );
        Assert.That(singleResult.Fallback, Is.True, "Single text should fall back");
        Assert.That(singleResult.FallbackWindowType, Is.EqualTo("TextForm"));
        Assert.That(singleResult.FallbackProjectId, Is.EqualTo(id1));

        // Path 2: Two texts, no existing => new creation (BHV-500)
        var createRequest = new TextCollectionCreateRequest(new List<string> { id1, id2 });
        TextCollectionCreateResult createResult =
            TextCollectionService.CreateOrActivateTextCollection(
                createRequest,
                new List<IList<string>>()
            );
        Assert.That(createResult.Success, Is.True, "Should create new TC");
        Assert.That(createResult.Reused, Is.False, "Should not be reused");
        Assert.That(createResult.Items, Is.Not.Null);
        Assert.That(createResult.Items, Has.Count.EqualTo(2));

        // Path 3: Same texts, same order, existing TC => duplicate reuse (gm-011)
        var existingCollections = new List<IList<string>>
        {
            new List<string> { id1, id2 },
        };
        TextCollectionCreateResult reuseResult =
            TextCollectionService.CreateOrActivateTextCollection(
                createRequest,
                existingCollections
            );
        Assert.That(reuseResult.Success, Is.True, "Reuse should be success");
        Assert.That(reuseResult.Reused, Is.True, "Should detect duplicate and reuse");
    }

    #endregion

    #region Happy Path - Single Text Fallback (gm-010, BHV-606, INV-010)

    /// <summary>
    /// Opening 1 text as TextCollection silently falls back to TextForm.
    /// PT9 source: WindowCollection.cs:518-528 checks if (toOpen.Count > 1).
    /// Golden master: gm-010 (single-text fallback).
    /// INV-010: TC requires at least 2 selected texts.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-606,BHV-507")]
    [Property("InvariantId", "INV-010")]
    public void CreateOrActivateTextCollection_WithSingleText_ReturnsFallbackToTextForm()
    {
        // Arrange: One eligible project
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        var request = new TextCollectionCreateRequest(new List<string> { projectId });
        var existingCollections = new List<IList<string>>();

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(request, existingCollections);

        // Assert: Fallback to TextForm
        Assert.That(result.Fallback, Is.True, "Single text must fall back to TextForm");
        Assert.That(result.Success, Is.False, "Fallback is not a success result");
        Assert.That(
            result.FallbackWindowType,
            Is.EqualTo("TextForm"),
            "Must fall back to TextForm window type"
        );
        Assert.That(
            result.FallbackProjectId,
            Is.EqualTo(projectId),
            "Fallback must carry the single project ID"
        );
        Assert.That(result.Items, Is.Null, "No items in fallback result");
    }

    /// <summary>
    /// Verifies fallback includes the correct first project ID when the
    /// single text has been filtered (e.g., from a 2-text request where
    /// one was rejected).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-606")]
    [Property("InvariantId", "INV-010")]
    public void CreateOrActivateTextCollection_WithTwoTextsOneRejected_ReturnsFallbackForSurvivor()
    {
        // Arrange: One eligible project + one unresolvable
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string validId = project.Guid.ToString();
        string unresolvableId = "0000000000000000000000000000000000000000";

        var request = new TextCollectionCreateRequest(
            new List<string> { validId, unresolvableId }
        );
        var existingCollections = new List<IList<string>>();

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(request, existingCollections);

        // Assert: After filtering, only 1 text remains => fallback
        Assert.That(result.Fallback, Is.True, "Should fall back when only 1 text survives filter");
        Assert.That(result.FallbackWindowType, Is.EqualTo("TextForm"));
        Assert.That(result.FallbackProjectId, Is.EqualTo(validId));
    }

    #endregion

    #region Happy Path - Duplicate Detection (gm-011, BHV-501, INV-009)

    /// <summary>
    /// Opening same texts in same order reuses existing TC (MakeActive).
    /// No new window created for duplicate sets.
    /// Golden master: gm-011 (duplicate TC detection).
    /// INV-009: SequenceEqual comparison.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-011")]
    [Property("ScenarioId", "TS-070")]
    [Property("BehaviorId", "BHV-501")]
    [Property("InvariantId", "INV-009")]
    public void CreateOrActivateTextCollection_WithDuplicateTexts_ReusesExistingCollection()
    {
        // Arrange: Two eligible projects
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string id2 = project2.Guid.ToString();

        var request = new TextCollectionCreateRequest(new List<string> { id1, id2 });

        // Simulate existing TC with same texts in same order
        var existingCollections = new List<IList<string>>
        {
            new List<string> { id1, id2 },
        };

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(request, existingCollections);

        // Assert: Existing TC reused
        Assert.That(result.Success, Is.True, "Reuse is a success result");
        Assert.That(result.Reused, Is.True, "Must detect duplicate and reuse existing TC");
        Assert.That(result.Fallback, Is.False, "Not a fallback");
    }

    /// <summary>
    /// Same texts in different order creates a new TC (not reused).
    /// INV-009 is order-sensitive: [A,B] != [B,A].
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-500")]
    [Property("InvariantId", "INV-009")]
    public void CreateOrActivateTextCollection_WithSameTextsDifferentOrder_CreatesNewCollection()
    {
        // Arrange: Two eligible projects
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string id2 = project2.Guid.ToString();

        // Request with reversed order from existing
        var request = new TextCollectionCreateRequest(new List<string> { id2, id1 });

        // Existing TC has [id1, id2]
        var existingCollections = new List<IList<string>>
        {
            new List<string> { id1, id2 },
        };

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(request, existingCollections);

        // Assert: New TC created (order differs)
        Assert.That(result.Success, Is.True, "Should create new TC");
        Assert.That(result.Reused, Is.False, "Different order means not a duplicate (INV-009)");
        Assert.That(result.Items, Is.Not.Null);
        Assert.That(result.Items, Has.Count.EqualTo(2));
    }

    /// <summary>
    /// Different text set from existing TC creates a new TC.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-500")]
    public void CreateOrActivateTextCollection_WithDifferentTexts_CreatesNewCollection()
    {
        // Arrange: Three eligible projects
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string id2 = project2.Guid.ToString();

        DummyScrText project3 = CreateDummyProject();
        ScrTextCollection.Add(project3, true);
        string id3 = project3.Guid.ToString();

        // Request [id1, id3] vs existing [id1, id2]
        var request = new TextCollectionCreateRequest(new List<string> { id1, id3 });
        var existingCollections = new List<IList<string>>
        {
            new List<string> { id1, id2 },
        };

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(request, existingCollections);

        // Assert: New TC (different texts)
        Assert.That(result.Success, Is.True);
        Assert.That(result.Reused, Is.False);
        Assert.That(result.Items, Has.Count.EqualTo(2));
    }

    #endregion

    #region Happy Path - New TC Creation (BHV-500)

    /// <summary>
    /// Two or more eligible texts with no existing duplicate creates a new TC.
    /// BHV-500: standard creation path.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-500")]
    public void CreateOrActivateTextCollection_WithTwoEligibleTexts_CreatesNewTC()
    {
        // Arrange: Two eligible projects
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string id2 = project2.Guid.ToString();

        var request = new TextCollectionCreateRequest(new List<string> { id1, id2 });
        var existingCollections = new List<IList<string>>();

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(request, existingCollections);

        // Assert: New TC created
        Assert.That(result.Success, Is.True, "Should successfully create TC");
        Assert.That(result.Reused, Is.False, "No existing TCs to reuse");
        Assert.That(result.Fallback, Is.False, "Not a fallback");
        Assert.That(result.Items, Is.Not.Null, "Items must be populated");
        Assert.That(result.Items, Has.Count.EqualTo(2), "Two items in the new TC");
        Assert.That(result.Error, Is.Null, "No error on success");
    }

    /// <summary>
    /// Created items have default zoom of 1.0.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-500")]
    public void CreateOrActivateTextCollection_CreatedItems_HaveDefaultZoom()
    {
        // Arrange
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string id2 = project2.Guid.ToString();

        var request = new TextCollectionCreateRequest(new List<string> { id1, id2 });

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(
                request,
                new List<IList<string>>()
            );

        // Assert: All items have default zoom 1.0
        Assert.That(result.Items, Is.Not.Null);
        foreach (TextCollectionItem item in result.Items!)
        {
            Assert.That(item.Zoom, Is.EqualTo(1.0), $"Item {item.ScrTextName} must have zoom 1.0");
        }
    }

    /// <summary>
    /// Created items preserve the order of the request's projectIds.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-500")]
    public void CreateOrActivateTextCollection_CreatedItems_PreserveRequestOrder()
    {
        // Arrange: Three eligible projects
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string id2 = project2.Guid.ToString();

        DummyScrText project3 = CreateDummyProject();
        ScrTextCollection.Add(project3, true);
        string id3 = project3.Guid.ToString();

        var request = new TextCollectionCreateRequest(new List<string> { id3, id1, id2 });

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(
                request,
                new List<IList<string>>()
            );

        // Assert: Items in request order
        Assert.That(result.Items, Is.Not.Null);
        Assert.That(result.Items, Has.Count.EqualTo(3));
        Assert.That(result.Items![0].ScrTextId, Is.EqualTo(id3), "First item matches request order");
        Assert.That(
            result.Items[1].ScrTextId,
            Is.EqualTo(id1),
            "Second item matches request order"
        );
        Assert.That(result.Items[2].ScrTextId, Is.EqualTo(id2), "Third item matches request order");
    }

    /// <summary>
    /// Created items have populated ScrTextName from the project.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-500")]
    public void CreateOrActivateTextCollection_CreatedItems_HavePopulatedNames()
    {
        // Arrange
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string id2 = project2.Guid.ToString();

        var request = new TextCollectionCreateRequest(new List<string> { id1, id2 });

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(
                request,
                new List<IList<string>>()
            );

        // Assert: Names are populated (not null or empty)
        Assert.That(result.Items, Is.Not.Null);
        foreach (TextCollectionItem item in result.Items!)
        {
            Assert.That(
                item.ScrTextName,
                Is.Not.Null.And.Not.Empty,
                $"Item {item.ScrTextId} must have a populated name"
            );
        }
    }

    #endregion

    #region Error Cases

    /// <summary>
    /// Zero projectIds returns INSUFFICIENT_TEXTS error.
    /// data-contracts.md: "At least one project required"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-500")]
    public void CreateOrActivateTextCollection_WithZeroTexts_ReturnsInsufficientTextsError()
    {
        // Arrange
        var request = new TextCollectionCreateRequest(new List<string>());
        var existingCollections = new List<IList<string>>();

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(request, existingCollections);

        // Assert
        Assert.That(result.Success, Is.False);
        Assert.That(result.Fallback, Is.False, "Zero texts is an error, not a fallback");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo(TextCollectionErrorCodes.InsufficientTexts));
    }

    /// <summary>
    /// All texts rejected by filter returns INELIGIBLE_TEXT error.
    /// TS-032: If all proposed texts are ineligible, ScrTexts.Count == 0.
    /// BHV-500: If count==0 after SetTexts, form is closed and null returned.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-032")]
    [Property("BehaviorId", "BHV-500")]
    public void CreateOrActivateTextCollection_WithAllTextsRejected_ReturnsIneligibleTextError()
    {
        // Arrange: Only unresolvable project IDs (will be rejected by filter)
        string unresolvable1 = "0000000000000000000000000000000000000001";
        string unresolvable2 = "0000000000000000000000000000000000000002";

        var request = new TextCollectionCreateRequest(
            new List<string> { unresolvable1, unresolvable2 }
        );
        var existingCollections = new List<IList<string>>();

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(request, existingCollections);

        // Assert
        Assert.That(result.Success, Is.False);
        Assert.That(result.Fallback, Is.False, "All rejected is an error, not a fallback");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo(TextCollectionErrorCodes.IneligibleText));
    }

    /// <summary>
    /// Null request throws ArgumentNullException.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-500")]
    public void CreateOrActivateTextCollection_WithNullRequest_ThrowsArgumentNullException()
    {
        // Act & Assert
        Assert.That(
            () =>
                TextCollectionService.CreateOrActivateTextCollection(
                    null!,
                    new List<IList<string>>()
                ),
            Throws.TypeOf<ArgumentNullException>()
        );
    }

    /// <summary>
    /// Null existingCollectionIds throws ArgumentNullException.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-500")]
    public void CreateOrActivateTextCollection_WithNullExistingCollections_ThrowsArgumentNullException()
    {
        // Arrange
        var request = new TextCollectionCreateRequest(new List<string> { "id1", "id2" });

        // Act & Assert
        Assert.That(
            () => TextCollectionService.CreateOrActivateTextCollection(request, null!),
            Throws.TypeOf<ArgumentNullException>()
        );
    }

    #endregion

    #region Integration - Filtering and Duplicate Detection Together

    /// <summary>
    /// When some texts are rejected but 2+ survive, a new TC is created with only
    /// the surviving texts. The rejected texts are not in the result items.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-071,TS-032")]
    [Property("BehaviorId", "BHV-500")]
    public void CreateOrActivateTextCollection_WithSomeRejected_CreatesWithSurvivorsOnly()
    {
        // Arrange: Two eligible + one unresolvable
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string id2 = project2.Guid.ToString();

        string unresolvableId = "0000000000000000000000000000000000000000";

        var request = new TextCollectionCreateRequest(
            new List<string> { id1, unresolvableId, id2 }
        );

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(
                request,
                new List<IList<string>>()
            );

        // Assert: TC created with only 2 surviving texts
        Assert.That(result.Success, Is.True, "Should succeed with 2 surviving texts");
        Assert.That(result.Items, Is.Not.Null);
        Assert.That(result.Items, Has.Count.EqualTo(2), "Only eligible texts in result");
        Assert.That(
            result.Items!.Any(i => i.ScrTextId == unresolvableId),
            Is.False,
            "Rejected text must not be in items"
        );
    }

    /// <summary>
    /// Duplicate detection operates on filtered (surviving) text IDs, not raw request IDs.
    /// If after filtering, the surviving IDs match an existing TC, it should be reused.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-070")]
    [Property("BehaviorId", "BHV-501")]
    [Property("InvariantId", "INV-009")]
    public void CreateOrActivateTextCollection_DuplicateDetectionUsesFilteredIds()
    {
        // Arrange: Two eligible + one unresolvable
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string id2 = project2.Guid.ToString();

        string unresolvableId = "0000000000000000000000000000000000000000";

        // Request has 3 IDs, but after filtering only [id1, id2] survive
        var request = new TextCollectionCreateRequest(
            new List<string> { id1, unresolvableId, id2 }
        );

        // Existing TC has exactly [id1, id2]
        var existingCollections = new List<IList<string>>
        {
            new List<string> { id1, id2 },
        };

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(request, existingCollections);

        // Assert: Should detect duplicate using post-filter IDs
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.Reused,
            Is.True,
            "Duplicate detection should use filtered IDs, not raw request IDs"
        );
    }

    /// <summary>
    /// Multiple existing TCs: checks all for duplicates and reuses the first match.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-070")]
    [Property("BehaviorId", "BHV-501")]
    [Property("InvariantId", "INV-009")]
    public void CreateOrActivateTextCollection_MultipleExistingTCs_FindsCorrectDuplicate()
    {
        // Arrange: Three projects
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string id2 = project2.Guid.ToString();

        DummyScrText project3 = CreateDummyProject();
        ScrTextCollection.Add(project3, true);
        string id3 = project3.Guid.ToString();

        var request = new TextCollectionCreateRequest(new List<string> { id2, id3 });

        // Multiple existing TCs
        var existingCollections = new List<IList<string>>
        {
            new List<string> { id1, id2 }, // Not a match
            new List<string> { id2, id3 }, // Match!
            new List<string> { id1, id3 }, // Not a match
        };

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(request, existingCollections);

        // Assert: Should find the duplicate
        Assert.That(result.Success, Is.True);
        Assert.That(result.Reused, Is.True, "Should find matching TC in the list");
    }

    /// <summary>
    /// No existing TCs to compare against creates a new TC.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-500")]
    public void CreateOrActivateTextCollection_NoExistingTCs_CreatesNew()
    {
        // Arrange
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string id2 = project2.Guid.ToString();

        var request = new TextCollectionCreateRequest(new List<string> { id1, id2 });
        var existingCollections = new List<IList<string>>(); // Empty

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(request, existingCollections);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.Reused, Is.False);
    }

    #endregion

    #region Invariant Tests

    /// <summary>
    /// INV-010: A Text Collection requires at least 2 selected texts.
    /// Opening only 1 text falls back to TextForm.
    /// This is reflexive: single text always falls back regardless of content.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-003")]
    [Property("InvariantId", "INV-010")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-606")]
    public void Invariant_INV010_SingleTextAlwaysFallsBack()
    {
        // Arrange: Several different single-text cases
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        var singleTextRequest = new TextCollectionCreateRequest(
            new List<string> { projectId }
        );

        // Act & Assert: Single text always falls back
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(
                singleTextRequest,
                new List<IList<string>>()
            );
        Assert.That(result.Fallback, Is.True, "INV-010: Single text must always fall back");

        // Even with existing collections present, single text still falls back
        var existingCollections = new List<IList<string>>
        {
            new List<string> { projectId, "other-id" },
        };
        TextCollectionCreateResult result2 =
            TextCollectionService.CreateOrActivateTextCollection(
                singleTextRequest,
                existingCollections
            );
        Assert.That(
            result2.Fallback,
            Is.True,
            "INV-010: Single text falls back regardless of existing TCs"
        );
    }

    /// <summary>
    /// INV-009: Order-sensitive text collection equivalence.
    /// Verifies that CreateOrActivateTextCollection uses order-sensitive comparison
    /// for duplicate detection.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-003")]
    [Property("InvariantId", "INV-009")]
    [Property("ScenarioId", "TS-070,TS-071")]
    [Property("BehaviorId", "BHV-501,BHV-500")]
    public void Invariant_INV009_DuplicateDetectionIsOrderSensitive()
    {
        // Arrange: Two projects
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string id2 = project2.Guid.ToString();

        var existingCollections = new List<IList<string>>
        {
            new List<string> { id1, id2 },
        };

        // Same order => reuse
        var sameOrderRequest = new TextCollectionCreateRequest(new List<string> { id1, id2 });
        TextCollectionCreateResult sameOrderResult =
            TextCollectionService.CreateOrActivateTextCollection(
                sameOrderRequest,
                existingCollections
            );
        Assert.That(sameOrderResult.Reused, Is.True, "INV-009: Same order should be reused");

        // Different order => new TC
        var diffOrderRequest = new TextCollectionCreateRequest(new List<string> { id2, id1 });
        TextCollectionCreateResult diffOrderResult =
            TextCollectionService.CreateOrActivateTextCollection(
                diffOrderRequest,
                existingCollections
            );
        Assert.That(
            diffOrderResult.Reused,
            Is.False,
            "INV-009: Different order should NOT be reused"
        );
    }

    /// <summary>
    /// INV-009: Reflexive property -- a collection is equivalent to itself.
    /// Verifies that requesting the exact same texts as an existing TC always detects duplicate.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-003")]
    [Property("InvariantId", "INV-009")]
    [Property("ScenarioId", "TS-070")]
    [Property("BehaviorId", "BHV-501")]
    public void Invariant_INV009_ReflexiveEquivalence()
    {
        // Arrange
        DummyScrText project1 = CreateDummyProject();
        ScrTextCollection.Add(project1, true);
        string id1 = project1.Guid.ToString();

        DummyScrText project2 = CreateDummyProject();
        ScrTextCollection.Add(project2, true);
        string id2 = project2.Guid.ToString();

        DummyScrText project3 = CreateDummyProject();
        ScrTextCollection.Add(project3, true);
        string id3 = project3.Guid.ToString();

        var ids = new List<string> { id1, id2, id3 };
        var request = new TextCollectionCreateRequest(ids);
        var existingCollections = new List<IList<string>> { ids };

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(request, existingCollections);

        // Assert
        Assert.That(result.Reused, Is.True, "INV-009: Reflexive -- same list always matches");
    }

    #endregion

    #region Golden Master Tests

    /// <summary>
    /// Golden master gm-010: Single text fallback.
    /// Input: 1 text (NIV84). Expected: windowType=TextForm, textCollectionCreated=false.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-606,BHV-507")]
    [Property("InvariantId", "INV-010")]
    public void GoldenMaster_GM010_SingleTextFallback()
    {
        // Arrange: Single eligible text (simulating "NIV84" per gm-010)
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        var request = new TextCollectionCreateRequest(new List<string> { projectId });

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(
                request,
                new List<IList<string>>()
            );

        // Assert: Matches gm-010 expected output
        Assert.That(
            result.Fallback,
            Is.True,
            "gm-010: textCollectionCreated should be false (fallback)"
        );
        Assert.That(
            result.FallbackWindowType,
            Is.EqualTo("TextForm"),
            "gm-010: windowType should be TextForm"
        );
        Assert.That(result.Success, Is.False, "gm-010: Not a success (it is a fallback)");
    }

    /// <summary>
    /// Golden master gm-011: Duplicate TC detection.
    /// Input: Same texts [A,B,C] as existing TC. Expected: existingReused=true, newWindowCreated=false.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-011")]
    [Property("ScenarioId", "TS-070")]
    [Property("BehaviorId", "BHV-501")]
    [Property("InvariantId", "INV-009")]
    public void GoldenMaster_GM011_DuplicateTCDetection()
    {
        // Arrange: Three eligible texts (simulating [A,B,C] per gm-011)
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);
        string idA = projectA.Guid.ToString();

        DummyScrText projectB = CreateDummyProject();
        ScrTextCollection.Add(projectB, true);
        string idB = projectB.Guid.ToString();

        DummyScrText projectC = CreateDummyProject();
        ScrTextCollection.Add(projectC, true);
        string idC = projectC.Guid.ToString();

        var request = new TextCollectionCreateRequest(new List<string> { idA, idB, idC });

        // Simulate existing TC with same texts
        var existingCollections = new List<IList<string>>
        {
            new List<string> { idA, idB, idC },
        };

        // Act
        TextCollectionCreateResult result =
            TextCollectionService.CreateOrActivateTextCollection(request, existingCollections);

        // Assert: Matches gm-011 expected output
        Assert.That(
            result.Reused,
            Is.True,
            "gm-011: existingReused should be true"
        );
        Assert.That(
            result.Success,
            Is.True,
            "gm-011: Reuse is a success (existing TC activated)"
        );
    }

    #endregion

    #region Scroll Group Tests

    /// <summary>
    /// Default scroll group is ScrollGroup.A when not specified.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-500")]
    public void CreateOrActivateTextCollection_DefaultScrollGroup_IsA()
    {
        // Arrange
        var request = new TextCollectionCreateRequest(new List<string> { "id1", "id2" });

        // Assert: Default scroll group is A
        Assert.That(
            request.ScrollGroup,
            Is.EqualTo(ScrollGroup.A),
            "Default scroll group should be A"
        );
    }

    /// <summary>
    /// Custom scroll group is preserved in the request.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-500")]
    public void CreateOrActivateTextCollection_CustomScrollGroup_IsPreserved()
    {
        // Arrange
        var request = new TextCollectionCreateRequest(
            new List<string> { "id1", "id2" },
            ScrollGroup.C
        );

        // Assert
        Assert.That(request.ScrollGroup, Is.EqualTo(ScrollGroup.C));
    }

    #endregion
}
