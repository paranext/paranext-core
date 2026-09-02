using PtxUtils;

namespace Paranext.DataProvider.Services;

internal class PersistedPtxUtilsSettings : IPtxUtilsSettings
{
    private readonly PapiClient _papiClient;

    // SetSetting is a blind overwrite, so SafeSave must not save the fallback-to-empty default over
    // real data. Re-checked, not latched: one startup timeout shouldn't kill saving the session.
    private bool _loadUnconfirmed;

    public PersistedPtxUtilsSettings(PapiClient papiClient)
    {
        _papiClient = papiClient;
        _loadUnconfirmed = !SettingsService.TryGetSetting(
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
        if (_loadUnconfirmed)
        {
            if (
                !SettingsService.TryGetSetting(
                    _papiClient,
                    Settings.PTX_UTILS_MEMENTO_DATA,
                    out SerializableStringDictionary? persistedValue
                )
            )
                return;
            _loadUnconfirmed = false;

            // The confirming read may have found mementos from before this session that the
            // fallback-to-empty default never saw. Keep them, but let in-memory changes win.
            if (persistedValue != null)
                foreach (var (key, value) in persistedValue)
                    if (!MementoData.ContainsKey(key))
                        MementoData[key] = value;
        }

        SettingsService.SetSetting(_papiClient, Settings.PTX_UTILS_MEMENTO_DATA, MementoData);
    }
}
