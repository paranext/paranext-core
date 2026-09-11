namespace Paranext.WireSurface;

/// <summary>
/// The <c>registeredVia</c> strings each recognition rule attaches to its entries, copied verbatim
/// from the wire-surface snapshot's existing vocabulary so the JSON output is unchanged by the
/// switch to Roslyn.
/// </summary>
public static class RegisteredVia
{
    public const string NetworkObjectRegisterNetworkObjectAsync =
        "NetworkObject.RegisterNetworkObjectAsync";
    public const string DataProviderRegisterDataProviderAsync =
        "DataProvider.RegisterDataProviderAsync";
    public const string ProjectDataProviderFactoryInitializeAsync =
        "ProjectDataProviderFactory.InitializeAsync";
    public const string DataProviderConstructor = "DataProvider(name, papiClient) constructor";
    public const string DataProviderGetNetworkObjectDocumentationOverride =
        "DataProvider.GetNetworkObjectDocumentation override";
    public const string PapiClientRegisterRequestHandlerAsync =
        "PapiClient.RegisterRequestHandlerAsync";
    public const string PapiClientSendRequestAsyncRegisterEvent =
        "PapiClient.SendRequestAsync(\"network:registerEvent\")";
}
