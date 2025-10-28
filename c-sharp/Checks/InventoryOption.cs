using System.Text.Json;
using Paratext.Checks.CMS;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Details about an inventory option
/// This class corresponds to the InventoryOption type defined in platform-scripture.d.ts.
/// Keep their structures in sync for serialization compatibility.
/// </summary>
internal class InventoryOption
{
    public const string TYPE_BOOLEAN = "boolean";
    public const string TYPE_STRING = "string";

    public string OptionName { get; set; } = string.Empty;
    public string LocalizeKeyName { get; set; } = string.Empty;
    public string ValueType { get; set; } = string.Empty;

    public string SerializeValue(object value)
    {
        var stringValue = value?.ToString();
        if (string.IsNullOrEmpty(stringValue))
            return CMSOption.nullValue;

        switch (ValueType)
        {
            case TYPE_BOOLEAN:
                if (value is bool b)
                    return b ? CMSOption.yesValue : CMSOption.noValue;
                else if (value is JsonElement t && t.ValueKind == JsonValueKind.True)
                    return CMSOption.yesValue;
                else if (value is JsonElement f && f.ValueKind == JsonValueKind.False)
                    return CMSOption.noValue;
                throw new ArgumentException("Invalid boolean value: " + value);
            case TYPE_STRING:
                return stringValue;
            default:
                throw new InvalidDataException("Invalid ValueType: " + ValueType);
        }
    }

    public object? DeserializeValue(string serializedValue)
    {
        switch (ValueType)
        {
            case TYPE_BOOLEAN:
                if (serializedValue == CMSOption.yesValue)
                    return true;
                if (serializedValue == CMSOption.noValue)
                    return false;
                throw new ArgumentException("Invalid boolean value: " + serializedValue);
            case TYPE_STRING:
                return (serializedValue == CMSOption.nullValue) ? string.Empty : serializedValue;
            default:
                throw new InvalidDataException("Invalid ValueType: " + ValueType);
        }
    }
}
