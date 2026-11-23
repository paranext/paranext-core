using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class MarbleImageIndexLoaderTests
{
    private const string ImagesV1FileName = "IMAGES.XML";
    private const string ImagesV2FileName = "IMAGES_V2.XML";

    private static readonly IReadOnlyDictionary<string, IMarblePackage> NoImageProjects =
        new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase);

    private static readonly IReadOnlySet<string> EmptyKnownBibleIds = new HashSet<string>(
        StringComparer.OrdinalIgnoreCase
    );

    // Real PT9 IMAGES.XML schema (PT9 MarbleImageData.cs:231-232 - References is
    // a List<string> with XmlArrayItem("Reference")). Each <Reference> is either
    // a single 14-char "BBBCCCVVV<5-digit word offset>" or a "start-end" of two
    // such strings. The loader divides by 100000 to drop the word offset
    // (PT9 MarbleImageData.cs:47-48).
    private const string ImageIndexV1Xml =
        @"<?xml version=""1.0""?>
<BibleImages Version=""1.42"">
  <BibleImage Id=""Dromedary"">
    <Collection>FAUNA</Collection>
    <Path>FFR\FAUNA</Path>
    <FileName>Dromedary.jpg</FileName>
    <Caption>Dromedary</Caption>
    <LanguageCode>en</LanguageCode>
    <References>
      <Reference>00101201600000</Reference>
    </References>
  </BibleImage>
  <BibleImage Id=""HolyLandMap"">
    <Collection>Satellite Bible Atlas</Collection>
    <Path>MAPS</Path>
    <FileName>HolyLand.jpg</FileName>
    <Caption>Holy Land Map</Caption>
    <LanguageCode>en</LanguageCode>
    <References>
      <Reference>04000100100000-04002802000000</Reference>
    </References>
  </BibleImage>
</BibleImages>";

    private const string ImageIndexV2Xml =
        @"<?xml version=""1.0""?>
<BibleImages Version=""2.05"">
  <BibleImage Id=""Dromedary"">
    <Collection>FAUNA</Collection>
    <Path>FFR\FAUNA</Path>
    <FileName>Dromedary.jpg</FileName>
    <Caption>Dromedary (v2)</Caption>
    <LanguageCode>en</LanguageCode>
    <References>
      <Reference>00101201600000</Reference>
    </References>
  </BibleImage>
</BibleImages>";

    private const string ImageIndexV1XmlOldVersion =
        @"<?xml version=""1.0""?>
<BibleImages Version=""1.20"">
  <BibleImage Id=""Dromedary"">
    <Collection>FAUNA</Collection>
    <Path>FFR\FAUNA</Path>
    <FileName>Dromedary.jpg</FileName>
    <Caption>Dromedary</Caption>
    <LanguageCode>en</LanguageCode>
    <References>
      <Reference>00101201600000</Reference>
    </References>
  </BibleImage>
