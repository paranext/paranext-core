using Paranext.DataProvider.Messages;

namespace Paranext.DataProvider.MessageHandlers;

internal interface IMessageHandler
{
    public Message? HandleMessage(Message message);
}
