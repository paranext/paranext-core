using PtxUtils;

namespace Paranext.DataProvider.Messages;

/// <summary>
/// Message sent to the client to give it NetworkConnectorInfo
/// </summary>
public sealed class MessageInitClient : Message
{
    public sealed class NetworkConnectorInfo
    {
        public const int CLIENT_ID_UNSET = -1;

        /// <summary>
        /// ONLY FOR DESERIALIZATION
        /// </summary>
        private NetworkConnectorInfo()
        {
        }

        public NetworkConnectorInfo(int clientId)
        {
            ClientId = clientId;
        }

        public int ClientId { get; set; } = CLIENT_ID_UNSET;
    }

    /// <summary>
    /// ONLY FOR DESERIALIZATION
    /// </summary>
    private MessageInitClient() : base(UNKNOWN_SENDER_ID)
    {
        ConnectorInfo = new NetworkConnectorInfo(NetworkConnectorInfo.CLIENT_ID_UNSET);
    }

    public MessageInitClient(int senderId, NetworkConnectorInfo connectorInfo) : base(senderId)
    {
        ConnectorInfo = connectorInfo;
    }

    public override Enum<MessageType> Type => MessageType.InitClient;

    public NetworkConnectorInfo ConnectorInfo { get; set; }
}
