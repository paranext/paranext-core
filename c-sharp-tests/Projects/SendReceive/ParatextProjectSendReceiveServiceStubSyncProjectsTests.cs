using System.Diagnostics.CodeAnalysis;
using Nerdbank.Streams;
using Paranext.DataProvider;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Projects.SendReceive;
using StreamJsonRpc;
using StreamJsonRpc.Protocol;

namespace TestParanextDataProvider.Projects.SendReceive
{
    /// <summary>
    /// The <c>syncProjects</c> wire contract of the open-source
    /// <see cref="ParatextProjectSendReceiveService"/> stub: the optional
    /// <c>suppressProgressNotification</c> argument callers pass. The Paratext 10 patch replaces the
    /// stub's body but must keep this signature, so these tests are the tripwire for it.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class ParatextProjectSendReceiveServiceStubSyncProjectsTests : PapiTestBase
    {
        private const string SyncProjectsWireName = "command:paratextBibleSendReceive.syncProjects";

        private async Task<Delegate> GetRegisteredSyncProjectsAsync()
        {
            var service = new ParatextProjectSendReceiveService(
                Client,
                new ParatextProjectDataProviderFactory(Client, ParatextProjects),
                new AppInfo("test", "1.0.0", "test"),
                ParatextProjects
            );
            await service.InitializeAsync();
            return Client.GetRequestHandler(SyncProjectsWireName);
        }

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

        // The arguments core's callers actually send: `syncProjects(undefined)` from callers that do
        // not pass the flag (e.g. the Send/Receive extension), `syncProjects(undefined, true)` from
        // the startup sync (undefined serializes as null), and an explicit id list from the project
        // switch, with `true` in Simple mode and without the flag otherwise. A caller that keeps the
        // toast omits the flag rather than sending `false`.
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

        // Negative control: proves the harness above can see a binding failure at all, so its
        // passing cases are evidence rather than a test that cannot fail.
        [Test]
        public async Task SyncProjects_RejectsAnArgumentShapeItDoesNotDeclare()
        {
            int? bindingErrorCode = await InvokeOverJsonRpcAsync([null, true, "unexpected"]);

            Assert.That(bindingErrorCode, Is.Not.Null);
        }

        /// <summary>
        /// Invokes the registered <c>syncProjects</c> handler over a real <see cref="JsonRpc"/> pair
        /// and returns the JSON-RPC error code if the call failed to BIND (no overload accepts the
        /// arguments), or <see langword="null"/> if it bound. The stub's body either throws
        /// PlatformUnimplementedException (Release) or runs the DEBUG placeholder; both count as
        /// bound.
        /// </summary>
        private async Task<int?> InvokeOverJsonRpcAsync(object?[] args)
        {
            Delegate handler = await GetRegisteredSyncProjectsAsync();
            (Stream serverStream, Stream clientStream) = FullDuplexStream.CreatePair();
            using var server = new JsonRpc(
                new HeaderDelimitedMessageHandler(
                    serverStream,
                    SerializationOptions.CreateJsonRpcMessageFormatter()
                )
            );
            server.AddLocalRpcMethod(SyncProjectsWireName, handler);
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
            // StreamJsonRpc reports an argument count no overload accepts as a
            // RemoteMethodNotFoundException, which is NOT a RemoteInvocationException.
            catch (RemoteMethodNotFoundException ex)
            {
                return (int)ex.ErrorCode;
            }
            catch (RemoteInvocationException ex)
                when (ex.ErrorCode == (int)JsonRpcErrorCode.InvalidParams)
            {
                return ex.ErrorCode;
            }
            catch (RemoteInvocationException) { }
            return null;
        }
    }
}
