using Paranext.DataProvider.Messages;
using PtxUtils;
using System.Collections.Concurrent;

namespace Paranext.DataProvider.MessageHandlers
{
    internal class MessageHandlerRequestByRequestType : IMessageHandler
    {
        private readonly ConcurrentDictionary<Enum<RequestType>, Func<dynamic, ResponseToRequest>> _handlersByRequestType = new();

        public void SetHandlerForRequestType(Enum<RequestType> requestType, Func<dynamic, ResponseToRequest> handler)
        {
            _handlersByRequestType[requestType] = handler;
        }

        public Message? HandleMessage(Message message)
        {
            if (message == null)
                throw new ArgumentNullException(nameof(message));

            if (message.Type != MessageType.Request)
                throw new ArgumentException("Incorrect message type", nameof(message));

            var request = (MessageRequest)message;
            if (_handlersByRequestType.TryGetValue(request.RequestType, out Func<dynamic, ResponseToRequest>? handler))
            {
                var response = handler(request.Contents);
                if (response.Success)
                    return new MessageResponse(request.RequestType, request.RequestId, request.SenderId, response.Contents);
                else
                    return new MessageResponse(request.RequestType, request.RequestId, request.SenderId, response.ErrorMessage);
            }
            else
            {
                Console.Error.WriteLine("Unable to process unexpected request type: {0}", request.RequestType);
                return null;
            }
        }
    }
}
