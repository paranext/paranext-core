using System.Text.Json;
using System.Text.Json.Nodes;
using Paranext.DataProvider.Checks;
using SIL.Scripture;

namespace Paranext.DataProvider.JsonUtils;

internal static class CheckInputRangeConverter
{
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

            if (
                !VerseRefConverter.TryCreateVerseRef(
                    startJson,
                    out VerseRef start,
                    out string startError
                )
            )
                throw new ArgumentException($"Invalid VerseRef \"{startJson}\": {startError}");

            if (string.IsNullOrEmpty(endJson))
            {
                retVal.Add(new CheckInputRange(projectId, start, null));
                continue;
            }

            if (
                !VerseRefConverter.TryCreateVerseRef(endJson, out VerseRef end, out string endError)
            )
                throw new ArgumentException($"Invalid VerseRef \"{endJson}\": {endError}");

            retVal.Add(new CheckInputRange(projectId, start, end));
        }
        return retVal.ToArray();
    }
}
