using PtxUtils;

namespace Paranext.DataProvider.Messages;

/// <summary>
/// Message requests to/from the server.
/// </summary>
public sealed partial class MessageRequest : Message
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageRequest() : base(UNKNOWN_SENDER_ID)
    {
    }

    public MessageRequest(int senderId, Enum<RequestType> requestType, int requestId, dynamic? contents) : base(senderId)
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
