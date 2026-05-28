using System.Collections.Generic;

namespace Paranext.DataProvider.BackupRestore;

// === PORTED FROM PT9 ===
// Source: PtxUtils/PathUtils.cs:194-200 (entry), :202-257 (Windows WMI),
//         :266-328 (Linux UDisks2).
// Maps to: CAP-006 — UsbDeviceEnumerator cross-platform shim (enumeration half
//          of EXT-101; the heuristic half "exactly 1 → use root" lives in
//          CAP-013 / UsbDriveDefaultService).
//
// PT9 anchor (entry):
//   public static List<KeyValuePair<string, DriveInfo>> GetUsbDevices()
//   {
//       if (Platform.IsWindows) return WindowsGetUsbDevices();
//       return LinuxGetUsbDevices();
//   }
//
// PT9 filter (Windows + Linux):
//   * IsReady == true
//   * TotalSize > 5_000_000  (5 MB; literal — INV-C03)
//   * Linux additionally: skip drives whose mount root contains
//     ".paratext-hidden" (INV-C04 — PathUtils.cs:320)
//
// PT10 deltas vs PT9:
//   * Return shape narrowed from List<KeyValuePair<string, DriveInfo>> to
//     IReadOnlyList<StorageDevice> — matches the wire contract
//     (data-contracts.md §3.9 / §4.5).
//   * macOS branch is NEW (PT9 has none — Linux branch is __MonoCS__-gated).
//     First PT10 cut should use DriveInfo.GetDrives() filtered by
//     DriveType.Removable, with a NotImplementedException fallback if the BCL
//     does not surface USB cleanly on macOS (RF-007 / ALIGNMENT-003).
//   * Test seam: an internal static EnumerationOverride lets unit tests bypass
//     the platform branches with a synthetic list. Production code never reads
//     or writes this field; [InternalsVisibleTo("c-sharp-tests")] in
//     c-sharp/AssemblyInfo.cs already exposes it to c-sharp-tests.
//   * INV-C03 / INV-C04 enforcement is factored into internal helpers
//     (ApplyCommonFilter, ApplyLinuxMarkerFilter) so filter contracts can be
//     unit-tested independently of platform branches.

/// <summary>
/// Cross-platform USB / removable-drive enumerator. Implements the C# side of
/// the M-005 <c>enumerateUsbDevices</c> wire method (BHV-506).
/// </summary>
/// <remarks>
/// <para>
/// Returns the set of attached drives passing the PT9 USB filter:
/// </para>
/// <list type="bullet">
///   <item><c>DriveInfo.IsReady</c> = <c>true</c> (INV-C03)</item>
///   <item><c>DriveInfo.TotalSize</c> &gt; <c>5_000_000</c> bytes (INV-C03)</item>
///   <item>On Linux only: mount root MUST NOT contain a <c>.paratext-hidden</c>
///   marker file (INV-C04).</item>
/// </list>
/// <para>
/// The "exactly 1 → use as default backup folder" heuristic (BHV-301) is
/// caller-side (CAP-013 / UsbDriveDefaultService). This class only enumerates.
/// </para>
/// <para>
/// Test seam: <see cref="EnumerationOverride"/> short-circuits the platform
/// branches when non-null. Filter logic is exposed via the
/// <see cref="ApplyCommonFilter"/> / <see cref="ApplyLinuxMarkerFilter"/>
/// internals so tests can exercise INV-C03 / INV-C04 directly with synthetic
/// input (no BCL <c>DriveInfo</c> coupling).
/// </para>
/// </remarks>
internal static class UsbDeviceEnumerator
{
    /// <summary>
    /// Unit-test seam — when non-null, <see cref="Enumerate"/> returns this list
    /// verbatim without invoking any platform branch. Production code never
    /// reads or writes this field; tests set it in <c>[SetUp]</c> and clear it
    /// (<see langword="null"/>) in <c>[TearDown]</c>.
    /// </summary>
    internal static IReadOnlyList<StorageDevice>? EnumerationOverride { get; set; }

    // === PORTED FROM PT9 ===
    // Source: PtxUtils/PathUtils.cs:194-200 (entry).
    /// <summary>
    /// Enumerates currently-attached USB / removable storage devices.
    /// </summary>
    /// <returns>
    /// A snapshot list (read-only) of <see cref="StorageDevice"/> records for
    /// every drive passing the PT9 USB filter. Returns an empty list when no
    /// drives qualify — never <see langword="null"/>.
    /// </returns>
    /// <remarks>
    /// On macOS, the first PT10 cut should use
    /// <c>DriveInfo.GetDrives()</c> filtered by
    /// <c>DriveType.Removable</c>; if the BCL does not surface USB cleanly on
    /// macOS, a <see cref="System.NotImplementedException"/> is acceptable as a
    /// fallback (RF-007 / ALIGNMENT-003).
    /// </remarks>
    public static IReadOnlyList<StorageDevice> Enumerate()
    {
        throw new System.NotImplementedException("CAP-006 GREEN-phase implementation pending");
    }

    // === PORTED FROM PT9 ===
    // Source: PtxUtils/PathUtils.cs:212 + :282-289 (filter predicate, Windows /
    //         Linux branches both gate on IsReady AND TotalSize > 5_000_000).
    /// <summary>
    /// INV-C03 filter — drops any device whose <see cref="StorageDevice.IsRemovable"/>
    /// is <see langword="false"/> or whose <see cref="StorageDevice.TotalSizeBytes"/>
    /// is not strictly greater than <c>5_000_000</c>. Pure / side-effect-free;
    /// tests pin the strict-greater-than boundary explicitly.
    /// </summary>
    /// <remarks>
    /// "Ready" is not a property of the wire shape — by contract, the caller
    /// (a platform branch) has already screened out not-ready drives at the BCL
    /// boundary, so only removable + size remain to gate here.
    /// </remarks>
    internal static IReadOnlyList<StorageDevice> ApplyCommonFilter(IEnumerable<StorageDevice> raw)
    {
        throw new System.NotImplementedException("CAP-006 GREEN-phase implementation pending");
    }

    // === PORTED FROM PT9 ===
    // Source: PtxUtils/PathUtils.cs:320 (Linux-only marker check).
    /// <summary>
    /// INV-C04 filter — on Linux, drops any device whose
    /// <see cref="StorageDevice.RootPath"/> contains a <c>.paratext-hidden</c>
    /// marker file at the mount root. Pure / read-only against the file system
    /// (uses <c>File.Exists</c>; never modifies the drive).
    /// </summary>
    /// <remarks>
    /// This helper is platform-neutral by construction — calling it on Windows /
    /// macOS is a no-op for drives whose <see cref="StorageDevice.RootPath"/>
    /// has no marker file. The PT9 contract restricts the marker check to
    /// Linux; PT10's <see cref="Enumerate"/> only invokes this helper from the
    /// Linux branch.
    /// </remarks>
    internal static IReadOnlyList<StorageDevice> ApplyLinuxMarkerFilter(
        IEnumerable<StorageDevice> raw
    )
    {
        throw new System.NotImplementedException("CAP-006 GREEN-phase implementation pending");
    }
}
