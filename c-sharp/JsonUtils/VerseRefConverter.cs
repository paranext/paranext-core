using SIL.Scripture;
using Newtonsoft.Json.Linq;

namespace Paranext.DataProvider.JsonUtils
{
    internal class VerseRefConverter
    {
        /// <summary>
        /// Attempts to convert a string containing JSON to a VerseRef object
        /// </summary>
        /// <returns>true if the conversion was successful, false otherwise</returns>
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
                if (versificationText is JObject versificationObject)
                {
                    if (versificationObject.TryGetValue("_type", out var versificationType))
                        versification = new ScrVers((ScrVersType)versificationType.Value<int>());
                    else if (versificationObject.TryGetValue("name", out var versificationName))
                        versification = new ScrVers(versificationName.Value<string>());
                }
                else
                    versification = new ScrVers(versificationText.Value<string>());
            else if (parsedArgs.TryGetValue("versificationStr", out versificationText))
                if (versificationText is not JObject)
                    versification = new ScrVers(versificationText.Value<string>());

            if (
                !parsedArgs.ContainsKey("book")
                && !parsedArgs.ContainsKey("chapterNum")
                && !parsedArgs.ContainsKey("_bookNum")
            )
            {
                errorMessage = $"Invalid VerseRef ({jsonString}): No recognized properties";
                return false;
            }

            if (parsedArgs.ContainsKey("_bookNum"))
            {
                verseRef =
                    (versification != null)
                        ? new VerseRef(
                            parsedArgs["_bookNum"]!.Value<int>(),
                            parsedArgs["_chapterNum"]!.Value<int>(),
                            parsedArgs["_verseNum"]!.Value<int>(),
                            versification
                        )
                        : new VerseRef(
                            parsedArgs["_bookNum"]!.Value<int>(),
                            parsedArgs["_chapterNum"]!.Value<int>(),
                            parsedArgs["_verseNum"]!.Value<int>()
                        );
            }
            else if (parsedArgs.ContainsKey("chapterNum"))
            {
                var verse =
                    (parsedArgs.ContainsKey("verse") ? parsedArgs["verse"]!.Value<string>() : null)
                    ?? parsedArgs["verseNum"]!.Value<int>().ToString();
                verseRef =
                    (versification != null)
                        ? new VerseRef(
                            parsedArgs["book"]!.Value<string>(),
                            parsedArgs["chapterNum"]!.Value<int>().ToString(),
                            verse,
                            versification
                        )
                        : new VerseRef(
                            Canon.BookIdToNumber(parsedArgs["book"]!.Value<string>()),
                            parsedArgs["chapterNum"]!.Value<int>(),
                            parsedArgs["verseNum"]!.Value<int>()
                        );
            }
            else
            {
                if (versification == null)
                    throw new Exception(
                        "Versification required with book, chapter, and verse strings"
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
