namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 4.12
// Maps to: EXT-011 (BHV-318)
//
// STUB — Test Writer RED skeleton for CAP-009.
// Record type carries no runtime logic; implementer may keep this file as-is.

/// <summary>
/// Lightweight input for <c>ManageBooksService.CheckOverlappingFilesAsync</c>
/// / <c>ImportBooksOrchestrator.CheckOverlappingFiles</c>. The UI constructs
/// this array from the currently-displayed Import Books dialog rows (derived
/// from a prior <c>ParseImportFilesAsync</c> call); the backend detects
/// duplicate book numbers among entries with
/// <see cref="Included"/>=<c>true</c> and returns a
/// <see cref="ValidationResult"/> — <see cref="ValidationSeverity.Error"/>
/// with the canonical PT9 message per gm-012 when overlap is found.
///
/// <para>Separate from <see cref="ImportFileEntry"/> so the UI can re-run
/// overlap detection on toggle without re-sending file contents (Theme 5:
/// file text stays off the wire when not needed).</para>
/// </summary>
/// <param name="FileName">Original file name (for error messages).</param>
/// <param name="BookNum">1-based book number parsed from the file's \id marker.</param>
/// <param name="Included">Whether the user has selected this file for import
///   in the Import Books dialog.</param>
public record OverlapCheckEntry(string FileName, int BookNum, bool Included);
