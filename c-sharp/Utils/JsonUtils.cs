using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;

namespace Paranext.DataProvider.Utils;

internal static class JsonUtils
{
    /// <summary>
    /// Creates new serialization options used for communicating with the PAPI.
    /// </summary>
    public static JsonSerializerOptions CreateSerializationOptions()
    {
        return new JsonSerializerOptions() {
            Encoder = JavaScriptEncoder.Create(UnicodeRanges.All), // Don't escape non-ASCII characters
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase, // Allow properties to be upper-case while JSON contains lower-case
            WriteIndented = false, // No need to waste bytes with nice formatting
            IgnoreReadOnlyProperties = false, // Need message type to be serialized
        };
    }
}
