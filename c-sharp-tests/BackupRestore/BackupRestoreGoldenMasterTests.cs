using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Text.Json;
using Paranext.DataProvider.BackupRestore;
using Paratext.Data;

namespace TestParanextDataProvider.BackupRestore
{
    /// <summary>
    /// Golden-master parity tests for the project-backup-and-restore feature. Each fixture method
    /// is parametrized over one set of <c>gm-XXX</c> scenarios (under
    /// <c>.context/features/project-backup-and-restore/golden-masters/</c>) and asserts the
    /// PT10 implementation matches the PT9-captured expected output exactly.
    ///
    /// CAP-017 (RestoreFilePlanService) owns gm-001..gm-010 — the 9-state × 2-column × 3-style
    /// rendering matrix (gm-001..gm-008), the auto-tick <see cref="RestoreFileInfo.IsNormallyRestored"/>
    /// matrix (gm-009), and the downgrade-decline behavior (gm-010).
    ///
    /// Other capabilities will add their own <c>[TestCaseSource]</c> methods to this fixture as
    /// they ship (gm-011..gm-031), so this file is named <c>BackupRestoreGoldenMasterTests</c>
    /// (not <c>RestoreFilePlanGoldenMasterTests</c>) to be a single landing-pad for the whole
    /// feature's golden-master harness.
    ///
    /// Golden master file loading: the fixture probes upward from <see cref="AppContext.BaseDirectory"/>
    /// until it finds the <c>.context/features/project-backup-and-restore/golden-masters/</c> directory.
    /// This avoids needing to embed/copy the JSON files into the test assembly's bin output and
    /// keeps the test self-contained on RED-state (no <c>.csproj</c> edits required).
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class BackupRestoreGoldenMasterTests
    {
        // -----------------------------------------------------------------
        // gm-001..gm-008 — 9-state × 2-column × 3-style rendering matrix.
        //
        // Each gm-XXX file contains:
        //   parameters.comparisonResult.value → which PtwFileComparisonStates to test
        //   expected-output.json output.col1Style + output.col2Style → expected styles
        //
        // The test feeds a single-file input with the named state through Build(...) and
        // asserts the row's Col1Style + Col2Style match the gm's expected output exactly.
        // -----------------------------------------------------------------

        public static IEnumerable<TestCaseData> StyleMatrixGoldenMasters()
        {
            // Order matches gm-001..gm-008. Test names are explicit so failures point at the
            // gm directory directly.
            yield return new TestCaseData("gm-001-dgvfiles-rendering-destdoesnotexist").SetName(
                "gm-001 DestDoesNotExist → bold/grayed (TS-073)"
            );
            yield return new TestCaseData("gm-002-dgvfiles-rendering-filesaresame").SetName(
                "gm-002 FilesAreSame → grayed/grayed (TS-074)"
            );
            yield return new TestCaseData("gm-003-dgvfiles-rendering-sourceisnewer").SetName(
                "gm-003 SourceIsNewer → bold/regular (TS-075)"
            );
            yield return new TestCaseData("gm-004-dgvfiles-rendering-sourceisolder").SetName(
                "gm-004 SourceIsOlder → regular/bold (TS-076)"
            );
            yield return new TestCaseData(
                "gm-005-dgvfiles-rendering-sourceishigherversion"
            ).SetName("gm-005 SourceIsHigherVersion → bold/regular (TS-077)");
            yield return new TestCaseData("gm-006-dgvfiles-rendering-destishigherversion").SetName(
                "gm-006 DestIsHigherVersion → grayed/bold (TS-078)"
            );
            yield return new TestCaseData("gm-007-dgvfiles-rendering-filesaresameversion").SetName(
                "gm-007 FilesAreSameVersion → grayed/grayed (TS-079)"
            );
            yield return new TestCaseData("gm-008-dgvfiles-rendering-undetermined").SetName(
                "gm-008 Undetermined → regular/regular (TS-080)"
            );
        }

        [TestCaseSource(nameof(StyleMatrixGoldenMasters))]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-318")]
        public void BuildRow_StyleMatrix_MatchesGoldenMaster(string gmDirName)
        {
            // Arrange — load the golden master
            var gmDir = LocateGoldenMasterDir(gmDirName);
            var input = JsonDocument.Parse(File.ReadAllText(Path.Combine(gmDir, "input.json")));
            var expected = JsonDocument.Parse(
                File.ReadAllText(Path.Combine(gmDir, "expected-output.json"))
            );

            var stateName = input
                .RootElement.GetProperty("parameters")
                .GetProperty("comparisonResult")
                .GetProperty("value")
                .GetString();
            Assert.That(
                stateName,
                Is.Not.Null,
                $"{gmDirName} input.json missing parameters.comparisonResult.value"
            );

            var state = Enum.Parse<PtwFileComparisonStates>(stateName!);
            var expectedCol1 = expected
                .RootElement.GetProperty("output")
                .GetProperty("col1Style")
                .GetString();
            var expectedCol2 = expected
                .RootElement.GetProperty("output")
                .GetProperty("col2Style")
                .GetString();

            var file = new RestoreFileInfo
            {
                SourceFile = new RestoreZipMember { FileName = $"gm-fixture-{stateName}.txt" },
                DestinationFile =
                    state == PtwFileComparisonStates.DestDoesNotExist
                        ? null
                        : new RestoreZipMember { FileName = $"gm-fixture-{stateName}.txt" },
                ComparisonResult = state,
                IsNormallyRestored = false, // styling matrix is independent of the auto-tick set
            };

            // Act
            var rows = new RestoreFilePlanService().Build(new[] { file });

            // Assert
            Assert.That(rows, Has.Count.EqualTo(1), $"{gmDirName}: one row expected");
            Assert.That(
                rows[0].Col1Style,
                Is.EqualTo(expectedCol1),
                $"{gmDirName}: Col1Style must match golden master for state {state}"
            );
            Assert.That(
                rows[0].Col2Style,
                Is.EqualTo(expectedCol2),
                $"{gmDirName}: Col2Style must match golden master for state {state}"
            );
            Assert.That(
                rows[0].State,
                Is.EqualTo(state),
                $"{gmDirName}: row.State must match input state"
            );
        }

        // -----------------------------------------------------------------
        // gm-009 — Auto-tick IsNormallyRestored matrix (REVIEW-FLAG-2 anchor).
        //
        // The golden master enumerates all 9 PtwFileComparisonStates and the expected
        // IsNormallyRestored bool for each. CAP-017's Build(...) must produce a row whose
        // ShouldRestore matches this matrix when the input RestoreFileInfo's IsNormallyRestored
        // is set to the canonical value per spec-007's classifier (i.e., true for the auto-tick
        // set {DestDoesNotExist, SourceIsNewer, SourceIsHigherVersion}, false otherwise).
        //
        // This pins INV-A09 at the service level using the captured golden master.
        // -----------------------------------------------------------------

        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-319")]
        [Property("InvariantId", "INV-A09")]
        [Property("ScenarioId", "TS-081")]
        public void BuildRow_AutoTickMatrix_MatchesGoldenMaster()
        {
            // Arrange
            var gmDir = LocateGoldenMasterDir("gm-009-dgvfiles-autotick-isnormallyrestored");
            var expected = JsonDocument.Parse(
                File.ReadAllText(Path.Combine(gmDir, "expected-output.json"))
            );

            var expectedMatrix = expected
                .RootElement.GetProperty("output")
                .GetProperty("matrix")
                .EnumerateArray()
                .Select(elem =>
                    (
                        State: Enum.Parse<PtwFileComparisonStates>(
                            elem.GetProperty("state").GetString()!
                        ),
                        IsNormallyRestored: elem.GetProperty("isNormallyRestored").GetBoolean()
                    )
                )
                .ToList();

            Assert.That(
                expectedMatrix,
                Has.Count.EqualTo(9),
                "gm-009 must enumerate all 9 PtwFileComparisonStates"
            );

            // Construct one RestoreFileInfo per state, using the EXPECTED IsNormallyRestored from
            // the golden master as the canonical input (this is what spec-007's classifier would
            // produce in production — see test-writer plan §1).
            var input = expectedMatrix
                .Select(row => new RestoreFileInfo
                {
                    SourceFile = new RestoreZipMember { FileName = $"file-{row.State}.txt" },
                    DestinationFile =
                        row.State == PtwFileComparisonStates.DestDoesNotExist
                            ? null
                            : new RestoreZipMember { FileName = $"file-{row.State}.txt" },
                    ComparisonResult = row.State,
                    IsNormallyRestored = row.IsNormallyRestored,
                })
                .ToList();

            // Act
            var rows = new RestoreFilePlanService().Build(input);

            // Assert — for every state, ShouldRestore must equal the golden-master IsNormallyRestored
            // (REVIEW-FLAG-2: source of truth is the input's IsNormallyRestored, not per-state defaults).
            Assert.That(rows, Has.Count.EqualTo(9), "One row per input state");
            for (var i = 0; i < expectedMatrix.Count; i++)
            {
                var (state, expectedAutoTick) = expectedMatrix[i];
                Assert.That(
                    rows[i].State,
                    Is.EqualTo(state),
                    $"Row {i} state must match input: expected {state}"
                );
                Assert.That(
                    rows[i].ShouldRestore,
                    Is.EqualTo(expectedAutoTick),
                    $"State {state}: ShouldRestore must equal gm-009 matrix value ({expectedAutoTick}) — REVIEW-FLAG-2"
                );
            }
        }

        // -----------------------------------------------------------------
        // gm-010 — DestIsHigherVersion downgrade-decline path (VAL-B07).
        //
        // The golden master encodes the contract:
        //   userDeclines_expectedResult.okToRestoreFile_returnValue = false.
        //
        // The test invokes OkToToggleOn on a DestIsHigherVersion row with a callback that
        // returns false, and asserts the result matches.
        // -----------------------------------------------------------------

        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-319")]
        [Property("InvariantId", "VAL-B07")]
        [Property("ScenarioId", "TS-082")]
        public void OkToToggleOn_DowngradeDecline_MatchesGoldenMaster()
        {
            // Arrange
            var gmDir = LocateGoldenMasterDir("gm-010-dgvfiles-downgrade-decline");
            var expected = JsonDocument.Parse(
                File.ReadAllText(Path.Combine(gmDir, "expected-output.json"))
            );

            var declineContract = expected
                .RootElement.GetProperty("output")
                .GetProperty("contract")
                .GetProperty("userDeclines_expectedResult");

            var expectedReturn = declineContract
                .GetProperty("okToRestoreFile_returnValue")
                .GetBoolean();
            var expectedRestoreFinalState = declineContract
                .GetProperty("restoreThisFile_finalState")
                .GetBoolean();
            var expectedAlertKey = expected
                .RootElement.GetProperty("output")
                .GetProperty("contract")
                .GetProperty("alertMessageResourceKey")
                .GetString();

            Assert.That(
                expectedReturn,
                Is.False,
                "gm-010 captures: decline ⇒ OkToRestoreFile=false"
            );
            Assert.That(
                expectedRestoreFinalState,
                Is.False,
                "gm-010 captures: decline ⇒ RestoreThisFile stays false"
            );
            Assert.That(
                expectedAlertKey,
                Is.EqualTo("RestoreForm_33"),
                "gm-010 captures: alert message resource key = RestoreForm_33"
            );

            var file = new RestoreFileInfo
            {
                SourceFile = new RestoreZipMember { FileName = "custom.sty" },
                DestinationFile = new RestoreZipMember { FileName = "custom.sty" },
                ComparisonResult = PtwFileComparisonStates.DestIsHigherVersion,
                IsNormallyRestored = false,
            };
            string? receivedKey = null;

            // Act — callback returns false (user clicks No)
            var result = new RestoreFilePlanService().OkToToggleOn(
                file,
                key =>
                {
                    receivedKey = key;
                    return false; // user declines
                }
            );

            // Assert
            Assert.That(
                result,
                Is.EqualTo(expectedReturn),
                "gm-010: decline path must yield OkToToggleOn=false"
            );
            Assert.That(
                receivedKey,
                Is.EqualTo(expectedAlertKey),
                $"gm-010: callback must receive the alert key '{expectedAlertKey}'"
            );
        }

        // -----------------------------------------------------------------
        // Helper — probe upward from AppContext.BaseDirectory to find the golden-masters folder.
        //
        // Walks from <repo>/c-sharp-tests/bin/Debug/net8.0/ upward until it finds
        // <repo>/.context/features/project-backup-and-restore/golden-masters/<gmName>/.
        // -----------------------------------------------------------------

        private static string LocateGoldenMasterDir(string gmName)
        {
            const string relPath = ".context/features/project-backup-and-restore/golden-masters";
            var current = new DirectoryInfo(AppContext.BaseDirectory);
            while (current != null)
            {
                var candidate = Path.Combine(current.FullName, relPath, gmName);
                if (Directory.Exists(candidate))
                    return candidate;
                current = current.Parent;
            }
            throw new DirectoryNotFoundException(
                $"Golden master '{gmName}' not found by walking up from '{AppContext.BaseDirectory}'. "
                    + $"Expected at '<repo>/{relPath}/{gmName}'."
            );
        }
    }
}
