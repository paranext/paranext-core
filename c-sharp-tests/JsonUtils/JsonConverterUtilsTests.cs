using NUnit.Framework;
using Paranext.DataProvider.JsonUtils;

namespace ParanextDataProviderTests.JsonUtils;

[TestFixture]
public class JsonConverterUtilsTests
{
    #region ConvertCommentStatusToNoteStatus Tests

    [TestCase(JsonConverterUtils.COMMENT_STATUS_RESOLVED, JsonConverterUtils.NOTE_STATUS_DELETED)]
    [TestCase(JsonConverterUtils.COMMENT_STATUS_TODO, JsonConverterUtils.NOTE_STATUS_TODO)]
    [TestCase(JsonConverterUtils.COMMENT_STATUS_DONE, JsonConverterUtils.NOTE_STATUS_DONE)]
    [TestCase(JsonConverterUtils.COMMENT_STATUS_UNSPECIFIED, JsonConverterUtils.NOTE_STATUS_EMPTY)]
    [TestCase(JsonConverterUtils.NOTE_STATUS_EMPTY, JsonConverterUtils.NOTE_STATUS_EMPTY)]
    [TestCase("CustomStatus", "customstatus")]
    public void ConvertCommentStatusToNoteStatus_ReturnsExpectedValue(string input, string expected)
    {
        string result = JsonConverterUtils.ConvertCommentStatusToNoteStatus(input);
        Assert.That(result, Is.EqualTo(expected));
    }

    #endregion

    #region ConvertNoteStatusToCommentStatus Tests

    [TestCase(JsonConverterUtils.NOTE_STATUS_DELETED, JsonConverterUtils.COMMENT_STATUS_RESOLVED)]
    [TestCase(JsonConverterUtils.NOTE_STATUS_TODO, JsonConverterUtils.COMMENT_STATUS_TODO)]
    [TestCase(JsonConverterUtils.NOTE_STATUS_DONE, JsonConverterUtils.COMMENT_STATUS_DONE)]
    [TestCase(JsonConverterUtils.NOTE_STATUS_EMPTY, JsonConverterUtils.COMMENT_STATUS_UNSPECIFIED)]
    [TestCase("customstatus", "Customstatus")]
    public void ConvertNoteStatusToCommentStatus_ReturnsExpectedValue(string input, string expected)
    {
        string result = JsonConverterUtils.ConvertNoteStatusToCommentStatus(input);
        Assert.That(result, Is.EqualTo(expected));
    }

    #endregion

    #region ConvertCommentTypeToNoteType Tests

    [TestCase(JsonConverterUtils.COMMENT_TYPE_UNSPECIFIED, JsonConverterUtils.NOTE_TYPE_EMPTY)]
    [TestCase(JsonConverterUtils.COMMENT_TYPE_NORMAL, JsonConverterUtils.NOTE_TYPE_NORMAL)]
    [TestCase(JsonConverterUtils.COMMENT_TYPE_CONFLICT, JsonConverterUtils.NOTE_TYPE_CONFLICT)]
    [TestCase(JsonConverterUtils.NOTE_TYPE_EMPTY, JsonConverterUtils.NOTE_TYPE_EMPTY)]
    [TestCase("CustomType", "customtype")]
    public void ConvertCommentTypeToNoteType_ReturnsExpectedValue(string input, string expected)
    {
        string result = JsonConverterUtils.ConvertCommentTypeToNoteType(input);
        Assert.That(result, Is.EqualTo(expected));
    }

    #endregion

    #region ConvertNoteTypeToCommentType Tests

    [TestCase(JsonConverterUtils.NOTE_TYPE_EMPTY, JsonConverterUtils.COMMENT_TYPE_UNSPECIFIED)]
    [TestCase(JsonConverterUtils.NOTE_TYPE_NORMAL, JsonConverterUtils.COMMENT_TYPE_NORMAL)]
    [TestCase(JsonConverterUtils.NOTE_TYPE_CONFLICT, JsonConverterUtils.COMMENT_TYPE_CONFLICT)]
    [TestCase("customtype", "Customtype")]
    public void ConvertNoteTypeToCommentType_ReturnsExpectedValue(string input, string expected)
    {
        string result = JsonConverterUtils.ConvertNoteTypeToCommentType(input);
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
            JsonConverterUtils.COMMENT_STATUS_RESOLVED,
            JsonConverterUtils.COMMENT_STATUS_TODO,
            JsonConverterUtils.COMMENT_STATUS_DONE,
            JsonConverterUtils.COMMENT_STATUS_UNSPECIFIED,
        ];

        foreach (string original in commentStatuses)
        {
            // Act - Convert to NoteStatus and back
            string noteStatus = JsonConverterUtils.ConvertCommentStatusToNoteStatus(original);
            string roundTripped = JsonConverterUtils.ConvertNoteStatusToCommentStatus(noteStatus);

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
            JsonConverterUtils.NOTE_STATUS_DELETED,
            JsonConverterUtils.NOTE_STATUS_TODO,
            JsonConverterUtils.NOTE_STATUS_DONE,
            JsonConverterUtils.NOTE_STATUS_EMPTY,
        ];

        foreach (string original in noteStatuses)
        {
            // Act - Convert to CommentStatus and back
            string commentStatus = JsonConverterUtils.ConvertNoteStatusToCommentStatus(original);
            string roundTripped = JsonConverterUtils.ConvertCommentStatusToNoteStatus(commentStatus);

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
            JsonConverterUtils.COMMENT_TYPE_UNSPECIFIED,
            JsonConverterUtils.COMMENT_TYPE_NORMAL,
            JsonConverterUtils.COMMENT_TYPE_CONFLICT,
        ];

        foreach (string original in commentTypes)
        {
            // Act - Convert to NoteType and back
            string noteType = JsonConverterUtils.ConvertCommentTypeToNoteType(original);
            string roundTripped = JsonConverterUtils.ConvertNoteTypeToCommentType(noteType);

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
            JsonConverterUtils.NOTE_TYPE_EMPTY,
            JsonConverterUtils.NOTE_TYPE_NORMAL,
            JsonConverterUtils.NOTE_TYPE_CONFLICT,
        ];

        foreach (string original in noteTypes)
        {
            // Act - Convert to CommentType and back
            string commentType = JsonConverterUtils.ConvertNoteTypeToCommentType(original);
            string roundTripped = JsonConverterUtils.ConvertCommentTypeToNoteType(commentType);

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
