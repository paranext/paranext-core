using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;
using PtxUtils;

namespace Paranext.DataProvider.NetworkObjects;

internal abstract class NetworkObject
{
    private string[] _networkObjectFunctionNames = Array.Empty<string>();

    protected NetworkObject(PapiClient papiClient)
    {
        PapiClient = papiClient;
    }

    protected PapiClient PapiClient { get; }

    /// <summary>
    /// Notify PAPI services we have a new network object they can use
    /// TODO: Use reflection (and attributes?) to get the function names supported.  When doing this work, might as well call the functions using the same mechanism.
    /// </summary>
    /// <param name="networkObjectName">Services access this network object using this name</param>
    /// <param name="functionNames">List of function names that should be provided in the object creation notification</param>
    /// <param name="requestHandler">Function that will handle calls from services to this network object</param>
    /// <exception cref="Exception">Throws if the network object could not be registered properly</exception>
    protected async Task RegisterNetworkObject(
        string networkObjectName,
        List<string> functionNames,
        Func<dynamic, ResponseToRequest> requestHandler
    )
    {
        if (_networkObjectFunctionNames.Length > 0)
            throw new Exception($"{networkObjectName} has already been registered on the network");
        if (functionNames.Count == 0)
            throw new ArgumentException($"Must provide function names for {networkObjectName}");

        // PAPI requires network objects to expose "get" and "function" requests
        var getReqType = new Enum<RequestType>($"object:{networkObjectName}.get");
        var functionReqType = new Enum<RequestType>($"object:{networkObjectName}.function");

        if (!await PapiClient.RegisterRequestHandler(getReqType, HandleGet))
            throw new Exception($"Could not register GET for {networkObjectName}");

        if (!await PapiClient.RegisterRequestHandler(functionReqType, requestHandler))
            throw new Exception($"Could not register FUNCTION for {networkObjectName}");

        // Notify the network that we registered this network object
        functionNames.Sort();
        _networkObjectFunctionNames = functionNames.ToArray();
        var newObjectCreationDetails = new MessageEventObjectCreateContents()
        {
            Id = networkObjectName,
            Functions = _networkObjectFunctionNames
        };
        PapiClient.SendEvent(new MessageEventObjectCreate(newObjectCreationDetails));
    }

    private ResponseToRequest HandleGet(dynamic getRequest)
    {
        // Respond that this network object exists along with its function list
        return ResponseToRequest.Succeeded(new List<string>(_networkObjectFunctionNames));
    }
}
