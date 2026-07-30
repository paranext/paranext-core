namespace Paranext.DataProvider.NetworkObjects.Documentation;

/// <summary>
/// Wire shape sent as the optional second argument to <c>network:registerEvent</c>. Mirrors the
/// TypeScript <c>SingleNotificationDocumentation</c> type (<c>{ notification }</c>) — the
/// notification counterpart of <see cref="OpenRpcSingleMethodDocumentation"/>. The main process
/// stores it and emits it into the OpenRPC document returned by <c>rpc.discover</c>, so
/// C#-registered network events can carry the same documentation (including
/// <c>x-experimental</c>) as TypeScript-registered ones.
/// </summary>
public record OpenRpcSingleNotificationDocumentation
{
    /// <summary>The notification documentation.</summary>
    public OpenRpcNotificationDocumentation Notification { get; set; } = new();
}
