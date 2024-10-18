using System.Text.Json;
using System.Text.Json.Nodes;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;

namespace Paranext.DataProvider.NetworkObjects;

internal abstract class DataProvider : NetworkObject
{
    private readonly string _eventType;

    protected DataProvider(
        string name,
        PapiClient papiClient,
        string dataProviderType = NetworkObjectType.DATA_PROVIDER
    )
        : base(papiClient)
    {
        // "-data" is the suffix used by PAPI for data provider names
        DataProviderName = name + "-data";

        DataProviderType = dataProviderType;

        // "onDidUpdate" is the event name used by PAPI for data providers to notify consumers of updates
        _eventType = $"{DataProviderName}:onDidUpdate";
    }

    /// <summary>
    /// Name/ID of the data provider as registered on the network
    /// </summary>
    public string DataProviderName { get; }

    /// <summary>
    /// Data provider type to be shared on the network
    /// </summary>
    public string DataProviderType { get; }

    /// <summary>
    /// Register this data provider on the network so that other services can use it
    /// </summary>
    public async Task RegisterDataProviderAsync()
    {
        await RegisterNetworkObjectAsync(
            DataProviderName,
            GetDataProviderCreatedDetails(),
            FunctionHandler
        );
        await StartDataProviderAsync();
    }

    // An array of strings serialized as JSON will be sent here.
    // The first item in the array is the name of the function to call.
    // All remaining items are arguments to pass to the function.
    // Data providers must provide "get" and "set" functions.
    private object? FunctionHandler(JsonElement request)
    {
        string functionName;
        JsonArray jsonArray = request.Deserialize<JsonNode>()!.AsArray();
        if (jsonArray.Count == 0)
            throw new InvalidOperationException(
                $"No function name provided when calling data provider {DataProviderName}"
            );
        functionName = (string)jsonArray[0]!;
        jsonArray.RemoveAt(0);

        return HandleRequest(functionName, jsonArray);
    }

    /// <summary>
    /// Create an event that tells the network details about the data provider that is being created
    /// </summary>
    protected virtual NetworkObjectCreatedDetails GetDataProviderCreatedDetails()
    {
        var functionNames = GetFunctionNames();
        functionNames.Sort();
        return new NetworkObjectCreatedDetails
        {
            Id = DataProviderName,
            ObjectType = DataProviderType,
            Functions = [.. functionNames],
        };
    }

    /// <summary>
    /// Notify all processes on the network that this data provider has new data.
    ///
    /// This method transforms the data scope in the same way that `data-provider`service.ts`'s
    /// `mapUpdateInstructionsToUpdateEvent` does
    /// </summary>
    /// <param name="dataScope">Indicator of what data changed in the provider. Can be '*' for all
    /// updates, a `string` to update one data type, or a `List&lt;string&gt;` of data types to update.
    /// If dataScope is null, nothing happens. </param>
    protected async Task SendDataUpdateEventAsync(object? dataScope)
    {
        if (dataScope == null)
            return;

        // The final computed data scope to send out in the update event. Based on dataScope
        object dataScopeResult;

        if ((dataScope is string s) && !string.IsNullOrWhiteSpace(s))
        {
            // If we are returning "*", just pass it as a string.  Otherwise we have to provide a list of strings.
            // Presumably this will change as part of https://github.com/paranext/paranext-core/issues/443
            dataScopeResult = (s == "*") ? s : new List<string> { s };
        }
        else if (dataScope is List<string> dataScopeList)
        {
            if (dataScopeList.Count > 0)
                dataScopeResult = dataScope;
            // Empty list means no data type updates
            else
            {
                Console.WriteLine("Did not send data update event. dataScope is an empty list");
                return;
            }
        }
        else
        {
            Console.WriteLine(
                "Did not send data update event. dataScope is not a string or list of strings"
            );
            return;
        }

        await PapiClient.SendEventAsync(_eventType, dataScopeResult);
    }

    /// <summary>
    /// Provide the list of functions that can be called on this data provider
    /// </summary>
    /// <returns>Array of strings containing all the functions that are callable on this data provider</returns>
    protected abstract List<string> GetFunctionNames();

    /// <summary>
    /// Once a data provider has started, it should send out update events whenever its data changes.
    /// </summary>
    protected abstract Task StartDataProviderAsync();

    /// <summary>
    /// Handle a request from a service using this data provider
    /// </summary>
    /// <param name="functionName">This would typically be "getXYZ" or "setXYZ", where "XYZ" is a type of data handled by this provider</param>
    /// <param name="args">Optional arguments provided by the requester for the function indicated</param>
    /// <returns>ResponseToRequest value that either contains a response for the function or an error message</returns>
    protected abstract object? HandleRequest(string functionName, JsonArray args);
}
