using Paranext.DataProvider.Projects;
using Paratext.Checks;
using Paratext.Checks.Checks;
using Paratext.Data;
using Paratext.Data.Filters;
using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

using static Paratext.Checks.InventoryTextType;

/// <summary>
/// Service for building matched pairs inventory from scripture text.
/// Orchestrates the 4-way branching logic (Regular/SBA x Separated/NonSeparated)
/// and serializes results into InventoryBuildResult.
///
/// MatchedPairsCheck.GetReferences() only returns unmatched/error pairs (matched
/// pairs are removed from the stack). This service supplements the standard
/// TextInventory.ProcessTokens with a direct scan of text tokens for all configured
/// pair punctuation characters, ensuring the inventory contains every pair character
/// for user categorization.
/// </summary>
internal static class InventoryBuildService
{
    private const string MatchedPairsInventoryId = "MatchedPairs";

    /// <summary>
    /// Builds the matched pairs inventory for the specified project.
    /// </summary>
    /// <param name="projectId">Project identifier.</param>
    /// <param name="isSba">Whether project is Study Bible Additions.</param>
    /// <param name="isSeparated">Whether verse/non-verse separation is enabled.</param>
    /// <param name="paratextProjects">Project lookup service.</param>
    /// <returns>InventoryBuildResult with populated inventory items.</returns>
    public static InventoryBuildResult BuildInventory(
        string projectId,
        bool isSba,
        bool isSeparated,
        LocalParatextProjects paratextProjects
    )
    {
        if (string.IsNullOrEmpty(projectId))
        {
            return new InventoryBuildResult
            {
                Success = false,
                Error = "Project ID must not be empty",
            };
        }

        try
        {
            var (dataSource, inventory) = InitializeDataSource(projectId, isSba, isSeparated);
            var pairChars = ParsePairCharacters(dataSource);
            var inventories = CreateTextInventories();

            ProcessAllChapters(dataSource, inventory, pairChars, inventories, isSba, isSeparated);
            var populationFlags = RecalculateAndCombine(inventory, inventories, isSba, isSeparated);

            var items = BuildItemsFromInventory(inventories.Combined);
            bool setupComplete = ComputeSetupComplete(items);

            return new InventoryBuildResult
            {
                Success = true,
                Items = items,
                VersePopulated = populationFlags.VersePopulated,
                NonVersePopulated = populationFlags.NonVersePopulated,
                RegularPopulated = populationFlags.RegularPopulated,
                StudyBiblePopulated = populationFlags.StudyBiblePopulated,
                CombinedIsMerge = populationFlags.CombinedIsMerge,
                SetupComplete = setupComplete,
            };
        }
        catch (Exception ex)
        {
            return new InventoryBuildResult { Success = false, Error = ex.Message };
        }
    }

    /// <summary>
    /// Resolves the project, creates the data source and inventory, and configures
    /// the separation and SBA flags.
    /// </summary>
    private static (
        ChecksDataSource DataSource,
        ScriptureInventoryBase Inventory
    ) InitializeDataSource(string projectId, bool isSba, bool isSeparated)
    {
        var scrText = LocalParatextProjects.GetParatextProject(projectId);
        var dataSource = new ChecksDataSource(scrText)
        {
            SelectedPassageSet = new SelectedPassages(scrText.Settings.BooksPresentSet),
        };
        // ChecksDataSource may change the ScrText
        scrText = dataSource.ScrText;

        var inventory = InventoryFactory.CreateInventory(MatchedPairsInventoryId, dataSource);
        inventory.SetVerseAndNonVerseSeparately = isSeparated;

        if (isSba)
        {
            dataSource.SbaContentOnly = false;
        }

        return (dataSource, inventory);
    }

    /// <summary>
    /// Parses the configured pair punctuation characters from the data source,
    /// returning the combined set of opening and closing characters.
    /// </summary>
    private static HashSet<char> ParsePairCharacters(ChecksDataSource dataSource)
    {
        MatchedPairsCheck.ParsePunctPairs(
            dataSource.GetParameterValue("Pairs"),
            out var openingPuncts,
            out var closingPuncts,
            out _
        );
        var pairChars = new HashSet<char>(openingPuncts);
        pairChars.UnionWith(closingPuncts);
        return pairChars;
    }

    /// <summary>
    /// Holds the set of TextInventory objects used during the build process,
    /// one for each text type in the 4-way branching.
    /// </summary>
    private sealed class InventorySet
    {
        public TextInventory Verse { get; } = new(VerseText);
        public TextInventory NonVerse { get; } = new(NonVerseText);
        public TextInventory Regular { get; } = new(RegularContent);
        public TextInventory StudyBible { get; } = new(StudyBibleContent);
        public TextInventory Combined { get; } = new(AllText);
    }

