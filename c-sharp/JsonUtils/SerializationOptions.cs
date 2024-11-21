using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;
using SIL.Extensions;
using StreamJsonRpc;

namespace Paranext.DataProvider.JsonUtils;

internal static class SerializationOptions
{
    /// <summary>
    /// Creates new serialization options used for communicating with the PAPI.
    /// </summary>
    public static JsonSerializerOptions CreateSerializationOptions()
    {
        JsonSerializerOptions options =
            new()
            {
                TypeInfoResolver = new PrivateConstructorResolver(), // Deserialize objects with private default constructors
                Encoder = JavaScriptEncoder.Create(UnicodeRanges.All), // Don't escape non-ASCII characters
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase, // Allow properties to be upper-case while JSON contains lower-case
                WriteIndented = false, // No need to waste bytes with nice formatting
                IgnoreReadOnlyProperties = false, // Need types to be serialized
            };
        options.Converters.Add(new CommentConverter());
        options.Converters.Add(new VerseRefConverter());
        options.Converters.Add(new RegistrationDataConverter());
        options.Converters.Add(new InternetSettingsMementoConverter());
        return options;
    }

    public static IJsonRpcMessageFormatter CreateJsonRpcMessageFormatter()
    {
        var options = CreateSerializationOptions();
        var formatter = new SystemTextJsonFormatter();
        formatter.JsonSerializerOptions.TypeInfoResolver = options.TypeInfoResolver;
        formatter.JsonSerializerOptions.Encoder = options.Encoder;
        formatter.JsonSerializerOptions.PropertyNamingPolicy = options.PropertyNamingPolicy;
        formatter.JsonSerializerOptions.WriteIndented = options.WriteIndented;
        formatter.JsonSerializerOptions.IgnoreReadOnlyProperties = options.IgnoreReadOnlyProperties;
        formatter.JsonSerializerOptions.Converters.AddRange(options.Converters);
        return formatter;
    }
}
