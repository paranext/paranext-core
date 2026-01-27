using System.Text.Json;
using System.Xml;
using Paranext.DataProvider.JsonUtils;
using Paratext.Data.ProjectComments;
using Paratext.Data.Users;

namespace TestParanextDataProvider.JsonUtils;

internal class CommentConverterTests : PapiTestBase
{
    private JsonSerializerOptions _serializationOptions = null!;

    [SetUp]
    public void Setup()
    {
        _serializationOptions = SerializationOptions.CreateSerializationOptions();
    }

    [Test]
    public void Serialize_CommentWithBasicFields_CorrectJsonProduced()
    {
        Comment testComment = CommentTestHelper.CreateBasicComment();

        var json = JsonSerializer.Serialize<Comment>(testComment, _serializationOptions);
        Assert.That(json, Does.Contain(@"""thread"":""4217dff8"""));
        Assert.That(json, Does.Contain(@"""user"":""Tim Steenwyk"""));
        Assert.That(json, Does.Contain(@"""verseRef"":""GEN 1:24"""));
        Assert.That(json, Does.Contain(@"""date"":""2011-06-20T16:41:13.4239342-04:00"""));
        Assert.That(json, Does.Contain(@"""selectedText"":""command"""));
        Assert.That(json, Does.Contain(@"""startPosition"":19"));
        Assert.That(json, Does.Contain(@"""contextBefore"":""\\v 24 God said, “I """));
        Assert.That(json, Does.Contain(@"""contextAfter"":"" the earth to give life"""));
        Assert.That(json, Does.Contain(@"""status"":""Todo"""));
        Assert.That(json, Does.Contain(@"""hideInTextWindow"":false"));
        Assert.That(json, Does.Contain(@"""contents"":""Test Comment"""));
    }

    [Test]
    public void RoundTrip_CommentWithBasicFields_AllFieldsPreserved()
    {
        Comment testComment = CommentTestHelper.CreateBasicComment();

        var json = JsonSerializer.Serialize<Comment>(testComment, _serializationOptions);
        var deserialized = JsonSerializer.Deserialize<Comment>(json, _serializationOptions);
        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.Thread, Is.EqualTo(testComment.Thread));
        Assert.That(deserialized.User, Is.EqualTo(testComment.User));
        Assert.That(deserialized.VerseRefStr, Is.EqualTo(testComment.VerseRefStr));
        Assert.That(deserialized.Date, Is.EqualTo(testComment.Date));
        Assert.That(deserialized.SelectedText, Is.EqualTo(testComment.SelectedText));
        Assert.That(deserialized.StartPosition, Is.EqualTo(testComment.StartPosition));
        Assert.That(deserialized.ContextBefore, Is.EqualTo(testComment.ContextBefore));
        Assert.That(deserialized.ContextAfter, Is.EqualTo(testComment.ContextAfter));
        Assert.That(deserialized.Status, Is.EqualTo(testComment.Status));
        Assert.That(deserialized.HideInTextWindow, Is.EqualTo(testComment.HideInTextWindow));
        Assert.That(deserialized.Contents.InnerXml, Is.EqualTo(testComment.Contents.InnerXml));
    }

    [Test]
    public void Serialize_CommentWithConflictFields_CorrectJsonProduced()
    {
        Comment testComment = CommentTestHelper.CreateConflictComment();

        var json = JsonSerializer.Serialize<Comment>(testComment, _serializationOptions);
        Assert.That(json, Does.Contain(@"""thread"":""5f5ea40f"""));
        Assert.That(json, Does.Contain(@"""user"":""Tim Steenwyk"""));
        Assert.That(json, Does.Contain(@"""verseRef"":""MAT 2:1"""));
        Assert.That(json, Does.Contain(@"""date"":""2011-08-16T15:49:18.4019847-04:00"""));
        Assert.That(json, Does.Contain(@"""startPosition"":0"));
        Assert.That(json, Does.Contain(@"""status"":""Todo"""));
        Assert.That(json, Does.Contain(@"""type"":""conflict"""));
        Assert.That(json, Does.Contain(@"""hideInTextWindow"":false"));
        using var doc = JsonDocument.Parse(json);
        var contents = doc.RootElement.GetProperty("contents").GetString() ?? string.Empty;
        Assert.That(contents, Is.EqualTo(testComment.Contents.InnerXml));
    }

    public void RoundTrip_CommentWithConflictFields_CorrectJsonProduced()
    {
        Comment testComment = CommentTestHelper.CreateConflictComment();

        var json = JsonSerializer.Serialize<Comment>(testComment, _serializationOptions);
        var deserialized = JsonSerializer.Deserialize<Comment>(json, _serializationOptions);
        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.Thread, Is.EqualTo(testComment.Thread));
        Assert.That(deserialized.User, Is.EqualTo(testComment.User));
        Assert.That(deserialized.VerseRefStr, Is.EqualTo(testComment.VerseRefStr));
        Assert.That(deserialized.Date, Is.EqualTo(testComment.Date));
        Assert.That(deserialized.StartPosition, Is.EqualTo(testComment.StartPosition));
        Assert.That(deserialized.Status, Is.EqualTo(testComment.Status));
        Assert.That(deserialized.Type, Is.EqualTo(testComment.Type));
        Assert.That(deserialized.HideInTextWindow, Is.EqualTo(testComment.HideInTextWindow));
        Assert.That(deserialized.Contents.InnerXml, Is.EqualTo(testComment.Contents.InnerXml));
    }

    [Test]
    public void Deserialize_NullContents_ProducesEmptyContentsElement()
    {
        var json =
            "{\"contents\": null, \"user\": \"tester\", \"thread\": \"t1\", \"verseRef\": \"GEN 1:1\"}";

        var result = JsonSerializer.Deserialize<Comment>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Contents, Is.Not.Null);
        Assert.That(result.Contents!.Name, Is.EqualTo("Contents"));
        Assert.That(result.Contents.InnerXml, Is.EqualTo(string.Empty));
    }

    [Test]
    public void Deserialize_MissingContents_ProducesEmptyContentsElement()
    {
        var json = "{\"user\": \"tester\", \"thread\": \"t2\", \"verseRef\": \"GEN 1:2\"}";

        var result = JsonSerializer.Deserialize<Comment>(json, _serializationOptions);

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
            () => JsonSerializer.Deserialize<Comment>(json, _serializationOptions)
        );
    }

    [Test]
    public void Deserialize_ValidContents_PreservesInnerXml()
    {
        var json = "{\"contents\": \"<p>content</p>\", \"user\": \"tester\", \"thread\": \"t4\"}";

        var result = JsonSerializer.Deserialize<Comment>(json, _serializationOptions);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Contents, Is.Not.Null);
        Assert.That(result.Contents!.InnerXml, Is.EqualTo("<p>content</p>"));
    }

    private class DummyUser : ParatextUser
    {
        public DummyUser(string name)
            : base(name) { }
    }
}
