using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

public sealed class CheckLocation(VerseRef verseRef, int offset): IEquatable<CheckLocation>
{
    public VerseRef VerseRef { get; } = verseRef;
    public int Offset { get; } = offset;

    public override bool Equals(object? obj)
    {
        return obj is CheckLocation checkLocation && Equals(checkLocation);
    }

    public bool Equals(CheckLocation? other)
    {
        if (ReferenceEquals(other, null))
            return false;

        return VerseRef.BBBCCCVVV == other.VerseRef.BBBCCCVVV && Offset == other.Offset;
    }

    public static bool operator ==(CheckLocation a, CheckLocation b)
    {
        return a.Equals(b);
    }

    public static bool operator !=(CheckLocation a, CheckLocation b)
    {
        return !(a == b);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(VerseRef.BBBCCCVVV, Offset);
    }
}
