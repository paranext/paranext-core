using PtxUtils;

namespace Paranext.DataProvider.Messages;

/// <summary>
/// Message responses from/to the server - It is the result of sending/getting a request
/// </summary>
public sealed class MessageResponse : Message
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageResponse()
    {
    }

    /// <summary>
    /// Response when there was an error - no contents
    /// </summary>
    public MessageResponse(
        Enum<RequestType> requestType,
        int requestId,
        int requesterId,
        string errorMessage)
    {
        RequestType = requestType;
        RequestId = requestId;
        RequesterId = requesterId;
        Success = false;
        ErrorMessage = errorMessage;
    }

    /// <summary>
    /// Response when successful
    /// </summary>
    public MessageResponse(
        Enum<RequestType> requestType,
        int requestId,
        int requesterId,
        dynamic? contents)
    {
        RequestType = requestType;
        RequestId = requestId;
        RequesterId = requesterId;
        Success = true;
        Contents = contents;
    }

    public sealed override Enum<MessageType> Type => MessageType.Response;

    public Enum<RequestType> RequestType { get; set; }

    public bool Success { get; set; }

    public string? ErrorMessage { get; set; }

    public int RequestId { get; set; }

    public int RequesterId { get; set; }

    public dynamic? Contents { get; set; }

    public override string ToString()
    {
        return $"Response: {RequestType} from {SenderId} to {RequesterId} ({(Success ? "Successful" : "Failed")})";
    }
}
