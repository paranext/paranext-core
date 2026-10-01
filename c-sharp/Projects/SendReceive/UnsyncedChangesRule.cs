namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// The pure decision "does this project have local changes Send/Receive has not sent?" —
/// uncommitted working-directory changes, OR a local tip that moved since the last successful sync
/// (local commits such as the editor's daily commit and Find/Replace commits). A project that is not
/// shared has nothing to send. A missing last-synced tip (public core, or never synced) means the
/// tip comparison is unknowable, so only the uncommitted check applies. Kept free of ParatextData
/// so it is unit-testable; <see cref="ParatextProjectSendReceiveService.HasUnsyncedLocalChanges"/>
/// gathers the inputs.
/// </summary>
internal static class UnsyncedChangesRule
{
    public static bool Evaluate(
        bool isProjectShared,
        bool hasUncommittedChanges,
        string? tipId,
        string? lastSyncedTipId
    )
    {
        if (!isProjectShared)
            return false;
        if (hasUncommittedChanges)
            return true;
        if (string.IsNullOrEmpty(tipId) || string.IsNullOrEmpty(lastSyncedTipId))
            return false;
        return !string.Equals(tipId, lastSyncedTipId, StringComparison.OrdinalIgnoreCase);
    }
}
