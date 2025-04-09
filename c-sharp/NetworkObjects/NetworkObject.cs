using System.Reflection;

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
    /// <param name="functionsToRegister">List of functions to register on the network with their corresponding function names</param>
    /// <param name="registrationParameters">Details about a network object to send onto the network after it finishes registering</param>
    /// <exception cref="Exception">Throws if the network object could not be registered properly</exception>
    protected async Task RegisterNetworkObjectAsync(
        string networkObjectName,
        List<(string functionName, Delegate function)> functionsToRegister,
        NetworkObjectCreatedDetails registrationParameters
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
            TimeSpan? timeout = GetTimeoutFromDelegate(function);
            requests.Add(PapiClient.RegisterRequestHandlerAsync(req, function, timeout));
        }
        await Task.WhenAll(requests);

        // Notify the network that we registered this network object
        _registrationParameters = registrationParameters;
        await PapiClient.SendEventAsync("object:onDidCreateNetworkObject", registrationParameters);
    }

    /// <summary>
    /// Extracts the timeout value from a NetworkTimeoutAttribute if it exists on the method
    /// represented by the delegate.
    /// </summary>
    /// <param name="function">The delegate to check for the NetworkTimeoutAttribute.</param>
    /// <returns>A TimeSpan representing the timeout if the attribute exists, otherwise null.</returns>
    private static TimeSpan? GetTimeoutFromDelegate(Delegate function)
    {
        // Get the method info from the delegate
        MethodInfo? methodInfo = function.Method;

        if (methodInfo == null)
            return null;

        // Check if the method has the NetworkTimeoutAttribute
        var attribute = methodInfo.GetCustomAttribute<NetworkTimeoutAttribute>();

        if (attribute == null)
            return null;

        // Return the timeout as a TimeSpan
        return TimeSpan.FromMilliseconds(attribute.TimeoutMilliseconds);
    }
}
