namespace Paranext.DataProvider.Checklists;

/// <summary>
/// RED-phase skeleton text content item. See data-contracts.md §3.5.
/// </summary>
public record TextItem(string Text, string? CharacterStyle) : ChecklistContentItem;
