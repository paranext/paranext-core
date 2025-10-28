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

    const string DATA_TYPE_INVENTORY_STATUS = "InventoryItemStatus";
    const string DATA_TYPE_INVENTORY_OPTION_VALUES = "InventoryOptionValues";

    #endregion

    #region Member variables

    private readonly LocalParatextProjects _paratextProjects = paratextProjects;

    private readonly InventoryCache _inventoryCache = new();

    private readonly Dictionary<string, InventoryDetails> _inventoryDetailsByInventoryId = new();

    private readonly List<InventoryDetails> _availableInventories = new();

    private readonly JsonSerializerOptions _serializationOptions =
        SerializationOptions.CreateSerializationOptions();

    #endregion

    #region DataProvider methods

    // Must provide all functions that are part of IInventoryDataProvider in TS
    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            ("getAvailableInventories", GetAvailableInventories),
            ("getInventoryItemStatus", GetInventoryItemStatus),
            ("getInventoryOptionValues", GetInventoryOptionValues),
            ("setInventoryItemStatus", SetInventoryItemStatus),
            ("setInventoryOptionValues", SetInventoryOptionValues),
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

        var inventory = _inventoryCache
            .GetInventoryForProject(selector.InventoryId, selector.ProjectId)
            .Inventory;

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

        var inventory = _inventoryCache
            .GetInventoryForProject(selector.InventoryId, selector.ProjectId)
            .Inventory;

        // No key was provided, so we were given an array of all items with their statuses
        if (string.IsNullOrEmpty(selector.Key))
        {
            var items =
                JsonSerializer.Deserialize<List<InventoryItemStatus>>(status, _serializationOptions)
                ?? throw new ArgumentException("Status must be an array when no key is provided");
            var validItems = HashSetToString(IEnumerableToHashSet(items, item => item.IsValid));
            var invalidItems = HashSetToString(IEnumerableToHashSet(items, item => !item.IsValid));

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
                    "Status must be true, false, or null when a key is provided"
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

        var inventory = _inventoryCache
            .GetInventoryForProject(selector.InventoryId, selector.ProjectId)
            .Inventory;
        var inventoryOptions = inventory.InventoryOptions ?? [];
        var scrText = LocalParatextProjects.GetParatextProject(selector.ProjectId);
        var inventoryDetails = _inventoryDetailsByInventoryId[selector.InventoryId];
        var retVal = new List<InventoryOptionValue>();

        if (!string.IsNullOrEmpty(selector.OptionName))
        {
            var option =
                inventoryOptions.Find(option => option.Name == selector.OptionName)
                ?? throw new ArgumentException("Invalid option name: " + selector.OptionName);

            var details =
                inventoryDetails.Options.Find(option => option.OptionName == selector.OptionName)
                ?? throw new ArgumentException("Invalid option name: " + selector.OptionName);

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
                    ?? throw new ArgumentException("Invalid option name: " + option.Name);

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

        var inventory = _inventoryCache
            .GetInventoryForProject(selector.InventoryId, selector.ProjectId)
            .Inventory;
        var inventoryOptions = inventory.InventoryOptions ?? [];
        var scrText = LocalParatextProjects.GetParatextProject(selector.ProjectId);
        var inventoryDetails = _inventoryDetailsByInventoryId[selector.InventoryId];

        if (!string.IsNullOrEmpty(selector.OptionName))
        {
            var option =
                inventoryOptions.Find(option => option.Name == selector.OptionName)
                ?? throw new ArgumentException("Invalid option name: " + selector.OptionName);

            var details =
                inventoryDetails.Options.Find(option => option.OptionName == selector.OptionName)
                ?? throw new ArgumentException("Invalid option name: " + selector.OptionName);

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
                    "Values must be an array when no option name is provided"
                );

            foreach (var value in valuesList)
            {
                var option =
                    inventoryOptions.Find(option => option.Name == value.OptionName)
                    ?? throw new ArgumentException("Invalid option name: " + value.OptionName);

                var details =
                    inventoryDetails.Options.Find(option => option.OptionName == value.OptionName)
                    ?? throw new ArgumentException("Invalid option name: " + value.OptionName);

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

    #endregion

    #region Private Helper methods

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
        var hashSet = new HashSet<string>();
        foreach (var item in enumerable)
        {
            if (filter(item))
                hashSet.Add(item.Key);
        }
        return hashSet;
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
