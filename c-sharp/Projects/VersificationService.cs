using Paranext.DataProvider.NetworkObjects;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Network object exposing each project's versification lookups (last chapter per book,
/// last verse per chapter). Read-only; delegates to libpalaso's <c>ScrVers</c> via
/// <c>ScrText.Settings.Versification</c>.
/// </summary>
internal class VersificationService : NetworkObject
{
    private const string NetworkObjectName = "platformScripture.versificationService";

    public VersificationService(PapiClient papiClient)
        : base(papiClient) { }

    public async Task InitializeAsync()
    {
        List<(string functionName, Delegate function)> functions =
        [
            ("lookupFinalVerseNumber", LookupFinalVerseNumber),
            ("lookupFinalChapter", LookupFinalChapter),
            ("lookupFinalVerseNumbersInBook", LookupFinalVerseNumbersInBook),
        ];

        await RegisterNetworkObjectAsync(
            NetworkObjectName,
            functions,
            new NetworkObjectCreatedDetails
            {
                Id = NetworkObjectName,
                ObjectType = NetworkObjectType.OBJECT,
                FunctionNames = [.. functions.Select(f => f.functionName)],
            }
        );
    }

    /// <summary>
    /// Returns the final verse number in the specified book and chapter using the project's
    /// versification.
    /// </summary>
    public int LookupFinalVerseNumber(string projectId, int bookNum, int chapterNum)
    {
        var scrText = LocalParatextProjects.GetParatextProject(projectId);
        return scrText.Settings.Versification.GetLastVerse(bookNum, chapterNum);
    }

    /// <summary>
    /// Returns the final chapter number in the specified book using the project's versification.
    /// </summary>
    public int LookupFinalChapter(string projectId, int bookNum)
    {
        var scrText = LocalParatextProjects.GetParatextProject(projectId);
        return scrText.Settings.Versification.GetLastChapter(bookNum);
    }

    /// <summary>
    /// Returns the final verse number for each chapter in the specified book using the project's
    /// versification. Index <c>n</c> is the last verse number in chapter <c>n</c> (1-based);
    /// index 0 is unused. Useful for pre-fetching a whole book in one round trip.
    /// </summary>
    public int[] LookupFinalVerseNumbersInBook(string projectId, int bookNum)
    {
        var scrText = LocalParatextProjects.GetParatextProject(projectId);
        var versification = scrText.Settings.Versification;
        int lastChapter = versification.GetLastChapter(bookNum);
        int[] result = new int[lastChapter + 1];
        for (int chapter = 1; chapter <= lastChapter; chapter++)
            result[chapter] = versification.GetLastVerse(bookNum, chapter);
        return result;
    }
}
