namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Thrown when an operation that needs thread context (e.g. rendering
/// <see cref="PlatformCommentWrapper.ContentsHtml"/>) is attempted on a comment wrapper that has no
/// thread. A comment serialized in the getCommentThreads response always has a thread, so this
/// signals a wiring/programmer error rather than corrupt content. The serialization resilience
/// layers deliberately let it propagate instead of degrading it to a placeholder or dropping the
/// note, so a wiring regression surfaces loudly rather than silently blanking notes.
/// </summary>
public class CommentThreadContextMissingException : InvalidOperationException
{
    public CommentThreadContextMissingException(string message)
        : base(message) { }
}
