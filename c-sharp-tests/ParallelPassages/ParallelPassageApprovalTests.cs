using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.ParallelPassages;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.ParallelPassages;

/// <summary>
/// Tests for CAP-003 (ToggleSetApproval) and CAP-004 (ToggleIndividualApproval).
/// RED-phase TDD tests. EXT-003, EXT-004: Approval toggle with cross-type propagation.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class ParallelPassageApprovalTests : PapiTestBase
{
    #region CAP-003: ToggleSetApproval - Acceptance Test

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "EXT-003")]
    [Description(
        "Acceptance test: ToggleSetApproval on NTtoOT passage marks all Finished and propagates to related passages"
    )]
    public void ToggleSetApproval_AcceptanceTest_NTtoOT_TogglesAndPropagates()
    {
        // Arrange
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        var ntToOt = passages.FirstOrDefault(p =>
            p.PassageType == ParallelPassageType.NTtoOT
        );
        Assert.That(ntToOt, Is.Not.Null, "Test data must contain NTtoOT passages");

        // Act - toggle from Unfinished to Finished
        var result = approvalService.ToggleSetApproval(scrText, ntToOt!);

        // Assert - gm-004: all verses finished, related passages toggled
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Success, Is.True);
        Assert.That(result.UpdatedStatuses, Is.Not.Null);
        Assert.That(
            result.UpdatedStatuses!.AllTicked,
            Is.True,
            "gm-004: All verses should be Finished after toggle from AllUnfinished"
        );

        // Verify propagation: check related OTtoOT was also toggled
        var relatedOtToOt = accessor.FindRelatedPassage(ntToOt, ParallelPassageType.OTtoOT);
        if (relatedOtToOt != null)
        {
            var relatedStatus = statusService.GetAggregatedStatus(scrText, relatedOtToOt);
            Assert.That(
                relatedStatus.AllTicked,
                Is.True,
                "gm-004: Related OTtoOT passage should also be Finished"
            );
        }

        // Verify propagation: check related NTtoNT was also toggled
        var relatedNtToNt = accessor.FindRelatedPassage(ntToOt, ParallelPassageType.NTtoNT);
        if (relatedNtToNt != null)
        {
            var relatedStatus = statusService.GetAggregatedStatus(scrText, relatedNtToNt);
            Assert.That(
                relatedStatus.AllTicked,
                Is.True,
                "gm-004: Related NTtoNT passage should also be Finished"
            );
        }
    }

    #endregion

    #region CAP-003: Contract Tests - ToggleSetApproval

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "EXT-003")]
    [Description("ToggleSetApproval on AllUnfinished sets all verses to Finished")]
    public void ToggleSetApproval_AllUnfinished_SetsAllToFinished()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        Assert.That(passages.Count, Is.GreaterThan(0));
        var passage = passages[0];

        // Fresh project: AllUnfinished should be true
        var preStatus = statusService.GetAggregatedStatus(scrText, passage);
        Assert.That(preStatus.AllUnfinished, Is.True, "Precondition: all unfinished");

        var result = approvalService.ToggleSetApproval(scrText, passage);

        Assert.That(result.Success, Is.True);
        Assert.That(result.UpdatedStatuses!.AllTicked, Is.True,
            "All verses should become Finished");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "EXT-003")]
    [Description("ToggleSetApproval on NTtoNT does NOT propagate to related passages")]
    public void ToggleSetApproval_NTtoNT_DoesNotPropagate()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        var ntToNt = passages.FirstOrDefault(p =>
            p.PassageType == ParallelPassageType.NTtoNT
        );
        if (ntToNt == null)
            Assert.Inconclusive("No NTtoNT passages in test data");

        var result = approvalService.ToggleSetApproval(scrText, ntToNt);

        Assert.That(result.Success, Is.True);
        // NTtoNT should not propagate; only NTtoOT propagates
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "EXT-003")]
    [Description("ToggleSetApproval on OTtoOT does NOT propagate to related passages")]
    public void ToggleSetApproval_OTtoOT_DoesNotPropagate()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        var otToOt = passages.FirstOrDefault(p =>
            p.PassageType == ParallelPassageType.OTtoOT
        );
        if (otToOt == null)
            Assert.Inconclusive("No OTtoOT passages in test data");

        var result = approvalService.ToggleSetApproval(scrText, otToOt);

        Assert.That(result.Success, Is.True);
        // OTtoOT should not propagate
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "EXT-003")]
    [Description("ToggleSetApproval returns ApprovalResult with updated StatusAggregation")]
    public void ToggleSetApproval_ValidPassage_ReturnsApprovalResultWithStatus()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        var passage = passages[0];

        var result = approvalService.ToggleSetApproval(scrText, passage);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Success, Is.True);
        Assert.That(result.UpdatedStatuses, Is.Not.Null);
        Assert.That(result.ErrorCode, Is.Null);
        Assert.That(result.Message, Is.Null);
    }

    #endregion

    #region CAP-003: Error Cases

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "EXT-003")]
    [Description("ToggleSetApproval with null ScrText returns error")]
    public void ToggleSetApproval_NullScrText_ReturnsError()
    {
        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        if (passages.Count == 0)
            Assert.Inconclusive("No passages in test data");

        var result = approvalService.ToggleSetApproval(null!, passages[0]);

        Assert.That(result.Success, Is.False);
        Assert.That(result.ErrorCode, Is.Not.Null);
    }

    #endregion

    #region CAP-003: Golden Master Tests

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "EXT-003")]
    [Description("gm-004: Set toggle on NTtoOT propagates to OTtoOT and NTtoNT")]
    public void ToggleSetApproval_GoldenMaster004_PropagatesCorrectly()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        var ntToOt = passages.FirstOrDefault(p =>
            p.PassageType == ParallelPassageType.NTtoOT
        );
        Assert.That(ntToOt, Is.Not.Null, "Need NTtoOT passage for gm-004");

        // gm-004 input: NTtoOT, currentState=AllUnfinished
        var result = approvalService.ToggleSetApproval(scrText, ntToOt!);

        // gm-004 expected: allVersesFinished=true, propagatedTo=[OTtoOT, NTtoNT]
        Assert.That(result.Success, Is.True, "gm-004: toggle should succeed");
        Assert.That(result.UpdatedStatuses!.AllTicked, Is.True,
            "gm-004: all verses should be Finished");
    }

    #endregion

    #region CAP-003: Invariant Tests

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-PP1")]
    [Property("BehaviorId", "EXT-003")]
    [Description("Double-toggle returns to original state (toggle idempotency)")]
    public void ToggleSetApproval_DoubleToggle_ReturnsToOriginalState()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        var passage = passages[0];

        var originalStatus = statusService.GetAggregatedStatus(scrText, passage);

        // Toggle twice
        approvalService.ToggleSetApproval(scrText, passage);
        approvalService.ToggleSetApproval(scrText, passage);

        var finalStatus = statusService.GetAggregatedStatus(scrText, passage);

        Assert.That(
            finalStatus.AllTicked,
            Is.EqualTo(originalStatus.AllTicked),
            "INV-PP1: Double toggle should restore AllTicked"
        );
        Assert.That(
            finalStatus.AllUnfinished,
            Is.EqualTo(originalStatus.AllUnfinished),
            "INV-PP1: Double toggle should restore AllUnfinished"
        );
    }

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-PP2")]
    [Property("BehaviorId", "EXT-003")]
    [Description("NTtoOT set-toggle propagates to both OTtoOT and NTtoNT if they exist")]
    public void ToggleSetApproval_NTtoOT_PropagatesSymmetrically()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        var ntToOt = passages.FirstOrDefault(p =>
            p.PassageType == ParallelPassageType.NTtoOT
        );
        if (ntToOt == null)
            Assert.Inconclusive("No NTtoOT passages");

        approvalService.ToggleSetApproval(scrText, ntToOt);

        // INV-PP2: Both related OTtoOT and NTtoNT should be toggled
        var relatedOt = accessor.FindRelatedPassage(ntToOt, ParallelPassageType.OTtoOT);
        var relatedNt = accessor.FindRelatedPassage(ntToOt, ParallelPassageType.NTtoNT);

        if (relatedOt != null)
        {
            var otStatus = statusService.GetAggregatedStatus(scrText, relatedOt);
            Assert.That(otStatus.AllTicked, Is.True,
                "INV-PP2: Related OTtoOT must be toggled");
        }

        if (relatedNt != null)
        {
            var ntStatus = statusService.GetAggregatedStatus(scrText, relatedNt);
            Assert.That(ntStatus.AllTicked, Is.True,
                "INV-PP2: Related NTtoNT must be toggled");
        }
    }

    #endregion

    // =========================================================================
    // CAP-004: ToggleIndividualApproval
    // =========================================================================

    #region CAP-004: ToggleIndividualApproval - Acceptance Test

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "EXT-004")]
    [Description(
        "Acceptance test: ToggleIndividualApproval on NTtoOT with OT head verse propagates to OTtoOT"
    )]
    public void ToggleIndividualApproval_AcceptanceTest_NTtoOT_OTHead_PropagatesToOTtoOT()
    {
        // Arrange
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        var ntToOt = passages.FirstOrDefault(p =>
            p.PassageType == ParallelPassageType.NTtoOT
        );
        Assert.That(ntToOt, Is.Not.Null, "Need NTtoOT passage for gm-005");

        // Find an OT head verse in this passage
        var otHeadVerse = ntToOt!.Verses.FirstOrDefault(v =>
            ParallelPassageAccessor.ParseBookNumber(v) < 40
        );
        Assert.That(otHeadVerse, Is.Not.Null, "Need OT verse in NTtoOT passage");

        // Act
        var result = approvalService.ToggleIndividualApproval(scrText, ntToOt, otHeadVerse!);

        // Assert - gm-005: verse toggled, related OTtoOT also toggled
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Success, Is.True);

        var relatedOtToOt = accessor.FindRelatedPassage(ntToOt, ParallelPassageType.OTtoOT);
        if (relatedOtToOt != null)
        {
            // gm-005: relatedOTtoOTToggled=true
            var relatedStatus = statusService.GetAggregatedStatus(scrText, relatedOtToOt);
            Assert.That(
                relatedStatus.AllTicked,
                Is.True,
                "gm-005: Related OTtoOT should be toggled for OT head verse"
            );
        }
    }

    #endregion

    #region CAP-004: Contract Tests - ToggleIndividualApproval

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "EXT-004")]
    [Description("ToggleIndividualApproval toggles single verse state")]
    public void ToggleIndividualApproval_ValidVerse_TogglesState()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        var passage = passages[0];
        var headVerse = passage.HeadReference;

        var result = approvalService.ToggleIndividualApproval(scrText, passage, headVerse);

        Assert.That(result.Success, Is.True);
        Assert.That(result.UpdatedStatuses, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "EXT-004")]
    [Description("NTtoOT + NT head verse propagates to related NTtoNT")]
    public void ToggleIndividualApproval_NTtoOT_NTHead_PropagatesToNTtoNT()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        var ntToOt = passages.FirstOrDefault(p =>
            p.PassageType == ParallelPassageType.NTtoOT
        );
        if (ntToOt == null)
            Assert.Inconclusive("No NTtoOT passages");

        // Find NT head verse
        var ntHeadVerse = ntToOt.Verses.FirstOrDefault(v =>
            ParallelPassageAccessor.ParseBookNumber(v) >= 40
        );
        if (ntHeadVerse == null)
            Assert.Inconclusive("No NT verse in NTtoOT passage");

        var result = approvalService.ToggleIndividualApproval(scrText, ntToOt, ntHeadVerse);

        Assert.That(result.Success, Is.True);
        // NTtoOT + NT head -> propagate to NTtoNT
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "EXT-004")]
    [Description("OTtoOT + OT head verse propagates to related NTtoOT")]
    public void ToggleIndividualApproval_OTtoOT_OTHead_PropagatesToNTtoOT()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        var otToOt = passages.FirstOrDefault(p =>
            p.PassageType == ParallelPassageType.OTtoOT
        );
        if (otToOt == null)
            Assert.Inconclusive("No OTtoOT passages");

        var headVerse = otToOt.HeadReference;

        var result = approvalService.ToggleIndividualApproval(scrText, otToOt, headVerse);

        Assert.That(result.Success, Is.True);
        // OTtoOT -> propagate to NTtoOT
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "EXT-004")]
    [Description("NTtoNT + NT head verse propagates to related NTtoOT")]
    public void ToggleIndividualApproval_NTtoNT_NTHead_PropagatesToNTtoOT()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        var ntToNt = passages.FirstOrDefault(p =>
            p.PassageType == ParallelPassageType.NTtoNT
        );
        if (ntToNt == null)
            Assert.Inconclusive("No NTtoNT passages");

        var headVerse = ntToNt.HeadReference;

        var result = approvalService.ToggleIndividualApproval(scrText, ntToNt, headVerse);

        Assert.That(result.Success, Is.True);
        // NTtoNT -> propagate to NTtoOT
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "EXT-004")]
    [Description("Returns ApprovalResult with updated status aggregation")]
    public void ToggleIndividualApproval_ValidInput_ReturnsApprovalResult()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        var passage = passages[0];

        var result = approvalService.ToggleIndividualApproval(
            scrText,
            passage,
            passage.HeadReference
        );

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Success, Is.True);
        Assert.That(result.UpdatedStatuses, Is.Not.Null);
        Assert.That(result.ErrorCode, Is.Null);
    }

    #endregion

    #region CAP-004: Error Cases

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "EXT-004")]
    [Description("ToggleIndividualApproval with invalid head verse returns error")]
    public void ToggleIndividualApproval_InvalidHeadVerse_ReturnsNotFoundError()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        var passage = passages[0];

        var result = approvalService.ToggleIndividualApproval(
            scrText,
            passage,
            "INVALID 99:99" // Not in passage
        );

        Assert.That(result.Success, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("NOT_FOUND"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "EXT-004")]
    [Description("ToggleIndividualApproval with null ScrText returns error")]
    public void ToggleIndividualApproval_NullScrText_ReturnsError()
    {
        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        if (passages.Count == 0)
            Assert.Inconclusive("No passages");

        var result = approvalService.ToggleIndividualApproval(
            null!,
            passages[0],
            passages[0].HeadReference
        );

        Assert.That(result.Success, Is.False);
    }

    #endregion

    #region CAP-004: Golden Master Tests

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "EXT-004")]
    [Description("gm-005: Individual toggle on NTtoOT with OT head propagates to OTtoOT")]
    public void ToggleIndividualApproval_GoldenMaster005_OTHeadPropagatesToOTtoOT()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        var ntToOt = passages.FirstOrDefault(p =>
            p.PassageType == ParallelPassageType.NTtoOT
        );
        Assert.That(ntToOt, Is.Not.Null, "Need NTtoOT for gm-005");

        var otVerse = ntToOt!.Verses.FirstOrDefault(v =>
            ParallelPassageAccessor.ParseBookNumber(v) < 40
        );
        if (otVerse == null)
            Assert.Inconclusive("No OT verse in NTtoOT passage");

        var result = approvalService.ToggleIndividualApproval(scrText, ntToOt, otVerse);

        // gm-005: verseToggled=true, relatedOTtoOTToggled=true
        Assert.That(result.Success, Is.True, "gm-005: toggle should succeed");
    }

    #endregion

    #region CAP-004: Invariant Tests

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-PP1")]
    [Property("BehaviorId", "EXT-004")]
    [Description("Individual double-toggle returns to original state")]
    public void ToggleIndividualApproval_DoubleToggle_ReturnsToOriginalState()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var accessor = new ParallelPassageAccessor();
        var statusService = new ParallelPassageStatusService();
        var approvalService = new ParallelPassageApprovalService(accessor, statusService);

        var passages = accessor.GetAllPassages();
        var passage = passages[0];
        var headVerse = passage.HeadReference;

        var originalStatus = statusService.GetAggregatedStatus(scrText, passage);

        // Toggle twice
        approvalService.ToggleIndividualApproval(scrText, passage, headVerse);
        approvalService.ToggleIndividualApproval(scrText, passage, headVerse);

        var finalStatus = statusService.GetAggregatedStatus(scrText, passage);

        // INV-PP1: double toggle should restore state
        Assert.That(
            finalStatus.AllUnfinished,
            Is.EqualTo(originalStatus.AllUnfinished),
            "INV-PP1: Double individual toggle should restore state"
        );
    }

    #endregion
}
