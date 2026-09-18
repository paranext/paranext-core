using System.Text.Json;

namespace Paranext.WireSurface;

/// <summary>
/// Serializes a <see cref="WireSurfaceScanResult"/> to the JSON shape the TypeScript side expects:
/// camelCase field names, <c>language</c> included on every entry, no indentation.
/// </summary>
public static class ScanResultSerializer
{
    private static readonly JsonSerializerOptions s_options =
        new() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase, WriteIndented = false };

    public static string Serialize(WireSurfaceScanResult result) =>
        JsonSerializer.Serialize(result, s_options);
}
