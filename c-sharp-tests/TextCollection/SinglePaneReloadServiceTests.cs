// === TEST FILE: CAP-007 DetermineReloadDecision ===
// TDD Phase: RED (tests should fail -- implementation throws NotImplementedException)
// Capability: CAP-007 (DetermineReloadDecision)
// Micro-Phase: BE-3 (Domain: Rendering Pipeline)
// Source: EXT-008 (PT9/ParatextBase/TextCollection/TextCollectionControl.cs:357-420)
// TDD Variant: Classic (stateful service, interface emerges from extraction)

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.TextCollection;

namespace TestParanextDataProvider.TextCollection;

/// <summary>
/// Tests for SinglePaneReloadService.DetermineReloadDecision (CAP-007).
///
/// This is the ONLY stateful capability in the Text Collection feature.
/// SinglePaneReloadService maintains a per-text zoom dictionary (ConcurrentDictionary
/// keyed by project GUID) and determines whether the single pane needs a full reload
/// based on three conditions:
///   1. Text changed (different ScrTextId between previousItem and curItem)
///   2. View mode changed (different viewName from last call)
///   3. Force reload flag set
///
/// When a full reload is needed and a previousItem exists, the service saves the
/// previousItem's zoom to the dictionary. When loading the curItem, it restores
/// the saved zoom if one exists, or defaults to the curItem's own Zoom property.
///
/// Source: EXT-008 (PT9/ParatextBase/TextCollection/TextCollectionControl.cs:357-420)
/// PT9 state: Dictionary&lt;HexId, double&gt; singleTextZooms
/// PT10 adaptation: ConcurrentDictionary&lt;string, double&gt; for thread safety
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class SinglePaneReloadServiceTests
{
    private SinglePaneReloadService _service = null!;

    // Test data: two distinct items representing different projects
    private static readonly TextCollectionItem ItemA = new("ProjectA", "guid-aaa", 1.0);
    private static readonly TextCollectionItem ItemB = new("ProjectB", "guid-bbb", 1.0);
    private static readonly TextCollectionItem ItemC = new("ProjectC", "guid-ccc", 1.0);

    // Items with custom zoom values
    private static readonly TextCollectionItem ItemAZoom13 = new("ProjectA", "guid-aaa", 1.3);
    private static readonly TextCollectionItem ItemBZoom09 = new("ProjectB", "guid-bbb", 0.9);
    private static readonly TextCollectionItem ItemAZoom15 = new("ProjectA", "guid-aaa", 1.5);

    private const string DefaultVerseRef = "MAT 1:1";
    private const string DefaultViewName = "Preview";

    [SetUp]
    public void SetUp()
    {
        _service = new SinglePaneReloadService();
    }

    #region Acceptance Tests

    /// <summary>
    /// ACCEPTANCE TEST for CAP-007 (TS-098 + TS-099 combined).
    ///
    /// Scenario: Switch from text A to text B and back to A, verifying:
    /// 1. Text change from A to B triggers full reload (TS-098)
    /// 2. Text A's zoom is saved before switching away
    /// 3. Returning to text A restores its saved zoom (TS-099)
    ///
    /// This is the "done signal" for CAP-007. When this passes, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-098,TS-099")]
    [Property("BehaviorId", "EXT-008,BHV-T007")]
    public void DetermineReloadDecision_SwitchTextsSaveRestoreZoom_AcceptanceTest()
    {
        // Step 1: First load of text A (no previous item)
        var result1 = _service.DetermineReloadDecision(
            ItemAZoom13,
            null,
            DefaultVerseRef,
            DefaultViewName,
            forceReload: false
        );
        Assert.That(result1.FullReloadNeeded, Is.True, "First call always needs full reload");
        Assert.That(
            result1.ZoomToApply,
            Is.EqualTo(1.3),
            "First visit to text A should use item's zoom (1.3)"
        );

        // Step 2: Switch to text B (text change triggers full reload, saves A's zoom)
        var result2 = _service.DetermineReloadDecision(
            ItemB,
            ItemAZoom13,
            DefaultVerseRef,
            DefaultViewName,
            forceReload: false
        );
        Assert.That(
            result2.FullReloadNeeded,
            Is.True,
            "TS-098: Text change must trigger full reload"
        );
        Assert.That(
            result2.ZoomToApply,
            Is.EqualTo(1.0),
            "First visit to text B should use default zoom (1.0)"
        );

        // Step 3: Switch back to text A (text change triggers full reload, restores A's zoom)
        var result3 = _service.DetermineReloadDecision(
            ItemAZoom13,
            ItemB,
            DefaultVerseRef,
            DefaultViewName,
            forceReload: false
        );
        Assert.That(
            result3.FullReloadNeeded,
            Is.True,
            "Text change back to A must trigger full reload"
        );
        Assert.That(
            result3.ZoomToApply,
            Is.EqualTo(1.3),
            "TS-099: Returning to text A must restore its saved zoom (1.3)"
        );
    }

    #endregion

    #region Full Reload Conditions

    /// <summary>
    /// When curItem has a different ScrTextId than previousItem, a full reload is needed.
    /// This is the primary reload trigger: the user switched to a different text.
    ///
    /// PT9 logic: joinedScrText != uiSingleResource.ScriptureText
    /// PT10 equivalent: curItem.ScrTextId != previousItem.ScrTextId
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-098")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_TextChanged_ReturnsFullReloadNeeded()
    {
        // Arrange: first establish item A as current
        _service.DetermineReloadDecision(ItemA, null, DefaultVerseRef, DefaultViewName, false);

        // Act: switch from A to B (different ScrTextId)
        var result = _service.DetermineReloadDecision(
            ItemB,
            ItemA,
            DefaultVerseRef,
            DefaultViewName,
            forceReload: false
        );

        // Assert
        Assert.That(result.FullReloadNeeded, Is.True, "Different text must trigger full reload");
    }

    /// <summary>
    /// When viewName changes between calls, a full reload is needed even if the text
    /// is the same.
    ///
    /// PT9 logic: uiSingleResource.View.Name != viewName
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-098")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_ViewModeChanged_ReturnsFullReloadNeeded()
    {
        // Arrange: first call with "Preview"
        _service.DetermineReloadDecision(ItemA, null, DefaultVerseRef, "Preview", false);

        // Act: same text, different view mode
        var result = _service.DetermineReloadDecision(
            ItemA,
            ItemA,
            DefaultVerseRef,
            "Unformatted",
            forceReload: false
        );

        // Assert
        Assert.That(
            result.FullReloadNeeded,
            Is.True,
            "View mode change must trigger full reload"
        );
    }

    /// <summary>
    /// When forceReload is true, a full reload is always needed regardless of other conditions.
    ///
    /// PT9 logic: forceReload parameter check
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-098")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_ForceReload_ReturnsFullReloadNeeded()
    {
        // Arrange: first call
        _service.DetermineReloadDecision(ItemA, null, DefaultVerseRef, DefaultViewName, false);

        // Act: same text, same view mode, but forceReload = true
        var result = _service.DetermineReloadDecision(
            ItemA,
            ItemA,
            DefaultVerseRef,
            DefaultViewName,
            forceReload: true
        );

        // Assert
        Assert.That(result.FullReloadNeeded, Is.True, "forceReload must trigger full reload");
    }

    /// <summary>
    /// When the text is the same, the view mode is the same, and forceReload is false,
    /// no full reload is needed. This is the "reference-only change" case where just
    /// the verse reference needs updating.
    ///
    /// PT9 logic: falls through all full reload checks
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-098")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_SameTextSameViewNoForce_NoFullReload()
    {
        // Arrange: first call establishes state
        _service.DetermineReloadDecision(ItemA, null, DefaultVerseRef, DefaultViewName, false);

        // Act: same text, same view mode, no force
        var result = _service.DetermineReloadDecision(
            ItemA,
            ItemA,
            "MAT 1:2",
            DefaultViewName,
            forceReload: false
        );

        // Assert
        Assert.That(
            result.FullReloadNeeded,
            Is.False,
            "Same text and view mode should not require full reload"
        );
    }

    /// <summary>
    /// The first call with null previousItem should always trigger a full reload
    /// since there is no prior state.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-098")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_NullPreviousItem_ReturnsFullReloadNeeded()
    {
        // Act: first call with no previous item
        var result = _service.DetermineReloadDecision(
            ItemA,
            null,
            DefaultVerseRef,
            DefaultViewName,
            forceReload: false
        );

        // Assert
        Assert.That(
            result.FullReloadNeeded,
            Is.True,
            "First call with null previousItem must trigger full reload"
        );
    }

    /// <summary>
    /// All three view modes should be recognized as valid. Switching between any
    /// two distinct view modes triggers a full reload.
    /// </summary>
    [TestCase("Preview", "Unformatted")]
    [TestCase("Preview", "Standard")]
    [TestCase("Unformatted", "Standard")]
    [TestCase("Standard", "Preview")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-098")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_AnyViewModeChange_ReturnsFullReloadNeeded(
        string firstView,
        string secondView
    )
    {
        // Arrange: first call with one view mode
        _service.DetermineReloadDecision(ItemA, null, DefaultVerseRef, firstView, false);

        // Act: same text, different view mode
        var result = _service.DetermineReloadDecision(
            ItemA,
            ItemA,
            DefaultVerseRef,
            secondView,
            forceReload: false
        );

        // Assert
        Assert.That(
            result.FullReloadNeeded,
            Is.True,
            $"View mode change from '{firstView}' to '{secondView}' must trigger full reload"
        );
    }

    #endregion

    #region Zoom Save and Restore

    /// <summary>
    /// When switching from text A to text B with a full reload, text A's zoom
    /// is saved to the internal dictionary before loading text B.
    ///
    /// PT9 logic line 389-390:
    ///   if (uiSingleResource.ScriptureText != null)
    ///       singleTextZooms[uiSingleResource.ScriptureText.Guid] = uiSingleResource.Zoom;
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_TextChange_SavesPreviousItemZoom()
    {
        // Arrange: first load text A with zoom 1.3
        _service.DetermineReloadDecision(
            ItemAZoom13,
            null,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Act: switch to text B (saves A's zoom)
        _service.DetermineReloadDecision(
            ItemB,
            ItemAZoom13,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Assert: switch back to A, zoom should be restored to 1.3
        var result = _service.DetermineReloadDecision(
            ItemA,
            ItemB,
            DefaultVerseRef,
            DefaultViewName,
            false
        );
        Assert.That(
            result.ZoomToApply,
            Is.EqualTo(1.3),
            "Returning to text A must restore saved zoom of 1.3"
        );
    }

    /// <summary>
    /// When visiting a text for the first time (no saved zoom in dictionary),
    /// the zoom returned should be the curItem's own Zoom property.
    ///
    /// PT9 logic line 410-411:
    ///   if (!singleTextZooms.ContainsKey(joinedId))
    ///       singleTextZooms[joinedId] = singleZoom;
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_FirstVisitToText_ReturnsItemZoomAsDefault()
    {
        // Act: first visit to text A with zoom 1.5
        var result = _service.DetermineReloadDecision(
            ItemAZoom15,
            null,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Assert
        Assert.That(
            result.ZoomToApply,
            Is.EqualTo(1.5),
            "First visit should use curItem's own zoom (1.5)"
        );
    }

    /// <summary>
    /// When visiting text B for the first time while coming from text A,
    /// text B should get its own Zoom property as the default (1.0).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_FirstVisitToNewText_ReturnsNewItemDefaultZoom()
    {
        // Arrange: load text A first
        _service.DetermineReloadDecision(
            ItemAZoom13,
            null,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Act: switch to text B (default zoom 1.0)
        var result = _service.DetermineReloadDecision(
            ItemB,
            ItemAZoom13,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Assert
        Assert.That(
            result.ZoomToApply,
            Is.EqualTo(1.0),
            "First visit to text B should use its default zoom (1.0)"
        );
    }

    /// <summary>
    /// When visiting text B which has a custom zoom (0.9) for the first time,
    /// the item's own zoom value should be used as the default.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_FirstVisitCustomZoom_ReturnsItemZoom()
    {
        // Arrange: load text A first
        _service.DetermineReloadDecision(ItemA, null, DefaultVerseRef, DefaultViewName, false);

        // Act: switch to text B with zoom 0.9
        var result = _service.DetermineReloadDecision(
            ItemBZoom09,
            ItemA,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Assert
        Assert.That(
            result.ZoomToApply,
            Is.EqualTo(0.9),
            "First visit to text B should use its specified zoom (0.9)"
        );
    }

    /// <summary>
    /// When not doing a full reload (same text, same view, no force), the zoom
    /// should still be returned for the current item -- either from saved state
    /// or the item's own zoom.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_NoFullReload_ReturnsCurrentZoom()
    {
        // Arrange: first call establishes text A with zoom 1.3
        _service.DetermineReloadDecision(
            ItemAZoom13,
            null,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Act: same text, same view, different verse ref -- no full reload
        var result = _service.DetermineReloadDecision(
            ItemAZoom13,
            ItemAZoom13,
            "MAT 1:2",
            DefaultViewName,
            false
        );

        // Assert
        Assert.That(
            result.ZoomToApply,
            Is.EqualTo(1.3),
            "Non-reload case should still return the current item's zoom"
        );
    }

    /// <summary>
    /// TS-099 full scenario: Switch from A (zoom 1.3) to B to C and back to A.
    /// Text A's zoom should be preserved across multiple intermediary texts.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_MultipleTextSwitches_PreservesZoomAcrossTexts()
    {
        // Step 1: Load text A with zoom 1.3
        _service.DetermineReloadDecision(
            ItemAZoom13,
            null,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Step 2: Switch to text B (saves A's zoom 1.3)
        _service.DetermineReloadDecision(
            ItemBZoom09,
            ItemAZoom13,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Step 3: Switch to text C (saves B's zoom 0.9)
        _service.DetermineReloadDecision(
            ItemC,
            ItemBZoom09,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Step 4: Return to text A -- should restore zoom 1.3
        var resultA = _service.DetermineReloadDecision(
            ItemA,
            ItemC,
            DefaultVerseRef,
            DefaultViewName,
            false
        );
        Assert.That(
            resultA.ZoomToApply,
            Is.EqualTo(1.3),
            "Text A zoom (1.3) must be preserved after visiting B and C"
        );

        // Step 5: Return to text B -- should restore zoom 0.9
        var resultB = _service.DetermineReloadDecision(
            ItemB,
            ItemA,
            DefaultVerseRef,
            DefaultViewName,
            false
        );
        Assert.That(
            resultB.ZoomToApply,
            Is.EqualTo(0.9),
            "Text B zoom (0.9) must be preserved after visiting C and returning to A"
        );
    }

    /// <summary>
    /// When a force reload occurs on the same text, the zoom should not be reset.
    /// The saved zoom for the current text remains intact.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_ForceReloadSameText_PreservesZoom()
    {
        // Arrange: load text A with zoom 1.3
        _service.DetermineReloadDecision(
            ItemAZoom13,
            null,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Act: force reload same text
        var result = _service.DetermineReloadDecision(
            ItemAZoom13,
            ItemAZoom13,
            DefaultVerseRef,
            DefaultViewName,
            forceReload: true
        );

        // Assert
        Assert.That(result.FullReloadNeeded, Is.True, "forceReload triggers full reload");
        Assert.That(
            result.ZoomToApply,
            Is.EqualTo(1.3),
            "Force reload on same text should preserve its zoom"
        );
    }

    /// <summary>
    /// When the zoom of previousItem changes between calls (user adjusted zoom),
    /// the LATEST zoom value should be saved and restored.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_ZoomChangedThenSwitch_SavesLatestZoom()
    {
        // Arrange: load text A with zoom 1.0
        _service.DetermineReloadDecision(ItemA, null, DefaultVerseRef, DefaultViewName, false);

        // Act: switch to text B, passing previousItem with updated zoom 1.5
        // (user adjusted A's zoom to 1.5 between calls)
        _service.DetermineReloadDecision(
            ItemB,
            ItemAZoom15,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Assert: return to A, zoom should be the latest saved value (1.5)
        var result = _service.DetermineReloadDecision(
            ItemA,
            ItemB,
            DefaultVerseRef,
            DefaultViewName,
            false
        );
        Assert.That(
            result.ZoomToApply,
            Is.EqualTo(1.5),
            "Must save and restore the latest zoom value (1.5) for text A"
        );
    }

    #endregion

    #region Edge Cases

    /// <summary>
    /// Switching from text A to the same text A (same ScrTextId) with no other changes
    /// should NOT trigger a full reload.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-098")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_SameTextId_NoFullReload()
    {
        // Arrange
        _service.DetermineReloadDecision(ItemA, null, DefaultVerseRef, DefaultViewName, false);

        // Act: same text, same everything
        var result = _service.DetermineReloadDecision(
            ItemA,
            ItemA,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Assert
        Assert.That(
            result.FullReloadNeeded,
            Is.False,
            "Same ScrTextId should not trigger full reload"
        );
    }

    /// <summary>
    /// When curItem and previousItem have the same ScrTextId but different zoom values,
    /// no full reload is needed (zoom changes alone do not trigger reload).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_SameTextDifferentZoom_NoFullReload()
    {
        // Arrange
        _service.DetermineReloadDecision(ItemA, null, DefaultVerseRef, DefaultViewName, false);

        // Act: same ScrTextId but different Zoom property on the item
        var result = _service.DetermineReloadDecision(
            ItemAZoom13,
            ItemA,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Assert
        Assert.That(
            result.FullReloadNeeded,
            Is.False,
            "Zoom change alone should not trigger full reload"
        );
    }

    /// <summary>
    /// When the verseRef changes but everything else stays the same, no full reload
    /// is needed. The caller handles reference-only updates separately.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-098")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_OnlyVerseRefChanged_NoFullReload()
    {
        // Arrange
        _service.DetermineReloadDecision(ItemA, null, "MAT 1:1", DefaultViewName, false);

        // Act: different verse ref, same text and view mode
        var result = _service.DetermineReloadDecision(
            ItemA,
            ItemA,
            "MAT 2:5",
            DefaultViewName,
            false
        );

        // Assert
        Assert.That(
            result.FullReloadNeeded,
            Is.False,
            "Verse reference change alone should not trigger full reload"
        );
    }

    /// <summary>
    /// Multiple full reloads on the same text (via force) should not corrupt the
    /// zoom dictionary state.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_RepeatedForceReloads_MaintainsZoomState()
    {
        // Arrange: load text A with zoom 1.3
        _service.DetermineReloadDecision(
            ItemAZoom13,
            null,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Act: force reload three times
        _service.DetermineReloadDecision(
            ItemAZoom13,
            ItemAZoom13,
            DefaultVerseRef,
            DefaultViewName,
            true
        );
        _service.DetermineReloadDecision(
            ItemAZoom13,
            ItemAZoom13,
            DefaultVerseRef,
            DefaultViewName,
            true
        );
        var result = _service.DetermineReloadDecision(
            ItemAZoom13,
            ItemAZoom13,
            DefaultVerseRef,
            DefaultViewName,
            true
        );

        // Assert
        Assert.That(result.FullReloadNeeded, Is.True, "Force reload always triggers full reload");
        Assert.That(
            result.ZoomToApply,
            Is.EqualTo(1.3),
            "Repeated force reloads must not corrupt zoom state"
        );
    }

    /// <summary>
    /// When both text and view mode change simultaneously, full reload is triggered.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-098")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_TextAndViewModeChangedSimultaneously_FullReload()
    {
        // Arrange
        _service.DetermineReloadDecision(ItemA, null, DefaultVerseRef, "Preview", false);

        // Act: both text and view mode change
        var result = _service.DetermineReloadDecision(
            ItemB,
            ItemA,
            DefaultVerseRef,
            "Unformatted",
            false
        );

        // Assert
        Assert.That(
            result.FullReloadNeeded,
            Is.True,
            "Text + view mode change must trigger full reload"
        );
    }

    #endregion

    #region Thread Safety

    /// <summary>
    /// The SinglePaneReloadService uses ConcurrentDictionary internally for thread safety.
    /// Multiple concurrent calls should not throw exceptions or corrupt state.
    ///
    /// Per Paranext-Core-Patterns.md: DataProvider functions are called concurrently.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-098")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_ConcurrentCalls_DoesNotThrow()
    {
        // Arrange: create items with unique GUIDs for concurrent access
        var items = Enumerable
            .Range(0, 20)
            .Select(i => new TextCollectionItem($"Project{i}", $"guid-{i:D3}", 1.0 + i * 0.1))
            .ToList();

        // Act: make concurrent calls
        Assert.DoesNotThrow(() =>
        {
            var tasks = items.Select(item =>
                Task.Run(() =>
                {
                    _service.DetermineReloadDecision(
                        item,
                        null,
                        DefaultVerseRef,
                        DefaultViewName,
                        false
                    );
                })
            );
            Task.WaitAll(tasks.ToArray());
        });
    }

    /// <summary>
    /// Concurrent calls with interleaved text switches should not corrupt the zoom
    /// dictionary or throw exceptions.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_ConcurrentSwitches_MaintainsConsistency()
    {
        // Arrange
        var items = Enumerable
            .Range(0, 10)
            .Select(i => new TextCollectionItem($"Project{i}", $"guid-{i:D3}", 1.0 + i * 0.1))
            .ToList();

        // Act: simulate concurrent text switching
        Assert.DoesNotThrow(() =>
        {
            var tasks = new List<Task>();
            for (int i = 0; i < items.Count - 1; i++)
            {
                var current = items[i];
                var next = items[i + 1];
                tasks.Add(
                    Task.Run(() =>
                    {
                        _service.DetermineReloadDecision(
                            next,
                            current,
                            DefaultVerseRef,
                            DefaultViewName,
                            false
                        );
                    })
                );
            }
            Task.WaitAll(tasks.ToArray());
        });
    }

    #endregion

    #region Return Type Validation

    /// <summary>
    /// The ReloadDecision record always returns a non-null result with valid properties.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-098")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_AlwaysReturnsValidReloadDecision()
    {
        // Act
        var result = _service.DetermineReloadDecision(
            ItemA,
            null,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Assert
        Assert.That(result, Is.Not.Null, "Must always return a non-null ReloadDecision");
        Assert.That(
            result.ZoomToApply,
            Is.GreaterThan(0),
            "Zoom must always be positive"
        );
    }

    /// <summary>
    /// The ReloadDecision record should be an immutable value type that can be
    /// compared by value.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-098")]
    [Property("BehaviorId", "EXT-008")]
    public void ReloadDecision_RecordEquality_WorksCorrectly()
    {
        // Arrange
        var decision1 = new ReloadDecision(true, 1.3);
        var decision2 = new ReloadDecision(true, 1.3);
        var decision3 = new ReloadDecision(false, 1.0);

        // Assert
        Assert.That(decision1, Is.EqualTo(decision2), "Same values should be equal");
        Assert.That(decision1, Is.Not.EqualTo(decision3), "Different values should not be equal");
    }

    #endregion

    #region Instance Independence

    /// <summary>
    /// Each SinglePaneReloadService instance has its own zoom dictionary.
    /// Two instances should not share state.
    /// This matches PT9 where each TextCollectionControl has its own singleTextZooms.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-099")]
    [Property("BehaviorId", "EXT-008")]
    public void DetermineReloadDecision_SeparateInstances_DoNotShareState()
    {
        // Arrange
        var service1 = new SinglePaneReloadService();
        var service2 = new SinglePaneReloadService();

        // Act: set zoom for text A in service1
        service1.DetermineReloadDecision(
            ItemAZoom13,
            null,
            DefaultVerseRef,
            DefaultViewName,
            false
        );
        service1.DetermineReloadDecision(
            ItemB,
            ItemAZoom13,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Load text A in service2 (should use default, not service1's saved zoom)
        var result = service2.DetermineReloadDecision(
            ItemA,
            null,
            DefaultVerseRef,
            DefaultViewName,
            false
        );

        // Assert
        Assert.That(
            result.ZoomToApply,
            Is.EqualTo(1.0),
            "Service2 should use ItemA's default zoom (1.0), not service1's saved zoom (1.3)"
        );
    }

    #endregion
}
