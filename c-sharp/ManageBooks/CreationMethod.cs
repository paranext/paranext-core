namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 2.2
// Maps to: EXT-002 (BHV-305, BHV-306, BHV-407)
//
// STUB — Test Writer RED skeleton for CAP-004.
// Enum represents the three book creation strategies for CreateBooks:
//   Empty        → ScriptureTemplate.CreateIdLineOnly
//   ChapterVerse → ScriptureTemplate.CreateCV (canonical books only; non-canonical falls through to id-line-only per PT9 ScriptureTemplate.cs:83)
//   FromTemplate → ScriptureTemplate.CreateFromTemplate (requires ModelProjectId)

/// <summary>
/// Book creation method selected by the caller of <c>CreateBooks</c>.
/// Matches TypeScript <c>CreationMethod</c> string-union in the wire contract.
/// </summary>
public enum CreationMethod
{
    Empty,
    ChapterVerse,
    FromTemplate,
}
