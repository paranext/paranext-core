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
    private static readonly ConcurrentDictionary<Guid, ProjectDetails> s_projectDetailsMap = new();
    private static readonly ConcurrentDictionary<Guid, ScrText> s_paratextProjectMap = new();

    // All project directories are subdirectories of this
    private static readonly string s_projectRootFolder;

    // The directory name pattern for each project is "shortName_ID"
    [GeneratedRegex("(?<name>\\w*)_(?<id>.*)")]
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
        if (!s_paratextProjectMap.IsEmpty || !s_projectDetailsMap.IsEmpty)
            return;

        if (!Directory.Exists(s_projectRootFolder))
        {
            if (OperatingSystem.IsWindows())
                Directory.CreateDirectory(s_projectRootFolder);
            else
                Directory.CreateDirectory(s_projectRootFolder, UnixFileMode.UserWrite);
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

    public static ProjectDetails GetProjectDetails(Guid projectId)
    {
        return s_projectDetailsMap[projectId];
    }

    public static ScrText GetParatextProject(Guid projectId)
    {
        return s_paratextProjectMap[projectId];
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
                Directory.CreateDirectory(projectContentsDir, UnixFileMode.UserWrite);
        }

        File.WriteAllText(metadataFilePath, ProjectMetadataConverter.ToJsonString(metadata));
        AddProjectToMaps(new ProjectDetails(metadata, projectHomeDir));
    }

    public static void LoadProject(string projectName, Guid projectID)
    {
        var dir = GetProjectDir(projectName, projectID);
        var projectMetadata =
            LoadProjectMetadata(dir, out string errorMessage) ?? throw new Exception(errorMessage);
        AddProjectToMaps(new ProjectDetails(projectMetadata, dir));
    }

    private static string GetProjectDir(string projectName, Guid projectID)
    {
        return Path.Join(s_projectRootFolder, $"{projectName}_{projectID}");
    }

    private static void AddProjectToMaps(ProjectDetails projectDetails)
    {
        ProjectName projectName =
            new(
                Path.Join(
                    projectDetails.Directory,
                    PROJECT_SUBDIRECTORY,
                    PARATEXT_DATA_SUBDIRECTORY
                )
            );
        var id = projectDetails.Metadata.ID;
        if (s_projectDetailsMap.ContainsKey(id) || s_paratextProjectMap.ContainsKey(id))
            Console.WriteLine($"Replacing Paratext project in map: {id}");
        s_projectDetailsMap[id] = projectDetails;
        s_paratextProjectMap[id] = new ScrText(projectName, RegistrationInfo.DefaultUser);
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
        var matches = ProjectDirectoryRegex().Matches(finalDirectory);
        if (
            (matches.Count != 1)
            || Guid.Parse(matches[0].Groups["id"].Value) != metadata!.ID
            || matches[0].Groups["name"].Value != metadata.Name
        )
        {
            errorMessage = $"Project directory does not match its metadata: {projectHomeDir}";
            return null;
        }

        errorMessage = "";
        return metadata;
    }
}
