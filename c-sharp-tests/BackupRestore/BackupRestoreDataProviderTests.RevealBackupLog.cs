using System;
using System.IO;
using System.Threading.Tasks;
using Paranext.DataProvider.BackupRestore;

namespace TestParanextDataProvider.BackupRestore
{
    // === TEST SCOPE ===
    // CAP-007 OUTER acceptance tests for `RevealBackupLogAsync` (M-006) on the
    // wire-facade `BackupRestoreDataProvider`. Outside-In TDD: the OUTER test
    // (RevealBackupLog_LogFileExists_*) pins the wire envelope contract per
    // strategic-plan-backend.md §CAP-007:
    //
    //   * Result shape: { Revealed: false, LogFileExists: bool,
    //     LogFilePath: string }
    //   * `Revealed` is ALWAYS false in the C# response (DEC-315 — TS host
    //     flips it client-side after a successful shell.showItemInFolder).
    //   * `LogFileExists` mirrors `File.Exists(BackupLogService.GetLogFilePath())`
    //     at call time (no caching).
    //   * `LogFilePath` equals `BackupLogService.GetLogFilePath()` —
    //     INV-C14 enforces writer/reader path identity by construction
    //     (the wire layer routes through the same resolver as the writer).
    //
    // Contract divergence note: data-contracts.md §5.3 / DEC-333 replaces M-006
    // with the `BackupLogInfo` subscribable data type. The active contract for
    // CAP-007 — per strategic-plan-backend.md §CAP-007 + Test Writer task spec
    // — keeps the imperative `Func<RevealBackupLogRequest,
    // Task<RevealBackupLogResult>>` shape verified by these tests. Future
    // re-alignment (if any) is a separate CAP / plan revision.
    //
    // Test seam:
    //   * `BackupLogService.LogFilePathOverride` — redirects the canonical
    //     log path to a per-test temp file. Already wired by the shared
    //     [SetUp] (`BackupLogService.LogFilePathOverride = _logFilePath`) in
    //     `BackupRestoreDataProviderTests.cs`.
    //   * No other seam needed — `RevealBackupLogAsync` reads through the
    //     production `BackupLogService.GetLogFilePath()` + a real
    //     `File.Exists` probe.
    //
    // RED-state expectation: every test fails because
    // `BackupRestoreDataProvider.RevealBackupLogAsync` throws
    // `NotImplementedException("CAP-007 RED")`.
    //
    // Specification sources:
    //   * strategic-plan-backend.md §CAP-007 (active contract for this CAP)
    //   * data-contracts.md §INV-C14 (writer/reader path identity)
    //   * characterization/test-scenarios.json TS-111 (happy path —
    //     Backup.txt exists), TS-112 (error/edge — file missing)
    //   * behavior-catalog.md §BHV-654 (PT10 ALIGNMENT-002 mechanism)
    //   * alignment-decisions.md DEC-315 (TS-side OS reveal)

