using Paranext.DataProvider.Messages;

namespace Paranext.DataProvider.MessageHandlers
{
    internal class MessageHandlerEvent : IMessageHandler
    {
        public void HandleMessage(Message message)
        {
            if (message == null)
                throw new ArgumentNullException(nameof(message));

            if (message.Type != MessageType.Event)
                throw new ArgumentException("Incorrect message type", nameof(message));

            Console.WriteLine("Event received: {0}", message);
        }
    }
}
