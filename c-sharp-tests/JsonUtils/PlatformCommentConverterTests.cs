using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Projects;
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
    public void Serialize_VerseTextConflict_IncludesRejectedAcceptedResultText()
    {
        Comment testComment = CommentTestHelper.CreateVerseTextConflictComment();
        var (commentWrapper, _) = CreateCommentWithThread(testComment);

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            commentWrapper,
            _serializationOptions
        );

        // All three keys are present in the JSON payload
        Assert.That(json, Does.Contain(@"""rejectedText"":"));
        Assert.That(json, Does.Contain(@"""acceptedText"":"));
        Assert.That(json, Does.Contain(@"""resultText"":"));

        // rejectedText: losing side inserted "small" (rendered <u>), message paragraph excluded
        Assert.That(commentWrapper.RejectedText, Does.Contain("small"));
        Assert.That(commentWrapper.RejectedText, Does.Contain("<u>"));
        Assert.That(commentWrapper.RejectedText, Does.Not.Contain("Two different people"));

        // acceptedText: winning side inserted "big"
        Assert.That(commentWrapper.AcceptedText, Does.Contain("big"));
        Assert.That(commentWrapper.AcceptedText, Does.Contain("<u>"));

        // resultText: plain USFM of the resulting verse (the accepted/winner text)
        Assert.That(
            commentWrapper.ResultText,
            Does.Contain(@"\v 1 When Jesus was born in the big village")
        );

        // rejectedResultText = the loser's plain USFM (reject outcome): keeps "small", not "big"
        Assert.That(json, Does.Contain(@"""rejectedResultText"":"));
        Assert.That(commentWrapper.RejectedResultText, Does.Contain("small village"));
        Assert.That(commentWrapper.RejectedResultText, Does.Not.Contain("big"));
        // resultText (accept outcome) is the winner: "big"
        Assert.That(commentWrapper.ResultText, Does.Contain("big village"));
    }

    [Test]
    public void Serialize_VerseTextConflictNoAncestor_OmitsAcceptedTextButKeepsOtherConflictFields()
    {
        // A verseText conflict where parent == null in the merger: Verse is set but
        // AcceptedChangeXmlStr is not, so acceptedText must be absent from the JSON payload.
        Comment testComment = CommentTestHelper.CreateVerseTextConflictCommentNoAncestor();
        var (commentWrapper, _) = CreateCommentWithThread(testComment);

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            commentWrapper,
            _serializationOptions
        );

        Assert.That(json, Does.Not.Contain(@"""acceptedText"":"));
        Assert.That(json, Does.Contain(@"""rejectedText"":"));
        Assert.That(json, Does.Contain(@"""resultText"":"));
        Assert.That(json, Does.Contain(@"""rejectedResultText"":"));
    }

    [Test]
    public void Serialize_NormalComment_OmitsConflictTextFields()
    {
        Comment testComment = CommentTestHelper.CreateBasicComment();
        var (commentWrapper, _) = CreateCommentWithThread(testComment);

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            commentWrapper,
            _serializationOptions
        );

        Assert.That(json, Does.Not.Contain("rejectedText"));
        Assert.That(json, Does.Not.Contain("acceptedText"));
        Assert.That(json, Does.Not.Contain("resultText"));
        Assert.That(json, Does.Not.Contain("rejectedResultText"));
        Assert.That(commentWrapper.RejectedText, Is.Null);
    }

    [Test]
    public void Serialize_NonVerseTextConflict_OmitsConflictTextFields()
    {
        // CreateConflictComment sets Type=Conflict; give it a concrete NON-verseText ConflictType so
        // this is a conflict thread ROOT whose conflict type is not VerseTextConflict.
        Comment testComment = CommentTestHelper.CreateConflictComment();
        testComment.ConflictType = NoteConflictType.InvalidVerses;
        var (commentWrapper, _) = CreateCommentWithThread(testComment);

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            commentWrapper,
            _serializationOptions
        );

        Assert.That(json, Does.Not.Contain("rejectedText"));
        Assert.That(json, Does.Not.Contain("acceptedText"));
        Assert.That(json, Does.Not.Contain("resultText"));
        Assert.That(json, Does.Not.Contain("rejectedResultText"));
        // Prove the ConflictType operand of the gate (not just Type) — this note is Type=Conflict.
        Assert.That(commentWrapper.RejectedText, Is.Null);
        // But conflictType itself IS still emitted on a conflict thread ROOT, even a non-verseText
        // one: the conflictType gate is first-comment (IsFirstCommentInThread), not verseText-specific.
        Assert.That(
            json,
            Does.Contain(@"""conflictType"":""invalidVerses"""),
            "non-verseText conflict root must still serialize conflictType"
        );
    }

    [Test]
    public void Serialize_VerseTextConflictReplacement_RendersStrikethroughAndDecodesChangedVersion()
    {
        // A replacement conflict: the losing side swapped one word for another, so the diff has both
        // a deletion (<s>) and an insertion (<u>). This is the converter-layer coverage of <s> markup
        // that the insertion-only fixtures lacked.
        Comment testComment = CommentTestHelper.CreateVerseTextConflictCommentReplacement();
        var (commentWrapper, _) = CreateCommentWithThread(testComment);

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            commentWrapper,
            _serializationOptions
        );

        // rejectedText carries both deleted (<s>) and inserted (<u>) markup.
        Assert.That(commentWrapper.RejectedText, Does.Contain("<s>"));
        Assert.That(commentWrapper.RejectedText, Does.Contain("<u>"));

        // changed-version decode keeps the inserted word and drops the deleted one.
        Assert.That(commentWrapper.RejectedResultText, Does.Contain("town"));
        Assert.That(commentWrapper.RejectedResultText, Does.Not.Contain("village"));
        Assert.That(json, Does.Contain(@"""rejectedResultText"":"));
    }

    [Test]
    public void Serialize_VerseTextConflict_EmptyRejectedDiffBody_OmitsRejectedText()
    {
        // The rejected side's diff paragraph is empty — only the leading conflict-message text node
        // remains. The old guard tested Contents.InnerText (which always contains that message), so
        // the side serialized as an empty <blockquote>. The RENDERED body is blank, so rejectedText
        // must now be omitted entirely.
        Comment testComment = CommentTestHelper.CreateVerseTextConflictComment();
        var xml = new System.Xml.XmlDocument();
        xml.LoadXml(
            "<Contents>Two different people edited this verse. The change shown here (in red) is "
                + "not in the current copy of the text.<p><language name=\"es-015-vaidika\"><p></p>"
                + "</language></p></Contents>"
        );
        testComment.Contents = xml.DocumentElement;
        var (commentWrapper, _) = CreateCommentWithThread(testComment);

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            commentWrapper,
            _serializationOptions
        );

        Assert.That(
            commentWrapper.RejectedText,
            Is.Null,
            "empty rendered rejected-side diff body → no rejectedText"
        );
        Assert.That(json, Does.Not.Contain(@"""rejectedText"":"));
    }

    [Test]
    public void Serialize_VerseTextConflict_FeffOnlyAcceptedSide_OmitsAcceptedText()
    {
        // The accepted-side diff is exactly the U+FEFF empty-content sentinel. NOTE: this case never
        // reaches IsRenderedHtmlBlank's own FEFF handling \u2014 GetContentsAsHtml itself suppresses
        // single-FEFF content (its InnerText != "\uFEFF" guard), so the side renders as an empty
        // <blockquote> and the plain tag-strip-and-trim already judges it blank. It pins the
        // renderer-level suppression; the case where OUR blank check is load-bearing is the
        // rejected-side FEFF test below (the leading message text defeats the renderer's guards).
        Comment testComment = CommentTestHelper.CreateVerseTextConflictComment();
        testComment.AcceptedChangeXmlStr =
            "<p><language name=\"es-015-vaidika\"><p>\uFEFF</p></language></p>";
        var (commentWrapper, _) = CreateCommentWithThread(testComment);

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            commentWrapper,
            _serializationOptions
        );

        Assert.That(
            commentWrapper.AcceptedText,
            Is.Null,
            "FEFF-only accepted-side diff → no acceptedText"
        );
        Assert.That(json, Does.Not.Contain(@"""acceptedText"":"));
        // The rejected side still has real content, proving each side is tested on its own payload.
        Assert.That(commentWrapper.RejectedText, Is.Not.Null);
    }

    [Test]
    public void Serialize_VerseTextConflict_FeffOnlyRejectedDiffBody_OmitsRejectedText()
    {
        // Unlike the accepted-side FEFF case above, the rejected side's Contents starts with the
        // conflict-message text node, so InnerText is message+FEFF: GetContentsAsHtml's single-FEFF
        // guard does not fire and ConvertContentToHtml's TrimOld check sees the message text. The
        // FEFF therefore survives into the RENDERED output (the message node is skipped), and
        // IsRenderedHtmlBlank's own FEFF/TrimOld handling is what must collapse the side to absent.
        Comment testComment = CommentTestHelper.CreateVerseTextConflictComment();
        var xml = new System.Xml.XmlDocument();
        xml.LoadXml(
            "<Contents>Two different people edited this verse. The change shown here (in red) is "
                + "not in the current copy of the text.<p><language name=\"es-015-vaidika\"><p>\uFEFF</p></language></p></Contents>"
        );
        testComment.Contents = xml.DocumentElement;
        var (commentWrapper, _) = CreateCommentWithThread(testComment);

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            commentWrapper,
            _serializationOptions
        );

        Assert.That(
            commentWrapper.RejectedText,
            Is.Null,
            "FEFF-only rejected-side diff body → no rejectedText"
        );
        Assert.That(json, Does.Not.Contain(@"""rejectedText"":"));
    }

    [Test]
    public void Serialize_VerseTextConflict_ZeroWidthSpaceOnlyRejectedDiffBody_OmitsRejectedText()
    {
        // A rejected-side diff body that renders to only U+200B (zero-width space). PT9's canonical
        // blank rule — TrimOld, used by the renderer's own emptiness check — strips \s, U+FEFF, AND
        // U+200B, but char.IsWhiteSpace('\u200B') is false, so a plain Trim().Trim('\uFEFF') judges
        // it non-blank and emits an empty pane. IsRenderedHtmlBlank must match TrimOld.
        Comment testComment = CommentTestHelper.CreateVerseTextConflictComment();
        var xml = new System.Xml.XmlDocument();
        xml.LoadXml(
            "<Contents>Two different people edited this verse. The change shown here (in red) is "
                + "not in the current copy of the text.<p><language name=\"es-015-vaidika\"><p>\u200B</p></language></p></Contents>"
        );
        testComment.Contents = xml.DocumentElement;
        var (commentWrapper, _) = CreateCommentWithThread(testComment);

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            commentWrapper,
            _serializationOptions
        );

        Assert.That(
            commentWrapper.RejectedText,
            Is.Null,
            "zero-width-space-only rejected-side diff body → no rejectedText"
        );
        Assert.That(json, Does.Not.Contain(@"""rejectedText"":"));
    }

    [Test]
    public void Serialize_VerseTextConflict_FeffOnlyResultVerse_OmitsResultText()
    {
        // The merged result Verse is the U+FEFF empty-content sentinel. resultText and
        // rejectedResultText must apply the same blank rule as the two rendered HTML sides —
        // present iff there is something to show — rather than a bare IsNullOrEmpty that would
        // serialize resultText:"\uFEFF" while an identically-blank HTML side is omitted.
        Comment testComment = CommentTestHelper.CreateVerseTextConflictComment();
        testComment.Verse = "\uFEFF";
        var (commentWrapper, _) = CreateCommentWithThread(testComment);

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            commentWrapper,
            _serializationOptions
        );

        Assert.That(commentWrapper.ResultText, Is.Null, "FEFF-only result verse → no resultText");
        Assert.That(json, Does.Not.Contain(@"""resultText"":"));
    }

    [Test]
    public void Serialize_VerseTextConflictDeletion_RejectedTextPresent_RejectedResultTextAbsent()
    {
        // Losing side deleted the verse content: the diff is strikethrough-only. rejectedText renders
        // the <s> diff (present), but the changed-version decode is empty so rejectedResultText is
        // absent — proving the two fields are independently optional (finding 3).
        Comment testComment = CommentTestHelper.CreateVerseTextConflictCommentDeletion();
        var (commentWrapper, _) = CreateCommentWithThread(testComment);

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            commentWrapper,
            _serializationOptions
        );

        Assert.That(commentWrapper.RejectedText, Is.Not.Null);
        Assert.That(commentWrapper.RejectedText, Does.Contain("<s>"));
        Assert.That(json, Does.Contain(@"""rejectedText"":"));

        Assert.That(commentWrapper.RejectedResultText, Is.Null);
        Assert.That(json, Does.Not.Contain(@"""rejectedResultText"":"));
    }

    [Test]
    public void Serialize_VerseTextConflictWithEmptyResultVerse_OmitsResultText()
    {
        // A verseText conflict whose merged result Verse is empty (""): ResultText must collapse to
        // null and the wire must omit resultText, pinning ResultText's empty-Verse contract.
        // (rejectedText/rejectedResultText may legitimately still be present — not asserted here.)
        Comment testComment = CommentTestHelper.CreateVerseTextConflictComment();
        testComment.Verse = "";
        var (commentWrapper, _) = CreateCommentWithThread(testComment);

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            commentWrapper,
            _serializationOptions
        );

        Assert.That(commentWrapper.ResultText, Is.Null);
        Assert.That(json, Does.Not.Contain(@"""resultText"":"));
    }

    [Test]
    public void Serialize_ConflictReplyCarryingConflictType_OmitsConflictTextFields()
    {
        // The FIRST comment of a verseText conflict thread legitimately carries the decode fields.
        Comment first = CommentTestHelper.CreateVerseTextConflictComment();
        _commentManager.AddComment(first);
        _commentManager.SaveUser(first.User, false);
        CommentThread thread = _commentManager.FindThread(first.Thread);

        // Simulate a REPLY that (wrongly) carries ConflictType=VerseTextConflict — e.g. persisted by
        // an older build or hand-edited XML. It is NOT the first comment of the thread, so it must
        // not surface any conflict decode fields (they would be phantom values read from the reply's
        // own body and stale Verse).
        Comment reply = (Comment)first.Clone();
        reply.Date = "2011-08-16T15:50:18.4019847-04:00"; // later date → distinct Id, not first
        reply.Verse = @"\v 1 stale current verse text"; // would leak as phantom resultText
        thread.Comments.Add(reply);

        var threadWrapper = new PlatformCommentThreadWrapper(thread);
        var replyWrapper = new PlatformCommentWrapper(reply, threadWrapper);

        var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
            replyWrapper,
            _serializationOptions
        );

        Assert.That(
            json,
            Does.Not.Contain("rejectedText"),
            "reply must not serialize rejectedText"
        );
        Assert.That(
            json,
            Does.Not.Contain("acceptedText"),
            "reply must not serialize acceptedText"
        );
        Assert.That(json, Does.Not.Contain("resultText"), "reply must not serialize resultText");
        Assert.That(
            json,
            Does.Not.Contain("rejectedResultText"),
            "reply must not serialize rejectedResultText"
        );
        Assert.That(
            json,
            Does.Not.Contain("conflictType"),
            "reply must not serialize conflictType"
        );
        Assert.That(replyWrapper.RejectedText, Is.Null);
        Assert.That(replyWrapper.ResultText, Is.Null);
        Assert.That(replyWrapper.RejectedResultText, Is.Null);

        // verse, by contrast, IS serialized from the reply — intended PT9 behavior, not a gating
        // gap: AddNewComment captures the current verse text on any comment written after the verse
        // changed (per-comment history data). Conflict metadata it is not; card consumers read
        // resultText, which stays root-only.
        Assert.That(
            json,
            Does.Contain(@"""verse"":""\\v 1 stale current verse text"""),
            "reply must still serialize its own verse (per-comment history data)"
        );

        // Control: the FIRST comment still surfaces its fields, proving the gate is first-comment
        // specific rather than suppressing all conflict fields.
        var firstWrapper = new PlatformCommentWrapper(first, threadWrapper);
        Assert.That(
            firstWrapper.RejectedText,
            Is.Not.Null,
            "first comment must still surface rejectedText"
        );
        Assert.That(firstWrapper.ResultText, Is.Not.Null);
    }

    [Test]
    public void Serialize_FragmentedConflictThread_RootStillSerializesConflictFields()
    {
        // ParatextData's SortAndGroupThreads groups a SORTED flat comment list by contiguity, so a
        // thread whose comments have divergent cross-thread sort keys (e.g. a reattached/moved note
        // — PT9 FB-22392) can split into two CommentThread fragments with the same Id. Our
        // DeduplicateCommentThreads then makes the fragment with the later ModifiedDate (= last
        // comment's date) the metadata base and tail-appends the other fragment's comments — so the
        // genuine conflict ROOT can end up positionally NOT first. The first-comment gate must key
        // off the stable root identity (earliest date), not list position, or a real conflict loses
        // conflictType and all four decode fields while a stale-ConflictType reply at slot 0 gains
        // phantom ones.
        Comment root = CommentTestHelper.CreateVerseTextConflictComment();
        _commentManager.AddComment(root);
        _commentManager.SaveUser(root.User, false);

        Comment reply = (Comment)root.Clone();
        reply.Date = "2011-08-16T15:50:18.4019847-04:00"; // later date → the reply, not the root
        reply.Verse = @"\v 1 stale current verse text"; // would leak as phantom resultText

        CommentThread fragmentWithRoot = new() { ScrText = _scrText };
        fragmentWithRoot.Comments.Add(root);
        CommentThread fragmentWithReply = new() { ScrText = _scrText };
        fragmentWithReply.Comments.Add(reply);

        List<PlatformCommentThreadWrapper> deduped =
            ParatextProjectDataProvider.DeduplicateCommentThreads(
                [new(fragmentWithRoot), new(fragmentWithReply)]
            );
        Assert.That(deduped, Has.Count.EqualTo(1));
        PlatformCommentThreadWrapper threadWrapper = deduped[0];

        // Precondition for the regression: the reply fragment is newer, so it is the base and the
        // genuine root is tail-appended — positionally, the reply is first.
        Assert.That(
            threadWrapper.AllComments.First().Id,
            Is.EqualTo(reply.Id),
            "test setup must put the reply at slot 0, else this test proves nothing"
        );

        // The genuine root must still serialize its conflict metadata despite not being first.
        var rootJson = JsonSerializer.Serialize(
            new PlatformCommentWrapper(root, threadWrapper),
            _serializationOptions
        );
        Assert.That(
            rootJson,
            Does.Contain(@"""conflictType"":""verseText"""),
            "genuine conflict root must keep conflictType even when positionally not first"
        );
        Assert.That(rootJson, Does.Contain(@"""rejectedText"":"));
        Assert.That(rootJson, Does.Contain(@"""resultText"":"));

        // And the stale-ConflictType reply at slot 0 must NOT gain phantom conflict fields.
        var replyJson = JsonSerializer.Serialize(
            new PlatformCommentWrapper(reply, threadWrapper),
            _serializationOptions
        );
        Assert.That(
            replyJson,
            Does.Not.Contain("conflictType"),
            "reply at slot 0 must not serialize conflictType"
        );
        Assert.That(replyJson, Does.Not.Contain("rejectedText"));
        Assert.That(replyJson, Does.Not.Contain("resultText"));
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
}
