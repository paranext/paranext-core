namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 3.7
// Maps to: EXT-003 (BHV-305, BHV-306)
//
// STUB — Test Writer RED skeleton for CAP-004.
// Mirrors TypeScript ValidationSeverity union 'ok' | 'warning' | 'error'.

/// <summary>
/// Severity of a <see cref="ValidationResult"/> returned by
/// <c>ValidateCreateBooks</c> pre-flight checks.
/// </summary>
public enum ValidationSeverity
{
    Ok,
    Warning,
    Error,
}
