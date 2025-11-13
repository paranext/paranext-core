using Paranext.DataProvider.Projects;
using Paratext.Checks;
using Paratext.Checks.Checks;
using Paratext.Data;
using Paratext.Data.Filters;
using Paratext.Data.Find;
using SIL.Linq;
using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

using static InventoryTextType;

/// <summary>
/// Represents the state needed to build and summarize an inventory for a specific project and set
/// of input ranges. The state is also needed to produce itemized inventory results.
/// </summary>
internal sealed class InventoryWorker
{
    private readonly object _lock = new();
    private bool _inventoryBuilt = false;
    private readonly Dictionary<InventoryTextType, TextInventory> _summarizedInventoriesByType = [];
    private readonly ScriptureInventoryBase _inventory;
    private readonly ScrText _scrText;
    private readonly ChecksDataSource _dataSource;
    private readonly InputRange[] _inputRanges;
    private readonly InputRangesFilter<TextInventoryItem> _inputRangesFilter;

    /// <summary>
    /// Placeholder for the selected chapter.
    /// <br/>
    /// This is a parameter of TextInventory.ProcessTokens() but isn't used inside the function.
    /// InventoryForm.cs iterates by chapter, but that isn't necessary and would require
    /// iterating through the scrText to find how many chapters are in each book.
    /// </summary>
    private SelectedChapter _selectedChapterPlaceholder = new();

    public InventoryWorker(string inventoryId, InputRange[] inputRanges)
    {
        ArgumentException.ThrowIfNullOrEmpty(inventoryId);
        ArgumentNullException.ThrowIfNull(inputRanges);
        if (inputRanges.Length == 0)
            throw new ArgumentException("inputRanges must contain at least one range");

        InventoryId = inventoryId;
        ProjectId = inputRanges[0].ProjectId;
        _inputRanges = inputRanges;
        _dataSource = new ChecksDataSource(LocalParatextProjects.GetParatextProject(ProjectId))
        {
            SelectedPassageSet = new SelectedPassages(
                new BookSet(inputRanges.Select(range => range.Start.BookNum).Distinct())
            ),
        };
        // It is possible for ChecksDataSource to change the ScrText
        _scrText = _dataSource.ScrText;
        _inventory = InventoryFactory.CreateInventory(inventoryId, _dataSource);
        _inputRangesFilter = new InputRangesFilter<TextInventoryItem>(
            inputRanges,
            item =>
            {
                return item.References.Select(@ref => new VerseRef(@ref.VerseBCV, Versification));
            }
        );

        _summarizedInventoriesByType[AllText] = new TextInventory(AllText);
        _summarizedInventoriesByType[VerseText] = new TextInventory(VerseText);
        _summarizedInventoriesByType[NonVerseText] = new TextInventory(NonVerseText);
        _summarizedInventoriesByType[RegularContent] = new TextInventory(RegularContent);
        _summarizedInventoriesByType[StudyBibleContent] = new TextInventory(StudyBibleContent);
    }

    /// <summary>
    /// The ID of the inventory being processed.
    /// </summary>
    public string InventoryId { get; init; }

    /// <summary>
    /// The ID of the project being processed.
    /// </summary>
    public string ProjectId { get; init; }

    /// <summary>
    /// Indicates whether the project contains Study Bible additions.
    /// </summary>
    private bool IsStudyBibleAdditions
    {
        get => _scrText.Settings.IsStudyBibleAdditions;
    }

    /// <summary>
    /// The versification used by the project.
    /// </summary>
    private ScrVers Versification
    {
        get => _scrText.Settings.Versification;
    }

    /// <summary>
    /// Indicates whether summarized inventory results should be reported separately for verse and
    /// non-verse text. Note that itemized inventory results are always aggregated.
    /// </summary>
    private bool SeparateVerseAndNonVerseText
    {
        get => _inventory.SetVerseAndNonVerseSeparately ?? false;
    }

    // Adapted from various pieces of code in InventoryForm.cs in Paratext 9
    public List<SummarizedInventoryItemList> GetInventorySummary()
    {
        lock (_lock)
        {
            if (!_inventoryBuilt)
                BuildInventory();

            var retVal = new List<SummarizedInventoryItemList>();

            // Prepare which types of text to include in summary based on project settings
            if (IsStudyBibleAdditions)
            {
                if (SeparateVerseAndNonVerseText)
                {
                    retVal.Add(new(VerseText));
                    retVal.Add(new(NonVerseText));
                }
                else
                {
                    retVal.Add(new(RegularContent));
                }
                retVal.Add(new(StudyBibleContent));
            }
            else if (SeparateVerseAndNonVerseText)
            {
                retVal.Add(new(VerseText));
                retVal.Add(new(NonVerseText));
            }
            else
            {
                retVal.Add(new(AllText));
            }

            // Filter counts by input ranges and prepare return value
            foreach (var list in retVal)
            {
                var textInventory = _summarizedInventoriesByType[list.TextType];
                foreach (var item in textInventory)
                {
                    list.Items.Add(
                        new(
                            item.Key,
                            item.Value.GetFilteredCount(_inputRangesFilter, Versification)
                        )
                    );
                }
            }
            return retVal;
        }
    }

