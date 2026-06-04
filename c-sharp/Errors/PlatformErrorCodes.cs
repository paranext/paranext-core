namespace Paranext.DataProvider.Errors;

/// <summary>
/// Helper for attaching a PlatformErrorCode to exceptions so the TS layer can
/// reconstruct a typed PlatformError. Codes mirror
/// platform-bible-utils/src/platform-error.ts and follow gRPC status-code naming.
///
/// Wire protocol: StreamJsonRpc serializes <see cref="System.Exception.Data"/>
/// into the JSON-RPC error response; the TS layer reads
/// <c>data.platformErrorCode</c> and calls <c>newPlatformError(err, code)</c>.
/// See backend-alignment.md "Error Handling Convention".
/// </summary>
internal static class PlatformErrorCodes
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
    /// Creates an InvalidOperationException with a platformErrorCode in Exception.Data.
    /// </summary>
    public static InvalidOperationException WithCode(string code, string message)
    {
        var ex = new InvalidOperationException(message);
        ex.Data["platformErrorCode"] = code;
        return ex;
    }
}
