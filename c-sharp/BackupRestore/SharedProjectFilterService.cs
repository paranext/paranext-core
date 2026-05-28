using System;
using System.Collections.Generic;
using System.Linq;
using Paratext.Data.Users;

namespace Paranext.DataProvider.BackupRestore;

/// <summary>
/// Detects backups that contain shared-project permission files, prompts the caller for
/// confirmation via a callback, and (on confirmation) strips the permission files from
/// the restore set so they never reach the destination project.
/// </summary>
/// <remarks>
/// SIMPLE: 2-filename detection set + 3-filename removal set (the removal set adds
/// <c>ProjectUserFields.xml</c>; the detection set does NOT include it).
///
/// <para>
/// <b>Asymmetric detection vs removal</b> — by design (per PT9 parity, see
/// <c>RestoreForm.cs:365-390</c>):
/// </para>
/// <list type="bullet">
///   <item>
///     <b>Detection set</b> (governs <see cref="SharedProjectFilterResult.HasSharedFiles"/>):
///     <c>ProjectPermissionManager.fileName</c> ("<c>ProjectUserAccess.xml</c>") and
///     <c>ProjectPermissionManager.legacyProjectUsersFileName</c> ("<c>ProjectUsers.xml</c>").
///     Either match triggers the warning.
///   </item>
///   <item>
///     <b>Removal set</b> (governs which files are stripped after a positive confirmation):
///     the detection set PLUS
///     <c>ProjectPermissionManager.legacyProjectUserFieldsFileName</c>
///     ("<c>ProjectUserFields.xml</c>").
///   </item>
/// </list>
///
/// <para>
/// A backup containing ONLY <c>ProjectUserFields.xml</c> (and nothing from the detection set)
/// returns <c>HasSharedFiles=false</c> and is restored as-is — the PT9 code gates the entire
/// removal branch on a positive detection. This is intentional parity and is locked by an
/// explicit test in <c>SharedProjectFilterServiceTests</c>.
/// </para>
///
/// <para>
/// All filename comparisons are case-insensitive (<c>StringComparison.OrdinalIgnoreCase</c>)
/// per PT9. A file named "ProjectUserAccess.XML" (uppercase suffix) is matched.
/// </para>
///
/// <para>
/// INV-B06: "Restoring a shared project backup never installs its permission files."
/// This service is the enforcement point for that invariant on the user-confirmed path.
/// On the No path, the invariant is enforced by the caller aborting the restore
/// altogether (<c>userConfirmsContinue</c> returned <c>false</c> ⇒
/// <see cref="SharedProjectFilterResult.HasSharedFiles"/> is <c>true</c> ⇒ caller cancels).
/// </para>
/// </remarks>
internal static class SharedProjectFilterService
{
    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/RestoreForm.cs:365-390 (WarnUserAboutUsingRestoreWithSharedProjects)
    // Method: void WarnUserAboutUsingRestoreWithSharedProjects()
    // Maps to: EXT-201
    // Behaviors: BHV-323 (Shared-project warning + ProjectUsers.xml exclusion rule)
    // Invariants: INV-B06 (Restoring a shared project backup never installs its permission files)
    // Scenarios: TS-090 (No path → HasSharedFiles=true, list unchanged), TS-091 (Yes path → 3 files removed)
    //
    // PT9 source (for reference):
    //   if (fileList.Any(sdfi => sdfi.SourceFile.FileName.Equals(ProjectPermissionManager.fileName,
    //                                StringComparison.OrdinalIgnoreCase) ||
    //                            sdfi.SourceFile.FileName.Equals(ProjectPermissionManager.legacyProjectUsersFileName,
    //                                StringComparison.OrdinalIgnoreCase)))
    //   {
    //       string msg = Localizer.Str("RestoreForm_11", "...");
    //       if (Alert.Show(msg, Localizer.Str("RestoreForm_12", "Paratext"),
    //                      AlertButtons.YesNo, AlertLevel.Warning) == AlertResult.Negative)
    //       {
    //           DialogResult = DialogResult.Cancel;
    //           return;
    //       }
    //       fileList.RemoveAll(sdfi =>
    //           sdfi.SourceFile.FileName.Equals(ProjectPermissionManager.fileName,
    //               StringComparison.OrdinalIgnoreCase) ||
    //           sdfi.SourceFile.FileName.Equals(ProjectPermissionManager.legacyProjectUsersFileName,
    //               StringComparison.OrdinalIgnoreCase) ||
    //           sdfi.SourceFile.FileName.Equals(ProjectPermissionManager.legacyProjectUserFieldsFileName,
    //               StringComparison.OrdinalIgnoreCase));
    //   }
    //
    // PT10 deltas vs PT9:
    //   * The Alert.Show interaction is HOISTED OUT of this service into a callback
    //     (`userConfirmsContinue`). PT9 mixed model + dialog; PT10 keeps this layer
    //     pure-function-friendly and lets the caller (web view / NetworkObject wire) own
    //     the dialog. The callback contract: returns true if the user picked Yes (continue),
    //     false if the user picked No (cancel).
    //   * PT9 mutated RestoreForm.fileList directly via List.RemoveAll. PT10 receives an
    //     IList<RestoreFileInfo> and returns a SharedProjectFilterResult. Mutation parity
    //     of the input list is the Implementer's call (see test-writer-CAP-018.md §Resolved
    //     Ambiguities §4).
    //   * PT9 referenced ProjectPermissionManager.fileName /
    //     ProjectPermissionManager.legacyProjectUsersFileName / .legacyProjectUserFieldsFileName
    //     directly. PT10's ParatextData.dll NuGet package DOES export ProjectPermissionManager,
    //     so the Implementer will reference those same constants (consts on the class
    //     under ParatextData/Users/ProjectPermissionManager.cs:14-19):
    //       public const string fileName                       = "ProjectUserAccess.xml";
    //       public const string legacyProjectUsersFileName     = "ProjectUsers.xml";
    //       public const string legacyProjectUserFieldsFileName = "ProjectUserFields.xml";
    /// <summary>
    /// Inspects <paramref name="fileList"/> for shared-project permission markers; if found,
    /// invokes <paramref name="userConfirmsContinue"/> exactly once and, on a positive
    /// confirmation, strips the 3-file permission set from the list. On a negative
    /// confirmation, leaves the list unchanged and returns
    /// <c>HasSharedFiles=true</c> so the caller can cancel the restore.
    /// </summary>
    /// <param name="fileList">
    /// The file list to inspect. PT9 parity: this method may mutate <paramref name="fileList"/>
    /// in place when stripping the permission files (PT9's <c>RemoveAll</c> mutates).
    /// </param>
    /// <param name="userConfirmsContinue">
    /// Callback invoked at most once — only when shared-project markers are detected.
    /// Returns <c>true</c> if the user wants to continue (strip the permission files and
    /// restore), <c>false</c> if the user wants to cancel. NOT invoked when no markers
    /// are detected.
    /// </param>
    /// <returns>
    /// A <see cref="SharedProjectFilterResult"/> capturing whether markers were detected
    /// and the file list after filtering.
    /// </returns>
    public static SharedProjectFilterResult Filter(
        IList<RestoreFileInfo> fileList,
        Func<bool> userConfirmsContinue
    )
    {
        // EXPLANATION:
        // Three branches, gated by detection:
        //   1. No detection-set match → HasSharedFiles=false, list unchanged, callback NOT invoked.
        //   2. Detection-set match + callback returns false → HasSharedFiles=true, list unchanged
        //      (caller aborts).
        //   3. Detection-set match + callback returns true → HasSharedFiles=true, list mutated by
        //      RemoveAll over the 3-name removal set.
        //
        // PT9 parity: input list is mutated in place via List.RemoveAll. The IList<> parameter is
        // cast to List<> to preserve mutation; a non-List caller gets a defensive copy (untested
        // path — all tests pass List<RestoreFileInfo>).
        var list = fileList as List<RestoreFileInfo> ?? new List<RestoreFileInfo>(fileList);

        if (!list.Any(IsDetectionFile))
            return new SharedProjectFilterResult(false, list);

        if (!userConfirmsContinue())
            return new SharedProjectFilterResult(true, list);

        list.RemoveAll(IsRemovalFile);
        return new SharedProjectFilterResult(true, list);
    }

