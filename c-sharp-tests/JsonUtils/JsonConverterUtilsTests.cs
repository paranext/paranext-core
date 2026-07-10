using System.Buffers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Paranext.DataProvider.JsonUtils;
using Paratext.Data.ProjectComments;
using PtxUtils;
using static Paranext.DataProvider.JsonUtils.JsonConverterUtils;

namespace ParanextDataProviderTests.JsonUtils;

[TestFixture]
public class JsonConverterUtilsTests
{
    #region ConvertCommentStatusToNoteStatus Tests

    [TestCase(PlatformCommentWrapper.Json.Status.RESOLVED, "deleted")]
    [TestCase(PlatformCommentWrapper.Json.Status.TO_DO, "todo")]
    [TestCase(PlatformCommentWrapper.Json.Status.DONE, "done")]
    [TestCase(PlatformCommentWrapper.Json.Status.UNSPECIFIED, "")]
    [TestCase("", "")]
    [TestCase("CustomStatus", "customstatus", false)]
    public void ConvertCommentStatusToNoteStatus_ReturnsExpectedValue(
        string input,
        string expected,
        bool isKnownValue = true
    )
    {
        var result = ConvertCommentStatusToNoteStatus(input);
        Assert.That(result, Is.EqualTo(new Enum<NoteStatus>(expected)));
        Assert.That(Enum<NoteStatus>.IsKnownValue(result), Is.EqualTo(isKnownValue));
    }

    #endregion

    #region ConvertNoteStatusToCommentStatus Tests

    [TestCase("resolved", PlatformCommentWrapper.Json.Status.RESOLVED)]
    [TestCase("todo", PlatformCommentWrapper.Json.Status.TO_DO)]
    [TestCase("done", PlatformCommentWrapper.Json.Status.DONE)]
    [TestCase("", PlatformCommentWrapper.Json.Status.UNSPECIFIED)]
    [TestCase("unspecified", PlatformCommentWrapper.Json.Status.UNSPECIFIED)]
    [TestCase("customstatus", "Customstatus")]
    public void ConvertNoteStatusToCommentStatus_ReturnsExpectedValue(string input, string expected)
    {
        var result = ConvertNoteStatusToCommentStatus(new Enum<NoteStatus>(input));
        Assert.That(result, Is.EqualTo(expected));
    }

    #endregion

    #region ConvertCommentTypeToNoteType Tests

    [TestCase(PlatformCommentWrapper.Json.Type.NORMAL, "")]
    [TestCase(PlatformCommentWrapper.Json.Type.CONFLICT, "conflict")]
    [TestCase("", "")] // Not expected from frontend, but should still be treated as normal
    [TestCase("CustomType", "customtype", false)]
    [TestCase("Unspecified", "unspecified", false)] // "Unspecified" is no longer a recognized type -- included for historical reasons, but in practice the frontend should not be sending this value
    public void ConvertCommentTypeToNoteType_ReturnsExpectedValue(
        string input,
        string? expected,
        bool isKnownValue = true
    )
    {
        var result = ConvertCommentTypeToNoteType(input);
        Assert.That(result, Is.EqualTo(new Enum<NoteType>(expected)));
        Assert.That(Enum<NoteType>.IsKnownValue(result), Is.EqualTo(isKnownValue));
    }

    #endregion

    #region ConvertNoteTypeToCommentType Tests

    [TestCase("normal", PlatformCommentWrapper.Json.Type.NORMAL)]
    [TestCase("conflict", PlatformCommentWrapper.Json.Type.CONFLICT)]
    [TestCase("customtype", "Customtype")]
    [TestCase("unspecified", "Unspecified")] // This is now just another "custom" type -- included as a case for historical reasons, but in practice the frontend should never be sending this value to the backend
    public void ConvertNoteTypeToCommentType_ReturnsExpectedValue(string input, string expected)
    {
        var result = ConvertNoteTypeToCommentType(new Enum<NoteType>(input));
        Assert.That(result, Is.EqualTo(expected));
    }

    [Test]
    public void ConvertNoteTypeToCommentType_EmptyInternalValue_DoesNotThrow()
    {
        // An unknown NoteType with an empty InternalValue (corrupt/legacy XML) must not throw
        // IndexOutOfRangeException — mirrors the guard in the sibling ConvertNoteStatusToCommentStatus.
        // Guarding matters because, unguarded, this throw would take down a whole thread during
        // getCommentThreads serialization.
        Assert.That(
            () => ConvertNoteTypeToCommentType(new Enum<NoteType>("")),
            Throws.Nothing,
            "empty InternalValue must be handled gracefully, not indexed into"
        );
    }

    #endregion

    #region Round-trip Tests