    /// <summary>
    /// Creates the complete set of TextInventory objects for all text types.
    /// </summary>
    private static InventorySet CreateTextInventories() => new();

    /// <summary>
    /// Tracks which inventory sub-types were populated during the build,
    /// and whether the combined inventory is a merge of sub-inventories.
    /// </summary>
    private readonly record struct PopulationFlags(
        bool VersePopulated,
        bool NonVersePopulated,
        bool RegularPopulated,
        bool StudyBiblePopulated,
        bool CombinedIsMerge
    );

    /// <summary>
    /// Iterates over all selected chapters, processing tokens through both the
    /// standard ProcessTokens pipeline and the supplementary pair character scan.
    /// </summary>
    private static void ProcessAllChapters(
        ChecksDataSource dataSource,
        ScriptureInventoryBase inventory,
        HashSet<char> pairChars,
        InventorySet inventories,
        bool isSba,
        bool isSeparated
    )
    {
        foreach (SelectedChapter chapter in dataSource.SelectedPassageSet.SelectedChapters)
        {
            dataSource.GetText(
                chapter.BookNum,
                chapter.ChapterNum,
                inventory.NeededFormat | CheckDataFormat.TextTokens
            );
            var textTokens = dataSource.TextTokens.ToList();

            ProcessChapterTokens(
                textTokens,
                dataSource,
                inventory,
                chapter,
                pairChars,
                inventories,
                isSba,
                isSeparated
            );
        }
    }

    /// <summary>
    /// Processes a single chapter's tokens through the appropriate branching path
    /// (SBA+Separated, SBA+NonSeparated, Regular+Separated, Regular+NonSeparated).
    /// Calls both ProcessTokens (for error/status tracking) and InventoryPairCharacters
    /// (for complete pair character enumeration).
    /// </summary>
    private static void ProcessChapterTokens(
        List<ITextToken> textTokens,
        ChecksDataSource dataSource,
        ScriptureInventoryBase inventory,
        SelectedChapter chapter,
        HashSet<char> pairChars,
        InventorySet inv,
        bool isSba,
        bool isSeparated
    )
    {
        if (isSba && isSeparated)
        {
            inv.Verse.ProcessTokens(textTokens, dataSource, inventory, chapter);
            inv.NonVerse.ProcessTokens(textTokens, dataSource, inventory, chapter);
            inv.StudyBible.ProcessTokens(textTokens, dataSource, inventory, chapter);
            InventoryPairCharacters(textTokens, pairChars, inv.Verse, inv.NonVerse, inv.StudyBible);
        }
        else if (isSba)
        {
            inv.Regular.ProcessTokens(textTokens, dataSource, inventory, chapter);
            inv.StudyBible.ProcessTokens(textTokens, dataSource, inventory, chapter);
            InventoryPairCharacters(
                textTokens,
                pairChars,
                inv.Regular,
                nonVerseInventory: null,
                inv.StudyBible
            );
        }
        else if (isSeparated)
        {
            inv.Verse.ProcessTokens(textTokens, dataSource, inventory, chapter);
            inv.NonVerse.ProcessTokens(textTokens, dataSource, inventory, chapter);
            InventoryPairCharacters(
                textTokens,
                pairChars,
                inv.Verse,
                inv.NonVerse,
                studyBibleInventory: null
            );
        }
        else
        {
            inv.Combined.ProcessTokens(textTokens, dataSource, inventory, chapter);
            InventoryPairCharacters(
                textTokens,
                pairChars,
                inv.Combined,
                nonVerseInventory: null,
                studyBibleInventory: null
            );
        }
    }

