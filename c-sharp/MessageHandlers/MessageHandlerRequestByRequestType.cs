using Paranext.DataProvider.Messages;
using System.Collections.Concurrent;
using System.Text.Json;

namespace Paranext.DataProvider.MessageHandlers;

using RequestHandler = Func<JsonElement, ResponseToRequest>;

/// <summary>
/// Handler for "Request" messages that assumes there should be 1 way to respond to each RequestType
/// </summary>
internal class MessageHandlerRequestByRequestType : IMessageHandler
{
    private readonly ConcurrentDictionary<string, RequestHandler> _handlersByRequestType = new();

    public void SetHandlerForRequestType(string requestType, RequestHandler handler)
    {
        _handlersByRequestType[requestType] = handler;
    }

    public IEnumerable<Message> HandleMessage(Message message)
    {
        if (message == null)
            throw new ArgumentNullException(nameof(message));

        if (message is not MessageRequest request)
            throw new ArgumentException("Incorrect message type", nameof(message));

        if (!_handlersByRequestType.TryGetValue(request.RequestType, out RequestHandler? handler))
        {
            Console.Error.WriteLine($"Unable to process request type: {request.RequestType}");
            yield break;
        }

        var response = handler(request.Contents);
        if (response.Success)
        {
            yield return MessageResponse.Succeeded(
                request.RequestType,
                request.RequestId,
                request.SenderId,
                response.Contents
            );
        }
        else
        {
            yield return MessageResponse.Failed(
                request.RequestType,
                request.RequestId,
                request.SenderId,
                response.ErrorMessage ?? "Unspecified error"
            );
        }
    }
}
