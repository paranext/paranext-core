using NUnit.Framework;

namespace Paranext.WireSurface.Tests;

public class ScanOptionsTests
{
    private const string Usage =
        "usage: Paranext.WireSurface --project <csproj> --repo-root <dir> --tracked-files <list> --out <json>";

    private string _tempDir = null!;
    private string _trackedFilesPath = null!;

    [SetUp]
    public void SetUp()
    {
        _tempDir = Directory.CreateTempSubdirectory("wire-surface-options-").FullName;
        _trackedFilesPath = Path.Combine(_tempDir, "tracked.txt");
    }

    [TearDown]
    public void TearDown()
    {
        if (Directory.Exists(_tempDir))
            Directory.Delete(_tempDir, recursive: true);
    }

    [Test]
    public void HappyPathParsesAllFourValues()
    {
        File.WriteAllText(_trackedFilesPath, "a.cs\nb.cs\n");
        var stderr = new StringWriter();

        var options = ScanOptions.Parse(
            [
                "--project",
                "P.csproj",
                "--repo-root",
                "/repo",
                "--tracked-files",
                _trackedFilesPath,
                "--out",
                "out.json",
            ],
            stderr
        );

        Assert.That(options, Is.Not.Null);
        Assert.That(options!.ProjectPath, Is.EqualTo("P.csproj"));
        Assert.That(options.RepoRoot, Is.EqualTo("/repo"));
        Assert.That(options.OutputPath, Is.EqualTo("out.json"));
        Assert.That(options.TrackedFiles, Is.EquivalentTo(new[] { "a.cs", "b.cs" }));
        Assert.That(stderr.ToString(), Is.Empty);
    }

    [Test]
    public void CrlfTrackedListIsTrimmedAndBlankLinesDropped()
    {
        File.WriteAllText(_trackedFilesPath, "a.cs\r\n\r\nb.cs\r\n   \r\nc.cs");
        var stderr = new StringWriter();

        var options = ScanOptions.Parse(
            [
                "--project",
                "P.csproj",
                "--repo-root",
                "/repo",
                "--tracked-files",
                _trackedFilesPath,
                "--out",
                "out.json",
            ],
            stderr
        );

        Assert.That(options, Is.Not.Null);
        Assert.That(options!.TrackedFiles, Is.EquivalentTo(new[] { "a.cs", "b.cs", "c.cs" }));
    }

    [Test]
    public void MissingRequiredFlagWritesUsageAndReturnsNull()
    {
        File.WriteAllText(_trackedFilesPath, "a.cs\n");
        var stderr = new StringWriter();

        // --out is omitted.
        var options = ScanOptions.Parse(
            ["--project", "P.csproj", "--repo-root", "/repo", "--tracked-files", _trackedFilesPath],
            stderr
        );

        Assert.That(options, Is.Null);
        Assert.That(stderr.ToString().Trim(), Is.EqualTo(Usage));
    }

    [Test]
    public void DuplicateFlagWritesUsageAndReturnsNull()
    {
        File.WriteAllText(_trackedFilesPath, "a.cs\n");
        var stderr = new StringWriter();

        var options = ScanOptions.Parse(
            [
                "--project",
                "P.csproj",
                "--project",
                "Q.csproj",
                "--repo-root",
                "/repo",
                "--tracked-files",
                _trackedFilesPath,
                "--out",
                "out.json",
            ],
            stderr
        );

        Assert.That(options, Is.Null);
        Assert.That(stderr.ToString().Trim(), Is.EqualTo(Usage));
    }

    [Test]
    public void UnrecognisedFlagWritesUsageAndReturnsNull()
    {
        File.WriteAllText(_trackedFilesPath, "a.cs\n");
        var stderr = new StringWriter();

        var options = ScanOptions.Parse(
            [
                "--project",
                "P.csproj",
                "--bogus",
                "value",
                "--repo-root",
                "/repo",
                "--tracked-files",
                _trackedFilesPath,
                "--out",
                "out.json",
            ],
            stderr
        );

        Assert.That(options, Is.Null);
        Assert.That(stderr.ToString().Trim(), Is.EqualTo(Usage));
    }

    [Test]
    public void FlagWithNoFollowingValueWritesUsageAndReturnsNull()
    {
        File.WriteAllText(_trackedFilesPath, "a.cs\n");
        var stderr = new StringWriter();

        var options = ScanOptions.Parse(
            [
                "--project",
                "P.csproj",
                "--repo-root",
                "/repo",
                "--tracked-files",
                _trackedFilesPath,
                "--out",
            ],
            stderr
        );

        Assert.That(options, Is.Null);
        Assert.That(stderr.ToString().Trim(), Is.EqualTo(Usage));
    }

    [Test]
    public void NonexistentTrackedFilesPathWritesDescriptiveErrorAndReturnsNull()
    {
        var missingPath = Path.Combine(_tempDir, "does-not-exist.txt");
        var stderr = new StringWriter();

        var options = ScanOptions.Parse(
            [
                "--project",
                "P.csproj",
                "--repo-root",
                "/repo",
                "--tracked-files",
                missingPath,
                "--out",
                "out.json",
            ],
            stderr
        );

        Assert.That(options, Is.Null);
        Assert.That(stderr.ToString(), Does.Contain(missingPath));
        Assert.That(stderr.ToString(), Does.Contain("could not read"));
    }
}
