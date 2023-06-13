using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;
using PtxUtils;
using System.Text.Json;

namespace Paranext.DataProvider.NetworkObjects
{
    internal abstract class DataProvider : NetworkObject
    {
        protected DataProvider(string name, PapiClient papiClient)
            : base(papiClient)
        {
            DataProviderName = name + "-data";
        }

        protected string DataProviderName { get; }

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
        protected void ReportDataUpdate()
        {
            var dataUpdateEventType = new Enum<EventType>($"{DataProviderName}:onDidUpdate");
            PapiClient.SendEvent(new DataUpdateEvent(dataUpdateEventType, true));
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
