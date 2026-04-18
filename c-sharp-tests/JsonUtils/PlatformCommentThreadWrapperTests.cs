using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.ProjectComments;

namespace TestParanextDataProvider.JsonUtils;

/// <summary>
/// Tests for <see cref="PlatformCommentThreadWrapper"/> merge/dedup logic.
/// Mirrors the edge cases previously covered by the frontend prepareCommentThreads tests.
/// </summary>
[ExcludeFromCodeCoverage]
internal class PlatformCommentThreadWrapperTests : PapiTestBase
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

    /// <summary>
    /// Creates a comment in the comment manager and returns the resulting thread wrapper.
    /// </summary>
    private PlatformCommentThreadWrapper CreateThread(
        string threadId,
        string commentText,
        string? date = null
    )
    {
        Comment comment = CommentTestHelper.CreateBasicComment();
        comment.Thread = threadId;
        comment.SetContentsFromHtml(commentText);
        if (date != null)
            comment.Date = date;

        _commentManager.AddComment(comment);
        _commentManager.SaveUser(comment.User, false);

        CommentThread thread = _commentManager.FindThread(threadId);
        return new PlatformCommentThreadWrapper(thread);
    }

    #region MergeCommentsFrom Tests

    [Test]
    public void MergeCommentsFrom_AddsUniqueCommentsFromOtherWrapper()
    {
        // Arrange - Create two threads (different IDs so they're separate in ParatextData)
        var wrapperA = CreateThread("thread-merge-a", "Comment A");
        var wrapperB = CreateThread("thread-merge-b", "Comment B");

        int originalCount = wrapperA.AllComments.Count();

        // Act - Merge B's comments into A
        wrapperA.MergeCommentsFrom(wrapperB);

        // Assert - A should now have its original comments plus B's
        Assert.That(wrapperA.AllComments.Count(), Is.EqualTo(originalCount + 1));
    }

    [Test]
    public void MergeCommentsFrom_DoesNotDuplicateExistingComments()
    {
        // Arrange - Create a thread and get a wrapper
        var wrapper = CreateThread("thread-nodup", "Original comment");
        int originalCount = wrapper.AllComments.Count();

        // Act - Merge the same wrapper into itself
        wrapper.MergeCommentsFrom(wrapper);

        // Assert - Should not add duplicates
        Assert.That(wrapper.AllComments.Count(), Is.EqualTo(originalCount));
    }

    [Test]
    public void HasNonDeletedComments_ReturnsTrueWhenNonDeletedExists()
    {
        // Arrange
        var wrapper = CreateThread("thread-nondel", "Active comment");

        // Assert
        Assert.That(wrapper.HasNonDeletedComments, Is.True);
    }

    [Test]
    public void AllComments_IncludesMergedComments()
    {
        // Arrange
        var wrapperA = CreateThread("thread-all-a", "Comment A");
        var wrapperB = CreateThread("thread-all-b", "Comment B");

        // Act
        wrapperA.MergeCommentsFrom(wrapperB);

        // Assert - Should have all comments from both wrappers
        var allIds = wrapperA.AllComments.Select(c => c.Id).ToList();
        var bIds = wrapperB.AllComments.Select(c => c.Id).ToList();
        foreach (string bId in bIds)
        {
            Assert.That(allIds, Does.Contain(bId));
        }
    }

    #endregion

    #region DeduplicateCommentThreads Tests

    [Test]
    public void DeduplicateCommentThreads_EmptyList_ReturnsEmptyList()
    {
        var result = ParatextProjectDataProvider.DeduplicateCommentThreads(
            new List<PlatformCommentThreadWrapper>()
        );

        Assert.That(result, Is.Empty);
    }

    [Test]
    public void DeduplicateCommentThreads_NoDuplicates_ReturnsSameThreads()
    {
        // Arrange
        var wrapperA = CreateThread("dedup-a", "Comment A");
        var wrapperB = CreateThread("dedup-b", "Comment B");

        // Act
        var result = ParatextProjectDataProvider.DeduplicateCommentThreads(
            new List<PlatformCommentThreadWrapper> { wrapperA, wrapperB }
        );

        // Assert - Both threads should remain
        Assert.That(result, Has.Count.EqualTo(2));
    }

    [Test]
    public void DeduplicateCommentThreads_DuplicateIds_MergesIntoOneThread()
    {
        // Arrange - Wrap the same CommentThread twice to produce two wrappers with the same Id,
        // simulating duplicates that can arrive from ParatextData.
        var wrapperA = CreateThread("dedup-same", "Comment A");
        CommentThread thread = _commentManager.FindThread("dedup-same");
        var wrapperB = new PlatformCommentThreadWrapper(thread);

        // Act
        var result = ParatextProjectDataProvider.DeduplicateCommentThreads(
            new List<PlatformCommentThreadWrapper> { wrapperA, wrapperB }
        );

        // Assert - Two wrappers with the same ID should be collapsed into one
        Assert.That(result, Has.Count.EqualTo(1));
        Assert.That(result[0].Id, Is.EqualTo("dedup-same"));
    }

    [Test]
    public void DeduplicateCommentThreads_AllDeletedComments_DropsThread()
    {
        // Arrange - Create a thread, then delete all its comments
        Comment comment = CommentTestHelper.CreateBasicComment();
        comment.Thread = "dedup-deleted";
        comment.SetContentsFromHtml("Will be deleted");

        _commentManager.AddComment(comment);
        _commentManager.SaveUser(comment.User, false);

        // Delete the comment
        comment.Deleted = true;
        _commentManager.SaveUser(comment.User, false);

        CommentThread thread = _commentManager.FindThread("dedup-deleted");
        var wrapper = new PlatformCommentThreadWrapper(thread);

        // Act
        var result = ParatextProjectDataProvider.DeduplicateCommentThreads(
            new List<PlatformCommentThreadWrapper> { wrapper }
        );

        // Assert - Thread with all deleted comments should be dropped
        Assert.That(result, Is.Empty);
    }

    [Test]
    public void DeduplicateCommentThreads_MixedDeletedAndActive_KeepsThread()
    {
        // Arrange - Create a thread with two comments
        Comment comment1 = CommentTestHelper.CreateBasicComment();
        comment1.Thread = "dedup-mixed";
        comment1.SetContentsFromHtml("Active comment");
        _commentManager.AddComment(comment1);
        _commentManager.SaveUser(comment1.User, false);

        Comment comment2 = CommentTestHelper.CreateBasicComment();
        comment2.Thread = "dedup-mixed";
        comment2.SetContentsFromHtml("Deleted comment");
        _commentManager.AddComment(comment2);
        _commentManager.SaveUser(comment2.User, false);

        // Delete one comment
        comment2.Deleted = true;
        _commentManager.SaveUser(comment2.User, false);

        CommentThread thread = _commentManager.FindThread("dedup-mixed");
        var wrapper = new PlatformCommentThreadWrapper(thread);

        // Act
        var result = ParatextProjectDataProvider.DeduplicateCommentThreads(
            new List<PlatformCommentThreadWrapper> { wrapper }
        );

        // Assert - Thread should be kept because it has at least one non-deleted comment
        Assert.That(result, Has.Count.EqualTo(1));
    }

    #endregion
}
