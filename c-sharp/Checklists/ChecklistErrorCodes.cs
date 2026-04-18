namespace Paranext.DataProvider.Checklists;

// === NEW IN PT10 ===
// Reason: PT9 surfaces errors via WinForms MessageBox with localized strings, not via
// structured error codes. PT10 uses a machine-readable error-code wire contract so the
// TypeScript web view can branch on error type deterministically.
// Maps to: data-contracts.md §3.6 (ChecklistErrorCode union)
/// <summary>
/// Error-code string constants for the checklist PAPI surface. Values are pinned
/// bit-for-bit to the TypeScript <c>ChecklistErrorCode</c> union in
/// data-contracts.md §3.6 — changing any of these is a wire-breaking change.
/// </summary>
public static class ChecklistErrorCodes
{
    public const string ProjectNotFound = "PROJECT_NOT_FOUND";
    public const string InvalidState = "INVALID_STATE";
    public const string InvalidChecklistType = "INVALID_CHECKLIST_TYPE";
    public const string InvalidVerseRange = "INVALID_VERSE_RANGE";
    public const string InvalidMarkerSettings = "INVALID_MARKER_SETTINGS";
    public const string MaxRowsExceeded = "MAX_ROWS_EXCEEDED";
    public const string Cancelled = "CANCELLED";
}
