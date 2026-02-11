namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Result of comparing book versions.
/// </summary>
public enum ComparisonResult
{
    /// <summary>Source is newer than destination.</summary>
    SourceNewer,

    /// <summary>Destination is newer than source.</summary>
    DestNewer,

    /// <summary>Source and destination are the same.</summary>
    Same,

    /// <summary>Book only exists in source.</summary>
    OnlyInSource,

    /// <summary>Book only exists in destination.</summary>
    OnlyInDest,
}
