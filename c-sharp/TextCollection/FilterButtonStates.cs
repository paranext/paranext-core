namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Filter button toggle states for the project selection dialog.
/// Each boolean represents whether that filter category button is active (checked).
/// </summary>
public record FilterButtonStates(
    bool Projects,
    bool Resources,
    bool EnhancedResources,
    bool SourceLanguages,
    bool Dictionaries,
    bool ConsultantNotes
);
