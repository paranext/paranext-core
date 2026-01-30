namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Translation information for derived project types.
/// Used to link derived projects to their base projects.
/// Maps to SPEC-002, BHV-104.
/// </summary>
public record TranslationInfo
{
    public required ProjectType Type { get; init; }
    public string? BaseProjectName { get; init; }
    public string? BaseProjectGuid { get; init; }

    /// <summary>
    /// Returns true if this TranslationInfo is empty (no base project).
    /// </summary>
    public bool IsEmpty =>
        string.IsNullOrEmpty(BaseProjectName) && string.IsNullOrEmpty(BaseProjectGuid);

    /// <summary>
    /// Serializes to format: "Type:BaseProjectName:BaseProjectGuid"
    /// </summary>
    public override string ToString()
    {
        if (IsEmpty)
            return Type.ToString();
        return $"{Type}:{BaseProjectName}:{BaseProjectGuid}";
    }
}
