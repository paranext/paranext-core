namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Warning banner types for the Enhanced Resource window.
/// Displayed at the top of the scripture pane to alert users to data issues.
/// </summary>
/// <remarks>
/// Contract: data-contracts.md WarningBanner section
/// CAP-013 (GetScriptureContent), BHV-310 (Warning Banners)
/// </remarks>
public enum WarningBannerType
{
    MissingBook,
    ReviewStatus,
    ImageWarning,
    CopyrightWarning,
    UpdateRequiredData,
    UpdateAvailable,
}

/// <summary>
/// Represents a warning or informational banner displayed at the top of the ER window.
/// </summary>
/// <remarks>
/// Contract: data-contracts.md WarningBanner record
/// CAP-013, BHV-310
/// </remarks>
public record WarningBanner(
    WarningBannerType Type,
    string Message,
    bool Dismissible,
    string? ActionLabel = null,
    string? ActionUrl = null
);
