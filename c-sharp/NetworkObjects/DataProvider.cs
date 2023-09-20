using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;
using PtxUtils;
using System.Collections.Concurrent;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace Paranext.DataProvider.NetworkObjects;

internal abstract class DataProvider : NetworkObject
{
    // This is an internal class because nothing else should be instantiating it directly
    private class MessageEventDataUpdated : MessageEventGeneric<string>
    {
        // A parameterless constructor is required for serialization to work
        // ReSharper disable once UnusedMember.Local
        public MessageEventDataUpdated()
            : base(Enum<EventType>.Null) { }

        public MessageEventDataUpdated(Enum<EventType> eventType, string dataScope)
            : base(eventType, dataScope) { }
    }

    private readonly Enum<EventType> _eventType;
    private readonly ConcurrentDictionary<string, MessageEventDataUpdated> _updateEventsByScope =
        new();

    protected DataProvider(string name, PapiClient papiClient)
        : base(papiClient)
    {
        // "-data" is the suffix used by PAPI for data provider names
        DataProviderName = name + "-data";

        // "onDidUpdate" is the event name used by PAPI for data providers to notify consumers of updates
        _eventType = new Enum<EventType>($"{DataProviderName}:onDidUpdate");
    }

    public string DataProviderName { get; }

    /// <summary>
    /// Register this data provider on the network so that other services can use it
    /// </summary>
    public async Task RegisterDataProvider()
    {
        await RegisterNetworkObject(DataProviderName, FunctionHandler);
        await StartDataProvider();
    }

    // An array of strings serialized as JSON will be sent here.
    // The first item in the array is the name of the function to call.
    // All remaining items are arguments to pass to the function.
    // Data providers must provide "get" and "set" functions.
    private ResponseToRequest FunctionHandler(dynamic? request)
    {
        string functionName;
        JsonArray jsonArray;
        try
        {
            jsonArray = ((JsonElement)request!).Deserialize<JsonNode>()!.AsArray();
            if (jsonArray.Count == 0)
                return ResponseToRequest.Failed(
                    $"No function name provided when calling data provider {DataProviderName}"
                );
            functionName = (string)jsonArray[0]!;
            jsonArray.RemoveAt(0);
        }
        catch (Exception e)
        {
            Console.Error.WriteLine(e.ToString());
            return ResponseToRequest.Failed("Invalid function call data");
        }

        return HandleRequest(functionName, jsonArray);
    }

    /// <summary>
    /// Notify all processes on the network that this data provider has new data
    /// </summary>
    /// <param name="dataScope">Indicator of what data changed in the provider</param>
    protected void SendDataUpdateEvent(string dataScope)
    {
        var dataUpdateEventMessage = _updateEventsByScope.GetOrAdd(
            dataScope,
            (scope) => new MessageEventDataUpdated(_eventType, scope)
        );
        PapiClient.SendEvent(dataUpdateEventMessage);
    }

    /// <summary>
    /// Once a data provider has started, it should send out update events whenever its data changes.
    /// </summary>
    protected abstract Task StartDataProvider();

    /// <summary>
    /// Handle a request from a service using this data provider
    /// </summary>
    /// <param name="functionName">This would typically be "getXYZ" or "setXYZ", where "XYZ" is a type of data handled by this provider</param>
    /// <param name="args">Optional arguments provided by the requester for the function indicated</param>
    /// <returns>ResponseToRequest value that either contains a response for the function or an error message</returns>
    protected abstract ResponseToRequest HandleRequest(string functionName, JsonArray args);
}
