using Paranext.DataProvider.NetworkObjects.Documentation;

namespace Paranext.DataProvider.NetworkObjects;

internal abstract class DataProvider : NetworkObject
{
    private readonly string _eventType;

    protected DataProvider(
        string name,
        PapiClient papiClient,
        string dataProviderType = NetworkObjectType.DATA_PROVIDER
    )
        : base(papiClient)
    {
        // "-data" is the suffix used by PAPI for data provider names
        DataProviderName = name + "-data";

        DataProviderType = dataProviderType;

        // "onDidUpdate" is the event name used by PAPI for data providers to notify consumers of updates
        _eventType = $"{DataProviderName}:onDidUpdate";
    }

    /// <summary>
    /// Name/ID of the data provider as registered on the network
    /// </summary>
    public string DataProviderName { get; }

    /// <summary>
    /// Data provider type to be shared on the network
    /// </summary>
    public string DataProviderType { get; }

    /// <summary>
    /// Register this data provider on the network so that other services can use it
    /// </summary>
    public async Task RegisterDataProviderAsync()
    {
        await RegisterNetworkObjectAsync(
            DataProviderName,
            GetFunctions(),
            GetDataProviderCreatedDetails(),
            GetNetworkObjectDocumentation()
        );
        await StartDataProviderAsync();
    }

    /// <summary>
    /// Optional documentation for this data provider, threaded into registration. Override to mark
    /// the whole provider experimental (set <see cref="NetworkObjectDocumentation.Experimental"/>) or
    /// to document/mark only specific functions via <see cref="NetworkObjectDocumentation.Methods"/> —
    /// e.g. one experimental projectInterface on a PDP that also exposes stable ones. Defaults to
    /// <c>null</c> (no documentation).
    /// </summary>
    protected virtual NetworkObjectDocumentation? GetNetworkObjectDocumentation() => null;

    /// <summary>
    /// Create an event that tells the network details about the data provider that is being created
    /// </summary>
    protected virtual NetworkObjectCreatedDetails GetDataProviderCreatedDetails()
    {
        var functions = GetFunctions();
        var functionNames = functions.Select(f => f.functionName).ToList();
        functionNames.Sort();
        return new NetworkObjectCreatedDetails
        {
            Id = DataProviderName,
            ObjectType = DataProviderType,
            FunctionNames = [.. functionNames],
        };
    }

    /// <summary>
    /// Called on the data types of every update event this provider sends that names data types,
    /// before it is sent. Override to add data types that must be refreshed whenever other data
    /// changes. <c>"*"</c> already refreshes every data type, so it is sent without reaching this
    /// hook, and nothing is sent for a blank data type or an empty list.
    /// </summary>
    /// <param name="dataTypes">
    /// The data types the update names: never empty, and a list this provider owns, so an override
    /// may change it and return it.
    /// </param>
    /// <returns>The data types to send. Nothing is sent if the list is empty.</returns>
    protected virtual List<string> ExpandDataUpdateScope(List<string> dataTypes) => dataTypes;

    /// <summary>
    /// Notify all processes on the network that this data provider has new data.
    ///
    /// This method transforms the data scope in the same way that `data-provider`service.ts`'s
    /// `mapUpdateInstructionsToUpdateEvent` does
    /// </summary>
    /// <param name="dataScope">Indicator of what data changed in the provider. Can be '*' for all
    /// updates, a `string` to update one data type, or a `List&lt;string&gt;` of data types to update.
    /// If dataScope is null, nothing happens. </param>
    protected async Task SendDataUpdateEventAsync(object? dataScope)
    {
        if (dataScope == null)
            return;

        // "*" is passed as a string; any other scope is sent as a list of data types.
        // Presumably this will change as part of https://github.com/paranext/paranext-core/issues/443
        if (dataScope is "*")
        {
            await PapiClient.SendEventAsync(_eventType, dataScope);
            return;
        }

        List<string> dataTypes;
        if ((dataScope is string s) && !string.IsNullOrWhiteSpace(s))
            dataTypes = [s];
        else if (dataScope is List<string> dataScopeList && dataScopeList.Count > 0)
            dataTypes = [.. dataScopeList];
        else
        {
            Console.WriteLine(
                "Did not send data update event. dataScope is blank, an empty list, or not a string or list of strings"
            );
            return;
        }

        dataTypes = ExpandDataUpdateScope(dataTypes);
        if (dataTypes.Count == 0)
        {
            Console.WriteLine("Did not send data update event. The expanded dataScope is empty");
            return;
        }

        await PapiClient.SendEventAsync(_eventType, dataTypes);
    }

    /// <summary>
    /// Notify all processes on the network that this data provider has new data.
    ///
    /// This method transforms the data scope in the same way that `data-provider`service.ts`'s
    /// `mapUpdateInstructionsToUpdateEvent` does
    /// </summary>
    /// <param name="dataScope">Indicator of what data changed in the provider. Can be '*' for all
    /// updates, a `string` to update one data type, or a `List&lt;string&gt;` of data types to update.
    /// If dataScope is null, nothing happens.</param>
    /// <param name="description">Description of the update event to log if there was an error
    /// sending the event over the network</param>
    protected void SendDataUpdateEvent(object? dataScope, string description = "data update event")
    {
        ThreadingUtils.RunTask(SendDataUpdateEventAsync(dataScope), description);
    }

    /// <summary>
    /// Provide the list of functions that can be called on this data provider
    /// </summary>
    /// <returns>Array of strings containing all the functions that are callable on this data provider</returns>
    protected abstract List<(string functionName, Delegate function)> GetFunctions();

    /// <summary>
    /// Once a data provider has started, it should send out update events whenever its data changes.
    /// </summary>
    protected abstract Task StartDataProviderAsync();
}
