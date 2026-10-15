using System.Diagnostics;

namespace Paranext.DataProvider.ParatextUtils;

/// <summary>
/// A <see cref="TraceListener"/> that searches for a specific text in the trace output.
/// Some Paratext errors are not thrown as exceptions, but are written to the trace output.
/// This class can be used to search for specific text in the trace output.
/// </summary>
/// <remarks>
/// Trace listeners are process-global: once added to <see cref="Trace.Listeners"/>, a listener
/// receives every trace written anywhere in the process, synchronously on the thread that wrote
/// it. A listener added around one call can therefore be tripped by an unrelated call that is
/// running concurrently on another thread and traces the same text (for example, a REST call that
/// fails with the same error on a background thread).
///
/// Pass <c>currentThreadOnly: true</c> when the call being watched runs synchronously on the
/// thread that constructs the listener and other threads may trace the same text at the same
/// time. The listener then only considers traces written on that thread. Leave it <c>false</c>
/// when the watched call may trace from other threads, since those traces would be ignored.
/// </remarks>
public class TextSearchingTraceListener : TraceListener
{
    private readonly string _textToFind;

    /// <summary>
    /// The managed thread ID whose traces are considered, or <c>null</c> to consider traces from
    /// every thread.
    /// </summary>
    private readonly int? _threadId;

    /// <param name="textToFind">Text whose appearance in any traced message sets
    /// <see cref="FoundText"/>.</param>
    /// <param name="currentThreadOnly">If <c>true</c>, only messages traced on the thread that
    /// calls this constructor are considered; messages traced on other threads are ignored.</param>
    public TextSearchingTraceListener(string textToFind, bool currentThreadOnly = false)
    {
        _textToFind = textToFind;
        _threadId = currentThreadOnly ? Environment.CurrentManagedThreadId : null;
    }

    public override void Write(string? message) => Search(message);

    public override void WriteLine(string? message) => Search(message);

    public bool FoundText { get; private set; }

    private void Search(string? message)
    {
        if (FoundText)
            return;

        if (_threadId.HasValue && _threadId.Value != Environment.CurrentManagedThreadId)
            return;

        if (!string.IsNullOrEmpty(message) && message.Contains(_textToFind))
            FoundText = true;
    }
}
