using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.ProjectComments;
using Paratext.Data.Users;
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
        private JsonSerializerOptions _serializationOptions = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _serializationOptions = SerializationOptions.CreateSerializationOptions();

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
        public void AddCommentToThread_ReplyCarriesClientConflictType_NotPersistedAndNoConflictFields()
        {
            // Establish a conflict thread (its root is Type=Conflict, so replies inherit Type=Conflict
            // via ParatextData's AddNewComment). This is the setup in which a client-supplied
            // ConflictType on a reply used to decode phantom conflict fields.
            var firstComment = CommentTestHelper.CreateConflictComment();
            firstComment.Thread = null!; // provider assigns the thread ID
            string firstCommentId = _provider.CreateComment(
                new PlatformCommentWrapper(firstComment)
            );
            string threadId = firstCommentId.Split('/')[0];

            // A reply whose client payload (illegally) sets ConflictType=VerseTextConflict and a stale
            // Verse. If either survived the write path, the wrapper would surface phantom conflict fields.
            var reply = new Comment(_scrText.User) { Thread = threadId };
            reply.SetContentsFromHtml("<p>Just a reply</p>");
            reply.ConflictType = NoteConflictType.VerseTextConflict;
            reply.Verse = @"\v 1 stale current verse text";
            string replyId = _provider.AddCommentToThread(new PlatformCommentWrapper(reply));

            var thread = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single();
            var persistedReply = thread.Comments.Single(c => c.Id == replyId);

            // Write-side: the client-supplied ConflictType must not have been persisted. Assert on
            // the underlying Comment, NOT the wrapper property — the wrapper gates ConflictType to
            // the thread's first comment, so reading it here would pass regardless of persistence.
            Assert.That(
                persistedReply.CommentInternal.ConflictType,
                Is.EqualTo(NoteConflictType.None),
                "CopyCommentProperties must not persist a client-supplied ConflictType onto a reply."
            );

            // Read-side/serialization: the reply must serialize no conflict fields.
            var json = JsonSerializer.Serialize<PlatformCommentWrapper>(
                persistedReply,
                _serializationOptions
            );
            Assert.That(json, Does.Not.Contain("rejectedText"));
            Assert.That(json, Does.Not.Contain("acceptedText"));
            Assert.That(json, Does.Not.Contain("resultText"));
            Assert.That(json, Does.Not.Contain("rejectedResultText"));
            Assert.That(json, Does.Not.Contain("conflictType"));

            // verse, by contrast, IS persisted and serialized from the reply — intended PT9
            // behavior, not a gating gap: Comment.Verse is per-comment verse-history data
            // (AddNewComment captures it on replies too), unlike root-only conflict metadata.
            Assert.That(
                json,
                Does.Contain(@"""verse"":""\\v 1 stale current verse text"""),
                "reply must still persist and serialize its own verse (per-comment history data)"
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
                    new CommentScriptureRange(
                        new VerseRef
                        {
                            BookNum = 1,
                            ChapterNum = 1,
                            VerseNum = 1,
                        },
                        new VerseRef
                        {
                            BookNum = 1,
                            ChapterNum = 1,
                            VerseNum = 1,
                        },
                        "verse"
                    ),
                ],
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
        public void GetCommentThreads_StatusAndIsResolvedBothSet_Throws()
        {
            // Status and IsResolved both constrain thread status; setting both is ambiguous and
            // would silently AND to zero results, so it must fail fast.
            var selector = new CommentThreadSelector
            {
                Status = NoteStatus.Resolved,
                IsResolved = true,
            };

            Assert.That(
                () => _provider.GetCommentThreads(selector),
                Throws.ArgumentException.With.Message.Contains("both filter thread status")
            );
        }

        [Test]
        public void GetCommentThreads_FilterByAssignedToEmpty_ReturnsOnlyUnassignedThreads()
        {
            // Arrange - one thread assigned to Team, one left unassigned.
            var assignedComment = CreateTestComment("GEN", 1, 1, "Assigned to team");
            string assignedCommentId = _provider.CreateComment(
                new PlatformCommentWrapper(assignedComment)
            );
            string assignedThreadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == assignedCommentId))
                .Id;
            _provider.AddCommentToThread(
                new PlatformCommentWrapper(
                    new Comment(_scrText.User) { Thread = assignedThreadId, AssignedUser = "Team" }
                )
            );

            var unassignedComment = CreateTestComment("GEN", 1, 2, "Unassigned");
            string unassignedCommentId = _provider.CreateComment(
                new PlatformCommentWrapper(unassignedComment)
            );
            string unassignedThreadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == unassignedCommentId))
                .Id;

            // Act - empty string is the "unassigned" filter (CommentThread.unassignedUser), not "no
            // filter", so it must return only unassigned threads, not every thread.
            var threads = _provider.GetCommentThreads(
                new CommentThreadSelector { AssignedTo = "" }
            );

            // Assert - only the unassigned thread, NOT the Team-assigned one.
            Assert.That(
                threads.Select(t => t.Id),
                Has.Member(unassignedThreadId),
                "Unassigned thread should match the empty-string assignment filter"
            );
            Assert.That(
                threads.Select(t => t.Id),
                Has.No.Member(assignedThreadId),
                "Team-assigned thread should be excluded by the empty-string (unassigned) filter"
            );
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
                    new CommentScriptureRange(
                        new VerseRef
                        {
                            BookNum = 1,
                            ChapterNum = 1,
                            VerseNum = 1,
                        },
                        new VerseRef
                        {
                            BookNum = 1,
                            ChapterNum = 1,
                            VerseNum = 1,
                        },
                        "verse"
                    ),
                ],
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
        public void UpdateComment_TimConflictXml_POC_UpdatesContentsSuccessfully()
        {
            // Create a conflict comment using the helper method (for its complex XML content structure)
            var comment = CommentTestHelper.CreateConflictComment();
            comment.Thread = null; // Will be set in _provider.CreateComment
            // Reset the type so this isn't treated as a conflict thread. The purpose of this test
            // is to verify that complex conflict-note XML content can be updated, not to test
            // conflict thread permissions (which prevent editing the first comment of conflict threads).
            comment.Type = NoteType.Unspecified;

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
        public void UpdateComment_ConflictThreadFirstComment_ThrowsInvalidOperationException()
        {
            // Create a conflict comment — NoteType.Conflict makes the resulting thread a conflict
            // thread, whose first comment cannot be edited per CanUserEditOrDeleteComment.
            var comment = CommentTestHelper.CreateConflictComment();
            comment.Thread = null; // Will be set in _provider.CreateComment

            string commentId = _provider.CreateComment(new PlatformCommentWrapper(comment));

            Assert.Throws<InvalidOperationException>(
                () => _provider.UpdateComment(commentId, "<p>Attempted edit</p>")
            );
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
                    "only the last comment can be edited or deleted"
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
                Status = NoteStatus.Resolved,
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(resolveComment));

            // Verify thread status is resolved (displayed as 'deleted' internally by ParatextData)
            var threadAfter = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single();
            Assert.That(
                threadAfter.Status,
                Is.EqualTo(NoteStatus.Resolved),
                "Thread status should be Resolved"
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
                lastComment.Status,
                Is.EqualTo(NoteStatus.Resolved),
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
                Status = NoteStatus.Resolved,
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
                Status = NoteStatus.Todo,
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(unresolveComment));
            ;

            // Verify thread status is to-do
            var threadAfterUnresolve = _provider
                .GetCommentThreads(new CommentThreadSelector { ThreadId = threadId })
                .Single();
            Assert.That(
                threadAfterUnresolve.Status,
                Is.EqualTo(NoteStatus.Todo),
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
                lastComment.Status,
                Is.EqualTo(NoteStatus.Todo),
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
                Status = NoteStatus.Resolved,
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(resolveComment));

            // Assert - Verify it appears in resolved filter
            // Status uses backend status format since CommentThreadSelectorConverter
            // handles the conversion from frontend CommentStatus during JSON deserialization
            var resolvedThreads = _provider.GetCommentThreads(
                new CommentThreadSelector { Status = NoteStatus.Resolved }
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
                Status = NoteStatus.Resolved,
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(resolveComment1));

            // Resolve the second thread and keep it resolved
            var resolveComment2 = new Comment(_scrText.User)
            {
                Thread = resolvedThreadId,
                Status = NoteStatus.Resolved,
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(resolveComment2));

            // Act - Unresolve the first thread
            var unresolveComment = new Comment(_scrText.User)
            {
                Thread = todoThreadId,
                Status = NoteStatus.Todo,
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(unresolveComment));

            // Assert - Verify only the to-do thread appears in Todo filter
            // Status uses internal NoteStatus format since CommentThreadSelectorConverter
            // handles the conversion from frontend CommentStatus during JSON deserialization
            var todoThreads = _provider.GetCommentThreads(
                new CommentThreadSelector { Status = NoteStatus.Todo }
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
                Status = NoteStatus.Resolved,
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
                AssignedUser = "Team",
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
                AssignedUser = "Team",
            };
            _provider.AddCommentToThread(new PlatformCommentWrapper(assignComment));

            // Act - Unassign (empty string) via AddCommentToThread
            var unassignComment = new Comment(_scrText.User)
            {
                Thread = threadId,
                AssignedUser = "",
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
                AssignedUser = "Team",
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
                AssignedUser = "InvalidUserNotInList",
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
                AssignedUser = "Team",
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
                AssignedUser = "Team",
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

        #region NoteCategory and Deduplicate Selector Tests

        [Test]
        public void GetCommentThreads_DefaultSelector_ReturnsOnlyGeneralNotes()
        {
            // Arrange - Create one regular comment, one BT note, and one spelling note
            var regularComment = CreateTestComment("GEN", 1, 1, "Regular comment");
            _provider.CreateComment(new PlatformCommentWrapper(regularComment));
            CreateBtNoteThread("bt-note-default", "GEN 1:1", "BT note text");
            CreateSpellingNoteThread("spelling-note-default", "GEN 1:1", "Spelling note text");

            // Act - Default selector returns only general notes
            var threads = _provider.GetCommentThreads(new CommentThreadSelector());

            // Assert - Only the regular comment survives the default filter
            Assert.That(threads, Has.Count.EqualTo(1));
            Assert.That(threads[0].IsBTNote, Is.False);
            Assert.That(threads[0].IsSpellingNote, Is.False);
        }

        [Test]
        public void GetCommentThreads_NoteCategoryBtNotes_ReturnsOnlyBtNotes()
        {
            // Arrange - Create one regular comment, one BT note, and one spelling note
            var regularComment = CreateTestComment("GEN", 1, 1, "Regular comment");
            _provider.CreateComment(new PlatformCommentWrapper(regularComment));
            CreateBtNoteThread("bt-note-only", "GEN 1:1", "BT note text");
            CreateSpellingNoteThread("spelling-note-bt-test", "GEN 1:1", "Spelling note text");

            // Act - BtNotes category returns only biblical term notes
            CommentThreadSelector selector = new() { NoteCategory = NoteCategory.BtNotes };
            List<PlatformCommentThreadWrapper> threads = _provider.GetCommentThreads(selector);

            // Assert - Only the BT note is returned
            Assert.That(threads, Has.Count.EqualTo(1));
            Assert.That(threads[0].IsBTNote, Is.True);
        }

        [Test]
        public void GetCommentThreads_NoteCategorySpellingNotes_ReturnsOnlySpellingNotes()
        {
            // Arrange - Create one regular comment, one BT note, and one spelling note
            var regularComment = CreateTestComment("GEN", 1, 1, "Regular comment");
            _provider.CreateComment(new PlatformCommentWrapper(regularComment));
            CreateBtNoteThread("bt-note-spelling-test", "GEN 1:1", "BT note text");
            CreateSpellingNoteThread("spelling-note-only", "GEN 1:1", "Spelling note text");

            // Act - SpellingNotes category returns only spelling notes
            CommentThreadSelector selector = new() { NoteCategory = NoteCategory.SpellingNotes };
            List<PlatformCommentThreadWrapper> threads = _provider.GetCommentThreads(selector);

            // Assert - Only the spelling note is returned
            Assert.That(threads, Has.Count.EqualTo(1));
            Assert.That(threads[0].IsSpellingNote, Is.True);
        }

        /// <summary>
        /// Creates a Biblical Term note by adding the biblical term tag to a comment and inserting it
        /// directly into the project's CommentManager. <see cref="CommentThread.IsBTNote"/> is
        /// determined by <see cref="CommentTag.biblicalTermTagId"/> in <see cref="Comment.TagsAddedIds"/>.
        /// </summary>
        private void CreateBtNoteThread(string threadId, string verseRefStr, string text)
        {
            Comment comment = new Comment(_scrText.User);
            comment.Thread = threadId;
            comment.VerseRefStr = verseRefStr;
            comment.TagsAddedIds = new[] { CommentTag.biblicalTermTagId };
            comment.SetContentsFromHtml(text);
            CommentManager commentManager = CommentManager.Get(_scrText);
            commentManager.AddComment(comment);
            commentManager.SaveUser(comment.User, false);
        }

        /// <summary>
        /// Creates a spelling note by adding the spelling tag to a comment and inserting it
        /// directly into the project's CommentManager.
        /// </summary>
        private void CreateSpellingNoteThread(string threadId, string verseRefStr, string text)
        {
            Comment comment = new Comment(_scrText.User);
            comment.Thread = threadId;
            comment.VerseRefStr = verseRefStr;
            comment.TagsAddedIds = new[] { CommentTag.spellingTagId };
            comment.SetContentsFromHtml(text);
            CommentManager commentManager = CommentManager.Get(_scrText);
            commentManager.AddComment(comment);
            commentManager.SaveUser(comment.User, false);
        }

        [Test]
        public void GetCommentThreads_BiblicalTermsNotesAndSpellingNotes_AreReturnedSeparately()
        {
            // Arrange - Create only a BT note and a spelling note (no general note)
            CreateBtNoteThread("bt-note-separate", "GEN 1:1", "BT note text");
            CreateSpellingNoteThread("spelling-note-separate", "GEN 1:1", "Spelling note text");

            // Act
            var btThreads = _provider.GetCommentThreads(
                new CommentThreadSelector { NoteCategory = NoteCategory.BtNotes }
            );
            var spellingThreads = _provider.GetCommentThreads(
                new CommentThreadSelector { NoteCategory = NoteCategory.SpellingNotes }
            );

            // Assert - Each filter returns only its own type and excludes the other
            Assert.That(btThreads, Has.Count.EqualTo(1));
            Assert.Multiple(() =>
            {
                Assert.That(btThreads[0].IsBTNote, Is.True);
                Assert.That(
                    btThreads[0].IsSpellingNote,
                    Is.False,
                    "BT notes filter should not return spelling notes"
                );
            });

            Assert.That(spellingThreads, Has.Count.EqualTo(1));
            Assert.Multiple(() =>
            {
                Assert.That(spellingThreads[0].IsSpellingNote, Is.True);
                Assert.That(
                    spellingThreads[0].IsBTNote,
                    Is.False,
                    "Spelling notes filter should not return BT notes"
                );
            });
        }

        [Test]
        public void GetCommentThreads_DeduplicateThreadsFalse_ReturnsRawThreads()
        {
            // Arrange
            var comment = CreateTestComment("GEN", 1, 1, "Test comment");
            _provider.CreateComment(new PlatformCommentWrapper(comment));

            // Act - With and without dedup
            var withDedup = _provider.GetCommentThreads(
                new CommentThreadSelector { DeduplicateThreads = true }
            );
            var withoutDedup = _provider.GetCommentThreads(
                new CommentThreadSelector { DeduplicateThreads = false }
            );

            // Assert - Without dedup should return at least as many threads as with dedup
            Assert.That(withoutDedup.Count, Is.GreaterThanOrEqualTo(withDedup.Count));
        }

        [Test]
        public void GetCommentThreads_NullSelector_AppliesDefaults()
        {
            // Arrange
            var comment = CreateTestComment("GEN", 1, 1, "Test comment");
            _provider.CreateComment(new PlatformCommentWrapper(comment));

            // Act - null selector should apply defaults (general notes only, deduplicate)
            var threads = _provider.GetCommentThreads(null!);

            // Assert - Should still return the regular comment
            Assert.That(threads, Has.Count.EqualTo(1));
        }

        // Creates an unresolved (Todo) verseText-style conflict thread and returns its thread ID.
        private string CreateUnresolvedConflictThread(string verseRefStr)
        {
            Comment conflict = CommentTestHelper.CreateConflictComment();
            conflict.Thread = null!; // provider assigns the thread ID
            conflict.VerseRefStr = verseRefStr;
            string commentId = _provider.CreateComment(new PlatformCommentWrapper(conflict));
            return _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId))
                .Id;
        }

        // Resolves a thread by appending a Resolved comment through CommentManager directly. Not via
        // AddCommentToThread: the provider's generic status path rejects Status=Resolved on conflict
        // threads, and this helper must keep working regardless.
        private void ResolveThreadViaCommentManager(string threadId)
        {
            CommentManager commentManager = CommentManager.Get(_scrText);
            CommentThread thread = commentManager.FindThread(threadId);
            Comment resolution = thread.AddNewComment();
            resolution.Status = NoteStatus.Resolved;
            commentManager.AddComment(resolution);
        }

        [Test]
        public void GetCommentThreads_FilterByIsResolvedFalse_ExcludesOnlyResolvedThreads()
        {
            // Arrange - three threads: Todo, Resolved, Done. "Unresolved" means the THREAD status is
            // not Resolved (PT9 StatusFilter semantics), so the Done thread must still match.
            var comment1 = CreateTestComment("GEN", 1, 1, "Todo thread");
            string commentId1 = _provider.CreateComment(new PlatformCommentWrapper(comment1));
            string threadId1 = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId1))
                .Id;

            var comment2 = CreateTestComment("GEN", 1, 2, "Resolved thread");
            string commentId2 = _provider.CreateComment(new PlatformCommentWrapper(comment2));
            string threadId2 = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId2))
                .Id;
            _provider.AddCommentToThread(
                new PlatformCommentWrapper(
                    new Comment(_scrText.User) { Thread = threadId2, Status = NoteStatus.Resolved }
                )
            );

            var comment3 = CreateTestComment("GEN", 1, 3, "Done thread");
            string commentId3 = _provider.CreateComment(new PlatformCommentWrapper(comment3));
            string threadId3 = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId3))
                .Id;
            _provider.AddCommentToThread(
                new PlatformCommentWrapper(
                    new Comment(_scrText.User) { Thread = threadId3, Status = NoteStatus.Done }
                )
            );

            var selector = new CommentThreadSelector { IsResolved = false };

            // Act
            var threads = _provider.GetCommentThreads(selector);

            // Assert
            Assert.That(
                threads.Select(t => t.Id),
                Is.EquivalentTo(new[] { threadId1, threadId3 }),
                "IsResolved=false must return every thread whose status is not Resolved (incl. Done)"
            );
        }

        [Test]
        public void GetCommentThreads_FilterByIsResolvedTrue_ReturnsOnlyResolvedThreads()
        {
            // Arrange
            var comment1 = CreateTestComment("GEN", 1, 1, "Todo thread");
            _provider.CreateComment(new PlatformCommentWrapper(comment1));

            var comment2 = CreateTestComment("GEN", 1, 2, "Resolved thread");
            string commentId2 = _provider.CreateComment(new PlatformCommentWrapper(comment2));
            string threadId2 = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId2))
                .Id;
            _provider.AddCommentToThread(
                new PlatformCommentWrapper(
                    new Comment(_scrText.User) { Thread = threadId2, Status = NoteStatus.Resolved }
                )
            );

            var selector = new CommentThreadSelector { IsResolved = true };

            // Act
            var threads = _provider.GetCommentThreads(selector);

            // Assert
            Assert.That(
                threads.Single().Id,
                Is.EqualTo(threadId2),
                "IsResolved=true must return only Resolved threads"
            );
        }

        [Test]
        public void GetCommentThreads_FilterByIsResolvedNull_ReturnsAllThreads()
        {
            // Arrange - one Todo thread and one Resolved thread
            var comment1 = CreateTestComment("GEN", 1, 1, "Todo thread");
            string commentId1 = _provider.CreateComment(new PlatformCommentWrapper(comment1));
            string threadId1 = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId1))
                .Id;

            var comment2 = CreateTestComment("GEN", 1, 2, "Resolved thread");
            string commentId2 = _provider.CreateComment(new PlatformCommentWrapper(comment2));
            string threadId2 = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == commentId2))
                .Id;
            _provider.AddCommentToThread(
                new PlatformCommentWrapper(
                    new Comment(_scrText.User) { Thread = threadId2, Status = NoteStatus.Resolved }
                )
            );

            var selector = new CommentThreadSelector();

            // Act
            var threads = _provider.GetCommentThreads(selector);

            // Assert
            Assert.That(
                threads.Select(t => t.Id),
                Is.EquivalentTo(new[] { threadId1, threadId2 }),
                "Unset IsResolved must apply no resolved-status filtering"
            );
        }

        [Test]
        public void GetCommentThreads_TypeConflictAndIsResolvedFalse_ReturnsOnlyUnresolvedConflicts()
        {
            // Arrange - the "Unresolved conflicts" dropdown query. An unresolved conflict must match;
            // a resolved conflict and a normal Todo thread must not.
            string unresolvedConflictThreadId = CreateUnresolvedConflictThread("MAT 1:1");

            string resolvedConflictThreadId = CreateUnresolvedConflictThread("MAT 2:2");
            ResolveThreadViaCommentManager(resolvedConflictThreadId);

            _provider.CreateComment(
                new PlatformCommentWrapper(CreateTestComment("GEN", 1, 1, "Normal todo thread"))
            );

            var selector = new CommentThreadSelector
            {
                Type = NoteType.Conflict,
                IsResolved = false,
            };

            // Act
            var threads = _provider.GetCommentThreads(selector);

            // Assert
            Assert.That(
                threads.Single().Id,
                Is.EqualTo(unresolvedConflictThreadId),
                "Only the unresolved conflict thread should match the Unresolved-conflicts query"
            );
        }

        [Test]
        public void GetCommentThreads_TypeConflict_ReturnsResolvedAndUnresolvedConflicts()
        {
            // Arrange - the "Conflicts" (all) dropdown query. Both an unresolved and a resolved
            // conflict must match; a normal thread must not.
            string unresolvedConflictThreadId = CreateUnresolvedConflictThread("MAT 1:1");

            string resolvedConflictThreadId = CreateUnresolvedConflictThread("MAT 2:2");
            ResolveThreadViaCommentManager(resolvedConflictThreadId);

            _provider.CreateComment(
                new PlatformCommentWrapper(CreateTestComment("GEN", 1, 1, "Normal todo thread"))
            );

            var selector = new CommentThreadSelector { Type = NoteType.Conflict };

            // Act
            var threads = _provider.GetCommentThreads(selector);

            // Assert
            Assert.That(
                threads.Select(t => t.Id),
                Is.EquivalentTo(new[] { unresolvedConflictThreadId, resolvedConflictThreadId }),
                "The Conflicts query must return conflict threads regardless of resolved status"
            );
        }

        [Test]
        public void GetCommentThreads_TypeNormal_ReturnsOnlyRegularThreads()
        {
            // Arrange - the "Comments" (non-conflict) dropdown query. A regular note must match; a
            // conflict note must not. Regular notes default to NoteType.Normal (CommentList.cs), so
            // filtering on Type == Normal cleanly separates them from Conflict-typed threads.
            var regular = CreateTestComment("GEN", 1, 1, "Regular note");
            string regularCommentId = _provider.CreateComment(new PlatformCommentWrapper(regular));
            string regularThreadId = _provider
                .GetCommentThreads(new CommentThreadSelector())
                .Single(t => t.Comments.Any(c => c.Id == regularCommentId))
                .Id;

            CreateUnresolvedConflictThread("MAT 1:1");

            var selector = new CommentThreadSelector { Type = NoteType.Normal };

            // Act
            var threads = _provider.GetCommentThreads(selector);

            // Assert
            Assert.That(
                threads.Single().Id,
                Is.EqualTo(regularThreadId),
                "type: Normal must return only regular (non-conflict) threads"
            );
        }

        #endregion

        #region ResolveConflict Tests

        // Winner (post-merge) chapter text for the MAT 2:1 conflict fixture.
        private const string MatTwoWinnerUsfm =
            "\\id MAT\n\\c 2\n\\v 1 When Jesus was born in the big village of Bethlehem in Judea, Herod was king.\n";

        // Winner (post-merge current) chapter text for the INDEPENDENT-changes MAT 2:1 conflict
        // fixture. The accepted (winning) side inserted "great" before "king" (a late word); the
        // rejected side independently inserted "small" before "village" (an early word). This is the
        // accepted side alone, so it lacks the rejected "small" - "Merge all changes" would splice
        // that in. See CommentTestHelper.CreateIndependentVerseTextConflictComment.
        private const string MatTwoIndependentWinnerUsfm =
            "\\id MAT\n\\c 2\n\\v 1 When Jesus was born in the village of Bethlehem in Judea, Herod was great king.\n";

        // The winner verse edited AFTER the merge (big -> enormous) - makes the conflict stale.
        private const string MatTwoEditedUsfm =
            "\\id MAT\n\\c 2\n\\v 1 When Jesus was born in the enormous village of Bethlehem in Judea, Herod was king.\n";

        // The winner verse re-saved with ONLY interior whitespace changed (extra spaces between two
        // words). RegularizeSpaces().Trim() on both sides collapses this away, so it is NOT a real
        // verse edit and the conflict must stay fully resolvable.
        private const string MatTwoWinnerWhitespaceUsfm =
            "\\id MAT\n\\c 2\n\\v 1 When Jesus was born in the big   village of Bethlehem in Judea, Herod was king.\n";

        // Chapter 2 with NO verse 1 at all, so reading MAT 2:1 yields no USFM (unreadable verse).
        private const string MatTwoMissingVerseUsfm = "\\id MAT\n\\c 2\n";

        // Chapter 2 whose \v 1 the losing side deleted ENTIRELY (marker included; see
        // CommentTestHelper.CreateVerseTextConflictCommentDeletion). \v 2 follows so the reject
        // splice boundary (\v 1 -> next \v) is observable. The winner kept \v 1, and its text matches
        // the fixture's recorded winner Verse, so the reject is not stale.
        private const string MatTwoDeletionWinnerUsfm =
            "\\id MAT\n\\c 2\n\\v 1 When Jesus was born in the village of Bethlehem in Judea, Herod was king.\n\\v 2 Then wise men from the east came to Jerusalem.\n";

        // Delegates to the static overload (below) to avoid duplicating the seeding logic.
        private CommentThread SeedVerseTextConflict() => SeedVerseTextConflict(_scrText, null);

        // The exact verse text GetText returns for the seeded winner USFM, captured from a throwaway
        // project. Reading it there (rather than from _scrText between seed and resolve) avoids a
        // transient CommentManager desync seen when _scrText is read between seeding the conflict
        // comment and resolving it, and round-trips the same PutText -> GetText the test uses so the
        // expected value matches byte-for-byte regardless of any USFM normalization.
        private static string ExpectedWinnerVerseText()
        {
            using var reference = CreateDummyProject();
            reference.PutText(40, 0, false, MatTwoWinnerUsfm, null);
            var vref = new VerseRef("MAT", "2", "1", reference.Settings.Versification);
            return reference.GetText(vref, true, true);
        }

        // Re-reads the (post-resolution) thread. CommentManager.FindThread builds a fresh
        // CommentThread each call and SaveEdits records the resolution on a new comment, so a
        // reference captured before resolving is stale - re-query, as the other mutation tests do.
        private PlatformCommentThreadWrapper ReloadThread(string threadId) =>
            _provider.GetCommentThreads(new CommentThreadSelector { ThreadId = threadId }).Single();

        [Test]
        public void ResolveConflict_Accept_ResolvesThreadAndLeavesVerseUnchanged()
        {
            string expectedWinner = ExpectedWinnerVerseText();
            CommentThread thread = SeedVerseTextConflict();
            var vref = new VerseRef("MAT", "2", "1", _scrText.Settings.Versification);

            _provider.ResolveConflict(thread.Id, "accept");

            Assert.That(ReloadThread(thread.Id).Status, Is.EqualTo(NoteStatus.Resolved));
            // accept keeps the auto-merged (winning) verse text and writes nothing: the chapter text
            // must be byte-for-byte the seeded winner (strict, so a stray write can't slip through).
            string after = _scrText.GetText(vref, true, true);
            Assert.That(after, Is.EqualTo(expectedWinner));
            Assert.That(after, Does.Contain("big village"));
            Assert.That(after, Does.Not.Contain("small village"));
        }

        [Test]
        public void ResolveConflict_RejectAfterAccept_ThrowsAndDoesNotRewriteVerse()
        {
            // A resolved thread must not be re-resolvable: reject-after-accept would otherwise rewrite
            // the verse of an already-settled conflict. The already-resolved guard rejects it.
            CommentThread thread = SeedVerseTextConflict();
            var vref = new VerseRef("MAT", "2", "1", _scrText.Settings.Versification);

            _provider.ResolveConflict(thread.Id, "accept");

            Assert.That(
                () => _provider.ResolveConflict(thread.Id, "reject"),
                Throws.TypeOf<InvalidOperationException>().With.Message.Contains("already resolved")
            );
            // The guard fired before any verse write, so the winner text is untouched. (GetText is
            // read only here, after both resolves, to avoid the mid-sequence CommentManager desync.)
            string after = _scrText.GetText(vref, true, true);
            Assert.That(after, Does.Contain("big village"));
            Assert.That(after, Does.Not.Contain("small village"));
        }

        [Test]
        public void ResolveConflict_Reject_WritesLoserTextAndResolvesThread()
        {
            CommentThread thread = SeedVerseTextConflict();
            var vref = new VerseRef("MAT", "2", "1", _scrText.Settings.Versification);

            _provider.ResolveConflict(thread.Id, "reject");

            Assert.That(ReloadThread(thread.Id).Status, Is.EqualTo(NoteStatus.Resolved));
            string after = _scrText.GetText(vref, true, true);
            Assert.That(after, Does.Contain("small village")); // loser text written
            Assert.That(after, Does.Not.Contain("big village"));
        }

        // --- UnresolveConflict spike (PT-4141) -------------------------------------------------

        [Test]
        public void UnresolveConflict_AfterReject_RestoresWinnerReopensAndReoffersOptions()
        {
            // The headline feasibility proof: a reject wrote the loser into the verse; undo must roll
            // the verse back to the auto-merge WINNER (recovered from the retained Comments[0].Verse),
            // re-open the note, and make the card actionable again.
            string expectedWinner = ExpectedWinnerVerseText();
            CommentThread thread = SeedVerseTextConflict();
            var vref = new VerseRef("MAT", "2", "1", _scrText.Settings.Versification);

            _provider.ResolveConflict(thread.Id, "reject");
            _provider.UnresolveConflict(thread.Id);

            // Verse restored to the winner byte-for-byte (a stray/partial write can't slip through).
            string after = _scrText.GetText(vref, true, true);
            Assert.That(after, Is.EqualTo(expectedWinner));
            Assert.That(after, Does.Contain("big village"));
            Assert.That(after, Does.Not.Contain("small village"));
            // Thread is no longer resolved, and options are re-offered (winner restored -> not stale).
            Assert.That(ReloadThread(thread.Id).Status, Is.Not.EqualTo(NoteStatus.Resolved));
            Assert.That(
                _provider.GetConflictResolutionOptions(thread.Id),
                Is.EqualTo("acceptOrReject")
            );
        }

        [Test]
        public void UnresolveConflict_AfterAccept_ReopensWithoutRewritingVerse()
        {
            // Accept never wrote the verse, so undo must not write either: it only re-opens the note.
            string expectedWinner = ExpectedWinnerVerseText();
            CommentThread thread = SeedVerseTextConflict();
            var vref = new VerseRef("MAT", "2", "1", _scrText.Settings.Versification);

            _provider.ResolveConflict(thread.Id, "accept");
            _provider.UnresolveConflict(thread.Id);

            Assert.That(_scrText.GetText(vref, true, true), Is.EqualTo(expectedWinner));
            Assert.That(ReloadThread(thread.Id).Status, Is.Not.EqualTo(NoteStatus.Resolved));
            Assert.That(
                _provider.GetConflictResolutionOptions(thread.Id),
                Is.EqualTo("acceptOrReject")
            );
        }

        [Test]
        public void UnresolveConflict_VerseEditedAfterResolution_RefusesAndKeepsVerse()
        {
            // The core precaution: if the verse was edited AFTER the conflict was resolved, undo must
            // refuse rather than clobber that later edit by writing the winner back over it.
            CommentThread thread = SeedVerseTextConflict();
            var vref = new VerseRef("MAT", "2", "1", _scrText.Settings.Versification);

            _provider.ResolveConflict(thread.Id, "reject"); // verse now holds the loser
            // A later legitimate edit changes the verse away from the reject output.
            _scrText.PutText(
                40,
                0,
                false,
                "\\id MAT\n\\c 2\n\\v 1 When Jesus was born in the tiny village of Bethlehem in Judea, Herod was king.\n",
                null
            );

            Assert.That(
                () => _provider.UnresolveConflict(thread.Id),
                Throws
                    .TypeOf<InvalidOperationException>()
                    .With.Message.Contains("changed since it was resolved")
            );
            // The post-resolution edit is preserved, not rolled back to the winner.
            Assert.That(_scrText.GetText(vref, true, true), Does.Contain("tiny village"));
        }

        [Test]
        public void UnresolveConflict_UnresolvedConflict_Throws()
        {
            // Nothing to undo on a conflict that was never resolved.
            CommentThread thread = SeedVerseTextConflict();
            Assert.That(
                () => _provider.UnresolveConflict(thread.Id),
                Throws.TypeOf<InvalidOperationException>().With.Message.Contains("not resolved")
            );
        }

        // --- canUnresolveConflict capability query (PT-4141) -----------------------------------

        [Test]
        public void CanUnresolveConflict_ResolvedConflictAsAdmin_True()
        {
            CommentThread thread = SeedVerseTextConflict();
            _provider.ResolveConflict(thread.Id, "reject");
            Assert.That(_provider.CanUnresolveConflict(thread.Id), Is.True);
        }

        [Test]
        public void CanUnresolveConflict_UnresolvedConflict_False()
        {
            CommentThread thread = SeedVerseTextConflict();
            Assert.That(_provider.CanUnresolveConflict(thread.Id), Is.False);
        }

        [Test]
        public void CanUnresolveConflict_NormalThread_False()
        {
            var mgr = CommentManager.Get(_scrText);
            Comment normal = CommentTestHelper.CreateBasicComment();
            mgr.AddComment(normal);
            mgr.SaveUser(normal.User, false);
            Assert.That(_provider.CanUnresolveConflict(normal.Thread), Is.False);
        }

        [Test]
        public void ResolveConflict_RejectWholeVerseDeletion_AppliesPt9DeletionWritePath()
        {
            // Characterization: when the losing side deleted the WHOLE verse
            // (marker included), reject writes the loser's text = "" via PT9's ReplaceAcceptedText,
            // which we call unmodified. This pins PT9's actual output so a future change to our
            // delegation is caught. It is faithful PT9 behavior: a guard that instead left an empty
            // "\v 1 " would DIVERGE from Paratext, which we do not want. Here the reject removes \v 1
            // entirely (marker + text) and leaves \v 2 untouched.
            _scrText.PutText(40, 0, false, MatTwoDeletionWinnerUsfm, null);
            var mgr = CommentManager.Get(_scrText);
            Comment conflict = CommentTestHelper.CreateVerseTextConflictCommentDeletion();
            mgr.AddComment(conflict);
            mgr.SaveUser(conflict.User, false);
            CommentThread thread = mgr.FindThread(conflict.Thread);
            var chapterRef = new VerseRef("MAT", "2", "0", _scrText.Settings.Versification);

            _provider.ResolveConflict(thread.Id, "reject");

            Assert.That(ReloadThread(thread.Id).Status, Is.EqualTo(NoteStatus.Resolved));
            string after = _scrText.GetText(chapterRef, true, true);
            // Verse 1 is gone entirely - both its text and its \v 1 marker were spliced out...
            Assert.That(after, Does.Not.Contain("When Jesus was born"));
            Assert.That(after, Does.Not.Contain("\\v 1"));
            // ...while verse 2 (after the splice boundary) is untouched.
            Assert.That(after, Does.Contain("\\v 2"));
            Assert.That(after, Does.Contain("wise men from the east"));
        }

        [Test]
        public void ResolveConflict_ConcurrentRejects_ApplyExactlyOnce()
        {
            // Several resolveConflict calls racing on the same thread must not both write the verse.
            // The per-project lock makes the already-resolved guard atomic with the write, so exactly
            // one call resolves and the rest observe the resolved thread and are rejected. Without the
            // lock the bodies interleave and can both splice the loser text, corrupting a settled note.
            CommentThread thread = SeedVerseTextConflict();
            var vref = new VerseRef("MAT", "2", "1", _scrText.Settings.Versification);

            const int racers = 8;
            var outcomes = new Exception?[racers];
            var tasks = new Task[racers];
            for (int i = 0; i < racers; i++)
            {
                int idx = i;
                tasks[i] = Task.Run(() =>
                {
                    try
                    {
                        _provider.ResolveConflict(thread.Id, "reject");
                        outcomes[idx] = null; // this racer won
                    }
                    catch (Exception ex)
                    {
                        outcomes[idx] = ex;
                    }
                });
            }
            Task.WaitAll(tasks);

            // Exactly one racer resolved; every other was rejected by the already-resolved guard.
            Assert.That(
                outcomes.Count(e => e == null),
                Is.EqualTo(1),
                "exactly one concurrent resolve must succeed"
            );
            var errors = outcomes.Where(e => e != null).Cast<Exception>().ToList();
            Assert.That(errors, Is.All.InstanceOf<InvalidOperationException>());
            Assert.That(
                errors.All(e => e.Message.Contains("already resolved")),
                Is.True,
                "every losing racer must hit the already-resolved guard, not a partial/garbled write"
            );
            // The loser text was applied exactly once - not doubled or garbled by overlapping writes.
            Assert.That(ReloadThread(thread.Id).Status, Is.EqualTo(NoteStatus.Resolved));
            string after = _scrText.GetText(vref, true, true);
            Assert.That(after, Does.Contain("small village"));
            Assert.That(after, Does.Not.Contain("big village"));
        }

        [Test]
        public void AddCommentToThread_ConcurrentReplies_AllPersistNoneLost()
        {
            // The comment-mutation lock must serialize concurrent AddCommentToThread calls so no
            // reply is lost. Without it, concurrent read-modify-write of the shared CommentManager's
            // comment list can drop replies or corrupt it. Fire N replies at one thread and assert all
            // N land. (Resolve-vs-resolve is covered by ConcurrentRejects; this covers a non-resolve
            // mutator - the gap the previously one-sided lock left open.)
            CommentThread thread = SeedVerseTextConflict();
            int Count() => CommentManager.Get(_scrText).FindThread(thread.Id).Comments.Count;
            int baseCount = Count();

            const int repliers = 8;
            var tasks = new Task[repliers];
            for (int i = 0; i < repliers; i++)
            {
                tasks[i] = Task.Run(() =>
                {
                    var reply = new Comment(_scrText.User)
                    {
                        Thread = thread.Id,
                        Status = NoteStatus.Todo,
                    };
                    _provider.AddCommentToThread(new PlatformCommentWrapper(reply));
                });
            }
            Task.WaitAll(tasks);

            Assert.That(
                Count(),
                Is.EqualTo(baseCount + repliers),
                "every concurrent reply must persist - none dropped by an unsynchronized list mutation"
            );
        }

        [Test]
        public void ResolveConflict_NonConflictThread_Throws()
        {
            var mgr = CommentManager.Get(_scrText);
            Comment normal = CommentTestHelper.CreateBasicComment(); // a normal note, not a conflict
            mgr.AddComment(normal);
            Assert.That(
                () => _provider.ResolveConflict(normal.Thread, "accept"),
                Throws.TypeOf<InvalidOperationException>()
            );
        }

        [Test]
        public void ResolveConflict_InvalidResolution_Throws()
        {
            CommentThread thread = SeedVerseTextConflict();
            Assert.That(
                () => _provider.ResolveConflict(thread.Id, "bogus"),
                Throws.TypeOf<InvalidDataException>()
            );
        }

        [Test]
        public void ResolveConflict_ConflictNote_NeedsNoCreatorResolve()
        {
            // Headless safety: SaveEdits(owner: null) only touches the IComponent inside Alert.Show,
            // which is gated by ThreadNeedsCreatorResolve. Pin that conflict threads never require it.
            CommentThread thread = SeedVerseTextConflict();
            Assert.That(thread.ThreadNeedsCreatorResolve, Is.False);
        }

        // --- data-update events --------------------------------------------------------------------
        // ResolveConflict fires via SendDataUpdateEvent, which dispatches through fire-and-forget
        // ThreadingUtils.RunTask. In this harness DummyPapiClient.SendEventAsync enqueues synchronously
        // and returns a completed task, so the events are already queued when ResolveConflict returns;
        // we still drain-then-poll (never bare-sleep) so the assertions hold even if that ever changes.
        private static readonly TimeSpan EventWaitTimeout = TimeSpan.FromSeconds(5);

        // How long to watch for an unwanted event before concluding none will arrive.
        private static readonly TimeSpan EventSettleWindow = TimeSpan.FromMilliseconds(500);

        // Discard any events queued by setup/seeding so post-action assertions see only new events.
        private void DrainEvents()
        {
            while (Client.SentEventCount > 0)
                _ = Client.NextSentEvent;
        }

        // A data-update event carries its changed data types as a List<string> payload (see
        // DataProvider.SendDataUpdateEventAsync). Classify by which data types it names.
        private static bool IsCommentUpdate((string eventType, object? eventParameters) ev) =>
            ev.eventParameters is List<string> types && types.Contains(ProjectDataType.COMMENTS);

        private static bool IsScriptureUpdate((string eventType, object? eventParameters) ev) =>
            ev.eventParameters is List<string> types
            && types.Contains(ProjectDataType.CHAPTER_USFM);

        [Test]
        public void ResolveConflict_Accept_FiresCommentUpdateNotScriptureUpdate()
        {
            CommentThread thread = SeedVerseTextConflict();
            DrainEvents();

            _provider.ResolveConflict(thread.Id, "accept");

            // accept refreshes comment subscribers (the note list) ...
            Assert.That(
                SpinWait.SpinUntil(() => Client.SentEventCount >= 1, EventWaitTimeout),
                Is.True,
                "accept must fire a comment data-update event"
            );
            var ev = Client.NextSentEvent;
            Assert.That(
                IsCommentUpdate(ev),
                Is.True,
                "the fired event must carry the comment data types"
            );
            Assert.That(
                IsScriptureUpdate(ev),
                Is.False,
                "the comment event must not carry Scripture data types"
            );
            // ... and, since accept writes no verse text, it must NOT fire a Scripture data-update.
            Assert.That(
                SpinWait.SpinUntil(() => Client.SentEventCount > 0, EventSettleWindow),
                Is.False,
                "accept must not fire a Scripture (or any further) data-update event"
            );
        }

        [Test]
        public void ResolveConflict_Reject_FiresBothCommentAndScriptureUpdates()
        {
            CommentThread thread = SeedVerseTextConflict();
            DrainEvents();

            _provider.ResolveConflict(thread.Id, "reject");

            // reject refreshes comment subscribers AND Scripture-text subscribers (the verse changed).
            Assert.That(
                SpinWait.SpinUntil(() => Client.SentEventCount >= 2, EventWaitTimeout),
                Is.True,
                "reject must fire both a comment and a Scripture data-update event"
            );
            var events = new List<(string eventType, object? eventParameters)>();
            while (Client.SentEventCount > 0)
                events.Add(Client.NextSentEvent);
            Assert.That(
                events.Any(IsCommentUpdate),
                Is.True,
                "reject must fire a comment data-update"
            );
            Assert.That(
                events.Any(IsScriptureUpdate),
                Is.True,
                "reject must fire a Scripture data-update"
            );
        }

        // --- admin-or-assignee permission gate ---------------------------------------------------
        // The tests above all run on the default admin project (_scrText), so they only cover the
        // admin branch of ResolveConflict's gate. The two tests below cover the non-admin branches:
        // denied (non-admin, unassigned) and assignee-succeeds (non-admin, assigned).

        // A project whose current user is a non-admin *team member* (not an Observer). The gate reads
        // scrText.Permissions.AmAdministrator (see ParatextProjectDataProvider.IsUserProjectAdministrator),
        // NOT scrText.AmAdministrator, so we swap in a PermissionManager rather than overriding
        // AmAdministrator on the ScrText itself (adaptation from the brief's sketch). This follows
        // ManageBooks' NonAdminSharedScrText pattern, but that pattern's empty
        // InternalProjectUserAccessData makes HaveRoleNotObserver false - which would make the base
        // VerifyUserCanResolveThread / CommentEditHelper.AllowEditLast checks throw for BOTH tests and
        // hide the gate. Overriding both properties expresses "non-admin, non-observer team member"
        // directly, leaving only the admin-or-assignee gate to decide the outcome. DummyScrText has no
        // (string name) constructor, so this uses the parameterless base.
        private sealed class NonAdminDummyScrText : DummyScrText
        {
            private readonly PermissionManager _permissions = new NonAdminPermissionManager();

            public override PermissionManager Permissions => _permissions;

            private sealed class NonAdminPermissionManager : PermissionManager
            {
                public override bool AmAdministrator => false;

                public override bool HaveRoleNotObserver => true;

                // This non-admin team member has edit rights on the conflict's chapter, so the
                // resolve-conflict chapter-edit gate passes and the outcome turns purely on the
                // admin-or-assignee decision.
                public override bool CanEdit(
                    int bookNum,
                    int chapterNum = 0,
                    string userName = null,
                    PermissionSet permissionSet = PermissionSet.Merged
                ) => true;
            }
        }

        // Like NonAdminDummyScrText, but this team member also lacks Spellings edit permission. On a
        // spelling note CanCurrentUserResolve delegates to CanEdit(Spellings), so this makes
        // VerifyUserCanResolveThread throw while VerifyUserCanAddCommentToThread (non-observer only)
        // still passes - isolating the resolve/re-open gate under test.
        private sealed class NoResolvePermissionDummyScrText : DummyScrText
        {
            private readonly PermissionManager _permissions = new NoResolvePermissionManager();

            public override PermissionManager Permissions => _permissions;

            private sealed class NoResolvePermissionManager : PermissionManager
            {
                public override bool AmAdministrator => false;

                public override bool HaveRoleNotObserver => true;

                public override bool CanEdit(
                    PtxUtils.Enum<Paratext.Data.Users.PermissionType> permission,
                    string userName = null
                ) => false;
            }
        }

        // Like NonAdminDummyScrText (non-admin, non-observer team member) but WITHOUT edit rights on
        // any chapter. Isolates the resolve-conflict chapter-edit gate: VerifyUserCanResolveThread and
        // the admin-or-assignee check both pass, but CanEdit(book, chapter) is false.
        private sealed class NoChapterEditDummyScrText : DummyScrText
        {
            private readonly PermissionManager _permissions = new NoChapterEditPermissionManager();

            public override PermissionManager Permissions => _permissions;

            private sealed class NoChapterEditPermissionManager : PermissionManager
            {
                public override bool AmAdministrator => false;

                public override bool HaveRoleNotObserver => true;

                public override bool CanEdit(
                    int bookNum,
                    int chapterNum = 0,
                    string userName = null,
                    PermissionSet permissionSet = PermissionSet.Merged
                ) => false;
            }
        }

        // Mirrors SeedVerseTextConflict() but seeds the conflict on a caller-supplied project (the
        // non-admin fixture), optionally pre-assigning the conflict note to a user. Returns the
        // freshly built thread.
        private static CommentThread SeedVerseTextConflict(ScrText scrText, string? assignedUser)
        {
            scrText.PutText(40, 0, false, MatTwoWinnerUsfm, null);
            var mgr = CommentManager.Get(scrText);
            Comment conflict = CommentTestHelper.CreateVerseTextConflictComment();
            if (assignedUser != null)
                conflict.AssignedUser = assignedUser;
            mgr.AddComment(conflict);
            mgr.SaveUser(conflict.User, false);
            return mgr.FindThread(conflict.Thread);
        }

        // Seeds a verseText conflict WITHOUT writing the verse (no PutText), so it works on a fixture
        // whose user lacks chapter-edit permission (PutText would throw). The verse content is
        // irrelevant to the permission-gate tests: the chapter-edit gate throws before any verse read.
        private static CommentThread SeedConflictWithoutVerseWrite(
            ScrText scrText,
            string assignedUser
        )
        {
            var mgr = CommentManager.Get(scrText);
            Comment conflict = CommentTestHelper.CreateVerseTextConflictComment();
            conflict.AssignedUser = assignedUser;
            mgr.AddComment(conflict);
            mgr.SaveUser(conflict.User, false);
            return mgr.FindThread(conflict.Thread);
        }

        [Test]
        public void ResolveConflict_NonAdminNonAssignee_Throws()
        {
            // Non-admin, non-observer team member with an UNASSIGNED verseText conflict -> denied.
            using var nonAdmin = new NonAdminDummyScrText();
            var details = CreateProjectDetails(nonAdmin);
            ParatextProjects.FakeAddProject(details, nonAdmin);
            var provider = new DummyParatextProjectDataProvider(
                PdpName + "-nonadmin",
                Client,
                details,
                ParatextProjects
            );

            CommentThread thread = SeedVerseTextConflict(nonAdmin, null);

            // The throw comes from the admin-or-assignee gate, not the base VerifyUserCanResolveThread
            // (which passes here: HaveRoleNotObserver == true). The gate-specific message proves it -
            // were the gate deleted, this non-admin resolve would succeed and Throws.TypeOf would fail.
            Assert.That(
                () => provider.ResolveConflict(thread.Id, "accept"),
                Throws
                    .TypeOf<InvalidOperationException>()
                    .With.Message.Contains("administrator or the assigned user")
            );
            // And the denied attempt left the thread unresolved (no partial side effect).
            Assert.That(
                CommentManager.Get(nonAdmin).FindThread(thread.Id).Status,
                Is.Not.EqualTo(NoteStatus.Resolved)
            );
        }

        [Test]
        public void AddCommentToThread_ReplyReopeningResolvedThread_RequiresResolvePermission()
        {
            // Adding a plain comment to a resolved thread implicitly re-opens it, so it must
            // clear the SAME gate as an explicit status change - otherwise a user who can comment but
            // not resolve could re-open by replying. Lever: a spelling note, whose CanCurrentUserResolve
            // falls back to CanEdit(Spellings) - false for this non-admin, non-observer team member -
            // while VerifyUserCanAddCommentToThread only requires non-observer (passes).
            using var nonAdmin = new NoResolvePermissionDummyScrText();
            var details = CreateProjectDetails(nonAdmin);
            ParatextProjects.FakeAddProject(details, nonAdmin);
            var provider = new DummyParatextProjectDataProvider(
                PdpName + "-reopen-gate",
                Client,
                details,
                ParatextProjects
            );

            // Seed a RESOLVED spelling-note thread directly, bypassing the provider's gates.
            var mgr = CommentManager.Get(nonAdmin);
            var first = new Comment(nonAdmin.User)
            {
                Thread = "reopen-gate-thread",
                VerseRefStr = "GEN 1:1",
                TagsAddedIds = new[] { CommentTag.spellingTagId },
            };
            first.SetContentsFromHtml("spelling note");
            mgr.AddComment(first);
            var resolving = new Comment(nonAdmin.User)
            {
                Thread = first.Thread,
                Status = NoteStatus.Resolved,
            };
            resolving.SetContentsFromHtml("resolved");
            mgr.AddComment(resolving);
            mgr.SaveUser(nonAdmin.User.Name, false);
            Assert.That(
                mgr.FindThread(first.Thread).Status,
                Is.EqualTo(NoteStatus.Resolved),
                "precondition: thread is resolved"
            );

            // A plain reply (no status) would implicitly re-open the thread -> must be gated.
            var reply = new Comment(nonAdmin.User) { Thread = first.Thread };
            reply.SetContentsFromHtml("please reopen");
            Assert.That(
                () => provider.AddCommentToThread(new PlatformCommentWrapper(reply)),
                Throws
                    .TypeOf<InvalidOperationException>()
                    .With.Message.Contains("resolve or re-open")
            );

            // The blocked reply must not have re-opened (or been added to) the thread.
            Assert.That(
                mgr.FindThread(first.Thread).Status,
                Is.EqualTo(NoteStatus.Resolved),
                "denied reply must leave the thread resolved"
            );
        }

        [Test]
        public void ResolveConflict_NonAdminAssignedUser_RejectWritesLoserAndResolves()
        {
            // Non-admin assignee WITH edit rights on the chapter -> allowed by the admin-or-assignee
            // gate and the chapter-edit gate. Uses "reject" (the primary resolution flow) so this
            // exercises SaveEdits' verse write (loser-USFM splice) under the non-admin PermissionManager
            // fixture, not just the no-write accept path.
            using var nonAdmin = new NonAdminDummyScrText();
            var details = CreateProjectDetails(nonAdmin);
            ParatextProjects.FakeAddProject(details, nonAdmin);
            var provider = new DummyParatextProjectDataProvider(
                PdpName + "-assignee",
                Client,
                details,
                ParatextProjects
            );

            // Assign the conflict to the current (non-admin) user before adding it.
            CommentThread thread = SeedVerseTextConflict(nonAdmin, nonAdmin.User.Name);
            var vref = new VerseRef("MAT", "2", "1", nonAdmin.Settings.Versification);

            Assert.That(() => provider.ResolveConflict(thread.Id, "reject"), Throws.Nothing);
            Assert.That(
                CommentManager.Get(nonAdmin).FindThread(thread.Id).Status,
                Is.EqualTo(NoteStatus.Resolved)
            );
            // The losing side's text was written into the verse under the non-admin user.
            string after = nonAdmin.GetText(vref, true, true);
            Assert.That(after, Does.Contain("small village"));
            Assert.That(after, Does.Not.Contain("big village"));
        }

        [Test]
        public void ResolveConflict_NonAdminTeamAssigned_Allowed()
        {
            // A conflict assigned to the whole team (CommentThread.teamUser, "Team") is an
            // assign-to-everyone sentinel, not a specific user, so any non-admin team member may
            // resolve it. A raw name compare in the admin-or-assignee gate would treat "Team" as one
            // (non-matching) user and wrongly deny every team member.
            using var nonAdmin = new NonAdminDummyScrText();
            var details = CreateProjectDetails(nonAdmin);
            ParatextProjects.FakeAddProject(details, nonAdmin);
            var provider = new DummyParatextProjectDataProvider(
                PdpName + "-team",
                Client,
                details,
                ParatextProjects
            );

            // Assign the conflict to the team, not to this specific user. "accept" isolates the gate:
            // it writes nothing, so the test turns only on the permission decision.
            CommentThread thread = SeedVerseTextConflict(nonAdmin, CommentThread.teamUser);

            Assert.That(() => provider.ResolveConflict(thread.Id, "accept"), Throws.Nothing);
            Assert.That(
                CommentManager.Get(nonAdmin).FindThread(thread.Id).Status,
                Is.EqualTo(NoteStatus.Resolved)
            );
        }

        [Test]
        public void ResolveConflict_NonAdminAssignedButNoChapterEdit_Denied()
        {
            // A non-admin assignee WITHOUT edit rights on the conflict's chapter must be denied:
            // resolving would write a chapter they cannot edit. "accept" isolates the gate (it writes
            // nothing), so the test turns purely on the permission decision.
            using var nonAdmin = new NoChapterEditDummyScrText();
            var details = CreateProjectDetails(nonAdmin);
            ParatextProjects.FakeAddProject(details, nonAdmin);
            var provider = new DummyParatextProjectDataProvider(
                PdpName + "-no-chapter-edit",
                Client,
                details,
                ParatextProjects
            );

            CommentThread thread = SeedConflictWithoutVerseWrite(nonAdmin, nonAdmin.User.Name);

            Assert.That(
                () => provider.ResolveConflict(thread.Id, "accept"),
                Throws
                    .TypeOf<InvalidOperationException>()
                    .With.Message.Contains("permission to edit")
            );
            // The conflict was not resolved.
            Assert.That(
                CommentManager.Get(nonAdmin).FindThread(thread.Id).Status,
                Is.Not.EqualTo(NoteStatus.Resolved)
            );
        }

        [Test]
        public void GetConflictResolutionOptions_NonAdminNoChapterEdit_None()
        {
            // The capability query mirrors the enforcement gate: no chapter-edit rights -> no options.
            using var nonAdmin = new NoChapterEditDummyScrText();
            var details = CreateProjectDetails(nonAdmin);
            ParatextProjects.FakeAddProject(details, nonAdmin);
            var provider = new DummyParatextProjectDataProvider(
                PdpName + "-no-chapter-edit-options",
                Client,
                details,
                ParatextProjects
            );

            CommentThread thread = SeedConflictWithoutVerseWrite(nonAdmin, nonAdmin.User.Name);

            Assert.That(provider.GetConflictResolutionOptions(thread.Id), Is.EqualTo("none"));
        }

        [Test]
        public void ResolveConflict_NonAdminMostRecentAssignmentToOther_Denied()
        {
            // The gate keys off the MOST RECENT assignment (IsThreadAssignedToUser scans
            // comments last-to-first for the first non-null AssignedUser). Seed a conflict whose FIRST
            // comment is assigned to the current (non-admin) user but whose LATER comment reassigns it
            // to someone else. If the gate honored the earlier match it would wrongly allow; the
            // most-recent reassignment must win -> denied.
            using var nonAdmin = new NonAdminDummyScrText();
            var details = CreateProjectDetails(nonAdmin);
            ParatextProjects.FakeAddProject(details, nonAdmin);
            var provider = new DummyParatextProjectDataProvider(
                PdpName + "-reassigned",
                Client,
                details,
                ParatextProjects
            );

            nonAdmin.PutText(40, 0, false, MatTwoWinnerUsfm, null);
            var mgr = CommentManager.Get(nonAdmin);
            Comment conflict = CommentTestHelper.CreateVerseTextConflictComment();
            conflict.AssignedUser = nonAdmin.User.Name; // earliest assignment: the current user
            mgr.AddComment(conflict);
            // A later comment reassigns the thread to a DIFFERENT user. Comments in a thread sort by
            // date (Comment.CompareTo), so the later date makes this the most-recent assignment.
            Comment reassign = new Comment(nonAdmin.User)
            {
                Thread = conflict.Thread,
                VerseRefStr = conflict.VerseRefStr,
                Date = "2011-08-16T15:50:00.0000000-04:00", // after the conflict comment's date
                AssignedUser = "SomeOtherUser",
            };
            mgr.AddComment(reassign);
            mgr.SaveUser(conflict.User, false);
            CommentThread thread = mgr.FindThread(conflict.Thread);
            // Precondition: the reassignment sorts last, so it is the most-recent assignment.
            Assert.That(thread.Comments[^1].AssignedUser, Is.EqualTo("SomeOtherUser"));

            // Denied by the admin-or-assignee gate (gate-specific message), not the base check.
            Assert.That(
                () => provider.ResolveConflict(thread.Id, "accept"),
                Throws
                    .TypeOf<InvalidOperationException>()
                    .With.Message.Contains("administrator or the assigned user")
            );
            Assert.That(
                CommentManager.Get(nonAdmin).FindThread(thread.Id).Status,
                Is.Not.EqualTo(NoteStatus.Resolved)
            );
        }

        // --- getConflictResolutionOptions capability + reject-only staleness guard ----------------

        [Test]
        public void GetConflictResolutionOptions_AdminFreshConflict_AcceptOrReject()
        {
            CommentThread thread = SeedVerseTextConflict();
            Assert.That(
                _provider.GetConflictResolutionOptions(thread.Id),
                Is.EqualTo("acceptOrReject")
            );
        }

        [Test]
        public void GetConflictResolutionOptions_ResolvedConflict_None()
        {
            CommentThread thread = SeedVerseTextConflict();
            _provider.ResolveConflict(thread.Id, "accept");
            Assert.That(_provider.GetConflictResolutionOptions(thread.Id), Is.EqualTo("none"));
        }

        [Test]
        public void GetConflictResolutionOptions_NormalThread_None()
        {
            var mgr = CommentManager.Get(_scrText);
            Comment normal = CommentTestHelper.CreateBasicComment();
            mgr.AddComment(normal);
            mgr.SaveUser(normal.User, false);
            Assert.That(_provider.GetConflictResolutionOptions(normal.Thread), Is.EqualTo("none"));
        }

        [Test]
        public void GetConflictResolutionOptions_NonAdminAssignee_AcceptOrReject()
        {
            using var nonAdmin = new NonAdminDummyScrText();
            var details = CreateProjectDetails(nonAdmin);
            ParatextProjects.FakeAddProject(details, nonAdmin);
            var provider = new DummyParatextProjectDataProvider(
                PdpName + "-options-assignee",
                Client,
                details,
                ParatextProjects
            );
            CommentThread thread = SeedVerseTextConflict(nonAdmin, nonAdmin.User.Name);
            Assert.That(
                provider.GetConflictResolutionOptions(thread.Id),
                Is.EqualTo("acceptOrReject")
            );
        }

        [Test]
        public void GetConflictResolutionOptions_NonAdminNonAssignee_None()
        {
            using var nonAdmin = new NonAdminDummyScrText();
            var details = CreateProjectDetails(nonAdmin);
            ParatextProjects.FakeAddProject(details, nonAdmin);
            var provider = new DummyParatextProjectDataProvider(
                PdpName + "-options-denied",
                Client,
                details,
                ParatextProjects
            );
            CommentThread thread = SeedVerseTextConflict(nonAdmin, null);
            Assert.That(provider.GetConflictResolutionOptions(thread.Id), Is.EqualTo("none"));
        }

        [Test]
        public void GetConflictResolutionOptions_StaleVerse_AcceptOnly()
        {
            CommentThread thread = SeedVerseTextConflict();
            _scrText.PutText(40, 0, false, MatTwoEditedUsfm, null); // edit the verse post-merge
            Assert.That(_provider.GetConflictResolutionOptions(thread.Id), Is.EqualTo("accept"));
        }

        [Test]
        public void GetConflictResolutionOptions_WhitespaceOnlyEdit_StillAcceptOrReject()
        {
            // Pins the documented, deliberate PT9 divergence: IsConflictVerseStale RegularizeSpaces()
            // .Trim()'s BOTH the current and recorded verse USFM, so re-saving the winner with only
            // interior whitespace differences is NOT counted as a stale edit (reject stays available).
            CommentThread thread = SeedVerseTextConflict();
            _scrText.PutText(40, 0, false, MatTwoWinnerWhitespaceUsfm, null); // same winner, extra spaces
            Assert.That(
                _provider.GetConflictResolutionOptions(thread.Id),
                Is.EqualTo("acceptOrReject")
            );
        }

        [Test]
        public void GetConflictResolutionOptions_UnreadableVerse_AcceptOnly()
        {
            // Pins the invalid/unreadable-verse branch of IsConflictVerseStale: when MAT 2:1 can no
            // longer be read (its verse marker is gone), the current verse USFM can't match the
            // recorded merge winner, so reject is withdrawn and only accept remains.
            CommentThread thread = SeedVerseTextConflict();
            _scrText.PutText(40, 0, false, MatTwoMissingVerseUsfm, null); // chapter 2 without verse 1
            Assert.That(_provider.GetConflictResolutionOptions(thread.Id), Is.EqualTo("accept"));
        }

        [Test]
        public void GetConflictResolutionOptions_SurvivesCommentManagerReload()
        {
            // Regression: CommentManager.Load() (triggered in production by a WriteLockManager
            // notification, e.g. when the verse is edited) rebuilds the comment list purely from the
            // persisted Notes_*.xml files it finds via FileManager.ProjectFiles. The dummy file manager
            // used to report no project files, so a reload dropped every seeded comment and the provider
            // intermittently failed with "Thread ... does not exist" (masked to "none" here). Force a
            // reload and confirm the seeded conflict thread survives and stays resolvable.
            CommentThread thread = SeedVerseTextConflict();
            CommentManager.Get(_scrText).Load();
            Assert.That(
                _provider.GetConflictResolutionOptions(thread.Id),
                Is.EqualTo("acceptOrReject"),
                "a seeded conflict thread must survive a CommentManager reload"
            );
        }

        [Test]
        public void ResolveConflict_RejectStaleVerse_ThrowsAndKeepsEditedText()
        {
            CommentThread thread = SeedVerseTextConflict();
            _scrText.PutText(40, 0, false, MatTwoEditedUsfm, null);
            var vref = new VerseRef("MAT", "2", "1", _scrText.Settings.Versification);

            Assert.That(
                () => _provider.ResolveConflict(thread.Id, "reject"),
                Throws.TypeOf<InvalidOperationException>().With.Message.Contain("has changed")
            );
            Assert.That(
                ReloadThread(thread.Id).Status,
                Is.Not.EqualTo(NoteStatus.Resolved),
                "a refused stale reject must leave the thread unresolved"
            );
            Assert.That(_scrText.GetText(vref, true, true), Does.Contain("enormous village"));
        }

        [Test]
        public void ResolveConflict_AcceptStaleVerse_SucceedsAndKeepsEditedText()
        {
            CommentThread thread = SeedVerseTextConflict();
            _scrText.PutText(40, 0, false, MatTwoEditedUsfm, null);
            var vref = new VerseRef("MAT", "2", "1", _scrText.Settings.Versification);

            _provider.ResolveConflict(thread.Id, "accept");

            Assert.That(ReloadThread(thread.Id).Status, Is.EqualTo(NoteStatus.Resolved));
            Assert.That(_scrText.GetText(vref, true, true), Does.Contain("enormous village"));
        }

        // --- generic resolved-status is blocked on conflict threads (must go through ResolveConflict) ---
        // PlatformCommentWrapper has no default constructor and its Thread/Status are get-only (backed by
        // the wrapped Comment), so these mirror the other AddCommentToThread tests: build a Comment with
        // the desired Thread/Status, then wrap it.

        [Test]
        public void AddCommentToThread_ResolveConflictThreadViaStatus_Throws()
        {
            CommentThread thread = SeedVerseTextConflict();
            var comment = new Comment(_scrText.User)
            {
                Thread = thread.Id,
                Status = NoteStatus.Resolved,
            };
            Assert.That(
                () => _provider.AddCommentToThread(new PlatformCommentWrapper(comment)),
                Throws.TypeOf<InvalidOperationException>().With.Message.Contain("resolveConflict")
            );
            Assert.That(ReloadThread(thread.Id).Status, Is.Not.EqualTo(NoteStatus.Resolved));
        }

        [Test]
        public void AddCommentToThread_ResolveNonVerseTextConflictViaStatus_StillWorks()
        {
            // Regression: the resolve-via-status guard must fire ONLY for verseText
            // conflicts (which must be resolved through ResolveConflict). Other conflict types
            // (invalidVerses, readError, verseBridge, ...) have no ResolveConflict path, so blocking
            // them here left them permanently unresolvable through any API - they must stay resolvable
            // by setting status directly, as they were before this guard existed.
            var mgr = CommentManager.Get(_scrText);
            Comment conflict = CommentTestHelper.CreateConflictComment();
            conflict.ConflictType = NoteConflictType.InvalidVerses;
            mgr.AddComment(conflict);
            mgr.SaveUser(conflict.User, false);
            var resolve = new Comment(_scrText.User)
            {
                Thread = conflict.Thread,
                Status = NoteStatus.Resolved,
            };
            Assert.That(
                () => _provider.AddCommentToThread(new PlatformCommentWrapper(resolve)),
                Throws.Nothing
            );
            Assert.That(ReloadThread(conflict.Thread).Status, Is.EqualTo(NoteStatus.Resolved));
        }

        [Test]
        public void AddCommentToThread_ReopenResolvedConflictViaTodo_Allowed()
        {
            CommentThread thread = SeedVerseTextConflict();
            _provider.ResolveConflict(thread.Id, "accept");
            var reopen = new Comment(_scrText.User)
            {
                Thread = thread.Id,
                Status = NoteStatus.Todo,
            };

            Assert.That(
                () => _provider.AddCommentToThread(new PlatformCommentWrapper(reopen)),
                Throws.Nothing
            );
            Assert.That(ReloadThread(thread.Id).Status, Is.Not.EqualTo(NoteStatus.Resolved));
            // After reopening, the conflict is resolvable again (verse untouched by accept -> fresh).
            Assert.That(
                _provider.GetConflictResolutionOptions(thread.Id),
                Is.EqualTo("acceptOrReject")
            );
        }

        [Test]
        public void AddCommentToThread_ResolveNormalThreadViaStatus_StillWorks()
        {
            var mgr = CommentManager.Get(_scrText);
            Comment normal = CommentTestHelper.CreateBasicComment();
            mgr.AddComment(normal);
            mgr.SaveUser(normal.User, false);
            var resolve = new Comment(_scrText.User)
            {
                Thread = normal.Thread,
                Status = NoteStatus.Resolved,
            };
            Assert.That(
                () => _provider.AddCommentToThread(new PlatformCommentWrapper(resolve)),
                Throws.Nothing
            );
        }

        // Mirrors SeedVerseTextConflict() but seeds the INDEPENDENT-changes conflict (two
        // non-overlapping word edits) so CommentEditHelper.GetMergedUsfm returns non-null. Puts the
        // winner (accepted-side) text into the project first, exactly as the existing seed does.
        private static CommentThread SeedIndependentVerseTextConflict(ScrText scrText)
        {
            scrText.PutText(40, 0, false, MatTwoIndependentWinnerUsfm, null);
            var mgr = CommentManager.Get(scrText);
            Comment conflict = CommentTestHelper.CreateIndependentVerseTextConflictComment();
            mgr.AddComment(conflict);
            mgr.SaveUser(conflict.User, false);
            return mgr.FindThread(conflict.Thread);
        }

        [Test]
        public void IndependentConflictFixture_IsMergeable()
        {
            CommentThread thread = SeedIndependentVerseTextConflict(_scrText);
            Assert.That(CommentEditHelper.GetMergedUsfm(thread), Is.Not.Null.And.Not.Empty);
        }

        [Test]
        public void GetConflictResolutionOptions_IndependentChanges_ReturnsAcceptRejectOrMerge()
        {
            CommentThread thread = SeedIndependentVerseTextConflict(_scrText);
            Assert.That(
                _provider.GetConflictResolutionOptions(thread.Id),
                Is.EqualTo("acceptRejectOrMerge")
            );
        }

        [Test]
        public void GetConflictResolutionOptions_OverlappingChanges_ReturnsAcceptOrReject()
        {
            CommentThread thread = SeedVerseTextConflict();
            Assert.That(
                _provider.GetConflictResolutionOptions(thread.Id),
                Is.EqualTo("acceptOrReject")
            );
        }

        [Test]
        public void ResolveConflict_Merge_WritesMergedVerseAndResolves()
        {
            CommentThread thread = SeedIndependentVerseTextConflict(_scrText);
            var vref = new VerseRef("MAT", "2", "1", _scrText.Settings.Versification);

            _provider.ResolveConflict(thread.Id, "merge");

            Assert.That(ReloadThread(thread.Id).Status, Is.EqualTo(NoteStatus.Resolved));
            string after = _scrText.GetText(vref, true, true);
            Assert.That(after, Does.Contain("small village")); // rejected-side word
            Assert.That(after, Does.Contain("great king")); // accepted-side word
        }

        [Test]
        public void ResolveConflict_MergeWhenStale_Throws()
        {
            CommentThread thread = SeedIndependentVerseTextConflict(_scrText);
            _scrText.PutText(
                40,
                0,
                false,
                "\\id MAT\n\\c 2\n\\v 1 Edited after the merge.\n",
                null
            ); // make stale

            Assert.That(
                () => _provider.ResolveConflict(thread.Id, "merge"),
                Throws
                    .TypeOf<InvalidOperationException>()
                    .With.Message.Contains("changed since the conflict")
            );
        }

        [Test]
        public void ResolveConflict_MergeOnOverlappingConflict_ThrowsAndLeavesVerseIntact()
        {
            // Overlapping edits: GetMergedUsfm returns null, so merge is NOT offered
            // (GetConflictResolutionOptions -> "acceptOrReject"). ResolveConflict must refuse "merge"
            // rather than let PT9's MergeAcceptedText splice the null and erase the verse.
            string expectedWinner = ExpectedWinnerVerseText();
            CommentThread thread = SeedVerseTextConflict();

            Assert.That(
                () => _provider.ResolveConflict(thread.Id, "merge"),
                Throws.TypeOf<InvalidOperationException>().With.Message.Contains("overlapping")
            );
            // merge is refused before any verse write, so the chapter text is byte-for-byte the seeded
            // winner - the verse is not erased. GetText is read only here, after the resolve attempt,
            // to avoid the mid-sequence CommentManager desync the sibling tests document.
            var vref = new VerseRef("MAT", "2", "1", _scrText.Settings.Versification);
            string after = _scrText.GetText(vref, true, true);
            Assert.That(after, Is.EqualTo(expectedWinner));
            Assert.That(after, Does.Contain("big village"));
        }


        [Test]
        public void ResolveConflict_Reject_StampsReplacedResolutionActionOnResolutionComment()
        {
            // Reject writes the losing side, so SaveEdits stamps ConflictResolutionAction='replaced'
            // on the appended resolution comment. The wrapper surfaces it (ungated), which is what the
            // card's Result region and the resolution reply's outcome line read.
            CommentThread thread = SeedVerseTextConflict();

            _provider.ResolveConflict(thread.Id, "reject");

            PlatformCommentThreadWrapper reloaded = ReloadThread(thread.Id);
            Assert.That(
                reloaded.Comments.Any(c => c.ConflictResolutionAction == "replaced"),
                Is.True,
                "reject must record a 'replaced' resolution action on the resolution comment"
            );
        }

        [Test]
        public void ResolveConflict_Accept_LeavesNoResolutionActionOnAnyComment()
        {
            // Accept writes no text, so SaveEdits leaves ConflictResolutionAction null on every
            // comment. The UI reads that absence as the accept outcome.
            CommentThread thread = SeedVerseTextConflict();

            _provider.ResolveConflict(thread.Id, "accept");

            PlatformCommentThreadWrapper reloaded = ReloadThread(thread.Id);
            Assert.That(
                reloaded.Comments.All(c => c.ConflictResolutionAction == null),
                Is.True,
                "accept must not record any resolution action"
            );
        }

        [Test]
        public void ResolveConflict_Merge_StampsMergedResolutionActionOnResolutionComment()
        {
            // Merge writes the auto-merged (both-sides) text, so SaveEdits stamps
            // ConflictResolutionAction='merged' on the appended resolution comment. The wrapper
            // surfaces it (ungated), which is what the card's Result region and the resolution
            // reply's outcome line read.
            CommentThread thread = SeedIndependentVerseTextConflict(_scrText);

            _provider.ResolveConflict(thread.Id, "merge");

            PlatformCommentThreadWrapper reloaded = ReloadThread(thread.Id);
            Assert.That(
                reloaded.Comments.Any(c => c.ConflictResolutionAction == "merged"),
                Is.True,
                "merge must record a 'merged' resolution action on the resolution comment"
            );
        }
        #endregion
    }
}
