using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider.Projects
{
    [ExcludeFromCodeCoverage]
    internal class ParatextProjectDataProviderCommentTests : PapiTestBase
    {
        private const string PdpName = "commentTestProject";

        private ScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;
        private DummyParatextProjectDataProvider _provider = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            // Register a mock settings service that returns comments enabled
            await Client.RegisterRequestHandlerAsync(
                "object:platform.settingsServiceDataProvider-data.get",
                new Func<string, bool>(
                    (key) =>
                    {
                        // Return true for COMMENTS_ENABLED setting
                        return true;
                    }
                ),
                null
            );

            _scrText = CreateDummyProject();

            // Add some actual scripture content
            _scrText.PutText(
                1, // Genesis
                0,
                false,
                @"\id GEN \c 1 \v 1 In the beginning God created the heavens and the earth. \v 2 The earth was formless and void.",
                null
            );

            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);

            _provider = new DummyParatextProjectDataProvider(
                PdpName,
                Client,
                _projectDetails,
                ParatextProjects
            );
            await _provider.RegisterDataProviderAsync();
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
        }

        #region CreateComment Tests

        [Test]
        public void CreateComment_ValidComment_ReturnsCommentId()
        {
            // Arrange
            var selector = new CommentSelector
            {
                BookId = "GEN",
                ChapterNum = 1,
                VerseNum = 1,
                CommentId = "This is a test comment"
            };

            // Act
            string commentId = _provider.CreateComment(selector);

            // Assert
            Assert.That(commentId, Is.Not.Null);
            Assert.That(commentId, Is.Not.Empty);
            Assert.That(
                commentId,
                Does.Contain("/"),
                "Comment ID should have format: threadId/userName/date"
            );

            // Verify the comment ID has three parts
            var parts = commentId.Split('/');
            Assert.That(
                parts.Length,
                Is.EqualTo(3),
                "Comment ID should have three parts: threadId/userName/date"
            );
        }

        [Test]
        public void CreateComment_MissingBookId_ThrowsException()
        {
            // Arrange
            var selector = new CommentSelector
            {
                BookId = "",
                ChapterNum = 1,
                VerseNum = 1,
                CommentId = "Test comment"
            };

            // Act & Assert
            var ex = Assert.Throws<InvalidDataException>(() => _provider.CreateComment(selector));
            Assert.That(ex.Message, Does.Contain("verse reference"));
        }

        [Test]
        public void CreateComment_InvalidChapter_ThrowsException()
        {
            // Arrange
            var selector = new CommentSelector
            {
                BookId = "GEN",
                ChapterNum = 0,
                VerseNum = 1,
                CommentId = "Test comment"
            };

            // Act & Assert
            var ex = Assert.Throws<InvalidDataException>(() => _provider.CreateComment(selector));
            Assert.That(ex.Message, Does.Contain("verse reference"));
        }

        [Test]
        public void CreateComment_InvalidVerse_ThrowsException()
        {
            // Arrange
            var selector = new CommentSelector
            {
                BookId = "GEN",
                ChapterNum = 1,
                VerseNum = 0,
                CommentId = "Test comment"
            };

            // Act & Assert
            var ex = Assert.Throws<InvalidDataException>(() => _provider.CreateComment(selector));
            Assert.That(ex.Message, Does.Contain("verse reference"));
        }

        [Test]
        public void CreateComment_EmptyContent_CreatesCommentWithoutContent()
        {
            // Arrange
            var selector = new CommentSelector
            {
                BookId = "GEN",
                ChapterNum = 1,
                VerseNum = 1,
                CommentId = null // No content
            };

            // Act
            string commentId = _provider.CreateComment(selector);

            // Assert
            Assert.That(commentId, Is.Not.Null);
            Assert.That(commentId, Is.Not.Empty);
        }

        [Test]
        public void CreateComment_MultipleComments_GeneratesUniqueIds()
        {
            // Arrange
            var selector1 = new CommentSelector
            {
                BookId = "GEN",
                ChapterNum = 1,
                VerseNum = 1,
                CommentId = "First comment"
            };
            var selector2 = new CommentSelector
            {
                BookId = "GEN",
                ChapterNum = 1,
                VerseNum = 1,
                CommentId = "Second comment"
            };

            // Act
            string commentId1 = _provider.CreateComment(selector1);
            string commentId2 = _provider.CreateComment(selector2);

            // Assert
            Assert.That(
                commentId1,
                Is.Not.EqualTo(commentId2),
                "Each comment should have a unique ID"
            );
        }

        #endregion

        #region GetCommentThreads Tests

        [Test]
        public void GetCommentThreads_NoSelector_ReturnsAllThreads()
        {
            // Arrange - Create some comments first
            _provider.CreateComment(
                new CommentSelector
                {
                    BookId = "GEN",
                    ChapterNum = 1,
                    VerseNum = 1,
                    CommentId = "Comment 1"
                }
            );
            _provider.CreateComment(
                new CommentSelector
                {
                    BookId = "GEN",
                    ChapterNum = 1,
                    VerseNum = 2,
                    CommentId = "Comment 2"
                }
            );

            // Act
            var threads = _provider.GetCommentThreads(null);

            // Assert
            Assert.That(threads, Is.Not.Null);
            Assert.That(
                threads.Count,
                Is.GreaterThanOrEqualTo(2),
                "Should have at least 2 threads"
            );
        }

        [Test]
        public void GetCommentThreads_FilterByThreadId_ReturnsMatchingThread()
        {
            // Arrange - Create a comment
            string commentId = _provider.CreateComment(
                new CommentSelector
                {
                    BookId = "GEN",
                    ChapterNum = 1,
                    VerseNum = 1,
                    CommentId = "Test comment"
                }
            );
            string threadId = commentId.Split('/')[0];

            var selector = new CommentThreadSelector { ThreadId = threadId };

            // Act
            var threads = _provider.GetCommentThreads(selector);

            // Assert
            Assert.That(threads, Is.Not.Null);
            Assert.That(threads.Count, Is.EqualTo(1), "Should return exactly one thread");
            Assert.That(threads[0].Id, Is.EqualTo(threadId));
        }

        [Test]
        public void GetCommentThreads_FilterByScriptureRange_ReturnsMatchingThreads()
        {
            // Arrange - Create comments at different locations
            _provider.CreateComment(
                new CommentSelector
                {
                    BookId = "GEN",
                    ChapterNum = 1,
                    VerseNum = 1,
                    CommentId = "Comment at Gen 1:1"
                }
            );
            _provider.CreateComment(
                new CommentSelector
                {
                    BookId = "GEN",
                    ChapterNum = 1,
                    VerseNum = 2,
                    CommentId = "Comment at Gen 1:2"
                }
            );

            var selector = new CommentThreadSelector
            {
                ScriptureRanges =
                [
                    new()
                    {
                        Start = new ScriptureReference
                        {
                            BookNum = 1,
                            ChapterNum = 1,
                            VerseNum = 1
                        },
                        End = new ScriptureReference
                        {
                            BookNum = 1,
                            ChapterNum = 1,
                            VerseNum = 1
                        },
                        Granularity = "verse"
                    }
                ]
            };

            // Act
            var threads = _provider.GetCommentThreads(selector);

            // Assert
            Assert.That(threads, Is.Not.Null);
            Assert.That(threads, Has.Count.EqualTo(1), "Should return only threads in Gen 1:1");
        }

        [Test]
        public void GetCommentThreads_EmptySelector_ReturnsAllThreads()
        {
            // Arrange
            _provider.CreateComment(
                new CommentSelector
                {
                    BookId = "GEN",
                    ChapterNum = 1,
                    VerseNum = 1,
                    CommentId = "Test"
                }
            );
            _provider.CreateComment(
                new CommentSelector
                {
                    BookId = "GEN",
                    ChapterNum = 1,
                    VerseNum = 2,
                    CommentId = "Test"
                }
            );
            _provider.CreateComment(
                new CommentSelector
                {
                    BookId = "GEN",
                    ChapterNum = 1,
                    VerseNum = 3,
                    CommentId = "Test"
                }
            );

            var emptySelector = new CommentThreadSelector();

            // Act
            var threads = _provider.GetCommentThreads(emptySelector);

            // Assert
            Assert.That(threads, Is.Not.Null);
            Assert.That(threads.Count, Is.EqualTo(3));
        }

        #endregion

        #region DeleteComment Tests

        [Test]
        public void DeleteComment_ValidCommentId_ReturnsTrue()
        {
            // Arrange - Create a comment first
            string commentId = _provider.CreateComment(
                new CommentSelector
                {
                    BookId = "GEN",
                    ChapterNum = 1,
                    VerseNum = 1,
                    CommentId = "Comment to delete"
                }
            );

            // Act
            bool result = _provider.DeleteComment(commentId);

            // Assert
            Assert.That(result, Is.True, "Delete should return true for existing comment");
        }

        [Test]
        public void DeleteComment_NonExistentId_ReturnsFalse()
        {
            // Arrange
            string nonExistentId = "nonexistent/user/2025-01-01T00:00:00";

            // Act
            bool result = _provider.DeleteComment(nonExistentId);

            // Assert
            Assert.That(result, Is.False, "Delete should return false for non-existent comment");
        }

        [Test]
        public void DeleteComment_EmptyId_ReturnsFalse()
        {
            // Act
            bool result = _provider.DeleteComment("");

            // Assert
            Assert.That(result, Is.False);
        }

        [Test]
        public void DeleteComment_NullId_ReturnsFalse()
        {
            // Act
            bool result = _provider.DeleteComment(null!);

            // Assert
            Assert.That(result, Is.False);
        }

        #endregion

        #region Integration Tests

        [Test]
        public void CreateAndRetrieveComment_EndToEnd()
        {
            // Arrange
            var selector = new CommentSelector
            {
                BookId = "GEN",
                ChapterNum = 1,
                VerseNum = 1,
                CommentId = "Integration test comment"
            };

            // Act - Create a comment
            string commentId = _provider.CreateComment(selector);
            string threadId = commentId.Split('/')[0];

            // Retrieve the comment thread
            var threads = _provider.GetCommentThreads(
                new CommentThreadSelector { ThreadId = threadId }
            );

            // Assert
            Assert.That(threads, Is.Not.Null);
            Assert.That(threads.Count, Is.EqualTo(1));
            Assert.That(threads[0].Id, Is.EqualTo(threadId));
            Assert.That(threads[0].Comments, Is.Not.Null);
            Assert.That(threads[0].Comments.Count, Is.GreaterThan(0));

            var comment = threads[0].Comments.FirstOrDefault(c => c.Id == commentId);
            Assert.That(comment, Is.Not.Null, "Should find the created comment in the thread");
            Assert.That(comment!.Contents?.InnerText, Does.Contain("Integration test comment"));
        }

        [Test]
        public void CreateDeleteAndVerify_EndToEnd()
        {
            // Arrange & Act - Create a comment
            string commentId = _provider.CreateComment(
                new CommentSelector
                {
                    BookId = "GEN",
                    ChapterNum = 1,
                    VerseNum = 1,
                    CommentId = "Comment to delete"
                }
            );
            string threadId = commentId.Split('/')[0];

            // Verify it exists
            var threadsBefore = _provider.GetCommentThreads(
                new CommentThreadSelector { ThreadId = threadId }
            );
            Assert.That(threadsBefore, Has.Count.EqualTo(1));

            // Delete the comment
            bool deleted = _provider.DeleteComment(commentId);
            Assert.That(deleted, Is.True);

            // After deleting the only comment in a thread, the thread may be removed
            // or the comment may be marked as deleted depending on Paratext's behavior
            var threadsAfter = _provider.GetCommentThreads(
                new CommentThreadSelector { ThreadId = threadId }
            );

            // Verify either: thread is removed OR comment is marked as deleted
            if (threadsAfter.Count == 0)
            {
                // Thread was completely removed - this is acceptable
                Assert.Pass("Thread was removed after deleting its only comment");
            }
            else
            {
                // Thread still exists - comment should be marked as deleted
                Assert.That(threadsAfter.Count, Is.EqualTo(1));
                var deletedComment = threadsAfter[0]
                    .Comments.FirstOrDefault(c => c.Id == commentId);
                Assert.That(deletedComment, Is.Not.Null, "Comment should still exist in thread");
                Assert.That(
                    deletedComment!.Deleted,
                    Is.True,
                    "Comment should be marked as deleted"
                );
            }
        }

        [Test]
        public void CreateMultipleCommentsInSameVerse_CreatesMultipleThreads()
        {
            // Arrange & Act
            string commentId1 = _provider.CreateComment(
                new CommentSelector
                {
                    BookId = "GEN",
                    ChapterNum = 1,
                    VerseNum = 1,
                    CommentId = "First comment"
                }
            );
            string commentId2 = _provider.CreateComment(
                new CommentSelector
                {
                    BookId = "GEN",
                    ChapterNum = 1,
                    VerseNum = 1,
                    CommentId = "Second comment"
                }
            );

            string threadId1 = commentId1.Split('/')[0];
            string threadId2 = commentId2.Split('/')[0];

            // Assert
            Assert.That(
                threadId1,
                Is.Not.EqualTo(threadId2),
                "Each comment should create its own thread"
            );

            // Verify both threads exist
            var allThreads = _provider.GetCommentThreads(null);
            Assert.That(
                allThreads.Count(t => t.Id == threadId1 || t.Id == threadId2),
                Is.EqualTo(2),
                "Both threads should exist"
            );
        }

        #endregion

        #region UpdateComment Tests

        [Test]
        public void UpdateComment_UpdatesContentSuccessfully()
        {
            // Arrange
            string commentId = _provider.CreateComment(
                new CommentSelector
                {
                    BookId = "GEN",
                    ChapterNum = 1,
                    VerseNum = 1,
                    CommentId = "Original content"
                }
            );

            // Act
            bool result = _provider.UpdateComment(commentId, "Updated content");

            // Assert
            Assert.That(result, Is.True, "Update should succeed");

            // Verify the content was updated
            var threads = _provider.GetCommentThreads(null);
            var thread = threads.FirstOrDefault(t => t.Comments.Any(c => c.Id == commentId));
            var comment = thread?.Comments.FirstOrDefault(c => c.Id == commentId);

            Assert.That(comment, Is.Not.Null, "Comment should still exist");
            Assert.That(
                comment.Contents.InnerText.Trim(),
                Does.Contain("Updated content"),
                "Content should be updated"
            );
        }

        [Test]
        public void UpdateComment_NonExistentComment_ReturnsFalse()
        {
            // Act
            bool result = _provider.UpdateComment(
                "nonexistent/user/2024-01-01T00:00:00Z",
                "New content"
            );

            // Assert
            Assert.That(result, Is.False, "Update of non-existent comment should fail");
        }

        [Test]
        public void UpdateComment_EmptyCommentId_ReturnsFalse()
        {
            // Act
            bool result = _provider.UpdateComment("", "New content");

            // Assert
            Assert.That(result, Is.False, "Update with empty comment ID should fail");
        }

        [Test]
        public void UpdateComment_NullCommentId_ReturnsFalse()
        {
            // Act
            bool result = _provider.UpdateComment(null!, "New content");

            // Assert
            Assert.That(result, Is.False, "Update with null comment ID should fail");
        }

        #endregion
    }
}
