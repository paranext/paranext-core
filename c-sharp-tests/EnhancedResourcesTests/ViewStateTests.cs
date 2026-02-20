using System.Text.Json;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-022: SaveViewState / LoadViewState.
/// Validates that the Enhanced Resource window state is correctly persisted and restored
/// across sessions. The EnhancedResourceViewState record contains 15 fields that capture
/// the full UI state of an ER window (memento pattern).
///
/// PT9 Source: MarbleForm.cs:2996-3026 (MarbleFormMemento), XmlResourceWindow.cs:1693 (ResourceEditorMemento)
/// Contract: data-contracts.md Methods 22a/22b
/// Behaviors: BHV-317 (MarbleFormMemento state persistence), BHV-524 (ResourceEditorMemento state persistence)
/// Test Scenario: TS-064 (MarbleFormMemento persists 15+ fields), TS-114 (ResourceEditorMemento persists navigation state)
///
/// Implementation approach:
/// - ViewStateService provides SaveViewState and LoadViewState methods
/// - State is serialized to JSON and persisted via SettingsService (keyed by windowId)
/// - LoadViewState returns null when no saved state exists for the given windowId
/// - All 15 fields of EnhancedResourceViewState must survive a save/load round-trip
///
/// Input: (string windowId, EnhancedResourceViewState state) for save; (string windowId) for load
/// Output: Task (save); Task&lt;EnhancedResourceViewState?&gt; (load)
/// </summary>
[TestFixture]
public class ViewStateTests
{
    #region Test Data Factory

    /// <summary>
    /// Creates a fully-populated EnhancedResourceViewState with non-default values
    /// to ensure every field is tested. Each field is set to a value different from
    /// its type default to catch missing-field bugs.
    /// </summary>
    private static EnhancedResourceViewState CreateFullState()
    {
        return new EnhancedResourceViewState(
            ResourceId: "SDBH",
            TrackedProjectId: "project-abc-123",
            SplitterPercentage: 42.5,
            ScripturePaneZoom: 1.25,
            SelectedTab: ResearchTab.Encyclopedia,
            ScopeFilter: ScopeFilter.CurrentSection,
            TermHighlightFilter: TermHighlightFilter.MissingTerms,
            SortField: DictionarySortField.Gloss,
            SortAscending: false,
            ShowFootnotes: true,
            ShowFoundRenderings: false,
            ShowTranslations: true,
            SourceWordDisplay: SourceWordDisplayMode.Both,
            LastSeenVersion: "2.1.0",
            DismissedBanners: new List<string> { "upgrade-v2", "welcome-banner" }
        );
    }

    /// <summary>
    /// Creates a minimal state with default/null optional fields.
    /// </summary>
    private static EnhancedResourceViewState CreateMinimalState()
    {
        return new EnhancedResourceViewState(
            ResourceId: "SDBG",
            TrackedProjectId: null,
            SplitterPercentage: 50.0,
            ScripturePaneZoom: 1.0,
            SelectedTab: ResearchTab.Dictionary,
            ScopeFilter: ScopeFilter.CurrentVerse,
            TermHighlightFilter: TermHighlightFilter.AllResearchTerms,
            SortField: DictionarySortField.Translit,
            SortAscending: true,
            ShowFootnotes: false,
            ShowFoundRenderings: false,
            ShowTranslations: false,
            SourceWordDisplay: SourceWordDisplayMode.Original,
            LastSeenVersion: null,
            DismissedBanners: new List<string>()
        );
    }

