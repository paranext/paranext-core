using System.Text.Json;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Utility methods for custom JSON converters
/// </summary>
public static class JsonConverterUtils
{
    /// <summary>
    /// Write a string property to JSON only if the value is not null or empty.
    /// </summary>
    /// <param name="writer">The JSON writer</param>
    /// <param name="propertyName">The name of the property to write</param>
    /// <param name="value">The string value to write (if not null or empty)</param>
    public static void TryWriteString(Utf8JsonWriter writer, string propertyName, string? value)
    {
        if (!string.IsNullOrEmpty(value))
            writer.WriteString(propertyName, value);
    }
}
