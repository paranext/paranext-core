using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;
using PtxUtils;
using System.Text.Json;

namespace Paranext.DataProvider.NetworkObjects
{
    internal abstract class DataProvider : NetworkObject
    {
        // This is an internal class because nothing else should be instantiating it directly
        private class MessageEventDataUpdated : MessageEventGeneric<bool>
        {
            // A parameterless constructor is required for serialization to work
            // ReSharper disable once UnusedMember.Local
            public MessageEventDataUpdated()
                : base(Enum<EventType>.Null) { }

            public MessageEventDataUpdated(Enum<EventType> eventType)
                : base(eventType, true) { }
        }

        private readonly MessageEventDataUpdated _dataUpdatedEvent;

        protected DataProvider(string name, PapiClient papiClient)
            : base(papiClient)
        {
            // "-data" is the prefix used by PAPI for data provider names
            DataProviderName = name + "-data";

            // "onDidUpdate" is the event name used by PAPI for data providers to notify consumers of updates
            var eventType = new Enum<EventType>($"{DataProviderName}:onDidUpdate");

            _dataUpdatedEvent = new MessageEventDataUpdated(eventType);
        }

        protected string DataProviderName { get; }

        /// <summary>
        /// Register this data provider on the network so that other services can use it
        /// </summary>
        public void RegisterDataProvider()
        {
            RegisterNetworkObject(DataProviderName, FunctionHandler);
            StartDataProvider();
        }

        // An array of strings serialized as JSON will be sent here.
        // The first item in the array is the name of the function to call.
        // All remaining items are arguments to pass to the function.
        // Data providers must provide "get" and "set" functions.
        private ResponseToRequest FunctionHandler(dynamic? request)
        {
            string[] arguments = JsonSerializer.Deserialize<string[]>(request);
            if (arguments.Length == 0)
                return ResponseToRequest.Failed(
                    $"No function name provided when calling data provider {DataProviderName}"
                );

            string functionName = arguments[0].ToUpperInvariant();
            string[] parameters = arguments.Skip(1).ToArray();
            return functionName switch
            {
                "GET" => HandleGetRequest(parameters),
                "SET" => HandleSetRequest(parameters),
                _ => ResponseToRequest.Failed($"Unexpected function call: {functionName}"),
            };
        }

        /// <summary>
        /// Notify all processes on the network that this data provider has new data
        /// </summary>
        protected void SendDataUpdateEvent()
        {
            PapiClient.SendEvent(_dataUpdatedEvent);
        }

        /// <summary>
        /// Once a data provider has started, it should send out update events whenever its data changes.
        /// </summary>
        protected abstract void StartDataProvider();

        /// <summary>
        /// Read a copy of the requested data
        /// </summary>
        /// <param name="arguments">The first value in the array is meant to scope what kind of data was requested</param>
        /// <returns>ResponseToRequest value that either contains the requested data or an error message</returns>
        protected abstract ResponseToRequest HandleGetRequest(string[] arguments);

        /// <summary>
        /// Write data to the provided scope
        /// </summary>
        /// <param name="arguments">The first value in the array is meant to scope what kind of data was provided</param>
        /// <returns>ResponseToRequest value that either notes success or an error message describing the failure</returns>
        protected abstract ResponseToRequest HandleSetRequest(string[] arguments);
    }
}
