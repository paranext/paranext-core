using System;

namespace Paranext.DataProvider.BackupRestore;

// === PORTED FROM PT9 ===
// Source: Paratext/BackupRestore/BackupForm.cs:49-64 (call site of the
//         "exactly 1 USB drive → use its root as default backupFolder" heuristic).
// Maps to: CAP-013 — EXT-101 heuristic half (the cross-platform enumeration half
//          lives in CAP-006 / UsbDeviceEnumerator).
//
// PT9 anchor (BackupForm.cs:49-64, paraphrased — Windows.Forms types stripped):
//   if (backupFolder == "" || !Directory.Exists(backupFolder))
//   {
//       DisplayValueList usbDrives = null;
//       try { usbDrives = new DisplayValueList(
//           PathUtils.GetUsbDevices().Select(usb =>
//               new DisplayValue(usb.Key, usb.Value))); }
//       catch (Exception e) { Trace.TraceWarning(e.ToString()); }
//       if (usbDrives != null && usbDrives.Count == 1)
//           backupFolder = ((DriveInfo)usbDrives[0].Value).RootDirectory.FullName;
//       else
//           backupFolder = "";
//   }
//
// PT10 deltas vs PT9:
//   * Return shape narrowed: PT9 wrote into the BackupForm's `backupFolder`
//     field; PT10 returns `string?` so the UI can decide the "null → empty
//     string" translation at the wire boundary (BHV-301 is preserved exactly:
//     "exactly 1 → use it; 0 or 2+ → leave empty"; the C# layer just signals
//     "no default" as null).
//   * Delegates to the new `UsbDeviceEnumerator.Enumerate()` shim (CAP-006),
//     which itself replaces PT9's `PathUtils.GetUsbDevices()`. The shim already
//     applies INV-C03 (ready + size > 5MB) and INV-C04 (Linux marker), so this
//     service consumes a pre-filtered list and is INVariant-agnostic.
//   * No try/catch — `UsbDeviceEnumerator.Enumerate()` is contractually
//     never-throwing (returns an empty list on OS-level failure per its own
//     never-throw contract). PT9's catch was guarding against per-drive WMI
//     exceptions; PT10 handles those inside the enumerator.

/// <summary>
/// Computes the default backup folder by inspecting attached USB drives.
/// Heuristic: if exactly 1 USB drive is attached, returns its
/// <see cref="StorageDevice.RootPath"/>; otherwise (0 or 2+) returns
/// <see langword="null"/>. Equivalent to <c>BackupForm.cs:49-64</c> in PT9
/// (BHV-301).
/// </summary>
/// <remarks>
/// <para>
/// The "heuristic" is the entire pure surface of this capability — the
/// enumeration itself (cross-platform USB / removable-drive shim with
/// INV-C03 + INV-C04 filters) lives in <see cref="UsbDeviceEnumerator"/>
/// (CAP-006). This service delegates to
/// <see cref="UsbDeviceEnumerator.Enumerate"/> for the list and applies the
/// trivial 1-vs-N decision.
/// </para>
/// <para>
/// Returns <see langword="null"/> when no default is determinable (0 USB drives
/// → user must Browse; 2+ USB drives → user must disambiguate). The UI
/// translates <see langword="null"/> to the empty string at the wire boundary.
/// </para>
/// </remarks>
internal static class UsbDriveDefaultService
{
    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/BackupForm.cs:49-64
    /// <summary>
    /// Returns the <see cref="StorageDevice.RootPath"/> of the single attached
    /// USB drive when exactly 1 device is enumerated; otherwise returns
    /// <see langword="null"/>. Delegates to
    /// <see cref="UsbDeviceEnumerator.Enumerate"/> for the underlying device
    /// list.
    /// </summary>
    /// <returns>
    /// The mount-root string (e.g., <c>"F:\\"</c> on Windows,
    /// <c>"/media/user/USB"</c> on Linux, <c>"/Volumes/USB"</c> on macOS) when
    /// exactly 1 USB drive is attached; otherwise <see langword="null"/>.
    /// </returns>
    public static string? GetDefaultBackupFolder()
    {
        // EXPLANATION (RED-state stub):
        // Implementation lands in the tdd-implementer GREEN step for CAP-013.
        // Intended GREEN body (per backend-alignment.md §EXT-101 + strategic
        // plan §CAP-013 Success Criteria — must not double-enumerate):
        //
        //     IReadOnlyList<StorageDevice> devices = UsbDeviceEnumerator.Enumerate();
        //     return devices.Count == 1 ? devices[0].RootPath : null;
        //
        // The "exactly 1" predicate matches PT9's `usbDrives.Count == 1`
        // literal (BackupForm.cs:60).
        throw new NotImplementedException(
            "UsbDriveDefaultService.GetDefaultBackupFolder is RED-state. "
                + "Implementation lands in the tdd-implementer GREEN step for CAP-013."
        );
    }
}
