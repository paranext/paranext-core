using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Represents a single error/issue flagged by a check in a given project. This class must
/// serialize/deserialize to the CheckRunResult type defined in TypeScript.
/// </summary>
public sealed class CheckRunResult(
    string checkId,
    string projectId,
    string messageFormatString,
    string text,
    CheckLocation start,
    CheckLocation end
) : IEquatable<CheckRunResult>
{
    public string CheckId { get; } = checkId;
    public string ProjectId { get; } = projectId;
    public string MessageFormatString { get; } = messageFormatString;

    [JsonIgnore]
    public string Text { get; } = text;
    public CheckLocation Start { get; } = start;
    public CheckLocation End { get; } = end;

    public override bool Equals(object? obj)
    {
        return obj is CheckRunResult checkRunResult && Equals(checkRunResult);
    }

    public bool Equals(CheckRunResult? other)
    {
        if (ReferenceEquals(other, null))
            return false;

        return CheckId == other.CheckId
            && ProjectId == other.ProjectId
            && MessageFormatString == other.MessageFormatString
            && Text == other.Text
            && Start == other.Start
            && End == other.End;
    }

    public static bool operator ==(CheckRunResult a, CheckRunResult b)
    {
        return a.Equals(b);
    }

    public static bool operator !=(CheckRunResult a, CheckRunResult b)
    {
        return !(a == b);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(CheckId, ProjectId, MessageFormatString, Text, Start, End);
    }
}
