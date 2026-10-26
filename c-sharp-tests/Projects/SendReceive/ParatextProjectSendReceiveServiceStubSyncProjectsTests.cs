using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using Nerdbank.Streams;
using Paranext.DataProvider.JsonUtils;
using StreamJsonRpc;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// The <c>syncProjects</c> wire contract of the open-source
    /// <see cref="Paranext.DataProvider.Projects.SendReceive.ParatextProjectSendReceiveService"/>
    /// stub: the optional <c>suppressProgressNotification</c> argument callers pass. The Paratext 10
    /// patch replaces the stub's body but must keep this signature, so these tests are the tripwire
    /// for it.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class ParatextProjectSendReceiveServiceStubSyncProjectsTests : PapiTestBase
    {
        private const string SyncProjectsWireName = "command:paratextBibleSendReceive.syncProjects";

        private async Task<Delegate> GetRegisteredSyncProjectsAsync()
        {
            var service = CreateSendReceiveService();
            await service.InitializeAsync();
            return Client.GetRequestHandler(SyncProjectsWireName);
        }

        /// <summary>
        /// Stands in for the registered handler in the binding tests below, which only need its
        /// signature: the Paratext 10 patched suite runs these tests against the real
        /// <c>SyncProjects</c>, whose body would start a real sync. Kept identical to the real
        /// signature by <see cref="SyncProjects_HasTheSignatureTheBindingTestsUse"/>.
        /// </summary>
        [SuppressMessage(
            "Style",
            "IDE0060:Remove unused parameter",
            Justification = "Only the signature matters; see the summary."
        )]
        private static void SyncProjectsSignatureStandIn(
            String[]? projectIds,
            bool suppressProgressNotification = false
        ) { }

        [Test]
        public async Task SyncProjects_DeclaresAnOptionalSuppressProgressNotificationDefaultingToFalse()
        {
            var parameters = (await GetRegisteredSyncProjectsAsync()).Method.GetParameters();

            Assert.That(parameters, Has.Length.EqualTo(2));
            Assert.Multiple(() =>
            {
                Assert.That(parameters[1].Name, Is.EqualTo("suppressProgressNotification"));
                Assert.That(parameters[1].ParameterType, Is.EqualTo(typeof(bool)));
                Assert.That(parameters[1].IsOptional, Is.True);
                Assert.That(parameters[1].DefaultValue, Is.EqualTo(false));
            });
        }

        [Test]
        public async Task SyncProjects_HasTheSignatureTheBindingTestsUse()
        {
            static object?[] Describe(ParameterInfo p) =>
                [p.Name, p.ParameterType, p.IsOptional, p.IsOptional ? p.DefaultValue : null];

            var registered = (await GetRegisteredSyncProjectsAsync()).Method.GetParameters();
            var standIn = (
                (Action<String[]?, bool>)SyncProjectsSignatureStandIn
            ).Method.GetParameters();

            Assert.That(
                registered.Select(Describe).ToArray(),
                Is.EqualTo(standIn.Select(Describe).ToArray())
            );
        }

        // The arguments callers send. Core: `syncProjects(undefined)` from the first-run consent
        // step and `syncProjects(undefined, true)` from the Simple-mode startup sync (`undefined`
        // serializes as null). Core's project switch and the Send/Receive extension send an explicit
        // id list: `[ids]`, or `[ids, true]` in Simple mode.
        private static readonly object?[][] s_wireArgumentShapes =
        [
            [null],
            [null, true],
            [new[] { "PROJ1" }],
            [new[] { "PROJ1" }, true],
        ];

        [TestCaseSource(nameof(s_wireArgumentShapes))]
        public async Task SyncProjects_BindsEveryCallerArgumentShapeOverJsonRpc(object?[] args)
        {
            int? bindingErrorCode = await InvokeOverJsonRpcAsync(args);

            Assert.That(
                bindingErrorCode,
                Is.Null,
                $"syncProjects did not bind {args.Length} argument(s)"
            );
        }

        // Shapes that must not bind, which is why callers pass `undefined` explicitly for
        // `projectIds` and send the flag only as `true`. The last one is a negative control proving
        // the harness can see a binding failure at all.
        private static readonly TestCaseData[] s_rejectedWireArgumentShapes =
        [
            new TestCaseData(new object?[] { Array.Empty<object?>() }).SetArgDisplayNames(
                "no arguments: projectIds has no default"
            ),
            new TestCaseData(
                new object?[] { new object?[] { new[] { "PROJ1" }, null } }
            ).SetArgDisplayNames("flag sent as undefined: null does not bind to bool"),
            new TestCaseData(
                new object?[] { new object?[] { null, true, "unexpected" } }
            ).SetArgDisplayNames("an argument it does not declare"),
        ];

        [TestCaseSource(nameof(s_rejectedWireArgumentShapes))]
        public async Task SyncProjects_RejectsAShape(object?[] args)
        {
            int? bindingErrorCode = await InvokeOverJsonRpcAsync(args);

            Assert.That(bindingErrorCode, Is.Not.Null);
        }

        /// <summary>
        /// Invokes <see cref="SyncProjectsSignatureStandIn"/> over a real <see cref="JsonRpc"/> pair
        /// and returns the JSON-RPC error code if the call failed to BIND, or
        /// <see langword="null"/> if it bound.
        /// </summary>
        private static async Task<int?> InvokeOverJsonRpcAsync(object?[] args)
        {
            (Stream serverStream, Stream clientStream) = FullDuplexStream.CreatePair();
            using var server = new JsonRpc(
                new HeaderDelimitedMessageHandler(
                    serverStream,
                    SerializationOptions.CreateJsonRpcMessageFormatter()
                )
            );
            server.AddLocalRpcMethod(
                SyncProjectsWireName,
                (Action<String[]?, bool>)SyncProjectsSignatureStandIn
            );
            server.StartListening();
            using var client = new JsonRpc(
                new HeaderDelimitedMessageHandler(
                    clientStream,
                    SerializationOptions.CreateJsonRpcMessageFormatter()
                )
            );
            client.StartListening();

            try
            {
                await client
                    .InvokeAsync(SyncProjectsWireName, args)
                    .WaitAsync(TimeSpan.FromSeconds(30));
            }
            // StreamJsonRpc's client reports every binding failure here — a missing required
            // argument, an extra one, or one that does not deserialize to its parameter type, whether
            // the server answers -32601 or -32602 — as a RemoteMethodNotFoundException.
            catch (RemoteMethodNotFoundException ex)
            {
                return (int)ex.ErrorCode;
            }
            return null;
        }
    }
}
