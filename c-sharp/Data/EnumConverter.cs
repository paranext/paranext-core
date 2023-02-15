using System.Text.Json;
using System.Text.Json.Serialization;
using PtxUtils;

namespace Paranext.DataProvider.Data;

/// <summary>
/// Handles serialization and deserialization of Messages
/// </summary>
internal sealed class EnumConverter<TParam> : JsonConverter<Enum<TParam>> where TParam : class, EnumType
{
    public override Enum<TParam> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (typeToConvert != typeof(Enum<TParam>))
            return Enum<TParam>.Null;

        if (reader.TokenType != JsonTokenType.String)
            throw new JsonException($"Unexpected token {reader.TokenType} (expected String)");

        //return new();
        return new Enum<TParam>(reader.GetString());
    }

    public override void Write(Utf8JsonWriter writer, Enum<TParam> value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString());
    }
}

