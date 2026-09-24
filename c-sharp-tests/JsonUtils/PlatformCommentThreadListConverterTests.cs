using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paratext.Data;
using Paratext.Data.ProjectComments;

namespace TestParanextDataProvider.JsonUtils;

internal class PlatformCommentThreadListConverterTests : PapiTestBase
{
    private JsonSerializerOptions _serializationOptions = null!;
    private ScrText _scrText = null!;
    private CommentManager _commentManager = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        _serializationOptions = SerializationOptions.CreateSerializationOptions();
        _scrText = CreateDummyProject();
        _commentManager = CommentManager.Get(_scrText);
    }

    [TearDown]
    public void TearDown() => _scrText?.Dispose();

    private PlatformCommentThreadWrapper AddThread(Comment comment)
    {
        _commentManager.AddComment(comment);
        _commentManager.SaveUser(comment.User, false);
        return new PlatformCommentThreadWrapper(_commentManager.FindThread(comment.Thread));
    }

    [Test]
    public void Serialize_ListWithOneUnserializableThread_DropsItAndKeepsTheRest()
    {
        PlatformCommentThreadWrapper goodThread = AddThread(CommentTestHelper.CreateBasicComment()); // 4217dff8
        // An empty CommentThread (no comments) is a genuinely unserializable thread: reading its
        // metadata (e.g. ModifiedDate, which indexes the last comment) throws mid-serialization. This
        // exercises the real drop-and-discard path with no test-only production seam.
        var badThread = new PlatformCommentThreadWrapper(new CommentThread { ScrText = _scrText });

        var list = new List<PlatformCommentThreadWrapper> { goodThread, badThread };

        var json = JsonSerializer.Serialize(list, _serializationOptions);

        using var doc = JsonDocument.Parse(json);
        Assert.That(doc.RootElement.ValueKind, Is.EqualTo(JsonValueKind.Array));
        Assert.That(doc.RootElement.GetArrayLength(), Is.EqualTo(1)); // bad thread dropped
        Assert.That(doc.RootElement[0].GetProperty("id").GetString(), Is.EqualTo("4217dff8"));
    }

    [Test]
    public void Serialize_HealthyMultiThreadList_KeepsAllThreadsInOriginalOrder()
    {
        // Locks in the "byte-identical for a healthy list" claim at the structural level: every
        // thread present, in the original order, and nothing dropped.
        PlatformCommentThreadWrapper first = AddThread(CommentTestHelper.CreateBasicComment()); // 4217dff8
        PlatformCommentThreadWrapper second = AddThread(CommentTestHelper.CreateConflictComment()); // 5f5ea40f

        var list = new List<PlatformCommentThreadWrapper> { first, second };

        var json = JsonSerializer.Serialize(list, _serializationOptions);

        using var doc = JsonDocument.Parse(json);
        Assert.That(doc.RootElement.GetArrayLength(), Is.EqualTo(2));
        Assert.That(doc.RootElement[0].GetProperty("id").GetString(), Is.EqualTo("4217dff8"));
        Assert.That(doc.RootElement[1].GetProperty("id").GetString(), Is.EqualTo("5f5ea40f"));
    }

    [Test]
    public void Serialize_EmptyList_ProducesEmptyArray()
    {
        var json = JsonSerializer.Serialize(
            new List<PlatformCommentThreadWrapper>(),
            _serializationOptions
        );

        Assert.That(json, Is.EqualTo("[]"));
    }
}
