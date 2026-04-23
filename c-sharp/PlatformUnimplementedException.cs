namespace Paranext.DataProvider;

/// <summary>
/// Exception used when a function is not implemented in the current application version.
/// </summary>
public class PlatformUnimplementedException(string message)
    // IMPORTANT: Some of the places that will handler this exception require the `ERROR_UNIMPLEMENTED`
    // prefix to be there to properly identify this exception.
    : Exception($"ERROR_UNIMPLEMENTED: {message}") { }
