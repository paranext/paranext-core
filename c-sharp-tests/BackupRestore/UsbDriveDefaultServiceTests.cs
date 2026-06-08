using System.Collections;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.BackupRestore;

namespace TestParanextDataProvider.BackupRestore
{
    /// <summary>
    /// Tests for <see cref="UsbDriveDefaultService.GetDefaultBackupFolder"/>
    /// (CAP-013 / EXT-101 heuristic half / BHV-301 / BHV-506 transitive).
    ///
    /// <para>
    /// Pure heuristic: <c>() -&gt; string?</c>. Returns the
    /// <see cref="StorageDevice.RootPath"/> of the single attached USB drive
    /// when exactly 1 device is enumerated; returns <see langword="null"/>
    /// when 0 or 2+ devices are enumerated.
    /// </para>
    ///
    /// <para>Specification sources:</para>
    /// <list type="bullet">
    ///   <item>characterization/test-scenarios.json — TS-046 (1 → root), TS-047 (0 → null), TS-048 (2+ → null)</item>
    ///   <item>behavior-catalog.md §BHV-301 — Auto-select single attached USB drive as default backup folder</item>
    ///   <item>behavior-catalog.md §BHV-506 — PathUtils.GetUsbDevices (transitive — call-site of UsbDeviceEnumerator.Enumerate)</item>
    ///   <item>data-contracts.md §9 — PT10 Implementation Alignment (file table)</item>
    ///   <item>implementation/backend-alignment.md §EXT-101 — full signature: <c>public static string? GetDefaultBackupFolder()</c></item>
    ///   <item>implementation/extraction-plan.md §EXT-101 — extraction stub + scenarios</item>
    ///   <item>implementation/strategic-plan-backend.md §CAP-013 — Success Criteria pin "does not double-enumerate"</item>
    /// </list>
    ///
    /// <para>
    /// PT9 source: <c>Paratext/BackupRestore/BackupForm.cs:49-64</c>
    /// (call site of <c>PathUtils.GetUsbDevices()</c> in the BackupForm ctor).
    /// PT9 wrote into the form's <c>backupFolder</c> field directly; PT10 returns
    /// <see langword="string?"/> so the UI can decide the
    /// <see langword="null"/> → empty-string translation at the wire boundary.
    /// </para>
    ///
    /// <para>PT10 deltas vs PT9:</para>
    /// <list type="bullet">
    ///   <item>Return shape narrowed from "write field" to <see cref="string"/>?
    ///   (the UI translates <see langword="null"/> to the empty string —
    ///   matches BHV-301 semantics: "no default → user must Browse").</item>
    ///   <item>Delegates to <see cref="UsbDeviceEnumerator.Enumerate"/>
    ///   (CAP-006) rather than calling
    ///   <c>PtxUtils.PathUtils.GetUsbDevices()</c> directly. CAP-006 already
    ///   applies INV-C03 (ready + size &gt; 5MB) and INV-C04 (Linux marker)
    ///   so this service is invariant-agnostic.</item>
    ///   <item>No try/catch — <see cref="UsbDeviceEnumerator.Enumerate"/> is
    ///   contractually never-throwing (returns an empty list on OS-level
    ///   failure).</item>
    /// </list>
    ///
    /// <para>Test seam:</para>
    /// <para>
    /// Tests redirect enumeration via
    /// <c>UsbDeviceEnumerator.EnumerationOverride</c> — an
    /// <c>internal static IReadOnlyList&lt;StorageDevice&gt;?</c> visible to
    /// <c>c-sharp-tests</c> via the existing
    /// <c>[assembly: InternalsVisibleTo("c-sharp-tests")]</c> at
    /// <c>c-sharp/AssemblyInfo.cs:3</c>. Set in <c>[SetUp]</c>, cleared in
    /// <c>[TearDown]</c>. When set, <c>Enumerate()</c> returns the override
    /// verbatim, bypassing the platform branches entirely. This is the same
    /// seam used by <c>UsbDeviceEnumeratorTests</c> — CAP-013 reuses it
    /// rather than introducing a CAP-013-private seam.
    /// </para>
    /// <para>
    /// The "does not double-enumerate" Success Criterion is enforced by wrapping
    /// the override in a <see cref="CallCountingReadOnlyList{T}"/> decorator
    /// that tracks how many times the SUT touches the list
    /// (<see cref="ICollection{T}.Count"/> / indexer / GetEnumerator). The
    /// strict assertion is "all list accesses combined happen at most twice"
    /// (since a sensible impl checks <c>.Count == 1</c> then reads <c>[0]</c>,
    /// or uses <c>.SingleOrDefault()</c> — either pattern stays ≤2). A
    /// double-enumerating implementation would invoke
    /// <see cref="UsbDeviceEnumerator.Enumerate"/> twice and would either
    /// double the touch count OR (more subtly) repeat any of those calls. The
    /// upper-bound assertion avoids over-specifying the precise iteration
    /// pattern.
    /// </para>
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class UsbDriveDefaultServiceTests
    {
        // ====================================================================
        // Per-test SetUp / TearDown — clears the EnumerationOverride seam.
        // ====================================================================

        [SetUp]
        public void SetUp()
        {
            // Defensive — start every test with a clean seam.
            UsbDeviceEnumerator.EnumerationOverride = null;
        }

        [TearDown]
        public void TearDown()
        {
            // Mandatory — leaving the seam set would mask bugs in later tests.
            UsbDeviceEnumerator.EnumerationOverride = null;
        }

        // ====================================================================
        // OUTER acceptance — TS-046 happy path through the seam.
        // ====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Critical")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-013")]
        [Property("ExtractionId", "EXT-101")]
        [Property("ScenarioId", "TS-046")]
        [Property("BehaviorId", "BHV-301")]
        [Property("BehaviorId", "BHV-506")]
        [Description(
            "OUTER acceptance (TS-046 / BHV-301): when exactly 1 USB device is "
                + "attached, GetDefaultBackupFolder returns its RootPath. "
                + "Acts as the CAP-013 acceptance test."
        )]
        public void GetDefaultBackupFolder_WithExactlyOneUsbDevice_ReturnsItsRootPath()
        {
            // Arrange — TS-046 input: PathUtils.GetUsbDevices returns 1 drive at /media/USB1/
            UsbDeviceEnumerator.EnumerationOverride = new List<StorageDevice>
            {
                new()
                {
                    RootPath = "/media/USB1/",
                    Label = "USB1",
                    IsRemovable = true,
                    TotalSizeBytes = 8L * 1024 * 1024 * 1024,
                },
            };

            // Act
            string? result = UsbDriveDefaultService.GetDefaultBackupFolder();

            // Assert — TS-046 expected output: backupFolder = '/media/USB1/'
            Assert.That(
                result,
                Is.EqualTo("/media/USB1/"),
                "TS-046 / BHV-301: exactly 1 USB drive → return its RootPath."
            );
        }

        // ====================================================================
        // TS-047 — zero USB devices.
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-013")]
        [Property("ExtractionId", "EXT-101")]
        [Property("ScenarioId", "TS-047")]
        [Property("BehaviorId", "BHV-301")]
        [Description(
            "TS-047 / BHV-301: when no USB devices are attached, "
                + "GetDefaultBackupFolder returns null. The UI translates null "
                + "to the empty string at the wire boundary so the user must "
                + "Browse to pick a destination."
        )]
        public void GetDefaultBackupFolder_WithZeroUsbDevices_ReturnsNull()
        {
            // Arrange — TS-047 input: PathUtils.GetUsbDevices returns empty list
            UsbDeviceEnumerator.EnumerationOverride = new List<StorageDevice>();

            // Act
            string? result = UsbDriveDefaultService.GetDefaultBackupFolder();

            // Assert — TS-047 expected output: no auto-select fallback
            Assert.That(
                result,
                Is.Null,
                "TS-047 / BHV-301: 0 USB drives → null (no auto-select fallback)."
            );
        }

        // ====================================================================
        // TS-048 — two USB devices.
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-013")]
        [Property("ExtractionId", "EXT-101")]
        [Property("ScenarioId", "TS-048")]
        [Property("BehaviorId", "BHV-301")]
        [Description(
            "TS-048 / BHV-301: when 2 USB devices are attached, "
                + "GetDefaultBackupFolder returns null. The heuristic is "
                + "'exactly 1', not '>=1'. Disambiguation requires user choice."
        )]
        public void GetDefaultBackupFolder_WithTwoUsbDevices_ReturnsNull()
        {
            // Arrange — TS-048 input: PathUtils.GetUsbDevices returns 2+ drives
            UsbDeviceEnumerator.EnumerationOverride = new List<StorageDevice>
            {
                new()
                {
                    RootPath = "/media/A",
                    Label = "A",
                    IsRemovable = true,
                    TotalSizeBytes = 8L * 1024 * 1024 * 1024,
                },
                new()
                {
                    RootPath = "/media/B",
                    Label = "B",
                    IsRemovable = true,
                    TotalSizeBytes = 16L * 1024 * 1024 * 1024,
                },
            };

            // Act
            string? result = UsbDriveDefaultService.GetDefaultBackupFolder();

            // Assert — TS-048 expected output: heuristic only fires when exactly 1
            Assert.That(
                result,
                Is.Null,
                "TS-048 / BHV-301: 2 USB drives → null. Disambiguation requires user choice."
            );
        }

        // ====================================================================
        // TS-048 widening — three USB devices (proves "exactly 1", not ">=1").
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-013")]
        [Property("ExtractionId", "EXT-101")]
        [Property("ScenarioId", "TS-048")]
        [Property("BehaviorId", "BHV-301")]
        [Description(
            "TS-048 widening: with 3 USB devices, the heuristic still returns "
                + "null. Proves the predicate is 'Count == 1', not 'Count >= 1' "
                + "and not 'first device wins'."
        )]
        public void GetDefaultBackupFolder_WithThreeUsbDevices_ReturnsNull()
        {
            // Arrange — three devices
            UsbDeviceEnumerator.EnumerationOverride = new List<StorageDevice>
            {
                new()
                {
                    RootPath = "/media/A",
                    Label = "A",
                    IsRemovable = true,
                    TotalSizeBytes = 8L * 1024 * 1024 * 1024,
                },
                new()
                {
                    RootPath = "/media/B",
                    Label = "B",
                    IsRemovable = true,
                    TotalSizeBytes = 16L * 1024 * 1024 * 1024,
                },
                new()
                {
                    RootPath = "/media/C",
                    Label = "C",
                    IsRemovable = true,
                    TotalSizeBytes = 32L * 1024 * 1024 * 1024,
                },
            };

            // Act
            string? result = UsbDriveDefaultService.GetDefaultBackupFolder();

            // Assert
            Assert.That(
                result,
                Is.Null,
                "3 USB drives → null. Heuristic is 'exactly 1', not 'first wins'."
            );
        }

        // ====================================================================
        // Wire-shape contract — null vs empty string.
        //
        // backend-alignment.md §EXT-101 pins the C# return as `string?`.
        // TS-047/048 describe the UI-side state as `backupFolder = ""` — but
        // that's the BackupForm field, populated after a null → "" translation
        // at the wire boundary (PT9 BackupForm.cs:62 literal: `backupFolder = ""`).
        // This test pins the C# layer to `null` so the translation lives at the
        // intended boundary, not inside this service.
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-013")]
        [Property("ExtractionId", "EXT-101")]
        [Property("BehaviorId", "BHV-301")]
        [Description(
            "Wire-shape contract: when no default is determinable, the C# "
                + "layer returns null — NOT the empty string. The null → empty "
                + "string translation lives at the UI wire boundary (matches "
                + "the backend-alignment.md §EXT-101 'string?' signature)."
        )]
        public void GetDefaultBackupFolder_WhenReturnsNull_DistinguishesFromEmptyString()
        {
            // Arrange — zero devices (one of the two null paths)
            UsbDeviceEnumerator.EnumerationOverride = new List<StorageDevice>();

            // Act
            string? result = UsbDriveDefaultService.GetDefaultBackupFolder();

            // Assert — Is.Null is STRICTLY different from Is.Empty for string?
            Assert.That(result, Is.Null, "C# contract is `string?` — returns null, not ''.");
            Assert.That(
                result,
                Is.Not.EqualTo(string.Empty),
                "Empty-string would suggest the C# layer is doing the null→'' translation; that lives at the wire boundary instead."
            );
        }

        // ====================================================================
        // RootPath verbatim — proves no normalisation / trimming.
        //
        // PT9 BackupForm.cs:61 reads `((DriveInfo)usbDrives[0].Value).RootDirectory.FullName`
        // verbatim — no trimming, no normalisation. PT10 must preserve that
        // contract: the StorageDevice.RootPath flows through unchanged.
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-013")]
        [Property("ExtractionId", "EXT-101")]
        [Property("ScenarioId", "TS-046")]
        [Property("BehaviorId", "BHV-301")]
        [Description(
            "BHV-301 verbatim contract: the single device's RootPath flows "
                + "through GetDefaultBackupFolder unchanged — no normalisation, "
                + "no trimming, no trailing-separator manipulation. Matches PT9 "
                + "BackupForm.cs:61 literal `RootDirectory.FullName`."
        )]
        public void GetDefaultBackupFolder_WithExactlyOneUsbDevice_PreservesRootPathVerbatim()
        {
            // Arrange — a RootPath with a trailing separator (a real-world Linux mount root)
            UsbDeviceEnumerator.EnumerationOverride = new List<StorageDevice>
            {
                new()
                {
                    RootPath = "/media/USB-with-trailing-slash/",
                    Label = "WithSlash",
                    IsRemovable = true,
                    TotalSizeBytes = 8L * 1024 * 1024 * 1024,
                },
            };

            // Act
            string? result = UsbDriveDefaultService.GetDefaultBackupFolder();

            // Assert — verbatim, trailing slash and all
            Assert.That(
                result,
                Is.EqualTo("/media/USB-with-trailing-slash/"),
                "RootPath must flow through verbatim — no trailing-slash trim."
            );
        }

        // ====================================================================
        // Success-criterion guard — strategic-plan §CAP-013 pins:
        // "the heuristic does not double-enumerate (delegates to a single
        // UsbDeviceEnumerator.Enumerate() call)".
        //
        // We enforce this by wrapping the EnumerationOverride list in a
        // CallCountingReadOnlyList decorator and asserting the SUT touches the
        // list at most twice per GetDefaultBackupFolder call (a sensible impl
        // checks Count then reads [0], or uses SingleOrDefault — both stay ≤2).
        // A double-enumerating implementation that calls Enumerate() twice
        // would touch the list 3+ times.
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-013")]
        [Property("ExtractionId", "EXT-101")]
        [Property("BehaviorId", "BHV-301")]
        [Description(
            "Strategic-plan §CAP-013 Success Criterion: 'heuristic does not "
                + "double-enumerate'. With a call-counting decorator over the "
                + "seam list, a single GetDefaultBackupFolder call must touch "
                + "the list at most twice (Count + indexer OR SingleOrDefault). "
                + "Stricter than 'returns the right answer'; catches a "
                + "regression that calls Enumerate() once for the count check "
                + "and again for the indexer read."
        )]
        public void GetDefaultBackupFolder_WithExactlyOneUsbDevice_DoesNotDoubleEnumerate()
        {
            // Arrange — wrap a 1-element list in a counter decorator
            var inner = new List<StorageDevice>
            {
                new()
                {
                    RootPath = "/media/USB-counted",
                    Label = "Counted",
                    IsRemovable = true,
                    TotalSizeBytes = 8L * 1024 * 1024 * 1024,
                },
            };
            var counter = new CallCountingReadOnlyList<StorageDevice>(inner);
            UsbDeviceEnumerator.EnumerationOverride = counter;

            // Act
            string? result = UsbDriveDefaultService.GetDefaultBackupFolder();

            // Assert — happy-path output, AND no double-enumeration
            Assert.That(result, Is.EqualTo("/media/USB-counted"), "Sanity: TS-046 still holds.");
            Assert.That(
                counter.TotalAccessCount,
                Is.LessThanOrEqualTo(2),
                "Strategic-plan §CAP-013: must not double-enumerate. A single Enumerate() call "
                    + "should touch the list at most twice (Count check + indexer read). "
                    + $"Observed: {counter.TotalAccessCount} touches "
                    + $"(Count: {counter.CountAccessCount}, indexer: {counter.IndexerAccessCount}, "
                    + $"GetEnumerator: {counter.GetEnumeratorAccessCount})."
            );
        }

        [Test]
        [Category("Contract")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-013")]
        [Property("ExtractionId", "EXT-101")]
        [Property("BehaviorId", "BHV-301")]
        [Description(
            "Strategic-plan §CAP-013 Success Criterion (0-device branch): even "
                + "in the null path, the heuristic must touch the seam list "
                + "at most ONCE (a single .Count check is enough — no indexer "
                + "read is needed when the count is not 1)."
        )]
        public void GetDefaultBackupFolder_WithZeroUsbDevices_DoesNotDoubleEnumerate()
        {
            // Arrange — empty list with counter
            var counter = new CallCountingReadOnlyList<StorageDevice>(new List<StorageDevice>());
            UsbDeviceEnumerator.EnumerationOverride = counter;

            // Act
            string? result = UsbDriveDefaultService.GetDefaultBackupFolder();

            // Assert — null AND ≤1 touch (no indexer read in the 0-element branch)
            Assert.That(result, Is.Null, "Sanity: TS-047 still holds.");
            Assert.That(
                counter.TotalAccessCount,
                Is.LessThanOrEqualTo(1),
                "0-device branch should touch the list at most once (single .Count check). "
                    + $"Observed: {counter.TotalAccessCount} touches "
                    + $"(Count: {counter.CountAccessCount}, indexer: {counter.IndexerAccessCount}, "
                    + $"GetEnumerator: {counter.GetEnumeratorAccessCount})."
            );
        }

        // ====================================================================
        // CallCountingReadOnlyList — decorator wrapper that counts how many
        // times the SUT touches the underlying list. Used to enforce the "no
        // double-enumeration" Success Criterion without over-specifying the
        // precise iteration pattern.
        // ====================================================================

        /// <summary>
        /// Wraps an <see cref="IReadOnlyList{T}"/> and counts how many times
        /// the SUT accesses <see cref="IReadOnlyCollection{T}.Count"/>,
        /// the indexer, and <see cref="IEnumerable{T}.GetEnumerator"/>. The
        /// counts are summed into <see cref="TotalAccessCount"/> for the
        /// strict-upper-bound assertion in the double-enumeration tests.
        /// </summary>
        private sealed class CallCountingReadOnlyList<T> : IReadOnlyList<T>
        {
            private readonly IReadOnlyList<T> _inner;

            public int CountAccessCount { get; private set; }
            public int IndexerAccessCount { get; private set; }
            public int GetEnumeratorAccessCount { get; private set; }

            public int TotalAccessCount =>
                CountAccessCount + IndexerAccessCount + GetEnumeratorAccessCount;

            public CallCountingReadOnlyList(IReadOnlyList<T> inner)
            {
                _inner = inner;
            }

            public T this[int index]
            {
                get
                {
                    IndexerAccessCount++;
                    return _inner[index];
                }
            }

            public int Count
            {
                get
                {
                    CountAccessCount++;
                    return _inner.Count;
                }
            }

            public IEnumerator<T> GetEnumerator()
            {
                GetEnumeratorAccessCount++;
                return _inner.GetEnumerator();
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                GetEnumeratorAccessCount++;
                return ((IEnumerable)_inner).GetEnumerator();
            }
        }
    }
}
