namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// The outcome of <see cref="SyncRunResourceGuard.RegisterRunSkippingOpenWrites"/>: the open run and
/// how the requested DBL entry uids were split between it and the writes already in progress.
/// </summary>
/// <param name="Run">The open run; holds only <paramref name="RegisteredIds"/>. Dispose it to end
/// the run, even when it holds nothing.</param>
/// <param name="RegisteredIds">The uids the run holds: those with no write open at registration.</param>
/// <param name="SkippedIds">The uids left out of the run because a user's install or removal was
/// writing them at registration. The run must not update these resources.</param>
internal sealed record RunRegistration(
    SyncRunResourceGuard.Run Run,
    IReadOnlyCollection<string> RegisteredIds,
    IReadOnlyCollection<string> SkippedIds
);
