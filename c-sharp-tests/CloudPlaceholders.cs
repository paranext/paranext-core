using System.Diagnostics.CodeAnalysis;
using System.Runtime.InteropServices;
using System.Text;
using Microsoft.Win32.SafeHandles;

namespace TestParanextDataProvider;

/// <summary>
/// Cloud-sync placeholders for tests that need one, made with the Windows Cloud Filter API - the
/// mechanism OneDrive Files On-Demand uses, so they are the same kind of entry a synced project
/// folder holds. No sync provider runs: the placeholders are created fully populated and in sync, so
/// nothing ever asks for one.
/// </summary>
[ExcludeFromCodeCoverage]
internal static class CloudPlaceholders
{
    /// <summary>
    /// Register <paramref name="directory"/> as a sync root, as OneDrive does with its folder, or
    /// <see cref="Assert.Ignore(string)"/> the current test where Windows cannot. Dispose the result
    /// before deleting the directory, so the registration does not outlive it.
    /// </summary>
    public static IDisposable RegisterSyncRootOrIgnore(string directory)
    {
        if (!OperatingSystem.IsWindows())
            Assert.Ignore("Cloud placeholders exist only on Windows");

        var registration = new CF_SYNC_REGISTRATION
        {
            StructSize = (uint)Marshal.SizeOf<CF_SYNC_REGISTRATION>(),
            ProviderName = "ParanextDataProviderTests",
            ProviderVersion = "1.0",
            ProviderId = Guid.NewGuid(),
        };
        var policies = new CF_SYNC_POLICIES
        {
            StructSize = (uint)Marshal.SizeOf<CF_SYNC_POLICIES>(),
            HydrationPrimary = CF_HYDRATION_POLICY_ALWAYS_FULL,
            PopulationPrimary = CF_POPULATION_POLICY_ALWAYS_FULL,
        };
        int result;
        try
        {
            result = CfRegisterSyncRoot(
                directory,
                ref registration,
                ref policies,
                CF_REGISTER_FLAG_DISABLE_ON_DEMAND_POPULATION_ON_ROOT
                    | CF_REGISTER_FLAG_MARK_IN_SYNC_ON_ROOT
            );
        }
        catch (Exception e) when (e is DllNotFoundException or EntryPointNotFoundException)
        {
            Assert.Ignore($"The Cloud Filter API is not available: {e.Message}");
            throw;
        }
        if (result != 0)
            Assert.Ignore($"A cloud sync root could not be registered: HRESULT 0x{result:X8}");

        return new SyncRootRegistration(directory);
    }

    /// <summary>
    /// Convert an existing directory or file inside a registered sync root into a placeholder, in
    /// sync and fully populated - what OneDrive leaves once it has synced an entry - or
    /// <see cref="Assert.Ignore(string)"/> the current test where Windows cannot.
    /// </summary>
    public static void ConvertToPlaceholderOrIgnore(string path)
    {
        using SafeFileHandle handle = CreateFileW(
            path,
            GENERIC_READ | GENERIC_WRITE,
            FILE_SHARE_READ | FILE_SHARE_WRITE | FILE_SHARE_DELETE,
            IntPtr.Zero,
            OPEN_EXISTING,
            Directory.Exists(path) ? FILE_FLAG_BACKUP_SEMANTICS : 0,
            IntPtr.Zero
        );
        if (handle.IsInvalid)
            Assert.Ignore($"'{path}' could not be opened: error {Marshal.GetLastWin32Error()}");

        var identity = Encoding.UTF8.GetBytes(Path.GetFileName(path));
        var result = CfConvertToPlaceholder(
            handle,
            identity,
            (uint)identity.Length,
            CF_CONVERT_FLAG_MARK_IN_SYNC,
            IntPtr.Zero,
            IntPtr.Zero
        );
        if (result != 0)
            Assert.Ignore($"'{path}' could not be made a placeholder: HRESULT 0x{result:X8}");
    }

    private sealed class SyncRootRegistration(string directory) : IDisposable
    {
        public void Dispose() => CfUnregisterSyncRoot(directory);
    }

    #region Cloud Filter API

    private const ushort CF_HYDRATION_POLICY_ALWAYS_FULL = 3;
    private const ushort CF_POPULATION_POLICY_ALWAYS_FULL = 3;
    private const uint CF_REGISTER_FLAG_DISABLE_ON_DEMAND_POPULATION_ON_ROOT = 0x2;
    private const uint CF_REGISTER_FLAG_MARK_IN_SYNC_ON_ROOT = 0x4;
    private const uint CF_CONVERT_FLAG_MARK_IN_SYNC = 0x1;
    private const uint GENERIC_READ = 0x80000000;
    private const uint GENERIC_WRITE = 0x40000000;
    private const uint FILE_SHARE_READ = 0x1;
    private const uint FILE_SHARE_WRITE = 0x2;
    private const uint FILE_SHARE_DELETE = 0x4;
    private const uint OPEN_EXISTING = 3;
    private const uint FILE_FLAG_BACKUP_SEMANTICS = 0x02000000;

    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    private struct CF_SYNC_REGISTRATION
    {
        public uint StructSize;

        [MarshalAs(UnmanagedType.LPWStr)]
        public string ProviderName;

        [MarshalAs(UnmanagedType.LPWStr)]
        public string ProviderVersion;
        public IntPtr SyncRootIdentity;
        public uint SyncRootIdentityLength;
        public IntPtr FileIdentity;
        public uint FileIdentityLength;
        public Guid ProviderId;
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct CF_SYNC_POLICIES
    {
        public uint StructSize;
        public ushort HydrationPrimary;
        public ushort HydrationModifier;
        public ushort PopulationPrimary;
        public ushort PopulationModifier;
        public uint InSync;
        public uint HardLink;
        public uint PlaceholderManagement;
    }

    [DllImport("cldapi.dll", CharSet = CharSet.Unicode)]
    private static extern int CfRegisterSyncRoot(
        string syncRootPath,
        ref CF_SYNC_REGISTRATION registration,
        ref CF_SYNC_POLICIES policies,
        uint registerFlags
    );

    [DllImport("cldapi.dll", CharSet = CharSet.Unicode)]
    private static extern int CfUnregisterSyncRoot(string syncRootPath);

    [DllImport("cldapi.dll")]
    private static extern int CfConvertToPlaceholder(
        SafeFileHandle fileHandle,
        byte[] fileIdentity,
        uint fileIdentityLength,
        uint convertFlags,
        IntPtr convertUsn,
        IntPtr overlapped
    );

    [DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    private static extern SafeFileHandle CreateFileW(
        string fileName,
        uint desiredAccess,
        uint shareMode,
        IntPtr securityAttributes,
        uint creationDisposition,
        uint flagsAndAttributes,
        IntPtr templateFile
    );

    #endregion
}
