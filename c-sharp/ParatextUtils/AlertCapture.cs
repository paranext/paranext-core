using System.ComponentModel;
using System.Text.RegularExpressions;
using PtxUtils;

namespace Paranext.DataProvider.ParatextUtils;

// === NEW IN PT10 ===
// Reason: Theme 8. Replaces AlertStub for manage-books flows — instead of
//   silently swallowing ParatextData's `Alert.Show` / `Alert.ShowLater`
//   calls (AlertStub returned Negative for all unrecognized dialogs),
//   AlertCapture collects each call inside an AsyncLocal scope so the
//   orchestrator can translate captured alerts into the
//   `ImportBooksResult.warnings` / `.errors` fields.
// Source: .context/features/manage-books/implementation/backend-alignment.md
//   → "Alert Handling — AlertCapture" (Theme 8)
// Maps to: EXT-010 (import orchestrator wraps
//   `ImportSfmText.ImportBooks(...)` in `using var alertScope =
//   AlertCapture.StartCapture();` and projects `alertScope.Entries`).

/// <summary>
/// <see cref="Alert"/> subclass that captures ParatextData alert calls into
/// an ambient <see cref="AlertScope"/> instead of surfacing a dialog.
/// Callers enter a scope with <see cref="StartCapture"/>, run the
/// ParatextData code that may raise alerts, and then inspect
/// <see cref="AlertScope.Entries"/> for the captured
/// <see cref="AlertEntry"/> list. Disposing the returned
/// <see cref="AlertScope"/> exits the capture scope.
///
/// <para>When no scope is active (caller forgot / out-of-scope code path)
/// the implementation falls back to <c>Console.WriteLine</c>, mirroring the
/// existing <c>ParatextUtils.AlertStub</c> behavior. The English language
/// definition probe message raised by ParatextData initialization is
/// allow-listed so it never pollutes captured entries.</para>
/// </summary>
public sealed class AlertCapture : Alert
{
    // Allow-list phrase for the recurring ParatextData initialization alert
    // raised in headless / non-English environments. Matched with a
    // case-insensitive contains check so variations of the surrounding
    // sentence still allow-list correctly.
    private const string EnglishLanguageAllowListPhrase =
        "unable to find a language definition file for english";

    // Ambient scope carried across async boundaries. Each thread/async flow
    // sees the scope installed on its flow; nested scopes save the parent
    // and restore it on dispose so an inner `using` does not permanently
    // disable outer capture.
    private static readonly AsyncLocal<AlertScope?> _currentScope = new();

    /// <summary>
    /// Starts a capture scope on the current asynchronous flow. The returned
    /// <see cref="AlertScope"/> accumulates captured <see cref="AlertEntry"/>
    /// objects until it is disposed. Typical usage:
    /// <code>
    /// using var alertScope = AlertCapture.StartCapture();
    /// // ... invoke ParatextData code that may call Alert.Show ...
    /// var entries = alertScope.Entries;
    /// </code>
    /// </summary>
    public static AlertScope StartCapture()
    {
        AlertScope? parent = _currentScope.Value;
        var scope = new AlertScope(parent);
        _currentScope.Value = scope;
        return scope;
    }

    /// <summary>
    /// <see cref="Alert.ShowInternal"/> override. Captured to the ambient
    /// scope if one is active, else routed to <c>Console.WriteLine</c>.
    /// </summary>
    protected override AlertResult ShowInternal(
        IComponent owner,
        string text,
        string caption,
        AlertButtons alertButtons,
        AlertLevel alertLevel,
        AlertDefaultButton defaultButton,
        bool showInTaskbar
    )
    {
        if (IsEnglishLanguageDefinitionProbe(text))
            return AlertResult.Positive;

        if (TryCaptureToScope(text, caption, alertLevel))
            return AlertResult.Positive;

        // No scope active — mirror AlertStub behavior: log and return Negative.
        // Filesystem-path-shaped substrings are redacted before writing so
        // server-side console output never carries raw paths from
        // ParatextData exception text. Server-process logs are still
        // admin-readable; this is defense-in-depth for the case where logs
        // are aggregated or shipped off-host (Theme 4).
        Console.WriteLine($"[Alert.Show] {RedactPathsForLog(caption)}: {RedactPathsForLog(text)}");
        return AlertResult.Negative;
    }

    /// <summary>
    /// <see cref="Alert.ShowLaterInternal"/> override. Captured to the
    /// ambient scope if one is active, else routed to
    /// <c>Console.WriteLine</c>. No return value per the abstract contract.
    /// </summary>
    protected override void ShowLaterInternal(string text, string caption, AlertLevel alertLevel)
    {
        if (IsEnglishLanguageDefinitionProbe(text))
            return;

        if (TryCaptureToScope(text, caption, alertLevel))
            return;

        Console.WriteLine(
            $"[Alert.ShowLater] {RedactPathsForLog(caption)}: {RedactPathsForLog(text)}"
        );
    }

