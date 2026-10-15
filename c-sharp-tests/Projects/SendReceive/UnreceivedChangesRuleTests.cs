using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
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
    /// Unit tests for <see cref="ParatextProjectSendReceiveService.AllowsServerLookup"/>: which
    /// internet settings let the poller contact the Send/Receive server.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class AllowsServerLookupTests
    {
        [TestCase(
            InternetUse.Enabled,
            InternetUse.Enabled,
            ExpectedResult = true,
            TestName = "Enabled_Allows"
        )]
        [TestCase(
            InternetUse.Enabled,
            InternetUse.VpnRequired,
            ExpectedResult = false,
            TestName = "SomeServicesDisabled_OutsideSensitiveLocation_Refuses"
        )]
        [TestCase(
            InternetUse.Disabled,
            InternetUse.VpnRequired,
            ExpectedResult = false,
            TestName = "SomeServicesDisabled_InSensitiveLocation_Refuses"
        )]
        [TestCase(
            InternetUse.Disabled,
            InternetUse.Disabled,
            ExpectedResult = false,
            TestName = "Disabled_Refuses"
        )]
        [TestCase(
            InternetUse.ProxyOnly,
            InternetUse.ProxyOnly,
            ExpectedResult = false,
            TestName = "ProxyOnly_Refuses"
        )]
        public bool AllowsServerLookup(InternetUse effective, InternetUse saved) =>
            ParatextProjectSendReceiveService.AllowsServerLookup(effective, saved);
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

        private sealed class ScriptedTipService(
            PapiClient client,
            ParatextProjectDataProviderFactory factory,
            AppInfo appInfo,
            LocalParatextProjects projects
        ) : ParatextProjectSendReceiveService(client, factory, appInfo, projects)
        {
            public bool Throw { get; set; }

            /// <summary>Server tips returned by the lookup, keyed exactly as scripted.</summary>
            public Dictionary<string, string?> ServerTips { get; } = [];

            /// <summary>Last-synced tips by project id (as <c>ScrText.Guid.ToString()</c>).</summary>
            public Dictionary<string, string?> LastSyncedTips { get; } = [];

            /// <summary>The project lists the lookup was called with.</summary>
            public List<string[]> Lookups { get; } = [];

            protected internal override IReadOnlyDictionary<string, string?> GetServerTipIds(
                IReadOnlyCollection<ScrText> scrTexts
            )
            {
                Lookups.Add([.. scrTexts.Select(scrText => scrText.Guid.ToString())]);
                return Throw
                    ? throw new InvalidOperationException("lookup failed")
                    : new Dictionary<string, string?>(ServerTips);
            }

            protected internal override string? GetLastSyncedTipId(ScrText scrText) =>
                LastSyncedTips.GetValueOrDefault(scrText.Guid.ToString());
        }

        private ScriptedTipService CreateScriptedService() =>
            new(
                Client,
                new ParatextProjectDataProviderFactory(Client, ParatextProjects),
                new AppInfo("test", "1.0.0", "test"),
                ParatextProjects
            );

        [Test]
        public void GetProjectsWithUnreceivedChanges_LookupThrows_ReturnsNull()
        {
            var service = CreateScriptedService();
            service.Throw = true;

            Assert.That(
                service.GetProjectsWithUnreceivedChanges([new SharedDummyScrText()]),
                Is.Null
            );
        }

        [Test]
        public void GetProjectsWithUnreceivedChanges_ReportsProjectWhoseServerTipMoved()
        {
            // P2 is matched so a lookup that reported every project would not pass.
            var service = CreateScriptedService();
            var moved = new SharedDummyScrText();
            var matched = new SharedDummyScrText();
            service.ServerTips[moved.Guid.ToString().ToUpperInvariant()] = "s1";
            service.LastSyncedTips[moved.Guid.ToString()] = "s0";
            service.ServerTips[matched.Guid.ToString().ToUpperInvariant()] = "t1";
            service.LastSyncedTips[matched.Guid.ToString()] = "t1";

            var result = service.GetProjectsWithUnreceivedChanges([moved, matched]);

            Assert.That(result, Is.EqualTo(new[] { moved.Guid.ToString().ToUpperInvariant() }));
        }

        [Test]
        public void GetProjectsWithUnreceivedChanges_FindsTipUnderLowerCasedKey()
        {
            var service = CreateScriptedService();
            var project = new SharedDummyScrText();
            service.ServerTips[project.Guid.ToString().ToLowerInvariant()] = "s1";
            service.LastSyncedTips[project.Guid.ToString()] = "s0";

            var result = service.GetProjectsWithUnreceivedChanges([project]);

            Assert.That(result, Is.EqualTo(new[] { project.Guid.ToString().ToUpperInvariant() }));
        }

        [Test]
        public void GetProjectsWithUnreceivedChanges_PassesOnlySharedProjectsToTheLookup()
        {
            var service = CreateScriptedService();
            var shared = new SharedDummyScrText();
            var unshared = new DummyScrText();
            service.ServerTips[unshared.Guid.ToString().ToUpperInvariant()] = "s1";
            service.LastSyncedTips[unshared.Guid.ToString()] = "s0";

            var result = service.GetProjectsWithUnreceivedChanges([unshared, shared]);

            Assert.Multiple(() =>
            {
                Assert.That(
                    service.Lookups,
                    Is.EqualTo(new[] { new[] { shared.Guid.ToString() } })
                );
                Assert.That(result, Is.Empty, "an unshared project is never reported");
            });
        }

        [Test]
        public void GetProjectsWithUnreceivedChanges_NoSharedProjects_SkipsTheLookup()
        {
            var service = CreateScriptedService();

            var result = service.GetProjectsWithUnreceivedChanges([new DummyScrText()]);

            Assert.Multiple(() =>
            {
                Assert.That(service.Lookups, Is.Empty);
                Assert.That(result, Is.Empty);
            });
        }

        [Test]
        public void GetProjectsWithUnreceivedChanges_WarnsOnceUntilSuccess()
        {
            const string warning = "Could not read server tip ids";
            var service = CreateScriptedService();
            ScrText[] shared = [new SharedDummyScrText()];
            var original = Console.Error;
            var captured = new StringWriter();
            Console.SetError(captured);
            try
            {
                service.Throw = true;
                service.GetProjectsWithUnreceivedChanges(shared);
                service.GetProjectsWithUnreceivedChanges(shared);
                Assert.That(CountOccurrences(captured.ToString(), warning), Is.EqualTo(1));

                service.Throw = false;
                Assert.That(service.GetProjectsWithUnreceivedChanges(shared), Is.Empty);
                service.Throw = true;
                service.GetProjectsWithUnreceivedChanges(shared);
                Assert.That(CountOccurrences(captured.ToString(), warning), Is.EqualTo(2));
            }
            finally
            {
                Console.SetError(original);
            }
        }

        private static int CountOccurrences(string text, string value) =>
            text.Split(value).Length - 1;
    }
}
