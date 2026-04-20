using System.ComponentModel;
using PtxUtils;

namespace Paranext.DataProvider.ManageBooks;

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
//
// STUB — Test Writer RED skeleton for CAP-010. All behavior throws
// NotImplementedException; the Implementer replaces the bodies to make the
// AlertCaptureTests pass.

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
        throw new NotImplementedException("RED — CAP-010 Theme 8");
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
        throw new NotImplementedException("RED — CAP-010 Theme 8");
    }

    /// <summary>
    /// <see cref="Alert.ShowLaterInternal"/> override. Captured to the
    /// ambient scope if one is active, else routed to
    /// <c>Console.WriteLine</c>. No return value per the abstract contract.
    /// </summary>
    protected override void ShowLaterInternal(string text, string caption, AlertLevel alertLevel)
    {
        throw new NotImplementedException("RED — CAP-010 Theme 8");
    }

    /// <summary>
    /// Disposable handle to a capture scope. While the instance is alive
    /// (not disposed) captured alerts are appended to
    /// <see cref="Entries"/>. Disposing exits the scope and restores the
    /// previous state (no scope → unstructured fallback).
    /// </summary>
    public sealed class AlertScope : IDisposable
    {
        /// <summary>
        /// Captured alerts raised inside this scope, in the order they were
        /// raised. Safe to read after <see cref="Dispose"/>.
        /// </summary>
        public List<AlertEntry> Entries { get; } = new();

        /// <summary>
        /// Exits the capture scope. After disposal, new
        /// <c>Alert.Show</c> / <c>Alert.ShowLater</c> calls on the current
        /// async flow are no longer captured to this scope.
        /// </summary>
        public void Dispose()
        {
            throw new NotImplementedException("RED — CAP-010 Theme 8");
        }
    }
}
