using System.Text.Json.Serialization;
using Paranext.DataProvider.JsonUtils;

namespace Paranext.DataProvider.Services;

[JsonConverter(typeof(NotificationSeverityConverter))]
public enum NotificationSeverity
{
    Info,
    Warning,
    Error,
}
