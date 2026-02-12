using NUnit.Framework;
using static Paranext.DataProvider.JsonUtils.JsonConverterUtils;

namespace ParanextDataProviderTests.JsonUtils;

[TestFixture]
public class JsonConverterUtilsTests
{
    #region ConvertCommentStatusToNoteStatus Tests

    [TestCase(PlatformComment.Status.RESOLVED, ParatextNote.Status.RESOLVED)]
    [TestCase(PlatformComment.Status.TO_DO, ParatextNote.Status.TO_DO)]
    [TestCase(PlatformComment.Status.DONE, ParatextNote.Status.DONE)]
    [TestCase(PlatformComment.Status.UNSPECIFIED, ParatextNote.Status.UNSPECIFIED)]
    [TestCase(ParatextNote.Status.UNSPECIFIED, ParatextNote.Status.UNSPECIFIED)]
    [TestCase("CustomStatus", "customstatus")]
    public void ConvertCommentStatusToNoteStatus_ReturnsExpectedValue(string input, string expected)
    {
        string result = ConvertCommentStatusToNoteStatus(input);
        Assert.That(result, Is.EqualTo(expected));
    }

    #endregion

    #region ConvertNoteStatusToCommentStatus Tests

    [TestCase(ParatextNote.Status.RESOLVED, PlatformComment.Status.RESOLVED)]
    [TestCase(ParatextNote.Status.TO_DO, PlatformComment.Status.TO_DO)]
    [TestCase(ParatextNote.Status.DONE, PlatformComment.Status.DONE)]
    [TestCase(ParatextNote.Status.UNSPECIFIED, PlatformComment.Status.UNSPECIFIED)]
    [TestCase("customstatus", "Customstatus")]
    public void ConvertNoteStatusToCommentStatus_ReturnsExpectedValue(string input, string expected)
    {
        string result = ConvertNoteStatusToCommentStatus(input);
        Assert.That(result, Is.EqualTo(expected));
    }

    #endregion

    #region ConvertCommentTypeToNoteType Tests

    [TestCase(PlatformComment.Type.UNSPECIFIED, ParatextNote.Type.UNSPECIFIED)]
    [TestCase(PlatformComment.Type.NORMAL, ParatextNote.Type.NORMAL)]
    [TestCase(PlatformComment.Type.CONFLICT, ParatextNote.Type.CONFLICT)]
    [TestCase(ParatextNote.Type.UNSPECIFIED, ParatextNote.Type.UNSPECIFIED)]
    [TestCase("CustomType", "customtype")]
    public void ConvertCommentTypeToNoteType_ReturnsExpectedValue(string input, string expected)
    {
        string result = ConvertCommentTypeToNoteType(input);
        Assert.That(result, Is.EqualTo(expected));
    }

    #endregion

    #region ConvertNoteTypeToCommentType Tests

    [TestCase(ParatextNote.Type.UNSPECIFIED, PlatformComment.Type.UNSPECIFIED)]
    [TestCase(ParatextNote.Type.NORMAL, PlatformComment.Type.NORMAL)]
    [TestCase(ParatextNote.Type.CONFLICT, PlatformComment.Type.CONFLICT)]
    [TestCase("customtype", "Customtype")]
    public void ConvertNoteTypeToCommentType_ReturnsExpectedValue(string input, string expected)
    {
        string result = ConvertNoteTypeToCommentType(input);
        Assert.That(result, Is.EqualTo(expected));
    }

    #endregion

    #region Round-trip Tests

    [Test]
    public void CommentStatusConversions_RoundTrip_PreservesValues()
    {
        // Arrange
        string[] commentStatuses =
        [
            PlatformComment.Status.RESOLVED,
            PlatformComment.Status.TO_DO,
            PlatformComment.Status.DONE,
            PlatformComment.Status.UNSPECIFIED,
        ];

        foreach (string original in commentStatuses)
        {
            // Act - Convert to NoteStatus and back
            string noteStatus = ConvertCommentStatusToNoteStatus(original);
            string roundTripped = ConvertNoteStatusToCommentStatus(noteStatus);

            // Assert
            Assert.That(
                roundTripped,
                Is.EqualTo(original),
                $"Round-trip failed for CommentStatus '{original}'"
            );
        }
    }

    [Test]
    public void NoteStatusConversions_RoundTrip_PreservesValues()
    {
        // Arrange
        string[] noteStatuses =
        [
            ParatextNote.Status.RESOLVED,
            ParatextNote.Status.TO_DO,
            ParatextNote.Status.DONE,
            ParatextNote.Status.UNSPECIFIED,
        ];

        foreach (string original in noteStatuses)
        {
            // Act - Convert to CommentStatus and back
            string commentStatus = ConvertNoteStatusToCommentStatus(original);
            string roundTripped = ConvertCommentStatusToNoteStatus(commentStatus);

            // Assert
            Assert.That(
                roundTripped,
                Is.EqualTo(original),
                $"Round-trip failed for NoteStatus '{original}'"
            );
        }
    }

    [Test]
    public void CommentTypeConversions_RoundTrip_PreservesValues()
    {
        // Arrange
        string[] commentTypes =
        [
            PlatformComment.Type.UNSPECIFIED,
            PlatformComment.Type.NORMAL,
            PlatformComment.Type.CONFLICT,
        ];

        foreach (string original in commentTypes)
        {
            // Act - Convert to NoteType and back
            string noteType = ConvertCommentTypeToNoteType(original);
            string roundTripped = ConvertNoteTypeToCommentType(noteType);

            // Assert
            Assert.That(
                roundTripped,
                Is.EqualTo(original),
                $"Round-trip failed for CommentType '{original}'"
            );
        }
    }

    [Test]
    public void NoteTypeConversions_RoundTrip_PreservesValues()
    {
        // Arrange
        string[] noteTypes =
        [
            ParatextNote.Type.UNSPECIFIED,
            ParatextNote.Type.NORMAL,
            ParatextNote.Type.CONFLICT,
        ];

        foreach (string original in noteTypes)
        {
            // Act - Convert to CommentType and back
            string commentType = ConvertNoteTypeToCommentType(original);
            string roundTripped = ConvertCommentTypeToNoteType(commentType);

            // Assert
            Assert.That(
                roundTripped,
                Is.EqualTo(original),
                $"Round-trip failed for NoteType '{original}'"
            );
        }
    }

    #endregion
}
