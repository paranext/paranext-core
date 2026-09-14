namespace Paranext.DataProvider.Projects;

/// <summary>
/// Used to work with data for a project in terms of streams
/// Implementations could provide streams for storage locations like files in a directory, entries in a ZIP file, blobs in cloud storage, etc.
/// </summary>
internal interface IProjectStreamManager
{
    /// <summary>
    /// Prepare to get any data streams requested
    /// </summary>
    void Initialize();

    /// <summary>
    /// Get the names of the data streams under <paramref name="underPath"/>, relative to it, using
    /// '/' as the separator. Recursive, so a stream nested in subdirectories is returned with those
    /// subdirectories in its name - but a symbolic link or junction to a directory is not followed,
    /// while a link that is a file is listed like any other file, since
    /// <see cref="GetDataStream"/> reads through it. Creates nothing: if the path does not exist,
    /// returns an empty array.
    /// </summary>
    /// <param name="underPath">
    /// Path to enumerate under, relative to the project, using '/' or the platform's separator. Null
    /// or empty lists every stream in the project, relative to the project root.
    /// </param>
    /// <returns>Stream names, sorted with <see cref="StringComparer.Ordinal"/></returns>
    /// <exception cref="ArgumentException">
    /// <paramref name="underPath"/> is not a valid path within the project - an implementation must
    /// reject a path that would escape the project rather than enumerate outside it.
    /// </exception>
    /// <exception cref="DirectoryNotFoundException">
    /// The project's own storage is missing or unreachable. Distinct from an absent
    /// <paramref name="underPath"/>, which is an empty array: a caller must be able to tell "nothing
    /// has been written there" from "the project could not be read".
    /// </exception>
    string[] GetExistingDataStreamNames(string? underPath = null);

    /// <summary>
    /// Get a read/write data stream for project data providers to use
    /// </summary>
    /// <param name="streamName">Name associated with a data stream</param>
    /// <param name="createIfNotExists">Determines whether to create the stream if it doesn't already exist</param>
    /// <returns>Unique stream that is associated with the given stream name</returns>
    Stream? GetDataStream(string streamName, bool createIfNotExists = false);

    /// <summary>
    /// Delete a data stream with the given name
    /// </summary>
    /// <param name="streamName">Name of the stream to delete</param>
    /// <returns>true if the stream was deleted, false otherwise</returns>
    bool DeleteDataStream(string streamName);
}
