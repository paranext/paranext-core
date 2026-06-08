namespace Paranext.DataProvider.BackupRestore;

/// <summary>
/// One USB / removable storage device returned by
/// <see cref="UsbDeviceEnumerator.Enumerate"/> for the M-005 enumerateUsbDevices
/// wire method. Mirrors the wire shape declared in
/// <c>data-contracts.md §3.9</c> (BHV-506).
/// </summary>
/// <remarks>
/// <para>
/// The record is intentionally minimal — only the four fields the BackupForm's
/// default-folder heuristic (BHV-301) consumes are surfaced. PT9's
/// <c>PathUtils.GetUsbDevices()</c> returns
/// <c>List&lt;KeyValuePair&lt;string, DriveInfo&gt;&gt;</c>; PT10 narrows that to the
/// caller-visible subset via this record.
/// </para>
/// <para>
/// Per the cross-platform USB enumeration contract (INV-C03), every instance
/// returned by <see cref="UsbDeviceEnumerator.Enumerate"/> has
/// <see cref="IsRemovable"/> = <c>true</c> and <see cref="TotalSizeBytes"/> &gt;
/// <c>5_000_000</c>. The field is carried in the record for completeness (and to
/// match the wire shape) so a future filter relaxation does not require schema
/// churn.
/// </para>
/// </remarks>
public sealed record StorageDevice
{
    /// <summary>
    /// Mount point / root path (e.g., <c>"F:\\"</c> on Windows,
    /// <c>"/media/user/USB"</c> on Linux, <c>"/Volumes/USB"</c> on macOS).
    /// </summary>
    public string RootPath { get; init; } = string.Empty;

    /// <summary>OS-reported volume label (may be empty).</summary>
    public string Label { get; init; } = string.Empty;

    /// <summary>True for USB / removable drives.</summary>
    public bool IsRemovable { get; init; }

    /// <summary>
    /// Total drive size in bytes. PT9 filters drives whose size is not strictly
    /// greater than <c>5_000_000</c> bytes (INV-C03 / <c>PathUtils.cs:212</c>).
    /// </summary>
    public long TotalSizeBytes { get; init; }
}
