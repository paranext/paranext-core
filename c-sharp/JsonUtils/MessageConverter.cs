using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using Paranext.DataProvider.Messages;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Handles serialization and deserialization of Messages
/// </summary>
internal sealed class MessageConverter : JsonConverter<Message>
{
    private static readonly JsonSerializerOptions s_jsonOptions =
        SerializationOptions.CreateSerializationOptions();

    // Rules are in the form of (key, value) pairs => Type to deserialize
    // The default type if nothing else matches is "Message"
    private static readonly TupleTree<string, string, Type> s_deserializationRules =
        new(typeof(Message));

    static MessageConverter()
    {
        foreach (var type in Assembly.GetExecutingAssembly().GetTypes())
        {
            var attribute = type.GetCustomAttribute<JsonMessageDeserializationAttribute>(false);
            if (attribute != null)
                s_deserializationRules.Add(attribute.KeyValuePairs, type);
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
        // Copy the current state of the reader because we will need it again
        var readerClone = reader;
        var propertyNamesAndValues = new HashSet<(string key, string value)>();
        using (var jsonDocument = JsonDocument.ParseValue(ref readerClone))
        {
            foreach (var jsonProperty in jsonDocument.RootElement.EnumerateObject())
            {
                // For now we only need string properties from messages. This could be expanded.
                if (jsonProperty.Value.ValueKind == JsonValueKind.String)
                    propertyNamesAndValues.Add((jsonProperty.Name, jsonProperty.Value.ToString()));
            }
        }
        // If we want to be picky, we could look for more matching types and throw/warn if any are seen.
        // That would mean the protocol itself is busted, though, which is really a design problem.
        var messageType = s_deserializationRules.FindAllResults(propertyNamesAndValues).First();
        return (Message)JsonSerializer.Deserialize(ref reader, messageType, s_jsonOptions)!;
    }

    public override void Write(
        Utf8JsonWriter writer,
        Message message,
        JsonSerializerOptions options
    )
    {
        JsonSerializer.Serialize(writer, message, message.GetType(), s_jsonOptions);
    }
}
