using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider.Services;

internal class PersistedParatextDataSettings(PapiClient papiClient) : IParatextDataSettings
{
    // Read while the data provider starts, which can be before the extension host has brought up
    // the settings service. Starting empty costs a registry refetch; throwing ends the process.
    public SerializableStringDictionary LastRegistryDataCachedTimes { get; set; } =
        SettingsService.TryGetSetting(
            papiClient,
            Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES,
            out SerializableStringDictionary? value
        )
            ? value ?? []
            : [];

    public void SafeSave()
    {
        SettingsService.SetSetting(
            papiClient,
            Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES,
            LastRegistryDataCachedTimes
        );
    }
}
