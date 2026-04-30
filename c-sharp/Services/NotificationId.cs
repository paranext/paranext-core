using System.Text.Json.Serialization;
using Paranext.DataProvider.JsonUtils;

namespace Paranext.DataProvider.Services;

[JsonConverter(typeof(NotificationIdConverter))]
public readonly struct NotificationId
{
    private readonly string _value;
    private readonly bool _isNumber;

    private NotificationId(string value, bool isNumber)
    {
        _value = value;
        _isNumber = isNumber;
    }

    internal static NotificationId FromString(string value) => new(value, false);

    // Assumes numeric IDs are integers (which sonner produces).
    // GetInt64() will throw for decimal-point numbers — acceptable per spec.
    internal static NotificationId FromNumber(long value) => new(value.ToString(), true);

    // Returns string or long so StreamJsonRpc serializes the correct JSON type back to TypeScript.
    // JavaScript Map.get() is type-sensitive: 42 !== "42".
    internal object ToSerializable() => _isNumber ? long.Parse(_value) : _value;

    public override string ToString() => _value;
}
