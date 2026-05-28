using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;

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
        // Unit-test seam — when set, bypass all platform branches and return the
        // override verbatim. Production code never sets this; only c-sharp-tests
        // does (via [assembly: InternalsVisibleTo("c-sharp-tests")] at
        // c-sharp/AssemblyInfo.cs:3).
        IReadOnlyList<StorageDevice>? overrideList = EnumerationOverride;
        if (overrideList is not null)
            return overrideList;

        // EXPLANATION:
        // First-cut platform implementation (per strategic-plan §CAP-006 +
        // ALIGNMENT-003): use DriveInfo.GetDrives() filtered by
        // DriveType.Removable across Windows / Linux / macOS. PT9's WMI
        // (Windows InterfaceType='USB' enrichment) and UDisks2 (Linux D-Bus)
        // enrichments are deferred — the BCL gives us a working baseline that
        // matches the PT9 IsRemovable + size > 5MB gate.
        //
        // Per-drive try/catch mimics PT9's ErrorUtils.IgnoreErrors at
        // PathUtils.cs:210 — a single broken drive (e.g., a removed mid-scan
        // card reader) must not abort the whole enumeration.
        var collected = new List<StorageDevice>();
        DriveInfo[] drives;
        try
        {
            drives = DriveInfo.GetDrives();
        }
        catch
        {
            // If the OS itself refuses to enumerate drives (rare; e.g., macOS
            // sandbox without disk access), the contract is still "return a
            // list, possibly empty" — never throw.
            return Array.Empty<StorageDevice>();
        }

        foreach (DriveInfo drive in drives)
        {
            try
            {
                if (!drive.IsReady)
                    continue;
                if (drive.DriveType != DriveType.Removable)
                    continue;

                collected.Add(
                    new StorageDevice
                    {
                        RootPath = drive.Name,
                        Label = drive.VolumeLabel ?? string.Empty,
                        IsRemovable = true,
                        TotalSizeBytes = drive.TotalSize,
                    }
                );
            }
            catch
            {
                // Match PT9 PathUtils.cs:210 — "Will assume no USB drive
                // available on errors". Skip this drive and continue.
            }
        }

        IReadOnlyList<StorageDevice> filtered = ApplyCommonFilter(collected);

        // INV-C04 is Linux-only per PT9 PathUtils.cs:320 (the marker check
        // lives inside the __MonoCS__ block).
        if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            filtered = ApplyLinuxMarkerFilter(filtered);

        return filtered;
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
        // INV-C03 — PT9 PathUtils.cs:212 literal: TotalSize > 5_000_000
        // (strict greater-than). 5,000,000 bytes exactly is EXCLUDED.
        return raw.Where(d => d.IsRemovable && d.TotalSizeBytes > 5_000_000).ToList();
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
        // INV-C04 — PT9 PathUtils.cs:320 byte-for-byte:
        //   File.Exists(Path.Combine(mountPoint, ".paratext-hidden"))
        // Opt-OUT semantics: absent marker means the drive is kept.
        return raw.Where(d => !File.Exists(Path.Combine(d.RootPath, ".paratext-hidden"))).ToList();
    }
}
