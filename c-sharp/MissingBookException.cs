namespace Paranext.DataProvider;

/// <summary>
/// Exception thrown when a requested book is not found in a Paratext project.
/// </summary>
public class MissingBookException(int bookNum, string projectId)
    // IMPORTANT: The scripture editor WebView depends on the exact text of this message.
    : Exception($"Book number {bookNum} not found in project {projectId}.")
{
    /// <summary>
    /// The book number that was not found.
    /// </summary>
    public int BookNum { get; } = bookNum;

    /// <summary>
    /// The project ID in which the book was not found.
    /// </summary>
    public string ProjectId { get; } = projectId;
}
