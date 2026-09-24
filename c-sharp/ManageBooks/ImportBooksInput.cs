namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 2.5
// Maps to: EXT-010, EXT-011 (BHV-105, BHV-106, BHV-318, BHV-405)
//
// STUB — Test Writer RED skeleton for CAP-009 / CAP-010.
// Record type carries no runtime logic; implementer may keep this file as-is.

/// <summary>
/// Wire request for both
/// <c>ManageBooksService.ParseImportFilesAsync</c> (CAP-009 — read-only
/// parsing/comparison) and <c>ImportBooksAsync</c> (CAP-010 — execution).
/// The two entry points share the same input shape because the UI passes the
/// same file list to both: first to preview the per-file comparison, then to
/// commit the import.
///
/// <para>See data-contracts.md Section 2.5 for wire rules (non-empty files,
/// per-file \id validation, encoding checks, overlapping-books detection).</para>
/// </summary>
/// <param name="ProjectId">Target project identifier.</param>
/// <param name="Files">File contents with their source file names. Must be non-empty.</param>
/// <param name="ReplaceEntireBook">When <c>true</c>, each included file replaces
///   the entire destination book (whole-book replacement). When <c>false</c>,
///   chapters from each file are merged into the existing book. Only used by
///   CAP-010; CAP-009 ignores this flag.</param>
public record ImportBooksInput(string ProjectId, ImportFileEntry[] Files, bool ReplaceEntireBook);
