using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text.Json;
using System.Text.Json.Serialization;
using Paranext.DataProvider.Utils;
using PtxUtils;

namespace Paranext.DataProvider.Data
{
    /// <summary>
    /// Handles serialization and deserialization of Messages
    /// </summary>
    internal sealed class MessageCreationConverter : JsonConverter<Message>
    {
        #region Member variables
        private static readonly JsonSerializerOptions recursiveSafeOptions = JsonUtils.CreateSerializationOptions();
        private static readonly Dictionary<Enum<MessageType>, Type> messageTypeMap = new();
        #endregion

        #region Constructor
        static MessageCreationConverter()
        {
            // Find all the message implementations and add them to the type map
            foreach (Type type in Assembly.GetExecutingAssembly().ExportedTypes)
            {
                // TODO: Handle request and response types
                //if (typeof(MessageRequest).IsAssignableFrom(type) && !type.IsAbstract)

                if (typeof(Message).IsAssignableFrom(type) && !type.IsAbstract)
                {
                    // ENHANCE: Check if there is a better design so we don't have to instanciate the implementations
                    Message message = (Message)Activator.CreateInstance(type)!;
                    messageTypeMap.Add(message.Type, type);
                }
            }
        }
        #endregion

        #region Implementation of JsonConverter
        public override bool CanConvert(Type typeToConvert) => typeof(Message).IsAssignableFrom(typeToConvert);

        public override Message Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            Enum<MessageType> messageType = ReadMessageType(reader);
            Type messageDataType = messageTypeMap[messageType];
            return (Message)JsonSerializer.Deserialize(ref reader, messageDataType, recursiveSafeOptions)!;
        }

        public override void Write(Utf8JsonWriter writer, Message message, JsonSerializerOptions options)
        {
            JsonSerializer.Serialize(writer, message, message.GetType(), recursiveSafeOptions);
        }
        #endregion

        #region Private helper methods
        /// <summary>
        /// Reads the message type from the message given the specified reader without
        /// modifying the reader.
        /// </summary>
        [MethodImpl(MethodImplOptions.NoInlining)] // Make sure the struct copy happens via a method call
        private static Enum<MessageType> ReadMessageType(Utf8JsonReader reader)// Make copy of the reader state (struct copy)
        {
            if (reader.TokenType != JsonTokenType.StartObject)
                throw new JsonException("Not at start of JSON object");

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
}
