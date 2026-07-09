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

    /// <summary>A thread wrapper whose serialization always throws (via the virtual Id seam).</summary>
    private sealed class ThrowingCommentThreadWrapper : PlatformCommentThreadWrapper
    {
        public ThrowingCommentThreadWrapper(CommentThread thread)
            : base(thread) { }

        public override string Id =>
            throw new InvalidOperationException("simulated thread serialization failure");
    }

    [Test]
    public void Serialize_ListWithOneUnserializableThread_DropsItAndKeepsTheRest()
    {
        PlatformCommentThreadWrapper goodThread = AddThread(CommentTestHelper.CreateBasicComment()); // 4217dff8
        // A second real, distinct thread, wrapped so its serialization throws.
        AddThread(CommentTestHelper.CreateConflictComment()); // 5f5ea40f
        CommentThread realOther = _commentManager.FindThread("5f5ea40f");
        var badThread = new ThrowingCommentThreadWrapper(realOther);

        var list = new List<PlatformCommentThreadWrapper> { goodThread, badThread };

        var json = JsonSerializer.Serialize(list, _serializationOptions);

        using var doc = JsonDocument.Parse(json);
        Assert.That(doc.RootElement.ValueKind, Is.EqualTo(JsonValueKind.Array));
        Assert.That(doc.RootElement.GetArrayLength(), Is.EqualTo(1)); // bad thread dropped
        Assert.That(doc.RootElement[0].GetProperty("id").GetString(), Is.EqualTo("4217dff8"));
    }
}
