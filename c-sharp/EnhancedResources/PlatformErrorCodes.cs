// TDD RED stub: Error code helper for RED phase testing.
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Helper for attaching PlatformErrorCode to exceptions so the TS layer can
/// reconstruct a typed PlatformError. Codes match platform-bible-utils/platform-error.ts.
///
/// Source: backend-alignment.md "Error Handling Convention"
/// </summary>
internal static class PlatformErrorCodes
{
    // Standard codes (subset used by ER)
    public const string NotFound = "NOT_FOUND";
    public const string InvalidArgument = "INVALID_ARGUMENT";
    public const string FailedPrecondition = "FAILED_PRECONDITION";
    public const string Internal = "INTERNAL";

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
