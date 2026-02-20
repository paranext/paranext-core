using Paranext.DataProvider.Projects.DigitalBibleLibrary;
using Paratext.Data;
using Paratext.Data.Users;
using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Populates a <see cref="MarbleDataAccess"/> instance from installed marble resource zip files.
/// Scans the _Resources/ directory for all marble file types, registers bibles with lazy token
/// providers, and marks research data projects as present.
/// </summary>
/// <remarks>
/// PT9 Source: Paratext/Marble/MarbleDataAccess.cs:220-251 (Initialize + LoadMarbleResources)
/// In PT9, MarbleScrText objects were created directly from zip files in _Resources/ and stored
/// in dictionaries (marbleBibles, marbleResearchData). They were never in ScrTextCollection.
/// In PT10, we scan the same directory and create ResourceScrText objects to read USX.
/// </remarks>
internal static class MarbleDataAccessInitializer
{
    // All marble extensions to scan (matching PT9 MarbleDataAccess.allExtensions)
    private static readonly string[] s_allExtensions =
    {
        MarbleDataAccess.MarbleDictionaryExtension,
        MarbleDataAccess.MarbleSourceLanguageExtension,
        MarbleDataAccess.MarbleImageIndexExtension,
        MarbleDataAccess.MarbleEncyclopediaExtension,
        MarbleDataAccess.MarbleImagesExtensionV1,
        MarbleDataAccess.MarbleBibleExtensionV1,
        MarbleDataAccess.MarbleImagesExtensionV2,
        MarbleDataAccess.MarbleBibleExtensionV2,
    };

    private static readonly HashSet<string> s_bibleExtensions =
        new() { MarbleDataAccess.MarbleBibleExtensionV1, MarbleDataAccess.MarbleBibleExtensionV2 };

    /// <summary>
    /// Discovers installed marble resource files and populates the data access layer.
    /// Bible resources are registered with lazy token providers; research data files
    /// are registered by short name. Each resource is handled independently; failures
    /// are logged but don't block others.
    /// </summary>
    public static void Initialize(MarbleDataAccess dataAccess)
    {
        string resourcesDir = ScrTextCollection.ResourcesDirectory;

        if (!Directory.Exists(resourcesDir))
        {
            dataAccess.Initialize();
            return;
        }

        // Scan for all marble files and register them
        foreach (string ext in s_allExtensions)
        {
            foreach (string filePath in Directory.GetFiles(resourcesDir, "*" + ext))
            {
                string shortName = Path.GetFileNameWithoutExtension(filePath);
                bool isBible = s_bibleExtensions.Contains(ext);

                if (isBible)
                {
                    try
                    {
                        var projectName = new ProjectName(filePath);
                        var scrText = new ResourceScrText(
                            projectName,
                            RegistrationInfo.DefaultUser,
                            new DblResourcePasswordProvider(),
                            ignoreLoadErrors: true,
                            isDictionary: false,
                            isMarbleRsource: true
                        );

                        string rawId = scrText.Settings.GetSetting("ResourceId");
                        string resourceId = string.IsNullOrEmpty(rawId) ? shortName : rawId;
                        dataAccess.AddBible(
                            resourceId,
                            bookNum => LoadBookTokens(scrText, bookNum)
                        );
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(
                            $"Failed to register Enhanced Resource '{filePath}': {ex.Message}"
                        );
                    }
                }
                else
                {
                    // Research data - register by short name
                    dataAccess.AddResearchData(shortName);
                }
            }
        }

        dataAccess.Initialize();
    }

    /// <summary>
    /// Loads and parses tokens for a single book from a marble resource zip file.
    /// Reads the USX file directly from the resource zip via FileManager,
    /// matching PT9's MarbleScrText.LoadChaptersForBook pattern.
    /// </summary>
    private static IReadOnlyList<MarbleToken> LoadBookTokens(ScrText scrText, int bookNum)
    {
        try
        {
            string bookId = Canon.BookNumberToId(bookNum);
            string usxFileName = bookId + ".usx";

            if (!scrText.FileManager.Exists(usxFileName))
                return Array.Empty<MarbleToken>();

            string rawXml = scrText.FileManager.ReadAllText(usxFileName);
            if (string.IsNullOrEmpty(rawXml))
                return Array.Empty<MarbleToken>();

            // Parse the Marble USX XML into tokens
            return MarbleDataParser.ConvertToTokens(rawXml);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to load book {bookNum} from '{scrText.Name}': {ex.Message}");
            return Array.Empty<MarbleToken>();
        }
    }
}
