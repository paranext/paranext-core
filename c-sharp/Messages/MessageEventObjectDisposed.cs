using Paranext.DataProvider.JsonUtils;

namespace Paranext.DataProvider.Messages;

[JsonMessageDeserialization(
    MessageField.MESSAGE_TYPE,
    MessageType.EVENT,
    MessageField.EVENT_TYPE,
    Messages.EventType.OBJECT_DISPOSE
)]
public sealed class MessageEventObjectDisposed : MessageEventGeneric<string>
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageEventObjectDisposed()
        : base(Messages.EventType.OBJECT_DISPOSE, null!) { }

    public MessageEventObjectDisposed(string objectName)
        : base(Messages.EventType.OBJECT_DISPOSE, objectName) { }
}
