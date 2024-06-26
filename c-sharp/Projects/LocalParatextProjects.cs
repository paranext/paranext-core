using System.Xml;
using Paranext.DataProvider.ParatextUtils;
using Paratext.Data;
using Paratext.Data.Users;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Direct access methods to the file system for Paratext project directories
/// </summary>
internal class LocalParatextProjects
{
    #region Constructors, consts, and fields

    // Inside each project's "home" directory, these are the subdirectories and files
    protected const string PROJECT_SETTINGS_FILE = "Settings.xml";

    /// <summary>
    /// Directory inside a project's root directory where Platform.Bible's extension data is stored
    /// </summary>
    public const string EXTENSION_DATA_SUBDIRECTORY = "shared/platform.bible/extensions";

    private bool _isInitialized = false;
    private readonly object _initializationLock = new();

    private readonly List<string> _requiredProjectRootFiles = ["usfm.sty", "Attribution.md"];

    private static readonly List<string> s_paratextProjectInterfaces = [
        ProjectInterfaces.BASE,
        ProjectInterfaces.USFM_BOOK,
        ProjectInterfaces.USFM_CHAPTER,
        ProjectInterfaces.USFM_VERSE,
        ProjectInterfaces.USX_BOOK,
        ProjectInterfaces.USX_CHAPTER,
        ProjectInterfaces.USX_VERSE];

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
        if (_isInitialized)
            return;

        lock (_initializationLock)
        {
            if (_isInitialized)
                return;

            // Make sure the necessary directory and files exist for the project root folder
            SetUpProjectRootFolder();

            // Set up the ScrTextCollection and read the projects in that folder
            ParatextGlobals.Initialize(ProjectRootFolder);

            Console.WriteLine(
                $"Projects loaded from {ProjectRootFolder}: {string.Join(",", GetScrTexts().Select(scrText => scrText.Name))}");

            // Read the projects in any locations other than project root folder
            IEnumerable<ProjectDetails> otherProjectDetails =
                LoadOtherProjectDetails(shouldIncludePT9ProjectsOnWindows);

            if (otherProjectDetails.Any())
                Console.WriteLine(
                    $"Projects found in other locations: {string.Join(",", otherProjectDetails.Select(projectDetails => projectDetails.Name))}");

            foreach (ProjectDetails projectDetails in otherProjectDetails)
            {
                try
                {
                    AddProjectToScrTextCollection(projectDetails);
                    Console.WriteLine($"Loaded project details: {projectDetails}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Failed to load project for {projectDetails}: {ex}");
                }
            }

            // If there are no projects available anywhere, throw in the sample WEB one
            if (!GetScrTexts().Any())
            {
                Console.WriteLine("No projects found. Setting up sample WEB project");
                SetUpSampleProject();

                ScrTextCollection.RefreshScrTexts();
            }

            _isInitialized = true;
        }
    }

    public IEnumerable<ProjectDetails> GetAllProjectDetails()
    {
        return GetScrTexts().Select(scrText => scrText.GetProjectDetails());
    }

    public ProjectDetails GetProjectDetails(string projectId)
    {
        return GetParatextProject(projectId).GetProjectDetails();
    }

    public static ScrText GetParatextProject(string projectId)
    {
        return ScrTextCollection.GetById(HexId.FromStr(projectId));
    }

    public static List<string> GetParatextProjectInterfaces()
    {
        return [..s_paratextProjectInterfaces];
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

    private static IEnumerable<ScrText> GetScrTexts() {
        return ScrTextCollection.ScrTexts(IncludeProjects.ScriptureOnly);
    }

    private static void AddProjectToScrTextCollection(ProjectDetails projectDetails)
    {
        var projectPath = projectDetails.HomeDirectory;

        var projectName = new ProjectName
        {
            ShortName = projectDetails.Name,
            ProjectPath = projectPath
        };
        ScrTextCollection.Add(new ScrText(projectName, RegistrationInfo.DefaultUser));
    }

    /// <summary>
    /// Return projects that are available on disk on the local machine
    /// </summary>
    /// <returns>Enumeration of (ProjectMetadata, project directory) tuples for all projects</returns>
    private IEnumerable<ProjectDetails> LoadOtherProjectDetails(bool shouldIncludePT9ProjectsOnWindows)
    {
        // Get project info for projects outside the normal project root folder
        List<string> nonPT9ProjectRootFolders = [];
        if (OperatingSystem.IsWindows() && shouldIncludePT9ProjectsOnWindows && Directory.Exists(Paratext9ProjectsFolder)) nonPT9ProjectRootFolders.Add(Paratext9ProjectsFolder);

        foreach (var rootFolder in nonPT9ProjectRootFolders)
        {
            foreach (var dir in Directory.EnumerateDirectories(rootFolder))
            {
                // There are a lot of folders with underscores in the name that we should ignore in
                // My Paratext 9 Projects
                if (rootFolder == Paratext9ProjectsFolder && Path.GetFileNameWithoutExtension(dir).StartsWith('_')) continue;

                ProjectDetails? projectDetails;
                string errorMessage;
                try
                {
                    projectDetails = LoadProjectDetails(dir, out errorMessage);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error while getting project details from {dir}: {ex}");
                    continue;
                }

                if (projectDetails == null)
                    Console.WriteLine(errorMessage);
                else
                    yield return projectDetails;
            }
        }
    }

    private static ProjectDetails? LoadProjectDetails(
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

        // ScrText always prioritizes the folder name over the Name setting as the "name" even when
        // accessing scrText.Settings.Name. So we're copying Paratext's functionality here and using
        // the folder name instead of Settings.Name.
        // https://github.com/ubsicap/Paratext/blob/aaadecd828a9b02e6f55d18e4c5dda8703ce2429/ParatextData/ScrText.cs#L258
        // Removing extension twice because file may be in form name.id.ext to match Paratext
        // https://github.com/ubsicap/Paratext/blob/aaadecd828a9b02e6f55d18e4c5dda8703ce2429/ParatextData/ScrTextCollection.cs#L1661
        var shortName = Path.GetFileNameWithoutExtension(Path.GetFileNameWithoutExtension(projectHomeDir));

        var idNode = settings.SelectSingleNode("/ScriptureText/Guid");
        if (idNode == null)
        {
            errorMessage = $"Could not find Guid in Settings.xml of {projectHomeDir}";
            return null;
        }
        var id = idNode.InnerText;

        var metadata = new ProjectMetadata(id, GetParatextProjectInterfaces());

        var details = new ProjectDetails(shortName, metadata, projectHomeDir);

        errorMessage = "";
        return details;
    }

    private void SetUpProjectRootFolder()
    {
        CreateDirectory(ProjectRootFolder);

        // Add usfm.sty and Attribution.md
        foreach (string requiredFile in _requiredProjectRootFiles)
        {
            var dest = Path.Join(ProjectRootFolder, requiredFile);
            if (!File.Exists(dest))
                File.Copy(Path.Join("assets", requiredFile), dest);
        }
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
