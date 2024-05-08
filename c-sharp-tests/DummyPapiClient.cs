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
            try
            {
                responder.SetHandlerForRequestType(requestType, requestHandler);
            }
            catch (ArgumentException)
            {
                return Task.FromResult(false);
            }

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
                    (requestContents is string[] details) &&
                    (details.Length > 2))
                {
                    // If this is a setting known to both Platform.Bible and Paratext, do the
                    // translation from the Paratext settings key to the PB setting id.
                    // If it's a custom settings key, then perhaps it's one we've registered to
                    // handle, and no translation is needed.
                    var ourSettingName = details[1];
                    var pbSettingName = ProjectSettings
                        .GetPlatformBibleSettingNameFromParatextSettingName(ourSettingName);

                    if (ourSettingName != null)
                    {
                        switch (details[0])
                        {
                            case "isValid":
                                if (details.Length == 6 && details[4] == ProjectType.Paratext)
                                {
                                    success = true;
                                    // Might be a setting we've registered to handle.
                                    var isValidRequestContents = new []
                                        {details[2], details[3], details[5]};
                                    if (TryValidationUsingRegisteredHandler(isValidRequestContents,
                                        ourSettingName, out var isValid))
                                    {
                                        result = isValid;
                                    }
                                    else if (pbSettingName == null)
                                    {
                                        // Per comment in isValid (in
                                        // project-settings.service-host.ts), if there is no
                                        // validator just let the change go through
                                        result = true;
                                    }
                                    else
                                    {
                                        result = _validSettings.TryGetValue(pbSettingName,
                                            out var validValues) && validValues.Any(vv =>
                                            vv.newValue == details[2] &&
                                            vv.oldValue == details[3]);
                                    }
                                }
                                break;
                            case "getDefault":
                                if (details.Length == 3 &&
                                    details[2] == ProjectType.Paratext &&
                                    pbSettingName != null)
                                {
                                    success = true;
                                    result = $"default value for {pbSettingName}";
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }

                await Task.Run(() => responseCallback(success,
                    JsonSerializer.SerializeToElement(result)));
            });
        }

        private bool TryValidationUsingRegisteredHandler(string[] requestContents, string settingName,
            out bool isValid)
        {
            isValid = true;
            if (!_messageHandlersByMessageType.TryGetValue(
                MessageType.REQUEST, out var responder))
                return false;

            var msgRequest = new MessageRequest(ProjectSettingsService.GetValidatorKey(settingName),
                GetRequestId(), requestContents);
            var responseMsg = responder.HandleMessage(msgRequest).OfType<MessageResponse>()
                .FirstOrDefault();

            if (responseMsg == null)
                return false;

            isValid = responseMsg.Success;
            return true;
        }
        #endregion
    }
}
