using System.Collections.Generic;

namespace Paranext.DataProvider.BackupRestore;

// === PORTED FROM PT9 ===
// Source: Paratext/BackupRestore/RestoreForm.cs:365-390 (WarnUserAboutUsingRestoreWithSharedProjects)
// Maps to: data-contracts.md §9 line 2245 (`public record SharedProjectFilterResult(...)`);
//          backend-alignment.md §EXT-201 line 245
//
// PT9 has no equivalent record — the original method returned `void` and mutated the
// surrounding RestoreForm's `fileList` field + `DialogResult` property directly. PT10
// hoists those two outputs (the "did we find shared-project markers?" flag + the resulting
// list) into an immutable record so the filter stays a pure-function-with-side-effect-on-
// fileList. The flag is what the UI needs to drive the YesNo Alert; the list is what the
// downstream restore pipeline consumes.
/// <summary>
/// Result of <see cref="SharedProjectFilterService.Filter"/>. Captures whether the backup
/// contained any shared-project permission markers and, if so, the file list with the
/// permission files stripped (when the user confirmed the warning).
/// </summary>
/// <param name="HasSharedFiles">
/// <c>true</c> when the input file list contained at least one of the two detection-set
/// filenames (<c>ProjectUserAccess.xml</c> or <c>ProjectUsers.xml</c>). The UI uses this
/// flag to determine whether the YesNo Alert (<c>RestoreForm_11</c>) was shown.
/// </param>
/// <param name="FilteredList">
/// The file list after filtering. On the No path (<c>userConfirmsContinue</c> returned
/// <c>false</c>) this is the same list (unchanged) — the caller is responsible for
/// aborting the restore. On the Yes path this is the input list with the 3-file removal
/// set stripped. On the "no markers detected" path this is the input list unchanged.
/// </param>
public sealed record SharedProjectFilterResult(
    bool HasSharedFiles,
    List<RestoreFileInfo> FilteredList
);
