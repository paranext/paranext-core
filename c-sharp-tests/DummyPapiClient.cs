using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;
using Paranext.DataProvider.Services;

namespace TestParanextDataProvider
{
    [ExcludeFromCodeCoverage]
    internal class DummyPapiClient : PapiClient
    {
        private readonly Dictionary<string, Func<MessageEvent, Message?>> _eventHandlers = new();
        private readonly Dictionary<
            string,
            List<(string newValue, string oldValue)>
        > _validSettings = new();

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

        public void AddSettingValueToTreatAsValid(
            string pbSettingName,
            string newValue,
            string oldValue
        )
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

        public override void SendRequest(
            string requestType,
            object requestContents,
            Action<bool, object?> responseCallback
        )
        {
            Task.Delay(1)
                .ContinueWith(async _ =>
                {
                    bool success = false;
                    object? result = null;

                    // Try to run registered request handlers
                    var responder = (MessageHandlerRequestByRequestType)
                        _messageHandlersByMessageType[MessageType.REQUEST];
                    var requestMessage =
                        (requestContents is JsonElement jse)
                            ? new MessageRequest(requestType, 0, jse)
                            : new MessageRequest(requestType, 0, requestContents);
                    var response = responder.HandleMessage(requestMessage);
                    // There should be just one response message
                    if (response.Count() > 1)
                        throw new Exception(
                            $"Somehow there were multiple response messages for request {requestType}"
                        );
                    // If there were no responses, there isn't a registered request handler
                    if (response.Count() == 1)
                    {
                        if (response.First() is MessageResponse messageResponse)
                        {
                            success = messageResponse.Success;
                            result = messageResponse.Contents;
                        }
                        else
                        {
                            throw new Exception(
                                $"Somehow the message handler for {requestType} responded with a message that was not a MessageResponse"
                            );
                        }
                    }
                    // Special hard-coded request handlers. We should probably try to get rid of these over time
                    else if (
                        (requestType == "object:ProjectSettingsService.function")
                        && (requestContents is object[] details)
                        && (details.Length >= 2)
                    )
                    {
                        // If this is a setting known to both Platform.Bible and Paratext, do the
                        // translation from the Paratext settings key to the PB setting id.
                        // If it's a custom settings key, then perhaps it's one we've registered to
                        // handle, and no translation is needed.
                        var ourSettingName = (string)details[1];
                        var pbSettingName =
                            ProjectSettingsNames.GetPlatformBibleSettingNameFromParatextSettingName(
                                ourSettingName
                            );

                        if (ourSettingName != null)
                        {
                            switch (details[0])
                            {
                                case "isValid":
                                    if (details.Length == 5)
                                    {
                                        success = true;
                                        // Might be a setting we've registered to handle.
                                        var isValidRequestContents = new[]
                                        {
                                            // From ProjectSettingsService.IsValid
                                            // new value
                                            details[2],
                                            // current value
                                            details[3],
                                            // all changes?
                                            details[4]
                                        };
                                        if (
                                            TryValidationUsingRegisteredHandler(
                                                isValidRequestContents,
                                                ourSettingName,
                                                out var isValid
                                            )
                                        )
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
                                            result =
                                                _validSettings.TryGetValue(
                                                    pbSettingName,
                                                    out var validValues
                                                )
                                                && validValues.Any(vv =>
                                                    vv.newValue == (string)details[2]
                                                    && vv.oldValue == (string)details[3]
                                                );
                                        }
                                    }
                                    break;
                                case "getDefault":
                                    if (details.Length == 2 && pbSettingName != null)
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
                    // Otherwise we didn't find a request handler, so it should just be a request
                    // failure. Can keep the original values

                    await Task.Run(
                        () => responseCallback(success, result.SerializeToJsonElement())
                    );
                });
        }

        private bool TryValidationUsingRegisteredHandler(
            object[] requestContents,
            string settingName,
            out bool isValid
        )
        {
            isValid = true;
            if (!_messageHandlersByMessageType.TryGetValue(MessageType.REQUEST, out var responder))
                return false;

            var msgRequest = new MessageRequest(
                ProjectSettingsService.GetValidatorKey(settingName),
                GetRequestId(),
                requestContents
            );
            var responseMsg = responder
                .HandleMessage(msgRequest)
                .OfType<MessageResponse>()
                .FirstOrDefault();

            if (responseMsg == null)
                return false;

            isValid = responseMsg.Success;
            return true;
        }
        #endregion
    }
}
