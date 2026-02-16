namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Versification compatibility check result.
/// </summary>
/// <remarks>
/// Ported from PT9/Paratext/ToolsMenu/CreateBooksForm.cs:298-316 (EXT-004)
/// Maps to: CAP-018, TS-071, BHV-308
///
/// This record is returned by CheckVersificationCompatibility to indicate whether
/// the target and source (model) projects have compatible versification schemes.
/// </remarks>
/// <param name="IsCompatible">Whether versifications are compatible (same or no canonical books selected).</param>
/// <param name="WarningMessage">Warning message if versifications differ, null otherwise.</param>
/// <param name="SourceVersification">Versification name of the source (model) project.</param>
/// <param name="TargetVersification">Versification name of the target project.</param>
public record VersificationCheckResult(
    bool IsCompatible,
    string? WarningMessage,
    string SourceVersification,
    string TargetVersification
);
