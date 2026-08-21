using System.Diagnostics.CodeAnalysis;
using System.Security.Cryptography;
using System.Text;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class ParatextProjectDataProviderPt9InterlinearTests : PapiTestBase
{
    private const string PdpName = "pt9InterlinearTestProject";

    private DummyScrText _scrText = null!;
    private string _homeDirectory = null!;
    private DummyParatextProjectDataProvider _provider = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        _scrText = CreateDummyProject();
        _homeDirectory = Directory.CreateTempSubdirectory("pt9Interlinear").FullName;
        ProjectDetails projectDetails =
            new(_scrText.Name, new ProjectMetadata(_scrText.Guid.ToString(), []), _homeDirectory);
        ParatextProjects.FakeAddProject(projectDetails, _scrText);
        _provider = new DummyParatextProjectDataProvider(
            PdpName,
            Client,
            projectDetails,
            ParatextProjects
        );
    }

    [TearDown]
    public void TearDown()
    {
        _scrText?.Dispose();
        if (_homeDirectory != null && Directory.Exists(_homeDirectory))
            Directory.Delete(_homeDirectory, recursive: true);
    }

    // Writes bytes to a project-relative path (forward slashes), creating any parent directories.
    private void WriteProjectFile(string relativePath, byte[] bytes)
    {
        var fullPath = Path.Join(
            _homeDirectory,
            relativePath.Replace('/', Path.DirectorySeparatorChar)
        );
        Directory.CreateDirectory(Path.GetDirectoryName(fullPath)!);
        File.WriteAllBytes(fullPath, bytes);
    }

    private void WriteProjectFile(string relativePath, string text) =>
        WriteProjectFile(relativePath, Encoding.UTF8.GetBytes(text));

    private static string Sha256Hex(byte[] bytes) =>
        Convert.ToHexString(SHA256.HashData(bytes)).ToLowerInvariant();

    [Test]
    public void GetManifest_NoInterlinearData_IsEmpty()
    {
        Assert.That(_provider.GetPt9InterlinearManifest(), Is.Empty);
    }

    [Test]
    public void GetFiles_NoInterlinearData_IsEmpty()
    {
        Assert.That(_provider.GetPt9InterlinearFiles(), Is.Empty);
    }

    [Test]
    public void GetManifest_HashesEveryRootAndPerLanguageFile()
    {
        var lexicon = Encoding.UTF8.GetBytes("<Lexicon/>");
        var wordAnalyses = Encoding.UTF8.GetBytes("<WordAnalyses/>");
        var setup = Encoding.UTF8.GetBytes("<InterlinearSetup/>");
        var interlinear = Encoding.UTF8.GetBytes("<Interlinear/>");
        WriteProjectFile("Lexicon.xml", lexicon);
        WriteProjectFile("WordAnalyses.xml", wordAnalyses);
        WriteProjectFile("InterlinearSetup.xml", setup);
        WriteProjectFile("Interlinear_en/Interlinear_en_MAT.xml", interlinear);

        var manifest = _provider.GetPt9InterlinearManifest();

        Assert.That(manifest, Has.Count.EqualTo(4));
        Assert.Multiple(() =>
        {
            Assert.That(manifest["Lexicon.xml"], Is.EqualTo(Sha256Hex(lexicon)));
            Assert.That(manifest["WordAnalyses.xml"], Is.EqualTo(Sha256Hex(wordAnalyses)));
            Assert.That(manifest["InterlinearSetup.xml"], Is.EqualTo(Sha256Hex(setup)));
            Assert.That(
                manifest["Interlinear_en/Interlinear_en_MAT.xml"],
                Is.EqualTo(Sha256Hex(interlinear))
            );
        });
    }

    [Test]
    public void GetManifest_SpansEveryLanguageAndBook_WithForwardSlashKeys()
    {
        WriteProjectFile("Interlinear_en/Interlinear_en_MAT.xml", "<Interlinear/>");
        WriteProjectFile("Interlinear_en/Interlinear_en_MRK.xml", "<Interlinear/>");
        WriteProjectFile("Interlinear_fr/Interlinear_fr_MAT.xml", "<Interlinear/>");

        Assert.That(
            _provider.GetPt9InterlinearManifest().Keys,
            Is.EquivalentTo(
                new[]
                {
                    "Interlinear_en/Interlinear_en_MAT.xml",
                    "Interlinear_en/Interlinear_en_MRK.xml",
                    "Interlinear_fr/Interlinear_fr_MAT.xml",
                }
            )
        );
    }

    [Test]
    public void GetManifest_IncludesOnlyThePt9FilePatterns()
    {
        WriteProjectFile("Settings.xml", "<ScriptureText/>");
        WriteProjectFile("Interlinear_en/notes.txt", "x");
        WriteProjectFile("Lexicon.xml", "<Lexicon/>");
        Assert.That(
            _provider.GetPt9InterlinearManifest().Keys,
            Is.EquivalentTo(new[] { "Lexicon.xml" })
        );
    }

    [Test]
    public void GetFiles_ReturnsRawTextAndByteHash()
    {
        var bytes = Encoding.UTF8.GetBytes("<Lexicon>hello</Lexicon>");
        WriteProjectFile("Lexicon.xml", bytes);

        var files = _provider.GetPt9InterlinearFiles();

        Assert.That(files, Has.Count.EqualTo(1));
        Assert.Multiple(() =>
        {
            Assert.That(files["Lexicon.xml"].Text, Is.EqualTo("<Lexicon>hello</Lexicon>"));
            Assert.That(files["Lexicon.xml"].Sha256, Is.EqualTo(Sha256Hex(bytes)));
        });
    }

    [Test]
    public void GetFiles_HashMatchesManifestHash()
    {
        WriteProjectFile("Lexicon.xml", "<Lexicon/>");
        var manifest = _provider.GetPt9InterlinearManifest();
        var files = _provider.GetPt9InterlinearFiles();
        Assert.That(files["Lexicon.xml"].Sha256, Is.EqualTo(manifest["Lexicon.xml"]));
    }

    [Test]
    public void GetFiles_StripsByteOrderMarkFromTextButHashesRawBytes()
    {
        var content = Encoding.UTF8.GetBytes("<Lexicon/>");
        var raw = new byte[3 + content.Length];
        raw[0] = 0xEF;
        raw[1] = 0xBB;
        raw[2] = 0xBF;
        Array.Copy(content, 0, raw, 3, content.Length);
        WriteProjectFile("Lexicon.xml", raw);

        var file = _provider.GetPt9InterlinearFiles()["Lexicon.xml"];

        Assert.Multiple(() =>
        {
            Assert.That(file.Text, Is.EqualTo("<Lexicon/>"));
            Assert.That(file.Sha256, Is.EqualTo(Sha256Hex(raw)));
        });
    }

    [Test]
    public void SetManifest_Throws()
    {
        Assert.Throws<NotSupportedException>(() => _provider.SetPt9InterlinearManifest(null));
    }

    [Test]
    public void SetFiles_Throws()
    {
        Assert.Throws<NotSupportedException>(() => _provider.SetPt9InterlinearFiles(null));
    }
}
