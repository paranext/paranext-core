using System.Diagnostics.CodeAnalysis;
using SIL.TestUtilities;

namespace TestParanextDataProvider;

/// <summary>
/// Verifies how <see cref="FixtureSetup"/> names the run's temp folder and which stale folders its
/// sweep deletes.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class FixtureSetupTests
{
    private const string TEST_FOLDER_PREFIX = "Platform.Bible.Tests";

    private TemporaryFolder _parent = null!;

    [SetUp]
    public void SetUp()
    {
        // A private parent rather than the real temp directory, so the sweep under test cannot
        // reach another run's folders. Named under the swept prefix so a leaked one is cleaned up.
        _parent = new TemporaryFolder(
            $"{TEST_FOLDER_PREFIX}-{FixtureSetup.RunId}-{TestContext.CurrentContext.Test.ID}"
        );
    }

    [TearDown]
    public void TearDown()
    {
        _parent.Dispose();
    }

    [Test]
    public void RunId_IsAGuidInNFormat()
    {
        Assert.That(FixtureSetup.RunId, Does.Match("^[0-9a-f]{32}$"));
    }

    [Test]
    public void TestFolderPath_IsInTheTempDirectoryAndNamedForTheRun()
    {
        Assert.That(
            Path.GetFileName(FixtureSetup.TestFolderPath),
            Is.EqualTo($"{TEST_FOLDER_PREFIX}-{FixtureSetup.RunId}")
        );
        Assert.That(
            Path.GetDirectoryName(FixtureSetup.TestFolderPath),
            Is.EqualTo(Path.TrimEndingDirectorySeparator(Path.GetTempPath()))
        );
    }

    [Test]
    public void DeleteStaleTestFolders_CutoffAfterTheFoldersWereCreated_DeletesOnlyTestFolders()
    {
        string[] testFolders =
        [
            CreateFolder($"{TEST_FOLDER_PREFIX}-{Guid.NewGuid():N}"),
            CreateFolder(
                $"{TEST_FOLDER_PREFIX}-{Guid.NewGuid():N}-{TestContext.CurrentContext.Test.ID}"
            ),
            CreateFolder(TEST_FOLDER_PREFIX),
        ];
        // A file inside a test folder, so deleting it has to be recursive.
        File.WriteAllText(Path.Combine(testFolders[0], "usfm.sty"), "");
        string[] otherFolders = [CreateFolder("Unrelated"), CreateFolder($"{TEST_FOLDER_PREFIX}X")];

        FixtureSetup.DeleteStaleTestFolders(_parent.Path, DateTime.UtcNow.AddMinutes(1));

        Assert.That(testFolders.Where(Directory.Exists), Is.Empty);
        Assert.That(otherFolders.Where(Directory.Exists), Is.EquivalentTo(otherFolders));
    }

    [Test]
    public void DeleteStaleTestFolders_CutoffBeforeTheFoldersWereCreated_KeepsEverything()
    {
        string[] folders =
        [
            CreateFolder($"{TEST_FOLDER_PREFIX}-{Guid.NewGuid():N}"),
            CreateFolder(TEST_FOLDER_PREFIX),
            CreateFolder("Unrelated"),
        ];

        FixtureSetup.DeleteStaleTestFolders(_parent.Path, DateTime.UtcNow.AddMinutes(-1));

        Assert.That(folders.Where(Directory.Exists), Is.EquivalentTo(folders));
    }

    [Test]
    public void DeleteStaleTestFolders_ParentDoesNotExist_DoesNotThrow()
    {
        string missingParent = Path.Combine(_parent.Path, "missing");

        Assert.DoesNotThrow(
            () => FixtureSetup.DeleteStaleTestFolders(missingParent, DateTime.UtcNow.AddMinutes(1))
        );
    }

    private string CreateFolder(string name) =>
        Directory.CreateDirectory(Path.Combine(_parent.Path, name)).FullName;
}
