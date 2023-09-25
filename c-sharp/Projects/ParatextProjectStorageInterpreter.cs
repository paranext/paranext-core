using System.Text;
using Newtonsoft.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.Projects;

internal class ParatextProjectStorageInterpreter : ProjectStorageInterpreter
{
    public const string Book = "BOOK";
    public const string Chapter = "CHAPTER";
    public const string Verse = "VERSE";

    public ParatextProjectStorageInterpreter(PapiClient papiClient)
        : base(ProjectStorageType.ParatextFolders, new[] { ProjectType.Paratext }, papiClient) { }

    protected override Task StartDataProvider()
    {
        LocalProjects.Initialize();
        return Task.CompletedTask;
    }

    public override ResponseToRequest GetAllProjects()
    {
        return ResponseToRequest.Succeeded(
            JsonConvert.SerializeObject(
                LocalProjects
                    .GetAllProjectDetails()
                    .Select(details => ProjectMetadataConverter.ToJsonString(details.Metadata))
                    .ToList()
            )
        );
    }

    public override ResponseToRequest CreateProject(ProjectDataScope scope)
    {
        if (scope.ProjectID == null)
            return ResponseToRequest.Failed("Must provide a project ID");
        if (scope.ProjectName == null)
            return ResponseToRequest.Failed("Must provide a project name");

        ProjectMetadata metadata =
            new(
                scope.ProjectID,
                scope.ProjectName,
                ProjectStorageType.ParatextFolders,
                ProjectType.Paratext
            );

        try
        {
            LocalProjects.SaveProjectMetadata(metadata);
        }
        catch (Exception ex)
        {
            return ResponseToRequest.Failed(ex.Message);
        }

        // TODO: Do something to actually create the Paratext part of the project
        return ResponseToRequest.Succeeded();
    }

    public override ResponseToRequest GetProjectSettings(ProjectDataScope scope)
    {
        if (scope.ProjectID == null)
            return ResponseToRequest.Failed("Must provide a project ID");

        var scrText = LocalProjects.GetParatextProject(scope.ProjectID);
        return ResponseToRequest.Succeeded(JsonConvert.SerializeObject(scrText.Settings));
    }

    public override ResponseToRequest GetProjectData(ProjectDataScope scope)
    {
        if (scope.ProjectID == null)
            return ResponseToRequest.Failed("Must provide a project ID");
        if (scope.DataType == null)
            return ResponseToRequest.Failed("Must provide a data type");
        if (scope.DataQualifier == null)
            return ResponseToRequest.Failed("Must provide a data qualifier");

        // Not making it mandatory that all calls provide a VerseRef since there might be some types that don't use it
        VerseRefConverter.TryCreateVerseRef(scope.DataQualifier, out var verseRef, out var error);

        var scrText = LocalProjects.GetParatextProject(scope.ProjectID);
        return scope.DataType.ToUpperInvariant() switch
        {
            Book
                => string.IsNullOrEmpty(error)
                    ? ResponseToRequest.Succeeded(scrText.GetText(verseRef, false, false))
                    : ResponseToRequest.Failed(error),
            Chapter
                => string.IsNullOrEmpty(error)
                    ? ResponseToRequest.Succeeded(scrText.GetText(verseRef, true, false))
                    : ResponseToRequest.Failed(error),
            Verse
                => string.IsNullOrEmpty(error)
                    ? ResponseToRequest.Succeeded(scrText.Parser.GetVerseUsfmText(verseRef))
                    : ResponseToRequest.Failed(error),
            _ => ResponseToRequest.Failed($"Unknown data type: {scope.DataType}")
        };
    }

    public override ResponseToRequest SetProjectData(ProjectDataScope scope, string data)
    {
        if (scope.ProjectID == null)
            return ResponseToRequest.Failed("Must provide a project ID");
        if (scope.DataType == null)
            return ResponseToRequest.Failed("Must provide a data type");
        if (scope.DataQualifier == null)
            return ResponseToRequest.Failed("Must provide a data qualifier");

        // Not making it mandatory that all calls provide a VerseRef since there might be some types that don't use it
        VerseRefConverter.TryCreateVerseRef(scope.DataQualifier, out var verseRef, out var error);

        var scrText = LocalProjects.GetParatextProject(scope.ProjectID);
        switch (scope.DataType.ToUpperInvariant())
        {
            case Chapter:
                if (!string.IsNullOrEmpty(error))
                    return ResponseToRequest.Failed(error);
                RunWithinLock(
                    scrText,
                    verseRef,
                    (WriteLock writeLock) =>
                    {
                        scrText.PutText(
                            verseRef.BookNum,
                            verseRef.ChapterNum,
                            false,
                            data,
                            writeLock
                        );
                    }
                );
                return ResponseToRequest.Succeeded();
            default:
                return ResponseToRequest.Failed($"Unknown data type: {scope.DataType}");
        }
    }

    public override ResponseToRequest GetExtensionData(ProjectDataScope scope)
    {
        if (scope.ExtensionName == null)
            return ResponseToRequest.Failed("Must provide an extension name");
        if (scope.DataQualifier == null)
            return ResponseToRequest.Failed("Must provide a data qualifier");

        var dataStream = GetExtensionStream(scope, false);
        if (dataStream == null)
            return ResponseToRequest.Failed("Extension data not found");

        using TextReader textReader = new StreamReader(dataStream, Encoding.UTF8);
        return ResponseToRequest.Succeeded(textReader.ReadToEnd());
    }

    public override ResponseToRequest SetExtensionData(ProjectDataScope scope, string data)
    {
        if (scope.ExtensionName == null)
            return ResponseToRequest.Failed("Must provide an extension name");
        if (scope.DataQualifier == null)
            return ResponseToRequest.Failed("Must provide a data qualifier");

        var dataStream = GetExtensionStream(scope, true);
        if (dataStream == null)
            return ResponseToRequest.Failed("Unable to create extension data");

        using TextWriter textWriter = new StreamWriter(dataStream, Encoding.UTF8);
        textWriter.Write(data);
        textWriter.Flush();
        return ResponseToRequest.Succeeded();
    }

    private static Stream? GetExtensionStream(ProjectDataScope scope, bool createIfNotExists)
    {
        if (scope.ProjectID == null)
            return null;

        var projectDetails = LocalProjects.GetProjectDetails(scope.ProjectID);
        RawDirectoryProjectStreamManager extensionStreamManager = new(projectDetails);
        return extensionStreamManager.GetDataStream(
            $"extensions/{scope.ExtensionName}/{scope.DataQualifier}",
            createIfNotExists
        );
    }

    private static void RunWithinLock(ScrText scrText, VerseRef verseRef, Action<WriteLock> action)
    {
        var myLock = WriteLockManager.Default.ObtainLock(
            WriteScope.ProjectText(scrText, verseRef.BookNum, verseRef.ChapterNum)
        );
        try
        {
            action.Invoke(myLock);
        }
        finally
        {
            myLock.ReleaseAndNotify();
        }
    }
}
