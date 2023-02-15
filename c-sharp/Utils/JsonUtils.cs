using System.Runtime.CompilerServices;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization.Metadata;
using System.Text.Unicode;
using Newtonsoft.Json;
using Paranext.DataProvider.Data;
using PtxUtils;

namespace Paranext.DataProvider.Utils;

internal static class JsonUtils
{
    /// <summary>
    /// Creates new serialization options used for communicating with the PAPI.
    /// </summary>
    public static JsonSerializerOptions CreateSerializationOptions()
    {
        JsonSerializerOptions options = new() {
            TypeInfoResolver = new PrivateConstructorResolver(), // Deserialize objects with private default constructors
            Encoder = JavaScriptEncoder.Create(UnicodeRanges.All), // Don't escape non-ASCII characters
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase, // Allow properties to be upper-case while JSON contains lower-case
            WriteIndented = false, // No need to waste bytes with nice formatting
            IgnoreReadOnlyProperties = false, // Need message type to be serialized
        };

        options.Converters.Add(new EnumConverter<MessageType>());
        options.Converters.Add(new EnumConverter<RequestTypes>());
        return options;
    }
}
