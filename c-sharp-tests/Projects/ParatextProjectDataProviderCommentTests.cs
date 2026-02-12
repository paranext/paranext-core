using System.Diagnostics.CodeAnalysis;
using System.Xml;
using Paranext.DataProvider.JsonUtils;
using static Paranext.DataProvider.JsonUtils.JsonConverterUtils;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.ProjectComments;
using Paratext.Data.Users;
using PtxUtils;
using SIL.Scripture;
using TestParanextDataProvider;

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

        /// <summary>
        /// Helper method to create a partial Comment object for testing.
        /// Returns a Comment without User or auto-generated Thread ID set,
        /// so that CreateComment will generate these properties with the current user context.
        /// </summary>
        private Comment CreateTestComment(
            string bookId,
            int chapter,
            int verse,
            string commentText,
            string? threadId = null
        )
        {
            var verseRef = new VerseRef(
                bookId,
                chapter.ToString(),
                verse.ToString(),
                _scrText.Settings.Versification
            );
            var comment = new Comment(_scrText.User);

            // Clear the User property to create a "partial" comment
            comment.User = null!; // Will be set by CreateComment with current user
            // REVIEW: This is quasi-illegal. It appears as though the public setter mainly exists
            // for deserialization purposes and to allow certain special-purpose comments to have
            // special thread IDs (though there is no comment to that effect). In any case, it is
            // not necessary, since the thread id is ignored except when adding to an existing
            // thread.
            // comment.Thread = null!; // Will be auto-generated or set from threadId parameter

            comment.VerseRefStr = verseRef.ToString();
            if (threadId != null)
                comment.Thread = threadId;

            // Add the comment text to Contents
            comment.SetContentsFromHtml(commentText);

            return comment;
        }

        #region CreateComment Tests

        [TestCase("")] // This is the default
        [TestCase("God")]
        public void CreateComment_ValidComment_ReturnsCommentId(string selectedText)
        {
            // Arrange
            var comment = CreateTestComment("GEN", 1, 1, "This is a test comment");
            comment.SelectedText = selectedText;

            using var errorWriter = new StringWriter();
            var originalError = Console.Error;
            Console.SetError(errorWriter);

            string? commentId = null;
            try
            {
                // Act
                commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            }
            finally
            {
                Console.SetError(originalError);
            }

            var errorOutput = errorWriter.ToString();

            // Assert
            Assert.That(
                errorOutput,
                Is.Empty,
                "No errors should be written to Console.Error for a valid comment"
            );
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

            // Verify that its thread is read.
            var thread = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = parts[0] })
                .Single();

            Assert.That(
                thread.IsRead,
                Is.True,
                "The thread containing the new comment should be marked as read by the current user."
            );

            // Verify that the new comment is read.
            var createdComment = thread.Comments.Single();
            Assert.That(
                createdComment.IsRead,
                Is.True,
                "The new comment should be marked as read by the current user."
            );
        }

        [Test]
        public void CreateComment_WithThreadId_AddsToExistingThread()
        {
            // Arrange - Create a comment to establish a thread
            var firstComment = CreateTestComment("GEN", 1, 1, "First comment");
            string firstCommentId = _provider.CreateComment(
                new PlatformCommentWrapper(firstComment)
            );
            ;

            // Retrieve the thread ID from the created comment
            var firstCommentThreadId = firstCommentId.Split('/')[0];

            // Create another comment for the same thread
            var secondComment = CreateTestComment(
                "GEN",
                1,
                1,
                "Second comment",
                firstCommentThreadId
            );

            // Act
            var secondCommentId = _provider.AddCommentToThread(
                new PlatformCommentWrapper(secondComment)
            );

            // Assert
            Assert.That(secondCommentId, Is.Not.Null);
            var secondCommentThread = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == secondCommentId));
            Assert.That(
                secondCommentThread.Id,
                Is.EqualTo(firstCommentThreadId),
                "Both comments should be in the same thread"
            );
        }

        [Test]
        public void CreateComment_MultipleComments_GeneratesUniqueIds()
        {
            // Arrange
            var comment1 = CreateTestComment("GEN", 1, 1, "First comment");
            var comment2 = CreateTestComment("GEN", 1, 1, "Second comment");

            // Act
            string commentId1 = _provider.CreateComment(new PlatformCommentWrapper(comment1));
            ;
            string commentId2 = _provider.CreateComment(new PlatformCommentWrapper(comment2));
            ;

            // Assert
            Assert.That(
                commentId1,
                Is.Not.EqualTo(commentId2),
                "Each comment should have a unique ID"
            );
        }

        [Test]
        public void CreateComment_SelectedTextContainsBackslash_ThrowsInvalidOperationException()
        {
            // Arrange
            var comment = CreateTestComment("GEN", 1, 1, @"Did Jesus really say this?");
            comment.SelectedText = @"He replied, \wj ""Do not say";

            // Act + Assert
            var ex = Assert.Throws<InvalidOperationException>(
                () => _provider.CreateComment(new PlatformCommentWrapper(comment))
            );

            Assert.That(ex!.Message, Does.Contain("Selected text cannot contain USFM markers"));
        }

        [Test]
        public void CreateComment_AssignedUserNotAssignable_ThrowsInvalidOperationException()
        {
            // Arrange
            var comment = CreateTestComment("GEN", 1, 1, "Test comment");

            comment.AssignedUser = "nonexistent-user";

            // Act + Assert
            var ex = Assert.Throws<InvalidOperationException>(
                () => _provider.CreateComment(new PlatformCommentWrapper(comment))
            );

            Assert.That(ex!.Message, Does.Contain("cannot be assigned to threads in this project"));
        }

        [Test]
        public void CreateComment_VerseLookupFails_WritesToConsoleError()
        {
            // Arrange - Use reference that doesn't exist in the test scrText
            var comment = CreateTestComment("GEN", 60, 3, "Test comment");

            comment.VerseRefStr = "GEN 60:3";
            comment.StartPosition = 0;
            comment.SelectedText = "nonexistent verse text";

            using var errorWriter = new StringWriter();
            var originalError = Console.Error;
            Console.SetError(errorWriter);

            try
            {
                // Act
                _provider.CreateComment(new PlatformCommentWrapper(comment));
            }
            finally
            {
                Console.SetError(originalError);
            }

            // Assert
            var errorOutput = errorWriter.ToString();
            Assert.That(
                errorOutput,
                Does.Contain("Unable to retrieve verse text"),
                "Expected verse lookup failure to be logged"
            );
        }

        [TestCase(-1, "God", null)]
        [TestCase(-1, "God", "Just a test comment")]
        [TestCase(0, null, "")]
        [TestCase(0, null, "Just a test comment")]
        public void CreateComment_SimulateMissingRequiredJSONFields_WritesRequiredFieldsError(
            int startPosition,
            string? selectedText,
            string? commentText
        )
        {
            // Arrange
            var comment = new Comment(_scrText.User);
            comment.VerseRefStr = "GEN 1:1";
            if (commentText != null)
                comment.AddTextToContent(commentText, false);

            // Break required fallback fields
            comment.StartPosition = startPosition;
            comment.SelectedText = selectedText;

            using var errorWriter = new StringWriter();
            var originalError = Console.Error;
            Console.SetError(errorWriter);

            string? commentId = null;
            try
            {
                // Act
                commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            }
            finally
            {
                Console.SetError(originalError);
            }

            // Assert
            Assert.That(
                commentId,
                Is.Not.Null,
                "Comment should be created even though we complain about the missing required fields."
            );

            var errorOutput = errorWriter.ToString();

            Assert.That(
                errorOutput,
                Does.Contain(
                    "VerseRef, StartPosition, and SelectedText are required when Verse, ContextBefore, and ContextAfter are not provided"
                ),
                "Expected missing-required-fields error to be written to Console.Error"
            );
        }

        [TestCase(false)]
        [TestCase(true)]
        public void CreateComment_MissingScrVerseStr_ThrowsInvalidOperationException(
            bool useEmptyString
        )
        {
            // Arrange
            var comment = new Comment(_scrText.User);
            if (useEmptyString)
                comment.VerseRefStr = "";

            using var errorWriter = new StringWriter();
            var originalError = Console.Error;
            Console.SetError(errorWriter);

            Exception? ex = null;
            try
            {
                // Act
                ex = Assert.Throws<InvalidOperationException>(
                    () => _provider.CreateComment(new PlatformCommentWrapper(comment))
                );
            }
            finally
            {
                Console.SetError(originalError);
            }

            // Assert
            var errorOutput = errorWriter.ToString();

            Assert.That(
                errorOutput,
                Does.Contain(
                    "VerseRef, StartPosition, and SelectedText are required when Verse, ContextBefore, and ContextAfter are not provided"
                ),
                "Expected missing-required-fields error to be written to Console.Error"
            );

            Assert.That(ex!.Message, Does.Contain("Invalid Scripture selection:"));
        }

        #endregion

        #region GetCommentThreads Tests

        [Test]
        public void GetCommentThreads_NoSelector_ReturnsAllThreads()
        {
            // Arrange - Create some comments first
            _provider.CreateComment(
                new PlatformCommentWrapper(CreateTestComment("GEN", 1, 1, "Comment 1"))
            );
            _provider.CreateComment(
                new PlatformCommentWrapper(CreateTestComment("GEN", 1, 1, "Comment 2"))
            );

            // Act
            var emptySelector = new CommentThreadSelector();
            var threads = _provider.GetCommentThreads(emptySelector);

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
            var comment = CreateTestComment("GEN", 1, 1, "Test comment");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;

            var selector = new CommentThreadSelector { ThreadId = threadId };

            // Act
            var thread = _provider.GetCommentThreads(selector).Single();

            // Assert
            Assert.That(thread.Id, Is.EqualTo(threadId), "Thread ID should match the selector");
        }

        [Test]
        public void GetCommentThreads_FilterByScriptureRange_ReturnsMatchingThreads()
        {
            // Arrange - Create comments at different locations
            _provider.CreateComment(
                new PlatformCommentWrapper(CreateTestComment("GEN", 1, 1, "Comment at Gen 1:1"))
            );
            _provider.CreateComment(
                new PlatformCommentWrapper(CreateTestComment("GEN", 1, 2, "Comment at Gen 1:2"))
            );

            var selector = new CommentThreadSelector
            {
                ScriptureRanges =
                [
                    new()
                    {
                        Start = new VerseRef
                        {
                            BookNum = 1,
                            ChapterNum = 1,
                            VerseNum = 1
                        },
                        End = new VerseRef
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
                new PlatformCommentWrapper(CreateTestComment("GEN", 1, 1, "Test"))
            );
            _provider.CreateComment(
                new PlatformCommentWrapper(CreateTestComment("GEN", 1, 2, "Test"))
            );
            _provider.CreateComment(
                new PlatformCommentWrapper(CreateTestComment("GEN", 1, 3, "Test"))
            );

            var emptySelector = new CommentThreadSelector();

            // Act
            var threads = _provider.GetCommentThreads(emptySelector);

            // Assert
            Assert.That(threads, Is.Not.Null);
            Assert.That(threads.Count, Is.EqualTo(3));
        }

        [Test]
        public void GetCommentThreads_FilterByIsReadTrue_ReturnsOnlyReadThreads()
        {
            // Arrange - Create multiple threads with different read statuses
            var comment1 = CreateTestComment("GEN", 1, 1, "Read thread 1");
            string commentId1 = _provider.CreateComment(new PlatformCommentWrapper(comment1));
            string threadId1 = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId1))
                .Id;

            var comment2 = CreateTestComment("GEN", 1, 2, "Unread thread");
            string commentId2 = _provider.CreateComment(new PlatformCommentWrapper(comment2));
            string threadId2 = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId2))
                .Id;

            var comment3 = CreateTestComment("GEN", 1, 3, "Read thread 2");
            string commentId3 = _provider.CreateComment(new PlatformCommentWrapper(comment3));
            string threadId3 = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId3))
                .Id;

            // Mark thread 2 as unread (threads 1 and 3 are already read by default)
            _provider.SetIsCommentThreadRead(threadId2, false);

            var selector = new CommentThreadSelector { IsRead = true };

            // Act
            var threads = _provider.GetCommentThreads(selector);

            // Assert
            Assert.That(threads, Is.Not.Null);
            Assert.That(
                threads.Select(t => t.Id),
                Is.EquivalentTo(new[] { threadId1, threadId3 }),
                "Should return only the 2 read threads"
            );
        }

        [Test]
        public void GetCommentThreads_FilterByIsReadFalse_ReturnsOnlyUnreadThreads()
        {
            // Arrange - Create multiple threads with different read statuses
            var comment1 = CreateTestComment("GEN", 1, 1, "Read thread");
            string commentId1 = _provider.CreateComment(new PlatformCommentWrapper(comment1));
            string threadId1 = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId1))
                .Id;

            var comment2 = CreateTestComment("GEN", 1, 2, "Unread thread 1");
            string commentId2 = _provider.CreateComment(new PlatformCommentWrapper(comment2));
            string threadId2 = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId2))
                .Id;

            var comment3 = CreateTestComment("GEN", 1, 3, "Unread thread 2");
            string commentId3 = _provider.CreateComment(new PlatformCommentWrapper(comment3));
            string threadId3 = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId3))
                .Id;

            // Mark threads 2 and 3 as unread (thread 1 stays read)
            _provider.SetIsCommentThreadRead(threadId2, false);
            _provider.SetIsCommentThreadRead(threadId3, false);

            var selector = new CommentThreadSelector { IsRead = false };

            // Act
            var threads = _provider.GetCommentThreads(selector);

            // Assert
            Assert.That(threads, Is.Not.Null);
            Assert.That(
                threads.Select(t => t.Id),
                Is.EquivalentTo(new[] { threadId2, threadId3 }),
                "Should return only the 2 unread threads"
            );
        }

        [Test]
        public void GetCommentThreads_FilterByIsReadNull_ReturnsAllThreads()
        {
            // Arrange - Create threads with different read statuses
            var comment1 = CreateTestComment("GEN", 1, 1, "Read thread");
            string commentId1 = _provider.CreateComment(new PlatformCommentWrapper(comment1));
            string threadId1 = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId1))
                .Id;

            var comment2 = CreateTestComment("GEN", 1, 2, "Unread thread");
            string commentId2 = _provider.CreateComment(new PlatformCommentWrapper(comment2));
            string threadId2 = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId2))
                .Id;

            // Mark thread 2 as unread
            _provider.SetIsCommentThreadRead(threadId2, false);

            var selector = new CommentThreadSelector();

            // Act
            var threads = _provider.GetCommentThreads(selector);

            // Assert
            Assert.That(threads, Is.Not.Null);
            Assert.That(
                threads.Select(t => t.Id),
                Is.EquivalentTo(new[] { threadId1, threadId2 }),
                "Should return all threads when IsRead is null"
            );
        }

        [Test]
        public void GetCommentThreads_FilterByIsReadWithOtherFilters_ReturnsCombinedResults()
        {
            // Arrange - Create threads in different verses with different read statuses
            var comment1 = CreateTestComment("GEN", 1, 1, "Read thread in verse 1");
            string commentId1 = _provider.CreateComment(new PlatformCommentWrapper(comment1));
            string threadId1 = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId1))
                .Id;

            var comment2 = CreateTestComment("GEN", 1, 1, "Unread thread in verse 1");
            string commentId2 = _provider.CreateComment(new PlatformCommentWrapper(comment2));
            string threadId2 = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId2))
                .Id;

            var comment3 = CreateTestComment("GEN", 1, 2, "Read thread in verse 2");
            string commentId3 = _provider.CreateComment(new PlatformCommentWrapper(comment3));
            string threadId3 = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId3))
                .Id;

            // Mark thread 2 as unread
            _provider.SetIsCommentThreadRead(threadId2, false);

            // Create selector that filters by scripture range (Gen 1:1) AND IsRead = true
            var selector = new CommentThreadSelector
            {
                IsRead = true,
                ScriptureRanges =
                [
                    new()
                    {
                        Start = new VerseRef
                        {
                            BookNum = 1,
                            ChapterNum = 1,
                            VerseNum = 1
                        },
                        End = new VerseRef
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
            Assert.That(threads, Is.Not.Null, "Should return threads matching both filters");
            Assert.That(
                threads.Single().Id,
                Is.EqualTo(threadId1),
                "Should return only the 1 thread that is both read and in Gen 1:1"
            );
        }

        #endregion

        #region DeleteComment Tests

        [Test]
        public void DeleteComment_ValidCommentId_ReturnsTrue()
        {
            // Arrange - Create a comment first
            var comment = CreateTestComment("GEN", 1, 1, "Comment to delete");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));

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
            var comment = CreateTestComment("GEN", 1, 1, "Integration test comment");

            var threads = _provider.GetCommentThreads(new CommentThreadSelector());

            // Assert
            Assert.That(threads, Is.Not.Null);
            Assert.That(threads, Is.Empty);

            // Act - Create a comment
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;

            // Retrieve the comment thread
            var thread = _provider.GetCommentThreads(new CommentThreadSelector()).Single();

            // Assert
            Assert.That(thread.Id, Is.EqualTo(threadId));
            Assert.That(thread.Comments, Is.Not.Null);
            Assert.That(thread.Comments.Count, Is.GreaterThan(0));

            var foundComment = thread.Comments.Single(c => c.Id == commentId);
            Assert.That(foundComment, Is.Not.Null, "Should find the created comment in the thread");
            Assert.That(
                foundComment!.Contents?.InnerText,
                Does.Contain("Integration test comment")
            );
        }

        [Test]
        public void CreateDeleteAndVerify_EndToEnd()
        {
            // Arrange & Act - Create a comment
            var comment = CreateTestComment("GEN", 1, 1, "Comment to delete");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = commentId.Split('/')[0];

            // Verify it exists
            var threadsBefore = _provider.GetCommentThreads(
                new CommentThreadSelector { ThreadId = threadId }
            );
            Assert.That(threadsBefore, Has.Count.EqualTo(1));
            var commentBefore = threadsBefore[0].Comments.FirstOrDefault(c => c.Id == commentId);
            Assert.That(commentBefore, Is.Not.Null, "Comment should exist before deletion");

            // Delete the comment
            bool deleted = _provider.DeleteComment(commentId);
            Assert.That(deleted, Is.True);

            // After deleting, verify the thread is deleted too
            var threadsAfter = _provider.GetCommentThreads(
                new CommentThreadSelector { ThreadId = threadId }
            );

            Assert.That(
                threadsAfter,
                Has.Count.EqualTo(0),
                "Thread should be deleted after deleting its only comment"
            );
        }

        [Test]
        public void CreateMultipleCommentsInSameVerse_CreatesMultipleThreads()
        {
            // Arrange & Act
            var comment1 = CreateTestComment("GEN", 1, 1, "First comment");
            string commentId1 = _provider.CreateComment(new PlatformCommentWrapper(comment1));
            ;

            var comment2 = CreateTestComment("GEN", 1, 1, "Second comment");
            string commentId2 = _provider.CreateComment(new PlatformCommentWrapper(comment2));
            ;

            string threadId1 = commentId1.Split('/')[0];
            string threadId2 = commentId2.Split('/')[0];

            // Assert
            Assert.That(
                threadId1,
                Is.Not.EqualTo(threadId2),
                "Each comment should create its own thread"
            );

            // Verify both threads exist
            var emptySelector = new CommentThreadSelector();
            var allThreads = _provider.GetCommentThreads(emptySelector);
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
            var comment = CreateTestComment("GEN", 1, 1, "Original content");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));

            // Act
            bool result = _provider.UpdateComment(commentId, "Updated content");

            // Assert
            Assert.That(result, Is.True, "Update should succeed");

            // Verify the content was updated
            var emptySelector = new CommentThreadSelector();
            var threads = _provider.GetCommentThreads(emptySelector);
            var thread = threads.FirstOrDefault(t => t.Comments.Any(c => c.Id == commentId));
            var updatedComment = thread?.Comments.FirstOrDefault(c => c.Id == commentId);

            Assert.That(updatedComment, Is.Not.Null, "Comment should still exist");
            Assert.That(
                updatedComment.Contents?.InnerText.Trim(),
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

        [Test]
        public void UpdateComment_TimBasicXml_UpdatesContentsSuccessfully()
        {
            // Create a basic comment using the helper method
            var comment = CommentTestHelper.CreateBasicComment();
            comment.Thread = null; // Will be set in _provider.CreateComment

            // Add to provider using CreateComment
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            var originalThread = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId));
            var originalComment = originalThread?.Comments.Single(c => c.Id == commentId);
            string threadId = originalComment?.Thread ?? string.Empty;

            // Modify contents: change "Test Comment" to "Updated Test Comment"
            var newHtmlContent = "<p>Updated Test Comment</p>";

            // Call UpdateComment on the provider
            bool result = _provider.UpdateComment(commentId, newHtmlContent);
            Assert.That(result, Is.True);

            // Verify the change by retrieving the comment
            var thread = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId));
            var updatedComment = thread?.Comments.Single(c => c.Id == commentId);
            Assert.That(updatedComment, Is.Not.Null);
            Assert.That(updatedComment!.Contents!.InnerText, Does.Contain("Updated Test Comment"));
            Assert.That(string.Equals(updatedComment.Id, commentId), Is.True);
            Assert.That(string.Equals(updatedComment.Thread, threadId), Is.True);
        }

        // Note: The following test is a just a POC to make sure roundtripping works with an update.
        // You are not necessarily supposed to edit conflict comment contents like this in real
        // usage. It is possible; we just didn't look into getting the answer to this question.
        [Test]
        public void UpdateComment_TimConflictXml_UpdatesContentsSuccessfully()
        {
            // Create a conflict comment using the helper method
            var comment = CommentTestHelper.CreateConflictComment();
            comment.Thread = null; // Will be set in _provider.CreateComment

            // Add to provider using CreateComment
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            var originalThread = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId));
            var originalComment = originalThread?.Comments.Single(c => c.Id == commentId);
            string threadId = originalComment?.Thread ?? string.Empty;

            var newHtmlContent = "<p>Updated: Two different people edited this verse. ... </p>";

            // Call UpdateComment on the provider
            bool result = _provider.UpdateComment(commentId, newHtmlContent);
            Assert.That(result, Is.True);

            // Verify the change by retrieving the comment
            var thread = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId));
            var updatedComment = thread?.Comments.Single(c => c.Id == commentId);
            Assert.That(updatedComment, Is.Not.Null);
            Assert.That(
                updatedComment!.Contents!.InnerText,
                Does.Contain("Updated: Two different people edited this verse")
            );
            Assert.That(string.Equals(updatedComment.Id, commentId), Is.True);
            Assert.That(string.Equals(updatedComment.Thread, threadId), Is.True);
        }

        [Test]
        public void UpdateComment_NotLastCommentInThread_ThrowsException()
        {
            // Arrange - Create a thread with multiple comments
            var firstComment = CreateTestComment("GEN", 1, 1, "First comment");
            string firstCommentId = _provider.CreateComment(
                new PlatformCommentWrapper(firstComment)
            );
            ;

            // Get the thread from the first comment
            var thread = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == firstCommentId));
            var threadId = thread.Id;

            // Add a second comment (reply) to the thread
            var secondComment = CreateTestComment("GEN", 1, 1, "Second comment");
            secondComment.Thread = threadId;
            _provider.AddCommentToThread(new PlatformCommentWrapper(secondComment));

            // Act & Assert - Try to update the first comment (not the last one)
            Assert.That(
                () => _provider.UpdateComment(firstCommentId, "Updated content"),
                Throws.InvalidOperationException.With.Message.Contains(
                    "only the last comment can be updated"
                )
            );
        }

        [Test]
        public void UpdateComment_LastCommentInThread_UpdatesSuccessfully()
        {
            // Arrange - Create a thread with multiple comments
            var firstComment = CreateTestComment("GEN", 1, 1, "First comment");
            string firstCommentId = _provider.CreateComment(
                new PlatformCommentWrapper(firstComment)
            );
            ;

            // Get the thread from the first comment
            var thread = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == firstCommentId));
            var threadId = thread.Id;

            // Add a second comment (reply) to the thread
            var secondComment = CreateTestComment("GEN", 1, 1, "Second comment");
            secondComment.Thread = threadId;
            string secondCommentId = _provider.AddCommentToThread(
                new PlatformCommentWrapper(secondComment)
            );

            // Act - Update the second comment (the last one in the thread)
            bool result = _provider.UpdateComment(secondCommentId, "Updated second comment");

            // Assert
            Assert.That(result, Is.True, "Update should succeed for the last comment");

            // Verify the content was updated
            var updatedComment = thread.Comments.Single(c => c.Id == secondCommentId);

            Assert.That(updatedComment, Is.Not.Null, "Comment should still exist");
            Assert.That(
                updatedComment.Contents?.InnerText.Trim(),
                Does.Contain("Updated second comment"),
                "Content should be updated"
            );
        }

        #endregion

        #region ResolveCommentThread Tests

        [Test]
        public void AddCommentToThread_ResolveThread_CreatesNewComment()
        {
            // Arrange - Create a comment to establish a thread
            var comment = CreateTestComment("GEN", 1, 1, "Test comment for resolving");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;

            // Get initial comment count
            var threadBefore = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single();
            int initialCommentCount = threadBefore.Comments.Count();

            // Act - Resolve the thread via AddCommentToThread with Status
            var resolveComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                Status = NoteStatus.Resolved
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(resolveComment));

            // Verify thread status is resolved (displayed as 'deleted' internally by ParatextData)
            var threadAfter = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single();
            Assert.That(
                threadAfter.Status.ToString().ToLowerInvariant(),
                Is.EqualTo(ParatextNote.Status.RESOLVED),
                "Thread status should be Resolved (labeled 'deleted' by ParatextData)"
            );

            // Verify thread is marked as read
            Assert.That(
                threadAfter.IsRead,
                Is.True,
                "Thread should be marked as read after resolving"
            );

            // Verify a new comment was created to record the status change
            Assert.That(
                threadAfter.Comments.Count,
                Is.EqualTo(initialCommentCount + 1),
                "A new comment should be created to record the status change"
            );

            // Verify the new comment has the correct status
            var lastComment = threadAfter.Comments.Last();
            Assert.That(
                lastComment.Status.ToString().ToLowerInvariant(),
                Is.EqualTo(ParatextNote.Status.RESOLVED),
                "Last comment should have Resolved status (labeled 'deleted' by ParatextData)"
            );

            // Verify comment is marked as read
            Assert.That(lastComment.IsRead, Is.True, "The new comment should be marked as read");
        }

        [Test]
        public void AddCommentToThread_UnresolveThread_CreatesNewComment()
        {
            // Arrange - Create and resolve a thread
            var comment = CreateTestComment("GEN", 1, 1, "Test comment for unresolving");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;

            // Resolve it first via AddCommentToThread
            var resolveComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                Status = NoteStatus.Resolved
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(resolveComment));

            // Get comment count after resolving
            var threadAfterResolve = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single();
            int commentCountAfterResolve = threadAfterResolve.Comments.Count();

            // Act - Unresolve the thread via AddCommentToThread with Todo status
            var unresolveComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                Status = NoteStatus.Todo
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(unresolveComment));
            ;

            // Verify thread status is to-do
            var threadAfterUnresolve = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single();
            Assert.That(
                threadAfterUnresolve.Status.ToString(),
                Is.EqualTo(ParatextNote.Status.TO_DO),
                "Thread status should be back to to-do after unresolving"
            );

            // Verify thread is marked as read
            Assert.That(
                threadAfterUnresolve.IsRead,
                Is.True,
                "Thread should be marked as read after unresolving"
            );

            // Verify a new comment was created
            Assert.That(
                threadAfterUnresolve.Comments.Count,
                Is.EqualTo(commentCountAfterResolve + 1),
                "A new comment should be created when unresolving"
            );

            // Verify the new comment has to-do status
            var lastComment = threadAfterUnresolve.Comments.Last();
            Assert.That(
                lastComment.Status.ToString(),
                Is.EqualTo(ParatextNote.Status.TO_DO),
                "Last comment should have a to-do status"
            );

            // Verify comment is marked as read
            Assert.That(lastComment.IsRead, Is.True, "The new comment should be marked as read");
        }

        [Test]
        public void AddCommentToThread_ResolvedThreadAppearsInResolvedFilter()
        {
            // Arrange - Create a comment
            var comment = CreateTestComment("GEN", 1, 1, "Test comment for filter");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;

            // Act - Resolve the thread via AddCommentToThread
            var resolveComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                Status = NoteStatus.Resolved
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(resolveComment));

            // Assert - Verify it appears in resolved filter
            // Status uses backend status format since CommentThreadSelectorConverter
            // handles the conversion from frontend CommentStatus during JSON deserialization
            var resolvedThreads = _provider.GetCommentThreads(
                new CommentThreadSelector { Status = ParatextNote.Status.RESOLVED }
            );

            Assert.That(
                resolvedThreads.Any(t => t.Id == threadId),
                Is.True,
                "Resolved thread should appear in Resolved filter"
            );
        }

        [Test]
        public void AddCommentToThread_UnresolvedThreadAppearsInTodoFilter()
        {
            // Arrange - Create two threads: one todo and one resolved
            var comment1 = CreateTestComment("GEN", 1, 1, "Test comment for todo filter");
            string commentId1 = _provider.CreateComment(new PlatformCommentWrapper(comment1));
            string todoThreadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId1))
                .Id;

            var comment2 = CreateTestComment("GEN", 1, 2, "Test comment for resolved thread");
            string commentId2 = _provider.CreateComment(new PlatformCommentWrapper(comment2));
            string resolvedThreadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId2))
                .Id;

            // Resolve the first thread
            var resolveComment1 = new Comment(_scrText.User)
            {
                Thread = todoThreadId,
                Status = NoteStatus.Resolved
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(resolveComment1));

            // Resolve the second thread and keep it resolved
            var resolveComment2 = new Comment(_scrText.User)
            {
                Thread = resolvedThreadId,
                Status = NoteStatus.Resolved
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(resolveComment2));

            // Act - Unresolve the first thread
            var unresolveComment = new Comment(_scrText.User)
            {
                Thread = todoThreadId,
                Status = NoteStatus.Todo
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(unresolveComment));

            // Assert - Verify only the to-do thread appears in Todo filter
            // Status uses internal NoteStatus format since CommentThreadSelectorConverter
            // handles the conversion from frontend CommentStatus during JSON deserialization
            var todoThreads = _provider.GetCommentThreads(
                new CommentThreadSelector { Status = ParatextNote.Status.TO_DO }
            );

            Assert.That(
                todoThreads.Single().Id,
                Is.EqualTo(todoThreadId),
                "Only the unresolved thread should appear in `todo` filter"
            );
        }

        [Test]
        public void AddCommentToThread_ResolveNonExistentThread_ThrowsException()
        {
            // Arrange - Create a comment with non-existent thread ID
            var resolveComment = new Comment(_scrText.User)
            {
                Thread = "nonexistent-thread-id",
                Status = NoteStatus.Resolved
            };

            // Act & Assert - Should throw InvalidDataException
            Assert.That(
                () => _provider.AddCommentToThread(new PlatformCommentWrapper(resolveComment)),
                Throws.InstanceOf<InvalidDataException>().With.Message.Contains("does not exist")
            );
        }

        [Test]
        public void AddCommentToThread_MultipleStatusChanges_CreatesMultipleComments()
        {
            // Arrange - Create a comment
            var comment = CreateTestComment("GEN", 1, 1, "Test comment for multiple changes");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;

            int initialCount = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single()
                .Comments.Count();

            // Act - Make multiple status changes via AddCommentToThread
            _provider.AddCommentToThread(
                new PlatformCommentWrapper(
                    new Comment(_scrText.User) { Thread = threadId, Status = NoteStatus.Resolved }
                )
            ); // Resolve
            _provider.AddCommentToThread(
                new PlatformCommentWrapper(
                    new Comment(_scrText.User) { Thread = threadId, Status = NoteStatus.Todo }
                )
            ); // Unresolve
            _provider.AddCommentToThread(
                new PlatformCommentWrapper(
                    new Comment(_scrText.User) { Thread = threadId, Status = NoteStatus.Resolved }
                )
            ); // Resolve again

            // Assert - Verify each status change created a new comment
            var thread = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single();

            // Verify that the thread is marked as read
            Assert.That(
                thread.IsRead,
                Is.True,
                "Thread should be marked as read after multiple comment additions"
            );

            Assert.That(
                thread.Comments.Count,
                Is.EqualTo(initialCount + 3),
                "Three status changes should create three new comments"
            );

            // Verify comments are all marked as read
            Assert.That(
                thread.Comments,
                Is.All.Matches<PlatformCommentWrapper>(c => c.IsRead),
                "All comments should be marked as read"
            );
        }

        #endregion

        #region FindAssignableUsers Tests

        [Test]
        public void FindAssignableUsers_ReturnsListOfUsers()
        {
            // Act
            var users = _provider.FindAssignableUsers();

            // Assert
            Assert.That(users, Is.Not.Null);
            Assert.That(users, Is.InstanceOf<List<string>>());
        }

        [Test]
        public void FindAssignableUsers_IncludesUnassignedOption()
        {
            // Act
            var users = _provider.FindAssignableUsers();

            // Assert - Empty string represents "Unassigned"
            Assert.That(
                users,
                Does.Contain(""),
                "Assignable users should include empty string for 'Unassigned'"
            );
        }

        [Test]
        public void FindAssignableUsers_IncludesTeamOption()
        {
            // Act
            var users = _provider.FindAssignableUsers();

            // Assert
            Assert.That(
                users,
                Does.Contain("Team"),
                "Assignable users should include 'Team' option"
            );
        }

        #endregion

        #region AssignUserToThread Tests

        [Test]
        public void AddCommentToThread_AssignTeam_UpdatesThreadAssignment()
        {
            // Arrange - Create a comment to establish a thread
            var comment = CreateTestComment("GEN", 1, 1, "Test comment for team assignment");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;

            // Act - Assign to Team via AddCommentToThread
            var assignComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                AssignedUser = "Team"
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(assignComment));

            // Assert - Verify the thread is assigned to Team
            var thread = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single();
            Assert.That(
                thread.AssignedUser,
                Is.EqualTo("Team"),
                "Thread should be assigned to Team"
            );
        }

        [Test]
        public void AddCommentToThread_Unassign_ClearsAssignment()
        {
            // Arrange - Create a comment and assign it first
            var comment = CreateTestComment("GEN", 1, 1, "Test comment for unassignment");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;

            // Assign first via AddCommentToThread
            var assignComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                AssignedUser = "Team"
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(assignComment));

            // Act - Unassign (empty string) via AddCommentToThread
            var unassignComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                AssignedUser = ""
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(unassignComment));

            // Assert
            var thread = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single();
            Assert.That(
                thread.AssignedUser,
                Is.EqualTo(""),
                "Thread should be unassigned (empty string)"
            );
        }

        [Test]
        public void AddCommentToThread_AssignNonExistentThread_ThrowsException()
        {
            // Arrange - Create a comment with non-existent thread ID
            var assignComment = new Comment(_scrText.User)
            {
                Thread = "nonexistent-thread-id",
                AssignedUser = "Team"
            };

            // Act & Assert - Should throw InvalidDataException
            Assert.That(
                () => _provider.AddCommentToThread(new PlatformCommentWrapper(assignComment)),
                Throws.InstanceOf<InvalidDataException>().With.Message.Contains("does not exist")
            );
        }

        [Test]
        public void AddCommentToThread_AssignInvalidUser_ThrowsException()
        {
            // Arrange - Create a comment to establish a thread
            var comment = CreateTestComment("GEN", 1, 1, "Test comment for invalid user");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;

            // Act & Assert - Try to assign an invalid user via AddCommentToThread
            var assignComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                AssignedUser = "InvalidUserNotInList"
            };
            Assert.That(
                () => _provider.AddCommentToThread(new PlatformCommentWrapper(assignComment)),
                Throws.InvalidOperationException.With.Message.Contains("cannot be assigned")
            );
        }

        [Test]
        public void AddCommentToThread_MultipleAssignments_LastAssignmentWins()
        {
            // Arrange - Create a comment to establish a thread
            var comment = CreateTestComment("GEN", 1, 1, "Test comment for multiple assignments");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;

            // Act - Make multiple assignments via AddCommentToThread
            _provider.AddCommentToThread(
                new PlatformCommentWrapper(
                    new Comment(_scrText.User) { Thread = threadId, AssignedUser = "Team" }
                )
            );
            _provider.AddCommentToThread(
                new PlatformCommentWrapper(
                    new Comment(_scrText.User) { Thread = threadId, AssignedUser = "" }
                )
            ); // Unassign
            _provider.AddCommentToThread(
                new PlatformCommentWrapper(
                    new Comment(_scrText.User) { Thread = threadId, AssignedUser = "Team" }
                )
            ); // Assign again

            // Assert - Last assignment should be the current state
            var thread = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single();
            Assert.That(
                thread.AssignedUser,
                Is.EqualTo("Team"),
                "Thread should have the last assigned user"
            );
        }

        [Test]
        public void AddCommentToThread_AssignUser_CreatesNewCommentRecord()
        {
            // Arrange - Create a comment to establish a thread
            var comment = CreateTestComment("GEN", 1, 1, "Original comment");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;

            var threadBefore = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single();
            int commentCountBefore = threadBefore.Comments.Count();

            // Act - Assign to Team via AddCommentToThread
            var assignComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                AssignedUser = "Team"
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(assignComment));
            ;

            // Assert - A new comment should have been created
            var threadAfter = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single();
            Assert.That(
                threadAfter.Comments.Count,
                Is.EqualTo(commentCountBefore + 1),
                "Assignment should create a new comment record"
            );
        }

        [Test]
        public void AddCommentToThread_AssignWithContents_IncludesContentsInComment()
        {
            // Arrange - Create a comment to establish a thread
            var comment = CreateTestComment("GEN", 1, 1, "Original comment");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;

            // Act - Assign with contents via AddCommentToThread
            var assignComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                AssignedUser = "Team"
            };
            string commentText = "Assigning to team for review";
            assignComment.SetContentsFromHtml(commentText);
            _provider.AddCommentToThread(new PlatformCommentWrapper(assignComment));

            // Assert - Verify the thread is assigned and has the new comment
            var thread = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single();
            Assert.That(thread.AssignedUser, Is.EqualTo("Team"));

            // Get the comments and check the last one has the contents
            var lastComment = thread.Comments.OrderByDescending(c => c.Date).First();
            Assert.That(
                lastComment.Contents?.InnerText,
                Does.Contain("Assigning to team for review"),
                "Last comment should contain the provided contents"
            );
        }

        #endregion

        #region Permission Check Tests

        [Test]
        public void CanUserCreateComments_NormalProject_ReturnsTrue()
        {
            // Act
            bool canCreate = _provider.CanUserCreateComments();

            // Assert
            Assert.That(
                canCreate,
                Is.True,
                "User should be able to create comments in a normal project"
            );
        }

        [Test]
        public void CanUserCreateComments_AllowInSbaParameter_AcceptsParameter()
        {
            // Act - Just verify the parameter is accepted and method runs
            bool canCreateWithSbaFalse = _provider.CanUserCreateComments(false);
            bool canCreateWithSbaTrue = _provider.CanUserCreateComments(true);

            // Assert - Both calls should complete without error
            Assert.That(canCreateWithSbaFalse, Is.True);
            Assert.That(canCreateWithSbaTrue, Is.True);
        }

        [Test]
        public void CanUserAddCommentToThread_NormalProject_ReturnsTrue()
        {
            // Act
            bool canAdd = _provider.CanUserAddCommentToThread();

            // Assert
            Assert.That(
                canAdd,
                Is.True,
                "User should be able to add comments to threads in a normal project"
            );
        }

        [Test]
        public void CanUserAssignThread_ValidThread_ReturnsTrue()
        {
            // Arrange - Create a comment to establish a thread
            var comment = CreateTestComment("GEN", 1, 1, "Test comment for assignment");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;

            // Act
            bool canAssign = _provider.CanUserAssignThread(threadId);

            // Assert
            Assert.That(canAssign, Is.True, "User should be able to assign a normal thread");
        }

        [Test]
        public void CanUserAssignThread_NonexistentThread_ReturnsFalse()
        {
            // Act
            bool canAssign = _provider.CanUserAssignThread("nonexistent-thread-id");

            // Assert
            Assert.That(canAssign, Is.False, "Should return false for a nonexistent thread");
        }

        [Test]
        public void CanUserResolveThread_ValidThread_ReturnsTrue()
        {
            // Arrange - Create a comment to establish a thread
            var comment = CreateTestComment("GEN", 1, 1, "Test comment for resolve");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;

            // Act
            bool canResolve = _provider.CanUserResolveThread(threadId);

            // Assert
            Assert.That(
                canResolve,
                Is.True,
                "User should be able to resolve a normal thread they created"
            );
        }

        [Test]
        public void CanUserResolveThread_NonexistentThread_ReturnsFalse()
        {
            // Act
            bool canResolve = _provider.CanUserResolveThread("nonexistent-thread-id");

            // Assert
            Assert.That(canResolve, Is.False, "Should return false for a nonexistent thread");
        }

        [Test]
        public void CanUserEditOrDeleteComment_OwnLastComment_ReturnsTrue()
        {
            // Arrange - Create a comment
            var comment = CreateTestComment("GEN", 1, 1, "Test comment to edit");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));

            // Act
            bool canEdit = _provider.CanUserEditOrDeleteComment(commentId);

            // Assert
            Assert.That(canEdit, Is.True, "User should be able to edit their own last comment");
        }

        [Test]
        public void CanUserEditOrDeleteComment_NonexistentComment_ReturnsFalse()
        {
            // Act
            bool canEdit = _provider.CanUserEditOrDeleteComment("nonexistent-comment-id");

            // Assert
            Assert.That(canEdit, Is.False, "Should return false for a nonexistent comment");
        }

        [Test]
        public void CanUserEditOrDeleteComment_NotLastComment_ReturnsFalse()
        {
            // Arrange - Create a thread with multiple comments
            var firstComment = CreateTestComment("GEN", 1, 1, "First comment");
            string firstCommentId = _provider.CreateComment(
                new PlatformCommentWrapper(firstComment)
            );
            ;
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == firstCommentId))
                .Id;

            // Add a second comment to the same thread
            var secondComment = CreateTestComment("GEN", 1, 1, "Second comment", threadId);
            _provider.AddCommentToThread(new PlatformCommentWrapper(secondComment));

            // Act - Try to check if we can edit the first comment (not the last one)
            bool canEditFirst = _provider.CanUserEditOrDeleteComment(firstCommentId);

            // Assert
            Assert.That(
                canEditFirst,
                Is.False,
                "Should not be able to edit a comment that is not the last in the thread"
            );
        }

        [Test]
        public void CanUserEditOrDeleteComment_AfterDelete_CanEditPreviousComment()
        {
            // Arrange - Create a thread with two comments
            var firstComment = CreateTestComment("GEN", 1, 1, "First comment");
            string firstCommentId = _provider.CreateComment(
                new PlatformCommentWrapper(firstComment)
            );
            ;
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == firstCommentId))
                .Id;

            var secondComment = CreateTestComment("GEN", 1, 1, "Second comment", threadId);
            string secondCommentId = _provider.AddCommentToThread(
                new PlatformCommentWrapper(secondComment)
            );

            // Verify first comment cannot be edited before delete
            Assert.That(
                _provider.CanUserEditOrDeleteComment(firstCommentId),
                Is.False,
                "First comment should not be editable when second exists"
            );

            // Act - Delete the second comment
            _provider.DeleteComment(secondCommentId);

            // Assert - Now the first comment should be editable (it's the last one)
            bool canEditFirst = _provider.CanUserEditOrDeleteComment(firstCommentId);
            Assert.That(
                canEditFirst,
                Is.True,
                "First comment should be editable after second comment is deleted"
            );
        }

        #endregion

        #region Comment Read Status Tests

        [Test]
        public void GetComments_IncludesReadStatus()
        {
            // Arrange - Create a comment
            var comment = CreateTestComment("GEN", 1, 1, "Test comment");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));

            // Act
            var thread = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId));
            var commentWrapper = thread.Comments.Single(c => c.Id == commentId);

            // Assert - Newly added comment should have isRead property set to true
            Assert.That(
                commentWrapper.IsRead,
                Is.True,
                "Since this comment was just added by the current user, the isRead property should be true."
            );
        }

        [Test]
        public void GetCommentThreads_IncludesReadStatus()
        {
            // Arrange - Create a comment to get a valid threadId
            var comment = CreateTestComment("GEN", 1, 1, "Test comment");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;

            // Act
            var thread = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single();

            // Assert - Newly created thread should have isRead property set to true
            Assert.That(
                thread.IsRead,
                Is.True,
                "Since this thread's only comment was just added by the current user, the isRead property should be true."
            );
        }

        [TestCase(true)]
        [TestCase(false)]
        public void SetIsCommentThreadRead_True_UpdatesReadStatus(bool firstSetToUnread)
        {
            // Arrange - Create a comment to get a valid threadId
            var comment = CreateTestComment("GEN", 1, 1, "Test comment");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;

            if (firstSetToUnread)
            {
                // First set to unread (should initially be read)
                _provider.SetIsCommentThreadRead(threadId, false);
            }

            // Act - Set the thread as read
            _provider.SetIsCommentThreadRead(threadId, true);

            // Assert - Now the thread and comment should be read
            var thread = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single();
            Assert.That(thread.IsRead, Is.True, "Thread should be read after setting it to read");

            var commentWrapper = thread.Comments.Single(c => c.Id == commentId);
            Assert.That(
                commentWrapper.IsRead,
                Is.True,
                "Comment should be read after setting its thread to read"
            );
        }

        [Test]
        public void SetIsCommentThreadRead_False_UpdatesReadStatus()
        {
            // Arrange - Create a comment to get a valid threadId
            var comment = CreateTestComment("GEN", 1, 1, "Test comment");
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));
            string threadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;

            // Act - Set the thread as unread
            _provider.SetIsCommentThreadRead(threadId, false);

            // Assert - Now the thread and comment should be unread
            var thread = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single();
            Assert.That(
                thread.IsRead,
                Is.False,
                "Thread should be unread after setting it to unread"
            );

            var commentWrapper = thread.Comments.Single(c => c.Id == commentId);
            Assert.That(
                commentWrapper.IsRead,
                Is.False,
                "Comment should be unread after setting its thread to unread"
            );
        }

        [TestCase("invalid-thread-id")]
        [TestCase("")]
        public void SetIsCommentThreadRead_InvalidOrEmptyThreadId_ThrowsException(string threadId)
        {
            // Act & Assert - Should throw ArgumentException
            Assert.That(
                () => _provider.SetIsCommentThreadRead(threadId, true),
                Throws.ArgumentException.With.Message.Contains("not found")
            );
        }

        #endregion
    }
}
