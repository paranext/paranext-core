using System.Text.Json.Serialization;

namespace Paranext.DataProvider.NetworkObjects.Documentation;

/// <summary>
/// OpenRPC documentation for a single network event (the inner <c>notification</c> object of
/// <see cref="OpenRpcSingleNotificationDocumentation"/>). Same shape as
/// <see cref="OpenRpcMethodDocumentation"/> minus the result — per the OpenRPC convention, a
/// notification has no result. Set <see cref="Experimental"/> to mark the event experimental; it
/// surfaces as <c>x-experimental: true</c> in the live OpenRPC document returned by
/// <c>rpc.discover</c>. Informational only — it does not change runtime behavior.
/// </summary>
public record OpenRpcNotificationDocumentation
{
    /// <summary>
    /// Marks the notification experimental in the OpenRPC document. Mirrors the TypeScript
    /// <c>notification['x-experimental']</c> field. Informational only.
    /// </summary>
    [JsonPropertyName("x-experimental")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Experimental { get; set; }

    /// <summary>A short summary of what the notification carries and when it fires.</summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Summary { get; set; }

    /// <summary>A verbose explanation of the notification behavior.</summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Description { get; set; }

    /// <summary>The notification's parameters (its payload), in positional order.</summary>
    public IReadOnlyList<OpenRpcContentDescriptor> Params { get; set; } = [];
}
