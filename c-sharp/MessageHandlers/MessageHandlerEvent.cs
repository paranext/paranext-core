using Paranext.DataProvider.Messages;

namespace Paranext.DataProvider.MessageHandlers;

/// <summary>
/// Handler for "Event" messages
/// </summary>
internal class MessageHandlerEvent : IMessageHandler
{
    public Message? HandleMessage(Message message)
    {
        if (message == null)
            throw new ArgumentNullException(nameof(message));

        if (message.Type != MessageType.Event)
            throw new ArgumentException("Incorrect message type", nameof(message));

        Console.WriteLine($"Event received: {message}");

        return null;
    }
}
