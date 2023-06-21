using PtxUtils;

namespace Paranext.DataProvider.ParatextUtils
{
    internal sealed class RegistryStub : RegistryU
    {
        protected override string? GetStringInternal(string registryPath)
        {
            return null;
        }

        protected override string? GetStringInternal(string basekey, string path, string key)
        {
            return null;
        }

        protected override object? GetValInternal(string registryPath)
        {
            return null;
        }

        protected override object? GetValInternal(string baseKey, string subKey, string key)
        {
            return null;
        }

        protected override object? GetValIfExistsInternal(string registryPath)
        {
            return null;
        }

        protected override bool HasWritePermissionInternal(string registryPath)
        {
            return false;
        }

        protected override bool KeyExistsInternal(string registryPath)
        {
            return false;
        }

        // TODO: If this is needed, it might cause problems since it references RegistryKey
        //protected override bool KeyExistsInternal(RegistryKey key, string subKey)
        //{
        //    return false;
        //}

        protected override bool ValueExistsInternal(string registryPath)
        {
            return false;
        }

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
}
