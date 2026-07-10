using Paranext.DataProvider.ParatextUtils;
using Paranext.DataProvider.Users;
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

    private readonly List<string> _requiredProjectRootFiles =
    [
        "usfm.sty",
        "usfm_sb.sty",
        "Attribution.md",
        "CountryStatuses.xml",
    ];

    // Published projects are read-only in PT9 — ResourceProjectFileManager.SetXml() throws
    // AttemptedResourceWritingException — and cannot accept comment writes. They therefore do not
    // advertise legacyCommentManager.comments; everything else still applies because published
    // projects can still be read for scripture and resource-references. The unpublished list is
    // defined as the published list plus the comment interface so the two stay in sync by
    // construction.
    private static readonly List<string> s_paratextPublishedProjectInterfaces =
    [
        ProjectInterfaces.BASE,
        ProjectInterfaces.USFM_BOOK,
        ProjectInterfaces.USFM_CHAPTER,
        ProjectInterfaces.USFM_VERSE,
        ProjectInterfaces.USX_BOOK,
        ProjectInterfaces.USX_CHAPTER,
        ProjectInterfaces.USX_VERSE,
        ProjectInterfaces.PLAIN_TEXT_VERSE,
        ProjectInterfaces.MARKER_NAMES,
        ProjectInterfaces.TEXT_CONNECTION_SETTINGS,
        ProjectInterfaces.USER_EDITOR_SETTINGS,
        ProjectInterfaces.SCRIPTURE_EDIT_PERMISSIONS,
        ProjectInterfaces.VERSIFICATION,
    ];

    private static readonly List<string> s_paratextUnpublishedProjectInterfaces =
    [
        .. s_paratextPublishedProjectInterfaces,
        ProjectInterfaces.LEGACY_COMMENT,
    ];

    public LocalParatextProjects()
    {
        // E2E tests (and other tooling) can point the app at an isolated projects folder so runs
        // don't touch the user's real projects; Initialize() installs the bundled sample WEB
        // project into an empty root. See e2e-tests/fixtures/helpers.ts (isolatedProjectRoot).
        string? projectRootOverride = Environment.GetEnvironmentVariable(
            "PLATFORM_BIBLE_PROJECT_ROOT_FOLDER"
        );
        if (string.IsNullOrWhiteSpace(projectRootOverride))
        {
            ProjectRootFolder = Path.Join(
                Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
                ".platform.bible",
                "projects",
                "Paratext 9 Projects"
            );
        }
        else
        {
            Console.WriteLine(
                $"PLATFORM_BIBLE_PROJECT_ROOT_FOLDER is set; overriding project root folder to: {projectRootOverride}"
            );
            ProjectRootFolder = projectRootOverride;
        }
    }

    #endregion

    #region Public properties and methods

    public virtual void Initialize()
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
                $"Projects loaded from {ProjectRootFolder}: {string.Join(",", GetScrTexts().Select(scrText => scrText.Name))}"
            );

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

    /// <summary>
    /// All available Paratext projects (the union of <see cref="GetAvailableUnpublishedProjectDetails"/>
    /// and <see cref="GetAvailablePublishedProjectDetails"/>). Defined in terms of the partition
    /// helpers so future filtering added to either partition automatically applies here too.
    /// </summary>
    public IEnumerable<ProjectDetails> GetAllProjectDetails()
    {
        return GetAvailableUnpublishedProjectDetails()
            .Concat(GetAvailablePublishedProjectDetails());
    }

    /// <summary>
    /// Available unpublished Paratext projects (regular, editable scripture projects).
    /// Used by <see cref="ParatextProjectDataProviderFactory"/> to populate its project list.
    /// </summary>
    public IEnumerable<ProjectDetails> GetAvailableUnpublishedProjectDetails()
    {
        // IsResourceProject is true for ResourceScrText and JoinedScrText (PT9's read-only
        // resource-backed project shapes); everything else is unpublished.
        return GetVisibleScrTexts()
            .Where(scrText => !scrText.IsResourceProject)
            .Select(scrText => scrText.GetProjectDetails());
    }

    /// <summary>
    /// Available published Paratext projects (read-only DBL / biblical resources).
    /// Used by <see cref="ParatextPublishedProjectDataProviderFactory"/> to populate its project list.
    /// </summary>
    public IEnumerable<ProjectDetails> GetAvailablePublishedProjectDetails()
    {
        // IsResourceProject is true for ResourceScrText and JoinedScrText (PT9's read-only
        // resource-backed project shapes).
        return GetVisibleScrTexts()
            .Where(scrText => scrText.IsResourceProject)
            .Select(scrText => scrText.GetProjectDetails());
    }

    /// <summary>
    /// Returns the set of ScrTexts that should be visible to the user given current registration
    /// state. When the user has no valid Paratext registration, published projects are filtered out
    /// entirely (matching PT9 behavior).
    /// </summary>
    private static IEnumerable<ScrText> GetVisibleScrTexts()
    {
        var allScrTexts = GetScrTexts();
        if (!RegistrationInfo.DefaultUser.IsValid)
            allScrTexts = allScrTexts.Where((scrText) => !scrText.IsResourceProject);
        return allScrTexts;
    }

    public ProjectDetails GetProjectDetails(string projectId)
    {
        return GetParatextProject(projectId).GetProjectDetails();
    }

    public static ScrText GetParatextProject(string projectId)
    {
        var retVal = ScrTextCollection.GetById(HexId.FromStr(projectId));
        if (retVal.IsResourceProject && !RegistrationInfo.DefaultUser.IsValid)
            throw new RegistrationRequiredException();
        return retVal;
    }

    public static List<string> GetParatextProjectInterfaces(bool isPublished)
    {
        var source = isPublished
            ? s_paratextPublishedProjectInterfaces
            : s_paratextUnpublishedProjectInterfaces;
        return [.. source];
    }
    #endregion

    #region Protected properties and methods

    protected virtual string ProjectRootFolder { get; }

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

    private static IEnumerable<ScrText> GetScrTexts()
    {
        return ScrTextCollection.ScrTexts(IncludeProjects.ScriptureOnly);
    }

    private static void AddProjectToScrTextCollection(ProjectDetails projectDetails)
    {
        var projectPath = projectDetails.HomeDirectory;

        var projectName = new ProjectName
        {
            ShortName = projectDetails.Name,
            ProjectPath = projectPath,
        };
        ScrTextCollection.Add(new ScrText(projectName, RegistrationInfo.DefaultUser));
    }

    private void SetUpProjectRootFolder()
    {
        CreateDirectory(ProjectRootFolder);

        // Add usfm.sty and Attribution.md
        foreach (string requiredFile in _requiredProjectRootFiles)
        {
            string basePath = AppContext.BaseDirectory;
            string sourcePath = Path.Combine(basePath, "assets", requiredFile);
            string dest = Path.Join(ProjectRootFolder, requiredFile);
            File.Copy(sourcePath, dest, true);
        }
    }

    private void SetUpSampleProject()
    {
        string projectName = "WEB";
        string projectFolderName = projectName;
        string projectFolder = Path.Join(ProjectRootFolder, projectFolderName);

        CreateDirectory(Path.Join(projectFolder));

        var projectInAssets = Path.Join(AppContext.BaseDirectory, "assets", projectName);
        foreach (string filePath in Directory.GetFiles(projectInAssets, "*.*"))
        {
            File.Copy(filePath, filePath.Replace(projectInAssets, Path.Join(projectFolder)));
        }
    }

    #endregion
}
