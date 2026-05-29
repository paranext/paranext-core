using SIL.Scripture;

namespace Paranext.DataProvider.Stubs.Checklists;

/// <summary>
/// Stub mirror of PT9's <c>Paratext.Checklists.CLCell</c>: the info for a single cell of a
/// checklist (commonly info from a single verse of a single project).
/// </summary>
/// <remarks>
/// Depends on: ParatextChecks relocated checklist data logic (not yet shipped)
/// Created: 2026-05-29
/// Replace when: ParatextChecks ships the relocated checklist data logic
///
/// Shape note: PT9 derives <c>Reference</c>/<c>DisplayedReference</c> from a
/// <c>SIL.Scripture.VerseRef</c> via the <c>VerseRef</c> property setter. This stub keeps both the
/// <see cref="Reference"/> string (set directly from golden-master data) and the <see cref="VerseRef"/>
/// property so consumers compile against the same surface.
/// </remarks>
public class CLCell
{
    /// <summary>Name of the project (text) this cell came from.</summary>
    public string? ScrTextName;

    /// <summary>Canonical reference string, e.g. "GEN 3:11".</summary>
    public string Reference = "";

    /// <summary>Localized reference string, e.g. "Gn 3.11".</summary>
    public string DisplayedReference = "";

    /// <summary>Language id of the cell's text.</summary>
    public string? Language;

    public List<CLParagraph> Paragraphs = [];

    private VerseRef _verseRef;

    public CLCell() { }

    public CLCell(VerseRef verseRef, string scrTextName, string language)
    {
        VerseRef = verseRef;
        ScrTextName = scrTextName;
        Language = language;
    }

    /// <summary>
    /// Setting this updates <see cref="Reference"/> and <see cref="DisplayedReference"/>, mirroring PT9.
    /// </summary>
    public VerseRef VerseRef
    {
        get => _verseRef;
        set
        {
            _verseRef = value;
            if (!_verseRef.IsDefault)
            {
                Reference = _verseRef.ToString();
                // PT9 sets DisplayedReference = verseRef.ToLocalizedString(). The stub uses the
                // canonical string form; the localized form is not exercised by the golden masters.
                DisplayedReference = _verseRef.ToString();
            }
            else
            {
                Reference = "";
                DisplayedReference = "";
            }
        }
    }
}