    public void RunItemizedInventoryJob(ItemizedInventoryJobStatus job)
    {
        lock (_lock)
        {
            if (job.StopRequested)
                return;

            if (!_inventoryBuilt)
                BuildInventory();

            var finder = new TextInventoryItemInstanceFinder(
                _scrText,
                _dataSource,
                _inventory,
                AllText,
                _inputRangesFilter
            );
            var allTextInventory = _summarizedInventoriesByType[AllText];
            if (!allTextInventory.TryGetValue(job.JobScope.Key, out var itemToFind))
                throw new KeyNotFoundException(
                    $"Item \"{job.JobScope.Key}\" not found in inventory for project {ProjectId}"
                );
            int onItem = 0;
            var finalList = finder.Find(
                itemToFind,
                0,
                out bool maxExceeded,
                () => job.StopRequested,
                results =>
                {
                    job.AppendResults(ConvertToItemizedInventoryItems(results, onItem));
                    onItem = results.Count;
                    job.PercentComplete = Math.Round(
                        100.0 * job.AllResults.TotalCountAdded / itemToFind.Count,
                        0
                    );
                }
            );

            // The "earlyUpdate" function passed to "Find" only works in discrete batch sizes,
            // leaving any remaining items to be processed here
            if (onItem < finalList.Count)
                job.AppendResults(ConvertToItemizedInventoryItems(finalList, onItem));

            // In some cases the percent complete may not reach 100 in the updates above
            job.PercentComplete = 100.0;
        }
    }

    private static List<ItemizedInventoryItem> ConvertToItemizedInventoryItems(
        List<VerseListItem> instances,
        int startingIndex
    )
    {
        var retVal = new List<ItemizedInventoryItem>();
        int onItem = startingIndex;
        for (; onItem < instances.Count; onItem++)
        {
            var instance = instances[onItem];
            var verseRef = instance.VerseReference;
            if (verseRef == null)
                continue;
            retVal.Add(
                new ItemizedInventoryItem(
                    new UsfmLocation(verseRef.Value, instance.Selection.StartPosition),
                    instance.Selection.SelectedText,
                    instance.Message
                )
            );
        }
        return retVal;
    }

    // Adapted from InventoryForm.BuildInventory() in Paratext 9
    private void BuildInventory()
    {
        if (_inventoryBuilt)
            return;

        lock (_lock)
        {
            if (IsStudyBibleAdditions)
            {
                _dataSource.SbaContentOnly = false;
                _dataSource.MarkStudyBibleContent = _inventory is MarkerCheck;
            }

            _summarizedInventoriesByType.Values.ForEach(inventory => inventory.ClearInventory());

            foreach (var range in _inputRanges)
            {
                if (range.ProjectId != ProjectId)
                    throw new ArgumentException("All inputRanges must have the same projectId");

                // TextInventory requires TextTokens
                var requiredFormat = _inventory.NeededFormat | CheckDataFormat.TextTokens;

                // See if we only need to tokenize one chapter or all chapters (0 means all)
                int chapterToTokenize = 0;
                if (range.End.HasValue && range.End.Value.ChapterNum == range.Start.ChapterNum)
                    chapterToTokenize = range.Start.ChapterNum;

                // Now tokenize
                _dataSource.GetText(range.Start.BookNum, chapterToTokenize, requiredFormat);
                var textTokens = _dataSource.TextTokens.ToList();

                if (IsStudyBibleAdditions)
                {
                    if (SeparateVerseAndNonVerseText)
                    {
                        ProcessTokens(textTokens, VerseText);
                        ProcessTokens(textTokens, NonVerseText);
                        ProcessTokens(textTokens, StudyBibleContent);
                    }
                    else
                    {
                        ProcessTokens(textTokens, RegularContent);
                        ProcessTokens(textTokens, StudyBibleContent);
                    }
                }
                else if (SeparateVerseAndNonVerseText)
                {
                    ProcessTokens(textTokens, VerseText);
                    ProcessTokens(textTokens, NonVerseText);
                }
                else
                {
                    ProcessTokens(textTokens, AllText);
                }
            }

            // I think this is necessary to see which items are not allowed or denied but in the text
            if (IsStudyBibleAdditions)
            {
                if (SeparateVerseAndNonVerseText)
                {
                    _summarizedInventoriesByType[VerseText].RecalculateStatus(_inventory);
                    _summarizedInventoriesByType[NonVerseText].RecalculateStatus(_inventory);
                    _summarizedInventoriesByType[RegularContent]
                        .Combine(
                            _summarizedInventoriesByType[VerseText],
                            _summarizedInventoriesByType[NonVerseText]
                        );
                }
                _summarizedInventoriesByType[RegularContent].RecalculateStatus(_inventory);
                _summarizedInventoriesByType[StudyBibleContent].RecalculateStatus(_inventory);
                _summarizedInventoriesByType[AllText]
                    .Combine(
                        _summarizedInventoriesByType[RegularContent],
                        _summarizedInventoriesByType[StudyBibleContent]
                    );
            }
            else if (SeparateVerseAndNonVerseText)
            {
                _summarizedInventoriesByType[VerseText].RecalculateStatus(_inventory);
                _summarizedInventoriesByType[NonVerseText].RecalculateStatus(_inventory);
                _summarizedInventoriesByType[AllText]
                    .Combine(
                        _summarizedInventoriesByType[VerseText],
                        _summarizedInventoriesByType[NonVerseText]
                    );
            }
            else
            {
                _summarizedInventoriesByType[AllText].RecalculateStatus(_inventory);
            }

            _inventoryBuilt = true;
        }
    }

    private void ProcessTokens(IEnumerable<ITextToken> tokens, InventoryTextType textType)
    {
        _summarizedInventoriesByType[textType]
            .ProcessTokens(tokens, _dataSource, _inventory, _selectedChapterPlaceholder);
    }
}
