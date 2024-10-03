using Paranext.DataProvider.JsonUtils;

namespace Paranext.DataProvider.Messages;

/// <summary>
/// Message sent to the client to give it ConnectorInfo
/// </summary>
[JsonMessageDeserialization(MessageField.MESSAGE_TYPE, MessageType.INIT_CLIENT)]
public sealed class MessageInitClient : Message
{
    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageInitClient()
        : base(MessageType.INIT_CLIENT)
    {
        ConnectorInfo = new MessageInitClientConnectorInfo(
            MessageInitClientConnectorInfo.CLIENT_ID_UNSET
        );
        ClientGuid = null!;
    }

    public MessageInitClient(MessageInitClientConnectorInfo connectorInfo)
        : base(MessageType.INIT_CLIENT)
    {
        ConnectorInfo = connectorInfo;
        ClientGuid = string.Empty;
    }

    public MessageInitClientConnectorInfo ConnectorInfo { get; set; }

    public string ClientGuid { get; set; }

    public override string ToString()
    {
        return base.ToString() + $", ConnectorInfo={ConnectorInfo}, ClientGuid={ClientGuid}";
    }
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

    public override string ToString()
    {
        return $"ClientId={ClientId}";
    }
}
