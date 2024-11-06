using System.Text.Json;
using System.Text.Json.Serialization;
using Paratext.Data.Users;

namespace Paranext.DataProvider.JsonUtils;

public class RegistrationDataConverter : JsonConverter<RegistrationData>
{
    private const string NAME = "name";
    private const string CODE = "code";
    private const string EMAIL = "email";
    private const string SUPPORTER_NAME = "supporterName";

    public override RegistrationData Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    )
    {
        string name = "";
        string code = "";
        string email = "";
        string supporterName = "";

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
                case JsonTokenType.True:
                case JsonTokenType.False:
                    lastPropertyName = null;
                    break;
                case JsonTokenType.Number:
                    lastPropertyName = null;
                    break;
                case JsonTokenType.String:
                    switch (lastPropertyName)
                    {
                        case NAME:
                            name = reader.GetString() ?? "";
                            break;
                        case CODE:
                            code = reader.GetString() ?? "";
                            break;
                        case EMAIL:
                            email = reader.GetString() ?? "";
                            break;
                        case SUPPORTER_NAME:
                            supporterName = reader.GetString() ?? "";
                            break;
                    }
                    lastPropertyName = null;
                    break;
            }
        }

        return new RegistrationData
        {
            Name = name,
            Code = code,
            Email = email,
            SupporterName = supporterName,
        };
    }

    public override void Write(
        Utf8JsonWriter writer,
        RegistrationData value,
        JsonSerializerOptions options
    )
    {
        writer.WriteStartObject();
        writer.WriteString(NAME, value.Name);
        writer.WriteString(CODE, value.Code);
        writer.WriteString(EMAIL, value.Email);
        writer.WriteString(SUPPORTER_NAME, value.SupporterName);
        writer.WriteEndObject();
    }
}
