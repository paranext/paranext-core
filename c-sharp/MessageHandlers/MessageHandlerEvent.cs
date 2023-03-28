using Paranext.DataProvider.Messages;
using PtxUtils;
using System.Collections.Concurrent;

namespace Paranext.DataProvider.MessageHandlers;

using PapiEventHandler = Func<MessageEvent, Message?>;

/// <summary>
/// Handler for "Event" messages
/// </summary>
internal class MessageHandlerEvent : IMessageHandler
{
    // Lock during register/unregister even though we're using a ConcurrentDictionary because
    // there are multiple steps required.
    private readonly object _registrationLock = new();

    // A concurrent dictionary is still helpful because handlers could be getting added/removed
    // while an event is being processed.  It's nice to avoid locking during event processing.
    private readonly ConcurrentDictionary<Enum<EventType>, PapiEventHandler> _handlers = new();

    public void RegisterEventHandler(Enum<EventType> eventType, PapiEventHandler handler)
    {
        lock (_registrationLock)
        {
            if (_handlers.TryGetValue(eventType, out var existingDelegate))
            {
                // Remove and add the handler to ensure it isn't included twice
                var newDelegate = existingDelegate - handler;
                if (newDelegate != null)
                {
                    newDelegate += handler;
                    _handlers[eventType] = newDelegate;
                }
            }
            else
            {
                _handlers[eventType] = handler;
            }
        }
    }

    public void UnregisterEventHandler(Enum<EventType> eventType, PapiEventHandler handler)
    {
        lock (_registrationLock)
        {
            if (_handlers.TryGetValue(eventType, out var existingDelegate))
            {
                var newDelegate = existingDelegate - handler;
                if (newDelegate != null)
                    _handlers[eventType] = newDelegate;
                else
                    _handlers.Remove(eventType, out _);
            }
        }
    }

    public IEnumerable<Message>? HandleMessage(Message message)
    {
        if (message == null)
            throw new ArgumentNullException(nameof(message));

        if (message.Type != MessageType.Event)
            throw new ArgumentException("Incorrect message type", nameof(message));

        Console.WriteLine($"Event received: {message}");

        List<Message> messages = new();
        MessageEvent messageEvent = (MessageEvent)message;
        if (_handlers.TryGetValue(messageEvent.EventType, out var handlersForEventType))
        {
            foreach (var handler in handlersForEventType.GetInvocationList())
            {
                var msg = handler.DynamicInvoke(messageEvent);
                if (msg != null)
                    messages.Add((Message)msg);
            }
        }

        return (messages.Count > 0) ? messages : null;
    }
}
