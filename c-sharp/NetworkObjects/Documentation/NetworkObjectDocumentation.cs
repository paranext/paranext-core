namespace Paranext.DataProvider.NetworkObjects.Documentation;

/// <summary>
/// Documentation for a whole network object, passed to
/// <see cref="NetworkObject.RegisterNetworkObjectAsync"/>. Mirrors the TypeScript
/// <c>NetworkObjectDocumentation</c> type: an object-level <see cref="Experimental"/> flag that
/// cascades to every method, plus optional per-method documentation.
/// </summary>
public record NetworkObjectDocumentation
{
    /// <summary>
    /// When <c>true</c>, marks the WHOLE object experimental — the <c>object:{name}</c>
    /// existence-check method AND every function the object exposes carry <c>x-experimental: true</c>
    /// in the live OpenRPC document. A function with its own entry in <see cref="Methods"/> keeps
    /// that entry (and is marked experimental too); functions without an entry get a bare
    /// experimental marker. This is the C# equivalent of the TypeScript
    /// <c>networkObjectService.set(..., { 'x-experimental': true })</c> fanout.
    ///
    /// Leave <c>null</c>/<c>false</c> for objects that are only partially experimental (e.g. a PDP
    /// exposing one experimental projectInterface among several stable ones) — then only the
    /// functions named in <see cref="Methods"/> are marked, and the existence method is left
    /// unmarked.
    /// </summary>
    public bool? Experimental { get; set; }

    /// <summary>
    /// Optional per-function documentation (summary, params, result) keyed by function name. Use for
    /// richer docs than the object-level fanout provides, or — when <see cref="Experimental"/> is not
    /// set — to mark only specific functions experimental. Each value is built most easily via
    /// <see cref="ExperimentalMethodDocumentation"/>. Keys must match the registered function names.
    /// </summary>
    public IReadOnlyDictionary<string, OpenRpcSingleMethodDocumentation>? Methods { get; set; }
}
