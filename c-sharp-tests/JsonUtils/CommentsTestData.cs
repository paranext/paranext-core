using Paratext.Data.ProjectComments;

public static class CommentsTestData
{
    public const string Tim_Basic_Xml = """
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

    public const string Tim_Conflict_Xml = """
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
}
