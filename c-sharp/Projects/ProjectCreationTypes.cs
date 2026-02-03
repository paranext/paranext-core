// === NEW IN PT10 ===
// Reason: Data contracts for project creation validation - PAPI request/response types
// Maps to: CAP-002, data-contracts.md section 1.2 and 2.2

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Request to validate a project short name.
/// Maps to: EXT-002, VAL-001
/// </summary>
/// <param name="Name">Short name to validate</param>
/// <param name="IsExistingProject">True if editing existing project, false if creating new</param>
public record ShortNameValidationRequest(string Name, bool IsExistingProject);

/// <summary>
/// Generic validation result.
/// Used by: EXT-002, EXT-006, EXT-010, EXT-011
/// </summary>
/// <param name="IsValid">Whether validation passed</param>
/// <param name="ErrorMessage">Error message if invalid (null if valid)</param>
/// <param name="ErrorMessageKey">Localization key for error message</param>
/// <param name="FormatArgs">Format arguments for parameterized messages</param>
public record ValidationResult(
    bool IsValid,
    string? ErrorMessage = null,
    string? ErrorMessageKey = null,
    IReadOnlyList<string>? FormatArgs = null
)
{
    /// <summary>
    /// Create a successful validation result.
    /// </summary>
    public static ValidationResult Success() => new(true);

    /// <summary>
    /// Create a failed validation result.
    /// </summary>
    public static ValidationResult Failure(
        string message,
        string? key = null,
        params string[] args
    ) => new(false, message, key, args.Length > 0 ? args : null);
}