    #endregion

    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-022.
    /// Verifies that a full round-trip (save then load) preserves all 15 fields
    /// of EnhancedResourceViewState. This is the "done signal" -- when this test
    /// passes, the capability is complete.
    ///
    /// BHV-317: MarbleFormMemento persists 15+ fields per ER window.
    /// TS-064: MarbleFormMemento persists 15+ fields.
    /// Fields: ResourceId, TrackedProjectId, SplitterPercentage, ScripturePaneZoom,
    /// SelectedTab, ScopeFilter, TermHighlightFilter, SortField, SortAscending,
    /// ShowFootnotes, ShowFoundRenderings, ShowTranslations, SourceWordDisplay,
    /// LastSeenVersion, DismissedBanners.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description(
        "Acceptance test: Save/load round-trip preserves all 15 fields of EnhancedResourceViewState"
    )]
    public async Task SaveAndLoad_RoundTrip_AllFieldsPreserved()
    {
        // Arrange: Create a fully-populated state with non-default values
        var windowId = "er-window-acceptance-test";
        var original = CreateFullState();

        // Act: Save then load
        await ViewStateService.SaveViewStateAsync(windowId, original);
        var loaded = await ViewStateService.LoadViewStateAsync(windowId);

        // Assert: Every field must match
        Assert.That(loaded, Is.Not.Null, "Loaded state must not be null after save");
        Assert.Multiple(() =>
        {
            Assert.That(
                loaded!.ResourceId,
                Is.EqualTo("SDBH"),
                "ResourceId must be preserved"
            );
            Assert.That(
                loaded.TrackedProjectId,
                Is.EqualTo("project-abc-123"),
                "TrackedProjectId must be preserved"
            );
            Assert.That(
                loaded.SplitterPercentage,
                Is.EqualTo(42.5).Within(0.001),
                "SplitterPercentage must be preserved"
            );
            Assert.That(
                loaded.ScripturePaneZoom,
                Is.EqualTo(1.25).Within(0.001),
                "ScripturePaneZoom must be preserved"
            );
            Assert.That(
                loaded.SelectedTab,
                Is.EqualTo(ResearchTab.Encyclopedia),
                "SelectedTab must be preserved"
            );
            Assert.That(
                loaded.ScopeFilter,
                Is.EqualTo(ScopeFilter.CurrentSection),
                "ScopeFilter must be preserved"
            );
            Assert.That(
                loaded.TermHighlightFilter,
                Is.EqualTo(TermHighlightFilter.MissingTerms),
                "TermHighlightFilter must be preserved"
            );
            Assert.That(
                loaded.SortField,
                Is.EqualTo(DictionarySortField.Gloss),
                "SortField must be preserved"
            );
            Assert.That(
                loaded.SortAscending,
                Is.False,
                "SortAscending must be preserved"
            );
            Assert.That(
                loaded.ShowFootnotes,
                Is.True,
                "ShowFootnotes must be preserved"
            );
            Assert.That(
                loaded.ShowFoundRenderings,
                Is.False,
                "ShowFoundRenderings must be preserved"
            );
            Assert.That(
                loaded.ShowTranslations,
                Is.True,
                "ShowTranslations must be preserved"
            );
            Assert.That(
                loaded.SourceWordDisplay,
                Is.EqualTo(SourceWordDisplayMode.Both),
                "SourceWordDisplay must be preserved"
            );
            Assert.That(
                loaded.LastSeenVersion,
                Is.EqualTo("2.1.0"),
                "LastSeenVersion must be preserved"
            );
            Assert.That(
                loaded.DismissedBanners,
                Is.EquivalentTo(new[] { "upgrade-v2", "welcome-banner" }),
                "DismissedBanners must be preserved"
            );
        });
    }

    #endregion

    #region Contract Tests - SaveViewState

    /// <summary>
    /// SaveViewState with a valid state should succeed without throwing.
    /// BHV-317: Persists state per ER window.
    /// Contract: "State persisted across sessions."
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("SaveViewState with valid state succeeds without throwing")]
    public async Task SaveViewState_WithValidState_Succeeds()
    {
        // Arrange
        var windowId = "er-window-001";
        var state = CreateFullState();

        // Act & Assert: Should not throw
        Assert.DoesNotThrowAsync(
            async () => await ViewStateService.SaveViewStateAsync(windowId, state)
        );
    }

    /// <summary>
    /// Saving state for multiple windows must keep them independent.
    /// BHV-317: Per-window state persistence.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("Multiple windows have independent state")]
    public async Task SaveViewState_MultipleWindows_IndependentState()
    {
        // Arrange
        var state1 = new EnhancedResourceViewState(
            ResourceId: "SDBH",
            TrackedProjectId: "proj-1",
            SplitterPercentage: 30.0,
            ScripturePaneZoom: 1.0,
            SelectedTab: ResearchTab.Dictionary,
            ScopeFilter: ScopeFilter.CurrentVerse,
            TermHighlightFilter: TermHighlightFilter.AllResearchTerms,
            SortField: DictionarySortField.Translit,
            SortAscending: true,
            ShowFootnotes: false,
            ShowFoundRenderings: false,
            ShowTranslations: false,
            SourceWordDisplay: SourceWordDisplayMode.Original,
            LastSeenVersion: "1.0.0",
            DismissedBanners: new List<string>()
        );

        var state2 = new EnhancedResourceViewState(
            ResourceId: "SDBG",
            TrackedProjectId: "proj-2",
            SplitterPercentage: 70.0,
            ScripturePaneZoom: 2.0,
            SelectedTab: ResearchTab.Maps,
            ScopeFilter: ScopeFilter.CurrentChapter,
            TermHighlightFilter: TermHighlightFilter.FoundTerms,
            SortField: DictionarySortField.Found,
            SortAscending: false,
            ShowFootnotes: true,
            ShowFoundRenderings: true,
            ShowTranslations: true,
            SourceWordDisplay: SourceWordDisplayMode.Transliteration,
            LastSeenVersion: "2.0.0",
            DismissedBanners: new List<string> { "banner-1" }
        );

        // Act: Save two different windows
        await ViewStateService.SaveViewStateAsync("window-A", state1);
        await ViewStateService.SaveViewStateAsync("window-B", state2);

        // Load each
        var loaded1 = await ViewStateService.LoadViewStateAsync("window-A");
        var loaded2 = await ViewStateService.LoadViewStateAsync("window-B");

        // Assert: Each window has its own state
        Assert.Multiple(() =>
        {
            Assert.That(loaded1, Is.Not.Null, "Window A state must exist");
            Assert.That(loaded2, Is.Not.Null, "Window B state must exist");
            Assert.That(
                loaded1!.ResourceId,
                Is.EqualTo("SDBH"),
                "Window A must have SDBH resource"
            );
            Assert.That(
                loaded2!.ResourceId,
                Is.EqualTo("SDBG"),
                "Window B must have SDBG resource"
            );
            Assert.That(
                loaded1.SplitterPercentage,
                Is.EqualTo(30.0).Within(0.001),
                "Window A splitter must be 30%"
            );
            Assert.That(
                loaded2.SplitterPercentage,
                Is.EqualTo(70.0).Within(0.001),
                "Window B splitter must be 70%"
            );
            Assert.That(
                loaded1.SelectedTab,
                Is.EqualTo(ResearchTab.Dictionary),
                "Window A tab"
            );
            Assert.That(
                loaded2.SelectedTab,
                Is.EqualTo(ResearchTab.Maps),
                "Window B tab"
            );
        });
    }

    /// <summary>
    /// Saving state to an existing windowId must overwrite the previous state.
    /// BHV-317: State persisted per window, updated on save.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("Overwriting existing state replaces it")]
    public async Task SaveViewState_OverwriteExisting_ReplacesState()
    {
        // Arrange: Save initial state
        var windowId = "er-window-overwrite";
        var initial = CreateMinimalState();
        await ViewStateService.SaveViewStateAsync(windowId, initial);

        // Act: Overwrite with different state
        var updated = CreateFullState();
        await ViewStateService.SaveViewStateAsync(windowId, updated);

        // Assert: Load returns the updated state, not the initial
        var loaded = await ViewStateService.LoadViewStateAsync(windowId);
        Assert.That(loaded, Is.Not.Null, "Loaded state must not be null");
        Assert.Multiple(() =>
        {
            Assert.That(
                loaded!.ResourceId,
                Is.EqualTo("SDBH"),
                "Must return updated ResourceId, not initial"
            );
            Assert.That(
                loaded.SplitterPercentage,
                Is.EqualTo(42.5).Within(0.001),
                "Must return updated SplitterPercentage"
            );
            Assert.That(
                loaded.SelectedTab,
                Is.EqualTo(ResearchTab.Encyclopedia),
                "Must return updated SelectedTab"
            );
        });
    }

    #endregion

    #region Contract Tests - LoadViewState

    /// <summary>
    /// LoadViewState with an unknown windowId must return null.
    /// Contract: "Returns null if no saved state."
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("LoadViewState with unknown windowId returns null")]
    public async Task LoadViewState_WithUnknownWindowId_ReturnsNull()
    {
        // Act
        var result = await ViewStateService.LoadViewStateAsync("nonexistent-window-xyz");

        // Assert
        Assert.That(result, Is.Null, "Must return null for unknown windowId");
    }

    /// <summary>
    /// LoadViewState with an empty string windowId must return null (no state saved).
    /// Edge case: empty string is a valid but unusual windowId.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("LoadViewState with empty windowId returns null")]
    public async Task LoadViewState_WithEmptyWindowId_ReturnsNull()
    {
        // Act
        var result = await ViewStateService.LoadViewStateAsync("");

        // Assert
        Assert.That(result, Is.Null, "Must return null for empty windowId with no saved state");
    }

    #endregion

    #region Nullable Field Preservation

    /// <summary>
    /// TrackedProjectId can be null (no tracked project selected).
    /// BHV-317: Persists FollowedProject field (can be null).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("Null TrackedProjectId is preserved through round-trip")]
    public async Task SaveViewState_NullTrackedProjectId_Preserved()
    {
        // Arrange
        var windowId = "er-window-null-tracked";
        var state = CreateMinimalState();
        // Verify precondition: TrackedProjectId is null
        Assert.That(state.TrackedProjectId, Is.Null, "Precondition: TrackedProjectId is null");

        // Act
        await ViewStateService.SaveViewStateAsync(windowId, state);
        var loaded = await ViewStateService.LoadViewStateAsync(windowId);

        // Assert
        Assert.That(loaded, Is.Not.Null);
        Assert.That(
            loaded!.TrackedProjectId,
            Is.Null,
            "Null TrackedProjectId must be preserved, not converted to empty string"
        );
    }

    /// <summary>
    /// LastSeenVersion can be null (never seen version info).
    /// BHV-524: ResourceEditorMemento persists version state.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-524")]
    [Property("ScenarioId", "TS-114")]
    [Description("Null LastSeenVersion is preserved through round-trip")]
    public async Task SaveViewState_LastSeenVersionNull_Preserved()
    {
        // Arrange
        var windowId = "er-window-null-version";
        var state = CreateMinimalState();
        Assert.That(state.LastSeenVersion, Is.Null, "Precondition: LastSeenVersion is null");

        // Act
        await ViewStateService.SaveViewStateAsync(windowId, state);
        var loaded = await ViewStateService.LoadViewStateAsync(windowId);

        // Assert
        Assert.That(loaded, Is.Not.Null);
        Assert.That(
            loaded!.LastSeenVersion,
            Is.Null,
            "Null LastSeenVersion must be preserved"
        );
    }

    /// <summary>
    /// LastSeenVersion with a value must be preserved.
    /// BHV-524: ResourceEditorMemento persists version state.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-524")]
    [Property("ScenarioId", "TS-114")]
    [Description("Populated LastSeenVersion is preserved through round-trip")]
    public async Task SaveViewState_LastSeenVersionPopulated_Preserved()
    {
        // Arrange
        var windowId = "er-window-version";
        var state = CreateFullState();
        Assert.That(
            state.LastSeenVersion,
            Is.EqualTo("2.1.0"),
            "Precondition: LastSeenVersion is set"
        );

        // Act
        await ViewStateService.SaveViewStateAsync(windowId, state);
        var loaded = await ViewStateService.LoadViewStateAsync(windowId);

        // Assert
        Assert.That(loaded, Is.Not.Null);
        Assert.That(
            loaded!.LastSeenVersion,
            Is.EqualTo("2.1.0"),
            "LastSeenVersion value must be preserved"
        );
    }

    /// <summary>
    /// Empty DismissedBanners list must be preserved (not converted to null).
    /// BHV-317: Banner dismissals are part of the persisted state.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("Empty DismissedBanners list is preserved through round-trip")]
    public async Task SaveViewState_EmptyDismissedBanners_Preserved()
    {
        // Arrange
        var windowId = "er-window-empty-banners";
        var state = CreateMinimalState();
        Assert.That(state.DismissedBanners, Is.Empty, "Precondition: DismissedBanners is empty");

        // Act
        await ViewStateService.SaveViewStateAsync(windowId, state);
        var loaded = await ViewStateService.LoadViewStateAsync(windowId);

        // Assert
        Assert.That(loaded, Is.Not.Null);
        Assert.That(
            loaded!.DismissedBanners,
            Is.Not.Null,
            "DismissedBanners must not be null after round-trip"
        );
        Assert.That(
            loaded.DismissedBanners,
            Is.Empty,
            "Empty DismissedBanners must remain empty"
        );
    }

    #endregion

    #region Enum Value Round-Trip Tests

    /// <summary>
    /// All ResearchTab enum values must survive a save/load round-trip.
    /// BHV-317: SelectedTab field persisted.
    /// </summary>
    [TestCase(ResearchTab.Dictionary)]
    [TestCase(ResearchTab.Encyclopedia)]
    [TestCase(ResearchTab.Media)]
    [TestCase(ResearchTab.Maps)]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("All ResearchTab enum values round-trip correctly")]
    public async Task SaveAndLoad_AllResearchTabValues_Correct(ResearchTab tab)
    {
        // Arrange
        var windowId = $"er-window-tab-{tab}";
        var state = new EnhancedResourceViewState(
            ResourceId: "TEST",
            TrackedProjectId: null,
            SplitterPercentage: 50.0,
            ScripturePaneZoom: 1.0,
            SelectedTab: tab,
            ScopeFilter: ScopeFilter.CurrentVerse,
            TermHighlightFilter: TermHighlightFilter.AllResearchTerms,
            SortField: DictionarySortField.Translit,
            SortAscending: true,
            ShowFootnotes: false,
            ShowFoundRenderings: false,
            ShowTranslations: false,
            SourceWordDisplay: SourceWordDisplayMode.Original,
            LastSeenVersion: null,
            DismissedBanners: new List<string>()
        );

        // Act
        await ViewStateService.SaveViewStateAsync(windowId, state);
        var loaded = await ViewStateService.LoadViewStateAsync(windowId);

        // Assert
        Assert.That(loaded, Is.Not.Null);
        Assert.That(
            loaded!.SelectedTab,
            Is.EqualTo(tab),
            $"ResearchTab.{tab} must survive round-trip"
        );
    }

    /// <summary>
    /// All DictionarySortField enum values must survive a save/load round-trip.
    /// BHV-317: sortOrder field persisted.
    /// </summary>
    [TestCase(DictionarySortField.Translit)]
    [TestCase(DictionarySortField.Lemma)]
    [TestCase(DictionarySortField.Translations)]
    [TestCase(DictionarySortField.Gloss)]
    [TestCase(DictionarySortField.Found)]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("All DictionarySortField enum values round-trip correctly")]
    public async Task SaveAndLoad_AllDictionarySortFieldValues_Correct(
        DictionarySortField sortField
    )
    {
        // Arrange
        var windowId = $"er-window-sort-{sortField}";
        var state = new EnhancedResourceViewState(
            ResourceId: "TEST",
            TrackedProjectId: null,
            SplitterPercentage: 50.0,
            ScripturePaneZoom: 1.0,
            SelectedTab: ResearchTab.Dictionary,
            ScopeFilter: ScopeFilter.CurrentVerse,
            TermHighlightFilter: TermHighlightFilter.AllResearchTerms,
            SortField: sortField,
            SortAscending: true,
            ShowFootnotes: false,
            ShowFoundRenderings: false,
            ShowTranslations: false,
            SourceWordDisplay: SourceWordDisplayMode.Original,
            LastSeenVersion: null,
            DismissedBanners: new List<string>()
        );

        // Act
        await ViewStateService.SaveViewStateAsync(windowId, state);
        var loaded = await ViewStateService.LoadViewStateAsync(windowId);

        // Assert
        Assert.That(loaded, Is.Not.Null);
        Assert.That(
            loaded!.SortField,
            Is.EqualTo(sortField),
            $"DictionarySortField.{sortField} must survive round-trip"
        );
    }

    /// <summary>
    /// All SourceWordDisplayMode enum values must survive a save/load round-trip.
    /// BHV-317: View toggle state persisted.
    /// </summary>
    [TestCase(SourceWordDisplayMode.Original)]
    [TestCase(SourceWordDisplayMode.Transliteration)]
    [TestCase(SourceWordDisplayMode.Both)]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("All SourceWordDisplayMode enum values round-trip correctly")]
    public async Task SaveAndLoad_AllSourceWordDisplayModeValues_Correct(
        SourceWordDisplayMode displayMode
    )
    {
        // Arrange
        var windowId = $"er-window-display-{displayMode}";
        var state = new EnhancedResourceViewState(
            ResourceId: "TEST",
            TrackedProjectId: null,
            SplitterPercentage: 50.0,
            ScripturePaneZoom: 1.0,
            SelectedTab: ResearchTab.Dictionary,
            ScopeFilter: ScopeFilter.CurrentVerse,
            TermHighlightFilter: TermHighlightFilter.AllResearchTerms,
            SortField: DictionarySortField.Translit,
            SortAscending: true,
            ShowFootnotes: false,
            ShowFoundRenderings: false,
            ShowTranslations: false,
            SourceWordDisplay: displayMode,
            LastSeenVersion: null,
            DismissedBanners: new List<string>()
        );

        // Act
        await ViewStateService.SaveViewStateAsync(windowId, state);
        var loaded = await ViewStateService.LoadViewStateAsync(windowId);

        // Assert
        Assert.That(loaded, Is.Not.Null);
        Assert.That(
            loaded!.SourceWordDisplay,
            Is.EqualTo(displayMode),
            $"SourceWordDisplayMode.{displayMode} must survive round-trip"
        );
    }

    /// <summary>
    /// All ScopeFilter enum values must survive a save/load round-trip.
    /// BHV-317: Scope state persisted.
    /// </summary>
    [TestCase(ScopeFilter.CurrentVerse)]
    [TestCase(ScopeFilter.CurrentSection)]
    [TestCase(ScopeFilter.CurrentChapter)]
    [TestCase(ScopeFilter.CurrentSense)]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("All ScopeFilter enum values round-trip correctly")]
    public async Task SaveAndLoad_AllScopeFilterValues_Correct(ScopeFilter scope)
    {
        // Arrange
        var windowId = $"er-window-scope-{scope}";
        var state = new EnhancedResourceViewState(
            ResourceId: "TEST",
            TrackedProjectId: null,
            SplitterPercentage: 50.0,
            ScripturePaneZoom: 1.0,
            SelectedTab: ResearchTab.Dictionary,
            ScopeFilter: scope,
            TermHighlightFilter: TermHighlightFilter.AllResearchTerms,
            SortField: DictionarySortField.Translit,
            SortAscending: true,
            ShowFootnotes: false,
            ShowFoundRenderings: false,
            ShowTranslations: false,
            SourceWordDisplay: SourceWordDisplayMode.Original,
            LastSeenVersion: null,
            DismissedBanners: new List<string>()
        );

        // Act
        await ViewStateService.SaveViewStateAsync(windowId, state);
        var loaded = await ViewStateService.LoadViewStateAsync(windowId);

        // Assert
        Assert.That(loaded, Is.Not.Null);
        Assert.That(
            loaded!.ScopeFilter,
            Is.EqualTo(scope),
            $"ScopeFilter.{scope} must survive round-trip"
        );
    }

    /// <summary>
    /// All TermHighlightFilter enum values must survive a save/load round-trip.
    /// BHV-317: SelectedMarbleTermHighlight field persisted.
    /// </summary>
    [TestCase(TermHighlightFilter.AllResearchTerms)]
    [TestCase(TermHighlightFilter.FoundTerms)]
    [TestCase(TermHighlightFilter.MissingTerms)]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("All TermHighlightFilter enum values round-trip correctly")]
    public async Task SaveAndLoad_AllTermHighlightFilterValues_Correct(
        TermHighlightFilter highlight
    )
    {
        // Arrange
        var windowId = $"er-window-highlight-{highlight}";
        var state = new EnhancedResourceViewState(
            ResourceId: "TEST",
            TrackedProjectId: null,
            SplitterPercentage: 50.0,
            ScripturePaneZoom: 1.0,
            SelectedTab: ResearchTab.Dictionary,
            ScopeFilter: ScopeFilter.CurrentVerse,
            TermHighlightFilter: highlight,
            SortField: DictionarySortField.Translit,
            SortAscending: true,
            ShowFootnotes: false,
            ShowFoundRenderings: false,
            ShowTranslations: false,
            SourceWordDisplay: SourceWordDisplayMode.Original,
            LastSeenVersion: null,
            DismissedBanners: new List<string>()
        );

        // Act
        await ViewStateService.SaveViewStateAsync(windowId, state);
        var loaded = await ViewStateService.LoadViewStateAsync(windowId);

        // Assert
        Assert.That(loaded, Is.Not.Null);
        Assert.That(
            loaded!.TermHighlightFilter,
            Is.EqualTo(highlight),
            $"TermHighlightFilter.{highlight} must survive round-trip"
        );
    }

    #endregion

    #region Edge Cases - Numeric Values

    /// <summary>
    /// Extreme splitter percentage values (0% and 100%) must be preserved.
    /// BHV-317: SplitterPercentage field persisted.
    /// </summary>
    [TestCase(0.0)]
    [TestCase(100.0)]
    [TestCase(0.001)]
    [TestCase(99.999)]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("Extreme splitter percentage values preserved")]
    public async Task SaveViewState_ExtremeSplitterPercentage_Preserved(double percentage)
    {
        // Arrange
        var windowId = $"er-window-splitter-{percentage}";
        var state = new EnhancedResourceViewState(
            ResourceId: "TEST",
            TrackedProjectId: null,
            SplitterPercentage: percentage,
            ScripturePaneZoom: 1.0,
            SelectedTab: ResearchTab.Dictionary,
            ScopeFilter: ScopeFilter.CurrentVerse,
            TermHighlightFilter: TermHighlightFilter.AllResearchTerms,
            SortField: DictionarySortField.Translit,
            SortAscending: true,
            ShowFootnotes: false,
            ShowFoundRenderings: false,
            ShowTranslations: false,
            SourceWordDisplay: SourceWordDisplayMode.Original,
            LastSeenVersion: null,
            DismissedBanners: new List<string>()
        );

        // Act
        await ViewStateService.SaveViewStateAsync(windowId, state);
        var loaded = await ViewStateService.LoadViewStateAsync(windowId);

        // Assert
        Assert.That(loaded, Is.Not.Null);
        Assert.That(
            loaded!.SplitterPercentage,
            Is.EqualTo(percentage).Within(0.0001),
            $"SplitterPercentage {percentage} must be preserved"
        );
    }

    /// <summary>
    /// Extreme zoom values must be preserved.
    /// BHV-317: ScripturePaneZoom field persisted.
    /// BHV-524: htmlEditorZoom default 1.0.
    /// </summary>
    [TestCase(0.25)]
    [TestCase(0.5)]
    [TestCase(1.0)]
    [TestCase(2.0)]
    [TestCase(4.0)]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("Various zoom values preserved")]
    public async Task SaveViewState_ExtremeZoomValues_Preserved(double zoom)
    {
        // Arrange
        var windowId = $"er-window-zoom-{zoom}";
        var state = new EnhancedResourceViewState(
            ResourceId: "TEST",
            TrackedProjectId: null,
            SplitterPercentage: 50.0,
            ScripturePaneZoom: zoom,
            SelectedTab: ResearchTab.Dictionary,
            ScopeFilter: ScopeFilter.CurrentVerse,
            TermHighlightFilter: TermHighlightFilter.AllResearchTerms,
            SortField: DictionarySortField.Translit,
            SortAscending: true,
            ShowFootnotes: false,
            ShowFoundRenderings: false,
            ShowTranslations: false,
            SourceWordDisplay: SourceWordDisplayMode.Original,
            LastSeenVersion: null,
            DismissedBanners: new List<string>()
        );

        // Act
        await ViewStateService.SaveViewStateAsync(windowId, state);
        var loaded = await ViewStateService.LoadViewStateAsync(windowId);

        // Assert
        Assert.That(loaded, Is.Not.Null);
        Assert.That(
            loaded!.ScripturePaneZoom,
            Is.EqualTo(zoom).Within(0.0001),
            $"ScripturePaneZoom {zoom} must be preserved"
        );
    }

    #endregion

    #region Edge Cases - DismissedBanners

    /// <summary>
    /// A large DismissedBanners list must be fully preserved.
    /// BHV-317: Banner dismissals persisted.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("Large DismissedBanners list preserved")]
    public async Task SaveViewState_LargeDismissedBannersList_Preserved()
    {
        // Arrange
        var banners = Enumerable.Range(1, 20).Select(i => $"banner-{i}").ToList();
        var windowId = "er-window-many-banners";
        var state = new EnhancedResourceViewState(
            ResourceId: "TEST",
            TrackedProjectId: null,
            SplitterPercentage: 50.0,
            ScripturePaneZoom: 1.0,
            SelectedTab: ResearchTab.Dictionary,
            ScopeFilter: ScopeFilter.CurrentVerse,
            TermHighlightFilter: TermHighlightFilter.AllResearchTerms,
            SortField: DictionarySortField.Translit,
            SortAscending: true,
            ShowFootnotes: false,
            ShowFoundRenderings: false,
            ShowTranslations: false,
            SourceWordDisplay: SourceWordDisplayMode.Original,
            LastSeenVersion: null,
            DismissedBanners: banners
        );

        // Act
        await ViewStateService.SaveViewStateAsync(windowId, state);
        var loaded = await ViewStateService.LoadViewStateAsync(windowId);

        // Assert
        Assert.That(loaded, Is.Not.Null);
        Assert.That(
            loaded!.DismissedBanners,
            Is.EquivalentTo(banners),
            "All 20 dismissed banners must be preserved"
        );
        Assert.That(loaded.DismissedBanners, Has.Count.EqualTo(20));
    }

    #endregion

    #region JSON Serialization Tests

    /// <summary>
    /// EnhancedResourceViewState JSON round-trip must preserve all fields.
    /// This tests the serialization layer independently of the persistence mechanism.
    /// BHV-317: State persistence requires correct serialization.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("JSON serialization round-trip preserves all fields")]
    public void ViewState_JsonRoundTrip_AllFieldsSurvive()
    {
        // Arrange
        var original = CreateFullState();
        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = false,
        };

        // Act: Serialize and deserialize
        var json = JsonSerializer.Serialize(original, options);
        var deserialized = JsonSerializer.Deserialize<EnhancedResourceViewState>(json, options);

        // Assert: All fields must match
        Assert.That(deserialized, Is.Not.Null, "Deserialized state must not be null");
        Assert.Multiple(() =>
        {
            Assert.That(deserialized!.ResourceId, Is.EqualTo(original.ResourceId));
            Assert.That(deserialized.TrackedProjectId, Is.EqualTo(original.TrackedProjectId));
            Assert.That(
                deserialized.SplitterPercentage,
                Is.EqualTo(original.SplitterPercentage).Within(0.001)
            );
            Assert.That(
                deserialized.ScripturePaneZoom,
                Is.EqualTo(original.ScripturePaneZoom).Within(0.001)
            );
            Assert.That(deserialized.SelectedTab, Is.EqualTo(original.SelectedTab));
            Assert.That(deserialized.ScopeFilter, Is.EqualTo(original.ScopeFilter));
            Assert.That(
                deserialized.TermHighlightFilter,
                Is.EqualTo(original.TermHighlightFilter)
            );
            Assert.That(deserialized.SortField, Is.EqualTo(original.SortField));
            Assert.That(deserialized.SortAscending, Is.EqualTo(original.SortAscending));
            Assert.That(deserialized.ShowFootnotes, Is.EqualTo(original.ShowFootnotes));
            Assert.That(
                deserialized.ShowFoundRenderings,
                Is.EqualTo(original.ShowFoundRenderings)
            );
            Assert.That(deserialized.ShowTranslations, Is.EqualTo(original.ShowTranslations));
            Assert.That(deserialized.SourceWordDisplay, Is.EqualTo(original.SourceWordDisplay));
            Assert.That(deserialized.LastSeenVersion, Is.EqualTo(original.LastSeenVersion));
            Assert.That(
                deserialized.DismissedBanners,
                Is.EquivalentTo(original.DismissedBanners)
            );
        });
    }

    /// <summary>
    /// Enum values in EnhancedResourceViewState must serialize as integers for
    /// PT9 compatibility and cross-language consistency.
    /// BHV-317: Enum fields must be serialized as numeric values.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("Enum values serialize as integers")]
    public void ViewState_EnumsSerializeAsIntegers()
    {
        // Arrange
        var state = new EnhancedResourceViewState(
            ResourceId: "TEST",
            TrackedProjectId: null,
            SplitterPercentage: 50.0,
            ScripturePaneZoom: 1.0,
            SelectedTab: ResearchTab.Encyclopedia, // = 1
            ScopeFilter: ScopeFilter.CurrentChapter, // = 2
            TermHighlightFilter: TermHighlightFilter.MissingTerms, // = 2
            SortField: DictionarySortField.Gloss, // = 3
            SortAscending: true,
            ShowFootnotes: false,
            ShowFoundRenderings: false,
            ShowTranslations: false,
            SourceWordDisplay: SourceWordDisplayMode.Both, // = 2
            LastSeenVersion: null,
            DismissedBanners: new List<string>()
        );
        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        };

        // Act
        var json = JsonSerializer.Serialize(state, options);

        // Assert: Enum values appear as numbers, not strings
        Assert.Multiple(() =>
        {
            Assert.That(json, Does.Contain("\"selectedTab\":1"), "ResearchTab.Encyclopedia = 1");
            Assert.That(
                json,
                Does.Contain("\"scopeFilter\":2"),
                "ScopeFilter.CurrentChapter = 2"
            );
            Assert.That(
                json,
                Does.Contain("\"termHighlightFilter\":2"),
                "TermHighlightFilter.MissingTerms = 2"
            );
            Assert.That(json, Does.Contain("\"sortField\":3"), "DictionarySortField.Gloss = 3");
            Assert.That(
                json,
                Does.Contain("\"sourceWordDisplay\":2"),
                "SourceWordDisplayMode.Both = 2"
            );
        });
    }

    /// <summary>
    /// JSON property names must use camelCase to match TypeScript conventions.
    /// This ensures cross-process compatibility with the frontend.
    /// BHV-317: State must be consumable by both C# and TypeScript.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-022")]
    [Property("BehaviorId", "BHV-317")]
    [Property("ScenarioId", "TS-064")]
    [Description("JSON property names use camelCase")]
    public void ViewState_CamelCasePropertyNames()
    {
        // Arrange
        var state = CreateMinimalState();
        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        };

        // Act
        var json = JsonSerializer.Serialize(state, options);

        // Assert: Key property names are camelCase
        Assert.Multiple(() =>
        {
            Assert.That(json, Does.Contain("\"resourceId\""), "resourceId must be camelCase");
            Assert.That(
                json,
                Does.Contain("\"trackedProjectId\""),
                "trackedProjectId must be camelCase"
            );
            Assert.That(
                json,
                Does.Contain("\"splitterPercentage\""),
                "splitterPercentage must be camelCase"
            );
            Assert.That(
                json,
                Does.Contain("\"scripturePaneZoom\""),
                "scripturePaneZoom must be camelCase"
            );
            Assert.That(
                json,
                Does.Contain("\"selectedTab\""),
                "selectedTab must be camelCase"
            );
            Assert.That(
                json,
                Does.Contain("\"scopeFilter\""),
                "scopeFilter must be camelCase"
            );
            Assert.That(
                json,
                Does.Contain("\"termHighlightFilter\""),
                "termHighlightFilter must be camelCase"
            );
            Assert.That(json, Does.Contain("\"sortField\""), "sortField must be camelCase");
            Assert.That(
                json,
                Does.Contain("\"sortAscending\""),
                "sortAscending must be camelCase"
            );
            Assert.That(
                json,
                Does.Contain("\"showFootnotes\""),
                "showFootnotes must be camelCase"
            );
            Assert.That(
                json,
                Does.Contain("\"showFoundRenderings\""),
                "showFoundRenderings must be camelCase"
            );
            Assert.That(
                json,
                Does.Contain("\"showTranslations\""),
                "showTranslations must be camelCase"
            );
            Assert.That(
                json,
                Does.Contain("\"sourceWordDisplay\""),
                "sourceWordDisplay must be camelCase"
            );
            Assert.That(
                json,
                Does.Contain("\"lastSeenVersion\""),
                "lastSeenVersion must be camelCase"
            );
            Assert.That(
                json,
                Does.Contain("\"dismissedBanners\""),
                "dismissedBanners must be camelCase"
            );
        });
    }

    #endregion
}
