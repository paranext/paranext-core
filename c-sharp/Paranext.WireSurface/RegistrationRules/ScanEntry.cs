namespace Paranext.WireSurface.RegistrationRules;

/// <summary>
/// One entry a recognition rule found: a registration whose name resolved to one or more
/// compile-time constants, or one whose name expression could not be resolved.
/// </summary>
public abstract record ScanEntry
{
    public sealed record Static(StaticRegistration Registration) : ScanEntry;

    public sealed record Dynamic(DynamicRegistration Registration) : ScanEntry;

    /// <summary>
    /// The entries a resolved registration name produces, shared by every recognition rule so each
    /// contributes the same shape regardless of which framework call site it recognises: a
    /// <see cref="NameResolution.Constant"/> or <see cref="NameResolution.Constants"/> becomes one
    /// <see cref="Static"/> entry per resolved value (all sharing <paramref name="documentation"/>),
    /// and a <see cref="NameResolution.Dynamic"/> becomes a single <see cref="Dynamic"/> entry
    /// carrying its unresolved expression text instead.
    /// </summary>
    public static IEnumerable<ScanEntry> FromNameResolution(
        NameResolution name,
        string category,
        string file,
        string registeredVia,
        DocumentationResolution documentation
    )
    {
        switch (name)
        {
            case NameResolution.Constant constant:
                yield return ToStatic(constant.Value);
                break;
            case NameResolution.Constants constants:
                foreach (var value in constants.Values)
                    yield return ToStatic(value);
                break;
            case NameResolution.Dynamic dynamic:
                yield return new Dynamic(
                    new DynamicRegistration(category, file, registeredVia, dynamic.ExpressionText)
                );
                break;
        }

        Static ToStatic(string value) =>
            new(
                new StaticRegistration(
                    category,
                    value,
                    file,
                    registeredVia,
                    documentation.Documented,
                    documentation.DocsStaticallyResolved,
                    documentation.Experimental
                )
            );
    }
}
