using Paranext.DataProvider.JsonUtils;

namespace Paranext.DataProvider.Messages;

/// <summary>
/// Message responses from/to the server - It is the result of sending/getting a request
/// </summary>
[JsonMessageDeserialization(MessageField.MESSAGE_TYPE, MessageType.RESPONSE)]
public sealed class MessageResponse : Message
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageResponse()
        : base(MessageType.RESPONSE)
    {
        RequestType = string.Empty;
    }

    /// <summary>
    /// Response when there was an error - no contents
    /// </summary>
    public static MessageResponse Failed(
        string requestType,
        int requestId,
        int requesterId,
        string errorMessage
    )
    {
        return new MessageResponse
        {
            RequestType = requestType,
            RequestId = requestId,
            RequesterId = requesterId,
            Success = false,
            ErrorMessage = errorMessage,
        };
    }

    /// <summary>
    /// Response when successful
    /// </summary>
    public static MessageResponse Succeeded(
        string requestType,
        int requestId,
        int requesterId,
        object? contents
    )
    {
        return new MessageResponse
        {
            RequestType = requestType,
            RequestId = requestId,
            RequesterId = requesterId,
            Success = true,
            Contents = contents,
        };
    }

    public string RequestType { get; set; }

    public bool Success { get; set; }

    public string? ErrorMessage { get; set; }

    public int RequestId { get; set; }

    public int RequesterId { get; set; }

    public object? Contents { get; set; }

    public override string ToString()
    {
        return $"Response: {RequestType} from {SenderId} to {RequesterId} ({(Success ? "Successful" : "Failed")})";
    }
}
