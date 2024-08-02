using System.Text.Json.Nodes;

namespace Paranext.DataProvider.Checks;

public sealed class CheckRunResult(
    string checkId,
    string projectId,
    string messageFormatString,
    CheckLocation start,
    CheckLocation end)
    : IEquatable<CheckRunResult>
{
    public string CheckId { get; } = checkId;
    public string ProjectId { get; } = projectId;
    public string MessageFormatString { get; } = messageFormatString;
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
        return HashCode.Combine(CheckId, ProjectId, MessageFormatString, Start, End);
    }
}
