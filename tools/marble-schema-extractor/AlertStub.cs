using System.ComponentModel;
using PtxUtils;

namespace MarbleSchemaExtractor;

/// <summary>
/// No-op <see cref="Alert"/> implementation. Mirrors
/// <c>Paranext.DataProvider.ParatextUtils.AlertStub</c>. Required when any
/// ParatextData code path would otherwise pop a Windows dialog box.
/// </summary>
internal sealed class AlertStub : Alert
{
    protected override AlertResult ShowInternal(
        IComponent? owner,
        string text,
        string caption,
        AlertButtons alertButtons,
        AlertLevel alertLevel,
        AlertDefaultButton defaultButton,
        bool showInTaskbar
    )
    {
        // The extractor never has a UI; just swallow.
        return AlertResult.Negative;
    }

    protected override void ShowLaterInternal(string text, string caption, AlertLevel alertLevel)
    {
        ShowInternal(
            null,
            text,
            caption,
            AlertButtons.Ok,
            alertLevel,
            AlertDefaultButton.Button1,
            false
        );
    }
}
