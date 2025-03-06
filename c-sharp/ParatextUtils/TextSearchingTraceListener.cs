using System.Diagnostics;

namespace Paranext.DataProvider.ParatextUtils;

/// <summary>
/// A <see cref="TraceListener"/> that searches for a specific text in the trace output.</br>
/// Some Paratext errors are not thrown as exceptions, but are written to the trace output.
/// This class can be used to search for specific text in the trace output.
/// </summary>
public class TextSearchingTraceListener : TraceListener
{
    private readonly string _textToFind;

    public TextSearchingTraceListener(string textToFind)
    {
        _textToFind = textToFind;
    }

    public override void Write(string? message)
    {
        if (FoundText)
            return;

        if (!string.IsNullOrEmpty(message) && message.Contains(_textToFind))
            FoundText = true;
    }

    public override void WriteLine(string? message)
    {
        if (FoundText)
            return;

        if (!string.IsNullOrEmpty(message) && message.Contains(_textToFind))
            FoundText = true;
    }

    public bool FoundText { get; private set; }
}
