using PtxUtils;

namespace Paranext.DataProvider.Messages;

/// <summary>
/// Message requests to/from the server.
/// </summary>
public sealed class MessageRequest : Message
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageRequest() { }

    public MessageRequest(Enum<RequestType> requestType, int requestId, dynamic? contents)
    {
        RequestType = requestType;
        RequestId = requestId;
        Contents = contents;
    }

    public override Enum<MessageType> Type => MessageType.Request;

    public Enum<RequestType> RequestType { get; set; }

    public int RequestId { get; set; }

    public dynamic? Contents { get; set; }

    public override string ToString()
    {
        return $"Request: {RequestType} ({RequestId}) from {SenderId}";
    }
}