    [Test]
    public void CommentStatusConversions_RoundTrip_PreservesValues()
    {
        // Arrange
        string[] commentStatuses =
        [
            PlatformCommentWrapper.Json.Status.RESOLVED,
            PlatformCommentWrapper.Json.Status.TO_DO,
            PlatformCommentWrapper.Json.Status.DONE,
            PlatformCommentWrapper.Json.Status.UNSPECIFIED,
        ];

        foreach (string original in commentStatuses)
        {
            // Act - Convert to NoteStatus and back
            var noteStatus = ConvertCommentStatusToNoteStatus(original);
            var roundTripped = ConvertNoteStatusToCommentStatus(noteStatus);

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
        Enum<NoteStatus>[] noteStatuses =
        [
            NoteStatus.Resolved,
            NoteStatus.Todo,
            NoteStatus.Done,
            NoteStatus.Unspecified,
        ];

        foreach (Enum<NoteStatus> original in noteStatuses)
        {
            // Act - Convert to CommentStatus and back
            var commentStatus = ConvertNoteStatusToCommentStatus(original);
            var roundTripped = ConvertCommentStatusToNoteStatus(commentStatus);

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
        // Arrange - "Unspecified" is excluded because NoteType has no distinct representation
        // for it (NoteType.Normal and NoteType.Unspecified both return an InternalValue of "")
        string[] commentTypes =
        [
            PlatformCommentWrapper.Json.Type.NORMAL,
            PlatformCommentWrapper.Json.Type.CONFLICT,
        ];

        foreach (string original in commentTypes)
        {
            // Act - Convert to NoteType and back
            var noteType = ConvertCommentTypeToNoteType(original);
            var roundTripped = ConvertNoteTypeToCommentType(noteType);

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
        // "Unspecified" is no longer a recognized type on the frontend, but including it here is
        // sort of instructive. In reality, the reason it successfully round-trips is that
        // NoteType.Normal and NoteType.Unspecified both have an InternalValue of "", so they are
        // effectively the same "type" for the purpose of equality comparisons.

        // Arrange
        Enum<NoteType>[] noteTypes = [NoteType.Unspecified, NoteType.Normal, NoteType.Conflict];

        foreach (Enum<NoteType> original in noteTypes)
        {
            // Act - Convert to CommentType and back
            var commentType = ConvertNoteTypeToCommentType(original);
            var roundTripped = ConvertCommentTypeToNoteType(commentType);

            // Assert
            Assert.That(
                roundTripped,
                Is.EqualTo(original),
                $"Round-trip failed for NoteType '{original}'"
            );
        }
    }

    #endregion

    #region WriteIsolatedArray Tests

    /// <summary>
    /// A string converter that lets a test make specific sentinel elements fail to serialize, so
    /// <see cref="WriteIsolatedArray{T}"/>'s isolation can be exercised with no production seam.
    /// </summary>
    private sealed class SentinelStringConverter : JsonConverter<string>
    {
        public const string ThrowAfterPartialWrite = "<<throw-after-partial>>";
        public const string ThrowWiringError = "<<throw-wiring>>";

        public override string Read(
            ref Utf8JsonReader reader,
            Type typeToConvert,
            JsonSerializerOptions options
        ) => throw new NotSupportedException();

        public override void Write(
            Utf8JsonWriter writer,
            string value,
            JsonSerializerOptions options
        )
        {
            switch (value)
            {
                case ThrowAfterPartialWrite:
                    // Emit a partial object into the side buffer, THEN throw: proves a partially
                    // written element is fully discarded, not half-copied into the output.
                    writer.WriteStartObject();
                    writer.WriteString("partial", "should-be-discarded");
                    throw new InvalidOperationException("boom after partial write");
                case ThrowWiringError:
                    throw new CommentThreadContextMissingException("no thread");
                default:
                    writer.WriteStringValue(value);
                    break;
            }
        }
    }

    private static string WriteIsolatedArrayToJson(IEnumerable<string> items)
    {
        var options = new JsonSerializerOptions();
        options.Converters.Add(new SentinelStringConverter());
        var buffer = new ArrayBufferWriter<byte>();
        using (var writer = new Utf8JsonWriter(buffer))
        {
            WriteIsolatedArray(writer, items, options, s => $"item '{s}'");
            writer.Flush();
        }
        return Encoding.UTF8.GetString(buffer.WrittenSpan);
    }

    [Test]
    public void WriteIsolatedArray_HealthyItems_WritesAllInOrder()
    {
        Assert.That(WriteIsolatedArrayToJson(["a", "b", "c"]), Is.EqualTo("[\"a\",\"b\",\"c\"]"));
    }

    [Test]
    public void WriteIsolatedArray_EmptyInput_WritesEmptyArray()
    {
        Assert.That(WriteIsolatedArrayToJson([]), Is.EqualTo("[]"));
    }

    [Test]
    public void WriteIsolatedArray_OneItemThrowsMidWrite_DropsItAndKeepsSurvivorsInOrder()
    {
        // The middle item partially writes then throws; it must be fully discarded (no half-object)
        // and the survivors kept in their original order.
        Assert.That(
            WriteIsolatedArrayToJson(["a", SentinelStringConverter.ThrowAfterPartialWrite, "b"]),
            Is.EqualTo("[\"a\",\"b\"]")
        );
    }

    [Test]
    public void WriteIsolatedArray_WiringErrorPropagates_NotSwallowedAsDroppedItem()
    {
        // A CommentThreadContextMissingException is a programmer/wiring bug, not corrupt data, so it
        // must surface rather than being silently dropped like a corrupt element.
        Assert.Throws<CommentThreadContextMissingException>(
            () => WriteIsolatedArrayToJson(["a", SentinelStringConverter.ThrowWiringError])
        );
    }

    #endregion
}
