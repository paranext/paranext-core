using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider.Services;

internal class PersistedParatextDataSettings : IParatextDataSettings
{
    private readonly PapiClient _papiClient;

    // Set when the initial load fails (e.g. times out), so SafeSave doesn't overwrite the
    // previously-persisted value with this instance's fallback-to-empty default.
    private readonly bool _loadFailed;

    public PersistedParatextDataSettings(PapiClient papiClient)
    {
        _papiClient = papiClient;
        _loadFailed = !SettingsService.TryGetSetting(
            papiClient,
            Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES,
            out SerializableStringDictionary? value
        );
        LastRegistryDataCachedTimes = value ?? [];
    }

    public SerializableStringDictionary LastRegistryDataCachedTimes { get; set; }

    public void SafeSave()
    {
        if (_loadFailed)
            return;

        SettingsService.SetSetting(
            _papiClient,
            Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES,
            LastRegistryDataCachedTimes
        );
    }
}