</BibleImages>";

    [Test]
    public void Load_NoImageIndexPackage_ReturnsEmptyMediaData()
    {
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase);

        var result = MarbleImageIndexLoader.Load(
            researchPackages: research,
            imageProjects: NoImageProjects,
            haveVersion2Resources: false,
            knownBibleIds: EmptyKnownBibleIds
        );

        Assert.That(result.Images, Is.Empty);
        Assert.That(result.ImageProjects, Is.Empty);
        Assert.That(result.KnownResourceIds, Is.Empty);
    }

    [Test]
    public void Load_V1IndexOnly_UsesImagesXmlAndPopulatesDisplayItems()
    {
        var imgIndx = new FakeMarblePackage("IMG_INDX", isResearchData: true).WithFile(
            ImagesV1FileName,
            ImageIndexV1Xml
        );
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["IMG_INDX"] = imgIndx,
        };

        var result = MarbleImageIndexLoader.Load(
            research,
            NoImageProjects,
            haveVersion2Resources: false,
            knownBibleIds: EmptyKnownBibleIds
        );

        Assert.That(result.Images.Count, Is.EqualTo(2));

        var dromedary = result.Images.Single(i => i.ImageId == "Dromedary");
        Assert.That(dromedary.ImageSource, Is.EqualTo("papi-er://images/Dromedary?size=full"));
        Assert.That(dromedary.ThumbnailSource, Is.EqualTo("papi-er://images/Dromedary"));
        Assert.That(dromedary.Title, Is.EqualTo("Dromedary"));
        Assert.That(dromedary.Collection, Is.EqualTo("FAUNA"));
        Assert.That(dromedary.LanguageCode, Is.EqualTo("en"));
        Assert.That(dromedary.StartRef.BookNum, Is.EqualTo(1));
        Assert.That(dromedary.StartRef.ChapterNum, Is.EqualTo(12));
        Assert.That(dromedary.StartRef.VerseNum, Is.EqualTo(16));
    }

    [Test]
    public void Load_HaveV2AndImagesV2Exists_PrefersV2FileAndProducesV2Items()
    {
        var imgIndx = new FakeMarblePackage("IMG_INDX", isResearchData: true)
            .WithFile(ImagesV1FileName, ImageIndexV1Xml)
            .WithFile(ImagesV2FileName, ImageIndexV2Xml);
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["IMG_INDX"] = imgIndx,
        };

        var result = MarbleImageIndexLoader.Load(
            research,
            NoImageProjects,
            haveVersion2Resources: true,
            knownBibleIds: EmptyKnownBibleIds
        );

        Assert.That(
            result.Images.Count,
            Is.EqualTo(1),
            "V2 file has a single entry; V1 file should have been ignored."
        );
        Assert.That(result.Images[0].Title, Is.EqualTo("Dromedary (v2)"));
    }

    [Test]
    public void Load_HaveV2ButV2FileMissing_FallsBackToImagesXml()
    {
        var imgIndx = new FakeMarblePackage("IMG_INDX", isResearchData: true).WithFile(
            ImagesV1FileName,
            ImageIndexV1Xml
        );
        // Note: no IMAGES_V2.XML in the package.
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["IMG_INDX"] = imgIndx,
        };

        var result = MarbleImageIndexLoader.Load(
            research,
            NoImageProjects,
            haveVersion2Resources: true,
            knownBibleIds: EmptyKnownBibleIds
        );

        Assert.That(
            result.Images.Count,
            Is.EqualTo(2),
            "V2 file missing - loader should fall back to IMAGES.XML (two entries)."
        );
    }

    [Test]
    public void Load_VideoFilesInPackage_AreIgnored()
    {
        // Theme 2 excludes video. The loader must not attempt to read or parse these.
        // Including an invalid XML body in the video files proves the loader doesn't read them.
        const string garbage = "<<< not valid xml >>>";
        var imgIndx = new FakeMarblePackage("IMG_INDX", isResearchData: true)
            .WithFile(ImagesV1FileName, ImageIndexV1Xml)
            .WithFile("VIDEOS_v2.XML", garbage)
            .WithFile("LumoProjectVideos.XML", garbage);
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["IMG_INDX"] = imgIndx,
        };

        Assert.DoesNotThrow(
            () =>
                MarbleImageIndexLoader.Load(
                    research,
                    NoImageProjects,
                    haveVersion2Resources: false,
                    knownBibleIds: EmptyKnownBibleIds
                ),
            "Loader must not attempt to read video files."
        );
    }

    [Test]
    public void Load_KnownResourceIds_IncludesIndexShortNameWhenLoaded()
    {
        var imgIndx = new FakeMarblePackage("IMG_INDX", isResearchData: true).WithFile(
            ImagesV1FileName,
            ImageIndexV1Xml
        );
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["IMG_INDX"] = imgIndx,
        };

        var result = MarbleImageIndexLoader.Load(
            research,
            NoImageProjects,
            haveVersion2Resources: false,
            knownBibleIds: EmptyKnownBibleIds
        );

        Assert.That(
            result.KnownResourceIds,
            Does.Contain("IMG_INDX"),
            "IMG_INDX itself should be recorded as a known resource once parsed."
        );
    }

    [Test]
    public void Load_ImageProjectsOutput_PreservesOnlyImgBinaryShortNames()
    {
        var imgIndx = new FakeMarblePackage("IMG_INDX", isResearchData: true).WithFile(
            ImagesV1FileName,
            ImageIndexV1Xml
        );
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["IMG_INDX"] = imgIndx,
        };

        // Pass a map that claims SDBG (should be filtered out) plus all four image-binary names.
        var imageProjects = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["SDBG"] = new FakeMarblePackage("SDBG", isResearchData: true),
            ["IMG_THMB"] = new FakeMarblePackage("IMG_THMB", isResearchData: true),
            ["IMG_LD"] = new FakeMarblePackage("IMG_LD", isResearchData: true),
            ["IMG_SD"] = new FakeMarblePackage("IMG_SD", isResearchData: true),
            ["IMG_HD"] = new FakeMarblePackage("IMG_HD", isResearchData: true),
        };

        var result = MarbleImageIndexLoader.Load(
            research,
            imageProjects,
            haveVersion2Resources: false,
            knownBibleIds: EmptyKnownBibleIds
        );

        Assert.That(
            result.ImageProjects.Keys,
            Is.EquivalentTo(new[] { "IMG_THMB", "IMG_LD", "IMG_SD", "IMG_HD" })
        );
        Assert.That(
            result.KnownResourceIds,
            Is.EquivalentTo(new[] { "IMG_INDX", "IMG_THMB", "IMG_LD", "IMG_SD", "IMG_HD" })
        );
    }

    [Test]
    public void Load_VersionBelowMinimum_StillLoadsSuccessfully()
    {
        // Version < 1.38 only triggers a console warning; loading still proceeds with best-effort data.
        var imgIndx = new FakeMarblePackage("IMG_INDX", isResearchData: true).WithFile(
            ImagesV1FileName,
            ImageIndexV1XmlOldVersion
        );
        var research = new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        {
            ["IMG_INDX"] = imgIndx,
        };

        var result = MarbleImageIndexLoader.Load(
            research,
            NoImageProjects,
            haveVersion2Resources: false,
            knownBibleIds: EmptyKnownBibleIds
        );

        Assert.That(
            result.Images.Count,
            Is.EqualTo(1),
            "Below-minimum version should still parse - only a console warning is emitted."
        );
    }
}
