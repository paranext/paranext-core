using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;
using PtxUtils;

namespace Paranext.DataProvider.NetworkObjects
{
    internal abstract class NetworkObject
    {
        protected NetworkObject(PapiClient papiClient)
        {
            PapiClient = papiClient;
        }

        protected PapiClient PapiClient { get; }

        /// <summary>
        /// Notify PAPI services we have a new network object they can use
        /// </summary>
        /// <param name="networkObjectName">Services access this network object using this name</param>
        /// <param name="requestHandler">Function that will handle calls from services to this network object</param>
        /// <exception cref="Exception">Throws if the network object could not be registered properly</exception>
        protected async Task RegisterNetworkObject(
            string networkObjectName,
            Func<dynamic, ResponseToRequest> requestHandler
        )
        {
            // PAPI requires network objects to expose "get" and "function" requests
            var getReqType = new Enum<RequestType>($"object:{networkObjectName}.get");
            var functionReqType = new Enum<RequestType>($"object:{networkObjectName}.function");

            if (!await PapiClient.RegisterRequestHandler(getReqType, HandleGet))
                throw new Exception($"Could not register GET for {networkObjectName}");

            if (!await PapiClient.RegisterRequestHandler(functionReqType, requestHandler))
                throw new Exception($"Could not register FUNCTION for {networkObjectName}");
        }

        private static ResponseToRequest HandleGet(dynamic getRequest)
        {
            return ResponseToRequest.Succeeded();
        }
    }
}
