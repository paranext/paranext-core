using PtxUtils;

namespace Paranext.DataProvider.Services;

internal class PersistedPtxUtilsSettings(PapiClient papiClient) : IPtxUtilsSettings
{
    // Read while the data provider starts, which can be before the extension host has brought up
    // the settings service. Starting empty loses saved UI state; throwing ends the process.
    public SerializableStringDictionary MementoData { get; set; } =
        SettingsService.TryGetSetting(
            papiClient,
            Settings.PTX_UTILS_MEMENTO_DATA,
            out SerializableStringDictionary? value
        )
            ? value ?? []
            : [];

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
        SettingsService.SetSetting(papiClient, Settings.PTX_UTILS_MEMENTO_DATA, MementoData);
    }
}
