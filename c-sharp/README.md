# Helpful Tips

## Messages

To add a new message type to C#:

1. Create a new Enum\<MessageType\> value for it [here](/c-sharp/Messages/MessageType.cs).
2. Create a new class for it that derives from [Message](/c-sharp/Messages/Message.cs).
3. Add it to the TS code if not already there. [Here](/src/shared/data/NetworkConnectorTypes.ts) is a good place to look.
4. If C# needs to receive this type of message, create a [MessageHandler](/c-sharp/MessageHandlers/IMessageHandler.cs). Add that new MessageHandler to [the constructor of PapiClient](/c-sharp/MessageTransports/PapiClient.cs)

## Events

To add a new event type to C#:

1. Create a new Enum\<EventType\> value for it [here](/c-sharp/Messages/EventType.cs).
2. Create a new class for it that derives from [MessageEventGeneric](/c-sharp/Messages/MessageEventGeneric.cs).
3. Add it to the TS code if not already there.
4. If C# needs to handle this type of event, add code to call [RegisterEventHandler in PapiClient](/c-sharp/MessageTransports/PapiClient.cs).
