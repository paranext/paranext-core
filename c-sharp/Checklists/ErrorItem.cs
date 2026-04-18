namespace Paranext.DataProvider.Checklists;

/// <summary>
/// RED-phase skeleton error content item. See data-contracts.md §3.5.
/// </summary>
public record ErrorItem(string Message) : ChecklistContentItem;
