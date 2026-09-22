namespace Paranext.WireSurface;

/// <summary>
/// The outcome of resolving a registration-name expression to the string(s) it can produce at
/// runtime, from most to least certain.
/// </summary>
public abstract record NameResolution
{
    /// <summary>The expression is a single compile-time-constant string.</summary>
    public sealed record Constant(string Value) : NameResolution;

    /// <summary>
    /// The expression is a constructor or method parameter whose value was traced through every
    /// call site to a distinct, ordinal-sorted set of compile-time-constant strings.
    /// </summary>
    public sealed record Constants(IReadOnlyList<string> Values) : NameResolution;

    /// <summary>
    /// The expression could not be resolved to a constant. Carries the expression's own source
    /// text with whitespace runs collapsed to one space, so the text is stable across formatting
    /// and line-ending differences.
    /// </summary>
    public sealed record Dynamic(string ExpressionText) : NameResolution;
}
