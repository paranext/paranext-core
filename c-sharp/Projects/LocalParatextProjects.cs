using System.Collections.Concurrent;
using System.Xml;
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
    protected const string PROJECT_SETTINGS_FILE = "Settings.xml";

    protected static readonly List<string> _paratextProjectInterfaces = [ProjectInterfaces.Paratext];

    /// <summary>
    /// Directory inside a project's root directory where Platform.Bible's extension data is stored
    /// </summary>
    public const string EXTENSION_DATA_SUBDIRECTORY = "shared/platform.bible/extensions";

    protected readonly ConcurrentDictionary<string, ProjectDetails> _projectDetailsMap = new();

    public LocalParatextProjects()
    {
        ProjectRootFolder = Path.Join(
            Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
            ".platform.bible",
            "projects",
            "Paratext 9 Projects"
        );

        Paratext9ProjectsFolder = Path.Join(Path.GetPathRoot(Environment.CurrentDirectory), "My Paratext 9 Projects");
    }

    #endregion

    #region Public properties and methods


    public virtual void Initialize(bool shouldIncludePT9ProjectsOnWindows)
    {
        if (!_projectDetailsMap.IsEmpty)
            return;

        CreateDirectory(ProjectRootFolder);

        IEnumerable<ProjectDetails> allProjectDetails = LoadAllProjectDetails(shouldIncludePT9ProjectsOnWindows);

        if (!allProjectDetails.Any())
        {
            SetUpSampleProject();

            allProjectDetails = LoadAllProjectDetails(shouldIncludePT9ProjectsOnWindows);
        }

        foreach (ProjectDetails projectDetails in allProjectDetails)
        {
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

    public ProjectDetails GetProjectDetails(string projectId)
    {
        return _projectDetailsMap[projectId.ToUpperInvariant()];
    }

    public static ScrText GetParatextProject(string projectId)
    {
        return ScrTextCollection.GetById(HexId.FromStr(projectId));
    }

    #endregion

    #region Protected properties and methods

    protected virtual string ProjectRootFolder { get; }
    protected virtual string Paratext9ProjectsFolder { get; }

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

    private void AddProjectToMaps(ProjectDetails projectDetails)
    {
        var projectPath = projectDetails.HomeDirectory;

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
    private IEnumerable<ProjectDetails> LoadAllProjectDetails(bool shouldIncludePT9ProjectsOnWindows)
    {
        List<string> projectRootFolders = [ProjectRootFolder];
        if (OperatingSystem.IsWindows() && shouldIncludePT9ProjectsOnWindows && Directory.Exists(Paratext9ProjectsFolder)) projectRootFolders.Add(Paratext9ProjectsFolder);

        foreach (var rootFolder in projectRootFolders)
        {
            foreach (var dir in Directory.EnumerateDirectories(rootFolder))
            {
                // There are a lot of folders with underscores in the name that we should ignore in
                // My Paratext 9 Projects
                if (rootFolder == Paratext9ProjectsFolder && Path.GetFileName(dir).StartsWith('_')) continue;

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
    }

    private static ProjectMetadata? LoadProjectMetadata(
        string projectHomeDir,
        out string errorMessage
    )
    {
        string settingsFilePath = Path.Combine(projectHomeDir, PROJECT_SETTINGS_FILE);
        if (!File.Exists(settingsFilePath))
        {
            errorMessage = $"Ignoring project without Settings.xml file: {projectHomeDir}";
            return null;
        }

        var settings = new XmlDocument();
        settings.Load(settingsFilePath);

        var nameNode = settings.SelectSingleNode("/ScriptureText/Name");
        if (nameNode == null)
        {
            errorMessage = $"Could not find Name in Settings.xml of {projectHomeDir}";
            return null;
        }
        var shortName = nameNode.InnerText;

        var idNode = settings.SelectSingleNode("/ScriptureText/Guid");
        if (idNode == null)
        {
            errorMessage = $"Could not find Guid in Settings.xml of {projectHomeDir}";
            return null;
        }
        var id = idNode.InnerText;

        var metadata = new ProjectMetadata(id, shortName, _paratextProjectInterfaces);

        errorMessage = "";
        return metadata;
    }

    private void SetUpSampleProject()
    {
        string projectName = "WEB";
        string projectFolderName = projectName;
        string projectFolder = Path.Join(ProjectRootFolder, projectFolderName);

        CreateDirectory(Path.Join(projectFolder));

        foreach (string filePath in Directory.GetFiles("assets/" + projectName, "*.*"))
        {
            File.Copy(
                filePath,
                filePath.Replace(
                    "assets/" + projectName,
                    Path.Join(projectFolder)
                )
            );
        }
    }

    #endregion
}
