namespace Paranext.WireSurface.RegistrationRules;

/// <summary>
/// One entry a recognition rule found: a registration whose name resolved to one or more
/// compile-time constants, or one whose name expression could not be resolved.
/// </summary>
public abstract record ScanEntry
{
    public sealed record Static(StaticRegistration Registration) : ScanEntry;

    public sealed record Dynamic(DynamicRegistration Registration) : ScanEntry;
}
