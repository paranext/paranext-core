using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paratext.Data;
using Paratext.Data.ProjectComments;
using Paratext.Data.Users;

namespace TestParanextDataProvider.JsonUtils;

internal class PlatformCommentConverterTests : PapiTestBase
{
    private JsonSerializerOptions _serializationOptions = null!;
    private ScrText _scrText = null!;
    private CommentManager _commentManager = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        _serializationOptions = SerializationOptions.CreateSerializationOptions();

        // Create a project so we have a CommentManager for thread operations
        _scrText = CreateDummyProject();

        _commentManager = CommentManager.Get(_scrText);
    }

    [TearDown]
    public void TearDown()
    {
        _scrText?.Dispose();
    }

    /// <summary>
    /// Creates a comment via CommentManager and returns the wrapper with its thread, enabling serialization.
    /// </summary>
    private (
        PlatformCommentWrapper wrapper,
        PlatformCommentThreadWrapper thread
    ) CreateCommentWithThread(Comment comment)
    {
        _commentManager.AddComment(comment);
        _commentManager.SaveUser(comment.User, false);

        CommentThread thread = _commentManager.FindThread(comment.Thread);
        var threadWrapper = new PlatformCommentThreadWrapper(thread);
        var commentWrapper = new PlatformCommentWrapper(comment, threadWrapper);

        return (commentWrapper, threadWrapper);
    }

    [Test]
    public void Serialize_CommentWithBasicFields_CorrectJsonProduced()
    {
        Comment testComment = CommentTestHelper.CreateBasicComment();
        var (commentWrapper, _) = CreateCommentWithThread(testComment);

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            commentWrapper,
            _serializationOptions
        );
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
        // Contents is now the HTML version (ContentsHtml). Parse JSON to get the actual contents value.
        using var doc = JsonDocument.Parse(json);
        var contents = doc.RootElement.GetProperty("contents").GetString() ?? string.Empty;
        Assert.That(contents, Does.Contain("Test Comment"));
        Assert.That(commentWrapper.ContentsHtml, Is.EqualTo(contents));
    }

    [Test]
    public void RoundTrip_CommentWithBasicFields_AllFieldsPreserved()
    {
        Comment testComment = CommentTestHelper.CreateBasicComment();
        var (commentWrapper, _) = CreateCommentWithThread(testComment);
        string originalContentsHtml = commentWrapper.ContentsHtml;

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            commentWrapper,
            _serializationOptions
        );
        var deserialized = JsonSerializer.Deserialize<PlatformCommentWrapper>(
            json,
            _serializationOptions
        );
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
        // Contents XML after round-trip differs due to HTML conversion (it has an extra <p> tag
        // around the text; confirmed ok by John W), but should contain the text
        Assert.That(
            deserialized.Contents!.InnerXml,
            Is.EqualTo($@"<p>{testComment.Contents.InnerXml}</p>")
        );

        // Verify ContentsHtml is preserved after round-trip by creating a new wrapper with the thread.
        // The deserialized Contents HTML should match what we get from the original comment in the thread.
        var threadFromManager = _commentManager.FindThread(testComment.Thread);
        var deserializedWithThread = new PlatformCommentWrapper(
            deserialized.CommentInternal,
            new PlatformCommentThreadWrapper(threadFromManager)
        );
        // The deserialized Contents HTML should produce the same HTML as the original
        Assert.That(deserializedWithThread.ContentsHtml, Is.EqualTo(originalContentsHtml));
    }

    [Test]
    public void Serialize_CommentWithConflictFields_CorrectJsonProduced()
    {
        Comment testComment = CommentTestHelper.CreateConflictComment();
        var (commentWrapper, _) = CreateCommentWithThread(testComment);

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            commentWrapper,
            _serializationOptions
        );
        Assert.That(json, Does.Contain(@"""thread"":""5f5ea40f"""));
        Assert.That(json, Does.Contain(@"""user"":""Tim Steenwyk"""));
        Assert.That(json, Does.Contain(@"""verseRef"":""MAT 2:1"""));
        Assert.That(json, Does.Contain(@"""date"":""2011-08-16T15:49:18.4019847-04:00"""));
        Assert.That(json, Does.Contain(@"""startPosition"":0"));
        Assert.That(json, Does.Contain(@"""status"":""Todo"""));
        Assert.That(json, Does.Contain(@"""type"":""Conflict"""));
        Assert.That(json, Does.Contain(@"""hideInTextWindow"":false"));
        using var doc = JsonDocument.Parse(json);
        var contents = doc.RootElement.GetProperty("contents").GetString() ?? string.Empty;
        // Contents is now the HTML version (ContentsHtml) rather than the XML version
        Assert.That(contents, Is.EqualTo(commentWrapper.ContentsHtml));
    }

    [Test]
    public void RoundTrip_CommentWithConflictFields_CorrectJsonProduced()
    {
        Comment testComment = CommentTestHelper.CreateConflictComment();
        var (commentWrapper, _) = CreateCommentWithThread(testComment);
        string originalContentsHtml = commentWrapper.ContentsHtml;

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            commentWrapper,
            _serializationOptions
        );
        var deserialized = JsonSerializer.Deserialize<PlatformCommentWrapper>(
            json,
            _serializationOptions
        );
        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.Thread, Is.EqualTo(testComment.Thread));
        Assert.That(deserialized.User, Is.EqualTo(testComment.User));
        Assert.That(deserialized.VerseRefStr, Is.EqualTo(testComment.VerseRefStr));
        Assert.That(deserialized.Date, Is.EqualTo(testComment.Date));
        Assert.That(deserialized.StartPosition, Is.EqualTo(testComment.StartPosition));
        Assert.That(deserialized.Status, Is.EqualTo(testComment.Status));
        Assert.That(deserialized.Type, Is.EqualTo(testComment.Type));
        Assert.That(deserialized.HideInTextWindow, Is.EqualTo(testComment.HideInTextWindow));

        // Verify ContentsHtml is preserved after round-trip by creating a new wrapper with the thread.
        // The deserialized Contents XML should match what we get from the original comment in the thread.
        var threadFromManager = _commentManager.FindThread(testComment.Thread);
        var deserializedWithThread = new PlatformCommentWrapper(
            deserialized.CommentInternal,
            new PlatformCommentThreadWrapper(threadFromManager)
        );
        // The deserialized Contents should produce the same HTML as the original
        Assert.That(
            deserializedWithThread.ContentsHtml.Replace("\r", ""),
            Is.EqualTo(originalContentsHtml)
        );
    }

    [Test]
    public void Deserialize_NullContents_ProducesEmptyContentsElement()
    {
        var json =
            "{\"contents\": null, \"user\": \"tester\", \"thread\": \"t1\", \"verseRef\": \"GEN 1:1\"}";

        var result = JsonSerializer.Deserialize<PlatformCommentWrapper>(
            json,
            _serializationOptions
        );

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Contents, Is.Not.Null);
        Assert.That(result.Contents!.Name, Is.EqualTo("Contents"));
        Assert.That(result.Contents.InnerXml, Is.EqualTo(string.Empty));
    }

    [Test]
    public void Deserialize_MissingContents_ProducesEmptyContentsElement()
    {
        var json = "{\"user\": \"tester\", \"thread\": \"t2\", \"verseRef\": \"GEN 1:2\"}";

        var result = JsonSerializer.Deserialize<PlatformCommentWrapper>(
            json,
            _serializationOptions
        );

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

        var result = JsonSerializer.Deserialize<PlatformCommentWrapper>(
            json,
            _serializationOptions
        );

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
