namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// The pure decision "does the Send/Receive server hold changes this installation has not
/// received?": the server's tip id differs from the tip recorded at the last successful sync. Either
/// id unknown means the question cannot be answered, which reports clean rather than guessing.
/// </summary>
internal static class UnreceivedChangesRule
{
    public static bool Evaluate(string? serverTipId, string? lastSyncedTipId)
    {
        if (string.IsNullOrEmpty(serverTipId) || string.IsNullOrEmpty(lastSyncedTipId))
            return false;
        return !string.Equals(serverTipId, lastSyncedTipId, StringComparison.OrdinalIgnoreCase);
    }
}
