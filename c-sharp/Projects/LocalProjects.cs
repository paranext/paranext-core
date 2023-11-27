using System.Collections.Concurrent;
using System.Text.RegularExpressions;
using Paranext.DataProvider.JsonUtils;
using Paratext.Data;
using Paratext.Data.Users;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Direct access methods to the file system for project directories
/// </summary>
internal partial class LocalProjects
{
    private const UnixFileMode UNIX_FILE_MODE =
        UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.UserExecute;

    // The directory name pattern for each project is "shortName_ID"
    [GeneratedRegex(@"^(?<name>\w(\w|-)*)_(?<id>[^\W_]+)$")]
    private static partial Regex ProjectDirectoryRegex();

    // Inside of each project's "shortName_ID" directory, these are the subdirectories and files
    private const string PROJECT_SUBDIRECTORY = "project";
    private const string PROJECT_METADATA_FILE = "meta.json";

    // Inside of the project subdirectory, these are the subdirectories for Paratext projects
    private const string PARATEXT_DATA_SUBDIRECTORY = "paratext";

    protected readonly ConcurrentDictionary<string, ProjectDetails> _projectDetailsMap = new();

    // All project directories are subdirectories of this
    private readonly string _projectRootFolder;

    public LocalProjects()
    {
        _projectRootFolder = Path.Join(
            Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
            ".platform.bible",
            "projects"
        );
    }

    public virtual void Initialize()
    {
        if (!_projectDetailsMap.IsEmpty)
            return;

        if (!Directory.Exists(_projectRootFolder))
        {
            if (OperatingSystem.IsWindows())
                Directory.CreateDirectory(_projectRootFolder);
            else
                Directory.CreateDirectory(_projectRootFolder, UNIX_FILE_MODE);
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

    public IList<ProjectDetails> GetAllProjectDetails()
    {
        return _projectDetailsMap.Values.ToList();
    }

    public ProjectDetails? GetProjectDetails(string projectId)
    {
        _projectDetailsMap.TryGetValue(projectId.ToUpperInvariant(), out var details);
        return details;
    }

    public ScrText? GetParatextProject(string projectId)
    {
        HexId? id = HexId.FromStrSafe(projectId);
        return id != null ? ScrTextCollection.FindById(id) : null;
    }

    public void SaveProjectMetadata(ProjectMetadata metadata, bool overwrite = false)
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

    public void LoadProject(string projectName, string projectID)
    {
        var dir = GetProjectDir(projectName, projectID);
        var projectMetadata =
            LoadProjectMetadata(dir, out string errorMessage) ?? throw new Exception(errorMessage);
        AddProjectToMaps(new ProjectDetails(projectMetadata, dir));
    }

    public static bool DoesFolderMatchMetadata(string folder, ProjectMetadata metadata)
    {
        var matches = ProjectDirectoryRegex().Matches(folder);
        return matches.Count == 1
            && metadata.Contains(matches[0].Groups["id"].Value, matches[0].Groups["name"].Value);
    }

    private string GetProjectDir(string projectName, string projectID)
    {
        return Path.Join(_projectRootFolder, $"{projectName}_{projectID}");
    }

    private void AddProjectToMaps(ProjectDetails projectDetails)
    {
        var projectPath = Path.Join(
            projectDetails.HomeDirectory,
            PROJECT_SUBDIRECTORY,
            PARATEXT_DATA_SUBDIRECTORY
        );
        ProjectName projectName = new(projectPath);
        var id = projectDetails.Metadata.ID;
        Console.WriteLine(
            _projectDetailsMap.ContainsKey(id)
                ? $"Replacing Paratext project in map: {id} = {projectPath}"
                : $"Adding Paratext project in map: {id} = {projectPath}"
        );
        _projectDetailsMap[id] = projectDetails;
        ScrTextCollection.Add(new ScrText(projectName, RegistrationInfo.DefaultUser));
    }

    /// <summary>
    /// Return projects that are available on disk on the local machine
    /// </summary>
    /// <returns>Enumeration of (ProjectMetadata, project directory) tuples for all projects</returns>
    private IEnumerable<ProjectDetails> LoadAllProjectDetails()
    {
        foreach (var dir in Directory.EnumerateDirectories(_projectRootFolder, "*_*"))
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
        if (metadata == null || !DoesFolderMatchMetadata(finalDirectory, metadata))
        {
            errorMessage = $"Project directory does not match its metadata: {projectHomeDir}";
            return null;
        }

        errorMessage = "";
        return metadata;
    }
}
