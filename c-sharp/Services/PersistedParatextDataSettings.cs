using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider.Services;

internal class PersistedParatextDataSettings : IParatextDataSettings
{
    private readonly PapiClient _papiClient;

    // SetSetting is a blind overwrite, so SafeSave must not save the fallback-to-empty default over
    // real data. Re-checked, not latched: one startup timeout shouldn't kill saving the session.
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

            // The confirming read may have found entries from before this session that the
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
