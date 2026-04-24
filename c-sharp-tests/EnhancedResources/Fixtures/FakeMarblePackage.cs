using System.Diagnostics.CodeAnalysis;
using System.IO;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources.Fixtures;

/// <summary>
/// In-memory IMarblePackage implementation for loader unit tests.
/// Holds a dict of internal-path -> string content.
/// </summary>
[ExcludeFromCodeCoverage]
internal sealed class FakeMarblePackage : IMarblePackage
{
    private readonly Dictionary<string, string> _files = new(StringComparer.OrdinalIgnoreCase);

    public FakeMarblePackage(string shortName, bool isResearchData)
    {
        ShortName = shortName;
        IsResearchData = isResearchData;
    }

    public string ShortName { get; }
    public bool IsResearchData { get; }

    public FakeMarblePackage WithFile(string internalPath, string content)
    {
        _files[internalPath] = content;
        return this;
    }

    public bool Exists(string internalPath) => _files.ContainsKey(internalPath);

    public string ReadAllText(string internalPath)
    {
        if (!_files.TryGetValue(internalPath, out var content))
            throw new FileNotFoundException($"FakeMarblePackage: no file '{internalPath}'");
        return content;
    }

    public IEnumerable<string> EnumerateFiles(string searchPattern)
    {
        // Support simple "PREFIX_*.xml" glob only - that's what loaders use.
        var parts = searchPattern.Split('*');
        if (parts.Length != 2)
        {
            return _files.Keys.Where(k =>
                k.Equals(searchPattern, StringComparison.OrdinalIgnoreCase)
            );
        }
        return _files.Keys.Where(k =>
            k.StartsWith(parts[0], StringComparison.OrdinalIgnoreCase)
            && k.EndsWith(parts[1], StringComparison.OrdinalIgnoreCase)
        );
    }

    public string? ResolveAccessiblePath(string internalPath)
    {
        if (!_files.TryGetValue(internalPath, out var content))
            return null;
        // Write to a temp file and return its path.
        var tempPath = Path.Combine(
            Path.GetTempPath(),
            $"fmp-{Guid.NewGuid():N}-{Path.GetFileName(internalPath)}"
        );
        File.WriteAllText(tempPath, content);
        return tempPath;
    }
}
