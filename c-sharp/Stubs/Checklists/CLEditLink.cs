namespace Paranext.DataProvider.Stubs.Checklists;

/// <summary>
/// Stub mirror of PT9's <c>Paratext.Checklists.CLEditLink</c>: the trailing "edit" link a user can
/// click to pop up an edit window for a cell.
/// </summary>
/// <remarks>
/// Depends on: ParatextChecks relocated checklist data logic (not yet shipped)
/// Created: 2026-05-29
/// Replace when: ParatextChecks ships the relocated checklist data logic
/// </remarks>
public class CLEditLink : CLParagraphContents
{
    /// <summary>Reference, e.g. "GEN 3:11".</summary>
    public string? Reference;

    /// <summary>Localized "edit" link text.</summary>
    public string? EditLinkText;
}
