using System.Text.Json;
using System.Text.Json.Serialization;
using Paranext.DataProvider.Checks;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Custom JSON converter for InventoryOptionValue that properly handles the OptionValue property
/// which can be null, a string, or a boolean.
/// </summary>
internal class InventoryOptionValueConverter : JsonConverter<InventoryOptionValue>
{
    private const string OptionNameProperty = "optionName";
    private const string OptionValueProperty = "optionValue";

    public override InventoryOptionValue Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    )
    {
        if (reader.TokenType != JsonTokenType.StartObject)
            throw new JsonException("Expected start of object");

        var result = new InventoryOptionValue();

        while (reader.Read())
        {
            if (reader.TokenType == JsonTokenType.EndObject)
                return result;

            if (reader.TokenType != JsonTokenType.PropertyName)
                throw new JsonException("Expected property name");

            string propertyName = reader.GetString() ?? string.Empty;
            reader.Read();

            if (propertyName == OptionNameProperty)
            {
                result.OptionName = reader.GetString() ?? string.Empty;
            }
            else if (propertyName == OptionValueProperty)
            {
                // Handle different value types
                result.OptionValue = reader.TokenType switch
                {
                    JsonTokenType.Null => null,
                    JsonTokenType.String => reader.GetString(),
                    JsonTokenType.True => true,
                    JsonTokenType.False => false,
                    _ => throw new JsonException(
                        $"Unexpected token type for optionValue: {reader.TokenType}"
                    ),
                };
            }
            else
            {
                reader.Skip();
            }
        }

        throw new JsonException("Expected end of object");
    }

    public override void Write(
        Utf8JsonWriter writer,
        InventoryOptionValue value,
        JsonSerializerOptions options
    )
    {
        writer.WriteStartObject();

        writer.WritePropertyName(OptionNameProperty);
        writer.WriteStringValue(value.OptionName);

        writer.WritePropertyName(OptionValueProperty);
        if (value.OptionValue == null)
        {
            writer.WriteNullValue();
        }
        else if (value.OptionValue is bool boolValue)
        {
            writer.WriteBooleanValue(boolValue);
        }
        else if (value.OptionValue is string stringValue)
        {
            writer.WriteStringValue(stringValue);
        }
        else
        {
            throw new JsonException("OptionValue must be null, a string, or a boolean");
        }

        writer.WriteEndObject();
    }
}
