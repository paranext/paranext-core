namespace Paranext.WireSurface;

/// <summary>
/// The wire-surface category vocabulary. Values are copied verbatim into the JSON output's
/// <c>category</c> field and must match the TypeScript side's category strings exactly.
/// </summary>
public static class RegistrationCategory
{
    public const string NetworkObject = "networkObject";
    public const string DataProvider = "dataProvider";
    public const string PdpFactory = "pdpFactory";
    public const string StandaloneMethod = "standaloneMethod";
    public const string NetworkEvent = "networkEvent";
}
