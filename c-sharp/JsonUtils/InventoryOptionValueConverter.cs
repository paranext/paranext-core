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
    private const string OPTION_NAME = "optionName";
    private const string OPTION_VALUE = "optionValue";

    public override InventoryOptionValue Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    )
    {
        string? optionName = null;
        object? optionValue = null;
        bool optionValueSet = false;

        string? lastPropertyName = null;
        // The starting token is consumed before we get the reader
        int onObjectLevel = 1;
        while (onObjectLevel > 0 && reader.Read())
        {
            switch (reader.TokenType)
            {
                case JsonTokenType.StartObject:
                case JsonTokenType.StartArray:
                    onObjectLevel++;
                    break;
                case JsonTokenType.EndObject:
                case JsonTokenType.EndArray:
                    onObjectLevel--;
                    break;
                case JsonTokenType.PropertyName:
                    lastPropertyName = reader.GetString();
                    break;
                case JsonTokenType.Null:
                    switch (lastPropertyName)
                    {
                        case OPTION_NAME:
                            optionName = null;
                            break;
                        case OPTION_VALUE:
                            optionValue = null;
                            optionValueSet = true;
                            break;
                    }
                    break;
                case JsonTokenType.True:
                case JsonTokenType.False:
                    if (lastPropertyName == OPTION_VALUE)
                    {
                        optionValue = reader.GetBoolean();
                        optionValueSet = true;
                    }
                    break;
                case JsonTokenType.String:
                    switch (lastPropertyName)
                    {
                        case OPTION_NAME:
                            optionName = reader.GetString();
                            break;
                        case OPTION_VALUE:
                            optionValue = reader.GetString();
                            optionValueSet = true;
                            break;
                    }
                    break;
            }
        }

        if (optionName == null)
            throw new JsonException($"Missing required property: {OPTION_NAME}");
        if (!optionValueSet)
            throw new JsonException($"Missing required property: {OPTION_VALUE}");

        return new InventoryOptionValue() { OptionName = optionName, OptionValue = optionValue };
    }

    public override void Write(
        Utf8JsonWriter writer,
        InventoryOptionValue value,
        JsonSerializerOptions options
    )
    {
        writer.WriteStartObject();

        writer.WritePropertyName(OPTION_NAME);
        writer.WriteStringValue(value.OptionName);

        writer.WritePropertyName(OPTION_VALUE);
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
