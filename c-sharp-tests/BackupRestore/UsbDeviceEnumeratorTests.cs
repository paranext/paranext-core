using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using Paranext.DataProvider.BackupRestore;

namespace TestParanextDataProvider.BackupRestore
{
    /// <summary>
    /// Tests for <see cref="UsbDeviceEnumerator"/> (CAP-006 — cross-platform USB
    /// enumeration shim; the enumeration half of EXT-101).
    ///
    /// <para>
    /// Single public method <see cref="UsbDeviceEnumerator.Enumerate"/> returning
    /// an <see cref="IReadOnlyList{StorageDevice}"/>. Filter contract (INV-C03):
    /// drive ready AND <c>TotalSize &gt; 5_000_000</c> bytes. On Linux additionally
    /// (INV-C04): skip any drive whose mount root contains a
    /// <c>.paratext-hidden</c> marker file.
    /// </para>
    ///
    /// <para>
    /// Two internal helpers expose the filter logic for unit testing without
    /// platform-branch coupling:
    /// </para>
    /// <list type="bullet">
    ///   <item><see cref="UsbDeviceEnumerator.ApplyCommonFilter"/> — INV-C03
    ///   (removable + size &gt; 5 MB).</item>
    ///   <item><see cref="UsbDeviceEnumerator.ApplyLinuxMarkerFilter"/> — INV-C04
    ///   (Linux <c>.paratext-hidden</c> marker).</item>
    /// </list>
    ///
    /// <para>
    /// Specification sources:
    /// </para>
    /// <list type="bullet">
    ///   <item>test-specifications/spec-014-usb-enumeration.json — TS-100, TS-101, macOS-greenfield</item>
    ///   <item>characterization/test-scenarios.json — TS-046, TS-047, TS-048, TS-100, TS-101</item>
    ///   <item>behavior-catalog.md §BHV-506 — PathUtils.GetUsbDevices cross-platform USB enumeration</item>
    ///   <item>behavior-catalog.md §BHV-301 — Auto-select single attached USB drive (CALLER-side; CAP-013)</item>
    ///   <item>business-rules.md §INV-C03 — drive ready AND TotalSize &gt; 5 MB</item>
    ///   <item>business-rules.md §INV-C04 — Linux .paratext-hidden marker skip</item>
    ///   <item>data-contracts.md §3.9 (StorageDevice record) + §4.5 (M-005 enumerateUsbDevices)</item>
    ///   <item>implementation/extraction-plan.md §EXT-101 (split: enumeration here; heuristic in CAP-013)</item>
    ///   <item>implementation/strategic-plan-backend.md §CAP-006</item>
    /// </list>
    ///
    /// <para>
    /// PT9 source: <c>PtxUtils/PathUtils.cs:194-200</c> (entry),
    /// <c>:202-257</c> (Windows WMI), <c>:266-328</c> (Linux UDisks2). Filter
    /// literal at <c>:212</c> — <c>TotalSize &gt; 5_000_000</c>. Linux marker
    /// check at <c>:320</c> — <c>File.Exists(Path.Combine(mountPoint, ".paratext-hidden"))</c>.
    /// </para>
    ///
    /// <para>PT10 deltas vs PT9 (documented in UsbDeviceEnumerator.cs header):</para>
    /// <list type="bullet">
    ///   <item>Return shape narrowed from
    ///   <c>List&lt;KeyValuePair&lt;string, DriveInfo&gt;&gt;</c> to
    ///   <c>IReadOnlyList&lt;StorageDevice&gt;</c> — matches the wire contract.</item>
    ///   <item>macOS branch is NEW (PT9 has none — Linux branch is
    ///   <c>__MonoCS__</c>-gated).</item>
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
    /// verbatim, bypassing the platform branches entirely. Filter-contract tests
    /// instead target the internal helpers (<c>ApplyCommonFilter</c>,
    /// <c>ApplyLinuxMarkerFilter</c>) so they can drive synthetic input without
    /// any BCL <see cref="DriveInfo"/> coupling.
    /// </para>
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class UsbDeviceEnumeratorTests
    {
        // Per-test temp directory used by the INV-C04 marker tests. Always
        // initialized so [TearDown] can safely dispose it even if [SetUp] only
        // partially completes (defensive — NUnit only calls [TearDown] when
        // [SetUp] succeeded, but make it robust).
        private string _tempMountRoot = string.Empty;

        // ====================================================================
        // Per-test SetUp / TearDown — clears the EnumerationOverride seam and
        // allocates an isolated temp directory for the Linux-marker tests.
        // ====================================================================

        [SetUp]
        public void SetUp()
        {
            // Defensive — start every test with a clean seam.
            UsbDeviceEnumerator.EnumerationOverride = null;

            // Allocate an isolated mount-root surrogate per test.
            _tempMountRoot = Path.Combine(
                Path.GetTempPath(),
                $"UsbDeviceEnumeratorTests-{Guid.NewGuid():N}"
            );
            Directory.CreateDirectory(_tempMountRoot);
        }

        [TearDown]
        public void TearDown()
        {
            // Clear the seam first so a leak between tests is impossible.
            UsbDeviceEnumerator.EnumerationOverride = null;

            if (!string.IsNullOrEmpty(_tempMountRoot) && Directory.Exists(_tempMountRoot))
            {
                try
                {
                    Directory.Delete(_tempMountRoot, recursive: true);
                }
                catch
                {
                    // Swallow — TearDown should never mask the test's own
                    // failure.
                }
            }
        }

        // ====================================================================
        // OUTER acceptance — spec-014 end-to-end through the seam.
        // ====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-100")]
        [Property("InvariantId", "INV-C03")]
        [Property("BehaviorId", "BHV-506")]
        [Description(
            "OUTER acceptance (spec-014): given a mixed list of mocked devices "
                + "[4MB USB, 8GB USB, fixed-disk, network-drive], Enumerate() — invoked "
                + "through the seam-driven ApplyCommonFilter pipeline — returns only the "
                + "8GB USB drive. Acts as the spec-014 acceptance test for CAP-006."
        )]
        public void Enumerate_AfterFilterPipeline_ReturnsOnlyTheReadyOver5MbUsbDrive()
        {
            // Arrange — spec-014 TS-100 mixed list, modeled as post-platform-branch
            // StorageDevice records (the platform branch has already screened out
            // not-ready drives at the BCL boundary, so only the wire-shape fields
            // remain).
            var raw = new List<StorageDevice>
            {
                new() // 4 MB USB — fails INV-C03 size gate
                {
                    RootPath = "/media/USB-tiny",
                    Label = "USB-tiny",
                    IsRemovable = true,
                    TotalSizeBytes = 4_000_000,
                },
                new() // 8 GB USB — passes everything
                {
                    RootPath = "/media/USB-good",
                    Label = "USB-good",
                    IsRemovable = true,
                    TotalSizeBytes = 8L * 1024 * 1024 * 1024,
                },
                new() // 500 GB fixed disk — fails IsRemovable gate
                {
                    RootPath = "/",
                    Label = "Internal",
                    IsRemovable = false,
                    TotalSizeBytes = 500L * 1024 * 1024 * 1024,
                },
                new() // 1 TB network drive — fails IsRemovable gate
                {
                    RootPath = "//server/share",
                    Label = "Network",
                    IsRemovable = false,
                    TotalSizeBytes = 1024L * 1024 * 1024 * 1024,
                },
            };

            // Act — drive the filter helper directly (the seam short-circuits
            // Enumerate, so Enumerate alone cannot demonstrate the filter
            // contract; the helper IS the filter contract).
            IReadOnlyList<StorageDevice> result = UsbDeviceEnumerator.ApplyCommonFilter(raw);

            // Assert — exactly the 8 GB USB
            Assert.That(result, Has.Count.EqualTo(1), "Only the 8 GB USB must pass.");
            Assert.That(
                result[0].Label,
                Is.EqualTo("USB-good"),
                "TS-100: the 8 GB USB drive is the only one returned."
            );
        }

        // ====================================================================
        // TS-100 / INV-C03 — size filter boundary (strictly greater-than).
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-100")]
        [Property("InvariantId", "INV-C03")]
        [Property("BehaviorId", "BHV-506")]
        [Description(
            "INV-C03 size boundary — PT9 PathUtils.cs:212 literal is 'TotalSize > "
                + "5000000' (strict greater-than). A drive of exactly 5,000,000 bytes "
                + "is EXCLUDED. A drive of 5,000,001 bytes is INCLUDED."
        )]
        public void ApplyCommonFilter_FiveMillionBytesBoundary_IsStrictGreaterThan()
        {
            // Arrange — bracket the boundary
            var raw = new List<StorageDevice>
            {
                new()
                {
                    RootPath = "/below",
                    Label = "below",
                    IsRemovable = true,
                    TotalSizeBytes = 4_999_999, // 1 byte below threshold
                },
                new()
                {
                    RootPath = "/exact",
                    Label = "exact",
                    IsRemovable = true,
                    TotalSizeBytes = 5_000_000, // exactly threshold — EXCLUDED (strict >)
                },
                new()
                {
                    RootPath = "/above",
                    Label = "above",
                    IsRemovable = true,
                    TotalSizeBytes = 5_000_001, // 1 byte above threshold
                },
            };

            // Act
            IReadOnlyList<StorageDevice> result = UsbDeviceEnumerator.ApplyCommonFilter(raw);

            // Assert — only "above" passes (strict >, not >=)
            Assert.That(result, Has.Count.EqualTo(1), "Only 'above' passes the strict-> gate.");
            Assert.That(
                result[0].Label,
                Is.EqualTo("above"),
                "INV-C03 is 'TotalSize > 5_000_000' — 5_000_000 itself is EXCLUDED, 5_000_001 INCLUDED."
            );
        }

        [Test]
        [Category("Contract")]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-006")]
        [Property("InvariantId", "INV-C03")]
        [Property("BehaviorId", "BHV-506")]
        [Description(
            "INV-C03 removable gate — devices with IsRemovable=false are filtered "
                + "out unconditionally, regardless of size. Internal drives (IDE/SATA) "
                + "and external non-USB (eSATA / Thunderbolt) are never returned."
        )]
        public void ApplyCommonFilter_WithIsRemovableFalse_ExcludesEvenLargeDrives()
        {
            // Arrange — a 1 TB fixed disk that would pass the size gate
            var raw = new List<StorageDevice>
            {
                new()
                {
                    RootPath = "/",
                    Label = "Internal",
                    IsRemovable = false,
                    TotalSizeBytes = 1024L * 1024 * 1024 * 1024,
                },
            };

            // Act
            IReadOnlyList<StorageDevice> result = UsbDeviceEnumerator.ApplyCommonFilter(raw);

            // Assert
            Assert.That(
                result,
                Is.Empty,
                "INV-C03: IsRemovable=false drives are filtered out unconditionally."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("BehaviorId", "BHV-506")]
        [Description(
            "ApplyCommonFilter against an empty input returns an empty list — not "
                + "null. The wire contract guarantees a non-null IReadOnlyList."
        )]
        public void ApplyCommonFilter_WithEmptyInput_ReturnsEmptyList()
        {
            // Act
            IReadOnlyList<StorageDevice> result = UsbDeviceEnumerator.ApplyCommonFilter(
                Enumerable.Empty<StorageDevice>()
            );

            // Assert
            Assert.That(result, Is.Not.Null, "Result must be non-null per the wire contract.");
            Assert.That(result, Is.Empty, "Empty input → empty output.");
        }

        // ====================================================================
        // TS-101 / INV-C04 — Linux .paratext-hidden marker check.
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-101")]
        [Property("InvariantId", "INV-C04")]
        [Property("BehaviorId", "BHV-506")]
        [Description(
            "TS-101 / INV-C04: when the mount root contains a '.paratext-hidden' "
                + "marker file, the drive is excluded. PT9 PathUtils.cs:320 byte-for-byte "
                + "match: File.Exists(Path.Combine(mountPoint, '.paratext-hidden'))."
        )]
        public void ApplyLinuxMarkerFilter_WhenMarkerPresent_ExcludesDrive()
        {
            // Arrange — drop the marker file in the temp mount root
            string markerPath = Path.Combine(_tempMountRoot, ".paratext-hidden");
            File.WriteAllText(markerPath, string.Empty);
            Assert.That(File.Exists(markerPath), Is.True, "Precondition: marker exists.");

            var raw = new List<StorageDevice>
            {
                new()
                {
                    RootPath = _tempMountRoot,
                    Label = "USB-Hidden",
                    IsRemovable = true,
                    TotalSizeBytes = 8L * 1024 * 1024 * 1024,
                },
            };

            // Act
            IReadOnlyList<StorageDevice> result = UsbDeviceEnumerator.ApplyLinuxMarkerFilter(raw);

            // Assert
            Assert.That(
                result,
                Is.Empty,
                "INV-C04: drives with a .paratext-hidden marker at the mount root must be excluded."
            );
        }

        [Test]
        [Category("Contract")]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-101")]
        [Property("InvariantId", "INV-C04")]
        [Property("BehaviorId", "BHV-506")]
        [Description(
            "INV-C04 negative case: no '.paratext-hidden' marker means the drive "
                + "passes through unchanged. The marker check is opt-OUT, not opt-IN."
        )]
        public void ApplyLinuxMarkerFilter_WhenNoMarker_PassesDriveThrough()
        {
            // Arrange — no marker file in the temp mount root
            string markerPath = Path.Combine(_tempMountRoot, ".paratext-hidden");
            Assert.That(File.Exists(markerPath), Is.False, "Precondition: marker must NOT exist.");

            var raw = new List<StorageDevice>
            {
                new()
                {
                    RootPath = _tempMountRoot,
                    Label = "USB-Norm",
                    IsRemovable = true,
                    TotalSizeBytes = 8L * 1024 * 1024 * 1024,
                },
            };

            // Act
            IReadOnlyList<StorageDevice> result = UsbDeviceEnumerator.ApplyLinuxMarkerFilter(raw);

            // Assert
            Assert.That(result, Has.Count.EqualTo(1), "Drive without marker must pass through.");
            Assert.That(
                result[0].Label,
                Is.EqualTo("USB-Norm"),
                "INV-C04 is opt-out: absent marker means the drive is kept."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-101")]
        [Property("InvariantId", "INV-C04")]
        [Property("BehaviorId", "BHV-506")]
        [Description(
            "INV-C04 selectivity: with two drives where one has the marker and one "
                + "does not, ONLY the marked drive is excluded. The filter must be "
                + "per-drive, not all-or-nothing."
        )]
        public void ApplyLinuxMarkerFilter_MixedMarkedAndUnmarked_KeepsOnlyUnmarked()
        {
            // Arrange — set up two temp mount roots, drop a marker in one
            string hiddenRoot = Path.Combine(Path.GetTempPath(), $"UsbHidden-{Guid.NewGuid():N}");
            Directory.CreateDirectory(hiddenRoot);
            File.WriteAllText(Path.Combine(hiddenRoot, ".paratext-hidden"), string.Empty);

            try
            {
                var raw = new List<StorageDevice>
                {
                    new()
                    {
                        RootPath = hiddenRoot,
                        Label = "Hidden",
                        IsRemovable = true,
                        TotalSizeBytes = 8L * 1024 * 1024 * 1024,
                    },
                    new()
                    {
                        RootPath = _tempMountRoot, // no marker — from [SetUp]
                        Label = "Visible",
                        IsRemovable = true,
                        TotalSizeBytes = 8L * 1024 * 1024 * 1024,
                    },
                };

                // Act
                IReadOnlyList<StorageDevice> result = UsbDeviceEnumerator.ApplyLinuxMarkerFilter(
                    raw
                );

                // Assert
                Assert.That(result, Has.Count.EqualTo(1), "Only the unmarked drive remains.");
                Assert.That(
                    result[0].Label,
                    Is.EqualTo("Visible"),
                    "INV-C04 is per-drive: the visible drive must survive."
                );
            }
            finally
            {
                if (Directory.Exists(hiddenRoot))
                    Directory.Delete(hiddenRoot, recursive: true);
            }
        }

        // ====================================================================
        // TS-046 / TS-047 / TS-048 — Enumerate() shape via the override seam.
        //
        // These pin the *return shape* of Enumerate (0, 1, 2+ devices) so the
        // caller (CAP-013 / UsbDriveDefaultService heuristic) can rely on it.
        // The filter logic is NOT exercised here — that's the helpers' job.
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-046")]
        [Property("BehaviorId", "BHV-506")]
        [Property("BehaviorId", "BHV-301")]
        [Description(
            "TS-046 (enumeration side): when the override seam supplies exactly 1 "
                + "device, Enumerate() returns a single-element list. The 'use as "
                + "default backup folder' heuristic itself lives in CAP-013."
        )]
        public void Enumerate_WithExactlyOneOverrideDevice_ReturnsSingleElementList()
        {
            // Arrange
            var single = new StorageDevice
            {
                RootPath = "/media/USB1",
                Label = "USB1",
                IsRemovable = true,
                TotalSizeBytes = 8L * 1024 * 1024 * 1024,
            };
            UsbDeviceEnumerator.EnumerationOverride = new List<StorageDevice> { single };

            // Act
            IReadOnlyList<StorageDevice> result = UsbDeviceEnumerator.Enumerate();

            // Assert
            Assert.That(result, Has.Count.EqualTo(1), "TS-046: exactly one device returned.");
            Assert.That(
                result[0].RootPath,
                Is.EqualTo("/media/USB1"),
                "The single device's RootPath flows through verbatim."
            );
        }

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-047")]
        [Property("BehaviorId", "BHV-506")]
        [Property("BehaviorId", "BHV-301")]
        [Description(
            "TS-047 (enumeration side): when the override seam supplies an empty "
                + "list, Enumerate() returns an empty (non-null) list. The wire "
                + "contract guarantees a non-null IReadOnlyList."
        )]
        public void Enumerate_WithEmptyOverride_ReturnsEmptyNonNullList()
        {
            // Arrange
            UsbDeviceEnumerator.EnumerationOverride = new List<StorageDevice>();

            // Act
            IReadOnlyList<StorageDevice> result = UsbDeviceEnumerator.Enumerate();

            // Assert
            Assert.That(result, Is.Not.Null, "TS-047: result must be non-null.");
            Assert.That(result, Is.Empty, "TS-047: zero devices → empty list.");
        }

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-048")]
        [Property("BehaviorId", "BHV-506")]
        [Property("BehaviorId", "BHV-301")]
        [Description(
            "TS-048 (enumeration side): when the override seam supplies 2+ "
                + "devices, Enumerate() returns ALL of them. The disambiguation "
                + "(2+ → leave folder empty) is CALLER-side (CAP-013)."
        )]
        public void Enumerate_WithTwoOrMoreOverrideDevices_ReturnsAllOfThem()
        {
            // Arrange — three devices
            var devices = new List<StorageDevice>
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
            UsbDeviceEnumerator.EnumerationOverride = devices;

            // Act
            IReadOnlyList<StorageDevice> result = UsbDeviceEnumerator.Enumerate();

            // Assert
            Assert.That(result, Has.Count.EqualTo(3), "TS-048: all three devices returned.");
            Assert.That(
                result.Select(d => d.Label),
                Is.EquivalentTo(new[] { "A", "B", "C" }),
                "TS-048: ALL devices flow through Enumerate when 2+ are attached."
            );
        }

        // ====================================================================
        // Override-seam hygiene — verifies the seam itself.
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("BehaviorId", "BHV-506")]
        [Description(
            "The override seam is opt-in. When null (the default + [TearDown]'d "
                + "state), Enumerate() must invoke the real platform branch and "
                + "return a non-null IReadOnlyList. This fails under the RED stub "
                + "(NotImplementedException) and passes under GREEN (the platform "
                + "branch returns a list, possibly empty)."
        )]
        public void Enumerate_WithNullOverride_InvokesPlatformBranchAndReturnsList()
        {
            // Arrange — defensive: [SetUp] already null'd the override; re-assert.
            UsbDeviceEnumerator.EnumerationOverride = null;

            // Act — the platform branch is invoked
            IReadOnlyList<StorageDevice> result = UsbDeviceEnumerator.Enumerate();

            // Assert — non-null list (possibly empty on a host with no USB drives)
            Assert.That(
                result,
                Is.Not.Null,
                "When the override is null, Enumerate() must invoke the platform branch "
                    + "and return a non-null IReadOnlyList<StorageDevice>."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("BehaviorId", "BHV-506")]
        [Description(
            "When the override is set then cleared mid-test, Enumerate() falls "
                + "back to the platform branch — proving the seam is a runtime "
                + "switch, not a one-time bake-in."
        )]
        public void Enumerate_OverrideSetThenCleared_FallsBackToPlatformBranch()
        {
            // Arrange — set the override and confirm it's used
            var one = new StorageDevice
            {
                RootPath = "/x",
                Label = "x",
                IsRemovable = true,
                TotalSizeBytes = 8L * 1024 * 1024 * 1024,
            };
            UsbDeviceEnumerator.EnumerationOverride = new List<StorageDevice> { one };

            IReadOnlyList<StorageDevice> first = UsbDeviceEnumerator.Enumerate();
            Assert.That(first, Has.Count.EqualTo(1), "Precondition: override is used while set.");

            // Act — clear the override
            UsbDeviceEnumerator.EnumerationOverride = null;

            // Assert — Enumerate now invokes the real platform branch and
            // returns a non-null IReadOnlyList (possibly empty on a host with
            // no removable drives attached). Under the RED stub this threw
            // NotImplementedException; the GREEN platform branch returns a
            // list, which is the intent documented in the [Description].
            IReadOnlyList<StorageDevice> second = UsbDeviceEnumerator.Enumerate();
            Assert.That(
                second,
                Is.Not.Null,
                "After clearing the override, Enumerate() must invoke the real platform branch "
                    + "and return a non-null IReadOnlyList<StorageDevice>."
            );
        }

        // ====================================================================
        // StorageDevice record — shape + value semantics, exercised THROUGH the
        // enumerator pipeline so the assertions can only succeed once the GREEN
        // implementation lands. The wire-shape itself is locked at type-
        // definition time; these tests pin "the shape flows verbatim through
        // ApplyCommonFilter / Enumerate" which is genuinely RED-state-failing.
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("BehaviorId", "BHV-506")]
        [Description(
            "StorageDevice shape (data-contracts.md §3.9): exactly four fields — "
                + "RootPath (string), Label (string), IsRemovable (bool), "
                + "TotalSizeBytes (long). The pipeline must preserve every field "
                + "verbatim (no transformation, no null-on-default). Exercised via "
                + "ApplyCommonFilter so this fails under the RED stub."
        )]
        public void ApplyCommonFilter_PreservesEveryStorageDeviceFieldVerbatim()
        {
            // Arrange — a single device exercising all four fields with non-default values
            var input = new StorageDevice
            {
                RootPath = "/media/USB-shape-check",
                Label = "ShapeCheck",
                IsRemovable = true,
                TotalSizeBytes = 8L * 1024 * 1024 * 1024,
            };

            // Act — must flow through ApplyCommonFilter unchanged (passes the
            // INV-C03 gate: IsRemovable=true + size > 5MB)
            IReadOnlyList<StorageDevice> result = UsbDeviceEnumerator.ApplyCommonFilter(
                new[] { input }
            );

            // Assert — exactly one device, all four fields preserved verbatim
            Assert.That(result, Has.Count.EqualTo(1), "Device must survive the filter.");
            Assert.That(
                result[0].RootPath,
                Is.EqualTo("/media/USB-shape-check"),
                "RootPath must flow through unchanged."
            );
            Assert.That(
                result[0].Label,
                Is.EqualTo("ShapeCheck"),
                "Label must flow through unchanged."
            );
            Assert.That(result[0].IsRemovable, Is.True, "IsRemovable must flow through unchanged.");
            Assert.That(
                result[0].TotalSizeBytes,
                Is.EqualTo(8L * 1024 * 1024 * 1024),
                "TotalSizeBytes must flow through unchanged."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("BehaviorId", "BHV-506")]
        [Description(
            "StorageDevice record value semantics — two devices that flow through "
                + "the Enumerate seam with identical inputs compare equal. Exercised "
                + "via the Enumerate pipeline so this test fails under the RED stub."
        )]
        public void Enumerate_WithIdenticalDevicesAcrossTwoCalls_ReturnsEqualRecords()
        {
            // Arrange — set up the override with one device, capture, then re-set
            // with another instance that is field-equivalent.
            UsbDeviceEnumerator.EnumerationOverride = new List<StorageDevice>
            {
                new()
                {
                    RootPath = "/media/USB1",
                    Label = "USB1",
                    IsRemovable = true,
                    TotalSizeBytes = 8L * 1024 * 1024 * 1024,
                },
            };
            IReadOnlyList<StorageDevice> first = UsbDeviceEnumerator.Enumerate();

            UsbDeviceEnumerator.EnumerationOverride = new List<StorageDevice>
            {
                new()
                {
                    RootPath = "/media/USB1",
                    Label = "USB1",
                    IsRemovable = true,
                    TotalSizeBytes = 8L * 1024 * 1024 * 1024,
                },
            };
            IReadOnlyList<StorageDevice> second = UsbDeviceEnumerator.Enumerate();

            // Assert — record equality across calls
            Assert.That(first, Has.Count.EqualTo(1), "First call must return exactly one device.");
            Assert.That(
                second,
                Has.Count.EqualTo(1),
                "Second call must return exactly one device."
            );
            Assert.That(
                first[0],
                Is.EqualTo(second[0]),
                "Records with identical fields must compare equal across calls."
            );
        }

        // ====================================================================
        // macOS-greenfield contract (spec-014 scenario).
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("BehaviorId", "BHV-506")]
        [Description(
            "ALIGNMENT-003 / spec-014 macOS-greenfield: on macOS, Enumerate() "
                + "must NOT throw under normal conditions — it must return an "
                + "IReadOnlyList<StorageDevice>. The seam-driven path is the "
                + "platform-neutral contract; the platform branch implementation "
                + "is the implementer's choice (DriveInfo.GetDrives filtered by "
                + "DriveType.Removable is the first cut, per strategic plan §CAP-006)."
        )]
        public void Enumerate_OnAnyPlatform_ViaSeam_ReturnsAReadOnlyList()
        {
            // Arrange — empty override (the simplest valid platform-neutral
            // contract: 'returns a list, possibly empty')
            UsbDeviceEnumerator.EnumerationOverride = new List<StorageDevice>();

            // Act
            IReadOnlyList<StorageDevice> result = UsbDeviceEnumerator.Enumerate();

            // Assert — non-null IReadOnlyList
            Assert.That(
                result,
                Is.Not.Null,
                "Per the spec-014 macOS-greenfield contract, Enumerate must return a list (not throw / not null)."
            );
            Assert.That(
                result,
                Is.InstanceOf<IReadOnlyList<StorageDevice>>(),
                "Per data-contracts.md §4.5, the C# return type is IReadOnlyList<StorageDevice>."
            );
        }
    }
}
