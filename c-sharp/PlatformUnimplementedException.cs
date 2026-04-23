/// <summary>
/// Exception used when a function is not implemented in the current application version.
/// </summary>
public class PlatformUnimplementedException : Exception
{
    public PlatformUnimplementedException()
        : base() { }

    public PlatformUnimplementedException(string message)
        : base("ERROR_UNIMPLEMENTED: " + message) { }

    public PlatformUnimplementedException(string message, Exception inner)
        : base("ERROR_UNIMPLEMENTED: " + message, inner) { }
}
