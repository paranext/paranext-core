using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Messages;
using System.Text.Json;

namespace TestParanextDataProvider.JsonUtils;

public class MessageConverterTests
{
    [Test]
    public void Deserialize_ClientConnect_StronglyTypedContentsAreCorrect()
    {
        string messageToDecode = """
            {"type":"event","eventType":"network:onDidClientConnect","senderId":0,"event":{"clientId":3,"didReconnect":false}}
            """;
        var msg = DeserializeMessageEvent<MessageEventClientConnect>(messageToDecode);
        Assert.That(msg.EventContents!.ClientId, Is.EqualTo(3));
        Assert.That(msg.EventContents!.DidReconnect, Is.False);
    }

    [Test]
    public void Deserialize_ClientDisconnect_StronglyTypedContentsAreCorrect()
    {
        string messageToDecode = """
            {"type":"event","eventType":"network:onDidClientDisconnect","senderId":0,"event":{"clientId":123}}
            """;
        var msg = DeserializeMessageEvent<MessageEventClientDisconnect>(messageToDecode);
        Assert.That(msg.EventContents!.ClientId, Is.EqualTo(123));
    }

    [Test]
    public void Deserialize_ObjectDispose_StronglyTypedContentsAreCorrect()
    {
        string messageToDecode = """
            {"type":"event","eventType":"object:onDidDisposeNetworkObject","senderId":0,"event":"test-main"}
            """;
        var msg = DeserializeMessageEvent<MessageEventObjectDispose>(messageToDecode);
        Assert.That(msg.EventContents!, Is.EqualTo("test-main"));
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
        JsonSerializerOptions so = JsonSerializerOptionsForTesting;

        var msg = JsonSerializer.Deserialize<MessageType>(messageToDecode, so);
        Assert.That(msg, Is.Not.Null);
        Assert.That(msg.Event, Is.Not.Null);

        string reserializedMessage = JsonSerializer.Serialize(msg, so);
        var msg2 = JsonSerializer.Deserialize<MessageType>(reserializedMessage, so);
        Assert.That(msg2, Is.Not.Null);
        Assert.That(msg2.Event, Is.Not.Null);

        // Make sure that we get the same event contents when doing a round trip through serialization/deserialization
        if (msg.GetType() == typeof(MessageEvent))
            // Short cut to check equality of JsonElements
            Assert.That(msg.Event!.ToString(), Is.EqualTo(msg2.Event!.ToString()));
        else
            Assert.That(msg.Event, Is.EqualTo(msg2.Event));

        return msg;
    }

    private static JsonSerializerOptions JsonSerializerOptionsForTesting
    {
        get
        {
            JsonSerializerOptions so = SerializationOptions.CreateSerializationOptions();
            so.Converters.Add(new MessageConverter());
            return so;
        }
    }
}
