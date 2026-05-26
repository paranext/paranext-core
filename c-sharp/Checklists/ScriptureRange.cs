using System.Linq;
using System.Text.Json.Serialization;
using SIL.Scripture;

namespace Paranext.DataProvider.Checklists;

// === NEW IN PT10 ===
// Reason: PT9's `VerseRangeChooserForm` holds start/end VerseRefs in form state; the PT10
// PAPI payload needs a serializable record. Originally colocated in `ChecklistRequest.cs`
// (its sole consumer was `ChecklistRequest.VerseRange`, so the PNX004 one-type-per-file
// exclusive-use exception applied). Promoted to its own file when the checklist *result*
// records were retyped from bespoke reference strings to this canonical type — it is now a
// shared Checklists-module type (`ChecklistCell.Reference`, `ChecklistRow.FirstRef`,
// `LinkItem.Reference`, and `ChecklistRequest.VerseRange`), so plain one-type-per-file
// (PNX004) applies and the exclusive-use exception no longer does.
// Maps to: data-contracts.md §2.1 (VerseRange field) + §§3.2/3.3/3.5 (result references)
//
// EXPLANATION:
// `VerseRef` serializes to the canonical scripture-reference wire shape via the repo-wide
// `VerseRefConverter` (registered in `JsonUtils/SerializationOptions.cs`). A `ScriptureRange`
// is the single canonical structured scripture reference used throughout the Checklists
// module — there is no bespoke per-feature reference string. The two static factories funnel
// every producer (the cell builder in `ChecklistService` and the row builder in
// `ChecklistRowBuilder`) through one conversion from `SIL.Scripture.VerseRef`.
/// <summary>
/// A scripture verse range: a start verse plus an optional end verse. Bridge-capable —
/// <c>{Start}</c> alone is a single verse; <c>{Start, End}</c> is a verse bridge. Used both
/// as <see cref="ChecklistRequest.VerseRange"/> (the requested range) and as the structured
/// reference on checklist result records (<see cref="ChecklistCell.Reference"/>,
/// <see cref="ChecklistRow.FirstRef"/>, <see cref="LinkItem.Reference"/>). Serializes via the
/// repo-wide <c>VerseRefConverter</c>. Not to be confused with the unrelated mutable
/// <c>ScriptureRange</c> class in <c>c-sharp/Projects/CommentThreadSelector.cs</c> (different
/// semantics — mutable, required <c>End</c>, carries a <c>Granularity</c> field).
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
