namespace Paranext.DataProvider;

/// <summary>
/// Exception thrown when a requested book is not found in a Paratext project.
/// </summary>
public class PermissionsException(string projectId, string safetyCheckMessage)
    // IMPORTANT: The scripture editor WebView depends on the exact text of this message.
    : Exception($"Permissions exception for projectId {projectId}: {safetyCheckMessage}")
{
    /// <summary>
    /// The project ID in which the book was not found.
    /// </summary>
    public string ProjectId { get; } = projectId;

    /// <summary>
    /// The exception from the original `SafetyCheckException` that led to this exception
    /// being thrown
    /// </summary>
    public string SafetyCheckMessage { get; } = safetyCheckMessage;
}
