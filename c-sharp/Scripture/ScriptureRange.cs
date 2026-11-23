using System.Linq;
using System.Text.Json.Serialization;
using SIL.Scripture;

namespace Paranext.DataProvider.Scripture;

// === NEW IN PT10 ===
// The canonical paranext-core scripture *range* type — a start verse plus an optional end
// verse. `VerseRef` (SIL.Scripture) remains the canonical single *reference*; this record is
// the canonical two-point range. It mirrors the TypeScript `ScriptureRange`
// (`extensions/src/platform-scripture/src/types/platform-scripture.d.ts` —
// `{ start: SerializedVerseRef; end?: SerializedVerseRef }`).
//
// Originally introduced for the markers checklist and promoted to this shared namespace so
// the whole C# data provider shares one range type instead of three divergent ones
// (Checklists, Checks `InputRange`, Comments). `Checks.InputRange` and
// `Projects.CommentScriptureRange` derive from this record.
// See working-docs/csharp-scripture-range-canonicalization-design.md.
//
// EXPLANATION:
// `VerseRef` serializes to the canonical scripture-reference wire shape via the repo-wide
// `VerseRefConverter` (registered in `JsonUtils/SerializationOptions.cs`). The two static
// factories are the one canonical conversion from a (possibly-bridged)
// `SIL.Scripture.VerseRef` — used by the Checklists cell/row builders. Producers that
// already hold explicit start/end points construct the record directly.
/// <summary>
/// A scripture verse range: a start verse plus an optional end verse. Bridge-capable —
/// <c>{Start}</c> alone is a single verse; <c>{Start, End}</c> is a verse bridge or a
/// multi-verse range. The canonical paranext-core scripture-range type; serializes via the
/// repo-wide <c>VerseRefConverter</c>.
/// </summary>
[method: JsonConstructor]
public record ScriptureRange(VerseRef Start, VerseRef? End)
{
    /// <summary>
    /// Builds a <see cref="ScriptureRange"/> from a single, possibly-bridged
    /// <see cref="VerseRef"/>. A bridge (e.g. <c>EXO 20:2-5</c>) yields
    /// <c>{Start = EXO 20:2, End = EXO 20:5}</c>; a single verse yields
    /// <c>{Start, End = null}</c>. Returns null when <paramref name="verseRef"/> is the
    /// default (no reference).
    /// </summary>
    public static ScriptureRange? FromVerseRef(VerseRef verseRef)
    {
        return verseRef.IsDefault ? null : FromBounds(verseRef, verseRef);
    }

    /// <summary>
    /// Builds a <see cref="ScriptureRange"/> spanning from the first verse of
    /// <paramref name="start"/> through the last verse of <paramref name="end"/> (either may
    /// itself be bridged). Returns null when <paramref name="start"/> is the default. The end
    /// point is left null when it equals the start — i.e. a single verse, not a bridge.
    /// </summary>
    public static ScriptureRange? FromBounds(VerseRef start, VerseRef end)
    {
        if (start.IsDefault)
            return null;

        VerseRef startPoint = FirstVerseOf(start);
        VerseRef endPoint = LastVerseOf(end.IsDefault ? start : end);
        return startPoint.Equals(endPoint)
            ? new ScriptureRange(startPoint, null)
            : new ScriptureRange(startPoint, endPoint);
    }

    // VerseRef.AllVerses() expands a bridge into its individual verses. It can throw on a
    // malformed/edge reference (e.g. a chapter-intro "verse 0"); the try/catch + IsDefault
    // fallback mirror the defensive parsing already used in ChecklistRowBuilder so a single
    // odd reference never crashes the build pipeline.
    private static VerseRef FirstVerseOf(VerseRef verseRef)
    {
        try
        {
            VerseRef first = verseRef.AllVerses().FirstOrDefault();
            return first.IsDefault ? verseRef : first;
        }
        catch
        {
            return verseRef;
        }
    }

    private static VerseRef LastVerseOf(VerseRef verseRef)
    {
        try
        {
            VerseRef last = verseRef.AllVerses(true).LastOrDefault();
            return last.IsDefault ? verseRef : last;
        }
        catch
        {
            return verseRef;
        }
    }
}
