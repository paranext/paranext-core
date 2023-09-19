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
    /// Get a list of all data streams current part of the project
    /// </summary>
    /// <returns></returns>
    string[] GetExistingDataStreamNames();

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
