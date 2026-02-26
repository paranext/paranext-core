using Paranext.DataProvider.Projects;
using Paratext.Checks;
using Paratext.Checks.Checks;
using Paratext.Data;
using Paratext.Data.Filters;
using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

using static Paratext.Checks.InventoryTextType;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Checking/InventoryForm.cs:386-521
// Method: InventoryForm.BuildInventory()
// Maps to: EXT-001, CAP-002
// EXPLANATION:
// The PT9 matched pairs inventory shows ALL pair punctuation characters found in
// the text (both matched and unmatched), not just error cases. However,
// MatchedPairsCheck.GetReferences() only returns unmatched/error pairs (matched
// pairs are removed from the stack). Therefore, we supplement the standard
// TextInventory.ProcessTokens (which uses GetReferences for error tracking) with
// a direct scan of text tokens for all configured pair punctuation characters.
// This ensures the inventory contains every pair character for user categorization.
/// <summary>
/// Service for building matched pairs inventory from scripture text.
/// Orchestrates the 4-way branching logic (Regular/SBA x Separated/NonSeparated)
/// and serializes results into InventoryBuildResult.
/// </summary>
internal static class InventoryBuildService
{
    private const string MatchedPairsInventoryId = "MatchedPairs";

    // === NEW IN PT10 ===
    // Reason: PAPI command pattern - thin wrapper around PT9 BuildInventory logic
    // Maps to: CAP-002
    /// <summary>
    /// Builds the matched pairs inventory for the specified project.
    /// </summary>
    /// <param name="projectId">Project identifier</param>
    /// <param name="isSba">Whether project is Study Bible Additions</param>
    /// <param name="isSeparated">Whether verse/non-verse separation is enabled</param>
    /// <param name="paratextProjects">Project lookup service</param>
    /// <returns>InventoryBuildResult with populated inventory items</returns>
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
            var scrText = LocalParatextProjects.GetParatextProject(projectId);
            var dataSource = new ChecksDataSource(scrText)
            {
                SelectedPassageSet = new SelectedPassages(scrText.Settings.BooksPresentSet),
            };
            // ChecksDataSource may change the ScrText
            scrText = dataSource.ScrText;

            var inventory = InventoryFactory.CreateInventory(MatchedPairsInventoryId, dataSource);

            // Set the separated flag on the inventory to control branching
            inventory.SetVerseAndNonVerseSeparately = isSeparated;

            if (isSba)
            {
                dataSource.SbaContentOnly = false;
            }

            // Parse configured pair characters for direct token scanning
            MatchedPairsCheck.ParsePunctPairs(
                dataSource.GetParameterValue("Pairs"),
                out var openingPuncts,
                out var closingPuncts,
                out _
            );
            var pairChars = new HashSet<char>(openingPuncts);
            pairChars.UnionWith(closingPuncts);

            // Create TextInventory objects for each text type
            var verseTextInventory = new TextInventory(VerseText);
            var nonVerseTextInventory = new TextInventory(NonVerseText);
            var regularTextInventory = new TextInventory(RegularContent);
            var studyBibleTextInventory = new TextInventory(StudyBibleContent);
            var combinedTextInventory = new TextInventory(AllText);

