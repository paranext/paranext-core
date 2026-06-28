using System;
using PtxUtils.Progress;

namespace Paranext.DataProvider.ParatextUtils;

/// <summary>
/// Generic <see cref="ProgressDisplay"/> + cancellation bridge over
/// ParatextData's thread-static <see cref="Progress.Mgr"/>. Mirrors
/// <c>AlertCapture</c>: a caller opens a scope around long-running
/// ParatextData work, receives live status text through the
/// <c>onText</c> callback and an optional 0.0–1.0 progress fraction
/// through the <c>onValue</c> callback, and can cancel the in-flight
/// operation by calling <see cref="ProgressScope.Cancel"/> (safe from
/// another thread).
///
/// <para>ParatextData's <c>InternetSharedRepositorySource.RetryIndefinitely</c>,
/// <c>Hg</c>, and <c>ExeRunner</c> consult <see cref="Progress.Cancelled"/>
/// to break out of their retry/wait loops and push status via
/// <see cref="Progress.Text"/>. P10 otherwise leaves <see cref="Progress.Mgr"/>
/// at its no-op default, so retries are uninterruptible and status is dropped.
/// Installing this display for the duration of an S/R operation restores
/// both.</para>
///
/// <para>Because <see cref="Progress.Mgr"/> is <c>[ThreadStatic]</c>, the
/// ParatextData work must run on the same thread that called
/// <see cref="StartCapture"/> for status/cancel to reach it (true for the
/// synchronous Send/Receive path). If ever violated, the display simply does
/// not attach and behavior degrades to today's (no crash).</para>
/// </summary>
public sealed class ProgressCapture : ProgressDisplay
{
    private readonly Action<string>? _onText;
    private readonly Action<double>? _onValue;

    private ProgressCapture(Action<string>? onText, Action<double>? onValue)
    {
        _onText = onText;
        _onValue = onValue;
    }

    /// <summary>
    /// Installs a new <see cref="ProgressCapture"/> as the display on the
    /// CURRENT thread's <see cref="Progress.Mgr"/> instance and returns a
    /// scope the caller holds (and may share with another thread to cancel).
    ///
    /// <para>Assumes a single active capture per thread. Unlike <c>AlertCapture</c>
    /// (which saves its parent scope and restores it on dispose), <see cref="Progress"/>
    /// exposes no getter for the currently-installed display, so this cannot save/restore
    /// a prior one — disposing detaches the display and resets the thread's progress state
    /// rather than restoring a previous display. Safe for the synchronous Send/Receive path
    /// (the only caller), which installs no other display.</para>
    /// </summary>
    /// <param name="onText">
    /// Invoked synchronously on ParatextData's status thread while <see cref="Progress"/>'s
    /// internal lock is held. Keep it fast, non-blocking, and allocation-light (e.g. stash the
    /// latest string or enqueue lock-free): a blocking callback bounds cancellation latency and
    /// can stall a concurrent <see cref="ProgressScope.Cancel"/>, which must take the same lock to
    /// read <c>AllowAbort</c>. Exceptions it throws are caught and ignored so they cannot unwind
    /// ParatextData's retry loop.
    /// </param>
    /// <param name="onValue">
    /// Optional. Invoked with the 0.0–1.0 progress fraction reported by ParatextData. Subject to
    /// the same threading and exception-isolation constraints as <paramref name="onText"/>: called
    /// synchronously inside ParatextData's progress path; exceptions are caught and ignored.
    /// </param>
    public static ProgressScope StartCapture(
        Action<string>? onText = null,
        Action<double>? onValue = null
    )
    {
        var display = new ProgressCapture(onText, onValue);
        Progress progress = Progress.Mgr;
        progress.Reset(); // clear stale cancelled/display left on a pooled thread
        progress.SetDisplay(display);
        return new ProgressScope(progress);
    }

    void ProgressDisplay.SetProgressText(string text) =>
        SafeInvokeCallback("onText", _onText, text);

