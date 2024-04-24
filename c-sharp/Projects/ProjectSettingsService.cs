using System.Text.Json;
using Paranext.DataProvider.MessageTransports;

namespace Paranext.DataProvider.Projects
{
    internal static class ProjectSettingsService
    {
        private const string PROJECT_SETTINGS_SERVICE = "object:ProjectSettingsService.function";

        public static bool IsValid(
            PapiClient papiClient,
            string newValueJson,
            string currentValueJson,
            string key,
            string allChangesJson,
            string projectType
        )
        {
            bool requestSucceeded = false;
            TaskCompletionSource taskSource = new();
            using var validationTask = taskSource.Task;

            papiClient.SendRequest(
                PROJECT_SETTINGS_SERVICE,
                new[]
                {
                    "isValid",
                    key,
                    newValueJson,
                    currentValueJson,
                    projectType,
                    allChangesJson,
                },
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

        public static string? GetDefault(PapiClient papiClient, string key, string projectType)
        {
            string? defaultValue = null;
            TaskCompletionSource taskSource = new();
            using var getDefaultTask = taskSource.Task;

            papiClient.SendRequest(
                PROJECT_SETTINGS_SERVICE,
                new[] { "getDefault", key, projectType },
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
    }
}
