namespace Paranext.DataProvider;

// === PORTED FROM PT10 DESIGN (Theme 7, FN-002) ===
// Source: .context/features/manage-books/implementation/backend-alignment.md
//   → "Error Handling — PlatformError Codes"
// Mirrors: lib/platform-bible-utils/src/platform-error.ts PlatformErrorCode union
//
// STUB — Test Writer RED skeleton for CAP-005 / BE-1 Group-0 infra.
// The constants are declared (required so `[TestCase(PlatformErrorCodes.X)]`
// attributes in PlatformErrorCodesTests.cs compile), but the `WithCode` helper
// throws NotImplementedException — the Layer-2 RED signal.
// The Implementer for CAP-005 replaces the WithCode body in GREEN.

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

    /// <summary>
    /// Throws an exception carrying a PlatformError code in
    /// <c>Exception.Data["platformErrorCode"]</c>.
    /// </summary>
    public static Exception WithCode(string code, string message)
    {
        throw new NotImplementedException(
            "CAP-005 (BE-1 Group-0 infra): PlatformErrorCodes.WithCode not yet implemented. "
                + "See .context/features/manage-books/implementation/backend-alignment.md → 'Error Handling'."
        );
    }
}
