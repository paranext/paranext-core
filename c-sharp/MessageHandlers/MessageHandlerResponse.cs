using Paranext.DataProvider.Messages;

namespace Paranext.DataProvider.MessageHandlers;

/// <summary>
/// Handler for "Response" messages
/// </summary>
internal class MessageHandlerResponse : IMessageHandler
{
    private readonly MessageRequest _originalRequest;
    private readonly Action<bool, object?> _messageProcessingCallback;

    public MessageHandlerResponse(MessageRequest originalRequest, Action<bool, object?> callback)
    {
        _originalRequest = originalRequest;
        _messageProcessingCallback = callback;
    }

    public MessageHandlerResponse(MessageRequest originalRequest)
        : this(originalRequest, DoNothing) { }

    private static void DoNothing(bool success, object? message) { }

    public IEnumerable<Message> HandleMessage(Message message)
    {
        if (message == null)
            throw new ArgumentNullException(nameof(message));

        if (message is not MessageResponse response)
            throw new ArgumentException("Incorrect message type", nameof(message));

        if (!response.Success)
            Console.Error.WriteLine(
                $"Request failed: \"{_originalRequest}\" with error message \"{response.ErrorMessage ?? "<none>"}\""
            );

        _messageProcessingCallback(response.Success, response.Contents);
        yield break;
    }
}
