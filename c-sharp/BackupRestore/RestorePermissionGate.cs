using Paratext.Data;

namespace Paranext.DataProvider.BackupRestore;

/// <summary>
/// Gates the overlay restore behind administrator permissions on the existing destination project.
/// When PT9 / PT10 restore a backup ZIP on top of an existing project, only the project's
/// Administrator may proceed; all other roles (Translator, Consultant, Observer, Guest, etc.)
/// are blocked. This is the EXT-203 / BHV-325 / INV-B05 / VAL-B05 enforcement point.
/// </summary>
/// <remarks>
/// SIMPLE: one-line wrapper around <c>existingProject.Permissions.WarnIfNotAdministrator()</c>.
///
/// <para>
/// <b>PO interim decision</b> (ALIGNMENT-005 — see
/// <c>.context/features/project-backup-and-restore/implementation/alignment-decisions.md</c>):
/// only the project Administrator may overlay-restore. Other PT9 roles that historically had
/// some restore capability are NOT carried forward to PT10's overlay-restore Phase 3 surface.
/// </para>
///
/// <para>
/// <b>INV-B05 / VAL-B05</b>: "Restoring over an existing project requires admin permission"
/// (business-rules.md line 58). This service is the enforcement point. The caller path
/// (M-003 <c>restoreProject</c> NetworkObject method) translates a <c>false</c> result into
/// a <c>PERMISSION_DENIED</c> envelope before the write-lock / <c>PerformRestore</c> work begins.
/// </para>
///
/// <para>
/// <b>Interactive UI in PT9 — handled by ParatextData internally</b>: PT9's
/// <c>PermissionManager.WarnIfNotAdministrator()</c> calls <c>Alert.Show(...)</c> on the non-admin
/// branch to inform the user that the action is admin-only. In PT10, the wire layer (M-003)
/// is responsible for surfacing the same message to the web view; the ParatextData
/// <c>Alert.Show</c> call is a no-op in the headless PT10 context (the default
/// <c>Alert.Implementation</c> is <see cref="PtxUtils.Alert"/>'s static <c>NoAlert</c>).
/// </para>
/// </remarks>
internal static class RestorePermissionGate
{
    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/RestoreForm.cs:101-107 (RestoreForm.cmdOK_Click)
    // Call target: Paratext/ParatextData/Users/PermissionManager.cs:788-798 (WarnIfNotAdministrator)
    // Maps to: EXT-203
    // Behaviors: BHV-325 (cmdOK gates "user must be Administrator of existing destination")
    // Invariants: INV-B05 / VAL-B05 ("Restoring over an existing project requires admin permission")
    // Scenarios: TS-093 (non-admin user → restore aborts)
    // Decision: ALIGNMENT-005 PO interim — only admin can restore (CG-007)
    //
    // PT9 source (for reference):
    //   ScrText scrText = null;
    //   if (restorer.ScrTextDestination != null)
    //       scrText = ScrTextCollection.GetById(restorer.ScrTextDestination.Guid);
    //
    //   if (scrText != null && !scrText.Permissions.WarnIfNotAdministrator())
    //       return; // Project has an administrator and it is not the current user, so they cannot restore
    //
    // PT9 WarnIfNotAdministrator() body (ParatextData/Users/PermissionManager.cs:788-798):
    //   if (!AmAdministrator)
    //   {
    //       Alert.Show(Localizer.Str("PermissionManager_13", "This is only available to administrators."),
    //                  Localizer.Str("PermissionManager_14", "Paratext"),
    //                  AlertButtons.Ok, AlertLevel.Warning);
    //       return false;
    //   }
    //   return true;
    //
    // PT10 deltas vs PT9:
    //   * PT10 DEFENSIVE-HARDENING DELTA: PT9 reads `scrText.Permissions.WarnIfNotAdministrator()`
    //     with no null-check (it relies on `cachedPermissionManager` always being non-null in
    //     production). PT10 returns `false` (gate closed) on the null-`Permissions` edge rather
    //     than throw `NullReferenceException`. This is the strategic-plan §CAP-019 line 490
    //     explicit edge-case bullet: "scrText with null Permissions → must not crash (defensive
    //     null-check); PT9 returns false in that case (parity)." See test
    //     `CheckAdminGate_WhenPermissionsIsNull_ReturnsFalseDoesNotThrow` for the locked contract.
    //   * The PT9 `Alert.Show(...)` inside `WarnIfNotAdministrator()` is a no-op in PT10's
    //     headless backend (default `Alert.Implementation` is `NoAlert`). The web view receives
    //     the user-facing message via the M-003 caller path's `PERMISSION_DENIED` envelope
    //     instead — see data-contracts.md §3 (Error Conditions) and backend-alignment.md
    //     line 654 (`%restore_adminRequired%`).
    //   * The destination-resolution logic from RestoreForm.cs:101-103
    //     (`scrText = ScrTextCollection.GetById(restorer.ScrTextDestination.Guid)`) is owned
    //     by the M-003 caller (RestoreOrchestrator), NOT by this gate. This service takes the
    //     resolved `ScrText` as input and returns a single boolean.
    /// <summary>
    /// Returns <c>true</c> iff the current user is the administrator of the existing destination
    /// project (and therefore allowed to overlay-restore). Returns <c>false</c> for any
    /// non-administrator role and as a defensive default when <paramref name="existingProject"/>
    /// has no <see cref="ScrText.Permissions"/>.
    /// </summary>
    /// <param name="existingProject">
    /// The resolved destination <see cref="ScrText"/>. The caller (M-003 <c>restoreProject</c>)
    /// is responsible for resolving the destination GUID to an <see cref="ScrText"/> before
    /// calling this gate; this method does NOT do the GUID lookup itself.
    /// </param>
    /// <returns>
    /// <c>true</c> when the current user holds the Administrator role on the project (or when
    /// the project has no permission file — see <see cref="Paratext.Data.Users.PermissionManager.AmAdministrator"/>);
    /// <c>false</c> otherwise. Also returns <c>false</c> when <c>existingProject.Permissions</c>
    /// is <c>null</c> (defensive — PT9 has no explicit null-check; PT10 prefers gate-closed-on-null).
    /// </returns>
    public static bool CheckAdminGate(ScrText existingProject)
    {
        return existingProject.Permissions?.WarnIfNotAdministrator() ?? false;
    }
}
