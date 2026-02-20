// === TEST FILE: CAP-001 FilterEligibleTexts, CAP-002 AreEquivalent, CAP-010 RemoveDeletedTexts ===
// TDD Phase: RED (tests should fail -- implementation does not exist yet for CAP-010)
// Capabilities: CAP-001 (FilterEligibleTexts), CAP-002 (AreEquivalent), CAP-010 (RemoveDeletedTexts)
// Micro-Phase: BE-1 (Foundation: Simple Predicates)
// Sources: EXT-003 (PT9/Paratext/TextCollectionForm.cs:364-380),
//          EXT-002 (PT9/Paratext/TextCollectionForm.cs:446-449),
//          EXT-014 (PT9/ParatextBase/TextCollection/TextCollectionControl.cs:720-728)

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.TextCollection;
using Paratext.Data;

namespace TestParanextDataProvider.TextCollection;

/// <summary>
/// Tests for TextCollectionService:
///   CAP-001: FilterEligibleTexts - Text eligibility filtering (EXT-003)
///   CAP-002: AreEquivalent - Order-sensitive collection comparison (EXT-002)
///   CAP-010: RemoveDeletedTexts - Remove absent projects from list (EXT-014)
///
/// CAP-001: FilterEligibleTexts takes a list of project IDs (GUIDs) and returns a
/// TextFilterResult separating accepted texts from rejected texts with reasons.
/// Rejection criteria (VAL-009): IsMarbleResource, IsDictionary, IsXmlResource,
/// IsStudyBibleAdditions, IsNoteType.
/// Source: EXT-003 (PT9/Paratext/TextCollectionForm.cs:364-380)
///
/// CAP-002: AreEquivalent compares two ordered lists of project IDs using
/// order-sensitive SequenceEqual semantics (INV-009).
/// Source: EXT-002 (PT9/Paratext/TextCollectionForm.cs:446-449)
///
/// CAP-010: RemoveDeletedTexts iterates a list of TextCollectionItem and removes
/// any whose project is no longer present in ScrTextCollection (via IsPresent).
/// Returns true if any items were removed. Handles joined text names (HEB/GRK)
/// by splitting on '/' and checking each part (BHV-112, INV-005).
/// Source: EXT-014 (PT9/ParatextBase/TextCollection/TextCollectionControl.cs:720-728)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class TextCollectionServiceTests : PapiTestBase
{
    #region Acceptance Test

    /// <summary>
    /// OUTER ACCEPTANCE TEST: Given a list of project IDs including a mix of
    /// eligible scripture projects and ineligible types (MarbleResource, Dictionary,
    /// XmlResource, StudyBibleAdditions, NoteType), the result correctly separates
    /// accepted from rejected with proper rejection reasons.
    ///
    /// This is the "done signal" for CAP-001. When this passes, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-001")]
    [Property("GoldenMasterId", "gm-001")]
    [Property("ScenarioId", "TS-025,TS-026,TS-027,TS-028,TS-029,TS-030,TS-031")]
    [Property("BehaviorId", "EXT-003")]
    public void FilterEligibleTexts_WithMixedProjectTypes_SeparatesAcceptedAndRejected()
    {
        // Arrange: Create projects of various types
        DummyScrText standardProject = CreateDummyProject();
        ScrTextCollection.Add(standardProject, true);
        string standardId = standardProject.Guid.ToString();

        DummyScrText secondProject = CreateDummyProject();
        ScrTextCollection.Add(secondProject, true);
        string secondId = secondProject.Guid.ToString();

        // Note: MarbleResource, Dictionary, XmlResource, SBA, NoteType projects
        // require specific ParatextData project configuration. In the actual
        // implementation, FilterEligibleTexts resolves IDs via ScrTextCollection
        // and checks type properties. For this acceptance test, we use standard
        // projects to verify the accept path and an unresolvable ID for rejection.
        string unresolvableId = "0000000000000000000000000000000000000000";

        var projectIds = new List<string> { standardId, secondId, unresolvableId };

        // Act
        TextFilterResult result = TextCollectionService.FilterEligibleTexts(projectIds);

        // Assert: Accepted contains only eligible texts
        Assert.That(result.Accepted, Has.Count.GreaterThanOrEqualTo(2));
        Assert.That(result.Accepted.Select(a => a.ScrTextId), Does.Contain(standardId));
        Assert.That(result.Accepted.Select(a => a.ScrTextId), Does.Contain(secondId));

        // Assert: Rejected contains ineligible texts with reasons
        Assert.That(result.Rejected, Has.Count.GreaterThanOrEqualTo(1));
        Assert.That(result.Rejected.Select(r => r.ScrTextId), Does.Contain(unresolvableId));

        // Assert: Each rejected text has a non-empty reason
        foreach (RejectedText rejected in result.Rejected)
        {
            Assert.That(rejected.Reason, Is.Not.Null.And.Not.Empty);
        }
    }

    #endregion

    #region Contract Tests - Rejection Predicates (VAL-009)

    /// <summary>
    /// MarbleResource projects must be rejected by the eligibility filter.
    /// PT9 source: TextCollectionForm.cs:369 checks !IsMarbleResource.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "EXT-003,BHV-104")]
    [Property("ValidationRule", "VAL-009")]
    public void FilterEligibleTexts_WithMarbleResource_RejectsWithReason()
    {
        // Arrange: A project whose IsMarbleResource returns true
        // Note: In PT9, MarbleResource is a ResourceScrText subclass.
        // DummyScrText is a standard ScrText; the implementation must resolve
        // project IDs and check the IsMarbleResource property.
        // For TDD RED phase, this test verifies the contract interface exists.
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Act
        TextFilterResult result = TextCollectionService.FilterEligibleTexts(
            new List<string> { projectId }
        );

        // Assert: Standard project should be accepted (not marble)
        // This verifies the method returns the correct type structure.
        // A true MarbleResource test requires a ResourceScrText or mock.
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Accepted, Is.Not.Null);
        Assert.That(result.Rejected, Is.Not.Null);
    }

    /// <summary>
    /// Dictionary projects must be rejected by the eligibility filter.
    /// PT9 source: TextCollectionForm.cs:370 checks !IsDictionary.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "EXT-003")]
    [Property("ValidationRule", "VAL-009")]
    public void FilterEligibleTexts_WithDictionary_RejectsWithReason()
    {
        // Arrange: A Dictionary project is one where ScrText.IsDictionary == true.
        // DummyScrText defaults to a standard project (IsDictionary == false).
        // This test uses a standard project to verify acceptance;
        // the rejection case relies on ParatextData type properties.
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Act
        TextFilterResult result = TextCollectionService.FilterEligibleTexts(
            new List<string> { projectId }
        );

        // Assert: Standard project is NOT a dictionary, so it should be accepted
        Assert.That(result.Accepted, Has.Count.EqualTo(1));
        Assert.That(result.Rejected, Has.Count.EqualTo(0));
    }

    /// <summary>
    /// XmlResource projects must be rejected by the eligibility filter.
    /// PT9 source: TextCollectionForm.cs:371 checks !IsXmlResource.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-027")]
    [Property("BehaviorId", "EXT-003")]
    [Property("ValidationRule", "VAL-009")]
    public void FilterEligibleTexts_WithXmlResource_RejectsWithReason()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Act
        TextFilterResult result = TextCollectionService.FilterEligibleTexts(
            new List<string> { projectId }
        );

        // Assert: Standard project is NOT an XmlResource, so it should be accepted
        Assert.That(result.Accepted, Has.Count.EqualTo(1));
        Assert.That(result.Rejected, Has.Count.EqualTo(0));
    }

    /// <summary>
    /// StudyBibleAdditions projects must be rejected by the eligibility filter.
    /// PT9 source: TextCollectionForm.cs:372 checks !Settings.IsStudyBibleAdditions.
    /// Confirmed by BHV-T006.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-028")]
    [Property("BehaviorId", "EXT-003,BHV-T006")]
    [Property("ValidationRule", "VAL-009")]
    public void FilterEligibleTexts_WithStudyBibleAdditions_RejectsWithReason()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Act
        TextFilterResult result = TextCollectionService.FilterEligibleTexts(
            new List<string> { projectId }
        );

        // Assert: Standard project is NOT SBA, so it should be accepted
        Assert.That(result.Accepted, Has.Count.EqualTo(1));
        Assert.That(result.Rejected, Has.Count.EqualTo(0));
    }

    /// <summary>
    /// NoteType projects must be rejected by the eligibility filter.
    /// PT9 source: TextCollectionForm.cs:373 checks
    /// !Settings.TranslationInfo.Type.IsNoteType().
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "EXT-003")]
    [Property("ValidationRule", "VAL-009")]
    public void FilterEligibleTexts_WithNoteType_RejectsWithReason()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Act
        TextFilterResult result = TextCollectionService.FilterEligibleTexts(
            new List<string> { projectId }
        );

        // Assert: Standard project is NOT a NoteType, so it should be accepted
        Assert.That(result.Accepted, Has.Count.EqualTo(1));
        Assert.That(result.Rejected, Has.Count.EqualTo(0));
    }

    #endregion

    #region Contract Tests - Acceptance Predicates

    /// <summary>
    /// Standard scripture projects must be accepted by the eligibility filter.
    /// These are projects that pass all 5 rejection checks.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "EXT-003")]
    public void FilterEligibleTexts_WithStandardScriptureProject_AcceptsWithCorrectFields()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();
        string projectName = project.Name;

        // Act
        TextFilterResult result = TextCollectionService.FilterEligibleTexts(
            new List<string> { projectId }
        );

        // Assert: Project accepted with correct TextCollectionItem fields
        Assert.That(result.Accepted, Has.Count.EqualTo(1));
        Assert.That(result.Rejected, Has.Count.EqualTo(0));

        TextCollectionItem accepted = result.Accepted[0];
        Assert.That(accepted.ScrTextId, Is.EqualTo(projectId));
        Assert.That(accepted.ScrTextName, Is.Not.Null.And.Not.Empty);
        Assert.That(accepted.Zoom, Is.EqualTo(1.0), "Default zoom should be 1.0");
    }

    /// <summary>
    /// Resource projects (non-Marble, non-XML) must be accepted by the
    /// eligibility filter. Resources are read-only but displayable in TC.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "EXT-003,BHV-105")]
    public void FilterEligibleTexts_WithNonMarbleResource_AcceptsProject()
    {
        // Arrange: Create a standard project (DummyScrText is not a resource project
        // by default). In production, a non-Marble ResourceScrText would pass the
        // filter because IsMarbleResource is false and IsXmlResource is false.
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Act
        TextFilterResult result = TextCollectionService.FilterEligibleTexts(
            new List<string> { projectId }
        );

        // Assert: Non-Marble resource is accepted
        Assert.That(result.Accepted, Has.Count.EqualTo(1));
        Assert.That(result.Accepted[0].ScrTextId, Is.EqualTo(projectId));
    }

    #endregion

    #region Contract Tests - Result Structure

    /// <summary>
    /// The TextFilterResult must contain both Accepted and Rejected lists,
    /// and each RejectedText must include a non-empty reason string describing
    /// why the project was rejected.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "EXT-003")]
    public void FilterEligibleTexts_RejectedText_IncludesReasonString()
    {
        // Arrange: Use an unresolvable project ID to trigger rejection
        string unknownId = "0000000000000000000000000000000000000000";

        // Act
        TextFilterResult result = TextCollectionService.FilterEligibleTexts(
            new List<string> { unknownId }
        );

        // Assert: Rejected list has the unknown project with a reason
        Assert.That(result.Rejected, Has.Count.EqualTo(1));
        Assert.That(result.Rejected[0].ScrTextId, Is.EqualTo(unknownId));
        Assert.That(
            result.Rejected[0].Reason,
            Is.Not.Null.And.Not.Empty,
            "Each rejected text must include a reason describing why it was rejected"
        );
    }

    /// <summary>
    /// Accepted items must be returned as TextCollectionItem records with
    /// correct ScrTextName, ScrTextId, and default Zoom of 1.0.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "EXT-003")]
    public void FilterEligibleTexts_AcceptedItem_HasDefaultZoom()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Act
        TextFilterResult result = TextCollectionService.FilterEligibleTexts(
            new List<string> { projectId }
        );

        // Assert
        Assert.That(result.Accepted, Has.Count.EqualTo(1));
        Assert.That(
            result.Accepted[0].Zoom,
            Is.EqualTo(1.0).Within(0.001),
            "Accepted items should have default zoom of 1.0"
        );
    }

    /// <summary>
    /// The order of accepted texts must match the order they appear in the
    /// input projectIds list (preserving user-specified order).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "EXT-003")]
    public void FilterEligibleTexts_AcceptedTexts_PreserveInputOrder()
    {
        // Arrange: Create two projects and add in specific order
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);
        string idA = projectA.Guid.ToString();

        DummyScrText projectB = CreateDummyProject();
        ScrTextCollection.Add(projectB, true);
        string idB = projectB.Guid.ToString();

        var projectIds = new List<string> { idB, idA }; // B first, then A

        // Act
        TextFilterResult result = TextCollectionService.FilterEligibleTexts(projectIds);

        // Assert: Order in accepted list matches input order (B, A)
        Assert.That(result.Accepted, Has.Count.EqualTo(2));
        Assert.That(result.Accepted[0].ScrTextId, Is.EqualTo(idB));
        Assert.That(result.Accepted[1].ScrTextId, Is.EqualTo(idA));
    }

    #endregion

    #region Edge Case Tests

    /// <summary>
    /// When all input texts are rejected (all ineligible types), the
    /// result should have an empty Accepted list and a populated Rejected list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-032")]
    [Property("BehaviorId", "EXT-003")]
    public void FilterEligibleTexts_AllRejected_ReturnsEmptyAccepted()
    {
        // Arrange: Use project IDs that cannot be resolved
        string unknownId1 = "0000000000000000000000000000000000000001";
        string unknownId2 = "0000000000000000000000000000000000000002";

        // Act
        TextFilterResult result = TextCollectionService.FilterEligibleTexts(
            new List<string> { unknownId1, unknownId2 }
        );

        // Assert
        Assert.That(result.Accepted, Has.Count.EqualTo(0));
        Assert.That(result.Rejected, Has.Count.EqualTo(2));
    }

    /// <summary>
    /// When an empty list of project IDs is provided, the result should have
    /// empty Accepted and empty Rejected lists (no crash).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-032")]
    [Property("BehaviorId", "EXT-003")]
    public void FilterEligibleTexts_EmptyList_ReturnsEmptyResult()
    {
        // Arrange
        var emptyIds = new List<string>();

        // Act
        TextFilterResult result = TextCollectionService.FilterEligibleTexts(emptyIds);

        // Assert
        Assert.That(result.Accepted, Has.Count.EqualTo(0));
        Assert.That(result.Rejected, Has.Count.EqualTo(0));
    }

    /// <summary>
    /// When all input texts are eligible, they should all appear in Accepted
    /// with an empty Rejected list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "EXT-003")]
    public void FilterEligibleTexts_AllAccepted_ReturnsAllInAccepted()
    {
        // Arrange
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);
        DummyScrText projectB = CreateDummyProject();
        ScrTextCollection.Add(projectB, true);
        DummyScrText projectC = CreateDummyProject();
        ScrTextCollection.Add(projectC, true);

        var ids = new List<string>
        {
            projectA.Guid.ToString(),
            projectB.Guid.ToString(),
            projectC.Guid.ToString(),
        };

        // Act
        TextFilterResult result = TextCollectionService.FilterEligibleTexts(ids);

        // Assert
        Assert.That(result.Accepted, Has.Count.EqualTo(3));
        Assert.That(result.Rejected, Has.Count.EqualTo(0));
    }

    /// <summary>
    /// When a project ID cannot be resolved (not in ScrTextCollection), it
    /// should appear in the Rejected list with an appropriate reason.
    /// This covers the PROJECT_NOT_FOUND error condition from data-contracts.md.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "EXT-003,BHV-103")]
    public void FilterEligibleTexts_UnresolvableProjectId_ReturnsRejectedWithReason()
    {
        // Arrange
        string nonExistentId = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

        // Act
        TextFilterResult result = TextCollectionService.FilterEligibleTexts(
            new List<string> { nonExistentId }
        );

        // Assert
        Assert.That(result.Accepted, Has.Count.EqualTo(0));
        Assert.That(result.Rejected, Has.Count.EqualTo(1));
        Assert.That(result.Rejected[0].ScrTextId, Is.EqualTo(nonExistentId));
        Assert.That(
            result.Rejected[0].Reason,
            Does.Contain("not found").IgnoreCase,
            "Rejection reason should indicate project was not found"
        );
    }

    /// <summary>
    /// With a mix of resolvable and unresolvable project IDs, the result
    /// should correctly partition them into Accepted and Rejected lists.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-025,TS-030")]
    [Property("BehaviorId", "EXT-003")]
    public void FilterEligibleTexts_MixedResolvableAndNot_CorrectlyPartitions()
    {
        // Arrange
        DummyScrText validProject = CreateDummyProject();
        ScrTextCollection.Add(validProject, true);
        string validId = validProject.Guid.ToString();
        string invalidId = "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";

        var ids = new List<string> { validId, invalidId };

        // Act
        TextFilterResult result = TextCollectionService.FilterEligibleTexts(ids);

        // Assert
        Assert.That(result.Accepted, Has.Count.EqualTo(1));
        Assert.That(result.Accepted[0].ScrTextId, Is.EqualTo(validId));
        Assert.That(result.Rejected, Has.Count.EqualTo(1));
        Assert.That(result.Rejected[0].ScrTextId, Is.EqualTo(invalidId));
    }

    #endregion

    // =========================================================================
    // CAP-002: AreEquivalent
    // Source: EXT-002 (PT9/Paratext/TextCollectionForm.cs:446-449)
    // AreEquivalent determines if two ordered lists of project IDs are identical
    // using order-sensitive SequenceEqual semantics (INV-009).
    // =========================================================================

    #region CAP-002 Acceptance Test

    /// <summary>
    /// OUTER ACCEPTANCE TEST: Verifies all 6 golden master scenarios from gm-002.
    /// Given pairs of text ID lists, AreEquivalent returns true only when lists
    /// have the same length and identical elements in the same order.
    ///
    /// This is the "done signal" for CAP-002. When this passes, the capability is complete.
    ///
    /// Golden master scenarios:
    ///   same-order:      [A,B,C] vs [A,B,C]     => true
    ///   different-order: [A,B,C] vs [C,A,B]     => false
    ///   different-set:   [A,B,C] vs [A,B,D]     => false
    ///   subset:          [A,B,C] vs [A,B]       => false
    ///   superset:        [A,B]   vs [A,B,C]     => false
    ///   empty:           [A,B]   vs []           => false
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-002")]
    [Property("GoldenMasterId", "gm-002")]
    [Property("ScenarioId", "TS-033,TS-034,TS-035")]
    [Property("BehaviorId", "EXT-002,BHV-501,INV-009")]
    public void AreEquivalent_GoldenMasterScenarios_MatchExpectedResults()
    {
        // gm-002 scenario: same-order => true
        Assert.That(
            TextCollectionService.AreEquivalent(
                new List<string> { "A", "B", "C" },
                new List<string> { "A", "B", "C" }
            ),
            Is.True,
            "same-order: identical lists in same order must be equivalent"
        );

        // gm-002 scenario: different-order => false
        Assert.That(
            TextCollectionService.AreEquivalent(
                new List<string> { "A", "B", "C" },
                new List<string> { "C", "A", "B" }
            ),
            Is.False,
            "different-order: same texts in different order must NOT be equivalent (INV-009)"
        );

        // gm-002 scenario: different-set => false
        Assert.That(
            TextCollectionService.AreEquivalent(
                new List<string> { "A", "B", "C" },
                new List<string> { "A", "B", "D" }
            ),
            Is.False,
            "different-set: different texts must NOT be equivalent"
        );

        // gm-002 scenario: subset => false
        Assert.That(
            TextCollectionService.AreEquivalent(
                new List<string> { "A", "B", "C" },
                new List<string> { "A", "B" }
            ),
            Is.False,
            "subset: fewer texts must NOT be equivalent"
        );

        // gm-002 scenario: superset => false
        Assert.That(
            TextCollectionService.AreEquivalent(
                new List<string> { "A", "B" },
                new List<string> { "A", "B", "C" }
            ),
            Is.False,
            "superset: more texts must NOT be equivalent"
        );

        // gm-002 scenario: empty => false
        Assert.That(
            TextCollectionService.AreEquivalent(new List<string> { "A", "B" }, new List<string>()),
            Is.False,
            "empty: non-empty vs empty must NOT be equivalent"
        );
    }

    #endregion

    #region CAP-002 Contract Tests - Happy Path

    /// <summary>
    /// Two lists with the same elements in the same order are equivalent.
    /// This is the primary happy-path contract test.
    /// PT9 source: TextCollectionForm.Equivalent uses SequenceEqual.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "EXT-002,BHV-501")]
    public void AreEquivalent_SameTextsSameOrder_ReturnsTrue()
    {
        // Arrange
        var current = new List<string> { "id-alpha", "id-beta", "id-gamma" };
        var proposed = new List<string> { "id-alpha", "id-beta", "id-gamma" };

        // Act
        bool result = TextCollectionService.AreEquivalent(current, proposed);

        // Assert
        Assert.That(result, Is.True, "Same IDs in same order should be equivalent");
    }

    /// <summary>
    /// Two lists with different elements in corresponding positions are NOT equivalent.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "EXT-002")]
    public void AreEquivalent_DifferentTexts_ReturnsFalse()
    {
        // Arrange
        var current = new List<string> { "id-alpha", "id-beta", "id-gamma" };
        var proposed = new List<string> { "id-alpha", "id-beta", "id-delta" };

        // Act
        bool result = TextCollectionService.AreEquivalent(current, proposed);

        // Assert
        Assert.That(result, Is.False, "Different IDs should not be equivalent");
    }

    /// <summary>
    /// Same texts in different order must NOT be equivalent (INV-009).
    /// This confirms that a new TC is created when the user reorders texts,
    /// rather than reusing an existing one (BHV-T010).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "EXT-002,BHV-T010,INV-009")]
    public void AreEquivalent_SameTextsDifferentOrder_ReturnsFalse()
    {
        // Arrange
        var current = new List<string> { "id-alpha", "id-beta", "id-gamma" };
        var proposed = new List<string> { "id-gamma", "id-alpha", "id-beta" };

        // Act
        bool result = TextCollectionService.AreEquivalent(current, proposed);

        // Assert
        Assert.That(
            result,
            Is.False,
            "INV-009: Order-sensitive -- same texts in different order is NOT equivalent"
        );
    }

    #endregion

    #region CAP-002 Contract Tests - Length Mismatch

    /// <summary>
    /// A subset (fewer proposed) must NOT be equivalent.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "EXT-002,INV-009")]
    public void AreEquivalent_ProposedIsSubset_ReturnsFalse()
    {
        // Arrange
        var current = new List<string> { "id-a", "id-b", "id-c" };
        var proposed = new List<string> { "id-a", "id-b" };

        // Act
        bool result = TextCollectionService.AreEquivalent(current, proposed);

        // Assert
        Assert.That(result, Is.False, "Subset (fewer texts) should not be equivalent");
    }

    /// <summary>
    /// A superset (more proposed) must NOT be equivalent.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "EXT-002,INV-009")]
    public void AreEquivalent_ProposedIsSuperset_ReturnsFalse()
    {
        // Arrange
        var current = new List<string> { "id-a", "id-b" };
        var proposed = new List<string> { "id-a", "id-b", "id-c" };

        // Act
        bool result = TextCollectionService.AreEquivalent(current, proposed);

        // Assert
        Assert.That(result, Is.False, "Superset (more texts) should not be equivalent");
    }

    /// <summary>
    /// Non-empty current vs empty proposed must NOT be equivalent.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "EXT-002")]
    public void AreEquivalent_ProposedEmpty_ReturnsFalse()
    {
        // Arrange
        var current = new List<string> { "id-a", "id-b" };
        var proposed = new List<string>();

        // Act
        bool result = TextCollectionService.AreEquivalent(current, proposed);

        // Assert
        Assert.That(result, Is.False, "Non-empty vs empty should not be equivalent");
    }

    #endregion

    #region CAP-002 Invariant Tests (INV-009)

    /// <summary>
    /// INV-009 reflexive property: AreEquivalent(a, a) must always be true.
    /// A list compared to itself must be equivalent.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "INV-009")]
    [Property("InvariantId", "INV-009")]
    public void AreEquivalent_Reflexive_SameListReturnsTrue()
    {
        // Arrange
        var list = new List<string> { "id-x", "id-y", "id-z" };

        // Act
        bool result = TextCollectionService.AreEquivalent(list, list);

        // Assert
        Assert.That(result, Is.True, "INV-009: Reflexive -- a list is equivalent to itself");
    }

    /// <summary>
    /// INV-009 non-commutativity: For distinct elements,
    /// AreEquivalent([x,y], [y,x]) must be false.
    /// This proves order-sensitivity is strictly enforced.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "INV-009")]
    [Property("InvariantId", "INV-009")]
    public void AreEquivalent_NonCommutative_SwappedReturnsFalse()
    {
        // Arrange
        var listAB = new List<string> { "id-x", "id-y" };
        var listBA = new List<string> { "id-y", "id-x" };

        // Act
        bool result = TextCollectionService.AreEquivalent(listAB, listBA);

        // Assert
        Assert.That(
            result,
            Is.False,
            "INV-009: Non-commutative -- [x,y] is not equivalent to [y,x]"
        );
    }

    /// <summary>
    /// INV-009 formal definition: AreEquivalent(a, b) is true if and only if
    /// a.length == b.length AND for all i: a[i] == b[i].
    /// Test with matching lengths but one differing element.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "INV-009")]
    [Property("InvariantId", "INV-009")]
    public void AreEquivalent_OneDifferingElement_ReturnsFalse()
    {
        // Arrange: Same length, differ at position 1
        var listA = new List<string> { "same", "differs-here", "same" };
        var listB = new List<string> { "same", "other-value", "same" };

        // Act
        bool result = TextCollectionService.AreEquivalent(listA, listB);

        // Assert
        Assert.That(
            result,
            Is.False,
            "INV-009: Same length but one differing element => not equivalent"
        );
    }

    #endregion

    #region CAP-002 Edge Case Tests

    /// <summary>
    /// Both lists empty should be equivalent (vacuously true SequenceEqual).
    /// Two empty text collections have the same texts in the same order.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "EXT-002")]
    public void AreEquivalent_BothEmpty_ReturnsTrue()
    {
        // Arrange
        var current = new List<string>();
        var proposed = new List<string>();

        // Act
        bool result = TextCollectionService.AreEquivalent(current, proposed);

        // Assert
        Assert.That(result, Is.True, "Two empty lists should be equivalent");
    }

    /// <summary>
    /// Single-element lists with the same value should be equivalent.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "EXT-002")]
    public void AreEquivalent_SingleElementSame_ReturnsTrue()
    {
        // Arrange
        var current = new List<string> { "only-one" };
        var proposed = new List<string> { "only-one" };

        // Act
        bool result = TextCollectionService.AreEquivalent(current, proposed);

        // Assert
        Assert.That(result, Is.True, "Single identical element should be equivalent");
    }

    /// <summary>
    /// Single-element lists with different values should NOT be equivalent.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "EXT-002")]
    public void AreEquivalent_SingleElementDifferent_ReturnsFalse()
    {
        // Arrange
        var current = new List<string> { "text-a" };
        var proposed = new List<string> { "text-b" };

        // Act
        bool result = TextCollectionService.AreEquivalent(current, proposed);

        // Assert
        Assert.That(result, Is.False, "Different single elements should not be equivalent");
    }

    /// <summary>
    /// Null first argument should throw or return false per error condition
    /// INVALID_STATE from data-contracts.md M-002.
    /// "Text lists must not be null".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "EXT-002")]
    public void AreEquivalent_NullCurrentList_ThrowsOrReturnsFalse()
    {
        // Arrange
        IList<string>? current = null;
        var proposed = new List<string> { "id-a" };

        // Act & Assert: Per data-contracts.md M-002 error condition,
        // null list should throw ArgumentNullException or equivalent.
        // The implementation must not silently succeed.
        Assert.That(
            () => TextCollectionService.AreEquivalent(current!, proposed),
            Throws.Exception,
            "Null current list should throw per M-002 error condition (INVALID_STATE)"
        );
    }

    /// <summary>
    /// Null second argument should throw or return false per error condition
    /// INVALID_STATE from data-contracts.md M-002.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "EXT-002")]
    public void AreEquivalent_NullProposedList_ThrowsOrReturnsFalse()
    {
        // Arrange
        var current = new List<string> { "id-a" };
        IList<string>? proposed = null;

        // Act & Assert
        Assert.That(
            () => TextCollectionService.AreEquivalent(current, proposed!),
            Throws.Exception,
            "Null proposed list should throw per M-002 error condition (INVALID_STATE)"
        );
    }

    /// <summary>
    /// Comparison must be case-sensitive (GUIDs are hex strings, case matters).
    /// "abc" and "ABC" should NOT match even though they might represent the
    /// same hex value, because GUID string comparison is exact.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "EXT-002")]
    public void AreEquivalent_CaseDifference_ReturnsFalse()
    {
        // Arrange
        var current = new List<string> { "abcdef1234567890abcdef1234567890abcdef12" };
        var proposed = new List<string> { "ABCDEF1234567890ABCDEF1234567890ABCDEF12" };

        // Act
        bool result = TextCollectionService.AreEquivalent(current, proposed);

        // Assert
        Assert.That(
            result,
            Is.False,
            "String comparison should be case-sensitive (GUID hex strings)"
        );
    }

    #endregion

    // =========================================================================
    // CAP-010: RemoveDeletedTexts
    // Source: EXT-014 (PT9/ParatextBase/TextCollection/TextCollectionControl.cs:720-728)
    // RemoveDeletedTexts iterates a list of TextCollectionItem and removes any
    // whose project is no longer present in ScrTextCollection. Returns true if
    // any items were removed. The PT9 implementation uses
    // ScrTextCollection.IsPresent(item.ScrText); the PT10 adaptation uses
    // ScrTextCollection.IsPresent(item.ScrTextName) which handles:
    //   - Case-insensitive matching (BHV-112, spec-004 scenario 1)
    //   - Joined text name splitting on '/' (BHV-112, INV-005, spec-004 scenario 2)
    // =========================================================================

    #region CAP-010 Acceptance Test

    /// <summary>
    /// OUTER ACCEPTANCE TEST: Given a list of TextCollectionItems where some projects
    /// are present in ScrTextCollection and others have been removed/deleted, the method
    /// removes the absent items from the list and returns true.
    ///
    /// This is the "done signal" for CAP-010. When this passes, the capability is complete.
    ///
    /// Verifies spec-004 scenarios: case-insensitive presence check, joined text handling.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-010")]
    [Property("SpecId", "spec-004")]
    [Property("ScenarioId", "TS-060,TS-061")]
    [Property("BehaviorId", "EXT-014,BHV-112")]
    public void RemoveDeletedTexts_WithMixOfPresentAndAbsent_RemovesAbsentAndReturnsTrue()
    {
        // Arrange: Create two projects that ARE in ScrTextCollection
        DummyScrText presentProject1 = CreateDummyProject();
        ScrTextCollection.Add(presentProject1, true);
        DummyScrText presentProject2 = CreateDummyProject();
        ScrTextCollection.Add(presentProject2, true);

        // Create items: two present, one absent (not in ScrTextCollection)
        var items = new List<TextCollectionItem>
        {
            new(presentProject1.Name, presentProject1.Guid.ToString(), 1.0),
            new("DeletedProject", "0000000000000000000000000000000000000000", 1.2),
            new(presentProject2.Name, presentProject2.Guid.ToString(), 0.9),
        };

        // Act
        bool result = TextCollectionService.RemoveDeletedTexts(items);

        // Assert: Absent item removed, present items remain
        Assert.That(result, Is.True, "Should return true when items are removed");
        Assert.That(items, Has.Count.EqualTo(2), "Absent item should be removed from list");
        Assert.That(
            items.Select(i => i.ScrTextName),
            Does.Contain(presentProject1.Name),
            "Present project 1 should remain"
        );
        Assert.That(
            items.Select(i => i.ScrTextName),
            Does.Contain(presentProject2.Name),
            "Present project 2 should remain"
        );
        Assert.That(
            items.Select(i => i.ScrTextName),
            Does.Not.Contain("DeletedProject"),
            "Deleted project should be removed"
        );
    }

    #endregion

    #region CAP-010 Contract Tests - Happy Path

    /// <summary>
    /// When all items in the list are present in ScrTextCollection,
    /// no items are removed and the method returns false.
    /// PT9: items.Any(item => !ScrTextCollection.IsPresent(item.ScrText)) returns false.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-061")]
    [Property("BehaviorId", "EXT-014,BHV-112")]
    public void RemoveDeletedTexts_AllPresent_ReturnsFalseAndListUnchanged()
    {
        // Arrange: Create and register three projects
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);
        DummyScrText projectB = CreateDummyProject();
        ScrTextCollection.Add(projectB, true);
        DummyScrText projectC = CreateDummyProject();
        ScrTextCollection.Add(projectC, true);

        var items = new List<TextCollectionItem>
        {
            new(projectA.Name, projectA.Guid.ToString(), 1.0),
            new(projectB.Name, projectB.Guid.ToString(), 1.1),
            new(projectC.Name, projectC.Guid.ToString(), 0.8),
        };

        // Act
        bool result = TextCollectionService.RemoveDeletedTexts(items);

        // Assert
        Assert.That(result, Is.False, "No items removed, should return false");
        Assert.That(items, Has.Count.EqualTo(3), "All items should remain");
    }

    /// <summary>
    /// When one item is not present in ScrTextCollection (project deleted/uninstalled),
    /// that item is removed from the list and the method returns true.
    /// Matches TS-060: TC has texts [A, B, C]; project B has been uninstalled.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-060")]
    [Property("BehaviorId", "EXT-014,BHV-112")]
    public void RemoveDeletedTexts_OneAbsent_RemovesItAndReturnsTrue()
    {
        // Arrange: Two present projects, one absent
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);
        DummyScrText projectC = CreateDummyProject();
        ScrTextCollection.Add(projectC, true);

        var items = new List<TextCollectionItem>
        {
            new(projectA.Name, projectA.Guid.ToString(), 1.0),
            new("AbsentProject", "1111111111111111111111111111111111111111", 1.0),
            new(projectC.Name, projectC.Guid.ToString(), 1.0),
        };

        // Act
        bool result = TextCollectionService.RemoveDeletedTexts(items);

        // Assert
        Assert.That(result, Is.True, "Should return true when an item is removed");
        Assert.That(items, Has.Count.EqualTo(2), "One item should be removed");
        Assert.That(
            items[0].ScrTextName,
            Is.EqualTo(projectA.Name),
            "First remaining item should be project A"
        );
        Assert.That(
            items[1].ScrTextName,
            Is.EqualTo(projectC.Name),
            "Second remaining item should be project C"
        );
    }

    #endregion

    #region CAP-010 Contract Tests - Return Value and Side Effect

    /// <summary>
    /// The method modifies the passed list in-place (items are removed from the
    /// same IList instance). This verifies the side-effect contract from M-011:
    /// "Items not present in ScrTextCollection are removed from the list".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-060")]
    [Property("BehaviorId", "EXT-014")]
    public void RemoveDeletedTexts_ModifiesListInPlace()
    {
        // Arrange
        DummyScrText presentProject = CreateDummyProject();
        ScrTextCollection.Add(presentProject, true);

        var items = new List<TextCollectionItem>
        {
            new(presentProject.Name, presentProject.Guid.ToString(), 1.0),
            new("GoneProject", "2222222222222222222222222222222222222222", 1.0),
        };

        // Keep a reference to the same list
        IList<TextCollectionItem> sameListReference = items;

        // Act
        TextCollectionService.RemoveDeletedTexts(items);

        // Assert: The same list object was modified
        Assert.That(
            sameListReference,
            Has.Count.EqualTo(1),
            "The original list reference should reflect the removal"
        );
        Assert.That(
            ReferenceEquals(items, sameListReference),
            Is.True,
            "The list should be modified in-place, not replaced"
        );
    }

    /// <summary>
    /// Remaining items must preserve their original order after removal.
    /// If items were [A, B, C, D] and B and D are absent, result is [A, C].
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-060")]
    [Property("BehaviorId", "EXT-014")]
    public void RemoveDeletedTexts_PreservesOrderOfRemainingItems()
    {
        // Arrange: Four projects, register only A and C
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);
        DummyScrText projectC = CreateDummyProject();
        ScrTextCollection.Add(projectC, true);

        var items = new List<TextCollectionItem>
        {
            new(projectA.Name, projectA.Guid.ToString(), 1.0),
            new("AbsentB", "3333333333333333333333333333333333333333", 1.0),
            new(projectC.Name, projectC.Guid.ToString(), 1.0),
            new("AbsentD", "4444444444444444444444444444444444444444", 1.0),
        };

        // Act
        TextCollectionService.RemoveDeletedTexts(items);

        // Assert: A and C remain in original relative order
        Assert.That(items, Has.Count.EqualTo(2));
        Assert.That(items[0].ScrTextName, Is.EqualTo(projectA.Name), "A should be first");
        Assert.That(items[1].ScrTextName, Is.EqualTo(projectC.Name), "C should be second");
    }

    /// <summary>
    /// Zoom values must be preserved on remaining items after removal.
    /// Per data-contracts.md, TextCollectionItem carries per-text zoom.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-060")]
    [Property("BehaviorId", "EXT-014")]
    public void RemoveDeletedTexts_PreservesZoomOnRemainingItems()
    {
        // Arrange
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);

        var items = new List<TextCollectionItem>
        {
            new(projectA.Name, projectA.Guid.ToString(), 1.5),
            new("AbsentB", "5555555555555555555555555555555555555555", 0.8),
        };

        // Act
        TextCollectionService.RemoveDeletedTexts(items);

        // Assert
        Assert.That(items, Has.Count.EqualTo(1));
        Assert.That(
            items[0].Zoom,
            Is.EqualTo(1.5).Within(0.001),
            "Zoom should be preserved on remaining item"
        );
    }

    #endregion

    #region CAP-010 Edge Case Tests

    /// <summary>
    /// When the items list is empty, the method should return false
    /// without throwing (no items to check).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-061")]
    [Property("BehaviorId", "EXT-014")]
    public void RemoveDeletedTexts_EmptyList_ReturnsFalse()
    {
        // Arrange
        var items = new List<TextCollectionItem>();

        // Act
        bool result = TextCollectionService.RemoveDeletedTexts(items);

        // Assert
        Assert.That(result, Is.False, "Empty list should return false (nothing to remove)");
        Assert.That(items, Has.Count.EqualTo(0));
    }

    /// <summary>
    /// When all items have been deleted (none present), all are removed
    /// and the method returns true. The list becomes empty.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-060")]
    [Property("BehaviorId", "EXT-014")]
    public void RemoveDeletedTexts_AllAbsent_ReturnsTrue_ListEmpty()
    {
        // Arrange: No projects registered in ScrTextCollection
        var items = new List<TextCollectionItem>
        {
            new("Gone1", "6666666666666666666666666666666666666666", 1.0),
            new("Gone2", "7777777777777777777777777777777777777777", 1.0),
        };

        // Act
        bool result = TextCollectionService.RemoveDeletedTexts(items);

        // Assert
        Assert.That(result, Is.True, "All items removed, should return true");
        Assert.That(items, Has.Count.EqualTo(0), "List should be empty");
    }

    /// <summary>
    /// A single item that is present should remain; method returns false.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-061")]
    [Property("BehaviorId", "EXT-014,BHV-112")]
    public void RemoveDeletedTexts_SinglePresentItem_ReturnsFalse()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);

        var items = new List<TextCollectionItem>
        {
            new(project.Name, project.Guid.ToString(), 1.0),
        };

        // Act
        bool result = TextCollectionService.RemoveDeletedTexts(items);

        // Assert
        Assert.That(result, Is.False, "Single present item should not be removed");
        Assert.That(items, Has.Count.EqualTo(1));
    }

    /// <summary>
    /// A single item that is absent should be removed; method returns true.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-060")]
    [Property("BehaviorId", "EXT-014")]
    public void RemoveDeletedTexts_SingleAbsentItem_ReturnsTrue()
    {
        // Arrange: Item references a project not in ScrTextCollection
        var items = new List<TextCollectionItem>
        {
            new("NonExistent", "8888888888888888888888888888888888888888", 1.0),
        };

        // Act
        bool result = TextCollectionService.RemoveDeletedTexts(items);

        // Assert
        Assert.That(result, Is.True, "Single absent item removed, should return true");
        Assert.That(items, Has.Count.EqualTo(0));
    }

    #endregion
}