            // Process tokens for each chapter
            foreach (SelectedChapter chapter in dataSource.SelectedPassageSet.SelectedChapters)
            {
                dataSource.GetText(
                    chapter.BookNum,
                    chapter.ChapterNum,
                    inventory.NeededFormat | CheckDataFormat.TextTokens
                );
                var textTokens = dataSource.TextTokens.ToList();

                // Also call ProcessTokens so GetReferences populates occurrenceCounts
                // in ScriptureInventoryBase (needed for RecalculateStatus)
                if (isSba)
                {
                    if (isSeparated)
                    {
                        verseTextInventory.ProcessTokens(
                            textTokens,
                            dataSource,
                            inventory,
                            chapter
                        );
                        nonVerseTextInventory.ProcessTokens(
                            textTokens,
                            dataSource,
                            inventory,
                            chapter
                        );
                        studyBibleTextInventory.ProcessTokens(
                            textTokens,
                            dataSource,
                            inventory,
                            chapter
                        );
                        InventoryPairCharacters(
                            textTokens,
                            pairChars,
                            verseTextInventory,
                            nonVerseTextInventory,
                            null,
                            studyBibleTextInventory
                        );
                    }
                    else
                    {
                        regularTextInventory.ProcessTokens(
                            textTokens,
                            dataSource,
                            inventory,
                            chapter
                        );
                        studyBibleTextInventory.ProcessTokens(
                            textTokens,
                            dataSource,
                            inventory,
                            chapter
                        );
                        InventoryPairCharacters(
                            textTokens,
                            pairChars,
                            regularTextInventory,
                            null,
                            null,
                            studyBibleTextInventory
                        );
                    }
                }
                else if (isSeparated)
                {
                    verseTextInventory.ProcessTokens(textTokens, dataSource, inventory, chapter);
                    nonVerseTextInventory.ProcessTokens(textTokens, dataSource, inventory, chapter);
                    InventoryPairCharacters(
                        textTokens,
                        pairChars,
                        verseTextInventory,
                        nonVerseTextInventory,
                        null,
                        null
                    );
                }
                else
                {
                    combinedTextInventory.ProcessTokens(textTokens, dataSource, inventory, chapter);
                    InventoryPairCharacters(
                        textTokens,
                        pairChars,
                        combinedTextInventory,
                        null,
                        null,
                        null
                    );
                }
            }

            // Recalculate statuses and combine inventories
            bool versePopulated = false;
            bool nonVersePopulated = false;
            bool regularPopulated = false;
            bool studyBiblePopulated = false;
            bool combinedIsMerge = false;

            if (isSba)
            {
                if (isSeparated)
                {
                    verseTextInventory.RecalculateStatus(inventory);
                    nonVerseTextInventory.RecalculateStatus(inventory);
                    regularTextInventory.Combine(verseTextInventory, nonVerseTextInventory);
                    versePopulated = true;
                    nonVersePopulated = true;
                }
                regularTextInventory.RecalculateStatus(inventory);
                studyBibleTextInventory.RecalculateStatus(inventory);
                combinedTextInventory.Combine(regularTextInventory, studyBibleTextInventory);
                regularPopulated = true;
                studyBiblePopulated = true;
                combinedIsMerge = true;
            }
            else if (isSeparated)
            {
                verseTextInventory.RecalculateStatus(inventory);
                nonVerseTextInventory.RecalculateStatus(inventory);
                combinedTextInventory.Combine(verseTextInventory, nonVerseTextInventory);
                versePopulated = true;
                nonVersePopulated = true;
                combinedIsMerge = true;
            }
            else
            {
                combinedTextInventory.RecalculateStatus(inventory);
            }

            // Build items from the combined inventory
            var items = BuildItemsFromInventory(combinedTextInventory);

            // Compute setup completeness
            bool setupComplete = ComputeSetupComplete(items);

