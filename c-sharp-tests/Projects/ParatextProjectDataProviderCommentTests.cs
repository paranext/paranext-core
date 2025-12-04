using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.ProjectComments;
using SIL.Scripture;

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

            // Clear the auto-generated properties to create a "partial" comment
            comment.User = null!; // Will be set by CreateComment with current user
            comment.Thread = null!; // Will be auto-generated or set from threadId parameter

            comment.VerseRefStr = verseRef.ToString();
            if (threadId != null)
                comment.Thread = threadId;

            // Add the comment text to Contents
            comment.AddTextToContent(commentText, false);

            return comment;
        }

        #region CreateComment Tests

        [Test]
        public void CreateComment_ValidComment_ReturnsCommentId()
        {
            // Arrange
            var comment = CreateTestComment("GEN", 1, 1, "This is a test comment");

            // Act
            string commentId = _provider.CreateComment(comment);

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
        public void CreateComment_WithThreadId_AddsToExistingThread()
        {
            // Arrange - Create a comment to establish a thread
            var firstComment = CreateTestComment("GEN", 1, 1, "First comment");
            string firstCommentId = _provider.CreateComment(firstComment);

            // Retrieve the thread ID from the created comment
            string firstCommentThreadId = _provider
                .GetComments(new CommentSelector { CommentId = firstCommentId })
                .First()
                .Thread;

            // Create another comment for the same thread
            var secondComment = CreateTestComment(
                "GEN",
                1,
                1,
                "Second comment",
                firstCommentThreadId
            );

            // Act
            string secondCommentId = _provider.AddCommentToThread(secondComment);

            // Assert
            Assert.That(secondCommentId, Is.Not.Null);
            string secondCommentThreadId = _provider
                .GetComments(new CommentSelector { CommentId = secondCommentId })
                .First()
                .Thread;
            Assert.That(
                firstCommentThreadId,
                Is.EqualTo(secondCommentThreadId),
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
            string commentId1 = _provider.CreateComment(comment1);
            string commentId2 = _provider.CreateComment(comment2);

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
            _provider.CreateComment(CreateTestComment("GEN", 1, 1, "Comment 1"));
            _provider.CreateComment(CreateTestComment("GEN", 1, 2, "Comment 2"));

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
            string commentId = _provider.CreateComment(comment);
            string threadId = _provider
                .GetComments(new CommentSelector { CommentId = commentId })
                .First()
                .Thread;

            var selector = new CommentThreadSelector { ThreadId = threadId };

            // Act
            var threads = _provider.GetCommentThreads(selector);

            // Assert
            Assert.That(threads, Is.Not.Null);
            Assert.That(threads.Count, Is.EqualTo(1), "Should return exactly one thread");
            Assert.That(threads[0].Id, Is.EqualTo(threadId), "Thread ID should match the selector");
        }

        [Test]
        public void GetCommentThreads_FilterByScriptureRange_ReturnsMatchingThreads()
        {
            // Arrange - Create comments at different locations
            _provider.CreateComment(CreateTestComment("GEN", 1, 1, "Comment at Gen 1:1"));
            _provider.CreateComment(CreateTestComment("GEN", 1, 2, "Comment at Gen 1:2"));

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
            _provider.CreateComment(CreateTestComment("GEN", 1, 1, "Test"));
            _provider.CreateComment(CreateTestComment("GEN", 1, 2, "Test"));
            _provider.CreateComment(CreateTestComment("GEN", 1, 3, "Test"));

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
            var comment = CreateTestComment("GEN", 1, 1, "Comment to delete");
            string commentId = _provider.CreateComment(comment);

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
            string commentId = _provider.CreateComment(comment);
            string threadId = _provider
                .GetComments(new CommentSelector { CommentId = commentId })
                .First()
                .Thread;

            // Retrieve the comment thread
            threads = _provider.GetCommentThreads(new CommentThreadSelector());

            // Assert
            Assert.That(threads, Is.Not.Null);
            Assert.That(threads.Count, Is.EqualTo(1));
            Assert.That(threads[0].Id, Is.EqualTo(threadId));
            Assert.That(threads[0].Comments, Is.Not.Null);
            Assert.That(threads[0].Comments.Count, Is.GreaterThan(0));

            var foundComment = threads[0].Comments.FirstOrDefault(c => c.Id == commentId);
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
            string commentId = _provider.CreateComment(comment);
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
            string commentId1 = _provider.CreateComment(comment1);

            var comment2 = CreateTestComment("GEN", 1, 1, "Second comment");
            string commentId2 = _provider.CreateComment(comment2);

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
            string commentId = _provider.CreateComment(comment);

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
                updatedComment.Contents.InnerText.Trim(),
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
        public void UpdateComment_NotLastCommentInThread_ThrowsException()
        {
            // Arrange - Create a thread with multiple comments
            var firstComment = CreateTestComment("GEN", 1, 1, "First comment");
            string firstCommentId = _provider.CreateComment(firstComment);

            // Get the thread ID from the first comment
            var threads = _provider.GetCommentThreads(new CommentThreadSelector());
            var thread = threads.FirstOrDefault(t => t.Comments.Any(c => c.Id == firstCommentId));
            var threadId = thread?.Comments.First(c => c.Id == firstCommentId).Thread;

            // Add a second comment (reply) to the thread
            var secondComment = CreateTestComment("GEN", 1, 1, "Second comment");
            secondComment.Thread = threadId;
            _provider.AddCommentToThread(secondComment);

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
            string firstCommentId = _provider.CreateComment(firstComment);

            // Get the thread ID from the first comment
            var threads = _provider.GetCommentThreads(new CommentThreadSelector());
            var thread = threads.FirstOrDefault(t => t.Comments.Any(c => c.Id == firstCommentId));
            var threadId = thread?.Comments.First(c => c.Id == firstCommentId).Thread;

            // Add a second comment (reply) to the thread
            var secondComment = CreateTestComment("GEN", 1, 1, "Second comment");
            secondComment.Thread = threadId;
            string secondCommentId = _provider.AddCommentToThread(secondComment);

            // Act - Update the second comment (the last one in the thread)
            bool result = _provider.UpdateComment(secondCommentId, "Updated second comment");

            // Assert
            Assert.That(result, Is.True, "Update should succeed for the last comment");

            // Verify the content was updated
            var updatedComment = thread?.Comments.FirstOrDefault(c => c.Id == secondCommentId);

            Assert.That(updatedComment, Is.Not.Null, "Comment should still exist");
            Assert.That(
                updatedComment.Contents.InnerText.Trim(),
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
            string commentId = _provider.CreateComment(comment);
            string threadId = _provider
                .GetComments(new CommentSelector { CommentId = commentId })
                .First()
                .Thread;

            // Get initial comment count
            var threadsBefore = _provider.GetCommentThreads(
                new CommentThreadSelector { ThreadId = threadId }
            );
            int initialCommentCount = threadsBefore[0].Comments.Count;

            // Act - Resolve the thread via AddCommentToThread with Status
            var resolveComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                Status = NoteStatus.Resolved
            };
            _provider.AddCommentToThread(resolveComment);

            // Verify thread status is Resolved (displayed as 'deleted' internally by ParatextData)
            var threadsAfter = _provider.GetCommentThreads(
                new CommentThreadSelector { ThreadId = threadId }
            );
            Assert.That(threadsAfter, Has.Count.EqualTo(1));
            Assert.That(
                threadsAfter[0].Status.ToString().ToLowerInvariant(),
                Is.EqualTo("deleted"),
                "Thread status should be Resolved (labeled 'deleted' by ParatextData)"
            );

            // Verify a new comment was created to record the status change
            Assert.That(
                threadsAfter[0].Comments.Count,
                Is.EqualTo(initialCommentCount + 1),
                "A new comment should be created to record the status change"
            );

            // Verify the new comment has the correct status
            var lastComment = threadsAfter[0].Comments.Last();
            Assert.That(
                lastComment.Status.ToString().ToLowerInvariant(),
                Is.EqualTo("deleted"),
                "Last comment should have Resolved status (labeled 'deleted' by ParatextData)"
            );
        }

        [Test]
        public void AddCommentToThread_UnresolveThread_CreatesNewComment()
        {
            // Arrange - Create and resolve a thread
            var comment = CreateTestComment("GEN", 1, 1, "Test comment for unresolving");
            string commentId = _provider.CreateComment(comment);
            string threadId = _provider
                .GetComments(new CommentSelector { CommentId = commentId })
                .First()
                .Thread;

            // Resolve it first via AddCommentToThread
            var resolveComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                Status = NoteStatus.Resolved
            };
            _provider.AddCommentToThread(resolveComment);

            // Get comment count after resolving
            var threadsAfterResolve = _provider.GetCommentThreads(
                new CommentThreadSelector { ThreadId = threadId }
            );
            int commentCountAfterResolve = threadsAfterResolve[0].Comments.Count;

            // Act - Unresolve the thread via AddCommentToThread with Todo status
            var unresolveComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                Status = NoteStatus.Todo
            };
            _provider.AddCommentToThread(unresolveComment);

            // Verify thread status is Todo
            var threadsAfterUnresolve = _provider.GetCommentThreads(
                new CommentThreadSelector { ThreadId = threadId }
            );
            Assert.That(threadsAfterUnresolve, Has.Count.EqualTo(1));
            Assert.That(
                threadsAfterUnresolve[0].Status.ToString().ToLowerInvariant(),
                Is.EqualTo("todo"),
                "Thread status should be Todo after unresolving"
            );

            // Verify a new comment was created
            Assert.That(
                threadsAfterUnresolve[0].Comments.Count,
                Is.EqualTo(commentCountAfterResolve + 1),
                "A new comment should be created when unresolving"
            );

            // Verify the new comment has Todo status
            var lastComment = threadsAfterUnresolve[0].Comments.Last();
            Assert.That(
                lastComment.Status.ToString().ToLowerInvariant(),
                Is.EqualTo("todo"),
                "Last comment should have Todo status"
            );
        }

        [Test]
        public void AddCommentToThread_ResolvedThreadAppearsInResolvedFilter()
        {
            // Arrange - Create a comment
            var comment = CreateTestComment("GEN", 1, 1, "Test comment for filter");
            string commentId = _provider.CreateComment(comment);
            string threadId = _provider
                .GetComments(new CommentSelector { CommentId = commentId })
                .First()
                .Thread;

            // Act - Resolve the thread via AddCommentToThread
            var resolveComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                Status = NoteStatus.Resolved
            };
            _provider.AddCommentToThread(resolveComment);

            // Assert - Verify it appears in resolved filter (using ParatextData's 'deleted' label)
            var resolvedThreads = _provider.GetCommentThreads(
                new CommentThreadSelector { Status = "deleted" }
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
            // Arrange - Create and resolve a thread
            var comment = CreateTestComment("GEN", 1, 1, "Test comment for todo filter");
            string commentId = _provider.CreateComment(comment);
            string threadId = _provider
                .GetComments(new CommentSelector { CommentId = commentId })
                .First()
                .Thread;

            // Resolve first via AddCommentToThread
            var resolveComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                Status = NoteStatus.Resolved
            };
            _provider.AddCommentToThread(resolveComment);

            // Act - Unresolve it via AddCommentToThread
            var unresolveComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                Status = NoteStatus.Todo
            };
            _provider.AddCommentToThread(unresolveComment);

            // Assert - Verify it appears in Todo filter
            var todoThreads = _provider.GetCommentThreads(
                new CommentThreadSelector { Status = "todo" }
            );

            Assert.That(
                todoThreads.Any(t => t.Id == threadId),
                Is.True,
                "Unresolved thread should appear in Todo filter"
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
                () => _provider.AddCommentToThread(resolveComment),
                Throws.InstanceOf<InvalidDataException>().With.Message.Contains("does not exist")
            );
        }

        [Test]
        public void AddCommentToThread_MultipleStatusChanges_CreatesMultipleComments()
        {
            // Arrange - Create a comment
            var comment = CreateTestComment("GEN", 1, 1, "Test comment for multiple changes");
            string commentId = _provider.CreateComment(comment);
            string threadId = _provider
                .GetComments(new CommentSelector { CommentId = commentId })
                .First()
                .Thread;

            int initialCount = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .First()
                .Comments.Count;

            // Act - Make multiple status changes via AddCommentToThread
            _provider.AddCommentToThread(
                new Comment(_scrText.User) { Thread = threadId, Status = NoteStatus.Resolved }
            ); // Resolve
            _provider.AddCommentToThread(
                new Comment(_scrText.User) { Thread = threadId, Status = NoteStatus.Todo }
            ); // Unresolve
            _provider.AddCommentToThread(
                new Comment(_scrText.User) { Thread = threadId, Status = NoteStatus.Resolved }
            ); // Resolve again

            // Assert - Verify each status change created a new comment
            var thread = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .First();

            Assert.That(
                thread.Comments.Count,
                Is.EqualTo(initialCount + 3),
                "Three status changes should create three new comments"
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
            string commentId = _provider.CreateComment(comment);
            string threadId = _provider
                .GetComments(new CommentSelector { CommentId = commentId })
                .First()
                .Thread;

            // Act - Assign to Team via AddCommentToThread
            var assignComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                AssignedUser = "Team"
            };
            _provider.AddCommentToThread(assignComment);

            // Assert - Verify the thread is assigned to Team
            var threads = _provider.GetCommentThreads(
                new CommentThreadSelector { ThreadId = threadId }
            );
            Assert.That(threads, Has.Count.EqualTo(1));
            Assert.That(
                threads[0].AssignedUser,
                Is.EqualTo("Team"),
                "Thread should be assigned to Team"
            );
        }

        [Test]
        public void AddCommentToThread_Unassign_ClearsAssignment()
        {
            // Arrange - Create a comment and assign it first
            var comment = CreateTestComment("GEN", 1, 1, "Test comment for unassignment");
            string commentId = _provider.CreateComment(comment);
            string threadId = _provider
                .GetComments(new CommentSelector { CommentId = commentId })
                .First()
                .Thread;

            // Assign first via AddCommentToThread
            var assignComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                AssignedUser = "Team"
            };
            _provider.AddCommentToThread(assignComment);

            // Act - Unassign (empty string) via AddCommentToThread
            var unassignComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                AssignedUser = ""
            };
            _provider.AddCommentToThread(unassignComment);

            // Assert
            var threads = _provider.GetCommentThreads(
                new CommentThreadSelector { ThreadId = threadId }
            );
            Assert.That(threads, Has.Count.EqualTo(1));
            Assert.That(
                threads[0].AssignedUser,
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
                () => _provider.AddCommentToThread(assignComment),
                Throws.InstanceOf<InvalidDataException>().With.Message.Contains("does not exist")
            );
        }

        [Test]
        public void AddCommentToThread_AssignInvalidUser_ThrowsException()
        {
            // Arrange - Create a comment to establish a thread
            var comment = CreateTestComment("GEN", 1, 1, "Test comment for invalid user");
            string commentId = _provider.CreateComment(comment);
            string threadId = _provider
                .GetComments(new CommentSelector { CommentId = commentId })
                .First()
                .Thread;

            // Act & Assert - Try to assign an invalid user via AddCommentToThread
            var assignComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                AssignedUser = "InvalidUserNotInList"
            };
            Assert.That(
                () => _provider.AddCommentToThread(assignComment),
                Throws.InvalidOperationException.With.Message.Contains("cannot be assigned")
            );
        }

        [Test]
        public void AddCommentToThread_MultipleAssignments_LastAssignmentWins()
        {
            // Arrange - Create a comment to establish a thread
            var comment = CreateTestComment("GEN", 1, 1, "Test comment for multiple assignments");
            string commentId = _provider.CreateComment(comment);
            string threadId = _provider
                .GetComments(new CommentSelector { CommentId = commentId })
                .First()
                .Thread;

            // Act - Make multiple assignments via AddCommentToThread
            _provider.AddCommentToThread(
                new Comment(_scrText.User) { Thread = threadId, AssignedUser = "Team" }
            );
            _provider.AddCommentToThread(
                new Comment(_scrText.User) { Thread = threadId, AssignedUser = "" }
            ); // Unassign
            _provider.AddCommentToThread(
                new Comment(_scrText.User) { Thread = threadId, AssignedUser = "Team" }
            ); // Assign again

            // Assert - Last assignment should be the current state
            var threads = _provider.GetCommentThreads(
                new CommentThreadSelector { ThreadId = threadId }
            );
            Assert.That(threads, Has.Count.EqualTo(1));
            Assert.That(
                threads[0].AssignedUser,
                Is.EqualTo("Team"),
                "Thread should have the last assigned user"
            );
        }

        [Test]
        public void AddCommentToThread_AssignUser_CreatesNewCommentRecord()
        {
            // Arrange - Create a comment to establish a thread
            var comment = CreateTestComment("GEN", 1, 1, "Original comment");
            string commentId = _provider.CreateComment(comment);
            string threadId = _provider
                .GetComments(new CommentSelector { CommentId = commentId })
                .First()
                .Thread;

            var threadsBefore = _provider.GetCommentThreads(
                new CommentThreadSelector { ThreadId = threadId }
            );
            int commentCountBefore = threadsBefore[0].Comments.Count;

            // Act - Assign to Team via AddCommentToThread
            var assignComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                AssignedUser = "Team"
            };
            _provider.AddCommentToThread(assignComment);

            // Assert - A new comment should have been created
            var threadsAfter = _provider.GetCommentThreads(
                new CommentThreadSelector { ThreadId = threadId }
            );
            Assert.That(
                threadsAfter[0].Comments.Count,
                Is.EqualTo(commentCountBefore + 1),
                "Assignment should create a new comment record"
            );
        }

        [Test]
        public void AddCommentToThread_AssignWithContents_IncludesContentsInComment()
        {
            // Arrange - Create a comment to establish a thread
            var comment = CreateTestComment("GEN", 1, 1, "Original comment");
            string commentId = _provider.CreateComment(comment);
            string threadId = _provider
                .GetComments(new CommentSelector { CommentId = commentId })
                .First()
                .Thread;

            // Act - Assign with contents via AddCommentToThread
            var assignComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                AssignedUser = "Team"
            };
            assignComment.AddTextToContent("Assigning to team for review", false);
            _provider.AddCommentToThread(assignComment);

            // Assert - Verify the thread is assigned and has the new comment
            var threads = _provider.GetCommentThreads(
                new CommentThreadSelector { ThreadId = threadId }
            );
            Assert.That(threads, Has.Count.EqualTo(1));
            Assert.That(threads[0].AssignedUser, Is.EqualTo("Team"));

            // Get the comments and check the last one has the contents
            var comments = _provider.GetComments(new CommentSelector { BookId = "GEN" });
            var threadComments = comments.Where(c => c.Thread == threadId).ToList();
            var lastComment = threadComments.OrderByDescending(c => c.Date).First();
            Assert.That(
                lastComment.Contents?.InnerXml,
                Does.Contain("Assigning to team for review"),
                "Last comment should contain the provided contents"
            );
        }

        #endregion
    }
}
