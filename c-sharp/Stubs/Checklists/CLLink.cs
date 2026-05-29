namespace Paranext.DataProvider.Stubs.Checklists;

/// <summary>
/// Stub mirror of PT9's <c>Paratext.Checklists.CLLink</c>: a link to a reference with a smaller size.
/// </summary>
/// <remarks>
/// Depends on: ParatextChecks relocated checklist data logic (not yet shipped)
/// Created: 2026-05-29
/// Replace when: ParatextChecks ships the relocated checklist data logic
/// </remarks>
public class CLLink : CLParagraphContents
{
    /// <summary>Reference, e.g. "GEN 3:11".</summary>
    public string? Reference;

    public string? LinkText;
}
