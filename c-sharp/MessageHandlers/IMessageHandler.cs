using Paranext.DataProvider.Messages;

namespace Paranext.DataProvider.MessageHandlers;

internal interface IMessageHandler
{
    /// <summary>
    /// Handle an incoming message, and optionally respond with another message
    /// </summary>
    /// <param name="message">Incoming message to handle</param>
    /// <returns>Optional responses to the incoming message</returns>
    public IEnumerable<Message> HandleMessage(Message message);
}
