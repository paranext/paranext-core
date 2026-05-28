using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using Paranext.DataProvider.BackupRestore;

namespace TestParanextDataProvider.BackupRestore
{
    /// <summary>
    /// Tests for <see cref="BackupFilenameService.ComputeDefaultBackupFileName"/>
    /// (CAP-012 / EXT-100 / BHV-302).
    ///
    /// Pure-function service: <c>(projectFullName, date) -> "{sanitized FullName} {yyyy-MM-dd}.zip"</c>.
    ///
    /// Specification sources:
    /// <list type="bullet">
    ///   <item>data-contracts.md §9 — PT10 Implementation Alignment (file table)</item>
    ///   <item>implementation/backend-alignment.md §EXT-100 — full signature + REVIEW-FLAG-4 fix</item>
    ///   <item>implementation/extraction-plan.md §EXT-100 — extraction stub</item>
    ///   <item>characterization/test-scenarios.json — TS-049 (happy-path), TS-050 (edge-case)</item>
    ///   <item>behavior-catalog.md §BHV-302 — default backup filename derivation</item>
    ///   <item>business-rules.md §INV-A01 — backup ZIP filename ends in <c>.zip</c></item>
    /// </list>
    ///
    /// PT9 source: <c>Paratext/BackupRestore/BackupForm.cs:134-140</c> (<c>DefaultBackupFileName</c>):
    /// <code>
    /// StringBuilder safeName = new StringBuilder(scrText.FullName.Length);
    /// foreach (char safeChar in scrText.FullName.Where(c =&gt; !Path.GetInvalidPathChars().Contains(c)))
    ///     safeName.Append(safeChar);
    /// return safeName + " " + DateTime.Now.ToString("s").Substring(0, 10) + Backup.fileExtension;
    /// </code>
    ///
    /// PT10 deltas vs PT9:
    /// <list type="bullet">
    ///   <item><b>REVIEW-FLAG-4</b>: PT9 only strips <c>Path.GetInvalidPathChars()</c>, which on Linux/macOS
    ///   is just <c>\0</c>. PT10 also strips <c>Path.GetInvalidFileNameChars()</c> so that filename-only
    ///   chars like <c>/</c>, <c>\</c>, <c>:</c>, <c>?</c>, <c>*</c> are removed cross-platform.</item>
    ///   <item><b>RF-D1-006</b>: <c>date</c> is a caller-provided parameter (NOT <c>DateTime.Now</c>) so
    ///   the caller can pin UTC vs local.</item>
    /// </list>
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class BackupFilenameServiceTests
    {
        // -------------------------------------------------------------------
        // TS-049 — Happy path: '{FullName} YYYY-MM-DD.zip' for a valid input
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ExtractionId", "EXT-100")]
        [Property("BehaviorId", "BHV-302")]
        [Property("ScenarioId", "TS-049")]
        public void ComputeDefaultBackupFileName_WithValidFullNameAndDate_ReturnsFullNameSpaceDateDotZip()
        {
            // Arrange
            const string fullName = "My Project";
            var date = new DateTime(2026, 5, 11);

            // Act
            string actual = BackupFilenameService.ComputeDefaultBackupFileName(fullName, date);

            // Assert
            Assert.That(actual, Is.EqualTo("My Project 2026-05-11.zip"));
        }

        // -------------------------------------------------------------------
        // TS-050 — Edge: '/' is stripped from FullName (REVIEW-FLAG-4 fix)
        // PT9 on Windows would NOT have stripped this; PT10 must.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ExtractionId", "EXT-100")]
        [Property("BehaviorId", "BHV-302")]
        [Property("ScenarioId", "TS-050")]
        [Property("ReviewFlag", "REVIEW-FLAG-4")]
        public void ComputeDefaultBackupFileName_WithForwardSlashInFullName_StripsSlash()
        {
            // Arrange
            const string fullName = "Test/Project";
            var date = new DateTime(2026, 5, 11);

            // Act
            string actual = BackupFilenameService.ComputeDefaultBackupFileName(fullName, date);

            // Assert
            // '/' is in Path.GetInvalidFileNameChars() on all platforms but is NOT in
            // Path.GetInvalidPathChars() on Linux/macOS. This test pins the REVIEW-FLAG-4
            // fix: PT10 must strip from the union of both sets so behavior is cross-platform.
            Assert.That(actual, Is.EqualTo("TestProject 2026-05-11.zip"));
        }

        // -------------------------------------------------------------------
        // REVIEW-FLAG-4 broader coverage — the full filename-invalid set is
        // stripped. This is the "all invalid chars at once" sweep that proves
        // the implementation isn't cherry-picking just '/'.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ExtractionId", "EXT-100")]
        [Property("BehaviorId", "BHV-302")]
        [Property("ScenarioId", "TS-050")]
        [Property("ReviewFlag", "REVIEW-FLAG-4")]
        public void ComputeDefaultBackupFileName_WithMultipleInvalidChars_StripsAll()
        {
            // Arrange — every char in this list is in GetInvalidFileNameChars on Windows;
            // '/' is universally invalid; backslash & ':' & '?' & '*' are Windows-only
            // filename chars; '<', '>', '|' are Windows-only filename chars too. Mixing
            // them all ensures PT10 strips the UNION.
            const string fullName = "Proj/Test\\Backup:File?Star*Pipe|LT<GT>";
            var date = new DateTime(2026, 5, 11);

            // Act
            string actual = BackupFilenameService.ComputeDefaultBackupFileName(fullName, date);

            // Assert — exact ordering is preserved; only invalid chars are removed.
            // On Linux/macOS, only '/' is in the filename-invalid set, so the expected
            // value depends on platform. We instead assert that NONE of the union-set
            // chars remain in the sanitized portion of the output.
            Assert.That(actual, Does.EndWith(" 2026-05-11.zip"));
            // The sanitized FullName portion has every invalid char from BOTH sets removed.
            string sanitizedPortion = actual.Substring(0, actual.Length - " 2026-05-11.zip".Length);
            // Use Has.No.Member(char) (treats the string as IEnumerable<char> with
            // ordinal char comparison) rather than Does.Not.Contain(invalid.ToString())
            // which routes through a culture-sensitive substring constraint. Under
            // ICU collation (default on macOS/Linux) U+0000 is an "ignorable"
            // character, so a culture-sensitive substring search reports it as
            // present in every non-empty string — a false positive unrelated to
            // the contract under test.
            foreach (char invalid in Path.GetInvalidPathChars())
            {
                Assert.That(
                    sanitizedPortion,
                    Has.No.Member(invalid),
                    $"sanitized portion still contains Path.GetInvalidPathChars char U+{(int)invalid:X4}"
                );
            }
            foreach (char invalid in Path.GetInvalidFileNameChars())
            {
                Assert.That(
                    sanitizedPortion,
                    Has.No.Member(invalid),
                    $"sanitized portion still contains Path.GetInvalidFileNameChars char U+{(int)invalid:X4}"
                );
            }
            // And the valid chars survive in their original order.
            Assert.That(sanitizedPortion, Is.EqualTo("ProjTestBackupFileStarPipeLTGT"));
        }

        // -------------------------------------------------------------------
        // RF-D1-006 — Date parameter is caller-pinned (NOT DateTime.Now).
        // Two calls with different dates must produce different outputs.
        // This is the *only* behaviorally observable way to prove the
        // implementation isn't secretly calling DateTime.Now.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ExtractionId", "EXT-100")]
        [Property("BehaviorId", "BHV-302")]
        [Property("ScenarioId", "TS-049")]
        [Property("ReviewFlag", "RF-D1-006")]
        public void ComputeDefaultBackupFileName_WithDifferentDates_ProducesDifferentFilenames()
        {
            // Arrange
            const string fullName = "My Project";
            var dateJanuary = new DateTime(2026, 1, 1);
            var dateDecember = new DateTime(2026, 12, 31);

            // Act
            string actualJanuary = BackupFilenameService.ComputeDefaultBackupFileName(
                fullName,
                dateJanuary
            );
            string actualDecember = BackupFilenameService.ComputeDefaultBackupFileName(
                fullName,
                dateDecember
            );

            // Assert — proves the date parameter is honored (not ignored in favor of DateTime.Now)
            Assert.That(actualJanuary, Is.EqualTo("My Project 2026-01-01.zip"));
            Assert.That(actualDecember, Is.EqualTo("My Project 2026-12-31.zip"));
            Assert.That(actualJanuary, Is.Not.EqualTo(actualDecember));
        }

        // -------------------------------------------------------------------
        // Date formatting — single-digit month/day must zero-pad to yyyy-MM-dd.
        // Matches PT9 ToString("s").Substring(0,10) which is invariant.
        // -------------------------------------------------------------------

        [TestCase(2026, 1, 5, "My Project 2026-01-05.zip")]
        [TestCase(2026, 12, 31, "My Project 2026-12-31.zip")]
        [TestCase(1999, 9, 9, "My Project 1999-09-09.zip")]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ExtractionId", "EXT-100")]
        [Property("BehaviorId", "BHV-302")]
        [Property("ScenarioId", "TS-049")]
        public void ComputeDefaultBackupFileName_FormatsDateAsZeroPaddedIsoDate(
            int year,
            int month,
            int day,
            string expected
        )
        {
            // Arrange
            const string fullName = "My Project";
            var date = new DateTime(year, month, day);

            // Act
            string actual = BackupFilenameService.ComputeDefaultBackupFileName(fullName, date);

            // Assert
            Assert.That(actual, Is.EqualTo(expected));
        }

        // -------------------------------------------------------------------
        // Date formatting — time-of-day portion of DateTime is ignored.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ExtractionId", "EXT-100")]
        [Property("BehaviorId", "BHV-302")]
        [Property("ScenarioId", "TS-049")]
        public void ComputeDefaultBackupFileName_WithNonZeroTimeComponent_DropsTimeFromOutput()
        {
            // Arrange — same calendar date, different times-of-day
            const string fullName = "My Project";
            var midnight = new DateTime(2026, 5, 11, 0, 0, 0);
            var lateNight = new DateTime(2026, 5, 11, 23, 59, 59);

            // Act
            string actualMidnight = BackupFilenameService.ComputeDefaultBackupFileName(
                fullName,
                midnight
            );
            string actualLateNight = BackupFilenameService.ComputeDefaultBackupFileName(
                fullName,
                lateNight
            );

            // Assert — time-of-day MUST NOT leak into the output. Output uses date portion only.
            Assert.That(actualMidnight, Is.EqualTo("My Project 2026-05-11.zip"));
            Assert.That(actualLateNight, Is.EqualTo("My Project 2026-05-11.zip"));
        }

        // -------------------------------------------------------------------
        // PT9 parity — empty FullName produces leading-space + date + .zip.
        // BackupForm.cs:136-138 does not guard against empty FullName.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ExtractionId", "EXT-100")]
        [Property("BehaviorId", "BHV-302")]
        public void ComputeDefaultBackupFileName_WithEmptyFullName_ReturnsSpaceDateDotZip()
        {
            // Arrange
            const string fullName = "";
            var date = new DateTime(2026, 5, 11);

            // Act
            string actual = BackupFilenameService.ComputeDefaultBackupFileName(fullName, date);

            // Assert — PT9 parity (strategic-plan §CAP-012 edge-case note):
            // "Empty FullName → '{empty} 2026-05-11.zip'"
            Assert.That(actual, Is.EqualTo(" 2026-05-11.zip"));
        }

        // -------------------------------------------------------------------
        // All-invalid FullName collapses to the empty segment.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ExtractionId", "EXT-100")]
        [Property("BehaviorId", "BHV-302")]
        [Property("ScenarioId", "TS-050")]
        public void ComputeDefaultBackupFileName_WithOnlyInvalidChars_CollapsesToEmptySegment()
        {
            // Arrange — '/' is universally invalid; this is the cross-platform-safe choice.
            const string fullName = "///";
            var date = new DateTime(2026, 5, 11);

            // Act
            string actual = BackupFilenameService.ComputeDefaultBackupFileName(fullName, date);

            // Assert
            Assert.That(actual, Is.EqualTo(" 2026-05-11.zip"));
        }

        // -------------------------------------------------------------------
        // Internal whitespace is preserved (space is a VALID filename char on
        // every platform; only the invalid sets are stripped).
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ExtractionId", "EXT-100")]
        [Property("BehaviorId", "BHV-302")]
        public void ComputeDefaultBackupFileName_WithInternalWhitespace_PreservesIt()
        {
            // Arrange
            const string fullName = "My  Project"; // double space
            var date = new DateTime(2026, 5, 11);

            // Act
            string actual = BackupFilenameService.ComputeDefaultBackupFileName(fullName, date);

            // Assert
            Assert.That(actual, Is.EqualTo("My  Project 2026-05-11.zip"));
        }

        // -------------------------------------------------------------------
        // PT9 parity — a FullName that already ends in ".zip" is NOT
        // special-cased. PT9 just concatenates fileExtension unconditionally.
        // This test documents the PT9-parity behavior; the downstream
        // Backup.BackupScrText handles the dedup defensively per INV-A01.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-012")]
        [Property("ExtractionId", "EXT-100")]
        [Property("BehaviorId", "BHV-302")]
        public void ComputeDefaultBackupFileName_WithFullNameEndingInZip_DoesNotDedup()
        {
            // Arrange — PT9 source unconditionally appends Backup.fileExtension.
            const string fullName = "Backup.zip";
            var date = new DateTime(2026, 5, 11);

            // Act
            string actual = BackupFilenameService.ComputeDefaultBackupFileName(fullName, date);

            // Assert — PT9 parity: double ".zip" suffix is the expected raw output.
            // INV-A01 dedup lives downstream in Backup.BackupScrText, not here.
            Assert.That(actual, Is.EqualTo("Backup.zip 2026-05-11.zip"));
        }
    }
}
