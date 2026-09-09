using System.IO.Enumeration;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Converts between files in the file system and named streams
/// </summary>
internal class RawDirectoryProjectStreamManager : IProjectStreamManager
{
    private const UnixFileMode UNIX_FILE_MODE =
        UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.UserExecute;

    private readonly ProjectDetails _projectDetails;

    // This is the directory that is intended for reading/writing project data
    private readonly string _writableRootDir;

    public RawDirectoryProjectStreamManager(ProjectDetails projectDetails)
    {
        _projectDetails = projectDetails;
        _writableRootDir = projectDetails.HomeDirectory;
    }

    public void Initialize() // TODO: This doesn't seem to be used
    {
        if (!Directory.Exists(_projectDetails.HomeDirectory))
            throw new InvalidDataException(
                $"Project contents missing for {_projectDetails.Name} ({_projectDetails.Metadata.Id})"
            );
    }

    public string[] GetExistingDataStreamNames(string? underPath = null)
    {
        // Resolving through GetFileNameFromStreamName keeps the validation and separator handling
        // identical to GetDataStream, so a name this returns is a name that can be read back.
        var rootDir = string.IsNullOrEmpty(underPath)
            ? _writableRootDir
            : GetFileNameFromStreamName(underPath);

        // An absent sub-path means "nothing written there yet" and answers empty; an absent project
        // directory means the project itself is unreachable and must not be reported as "no data",
        // since callers cannot tell an authoritative empty answer from a failure they should retry.
        if (!Directory.Exists(_writableRootDir))
            throw new DirectoryNotFoundException(
                $"Project contents missing for {_projectDetails.Name} ({_projectDetails.Metadata.Id})"
            );

        // Enumerating a path that does not exist must not create it - callers use this to discover
        // what exists without writing to the project
        if (!Directory.Exists(rootDir))
            return [];

        // The listing must agree with GetDataStream, which opens a file by name with no attribute
        // filter at all. So the rule is exactly: every regular file under rootDir is a stream,
        // whatever its attributes; nothing else is; and the walk never leaves rootDir. Those are two
        // separate decisions - what to INCLUDE and where to RECURSE - and Directory.GetFiles exposes
        // only one knob (AttributesToSkip) that conflates them, which is why this is a
        // FileSystemEnumerable with a predicate for each. Every simpler form below breaks the
        // contract, and the named test goes red:
        // - Directory.GetFiles with AttributesToSkip = ReparsePoint (the one-flag way to stop link
        //   recursion) also skips FILES carrying ReparsePoint - which cloud-sync placeholders do
        //   (OneDrive Files On-Demand, Dropbox online-only) while GetDataStream reads them fine.
        //   Caught by GetExistingDataStreamNames_FileThatIsASymbolicLink_IsListed.
        // - AttributesToSkip at its default (Hidden | System): .NET reports every dot-prefixed name
        //   as Hidden on Unix, so `.foo.json` and everything under `.cache/` vanish on macOS and
        //   Linux but not on Windows. Caught by GetExistingDataStreamNames_HiddenStreams_AreStillListed.
        // - Following directory links (no ShouldRecursePredicate, or a MaxRecursionDepth in its
        //   place) reports files from outside the project as this extension's own, under names with
        //   no `..` for GetFileNameFromStreamName's guard to catch; a link to an ancestor recurses
        //   until the path length overflows, and a depth cap only bounds that damage.
        //   Caught by GetExistingDataStreamNames_DirectoryThatIsASymbolicLink_IsNotDescendedInto.
        var streams = new FileSystemEnumerable<string>(
            rootDir,
            (ref FileSystemEntry entry) => entry.ToFullPath(),
            new EnumerationOptions
            {
                MatchType = MatchType.Simple,
                RecurseSubdirectories = true,
                ReturnSpecialDirectories = false,
                // Skip nothing by attribute; inclusion and recursion are decided by the predicates
                AttributesToSkip = 0,
            }
        )
        {
            // Files are streams and directories are not. Without this predicate the enumeration
            // yields directories too - it is not Directory.GetFiles.
            ShouldIncludePredicate = (ref FileSystemEntry entry) => !entry.IsDirectory,
            // Consulted only for directories: never descend into a symlink or junction. A FILE that
            // is a link is still included above, because GetDataStream reads through it.
            ShouldRecursePredicate = (ref FileSystemEntry entry) =>
                (entry.Attributes & FileAttributes.ReparsePoint) == 0,
        };

        return
        [
            .. streams
                .Select(file =>
                    Path.GetRelativePath(rootDir, file).Replace(Path.DirectorySeparatorChar, '/')
                )
                .Order(StringComparer.Ordinal),
        ];
    }

    public Stream? GetDataStream(string streamName, bool createIfNotExists = false)
    {
        var fileName = GetFileNameFromStreamName(streamName);
        if (!File.Exists(fileName) && !createIfNotExists)
            return null;

        var dirName = Path.GetDirectoryName(fileName);
        if (!Directory.Exists(dirName))
        {
            if (createIfNotExists && dirName != null)
            {
                if (OperatingSystem.IsWindows())
                    Directory.CreateDirectory(dirName);
                else
                    Directory.CreateDirectory(dirName, UNIX_FILE_MODE);
            }
            else
                return null;
        }

        var fileMode = createIfNotExists ? FileMode.OpenOrCreate : FileMode.Open;
        var retVal = File.Open(fileName, fileMode, FileAccess.ReadWrite);
        return retVal;
    }

    public bool DeleteDataStream(string streamName) // TODO: This doesn't seem to be used
    {
        var fileName = GetFileNameFromStreamName(streamName);
        if (!File.Exists(fileName))
            return false;

        try
        {
            // SR-write-gate: exempt — reached only via the gated ParatextProjectDataProvider.SetExtensionData; DeleteDataStream currently unused (TODO(PT-4210): assess).
            File.Delete(fileName);
            return File.Exists(fileName);
        }
        catch (Exception e)
        {
            Console.Error.WriteLine(e);
            return false;
        }
    }

    private string GetFileNameFromStreamName(string streamName)
    {
        if (string.IsNullOrEmpty(streamName) || streamName.Contains(".."))
            throw new ArgumentException("Invalid stream name", nameof(streamName));

        streamName = streamName.Replace('/', Path.DirectorySeparatorChar);
        streamName = streamName.Replace('\\', Path.DirectorySeparatorChar);
        return Path.Join(_writableRootDir, streamName);
    }
}
