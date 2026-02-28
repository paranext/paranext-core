namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of the CheckResourceUpdate operation (Contract: Section 4.20).
///
/// On success: Success=true, UpdateAvailable indicates whether a newer version exists,
/// CurrentVersion and AvailableVersion contain version strings, IsMajorUpdate indicates
/// whether this is a major update requiring data re-download.
///
/// On failure: Success=false, Error contains the error code and message.
/// </summary>
public record ResourceUpdateResult(
    bool Success,
    bool UpdateAvailable = false,
    string CurrentVersion = "",
    string? AvailableVersion = null,
    bool IsMajorUpdate = false,
    ErrorInfo? Error = null
);
