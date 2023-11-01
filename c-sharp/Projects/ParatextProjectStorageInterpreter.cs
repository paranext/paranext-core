using System.Text;
using System.Xml;
using System.Xml.Linq;
using System.Xml.XPath;
using Newtonsoft.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.Projects;

internal class ParatextProjectStorageInterpreter : ProjectStorageInterpreter
{
    public const string BookUSFM = "BookUSFM";
    public const string ChapterUSFM = "ChapterUSFM";
    public const string VerseUSFM = "VerseUSFM";
    public const string ChapterUSX = "ChapterUSX";

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
        return scope.DataType switch
        {
            BookUSFM
                => string.IsNullOrEmpty(error)
                    ? ResponseToRequest.Succeeded(scrText.GetText(verseRef, false, true))
                    : ResponseToRequest.Failed(error),
            ChapterUSFM
                => string.IsNullOrEmpty(error)
                    ? ResponseToRequest.Succeeded(scrText.GetText(verseRef, true, true))
                    : ResponseToRequest.Failed(error),
            VerseUSFM
                => string.IsNullOrEmpty(error)
                    ? ResponseToRequest.Succeeded(scrText.Parser.GetVerseUsfmText(verseRef))
                    : ResponseToRequest.Failed(error),
            ChapterUSX
                => string.IsNullOrEmpty(error)
                    ? ResponseToRequest.Succeeded(GetChapterUsx(scrText, verseRef))
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
        switch (scope.DataType)
        {
            case ChapterUSFM:
                if (!string.IsNullOrEmpty(error))
                    return ResponseToRequest.Failed(error);
                RunWithinLock(
                    WriteScope.ProjectText(scrText, verseRef.BookNum, verseRef.ChapterNum),
                    writeLock =>
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
                // The value of returned string is case sensitive and cannot change unless data provider subscriptions change
                return ResponseToRequest.Succeeded(ChapterUSFM);
            case ChapterUSX:
                if (!string.IsNullOrEmpty(error))
                    return ResponseToRequest.Failed(error);
                ResponseToRequest? response = null;
                RunWithinLock(
                    WriteScope.ProjectText(scrText, verseRef.BookNum, verseRef.ChapterNum),
                    writeLock => response = SetChapterUsx(scrText, verseRef, data, writeLock)
                );
                return response ?? ResponseToRequest.Failed("Unknown error occurred");
            default:
                return ResponseToRequest.Failed($"Unknown data type: {scope.DataType}");
        }
    }

    public override ResponseToRequest GetExtensionData(ProjectDataScope scope)
    {
        if (scope.ProjectID == null)
            return ResponseToRequest.Failed("Must provide a project ID");
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
        if (scope.ProjectID == null)
            return ResponseToRequest.Failed("Must provide a project ID");
        if (scope.ExtensionName == null)
            return ResponseToRequest.Failed("Must provide an extension name");
        if (scope.DataQualifier == null)
            return ResponseToRequest.Failed("Must provide a data qualifier");

        var dataStream = GetExtensionStream(scope, true);
        if (dataStream == null)
            return ResponseToRequest.Failed("Unable to create extension data");

        var scrText = LocalProjects.GetParatextProject(scope.ProjectID);
        try
        {
            RunWithinLock(
                WriteScope.ProjectData(scrText),
                writeLock =>
                {
                    if (!writeLock.Active)
                        throw new Exception("Write lock is not active");
                    dataStream.SetLength(0);
                    using TextWriter textWriter = new StreamWriter(dataStream, Encoding.UTF8);
                    textWriter.Write(data);
                    textWriter.Flush();
                }
            );
            // The value of returned string is case sensitive and cannot change unless data provider subscriptions change
            return ResponseToRequest.Succeeded($"ExtensionData");
        }
        catch (Exception e)
        {
            return ResponseToRequest.Failed(e.Message);
        }
    }

    private static Stream? GetExtensionStream(ProjectDataScope scope, bool createIfNotExists)
    {
        var projectDetails = LocalProjects.GetProjectDetails(scope.ProjectID!);
        RawDirectoryProjectStreamManager extensionStreamManager = new(projectDetails);
        return extensionStreamManager.GetDataStream(
            $"extensions/{scope.ExtensionName}/{scope.DataQualifier}",
            createIfNotExists
        );
    }

    private string GetChapterUsx(ScrText scrText, VerseRef vref)
    {
        XmlDocument usx = ConvertUsfmToUsx(
            scrText,
            scrText.GetText(vref, true, true),
            vref.BookNum
        );
        return usx.OuterXml ?? string.Empty;
    }

    private ResponseToRequest SetChapterUsx(
        ScrText scrText,
        VerseRef vref,
        string newUsx,
        WriteLock writeLock
    )
    {
        try
        {
            XDocument doc;
            using (TextReader reader = new StringReader(newUsx))
                doc = XDocument.Load(reader, LoadOptions.PreserveWhitespace);

            if (doc.Root?.Name != "usx")
                return ResponseToRequest.Failed("Invalid USX");

            UsxFragmenter.FindFragments(
                scrText.ScrStylesheet(vref.BookNum),
                doc.CreateNavigator(),
                XPathExpression.Compile("*[false()]"),
                out string usfm
            );

            usfm = UsfmToken.NormalizeUsfm(scrText, vref.BookNum, usfm);
            scrText.PutText(vref.BookNum, vref.ChapterNum, true, usfm, writeLock);
        }
        catch (Exception e)
        {
            return ResponseToRequest.Failed(e.ToString());
        }

        return ResponseToRequest.Succeeded(ChapterUSX);
    }

    private XmlDocument ConvertUsfmToUsx(ScrText scrText, string usfm, int bookNum)
    {
        ScrStylesheet scrStylesheet = scrText.ScrStylesheet(bookNum);
        // Tokenize usfm
        List<UsfmToken> tokens = UsfmToken.Tokenize(scrStylesheet, usfm ?? string.Empty, true);

        XmlDocument doc = new XmlDocument();
        using (XmlWriter xmlw = doc.CreateNavigator()!.AppendChild())
        {
            // Convert to XML
            UsfmToUsx.ConvertToXmlWriter(scrStylesheet, tokens, xmlw, false);
            xmlw.Flush();
        }
        return doc;
    }

    private static void RunWithinLock(WriteScope writeScope, Action<WriteLock> action)
    {
        var myLock =
            WriteLockManager.Default.ObtainLock(writeScope)
            ?? throw new Exception("Unable to obtain write lock");
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
