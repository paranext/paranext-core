using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Messages;
using System.Text.Json;

namespace TestParanextDataProvider.MessageHandlers;

public class MessageConverterTests
{
    [Fact]
    public void Deserialize_ClientConnect_StronglyTypedContentsAreCorrect()
    {
        string messageToDecode = """
            {"type":"event","eventType":"network:onDidClientConnect","senderId":0,"event":{"clientId":3,"didReconnect":false}}
            """;
        var msg = DeserializeMessageEvent<MessageEventClientConnect>(messageToDecode);
        Assert.Equal(3, msg.EventContents!.ClientId);
        Assert.False(msg.EventContents!.DidReconnect);
    }

    [Fact]
    public void Deserialize_ClientDisconnect_StronglyTypedContentsAreCorrect()
    {
        string messageToDecode = """
            {"type":"event","eventType":"network:onDidClientDisconnect","senderId":0,"event":{"clientId":123}}
            """;
        var msg = DeserializeMessageEvent<MessageEventClientDisconnect>(messageToDecode);
        Assert.Equal(123, msg.EventContents!.ClientId);
    }

    [Fact]
    public void Deserialize_ObjectDispose_StronglyTypedContentsAreCorrect()
    {
        string messageToDecode = """
            {"type":"event","eventType":"object:onDidDisposeNetworkObject","senderId":0,"event":"test-main"}
            """;
        var msg = DeserializeMessageEvent<MessageEventObjectDispose>(messageToDecode);
        Assert.Equal("test-main", msg.EventContents!);
    }

    [Fact]
    public void Deserialize_UnknownEventType_ProducesMessageEvent()
    {
        string messageToDecode = """
            {"type":"event","eventType":"no-such-event","senderId":0,"event":"What type am I?"}
            """;
        var msg = DeserializeMessageEvent<MessageEvent>(messageToDecode);
        Assert.Equal("What type am I?", msg.Event!.ToString());
    }

    private MessageType DeserializeMessageEvent<MessageType>(string messageToDecode)
        where MessageType : MessageEvent
    {
        JsonSerializerOptions so = JsonSerializerOptionsForTesting;

        var msg = JsonSerializer.Deserialize<MessageType>(messageToDecode, so);
        Assert.NotNull(msg);
        Assert.NotNull(msg.Event);

        string reserializedMessage = JsonSerializer.Serialize(msg, so);
        var msg2 = JsonSerializer.Deserialize<MessageType>(reserializedMessage, so);
        Assert.NotNull(msg2);
        Assert.NotNull(msg2.Event);

        // Make sure that we get the same event contents when doing a round trip through serialization/deserialization
        if (msg.GetType() == typeof(MessageEvent))
            // Short cut to check equality of JsonElements
            Assert.Equal(msg.Event!.ToString(), msg2.Event!.ToString());
        else
            Assert.Equal(msg.Event, msg2.Event);

        return msg;
    }

    private JsonSerializerOptions JsonSerializerOptionsForTesting
    {
        get
        {
            JsonSerializerOptions so = SerializationOptions.CreateSerializationOptions();
            so.Converters.Add(new MessageConverter());
            return so;
        }
    }
}