    internal partial class BackupRestoreDataProviderTests
    {
        // =====================================================================
        // OUTER ACCEPTANCE TEST — must pass for CAP-007 to be considered done.
        // =====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Property("BehaviorId", "BHV-654")]
        [Property("ScenarioId", "TS-111")]
        [Description(
            "Per strategic-plan-backend.md §CAP-007 acceptance test: revealBackupLog() returns { Revealed: false, LogFileExists: true, LogFilePath: <BackupLogService.GetLogFilePath()> } when Backup.txt exists on disk. `Revealed` is hard-coded false because the C# process never invokes shell.showItemInFolder (DEC-315 — TS host owns the OS-reveal call)."
        )]
        public async Task RevealBackupLog_LogFileExists_ReturnsPathAndExistsTrueAndRevealedFalse()
        {
            // Arrange — drop a real `Backup.txt` at the override path so the
            // wire layer's `File.Exists` probe sees a present file. The
            // shared [SetUp] already sets `BackupLogService.LogFilePathOverride
            // = _logFilePath`, so `BackupLogService.GetLogFilePath()` returns
            // that same path. The file does not need real backup-log content
            // — `File.Exists` only cares about presence.
            File.WriteAllText(
                _logFilePath,
                "BACKUP: 2026-05-28@10:00\r\n\tBackup Description: pre-existing\r\n\r\n"
            );

            // Act
            RevealBackupLogResult result = await _provider.RevealBackupLogAsync(
                new RevealBackupLogRequest()
            );

            // Assert — Revealed always false, LogFileExists true, LogFilePath
            // matches the writer's path resolver exactly (INV-C14).
            Assert.That(
                result.Revealed,
                Is.False,
                "DEC-315: Revealed is ALWAYS false in the C# response — the TS host flips it client-side after a successful shell.showItemInFolder."
            );
            Assert.That(
                result.LogFileExists,
                Is.True,
                "File.Exists(BackupLogService.GetLogFilePath()) is true when Backup.txt is present on disk."
            );
            Assert.That(
                result.LogFilePath,
                Is.EqualTo(BackupLogService.GetLogFilePath()),
                "LogFilePath matches BackupLogService.GetLogFilePath() (INV-C14 — writer and reader share the path resolver)."
            );
        }

        // =====================================================================
        // TS-112 — file missing path (no exception; returns LogFileExists=false)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Property("BehaviorId", "BHV-654")]
        [Property("ScenarioId", "TS-112")]
        [Description(
            "Per strategic-plan-backend.md §CAP-007 edge case: when Backup.txt is missing, revealBackupLog() returns { Revealed: false, LogFileExists: false, LogFilePath: <canonical> } with NO exception thrown. PT9 had no File.Exists precheck (REVIEW-FLAG-D2A-001); PT10's TS host branches on LogFileExists to show a clear 'no backups yet' message instead of PT9's misleading MainForm_15 fallback."
        )]
        public async Task RevealBackupLog_LogFileMissing_ReturnsPathAndExistsFalseAndRevealedFalse()
        {
            // Arrange — ensure no file exists at the override path. The
            // shared [SetUp] creates `_testTempDir` but does NOT pre-write
            // Backup.txt, so the file is naturally absent. Belt + suspenders:
            // explicitly delete if it happens to exist.
            if (File.Exists(_logFilePath))
                File.Delete(_logFilePath);
            Assert.That(
                File.Exists(_logFilePath),
                Is.False,
                "Pre-condition: Backup.txt is absent before the reveal call"
            );

            // Act
            RevealBackupLogResult result = await _provider.RevealBackupLogAsync(
                new RevealBackupLogRequest()
            );

            // Assert — same Revealed/LogFilePath as the happy path; only
            // LogFileExists flips to false. CRITICAL: no exception (the wire
            // layer never throws for a missing file).
            Assert.That(
                result.Revealed,
                Is.False,
                "DEC-315: Revealed is ALWAYS false in the C# response."
            );
            Assert.That(
                result.LogFileExists,
                Is.False,
                "File.Exists returns false when Backup.txt is absent; the wire layer surfaces this through LogFileExists rather than throwing (TS host renders the 'no backups yet' UX)."
            );
            Assert.That(
                result.LogFilePath,
                Is.EqualTo(BackupLogService.GetLogFilePath()),
                "LogFilePath is the canonical path even when the file is absent — pure resolver, no I/O."
            );
        }

