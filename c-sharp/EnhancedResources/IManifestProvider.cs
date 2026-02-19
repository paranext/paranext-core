namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Abstraction for fetching the remote resource manifest (version listing).
/// Allows deterministic testing of update checking without HTTP calls.
/// </summary>
/// <remarks>
/// PT9 Source: Paratext/Marble/InstallableRemoteResource.cs:166
///   (HTTP GET to media.paratext.org with manifest file).
/// Contract: data-contracts.md Method 20 (CheckForResourceUpdates), BHV-500.
/// SECURITY: PT9 used hardcoded credentials that must NOT be ported.
/// </remarks>
// === NEW IN PT10 ===
// Reason: Interface for dependency injection of manifest fetch in PAPI pattern
// Maps to: CAP-020
public interface IManifestProvider
{
    /// <summary>
    /// Fetches the remote manifest mapping resource names to their latest available versions.
    /// </summary>
    /// <returns>Dictionary mapping resource short name to latest version string.</returns>
    Dictionary<string, string> FetchManifest();

    /// <summary>
    /// Returns true if the named resource has a major version upgrade (v1 to v2) available.
    /// </summary>
    bool HasV2Upgrade(string resourceName);
}
