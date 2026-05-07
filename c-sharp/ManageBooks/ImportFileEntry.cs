namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 2.5
// Maps to: EXT-010, EXT-011 (BHV-105, BHV-106, BHV-318, BHV-405)
//
// STUB — Test Writer RED skeleton for CAP-009 / CAP-010.
// Record type carries no runtime logic; implementer may keep this file as-is.

/// <summary>
/// Per-file entry supplied to
/// <c>ManageBooksService.ParseImportFilesAsync</c> and
/// <c>ImportBooksAsync</c>. The UI layer reads the file bytes, decodes them
/// with the project's encoder, and forwards the decoded string in
/// <see cref="Content"/>; the backend never touches the disk for import.
///
/// <para>See data-contracts.md Section 2.5 for the canonical wire shape
/// and the per-file error codes (ENCODING_ERROR, MISSING_ID_LINE,
/// INVALID_BOOK_CODE, TEXT_BEFORE_ID) produced during parsing.</para>
/// </summary>
/// <param name="FileName">Original file name (shown in error messages).</param>
/// <param name="Content">Already-decoded file text (USFM or USX).</param>
/// <param name="Included">Whether the user has selected this file for import
///   (affects overlap-detection and the import-execution pass; ignored
///   during parsing which looks at every file to populate the comparison
///   list).</param>
public record ImportFileEntry(string FileName, string Content, bool Included);