        // =====================================================================
        // INV-C14 — wire-layer path identity with the writer (BackupLogService)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Property("BehaviorId", "BHV-654")]
        [Property("InvariantId", "INV-C14")]
        [Description(
            "INV-C14 (data-contracts.md): backup log is backup-only — same path for both writer (BackupLogService.AppendEntry → GetLogFilePath()) and reader (RevealBackupLogAsync → LogFilePath). Pins path identity directly — the wire layer must route through `BackupLogService.GetLogFilePath()` so the invariant holds by construction."
        )]
        public async Task RevealBackupLog_PathIdenticalToWriterPath_PinsInvariantC14()
        {
            // Arrange — no file needed; this test pins path identity, not
            // existence. The shared [SetUp] has set
            // `BackupLogService.LogFilePathOverride = _logFilePath` so both
            // sides resolve to the same value.

            // Act
            RevealBackupLogResult result = await _provider.RevealBackupLogAsync(
                new RevealBackupLogRequest()
            );

            // Assert — the reveal's LogFilePath equals the writer's resolved
            // path byte-for-byte. This is the test that would catch a
            // regression where someone wires the wire layer to a parallel
            // path-derivation (e.g., `Path.Combine(SettingsDirectory,
            // "Backup.txt")` inline) instead of routing through the shared
            // resolver.
            Assert.That(
                result.LogFilePath,
                Is.EqualTo(BackupLogService.GetLogFilePath()),
                "INV-C14: reveal-side LogFilePath equals writer-side BackupLogService.GetLogFilePath() — wire layer must route through the SAME path resolver, not a parallel derivation."
            );
            Assert.That(
                result.LogFilePath,
                Is.EqualTo(_logFilePath),
                "Both sides honor the LogFilePathOverride seam — confirms there is no fallback path-derivation that bypasses the override (which would silently divergence-leak in production)."
            );
        }

        // =====================================================================
        // Round-trip / observability — writer's AppendEntry flips Exists flag
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Property("BehaviorId", "BHV-654")]
        [Property("InvariantId", "INV-C14")]
        [Description(
            "Round-trip: an initial reveal sees LogFileExists=false; calling BackupLogService.AppendEntry (the writer side, CAP-023) creates Backup.txt; a subsequent reveal sees LogFileExists=true with the same LogFilePath. Pins (a) live `File.Exists` probing — no caching, the wire layer must re-check on every call — and (b) INV-C14 in the running system: the writer DOES flip the flag observable from the reader side."
        )]
        public async Task RevealBackupLog_AppendingEntryFlipsExistsFlag_RoundTrip()
        {
            // Arrange — ensure clean slate.
            if (File.Exists(_logFilePath))
                File.Delete(_logFilePath);

            // Act 1 — initial reveal (file absent)
            RevealBackupLogResult before = await _provider.RevealBackupLogAsync(
                new RevealBackupLogRequest()
            );

            Assert.That(
                before.LogFileExists,
                Is.False,
                "Pre-condition: LogFileExists starts false (no Backup.txt yet)."
            );

            // Act 2 — writer-side append (CAP-023). Routes through the
            // SAME `BackupLogService.GetLogFilePath()` resolver — if the
            // wire layer used a parallel path-derivation, the next reveal
            // would still see LogFileExists=false and this test would catch
            // the divergence.
            BackupLogService.AppendEntry(
                now: new DateTime(2026, 5, 28, 10, 30, 0, DateTimeKind.Utc),
                description: "cap-007 round-trip",
                projectName: "RoundTripProj",
                booksDescription: "GEN",
                filename: "round-trip.zip"
            );

            // Act 3 — subsequent reveal (file now present)
            RevealBackupLogResult after = await _provider.RevealBackupLogAsync(
                new RevealBackupLogRequest()
            );

            // Assert — LogFileExists flipped from false → true; LogFilePath
            // stayed identical (no I/O divergence between the two calls).
            Assert.That(
                after.LogFileExists,
                Is.True,
                "After AppendEntry writes Backup.txt, a subsequent reveal sees LogFileExists=true — proves the wire layer re-probes File.Exists on every call (no caching) and confirms INV-C14 (writer + reader share the path)."
            );
            Assert.That(
                after.LogFilePath,
                Is.EqualTo(before.LogFilePath),
                "LogFilePath is stable across calls — the resolver is pure."
            );
            Assert.That(
                after.Revealed,
                Is.False,
                "DEC-315: Revealed remains false in every C# response, regardless of file state."
            );
        }
    }
}
