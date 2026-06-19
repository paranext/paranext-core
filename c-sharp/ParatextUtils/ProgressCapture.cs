using System;
using PtxUtils.Progress;

namespace Paranext.DataProvider.ParatextUtils;

/// <summary>
/// Generic <see cref="ProgressDisplay"/> + cancellation bridge over
/// ParatextData's thread-static <see cref="Progress.Mgr"/>. Mirrors
/// <c>AlertCapture</c>: a caller opens a scope around long-running
/// ParatextData work, receives live status text through the
/// <c>onText</c> callback, and can cancel the in-flight operation by
/// calling <see cref="ProgressScope.Cancel"/> (safe from another thread).
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

    private ProgressCapture(Action<string>? onText) => _onText = onText;

    /// <summary>
    /// Installs a new <see cref="ProgressCapture"/> as the display on the
    /// CURRENT thread's <see cref="Progress.Mgr"/> instance and returns a
    /// scope the caller holds (and may share with another thread to cancel).
    /// </summary>
    public static ProgressScope StartCapture(Action<string>? onText = null)
    {
        var display = new ProgressCapture(onText);
        Progress progress = Progress.Mgr;
        progress.Reset(); // clear stale cancelled/display left on a pooled thread
        progress.SetDisplay(display);
        return new ProgressScope(progress);
    }

    void ProgressDisplay.SetProgressText(string text) => _onText?.Invoke(text);

    void ProgressDisplay.SetProgressValue(double val)
    {
        // Indefinite Send/Receive has no determinate progress value; ignore.
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
        private bool _disposed;

        internal ProgressScope(Progress progress) => _progress = progress;

        /// <summary>
        /// Requests cancellation of the in-flight operation by setting
        /// <see cref="Progress.Cancelled"/> on the captured instance. The
        /// ParatextData retry loop throws <c>ProgressCancelledException</c>
        /// within ~2s. Safe from any thread; never aborts the thread because
        /// <c>AllowAbort</c> stays false for indefinite tasks.
        /// </summary>
        public void Cancel() => _progress.Cancel();

        /// <summary>True once cancellation has been requested.</summary>
        public bool Cancelled => _progress.Cancelled;

        /// <summary>Detaches the display and clears progress state.</summary>
        public void Dispose()
        {
            if (_disposed)
                return;
            _disposed = true;
            _progress.Reset(); // clears display + cancelled + contexts
        }
    }
}
