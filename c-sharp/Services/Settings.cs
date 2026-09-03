namespace Paranext.DataProvider.Services;

public sealed class Settings
{
    public const string PARATEXT_DATA_LAST_REGISTRY_DATA_CACHED_TIMES =
        "platform.paratextDataLastRegistryDataCachedTimes";
    public const string PTX_UTILS_MEMENTO_DATA = "platform.ptxUtilsMementoData";

    public const string REQUEST_TIMEOUT = "platform.requestTimeout";

    /// <summary>
    /// The user's interface mode ("simple" or "power"). Declared here rather than in the Paratext 10
    /// Studio patch: the patch was adding this const to a public file, which is a standing merge
    /// conflict against every change to it, and the setting itself is core's — defined in
    /// <c>core-settings-info.data.ts</c> and read by <c>startup-tasks.ts</c>. Reading a public
    /// platform setting needs neither a secret nor <c>ParatextData.dll</c>, so by the patch's own
    /// criteria it belongs upstream.
    /// </summary>
    public const string INTERFACE_MODE = "platform.interfaceMode";
}
