using Paranext.DataProvider.Messages;

namespace Paranext.DataProvider.MessageHandlers;

internal interface IMessageHandler
{
    public void HandleMessage(Message message);
}
