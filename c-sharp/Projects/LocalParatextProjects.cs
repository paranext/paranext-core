using System.Collections.Concurrent;
using System.ComponentModel.DataAnnotations;
using Paranext.DataProvider.JsonUtils;
using Paratext.Data;
using Paratext.Data.Users;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Direct access methods to the file system for Paratext project directories
/// </summary>
internal class LocalParatextProjects
{
    #region Constructors, consts, and fields

    // Inside of each project's "home" directory, these are the subdirectories and files
    protected const string PROJECT_SUBDIRECTORY = "project";
    protected const string PROJECT_METADATA_FILE = "meta.json";

    // Inside of the project subdirectory, this is the subdirectory for Paratext projects
    // A subdirectory for extensions is also located here
    protected const string PARATEXT_DATA_SUBDIRECTORY = "paratext";
    protected const string EXTENSIONS_SUBDIRECTORY = "extensions";

    protected readonly ConcurrentDictionary<string, ProjectDetails> _projectDetailsMap = new();

    public LocalParatextProjects()
    {
        ProjectRootFolder = Path.Join(
            Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
            ".platform.bible",
            "projects"
        );
    }

    #endregion

    #region Public properties and methods

    public virtual void Initialize()
    {
        if (!_projectDetailsMap.IsEmpty)
            return;

        CreateDirectory(ProjectRootFolder);

        IEnumerable<ProjectDetails> allProjectDetails = LoadAllProjectDetails();

        if (!allProjectDetails.Any())
        {
            SetUpSampleProject();

            allProjectDetails = LoadAllProjectDetails();
        }

        foreach (ProjectDetails projectDetails in allProjectDetails)
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

    private void SetUpSampleProject()
    {
        string projectName = "WEB";
        string projectId = "32664dc3288a28df2e2bb75ded887fc8f17a15fb";
        string projectFolderName = projectName + "_" + projectId;
        string projectFolder = Path.Join(ProjectRootFolder, projectFolderName);
        ProjectMetadata metadata =
            new(projectId, projectName, "paratextFolders", "ParatextStandard");
        string metadataString = ProjectMetadataConverter.ToJsonString(
            metadata.ID,
            metadata.Name,
            metadata.ProjectStorageType,
            metadata.ProjectType
        );

        CreateDirectory(projectFolder);
        CreateDirectory(Path.Join(projectFolder, PROJECT_SUBDIRECTORY));
        CreateDirectory(Path.Join(projectFolder, PROJECT_SUBDIRECTORY, EXTENSIONS_SUBDIRECTORY));
        CreateDirectory(Path.Join(projectFolder, PROJECT_SUBDIRECTORY, PARATEXT_DATA_SUBDIRECTORY));

        File.WriteAllText(Path.Join(projectFolder, PROJECT_METADATA_FILE), metadataString);

        foreach (string filePath in Directory.GetFiles("assets/" + projectName, "*.*"))
        {
            File.Copy(
                filePath,
                filePath.Replace(
                    "assets/" + projectName,
                    Path.Join(projectFolder, PROJECT_SUBDIRECTORY, PARATEXT_DATA_SUBDIRECTORY)
                )
            );
        }
    }

    public IList<ProjectDetails> GetAllProjectDetails()
    {
        return _projectDetailsMap.Values.ToList();
    }

    public ProjectDetails GetProjectDetails(string projectId)
    {
        return _projectDetailsMap[projectId.ToUpperInvariant()];
    }

    public static ScrText GetParatextProject(string projectId)
    {
        return ScrTextCollection.GetById(HexId.FromStr(projectId));
    }

    public void SaveProjectMetadata(ProjectMetadata metadata, bool overwrite = false)
    {
        var projectHomeDir = GetProjectDir(metadata.Name, metadata.ID);
        SaveProjectMetadata(projectHomeDir, metadata, overwrite);
    }

    #endregion

    #region Protected properties and methods

    protected virtual string ProjectRootFolder { get; }

    protected void SaveProjectMetadata(
        string projectHomeDir,
        ProjectMetadata metadata,
        bool overwrite
    )
    {
        var projectContentsDir = Path.Join(projectHomeDir, PROJECT_SUBDIRECTORY);
        var metadataFilePath = Path.Join(projectHomeDir, PROJECT_METADATA_FILE);

        if (File.Exists(metadataFilePath) && !overwrite)
            throw new InvalidOperationException(
                "Cannot overwrite metadata unless the overwrite flag is true"
            );

        CreateDirectory(projectContentsDir);

        File.WriteAllText(metadataFilePath, ProjectMetadataConverter.ToJsonString(metadata));
        AddProjectToMaps(new ProjectDetails(metadata, projectHomeDir));
    }

    protected static void CreateDirectory(string dir)
    {
        if (Directory.Exists(dir))
            return;

        if (OperatingSystem.IsWindows())
            Directory.CreateDirectory(dir);
        else
            Directory.CreateDirectory(
                dir,
                UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.UserExecute
            );
    }

    #endregion

    #region Private properties and methods

    private string GetProjectDir(string projectName, string projectID)
    {
        return Path.Join(ProjectRootFolder, $"{projectName}_{projectID}");
    }

    private void AddProjectToMaps(ProjectDetails projectDetails)
    {
        var projectPath = Path.Join(
            projectDetails.HomeDirectory,
            PROJECT_SUBDIRECTORY,
            PARATEXT_DATA_SUBDIRECTORY
        );

        var id = projectDetails.Metadata.ID;
        Console.WriteLine(
            _projectDetailsMap.ContainsKey(id)
                ? $"Replacing Paratext project in map: {id} = {projectPath}"
                : $"Adding Paratext project in map: {id} = {projectPath}"
        );
        _projectDetailsMap[id.ToUpperInvariant()] = projectDetails;

        var projectName = new ProjectName
        {
            ShortName = projectDetails.Metadata.Name,
            ProjectPath = projectPath
        };
        ScrTextCollection.Add(new ScrText(projectName, RegistrationInfo.DefaultUser));
    }

    /// <summary>
    /// Return projects that are available on disk on the local machine
    /// </summary>
    /// <returns>Enumeration of (ProjectMetadata, project directory) tuples for all projects</returns>
    private IEnumerable<ProjectDetails> LoadAllProjectDetails()
    {
        Console.WriteLine(ProjectRootFolder);
        foreach (var dir in Directory.EnumerateDirectories(ProjectRootFolder))
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

        errorMessage = "";
        return metadata;
    }

    #endregion
}
