namespace Paranext.DataProvider;

/// <summary>
/// Attribute to specify a custom timeout for network requests
/// </summary>
/// <param name="timeoutMilliseconds">The timeout in milliseconds for the network request</param>
[AttributeUsage(AttributeTargets.Method)]
public class NetworkTimeoutAttribute(int timeoutMilliseconds) : Attribute
{
    /// <summary>
    /// Gets the timeout in milliseconds for a network request
    /// </summary>
    public int TimeoutMilliseconds { get; } = timeoutMilliseconds;
}
