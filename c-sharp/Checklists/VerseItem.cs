namespace Paranext.DataProvider.Checklists;

/// <summary>
/// RED-phase skeleton verse content item. See data-contracts.md §3.5.
/// </summary>
public record VerseItem(string VerseNumber) : ChecklistContentItem;
