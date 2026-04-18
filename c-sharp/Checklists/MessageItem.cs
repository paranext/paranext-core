namespace Paranext.DataProvider.Checklists;

/// <summary>
/// RED-phase skeleton message content item. See data-contracts.md §3.5.
/// </summary>
public record MessageItem(string Message) : ChecklistContentItem;
