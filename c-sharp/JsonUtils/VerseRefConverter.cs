using SIL.Scripture;
using Newtonsoft.Json.Linq;

namespace Paranext.DataProvider.JsonUtils
{
    internal class VerseRefConverter
    {
        public static bool TryCreateVerseRef(
            string jsonString,
            out VerseRef verseRef,
            out string errorMessage
        )
        {
            try
            {
                return TryCreateVerseRefInternal(jsonString, out verseRef, out errorMessage);
            }
            catch (Exception e)
            {
                verseRef = new VerseRef();
                Console.Error.Write(e.ToString());
                errorMessage = $"Invalid VerseRef ({jsonString}): {e.Message}";
                return false;
            }
        }

        private static bool TryCreateVerseRefInternal(
            string jsonString,
            out VerseRef verseRef,
            out string errorMessage
        )
        {
            // Default values for out parameters
            verseRef = new VerseRef();
            errorMessage = string.Empty;

            JObject parsedArgs = JObject.Parse(jsonString);

            ScrVers? versification = null;
            if (parsedArgs.TryGetValue("versification", out var versificationText))
                versification = new ScrVers(versificationText.Value<string>());

            if (parsedArgs.TryGetValue("verseString", out var verseString))
            {
                verseRef =
                    (versification != null)
                        ? new VerseRef(verseString.Value<string>(), versification)
                        : new VerseRef(verseString.Value<string>());
                return true;
            }

            if (parsedArgs.TryGetValue("bookChapterVerse", out var bookChapterVerse))
            {
                verseRef =
                    (versification != null)
                        ? new VerseRef(bookChapterVerse.Value<int>(), versification)
                        : new VerseRef(bookChapterVerse.Value<int>());
                return true;
            }

            if (!parsedArgs.ContainsKey("book"))
            {
                errorMessage = $"Invalid VerseRef ({jsonString}): No recognized properties";
                return false;
            }

            if (parsedArgs["book"]!.Type == JTokenType.Integer)
            {
                verseRef =
                    (versification != null)
                        ? new VerseRef(
                            parsedArgs["book"]!.Value<int>(),
                            parsedArgs["chapter"]!.Value<int>(),
                            parsedArgs["verse"]!.Value<int>(),
                            versification
                        )
                        : new VerseRef(
                            parsedArgs["book"]!.Value<int>(),
                            parsedArgs["chapter"]!.Value<int>(),
                            parsedArgs["verse"]!.Value<int>()
                        );
            }
            else
            {
                if (versification == null)
                    throw new Exception(
                        "Versification required when book, chapter, and verse are strings"
                    );
                verseRef = new VerseRef(
                    parsedArgs["book"]!.Value<string>(),
                    parsedArgs["chapter"]!.Value<string>(),
                    parsedArgs["verse"]!.Value<string>(),
                    versification
                );
            }
            return true;
        }
    }
}
