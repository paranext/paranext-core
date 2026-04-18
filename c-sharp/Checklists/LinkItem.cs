namespace Paranext.DataProvider.Checklists;

/// <summary>
/// RED-phase skeleton reference-link content item. See data-contracts.md §3.5.
/// </summary>
public record LinkItem(string Reference, string DisplayText) : ChecklistContentItem;
