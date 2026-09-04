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

        // Enumerating a path that does not exist must not create it - callers use this to discover
        // what exists without writing to the project
        if (!Directory.Exists(rootDir))
            return [];

        var files = Directory.GetFiles(
            rootDir,
            "*",
            new EnumerationOptions
            {
                MatchType = MatchType.Simple,
                RecurseSubdirectories = true,
                ReturnSpecialDirectories = false,
            }
        );

        return
        [
            .. files
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
