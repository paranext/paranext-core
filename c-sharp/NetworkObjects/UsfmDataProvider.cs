using System.Text.Json;
using System.Text.Json.Nodes;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;
using Paranext.DataProvider.ParatextUtils;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.NetworkObjects
{
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

        private ResponseToRequest GetVerse(string args)
        {
            return VerseRefConverter.TryCreateVerseRef(args, out var verseRef, out string errorMsg)
                ? ResponseToRequest.Succeeded(_scrText!.GetVerseText(verseRef))
                : ResponseToRequest.Failed(errorMsg);
        }
    }
}
