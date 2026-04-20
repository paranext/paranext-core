using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;
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
                Encoder = JavaScriptEncoder.Create(UnicodeRanges.All), // Don't escape non-ASCII characters
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase, // Allow properties to be upper-case while JSON contains lower-case
                WriteIndented = false, // No need to waste bytes with nice formatting
                IgnoreReadOnlyProperties = false, // Need types to be serialized
            };
        // Match the PropertyNamingPolicy: TypeScript string-union types on the wire (e.g.
        // 'chapterVerse', 'copyDestination') correspond to C# enum values (ChapterVerse,
        // CopyDestination). Without this converter, System.Text.Json only accepts integer
        // enum values, which breaks any NetworkObject whose request record contains an enum
        // field (e.g. ManageBooks CreateBooksRequest.CreationMethod, ProjectFilterInput.Purpose).
        // Confirmed at runtime via e2e-tests/tests/manage-books/manage-books-commands.spec.ts.
        options.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
        options.Converters.Add(new CommentThreadSelectorConverter());
        options.Converters.Add(new PlatformCommentConverter());
        options.Converters.Add(new PlatformCommentThreadConverter());
        options.Converters.Add(new ConcurrentHashSetConverter<string>());
        options.Converters.Add(new InternetSettingsMementoConverter());
        options.Converters.Add(new InventoryOptionValueConverter());
        options.Converters.Add(new InventoryTextTypeConverter());
        options.Converters.Add(new RegistrationDataConverter());
        options.Converters.Add(new VerseRefConverter());
        // Match the PropertyNamingPolicy: TypeScript string-union types on the wire (e.g.
        // 'chapterVerse', 'copyDestination') correspond to C# enum values (ChapterVerse,
        // CopyDestination). Without this converter, System.Text.Json only accepts integer
        // enum values, which breaks any NetworkObject whose request record contains an enum
        // field (e.g. ManageBooks CreateBooksRequest.CreationMethod, ProjectFilterInput.Purpose).
        // Registered LAST so any future per-type enum JsonConverter<T> takes precedence —
        // System.Text.Json resolves Converters in insertion order (first match wins on
        // CanConvert), and JsonStringEnumConverter.CanConvert returns true for any enum.
        // Confirmed at runtime via e2e-tests/tests/manage-books/manage-books-commands.spec.ts.
        options.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
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