            return new InventoryBuildResult
            {
                Success = true,
                Items = items,
                VersePopulated = versePopulated,
                NonVersePopulated = nonVersePopulated,
                RegularPopulated = regularPopulated,
                StudyBiblePopulated = studyBiblePopulated,
                CombinedIsMerge = combinedIsMerge,
                SetupComplete = setupComplete,
            };
        }
        catch (Exception ex)
        {
            return new InventoryBuildResult { Success = false, Error = ex.Message };
        }
    }

    // === NEW IN PT10 ===
    // Reason: MatchedPairsCheck.GetReferences() only returns unmatched pairs, but
    // the inventory must contain ALL pair punctuation characters found in text.
    // This supplementary scan adds every configured pair character to the appropriate
    // TextInventory objects, respecting InventoryTextType filtering.
    // Maps to: CAP-002
    // EXPLANATION:
    // For each text token, we scan for configured pair punctuation characters.
    // We add each found character to the appropriate TextInventory based on the
    // token's TextType and IsStudyBibleContent properties, mirroring the
    // SkipToken logic in TextInventory.ProcessTokens. Characters already added
    // by ProcessTokens (unmatched errors) will have their counts incremented
    // via GetValue which returns the existing TextInventoryItem.
    private static void InventoryPairCharacters(
        List<ITextToken> textTokens,
        HashSet<char> pairChars,
        TextInventory primaryInventory,
        TextInventory? nonVerseInventory,
        TextInventory? regularInventory,
        TextInventory? studyBibleInventory
    )
    {
        foreach (var tok in textTokens)
        {
            if (tok.TextType == TextType.ChapterNumber || tok.TextType == TextType.VerseNumber)
                continue;

            for (int i = 0; i < tok.Text.Length; i++)
            {
                char cc = tok.Text[i];
                if (!pairChars.Contains(cc))
                    continue;

                string charStr = cc.ToString();

                // Add to study bible inventory if SBA content
                if (studyBibleInventory != null && tok.IsStudyBibleContent)
                {
                    studyBibleInventory.GetValue(charStr).AddReference(tok.VerseRef);
                    continue;
                }

                // Add to primary inventory (AllText, VerseText, or RegularContent)
                // Respect InventoryTextType filtering:
                // - If nonVerseInventory exists, primary is VerseText: skip non-verse tokens
                // - RegularContent skips SBA content (already handled above)
                if (primaryInventory != null)
                {
                    if (tok.TextType != TextType.Verse && nonVerseInventory != null)
                    {
                        // Token is non-verse and we have a nonVerse inventory
                        // Don't add to verse inventory (primary = VerseText)
                    }
                    else if (!tok.IsStudyBibleContent || regularInventory == null)
                    {
                        primaryInventory.GetValue(charStr).AddReference(tok.VerseRef);
                    }
                }

                // Add to non-verse inventory if applicable
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

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/InventoryForm.cs (inventory data extraction)
    // Maps to: BHV-116, BHV-128, BHV-129
    private static List<InventoryItemData> BuildItemsFromInventory(TextInventory textInventory)
    {
        var items = new List<InventoryItemData>();

        foreach (var kvp in textInventory)
        {
            string key = kvp.Key;
            TextInventoryItem item = kvp.Value;

            // Build sorted references list (BBBCCCVVV format)
            var references = new List<int>();
            foreach (var detailedCount in item.References)
            {
                references.Add(detailedCount.VerseBCV);
            }
            references.Sort();

            // Build counts dictionary with "combined" key
            var counts = new Dictionary<string, int> { ["combined"] = item.Count };

            // Build statuses dictionary with status from inventory
            var status = MapStatus(textInventory.GetStatus(key));
            var statuses = new Dictionary<string, ItemStatus> { ["combined"] = status };

            items.Add(
                new InventoryItemData
                {
                    Text = key,
                    Counts = counts,
                    Statuses = statuses,
                    References = references,
                    TotalCount = item.Count,
                }
            );
        }

        return items;
    }

    // === NEW IN PT10 ===
    // Reason: Maps ParatextData TextInventory.ItemStatus to PT10 ItemStatus enum
    // Maps to: CAP-002
    private static ItemStatus MapStatus(TextInventory.ItemStatus status)
    {
        return status switch
        {
            TextInventory.ItemStatus.good => ItemStatus.Valid,
            TextInventory.ItemStatus.bad => ItemStatus.Invalid,
            _ => ItemStatus.Unknown,
        };
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/InventoryForm.cs (setup complete logic)
    // Maps to: BHV-109, INV-006
    private static bool ComputeSetupComplete(List<InventoryItemData> items)
    {
        if (items.Count == 0)
            return true;

        int unknownCount = 0;
        foreach (var item in items)
        {
            if (item.Statuses.Values.Any(s => s == ItemStatus.Unknown))
                unknownCount++;
        }

        // Setup is complete if 10 or fewer unknowns OR >= 90% categorized
        if (unknownCount <= 10)
            return true;

        double categorizedPercent = (double)(items.Count - unknownCount) / items.Count;
        return categorizedPercent >= 0.9;
    }
}
