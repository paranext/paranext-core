using ICSharpCode.SharpZipLib.Zip;

namespace MarbleSchemaExtractor;

/// <summary>
/// Wraps SharpZipLib's ZipFile with password support. The password lambda is invoked once
/// at open time; the resulting string lives only inside this object's ZipFile and is never
/// logged or echoed.
/// </summary>
internal sealed class ResourceArchive : IDisposable
{
    private readonly ZipFile _zipFile;
    private bool _disposed;

    private ResourceArchive(ZipFile zipFile) => _zipFile = zipFile;

    public static ResourceArchive Open(string path, Func<string> passwordSupplier)
    {
        var zip = new ZipFile(path);
        zip.Password = passwordSupplier();
        return new ResourceArchive(zip);
    }

    public IEnumerable<string> ListEntries()
    {
        ThrowIfDisposed();
        foreach (ZipEntry entry in _zipFile)
        {
            if (entry.IsFile)
                yield return entry.Name;
        }
    }

    public string ReadEntryText(string entryName)
    {
        ThrowIfDisposed();
        ZipEntry entry =
            _zipFile.GetEntry(entryName)
            ?? throw new InvalidOperationException($"Entry not found: {entryName}");

        using var stream = _zipFile.GetInputStream(entry);
        using var reader = new StreamReader(stream);
        return reader.ReadToEnd();
    }

    public void Dispose()
    {
        if (_disposed)
            return;
        _zipFile.Close();
        _disposed = true;
    }

    private void ThrowIfDisposed()
    {
        if (_disposed)
            throw new ObjectDisposedException(nameof(ResourceArchive));
    }
}
