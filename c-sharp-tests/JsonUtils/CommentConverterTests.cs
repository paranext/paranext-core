using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paratext.Data.ProjectComments;

namespace TestParanextDataProvider.JsonUtils;

[TestFixture]
public class PlatformCommentConverterTests
{
    private JsonSerializerOptions _serializationOptions = null!;

    [SetUp]
    public void Setup()
    {
        _serializationOptions = SerializationOptions.CreateSerializationOptions();
    }

    [Test]
    public void Deserialize_NullContents_ProducesEmptyContentsElement()
    {
        var json =
            "{\"contents\": null, \"user\": \"tester\", \"thread\": \"t1\", \"verseRef\": \"GEN 1:1\"}";

        var result = JsonSerializer.Deserialize<PlatformCommentWrapper>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Contents, Is.Not.Null);
        Assert.That(result.Contents!.Name, Is.EqualTo("Contents"));
        Assert.That(result.Contents.InnerXml, Is.EqualTo(string.Empty));
    }

    [Test]
    public void Deserialize_MissingContents_ProducesEmptyContentsElement()
    {
        var json = "{\"user\": \"tester\", \"thread\": \"t2\", \"verseRef\": \"GEN 1:2\"}";

        var result = JsonSerializer.Deserialize<PlatformCommentWrapper>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Contents, Is.Not.Null);
        Assert.That(result.Contents!.Name, Is.EqualTo("Contents"));
        Assert.That(result.Contents.InnerXml, Is.EqualTo(string.Empty));
    }

    [Test]
    public void Deserialize_InvalidContents_ThrowsInvalidDataException()
    {
        var json = "{\"contents\": \"<p>unclosed\", \"user\": \"tester\", \"thread\": \"t3\"}";

        Assert.Throws<InvalidDataException>(
            () => JsonSerializer.Deserialize<PlatformCommentWrapper>(json, _serializationOptions)
        );
    }

    [Test]
    public void Deserialize_ValidContents_PreservesInnerXml()
    {
        var json = "{\"contents\": \"<p>content</p>\", \"user\": \"tester\", \"thread\": \"t4\"}";

        var result = JsonSerializer.Deserialize<PlatformCommentWrapper>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Contents, Is.Not.Null);
        Assert.That(result.Contents!.InnerXml, Is.EqualTo("<p>content</p>"));
    }
}
