namespace Paranext.DataProvider.Stubs.Checklists;

/// <summary>
/// Stub mirror of PT9's <c>Paratext.Checklists.CLText</c>: an extracted piece of text from a project.
/// </summary>
/// <remarks>
/// Depends on: ParatextChecks relocated checklist data logic (not yet shipped)
/// Created: 2026-05-29
/// Replace when: ParatextChecks ships the relocated checklist data logic
/// </remarks>
public class CLText : CLParagraphContents
{
    /// <summary>
    /// USFM character style marker (e.g. "nd"). Empty string means default paragraph formatting.
    /// </summary>
    public string Marker = "";

    /// <summary>The text content.</summary>
    public string Text = "";

    public CLText() { }

    public CLText(string text)
        : this(text, "") { }

    public CLText(string text, string marker)
    {
        Marker = marker;
        Text = text;
    }
}
