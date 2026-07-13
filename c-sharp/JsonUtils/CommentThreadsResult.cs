namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// The getCommentThreads response: the comment threads to show, serialized as
/// <c>{ threads, hiddenCount }</c> by <see cref="CommentThreadsResultConverter"/>.
/// </summary>
/// <remarks>
/// <c>hiddenCount</c> is deliberately NOT a field here. A thread — or a comment inside a thread — is
/// only known to be unserializable when serialization actually fails, so the converter counts drops
/// as it writes and emits the total. Wrapping the list in this dedicated response type (instead of
/// registering a global <c>JsonConverter&lt;List&lt;PlatformCommentThreadWrapper&gt;&gt;</c>) keeps
/// that <c>{ threads, hiddenCount }</c> envelope scoped to this one response: an ordinary list of
/// thread wrappers serialized anywhere else stays a plain JSON array.
/// </remarks>
public record CommentThreadsResult(List<PlatformCommentThreadWrapper> Threads);
