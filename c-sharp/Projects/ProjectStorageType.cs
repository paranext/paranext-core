namespace Paranext.DataProvider.Projects;

/// <summary>
/// Structure of the data in persisted storage.
/// This is not related to the format of the data itself but the way it is stored
/// </summary>
public enum ProjectStorageType
{
    Unknown,
    ParatextFolders,
    ParatextZipped
}

// Add an extension methods related to the enum
public static class ProjectStorageTypeExtensions
{
    /// <summary>
    /// Convert a ProjectStorageType into a value recognized by PAPI
    /// </summary>
    /// <param name="projectStorageType">Enum value</param>
    /// <returns>String that represents the enum value that can be passed over the network</returns>
    public static string ToSerializedString(this ProjectStorageType projectStorageType)
    {
        return projectStorageType switch
        {
            ProjectStorageType.Unknown => "unknown",
            ProjectStorageType.ParatextFolders => "paratextFolders",
            ProjectStorageType.ParatextZipped => "paratextZipped",
            _ => throw new Exception("Unexpected project storage type: " + projectStorageType)
        };
    }

    /// <summary>
    /// Convert a string from PAPI into a ProjectStorageType enum value
    /// </summary>
    /// <param name="input">string representing a ProjectStorageType value</param>
    /// <param name="output">ProjectStorageType enum value</param>
    public static void FromSerializedString(this string input, out ProjectStorageType output)
    {
        switch (input)
        {
            case "paratextFolders":
                output = ProjectStorageType.ParatextFolders;
                return;
            case "paratextZipped":
                output = ProjectStorageType.ParatextZipped;
                return;
            default:
                output = ProjectStorageType.Unknown;
                return;
        }
    }
}
