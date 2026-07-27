using PtxUtils;

namespace Paranext.DataProvider.Services;

internal class PersistedPtxUtilsSettings : IPtxUtilsSettings
{
    private readonly PapiClient _papiClient;

    // Set when the initial load fails (e.g. times out), so SafeSave doesn't overwrite the user's
    // previously-persisted mementos with this instance's fallback-to-empty default.
    private readonly bool _loadFailed;

    public PersistedPtxUtilsSettings(PapiClient papiClient)
    {
        _papiClient = papiClient;
        _loadFailed = !SettingsService.TryGetSetting(
            papiClient,
            Settings.PTX_UTILS_MEMENTO_DATA,
            out SerializableStringDictionary? value
        );
        MementoData = value ?? [];
    }

    public SerializableStringDictionary MementoData { get; set; }

    public bool UpgradeNeeded
    {
        get => throw new NotImplementedException();
        set => throw new NotImplementedException();
    }

    public bool EnableFormSnapping
    {
        get => throw new NotImplementedException();
        set => throw new NotImplementedException();
    }

    public void SafeSave()
    {
        if (_loadFailed)
            return;

        SettingsService.SetSetting(_papiClient, Settings.PTX_UTILS_MEMENTO_DATA, MementoData);
    }
}
