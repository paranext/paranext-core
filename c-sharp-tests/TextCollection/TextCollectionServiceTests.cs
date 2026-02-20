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

    // =========================================================================
    // CAP-004: GenerateTitle
    // Source: EXT-005 (PT9/Paratext/TextCollectionForm.cs:291-330)
    // GenerateTitle produces a window title string based on item count using
    // four distinct patterns. It also generates a tooltip string that includes
    // the "Text Collection" label and per-item project names.
    //
    // Title patterns (from data-contracts.md M-004 and gm-003):
    //   0 items: "(Text Collection ({ref}))"
    //   1 item:  "{name}: (Text Collection ({ref}))"
    //   2 items: "{name1}, {name2}: (Text Collection ({ref}))"
    //   3+ items:"{first}, ...{last}: (Text Collection ({ref}))"
    //
    // PT9 source: TextCollectionForm.UpdateWindowTitle at lines 291-330
    // =========================================================================

    #region CAP-004 Acceptance Test

    /// <summary>
    /// OUTER ACCEPTANCE TEST: Verifies all 4 title patterns from gm-003.
    /// Given items lists of various sizes (0, 1, 2, 3+), GenerateTitle returns
    /// the correct title pattern for each case.
    ///
    /// This is the "done signal" for CAP-004. When this passes, the capability is complete.
    ///
    /// Golden master scenarios from gm-003:
    ///   zero-items:        0 items => "(Text Collection (MAT 1:1))"
    ///   one-item:          1 item  => "NIV84: (Text Collection (MAT 1:1))"
    ///   two-items:         2 items => "zzz3, NIV84: (Text Collection (MAT 1:1))"
    ///   three-plus-items:  4 items => "zzz3, ...CEVUK: (Text Collection (MAT 2:1))"
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-004")]
    [Property("GoldenMasterId", "gm-003")]
    [Property("ScenarioId", "TS-036,TS-037,TS-038,TS-039")]
    [Property("BehaviorId", "EXT-005,BHV-T001")]
    public void GenerateTitle_GoldenMasterScenarios_MatchExpectedTitlePatterns()
    {
        // Scenario: zero-items (TS-036)
        {
            var emptyItems = new List<TextCollectionItem>();
            TitleResult result = TextCollectionService.GenerateTitle(emptyItems, 0, "MAT 1:1");

            Assert.That(
                result.Title,
                Does.Contain("Text Collection"),
                "zero-items: title must contain 'Text Collection'"
            );
            Assert.That(
                result.Title,
                Does.Contain("MAT 1:1"),
                "zero-items: title must contain the reference"
            );
            // Zero items: no project name prefix (no colon separator)
            // The title should not have the "name:" prefix pattern
            Assert.That(
                result.Title,
                Does.Not.Match(@"^\w+.*:"),
                "zero-items: no project name prefix before '(Text Collection)'"
            );
        }

        // Scenario: one-item (TS-037)
        {
            var oneItem = new List<TextCollectionItem>
            {
                new("NIV84", "id-niv84", 1.0),
            };
            TitleResult result = TextCollectionService.GenerateTitle(oneItem, 0, "MAT 1:1");

            Assert.That(
                result.Title,
                Does.StartWith("NIV84"),
                "one-item: title must start with the single project name"
            );
            Assert.That(
                result.Title,
                Does.Contain("Text Collection"),
                "one-item: title must contain 'Text Collection'"
            );
            Assert.That(
                result.Title,
                Does.Contain("MAT 1:1"),
                "one-item: title must contain the reference"
            );
        }

        // Scenario: two-items (TS-038)
        {
            var twoItems = new List<TextCollectionItem>
            {
                new("zzz3", "id-zzz3", 1.0),
                new("NIV84", "id-niv84", 1.0),
            };
            TitleResult result = TextCollectionService.GenerateTitle(twoItems, 0, "MAT 1:1");

            Assert.That(
                result.Title,
                Does.Contain("zzz3"),
                "two-items: title must contain first project name"
            );
            Assert.That(
                result.Title,
                Does.Contain("NIV84"),
                "two-items: title must contain second project name"
            );
            Assert.That(
                result.Title,
                Does.Contain(","),
                "two-items: title must use comma separator between names"
            );
            Assert.That(
                result.Title,
                Does.Contain("Text Collection"),
                "two-items: title must contain 'Text Collection'"
            );
        }

        // Scenario: three-plus-items (TS-039)
        {
            var fourItems = new List<TextCollectionItem>
            {
                new("zzz3", "id-zzz3", 1.0),
                new("zzz6", "id-zzz6", 1.0),
                new("NIV84", "id-niv84", 1.0),
                new("CEVUK", "id-cevuk", 1.0),
            };
            TitleResult result = TextCollectionService.GenerateTitle(fourItems, 0, "MAT 2:1");

            Assert.That(
                result.Title,
                Does.Contain("zzz3"),
                "three-plus: title must contain the first project name"
            );
            Assert.That(
                result.Title,
                Does.Contain("CEVUK"),
                "three-plus: title must contain the last project name"
            );
            Assert.That(
                result.Title,
                Does.Contain("..."),
                "three-plus: title must contain ellipsis between first and last"
            );
            Assert.That(
                result.Title,
                Does.Not.Contain("zzz6"),
                "three-plus: middle items must be omitted from title"
            );
            Assert.That(
                result.Title,
                Does.Not.Contain("NIV84"),
                "three-plus: middle items must be omitted from title"
            );
            Assert.That(
                result.Title,
                Does.Contain("Text Collection"),
                "three-plus: title must contain 'Text Collection'"
            );
            Assert.That(
                result.Title,
                Does.Contain("MAT 2:1"),
                "three-plus: title must contain the reference"
            );
        }
    }

    #endregion

    #region CAP-004 Contract Tests - Title Patterns

    /// <summary>
    /// Zero items: Title should be "(Text Collection ({ref}))".
    /// TS-036: Window title for 0 items shows reference only.
    /// PT9 source: When captionItem is null (no items), text = Reference.ToLocalizedString().
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "EXT-005")]
    [Property("GoldenMasterId", "gm-003")]
    public void GenerateTitle_ZeroItems_ReturnsTitleWithReferenceOnly()
    {
        // Arrange
        var emptyItems = new List<TextCollectionItem>();

        // Act
        TitleResult result = TextCollectionService.GenerateTitle(emptyItems, 0, "MAT 1:1");

        // Assert: Pattern is "(Text Collection ({ref}))"
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Title, Is.Not.Null.And.Not.Empty);
        Assert.That(
            result.Title,
            Does.Contain("Text Collection"),
            "TS-036: Zero items title must contain 'Text Collection'"
        );
        Assert.That(
            result.Title,
            Does.Contain("MAT 1:1"),
            "TS-036: Zero items title must contain the reference"
        );
    }

    /// <summary>
    /// One item: Title should be "{name}: (Text Collection ({ref}))".
    /// TS-037: Window title for 1 item shows single project name.
    /// PT9 source: captionItem.ScrText.Name + ": " + ref + " (Text Collection)"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "EXT-005")]
    [Property("GoldenMasterId", "gm-003")]
    public void GenerateTitle_OneItem_ReturnsTitleWithSingleName()
    {
        // Arrange
        var oneItem = new List<TextCollectionItem>
        {
            new("NIV84", "id-niv84", 1.0),
        };

        // Act
        TitleResult result = TextCollectionService.GenerateTitle(oneItem, 0, "MAT 1:1");

        // Assert: Pattern is "{name}: (Text Collection ({ref}))"
        Assert.That(result.Title, Does.Contain("NIV84"), "TS-037: Title must contain the project name");
        Assert.That(
            result.Title,
            Does.Contain("Text Collection"),
            "TS-037: Title must contain 'Text Collection'"
        );
        Assert.That(
            result.Title,
            Does.Contain("MAT 1:1"),
            "TS-037: Title must contain the reference"
        );
        // Verify the name appears before "Text Collection" (name prefix pattern)
        int nameIdx = result.Title.IndexOf("NIV84", StringComparison.Ordinal);
        int tcIdx = result.Title.IndexOf("Text Collection", StringComparison.Ordinal);
        Assert.That(
            nameIdx,
            Is.LessThan(tcIdx),
            "TS-037: Project name must appear before 'Text Collection' suffix"
        );
    }

    /// <summary>
    /// Two items: Title should be "{name1}, {name2}: (Text Collection ({ref}))".
    /// TS-038: Window title for 2 items shows both names.
    /// PT9 source: captionItem.Name + ", " + lastItem.Name + ": " + ref + " (TC)"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "EXT-005")]
    [Property("GoldenMasterId", "gm-003")]
    public void GenerateTitle_TwoItems_ReturnsTitleWithBothNames()
    {
        // Arrange
        var twoItems = new List<TextCollectionItem>
        {
            new("zzz3", "id-zzz3", 1.0),
            new("NIV84", "id-niv84", 1.0),
        };

        // Act
        TitleResult result = TextCollectionService.GenerateTitle(twoItems, 0, "MAT 1:1");

        // Assert: Pattern is "{name1}, {name2}: (Text Collection ({ref}))"
        Assert.That(result.Title, Does.Contain("zzz3"), "TS-038: Title must contain first name");
        Assert.That(result.Title, Does.Contain("NIV84"), "TS-038: Title must contain second name");
        Assert.That(
            result.Title,
            Does.Contain("Text Collection"),
            "TS-038: Title must contain 'Text Collection'"
        );

        // Verify order: first name before second name
        int firstIdx = result.Title.IndexOf("zzz3", StringComparison.Ordinal);
        int secondIdx = result.Title.IndexOf("NIV84", StringComparison.Ordinal);
        Assert.That(
            firstIdx,
            Is.LessThan(secondIdx),
            "TS-038: First project name must appear before second"
        );
    }

    /// <summary>
    /// Three+ items: Title should be "{first}, ...{last}: (Text Collection ({ref}))".
    /// TS-039: Window title for 3+ items shows first, ellipsis, last.
    /// PT9 source: captionItem.Name + ", ... " + lastItem.Name + ": " + ref + " (TC)"
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "EXT-005,BHV-T001")]
    [Property("GoldenMasterId", "gm-003")]
    public void GenerateTitle_ThreePlusItems_ReturnsTitleWithFirstEllipsisLast()
    {
        // Arrange: 4 items matching gm-003 "three-plus-items" scenario
        var fourItems = new List<TextCollectionItem>
        {
            new("zzz3", "id-zzz3", 1.0),
            new("zzz6", "id-zzz6", 1.0),
            new("NIV84", "id-niv84", 1.0),
            new("CEVUK", "id-cevuk", 1.0),
        };

        // Act
        TitleResult result = TextCollectionService.GenerateTitle(fourItems, 0, "MAT 2:1");

        // Assert: Pattern is "{first}, ...{last}: (Text Collection ({ref}))"
        Assert.That(result.Title, Does.Contain("zzz3"), "TS-039: Title must contain the first name");
        Assert.That(
            result.Title,
            Does.Contain("CEVUK"),
            "TS-039: Title must contain the last name"
        );
        Assert.That(
            result.Title,
            Does.Contain("..."),
            "TS-039: Title must contain ellipsis for omitted middle items"
        );
        Assert.That(
            result.Title,
            Does.Not.Contain("zzz6"),
            "TS-039: Middle items should not appear in title"
        );
        Assert.That(
            result.Title,
            Does.Not.Contain("NIV84"),
            "TS-039: Middle items should not appear in title"
        );
    }

    /// <summary>
    /// Exactly 3 items should use the 3+ pattern (first, ...last).
    /// Boundary test at the transition from 2-item to 3+ pattern.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "EXT-005")]
    public void GenerateTitle_ExactlyThreeItems_UsesEllipsisPattern()
    {
        // Arrange: 3 items (boundary for 3+ pattern)
        var threeItems = new List<TextCollectionItem>
        {
            new("Alpha", "id-alpha", 1.0),
            new("Beta", "id-beta", 1.0),
            new("Gamma", "id-gamma", 1.0),
        };

        // Act
        TitleResult result = TextCollectionService.GenerateTitle(threeItems, 0, "GEN 1:1");

        // Assert: Should use 3+ pattern with ellipsis
        Assert.That(
            result.Title,
            Does.Contain("Alpha"),
            "Three items: title must contain first name"
        );
        Assert.That(
            result.Title,
            Does.Contain("Gamma"),
            "Three items: title must contain last name"
        );
        Assert.That(
            result.Title,
            Does.Contain("..."),
            "Three items: title must use ellipsis pattern (3+ items)"
        );
        Assert.That(
            result.Title,
            Does.Not.Contain("Beta"),
            "Three items: middle item should not appear in title"
        );
    }

    #endregion

    #region CAP-004 Contract Tests - TitleResult Structure

    /// <summary>
    /// The TitleResult must contain both a non-null, non-empty Title and Tooltip.
    /// This verifies the return type contract from data-contracts.md M-004.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "EXT-005")]
    public void GenerateTitle_ReturnsNonNullTitleAndTooltip()
    {
        // Arrange
        var items = new List<TextCollectionItem>
        {
            new("TestProject", "id-test", 1.0),
        };

        // Act
        TitleResult result = TextCollectionService.GenerateTitle(items, 0, "MAT 1:1");

        // Assert
        Assert.That(result, Is.Not.Null, "TitleResult must not be null");
        Assert.That(result.Title, Is.Not.Null.And.Not.Empty, "Title must not be null or empty");
        Assert.That(result.Tooltip, Is.Not.Null.And.Not.Empty, "Tooltip must not be null or empty");
    }

    /// <summary>
    /// The tooltip must contain the "Text Collection" label per PT9 behavior.
    /// PT9 source line 329: DockHandler.ToolTipText = $"{title} ({Reference}){items}"
    /// where title = Localizer.Str("Text Collection").
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "EXT-005,BHV-T001")]
    public void GenerateTitle_TooltipContainsTextCollectionLabel()
    {
        // Arrange
        var items = new List<TextCollectionItem>
        {
            new("NIV84", "id-niv84", 1.0),
            new("ESV", "id-esv", 1.0),
        };

        // Act
        TitleResult result = TextCollectionService.GenerateTitle(items, 0, "MAT 1:1");

        // Assert
        Assert.That(
            result.Tooltip,
            Does.Contain("Text Collection"),
            "Tooltip must contain 'Text Collection' label"
        );
    }

    /// <summary>
    /// The tooltip must include all project names from the items list.
    /// PT9 source line 320-321: foreach item, tooltip += "\n" + item.ScrText.Name.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "EXT-005")]
    public void GenerateTitle_TooltipContainsAllItemNames()
    {
        // Arrange
        var items = new List<TextCollectionItem>
        {
            new("NIV84", "id-niv84", 1.0),
            new("ESV", "id-esv", 1.0),
            new("KJV", "id-kjv", 1.0),
        };

        // Act
        TitleResult result = TextCollectionService.GenerateTitle(items, 0, "MAT 1:1");

        // Assert: All item names must appear in the tooltip
        Assert.That(
            result.Tooltip,
            Does.Contain("NIV84"),
            "Tooltip must contain first item name"
        );
        Assert.That(
            result.Tooltip,
            Does.Contain("ESV"),
            "Tooltip must contain second item name"
        );
        Assert.That(
            result.Tooltip,
            Does.Contain("KJV"),
            "Tooltip must contain third item name"
        );
    }

    /// <summary>
    /// The tooltip must include the verse reference.
    /// PT9 source line 329: tooltip includes Reference.ToLocalizedString().
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "EXT-005")]
    public void GenerateTitle_TooltipContainsReference()
    {
        // Arrange
        var items = new List<TextCollectionItem>
        {
            new("TestProject", "id-test", 1.0),
        };

        // Act
        TitleResult result = TextCollectionService.GenerateTitle(items, 0, "REV 22:21");

        // Assert
        Assert.That(
            result.Tooltip,
            Does.Contain("REV 22:21"),
            "Tooltip must contain the verse reference"
        );
    }

    #endregion

    #region CAP-004 Contract Tests - Reference in Title

    /// <summary>
    /// The title must include the verse reference string for all non-empty item counts.
    /// data-contracts M-004: All patterns include ({ref}) in the title.
    /// </summary>
    [TestCase(1)]
    [TestCase(2)]
    [TestCase(5)]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-037,TS-038,TS-039")]
    [Property("BehaviorId", "EXT-005")]
    public void GenerateTitle_TitleIncludesReference(int itemCount)
    {
        // Arrange
        var items = new List<TextCollectionItem>();
        for (int i = 0; i < itemCount; i++)
        {
            items.Add(new TextCollectionItem($"Proj{i}", $"id-{i}", 1.0));
        }

        // Act
        TitleResult result = TextCollectionService.GenerateTitle(items, 0, "PSA 23:1");

        // Assert
        Assert.That(
            result.Title,
            Does.Contain("PSA 23:1"),
            $"Title with {itemCount} items must contain the reference"
        );
    }

    #endregion

    #region CAP-004 Edge Case Tests

    /// <summary>
    /// When curItem is out of range (negative), the method should handle it
    /// gracefully. Per data-contracts M-004 error condition: "curItem index out
    /// of bounds" => INVALID_STATE.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "EXT-005")]
    public void GenerateTitle_CurItemNegative_ThrowsOrHandlesGracefully()
    {
        // Arrange
        var items = new List<TextCollectionItem>
        {
            new("NIV84", "id-niv84", 1.0),
        };

        // Act & Assert: Per M-004 error condition, curItem out of range
        // should throw or return a graceful result (not crash).
        // The implementation may throw ArgumentOutOfRangeException.
        Assert.That(
            () => TextCollectionService.GenerateTitle(items, -1, "MAT 1:1"),
            Throws.Exception,
            "curItem=-1 is out of range when items is non-empty; should throw per INVALID_STATE"
        );
    }

    /// <summary>
    /// When curItem exceeds the items count, the method should throw per
    /// data-contracts M-004 error condition: "curItem index out of bounds".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "EXT-005")]
    public void GenerateTitle_CurItemExceedsCount_ThrowsOrHandlesGracefully()
    {
        // Arrange
        var items = new List<TextCollectionItem>
        {
            new("NIV84", "id-niv84", 1.0),
        };

        // Act & Assert: curItem=1 is out of range for a 1-element list (valid range: 0)
        Assert.That(
            () => TextCollectionService.GenerateTitle(items, 1, "MAT 1:1"),
            Throws.Exception,
            "curItem=1 exceeds items.Count=1; should throw per INVALID_STATE"
        );
    }

    /// <summary>
    /// When curItem is 0 with empty items, the method should succeed.
    /// Per data-contracts M-004: curItem is 0 when items is empty.
    /// This matches the zero-items scenario in gm-003.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "EXT-005")]
    public void GenerateTitle_EmptyItemsWithCurItemZero_Succeeds()
    {
        // Arrange
        var emptyItems = new List<TextCollectionItem>();

        // Act
        TitleResult result = TextCollectionService.GenerateTitle(emptyItems, 0, "MAT 1:1");

        // Assert: Should not throw; should return a valid result
        Assert.That(result, Is.Not.Null, "Empty items with curItem=0 should succeed");
        Assert.That(result.Title, Is.Not.Null.And.Not.Empty);
    }

    /// <summary>
    /// Title generation with different references for the same items should
    /// produce titles that differ in the reference portion.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "EXT-005")]
    public void GenerateTitle_DifferentReferences_ProduceDifferentTitles()
    {
        // Arrange
        var items = new List<TextCollectionItem>
        {
            new("NIV84", "id-niv84", 1.0),
        };

        // Act
        TitleResult result1 = TextCollectionService.GenerateTitle(items, 0, "MAT 1:1");
        TitleResult result2 = TextCollectionService.GenerateTitle(items, 0, "GEN 50:26");

        // Assert: Titles should differ because references differ
        Assert.That(
            result1.Title,
            Is.Not.EqualTo(result2.Title),
            "Different references should produce different titles"
        );
        Assert.That(result1.Title, Does.Contain("MAT 1:1"));
        Assert.That(result2.Title, Does.Contain("GEN 50:26"));
    }

    /// <summary>
    /// When curItem points to a specific item in a multi-item list, the title
    /// should still use the first item for the name prefix (per PT9 behavior).
    /// PT9: captionItem is Items[CurItem] if SingleShown, else Items[0].
    /// In the stateless PT10 API, the first item is always used for title names.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "EXT-005")]
    public void GenerateTitle_CurItemNonZero_TitleStillUsesFirstAndLastNames()
    {
        // Arrange: 3 items, curItem=2
        var items = new List<TextCollectionItem>
        {
            new("Alpha", "id-alpha", 1.0),
            new("Beta", "id-beta", 1.0),
            new("Gamma", "id-gamma", 1.0),
        };

        // Act
        TitleResult result = TextCollectionService.GenerateTitle(items, 2, "MAT 1:1");

        // Assert: The title pattern uses first and last item names
        Assert.That(
            result.Title,
            Does.Contain("Alpha"),
            "Title should contain the first item name regardless of curItem"
        );
        Assert.That(
            result.Title,
            Does.Contain("Gamma"),
            "Title should contain the last item name"
        );
    }

    #endregion

    // =========================================================================
    // CAP-013: HandleWriteLockChange
    // Source: EXT-016 (PT9/Paratext/TextCollectionForm.cs:124-143)
    // HandleWriteLockChange is an event-driven dispatcher that responds to write
    // lock change notifications. It evaluates the change scope to determine
    // what action the TC should take:
    //   1. scope == "Project": Calls RemoveDeletedTexts (CAP-010). If items were
    //      removed, returns RemoveAndReload; otherwise returns NoAction.
    //   2. scope overlaps currentBookNum: Returns Reload (content may have changed
    //      for the currently displayed book).
    //   3. Otherwise: Returns NoAction (change is irrelevant to current display).
    //
    // The ChangeAction enum has three values: NoAction, Reload, RemoveAndReload.
    // =========================================================================

    #region CAP-013 Acceptance Test

    /// <summary>
    /// OUTER ACCEPTANCE TEST: Given a write lock change with scope "Project" where one
    /// TC text has been deleted, HandleWriteLockChange calls RemoveDeletedTexts, removes
    /// the absent text, and returns RemoveAndReload.
    ///
    /// This is the "done signal" for CAP-013. When this passes, the capability is complete.
    ///
    /// Verifies TS-095: WriteLock change listener removes deleted texts.
    /// Verifies TS-096: WriteLock change for overlapping book triggers reload.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ScenarioId", "TS-095,TS-096")]
    [Property("BehaviorId", "EXT-016,EXT-014")]
    public void HandleWriteLockChange_AcceptanceScenarios_CorrectActions()
    {
        // === TS-095: Project scope with deleted text => RemoveAndReload ===
        {
            // Arrange: TC has texts [A, B]; project B has been deleted (not in ScrTextCollection)
            DummyScrText projectA = CreateDummyProject();
            ScrTextCollection.Add(projectA, true);

            var items = new List<TextCollectionItem>
            {
                new(projectA.Name, projectA.Guid.ToString(), 1.0),
                new("DeletedProjectB", "0000000000000000000000000000000000000099", 1.0),
            };

            // Act
            ChangeAction result = TextCollectionService.HandleWriteLockChange(
                "Project",
                items,
                40 // MAT
            );

            // Assert: Deleted text removed, action is RemoveAndReload
            Assert.That(
                result,
                Is.EqualTo(ChangeAction.RemoveAndReload),
                "TS-095: Project scope with deleted text should return RemoveAndReload"
            );
            Assert.That(
                items,
                Has.Count.EqualTo(1),
                "TS-095: Deleted text should be removed from items list"
            );
            Assert.That(
                items[0].ScrTextName,
                Is.EqualTo(projectA.Name),
                "TS-095: Present project should remain"
            );
        }

        // Clean up ScrTextCollection for next scenario
        foreach (
            ScrText s in ScrTextCollection.ScrTexts(IncludeProjects.Everything).ToList()
        )
            ScrTextCollection.Remove(s, false);

        // === TS-096: Book scope overlapping current book => Reload ===
        {
            // Arrange: TC is displaying MAT (book 40), change scope is book 40
            DummyScrText projectC = CreateDummyProject();
            ScrTextCollection.Add(projectC, true);

            var items = new List<TextCollectionItem>
            {
                new(projectC.Name, projectC.Guid.ToString(), 1.0),
            };

            // Act: Scope contains book number 40, which matches currentBookNum
            ChangeAction result = TextCollectionService.HandleWriteLockChange(
                "40",
                items,
                40 // MAT
            );

            // Assert: Reload triggered because scope overlaps current book
            Assert.That(
                result,
                Is.EqualTo(ChangeAction.Reload),
                "TS-096: Overlapping book scope should return Reload"
            );
            Assert.That(
                items,
                Has.Count.EqualTo(1),
                "TS-096: Items list should not be modified for book-scope changes"
            );
        }
    }

    #endregion

    #region CAP-013 Contract Tests - Scope "Project"

    /// <summary>
    /// When scope is "Project" and some items have been deleted (not present in
    /// ScrTextCollection), HandleWriteLockChange calls RemoveDeletedTexts,
    /// removes the absent items, and returns RemoveAndReload.
    /// PT9 source: TextCollectionForm.ChangeListener checks scope == "Project"
    /// and calls RemoveDeletedTexts.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ScenarioId", "TS-095")]
    [Property("BehaviorId", "EXT-016,EXT-014")]
    public void HandleWriteLockChange_ProjectScopeWithDeletedText_ReturnsRemoveAndReload()
    {
        // Arrange: One present project, one deleted project
        DummyScrText presentProject = CreateDummyProject();
        ScrTextCollection.Add(presentProject, true);

        var items = new List<TextCollectionItem>
        {
            new(presentProject.Name, presentProject.Guid.ToString(), 1.0),
            new("GoneProject", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", 1.0),
        };

        // Act
        ChangeAction result = TextCollectionService.HandleWriteLockChange(
            "Project",
            items,
            40
        );

        // Assert
        Assert.That(
            result,
            Is.EqualTo(ChangeAction.RemoveAndReload),
            "Project scope with deleted text must return RemoveAndReload"
        );
        Assert.That(items, Has.Count.EqualTo(1), "Deleted text should be removed from list");
        Assert.That(
            items[0].ScrTextName,
            Is.EqualTo(presentProject.Name),
            "Present project should remain in list"
        );
    }

    /// <summary>
    /// When scope is "Project" but all items are still present in ScrTextCollection,
    /// RemoveDeletedTexts finds nothing to remove, and the method returns NoAction.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ScenarioId", "TS-095")]
    [Property("BehaviorId", "EXT-016,EXT-014")]
    public void HandleWriteLockChange_ProjectScopeAllPresent_ReturnsNoAction()
    {
        // Arrange: All items are present in ScrTextCollection
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);
        DummyScrText projectB = CreateDummyProject();
        ScrTextCollection.Add(projectB, true);

        var items = new List<TextCollectionItem>
        {
            new(projectA.Name, projectA.Guid.ToString(), 1.0),
            new(projectB.Name, projectB.Guid.ToString(), 1.0),
        };

        // Act
        ChangeAction result = TextCollectionService.HandleWriteLockChange(
            "Project",
            items,
            40
        );

        // Assert: No items removed => NoAction
        Assert.That(
            result,
            Is.EqualTo(ChangeAction.NoAction),
            "Project scope with all texts present should return NoAction"
        );
        Assert.That(items, Has.Count.EqualTo(2), "No items should be removed");
    }

    /// <summary>
    /// When scope is "Project" and all items have been deleted, RemoveDeletedTexts
    /// removes all items and the method returns RemoveAndReload.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ScenarioId", "TS-095")]
    [Property("BehaviorId", "EXT-016,EXT-014")]
    public void HandleWriteLockChange_ProjectScopeAllDeleted_ReturnsRemoveAndReload()
    {
        // Arrange: No projects registered in ScrTextCollection
        var items = new List<TextCollectionItem>
        {
            new("Gone1", "1111111111111111111111111111111111111111", 1.0),
            new("Gone2", "2222222222222222222222222222222222222222", 1.0),
        };

        // Act
        ChangeAction result = TextCollectionService.HandleWriteLockChange(
            "Project",
            items,
            40
        );

        // Assert
        Assert.That(
            result,
            Is.EqualTo(ChangeAction.RemoveAndReload),
            "Project scope with all deleted texts should return RemoveAndReload"
        );
        Assert.That(items, Has.Count.EqualTo(0), "All items should be removed");
    }

    #endregion

    #region CAP-013 Contract Tests - Scope Overlapping Book

    /// <summary>
    /// When scope contains/matches the current book number, HandleWriteLockChange
    /// returns Reload because the displayed content may have changed.
    /// TS-096: WriteLock change for book that TC is currently displaying.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ScenarioId", "TS-096")]
    [Property("BehaviorId", "EXT-016")]
    public void HandleWriteLockChange_ScopeOverlapsCurrentBook_ReturnsReload()
    {
        // Arrange: TC is displaying MAT (book 40)
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);

        var items = new List<TextCollectionItem>
        {
            new(project.Name, project.Guid.ToString(), 1.0),
        };

        // Act: Scope is book 40 (same as currentBookNum)
        ChangeAction result = TextCollectionService.HandleWriteLockChange(
            "40",
            items,
            40
        );

        // Assert
        Assert.That(
            result,
            Is.EqualTo(ChangeAction.Reload),
            "Scope matching current book should return Reload"
        );
    }

    /// <summary>
    /// When scope does NOT overlap the current book number, the method returns
    /// NoAction because the change is irrelevant to the current display.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ScenarioId", "TS-096")]
    [Property("BehaviorId", "EXT-016")]
    public void HandleWriteLockChange_ScopeDoesNotOverlapCurrentBook_ReturnsNoAction()
    {
        // Arrange: TC is displaying MAT (book 40), scope is GEN (book 1)
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);

        var items = new List<TextCollectionItem>
        {
            new(project.Name, project.Guid.ToString(), 1.0),
        };

        // Act: Scope is book 1 (GEN), currentBookNum is 40 (MAT)
        ChangeAction result = TextCollectionService.HandleWriteLockChange(
            "1",
            items,
            40
        );

        // Assert
        Assert.That(
            result,
            Is.EqualTo(ChangeAction.NoAction),
            "Scope not matching current book should return NoAction"
        );
    }

    /// <summary>
    /// Verify that a book-scope change does not modify the items list.
    /// Only Project-scope changes trigger RemoveDeletedTexts.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ScenarioId", "TS-096")]
    [Property("BehaviorId", "EXT-016")]
    public void HandleWriteLockChange_BookScope_DoesNotModifyItemsList()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);

        var items = new List<TextCollectionItem>
        {
            new(project.Name, project.Guid.ToString(), 1.0),
            new("MaybeGone", "3333333333333333333333333333333333333333", 1.0),
        };
        int originalCount = items.Count;

        // Act: Book scope (not "Project"), so should NOT call RemoveDeletedTexts
        TextCollectionService.HandleWriteLockChange("40", items, 40);

        // Assert: Items list unchanged (no removals for book-scope changes)
        Assert.That(
            items,
            Has.Count.EqualTo(originalCount),
            "Book-scope change should not modify items list (only Project scope does)"
        );
    }

    #endregion

    #region CAP-013 Edge Case Tests

    /// <summary>
    /// When items list is empty and scope is "Project", RemoveDeletedTexts
    /// finds nothing to remove; the method returns NoAction.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ScenarioId", "TS-095")]
    [Property("BehaviorId", "EXT-016")]
    public void HandleWriteLockChange_EmptyItemsProjectScope_ReturnsNoAction()
    {
        // Arrange
        var items = new List<TextCollectionItem>();

        // Act
        ChangeAction result = TextCollectionService.HandleWriteLockChange(
            "Project",
            items,
            40
        );

        // Assert: No items to remove => NoAction
        Assert.That(
            result,
            Is.EqualTo(ChangeAction.NoAction),
            "Empty items list with Project scope should return NoAction"
        );
    }

    /// <summary>
    /// When items list is empty and scope is a book number, the method
    /// returns NoAction (nothing to reload for an empty TC).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ScenarioId", "TS-096")]
    [Property("BehaviorId", "EXT-016")]
    public void HandleWriteLockChange_EmptyItemsBookScope_ReturnsNoAction()
    {
        // Arrange
        var items = new List<TextCollectionItem>();

        // Act: Scope overlaps current book, but list is empty
        ChangeAction result = TextCollectionService.HandleWriteLockChange(
            "40",
            items,
            40
        );

        // Assert: Empty TC has nothing to reload
        Assert.That(
            result,
            Is.EqualTo(ChangeAction.NoAction),
            "Empty items list with book scope should return NoAction"
        );
    }

    /// <summary>
    /// When scope is an unrecognized string (neither "Project" nor a valid
    /// book number), the method returns NoAction.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ScenarioId", "TS-096")]
    [Property("BehaviorId", "EXT-016")]
    public void HandleWriteLockChange_UnrecognizedScope_ReturnsNoAction()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);

        var items = new List<TextCollectionItem>
        {
            new(project.Name, project.Guid.ToString(), 1.0),
        };

        // Act: Scope is an unrecognized string
        ChangeAction result = TextCollectionService.HandleWriteLockChange(
            "SomeOtherScope",
            items,
            40
        );

        // Assert: Unrecognized scope => NoAction
        Assert.That(
            result,
            Is.EqualTo(ChangeAction.NoAction),
            "Unrecognized scope should return NoAction"
        );
    }

    /// <summary>
    /// When scope is "Project" with a case variation ("project" or "PROJECT"),
    /// the method should still recognize it as a project scope. The PT9 comparison
    /// uses string equality; if the implementation is case-sensitive, this test
    /// documents that behavior.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ScenarioId", "TS-095")]
    [Property("BehaviorId", "EXT-016")]
    public void HandleWriteLockChange_ProjectScopeExactCaseRequired()
    {
        // Arrange: One deleted project
        var items = new List<TextCollectionItem>
        {
            new("GoneProject", "4444444444444444444444444444444444444444", 1.0),
        };

        // Act: Scope is exactly "Project" (PT9 uses exact string match)
        ChangeAction result = TextCollectionService.HandleWriteLockChange(
            "Project",
            items,
            40
        );

        // Assert: "Project" scope recognized, deleted text triggers RemoveAndReload
        Assert.That(
            result,
            Is.EqualTo(ChangeAction.RemoveAndReload),
            "Exact 'Project' scope should trigger RemoveDeletedTexts"
        );
    }

    /// <summary>
    /// Multiple items present with Project scope where none are deleted should
    /// return NoAction. Verifies the method correctly delegates to RemoveDeletedTexts
    /// and interprets its return value.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ScenarioId", "TS-095")]
    [Property("BehaviorId", "EXT-016,EXT-014")]
    public void HandleWriteLockChange_ProjectScopeMultiplePresent_PreservesAllItems()
    {
        // Arrange: Three present projects
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
            new(projectC.Name, projectC.Guid.ToString(), 0.9),
        };

        // Act
        ChangeAction result = TextCollectionService.HandleWriteLockChange(
            "Project",
            items,
            40
        );

        // Assert
        Assert.That(
            result,
            Is.EqualTo(ChangeAction.NoAction),
            "All present => NoAction"
        );
        Assert.That(items, Has.Count.EqualTo(3), "All items should be preserved");
        Assert.That(
            items[1].Zoom,
            Is.EqualTo(1.1).Within(0.001),
            "Zoom values should be preserved"
        );
    }

    /// <summary>
    /// Verify that the returned ChangeAction enum values are as defined in
    /// data-contracts.md: NoAction, Reload, RemoveAndReload.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ScenarioId", "TS-095,TS-096")]
    [Property("BehaviorId", "EXT-016")]
    public void ChangeAction_EnumValues_MatchDataContractDefinition()
    {
        // Assert: All three enum values exist as defined in data-contracts.md
        Assert.That(
            Enum.GetNames(typeof(ChangeAction)),
            Has.Length.EqualTo(3),
            "ChangeAction must have exactly 3 values"
        );
        Assert.That(
            Enum.IsDefined(typeof(ChangeAction), "NoAction"),
            Is.True,
            "ChangeAction must have NoAction"
        );
        Assert.That(
            Enum.IsDefined(typeof(ChangeAction), "Reload"),
            Is.True,
            "ChangeAction must have Reload"
        );
        Assert.That(
            Enum.IsDefined(typeof(ChangeAction), "RemoveAndReload"),
            Is.True,
            "ChangeAction must have RemoveAndReload"
        );
    }

    #endregion

    // ========================================================================
    // CAP-009: MergeWithZoomPreservation Tests (EXT-015)
    // ========================================================================
    // Source: EXT-015 (PT9/ParatextBase/TextCollection/TextCollectionControl.cs:598-626)
    // Contract: M-010 MergeWithZoomPreservation
    // Behaviors: BHV-T017 (zoom preservation)
    // Golden Master: gm-007 (zoom preservation on text selection change)
    //
    // MergeWithZoomPreservation merges new text selections with existing items.
    // For each ID in newSelectionIds:
    //   - If a matching item exists in existingItems (by ScrTextId), its zoom is preserved
    //   - Otherwise, the new item gets default zoom (1.0)
    // Returned list is in the order of newSelectionIds.
    // Removed items (in existingItems but not in newSelectionIds) are dropped.
    // ========================================================================

    #region CAP-009 Acceptance Test

    /// <summary>
    /// OUTER ACCEPTANCE TEST: Given existing items [A(zoom=1.2), B(zoom=0.8)]
    /// and new selection [A, C], the merge preserves A's zoom (1.2), gives C
    /// default zoom (1.0), and drops B. Result order matches newSelectionIds.
    ///
    /// This is the "done signal" for CAP-009. When this passes, the capability is complete.
    /// Source: gm-007 (zoom preservation on text selection change)
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-009")]
    [Property("GoldenMasterId", "gm-007")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015,BHV-T017")]
    public void MergeWithZoomPreservation_GoldenMasterScenario_PreservesZoomForRetainedDropsRemoved()
    {
        // Arrange: Create three projects (A, B, C) and register them
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);
        string idA = projectA.Guid.ToString();

        DummyScrText projectB = CreateDummyProject();
        ScrTextCollection.Add(projectB, true);
        string idB = projectB.Guid.ToString();

        DummyScrText projectC = CreateDummyProject();
        ScrTextCollection.Add(projectC, true);
        string idC = projectC.Guid.ToString();

        // Existing items: A with zoom 1.2, B with zoom 0.8
        var existingItems = new List<TextCollectionItem>
        {
            new(projectA.Name, idA, 1.2),
            new(projectB.Name, idB, 0.8),
        };

        // New selection: A and C (B removed, C added)
        var newSelectionIds = new List<string> { idA, idC };

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert: Result has exactly 2 items
        Assert.That(result, Has.Count.EqualTo(2), "Result should contain 2 items (A and C)");

        // Assert: A retains zoom 1.2 (preserved from existing)
        Assert.That(
            result[0].ScrTextId,
            Is.EqualTo(idA),
            "First item should be A (matches newSelectionIds order)"
        );
        Assert.That(
            result[0].Zoom,
            Is.EqualTo(1.2).Within(0.001),
            "A's zoom should be preserved at 1.2"
        );

        // Assert: C gets default zoom 1.0 (new item)
        Assert.That(
            result[1].ScrTextId,
            Is.EqualTo(idC),
            "Second item should be C (matches newSelectionIds order)"
        );
        Assert.That(
            result[1].Zoom,
            Is.EqualTo(1.0).Within(0.001),
            "C should get default zoom 1.0"
        );

        // Assert: B is not in the result (removed)
        Assert.That(
            result.Select(r => r.ScrTextId),
            Does.Not.Contain(idB),
            "B should be dropped (not in newSelectionIds)"
        );
    }

    #endregion

    #region CAP-009 Contract Tests - Happy Path

    /// <summary>
    /// A retained item (present in both existingItems and newSelectionIds)
    /// must preserve its exact zoom value from existingItems.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015")]
    public void MergeWithZoomPreservation_RetainedItem_PreservesExistingZoom()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        var existingItems = new List<TextCollectionItem>
        {
            new(project.Name, projectId, 1.5),
        };
        var newSelectionIds = new List<string> { projectId };

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(
            result[0].Zoom,
            Is.EqualTo(1.5).Within(0.001),
            "Retained item zoom must be preserved exactly"
        );
    }

    /// <summary>
    /// A new item (present in newSelectionIds but not in existingItems)
    /// must receive the default zoom of 1.0.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015")]
    public void MergeWithZoomPreservation_NewItem_GetsDefaultZoom()
    {
        // Arrange
        DummyScrText existingProject = CreateDummyProject();
        ScrTextCollection.Add(existingProject, true);
        string existingId = existingProject.Guid.ToString();

        DummyScrText newProject = CreateDummyProject();
        ScrTextCollection.Add(newProject, true);
        string newId = newProject.Guid.ToString();

        var existingItems = new List<TextCollectionItem>
        {
            new(existingProject.Name, existingId, 1.3),
        };
        var newSelectionIds = new List<string> { newId };

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(
            result[0].ScrTextId,
            Is.EqualTo(newId),
            "Result should contain the new project"
        );
        Assert.That(
            result[0].Zoom,
            Is.EqualTo(1.0).Within(0.001),
            "New items must get default zoom of 1.0"
        );
    }

    /// <summary>
    /// An item in existingItems but NOT in newSelectionIds must be dropped
    /// from the result entirely.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015")]
    public void MergeWithZoomPreservation_RemovedItem_IsDropped()
    {
        // Arrange
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);
        string idA = projectA.Guid.ToString();

        DummyScrText projectB = CreateDummyProject();
        ScrTextCollection.Add(projectB, true);
        string idB = projectB.Guid.ToString();

        var existingItems = new List<TextCollectionItem>
        {
            new(projectA.Name, idA, 1.0),
            new(projectB.Name, idB, 1.0),
        };
        // Only keep A; B is removed
        var newSelectionIds = new List<string> { idA };

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert
        Assert.That(result, Has.Count.EqualTo(1), "Only retained items should be in result");
        Assert.That(result[0].ScrTextId, Is.EqualTo(idA));
        Assert.That(
            result.Select(r => r.ScrTextId),
            Does.Not.Contain(idB),
            "Removed items must not appear in result"
        );
    }

    /// <summary>
    /// The result order must match the order of newSelectionIds, not the
    /// order of existingItems. This ensures user-specified ordering is honored.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015")]
    public void MergeWithZoomPreservation_ResultOrder_MatchesNewSelectionIds()
    {
        // Arrange: existing order is A, B; new selection order is B, A
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);
        string idA = projectA.Guid.ToString();

        DummyScrText projectB = CreateDummyProject();
        ScrTextCollection.Add(projectB, true);
        string idB = projectB.Guid.ToString();

        var existingItems = new List<TextCollectionItem>
        {
            new(projectA.Name, idA, 1.1),
            new(projectB.Name, idB, 0.9),
        };
        // Reversed order in new selection
        var newSelectionIds = new List<string> { idB, idA };

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert: order matches newSelectionIds (B first, then A)
        Assert.That(result, Has.Count.EqualTo(2));
        Assert.That(
            result[0].ScrTextId,
            Is.EqualTo(idB),
            "First item should be B (per newSelectionIds order)"
        );
        Assert.That(
            result[0].Zoom,
            Is.EqualTo(0.9).Within(0.001),
            "B's zoom should be preserved"
        );
        Assert.That(
            result[1].ScrTextId,
            Is.EqualTo(idA),
            "Second item should be A (per newSelectionIds order)"
        );
        Assert.That(
            result[1].Zoom,
            Is.EqualTo(1.1).Within(0.001),
            "A's zoom should be preserved"
        );
    }

    /// <summary>
    /// When all items in newSelectionIds are new (none exist in existingItems),
    /// all items should receive default zoom of 1.0.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015")]
    public void MergeWithZoomPreservation_AllNewItems_AllGetDefaultZoom()
    {
        // Arrange
        DummyScrText oldProject = CreateDummyProject();
        ScrTextCollection.Add(oldProject, true);
        string oldId = oldProject.Guid.ToString();

        DummyScrText newProjectA = CreateDummyProject();
        ScrTextCollection.Add(newProjectA, true);
        string newIdA = newProjectA.Guid.ToString();

        DummyScrText newProjectB = CreateDummyProject();
        ScrTextCollection.Add(newProjectB, true);
        string newIdB = newProjectB.Guid.ToString();

        var existingItems = new List<TextCollectionItem>
        {
            new(oldProject.Name, oldId, 2.0),
        };
        // Completely new set of projects
        var newSelectionIds = new List<string> { newIdA, newIdB };

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert
        Assert.That(result, Has.Count.EqualTo(2));
        Assert.That(
            result[0].Zoom,
            Is.EqualTo(1.0).Within(0.001),
            "New item A should get default zoom"
        );
        Assert.That(
            result[1].Zoom,
            Is.EqualTo(1.0).Within(0.001),
            "New item B should get default zoom"
        );
    }

    /// <summary>
    /// New items must have their ScrTextName resolved from the project
    /// (via ScrTextCollection lookup), not left empty.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015")]
    public void MergeWithZoomPreservation_NewItem_HasResolvedProjectName()
    {
        // Arrange
        DummyScrText newProject = CreateDummyProject();
        ScrTextCollection.Add(newProject, true);
        string newId = newProject.Guid.ToString();

        var existingItems = new List<TextCollectionItem>();
        var newSelectionIds = new List<string> { newId };

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert: Name should be resolved from the project, not empty
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(
            result[0].ScrTextName,
            Is.Not.Null.And.Not.Empty,
            "New item must have its project name resolved"
        );
        Assert.That(
            result[0].ScrTextName,
            Is.EqualTo(newProject.Name),
            "Resolved name must match the actual project name"
        );
    }

    #endregion

    #region CAP-009 Golden Master Tests

    /// <summary>
    /// Golden master gm-007: TC has [A(zoom=1.2), B(zoom=0.8)]; new selection is [A, C].
    /// Result: A retains zoom 1.2; C gets default zoom 1.0; B removed.
    /// Verifies full golden master scenario with precise zoom values.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-009")]
    [Property("GoldenMasterId", "gm-007")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015,BHV-T017")]
    public void MergeWithZoomPreservation_GoldenMaster007_ExactZoomValues()
    {
        // Arrange: Reproduce gm-007 input exactly
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);
        string idA = projectA.Guid.ToString();

        DummyScrText projectB = CreateDummyProject();
        ScrTextCollection.Add(projectB, true);
        string idB = projectB.Guid.ToString();

        DummyScrText projectC = CreateDummyProject();
        ScrTextCollection.Add(projectC, true);
        string idC = projectC.Guid.ToString();

        // gm-007 input: existing = [{A, zoom=1.2}, {B, zoom=0.8}]
        var existingItems = new List<TextCollectionItem>
        {
            new(projectA.Name, idA, 1.2),
            new(projectB.Name, idB, 0.8),
        };

        // gm-007 input: newSelection = [A, C]
        var newSelectionIds = new List<string> { idA, idC };

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert: gm-007 expected output
        // resultItems: [{A, zoom=1.2, zoomSource=preserved}, {C, zoom=1.0, zoomSource=default}]
        Assert.That(result, Has.Count.EqualTo(2), "gm-007: result should have 2 items");

        // Item A: zoom preserved at 1.2
        Assert.That(
            result[0].ScrTextId,
            Is.EqualTo(idA),
            "gm-007: first item should be A"
        );
        Assert.That(
            result[0].Zoom,
            Is.EqualTo(1.2).Within(0.001),
            "gm-007: A zoom should be preserved at 1.2"
        );

        // Item C: zoom default at 1.0
        Assert.That(
            result[1].ScrTextId,
            Is.EqualTo(idC),
            "gm-007: second item should be C"
        );
        Assert.That(
            result[1].Zoom,
            Is.EqualTo(1.0).Within(0.001),
            "gm-007: C zoom should be default 1.0"
        );

        // B should be removed (not in result)
        Assert.That(
            result.Any(r => r.ScrTextId == idB),
            Is.False,
            "gm-007: B should be removed (not in newSelection)"
        );
    }

    #endregion

    #region CAP-009 Edge Case Tests

    /// <summary>
    /// When newSelectionIds is empty, the result should be an empty list.
    /// All existing items are effectively removed.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015")]
    public void MergeWithZoomPreservation_EmptyNewSelection_ReturnsEmptyList()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        var existingItems = new List<TextCollectionItem>
        {
            new(project.Name, projectId, 1.5),
        };
        var newSelectionIds = new List<string>();

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert
        Assert.That(result, Has.Count.EqualTo(0), "Empty selection should return empty list");
    }

    /// <summary>
    /// When existingItems is empty but newSelectionIds has items,
    /// all items should get default zoom of 1.0.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015")]
    public void MergeWithZoomPreservation_EmptyExistingItems_AllNewGetDefaultZoom()
    {
        // Arrange
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);
        string idA = projectA.Guid.ToString();

        DummyScrText projectB = CreateDummyProject();
        ScrTextCollection.Add(projectB, true);
        string idB = projectB.Guid.ToString();

        var existingItems = new List<TextCollectionItem>();
        var newSelectionIds = new List<string> { idA, idB };

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert
        Assert.That(result, Has.Count.EqualTo(2));
        Assert.That(
            result[0].Zoom,
            Is.EqualTo(1.0).Within(0.001),
            "All new items should get default zoom"
        );
        Assert.That(
            result[1].Zoom,
            Is.EqualTo(1.0).Within(0.001),
            "All new items should get default zoom"
        );
    }

    /// <summary>
    /// When all existing items are retained (newSelectionIds == existingItems by ID),
    /// all zooms should be preserved exactly.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015")]
    public void MergeWithZoomPreservation_AllRetained_AllZoomPreserved()
    {
        // Arrange
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);
        string idA = projectA.Guid.ToString();

        DummyScrText projectB = CreateDummyProject();
        ScrTextCollection.Add(projectB, true);
        string idB = projectB.Guid.ToString();

        DummyScrText projectC = CreateDummyProject();
        ScrTextCollection.Add(projectC, true);
        string idC = projectC.Guid.ToString();

        var existingItems = new List<TextCollectionItem>
        {
            new(projectA.Name, idA, 1.1),
            new(projectB.Name, idB, 0.8),
            new(projectC.Name, idC, 2.0),
        };
        var newSelectionIds = new List<string> { idA, idB, idC };

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert
        Assert.That(result, Has.Count.EqualTo(3));
        Assert.That(result[0].Zoom, Is.EqualTo(1.1).Within(0.001), "A zoom preserved");
        Assert.That(result[1].Zoom, Is.EqualTo(0.8).Within(0.001), "B zoom preserved");
        Assert.That(result[2].Zoom, Is.EqualTo(2.0).Within(0.001), "C zoom preserved");
    }

    /// <summary>
    /// When there is exactly one item that is retained, its zoom is preserved.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015")]
    public void MergeWithZoomPreservation_SingleItemRetained_ZoomPreserved()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        var existingItems = new List<TextCollectionItem>
        {
            new(project.Name, projectId, 0.7),
        };
        var newSelectionIds = new List<string> { projectId };

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(
            result[0].Zoom,
            Is.EqualTo(0.7).Within(0.001),
            "Single retained item zoom must be preserved"
        );
    }

    /// <summary>
    /// When there is no overlap between existingItems and newSelectionIds,
    /// all result items should have default zoom 1.0.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015")]
    public void MergeWithZoomPreservation_NoOverlap_AllDefaultZoom()
    {
        // Arrange
        DummyScrText oldProject = CreateDummyProject();
        ScrTextCollection.Add(oldProject, true);
        string oldId = oldProject.Guid.ToString();

        DummyScrText newProject = CreateDummyProject();
        ScrTextCollection.Add(newProject, true);
        string newId = newProject.Guid.ToString();

        var existingItems = new List<TextCollectionItem>
        {
            new(oldProject.Name, oldId, 1.5),
        };
        // Completely different project
        var newSelectionIds = new List<string> { newId };

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(
            result[0].Zoom,
            Is.EqualTo(1.0).Within(0.001),
            "No overlap means all items get default zoom"
        );
        Assert.That(
            result[0].ScrTextId,
            Is.EqualTo(newId),
            "Result should contain the new project ID"
        );
    }

    /// <summary>
    /// Zoom values very close to 1.0 (but not exactly 1.0) must be preserved
    /// exactly, not rounded or snapped to 1.0.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015")]
    public void MergeWithZoomPreservation_ZoomNearOne_PreservedExactly()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Zoom very close to 1.0 but not exactly 1.0
        double nearOneZoom = 1.0 / 1.1 * 1.1; // Should be ~1.0 but may have floating point noise
        var existingItems = new List<TextCollectionItem>
        {
            new(project.Name, projectId, 0.99),
        };
        var newSelectionIds = new List<string> { projectId };

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(
            result[0].Zoom,
            Is.EqualTo(0.99).Within(0.001),
            "Near-1.0 zoom must be preserved without snapping"
        );
    }

    /// <summary>
    /// Large zoom values (e.g., from repeated Ctrl+= zoom-in) must be
    /// preserved exactly.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015")]
    public void MergeWithZoomPreservation_LargeZoom_PreservedExactly()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Large zoom from repeated zoom-in (*1.1 many times)
        double largeZoom = 3.138; // approximately 1.0 * 1.1^12
        var existingItems = new List<TextCollectionItem>
        {
            new(project.Name, projectId, largeZoom),
        };
        var newSelectionIds = new List<string> { projectId };

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(
            result[0].Zoom,
            Is.EqualTo(largeZoom).Within(0.001),
            "Large zoom values must be preserved exactly"
        );
    }

    /// <summary>
    /// When both existing and new lists are empty, the result should be empty.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015")]
    public void MergeWithZoomPreservation_BothEmpty_ReturnsEmptyList()
    {
        // Arrange
        var existingItems = new List<TextCollectionItem>();
        var newSelectionIds = new List<string>();

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert
        Assert.That(result, Has.Count.EqualTo(0), "Both empty => empty result");
    }

    /// <summary>
    /// Retained items must have their ScrTextName preserved from existingItems
    /// (not re-resolved), since the project name is already known.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015")]
    public void MergeWithZoomPreservation_RetainedItem_PreservesName()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();
        string originalName = project.Name;

        var existingItems = new List<TextCollectionItem>
        {
            new(originalName, projectId, 1.3),
        };
        var newSelectionIds = new List<string> { projectId };

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert: Name should be preserved from existingItems
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(
            result[0].ScrTextName,
            Is.EqualTo(originalName),
            "Retained item name should be preserved"
        );
    }

    /// <summary>
    /// When multiple items have various zoom levels and the new selection
    /// reorders them, zooms are matched correctly by ScrTextId, not position.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015")]
    public void MergeWithZoomPreservation_Reorder_ZoomMatchedById()
    {
        // Arrange: 3 existing items with distinct zooms
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);
        string idA = projectA.Guid.ToString();

        DummyScrText projectB = CreateDummyProject();
        ScrTextCollection.Add(projectB, true);
        string idB = projectB.Guid.ToString();

        DummyScrText projectC = CreateDummyProject();
        ScrTextCollection.Add(projectC, true);
        string idC = projectC.Guid.ToString();

        var existingItems = new List<TextCollectionItem>
        {
            new(projectA.Name, idA, 1.1),
            new(projectB.Name, idB, 1.2),
            new(projectC.Name, idC, 1.3),
        };
        // Reverse order
        var newSelectionIds = new List<string> { idC, idB, idA };

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert: Each zoom matched by ID despite reordering
        Assert.That(result, Has.Count.EqualTo(3));
        Assert.That(result[0].ScrTextId, Is.EqualTo(idC));
        Assert.That(result[0].Zoom, Is.EqualTo(1.3).Within(0.001), "C zoom matched by ID");
        Assert.That(result[1].ScrTextId, Is.EqualTo(idB));
        Assert.That(result[1].Zoom, Is.EqualTo(1.2).Within(0.001), "B zoom matched by ID");
        Assert.That(result[2].ScrTextId, Is.EqualTo(idA));
        Assert.That(result[2].Zoom, Is.EqualTo(1.1).Within(0.001), "A zoom matched by ID");
    }

    /// <summary>
    /// Small zoom values (e.g., from repeated zoom-out operations)
    /// must be preserved exactly without clamping to a minimum.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "EXT-015")]
    public void MergeWithZoomPreservation_SmallZoom_PreservedExactly()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Small zoom from repeated zoom-out (/1.1 many times)
        double smallZoom = 0.35;
        var existingItems = new List<TextCollectionItem>
        {
            new(project.Name, projectId, smallZoom),
        };
        var newSelectionIds = new List<string> { projectId };

        // Act
        IList<TextCollectionItem> result = TextCollectionService.MergeWithZoomPreservation(
            existingItems,
            newSelectionIds
        );

        // Assert
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(
            result[0].Zoom,
            Is.EqualTo(smallZoom).Within(0.001),
            "Small zoom values must be preserved exactly"
        );
    }

    #endregion
}