    // Conservative filesystem-path redactor for server-side log output.
    // Matches:
    //   - Windows absolute paths:  C:\path\to\file
    //   - UNC paths:               \\server\share\path
    //   - POSIX absolute paths:    /a/b/c (≥ 3 segments to reduce false
    //                              positives on common inline strings)
    // Replaces each match with "<path>" so logs do not echo raw filesystem
    // paths surfaced in ParatextData exception text. False positives merely
    // truncate path-shaped substrings; false negatives still leave the
    // existing AlertStub-equivalent behavior. Theme 4 defense-in-depth.
    private static readonly Regex s_pathPattern =
        new(
            @"(?:[A-Za-z]:[\\/][^\s""<>|]+|\\\\[^\s\\""<>|]+\\[^\s""<>|]+|/[A-Za-z0-9._\-]+(?:/[A-Za-z0-9._\-]+){2,})",
            RegexOptions.Compiled
        );

    private static string RedactPathsForLog(string? value) =>
        string.IsNullOrEmpty(value) ? string.Empty : s_pathPattern.Replace(value, "<path>");

    /// <summary>
    /// Splits <paramref name="captured"/> into warnings (Information,
    /// Warning, Question) and errors (Error) using a single pass. Shared by
    /// every orchestrator that wraps ParatextData in an <see cref="AlertScope"/>
    /// (manage-books CAP-004, CAP-007, CAP-010 and any future capability that
    /// adopts the AlertCapture pattern). Theme 2 (2026-04-30) extracted this
    /// helper from <c>ImportBooksOrchestrator</c> so all orchestrators
    /// project the same severity buckets.
    /// </summary>
    /// <param name="captured">The <see cref="AlertScope.Entries"/> of a
    ///   completed scope.</param>
    /// <param name="warnings">All non-Error entries, original order preserved.</param>
    /// <param name="errors">All Error entries, original order preserved.</param>
    public static void PartitionAlertsByLevel(
        List<AlertEntry> captured,
        out AlertEntry[] warnings,
        out AlertEntry[] errors
    )
    {
        var warningList = new List<AlertEntry>(captured.Count);
        var errorList = new List<AlertEntry>();
        foreach (AlertEntry entry in captured)
        {
            if (entry.Level == AlertLevel.Error)
                errorList.Add(entry);
            else
                warningList.Add(entry);
        }
        warnings = warningList.ToArray();
        errors = errorList.ToArray();
    }

    // Appends an <see cref="AlertEntry"/> to the ambient <see cref="AlertScope"/>
    // if one is active on the current async flow. Returns true when the entry
    // was captured; false when no scope is installed (the caller is expected
    // to fall back to Console.WriteLine and the override-specific return).
    private static bool TryCaptureToScope(string text, string caption, AlertLevel level)
    {
        AlertScope? scope = _currentScope.Value;
        if (scope == null)
            return false;
        scope.Entries.Add(new AlertEntry(text, caption, level));
        return true;
    }

    private static bool IsEnglishLanguageDefinitionProbe(string text) =>
        !string.IsNullOrEmpty(text)
        && text.Contains(EnglishLanguageAllowListPhrase, StringComparison.OrdinalIgnoreCase);

    /// <summary>
    /// Disposable handle to a capture scope. While the instance is alive
    /// (not disposed) captured alerts are appended to
    /// <see cref="Entries"/>. Disposing exits the scope and restores the
    /// previous state (the parent scope if one was active, or no scope
    /// otherwise).
    /// </summary>
    public sealed class AlertScope : IDisposable
    {
        private readonly AlertScope? _parent;
        private bool _disposed;

        internal AlertScope(AlertScope? parent)
        {
            _parent = parent;
        }

        /// <summary>
        /// Captured alerts raised inside this scope, in the order they were
        /// raised. Safe to read after <see cref="Dispose"/>.
        /// </summary>
        public List<AlertEntry> Entries { get; } = new();

        /// <summary>
        /// Exits the capture scope. After disposal, new
        /// <c>Alert.Show</c> / <c>Alert.ShowLater</c> calls on the current
        /// async flow are no longer captured to this scope. If this scope
        /// was nested inside another active scope, the parent scope resumes
        /// capture for subsequent alerts.
        /// </summary>
        public void Dispose()
        {
            if (_disposed)
                return;
            _disposed = true;

            // Only pop if we're the currently-active scope. Defensive against
            // out-of-order disposals (parent disposed before child).
            if (ReferenceEquals(_currentScope.Value, this))
                _currentScope.Value = _parent;
        }
    }
}
