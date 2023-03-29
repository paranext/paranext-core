# TAKE NOTE

Everything in this folder should have a matching representation in the TS code.  [Here](/src/shared/data/NetworkConnectorTypes.ts) is a good place to look.
If new message types are added here, make sure they are added to TS (and vice versa).

In addition to having a message class defined, the following should be done for new message types that are intended to be received by the C# PAPI client:

1. Be added to [the dictionary here](/c-sharp/JsonUtils/MessageConverter.cs)
2. Have a MessageHandler created for them [here](/c-sharp/MessageHandlers/)
3. Have the MessageHandler added to [the constructor of PapiClient](/c-sharp/MessageTransports/PapiClient.cs)
