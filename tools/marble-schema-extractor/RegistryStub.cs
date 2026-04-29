using PtxUtils;

namespace MarbleSchemaExtractor;

/// <summary>
/// No-op <see cref="RegistryU"/> implementation for non-Windows platforms.
/// Mirrors <c>Paranext.DataProvider.ParatextUtils.RegistryStub</c> so that
/// <c>RegistrationInfo.DefaultUser</c> can be invoked without triggering a
/// Windows-registry-only NullReferenceException.
/// </summary>
internal sealed class RegistryStub : RegistryU
{
    protected override string? GetStringInternal(string registryPath) => null;

    protected override string? GetStringInternal(string basekey, string path, string key) => null;

    protected override object? GetValInternal(string registryPath) => null;

    protected override object? GetValInternal(string baseKey, string subKey, string key) => null;

    protected override object? GetValIfExistsInternal(string registryPath) => null;

    protected override bool HasWritePermissionInternal(string registryPath) => false;

    protected override bool KeyExistsInternal(string registryPath) => false;

    protected override bool ValueExistsInternal(string registryPath) => false;

    protected override void SetValInternal(string registryPath, object theValue) { }

    protected override void SetValInternal(
        string baseKey,
        string subKey,
        string key,
        object theValue
    ) { }

    protected override void DelKeyInternal(string registryPath) { }

    protected override void DelKeyInternal(string baseKey, string subKey) { }
}
