using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Projects;
using Paratext.Data.ProjectComments;
using PtxUtils;

namespace TestParanextDataProvider.JsonUtils;

[TestFixture]
internal class CommentThreadSelectorConverterTests
{
    private JsonSerializerOptions _serializationOptions = null!;

    [SetUp]
    public void Setup()
    {
        _serializationOptions = SerializationOptions.CreateSerializationOptions();
    }

    [Test]
    public void Deserialize_StatusResolved_ConvertedToNoteStatusDeleted()
    {
        string json = @"{ ""status"": ""Resolved"" }";

        var selector = JsonSerializer.Deserialize<CommentThreadSelector>(
            json,
            _serializationOptions
        );

        Assert.That(selector, Is.Not.Null);
        Assert.That(selector!.Status, Is.EqualTo(NoteStatus.Resolved));
    }

    [Test]
    public void Deserialize_StatusTodo_ConvertedToNoteStatusTodo()
    {
        string json = @"{ ""status"": ""Todo"" }";

        var selector = JsonSerializer.Deserialize<CommentThreadSelector>(
            json,
            _serializationOptions
        );

        Assert.That(selector, Is.Not.Null);
        Assert.That(selector!.Status, Is.EqualTo(NoteStatus.Todo));
    }

    [Test]
    public void Deserialize_StatusDone_ConvertedToNoteStatusDone()
    {
        string json = @"{ ""status"": ""Done"" }";

        var selector = JsonSerializer.Deserialize<CommentThreadSelector>(
            json,
            _serializationOptions
        );

        Assert.That(selector, Is.Not.Null);
        Assert.That(selector!.Status, Is.EqualTo(NoteStatus.Done));
    }

    [Test]
    public void Deserialize_TypeNormal_ConvertedToNoteTypeNormal()
    {
        string json = @"{ ""type"": ""Normal"" }";

        var selector = JsonSerializer.Deserialize<CommentThreadSelector>(
            json,
            _serializationOptions
        );

        Assert.That(selector, Is.Not.Null);
        Assert.That(selector!.Type, Is.EqualTo(NoteType.Normal));
    }

    [Test]
    public void Deserialize_TypeConflict_ConvertedToNoteTypeConflict()
    {
        string json = @"{ ""type"": ""Conflict"" }";

        var selector = JsonSerializer.Deserialize<CommentThreadSelector>(
            json,
            _serializationOptions
        );

        Assert.That(selector, Is.Not.Null);
        Assert.That(selector!.Type, Is.EqualTo(NoteType.Conflict));
    }

    [Test]
    public void Deserialize_NoStatusOrType_PropertiesRemainDefault()
    {
        string json = @"{ ""threadId"": ""abc-123"" }";

        var selector = JsonSerializer.Deserialize<CommentThreadSelector>(
            json,
            _serializationOptions
        );

        Assert.That(selector, Is.Not.Null);
        Assert.That(selector!.ThreadId, Is.EqualTo("abc-123"));
        Assert.That(selector.Status, Is.EqualTo(Enum<NoteStatus>.Null));
        Assert.That(selector.Type, Is.Null);
    }

    [Test]
    public void Deserialize_AllSimpleFields_AllFieldsPopulated()
    {
        string json =
            @"{ ""status"": ""Todo"", ""type"": ""Normal"", ""threadId"": ""t1"", ""author"": ""user1"", ""assignedTo"": ""user2"", ""isRead"": true }";

        var selector = JsonSerializer.Deserialize<CommentThreadSelector>(
            json,
            _serializationOptions
        );

        Assert.That(selector, Is.Not.Null);
        Assert.That(selector!.Status, Is.EqualTo(NoteStatus.Todo));
        Assert.That(selector.Type, Is.EqualTo(NoteType.Normal));
        Assert.That(selector.ThreadId, Is.EqualTo("t1"));
        Assert.That(selector.Author, Is.EqualTo("user1"));
        Assert.That(selector.AssignedTo, Is.EqualTo("user2"));
        Assert.That(selector.IsRead, Is.True);
    }

    [Test]
    public void Deserialize_DateFilter_DateFilterPopulated()
    {
        string json =
            @"{ ""dateFilter"": { ""after"": ""2024-01-01"", ""before"": ""2024-12-31"" } }";

        var selector = JsonSerializer.Deserialize<CommentThreadSelector>(
            json,
            _serializationOptions
        );

        Assert.That(selector, Is.Not.Null);
        Assert.That(selector!.DateFilter, Is.Not.Null);
        Assert.That(selector.DateFilter!.After, Is.EqualTo("2024-01-01"));
        Assert.That(selector.DateFilter.Before, Is.EqualTo("2024-12-31"));
    }

    [Test]
    public void Deserialize_ScriptureRanges_RangesPopulated()
    {
        string json =
            @"{ ""scriptureRanges"": [{ ""start"": { ""book"": ""GEN"", ""chapterNum"": 1, ""verseNum"": 1 }, ""end"": { ""book"": ""GEN"", ""chapterNum"": 1, ""verseNum"": 31 }, ""granularity"": ""verse"" }] }";

        var selector = JsonSerializer.Deserialize<CommentThreadSelector>(
            json,
            _serializationOptions
        );

        Assert.That(selector, Is.Not.Null);
        Assert.That(selector!.ScriptureRanges, Is.Not.Null);
        Assert.That(selector.ScriptureRanges!, Has.Count.EqualTo(1));
        Assert.That(selector.ScriptureRanges[0].Start.BookNum, Is.EqualTo(1));
        Assert.That(selector.ScriptureRanges[0].Start.ChapterNum, Is.EqualTo(1));
        Assert.That(selector.ScriptureRanges[0].Start.VerseNum, Is.EqualTo(1));
        Assert.That(selector.ScriptureRanges[0].End.VerseNum, Is.EqualTo(31));
        Assert.That(selector.ScriptureRanges[0].Granularity, Is.EqualTo("verse"));
    }

    [Test]
    public void Deserialize_EmptyObject_IsEmptyTrue()
    {
        string json = @"{}";

        var selector = JsonSerializer.Deserialize<CommentThreadSelector>(
            json,
            _serializationOptions
        );

        Assert.That(selector, Is.Not.Null);
        Assert.That(selector!.IsEmpty, Is.True);
    }
}
