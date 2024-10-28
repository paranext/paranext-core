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
        List<(string functionName, Delegate function)> functionsToRegister,
        object registrationParameters
    )
    {
        if (_registrationParameters != null)
            throw new Exception($"{networkObjectName} has already been registered on the network");

        // Register the network object and all functions the object will expose
        List<Task<bool>> requests = [];
        var objPrefix = $"object:{networkObjectName}";
        requests.Add(PapiClient.RegisterRequestHandlerAsync(objPrefix, new Func<bool>(() => true)));
        foreach (var (functionName, function) in functionsToRegister)
        {
            var req = $"{objPrefix}.{functionName}";
            requests.Add(PapiClient.RegisterRequestHandlerAsync(req, function));
        }
        await Task.WhenAll(requests);

        // Notify the network that we registered this network object
        _registrationParameters = registrationParameters;
        await PapiClient.SendEventAsync("object:onDidCreateNetworkObject", registrationParameters);
    }
}
