using System.Diagnostics.CodeAnalysis;
using System.IO;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class MarblePackageDiscovererTests
{
    private string _tempDir = null!;
    private string _byIdDir = null!;

    [SetUp]
    public void SetUp()
    {
        _tempDir = Path.Combine(Path.GetTempPath(), $"mpd-{Guid.NewGuid():N}");
        _byIdDir = Path.Combine(_tempDir, "_resourcesById");
        Directory.CreateDirectory(_tempDir);
        Directory.CreateDirectory(_byIdDir);
    }

    [TearDown]
    public void TearDown()
    {
        if (Directory.Exists(_tempDir))
            Directory.Delete(_tempDir, recursive: true);
    }

    [Test]
    public void Discover_DirectoryDoesNotExist_ReturnsEmptyResult()
    {
        var missing = Path.Combine(Path.GetTempPath(), $"mpd-missing-{Guid.NewGuid():N}");
        var discoverer = new MarblePackageDiscoverer(
            resourcesDirectory: missing,
            resourcesByIdDirectory: missing,
            skipV1Deletion: true
        );

        var result = discoverer.Discover();

        Assert.That(result.BiblePackages, Is.Empty);
        Assert.That(result.ResearchPackages, Is.Empty);
        Assert.That(result.HaveVersion2Resources, Is.False);
    }

    [Test]
    public void Discover_V2BiblesPresent_SetsHaveVersion2ResourcesTrue()
    {
        // Create empty zero-byte placeholder files. The discoverer will try to construct
        // ResourceScrText from each, which will throw - and the discoverer should
        // catch and skip. The V2-detection pass is purely filesystem-based, so it will
        // still flip HaveVersion2Resources = true.
        File.WriteAllBytes(Path.Combine(_tempDir, "TECLOT.mbv2z"), []);

        var discoverer = new MarblePackageDiscoverer(_tempDir, _byIdDir, skipV1Deletion: true);
        var result = discoverer.Discover();

        Assert.That(result.HaveVersion2Resources, Is.True);
        Assert.That(
            result.SkippedFileCount,
            Is.GreaterThan(0),
            "zero-byte placeholder should have failed to load and been counted as skipped"
        );
    }

    [Test]
    public void Discover_CorruptFile_IsSkipped_RestOfDiscoveryContinues()
    {
        // Two empty placeholder files.
        File.WriteAllBytes(Path.Combine(_tempDir, "TECLOT.mbv2z"), []);
        File.WriteAllBytes(Path.Combine(_tempDir, "NETS.mbv2z"), []);

        var discoverer = new MarblePackageDiscoverer(_tempDir, _byIdDir, skipV1Deletion: true);
        var result = discoverer.Discover();

        Assert.That(result.SkippedFileCount, Is.EqualTo(2));
        Assert.That(result.BiblePackages, Is.Empty);
    }

    [Test]
    public void Discover_V1WithMatchingV2_V1FileDeletedWhenSkipV1DeletionFalse()
    {
        var v1Path = Path.Combine(_tempDir, "TECLOT.mbv1z");
        var v2Path = Path.Combine(_tempDir, "TECLOT.mbv2z");
        File.WriteAllBytes(v1Path, []);
        File.WriteAllBytes(v2Path, []);

        var discoverer = new MarblePackageDiscoverer(_tempDir, _byIdDir, skipV1Deletion: false);
        discoverer.Discover();

        Assert.That(
            File.Exists(v1Path),
            Is.False,
            "V1 file should have been deleted because matching V2 exists"
        );
        // Note: we cannot assert V2 file existence here because ParatextData's
        // ResourceScrText constructor deletes zero-byte placeholder files during
        // load as part of its own corrupt-file cleanup. In production, real V2
        // zips load cleanly and remain on disk.
    }

    [Test]
    public void Discover_FileIn_resourcesById_IsEnumerated()
    {
        File.WriteAllBytes(Path.Combine(_byIdDir, "TECLOT.abc123.mbv2z"), []);

        var discoverer = new MarblePackageDiscoverer(_tempDir, _byIdDir, skipV1Deletion: true);
        var result = discoverer.Discover();

        Assert.That(
            result.HaveVersion2Resources,
            Is.True,
            "V2 file in _resourcesById should be detected"
        );
    }

    [Test]
    public void Discover_V1WithMatchingV2_V1FilePreservedWhenSkipV1DeletionTrue()
    {
        var v1Path = Path.Combine(_tempDir, "TECLOT.mbv1z");
        var v2Path = Path.Combine(_tempDir, "TECLOT.mbv2z");
        File.WriteAllBytes(v1Path, []);
        File.WriteAllBytes(v2Path, []);

        var discoverer = new MarblePackageDiscoverer(_tempDir, _byIdDir, skipV1Deletion: true);
        discoverer.Discover();

        Assert.That(File.Exists(v1Path), Is.True);
        // Note: we cannot assert V2 file existence here because ParatextData's
        // ResourceScrText constructor deletes zero-byte placeholder files during
        // load as part of its own corrupt-file cleanup. The key assertion for this
        // test is that the V1 file remains when skipV1Deletion=true.
    }
}
