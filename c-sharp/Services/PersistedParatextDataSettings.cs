using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider.Services;

internal class PersistedParatextDataSettings(PapiClient papiClient) : IParatextDataSettings
{
    private readonly PersistedStringDictionarySetting _lastRegistryDataCachedTimes =
        new(papiClient, Settings.PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES);

    public SerializableStringDictionary LastRegistryDataCachedTimes
    {
        get => _lastRegistryDataCachedTimes.Value;
        set => _lastRegistryDataCachedTimes.Value = value;
    }

    public void SafeSave()
    {
        _lastRegistryDataCachedTimes.SafeSave();
    }
}
