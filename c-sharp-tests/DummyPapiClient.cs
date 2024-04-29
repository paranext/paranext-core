using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider
{
    [ExcludeFromCodeCoverage]
    internal class DummyPapiClient : PapiClient
    {
        private readonly Dictionary<string, Func<MessageEvent, Message?>> _eventHandlers = new();
        private readonly Dictionary<string, List<(string newValue, string oldValue)>> _validSettings = new();

        public Stack<Message?> EventMessages { get; } = new();

        /// <summary>
        /// Fakes a message coming from the server for the PapiClient to handle
        /// </summary>
        /// <param name="message">The message to fake</param>
        /// <returns>The messages that would be returned back to the server</returns>
        public IEnumerable<Message> FakeMessageFromServer(Message message)
        {
            if (!_messageHandlersByMessageType.TryGetValue(message.Type, out var handler))
            {
                Trace.TraceWarning($"No message handler for type {message.Type}");
                return Enumerable.Empty<Message>();
            }

            return handler.HandleMessage(message);
        }

        public void AddSettingValueToTreatAsValid(string pbSettingName, string newValue, string oldValue)
        {
            if (!_validSettings.TryGetValue(pbSettingName, out var values))
            {
                _validSettings[pbSettingName] = values =
                    new List<(string newValue, string oldValue)>();
            }
            values.Add((newValue, oldValue));
        }

        #region Overrides of PapiClient
        public override Task<bool> ConnectAsync()
        {
            return Task.FromResult(true); // Pretend we succeeded
        }

        public override Task DisconnectAsync()
        {
            // Nothing to do
            return Task.CompletedTask;
        }

        public override Task<bool> RegisterRequestHandler(
            string requestType,
            Func<JsonElement, ResponseToRequest> requestHandler,
            int responseTimeoutInMs = 5000
        )
        {
            var responder = (MessageHandlerRequestByRequestType)
                _messageHandlersByMessageType[MessageType.REQUEST];
            responder.SetHandlerForRequestType(requestType, requestHandler);

            return Task.FromResult(true);
        }

        public override void RegisterEventHandler(
            string eventType,
            Func<MessageEvent, Message?> eventHandler
        )
        {
            _eventHandlers.Add(eventType, eventHandler);
        }

        public override void SendEvent(MessageEvent message)
        {
            if (!_eventHandlers.TryGetValue(message.EventType, out var handler))
                return;

            Message? result = handler(message);
            EventMessages.Push(result);
        }

        public override void SendRequest(string requestType, object requestContents,
            Action<bool, object?> responseCallback)
        {
            Task.Delay(1).ContinueWith(async _ =>
            {
                bool success = false;
                object? result = null;

                if ((requestType == "object:ProjectSettingsService.function") &&
                    (requestContents is string[] requestDetails) &&
                    (requestDetails.Last() == ProjectType.Paratext))
                    {
                        var pbSettingName = ProjectSettings
                            .GetPlatformBibleSettingNameFromParatextSettingName(requestDetails[1]);

                        switch (requestDetails[0])
                        {
                            case "isValid":
                            {
                                success = true;
                                if (pbSettingName == null)
                                {
                                    // per comment in isValid (in project-settings.service-host.ts),
                                    // if there is no validator just let the change go through
                                    result = true;
                                }
                                else
                                {
                                    result = _validSettings.TryGetValue(pbSettingName, out var validValues) &&
                                        validValues.Any(vv => vv.newValue == requestDetails[2] &&
                                            vv.oldValue == requestDetails[3]);
                                }
                            }
                            break;
                            case "getDefault":
                            {
                                if (pbSettingName != null)
                                {
                                    success = true;
                                    result = $"default value for {pbSettingName}";
                                }
                            }
                            break;
                            default:
                            break;
                        }
                    }

                await Task.Run(() => responseCallback(success,
                    JsonSerializer.SerializeToElement(result)));
            });
        }
        #endregion
    }
}
