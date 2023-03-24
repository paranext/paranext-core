using PtxUtils;

namespace Paranext.DataProvider.Messages;

/// <summary>
/// Message sent to the client to give it NetworkConnectorInfo
/// </summary>
public sealed class MessageInitClient : Message
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageInitClient()
    {
        ConnectorInfo = new NetworkConnectorInfo(NetworkConnectorInfo.CLIENT_ID_UNSET);
    }

    public MessageInitClient(NetworkConnectorInfo connectorInfo)
    {
        ConnectorInfo = connectorInfo;
    }

    public override Enum<MessageType> Type => MessageType.InitClient;

    public NetworkConnectorInfo ConnectorInfo { get; set; }
}
