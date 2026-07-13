using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paratext.Data;
using Paratext.Data.ProjectComments;

namespace TestParanextDataProvider.JsonUtils;

internal class CommentThreadsResultConverterTests : PapiTestBase
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

    // An empty CommentThread (no comments) is genuinely unserializable: reading its metadata
    // (e.g. ModifiedDate, which indexes the last comment) throws mid-serialization.
    private PlatformCommentThreadWrapper UnserializableThread() =>
        new(new CommentThread { ScrText = _scrText });

    private string Serialize(params PlatformCommentThreadWrapper[] threads) =>
        JsonSerializer.Serialize(new CommentThreadsResult([.. threads]), _serializationOptions);

    [Test]
    public void Serialize_OneUnserializableThread_DropsItAndReportsHiddenCount()
    {
        PlatformCommentThreadWrapper goodThread = AddThread(CommentTestHelper.CreateBasicComment()); // 4217dff8

        var json = Serialize(goodThread, UnserializableThread());

        using var doc = JsonDocument.Parse(json);
        Assert.That(doc.RootElement.ValueKind, Is.EqualTo(JsonValueKind.Object));
        JsonElement threads = doc.RootElement.GetProperty("threads");
        Assert.That(threads.GetArrayLength(), Is.EqualTo(1)); // bad thread dropped
        Assert.That(threads[0].GetProperty("id").GetString(), Is.EqualTo("4217dff8"));
        Assert.That(doc.RootElement.GetProperty("hiddenCount").GetInt32(), Is.EqualTo(1));
    }

    [Test]
    public void Serialize_MultipleUnserializableThreads_CountsEachInHiddenCount()
    {
        // The plural banner copy ("{count} comments couldn't be shown") only fires for hiddenCount
        // >= 2, so prove the count actually reaches 2 rather than saturating at 1.
        PlatformCommentThreadWrapper goodThread = AddThread(CommentTestHelper.CreateBasicComment()); // 4217dff8

        var json = Serialize(UnserializableThread(), goodThread, UnserializableThread());

        using var doc = JsonDocument.Parse(json);
        JsonElement threads = doc.RootElement.GetProperty("threads");
        Assert.That(threads.GetArrayLength(), Is.EqualTo(1)); // both bad threads dropped
        Assert.That(threads[0].GetProperty("id").GetString(), Is.EqualTo("4217dff8"));
        Assert.That(doc.RootElement.GetProperty("hiddenCount").GetInt32(), Is.EqualTo(2));
    }

    [Test]
    public void Serialize_HealthyMultiThreadList_KeepsAllThreadsInOrderWithZeroHidden()
    {
        PlatformCommentThreadWrapper first = AddThread(CommentTestHelper.CreateBasicComment()); // 4217dff8
        PlatformCommentThreadWrapper second = AddThread(CommentTestHelper.CreateConflictComment()); // 5f5ea40f

        var json = Serialize(first, second);

        using var doc = JsonDocument.Parse(json);
        JsonElement threads = doc.RootElement.GetProperty("threads");
        Assert.That(threads.GetArrayLength(), Is.EqualTo(2));
        Assert.That(threads[0].GetProperty("id").GetString(), Is.EqualTo("4217dff8"));
        Assert.That(threads[1].GetProperty("id").GetString(), Is.EqualTo("5f5ea40f"));
        Assert.That(doc.RootElement.GetProperty("hiddenCount").GetInt32(), Is.EqualTo(0));
    }

    [Test]
    public void Serialize_EmptyResult_ProducesEmptyThreadsAndZeroHidden()
    {
        var json = Serialize();

        Assert.That(json, Is.EqualTo("{\"threads\":[],\"hiddenCount\":0}"));
    }

    [Test]
    public void Serialize_BareThreadList_IsPlainArrayNotEnvelope()
    {
        // The { threads, hiddenCount } envelope is scoped to CommentThreadsResult: an ordinary
        // List<PlatformCommentThreadWrapper> serialized on its own must stay a plain JSON array, so
        // no unrelated serialization silently turns into an object.
        PlatformCommentThreadWrapper thread = AddThread(CommentTestHelper.CreateBasicComment());

        var json = JsonSerializer.Serialize(
            new List<PlatformCommentThreadWrapper> { thread },
            _serializationOptions
        );

        using var doc = JsonDocument.Parse(json);
        Assert.That(doc.RootElement.ValueKind, Is.EqualTo(JsonValueKind.Array));
    }
}
