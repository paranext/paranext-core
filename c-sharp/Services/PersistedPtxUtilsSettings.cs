using PtxUtils;

namespace Paranext.DataProvider.Services;

internal class PersistedPtxUtilsSettings : IPtxUtilsSettings
{
    private readonly PapiClient _papiClient;

    // True until the settings service is confirmed reachable, so SafeSave doesn't overwrite the
    // user's previously-persisted mementos with this instance's fallback-to-empty default.
    // Re-checked (not permanent) so a transient startup-race timeout doesn't block saving for the
    // rest of the session once the service comes up.
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
        if (
            _loadUnconfirmed
            && !SettingsService.TryGetSetting(
                _papiClient,
                Settings.PTX_UTILS_MEMENTO_DATA,
                out SerializableStringDictionary? _
            )
        )
            return;
        _loadUnconfirmed = false;

        SettingsService.SetSetting(_papiClient, Settings.PTX_UTILS_MEMENTO_DATA, MementoData);
    }
}
