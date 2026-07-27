using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider.Services;

internal class PersistedParatextDataSettings(PapiClient papiClient) : IParatextDataSettings
{
    public SerializableStringDictionary LastRegistryDataCachedTimes { get; set; } =
        GetLastRegistryDataCachedTimes(papiClient);

    // A timeout here must not crash the whole data provider at startup, so this mirrors the
    // try/catch SettingsService.Initialize already uses around its own GetSetting call.
    private static SerializableStringDictionary GetLastRegistryDataCachedTimes(
        PapiClient papiClient
    )
    {
        try
        {
            return SettingsService.GetSetting<SerializableStringDictionary>(
                    papiClient,
                    Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES
                ) ?? [];
        }
        catch (Exception ex)
        {
            Console.WriteLine(
                $"Error getting {Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES}: {ex}"
            );
            return [];
        }
    }

    public void SafeSave()
    {
        SettingsService.SetSetting(
            papiClient,
            Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES,
            LastRegistryDataCachedTimes
        );
    }
}
