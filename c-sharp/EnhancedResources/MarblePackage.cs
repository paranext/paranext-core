// === NEW IN PT10 ===
// Reason: Production IMarblePackage wrapping ResourceScrText. Adapter that lets
// loaders avoid depending on ResourceScrText directly, which simplifies testing.
using Paratext.Data;

namespace Paranext.DataProvider.EnhancedResources;

internal sealed class MarblePackage : IMarblePackage
{
    private readonly ResourceScrText _scrText;

    public MarblePackage(ResourceScrText scrText)
    {
        _scrText = scrText ?? throw new ArgumentNullException(nameof(scrText));
    }

    /// <summary>The underlying ScrText, for image-binary extraction and other advanced cases.</summary>
    public ResourceScrText ScrText => _scrText;

    public string ShortName => _scrText.Name;

    public bool IsResearchData => _scrText.Settings.MarbleResearchData;

    public bool Exists(string internalPath) => _scrText.FileManager.Exists(internalPath);

    public string ReadAllText(string internalPath) =>
        _scrText.FileManager.ReadAllText(internalPath);

    public IEnumerable<string> EnumerateFiles(string searchPattern) =>
        _scrText.FileManager.ProjectFiles(searchPattern);

    public string? ResolveAccessiblePath(string internalPath)
    {
        if (!_scrText.FileManager.Exists(internalPath))
            return null;
        return _scrText.FileManager.MakeSureFigureIsAccessible(internalPath);
    }
}
