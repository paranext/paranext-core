using Moq;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.Languages;
using Paratext.Data.Plugins;
using Paratext.Data.ProjectComments;
using Paratext.Data.Users;
using SIL.TestUtilities;

namespace TestParanextDataProvider.JsonUtils
{
    [TestFixture]
    public class PlatformCommentWrapperTests
    {
        TemporaryFolder settingsFolder;
        TemporaryFolder projectFolder;
        ScrText scrText;

        [OneTimeSetUp]
        public void FixtureSetup()
        {
            settingsFolder = new TemporaryFolder(Path.GetTempPath());
            WritingSystemRepository.Initialize(new TestWritingSystemRepository());
            ScrTextCollection.Initialize(settingsFolder.Path);
        }

        [OneTimeTearDown]
        public void FixtureTeardown()
        {
            settingsFolder.Dispose();
        }

        [SetUp]
        public void TestSetup()
        {
            projectFolder = new TemporaryFolder(settingsFolder, Path.GetTempPath());
            scrText = new DummyScrText(
                new ProjectDetails(
                    "BlahDBlah",
                    new ProjectMetadata(Guid.NewGuid().ToString("N"), new List<string>(0)),
                    projectFolder.Path
                )
            );
        }

        [TearDown]
        public void TestTearDown()
        {
            projectFolder?.Dispose();
            scrText?.Dispose();
        }

        [Test]
        public void TryAdd_NewCommentThread_ReturnsTrue()
        {
            // Arrange
            var user = RegistrationInfo.DefaultUser;
            var comment = new Comment(user);
            comment.VerseRefStr = "GEN 1:1";
            comment.Language = "en";
            comment.Date = "2026-01-21";
            var commentManagerMock = new Mock<ICommentManager>();
#pragma warning disable CS8604 // FindThread really can fail to find a thread and return null.
            commentManagerMock
                .Setup(cm => cm.FindThread(comment.Thread))
                .Returns(null as CommentThread);
#pragma warning restore CS8604 // FindThread really can fail to find a thread and return null.
            commentManagerMock.Setup(cm => cm.AddComment(comment));
            var wrapper = new PlatformCommentWrapper(comment);

            // Act
            wrapper.Add(commentManagerMock.Object);

            // Assert
            commentManagerMock.Verify(cm => cm.AddComment(comment), Times.Once);
        }

        [Test]
        public void TryAdd_WithThreadWrapperSet_ReturnsTrue()
        {
            // Arrange
            var user = RegistrationInfo.DefaultUser;
            var thread = new CommentThread() { ScrText = scrText };
            thread.Comments.Add(new Comment(user));
            var comment = new Comment(user)
            {
                Thread = thread.Id,
                VerseRefStr = "GEN 1:1",
                Language = "en",
                Date = "2026-01-21"
            };
            var threadWrapper = new PlatformCommentThreadWrapper(thread);
            var commentManagerMock = new Mock<ICommentManager>();
            commentManagerMock.Setup(cm => cm.FindThread(thread.Id)).Returns(thread);
            commentManagerMock.Setup(cm => cm.AddComment(comment));
            var wrapper = new PlatformCommentWrapper(comment, threadWrapper);

            // Act
            wrapper.Add(commentManagerMock.Object);

            // Assert
            commentManagerMock.Verify(cm => cm.AddComment(comment), Times.Once);
        }

        [Test]
        public void TryAdd_CommentAlreadyInThread_ReturnsFalse()
        {
            // Arrange
            var user = RegistrationInfo.DefaultUser;
            var comment = new Comment(user);
            comment.Thread = "garbage";
            comment.VerseRefStr = "GEN 1:1";
            comment.Language = "en";
            comment.Date = "2026-01-21";
            var commentManagerMock = new Mock<ICommentManager>();
#pragma warning disable CS8604 // FindThread really can fail to find a thread and return null.
            commentManagerMock
                .Setup(cm => cm.FindThread(comment.Thread))
                .Returns(null as CommentThread);
#pragma warning restore CS8604 // FindThread really can fail to find a thread and return null.
            commentManagerMock.Setup(cm => cm.AddComment(comment));
            var wrapper = new PlatformCommentWrapper(comment);

            // Act
            wrapper.Add(commentManagerMock.Object);

            // Assert
            commentManagerMock.Verify(cm => cm.AddComment(comment), Times.Never);
        }
    }
}
