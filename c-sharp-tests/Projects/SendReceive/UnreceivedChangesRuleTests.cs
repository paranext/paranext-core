using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects.SendReceive;
using Paratext.Data;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// Unit tests for <see cref="UnreceivedChangesRule"/>: the pure decision comparing the server's
    /// tip id with the tip recorded at the last successful sync.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class UnreceivedChangesRuleTests
    {
        [TestCase("s1", "s0", ExpectedResult = true, TestName = "ServerMoved_IsUnreceived")]
        [TestCase("s1", "s1", ExpectedResult = false, TestName = "TipsMatch_IsClean")]
        [TestCase("S1", "s1", ExpectedResult = false, TestName = "Compare_IgnoresCase")]
        [TestCase("s1", null, ExpectedResult = false, TestName = "NoLastSyncedTip_IsClean")]
        [TestCase("s1", "", ExpectedResult = false, TestName = "EmptyLastSyncedTip_IsClean")]
        [TestCase(null, "s0", ExpectedResult = false, TestName = "NoServerTip_IsClean")]
        public bool Evaluate(string? server, string? last) =>
            UnreceivedChangesRule.Evaluate(server, last);
    }

    /// <summary>
    /// Stub defaults of the server-tip seam on <see cref="ParatextProjectSendReceiveService"/>.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class ParatextProjectSendReceiveServiceUnreceivedTests : PapiTestBase
    {
        [Test]
        public void GetServerTipIds_PublicCore_ReturnsNoEntries()
        {
            Assert.That(
                CreateSendReceiveService().GetServerTipIds(Array.Empty<ScrText>()),
                Is.Empty
            );
        }

        [Test]
        public void GetProjectsWithUnreceivedChanges_PublicCore_ReturnsEmptyNotNull()
        {
            var result = CreateSendReceiveService()
                .GetProjectsWithUnreceivedChanges(Array.Empty<ScrText>());
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.Empty);
        }
    }
}