    // EXPLANATION:
    // Detection set (2 names) — governs HasSharedFiles. Per PT9 RestoreForm.cs:367-368, the
    // detection check is the gate for the entire warning + removal branch.
    private static bool IsDetectionFile(RestoreFileInfo fileInfo)
    {
        string? fileName = fileInfo.SourceFile?.FileName;
        if (fileName == null)
            return false;
        return fileName.Equals(
                ProjectPermissionManager.fileName,
                StringComparison.OrdinalIgnoreCase
            )
            || fileName.Equals(
                ProjectPermissionManager.legacyProjectUsersFileName,
                StringComparison.OrdinalIgnoreCase
            );
    }

    // EXPLANATION:
    // Removal set (3 names) — detection set PLUS legacyProjectUserFieldsFileName. Per PT9
    // RestoreForm.cs:386-388. Asymmetry is intentional and locked by tests.
    private static bool IsRemovalFile(RestoreFileInfo fileInfo)
    {
        string? fileName = fileInfo.SourceFile?.FileName;
        if (fileName == null)
            return false;
        return fileName.Equals(
                ProjectPermissionManager.fileName,
                StringComparison.OrdinalIgnoreCase
            )
            || fileName.Equals(
                ProjectPermissionManager.legacyProjectUsersFileName,
                StringComparison.OrdinalIgnoreCase
            )
            || fileName.Equals(
                ProjectPermissionManager.legacyProjectUserFieldsFileName,
                StringComparison.OrdinalIgnoreCase
            );
    }
}
