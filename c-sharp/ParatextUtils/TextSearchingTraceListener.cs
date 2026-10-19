using System.Diagnostics;

namespace Paranext.DataProvider.ParatextUtils;

/// <summary>
/// A <see cref="TraceListener"/> that searches for a specific text in the trace output.
/// Some Paratext errors are not thrown as exceptions, but are written to the trace output.
/// This class can be used to search for specific text in the trace output.
/// </summary>
/// <remarks>
/// Callers should use <see cref="WasTracedDuring(string, Action, bool)"/> rather than adding a
/// listener to <see cref="Trace.Listeners"/> themselves: it attaches the listener for exactly the
/// duration of one call and removes it again even when that call throws.
///
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

    /// <summary>
    /// Creates a listener that sets <see cref="FoundText"/> once a considered message contains
    /// <paramref name="textToFind"/>. It searches nothing until it is added to
    /// <see cref="Trace.Listeners"/>.
    /// </summary>
    /// <param name="textToFind">Text whose appearance in any considered message sets
    /// <see cref="FoundText"/>.</param>
    /// <param name="currentThreadOnly">If <c>true</c>, only messages traced on the thread that
    /// calls this constructor are considered; messages traced on other threads are ignored.</param>
    public TextSearchingTraceListener(string textToFind, bool currentThreadOnly = false)
    {
        _textToFind = textToFind;
        _threadId = currentThreadOnly ? Environment.CurrentManagedThreadId : null;
    }

    /// <summary>
    /// Runs <paramref name="watchedCall"/> with a listener attached for its duration and reports
    /// whether <paramref name="textToFind"/> appeared in any considered message traced while it ran.
    /// </summary>
    /// <remarks>
    /// The call must run synchronously on the calling thread. The listener is removed as soon as
    /// <paramref name="watchedCall"/> returns, so work it leaves running in the background is not
    /// watched; and with <paramref name="currentThreadOnly"/> set, work it hands to other threads
    /// is ignored even while it runs. Passing an async lambda is therefore a compile error (see the
    /// <see cref="Func{TResult}"/> overload).
    /// </remarks>
    /// <param name="textToFind">Text to look for. Must not be empty, since every message would
    /// match it.</param>
    /// <param name="watchedCall">The call to watch. An exception it throws propagates to the
    /// caller after the listener has been removed.</param>
    /// <param name="currentThreadOnly">If <c>true</c>, only messages traced on the calling thread
    /// (the thread that runs <paramref name="watchedCall"/>) are considered. Use it when other
    /// threads may trace the same text at the same time; pass <c>false</c> when the watched call
    /// itself may trace from other threads.</param>
    /// <returns><c>true</c> if a considered message contained <paramref name="textToFind"/>.</returns>
    /// <exception cref="ArgumentException"><paramref name="textToFind"/> is empty.</exception>
    public static bool WasTracedDuring(
        string textToFind,
        Action watchedCall,
        bool currentThreadOnly
    )
    {
        ArgumentException.ThrowIfNullOrEmpty(textToFind);

        TextSearchingTraceListener listener = new(textToFind, currentThreadOnly);
        // PNX001 bans Trace for logging; attaching a listener is how ParatextData's trace-only
        // errors are observed, so the Trace API itself is the point here.
#pragma warning disable PNX001
        Trace.Listeners.Add(listener);
        try
        {
            watchedCall();
        }
        finally
        {
            Trace.Listeners.Remove(listener);
        }
#pragma warning restore PNX001
        return listener.FoundText;
    }

    /// <summary>
    /// Makes an async watched call a compile error. An async lambda converts to
    /// <see cref="Func{TResult}"/> of <see cref="Task"/> in preference to <see cref="Action"/>, so
    /// it binds here instead of to <see cref="WasTracedDuring(string, Action, bool)"/>, where it
    /// would return at its first await and leave the rest of its work unwatched.
    /// </summary>
    [Obsolete(
        "WasTracedDuring watches only synchronous calls: an async call returns at its first await, "
            + "and the listener is removed before the rest of its work runs.",
        error: true
    )]
    public static bool WasTracedDuring(
        string textToFind,
        Func<Task> watchedCall,
        bool currentThreadOnly
    ) =>
        throw new NotSupportedException(
            "WasTracedDuring watches only synchronous calls; pass an Action."
        );

    public override void Write(string? message) => Search(message);

    public override void WriteLine(string? message) => Search(message);

    /// <summary>
    /// <c>true</c> once a considered trace contained the text to find. Latches on the first match
    /// and never resets; create a new listener to search again.
    /// </summary>
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
