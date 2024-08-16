using System.Text.Json;

namespace Paranext.DataProvider.JsonUtils;

public static class SerializationExtensionMethods
{
    private static readonly JsonSerializerOptions s_papiOptions =
        SerializationOptions.CreateSerializationOptions();

    /// <summary>
    /// Calls <see cref="JsonSerializer.Deserialize{TValue}(string, JsonSerializerOptions?)"/> with
    /// <see cref="JsonSerializerOptions"/> that are configured to work with PAPI types. If you
    /// need to call other versions of Deserialize, consider calling
    /// <see cref="SerializationOptions.CreateSerializationOptions()"/> to create an appropriate
    /// options object to pass in.
    /// </summary>
    /// <returns>A TValue representation of the JSON value.</returns>
    public static T? DeserializeFromJson<T>(this string json)
    {
        return JsonSerializer.Deserialize<T>(json, s_papiOptions);
    }

    /// <summary>
    /// Calls <see cref="JsonSerializer.Serialize{TValue}(TValue, JsonSerializerOptions?)"/> with
    /// <see cref="JsonSerializerOptions"/> that are configured to work with PAPI types. If you
    /// need to call other versions of Serialize, consider calling
    /// <see cref="SerializationOptions.CreateSerializationOptions()"/> to create an appropriate
    /// options object to pass in.
    /// </summary>
    /// <returns>A JSON string representation of the value.</returns>
    public static string SerializeToJson<T>(this T value)
    {
        return JsonSerializer.Serialize(value, s_papiOptions);
    }

    /// <summary>
    /// Calls
    /// <see cref="JsonSerializer.SerializeToElement{TValue}(TValue, JsonSerializerOptions?)"/> with
    /// <see cref="JsonSerializerOptions"/> that are configured to work with PAPI types. If you
    /// need to call other versions of SerializeToElement, consider calling
    /// <see cref="SerializationOptions.CreateSerializationOptions()"/> to create an appropriate
    /// options object to pass in.
    /// </summary>
    /// <returns>A JsonDocument representation of the JSON value.</returns>
    public static JsonElement SerializeToJsonElement<T>(this T value)
    {
        return JsonSerializer.SerializeToElement(value, s_papiOptions);
    }
}
