using System.Text;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Converts between files in the file system and named streams
/// </summary>
internal class RawDirectoryProjectStreamManager : IProjectStreamManager
{
    private readonly ProjectDetails _projectDetails;

    public RawDirectoryProjectStreamManager(ProjectDetails projectDetails)
    {
        _projectDetails = projectDetails;
    }

    public void Initialize()
    {
        if (!Directory.Exists(_projectDetails.Directory))
            throw new Exception(
                $"Project contents missing for {_projectDetails.Metadata.Name} ({_projectDetails.Metadata.ID})"
            );
    }

    public string[] GetExistingDataStreamNames()
    {
        var files = Directory.GetFiles(
            _projectDetails.Directory,
            "*",
            new EnumerationOptions
            {
                MatchType = MatchType.Simple,
                RecurseSubdirectories = true,
                ReturnSpecialDirectories = false
            }
        );

        DirectoryInfo projectDirectory = new(_projectDetails.Directory);
        List<string> retVal = new();
        foreach (var file in files)
        {
            FileInfo fileInfo = new(file);
            StringBuilder streamName = new(fileInfo.Name);
            DirectoryInfo? walkingUp = fileInfo.Directory;
            while (walkingUp != null && walkingUp.FullName != projectDirectory.FullName)
            {
                streamName.Insert(0, Path.DirectorySeparatorChar);
                streamName.Insert(0, walkingUp.Name);
                walkingUp = walkingUp.Parent;
            }
            retVal.Add(streamName.ToString());
        }

        return retVal.ToArray();
    }

    private string GetFileNameFromStreamName(string streamName)
    {
        if (string.IsNullOrEmpty(streamName) || streamName.Contains(".."))
            throw new ArgumentException("Invalid stream name", nameof(streamName));

        streamName = streamName.Replace('/', Path.DirectorySeparatorChar);
        streamName = streamName.Replace('\\', Path.DirectorySeparatorChar);
        return Path.Join(_projectDetails.Directory, streamName);
    }

    public Stream? GetDataStream(string streamName, bool createIfNotExists = false)
    {
        var fileName = GetFileNameFromStreamName(streamName);
        if (!File.Exists(fileName) && !createIfNotExists)
            return null;

        var fileMode = createIfNotExists ? FileMode.OpenOrCreate : FileMode.Open;
        return File.Open(fileName, fileMode, FileAccess.ReadWrite);
    }

    public bool DeleteDataStream(string streamName)
    {
        var fileName = GetFileNameFromStreamName(streamName);
        if (!File.Exists(fileName))
            return false;

        try
        {
            File.Delete(fileName);
            return File.Exists(fileName);
        }
        catch (Exception e)
        {
            Console.Error.WriteLine(e);
            return false;
        }
    }
}
