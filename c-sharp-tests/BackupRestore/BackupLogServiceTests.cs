using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using Paranext.DataProvider.BackupRestore;

namespace TestParanextDataProvider.BackupRestore
{
    /// <summary>
    /// Tests for <see cref="BackupLogService"/> (CAP-023 — BackupLogService Backup.txt append +
    /// reveal-path resolver).
    ///
    /// <para>
    /// Two-method static service:
    /// </para>
    /// <list type="bullet">
    ///   <item><c>AppendEntry(DateTime now, string description, string projectName, string booksDescription, string filename)</c>
    ///   — appends one 5-line UTF-8 entry to <c>&lt;SettingsDirectory&gt;/Backup.txt</c>.</item>
    ///   <item><c>GetLogFilePath()</c> — returns the canonical absolute path (pure, no I/O).</item>
    /// </list>
    ///
    /// <para>
    /// Specification sources:
    /// </para>
    /// <list type="bullet">
    ///   <item>test-specifications/spec-003-backup-log-writer.json — TS-013 (date format), TS-014 (5-line shape)</item>
    ///   <item>characterization/test-scenarios.json — TS-013, TS-014, TS-111, TS-112</item>
    ///   <item>behavior-catalog.md §BHV-103 — Backup log writer (BackupLogFile + WriteBackupLogEntry)</item>
    ///   <item>behavior-catalog.md §BHV-654 — View-Backup-Log entry — OS-shell delegation (path-resolver side)</item>
    ///   <item>business-rules.md §INV-A19 — Backups with no project files produce no backup-log entry (caller's responsibility)</item>
    ///   <item>data-contracts.md §INV-C14 — Backup log is backup-only — same path for writer and reader</item>
    ///   <item>implementation/strategic-plan-backend.md §CAP-023</item>
    /// </list>
    ///
    /// <para>
    /// PT9 source: <c>Paratext/BackupRestore/Backup.cs:171-181</c> (writer), <c>:46-49</c> (path),
    /// <c>:41-44</c> (DateStr format):
    /// </para>
    /// <code>
    /// // DateStr
    /// public static string DateStr
    /// { get { return DateTime.Now.ToString("o").Substring(0, 16).Replace("T", "@"); } }
    ///
    /// // BackupLogFile
    /// public static string BackupLogFile
    /// { get { return Path.Combine(ScrTextCollection.SettingsDirectory, "Backup.txt"); } }
    ///
    /// // WriteBackupLogEntry
    /// string s = "BACKUP: " + DateStr
    ///         + "\r\n\tBackup Description: " + description
    ///         + "\r\n\tBackup Project: " + scrText.Name
    ///         + "\r\n\tBooks: " + selectedBooks.Summary()
    ///         + "\r\n\tFilename: " + destFileSpec + "\r\n\r\n";
    /// File.AppendAllText(BackupLogFile, s, Encoding.UTF8);
    /// </code>
    ///
    /// <para>PT10 deltas vs PT9 (documented in BackupLogService.cs header):</para>
    /// <list type="bullet">
    ///   <item>BookSet → caller-formatted <c>booksDescription</c> string. PT9 called
    ///   <c>selectedBooks.Summary()</c> inside the writer; PT10 callers compute it so this
    ///   service stays free of the <c>BookSet</c> dependency.</item>
    ///   <item>ScrText → caller-provided <c>projectName</c> string. Same reason.</item>
    ///   <item>RF-D1-006: <c>now</c> is a caller-provided parameter (NOT <c>DateTime.Now</c>) so
    ///   the caller can pin UTC vs local.</item>
    /// </list>
    ///
    /// <para>Test seam:</para>
    /// <para>
    /// Tests redirect file I/O via <c>BackupLogService.LogFilePathOverride</c> — an
    /// <c>internal static string?</c> visible to <c>c-sharp-tests</c> via
    /// <c>[assembly: InternalsVisibleTo("c-sharp-tests")]</c> at
    /// <c>c-sharp/AssemblyInfo.cs:3</c>. Set in <c>[SetUp]</c>, cleared in <c>[TearDown]</c>.
    /// </para>
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class BackupLogServiceTests
    {
        // Temp file path used for AppendEntry tests. Created per-test via [SetUp].
        // Initialized so the [TearDown] can dispose it even if [SetUp] never ran to completion
        // (defensive — NUnit only calls [TearDown] when [SetUp] succeeded, but make it robust).
        private string _tempLogPath = string.Empty;

        // ====================================================================
        // Per-test SetUp / TearDown — installs the LogFilePathOverride test seam.
        // ====================================================================

        [SetUp]
        public void SetUp()
        {
            // Allocate a unique temp file path per test. We do NOT create the file —
            // first AppendEntry must demonstrate file-creation behavior. Path is a
            // legal but non-existent location under the OS temp dir.
            _tempLogPath = Path.Combine(
                Path.GetTempPath(),
                $"BackupLogServiceTests-{Guid.NewGuid():N}.txt"
            );

            // Install the unit-test seam.
            BackupLogService.LogFilePathOverride = _tempLogPath;
        }

        [TearDown]
        public void TearDown()
        {
            // Clear the seam first so a leak between tests is impossible.
            BackupLogService.LogFilePathOverride = null;

            if (!string.IsNullOrEmpty(_tempLogPath) && File.Exists(_tempLogPath))
            {
                try
                {
                    File.Delete(_tempLogPath);
                }
                catch
                {
                    // Swallow — TearDown should never mask the test's own failure.
                }
            }
        }

        // ====================================================================
        // OUTER acceptance — spec-003 acceptance test, end-to-end.
        // ====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-023")]
        [Property("ScenarioId", "TS-013")]
        [Property("ScenarioId", "TS-014")]
        [Property("BehaviorId", "BHV-103")]
        [Description(
            "OUTER acceptance (spec-003): AppendEntry writes a 5-line UTF-8 entry in the exact "
                + "PT9 byte format — 'BACKUP: YYYY-MM-DD@HH:MM\\r\\n\\tBackup Description: <desc>\\r\\n\\t"
                + "Backup Project: <Name>\\r\\n\\tBooks: <Summary>\\r\\n\\tFilename: <filename>\\r\\n\\r\\n'. "
                + "Acts as the spec-003 acceptance test for CAP-023."
        )]
        public void AppendEntry_WithSpecExampleInput_ProducesExactPt9ByteSequence()
        {
            // Arrange — exact spec-003 sample values
            var now = new DateTime(2026, 5, 11, 13, 42, 30, DateTimeKind.Utc);
            const string description = "test desc";
            const string projectName = "ProjA";
            const string booksDescription = "GEN-MAL,MAT-REV";
            const string filename = "/tmp/ProjA.zip";

            // Act
            BackupLogService.AppendEntry(now, description, projectName, booksDescription, filename);

            // Assert — file exists at the override path
            Assert.That(
                File.Exists(_tempLogPath),
                Is.True,
                "AppendEntry must create the log file if it does not exist."
            );

            // Assert — byte sequence is the literal PT9 5-line entry + trailing blank line
            string expected =
                "BACKUP: 2026-05-11@13:42\r\n"
                + "\tBackup Description: test desc\r\n"
                + "\tBackup Project: ProjA\r\n"
                + "\tBooks: GEN-MAL,MAT-REV\r\n"
                + "\tFilename: /tmp/ProjA.zip\r\n"
                + "\r\n";
            byte[] expectedBytes = Encoding.UTF8.GetBytes(expected);
            byte[] actualBytes = File.ReadAllBytes(_tempLogPath);

            Assert.That(
                actualBytes,
                Is.EqualTo(expectedBytes),
                "Exact PT9 byte sequence (CRLF separators, trailing CRLF CRLF, no UTF-8 BOM) must "
                    + "be preserved for golden-master parity with gm-011/012."
            );
        }

        // ====================================================================
        // TS-013 — Date format YYYY-MM-DD@HH:MM (PT9 DateStr formula).
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-023")]
        [Property("ScenarioId", "TS-013")]
        [Property("BehaviorId", "BHV-103")]
        [Description(
            "TS-013: First line of every entry matches '^BACKUP: \\d{4}-\\d{2}-\\d{2}@\\d{2}:\\d{2}$'. "
                + "PT9 DateStr formula: now.ToString(\"o\").Substring(0,16).Replace(\"T\",\"@\"). Seconds "
                + "and milliseconds MUST NOT leak into the entry."
        )]
        public void AppendEntry_FirstLine_MatchesYyyyMmDdAtHhMmRegex()
        {
            // Arrange — non-trivial sub-minute components so any leak would be visible
            var now = new DateTime(2026, 5, 11, 13, 42, 59, 999);

            // Act
            BackupLogService.AppendEntry(now, "desc", "Proj", "GEN", "/tmp/x.zip");

            // Assert
            string[] lines = ReadEntryLines(_tempLogPath);
            Assert.That(
                lines[0],
                Does.Match("^BACKUP: \\d{4}-\\d{2}-\\d{2}@\\d{2}:\\d{2}$"),
                "TS-013: first line must be 'BACKUP: YYYY-MM-DD@HH:MM' with no seconds/ms."
            );

            // Stronger assertion — for this specific `now` value, the exact stamp.
            Assert.That(
                lines[0],
                Is.EqualTo("BACKUP: 2026-05-11@13:42"),
                "TS-013: exact stamp from now=2026-05-11T13:42:59.999."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-023")]
        [Property("ScenarioId", "TS-013")]
        [Property("BehaviorId", "BHV-103")]
        [Description(
            "TS-013 / RF-D1-006: `now` is caller-pinned (NOT DateTime.Now). Two distinct `now` values "
                + "produce two distinct stamps in the file."
        )]
        public void AppendEntry_WithDifferentNowValues_ProducesDifferentStamps()
        {
            // Arrange — two clearly-distinct moments
            var nowJan = new DateTime(2026, 1, 1, 0, 0, 0);
            var nowDec = new DateTime(2026, 12, 31, 23, 59, 0);

            // Act — two entries into the same file
            BackupLogService.AppendEntry(nowJan, "d", "P", "GEN", "/tmp/a.zip");
            BackupLogService.AppendEntry(nowDec, "d", "P", "GEN", "/tmp/b.zip");

            // Assert — both stamps land in the file, distinct
            string contents = File.ReadAllText(_tempLogPath);
            Assert.That(
                contents,
                Does.Contain("BACKUP: 2026-01-01@00:00"),
                "First entry must carry the January stamp."
            );
            Assert.That(
                contents,
                Does.Contain("BACKUP: 2026-12-31@23:59"),
                "Second entry must carry the December stamp."
            );
        }

        // ====================================================================
        // TS-014 — 5-line entry per backup.
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-023")]
        [Property("ScenarioId", "TS-014")]
        [Property("BehaviorId", "BHV-103")]
        [Description(
            "TS-014: a single AppendEntry call writes exactly 5 content lines (BACKUP header + 4 "
                + "tab-indented metadata lines), regex-checked per spec-003."
        )]
        public void AppendEntry_OneCall_WritesFiveContentLinesInPt9Shape()
        {
            // Arrange
            var now = new DateTime(2026, 5, 11, 13, 42, 0);

            // Act
            BackupLogService.AppendEntry(
                now,
                "user description",
                "ProjA",
                "GEN-MAL",
                "/tmp/proj.zip"
            );

            // Assert — exactly 5 content lines
            string[] lines = ReadEntryLines(_tempLogPath);
            Assert.That(
                lines.Length,
                Is.EqualTo(5),
                "TS-014: entry must contain exactly 5 content lines."
            );

            // Per-line regex assertions (spec-003 TS-014 assertions block)
            Assert.That(lines[0], Does.Match("^BACKUP: \\d{4}-\\d{2}-\\d{2}@\\d{2}:\\d{2}$"));
            Assert.That(
                lines[1],
                Does.Match("^\\tBackup Description: "),
                "TS-014: line 2 is tab-indented 'Backup Description: ...'"
            );
            Assert.That(
                lines[2],
                Does.Match("^\\tBackup Project: "),
                "TS-014: line 3 is tab-indented 'Backup Project: ...'"
            );
            Assert.That(
                lines[3],
                Does.Match("^\\tBooks: "),
                "TS-014: line 4 is tab-indented 'Books: ...'"
            );
            Assert.That(
                lines[4],
                Does.Match("^\\tFilename: "),
                "TS-014: line 5 is tab-indented 'Filename: ...'"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-023")]
        [Property("ScenarioId", "TS-014")]
        [Property("BehaviorId", "BHV-103")]
        [Description(
            "TS-014: two sequential AppendEntry calls append (not overwrite) — the file grows by "
                + "exactly the second entry's bytes; the first entry's bytes are preserved."
        )]
        public void AppendEntry_TwoSequentialCalls_AppendsBothEntriesPreservingFirst()
        {
            // Arrange — two distinct entries
            var now1 = new DateTime(2026, 5, 11, 13, 42, 0);
            var now2 = new DateTime(2026, 5, 11, 14, 55, 0);

            // Act
            BackupLogService.AppendEntry(now1, "first", "ProjA", "GEN", "/tmp/a.zip");
            long sizeAfterFirst = new FileInfo(_tempLogPath).Length;

            BackupLogService.AppendEntry(now2, "second", "ProjB", "MAT", "/tmp/b.zip");
            long sizeAfterSecond = new FileInfo(_tempLogPath).Length;

            // Assert — file grew (append, not overwrite)
            Assert.That(
                sizeAfterSecond,
                Is.GreaterThan(sizeAfterFirst),
                "Second call must APPEND, not overwrite."
            );

            // Assert — both entries' content present, in order
            string contents = File.ReadAllText(_tempLogPath);
            int idxFirstHeader = contents.IndexOf(
                "BACKUP: 2026-05-11@13:42",
                StringComparison.Ordinal
            );
            int idxSecondHeader = contents.IndexOf(
                "BACKUP: 2026-05-11@14:55",
                StringComparison.Ordinal
            );
            Assert.That(idxFirstHeader, Is.GreaterThanOrEqualTo(0), "First entry header missing.");
            Assert.That(
                idxSecondHeader,
                Is.GreaterThan(idxFirstHeader),
                "Second entry header must come after the first (append-order, no truncation)."
            );

            Assert.That(contents, Does.Contain("first"), "First entry's description must survive.");
            Assert.That(
                contents,
                Does.Contain("second"),
                "Second entry's description must survive."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-023")]
        [Property("ScenarioId", "TS-014")]
        [Property("BehaviorId", "BHV-103")]
        [Description(
            "TS-014 (RF-A09): line separators are CRLF (\\r\\n), and each entry ends with a blank "
                + "line (\\r\\n\\r\\n). PT9 byte-parity is required for the View Backup Log reader."
        )]
        public void AppendEntry_LineSeparators_AreCrlfWithTrailingBlankLine()
        {
            // Arrange
            var now = new DateTime(2026, 5, 11, 13, 42, 0);

            // Act
            BackupLogService.AppendEntry(now, "d", "P", "GEN", "/tmp/a.zip");

            // Assert
            byte[] bytes = File.ReadAllBytes(_tempLogPath);
            string content = Encoding.UTF8.GetString(bytes);

            // Must NOT contain any bare LF that isn't preceded by CR (PT9 parity).
            // Walk the bytes — every 0x0A must be preceded by 0x0D.
            for (int i = 0; i < bytes.Length; i++)
            {
                if (bytes[i] == 0x0A)
                {
                    Assert.That(
                        i,
                        Is.GreaterThan(0),
                        "LF at byte 0 — there is no preceding CR. PT9 uses CRLF exclusively."
                    );
                    Assert.That(
                        bytes[i - 1],
                        Is.EqualTo((byte)0x0D),
                        $"LF at byte {i} not preceded by CR. PT9 uses CRLF exclusively."
                    );
                }
            }

            // Must end with "\r\n\r\n" (blank line after entry — PT9 parity for the reader).
            Assert.That(
                content,
                Does.EndWith("\r\n\r\n"),
                "Each entry must terminate with a blank line ('\\r\\n\\r\\n') per PT9 Backup.cs:178."
            );
        }

        // ====================================================================
        // TS-014 — File creation: append-creates-file behavior.
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-023")]
        [Property("ScenarioId", "TS-014")]
        [Property("BehaviorId", "BHV-103")]
        [Description(
            "AppendEntry creates the file if it does not exist (File.AppendAllText semantics). "
                + "Implicit in TS-014 + INV-LOG-FORMAT — first backup ever on a host has no prior "
                + "Backup.txt to append to."
        )]
        public void AppendEntry_AgainstNonExistentFile_CreatesFileAndWritesOneEntry()
        {
            // Arrange — by [SetUp], _tempLogPath does NOT exist
            Assert.That(
                File.Exists(_tempLogPath),
                Is.False,
                "Precondition: log file must not exist before the first AppendEntry."
            );

            var now = new DateTime(2026, 5, 11, 13, 42, 0);

            // Act
            BackupLogService.AppendEntry(now, "first", "P", "GEN", "/tmp/x.zip");

            // Assert — file now exists, with exactly one 5-line entry
            Assert.That(File.Exists(_tempLogPath), Is.True, "File must be created.");
            string[] lines = ReadEntryLines(_tempLogPath);
            Assert.That(lines.Length, Is.EqualTo(5), "Exactly one 5-line entry.");
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-023")]
        [Property("BehaviorId", "BHV-103")]
        [Description(
            "UTF-8 encoding without BOM. Byte 0 of the file is the ASCII 'B' of 'BACKUP:' — never "
                + "the UTF-8 BOM sequence (0xEF 0xBB 0xBF). PT9's File.AppendAllText(..., Encoding.UTF8) "
                + "never injects a BOM on append; PT10 must match."
        )]
        public void AppendEntry_AgainstNonExistentFile_WritesNoUtf8Bom()
        {
            // Arrange
            var now = new DateTime(2026, 5, 11, 13, 42, 0);

            // Act
            BackupLogService.AppendEntry(now, "d", "P", "GEN", "/tmp/x.zip");

            // Assert — first three bytes are 'B', 'A', 'C' (start of "BACKUP:"), NOT 0xEF 0xBB 0xBF.
            byte[] bytes = File.ReadAllBytes(_tempLogPath);
            Assert.That(bytes.Length, Is.GreaterThanOrEqualTo(3), "File too short to inspect.");
            Assert.That(
                bytes[0],
                Is.EqualTo((byte)'B'),
                "First byte must be ASCII 'B' — a UTF-8 BOM (0xEF) here would break PT9 parity."
            );
            Assert.That(bytes[1], Is.EqualTo((byte)'A'));
            Assert.That(bytes[2], Is.EqualTo((byte)'C'));
        }

        // ====================================================================
        // INV-A19 — caller's responsibility. The service appends unconditionally.
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-023")]
        [Property("InvariantId", "INV-A19")]
        [Property("BehaviorId", "BHV-103")]
        [Description(
            "INV-A19 is the CALLER's responsibility (CAP-022 / BackupOrchestrator gates on foundFile). "
                + "This service appends unconditionally once invoked. Calling AppendEntry with an empty "
                + "booksDescription still produces a complete 5-line entry — the service does NOT "
                + "inspect its arguments for 'emptiness'."
        )]
        public void AppendEntry_WithEmptyBooksDescription_StillWritesFiveLineEntry()
        {
            // Arrange — empty booksDescription (the input that would trigger INV-A19's gate upstream)
            var now = new DateTime(2026, 5, 11, 13, 42, 0);

            // Act — note: the contract says this service must NOT gate on empty inputs
            BackupLogService.AppendEntry(
                now,
                description: "d",
                projectName: "P",
                booksDescription: "",
                filename: "/tmp/x.zip"
            );

            // Assert — 5 lines, with "Books: " followed by nothing
            string[] lines = ReadEntryLines(_tempLogPath);
            Assert.That(
                lines.Length,
                Is.EqualTo(5),
                "INV-A19 is upstream: the service writes the entry regardless of input emptiness."
            );
            Assert.That(
                lines[3],
                Is.EqualTo("\tBooks: "),
                "Books line preserves the structural prefix even when the summary is empty."
            );
        }

        // ====================================================================
        // INV-C14 — writer and reader resolve the same path.
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-023")]
        [Property("InvariantId", "INV-C14")]
        [Property("BehaviorId", "BHV-103")]
        [Property("BehaviorId", "BHV-654")]
        [Description(
            "INV-C14: the path returned by GetLogFilePath() is the SAME path AppendEntry writes to. "
                + "Verified by writing through AppendEntry, then reading the file at "
                + "GetLogFilePath() — the content matches."
        )]
        public void GetLogFilePath_AfterAppendEntry_ResolvesToSamePathAndContentIsReadable()
        {
            // Arrange
            var now = new DateTime(2026, 5, 11, 13, 42, 0);
            const string description = "sentinel-content";

            // Act — write through one method, read through the other
            BackupLogService.AppendEntry(now, description, "P", "GEN", "/tmp/x.zip");
            string resolvedPath = BackupLogService.GetLogFilePath();

            // Assert — resolved path equals the override (writer's destination)
            Assert.That(
                resolvedPath,
                Is.EqualTo(_tempLogPath),
                "INV-C14: GetLogFilePath() must resolve to the same path AppendEntry wrote to."
            );

            // Assert — content written via AppendEntry is readable at the resolved path
            string contents = File.ReadAllText(resolvedPath);
            Assert.That(
                contents,
                Does.Contain(description),
                "INV-C14: writer's content must be visible at the reader's resolved path."
            );
        }

        // ====================================================================
        // TS-111 — GetLogFilePath happy path (file exists).
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-023")]
        [Property("ScenarioId", "TS-111")]
        [Property("BehaviorId", "BHV-654")]
        [Description(
            "TS-111: when Backup.txt exists, GetLogFilePath returns its canonical path. The path "
                + "value is stable — the reveal-path flow (DT-003 / shell.showItemInFolder) does NOT "
                + "need the file to be open or have any particular content; it just needs the path."
        )]
        public void GetLogFilePath_WhenFileExists_ReturnsCanonicalPath()
        {
            // Arrange — create the file with arbitrary content (simulates a prior backup having run)
            File.WriteAllText(_tempLogPath, "previous content");
            Assert.That(File.Exists(_tempLogPath), Is.True, "Precondition: file exists.");

            // Act
            string resolved = BackupLogService.GetLogFilePath();

            // Assert
            Assert.That(
                resolved,
                Is.EqualTo(_tempLogPath),
                "TS-111: GetLogFilePath returns the canonical path when the file exists."
            );
        }

        // ====================================================================
        // TS-112 — GetLogFilePath returns canonical path even when file is absent (pure / no I/O).
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-023")]
        [Property("ScenarioId", "TS-112")]
        [Property("BehaviorId", "BHV-654")]
        [Description(
            "TS-112: GetLogFilePath returns the same canonical path even when Backup.txt does NOT "
                + "exist. Existence is reported separately via the DT-003 Exists flag (NOT this "
                + "method). This proves GetLogFilePath is PURE — no File.Exists / Directory.Exists "
                + "calls; the file system is never touched."
        )]
        public void GetLogFilePath_WhenFileDoesNotExist_StillReturnsCanonicalPath()
        {
            // Arrange — explicitly ensure the file is absent
            if (File.Exists(_tempLogPath))
                File.Delete(_tempLogPath);
            Assert.That(File.Exists(_tempLogPath), Is.False, "Precondition: file absent.");

            // Act
            string resolved = BackupLogService.GetLogFilePath();

            // Assert
            Assert.That(
                resolved,
                Is.EqualTo(_tempLogPath),
                "TS-112: GetLogFilePath returns the canonical path even when the file does not exist."
            );

            // Assert — calling GetLogFilePath() did NOT create the file (it's pure).
            Assert.That(
                File.Exists(_tempLogPath),
                Is.False,
                "GetLogFilePath must be pure — it must not create the file as a side effect."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-023")]
        [Property("ScenarioId", "TS-111")]
        [Property("ScenarioId", "TS-112")]
        [Property("BehaviorId", "BHV-654")]
        [Description(
            "GetLogFilePath is idempotent — repeated calls return identical strings. Combined with "
                + "TS-112's no-I/O assertion, this proves the method is fully PURE."
        )]
        public void GetLogFilePath_CalledRepeatedly_ReturnsStableValue()
        {
            // Act
            string first = BackupLogService.GetLogFilePath();
            string second = BackupLogService.GetLogFilePath();
            string third = BackupLogService.GetLogFilePath();

            // Assert
            Assert.That(first, Is.EqualTo(_tempLogPath));
            Assert.That(second, Is.EqualTo(first));
            Assert.That(third, Is.EqualTo(first));
        }

        // ====================================================================
        // PT9 parity — input passthrough (no escaping of free-form text).
        // ====================================================================

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-023")]
        [Property("BehaviorId", "BHV-103")]
        [Description(
            "PT9 parity: AppendEntry inserts description / projectName / booksDescription / filename "
                + "verbatim — no escaping. A description containing special characters (commas, colons, "
                + "tabs, unicode) is emitted as-is. This pins current behavior; a future decision to "
                + "sanitize is explicit, not silent."
        )]
        public void AppendEntry_WithSpecialCharactersInInputs_PreservesThemVerbatim()
        {
            // Arrange — mix of comma, colon, tab, and a non-ASCII char
            var now = new DateTime(2026, 5, 11, 13, 42, 0);
            const string description = "comma, colon: tab\tunicode é";
            const string projectName = "P:roj";
            const string booksDescription = "GEN, EXO";
            const string filename = "/tmp/a:b.zip";

            // Act
            BackupLogService.AppendEntry(now, description, projectName, booksDescription, filename);

            // Assert — every input string appears verbatim somewhere in the file (no escaping).
            string contents = File.ReadAllText(_tempLogPath, Encoding.UTF8);
            Assert.That(
                contents,
                Does.Contain(description),
                "Description must pass through verbatim."
            );
            Assert.That(
                contents,
                Does.Contain(projectName),
                "Project name must pass through verbatim."
            );
            Assert.That(
                contents,
                Does.Contain(booksDescription),
                "Books summary must pass through verbatim."
            );
            Assert.That(contents, Does.Contain(filename), "Filename must pass through verbatim.");
        }

        // ====================================================================
        // Helpers
        // ====================================================================

        /// <summary>
        /// Reads the log file and returns its content lines, excluding the trailing
        /// blank line(s) PT9 emits after each entry (the file ends with
        /// "\r\n\r\n" so a naive split on \r\n yields a trailing empty entry).
        /// For tests asserting "5 lines per entry" this filters out the blank trailers.
        /// </summary>
        private static string[] ReadEntryLines(string path)
        {
            string content = File.ReadAllText(path, Encoding.UTF8);
            // Split on CRLF, drop trailing empties (the blank line after each entry).
            string[] all = Regex.Split(content, "\r\n");
            int contentEnd = all.Length;
            while (contentEnd > 0 && all[contentEnd - 1].Length == 0)
                contentEnd--;
            string[] result = new string[contentEnd];
            Array.Copy(all, result, contentEnd);
            return result;
        }
    }
}
