namespace Paranext.DataProvider.NetworkObjects.Documentation;

/// <summary>
/// Helpers for building experimental OpenRPC method documentation concisely. Every document
/// produced here carries <c>x-experimental: true</c>, so consumers inspecting the live OpenRPC
/// document (via <c>rpc.discover</c>) can identify these network object methods as experimental —
/// the C# counterpart to the TypeScript <c>'x-experimental': true</c> registration field.
/// </summary>
public static class ExperimentalMethodDocumentation
{
    /// <summary>
    /// Builds an experimental method documentation entry.
    /// </summary>
    /// <param name="summary">Short summary of what the method does.</param>
    /// <param name="parameters">The method's parameters, in positional order. Defaults to none.</param>
    /// <param name="result">The method's result. Defaults to an untyped <c>object</c> result.</param>
    public static OpenRpcSingleMethodDocumentation Create(
        string summary,
        IReadOnlyList<OpenRpcContentDescriptor>? parameters = null,
        OpenRpcContentDescriptor? result = null
    ) =>
        new()
        {
            Method = new()
            {
                Experimental = true,
                Summary = summary,
                Params = parameters ?? [],
                Result = result ?? ResultOf("object", "Result payload"),
            },
        };

    /// <summary>
    /// Builds a method parameter content descriptor. Complex record parameters use the
    /// <c>"object"</c> type rather than a fully-expanded schema (matching existing conventions).
    /// </summary>
    public static OpenRpcContentDescriptor Param(
        string name,
        string summary,
        string type = "object",
        bool required = true
    ) =>
        new()
        {
            Name = name,
            Summary = summary,
            Required = required,
            Schema = new() { Type = type },
        };

    /// <summary>
    /// A bare experimental marker — <c>x-experimental: true</c> with no summary and default
    /// (empty params, untyped object result) docs. Used by the object-wide
    /// <see cref="NetworkObjectDocumentation.Experimental"/> fanout for functions that have no richer
    /// per-method documentation of their own.
    /// </summary>
    public static OpenRpcSingleMethodDocumentation Marker() =>
        new() { Method = new() { Experimental = true } };

    /// <summary>
    /// Builds an experimental documentation entry for a network object's <c>object:{name}</c>
    /// existence-check method (registered by <see cref="NetworkObject.RegisterNetworkObjectAsync"/>),
    /// which takes no parameters and returns a boolean. Used by the object-wide
    /// <see cref="NetworkObjectDocumentation.Experimental"/> fanout to mark the existence method.
    /// </summary>
    public static OpenRpcSingleMethodDocumentation ExistenceMarker(string networkObjectName) =>
        Create(
            $"Whether the {networkObjectName} network object exists.",
            result: ResultOf("boolean", "True if the network object exists")
        );

    /// <summary>Builds the result content descriptor.</summary>
    public static OpenRpcContentDescriptor ResultOf(string type, string summary) =>
        new()
        {
            Name = "return value",
            Summary = summary,
            Schema = new() { Type = type },
        };
}
