using System.Text.Json;
using System.Text.Json.Nodes;
using System.Xml;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;
using Paranext.DataProvider.ParatextUtils;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.NetworkObjects;

internal class UsfmDataProvider : DataProvider
{
    private readonly string _collectionName;
    private ScrText? _scrText;

    public UsfmDataProvider(PapiClient papiClient, string dataFolderPath, string collectionName)
        : base("usfm", papiClient)
    {
        _collectionName = collectionName;
        ParatextGlobals.Initialize(dataFolderPath);
    }

    protected override Task StartDataProvider()
    {
        _scrText = ScrTextCollection.Find(_collectionName);
        return Task.CompletedTask;
    }

    protected override ResponseToRequest HandleRequest(string functionName, JsonArray args)
    {
        if (_scrText == null)
        {
            Console.Error.WriteLine("StartDataProvider must be called first");
            return ResponseToRequest.Failed("Data provider must be started first");
        }

        try
        {
            return functionName switch
            {
                "getBookNames" => GetBookNames(),
                "getChapter" => GetChapter(args[0]!.ToJsonString()),
                "getChapterUsx" => GetChapterUsx(args[0]!.ToJsonString()),
                "getBookUsx" => GetBookUsx(args[0]!.ToJsonString()),
                "getVerse" => GetVerse(args[0]!.ToJsonString()),
                _ => ResponseToRequest.Failed($"Unexpected function: {functionName}")
            };
        }
        catch (Exception e)
        {
            Console.Error.WriteLine(e.ToString());
            return ResponseToRequest.Failed(e.Message);
        }
    }

    private static ResponseToRequest GetBookNames()
    {
        return ResponseToRequest.Succeeded(JsonSerializer.Serialize(Canon.AllBookIds));
    }

    private ResponseToRequest GetChapter(string args)
    {
        return VerseRefConverter.TryCreateVerseRef(args, out var verseRef, out string errorMsg)
            ? ResponseToRequest.Succeeded(_scrText!.GetText(verseRef, true, true))
            : ResponseToRequest.Failed(errorMsg);
    }

    private ResponseToRequest GetChapterUsx(string args)
    {
        return VerseRefConverter.TryCreateVerseRef(args, out var verseRef, out string errorMsg)
            ? ResponseToRequest.Succeeded(GetUsxForChapter(verseRef))
            : ResponseToRequest.Failed(errorMsg);
    }

    private ResponseToRequest GetBookUsx(string args)
    {
        return VerseRefConverter.TryCreateVerseRef(args, out var verseRef, out string errorMsg)
            ? ResponseToRequest.Succeeded(GetUsxForBook(verseRef))
            : ResponseToRequest.Failed(errorMsg);
    }

    private ResponseToRequest GetVerse(string args)
    {
        return VerseRefConverter.TryCreateVerseRef(args, out var verseRef, out string errorMsg)
            ? ResponseToRequest.Succeeded(_scrText!.GetVerseText(verseRef))
            : ResponseToRequest.Failed(errorMsg);
    }

    private string GetUsxForChapter(VerseRef vref)
    {
        XmlDocument usx = ConvertUsfmToUsx(GetUsfm(vref.BookNum, vref.ChapterNum), vref.BookNum);
        string contents = usx.OuterXml ?? string.Empty;
        return contents;
    }

    private string GetUsxForBook(VerseRef vref)
    {
        XmlDocument usx = ConvertUsfmToUsx(GetUsfm(vref.BookNum, -1), vref.BookNum);
        string contents = usx.OuterXml ?? string.Empty;
        return contents;
    }

    /// <summary>
    /// Converts usfm to usx, but does not annotate
    /// </summary>
    private XmlDocument ConvertUsfmToUsx(string usfm, int bookNum)
    {
        ScrStylesheet scrStylesheet = _scrText!.ScrStylesheet(bookNum);
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

    /// <summary>
    /// Gets USFM for a book or chapter.
    /// </summary>
    /// <param name="bookNum">The book for which to get USFM</param>
    /// <param name="chapterNum">The chapter for which to get USFM or -1 for the whole book</param>
    /// <returns>USFM</returns>
    private string GetUsfm(int bookNum, int chapterNum = -1)
    {
        VerseRef vref =
            new(bookNum, chapterNum == -1 ? 0 : chapterNum, 0, _scrText!.Settings.Versification);
        ScrText projectToUse = _scrText!.GetJoinedText(bookNum);
        return projectToUse.GetText(vref, chapterNum >= 0, true);
    }
}
