using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Messages;

namespace TestParanextDataProvider.JsonUtils;

[ExcludeFromCodeCoverage]
public class MessageConverterTests
{
    [Test]
    public void Deserialize_Event_SenderIdIsCorrect()
    {
        string messageToDecode = """
            {"type":"event","eventType":"does-not-matter","senderId":12345,"event":{"also-does-not-matter":""}}
            """;
        var msg = DeserializeMessageEvent<MessageEvent>(messageToDecode);
        Assert.That(msg.SenderId, Is.EqualTo(12345));
    }

    [Test]
    public void Deserialize_ClientConnect_StronglyTypedContentsAreCorrect()
    {
        string messageToDecode = """
            {"type":"event","eventType":"network:onDidClientConnect","senderId":0,"event":{"clientId":3,"didReconnect":false}}
            """;
        var msg = DeserializeMessageEvent<MessageEventClientConnect>(messageToDecode);
        Assert.That(msg.Event.ClientId, Is.EqualTo(3));
        Assert.That(msg.Event.DidReconnect, Is.False);
    }

    [Test]
    public void Deserialize_ClientDisconnect_StronglyTypedContentsAreCorrect()
    {
        string messageToDecode = """
            {"type":"event","eventType":"network:onDidClientDisconnect","senderId":0,"event":{"clientId":123}}
            """;
        var msg = DeserializeMessageEvent<MessageEventClientDisconnect>(messageToDecode);
        Assert.That(msg.Event.ClientId, Is.EqualTo(123));
    }

    [Test]
    public void Deserialize_ObjectDispose_StronglyTypedContentsAreCorrect()
    {
        string messageToDecode = """
            {"type":"event","eventType":"object:onDidDisposeNetworkObject","senderId":0,"event":"test-main"}
            """;
        var msg = DeserializeMessageEvent<MessageEventObjectDisposed>(messageToDecode);
        Assert.That(msg.Event, Is.EqualTo("test-main"));
    }

    [Test]
    public void Deserialize_UnknownEventType_ProducesMessageEvent()
    {
        string messageToDecode = """
            {"type":"event","eventType":"no-such-event","senderId":0,"event":"What type am I?"}
            """;
        var msg = DeserializeMessageEvent<MessageEvent>(messageToDecode);
        Assert.That(msg.Event!.ToString(), Is.EqualTo("What type am I?"));
    }

    private static MessageType DeserializeMessageEvent<MessageType>(string messageToDecode)
        where MessageType : MessageEvent
    {
        var msg = messageToDecode.DeserializeFromJson<MessageType>();
        Assert.That(msg, Is.Not.Null);
        Assert.That(msg!.Event, Is.Not.Null);

        string reserializedMessage = msg.SerializeToJson();
        var msg2 = reserializedMessage.DeserializeFromJson<MessageType>();
        Assert.That(msg2, Is.Not.Null);
        Assert.That(msg2!.Event, Is.Not.Null);

        // Make sure that we get the same event contents when doing a round trip through serialization/deserialization
        if (msg.GetType() == typeof(MessageEvent))
            // Short cut to check equality of JsonElements
            Assert.That(msg.Event!.ToString(), Is.EqualTo(msg2.Event!.ToString()));
        else
            Assert.That(msg.Event, Is.EqualTo(msg2.Event));

        return msg;
    }
}
