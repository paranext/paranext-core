using Paranext.DataProvider.MessageTransports;
using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider.Services;

internal class PersistedParatextDataSettings(PapiClient papiClient) : IParatextDataSettings
{
    private SerializableStringDictionary _lastRegistryDataCachedTimes = SettingsService.GetSettingObject<SerializableStringDictionary>(
            papiClient,
            Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES
        ) ?? [];

    public SerializableStringDictionary LastRegistryDataCachedTimes
    {
        get => _lastRegistryDataCachedTimes;
        set => _lastRegistryDataCachedTimes = value;
    }

    public void SafeSave()
    {
        SettingsService.SetSetting(
            papiClient,
            Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES,
            _lastRegistryDataCachedTimes
        );
    }
}
