using System.Text.Json;
using Paranext.DataProvider.JsonUtils;

namespace Paranext.DataProvider.Services;

internal static class NotificationService
{
    private const string SERVICE_OBJECT = "object:NotificationService";
    private const string SERVICE_SEND = SERVICE_OBJECT + ".send";
    private const string SERVICE_DISMISS = SERVICE_OBJECT + ".dismiss";

    public static NotificationId Send(PapiClient papiClient, PlatformNotification notification)
    {
        JsonElement result = ThreadingUtils.GetTaskResult(
            papiClient.SendRequestAsync<JsonElement>(SERVICE_SEND, [notification]),
            "NotificationService.Send",
            ThreadingUtils.DefaultTimeout
        );
        return NotificationIdConverter.FromJsonElement(result);
    }

    public static void Dismiss(PapiClient papiClient, NotificationId notificationId)
    {
        ThreadingUtils.RunTask(
            papiClient.SendRequestAsync(SERVICE_DISMISS, [notificationId.ToSerializable()]),
            "NotificationService.Dismiss",
            ThreadingUtils.DefaultTimeout
        );
    }
}
