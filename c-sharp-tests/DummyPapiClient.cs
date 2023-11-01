using System.Diagnostics;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;
using PtxUtils;

namespace TestParanextDataProvider
{
    internal class DummyPapiClient : PapiClient
    {
        //private readonly Dictionary<Enum<EventType>, Func<dynamic?, Message?>> _eventHandlers = new();

        //public Stack<Message?> EventMessages { get; } = new();

        public IEnumerable<Message> FakeMessageFromServer(Message message)
        {
            if (!_messageHandlersByMessageType.TryGetValue(message.Type, out var handler))
            {
                Trace.TraceWarning($"No message handler for type {message.Type}");
                return Enumerable.Empty<Message>();
            }

            return handler.HandleMessage(message);
        }

        public override Task<bool> ConnectAsync()
        {
            return Task.FromResult(true); // Pretend we succeeded
        }

        public override Task DisconnectAsync()
        {
            // Nothing to do
            return Task.CompletedTask;
        }

        public override Task<bool> RegisterRequestHandler(Enum<RequestType> requestType,
            Func<dynamic, ResponseToRequest> requestHandler, int responseTimeoutInMs = 1000)
        {
            var responder = (MessageHandlerRequestByRequestType)
                _messageHandlersByMessageType[MessageType.Request];
            responder.SetHandlerForRequestType(requestType, requestHandler);

            return Task.FromResult(true);
        }

        //public override void RegisterEventHandler(Enum<EventType> eventType, Func<dynamic?, Message?> eventHandler)
        //{
        //    _eventHandlers.Add(eventType, eventHandler);
        //}

        //public override void SendEvent(MessageEvent message)
        //{
        //    if (!_eventHandlers.TryGetValue(message.EventType, out var handler))
        //        return;

        //    Message? result = handler(message.Event);
        //    EventMessages.Push(result);
        //}
    }
}
