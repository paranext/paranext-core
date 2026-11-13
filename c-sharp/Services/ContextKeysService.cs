namespace Paranext.DataProvider.Services;

/// <summary>
/// Static access to the process-wide <see cref="ContextKeys"/>. Reading <see cref="Instance"/>
/// throws InvalidOperationException if SharedStoreService has not been initialized yet.
/// </summary>
/// <remarks>
/// Experimental: this surface is unstable and may change or disappear without notice.
/// </remarks>
internal static class ContextKeysService
{
    private static ContextKeys? s_instance;

    internal static ContextKeys Instance =>
        s_instance ??= new ContextKeys(SharedStoreService.GetSharedStore());
}
