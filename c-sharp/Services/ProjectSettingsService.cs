using System.Text.Json;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;

namespace Paranext.DataProvider.Services
{
    internal static class ProjectSettingsService
    {
        private const string PROJECT_SETTINGS_SERVICE = "object:ProjectSettingsService.function";
        private const string PROJECT_SETTING_VALIDATOR = "extensionProjectSettingValidator:";

        internal static string GetValidatorKey(string settingKey) =>
            PROJECT_SETTING_VALIDATOR + settingKey;

        /// <summary>
        /// Calls registered project settings validators to determine whether or not a (Paratext)
        /// project setting change is valid.
        /// </summary>
        /// <param name="papiClient">The proxy to facilitate communication to the Paranext server
        /// via the PAPI</param>
        /// <param name="newValueJson">The new value requested to set the project setting value to,
        /// serialized as a JSON string</param>
        /// <param name="currentValueJson">The current project setting value, serialized as a JSON
        /// string</param>
        /// <param name="key">The (Paratext) project setting key being set (this will probably
        /// always be different from the corresponding key known to Platform.Bible)</param>
        /// <param name="allChangesJson">A JSON object containing the keys and values of
        /// all the settings being changed as part of an atomic operation (i.e., a single batch of
        /// changes)</param>
        /// <returns><c>true</c> if change is valid, <c>false</c> otherwise</returns>
        public static bool IsValid(
            PapiClient papiClient,
            string newValueJson,
            string currentValueJson,
            string key,
            string allChangesJson
        )
        {
            bool requestSucceeded = false;
            TaskCompletionSource taskSource = new();
            using var validationTask = taskSource.Task;

            papiClient.SendRequest(
                PROJECT_SETTINGS_SERVICE,
                new object[] { "isValid", key, newValueJson, currentValueJson, allChangesJson, },
                (bool success, object? returnValue) =>
                {
                    try
                    {
                        if (success)
                        {
                            var result = (JsonElement?)returnValue;
                            if (result.HasValue)
                                requestSucceeded = result.Value.GetBoolean();
                        }

                        taskSource.TrySetResult();
                    }
                    catch (Exception ex)
                    {
                        requestSucceeded = false;
                        taskSource.TrySetException(ex);
                    }
                }
            );

            using var cts = new CancellationTokenSource();
            validationTask.Wait(cts.Token);
            return requestSucceeded;
        }

        /// <summary>
        /// Gets the default value for a project setting
        /// </summary>
        /// <param name="papiClient">The proxy to facilitate communication to the Paranext server
        /// via the PAPI</param>
        /// <param name="key">The (Paratext) project setting key for which to get the default value
        /// (this will probably always be different from the corresponding key known to
        /// Platform.Bible)
        /// </param>
        /// <remarks>Every Project Data Provider **must** run this function when it receives a
        /// request to get a project setting if the project does not have a value for the project
        /// setting requested. It should return the response from this function directly, either
        /// the returned default value or throw.</remarks>
        public static string? GetDefault(PapiClient papiClient, string key)
        {
            string? defaultValue = null;
            TaskCompletionSource taskSource = new();
            using var getDefaultTask = taskSource.Task;

            papiClient.SendRequest(
                PROJECT_SETTINGS_SERVICE,
                new object[] { "getDefault", key },
                (bool success, object? returnValue) =>
                {
                    try
                    {
                        if (success)
                        {
                            var result = (JsonElement?)returnValue;
                            if (result.HasValue)
                                defaultValue = result.Value.ToString();
                        }

                        taskSource.TrySetResult();
                    }
                    catch (Exception ex)
                    {
                        taskSource.TrySetException(ex);
                    }
                }
            );

            using var cts = new CancellationTokenSource();
            getDefaultTask.Wait(cts.Token);
            return defaultValue;
        }

        /// <summary>
        /// Registers a function that validates whether a new setting value is allowed to be set.
        /// </summary>
        /// <param name="papiClient">The proxy to facilitate communication to the Paranext server
        /// via the PAPI</param>
        /// <param name="key">The id of the setting in Platform.Bible for which the validator is to
        /// be registered</param>
        /// <param name="validatorCallback">Function to call to validate the new setting value. See
        /// <see cref="IsValid(PapiClient, string, string, string, string, string)"/> for a complete
        /// explanation of the input parameters to this function.
        /// </param>
        /// <returns><c>true</c> if the validator was successfully registered, <c>false</c>
        /// otherwise</returns>
        public static bool RegisterValidator(
            PapiClient papiClient,
            string key,
            Func<
                (string newValueJson, string currentValueJson, string allChangesJson),
                (bool result, string? error)
            > validatorCallback
        )
        {
            ResponseToRequest requestHandler(JsonElement jsonElement)
            {
                // Check if the JsonElement is an array
                if (
                    jsonElement.ValueKind != JsonValueKind.Array || jsonElement.GetArrayLength() < 3
                )
                {
                    return ResponseToRequest.Failed(
                        $"Validator for {key} expected a JSON array with 3 items: newValueJson"
                            + "currentValueJson, allChangesJson"
                    );
                }

                string newValueJson = jsonElement[0].GetString() ?? "";
                string currentValueJson = jsonElement[1].GetString() ?? "";
                string allChangesJson = jsonElement[2].GetString() ?? "";

                var validationResponse = validatorCallback(
                    (newValueJson, currentValueJson, allChangesJson)
                );
                return validationResponse.result
                    ? ResponseToRequest.Succeeded()
                    : ResponseToRequest.Failed(
                        validationResponse.error
                            ?? "Parameter validation failed for {key}. Error response provided no details."
                    );
            }
            ;

            var t = papiClient.RegisterRequestHandler(GetValidatorKey(key), requestHandler);

            using var cts = new CancellationTokenSource();
            t.Wait(cts.Token);
            return t.Result;
        }
    }
}