    /// <summary>
    /// Recalculates statuses for populated inventories and combines them into
    /// the combined inventory. Returns flags indicating which sub-inventories
    /// were populated.
    /// </summary>
    private static PopulationFlags RecalculateAndCombine(
        ScriptureInventoryBase inventory,
        InventorySet inv,
        bool isSba,
        bool isSeparated
    )
    {
        if (isSba)
        {
            if (isSeparated)
            {
                inv.Verse.RecalculateStatus(inventory);
                inv.NonVerse.RecalculateStatus(inventory);
                inv.Regular.Combine(inv.Verse, inv.NonVerse);
            }
            inv.Regular.RecalculateStatus(inventory);
            inv.StudyBible.RecalculateStatus(inventory);
            inv.Combined.Combine(inv.Regular, inv.StudyBible);

            return new PopulationFlags(
                VersePopulated: isSeparated,
                NonVersePopulated: isSeparated,
                RegularPopulated: true,
                StudyBiblePopulated: true,
                CombinedIsMerge: true
            );
        }

        if (isSeparated)
        {
            inv.Verse.RecalculateStatus(inventory);
            inv.NonVerse.RecalculateStatus(inventory);
            inv.Combined.Combine(inv.Verse, inv.NonVerse);

            return new PopulationFlags(
                VersePopulated: true,
                NonVersePopulated: true,
                RegularPopulated: false,
                StudyBiblePopulated: false,
                CombinedIsMerge: true
            );
        }

        inv.Combined.RecalculateStatus(inventory);

        return new PopulationFlags(
            VersePopulated: false,
            NonVersePopulated: false,
            RegularPopulated: false,
            StudyBiblePopulated: false,
            CombinedIsMerge: false
        );
    }

    /// <summary>
    /// Scans text tokens for configured pair punctuation characters and adds each
    /// found character to the appropriate TextInventory based on the token's TextType
    /// and IsStudyBibleContent properties. Mirrors the SkipToken logic in
    /// TextInventory.ProcessTokens. Characters already tracked by ProcessTokens
    /// (unmatched errors) have their counts incremented via GetValue.
    /// </summary>
    private static void InventoryPairCharacters(
        List<ITextToken> textTokens,
        HashSet<char> pairChars,
        TextInventory primaryInventory,
        TextInventory? nonVerseInventory,
        TextInventory? studyBibleInventory
    )
    {
        foreach (var tok in textTokens)
        {
            if (tok.TextType == TextType.ChapterNumber || tok.TextType == TextType.VerseNumber)
                continue;

            for (int i = 0; i < tok.Text.Length; i++)
            {
                char ch = tok.Text[i];
                if (!pairChars.Contains(ch))
                    continue;

                string charStr = ch.ToString();

                // SBA content goes to the study bible inventory exclusively
                if (studyBibleInventory != null && tok.IsStudyBibleContent)
                {
                    studyBibleInventory.GetValue(charStr).AddReference(tok.VerseRef);
                    continue;
                }

                // Non-verse tokens go to the non-verse inventory when separation is active
                bool isNonVerseToken = tok.TextType != TextType.Verse && nonVerseInventory != null;

                if (!isNonVerseToken && !tok.IsStudyBibleContent)
                {
                    primaryInventory.GetValue(charStr).AddReference(tok.VerseRef);
                }

                if (
                    nonVerseInventory != null
                    && tok.TextType != TextType.Verse
                    && !tok.IsStudyBibleContent
                )
                {
                    nonVerseInventory.GetValue(charStr).AddReference(tok.VerseRef);
                }
            }
        }
    }

    /// <summary>
    /// Converts a TextInventory into a list of InventoryItemData records with
    /// sorted references, counts, and mapped statuses.
    /// </summary>
    private static List<InventoryItemData> BuildItemsFromInventory(TextInventory textInventory)
    {
        return textInventory
            .Select(kvp =>
            {
                var references = kvp.Value.References.Select(r => r.VerseBCV).ToList();
                references.Sort();

                var status = MapStatus(textInventory.GetStatus(kvp.Key));

                return new InventoryItemData
                {
                    Text = kvp.Key,
                    Counts = new Dictionary<string, int> { ["combined"] = kvp.Value.Count },
                    Statuses = new Dictionary<string, ItemStatus> { ["combined"] = status },
                    References = references,
                    TotalCount = kvp.Value.Count,
                };
            })
            .ToList();
    }

    /// <summary>
    /// Maps ParatextData TextInventory.ItemStatus to the PT10 ItemStatus enum.
    /// </summary>
    private static ItemStatus MapStatus(TextInventory.ItemStatus status) =>
        status switch
        {
            TextInventory.ItemStatus.good => ItemStatus.Valid,
            TextInventory.ItemStatus.bad => ItemStatus.Invalid,
            _ => ItemStatus.Unknown,
        };

    /// <summary>
    /// Determines whether the inventory setup is complete. Setup is complete when
    /// there are 10 or fewer unknown items, or at least 90% of items are categorized.
    /// </summary>
    private static bool ComputeSetupComplete(List<InventoryItemData> items)
    {
        if (items.Count == 0)
            return true;

        int unknownCount = items.Count(item =>
            item.Statuses.Values.Any(s => s == ItemStatus.Unknown)
        );

        if (unknownCount <= 10)
            return true;

        double categorizedPercent = (double)(items.Count - unknownCount) / items.Count;
        return categorizedPercent >= 0.9;
    }
}
