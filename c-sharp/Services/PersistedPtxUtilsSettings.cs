using PtxUtils;

namespace Paranext.DataProvider.Services;

internal class PersistedPtxUtilsSettings(PapiClient papiClient) : IPtxUtilsSettings
{
    private readonly PersistedStringDictionarySetting _mementoData =
        new(papiClient, Settings.PTX_UTILS_MEMENTO_DATA);

    public SerializableStringDictionary MementoData
    {
        get => _mementoData.Value;
        set => _mementoData.Value = value;
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
        _mementoData.SafeSave();
    }
}
