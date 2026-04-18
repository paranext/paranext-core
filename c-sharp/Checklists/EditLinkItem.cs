namespace Paranext.DataProvider.Checklists;

/// <summary>
/// RED-phase skeleton edit-link content item. See data-contracts.md §3.5.
/// </summary>
public record EditLinkItem(int BookNum, int ChapterNum, int VerseNum) : ChecklistContentItem;
