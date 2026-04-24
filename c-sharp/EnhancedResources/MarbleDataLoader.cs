// === NEW IN PT10 ===
// Reason: Orchestrator stub. Task 11 fills out real discovery + per-domain loader chain.
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Production loader - orchestrates package discovery and per-domain XML extraction.
/// Current stub returns null (no data); real implementation lands in Task 11.
/// </summary>
internal sealed class MarbleDataLoader : IMarbleDataLoader
{
    public Task<MarbleData?> LoadAsync()
    {
        // Stub - Task 11 fills this in.
        return Task.FromResult<MarbleData?>(null);
    }
}
