using System.Diagnostics.CodeAnalysis;

namespace Paranext.DataProvider;

// === NEW IN PT10 ===
// Reason: PT10 adopts the PlatformError taxonomy; PT9 had ad-hoc exception types.
// Maps to: FN-002 (Theme 7 — Error Handling)
// Source: .context/features/manage-books/implementation/backend-alignment.md
//   → "Error Handling — PlatformError Codes"
// Mirrors: lib/platform-bible-utils/src/platform-error.ts PlatformErrorCode union

/// <summary>
/// Helper that throws exceptions carrying a PlatformError code in
/// <c>Exception.Data["platformErrorCode"]</c>. The network layer extracts the
/// code and forwards it to <c>newPlatformError()</c> on the TS side.
///
/// <para>Constants mirror the <c>PlatformErrorCode</c> union defined in
/// <c>lib/platform-bible-utils/src/platform-error.ts</c> so the same string
/// round-trips through JSON-RPC without re-encoding.</para>
/// </summary>
public static class PlatformErrorCodes
{
    public const string Aborted = "ABORTED";
    public const string AlreadyExists = "ALREADY_EXISTS";
    public const string Cancelled = "CANCELLED";
    public const string DataLoss = "DATA_LOSS";
    public const string DeadlineExceeded = "DEADLINE_EXCEEDED";
    public const string FailedPrecondition = "FAILED_PRECONDITION";
    public const string Internal = "INTERNAL";
    public const string InvalidArgument = "INVALID_ARGUMENT";
    public const string NotFound = "NOT_FOUND";
    public const string OutOfRange = "OUT_OF_RANGE";
    public const string PermissionDenied = "PERMISSION_DENIED";
    public const string ResourceExhausted = "RESOURCE_EXHAUSTED";
    public const string Unauthenticated = "UNAUTHENTICATED";
    public const string Unavailable = "UNAVAILABLE";
    public const string Unimplemented = "UNIMPLEMENTED";
    public const string Unknown = "UNKNOWN";

    // The Exception.Data dictionary key carrying the PlatformError code.
    // Colocated here (private) so the magic string is declared exactly once;
    // call sites use TryGetCode below rather than indexing by literal.
    // Theme 9 (2026-04-30).
    internal const string PlatformErrorCodeDataKey = "platformErrorCode";

    /// <summary>
    /// Builds an <see cref="InvalidOperationException"/> carrying a PlatformError
    /// code in <c>Exception.Data["platformErrorCode"]</c>. The network layer
    /// extracts the code and forwards it to <c>newPlatformError()</c> on the TS
    /// side. The exception type is informational only — the wire protocol keys
    /// solely off <c>Exception.Data</c>.
    /// </summary>
    public static InvalidOperationException WithCode(string code, string message)
    {
        var ex = new InvalidOperationException(message);
        ex.Data[PlatformErrorCodeDataKey] = code;
        return ex;
    }

    // Theme 9 (2026-04-30): static-analysis-friendly companion to WithCode.
    // Uses [DoesNotReturn] so call sites flagged by the compiler/analyzer as
    // unreachable-after-throw produce correct nullable-flow analysis. Pairs
    // with the existing WithCode for cases where the caller wants to wrap
    // and rethrow with extra context.
    /// <summary>
    /// Throws an <see cref="InvalidOperationException"/> carrying the supplied
    /// PlatformError <paramref name="code"/> and <paramref name="message"/>. Marked
    /// <see cref="DoesNotReturnAttribute"/> so static analysis treats call
    /// sites as terminating — `Throw(...)` is a complete statement, no
    /// `throw` keyword needed at the call site.
    /// </summary>
    [DoesNotReturn]
    public static void Throw(string code, string message)
    {
        throw WithCode(code, message);
    }

    // Theme 9 (2026-04-30): replaces the magic-string lookup
    // `ex.Data["platformErrorCode"] as string` at call sites with a typed
    // helper so the dictionary key stays colocated with its declaration.
    /// <summary>
    /// Returns <c>true</c> and outputs the PlatformError <paramref name="code"/>
    /// when <paramref name="ex"/> carries one in
    /// <c>Exception.Data["platformErrorCode"]</c>; otherwise outputs
    /// <c>null</c> and returns <c>false</c>.
    /// </summary>
    public static bool TryGetCode(Exception ex, [NotNullWhen(true)] out string? code)
    {
        if (ex.Data[PlatformErrorCodeDataKey] is string c)
        {
            code = c;
            return true;
        }
        code = null;
        return false;
    }
}
