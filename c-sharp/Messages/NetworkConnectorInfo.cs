namespace Paranext.DataProvider.Messages;

public sealed class NetworkConnectorInfo
{
    public const int CLIENT_ID_UNSET = -1;

    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private NetworkConnectorInfo()
    {
        ClientId = CLIENT_ID_UNSET;
    }

    public NetworkConnectorInfo(int clientId)
    {
        ClientId = clientId;
    }

    public int ClientId { get; set; }
}
