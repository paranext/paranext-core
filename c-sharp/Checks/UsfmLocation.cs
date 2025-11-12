using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Represents a specific location in a project's USFM text. The offset is in terms of USFM. This
/// class must serialize/deserialize to the CheckLocation type defined in TypeScript.
/// <br />
/// This differs from a <see cref="InputRange"/> in that this represents a single point that
/// may be in the middle of project text (e.g., partway through a verse). A
/// <see cref="InputRange"/> can only refer to points in the text that are at a book, chapter,
/// or verse boundary. Also, a <see cref="InputRange"/> always represents a range, while a
/// <see cref="UsfmLocation"/> always represents a single point.
/// <br />
/// Note that in TypeScript, a <see cref="UsfmLocation"/> may be represented as a
/// <see cref="SIL.Scripture.VerseRef"/> and offset or as a JsonPath and offset. Paratext knows
/// nothing about USJ and JsonPath, so we can only create <see cref="SIL.Scripture.VerseRef"/>
/// representations in this class. See the TypeScript check data types for more details.
/// </summary>
internal sealed class UsfmLocation(VerseRef verseRef, int offset) : IEquatable<UsfmLocation>
{
    public VerseRef VerseRef { get; } = verseRef;
    public int Offset { get; set; } = offset;

    public override bool Equals(object? obj)
    {
        return obj is UsfmLocation checkLocation && Equals(checkLocation);
    }

    public bool Equals(UsfmLocation? other)
    {
        if (ReferenceEquals(other, null))
            return false;

        return VerseRef.BBBCCCVVV == other.VerseRef.BBBCCCVVV
            && VerseRef.Versification == other.VerseRef.Versification
            && Offset == other.Offset;
    }

    public static bool operator ==(UsfmLocation a, UsfmLocation b)
    {
        return a.Equals(b);
    }

    public static bool operator !=(UsfmLocation a, UsfmLocation b)
    {
        return !(a == b);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(VerseRef.BBBCCCVVV, VerseRef.Versification, Offset);
    }
}
