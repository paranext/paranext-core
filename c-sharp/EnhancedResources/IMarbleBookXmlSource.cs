namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Reads marble-enhanced XML for a (resourceId, bookNum) pair from the underlying
/// marble bible package. Single I/O responsibility - no parsing.
/// </summary>
internal interface IMarbleBookXmlSource
{
    /// <summary>
    /// Returns the marble-enhanced XML for the given book inside the given resource,
    /// or null if the resource has no content for that book (missing file, unknown
    /// resource). Throws only on catastrophic I/O - missing files are NOT errors.
    /// </summary>
    string? ReadBookXml(string resourceId, int bookNum);
}
