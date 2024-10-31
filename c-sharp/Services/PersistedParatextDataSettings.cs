using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider.Services;

internal class PersistedParatextDataSettings(PapiClient papiClient) : IParatextDataSettings
{
    public SerializableStringDictionary LastRegistryDataCachedTimes { get; set; } =
        SettingsService.GetSetting<SerializableStringDictionary>(
            papiClient,
            Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES
        ) ?? [];

    public void SafeSave()
    {
        SettingsService.SetSetting(
            papiClient,
            Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES,
            LastRegistryDataCachedTimes
        );
    }
}
