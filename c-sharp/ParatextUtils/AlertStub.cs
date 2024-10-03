using System.ComponentModel;
using PtxUtils;

namespace Paranext.DataProvider.ParatextUtils
{
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
            if (text.Contains("unable to find a language definition file for English"))
                return AlertResult.Positive;

            Console.WriteLine("Unexpected dialog box:\n" + text);
            return AlertResult.Negative;
        }

        protected override void ShowLaterInternal(
            string text,
            string caption,
            AlertLevel alertLevel
        )
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
}
