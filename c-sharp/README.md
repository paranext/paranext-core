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

## Data provider methods

Data providers' [setters](https://paranext.github.io/paranext-core/papi-dts/types/shared_models_data-provider.model.DataProviderSetter.html) (`set<data_type>` methods) and [getters](https://paranext.github.io/paranext-core/papi-dts/types/shared_models_data-provider.model.DataProviderGetter.html) (`get<data_type>` methods) must include a `selector` parameter as the first parameter in the method signature just like in TypeScript. This parameter is required by the contract enforced by the TypeScript data provider model: in TypeScript, the PAPI automatically adds a [`subscribe<data_type>`](https://paranext.github.io/paranext-core/papi-dts/types/shared_models_data-provider.model.DataProviderSubscriber.html) method to data providers that programmatically calls `set<data_type>` and `get<data_type>` with the specific method signature required. As a result, the JSON sent from JS processes will always include a selector argument, even if its value is `null` or `undefined`.

The JSON-RPC library used in .NET automatically handles serialization and deserialization of arguments for all PAPI calls, which greatly simplifies the code. However, there is an important caveat: the number and types of parameters in the C# method signature must exactly match the JSON received over the WebSocket. If they do not, the JSON-RPC layer will fail with an error indicating that no valid .NET method exists for the requested JSON-RPC call.

For this reason, the selector parameter must always be included in the C# method signature. If you do not actually need to use the selector, you can specify it as `JsonElement _ignore`. The underscore prefix makes the intent explicit and signals to .NET code-quality tools that the parameter is intentionally unused, while still satisfying the required method signature.
