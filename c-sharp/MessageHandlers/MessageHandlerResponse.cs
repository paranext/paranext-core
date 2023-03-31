using Paranext.DataProvider.Messages;

namespace Paranext.DataProvider.MessageHandlers;

/// <summary>
/// Handler for "Response" messages
/// </summary>
internal class MessageHandlerResponse : IMessageHandler
{
    private readonly MessageRequest _originalRequest;
    private readonly Action<bool, dynamic?> _messageProcessingCallback;

    public MessageHandlerResponse(MessageRequest originalRequest, Action<bool, dynamic?> callback)
    {
        _originalRequest = originalRequest;
        _messageProcessingCallback = callback;
    }

    public MessageHandlerResponse(MessageRequest originalRequest)
        : this(originalRequest, DoNothing) { }

    private static void DoNothing(bool success, dynamic? message) { }

    public IEnumerable<Message>? HandleMessage(Message message)
    {
        if (message == null)
            throw new ArgumentNullException(nameof(message));

        if (message.Type != MessageType.Response)
            throw new ArgumentException("Incorrect message type", nameof(message));

        var response = (MessageResponse)message;
        if (!response.Success)
            Console.Error.WriteLine(
                "Request failed: \"{0}\" with error message \"{1}\"",
                _originalRequest,
                response.ErrorMessage ?? "<none>"
            );

        _messageProcessingCallback(response.Success, response.Contents);
        return null;
    }
}
