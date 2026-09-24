using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.NetworkObjects.Documentation;

namespace TestParanextDataProvider.NetworkObjects.Documentation;

/// <summary>
/// Verifies that C#-authored network object documentation serializes to the exact JSON wire shape
/// the main process expects for the optional second <c>network:registerMethod</c> argument (the
/// TypeScript <c>SingleMethodDocumentation</c> type), so C#-registered methods surface correctly —
/// including <c>x-experimental: true</c> — in the live OpenRPC document. The DummyPapiClient test
/// double ignores documentation, so this serialization contract is exercised here instead.
/// </summary>
[TestFixture]
public class ExperimentalMethodDocumentationTests
{
    private JsonSerializerOptions _options = null!;

    [SetUp]
    public void Setup() => _options = SerializationOptions.CreateSerializationOptions();

    [Test]
    public void Create_SerializesToExpectedOpenRpcWireShape()
    {
        var doc = ExperimentalMethodDocumentation.Create(
            "Does the thing",
            [ExperimentalMethodDocumentation.Param("input", "The input.", "object")],
            ExperimentalMethodDocumentation.ResultOf("string", "The output")
        );

        var json = JsonSerializer.Serialize(doc, _options);
        using var parsed = JsonDocument.Parse(json);
        var root = parsed.RootElement;

        // SingleMethodDocumentation wrapper -> { "method": { ... } }
        Assert.That(root.TryGetProperty("method", out var method), Is.True);

        // x-experimental must use the kebab-case key (not camelCased) and be true
        Assert.That(method.TryGetProperty("x-experimental", out var experimental), Is.True);
        Assert.That(experimental.GetBoolean(), Is.True);
        Assert.That(method.GetProperty("summary").GetString(), Is.EqualTo("Does the thing"));

        var parameters = method.GetProperty("params");
        Assert.That(parameters.GetArrayLength(), Is.EqualTo(1));
        var firstParam = parameters[0];
        Assert.That(firstParam.GetProperty("name").GetString(), Is.EqualTo("input"));
        Assert.That(firstParam.GetProperty("required").GetBoolean(), Is.True);
        Assert.That(
            firstParam.GetProperty("schema").GetProperty("type").GetString(),
            Is.EqualTo("object")
        );

        var result = method.GetProperty("result");
        Assert.That(result.GetProperty("name").GetString(), Is.EqualTo("return value"));
        Assert.That(
            result.GetProperty("schema").GetProperty("type").GetString(),
            Is.EqualTo("string")
        );
    }

    [Test]
    public void Create_OmitsNullOptionalFieldsAndDefaultsParamsAndResult()
    {
        var doc = ExperimentalMethodDocumentation.Create("Summary only");

        var json = JsonSerializer.Serialize(doc, _options);

        // Never-set optional fields must be omitted (WhenWritingNull), not serialized as null.
        Assert.That(json, Does.Not.Contain("\"description\""));

        using var parsed = JsonDocument.Parse(json);
        var method = parsed.RootElement.GetProperty("method");
        Assert.That(method.GetProperty("x-experimental").GetBoolean(), Is.True);
        // params defaults to an empty array; result defaults to an object-typed "return value".
        Assert.That(method.GetProperty("params").GetArrayLength(), Is.EqualTo(0));
        Assert.That(
            method.GetProperty("result").GetProperty("schema").GetProperty("type").GetString(),
            Is.EqualTo("object")
        );
    }
}
