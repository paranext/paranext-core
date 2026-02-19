namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of a localized gloss lookup for a Biblical Term from Marble dictionaries.
/// Contains the list of glosses and the language they were found in.
/// </summary>
/// <param name="Glosses">The localized gloss strings for the term.</param>
/// <param name="Language">The language code of the glosses.</param>
public record GlossResult(IReadOnlyList<string> Glosses, string Language);
