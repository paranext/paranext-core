namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Change type classifications for tracked project notifications.
/// PT9 Source: MarbleForm.cs:971-1017 (three change types in ChangeListener)
/// Contract: extraction-plan.md EXT-012
/// </summary>
public enum TrackedProjectChangeType
{
    /// <summary>Rendering data changed in the tracked project.</summary>
    Rendering,

    /// <summary>Scripture text changed in the tracked project.</summary>
    Text,

    /// <summary>Biblical Terms list changed in the tracked project.</summary>
    BiblicalTermsList,
}
