namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 2.2
// Maps to: EXT-002 (BHV-305, BHV-306, BHV-407)
//
// STUB — Test Writer RED skeleton for CAP-004.
// Wire-boundary record for ManageBooksService.CreateBooksAsync.
// Matches the TypeScript CreateBooksInput interface; naming follows
// the PT10 wire convention (see backend-alignment.md "Request/response
// record files — one per record (Theme 2, strict PNX004)").

/// <summary>
/// Input for the book creation operation. Specifies target project,
/// books to create, creation method, and optional model project.
/// </summary>
public record CreateBooksRequest(
    string ProjectId,
    int[] BookNumbers,
    CreationMethod CreationMethod,
    string? ModelProjectId
);
