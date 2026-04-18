namespace Paranext.DataProvider.Checklists;

/// <summary>
/// RED-phase skeleton. See data-contracts.md §3.6.
/// </summary>
public record ChecklistError(string ErrorCode, string Message, string? Details);
