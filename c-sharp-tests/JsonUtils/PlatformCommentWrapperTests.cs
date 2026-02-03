using Paranext.DataProvider.JsonUtils;
using Paratext.Data;
using Paratext.Data.ProjectComments;
using Paratext.Data.Users;

namespace TestParanextDataProvider.JsonUtils;

internal class PlatformCommentWrapperTests : PapiTestBase
{
    private ScrText _scrText = null!;
    private CommentManager _commentManager = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();

        _scrText = CreateDummyProject();
        _commentManager = CommentManager.Get(_scrText);
    }

    [TearDown]
    public void TearDown()
    {
        _scrText?.Dispose();
    }

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
    public void SetContentsHtml_StripsNestedP_InParagraphOnly()
    {
        Comment comment = CommentTestHelper.CreateBasicComment();
        var (wrapper, _) = CreateCommentWithThread(comment);

        wrapper.ContentsHtml = "<p><p>Another reply test</p></p>";

        var html = wrapper.ContentsHtml;
        Assert.That(
            html,
            Is.EqualTo(
                "<blockquote lang='dmy' style='text-align:left'><p>Another reply test</p></blockquote>"
            )
        );
        Assert.That(html, Does.Not.Contain("<p><p>"));
        Assert.That(html, Does.Not.Contain("<p></p>"));
        Assert.That(html, Does.Not.Contain("<p><br></p>"));
    }

    [Test]
    public void SetContentsHtml_StripsNestedP_InsideBlockquote()
    {
        Comment comment = CommentTestHelper.CreateBasicComment();
        var (wrapper, _) = CreateCommentWithThread(comment);

        wrapper.ContentsHtml = "<blockquote><p><p>Another reply</p></p></blockquote>";

        var html2 = wrapper.ContentsHtml;
        Assert.That(
            html2,
            Is.EqualTo(
                "<blockquote lang='dmy' style='text-align:left'><p>Another reply</p></blockquote>"
            )
        );
        Assert.That(html2, Does.Not.Contain("<p><p>"));
        Assert.That(html2, Does.Not.Contain("<p></p>"));
        Assert.That(html2, Does.Not.Contain("<p><br></p>"));
    }
}
