namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 3.7
// Maps to: EXT-003 (BHV-305, BHV-306)

/// <summary>
/// Result of validation operations (CheckModelBooks, CheckVersification).
/// CheckModelBooks: some books missing → Warning; all missing → Error.
/// CheckVersification: project vs model versifications differ → Warning.
///
/// <para>Construct via the <see cref="Ok"/>, <see cref="Warning"/>, and
/// <see cref="Error"/> factory methods for intent-revealing call sites;
/// the positional record constructor remains available for wire
/// deserialization and test helpers.</para>
/// </summary>
public record ValidationResult(ValidationSeverity Severity, string? Message, int[]? AffectedBooks)
{
    /// <summary>Validation passed; no user-facing message or affected books.</summary>
    public static ValidationResult Ok() => new(ValidationSeverity.Ok, null, null);

    /// <summary>
    /// Validation surfaced a non-blocking concern (e.g., some selected
    /// books missing from model, versification mismatch). UI should
    /// confirm with user before proceeding.
    /// </summary>
    public static ValidationResult Warning(string message, int[]? affectedBooks = null) =>
        new(ValidationSeverity.Warning, message, affectedBooks);

    /// <summary>
    /// Validation blocks the operation (e.g., all selected books missing
    /// from model, VAL-009 missing model project).
    /// </summary>
    public static ValidationResult Error(string message, int[]? affectedBooks = null) =>
        new(ValidationSeverity.Error, message, affectedBooks);
}
