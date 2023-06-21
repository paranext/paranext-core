using System.Text.Json.Nodes;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;
using Paranext.DataProvider.ParatextUtils;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.NetworkObjects
{
    // TODO: Add versificaiton support
    internal class UsfmDataProvider : DataProvider
    {
        private readonly string _collectionName;
        private ScrText? _scrText;

        public UsfmDataProvider(PapiClient papiClient, string dataFolder, string collectionName)
            : base("usfm", papiClient)
        {
            _collectionName = collectionName;
            ParatextGlobals.Initialize(dataFolder);
        }

        protected override void StartDataProvider()
        {
            _scrText = ScrTextCollection.Find(_collectionName);
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
                    "getChapter" => GetChapter(args),
                    "getVerse" => GetVerse(args),
                    _ => ResponseToRequest.Failed($"Unexpected function: {functionName}")
                };
            }
            catch (Exception e)
            {
                Console.Error.WriteLine(e.ToString());
                return ResponseToRequest.Failed(e.Message);
            }
        }

        private ResponseToRequest GetChapter(JsonArray args)
        {
            return TryCreateVerseRef(args, 2, "chapter", out VerseRef verseRef, out string errorMsg)
                ? ResponseToRequest.Succeeded(_scrText!.GetText(verseRef, true, true))
                : ResponseToRequest.Failed(errorMsg);
        }

        private ResponseToRequest GetVerse(JsonArray args)
        {
            return TryCreateVerseRef(args, 3, "verse", out VerseRef verseRef, out string errorMsg)
                ? ResponseToRequest.Succeeded(_scrText!.GetVerseText(verseRef))
                : ResponseToRequest.Failed(errorMsg);
        }

        private static bool TryCreateVerseRef(
            JsonArray args,
            int expectedArgCount,
            string name,
            out VerseRef verseRef,
            out string errorMessage
        )
        {
            // Default values for out parameters
            verseRef = new VerseRef();
            errorMessage = string.Empty;

            if (args.Count == 0)
            {
                errorMessage = $"Invalid {name} reference: no args";
                return false;
            }

            args = args[0]!.AsArray();
            if (args.Count != expectedArgCount)
            {
                errorMessage = $"Invalid {name} reference: {args}";
                return false;
            }

            try
            {
                string book = (string)args[0]!;
                string chapter = ((int)args[1]!).ToString();
                string verse = (args.Count < 3) ? "1" : ((int)args[2]!).ToString();
                verseRef = new VerseRef(book, chapter, verse, ScrVers.English);
                return true;
            }
            catch (Exception e)
            {
                Console.Error.Write(e.ToString());
                errorMessage = $"Invalid {name} reference ({args}): {e.Message}";
                return false;
            }
        }
    }
}
