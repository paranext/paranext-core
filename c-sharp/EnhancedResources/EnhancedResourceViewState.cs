// === NEW IN PT10 ===
// Reason: PAPI command pattern - view state data model for ER windows
// Maps to: CAP-022
// PT9 Source: MarbleForm.cs:2996-3026 (MarbleFormMemento), XmlResourceWindow.cs:1693 (ResourceEditorMemento)
// Contract: data-contracts.md EnhancedResourceViewState
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Captures the full UI state of an Enhanced Resource window for persistence (memento pattern).
/// All 15 fields are persisted across sessions keyed by windowId.
/// </summary>
public record EnhancedResourceViewState(
    string ResourceId,
    string? TrackedProjectId,
    double SplitterPercentage,
    double ScripturePaneZoom,
    ResearchTab SelectedTab,
    ScopeFilter ScopeFilter,
    TermHighlightFilter TermHighlightFilter,
    DictionarySortField SortField,
    bool SortAscending,
    bool ShowFootnotes,
    bool ShowFoundRenderings,
    bool ShowTranslations,
    SourceWordDisplayMode SourceWordDisplay,
    string? LastSeenVersion,
    IReadOnlyList<string> DismissedBanners
);

/// <summary>
/// Research tab selection for the bottom pane.
/// </summary>
public enum ResearchTab
{
    Dictionary = 0,
    Encyclopedia = 1,
    Media = 2,
    Maps = 3,
}

/// <summary>
/// Sort field for dictionary tab display items.
/// </summary>
public enum DictionarySortField
{
    Translit = 0,
    Lemma = 1,
    Translations = 2,
    Gloss = 3,
    Found = 4,
}

/// <summary>
/// Display mode for source language words in the scripture pane.
/// </summary>
public enum SourceWordDisplayMode
{
    Original = 0,
    Transliteration = 1,
    Both = 2,
}
