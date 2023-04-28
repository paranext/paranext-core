using PtxUtils;

namespace Paranext.DataProvider.Messages;

/// <summary>
/// Message sent to the client to give it ConnectorInfo
/// </summary>
public sealed class MessageInitClient : Message
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageInitClient()
    {
        ConnectorInfo = new(MessageInitClientConnectorInfo.CLIENT_ID_UNSET);
    }

    public MessageInitClient(MessageInitClientConnectorInfo connectorInfo)
    {
        ConnectorInfo = connectorInfo;
    }

    public override Enum<MessageType> Type => MessageType.InitClient;

    public MessageInitClientConnectorInfo ConnectorInfo { get; set; }
}

public sealed class MessageInitClientConnectorInfo
{
    public const int CLIENT_ID_UNSET = -1;

    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageInitClientConnectorInfo()
    {
        ClientId = CLIENT_ID_UNSET;
    }

    public MessageInitClientConnectorInfo(int clientId)
    {
        ClientId = clientId;
    }

    public int ClientId { get; set; }
}
