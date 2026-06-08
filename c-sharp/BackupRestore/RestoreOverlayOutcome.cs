namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: CAP-004 inner contract — the return value of
//   `IRestorerHandle.PerformOverlayRestore`. Per DEC-CAP-004-F all error
//   paths flow through exceptions (LockNotObtainedException,
//   MigrationFailedException) that the orchestrator catches and translates to
//   the wire-stable Error envelope. The success outcome therefore carries no
//   extra state — the orchestrator already knows the destination ScrText and
//   surfaces the IsNoteType flag from there.

/// <summary>
/// Successful outcome of
/// <see cref="IRestorerHandle.PerformOverlayRestore"/>. Stateless marker —
/// failures are signalled via thrown exceptions, not via this type. See
/// DEC-CAP-004-F in <c>test-writer-CAP-004.md</c>.
/// </summary>
internal sealed record RestoreOverlayOutcome
{
    /// <summary>
    /// Cached singleton instance — the type carries no state so reusing one
    /// instance avoids per-call allocation.
    /// </summary>
    public static RestoreOverlayOutcome Success { get; } = new();
}
