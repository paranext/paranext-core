using Paranext.DataProvider.MessageTransports;
using PtxUtils;

namespace Paranext.DataProvider.Services;

internal class PersistedPtxUtilsSettings(PapiClient papiClient) : IPtxUtilsSettings
{
    public SerializableStringDictionary MementoData { get; set; } =
        SettingsService.GetSettingObject<SerializableStringDictionary>(
            papiClient,
            Settings.PTX_UTILS_MEMENTO_DATA
        ) ?? [];

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
