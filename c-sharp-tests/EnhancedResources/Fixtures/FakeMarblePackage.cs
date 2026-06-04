using System.Diagnostics.CodeAnalysis;
using System.IO;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources.Fixtures;

/// <summary>
/// In-memory IMarblePackage implementation for loader unit tests.
/// Holds a dict of internal-path -> file content. Text files are stored via
/// <see cref="WithFile"/>; binary files (image bytes) via <see cref="WithBinaryFile"/>
/// for byte-faithful round-trips through <see cref="ResolveAccessiblePath"/>.
/// </summary>
[ExcludeFromCodeCoverage]
internal sealed class FakeMarblePackage : IMarblePackage
{
    private readonly Dictionary<string, byte[]> _files = new(StringComparer.OrdinalIgnoreCase);

    public FakeMarblePackage(string shortName, bool isResearchData)
    {
        ShortName = shortName;
        IsResearchData = isResearchData;
    }

    public string ShortName { get; }
    public bool IsResearchData { get; }

    public FakeMarblePackage WithFile(string internalPath, string content)
    {
        _files[internalPath] = System.Text.Encoding.UTF8.GetBytes(content);
        return this;
    }

    public FakeMarblePackage WithBinaryFile(string internalPath, byte[] bytes)
    {
        _files[internalPath] = bytes;
        return this;
    }

    public bool Exists(string internalPath) => _files.ContainsKey(internalPath);

    public string ReadAllText(string internalPath)
    {
        if (!_files.TryGetValue(internalPath, out var bytes))
            throw new FileNotFoundException($"FakeMarblePackage: no file '{internalPath}'");
        return System.Text.Encoding.UTF8.GetString(bytes);
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
        if (!_files.TryGetValue(internalPath, out var bytes))
            return null;
        // Write to a temp file and return its path. Writing the raw bytes preserves
        // both text (UTF-8 round-trip) and binary content for image-binary tests.
        var tempPath = Path.Combine(
            Path.GetTempPath(),
            $"fmp-{Guid.NewGuid():N}-{Path.GetFileName(internalPath)}"
        );
        File.WriteAllBytes(tempPath, bytes);
        return tempPath;
    }
}
