namespace Paranext.DataProvider.Projects;

/// <summary>
/// The stream-name rule every <see cref="IProjectStreamManager"/> applies, so a name is valid or
/// not regardless of which kind of project it is read from. A manager refuses an invalid name
/// when asked for it and leaves a stored item with an invalid name out of its listing, since no
/// caller could read that item back.
/// </summary>
internal static class ProjectStreamNames
{
    /// <summary>
    /// Whether <paramref name="streamName"/> is a name a stream manager accepts: not empty, and
    /// no ".." anywhere in it, even without a separator ("a..b"), so it cannot climb out of the
    /// directory it is resolved against.
    /// </summary>
    public static bool IsValid(string? streamName) =>
        !string.IsNullOrEmpty(streamName) && !streamName.Contains("..");

    /// <exception cref="ArgumentException">
    /// <paramref name="streamName"/> is not <see cref="IsValid">valid</see>.
    /// </exception>
    public static void EnsureValid(string? streamName)
    {
        if (!IsValid(streamName))
            throw new ArgumentException("Invalid stream name", nameof(streamName));
    }
}
