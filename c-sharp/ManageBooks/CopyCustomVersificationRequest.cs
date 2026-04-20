namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 4.14
// Maps to: BHV-168 (CopyCustomVersification for Cross-Project Operations)
// PT9 Source: ProjectSettings.CopyCustomVersification() at
//   ParatextData/ProjectSettingsAccess/ProjectSettings.cs:2125-2146
//
// STUB — Test Writer RED skeleton for CAP-007 (M-014 absorbed per RM-012).
// Wire-boundary record for ManageBooksService.CopyCustomVersificationAsync.
// The data-contract exposes two positional args on the TypeScript wire
// (sourceProjectId, destProjectId); the C# wire uses an object record so
// the JSON-RPC layer can materialize a single argument
// (backend-alignment.md line 78 — "object form preferred").

/// <summary>
/// Input for the CopyCustomVersification operation (M-014). See
/// data-contracts.md Section 4.14.
/// </summary>
public record CopyCustomVersificationRequest(string FromProjectId, string ToProjectId);
