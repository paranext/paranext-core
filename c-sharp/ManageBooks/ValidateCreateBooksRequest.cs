namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 4.5
// Maps to: EXT-003 (BHV-305, BHV-306)
//
// STUB — Test Writer RED skeleton for CAP-004.
// Wire-boundary record for ManageBooksService.ValidateCreateBooksAsync.
// The shape is identical to CreateBooksRequest — the request/response
// separation is a PNX004 one-record-per-file discipline.

/// <summary>
/// Input for pre-flight validation of a create-books request.
/// Shape mirrors <see cref="CreateBooksRequest"/>; a distinct record
/// is kept for PNX004 and for wire-doc alignment (backend-alignment.md
/// "Request/response record files — one per record").
/// </summary>
public record ValidateCreateBooksRequest(
    string ProjectId,
    int[] BookNumbers,
    CreationMethod CreationMethod,
    string? ModelProjectId
);
