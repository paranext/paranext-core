// === NEW IN PT10 ===
// Reason: Lets EnhancedResourceFactory depend on an interface so tests can inject
// a stub loader returning pre-built MarbleData without touching the filesystem.
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Orchestrates marble package discovery and per-domain extraction. Returns a
/// populated MarbleData record, or null if loading failed or no data is present.
/// Implementations should not throw for routine failures (missing required
/// packages, corrupt individual files); those are communicated as either null
/// return (no data) or partial MarbleData (with HaveMarbleData=false derived
/// from contents).
/// </summary>
internal interface IMarbleDataLoader
{
    Task<MarbleData?> LoadAsync();
}
