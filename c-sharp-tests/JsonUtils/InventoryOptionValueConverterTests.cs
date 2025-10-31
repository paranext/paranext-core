using System.Text.Json;
using Paranext.DataProvider.Checks;
using Paranext.DataProvider.JsonUtils;

namespace TestParanextDataProvider.JsonUtils;

[TestFixture]
public class InventoryOptionValueConverterTests
{
    private JsonSerializerOptions _serializationOptions = null!;

    [SetUp]
    public void Setup()
    {
        _serializationOptions = SerializationOptions.CreateSerializationOptions();
    }

    #region Deserialization Tests

    [Test]
    public void Deserialize_BooleanTrue_CorrectlyDeserializes()
    {
        var json = @"{""optionName"": ""enabled"", ""optionValue"": true}";

        var result = JsonSerializer.Deserialize<InventoryOptionValue>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.OptionName, Is.EqualTo("enabled"));
        Assert.That(result.OptionValue, Is.TypeOf<bool>());
        Assert.That(result.OptionValue, Is.EqualTo(true));
    }

    [Test]
    public void Deserialize_BooleanFalse_CorrectlyDeserializes()
    {
        var json = @"{""optionName"": ""disabled"", ""optionValue"": false}";

        var result = JsonSerializer.Deserialize<InventoryOptionValue>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.OptionName, Is.EqualTo("disabled"));
        Assert.That(result.OptionValue, Is.TypeOf<bool>());
        Assert.That(result.OptionValue, Is.EqualTo(false));
    }

    [Test]
    public void Deserialize_StringValue_CorrectlyDeserializes()
    {
        var json = @"{""optionName"": ""level"", ""optionValue"": ""advanced""}";

        var result = JsonSerializer.Deserialize<InventoryOptionValue>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.OptionName, Is.EqualTo("level"));
        Assert.That(result.OptionValue, Is.TypeOf<string>());
        Assert.That(result.OptionValue, Is.EqualTo("advanced"));
    }

    [Test]
    public void Deserialize_NullValue_CorrectlyDeserializes()
    {
        var json = @"{""optionName"": ""optional"", ""optionValue"": null}";

        var result = JsonSerializer.Deserialize<InventoryOptionValue>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.OptionName, Is.EqualTo("optional"));
        Assert.That(result.OptionValue, Is.Null);
    }

    [Test]
    public void Deserialize_EmptyString_CorrectlyDeserializes()
    {
        var json = @"{""optionName"": ""empty"", ""optionValue"": """"}";

        var result = JsonSerializer.Deserialize<InventoryOptionValue>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.OptionName, Is.EqualTo("empty"));
        Assert.That(result.OptionValue, Is.TypeOf<string>());
        Assert.That(result.OptionValue, Is.EqualTo(string.Empty));
    }

    [Test]
    public void Deserialize_ListOfMixedValues_CorrectlyDeserializes()
    {
        var json =
            @"[
            {""optionName"": ""enabled"", ""optionValue"": true},
            {""optionName"": ""mode"", ""optionValue"": ""strict""},
            {""optionName"": ""disabled"", ""optionValue"": false},
            {""optionName"": ""optional"", ""optionValue"": null}
        ]";

        var result = JsonSerializer.Deserialize<List<InventoryOptionValue>>(
            json,
            _serializationOptions
        );

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Count, Is.EqualTo(4));

        // Check first item (boolean true)
        Assert.That(result[0].OptionName, Is.EqualTo("enabled"));
        Assert.That(result[0].OptionValue, Is.TypeOf<bool>());
        Assert.That(result[0].OptionValue, Is.EqualTo(true));

        // Check second item (string)
        Assert.That(result[1].OptionName, Is.EqualTo("mode"));
        Assert.That(result[1].OptionValue, Is.TypeOf<string>());
        Assert.That(result[1].OptionValue, Is.EqualTo("strict"));

        // Check third item (boolean false)
        Assert.That(result[2].OptionName, Is.EqualTo("disabled"));
        Assert.That(result[2].OptionValue, Is.TypeOf<bool>());
        Assert.That(result[2].OptionValue, Is.EqualTo(false));

        // Check fourth item (null)
        Assert.That(result[3].OptionName, Is.EqualTo("optional"));
        Assert.That(result[3].OptionValue, Is.Null);
    }

    [Test]
    public void Deserialize_InvalidTokenType_ThrowsJsonException()
    {
        var json = @"{""optionName"": ""invalid"", ""optionValue"": 123}";

        Assert.Throws<JsonException>(
            () => JsonSerializer.Deserialize<InventoryOptionValue>(json, _serializationOptions)
        );
    }

    [Test]
    public void Deserialize_InvalidTokenTypeArray_ThrowsJsonException()
    {
        var json = @"{""optionName"": ""invalid"", ""optionValue"": [1, 2, 3]}";

        Assert.Throws<JsonException>(
            () => JsonSerializer.Deserialize<InventoryOptionValue>(json, _serializationOptions)
        );
    }

    [Test]
    public void Deserialize_InvalidTokenTypeObject_ThrowsJsonException()
    {
        var json = @"{""optionName"": ""invalid"", ""optionValue"": {""nested"": ""object""}}";

        Assert.Throws<JsonException>(
            () => JsonSerializer.Deserialize<InventoryOptionValue>(json, _serializationOptions)
        );
    }

    [Test]
    public void Deserialize_MissingOptionName_ThrowsJsonException()
    {
        var json = @"{""optionValue"": true}";

        Assert.Throws<JsonException>(
            () => JsonSerializer.Deserialize<InventoryOptionValue>(json, _serializationOptions)
        );
    }

    [Test]
    public void Deserialize_MissingOptionValue_ThrowsJsonException()
    {
        var json = @"{""optionName"": ""enabled""}";

        Assert.Throws<JsonException>(
            () => JsonSerializer.Deserialize<InventoryOptionValue>(json, _serializationOptions)
        );
    }

    #endregion

    #region Serialization Tests

    [Test]
    public void Serialize_BooleanTrue_ProducesCorrectJson()
    {
        var value = new InventoryOptionValue { OptionName = "enabled", OptionValue = true };

        var json = JsonSerializer.Serialize(value, _serializationOptions);

        Assert.That(json, Is.EqualTo(@"{""optionName"":""enabled"",""optionValue"":true}"));
    }

    [Test]
    public void Serialize_BooleanFalse_ProducesCorrectJson()
    {
        var value = new InventoryOptionValue { OptionName = "disabled", OptionValue = false };

        var json = JsonSerializer.Serialize(value, _serializationOptions);

        Assert.That(json, Is.EqualTo(@"{""optionName"":""disabled"",""optionValue"":false}"));
    }

    [Test]
    public void Serialize_StringValue_ProducesCorrectJson()
    {
        var value = new InventoryOptionValue { OptionName = "level", OptionValue = "advanced" };

        var json = JsonSerializer.Serialize(value, _serializationOptions);

        Assert.That(json, Is.EqualTo(@"{""optionName"":""level"",""optionValue"":""advanced""}"));
    }

    [Test]
    public void Serialize_NullValue_ProducesCorrectJson()
    {
        var value = new InventoryOptionValue { OptionName = "optional", OptionValue = null };

        var json = JsonSerializer.Serialize(value, _serializationOptions);

        Assert.That(json, Is.EqualTo(@"{""optionName"":""optional"",""optionValue"":null}"));
    }

    [Test]
    public void Serialize_EmptyString_ProducesCorrectJson()
    {
        var value = new InventoryOptionValue { OptionName = "empty", OptionValue = string.Empty };

        var json = JsonSerializer.Serialize(value, _serializationOptions);

        Assert.That(json, Is.EqualTo(@"{""optionName"":""empty"",""optionValue"":""""}"));
    }

    [Test]
    public void Serialize_ListOfMixedValues_ProducesCorrectJson()
    {
        var values = new List<InventoryOptionValue>
        {
            new() { OptionName = "enabled", OptionValue = true },
            new() { OptionName = "mode", OptionValue = "strict" },
            new() { OptionName = "disabled", OptionValue = false },
            new() { OptionName = "optional", OptionValue = null },
        };

        var json = JsonSerializer.Serialize(values, _serializationOptions);

        var expected =
            @"[{""optionName"":""enabled"",""optionValue"":true},"
            + @"{""optionName"":""mode"",""optionValue"":""strict""},"
            + @"{""optionName"":""disabled"",""optionValue"":false},"
            + @"{""optionName"":""optional"",""optionValue"":null}]";

        Assert.That(json, Is.EqualTo(expected));
    }

    [Test]
    public void Serialize_InvalidType_ThrowsJsonException()
    {
        var value = new InventoryOptionValue { OptionName = "invalid", OptionValue = 123 };

        Assert.Throws<JsonException>(() => JsonSerializer.Serialize(value, _serializationOptions));
    }

    #endregion

    #region Round-trip Tests

    [Test]
    public void RoundTrip_BooleanTrue_PreservesValue()
    {
        var original = new InventoryOptionValue { OptionName = "enabled", OptionValue = true };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var deserialized = JsonSerializer.Deserialize<InventoryOptionValue>(
            json,
            _serializationOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.OptionName, Is.EqualTo(original.OptionName));
        Assert.That(deserialized.OptionValue, Is.TypeOf<bool>());
        Assert.That(deserialized.OptionValue, Is.EqualTo(original.OptionValue));
    }

    [Test]
    public void RoundTrip_BooleanFalse_PreservesValue()
    {
        var original = new InventoryOptionValue { OptionName = "disabled", OptionValue = false };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var deserialized = JsonSerializer.Deserialize<InventoryOptionValue>(
            json,
            _serializationOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.OptionName, Is.EqualTo(original.OptionName));
        Assert.That(deserialized.OptionValue, Is.TypeOf<bool>());
        Assert.That(deserialized.OptionValue, Is.EqualTo(original.OptionValue));
    }

    [Test]
    public void RoundTrip_StringValue_PreservesValue()
    {
        var original = new InventoryOptionValue { OptionName = "level", OptionValue = "advanced" };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var deserialized = JsonSerializer.Deserialize<InventoryOptionValue>(
            json,
            _serializationOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.OptionName, Is.EqualTo(original.OptionName));
        Assert.That(deserialized.OptionValue, Is.TypeOf<string>());
        Assert.That(deserialized.OptionValue, Is.EqualTo(original.OptionValue));
    }

    [Test]
    public void RoundTrip_NullValue_PreservesValue()
    {
        var original = new InventoryOptionValue { OptionName = "optional", OptionValue = null };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var deserialized = JsonSerializer.Deserialize<InventoryOptionValue>(
            json,
            _serializationOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.OptionName, Is.EqualTo(original.OptionName));
        Assert.That(deserialized.OptionValue, Is.Null);
    }

    [Test]
    public void RoundTrip_ListOfMixedValues_PreservesAllValues()
    {
        var original = new List<InventoryOptionValue>
        {
            new() { OptionName = "enabled", OptionValue = true },
            new() { OptionName = "mode", OptionValue = "strict" },
            new() { OptionName = "disabled", OptionValue = false },
            new() { OptionName = "optional", OptionValue = null },
        };

        var json = JsonSerializer.Serialize(original, _serializationOptions);
        var deserialized = JsonSerializer.Deserialize<List<InventoryOptionValue>>(
            json,
            _serializationOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.Count, Is.EqualTo(original.Count));

        for (int i = 0; i < original.Count; i++)
        {
            Assert.That(deserialized[i].OptionName, Is.EqualTo(original[i].OptionName));
            if (original[i].OptionValue == null)
            {
                Assert.That(deserialized[i].OptionValue, Is.Null);
            }
            else
            {
                Assert.That(
                    deserialized[i].OptionValue,
                    Is.TypeOf(original[i].OptionValue!.GetType())
                );
                Assert.That(deserialized[i].OptionValue, Is.EqualTo(original[i].OptionValue));
            }
        }
    }

    #endregion
}
