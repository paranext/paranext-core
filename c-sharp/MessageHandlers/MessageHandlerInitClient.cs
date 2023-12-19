using Paranext.DataProvider.Messages;

namespace Paranext.DataProvider.MessageHandlers;

/// <summary>
/// Handler for "Response" messages
/// </summary>
internal class MessageHandlerInitClient : IMessageHandler
{
    private readonly Action<int> _clientIdCallback;

    public MessageHandlerInitClient(Action<int> clientIdCallback)
    {
        _clientIdCallback = clientIdCallback;
    }

    public IEnumerable<Message> HandleMessage(Message message)
    {
        if (message == null)
            throw new ArgumentNullException(nameof(message));

        if (message is not MessageInitClient initClientMsg)
            throw new ArgumentException("Incorrect message type", nameof(message));

        int clientId = initClientMsg.ConnectorInfo.ClientId;
        _clientIdCallback(clientId);
        yield return new MessageClientConnect(clientId);
    }
}
