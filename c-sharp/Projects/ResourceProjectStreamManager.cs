using ICSharpCode.SharpZipLib.Checksum;
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
    private readonly IZippedResourcePasswordProvider? _passwordProvider;

    /// <param name="fileManager">
    /// The resource's own file manager. Every read of an entry's data goes through it, so it applies
    /// the same decryption as every other read of the resource.
    /// </param>
    /// <param name="archivePath">
    /// The archive <paramref name="fileManager"/> reads, or null when it cannot be determined, in
    /// which case listing and reading fail as for a missing archive. Opened directly to list entry
    /// names, since the file manager lists one directory at a time and finds a directory only
    /// through the files directly in it, so it cannot reach a file whose parent directories hold
    /// nothing else; and to check an entry opens before the file manager reads it (see
    /// <see cref="GetDataStream"/>).
    /// </param>
    /// <param name="passwordProvider">
    /// The password provider <paramref name="fileManager"/> was given, or null if none. ParatextData
    /// keeps it private, so the caller passes it again. With one, the file manager refuses any entry
    /// that is not encrypted, and decrypts the rest with its password; these checks do the same.
    /// </param>
    public ResourceProjectStreamManager(
        ProjectFileManager fileManager,
        string? archivePath,
        IZippedResourcePasswordProvider? passwordProvider
    )
    {
        _fileManager = fileManager;
        _archivePath = archivePath;
        _passwordProvider = passwordProvider;
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

        // Which entries a read can reach is decided here from the entries' own flags, mirroring the
        // file manager's rule, rather than by opening each one: opening is what can fail, and it
        // costs an open per entry. So an entry that cannot be decrypted (encrypted with another
        // password, or corrupt) is listed, and GetDataStream throws for it.
        List<string> entryNames;
        using (ZipFile archive = OpenArchive())
            entryNames =
            [
                .. archive
                    .Cast<ZipEntry>()
                    .Where(entry => entry.IsFile && (entry.IsCrypted || _passwordProvider == null))
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

    /// <exception cref="InvalidDataException">
    /// The entry exists but cannot be read: it is not encrypted in a resource whose entries must
    /// be, or it cannot be decrypted or opened.
    /// </exception>
    public Stream? GetDataStream(string streamName, bool createIfNotExists = false)
    {
        if (createIfNotExists)
            throw new InvalidOperationException("Resource projects are read-only");

        var entryName = GetEntryNameFromStreamName(streamName);

        // The file manager locks its archive before opening an entry and never unlocks it if
        // opening fails, which would block every later read of the resource from other threads.
        // So the entry is read here first, on an archive with no lock, using the password
        // provider the file manager was given and the rule it applies, and the file manager is
        // handed only an entry whose data reads back intact. Its read then happens inside a
        // using, so data found corrupt partway through still releases the lock.
        // TODO: drop this check once we consume a ParatextData with ubsicap/Paratext#678
        using (ZipFile archive = OpenArchive())
        {
            // Case-insensitive, like the file manager's lookup
            ZipEntry? entry = archive.GetEntry(entryName);
            if (entry == null || !entry.IsFile)
                return null;
            if (_passwordProvider != null && !entry.IsCrypted)
                throw new InvalidDataException($"'{streamName}' cannot be verified");
            bool isIntact;
            try
            {
                isIntact = IsIntact(archive, entry);
            }
            // Data decrypted with the wrong password fails to inflate in more ways than
            // ZipException, such as an IndexOutOfRangeException
            catch (Exception e)
            {
                throw new InvalidDataException($"'{streamName}' cannot be read", e);
            }
            if (!isIntact)
                throw new InvalidDataException($"'{streamName}' cannot be read");
        }

        return new MemoryStream(_fileManager.ReadAllBytes(entryName), writable: false);
    }

    public bool DeleteDataStream(string streamName)
    {
        throw new InvalidOperationException("Resource projects are read-only");
    }

    /// <summary>
    /// Whether the entry's data decrypts and decompresses to what its archive recorded. Opening
    /// the entry is not enough: resources use ZipCrypto, which checks a password against one byte
    /// of the entry's header, so about 1 in 256 entries encrypted with another password open and
    /// decrypt to garbage. A stored entry's garbage reads back without error, so only the CRC tells
    /// it from the real data.
    /// </summary>
    private static bool IsIntact(ZipFile archive, ZipEntry entry)
    {
        using Stream data = archive.GetInputStream(entry);
        Crc32 crc = new();
        byte[] buffer = new byte[81920];
        int count;
        while ((count = data.Read(buffer, 0, buffer.Length)) > 0)
            crc.Update(new ArraySegment<byte>(buffer, 0, count));
        // An AES entry's stream authenticates the data as it is read, and may record no CRC
        return entry.AESKeySize > 0 || crc.Value == entry.Crc;
    }

    /// <summary>
    /// The archive the file manager reads, opened on its own so nothing done with it takes the
    /// file manager's lock.
    /// </summary>
    /// <exception cref="FileNotFoundException">
    /// The archive is missing or could not be located: the resource itself is unreachable, which
    /// is not the same as having no data.
    /// </exception>
    private ZipFile OpenArchive() =>
        new(
            _archivePath
                ?? throw new FileNotFoundException("The resource's archive could not be located")
        )
        {
            Password = _passwordProvider?.GetPassword(),
        };

    private static string GetEntryNameFromStreamName(string streamName)
    {
        ProjectStreamNames.EnsureValid(streamName);

        return streamName.Replace('\\', '/');
    }
}
