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

## PAPI Methods

The JSON-RPC library we use in .NET automatically handles serialization and deserialization of arguments for all PAPI calls, and that GREATLY simplifies the code. But there is one very important caveat: the number and types of parameters on the C# method being called must match up with the JSON received on the websocket. Otherwise, the JSON-RPC layer will complain that no valid .NET method exists to run the requested JSON-RPC function call.

### Data Providers

For data providers' `set<data_type>` and `get<data_type>` methods, you must include a `selector` parameter as the first parameter in the method signature just like in TypeScript. This parameter is required because, in TypeScript, data providers receive a [`subscribe<data_type>`](https://paranext.github.io/paranext-core/papi-dts/types/shared_models_data-provider.model.DataProviderSubscriber.html) method automatically added to them that programmatically calls [`set<data_type>`](https://paranext.github.io/paranext-core/papi-dts/types/shared_models_data-provider.model.DataProviderSetter.html) and [`get<data_type>`](https://paranext.github.io/paranext-core/papi-dts/types/shared_models_data-provider.model.DataProviderGetter.html) with the specific method signature required. If you do not need to use the selector, you can specify it as `JsonElement _ignore`.
