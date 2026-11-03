using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Test-side shortcuts for <see cref="SyncRunResourceGuard"/>.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal static class SyncRunResourceGuardTestHelpers
    {
        /// <summary>
        /// Opens a run that holds <paramref name="dblEntryUids"/>, for tests that exercise the user
        /// write side and have no open write to skip.
        /// </summary>
        /// <param name="dblEntryUids">The DBL entry uids the run holds.</param>
        /// <returns>The run; dispose it to end the run.</returns>
        public static IDisposable StartRun(IEnumerable<string> dblEntryUids) =>
            SyncRunResourceGuard.RegisterRunSkippingOpenWrites(dblEntryUids).Run;
    }
}
