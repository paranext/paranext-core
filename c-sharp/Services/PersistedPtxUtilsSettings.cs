using Paranext.DataProvider.MessageTransports;
using PtxUtils;

namespace Paranext.DataProvider.Services;

internal class PersistedPtxUtilsSettings(PapiClient papiClient) : IPtxUtilsSettings
{
    private SerializableStringDictionary _mementoData = SettingsService.GetSettingObject<SerializableStringDictionary>(
            papiClient,
            Settings.PTX_UTILS_MEMENTO_DATA
        ) ?? [];

    public SerializableStringDictionary MementoData
    {
        get => _mementoData;
        set => _mementoData = value;
    }

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
        SettingsService.SetSetting(papiClient, Settings.PTX_UTILS_MEMENTO_DATA, _mementoData);
    }
}
