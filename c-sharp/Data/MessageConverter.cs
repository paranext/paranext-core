using System.Text.Json;
using System.Text.Json.Serialization;
using Paranext.DataProvider.Utils;
using PtxUtils;

namespace Paranext.DataProvider.Data;
/// <summary>
/// Handles serialization and deserialization of Messages
/// </summary>
internal sealed class MessageConverter : JsonConverter<Message>
{
    #region Member variables
    private static readonly JsonSerializerOptions recursiveSafeOptions = JsonUtils.CreateSerializationOptions();
    private static readonly Dictionary<Enum<MessageType>, Type> messageTypeMap = new() {
        { MessageType.InitClient, typeof(MessageInitClient) },
        { MessageType.ClientConnect, typeof(MessageClientConnect) },
        { MessageType.Request, typeof(MessageRequest) },
        { MessageType.Response, typeof(MessageResponse) },
    };
    #endregion

    #region Implementation of JsonConverter
    public override bool CanConvert(Type typeToConvert) => typeof(Message).IsAssignableFrom(typeToConvert);

    public override Message Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType != JsonTokenType.StartObject)
            throw new JsonException("Not at start of JSON object");

        Utf8JsonReader readerClone = reader; // Make copy of reader state (struct copy)

        Enum<MessageType> messageType = ReadProperty<MessageType>(ref readerClone);
        if (!messageTypeMap.TryGetValue(messageType, out Type? messageDataType))
            throw new ArgumentException("Unexpected message type: " + messageType);

        return (Message)JsonSerializer.Deserialize(ref reader, messageDataType!, recursiveSafeOptions)!;
    }

    public override void Write(Utf8JsonWriter writer, Message message, JsonSerializerOptions options)
    {
        JsonSerializer.Serialize(writer, message, message.GetType(), recursiveSafeOptions);
    }
    #endregion

    #region Private helper methods
    /// <summary>
    /// Reads the message type from the message given the specified reader
    /// </summary>
    private static Enum<TReturn> ReadProperty<TReturn>(ref Utf8JsonReader reader) where TReturn : class, EnumType
    {
        reader.Read();
        if (reader.TokenType != JsonTokenType.PropertyName)
            throw new JsonException($"Unexpected token {reader.TokenType} (expected PropertyName)");

        string? propertyName = reader.GetString();
        if (propertyName != "type")
            throw new JsonException("Unexpected property");

        reader.Read();
        if (reader.TokenType != JsonTokenType.String)
            throw new JsonException($"Unexpected token {reader.TokenType} (expected String)");

        return new(reader.GetString());
    }
    #endregion
}
