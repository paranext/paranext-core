using Paratext.Data;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Decides how much text may be copied at once from each chapter of a book, counted in UTF-16 code
/// units.
/// </summary>
/// <remarks>
/// Scaffolding: Paratext 10 replaces this body. Do not rename, move, or change the signature —
/// doing so breaks the Paratext 10 patch. A test pins the signature.
///
/// An implementation that returns an array must:
/// <list type="bullet">
/// <item>make it cover every chapter of the book, so its length is at least
/// <c>scrText.Settings.Versification.GetLastChapter(bookNum) + 1</c>. The array is returned to the
/// caller as it is, and a chapter past its end reads as having no limit.</item>
/// <item>return an array it will not change afterwards — a new one, or a copy of any it caches. The
/// array is handed on as it is and serialized after the call returns.</item>
/// </list>
/// </remarks>
internal static class ResourceCopyLimit
{
    /// <summary>
    /// Maximum number of UTF-16 code units (.NET <c>string.Length</c>, not grapheme clusters) that
    /// may be copied at once from each chapter of <paramref name="bookNum"/>, indexed like the
    /// chapter-text endpoints, by <paramref name="scrText"/>'s own chapter numbers (index 0 is
    /// unused). A <c>null</c> entry, or a <c>null</c> result, means no limit. An implementation may
    /// impose a per-chapter limit on some texts.
    /// </summary>
    public static int?[]? GetBookCopyLimits(ScrText scrText, int bookNum) => null;
}
