using System.Diagnostics.CodeAnalysis;
using System.Xml;
using Paratext.Data;
using Paratext.Data.ProjectComments;
using Paratext.Data.Users;

namespace TestParanextDataProvider;

/// <summary>
/// Helper class for creating test Comment objects shared across multiple test classes
/// </summary>
[ExcludeFromCodeCoverage]
internal static class CommentTestHelper
{
    /// <summary>
    /// Creates a basic Comment object with standard test data for use in serialization/deserialization tests.
    /// This method creates a fully populated comment with specific test values that match the Tim_Basic_Xml
    /// test data defined in CommentsTestData.
    /// </summary>
    internal static Comment CreateBasicComment()
    {
        XmlDocument contentsDoc = new XmlDocument();
        contentsDoc.LoadXml("<Contents>Test Comment</Contents>");

        DummyUser user_Tim = new DummyUser("Tim Steenwyk");
        Comment testComment = new Comment(user_Tim);

        testComment.Thread = "4217dff8";
        testComment.VerseRefStr = "GEN 1:24";
        testComment.Date = "2011-06-20T16:41:13.4239342-04:00";
        testComment.SelectedText = "command";
        testComment.StartPosition = 19;
        testComment.ContextBefore = "\\v 24 God said, \u201CI ";
        testComment.ContextAfter = " the earth to give life";
        testComment.Status = NoteStatus.Todo;
        testComment.HideInTextWindow = false;
        testComment.Contents = contentsDoc.DocumentElement;

        return testComment;
    }

    /// <summary>
    /// Internal dummy user class for testing purposes
    /// </summary>
    private class DummyUser : ParatextUser
    {
        public DummyUser(string name)
            : base(name) { }
    }
}
