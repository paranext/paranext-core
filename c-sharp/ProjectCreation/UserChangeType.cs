using System.Text.Json.Serialization;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Enum for user change detection results.
/// Used by EvaluateGuestStatusChange (CAP-015).
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum UserChangeType
{
    /// <summary>No change in user status</summary>
    NoChange,

    /// <summary>Regular user change (name, etc.) without guest status change</summary>
    RegularChange,

    /// <summary>Change involving guest status (guest to regular or vice versa)</summary>
    GuestStatusChange,
}
