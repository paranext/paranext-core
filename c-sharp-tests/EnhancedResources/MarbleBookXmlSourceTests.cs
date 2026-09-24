using System.Diagnostics.CodeAnalysis;
using NUnit.Framework;
using Paranext.DataProvider.EnhancedResources;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class MarbleBookXmlSourceTests
{
    [Test]
    public void ReadBookXml_KnownResource_KnownBook_FileExists_ReturnsContent()
    {
        var pkg = new FakeMarblePackage("TECLOT", isResearchData: false).WithFile(
            "GEN.usx",
            "<usx_book code=\"GEN\"/>"
        );
        var source = new MarbleBookXmlSource(
            new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
            {
                ["TECLOT"] = pkg,
            }
        );

        var xml = source.ReadBookXml("TECLOT", bookNum: 1);

        Assert.That(xml, Does.Contain("usx_book"));
    }

    [Test]
    public void ReadBookXml_UnknownResource_ReturnsNull()
    {
        var source = new MarbleBookXmlSource(
            new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
        );

        var xml = source.ReadBookXml("UNKNOWN", bookNum: 1);

        Assert.That(xml, Is.Null);
    }

    [Test]
    public void ReadBookXml_KnownResource_BookFileMissing_ReturnsNull()
    {
        var pkg = new FakeMarblePackage("TECLOT", isResearchData: false);
        var source = new MarbleBookXmlSource(
            new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
            {
                ["TECLOT"] = pkg,
            }
        );

        var xml = source.ReadBookXml("TECLOT", bookNum: 50);

        Assert.That(xml, Is.Null);
    }

    [Test]
    public void ReadBookXml_InvalidBookNumber_ReturnsNull()
    {
        var pkg = new FakeMarblePackage("TECLOT", isResearchData: false);
        var source = new MarbleBookXmlSource(
            new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
            {
                ["TECLOT"] = pkg,
            }
        );

        var xml = source.ReadBookXml("TECLOT", bookNum: 999);

        Assert.That(xml, Is.Null);
    }

    [TestCase(1, "GEN.usx")]
    [TestCase(40, "MAT.usx")]
    [TestCase(66, "REV.usx")]
    public void ReadBookXml_BookNumberMapsToCorrectFilename(int bookNum, string expectedFile)
    {
        var pkg = new FakeMarblePackage("TECLOT", isResearchData: false).WithFile(
            expectedFile,
            "<usx_book/>"
        );
        var source = new MarbleBookXmlSource(
            new Dictionary<string, IMarblePackage>(StringComparer.OrdinalIgnoreCase)
            {
                ["TECLOT"] = pkg,
            }
        );

        Assert.That(source.ReadBookXml("TECLOT", bookNum), Is.Not.Null);
    }
}
