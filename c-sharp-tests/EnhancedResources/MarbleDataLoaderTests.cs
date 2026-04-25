using System.Diagnostics.CodeAnalysis;
using System.IO;
using Paranext.DataProvider.EnhancedResources;
using Paratext.Data;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Orchestration tests for MarbleDataLoader. These tests exercise the real loader
/// against a temp directory populated with zero-byte placeholder files - enough
/// to drive the discovery path, which skips corrupt files with logging. End-to-end
/// success with non-empty data is covered by the developer smoke check (Chunk 14),
/// not here, because real encrypted marble zips cannot be checked in.
///
/// Catastrophic-failure path uses an embedded-null-character path. Directory.Exists
/// throws ArgumentException for that input on Linux/.NET 8, which drives the top-level
/// try-catch in LoadAsync without requiring a test-only seam.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class MarbleDataLoaderTests
{
    private string _tempDir = null!;
    private string _byIdDir = null!;

    [SetUp]
    public void SetUp()
    {
        _tempDir = Path.Combine(Path.GetTempPath(), $"mdl-{Guid.NewGuid():N}");
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
    public async Task LoadAsync_EmptyDirectory_ReturnsMarbleDataWithEmptyContents()
    {
        var loader = new MarbleDataLoader(_tempDir, _byIdDir, skipV1Deletion: true);

        var result = await loader.LoadAsync();

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.BiblePackages, Is.Empty);
        Assert.That(result.ResearchPackages, Is.Empty);
        Assert.That(result.DictionaryData.ByDictionary, Is.Empty);
        Assert.That(result.EncyclopediaData.EntriesByTypeAndLanguage, Is.Empty);
        Assert.That(result.MediaData.Images, Is.Empty);
        Assert.That(result.SourceLanguageData.ByLemma, Is.Empty);
        Assert.That(result.GlossData.AvailableLanguages, Is.Empty);
    }

    [Test]
    public async Task LoadAsync_NoPackages_LogsNoMarbleDataInstalled()
    {
        // Capture stdout to observe the summary log.
        var originalOut = Console.Out;
        using var captured = new StringWriter();
        Console.SetOut(captured);

        try
        {
            var loader = new MarbleDataLoader(_tempDir, _byIdDir, skipV1Deletion: true);
            await loader.LoadAsync();
        }
        finally
        {
            Console.SetOut(originalOut);
        }

        Assert.That(
            captured.ToString(),
            Does.Contain("Enhanced Resources: no marble data installed"),
            "empty directory should produce the 'no marble data installed' summary"
        );
    }

    [Test]
    public async Task LoadAsync_CatastrophicFailure_LogsFailureAndReturnsNull()
    {
        // The null-character path trick doesn't actually throw on .NET 8 Linux
        // (Directory.Exists just returns false), so we use the subclass seam
        // documented in the plan: override LoadCore to throw.
        var originalOut = Console.Out;
        using var captured = new StringWriter();
        Console.SetOut(captured);

        MarbleData? result;
        try
        {
            var loader = new ThrowingMarbleDataLoader(_tempDir, _byIdDir);
            result = await loader.LoadAsync();
        }
        finally
        {
            Console.SetOut(originalOut);
        }

        Assert.That(result, Is.Null, "catastrophic failure should return null");
        Assert.That(
            captured.ToString(),
            Does.Contain("Enhanced Resources: load failed"),
            "catastrophic failure should emit the standard log line"
        );
    }

    /// <summary>
    /// Test-only subclass that forces <see cref="MarbleDataLoader.LoadCore"/> to throw,
    /// exercising the top-level catastrophic-failure try-catch in LoadAsync.
    /// </summary>
    private sealed class ThrowingMarbleDataLoader : MarbleDataLoader
    {
        public ThrowingMarbleDataLoader(string resourcesDirectory, string resourcesByIdDirectory)
            : base(resourcesDirectory, resourcesByIdDirectory, skipV1Deletion: true) { }

        protected override MarbleData LoadCore() =>
            throw new InvalidOperationException("forced failure for test");
    }

    [Test]
    public void LoadCore_MissingRequiredResearchPackages_PopulatesMissingRequiredPackages()
    {
        // Arrange: discoverer with no research packages installed
        var loader = new TestableMarbleDataLoader(
            new DiscoveryResult(
                BiblePackages: [],
                ResearchPackages: new Dictionary<string, ResourceScrText>(
                    StringComparer.OrdinalIgnoreCase
                ),
                HaveVersion2Resources: false,
                SkippedFileCount: 0
            )
        );

        // Act
        var data = loader.LoadAsync().GetAwaiter().GetResult();

        // Assert: every required research package missing
        Assert.That(data, Is.Not.Null);
        Assert.That(
            data!.MissingRequiredPackages,
            Is.EquivalentTo(
                new[] { "MBL_ENC", "IMG_INDX", "IMG_THMB", "SDBG", "SDBH", "GNT", "BHS" }
            )
        );
    }

    /// <summary>
    /// Test-only subclass that overrides <see cref="MarbleDataLoader.LoadCore"/> to use a
    /// caller-supplied <see cref="DiscoveryResult"/> instead of scanning disk. Lets tests
    /// drive the post-discovery composition path deterministically.
    /// </summary>
    private sealed class TestableMarbleDataLoader : MarbleDataLoader
    {
        private readonly DiscoveryResult _discovery;

        public TestableMarbleDataLoader(DiscoveryResult discovery)
            : base("/", "/", skipV1Deletion: true)
        {
            _discovery = discovery;
        }

        protected override MarbleData LoadCore() => CreateMarbleData(_discovery);
    }

    [Test]
    public async Task LoadAsync_DirectoryWithBibleButNoRequiredResearch_LogsMissingProjects()
    {
        // Create a zero-byte .mbv2z file. The discoverer will detect V2 presence,
        // attempt to load the file, fail, and count it as skipped. Required-projects
        // check then reports all seven as missing (none of them were loaded).
        File.WriteAllBytes(Path.Combine(_tempDir, "TECLOT.mbv2z"), []);

        var originalOut = Console.Out;
        using var captured = new StringWriter();
        Console.SetOut(captured);

        try
        {
            var loader = new MarbleDataLoader(_tempDir, _byIdDir, skipV1Deletion: true);
            await loader.LoadAsync();
        }
        finally
        {
            Console.SetOut(originalOut);
        }

        var output = captured.ToString();
        Assert.That(
            output,
            Does.Contain("ready=false - missing required packages"),
            "should log the PT9 missing-required-packages line"
        );
        // The line should include each required name.
        Assert.That(output, Does.Contain("MBL_ENC"));
        Assert.That(output, Does.Contain("IMG_INDX"));
        Assert.That(output, Does.Contain("SDBG"));
        Assert.That(output, Does.Contain("SDBH"));
        Assert.That(output, Does.Contain("GNT"));
        Assert.That(output, Does.Contain("BHS"));
        Assert.That(output, Does.Contain("IMG_THMB"));
    }
}
