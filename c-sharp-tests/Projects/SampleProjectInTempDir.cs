using System.Diagnostics.CodeAnalysis;
using System.Text;
using Paratext.Data;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// An on-disk copy of the bundled sample WEB project in a temporary project root, installed and
/// loaded the way the backend does it at startup. For tests that judge what the backend writes to a
/// real project folder.
/// </summary>
/// <remarks>
/// ParatextData keeps loaded projects in one process-wide collection, so only one copy may be
/// installed at a time: dispose one before installing the next. A test can therefore install, use
/// and dispose a copy, then install a fresh one in the same folder.
/// </remarks>
[ExcludeFromCodeCoverage]
internal sealed class SampleProjectInTempDir : IDisposable
{
    private const string SAMPLE_PROJECT_OPT_IN_VARIABLE = "PLATFORM_BIBLE_INSTALL_SAMPLE_PROJECT";
    private const string SAMPLE_PROJECT_FOLDER = "WEB";

    private SampleProjectInTempDir(TestLocalParatextProjectsInTempDir localProjects)
    {
        LocalProjects = localProjects;
        ProjectFolder = Path.Join(localProjects.TestProjectRootFolder, SAMPLE_PROJECT_FOLDER);
    }

    public TestLocalParatextProjectsInTempDir LocalProjects { get; }

    public DummyPapiClient Client { get; } = new();

    public string ProjectFolder { get; }

    public static ScrText Project =>
        ScrTextCollection.ScrTexts(IncludeProjects.Everything).Single();

    public string ProjectId => LocalProjects.GetAllProjectDetails().Single().Metadata.Id;

    /// <summary>Copies the bundled sample into an empty project root and loads it.</summary>
    public static SampleProjectInTempDir Install()
    {
        // Required for the Paratext.Data.Encodings.StringEncoders static constructor
        Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

        // The constructor reads the opt-in once, so it is restored right after construction
        string? original = Environment.GetEnvironmentVariable(SAMPLE_PROJECT_OPT_IN_VARIABLE);
        Environment.SetEnvironmentVariable(SAMPLE_PROJECT_OPT_IN_VARIABLE, "true");
        TestLocalParatextProjectsInTempDir localProjects;
        try
        {
            localProjects = new TestLocalParatextProjectsInTempDir();
        }
        finally
        {
            Environment.SetEnvironmentVariable(SAMPLE_PROJECT_OPT_IN_VARIABLE, original);
        }

        // A project another test left loaded (such as the bundled sample itself, loaded from the
        // build output) would make this copy a duplicate of it
        RemoveLoadedProjects();
        var sample = new SampleProjectInTempDir(localProjects);
        localProjects.Initialize();
        return sample;
    }

    private static void RemoveLoadedProjects()
    {
        foreach (ScrText project in ScrTextCollection.ScrTexts(IncludeProjects.Everything).ToList())
            ScrTextCollection.Remove(project, false);
    }

    /// <summary>
    /// The project folder as the project's next save leaves it when nothing but loading happened
    /// first: installs a fresh copy, saves it, reads the folder and disposes the copy again. Call it
    /// while no other copy is installed.
    /// </summary>
    public static Dictionary<string, byte[]> SnapshotAfterSavingAnUntouchedCopy()
    {
        using var untouched = Install();
        Project.Save();
        return untouched.SnapshotProjectFolder();
    }

    /// <summary>Every file of the project folder, by path relative to it.</summary>
    public Dictionary<string, byte[]> SnapshotProjectFolder() =>
        Directory
            .GetFiles(ProjectFolder, "*", SearchOption.AllDirectories)
            .ToDictionary(path => Path.GetRelativePath(ProjectFolder, path), File.ReadAllBytes);

    /// <summary>
    /// Asserts that <paramref name="actual"/> has the same files as <paramref name="expected"/>, each
    /// with the same bytes. A file whose bytes differ is reported as text, so the difference shows.
    /// </summary>
    public static void AssertSameFiles(
        Dictionary<string, byte[]> expected,
        Dictionary<string, byte[]> actual,
        string what
    )
    {
        Assert.Multiple(() =>
        {
            Assert.That(actual.Keys.Except(expected.Keys), Is.Empty, $"{what}: files added");
            Assert.That(expected.Keys.Except(actual.Keys), Is.Empty, $"{what}: files removed");
            foreach (var (file, bytes) in expected)
            {
                if (!actual.TryGetValue(file, out byte[]? actualBytes))
                    continue;
                Assert.That(
                    Encoding.UTF8.GetString(actualBytes),
                    Is.EqualTo(Encoding.UTF8.GetString(bytes)),
                    $"{what}: {file}"
                );
                // Bytes that are not UTF-8 all decode to the same replacement character
                Assert.That(
                    actualBytes.AsSpan().SequenceEqual(bytes),
                    Is.True,
                    $"{what}: {file} has different bytes"
                );
            }
        });
    }

    public void Dispose()
    {
        RemoveLoadedProjects();
        Client.Dispose();
        LocalProjects.Dispose();
    }
}
