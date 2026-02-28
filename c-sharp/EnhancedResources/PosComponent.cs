namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// A single component of a translated part-of-speech tag.
///
/// Contract: Section 3.6 (data-contracts.md)
///
/// Each component represents one element of the POS classification
/// (e.g., "noun", "masculine", "plural", "absolute").
/// </summary>
public record PosComponent(string Category, string Abbreviation, string FullForm);
