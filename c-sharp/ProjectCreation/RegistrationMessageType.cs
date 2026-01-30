using System.Text.Json.Serialization;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Registration status display types.
/// Maps to EXT-009.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum RegistrationMessageType
{
    NoTypeSelected,
    InheritsFromBase,
    NotRegisteredType,
    Registered,
    RegisteredPrivate,
    OfflineAllowed,
    RegistrationExists,
    RegistrationRevoked,
    CanRegister,
    CannotRegister,
    Unregistered,
}
