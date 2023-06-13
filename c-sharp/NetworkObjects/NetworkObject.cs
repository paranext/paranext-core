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

        protected void RegisterNetworkObject(
            string networkObjectName,
            Func<dynamic, ResponseToRequest> requestHandler
        )
        {
            var getReqType = new Enum<RequestType>($"object:{networkObjectName}.get");
            var functionReqType = new Enum<RequestType>($"object:{networkObjectName}.function");

            if (!PapiClient.RegisterRequestHandler(getReqType, HandleGet))
                throw new Exception($"Could not register GET for {networkObjectName}");

            if (!PapiClient.RegisterRequestHandler(functionReqType, requestHandler))
                throw new Exception($"Could not register FUNCTION for {networkObjectName}");
        }

        private static ResponseToRequest HandleGet(dynamic getRequest)
        {
            return ResponseToRequest.Succeeded();
        }
    }
}
