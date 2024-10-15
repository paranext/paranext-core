using System.Collections.Concurrent;
using System.Text.Json;
using Paranext.DataProvider.Messages;

namespace Paranext.DataProvider.MessageHandlers;

using RequestHandler = Func<JsonElement, ResponseToRequest>;

/// <summary>
/// Handler for "Request" messages that assumes there should be 1 way to respond to each RequestType
/// </summary>
internal class MessageHandlerRequestByRequestType : IMessageHandler
{
    private readonly ConcurrentDictionary<string, RequestHandler> _handlersByRequestType = new();

    /// <summary>
    /// Sets the handler to be called in response to the given request type
    /// </summary>
    /// <exception cref="ArgumentException">Attempt to set handler for a request type that already
    /// has a handler.</exception>
    /// <remarks>This is intended to be called only by PapiClient.RegisterRequestHandler. In
    /// production, the argument exception should therefore be impossible, since the server should
    /// be checking to prevent duplicates.</remarks>
    public void SetHandlerForRequestType(string requestType, RequestHandler handler)
    {
        if (!_handlersByRequestType.TryAdd(requestType, handler))
            throw new ArgumentException(
                "Attempt to set handler for a request type that already has a handler.",
                nameof(requestType)
            );
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
