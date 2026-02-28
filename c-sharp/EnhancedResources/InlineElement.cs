namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Base record for inline elements within encyclopedia paragraphs.
/// Discriminated union via derived records: SeeAlsoElement, ScriptureRefElement,
/// AbbreviationElement, ImageElement.
///
/// Behavior: BHV-607 (Paragraph Formatting Rules)
/// </summary>
public abstract record InlineElement(string Type);
