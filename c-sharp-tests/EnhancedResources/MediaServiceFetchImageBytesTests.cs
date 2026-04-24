using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for <see cref="MediaService.FetchImageBytes"/>. Exercises PT9's search-order
/// logic (thumbnail: IMG_THMB &gt; IMG_LD &gt; IMG_SD &gt; IMG_HD; full: IMG_HD &gt;
/// IMG_SD &gt; IMG_LD &gt; IMG_THMB), the <c>'</c> -&gt; <c>_</c> substitution, the
/// <c>.jpg</c> -&gt; <c>.png</c> fallback, and content-type derivation. Uses
/// <see cref="FakeMarblePackage"/> with binary content so nothing needs a real
/// marble zip on disk.
/// Source: PT9 MarbleDataAccess.cs:854-897.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class MediaServiceFetchImageBytesTests
{
    // First bytes of a JPEG file: SOI + APP0 + JFIF.
    private static readonly byte[] FakeJpgBytes = [0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46];

    // PNG magic header bytes.
    private static readonly byte[] FakePngBytes = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];

    private static MediaData DataWithProjects(
        IReadOnlyDictionary<string, IMarblePackage> imageProjects,
        params MediaDisplayItem[] images
    )
    {
        return new MediaData(
            Images: images,
            ImageProjects: imageProjects,
            KnownResourceIds: new HashSet<string>(StringComparer.OrdinalIgnoreCase) { "IMG_INDX" }
        );
    }

    private static MediaDisplayItem MakeItem(
        string imageId,
        string fileName = "",
        string path = ""
    ) =>
        new(
            ImageId: imageId,
            ImageSource: $"papi-er://images/{imageId}?size=full",
            Title: imageId,
            ThumbnailSource: $"papi-er://images/{imageId}",
            StartRef: new VerseRef(1, 1, 1),
            EndRef: new VerseRef(1, 1, 1),
            Collection: "FAUNA",
            LanguageCode: "en",
            DisplayIndex: 0,
            Path: path,
            FileName: fileName
        );

    private static FakeMarblePackage MakeBinaryPackage(string shortName) =>
        new(shortName, isResearchData: true);

    [Test]
    public void FetchImageBytes_NoImageProjects_ReturnsNull()
    {
        var service = new MediaService(
            DataWithProjects(
                new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase),
                MakeItem("Dromedary", "Dromedary.jpg")
            )
        );

        var result = service.FetchImageBytes(new FetchImageBytesInput("Dromedary", "thumbnail"));

        Assert.That(result, Is.Null);
    }

    [Test]
    public void FetchImageBytes_ThumbnailSize_PrefersImgThmbOverOthers()
    {
        // THMB has the file; HD also has it. Thumbnail search order picks THMB first.
        var thmb = MakeBinaryPackage("IMG_THMB").WithBinaryFile("Dromedary.jpg", FakeJpgBytes);
        var hd = MakeBinaryPackage("IMG_HD").WithBinaryFile("Dromedary.jpg", FakePngBytes);
        var projects = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["IMG_THMB"] = thmb,
            ["IMG_HD"] = hd,
        };
        var service = new MediaService(
            DataWithProjects(projects, MakeItem("Dromedary", "Dromedary.jpg"))
        );

        var result = service.FetchImageBytes(new FetchImageBytesInput("Dromedary", "thumbnail"));

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.ContentType, Is.EqualTo("image/jpeg"));
        var decoded = Convert.FromBase64String(result.Data);
        Assert.That(decoded, Is.EquivalentTo(FakeJpgBytes));
    }

    [Test]
    public void FetchImageBytes_FullSize_PrefersImgHdOverOthers()
    {
        // HD and LD both have the file. Full search order picks HD first.
        var hd = MakeBinaryPackage("IMG_HD").WithBinaryFile("Dromedary.jpg", FakeJpgBytes);
        var ld = MakeBinaryPackage("IMG_LD").WithBinaryFile("Dromedary.jpg", FakePngBytes);
        var projects = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["IMG_HD"] = hd,
            ["IMG_LD"] = ld,
        };
        var service = new MediaService(
            DataWithProjects(projects, MakeItem("Dromedary", "Dromedary.jpg"))
        );

        var result = service.FetchImageBytes(new FetchImageBytesInput("Dromedary", "full"));

        Assert.That(result, Is.Not.Null);
        var decoded = Convert.FromBase64String(result!.Data);
        Assert.That(
            decoded,
            Is.EquivalentTo(FakeJpgBytes),
            "full search order should resolve IMG_HD first"
        );
    }

    [Test]
    public void FetchImageBytes_FullSize_FallsThroughToThmb_WhenOnlyThmbHasFile()
    {
        // Only THMB has the file. Full search order tries HD, SD, LD, THMB in turn.
        var thmb = MakeBinaryPackage("IMG_THMB").WithBinaryFile("Dromedary.jpg", FakeJpgBytes);
        var projects = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["IMG_THMB"] = thmb,
        };
        var service = new MediaService(
            DataWithProjects(projects, MakeItem("Dromedary", "Dromedary.jpg"))
        );

        var result = service.FetchImageBytes(new FetchImageBytesInput("Dromedary", "full"));

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.ContentType, Is.EqualTo("image/jpeg"));
    }

    [Test]
    public void FetchImageBytes_NoProjectHasFile_ReturnsNull()
    {
        // Projects exist but none holds the file.
        var thmb = MakeBinaryPackage("IMG_THMB").WithBinaryFile("other-image.jpg", FakeJpgBytes);
        var projects = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["IMG_THMB"] = thmb,
        };
        var service = new MediaService(
            DataWithProjects(projects, MakeItem("Dromedary", "Dromedary.jpg"))
        );

        var result = service.FetchImageBytes(new FetchImageBytesInput("Dromedary", "thumbnail"));

        Assert.That(result, Is.Null);
    }

    [Test]
    public void FetchImageBytes_JpgMissing_FallsBackToPng()
    {
        // PT9 MarbleDataAccess.cs:890-894: when foo.jpg is missing, try foo.png.
        var hd = MakeBinaryPackage("IMG_HD").WithBinaryFile("Dromedary.png", FakePngBytes);
        var projects = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["IMG_HD"] = hd,
        };
        var service = new MediaService(
            DataWithProjects(projects, MakeItem("Dromedary", "Dromedary.jpg"))
        );

        var result = service.FetchImageBytes(new FetchImageBytesInput("Dromedary", "full"));

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.ContentType, Is.EqualTo("image/png"));
        var decoded = Convert.FromBase64String(result.Data);
        Assert.That(decoded, Is.EquivalentTo(FakePngBytes));
    }

    [Test]
    public void FetchImageBytes_QuoteInFileName_SubstitutedWithUnderscore()
    {
        // PT9 MarbleDataAccess.cs:887: expectedImageFileName.Replace("'", "_").
        // The substitution is applied to the computed internal path before checking
        // existence in the image-binary package.
        var hd = MakeBinaryPackage("IMG_HD").WithBinaryFile("Noah_s_Ark.jpg", FakeJpgBytes);
        var projects = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["IMG_HD"] = hd,
        };
        var service = new MediaService(
            DataWithProjects(projects, MakeItem("NoahsArk", "Noah's_Ark.jpg"))
        );

        var result = service.FetchImageBytes(new FetchImageBytesInput("NoahsArk", "full"));

        Assert.That(
            result,
            Is.Not.Null,
            "MediaService must substitute ' -> _ before checking project file existence"
        );
    }

    [Test]
    public void FetchImageBytes_UnknownImageId_ReturnsNull()
    {
        var hd = MakeBinaryPackage("IMG_HD").WithBinaryFile("Dromedary.jpg", FakeJpgBytes);
        var projects = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["IMG_HD"] = hd,
        };
        var service = new MediaService(
            DataWithProjects(projects, MakeItem("Dromedary", "Dromedary.jpg"))
        );

        var result = service.FetchImageBytes(new FetchImageBytesInput("NonexistentImage", "full"));

        Assert.That(result, Is.Null);
    }

    [Test]
    public void FetchImageBytes_PathAndFileName_ComposedAsInternalPath()
    {
        // PT9 MarbleDataAccess.cs:281, 302: Path.Combine(metadata.Path, metadata.FileName).
        // When the IMG_INDX record has a Path subdir, the lookup must include it.
        var internalZipPath = System.IO.Path.Combine("FFR\\FAUNA", "Dromedary.jpg");
        var hd = MakeBinaryPackage("IMG_HD").WithBinaryFile(internalZipPath, FakeJpgBytes);
        var projects = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["IMG_HD"] = hd,
        };
        var service = new MediaService(
            DataWithProjects(
                projects,
                MakeItem("Dromedary", fileName: "Dromedary.jpg", path: "FFR\\FAUNA")
            )
        );

        var result = service.FetchImageBytes(new FetchImageBytesInput("Dromedary", "full"));

        Assert.That(result, Is.Not.Null);
        var decoded = Convert.FromBase64String(result!.Data);
        Assert.That(decoded, Is.EquivalentTo(FakeJpgBytes));
    }
}
