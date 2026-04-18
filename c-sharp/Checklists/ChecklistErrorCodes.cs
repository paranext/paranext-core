namespace Paranext.DataProvider.Checklists;

/// <summary>
/// RED-phase skeleton. The implementer must populate these constants with the exact
/// string values in data-contracts.md §3.6. Tests pin these values bit-for-bit as
/// part of the wire contract.
/// </summary>
public static class ChecklistErrorCodes
{
    public const string ProjectNotFound = "";
    public const string InvalidState = "";
    public const string InvalidChecklistType = "";
    public const string InvalidVerseRange = "";
    public const string InvalidMarkerSettings = "";
    public const string MaxRowsExceeded = "";
    public const string Cancelled = "";
}
