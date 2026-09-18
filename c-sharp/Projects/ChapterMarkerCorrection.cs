using System.Text.RegularExpressions;
using PtxUtils;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Makes the <c>\c</c> marker in a chapter of USFM agree with the chapter that USFM is being
/// written to, so Paratext will accept the write.
/// </summary>
/// <remarks>
/// <para>
/// <c>ScrText.ValidateChapterNumber</c> refuses a chapter write whose chapter marker disagrees with
/// the chapter being written: a wrong number, a second marker in the middle of the chapter, and a
/// deleted marker are all hard rejections. Because the rejection does not repair whatever produced
/// the bad marker, a chapter left in that state fails EVERY later write too — so the USFM is
/// corrected on the way to disk rather than handed to Paratext to reject.
/// </para>
/// <para>
/// This is the backstop for writers that do not correct their own content. The Scripture editor
/// corrects its document before sending it, and tells the user it did, so for editor traffic there
/// is normally nothing left here to correct; correction here is silent apart from a log line.
/// </para>
/// <para>
/// Ported from Paratext 9's <c>UsfmEditorTextLoader.FixChapterNumbers</c>, keeping its behavior —
/// including the two shapes chapter 1 alone allows: an introduction ahead of the chapter marker,
/// and a chapter that is introduction only and so carries no chapter marker at all.
/// </para>
/// </remarks>
internal static partial class ChapterMarkerCorrection
{
    /// <summary>
    /// Matches a chapter marker along with the number and line break belonging to it, so a marker
    /// can be lifted out whole. The number is optional because a marker whose number has been
    /// deleted (<c>\c \s Section Head</c>) is one of the shapes needing correction.
    /// </summary>
    [GeneratedRegex(@"\\c\s+\d*(\r\n)?")]
    private static partial Regex ChapterMarkerRegex();

    /// <summary>
    /// Returns <paramref name="usfm"/> carrying the one chapter marker it is allowed, correctly
    /// numbered and in the place it belongs, or <paramref name="usfm"/> itself when it needs no
    /// correction — which includes a chapter 1 that is introduction only and so has no marker.
    /// </summary>
    /// <param name="usfm">USFM for a single chapter.</param>
    /// <param name="chapterNum">The chapter <paramref name="usfm"/> is being written to.</param>
    /// <param name="wasCorrected">
    /// Whether the returned USFM differs from what was passed in.
    /// </param>
    /// <remarks>
    /// Correcting also normalizes line endings to CRLF, as Paratext's own USFM does; USFM that
    /// needs no correction comes back exactly as it arrived, line endings included.
    /// </remarks>
    public static string FixChapterMarkers(string usfm, int chapterNum, out bool wasCorrected)
    {
        // Only a write aimed at a single chapter knows which marker is the right one. A book-level
        // write legitimately carries a marker per chapter, so it must be left alone.
        if (chapterNum <= 0)
        {
            wasCorrected = false;
            return usfm;
        }

        var normalizedUsfm = StringUtils.Unix2Dos(usfm);
        var chapterMarkers = ChapterMarkerRegex().Matches(normalizedUsfm);
        var correctedUsfm =
            chapterNum == 1
                ? CorrectFirstChapter(normalizedUsfm, chapterMarkers)
                : CorrectLaterChapter(normalizedUsfm, chapterMarkers, chapterNum);

        wasCorrected = correctedUsfm != null;
        return correctedUsfm ?? usfm;
    }

    /// <summary>
    /// Corrects the markers of a chapter 1, whose marker may sit after an introduction instead of
    /// at the start of the chapter, or be absent altogether. Returns null when nothing needs
    /// correcting.
    /// </summary>
    private static string? CorrectFirstChapter(string usfm, MatchCollection chapterMarkers)
    {
        // A chapter 1 that is book introduction only (e.g. Jude) has no chapter marker to correct.
        if (chapterMarkers.Count == 0)
            return null;

        var expectedMarker = $"\\c 1{StringUtils.Crlf}";
        // The surviving marker stays where it stands rather than moving to the start of the
        // chapter, because what sits ahead of it is the author's introduction. Start from the last
        // marker; the walk below moves that choice earlier when an earlier one starts Scripture.
        var keepIndex = chapterMarkers[^1].Index;

        if (chapterMarkers.Count == 1 && StartsWithAt(usfm, keepIndex, expectedMarker))
            return null;

        // Working back from the last marker, every earlier marker that does NOT open more
        // introduction takes over as the one to keep, leaving the earliest marker that starts real
        // Scripture — or the last marker, when every one of them opens introduction.
        for (var i = chapterMarkers.Count - 2; i >= 0; i--)
        {
            var marker = chapterMarkers[i];
            // Read from the line break the marker ends with, so what is tested is whether the next
            // line starts an introduction marker. The offset is Paratext 9's own
            // (`capture.Index + capture.Length - 2`), so keep it: reading from the end of the match
            // instead looks like the same thing and is not, because the regex's trailing line break
            // is optional and a marker that matched without one would then be read differently.
            var markerLineBreakIndex = marker.Index + marker.Length - StringUtils.Crlf.Length;
            if (!StartsWithAt(usfm, markerLineBreakIndex, $"{StringUtils.Crlf}\\i"))
                keepIndex = marker.Index;
        }

        // Take every marker out — working backwards so the remaining matches keep their indexes —
        // tracking where the kept marker's spot slides to as earlier text disappears.
        var strippedUsfm = usfm;
        for (var i = chapterMarkers.Count - 1; i >= 0; i--)
        {
            var marker = chapterMarkers[i];
            if (marker.Index < keepIndex)
                keepIndex -= marker.Length;
            strippedUsfm = strippedUsfm.Remove(marker.Index, marker.Length);
        }

        return strippedUsfm.Insert(keepIndex, expectedMarker);
    }

    /// <summary>
    /// Corrects the markers of any chapter after the first, which must open with its own marker and
    /// carry no other. Returns null when nothing needs correcting.
    /// </summary>
    private static string? CorrectLaterChapter(
        string usfm,
        MatchCollection chapterMarkers,
        int chapterNum
    )
    {
        var expectedMarker = $"\\c {chapterNum}{StringUtils.Crlf}";
        if (chapterMarkers.Count == 1 && usfm.StartsWith(expectedMarker, StringComparison.Ordinal))
            return null;

        // Take every marker out — working backwards so the remaining matches keep their indexes.
        var strippedUsfm = usfm;
        for (var i = chapterMarkers.Count - 1; i >= 0; i--)
            strippedUsfm = strippedUsfm.Remove(chapterMarkers[i].Index, chapterMarkers[i].Length);

        return expectedMarker + strippedUsfm;
    }

    /// <summary>
    /// Whether <paramref name="text"/> reads as <paramref name="value"/> from
    /// <paramref name="index"/> onward.
    /// </summary>
    private static bool StartsWithAt(string text, int index, string value)
    {
        return text.AsSpan(index).StartsWith(value, StringComparison.Ordinal);
    }
}
