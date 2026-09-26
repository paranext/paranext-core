using Paratext.Data;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Decides how much text may be copied at once from each chapter of a book, counted in UTF-16 code
/// units.
/// </summary>
/// <remarks>
/// Scaffolding: Paratext 10 replaces this body. Do not rename, move, or change the signature —
/// doing so breaks the Paratext 10 patch.
/// </remarks>
internal static class ResourceCopyLimit
{
    /// <summary>
    /// Maximum number of UTF-16 code units (.NET <c>string.Length</c>, not grapheme clusters) that
    /// may be copied at once from each chapter of
    /// <paramref name="bookNum"/>, indexed by chapter number in <paramref name="scrText"/>'s own
    /// versification (index 0 is unused). A <c>null</c> entry, or a <c>null</c> result, means no
    /// limit. An implementation may impose a per-chapter limit on some texts.
    /// </summary>
    public static int?[]? GetBookCopyLimits(ScrText scrText, int bookNum) => null;
}
