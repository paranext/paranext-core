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
    private readonly string? _archivePath;
    private readonly bool _entriesMustBeEncrypted;

    /// <param name="fileManager">
    /// The resource's own file manager. Every read goes through it, so it applies the same
    /// decryption, and the same refusal of an encrypted resource's unencrypted entries, as every
    /// other read of the resource.
    /// </param>
    /// <param name="archivePath">
    /// The archive <paramref name="fileManager"/> reads, or null when it cannot be determined, in
    /// which case listing fails as for a missing archive. Opened only to list entry names: the file
    /// manager lists one directory at a time and finds a directory only through the files directly
    /// in it, so it cannot reach a file whose parent directories hold nothing else.
    /// </param>
    /// <param name="entriesMustBeEncrypted">
    /// Whether <paramref name="fileManager"/> refuses an entry that is not encrypted. ParatextData's
    /// zipped file manager does exactly when it was given a password provider, and keeps that
    /// private, so the caller states it.
    /// </param>
    public ResourceProjectStreamManager(
        ProjectFileManager fileManager,
        string? archivePath,
        bool entriesMustBeEncrypted
    )
    {
        _fileManager = fileManager;
        _archivePath = archivePath;
        _entriesMustBeEncrypted = entriesMustBeEncrypted;
    }

    public void Initialize()
    {
        if (_archivePath == null || !File.Exists(_archivePath))
            throw new InvalidDataException($"Resource archive missing: {_archivePath}");
    }

    public string[] GetExistingDataStreamNames(string? underPath = null)
    {
        var prefix = string.IsNullOrEmpty(underPath)
            ? ""
            : $"{GetEntryNameFromStreamName(underPath).TrimEnd('/')}/";

        // A missing archive, or one that cannot be located, throws FileNotFoundException, which is
        // the answer wanted: the resource itself is unreachable, which is not the same as having
        // no data
        if (_archivePath == null)
            throw new FileNotFoundException("The resource's archive could not be located");
        // Which entries a read can reach is decided here from the entries' own flags, mirroring the
        // file manager's rule, rather than by opening each one through the file manager: its read
        // locks the archive before decrypting and never unlocks it if decrypting fails (an entry
        // encrypted with another password, or a corrupt one), which would block every later read
        // of the resource. So such an entry is listed, and reads as absent.
        List<string> entryNames;
        using (ZipFile archive = new(_archivePath))
            entryNames =
            [
                .. archive
                    .Cast<ZipEntry>()
                    .Where(entry => entry.IsFile && (entry.IsCrypted || !_entriesMustBeEncrypted))
                    .Select(entry => entry.Name),
            ];

        return
        [
            .. entryNames
                // Case-insensitive because the file manager's lookups are, so this lists exactly
                // the entries a read under the same prefix finds
                .Where(name => name.StartsWith(prefix, StringComparison.OrdinalIgnoreCase))
                .Where(ProjectStreamNames.IsValid)
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
            // encrypted resource), which listing omits too, and one it cannot decrypt or read,
            // which listing includes (see GetExistingDataStreamNames). Either is no data.
            return null;
        }
    }

    public bool DeleteDataStream(string streamName)
    {
        throw new InvalidOperationException("Resource projects are read-only");
    }

    private static string GetEntryNameFromStreamName(string streamName)
    {
        ProjectStreamNames.EnsureValid(streamName);

        return streamName.Replace('\\', '/');
    }
}
