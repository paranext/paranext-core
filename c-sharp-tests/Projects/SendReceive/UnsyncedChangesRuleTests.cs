using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects.SendReceive;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Unit tests for <see cref="UnsyncedChangesRule"/>: the pure decision over shared state,
    /// uncommitted changes, and the local tip versus the last-synced tip.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class UnsyncedChangesRuleTests
    {
        [TestCase(
            false,
            true,
            "t1",
            "t0",
            ExpectedResult = false,
            TestName = "NotShared_NeverUnsynced"
        )]
        [TestCase(
            true,
            true,
            "t1",
            "t1",
            ExpectedResult = true,
            TestName = "Uncommitted_IsUnsynced"
        )]
        [TestCase(
            true,
            false,
            "t1",
            "t0",
            ExpectedResult = true,
            TestName = "TipMovedSinceSync_IsUnsynced"
        )]
        [TestCase(true, false, "t1", "t1", ExpectedResult = false, TestName = "TipMatches_IsClean")]
        [TestCase(
            true,
            false,
            "T1",
            "t1",
            ExpectedResult = false,
            TestName = "TipCompare_IgnoresCase"
        )]
        [TestCase(
            true,
            false,
            "t1",
            null,
            ExpectedResult = false,
            TestName = "NoLastSyncedTip_UncommittedOnly"
        )]
        [TestCase(
            true,
            false,
            null,
            "t0",
            ExpectedResult = false,
            TestName = "NoTipReadable_IsClean"
        )]
        public bool Evaluate(bool shared, bool uncommitted, string? tip, string? last) =>
            UnsyncedChangesRule.Evaluate(shared, uncommitted, tip, last);
    }
}
