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
    private const string PROJECT_PARATEXT_SUBDIRECTORY = "project";
    private const string PROJECT_EXTENSIONS_SUBDIRECTORY = "extensions";
    private const string PROJECT_METADATA_FILE = "meta.json";

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
        var projectDir = Path.Join(s_projectRootFolder, $"{metadata.Name}_${metadata.ID}");
        var projectParatextDir = Path.Join(projectDir, PROJECT_PARATEXT_SUBDIRECTORY);
        var projectExtensionsDir = Path.Join(projectDir, PROJECT_EXTENSIONS_SUBDIRECTORY);
        var metadataFilePath = Path.Join(projectDir, PROJECT_METADATA_FILE);

        if (File.Exists(metadataFilePath) && !overwrite)
            throw new InvalidOperationException(
                "Cannot overwrite metadata unless the overwrite flag is true"
            );

        if (!Directory.Exists(projectParatextDir))
        {
            if (OperatingSystem.IsWindows())
            {
                Directory.CreateDirectory(projectParatextDir);
                Directory.CreateDirectory(projectExtensionsDir);
            }
            else
            {
                Directory.CreateDirectory(projectParatextDir, UnixFileMode.UserWrite);
                Directory.CreateDirectory(projectExtensionsDir, UnixFileMode.UserWrite);
            }
        }

        File.WriteAllText(metadataFilePath, metadata.ToJsonString());
        AddProjectToMaps(new ProjectDetails(metadata, projectDir));
    }

    public static void LoadProject(string projectName, Guid projectID)
    {
        var dir = Path.Join(s_projectRootFolder, $"{projectName}_${projectID}");
        var projectMetadata =
            LoadProjectMetadata(dir, out string errorMessage) ?? throw new Exception(errorMessage);
        AddProjectToMaps(new ProjectDetails(projectMetadata, dir));
    }

    private static void AddProjectToMaps(ProjectDetails projectDetails)
    {
        ProjectName projectName =
            new(Path.Join(projectDetails.Directory, PROJECT_PARATEXT_SUBDIRECTORY));
        // TODO: Figure out a way to get a proper Paratext user
        ParatextUser paratextUser = new DummyParatextUser(Environment.UserName);
        var id = projectDetails.Metadata.ID;
        if (s_projectDetailsMap.ContainsKey(id) || s_paratextProjectMap.ContainsKey(id))
            Console.WriteLine($"Replacing Paratext project in map: {id}");
        s_projectDetailsMap[id] = projectDetails;
        s_paratextProjectMap[id] = new ScrText(projectName, paratextUser);
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
        string projectDirectory,
        out string errorMessage
    )
    {
        if (!Directory.Exists(Path.Combine(projectDirectory, PROJECT_PARATEXT_SUBDIRECTORY)))
        {
            errorMessage = $"Ignoring project without \"project\" subdir: {projectDirectory}";
            return null;
        }

        // Don't require the extensions subdirectory to exist

        string metadataFilePath = Path.Combine(projectDirectory, PROJECT_METADATA_FILE);
        if (!File.Exists(metadataFilePath))
        {
            errorMessage = $"Ignoring project without metadata file: {projectDirectory}";
            return null;
        }

        string json = File.ReadAllText(metadataFilePath);
        if (!ProjectMetadataConverter.TryGetMetadata(json, out var metadata, out string error))
        {
            errorMessage = $"Invalid project metadata at {metadataFilePath}: {error}";
            return null;
        }

        string finalDirectory = projectDirectory.Split(Path.DirectorySeparatorChar).Last();
        var matches = ProjectDirectoryRegex().Matches(finalDirectory);
        if (
            (matches.Count != 1)
            || Guid.Parse(matches[0].Groups["id"].Value) != metadata!.ID
            || matches[0].Groups["name"].Value != metadata.Name
        )
        {
            errorMessage = $"Project directory does not match its metadata: {projectDirectory}";
            return null;
        }

        errorMessage = "";
        return metadata;
    }
}
