using System.Collections.Concurrent;
using System.Text.RegularExpressions;
using Paranext.DataProvider.JsonUtils;
using Paratext.Data;
using Paratext.Data.Users;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Direct access methods to the file system for project directories
/// </summary>
internal static partial class LocalProjects
{
    private const UnixFileMode UNIX_FILE_MODE =
        UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.UserExecute;

    private static readonly ConcurrentDictionary<string, ProjectDetails> s_projectDetailsMap =
        new();

    // All project directories are subdirectories of this
    private static readonly string s_projectRootFolder;

    // The directory name pattern for each project is "shortName_ID"
    [GeneratedRegex(@"^(?<name>\w(\w|-)*)_(?<id>[^\W_]+)$")]
    private static partial Regex ProjectDirectoryRegex();

    // Inside of each project's "shortName_ID" directory, these are the subdirectories and files
    private const string PROJECT_SUBDIRECTORY = "project";
    private const string PROJECT_METADATA_FILE = "meta.json";

    // Inside of the project subdirectory, these are the subdirectories for Paratext projects
    private const string PARATEXT_DATA_SUBDIRECTORY = "paratext";

    static LocalProjects()
    {
        s_projectRootFolder = Path.Join(
            Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
            ".platform.bible",
            "projects"
        );
    }

    public static void Initialize()
    {
        if (!s_projectDetailsMap.IsEmpty)
            return;

        if (!Directory.Exists(s_projectRootFolder))
        {
            if (OperatingSystem.IsWindows())
                Directory.CreateDirectory(s_projectRootFolder);
            else
                Directory.CreateDirectory(s_projectRootFolder, UNIX_FILE_MODE);
        }

        foreach (var projectDetails in LoadAllProjectDetails())
        {
            if (projectDetails.Metadata.ProjectStorageType != ProjectStorageType.ParatextFolders)
                continue;

            try
            {
                AddProjectToMaps(projectDetails);
                Console.WriteLine($"Loaded project metadata: {projectDetails}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to load project for {projectDetails}: {ex}");
            }
        }
    }

    public static IList<ProjectDetails> GetAllProjectDetails()
    {
        return s_projectDetailsMap.Values.ToList();
    }

    public static ProjectDetails GetProjectDetails(string projectId)
    {
        return s_projectDetailsMap[projectId.ToUpperInvariant()];
    }

    public static ScrText GetParatextProject(string projectId)
    {
        return ScrTextCollection.GetById(HexId.FromStr(projectId));
    }

    public static void SaveProjectMetadata(ProjectMetadata metadata, bool overwrite = false)
    {
        var projectHomeDir = GetProjectDir(metadata.Name, metadata.ID);
        var projectContentsDir = Path.Join(projectHomeDir, PROJECT_SUBDIRECTORY);
        var metadataFilePath = Path.Join(projectHomeDir, PROJECT_METADATA_FILE);

        if (File.Exists(metadataFilePath) && !overwrite)
            throw new InvalidOperationException(
                "Cannot overwrite metadata unless the overwrite flag is true"
            );

        if (!Directory.Exists(projectContentsDir))
        {
            if (OperatingSystem.IsWindows())
                Directory.CreateDirectory(projectContentsDir);
            else
                Directory.CreateDirectory(projectContentsDir, UNIX_FILE_MODE);
        }

        File.WriteAllText(metadataFilePath, ProjectMetadataConverter.ToJsonString(metadata));
        AddProjectToMaps(new ProjectDetails(metadata, projectHomeDir));
    }

    public static void LoadProject(string projectName, string projectID)
    {
        var dir = GetProjectDir(projectName, projectID);
        var projectMetadata =
            LoadProjectMetadata(dir, out string errorMessage) ?? throw new Exception(errorMessage);
        AddProjectToMaps(new ProjectDetails(projectMetadata, dir));
    }

    private static string GetProjectDir(string projectName, string projectID)
    {
        return Path.Join(s_projectRootFolder, $"{projectName}_{projectID}");
    }

    private static void AddProjectToMaps(ProjectDetails projectDetails)
    {
        var projectPath = Path.Join(
            projectDetails.HomeDirectory,
            PROJECT_SUBDIRECTORY,
            PARATEXT_DATA_SUBDIRECTORY
        );
        ProjectName projectName = new(projectPath);
        var id = projectDetails.Metadata.ID;
        Console.WriteLine(
            s_projectDetailsMap.ContainsKey(id)
                ? $"Replacing Paratext project in map: {id} = {projectPath}"
                : $"Adding Paratext project in map: {id} = {projectPath}"
        );
        s_projectDetailsMap[id] = projectDetails;
        ScrTextCollection.Add(new ScrText(projectName, RegistrationInfo.DefaultUser));
    }

    /// <summary>
    /// Return projects that are available on disk on the local machine
    /// </summary>
    /// <returns>Enumeration of (ProjectMetadata, project directory) tuples for all projects</returns>
    private static IEnumerable<ProjectDetails> LoadAllProjectDetails()
    {
        foreach (var dir in Directory.EnumerateDirectories(s_projectRootFolder, "*_*"))
        {
            ProjectMetadata? projectMetadata;
            string errorMessage;
            try
            {
                projectMetadata = LoadProjectMetadata(dir, out errorMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error while getting project metadata from {dir}: {ex}");
                continue;
            }

            if (projectMetadata == null)
                Console.WriteLine(errorMessage);
            else
                yield return new ProjectDetails(projectMetadata, dir);
        }
    }

    public static bool DoesFolderMatchMetadata(string folder, ProjectMetadata metadata)
    {
        var matches = ProjectDirectoryRegex().Matches(folder);
        return matches.Count == 1
            && metadata.Contains(matches[0].Groups["id"].Value, matches[0].Groups["name"].Value);
    }

    private static ProjectMetadata? LoadProjectMetadata(
        string projectHomeDir,
        out string errorMessage
    )
    {
        if (!Directory.Exists(Path.Combine(projectHomeDir, PROJECT_SUBDIRECTORY)))
        {
            errorMessage = $"Ignoring project without \"project\" subdir: {projectHomeDir}";
            return null;
        }

        string metadataFilePath = Path.Combine(projectHomeDir, PROJECT_METADATA_FILE);
        if (!File.Exists(metadataFilePath))
        {
            errorMessage = $"Ignoring project without metadata file: {projectHomeDir}";
            return null;
        }

        string json = File.ReadAllText(metadataFilePath);
        if (!ProjectMetadataConverter.TryGetMetadata(json, out var metadata, out string error))
        {
            errorMessage = $"Invalid project metadata at {metadataFilePath}: {error}";
            return null;
        }

        string finalDirectory = projectHomeDir.Split(Path.DirectorySeparatorChar).Last();
        if (metadata == null || !DoesFolderMatchMetadata(finalDirectory, metadata))
        {
            errorMessage = $"Project directory does not match its metadata: {projectHomeDir}";
            return null;
        }

        errorMessage = "";
        return metadata;
    }
}
