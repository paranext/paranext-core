using Paranext.DataProvider.MessageTransports;

namespace Paranext.DataProvider.NetworkObjects;

internal abstract class NetworkObject
{
    private object? _registrationParameters = null;

    protected NetworkObject(PapiClient papiClient)
    {
        PapiClient = papiClient;
    }

    protected PapiClient PapiClient { get; }

    /// <summary>
    /// Notify PAPI services we have a new network object they can use
    /// </summary>
    /// <param name="networkObjectName">Services access this network object using this name</param>
    /// <param name="registrationEvent">Event for notifying the network that the object was registered</param>
    /// <param name="requestHandler">Function that will handle calls from services to this network object</param>
    /// <exception cref="Exception">Throws if the network object could not be registered properly</exception>
    protected async Task RegisterNetworkObjectAsync(
        string networkObjectName,
        object registrationParameters,
        Delegate requestHandler
    )
    {
        if (_registrationParameters != null)
            throw new Exception($"{networkObjectName} has already been registered on the network");

        // PAPI requires network objects to expose "get" and "function" requests
        var getReqType = $"object:{networkObjectName}.get";
        var functionReqType = $"object:{networkObjectName}.function";

        if (!await PapiClient.RegisterRequestHandlerAsync(getReqType, new Func<bool>(() => true)))
            throw new Exception($"Could not register GET for {networkObjectName}");

        if (!await PapiClient.RegisterRequestHandlerAsync(functionReqType, requestHandler))
            throw new Exception($"Could not register FUNCTION for {networkObjectName}");

        // Notify the network that we registered this network object
        _registrationParameters = registrationParameters;
        await PapiClient.SendEventAsync("object:onDidCreateNetworkObject", registrationParameters);
    }
}
