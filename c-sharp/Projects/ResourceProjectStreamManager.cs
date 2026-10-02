using ICSharpCode.SharpZipLib.Zip;
using Paratext.Data.ProjectFileAccess;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Read-only streams over the files bundled inside a resource's archive (its .p8z or .xml1z).
///
/// A resource has no directory of its own: <see cref="Paratext.Data.ScrText.Directory"/> is the
/// folder holding the archive, which every other resource in that folder shares, so streams
/// resolved against it would be one bucket for all of them. A resource's data is what it was
/// published with, so its streams are the archive's entries, and nothing can be written.
/// </summary>
internal class ResourceProjectStreamManager : IProjectStreamManager
{
    private readonly ProjectFileManager _fileManager;
    private readonly string _archivePath;

    /// <param name="fileManager">
    /// The resource's own file manager. Every read goes through it, so it applies the same
    /// decryption, and the same refusal of an encrypted resource's unencrypted entries, as every
    /// other read of the resource.
    /// </param>
    /// <param name="archivePath">
    /// The archive <paramref name="fileManager"/> reads. Opened only to list entry names: the file
    /// manager lists one directory at a time and finds a directory only through the files directly
    /// in it, so it cannot reach a file whose parent directories hold nothing else.
    /// </param>
    public ResourceProjectStreamManager(ProjectFileManager fileManager, string archivePath)
    {
        _fileManager = fileManager;
        _archivePath = archivePath;
    }

    public void Initialize()
    {
        if (!File.Exists(_archivePath))
            throw new InvalidDataException($"Resource archive missing: {_archivePath}");
    }

    public string[] GetExistingDataStreamNames(string? underPath = null)
    {
        var prefix = string.IsNullOrEmpty(underPath)
            ? ""
            : $"{GetEntryNameFromStreamName(underPath).TrimEnd('/')}/";

        // Opening a missing archive throws FileNotFoundException, which is the answer wanted: the
        // resource itself is unreachable, which is not the same as having no data
        List<string> entryNames;
        using (ZipFile archive = new(_archivePath))
            entryNames =
            [
                .. archive.Cast<ZipEntry>().Where(entry => entry.IsFile).Select(e => e.Name),
            ];

        return
        [
            .. entryNames
                // Case-insensitive because the file manager's lookups are, so this lists exactly
                // the entries a read under the same prefix finds
                .Where(name => name.StartsWith(prefix, StringComparison.OrdinalIgnoreCase))
                .Where(name => !name.Contains("..") && CanRead(name))
                .Select(name => name[prefix.Length..])
                .Order(StringComparer.Ordinal),
        ];
    }

    public Stream? GetDataStream(string streamName, bool createIfNotExists = false)
    {
        if (createIfNotExists)
            throw new InvalidOperationException("Resource projects are read-only");

        var entryName = GetEntryNameFromStreamName(streamName);
        if (!_fileManager.Exists(entryName))
            return null;

        try
        {
            return new MemoryStream(_fileManager.ReadAllBytes(entryName), writable: false);
        }
        catch (FileNotFoundException)
        {
            // The file manager refuses an entry it cannot verify (an unencrypted entry in an
            // encrypted resource), so it is not part of the resource, and listing omits it too
            return null;
        }
    }

    public bool DeleteDataStream(string streamName)
    {
        throw new InvalidOperationException("Resource projects are read-only");
    }

    /// <summary>
    /// Whether <see cref="GetDataStream"/> can read the entry, decided by the file manager itself so
    /// the listing cannot disagree with a read.
    /// </summary>
    private bool CanRead(string entryName)
    {
        try
        {
            using var _ = _fileManager.OpenFileForByteRead(entryName);
            return true;
        }
        catch (FileNotFoundException)
        {
            return false;
        }
    }

    /// <summary>
    /// The same names <see cref="RawDirectoryProjectStreamManager"/> refuses are refused here, so a
    /// stream name is valid or not regardless of which kind of project it is read from.
    /// </summary>
    private static string GetEntryNameFromStreamName(string streamName)
    {
        if (string.IsNullOrEmpty(streamName) || streamName.Contains(".."))
            throw new ArgumentException("Invalid stream name", nameof(streamName));

        return streamName.Replace('\\', '/');
    }
}
