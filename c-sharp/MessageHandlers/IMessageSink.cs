using Paranext.DataProvider.Messages;

namespace Paranext.DataProvider.MessageHandlers
{
    internal interface IMessageSink
    {
        Task SendMessage(Message message);
    }
}
