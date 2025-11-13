using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.Projects;
using Paratext.Checks;
using PtxUtils;

namespace Paranext.DataProvider.Checks;

internal sealed class InventoryDataProvider(
    PapiClient papiClient,
    LocalParatextProjects paratextProjects
)
    : NetworkObjects.DataProvider(
        "platformScripture.inventoryDataProvider",
        papiClient,
        NetworkObjectType.DATA_PROVIDER
    )
{
    #region Constants

    private const string DATA_TYPE_INVENTORY_STATUS = "InventoryItemStatus";
    private const string DATA_TYPE_INVENTORY_OPTION_VALUES = "InventoryOptionValues";

    #endregion

    #region Member variables

    private readonly LocalParatextProjects _paratextProjects = paratextProjects;
    private readonly Dictionary<string, InventoryDetails> _inventoryDetailsByInventoryId = [];
    private readonly List<InventoryDetails> _availableInventories = [];
    private readonly ConcurrentDictionary<string, InventoryWorker> _inventoryWorkersBySummaryId =
    [];
    private readonly ConcurrentDictionary<
        string,
        ItemizedInventoryJobStatus
    > _activeItemizedInventoryJobsByJobId = [];
    private readonly JsonSerializerOptions _serializationOptions =
        SerializationOptions.CreateSerializationOptions();

    #endregion

    #region DataProvider methods

    // Must provide all functions that are part of IInventoryDataProvider in TS
    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            ("abandonItemizedInventoryJob", AbandonItemizedInventoryJob),
            ("beginItemizedInventoryJob", BeginItemizedInventoryJob),
            ("buildInventorySummary", BuildInventorySummary),
            ("discardInventorySummary", DiscardInventorySummary),
            ("getAvailableInventories", GetAvailableInventories),
            ("getInventoryItemStatus", GetInventoryItemStatus),
            ("getInventoryOptionValues", GetInventoryOptionValues),
            ("retrieveItemizedInventoryJobUpdate", RetrieveItemizedInventoryJobUpdate),
            ("setInventoryItemStatus", SetInventoryItemStatus),
            ("setInventoryOptionValues", SetInventoryOptionValues),
            ("stopItemizedInventoryJob", StopItemizedInventoryJob),
        ];
    }

    protected override Task StartDataProviderAsync()
    {
        // Inventory options require a real Settings.xml file to be enumerated
        // We aren't looking for any settings values here, so we don't care about the project data
        var anyProjectDetails = _paratextProjects.GetAllProjectDetails().FirstOrDefault();
        if (anyProjectDetails == null)
        {
            Console.WriteLine("No Paratext projects found; InventoryDataProvider not started.");
            return Task.CompletedTask;
        }

        var scrText = LocalParatextProjects.GetParatextProject(anyProjectDetails.Metadata.Id);
        var dataSource = new ChecksDataSource(scrText);
        foreach (var inventoryId in InventoryFactory.GetAvailableInventoryIds())
        {
            _inventoryDetailsByInventoryId[inventoryId] = new InventoryDetails(
                InventoryFactory.CreateInventory(inventoryId, dataSource)
            );
        }

        _availableInventories.AddRange(_inventoryDetailsByInventoryId.Values);

        return Task.CompletedTask;
    }

    #endregion

    #region InventoryDataProvider methods

    private List<InventoryDetails> GetAvailableInventories(JsonElement _ignore)
    {
        return _availableInventories;
    }

    private List<InventoryItemStatus> GetInventoryItemStatus(InventoryItemStatusSelector selector)
    {
        ArgumentException.ThrowIfNullOrEmpty(selector.ProjectId);
        ArgumentException.ThrowIfNullOrEmpty(selector.InventoryId);

        var inventory = InventoryFactory.CreateInventory(
            selector.InventoryId,
            new ChecksDataSource(LocalParatextProjects.GetParatextProject(selector.ProjectId))
        );

        var allItemsStatus = new List<InventoryItemStatus>();
        if (selector.TextType == InventoryTextType.NonVerseText)
        {
            AddItemStatus(inventory, inventory.NonVerseValidItems, true, allItemsStatus);
            AddItemStatus(inventory, inventory.NonVerseInvalidItems, false, allItemsStatus);
        }
        else if (selector.TextType == InventoryTextType.StudyBibleContent)
        {
            AddItemStatus(inventory, inventory.StudyBibleValidItems, true, allItemsStatus);
            AddItemStatus(inventory, inventory.StudyBibleInvalidItems, false, allItemsStatus);
        }
        // Default to standard scripture inventory items for all other text types (same as P9)
        else
        {
            AddItemStatus(inventory, inventory.ValidItems, true, allItemsStatus);
            AddItemStatus(inventory, inventory.InvalidItems, false, allItemsStatus);
        }

        if (!string.IsNullOrEmpty(selector.Key))
        {
            var item = allItemsStatus.Find((kvp) => kvp.Key == selector.Key);
            return (item == default) ? [] : [item];
        }
        return allItemsStatus;
    }

    private bool SetInventoryItemStatus(InventoryItemStatusSelector selector, JsonElement status)
    {
        ArgumentException.ThrowIfNullOrEmpty(selector.ProjectId);
        ArgumentException.ThrowIfNullOrEmpty(selector.InventoryId);

        var inventory = InventoryFactory.CreateInventory(
            selector.InventoryId,
            new ChecksDataSource(LocalParatextProjects.GetParatextProject(selector.ProjectId))
        );

        // No key was provided, so we were given an array of all items with their statuses
        if (string.IsNullOrEmpty(selector.Key))
        {
            var items =
                JsonSerializer.Deserialize<List<InventoryItemStatus>>(status, _serializationOptions)
                ?? throw new ArgumentException(
                    $"Status must be an array when no key is provided (projectId: {selector.ProjectId}, inventoryId: {selector.InventoryId})"
                );

            var validHashSet = new HashSet<string>();
            var invalidHashSet = new HashSet<string>();
            var intersection = new HashSet<string>();
            foreach (var item in items)
            {
                if (item.IsValid)
                {
                    if (invalidHashSet.Contains(item.Key))
                        intersection.Add(item.Key);
                    else
                        validHashSet.Add(item.Key);
                }
                else
                {
                    if (validHashSet.Contains(item.Key))
                        intersection.Add(item.Key);
                    else
                        invalidHashSet.Add(item.Key);
                }
            }

            if (intersection.Count > 0)
            {
                throw new ArgumentException(
                    $"The inventory item(s) \"{string.Join(", ", intersection)}\" cannot be both valid and invalid (projectId: {selector.ProjectId}, inventoryId: {selector.InventoryId})"
                );
            }

            var validItems = HashSetToString(validHashSet);
            var invalidItems = HashSetToString(invalidHashSet);

            if (selector.TextType == InventoryTextType.NonVerseText)
            {
                inventory.NonVerseValidItems = validItems;
                inventory.NonVerseInvalidItems = invalidItems;
            }
            else if (selector.TextType == InventoryTextType.StudyBibleContent)
            {
                inventory.StudyBibleValidItems = validItems;
                inventory.StudyBibleInvalidItems = invalidItems;
            }
            // Default to standard scripture inventory items for all other text types (same as P9)
            else
            {
                inventory.ValidItems = validItems;
                inventory.InvalidItems = invalidItems;
            }
        }
        // A single key was provided, so just update that one item
        else
        {
            bool? isValid = status.ValueKind switch
            {
                JsonValueKind.True => true,
                JsonValueKind.False => false,
                JsonValueKind.Null => null,
                _ => throw new ArgumentException(
                    $"Status must be true, false, or null when a key is provided (key: {selector.Key}, projectId: {selector.ProjectId}, inventoryId: {selector.InventoryId})"
                ),
            };
            if (selector.TextType == InventoryTextType.NonVerseText)
            {
                var validItems = inventory.NonVerseValidItems;
                var invalidItems = inventory.NonVerseInvalidItems;
                UpdateLists(inventory, selector.Key, isValid, ref validItems, ref invalidItems);
                inventory.NonVerseValidItems = validItems;
                inventory.NonVerseInvalidItems = invalidItems;
            }
            else if (selector.TextType == InventoryTextType.StudyBibleContent)
            {
                var validItems = inventory.StudyBibleValidItems;
                var invalidItems = inventory.StudyBibleInvalidItems;
                UpdateLists(inventory, selector.Key, isValid, ref validItems, ref invalidItems);
                inventory.StudyBibleValidItems = validItems;
                inventory.StudyBibleInvalidItems = invalidItems;
            }
            // Default to standard scripture inventory items for all other text types (same as P9)
            else
            {
                var validItems = inventory.ValidItems;
                var invalidItems = inventory.InvalidItems;
                UpdateLists(inventory, selector.Key, isValid, ref validItems, ref invalidItems);
                inventory.ValidItems = validItems;
                inventory.InvalidItems = invalidItems;
            }
        }

        inventory.Save();
        SendDataUpdateEvent(DATA_TYPE_INVENTORY_STATUS, "updated inventory status");
        return true;
    }

    private List<InventoryOptionValue> GetInventoryOptionValues(InventoryOptionsSelector selector)
    {
        ArgumentException.ThrowIfNullOrEmpty(selector.ProjectId);
        ArgumentException.ThrowIfNullOrEmpty(selector.InventoryId);

        var inventory = InventoryFactory.CreateInventory(
            selector.InventoryId,
            new ChecksDataSource(LocalParatextProjects.GetParatextProject(selector.ProjectId))
        );
        var inventoryOptions = inventory.InventoryOptions ?? [];
        var scrText = LocalParatextProjects.GetParatextProject(selector.ProjectId);
        var inventoryDetails = _inventoryDetailsByInventoryId[selector.InventoryId];
        var retVal = new List<InventoryOptionValue>();

        if (!string.IsNullOrEmpty(selector.OptionName))
        {
            var option =
                inventoryOptions.Find(option => option.Name == selector.OptionName)
                ?? throw new ArgumentException(
                    $"Invalid option name: {selector.OptionName} (projectId: {selector.ProjectId}, inventoryId: {selector.InventoryId})"
                );

            var details =
                inventoryDetails.Options.Find(option => option.OptionName == selector.OptionName)
                ?? throw new ArgumentException(
                    $"Invalid option name: {selector.OptionName} (projectId: {selector.ProjectId}, inventoryId: {selector.InventoryId})"
                );

            retVal.Add(
                new InventoryOptionValue
                {
                    OptionName = option.Name,
                    OptionValue = details.DeserializeValue(option.GetValue(scrText)),
                }
            );
        }
        else
        {
            var detailsList = inventoryDetails.Options;
            foreach (var option in inventoryOptions)
            {
                var details =
                    detailsList.Find(detail => detail.OptionName == option.Name)
                    ?? throw new ArgumentException(
                        $"Invalid option name: {option.Name} (projectId: {selector.ProjectId}, inventoryId: {selector.InventoryId})"
                    );

                retVal.Add(
                    new InventoryOptionValue
                    {
                        OptionName = option.Name,
                        OptionValue = details.DeserializeValue(option.GetValue(scrText)),
                    }
                );
            }
        }

        return retVal;
    }

    private bool SetInventoryOptionValues(InventoryOptionsSelector selector, JsonElement values)
    {
        ArgumentException.ThrowIfNullOrEmpty(selector.ProjectId);
        ArgumentException.ThrowIfNullOrEmpty(selector.InventoryId);

        var inventory = InventoryFactory.CreateInventory(
            selector.InventoryId,
            new ChecksDataSource(LocalParatextProjects.GetParatextProject(selector.ProjectId))
        );
        var inventoryOptions = inventory.InventoryOptions ?? [];
        var scrText = LocalParatextProjects.GetParatextProject(selector.ProjectId);
        var inventoryDetails = _inventoryDetailsByInventoryId[selector.InventoryId];

        if (!string.IsNullOrEmpty(selector.OptionName))
        {
            var option =
                inventoryOptions.Find(option => option.Name == selector.OptionName)
                ?? throw new ArgumentException(
                    $"Invalid option name: {selector.OptionName} (projectId: {selector.ProjectId}, inventoryId: {selector.InventoryId})"
                );

            var details =
                inventoryDetails.Options.Find(option => option.OptionName == selector.OptionName)
                ?? throw new ArgumentException(
                    $"Invalid option name: {selector.OptionName} (projectId: {selector.ProjectId}, inventoryId: {selector.InventoryId})"
                );

            var deserializedValue = JsonSerializer.Deserialize<object?>(
                values,
                _serializationOptions
            );
            if (deserializedValue == null)
                scrText.Settings.RemoveSetting(option.Name);
            else
                scrText.Settings.SetSetting(option.Name, details.SerializeValue(deserializedValue));
        }
        else
        {
            var valuesList =
                JsonSerializer.Deserialize<List<InventoryOptionValue>>(
                    values,
                    _serializationOptions
                )
                ?? throw new ArgumentException(
                    $"Values must be an array when no option name is provided (projectId: {selector.ProjectId}, inventoryId: {selector.InventoryId})"
                );

            foreach (var value in valuesList)
            {
                var option =
                    inventoryOptions.Find(option => option.Name == value.OptionName)
                    ?? throw new ArgumentException(
                        $"Invalid option name: {value.OptionName} (projectId: {selector.ProjectId}, inventoryId: {selector.InventoryId})"
                    );

                var details =
                    inventoryDetails.Options.Find(option => option.OptionName == value.OptionName)
                    ?? throw new ArgumentException(
                        $"Invalid option name: {value.OptionName} (projectId: {selector.ProjectId}, inventoryId: {selector.InventoryId})"
                    );

                if (value.OptionValue == null)
                    scrText.Settings.RemoveSetting(option.Name);
                else
                    scrText.Settings.SetSetting(
                        option.Name,
                        details.SerializeValue(value.OptionValue)
                    );
            }
        }

        scrText.Settings.Save(true);
        SendDataUpdateEvent(DATA_TYPE_INVENTORY_OPTION_VALUES, "updated inventory option values");
        return true;
    }

    public SummarizedInventory BuildInventorySummary(string inventoryId, InputRange[] inputRanges)
    {
        // InventoryWorker handles parameter validation
        var worker = new InventoryWorker(inventoryId, inputRanges);
        var retVal = new SummarizedInventory
        {
            InventoryId = inventoryId,
            ProjectId = worker.ProjectId,
            InventoryCountLists = worker.GetInventorySummary(),
        };
        _inventoryWorkersBySummaryId[retVal.SummarizedInventoryId] = worker;
        return retVal;
    }

    public void DiscardInventorySummary(string inventorySummaryId)
    {
        ArgumentException.ThrowIfNullOrEmpty(inventorySummaryId);

        if (!_inventoryWorkersBySummaryId.TryRemove(inventorySummaryId, out _))
            throw new ArgumentException($"Inventory summary {inventorySummaryId} not found");
    }

    public string BeginItemizedInventoryJob(ItemizedInventoryJobScope jobScope)
    {
        var summaryId = jobScope.SummarizedInventoryId;
        if (!_inventoryWorkersBySummaryId.TryGetValue(summaryId, out var worker))
            throw new ArgumentException($"No inventory summary found for ID {summaryId}");

        var job = new ItemizedInventoryJobStatus(jobScope)
        {
            InventoryId = worker.InventoryId,
            ProjectId = worker.ProjectId,
            Key = jobScope.Key,
        };
        _activeItemizedInventoryJobsByJobId[job.JobId] = job;

        RunItemizedInventoryJob(job);
        return job.JobId;
    }

    // Default timeout should match CHECK_STOP_DEFAULT_TIMEOUT_MS in check.model.ts
    private bool StopItemizedInventoryJob(string jobId, int? timeoutMs = 2000)
    {
        var job =
            (_activeItemizedInventoryJobsByJobId.TryGetValue(jobId, out var x) ? x : null)
            ?? throw new Exception($"No active inventory job with ID {jobId} (stop)");
        job.StopRequested = true;
        // Poll until the job stops or the timeout expires
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();
        while (stopwatch.ElapsedMilliseconds < timeoutMs.GetValueOrDefault())
        {
            if (job.Status != ItemizedInventoryJobStatus.Running)
                return true;
            Thread.Sleep(100);
        }
        return job.Status != ItemizedInventoryJobStatus.Running;
    }

    public void AbandonItemizedInventoryJob(string jobId)
    {
        var job =
            (_activeItemizedInventoryJobsByJobId.TryGetValue(jobId, out var x) ? x : null)
            ?? throw new Exception($"No active inventory job with ID {jobId} (abandon)");
        job.StopRequested = true;
        if (!_activeItemizedInventoryJobsByJobId.TryRemove(jobId, out _))
            Console.WriteLine($"Failed to remove inventory job {jobId} from active jobs");
    }

    public ItemizedInventoryJobStatusReport RetrieveItemizedInventoryJobUpdate(
        string jobId,
        int maxResultsToInclude
    )
    {
        var job =
            (_activeItemizedInventoryJobsByJobId.TryGetValue(jobId, out var x) ? x : null)
            ?? throw new Exception($"No active inventory job with ID {jobId} (status)");
        return job.GenerateStatusReport(maxResultsToInclude);
    }

    #endregion

    #region Private Helper methods

    private void RunItemizedInventoryJob(ItemizedInventoryJobStatus job)
    {
        ThreadingUtils.RunTask(
            Task.Run(() =>
            {
                try
                {
                    if (job.StopRequested)
                    {
                        job.Status = ItemizedInventoryJobStatus.Stopped;
                        return;
                    }

                    job.Status = ItemizedInventoryJobStatus.Running;

                    var summaryId = job.JobScope.SummarizedInventoryId;
                    if (!_inventoryWorkersBySummaryId.TryGetValue(summaryId, out var worker))
                        throw new Exception($"No inventory summary found for ID {summaryId}");
                    worker.RunItemizedInventoryJob(job);

                    if (job.PercentComplete < 100.0 && job.StopRequested)
                        job.Status = ItemizedInventoryJobStatus.Stopped;
                }
                catch (Exception ex)
                {
                    job.Status = ItemizedInventoryJobStatus.Errored;
                    job.Error = ex.Message;
                }
                finally
                {
                    job.EndTimeUtc = DateTime.UtcNow;
                    if (job.Status == ItemizedInventoryJobStatus.Running)
                        job.Status = ItemizedInventoryJobStatus.Completed;
                }
            }),
            $"Inventory Results Job {job.JobId}"
        );
    }

    private static void AddItemStatus(
        ScriptureInventoryBase inventory,
        string items,
        bool isValid,
        List<InventoryItemStatus> list
    )
    {
        foreach (var item in inventory.StringToIEnumerable(items))
        {
            list.Add(new InventoryItemStatus(item, isValid));
        }
    }

    private static HashSet<string> IEnumerableToHashSet(
        IEnumerable<InventoryItemStatus> enumerable,
        Func<InventoryItemStatus, bool> filter
    )
    {
        return enumerable.Where(filter).Select(item => item.Key).ToHashSet();
    }

    // Adapted from Paratext.Checks.ScriptureInventoryBase.HashSetToString
    private static string HashSetToString(HashSet<string> set)
    {
        StringBuilder stringBuilder = new();
        foreach (string item in set)
        {
            if (item == " ")
            {
                stringBuilder.Insert(0, item + " ");
                continue;
            }

            if (stringBuilder.Length > 0)
            {
                stringBuilder.Append(' ');
            }

            stringBuilder.Append(StringUtils.QuoteSpaces(item));
        }

        return stringBuilder.ToString();
    }

    private static void UpdateLists(
        ScriptureInventoryBase inventory,
        string item,
        bool? isValid,
        ref string validList,
        ref string invalidList
    )
    {
        validList = RemoveFromList(inventory, validList, item);
        invalidList = RemoveFromList(inventory, invalidList, item);

        if (isValid.HasValue && isValid.Value)
        {
            HashSet<string> validItems = [.. inventory.StringToIEnumerable(validList), item];
            validList = HashSetToString(validItems);
        }
        else if (isValid.HasValue && !isValid.Value)
        {
            HashSet<string> invalidItems = [.. inventory.StringToIEnumerable(invalidList), item];
            invalidList = HashSetToString(invalidItems);
        }
    }

    private static string RemoveFromList(ScriptureInventoryBase inventory, string list, string item)
    {
        var items = new HashSet<string>(inventory.StringToIEnumerable(list));
        items.Remove(item);
        return HashSetToString(items);
    }

    #endregion
}
