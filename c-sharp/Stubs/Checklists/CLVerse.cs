namespace Paranext.DataProvider.Stubs.Checklists;

/// <summary>
/// Stub mirror of PT9's <c>Paratext.Checklists.CLVerse</c>: verse number info within a paragraph.
/// </summary>
/// <remarks>
/// Depends on: ParatextChecks relocated checklist data logic (not yet shipped)
/// Created: 2026-05-29
/// Replace when: ParatextChecks ships the relocated checklist data logic
/// </remarks>
public class CLVerse : CLParagraphContents
{
    public string? ScrTextName;
    public string? Book;
    public string? Chapter;
    public string? Verse;

    /// <summary>Whether the verse number should be shown in the display.</summary>
    public bool ShowInDisplay;

    public CLVerse() { }

    public CLVerse(
        string scrTextName,
        string book,
        string chapter,
        string verse,
        bool showInDisplay = false
    )
    {
        ScrTextName = scrTextName;
        Book = book;
        Chapter = chapter;
        Verse = verse;
        ShowInDisplay = showInDisplay;
    }
}
