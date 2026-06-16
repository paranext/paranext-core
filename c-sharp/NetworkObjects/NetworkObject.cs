using System.Reflection;
using Paranext.DataProvider.NetworkObjects.Documentation;

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
    /// <param name="documentation">Optional documentation for the whole object. Set
    /// <see cref="NetworkObjectDocumentation.Experimental"/> to mark the entire object experimental —
    /// the <c>object:{name}</c> existence method AND every function get <c>x-experimental: true</c>
    /// (functions without their own <see cref="NetworkObjectDocumentation.Methods"/> entry get a bare
    /// marker). Provide <see cref="NetworkObjectDocumentation.Methods"/> for richer per-function docs,
    /// or — with <see cref="NetworkObjectDocumentation.Experimental"/> unset — to mark only specific
    /// functions (e.g. one experimental projectInterface on a PDP that also exposes stable ones; the
    /// existence method then stays unmarked).</param>
    /// <exception cref="Exception">Throws if the network object could not be registered properly</exception>
    protected async Task RegisterNetworkObjectAsync(
        string networkObjectName,
        List<(string functionName, Delegate function)> functionsToRegister,
        NetworkObjectCreatedDetails registrationParameters,
        NetworkObjectDocumentation? documentation = null
    )
    {
        if (_registrationParameters != null)
            throw new Exception($"{networkObjectName} has already been registered on the network");

        var objectIsExperimental = documentation?.Experimental == true;
        var methodDocs = documentation?.Methods;

        // Register the network object and all functions the object will expose
        List<Task<bool>> requests = [];
        var objPrefix = $"object:{networkObjectName}";
        // When the whole object is experimental, mark its existence method too.
        requests.Add(
            PapiClient.RegisterRequestHandlerAsync(
                objPrefix,
                new Func<bool>(() => true),
                documentation: objectIsExperimental
                    ? ExperimentalMethodDocumentation.ExistenceMarker(networkObjectName)
                    : null
            )
        );
        foreach (var (functionName, function) in functionsToRegister)
        {
            var req = $"{objPrefix}.{functionName}";
            TimeSpan? timeout = GetTimeoutFromDelegate(function);
            requests.Add(
                PapiClient.RegisterRequestHandlerAsync(
                    req,
                    function,
                    timeout,
                    DocumentationForFunction(functionName, methodDocs, objectIsExperimental)
                )
            );
        }
        await Task.WhenAll(requests);

        // Notify the network that we registered this network object
        _registrationParameters = registrationParameters;
        await PapiClient.SendEventAsync("object:onDidCreateNetworkObject", registrationParameters);
    }

    /// <summary>
    /// Resolves the documentation to register for a single function: its own
    /// <see cref="NetworkObjectDocumentation.Methods"/> entry when present (force-marked experimental
    /// if the object is experimental but the entry isn't), a bare experimental marker when the object
    /// is experimental but the function has no entry, or none otherwise.
    /// </summary>
    private static OpenRpcSingleMethodDocumentation? DocumentationForFunction(
        string functionName,
        IReadOnlyDictionary<string, OpenRpcSingleMethodDocumentation>? methodDocs,
        bool objectIsExperimental
    )
    {
        if (methodDocs != null && methodDocs.TryGetValue(functionName, out var doc))
        {
            if (objectIsExperimental && doc.Method.Experimental != true)
                return doc with { Method = doc.Method with { Experimental = true } };
            return doc;
        }
        return objectIsExperimental ? ExperimentalMethodDocumentation.Marker() : null;
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
