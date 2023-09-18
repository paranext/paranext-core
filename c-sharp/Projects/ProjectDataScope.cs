namespace Paranext.DataProvider.Projects;

/// <summary>
/// Represents the scope of a get/set call for project data
/// </summary>
internal class ProjectDataScope
{
    /// <summary>
    /// Project ID
    /// </summary>
    public Guid? ProjectID { get; set; }

    /// <summary>
    /// Project short name
    /// </summary>
    public string? ProjectName { get; set; }

    /// <summary>
    /// This is the name of an extension that should remain constant whenever the platform is restarted
    /// </summary>
    public string? ExtensionName { get; set; }

    /// <summary>
    /// Examples: Book, Chapter, Verse, Notes, etc.
    /// </summary>
    public string? DataType { get; set; }

    /// <summary>
    /// Specifies what specific data is in scope given the value of DataType
    /// </summary>
    public string? DataQualifier { get; set; }
}
