using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Test-side shortcuts for <see cref="SyncRunResourceGuard"/>. Kept out of the guard itself: a
    /// production caller must wait with its sync's cancellation token, so an uncancellable
    /// register-and-wait belongs to tests only.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal static class SyncRunResourceGuardTestHelpers
    {
        /// <summary>
        /// <see cref="SyncRunResourceGuard.RegisterRun"/> followed by an uncancellable
        /// <see cref="SyncRunResourceGuard.Run.WaitForResourceWrites"/>: returns the run once every
        /// write scope already open on one of its resources has closed, or the guard's wait timeout
        /// has elapsed. Disposes the run if the wait throws, since the caller never gets the handle.
        /// </summary>
        /// <param name="dblEntryUids">The DBL entry uids the run holds.</param>
        /// <returns>The run; dispose it to end the run.</returns>
        public static IDisposable RegisterRunAndDrain(IEnumerable<string> dblEntryUids)
        {
            var run = SyncRunResourceGuard.RegisterRun(dblEntryUids);
            try
            {
                run.WaitForResourceWrites(CancellationToken.None);
            }
            catch
            {
                run.Dispose();
                throw;
            }
            return run;
        }
    }
}
