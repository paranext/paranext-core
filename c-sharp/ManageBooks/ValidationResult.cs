namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 3.7
// Maps to: EXT-003 (BHV-305, BHV-306)
//
// STUB — Test Writer RED skeleton for CAP-004.

/// <summary>
/// Result of validation operations (CheckModelBooks, CheckVersification).
/// CheckModelBooks: some books missing → Warning; all missing → Error.
/// CheckVersification: project vs model versifications differ → Warning.
/// </summary>
public record ValidationResult(ValidationSeverity Severity, string? Message, int[]? AffectedBooks);
