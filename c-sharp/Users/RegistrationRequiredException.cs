namespace Paranext.DataProvider.Users;

/// <summary>
/// Exception to inform callers that a valid Paratext registration is required before DBL resources can be opened
/// </summary>
public class RegistrationRequiredException : Exception
{
    /// <summary>
    /// Exception to inform callers that a valid Paratext registration is required before DBL resources can be opened
    /// </summary>
    public RegistrationRequiredException()
        : base(ExceptionMessage) { }

    /// <summary>
    /// Exception to inform callers that a valid Paratext registration is required before DBL resources can be opened
    /// </summary>
    public RegistrationRequiredException(string? customMessage = null)
        : base(customMessage ?? ExceptionMessage) { }

    public static string ExceptionMessage { get; set; } =
        "You must provide a valid Paratext registration before opening resources from the Digital Bible Library.";
}
