using System;
using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.BackupRestore;

namespace TestParanextDataProvider.BackupRestore
{
    /// <summary>
    /// Tests for <see cref="BackupDescriptionFormatter.ComputeDescription"/>
    /// (CAP-015 / EXT-105 / BHV-307 transitive / BHV-328 transitive).
    ///
    /// Pure-function service:
    /// <c>(now, userName, userComment) -> "{yyyy-MM-dd@HH:mm}, {userName} - {userComment}"</c>.
    ///
    /// Specification sources:
    /// <list type="bullet">
    ///   <item>data-contracts.md §9 — PT10 Implementation Alignment (file table line 2261)</item>
    ///   <item>implementation/backend-alignment.md §EXT-105 — full signature (line 201-207)</item>
    ///   <item>implementation/extraction-plan.md §EXT-105 — extraction stub</item>
    ///   <item>characterization/test-scenarios.json — TS-063a (happy-path string format)</item>
    ///   <item>behavior-catalog.md §BHV-307 — 1Hz timer preview (transitive — DROPPED in PT10)</item>
    ///   <item>behavior-catalog.md §BHV-328 — txtFrom/txtDescription read-only display (transitive)</item>
    ///   <item>strategic-plan-backend.md §CAP-015 — edge-case bullet (empty userComment; comma in userName)</item>
    /// </list>
    ///
    /// PT9 source: <c>Paratext/BackupRestore/BackupForm.cs:157-160, 186-214</c> (preview + cmdOK assembly):
    /// <code>
    /// // BackupForm.timer1_Tick — preview (1Hz)
    /// txtGeneralDescription.Text = Backup.DateStr + ", " + txtUserName.Text;
    ///
    /// // BackupForm.cmdOK_Click — final assembly (sent to Backup.BackupScrText)
    /// Backup.BackupScrText(..., txtGeneralDescription.Text + " - " + txtUserComment.Text, false);
    /// </code>
    ///
    /// PT9 source: <c>Paratext/BackupRestore/Backup.cs:41-44</c> (DateStr property):
    /// <code>
    /// public static string DateStr
    /// {
    ///     get { return DateTime.Now.ToString("o").Substring(0, 16).Replace("T", "@"); }
    /// }
    /// </code>
    ///
    /// PT10 deltas vs PT9:
    /// <list type="bullet">
    ///   <item><b>BHV-307 DROPPED</b>: the 1Hz polling timer is gone; <c>now</c> is a caller-pinned
    ///   parameter, not <c>DateTime.Now</c>. The UI side recomputes via <c>useMemo</c> + a small ticker
    ///   (handled in CAP-UI-004, not in this backend capability).</item>
    ///   <item><b>EXT-105 unifies the two PT9 sites</b>: PT9's preview field shows
    ///   <c>"DateStr, userName"</c> (no comment); the value sent to <c>BackupScrText</c> appends
    ///   <c>" - userComment"</c>. PT10's <c>ComputeDescription</c> returns the FULL composed string in
    ///   one call.</item>
    /// </list>
    ///
    /// PT9 quirks preserved (parity):
    /// <list type="bullet">
    ///   <item>No comma escaping in <c>userName</c> — a name like <c>"Alice, Bob"</c> leaks an extra comma
    ///   into the output. (PT9 unconditionally concatenates.)</item>
    ///   <item>No trimming or normalisation of either field. Empty <c>userComment</c> still emits the
    ///   trailing <c>" - "</c> separator.</item>
    /// </list>
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class BackupDescriptionFormatterTests
    {
        // -------------------------------------------------------------------
        // TS-063a — Happy path from the characterization scenario.
        // Input: now=2026-05-11T14:32, userName="Alice", userComment="Pre-Send/Receive snapshot"
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ExtractionId", "EXT-105")]
        [Property("BehaviorId", "BHV-307")]
        [Property("BehaviorId", "BHV-328")]
        [Property("ScenarioId", "TS-063a")]
        public void ComputeDescription_WithTs063aHappyPathInput_ReturnsExpectedFormattedString()
        {
            // Arrange — exact values from test-scenarios.json TS-063a
            var now = new DateTime(2026, 5, 11, 14, 32, 0);
            const string userName = "Alice";
            const string userComment = "Pre-Send/Receive snapshot";

            // Act
            string actual = BackupDescriptionFormatter.ComputeDescription(
                now,
                userName,
                userComment
            );

            // Assert — literal expected string from TS-063a expectedOutput
            Assert.That(actual, Is.EqualTo("2026-05-11@14:32, Alice - Pre-Send/Receive snapshot"));
        }

        // -------------------------------------------------------------------
        // Strategic-plan acceptance test variant — proves the formatter is NOT
        // hard-coded to TS-063a's specific values.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ExtractionId", "EXT-105")]
        [Property("BehaviorId", "BHV-307")]
        [Property("ScenarioId", "TS-063a")]
        public void ComputeDescription_WithStrategicPlanAcceptanceInput_ReturnsExpectedFormattedString()
        {
            // Arrange — exact values from strategic-plan-backend.md §CAP-015 Acceptance Test line
            var now = new DateTime(2026, 5, 11, 10, 30, 0);
            const string userName = "jdoe";
            const string userComment = "pre-S/R safety";

            // Act
            string actual = BackupDescriptionFormatter.ComputeDescription(
                now,
                userName,
                userComment
            );

            // Assert
            Assert.That(actual, Is.EqualTo("2026-05-11@10:30, jdoe - pre-S/R safety"));
        }

        // -------------------------------------------------------------------
        // Edge case — PT9 parity: empty userComment preserves the trailing " - ".
        // Strategic-plan §CAP-015 edge-case bullet: "Empty userComment →
        //   '2026-05-11@10:30, jdoe - ' (trailing dash preserved per PT9 parity)".
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ExtractionId", "EXT-105")]
        [Property("BehaviorId", "BHV-307")]
        [Property("ScenarioId", "TS-063a")]
        public void ComputeDescription_WithEmptyUserComment_PreservesTrailingDashSpace()
        {
            // Arrange
            var now = new DateTime(2026, 5, 11, 10, 30, 0);
            const string userName = "jdoe";
            const string userComment = "";

            // Act
            string actual = BackupDescriptionFormatter.ComputeDescription(
                now,
                userName,
                userComment
            );

            // Assert — note the trailing "- " (PT9 unconditionally concatenates " - " + userComment).
            Assert.That(actual, Is.EqualTo("2026-05-11@10:30, jdoe - "));
        }

        // -------------------------------------------------------------------
        // Edge case — PT9 parity: userName containing a comma is NOT escaped.
        // Strategic-plan §CAP-015 edge-case bullet: "UserName containing comma
        //   → no escaping (PT9 parity)".
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ExtractionId", "EXT-105")]
        [Property("BehaviorId", "BHV-307")]
        [Property("ScenarioId", "TS-063a")]
        public void ComputeDescription_WithCommaInUserName_DoesNotEscape()
        {
            // Arrange
            var now = new DateTime(2026, 5, 11, 10, 30, 0);
            const string userName = "Alice, Bob";
            const string userComment = "shared session";

            // Act
            string actual = BackupDescriptionFormatter.ComputeDescription(
                now,
                userName,
                userComment
            );

            // Assert — the second comma (inside userName) is emitted verbatim. Any downstream
            // parser that splits on ',' would get 3 fields instead of 2 — that's PT9 behavior.
            Assert.That(actual, Is.EqualTo("2026-05-11@10:30, Alice, Bob - shared session"));
        }

        // -------------------------------------------------------------------
        // RF-D1-006 analogue — date parameter is caller-pinned (NOT DateTime.Now).
        // BHV-307's 1Hz timer is DROPPED in PT10 — the only observable way to
        // prove the implementation isn't secretly calling DateTime.Now is to
        // pass two different `now` values and observe two different outputs.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ExtractionId", "EXT-105")]
        [Property("BehaviorId", "BHV-307")]
        [Property("ScenarioId", "TS-063a")]
        public void ComputeDescription_WithDifferentNowValues_ProducesDifferentOutputs()
        {
            // Arrange — identical user inputs, different `now`
            const string userName = "Alice";
            const string userComment = "test";
            var nowJanuary = new DateTime(2026, 1, 1, 0, 0, 0);
            var nowDecember = new DateTime(2026, 12, 31, 23, 59, 0);

            // Act
            string actualJanuary = BackupDescriptionFormatter.ComputeDescription(
                nowJanuary,
                userName,
                userComment
            );
            string actualDecember = BackupDescriptionFormatter.ComputeDescription(
                nowDecember,
                userName,
                userComment
            );

            // Assert — proves the `now` parameter is honored (not ignored in favor of DateTime.Now).
            Assert.That(actualJanuary, Is.EqualTo("2026-01-01@00:00, Alice - test"));
            Assert.That(actualDecember, Is.EqualTo("2026-12-31@23:59, Alice - test"));
            Assert.That(actualJanuary, Is.Not.EqualTo(actualDecember));
        }

        // -------------------------------------------------------------------
        // Date formatting — every position zero-pads. Matches PT9 DateStr's
        // invariant ISO 8601 "o" round-trip format truncated to 16 chars and
        // with the 'T' separator swapped to '@'.
        // -------------------------------------------------------------------

        [TestCase(2026, 1, 5, 9, 7, "2026-01-05@09:07, jdoe - c")]
        [TestCase(2026, 12, 31, 23, 59, "2026-12-31@23:59, jdoe - c")]
        [TestCase(1999, 9, 9, 0, 0, "1999-09-09@00:00, jdoe - c")]
        [TestCase(2000, 1, 1, 0, 0, "2000-01-01@00:00, jdoe - c")]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ExtractionId", "EXT-105")]
        [Property("BehaviorId", "BHV-307")]
        [Property("ScenarioId", "TS-063a")]
        public void ComputeDescription_FormatsDateAsZeroPaddedInvariantIso(
            int year,
            int month,
            int day,
            int hour,
            int minute,
            string expected
        )
        {
            // Arrange
            var now = new DateTime(year, month, day, hour, minute, 0);

            // Act
            string actual = BackupDescriptionFormatter.ComputeDescription(now, "jdoe", "c");

            // Assert
            Assert.That(actual, Is.EqualTo(expected));
        }

        // -------------------------------------------------------------------
        // Date formatting — seconds and milliseconds of `now` are NOT in the
        // output. PT9 truncates via Substring(0,16) which drops everything
        // past minutes.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ExtractionId", "EXT-105")]
        [Property("BehaviorId", "BHV-307")]
        [Property("ScenarioId", "TS-063a")]
        public void ComputeDescription_WithSubMinutePrecision_TruncatesToMinutes()
        {
            // Arrange — same minute, different seconds/ms
            const string userName = "Alice";
            const string userComment = "test";
            var onTheMinute = new DateTime(2026, 5, 11, 14, 32, 0, 0);
            var withSeconds = new DateTime(2026, 5, 11, 14, 32, 45, 678);

            // Act
            string actualOnTheMinute = BackupDescriptionFormatter.ComputeDescription(
                onTheMinute,
                userName,
                userComment
            );
            string actualWithSeconds = BackupDescriptionFormatter.ComputeDescription(
                withSeconds,
                userName,
                userComment
            );

            // Assert — seconds and ms MUST NOT leak. Both must produce the same minute-precision output.
            Assert.That(actualOnTheMinute, Is.EqualTo("2026-05-11@14:32, Alice - test"));
            Assert.That(actualWithSeconds, Is.EqualTo("2026-05-11@14:32, Alice - test"));
        }

        // -------------------------------------------------------------------
        // DateTime.Kind invariance — Local / Utc / Unspecified must all produce
        // the same string for the same wall-clock values. The formatter MUST NOT
        // call .ToLocalTime() or .ToUniversalTime() (which would shift the
        // displayed hours/minutes depending on the host's timezone).
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ExtractionId", "EXT-105")]
        [Property("BehaviorId", "BHV-307")]
        [Property("ScenarioId", "TS-063a")]
        public void ComputeDescription_WithVaryingDateTimeKind_ProducesIdenticalOutput()
        {
            // Arrange — same wall-clock components, three Kinds
            const string userName = "Alice";
            const string userComment = "test";
            var unspecified = new DateTime(2026, 5, 11, 14, 32, 0, DateTimeKind.Unspecified);
            var utc = new DateTime(2026, 5, 11, 14, 32, 0, DateTimeKind.Utc);
            var local = new DateTime(2026, 5, 11, 14, 32, 0, DateTimeKind.Local);

            // Act
            string actualUnspecified = BackupDescriptionFormatter.ComputeDescription(
                unspecified,
                userName,
                userComment
            );
            string actualUtc = BackupDescriptionFormatter.ComputeDescription(
                utc,
                userName,
                userComment
            );
            string actualLocal = BackupDescriptionFormatter.ComputeDescription(
                local,
                userName,
                userComment
            );

            // Assert — Kind must not affect the output. If any of these differ, the impl is
            // shifting time-of-day based on host timezone — a regression vs PT9 parity.
            const string expected = "2026-05-11@14:32, Alice - test";
            Assert.That(actualUnspecified, Is.EqualTo(expected));
            Assert.That(actualUtc, Is.EqualTo(expected));
            Assert.That(actualLocal, Is.EqualTo(expected));
        }

        // -------------------------------------------------------------------
        // Empty userName (PT9 parity) — PT9 unconditionally concatenates.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ExtractionId", "EXT-105")]
        [Property("BehaviorId", "BHV-307")]
        [Property("ScenarioId", "TS-063a")]
        public void ComputeDescription_WithEmptyUserName_LeavesEmptySegment()
        {
            // Arrange
            var now = new DateTime(2026, 5, 11, 10, 30, 0);
            const string userName = "";
            const string userComment = "comment";

            // Act
            string actual = BackupDescriptionFormatter.ComputeDescription(
                now,
                userName,
                userComment
            );

            // Assert — PT9 emits ",  - " between date and comment when userName is empty
            // (the two spaces around the empty userName are PT9 parity artifacts).
            Assert.That(actual, Is.EqualTo("2026-05-11@10:30,  - comment"));
        }

        // -------------------------------------------------------------------
        // Both userName and userComment empty (PT9 parity) — structural
        // separators (", " and " - ") still emitted unconditionally.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ExtractionId", "EXT-105")]
        [Property("BehaviorId", "BHV-307")]
        [Property("ScenarioId", "TS-063a")]
        public void ComputeDescription_WithBothUserFieldsEmpty_StillEmitsSeparators()
        {
            // Arrange
            var now = new DateTime(2026, 5, 11, 10, 30, 0);

            // Act
            string actual = BackupDescriptionFormatter.ComputeDescription(now, "", "");

            // Assert — full structural skeleton survives: "@-precision-stamp" + ",  - "
            Assert.That(actual, Is.EqualTo("2026-05-11@10:30,  - "));
        }

        // -------------------------------------------------------------------
        // Whitespace preservation — leading/trailing/internal whitespace in
        // userComment is NOT trimmed (PT9 parity).
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ExtractionId", "EXT-105")]
        [Property("BehaviorId", "BHV-307")]
        [Property("ScenarioId", "TS-063a")]
        public void ComputeDescription_WithWhitespaceInUserComment_PreservesItVerbatim()
        {
            // Arrange — leading, internal, trailing whitespace
            var now = new DateTime(2026, 5, 11, 10, 30, 0);
            const string userComment = "  before  and  after  ";

            // Act
            string actual = BackupDescriptionFormatter.ComputeDescription(now, "jdoe", userComment);

            // Assert — exact preservation
            Assert.That(actual, Is.EqualTo("2026-05-11@10:30, jdoe -   before  and  after  "));
        }

        // -------------------------------------------------------------------
        // Whitespace preservation — same for userName.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-015")]
        [Property("ExtractionId", "EXT-105")]
        [Property("BehaviorId", "BHV-307")]
        [Property("ScenarioId", "TS-063a")]
        public void ComputeDescription_WithWhitespaceInUserName_PreservesItVerbatim()
        {
            // Arrange
            var now = new DateTime(2026, 5, 11, 10, 30, 0);
            const string userName = "  jane  doe  ";

            // Act
            string actual = BackupDescriptionFormatter.ComputeDescription(now, userName, "c");

            // Assert
            Assert.That(actual, Is.EqualTo("2026-05-11@10:30,   jane  doe   - c"));
        }
    }
}
