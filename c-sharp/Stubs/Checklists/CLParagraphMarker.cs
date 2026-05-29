namespace Paranext.DataProvider.Stubs.Checklists;

/// <summary>
/// Stub mirror of PT9's <c>Paratext.Checklists.CLParagraphMarker</c>: a paragraph boundary marker.
/// </summary>
/// <remarks>
/// Depends on: ParatextChecks relocated checklist data logic (not yet shipped)
/// Created: 2026-05-29
/// Replace when: ParatextChecks ships the relocated checklist data logic
/// </remarks>
public class CLParagraphMarker : CLParagraphContents
{
    /// <summary>USFM marker. Empty string means default paragraph formatting.</summary>
    public string Marker = "";
}
