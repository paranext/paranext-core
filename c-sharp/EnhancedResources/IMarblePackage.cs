// === NEW IN PT10 ===
// Reason: Test-friendly abstraction over ResourceScrText for marble packages.
// Loaders consume IMarblePackage; production wraps ResourceScrText; tests implement directly.
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Minimal surface over a marble package (.mbv*z, .mdv1z, .mev1z, etc.) that loaders
/// need for XML extraction and settings inspection. Production implementation wraps
/// ResourceScrText; tests implement directly with in-memory XML strings.
/// </summary>
internal interface IMarblePackage
{
    /// <summary>
    /// The short name of the package (e.g., "SDBG", "TECLOT"). Matches
    /// ResourceScrText.Name / ProjectName.ShortName.
    /// </summary>
    string ShortName { get; }

    /// <summary>
    /// True if this package is Marble research data (SDBG, SDBH, MBL_ENC, etc.).
    /// False for Marble Bible resources. Reads ScrText.Settings.MarbleResearchData
    /// in the production implementation.
    /// </summary>
    bool IsResearchData { get; }

    /// <summary>
    /// True if the named file exists inside the package's zip.
    /// </summary>
    bool Exists(string internalPath);

    /// <summary>
    /// Reads the text content of a file inside the package's zip. Throws if the
    /// file is not present.
    /// </summary>
    string ReadAllText(string internalPath);

    /// <summary>
    /// Enumerates internal files matching a pattern (e.g. "FLORA_*.xml").
    /// </summary>
    IEnumerable<string> EnumerateFiles(string searchPattern);

    /// <summary>
    /// Returns a local filesystem path where the named internal file has been
    /// extracted. Used for binary content (images). Null if the file doesn't exist.
    /// </summary>
    string? ResolveAccessiblePath(string internalPath);
}
