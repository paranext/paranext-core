using PtxUtils;

namespace Paranext.DataProvider.Services;

internal class PersistedPtxUtilsSettings(PapiClient papiClient) : IPtxUtilsSettings
{
    public SerializableStringDictionary MementoData { get; set; } = GetMementoData(papiClient);

    // A timeout here must not crash the whole data provider at startup, so this mirrors the
    // try/catch SettingsService.Initialize already uses around its own GetSetting call.
    private static SerializableStringDictionary GetMementoData(PapiClient papiClient)
    {
        try
        {
            return SettingsService.GetSetting<SerializableStringDictionary>(
                    papiClient,
                    Settings.PTX_UTILS_MEMENTO_DATA
                ) ?? [];
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error getting {Settings.PTX_UTILS_MEMENTO_DATA}: {ex}");
            return [];
        }
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
        SettingsService.SetSetting(papiClient, Settings.PTX_UTILS_MEMENTO_DATA, MementoData);
    }
}
