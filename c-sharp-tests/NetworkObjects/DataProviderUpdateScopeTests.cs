using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.NetworkObjects;

namespace TestParanextDataProvider.NetworkObjects
{
    /// <summary>
    /// How <see cref="DataProvider"/> decodes the data scope of an update event and hands it to
    /// <c>ExpandDataUpdateScope</c> before sending it.
    /// </summary>
    [ExcludeFromCodeCoverage]
    [TestFixture]
    internal class DataProviderUpdateScopeTests : PapiTestBase
    {
        private const string EventType = "updateScopeTest-data:onDidUpdate";

        private sealed class RecordingDataProvider(PapiClient papiClient)
            : DataProvider("updateScopeTest", papiClient)
        {
            /// <summary>A copy of every scope the hook was handed.</summary>
            public List<List<string>> HookCalls { get; } = [];

            /// <summary>What the hook does with the scope it is handed.</summary>
            public Func<List<string>, List<string>> Expand { get; set; } = dataTypes => dataTypes;

            public Task SendAsync(object? dataScope) => SendDataUpdateEventAsync(dataScope);

            protected override List<string> ExpandDataUpdateScope(List<string> dataTypes)
            {
                HookCalls.Add([.. dataTypes]);
                return Expand(dataTypes);
            }

            protected override List<(string functionName, Delegate function)> GetFunctions() => [];

            protected override Task StartDataProviderAsync() => Task.CompletedTask;
        }

        private RecordingDataProvider _provider = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _provider = new RecordingDataProvider(Client);
        }

        private List<(string eventType, object? eventParameters)> SentEvents()
        {
            var events = new List<(string eventType, object? eventParameters)>();
            while (Client.SentEventCount > 0)
                events.Add(Client.NextSentEvent);
            return events;
        }

        [Test]
        public async Task AllDataTypes_IsSentAsIs_WithoutReachingTheHook()
        {
            await _provider.SendAsync("*");

            Assert.That(SentEvents(), Is.EqualTo(new[] { (EventType, (object?)"*") }));
            Assert.That(_provider.HookCalls, Is.Empty);
        }

        [Test]
        public async Task OneDataType_ReachesTheHookAsAList_AndTheHooksScopeIsSent()
        {
            _provider.Expand = dataTypes => [.. dataTypes, "Extra"];

            await _provider.SendAsync("Verse");

            Assert.That(_provider.HookCalls, Is.EqualTo(new[] { new List<string> { "Verse" } }));
            var events = SentEvents();
            Assert.That(events, Has.Count.EqualTo(1));
            Assert.That(events[0].eventType, Is.EqualTo(EventType));
            Assert.That(
                events[0].eventParameters,
                Is.EqualTo(new List<string> { "Verse", "Extra" })
            );
        }

        [Test]
        public async Task AListOfDataTypes_ReachesTheHook_WithoutChangingTheCallersList()
        {
            var callersList = new List<string> { "Verse", "Chapter" };
            _provider.Expand = dataTypes =>
            {
                dataTypes.Add("Extra");
                return dataTypes;
            };

            await _provider.SendAsync(callersList);

            Assert.That(
                _provider.HookCalls,
                Is.EqualTo(
                    new[]
                    {
                        new List<string> { "Verse", "Chapter" },
                    }
                )
            );
            Assert.That(
                SentEvents().Select(e => e.eventParameters),
                Is.EqualTo(
                    new object[]
                    {
                        new List<string> { "Verse", "Chapter", "Extra" },
                    }
                )
            );
            Assert.That(callersList, Is.EqualTo(new List<string> { "Verse", "Chapter" }));
        }

        [TestCase("")]
        [TestCase("   ")]
        public async Task ABlankDataType_SendsNothing_WithoutReachingTheHook(string dataScope)
        {
            await _provider.SendAsync(dataScope);

            Assert.That(Client.SentEventCount, Is.Zero);
            Assert.That(_provider.HookCalls, Is.Empty);
        }

        [Test]
        public async Task AnEmptyList_SendsNothing_WithoutReachingTheHook()
        {
            await _provider.SendAsync(new List<string>());

            Assert.That(Client.SentEventCount, Is.Zero);
            Assert.That(_provider.HookCalls, Is.Empty);
        }

        [Test]
        public async Task AHookThatEmptiesTheScope_SendsNothing()
        {
            _provider.Expand = _ => [];

            await _provider.SendAsync("Verse");

            Assert.That(_provider.HookCalls, Has.Count.EqualTo(1));
            Assert.That(Client.SentEventCount, Is.Zero);
        }

        [Test]
        public async Task AScopeOfAnotherType_SendsNothing_WithoutReachingTheHook()
        {
            await _provider.SendAsync(new[] { "Verse" });

            Assert.That(Client.SentEventCount, Is.Zero);
            Assert.That(_provider.HookCalls, Is.Empty);
        }
    }
}
