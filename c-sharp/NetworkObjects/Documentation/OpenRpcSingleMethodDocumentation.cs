namespace Paranext.DataProvider.NetworkObjects.Documentation;

/// <summary>
/// Wire shape sent as the optional second argument to <c>network:registerMethod</c>. Mirrors the
/// TypeScript <c>SingleMethodDocumentation</c> type (<c>{ method }</c>). The main process stores it
/// and emits it into the OpenRPC document returned by <c>rpc.discover</c>, so C#-registered network
/// object methods can carry the same documentation (including <c>x-experimental</c>) as
/// TypeScript-registered ones.
/// </summary>
public record OpenRpcSingleMethodDocumentation
{
    /// <summary>The method documentation.</summary>
    public OpenRpcMethodDocumentation Method { get; set; } = new();
}
