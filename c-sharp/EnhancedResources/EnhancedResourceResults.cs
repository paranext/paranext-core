namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of the InitializeResources operation (Contract: Section 4.15).
///
/// On success: Success=true, ResourceCount has the count of discovered resources,
/// HaveMarbleData indicates whether Marble research data is available.
///
/// On failure: Success=false, Error contains the error code and message.
/// </summary>
public record InitializeResourcesResult(
    bool Success,
    int ResourceCount = 0,
    bool HaveMarbleData = false,
    ErrorInfo? Error = null
);

/// <summary>
/// Error information for failed operations.
/// </summary>
public record ErrorInfo(string Code, string Message);
