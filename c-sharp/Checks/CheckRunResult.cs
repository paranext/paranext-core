using System.Text.Json.Serialization;
using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Represents a single error/issue flagged by a check in a given project. This class must
/// serialize/deserialize to the CheckRunResult type defined in TypeScript.
/// </summary>
public sealed record CheckRunResult(
    string CheckId,
    string CheckResultType,
    string ProjectId,
    string MessageFormatString,
    [property: JsonIgnore] string Text,
    bool IsDenied,
    VerseRef VerseRef,
    CheckLocation Start,
    CheckLocation End
) : IEquatable<CheckRunResult>
{
    public bool Equals(CheckRunResult? other)
    {
        if (other is null)
            return false;

        return CheckId == other.CheckId
            && CheckResultType == other.CheckResultType
            && ProjectId == other.ProjectId
            && MessageFormatString == other.MessageFormatString
            && Text == other.Text
            && IsDenied == other.IsDenied
            && VerseRef.ToStringWithVersification() == other.VerseRef.ToStringWithVersification()
            && Start == other.Start
            && End == other.End;
    }

    public override int GetHashCode()
    {
        int hash = HashCode.Combine(
            CheckId,
            CheckResultType,
            ProjectId,
            MessageFormatString,
            Text,
            IsDenied,
            VerseRef,
            Start
        );
        return HashCode.Combine(hash, End);
    }
}
