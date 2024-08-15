using System.Text.Json;
using System.Text.Json.Nodes;
using Paranext.DataProvider.Checks;
using SIL.Scripture;

namespace Paranext.DataProvider.JsonUtils;

internal static class CheckInputRangeConverter
{
    private static readonly JsonSerializerOptions s_serializerOptions =
        SerializationOptions.CreateSerializationOptions();

    public static CheckInputRange[] CreateCheckInputRangeArray(JsonNode? inputNode)
    {
        ArgumentNullException.ThrowIfNull(inputNode);

        var retVal = new List<CheckInputRange>();
        foreach (var node in inputNode.AsArray())
        {
            if (node == null)
                throw new ArgumentException("All input ranges must be non-null");

            string? projectId = node["projectId"]?.Deserialize<string>();
            string? startJson = node["start"]?.ToJsonString();
            string? endJson = node["end"]?.ToJsonString();

            if (string.IsNullOrEmpty(projectId) || string.IsNullOrEmpty(startJson))
                throw new ArgumentException("projectId and start must not be null");

            VerseRef start = JsonSerializer.Deserialize<VerseRef>(startJson, s_serializerOptions);
            VerseRef? end = string.IsNullOrEmpty(endJson)
                ? null
                : JsonSerializer.Deserialize<VerseRef>(endJson, s_serializerOptions);
            retVal.Add(new CheckInputRange(projectId, start, end));
        }
        return [.. retVal];
    }
}
