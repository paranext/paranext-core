using System.Text.Json;
using System.Xml;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.ParatextUtils;
using Paratext.Data;
using Paratext.Data.ProjectComments;
using Paratext.Data.Users;
using TestParanextDataProvider;

namespace TestParanextDataProvider.JsonUtils;

[TestFixture]
internal class PlatformCommentConverterTests : PapiTestBase
{
    private JsonSerializerOptions _serializationOptions = null!;

    [SetUp]
    public void Setup()
    {
        _serializationOptions = SerializationOptions.CreateSerializationOptions();
    }

    [Test]
    [Ignore("This test needs to be fixed when I am done rebasing")]
    public void Serialize_CommentWithBasicFields_CorrectJsonProduced()
    {
        Comment testComment = CommentTestHelper.CreateBasicComment();

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            new PlatformCommentWrapper(testComment),
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
        Assert.That(json, Does.Contain(@"""contents"":""Test Comment"""));
    }

    [Test]
    [Ignore("This test needs to be fixed when I am done rebasing")]
    public void RoundTrip_CommentWithBasicFields_AllFieldsPreserved()
    {
        Comment testComment = CommentTestHelper.CreateBasicComment();

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            new PlatformCommentWrapper(testComment),
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
        Assert.That(deserialized.Contents!.InnerXml, Is.EqualTo(testComment.Contents.InnerXml));
    }

    [Test]
    [Ignore("This test needs to be fixed when I am done rebasing")]
    public void Serialize_CommentWithConflictFields_CorrectJsonProduced()
    {
        Comment testComment = CreateConflictComment();

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            new PlatformCommentWrapper(testComment),
            _serializationOptions
        );
        Assert.That(json, Does.Contain(@"""thread"":""5f5ea40f"""));
        Assert.That(json, Does.Contain(@"""user"":""Tim Steenwyk"""));
        Assert.That(json, Does.Contain(@"""verseRef"":""MAT 2:1"""));
        Assert.That(json, Does.Contain(@"""date"":""2011-08-16T15:49:18.4019847-04:00"""));
        Assert.That(json, Does.Contain(@"""startPosition"":0"));
        Assert.That(json, Does.Contain(@"""status"":""Todo"""));
        Assert.That(json, Does.Contain(@"""type"":""conflict"""));
        Assert.That(json, Does.Contain(@"""hideInTextWindow"":false"));
        Assert.That(
            json,
            Does.Contain(
                @"""contents"":""\n    Two different people edited this verse. The change from Tim Steenwyk(Tuesday, August 16, 2011 3:49 PM) was accepted in the text. The change from Michael Lothers(Tuesday, August 16, 2011 3:48 PM) is shown in this note (in red) and is not in the current copy of the text. In some cases you will need to right click in the verse and click 'View History for Verse(s)' to see exactly when and where the change was made.\n    <p><language name=""es-015-vaidika""><p>\n            \\v 1 When Jesus was born in the\n            <bold><color name=""red"">small </color></bold>\n            village of Bethlehem in Judea, Herod was king. During this time some wise men\\f + \\fr 2:1 \\fq wise men: \\ft People famous for studying the stars.\\f* from the east came to Jerusalem\n        </p></language></p>"""
            )
        );
    }

    [Test]
    [Ignore("This test needs to be fixed when I am done rebasing")]
    public void RoundTrip_CommentWithConflictFields_CorrectJsonProduced()
    {
        Comment testComment = CreateConflictComment();

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            new PlatformCommentWrapper(testComment),
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
        Assert.That(deserialized.Contents!.InnerXml, Is.EqualTo(testComment.Contents.InnerXml));
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

    private Comment CreateConflictComment()
    {
        XmlDocument contentsDoc = new XmlDocument();
        contentsDoc.LoadXml(
            """
            <Contents>
                Two different people edited this verse. The change from Tim Steenwyk(Tuesday, August 16, 2011 3:49 PM) was accepted in the text. The change from Michael Lothers(Tuesday, August 16, 2011 3:48 PM) is shown in this note (in red) and is not in the current copy of the text. In some cases you will need to right click in the verse and click 'View History for Verse(s)' to see exactly when and where the change was made.
                <p>
                    <language name="es-015-vaidika">
                    <p>
                        \v 1 When Jesus was born in the
                        <bold>
                        <color name="red">small </color>
                        </bold>
                        village of Bethlehem in Judea, Herod was king. During this time some wise men\f + \fr 2:1 \fq wise men: \ft People famous for studying the stars.\f* from the east came to Jerusalem
                    </p>
                    </language>
                </p>
                </Contents>
            """
        );

        DummyUser user_Tim = new DummyUser("Tim Steenwyk");
        Comment testComment = new Comment(user_Tim);

        testComment.Thread = "5f5ea40f";
        testComment.VerseRefStr = "MAT 2:1";
        testComment.Date = "2011-08-16T15:49:18.4019847-04:00";
        testComment.StartPosition = 0;
        testComment.Status = NoteStatus.Todo;
        testComment.Type = NoteType.Conflict;
        testComment.HideInTextWindow = false;
        testComment.Contents = contentsDoc.DocumentElement;

        return testComment;
    }

    private class DummyUser : ParatextUser
    {
        public DummyUser(string name)
            : base(name) { }
    }
}
