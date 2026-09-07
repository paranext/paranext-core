using System.Text.Json.Serialization;

namespace Paranext.WireSurface;

/// <summary>
/// The full scan output: every recognised registration, sorted deterministically so the artifact is
/// independent of syntax-tree traversal order.
/// </summary>
public sealed record WireSurfaceScanResult(
    [property: JsonPropertyOrder(0)] IReadOnlyList<StaticRegistration> Registrations,
    [property: JsonPropertyOrder(1)] IReadOnlyList<DynamicRegistration> DynamicRegistrations
)
{
    /// <summary>
    /// Orders static entries by <c>(category, name, file)</c> and dynamic entries by
    /// <c>(category, file, expression)</c>, both using ordinal (UTF-16 code-unit) comparison — the
    /// same order the TypeScript side's <c>compareCodeUnits</c> produces, so merging the two halves
    /// never reorders either one.
    /// </summary>
    public static WireSurfaceScanResult Sorted(
        IEnumerable<StaticRegistration> s,
        IEnumerable<DynamicRegistration> d
    ) =>
        new(
            s.OrderBy(r => r.Category, StringComparer.Ordinal)
                .ThenBy(r => r.Name, StringComparer.Ordinal)
                .ThenBy(r => r.File, StringComparer.Ordinal)
                .ToList(),
            d.OrderBy(r => r.Category, StringComparer.Ordinal)
                .ThenBy(r => r.File, StringComparer.Ordinal)
                .ThenBy(r => r.Expression, StringComparer.Ordinal)
                .ToList()
        );
}
