namespace Paranext.DataProvider.Projects;

/// <summary>
/// Structure of the data in persisted storage.
/// This is not related to the format of the data itself but the way it is stored
/// </summary>
public static class ProjectStorageType
{
    public const string Unknown = "unknown";
    public const string ParatextFolders = "paratextFolders";
    public const string ParatextZipped = "paratextZipped";
}
