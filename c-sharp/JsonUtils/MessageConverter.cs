using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using Paranext.DataProvider.Messages;
using PtxUtils;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Handles serialization and deserialization of Messages
/// </summary>
internal sealed class MessageConverter : JsonConverter<Message>
{
    private static readonly JsonSerializerOptions s_jsonOptions =
        SerializationOptions.CreateSerializationOptions();
    private static readonly Dictionary<Enum<MessageType>, Type> s_messageTypeMap = new();
    private static readonly Dictionary<Enum<EventType>, Type> s_eventTypeMap = new();

    static MessageConverter()
    {
        foreach (var msg in GetObjectsOfClosestSubclasses<Message>())
        {
            s_messageTypeMap.Add(msg.Type, msg.GetType());
        }

        foreach (var evt in GetObjectsOfClosestSubclasses<MessageEvent>())
        {
            s_eventTypeMap.Add(evt.EventType, evt.GetType());
        }
    }

    /// <summary>
    /// "Closest" means there isn't a subclass in the hierarchy that can be created.  For example:
    ///   C is a subclass of B which is a subclass of A.
    ///   When calling this for A, if B is abstract, then an object of type C will be returned.
    ///   When calling this for A, if B is not abstract, then an object of type B will be returned.
    /// </summary>
    private static IEnumerable<BaseClass> GetObjectsOfClosestSubclasses<BaseClass>()
        where BaseClass : class
    {
        var possibilities = Assembly
            .GetExecutingAssembly()
            .GetTypes()
            .Where(t => t.IsClass && !t.IsAbstract && t.IsSubclassOf(typeof(BaseClass)))
            .Select(type => Activator.CreateInstance(type, true) as BaseClass)
            .Where(obj => obj is not null);

        foreach (var obj in possibilities)
        {
            var baseType = obj!.GetType().BaseType;
            while (baseType != null)
            {
                if (baseType == typeof(BaseClass))
                {
                    yield return obj;
                    break;
                }

                if (baseType.IsAbstract)
                {
                    baseType = baseType.BaseType;
                    continue;
                }

                // At this point, a closer, creatable subclass was found
                break;
            }
        }
    }

    public override bool CanConvert(Type typeToConvert) =>
        typeof(Message).IsAssignableFrom(typeToConvert);

    public override Message Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    )
    {
        if (reader.TokenType != JsonTokenType.StartObject)
            throw new JsonException("Not at start of JSON object");

        // Find the right message type to deserialize
        Enum<MessageType> messageType = ReadValue<MessageType>(reader, "type");
        if (!s_messageTypeMap.TryGetValue(messageType, out Type? messageDataType))
            throw new ArgumentException("Unexpected message type: " + messageType);

        // Provide a more specific type for event messages if we know about it
        if (messageDataType == typeof(MessageEvent))
        {
            Enum<EventType> eventType = ReadValue<EventType>(reader, "eventType");
            if (s_eventTypeMap.TryGetValue(eventType, out Type? eventMessageDataType))
                messageDataType = eventMessageDataType;
        }

        // Copy the current state of the reader because we might need it again
        Utf8JsonReader readerClone = reader;

        var msg = (Message)JsonSerializer.Deserialize(ref reader, messageDataType!, s_jsonOptions)!;
        if (msg is MessageEvent msgEvent)
            msgEvent.Event = GetEventData(readerClone, msgEvent.EventContentsType);
        return msg;
    }

    public override void Write(
        Utf8JsonWriter writer,
        Message message,
        JsonSerializerOptions options
    )
    {
        JsonSerializer.Serialize(writer, message, message.GetType(), s_jsonOptions);
    }

    /// <summary>
    /// Reads the property from the message given the specified reader
    /// </summary>
    private static Enum<T> ReadValue<T>(Utf8JsonReader reader, string property)
        where T : class, EnumType
    {
        do
        {
            bool success = reader.Read();
            if (!success)
                return Enum<T>.Null;

            if (reader.TokenType != JsonTokenType.PropertyName)
                continue;

            string? propertyName = reader.GetString();
            if (propertyName != property)
                continue;

            success = reader.Read();
            if (!success)
                return Enum<T>.Null;

            if (reader.TokenType != JsonTokenType.String)
                throw new JsonException($"Unexpected token {reader.TokenType} (expected String)");

            return new Enum<T>(reader.GetString());
        } while (true);
    }

    /// <summary>
    /// Deserializes the specific type for the "event" property from the given reader
    /// </summary>
    private static dynamic? GetEventData(Utf8JsonReader reader, Type type)
    {
        do
        {
            if (!reader.Read())
                break;

            if (reader.TokenType != JsonTokenType.PropertyName)
                continue;

            string? propertyName = reader.GetString();
            if (propertyName != "event")
                continue;

            reader.Read();
            return JsonSerializer.Deserialize(ref reader, type, s_jsonOptions);
        } while (true);

        throw new JsonException("Could not find event data within event message");
    }
}
