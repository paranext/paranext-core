using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;

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
        options.Converters.Add(new ProjectDataScopeConverter());
        options.Converters.Add(new VerseRefConverter());
        return options;
    }
}
