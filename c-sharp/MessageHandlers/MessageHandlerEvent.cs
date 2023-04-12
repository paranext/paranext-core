using Paranext.DataProvider.Messages;
using PtxUtils;

namespace Paranext.DataProvider.MessageHandlers;

using PapiEventHandler = Func<MessageEvent, Message?>;

/// <summary>
/// Handler for "Event" messages
/// </summary>
internal class MessageHandlerEvent : IMessageHandler
{
    private readonly Dictionary<Enum<EventType>, PapiEventHandler> _handlers = new();
    private readonly object _handlersLock = new();

    public void RegisterEventHandler(Enum<EventType> eventType, PapiEventHandler handler)
    {
        lock (_handlersLock)
        {
            if (_handlers.TryGetValue(eventType, out PapiEventHandler? existingDelegate))
            {
                // Remove and add the handler to ensure it isn't included twice
                PapiEventHandler? newDelegate = existingDelegate - handler;
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
        lock (_handlersLock)
        {
            if (_handlers.TryGetValue(eventType, out PapiEventHandler? existingDelegate))
            {
                PapiEventHandler? newDelegate = existingDelegate - handler;
                if (newDelegate != null)
                    _handlers[eventType] = newDelegate;
                else
                    _handlers.Remove(eventType, out _);
            }
        }
    }

    public IEnumerable<Message> HandleMessage(Message message)
    {
        if (message == null)
            throw new ArgumentNullException(nameof(message));

        if (message.Type != MessageType.Event)
            throw new ArgumentException("Incorrect message type", nameof(message));

        Console.WriteLine($"Event received: {message}");

        MessageEvent evt = (MessageEvent)message;
        Delegate[]? handlersToRun = null;
        lock (_handlersLock)
        {
            if (!_handlers.TryGetValue(evt.EventType, out PapiEventHandler? handlersForEventType))
                yield break;

            // The returned array and the functions in it will not change after this call
            // even if Register/Unregister is called while we are invoking the handlers
            handlersToRun = handlersForEventType.GetInvocationList();
        }

        foreach (var handler in handlersToRun)
        {
            var msg = handler.DynamicInvoke(evt);
            if (msg != null)
                yield return (Message)msg;
        }
    }
}