    void ProgressDisplay.SetProgressValue(double val) =>
        SafeInvokeCallback("onValue", _onValue, val);

    // Both progress callbacks run synchronously inside ParatextData's progress path (e.g.
    // RetryIndefinitely's catch block, while Progress's lock is held). A callback that throws
    // would unwind ParatextData's retry loop and turn an otherwise-recoverable reconnect into a
    // hard failure, so isolate it: a dropped progress update is harmless; tearing down the
    // in-flight operation is not. Redact filesystem-path-shaped substrings before logging,
    // mirroring AlertCapture's console fallback (Theme 4): a callback wrapping IO can surface raw
    // paths in the exception text, and server logs may be aggregated / shipped off-host. Generic
    // (rather than an Action closure) so the hot status-update path stays allocation-free.
    private static void SafeInvokeCallback<T>(string callbackName, Action<T>? callback, T arg)
    {
        try
        {
            callback?.Invoke(arg);
        }
        catch (Exception e)
        {
            Console.WriteLine(
                $"ProgressCapture {callbackName} callback threw (ignored): {AlertCapture.RedactPathsForLog(e.ToString())}"
            );
        }
    }

    /// <summary>
    /// Handle to an installed capture. Holds a direct reference to the
    /// <see cref="Progress"/> instance it installed on, so
    /// <see cref="Cancel"/> can be invoked from a different thread (it only
    /// sets a cooperative flag).
    /// </summary>
    public sealed class ProgressScope : IDisposable
    {
        private readonly Progress _progress;

        // Serializes Cancel() against Dispose() and makes the _disposed write visible across
        // threads: this scope is explicitly designed for Cancel() to be called from a thread
        // other than the one that owns Dispose(), so the flag needs a barrier, not a bare bool.
        private readonly object _gate = new();
        private bool _disposed;

        internal ProgressScope(Progress progress) => _progress = progress;

        /// <summary>
        /// Requests cancellation of the in-flight operation by setting
        /// <see cref="Progress.Cancelled"/> on the captured instance. The
        /// ParatextData retry loop throws <c>ProgressCancelledException</c>
        /// within ~2s. Safe to call from any thread; a no-op once disposed.
        ///
        /// <para>Does not abort the thread on the indefinite-task Send/Receive path, where
        /// <c>AllowAbort</c> stays false. That is a property of the path, not a guarantee
        /// <see cref="Progress"/> provides: a definite sub-task that set <c>AllowAbort = true</c>
        /// would make <see cref="Progress.Cancel"/> reach <c>Thread.Abort()</c>, which throws
        /// <c>PlatformNotSupportedException</c> on .NET 8.</para>
        /// </summary>
        public void Cancel()
        {
            lock (_gate)
            {
                if (_disposed)
                    return;
                try
                {
                    _progress.Cancel();
                }
                catch (PlatformNotSupportedException)
                {
                    // See the remarks above: on a definite sub-task that set AllowAbort = true,
                    // Progress.Cancel() can reach Thread.Abort(), which throws
                    // PlatformNotSupportedException on .NET 8. Cancellation here is cooperative
                    // (it sets Progress.Cancelled, which the retry loops poll), so swallow the
                    // abort failure rather than faulting the cross-thread caller.
                }
            }
        }

        /// <summary>True once cancellation has been requested.</summary>
        public bool Cancelled => _progress.Cancelled;

        /// <summary>Detaches the display and clears progress state.</summary>
        public void Dispose()
        {
            lock (_gate)
            {
                if (_disposed)
                    return;
                _disposed = true;
                // Detach BEFORE Reset(): Reset() sets Text = "" (forwarding to the still-attached
                // display) before it nulls the display, so a consumer rendering the latest status
                // would otherwise receive one spurious _onText("") on every clean teardown.
                // Detaching first suppresses that final empty update.
                _progress.SetDisplay(null);
                _progress.Reset(); // clears cancelled + contexts left on this (possibly pooled) thread
            }
        }
    }
}
