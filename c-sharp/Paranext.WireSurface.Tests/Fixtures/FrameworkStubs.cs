namespace Paranext.WireSurface.Tests.Fixtures;

/// <summary>
/// Source text for the subset of the data-provider framework the wire-surface scanner recognises by
/// symbol: namespaces, type names, member names and parameter names mirror
/// <c>c-sharp/NetworkObjects/NetworkObject.cs</c>, <c>DataProvider.cs</c>, <c>PapiClient.cs</c>,
/// <c>Projects/ProjectDataProviderFactory.cs</c> and <c>NetworkObjects/Documentation/*.cs</c> exactly
/// wherever a rule binds to them, so a fixture compilation exercises the same symbols production
/// code does. Members the scanner never inspects (framework bookkeeping unrelated to any
/// registration rule) are omitted rather than reproduced in full.
/// </summary>
public static class FrameworkStubs
{
    public const string Source = """
        using System;
        using System.Collections.Generic;
        using System.Threading.Tasks;

        namespace Paranext.DataProvider
        {
            public class PapiClient
            {
                public virtual Task<T?> SendRequestAsync<T>(string requestType, IReadOnlyList<object?>? requestContents = null) =>
                    Task.FromResult<T?>(default);

                public virtual Task SendRequestAsync(string requestType, IReadOnlyList<object?>? requestContents = null) =>
                    Task.CompletedTask;

                public virtual Task<bool> RegisterRequestHandlerAsync(
                    string requestType,
                    Delegate requestHandler,
                    TimeSpan? requestTimeout = null,
                    Paranext.DataProvider.NetworkObjects.Documentation.OpenRpcSingleMethodDocumentation? documentation = null
                ) => Task.FromResult(true);

                public virtual Task SendEventAsync(string eventType, object? eventParameters) => Task.CompletedTask;
            }
        }

        namespace Paranext.DataProvider.NetworkObjects
        {
            public record NetworkObjectCreatedDetails
            {
                public string? Id { get; set; }
                public string? ObjectType { get; set; }
                public string[]? FunctionNames { get; set; }
            }

            public static class NetworkObjectType
            {
                public const string DATA_PROVIDER = "dataProvider";
            }

            internal abstract class NetworkObject
            {
                protected NetworkObject(PapiClient papiClient)
                {
                    PapiClient = papiClient;
                }

                protected PapiClient PapiClient { get; }

                protected async Task RegisterNetworkObjectAsync(
                    string networkObjectName,
                    List<(string functionName, Delegate function)> functionsToRegister,
                    NetworkObjectCreatedDetails registrationParameters,
                    Documentation.NetworkObjectDocumentation? documentation = null
                )
                {
                    await PapiClient.RegisterRequestHandlerAsync($"object:{networkObjectName}", new Func<bool>(() => true));
                    foreach (var (functionName, function) in functionsToRegister)
                        await PapiClient.RegisterRequestHandlerAsync($"object:{networkObjectName}.{functionName}", function);
                }
            }

            internal abstract class DataProvider : NetworkObject
            {
                protected DataProvider(
                    string name,
                    PapiClient papiClient,
                    string dataProviderType = NetworkObjectType.DATA_PROVIDER
                ) : base(papiClient)
                {
                    DataProviderName = name + "-data";
                }

                public string DataProviderName { get; }

                public async Task RegisterDataProviderAsync() =>
                    await RegisterNetworkObjectAsync(
                        DataProviderName,
                        [],
                        new NetworkObjectCreatedDetails(),
                        GetNetworkObjectDocumentation()
                    );

                protected virtual Documentation.NetworkObjectDocumentation? GetNetworkObjectDocumentation() => null;
            }
        }

        namespace Paranext.DataProvider.NetworkObjects.Documentation
        {
            public record JsonSchema
            {
                public string Type { get; set; } = "object";
            }

            public record OpenRpcContentDescriptor
            {
                public string Name { get; set; } = "";
                public string? Summary { get; set; }
                public bool? Required { get; set; }
                public JsonSchema Schema { get; set; } = new();
            }

            public record OpenRpcMethodDocumentation
            {
                public bool? Experimental { get; set; }
                public string? Summary { get; set; }
                public IReadOnlyList<OpenRpcContentDescriptor> Params { get; set; } = [];
                public OpenRpcContentDescriptor Result { get; set; } = new() { Name = "return value" };
            }

            public record OpenRpcSingleMethodDocumentation
            {
                public OpenRpcMethodDocumentation Method { get; set; } = new();
            }

            public record OpenRpcNotificationDocumentation
            {
                public bool? Experimental { get; set; }
                public string? Summary { get; set; }
            }

            public record OpenRpcSingleNotificationDocumentation
            {
                public OpenRpcNotificationDocumentation Notification { get; set; } = new();
            }

            public record NetworkObjectDocumentation
            {
                public bool? Experimental { get; set; }
                public IReadOnlyDictionary<string, OpenRpcSingleMethodDocumentation>? Methods { get; set; }
            }

            public static class ExperimentalMethodDocumentation
            {
                public static OpenRpcSingleMethodDocumentation Create(
                    string summary,
                    IReadOnlyList<OpenRpcContentDescriptor>? parameters = null,
                    OpenRpcContentDescriptor? result = null
                ) => new() { Method = new() { Experimental = true, Summary = summary } };

                public static OpenRpcSingleMethodDocumentation Marker() =>
                    new() { Method = new() { Experimental = true } };

                public static OpenRpcSingleMethodDocumentation ExistenceMarker(string networkObjectName) =>
                    Create($"Whether the {networkObjectName} network object exists.");
            }
        }

        namespace Paranext.DataProvider.Projects
        {
            internal abstract class ProjectDataProviderFactory : NetworkObjects.NetworkObject
            {
                private readonly string _pdpfName;

                protected ProjectDataProviderFactory(PapiClient papiClient, string pdpfName) : base(papiClient)
                {
                    _pdpfName = pdpfName;
                }

                public Task InitializeAsync() =>
                    RegisterNetworkObjectAsync(
                        $"platform.{_pdpfName}-pdpf",
                        [],
                        new NetworkObjects.NetworkObjectCreatedDetails()
                    );
            }
        }
        """;
}
