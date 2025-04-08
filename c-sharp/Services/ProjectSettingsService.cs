using System.Text.Json;

namespace Paranext.DataProvider.Services
{
    internal static class ProjectSettingsService
    {
        private const string SERVICE_OBJECT = "object:ProjectSettingsService";
        private const string SERVICE_IS_VALID = SERVICE_OBJECT + ".isValid";
        private const string SERVICE_GET_DEFAULT = SERVICE_OBJECT + ".getDefault";
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
            object? newValue,
            object? currentValue,
            string key,
            object? allChanges
        )
        {
            string description = $"ProjectSettingService.IsValid for {key}";
            return ThreadingUtils.GetTaskResult(
                    papiClient.SendRequestAsync<bool?>(
                        SERVICE_IS_VALID,
                        [key, newValue, currentValue, allChanges]
                    ),
                    description,
                    ThreadingUtils.DefaultTimeout
                ) ?? throw new InvalidDataException($"{description} was null");
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
        public static object? GetDefault(PapiClient papiClient, string key)
        {
            string description = $"ProjectSettingService.GetDefault for {key}";
            return ThreadingUtils.GetTaskResult(
                    papiClient.SendRequestAsync<object?>(SERVICE_GET_DEFAULT, [key]),
                    description,
                    ThreadingUtils.DefaultTimeout
                ) ?? throw new InvalidDataException($"{description} was null");
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
            bool requestHandler(string newValueJson, string currentValueJson, string allChangesJson)
            {
                var (result, error) = validatorCallback(
                    (newValueJson, currentValueJson, allChangesJson)
                );
                return result
                    ? true
                    : throw new InvalidDataException(
                        error
                            ?? $"Parameter validation failed for {key}. Error response provided no details."
                    );
            }

            string description = $"ProjectSettingService.RegisterValidator for {key}";
            return ThreadingUtils.GetTaskResult(
                papiClient.RegisterRequestHandlerAsync(GetValidatorKey(key), requestHandler),
                description,
                ThreadingUtils.DefaultTimeout
            );
        }
    }
}
