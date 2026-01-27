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
    /// XML representation of a basic Comment object for testing serialization/deserialization.
    /// This XML matches the values set in the CreateBasicComment method. This is just here for reference.
    /// </summary>
    private const string Tim_Basic_Xml = """
        <Comment Thread="4217dff8" User="Tim Steenwyk" VerseRef="GEN 1:24" Language="" Date="2011-06-20T16:41:13.4239342-04:00">
            <SelectedText>command</SelectedText>
            <StartPosition>19</StartPosition>
            <ContextBefore>\v 24 God said, “I </ContextBefore>
            <ContextAfter> the earth to give life</ContextAfter>
            <Status>todo</Status>
            <Type/>
            <ConflictType>unknownConflictType</ConflictType>
            <Verse/>
            <HideInTextWindow>false</HideInTextWindow>
            <Contents>Test Comment</Contents>
        </Comment>
        """;

    /// <summary>
    /// Creates a basic Comment object with standard test data for use in serialization/deserialization tests.
    /// This method creates a fully populated comment with specific test values that match the Tim_Basic_Xml
    /// test data defined above.
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
    /// XML representation of a conflict Comment object for testing serialization/deserialization.
    /// This XML matches the values set in the CreateConflictComment method. This is just here for reference.
    /// </summary>
    private const string Tim_Conflict_Xml = """
            <Comment Thread="5f5ea40f" User="Tim Steenwyk" VerseRef="MAT 2:1" Language="" Date="2011-08-16T15:49:18.4019847-04:00">
                <SelectedText/>
                <StartPosition>0</StartPosition>
                <ContextBefore/>
                <ContextAfter/>
                <Status>todo</Status>
                <Type>conflict</Type>
                <ConflictType>unknownConflictType</ConflictType>
                <Verse/>
                <HideInTextWindow>false</HideInTextWindow>
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
            </Comment>
        """;

    /// <summary>
    /// Creates a basic Comment object with standard test data for use in serialization/deserialization tests.
    /// This method creates a fully populated comment with specific test values that match the Tim_Conflict_Xml
    /// test data defined above.
    /// </summary>
    internal static Comment CreateConflictComment()
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
        testComment.SelectedText = "";
        testComment.StartPosition = 0;
        testComment.ContextBefore = "";
        testComment.ContextAfter = "";
        testComment.Status = NoteStatus.Todo;
        testComment.HideInTextWindow = false;
        testComment.Contents = contentsDoc.DocumentElement;
        testComment.Type = NoteType.Conflict;

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
