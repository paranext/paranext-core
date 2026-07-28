using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider.Services;

internal class PersistedParatextDataSettings : IParatextDataSettings
{
    private readonly PapiClient _papiClient;

    // True until the settings service is confirmed reachable, so SafeSave doesn't overwrite the
    // previously-persisted value with this instance's fallback-to-empty default. Re-checked (not
    // permanent) so a transient startup-race timeout doesn't block saving for the rest of the
    // session once the service comes up.
    private bool _loadUnconfirmed;

    public PersistedParatextDataSettings(PapiClient papiClient)
    {
        _papiClient = papiClient;
        _loadUnconfirmed = !SettingsService.TryGetSetting(
            papiClient,
            Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES,
            out SerializableStringDictionary? value
        );
        LastRegistryDataCachedTimes = value ?? [];
    }

    public SerializableStringDictionary LastRegistryDataCachedTimes { get; set; }

    public void SafeSave()
    {
        if (_loadUnconfirmed)
        {
            if (
                !SettingsService.TryGetSetting(
                    _papiClient,
                    Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES,
                    out SerializableStringDictionary? persistedValue
                )
            )
                return;
            _loadUnconfirmed = false;

            // The confirming read may have found entries from before this session that our
            // fallback-to-empty default never saw. Keep them, but let in-memory changes win.
            if (persistedValue != null)
                foreach (var (key, value) in persistedValue)
                    if (!LastRegistryDataCachedTimes.ContainsKey(key))
                        LastRegistryDataCachedTimes[key] = value;
        }

        SettingsService.SetSetting(
            _papiClient,
            Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES,
            LastRegistryDataCachedTimes
        );
    }
}
