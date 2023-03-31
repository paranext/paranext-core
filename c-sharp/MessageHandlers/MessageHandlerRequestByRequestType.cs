using Paranext.DataProvider.Messages;
using PtxUtils;
using System.Collections.Concurrent;

namespace Paranext.DataProvider.MessageHandlers;

using RequestHandler = Func<dynamic, ResponseToRequest>;

/// <summary>
/// Handler for "Request" messages that assumes there should be 1 way to respond to each RequestType
/// </summary>
internal class MessageHandlerRequestByRequestType : IMessageHandler
{
    private readonly ConcurrentDictionary<
        Enum<RequestType>,
        RequestHandler
    > _handlersByRequestType = new();

    public void SetHandlerForRequestType(Enum<RequestType> requestType, RequestHandler handler)
    {
        _handlersByRequestType[requestType] = handler;
    }

    public IEnumerable<Message>? HandleMessage(Message message)
    {
        if (message == null)
            throw new ArgumentNullException(nameof(message));

        if (message.Type != MessageType.Request)
            throw new ArgumentException("Incorrect message type", nameof(message));

        var request = (MessageRequest)message;
        if (!_handlersByRequestType.TryGetValue(request.RequestType, out RequestHandler? handler))
        {
            Console.Error.WriteLine($"Unable to process request type: {request.RequestType}");
            return null;
        }

        List<Message> messageList = new();
        var response = handler(request.Contents);
        if (response.Success)
        {
            messageList.Add(
                new MessageResponse(
                    request.RequestType,
                    request.RequestId,
                    request.SenderId,
                    response.Contents
                )
            );
        }
        else
        {
            messageList.Add(
                new MessageResponse(
                    request.RequestType,
                    request.RequestId,
                    request.SenderId,
                    response.ErrorMessage
                )
            );
        }
        return messageList;
    }
}
