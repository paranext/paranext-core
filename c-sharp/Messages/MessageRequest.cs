using System.Text.Json;
using Paranext.DataProvider.JsonUtils;

namespace Paranext.DataProvider.Messages;

/// <summary>
/// Message requests to/from the server.
/// </summary>
[JsonMessageDeserialization(MessageField.MESSAGE_TYPE, MessageType.REQUEST)]
public sealed class MessageRequest : Message
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageRequest()
        : base(MessageType.REQUEST)
    {
        RequestType = null!;
        Contents = new JsonElement();
    }

    public MessageRequest(string requestType, int requestId, object contents)
        : base(MessageType.REQUEST)
    {
        RequestType = requestType;
        RequestId = requestId;
        Contents = JsonSerializer.SerializeToElement(contents);
    }

    public string RequestType { get; set; }

    public int RequestId { get; set; }

    public JsonElement Contents { get; set; }

    public override string ToString()
    {
        return $"Request: {RequestType} ({RequestId}) from {SenderId}";
    }
}
