namespace Paranext.DataProvider.Stubs.Checklists;

/// <summary>
/// Stub mirror of PT9's <c>Paratext.Checklists.CLParagraph</c>: info for a single paragraph of a
/// single cell of a single project.
/// </summary>
/// <remarks>
/// Depends on: ParatextChecks relocated checklist data logic (not yet shipped)
/// Created: 2026-05-29
/// Replace when: ParatextChecks ships the relocated checklist data logic
/// </remarks>
public class CLParagraph
{
    /// <summary>USFM marker, e.g. "p".</summary>
    public string? Marker;

    public List<CLParagraphContents> Items = [];
}
