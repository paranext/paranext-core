using PtxUtils;

namespace Paranext.DataProvider.ParatextUtils;

// === NEW IN PT10 ===
// Reason: Theme 8 Alert handling. PT9 surfaced ImportSfmText warnings/errors
//   through WinForms `Alert.Show` dialogs. PT10 replaces those dialogs with
//   an `AsyncLocal`-backed capture scope that records each alert as a
//   structured entry returned to the caller in `ImportBooksResult`.
// Source: .context/features/manage-books/implementation/backend-alignment.md
//   → "Alert Handling — AlertCapture" (Theme 8)
// Contract: .context/features/manage-books/data-contracts.md Section 3.9
//   ImportBooksResult (warnings/errors are `AlertEntry[]`)
// Maps to: EXT-010 (capture plumbing used by ImportBooks / ImportSfmText
//   delegation). Reusable by any other ParatextData call that raises
//   `Alert.Show` / `Alert.ShowLater`.
//
// STUB — Test Writer RED skeleton for CAP-010. Record type carries no runtime
// logic; implementer may keep this file as-is.

/// <summary>
/// One captured alert from ParatextData during an AlertCapture scope.
/// Structured replacement for the PT9 Alert.Show dialog surface.
/// <para>See <c>AlertCapture.StartCapture()</c> for the scope API and
/// <c>ImportBooksResult</c> for the wire shape returned to callers.</para>
/// </summary>
/// <param name="Text">Human-readable alert body. May be empty.</param>
/// <param name="Caption">Alert caption/title. May be empty.</param>
/// <param name="Level">Severity (<c>Information</c>, <c>Warning</c>,
///   <c>Error</c>, <c>Question</c>) as defined by <see cref="AlertLevel"/>.</param>
public record AlertEntry(string Text, string Caption, AlertLevel Level);
