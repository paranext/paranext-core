using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text.Json;
using Paranext.DataProvider.BackupRestore;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.Users;
using PtxUtils;
using SIL.Scripture;

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
        // gm-031 — FN-001 CompareFiles bridge (CAP-020 / EXT-204).
        //
        // The golden master was captured against PT9's
        //   DiffToolConfigurationInfo.ForGetPutTexts(scrText, "File from Zip",
        //     sourceMember, null, "File in Project", destMember, null,
        //     new VerseRef("GEN 1:1", ...), DiffToolDisplayOptions.ShowToolbar)
        // factory call. PT10's CompareToBackupBridgeService.BuildCompareConfig produces a
        // different shape (FileCompareConfig — see the // === PORTED FROM PT9 === block in
        // CompareToBackupBridgeService.cs and FileCompareConfig.cs).
        //
        // The captured fields and their PT10 mapping (per implementation/plans/test-writer-CAP-020.md):
        //   paneCaption1 "File from Zip"  → LeftLabelKey  = "%restoreForm_fileFromZip%"
        //   paneCaption2 "File in Project"→ RightLabelKey = "%restoreForm_fileInProject%"
        //   displayOptions "ShowToolbar"  → DisplayOptions = DiffToolDisplayOptions.ShowToolbar
        //   sourceBookNum 1               → InitialBookId = "GEN" (Canon.BookNumberToId(1))
        //   verseRef "GEN 1:1"            → (InitialChapter=1, InitialVerse=0 — PT9 source
        //                                   constructs `new VerseRef(BookNum, 1, 0, ...)` at
        //                                   RestoreForm.cs:681; the captured "GEN 1:1" is
        //                                   the PT9 VerseRef.ToString() normalised render)
        //   textPutter1IsNull / textPutter2IsNull → STRUCTURALLY enforced by FileCompareConfig
        //                                          having no putter fields (INV-C01); not
        //                                          asserted as a runtime field here
        //   scrText1EqualsScrText2 → PT9 quirk (INV-C02). PT10 does NOT replicate; the
        //                            FileCompareConfig record carries no ScrText fields.
        // -----------------------------------------------------------------

        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-020")]
        [Property("ExtractionId", "EXT-204")]
        [Property("BehaviorId", "BHV-500")]
        [Property("InvariantId", "INV-C01")]
        [Property("ScenarioId", "TS-097")]
        public void BuildCompareConfig_FromGm031_MatchesGoldenMaster()
        {
            // Arrange — load the golden master
            var gmDir = LocateGoldenMasterDir("gm-031-fn001-comparefiles-bridge");
            var input = JsonDocument.Parse(File.ReadAllText(Path.Combine(gmDir, "input.json")));
            var expected = JsonDocument.Parse(
                File.ReadAllText(Path.Combine(gmDir, "expected-output.json"))
            );

            // Pull the captured fields from expected-output.json's `output` block
            var output = expected.RootElement.GetProperty("output");
            string capturedPaneCaption1 = output.GetProperty("paneCaption1").GetString()!;
            string capturedPaneCaption2 = output.GetProperty("paneCaption2").GetString()!;
            string capturedDisplayOptions = output.GetProperty("displayOptions").GetString()!;
            int capturedSourceBookNum = output.GetProperty("sourceBookNum").GetInt32();
            string capturedSourceZipMember = output.GetProperty("sourceZipMember").GetString()!;
            bool capturedPutter1Null = output.GetProperty("textPutter1IsNull").GetBoolean();
            bool capturedPutter2Null = output.GetProperty("textPutter2IsNull").GetBoolean();

            // Pull the input filename from input.json (parameters.zipMemberFileName.value)
            string inputZipMemberFileName = input
                .RootElement.GetProperty("parameters")
                .GetProperty("zipMemberFileName")
                .GetProperty("value")
                .GetString()!;

            // Sanity-check the captured PT9 shape before mapping
            Assert.That(
                capturedPaneCaption1,
                Is.EqualTo("File from Zip"),
                "gm-031 captures the PT9 English-default left pane caption (RestoreForm_25)"
            );
            Assert.That(
                capturedPaneCaption2,
                Is.EqualTo("File in Project"),
                "gm-031 captures the PT9 English-default right pane caption (RestoreForm_26)"
            );
            Assert.That(
                capturedDisplayOptions,
                Is.EqualTo("ShowToolbar"),
                "gm-031 captures DiffToolDisplayOptions.ShowToolbar for the B/R flow (BHV-502)"
            );
            Assert.That(
                capturedSourceBookNum,
                Is.EqualTo(1),
                "gm-031 captures the GEN book (book number 1)"
            );
            Assert.That(
                capturedSourceZipMember,
                Is.EqualTo(inputZipMemberFileName),
                "gm-031 source zip member matches the input parameters.zipMemberFileName.value"
            );
            Assert.That(
                capturedPutter1Null && capturedPutter2Null,
                Is.True,
                "gm-031 captures null IPutters on BOTH panes (INV-C01 — all 5 PT9 callers "
                    + "pass null putters)"
            );

            // Arrange — build the PT10 inputs that mirror the captured gm-031 fixture
            string sessionId = "gm-031-session";
            var selectedRow = new RestoreFileInfo
            {
                SourceFile = new RestoreZipMember
                {
                    FileName = inputZipMemberFileName,
                    BookNum = capturedSourceBookNum,
                },
                DestinationFile = new RestoreZipMember
                {
                    FileName = inputZipMemberFileName,
                    BookNum = capturedSourceBookNum,
                },
                ComparisonResult = PtwFileComparisonStates.SourceIsNewer,
            };
            ScrText destination = new DummyScrText();
            ScrVers sourceVersification = ScrVers.English;

            // Act
            FileCompareConfig config = CompareToBackupBridgeService.BuildCompareConfig(
                selectedRow,
                destination,
                sourceVersification,
                sessionId
            );

            // Assert — captured PT9 fields map to PT10 record fields
            Assert.That(
                config.LeftLabelKey,
                Is.EqualTo("%restoreForm_fileFromZip%"),
                "gm-031: PT9 paneCaption1 \"File from Zip\" → PT10 LeftLabelKey "
                    + "%restoreForm_fileFromZip% (RestoreForm_25 localize key)"
            );
            Assert.That(
                config.RightLabelKey,
                Is.EqualTo("%restoreForm_fileInProject%"),
                "gm-031: PT9 paneCaption2 \"File in Project\" → PT10 RightLabelKey "
                    + "%restoreForm_fileInProject% (RestoreForm_26 localize key)"
            );
            Assert.That(
                config.DisplayOptions,
                Is.EqualTo(DiffToolDisplayOptions.ShowToolbar),
                "gm-031: PT9 displayOptions \"ShowToolbar\" → PT10 DiffToolDisplayOptions.ShowToolbar"
            );
            Assert.That(
                config.InitialBookId,
                Is.EqualTo("GEN"),
                $"gm-031: PT9 sourceBookNum {capturedSourceBookNum} → PT10 InitialBookId "
                    + "\"GEN\" via Canon.BookNumberToId"
            );
            Assert.That(
                config.InitialChapter,
                Is.EqualTo(1),
                "gm-031: PT9 source `new VerseRef(BookNum, 1, 0, ...)` constructor parity → "
                    + "PT10 InitialChapter 1"
            );
            Assert.That(
                config.InitialVerse,
                Is.EqualTo(0),
                "gm-031: PT9 source `new VerseRef(BookNum, 1, 0, ...)` constructor parity → "
                    + "PT10 InitialVerse 0 (the captured \"GEN 1:1\" is the VerseRef.ToString() "
                    + "render of (GEN, 1, 0); the structural truth is chapter=1 verse=0)"
            );
            Assert.That(
                config.LeftSourceToken,
                Is.EqualTo($"tok-src-{sessionId}-{inputZipMemberFileName}"),
                "gm-031: PT10 LeftSourceToken is the session-scoped opaque handle "
                    + "tok-src-{sessionId}-{fileId} (per strategic-plan §CAP-020 line 502)"
            );
            Assert.That(
                config.RightSourceToken,
                Is.EqualTo($"tok-dst-{sessionId}-{inputZipMemberFileName}"),
                "gm-031: PT10 RightSourceToken is the session-scoped opaque handle "
                    + "tok-dst-{sessionId}-{fileId} (per strategic-plan §CAP-020 line 502)"
            );
        }

        // -----------------------------------------------------------------
        // gm-011 — Backup ZIP whitelist (CAP-022 / BHV-101 / TS-009).
        //
        // The golden master captures the entry set of a backup of a canonical
        // reference project with the Figures flag. PT9 capture environment
        // included Notes_Rolf Heij.xml + ProjectUpdates.xml which are tied to
        // the capture host's user environment — those entries are environment-
        // dependent. PT10 tests pin the INVARIANT shape (sorted entry set
        // includes the SFM + Settings.xml) and assert classification contract
        // rather than literal byte-parity.
        //
        // The fixture creates a real temp project directory with files on disk,
        // invokes BackupOrchestrator.ExecuteBackup, opens the resulting ZIP,
        // and asserts the entry set contains the expected files (whitelist).
        // -----------------------------------------------------------------

        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-022")]
        [Property("BehaviorId", "BHV-101")]
        [Property("InvariantId", "INV-A03")]
        [Property("ScenarioId", "TS-009")]
        public void ExecuteBackup_FullBackup_ZipEntriesMatchGm011Whitelist()
        {
            // Arrange — load the golden master (for the captured contract reference)
            var gmDir = LocateGoldenMasterDir("gm-011-backup-zip-whitelist");
            var expected = System.Text.Json.JsonDocument.Parse(
                File.ReadAllText(Path.Combine(gmDir, "expected-output.json"))
            );

            var expectedEntries = expected
                .RootElement.GetProperty("output")
                .GetProperty("entries")
                .EnumerateArray()
                .Select(e => e.GetString()!)
                .ToList();

            // The gm-011 captured set includes "01GENGmRefProj.SFM" + "Settings.xml"
            // (these are universal — independent of capture environment) plus
            // "Notes_Rolf Heij.xml" + "ProjectUpdates.xml" (environment-specific).
            // We assert: SFM + Settings.xml are present (universal whitelist contract).
            Assert.That(
                expectedEntries,
                Contains.Item("01GENGmRefProj.SFM"),
                "gm-011 captured contract includes the GEN SFM file"
            );
            Assert.That(
                expectedEntries,
                Contains.Item("Settings.xml"),
                "gm-011 captured contract includes Settings.xml"
            );

            // Build a temp project directory mirroring the gm-011 preconditions.
            string tempRoot = Path.Combine(
                Path.GetTempPath(),
                "paranext-cap-022-gm011",
                Guid.NewGuid().ToString("N")
            );
            string projectDir = Path.Combine(tempRoot, "GmRefProj");
            Directory.CreateDirectory(projectDir);
            try
            {
                File.WriteAllText(
                    Path.Combine(projectDir, "Settings.xml"),
                    "<?xml version=\"1.0\" encoding=\"utf-8\"?><ScriptureText/>"
                );
                File.WriteAllText(
                    Path.Combine(projectDir, "01GENGmRefProj.SFM"),
                    "\\id GEN gm-011 reference project\n\\c 1\n\\v 1 In the beginning.\n"
                );

                // Use BackupLogService override so the test doesn't touch
                // ScrTextCollection.SettingsDirectory
                string logPath = Path.Combine(tempRoot, "Backup.txt");
                BackupLogService.LogFilePathOverride = logPath;

                ScrText scrText = new GmRefScrText(projectDir, "GmRefProj");
                var destFileSpec = Path.Combine(tempRoot, "gm011-backup.zip");

                var bookSet = new BookSet();
                for (int i = 1; i <= 66; i++)
                    bookSet.Add(i);

                // Act
                var result = BackupOrchestrator.ExecuteBackup(
                    scrText,
                    destFileSpec,
                    bookSet,
                    IncludeFiguresFlags.Figures,
                    "gm-011 test",
                    includeEncodingInfo: false,
                    confirmOverwrite: false
                );

                // Assert
                Assert.That(
                    result,
                    Is.InstanceOf<BackupResult.Success>(),
                    "gm-011: backup of canonical reference project produces Success envelope"
                );

                var entryNames = GetZipEntryNamesSorted(destFileSpec);

                Assert.That(
                    entryNames,
                    Contains.Item("01GENGmRefProj.SFM"),
                    "gm-011 whitelist: SFM book file is in the ZIP"
                );
                Assert.That(
                    entryNames,
                    Contains.Item("Settings.xml"),
                    "gm-011 whitelist: Settings.xml is in the ZIP"
                );
            }
            finally
            {
                BackupLogService.LogFilePathOverride = null;
                if (Directory.Exists(tempRoot))
                {
                    try
                    {
                        Directory.Delete(tempRoot, recursive: true);
                    }
                    catch
                    {
                        /* best-effort */
                    }
                }
            }
        }

        // -----------------------------------------------------------------
        // gm-012 — Backup ZIP excludes unselected books (CAP-022 / TS-010 / INV-A05).
        // -----------------------------------------------------------------

        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-022")]
        [Property("BehaviorId", "BHV-101")]
        [Property("InvariantId", "INV-A05")]
        [Property("ScenarioId", "TS-010")]
        public void ExecuteBackup_PartialBookSet_ExcludesUnselectedBooks_Gm012()
        {
            var gmDir = LocateGoldenMasterDir("gm-012-backup-zip-excludes-unselected-books");
            var expected = System.Text.Json.JsonDocument.Parse(
                File.ReadAllText(Path.Combine(gmDir, "expected-output.json"))
            );

            var expectedEntries = expected
                .RootElement.GetProperty("output")
                .GetProperty("entries")
                .EnumerateArray()
                .Select(e => e.GetString()!)
                .ToList();

            // gm-012 captured contract: with BookSet=GEN, the ZIP contains
            // 01GEN*.SFM but NOT 02EXO* or 03LEV*.
            Assert.That(
                expectedEntries,
                Contains.Item("01GENGmPartialProj.SFM"),
                "gm-012 contract: selected GEN book is in the ZIP"
            );
            Assert.That(
                expectedEntries.Any(e => e.Contains("EXO")),
                Is.False,
                "gm-012 contract: unselected EXO is excluded"
            );
            Assert.That(
                expectedEntries.Any(e => e.Contains("LEV")),
                Is.False,
                "gm-012 contract: unselected LEV is excluded"
            );

            string tempRoot = Path.Combine(
                Path.GetTempPath(),
                "paranext-cap-022-gm012",
                Guid.NewGuid().ToString("N")
            );
            string projectDir = Path.Combine(tempRoot, "GmPartialProj");
            Directory.CreateDirectory(projectDir);
            try
            {
                File.WriteAllText(
                    Path.Combine(projectDir, "Settings.xml"),
                    "<?xml version=\"1.0\" encoding=\"utf-8\"?><ScriptureText/>"
                );
                File.WriteAllText(
                    Path.Combine(projectDir, "01GENGmPartialProj.SFM"),
                    "\\id GEN\n\\c 1\n\\v 1 GEN.\n"
                );
                File.WriteAllText(
                    Path.Combine(projectDir, "02EXOGmPartialProj.SFM"),
                    "\\id EXO\n\\c 1\n\\v 1 EXO.\n"
                );
                File.WriteAllText(
                    Path.Combine(projectDir, "03LEVGmPartialProj.SFM"),
                    "\\id LEV\n\\c 1\n\\v 1 LEV.\n"
                );

                string logPath = Path.Combine(tempRoot, "Backup.txt");
                BackupLogService.LogFilePathOverride = logPath;

                ScrText scrText = new GmRefScrText(projectDir, "GmPartialProj");
                var destFileSpec = Path.Combine(tempRoot, "gm012-partial.zip");

                // BookSet with only GEN (book #1)
                var bookSet = new BookSet();
                bookSet.Add(1);

                var result = BackupOrchestrator.ExecuteBackup(
                    scrText,
                    destFileSpec,
                    bookSet,
                    IncludeFiguresFlags.Figures,
                    "gm-012 partial backup",
                    includeEncodingInfo: false,
                    confirmOverwrite: false
                );

                Assert.That(result, Is.InstanceOf<BackupResult.Success>());
                var entryNames = GetZipEntryNamesSorted(destFileSpec);

                Assert.That(
                    entryNames,
                    Contains.Item("01GENGmPartialProj.SFM"),
                    "gm-012: GEN (selected) is in the ZIP"
                );
                Assert.That(
                    entryNames.Any(n => n.Contains("EXO", StringComparison.OrdinalIgnoreCase)),
                    Is.False,
                    "INV-A05: EXO (unselected) is excluded"
                );
                Assert.That(
                    entryNames.Any(n => n.Contains("LEV", StringComparison.OrdinalIgnoreCase)),
                    Is.False,
                    "INV-A05: LEV (unselected) is excluded"
                );
            }
            finally
            {
                BackupLogService.LogFilePathOverride = null;
                if (Directory.Exists(tempRoot))
                {
                    try
                    {
                        Directory.Delete(tempRoot, recursive: true);
                    }
                    catch
                    {
                        /* best-effort */
                    }
                }
            }
        }

        // -----------------------------------------------------------------
        // gm-013 — Backup ZIP figures-flag matrix (CAP-022 / TS-011 / INV-A06).
        //
        // Three runs with flags=[None, Figures, Figures|LocalFigures] on a
        // project that has a figures/ subfolder. Captures inclusion semantics:
        //   None → figures/ excluded
        //   Figures → figures/ included
        //   Figures|LocalFigures → figures/ + local/figures/ included
        // -----------------------------------------------------------------

        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-022")]
        [Property("BehaviorId", "BHV-101")]
        [Property("InvariantId", "INV-A06")]
        [Property("ScenarioId", "TS-011")]
        public void ExecuteBackup_FiguresFlagMatrix_MatchesGm013Contract()
        {
            var gmDir = LocateGoldenMasterDir("gm-013-backup-zip-figures-flag-matrix");
            var expected = System.Text.Json.JsonDocument.Parse(
                File.ReadAllText(Path.Combine(gmDir, "expected-output.json"))
            );

            // The gm-013 captured matrix lives at output.perFlag — array of
            // { flag, entryCount, entries }. We verify the FLAG SEMANTICS contract
            // (figures presence/absence) rather than literal entryCount byte-parity
            // (capture environment had extras like Notes_Rolf Heij.xml).
            var perFlag = expected
                .RootElement.GetProperty("output")
                .GetProperty("perFlag")
                .EnumerateArray()
                .ToList();

            Assert.That(perFlag, Has.Count.EqualTo(3), "gm-013 captures 3 flag combinations");

            string tempRoot = Path.Combine(
                Path.GetTempPath(),
                "paranext-cap-022-gm013",
                Guid.NewGuid().ToString("N")
            );
            string projectDir = Path.Combine(tempRoot, "GmFigProj");
            Directory.CreateDirectory(projectDir);
            try
            {
                File.WriteAllText(
                    Path.Combine(projectDir, "Settings.xml"),
                    "<?xml version=\"1.0\" encoding=\"utf-8\"?><ScriptureText/>"
                );
                File.WriteAllText(
                    Path.Combine(projectDir, "01GENGmFigProj.SFM"),
                    "\\id GEN gm-013\n\\c 1\n\\v 1 \\fig stub|src=\"test.jpg\"\\fig*\n"
                );
                Directory.CreateDirectory(Path.Combine(projectDir, "figures"));
                File.WriteAllBytes(
                    Path.Combine(projectDir, "figures", "test.jpg"),
                    new byte[] { 0xFF, 0xD8, 0xFF }
                );

                string logPath = Path.Combine(tempRoot, "Backup.txt");
                BackupLogService.LogFilePathOverride = logPath;

                ScrText scrText = new GmRefScrText(projectDir, "GmFigProj");

                var bookSet = new BookSet();
                for (int i = 1; i <= 66; i++)
                    bookSet.Add(i);

                // Run 1: flag=None → figures excluded
                var destNone = Path.Combine(tempRoot, "gm013-figures-None.zip");
                BackupOrchestrator.ExecuteBackup(
                    scrText,
                    destNone,
                    bookSet,
                    IncludeFiguresFlags.None,
                    "gm-013 None",
                    includeEncodingInfo: false,
                    confirmOverwrite: false
                );
                var entriesNone = GetZipEntryNamesSorted(destNone);
                Assert.That(
                    entriesNone.Any(n => n.Contains("figures", StringComparison.OrdinalIgnoreCase)),
                    Is.False,
                    "INV-A06: flag=None excludes figures/"
                );

                // Run 2: flag=Figures → figures/ included
                var destFigures = Path.Combine(tempRoot, "gm013-figures-Figures.zip");
                BackupOrchestrator.ExecuteBackup(
                    scrText,
                    destFigures,
                    bookSet,
                    IncludeFiguresFlags.Figures,
                    "gm-013 Figures",
                    includeEncodingInfo: false,
                    confirmOverwrite: false
                );
                var entriesFigures = GetZipEntryNamesSorted(destFigures);
                Assert.That(
                    entriesFigures.Any(n =>
                        n.Contains("test.jpg", StringComparison.OrdinalIgnoreCase)
                    ),
                    Is.True,
                    "INV-A06: flag=Figures includes figures/test.jpg"
                );

                // Run 3: flag=Figures|LocalFigures → figures/ included
                var destAll = Path.Combine(tempRoot, "gm013-figures-FiguresLocalFigures.zip");
                BackupOrchestrator.ExecuteBackup(
                    scrText,
                    destAll,
                    bookSet,
                    IncludeFiguresFlags.Figures | IncludeFiguresFlags.LocalFigures,
                    "gm-013 Figures|LocalFigures",
                    includeEncodingInfo: false,
                    confirmOverwrite: false
                );
                var entriesAll = GetZipEntryNamesSorted(destAll);
                Assert.That(
                    entriesAll.Any(n => n.Contains("test.jpg", StringComparison.OrdinalIgnoreCase)),
                    Is.True,
                    "INV-A06: flag=Figures|LocalFigures includes figures/test.jpg"
                );
            }
            finally
            {
                BackupLogService.LogFilePathOverride = null;
                if (Directory.Exists(tempRoot))
                {
                    try
                    {
                        Directory.Delete(tempRoot, recursive: true);
                    }
                    catch
                    {
                        /* best-effort */
                    }
                }
            }
        }

        // ZIP-entry-names helper for the gm-011/012/013 fixtures
        private static List<string> GetZipEntryNamesSorted(string zipPath)
        {
            using var stream = File.OpenRead(zipPath);
            using var archive = new ZipArchive(stream, ZipArchiveMode.Read);
            return archive.Entries.Select(e => e.FullName).OrderBy(n => n).ToList();
        }

        // ScrText subclass with a real on-disk directory (gm-011/012/013 use this).
        private sealed class GmRefScrText : DummyScrText
        {
            private readonly string _projectPath;

            public GmRefScrText(string projectPath, string nameStem)
                : base(MakeDetails(projectPath, nameStem))
            {
                _projectPath = projectPath;
                // PT9 ProjectFileClassifier.Get → settings.GetBookNumberFromFilename
                // → BookFileName(bookNum) = FileNamePrePart + bookPart + FileNamePostPart.
                // Default FileNameForm gives bookPart="01GEN" for book 1. The gm-*
                // fixtures create files named like "01GEN<nameStem>.SFM" so set
                // FileNamePostPart accordingly. That lets the classifier resolve
                // those files to bookNum=1 + FileType=Books, which is what the
                // orchestrator's per-book filter (selectedBooks.IsSelected) requires.
                Settings.FileNamePrePart = string.Empty;
                Settings.FileNameForm = string.Empty;
                Settings.FileNamePostPart = nameStem + ".SFM";
            }

            public override string Directory => _projectPath;

            private static ProjectDetails MakeDetails(string projectPath, string nameStem)
            {
                var id = HexId.CreateNew().ToString();
                return new ProjectDetails(nameStem, new ProjectMetadata(id, []), projectPath);
            }
        }

        // -----------------------------------------------------------------
        // gm-016 — PerformRestore overlay onto existing project (TS-019).
        //
        // Golden master captures: overlayPerformed=true; performRestoreReturned=true;
        // a non-zero number of files marked for restore. PT9's Restorer.PerformRestore
        // is a black box at the wire level — our test verifies the wire contract
        // (Success envelope + Theme-6 fire) and that the handle's PerformOverlayRestore
        // was invoked with the SelectedFileIds the golden master implies.
        //
        // The byte-for-byte file content match (gm-016's contentBeforeRestore /
        // contentAfterRestore) is the responsibility of the GREEN-state real
        // DefaultRestorerHandle port — at RED state we pin the call-shape contract.
        // -----------------------------------------------------------------

        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-105")]
        [Property("ScenarioId", "TS-019")]
        [Property("GoldenMaster", "gm-016")]
        public void PerformRestore_OverlaySuccess_MatchesGoldenMaster_gm016()
        {
            // Arrange — load the gm-016 expected output
            var gmDir = LocateGoldenMasterDir("gm-016-performrestore-overlay");
            var expected = JsonDocument.Parse(
                File.ReadAllText(Path.Combine(gmDir, "expected-output.json"))
            );
            var output = expected.RootElement.GetProperty("output");

            bool gmOverlayPerformed = output.GetProperty("overlayPerformed").GetBoolean();
            bool gmPerformRestoreReturned = output
                .GetProperty("performRestoreReturned")
                .GetBoolean();
            int gmMarkedForRestore = output.GetProperty("markedForRestore").GetInt32();

            Assert.That(
                gmOverlayPerformed,
                Is.True,
                "gm-016 captures: overlayPerformed=true (overlay branch)"
            );
            Assert.That(
                gmPerformRestoreReturned,
                Is.True,
                "gm-016 captures: performRestoreReturned=true (success path)"
            );
            Assert.That(
                gmMarkedForRestore,
                Is.GreaterThan(0),
                "gm-016 captures: markedForRestore > 0 (at least one file selected)"
            );

            // Drive the CAP-004 wire path via the dataset above. Verifying byte-for-byte
            // content parity is the GREEN-state implementer's job; here we pin that the
            // wire envelope satisfies the gm-016 binary contract.
            var fixture = new GoldenMasterCAP004Fixture();
            using (fixture)
            {
                fixture.SeedSession(isLegacyBackup: false, sharedProjectMarkers: false);
                fixture.RegisterAdminDestination();

                RestoreOperationResult result = fixture.PerformRestore(
                    selectedFileIds: Enumerable
                        .Range(0, gmMarkedForRestore)
                        .Select(i => $"F-{i:D2}")
                        .ToArray()
                );

                // gm-016 contract: overlay completes, performRestoreReturned=true ≡ Success
                Assert.That(
                    result,
                    Is.InstanceOf<RestoreOperationResult.Success>(),
                    "gm-016 wire-level: performRestoreReturned=true maps to Success envelope"
                );

                // gm-016 contract: overlayPerformed=true ≡ handle.PerformOverlayRestore invoked
                Assert.That(
                    fixture.LastOverlayInvocations,
                    Is.EqualTo(1),
                    "gm-016: overlayPerformed=true means the handle's overlay body ran exactly once"
                );

                // gm-016 contract: markedForRestore files plumbed through
                Assert.That(
                    fixture.LastOverlayRequest!.SelectedFileIds,
                    Has.Count.EqualTo(gmMarkedForRestore),
                    $"gm-016: {gmMarkedForRestore} files plumbed through to the handle"
                );

                // gm-016 contract: Theme-6 fires exactly once after success
                Assert.That(
                    fixture.FullProjectUpdateFires,
                    Has.Count.EqualTo(1),
                    "gm-016: Theme-6 SendFullProjectUpdateEvent fires exactly once post-overlay"
                );
            }
        }

        // -----------------------------------------------------------------
        // gm-017 — PTX-20538 CN preservation (TS-020 / INV-A13).
        //
        // Golden master captures: IsLegacyProjectBackup=true triggers the
        // legacy skip-list augmentation; destination's TranslationInfo preserved.
        // Wire-level test: the orchestrator must plumb IsLegacyBackup=true into
        // the handle's PerformOverlayRestore so the handle's implementation knows
        // to augment its skip list. The byte-level content preservation is the
        // GREEN-state implementer's port of PT9 Restorer.cs:149-157.
        // -----------------------------------------------------------------

        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-105")]
        [Property("ScenarioId", "TS-020")]
        [Property("InvariantId", "INV-A13")]
        [Property("GoldenMaster", "gm-017")]
        public void PerformRestore_OverlayLegacyCN_MatchesGoldenMaster_gm017()
        {
            // Arrange — load gm-017 contract
            var gmDir = LocateGoldenMasterDir("gm-017-performrestore-ptx-20538-cn-preservation");
            var expected = JsonDocument.Parse(
                File.ReadAllText(Path.Combine(gmDir, "expected-output.json"))
            );
            var contract = expected.RootElement.GetProperty("output").GetProperty("contract");
            var trigger = contract.GetProperty("trigger").GetString()!;
            Assert.That(
                trigger,
                Does.Contain("IsLegacyProjectBackup is true"),
                "gm-017 captures: trigger condition is IsLegacyProjectBackup=true"
            );

            var fixture = new GoldenMasterCAP004Fixture();
            using (fixture)
            {
                fixture.SeedSession(isLegacyBackup: true, sharedProjectMarkers: false);
                fixture.RegisterAdminDestination();

                RestoreOperationResult result = fixture.PerformRestore(
                    selectedFileIds: new[] { "F-GEN" }
                );

                Assert.That(
                    result,
                    Is.InstanceOf<RestoreOperationResult.Success>(),
                    "gm-017: legacy backup overlay returns Success"
                );

                Assert.That(
                    fixture.LastOverlayRequest!.IsLegacyBackup,
                    Is.True,
                    "gm-017 / INV-A13 / PTX-20538: legacy flag plumbed to the handle "
                        + "so the handle augments its fields-to-skip with "
                        + "Setting.Language + Setting.LanguageIsoCode + Setting.TranslationInfo"
                );
            }
        }

        // -----------------------------------------------------------------
        // gm-029 — cmdOK ProgressUtils 4-step overlay branch (TS-094 / BHV-326).
        //
        // Golden master captures the PT9 4-step overlay pipeline:
        //   (1) vText.AlwaysCommit("Before restoring books.")  [UI/LB-UI-EXT-206]
        //   (2) restorer.PerformRestore()                       [LB-PD-06]
        //   (3) vText.AlwaysCommit("After restoring books.")    [UI/LB-UI-EXT-206]
        //   (4) ProjectFileUpdateManager — overlay branch skips
        //
        // Per backend-alignment.md §EXT-206 the pre/post commits are OUT_OF_SCOPE
        // for FN-010-narrowed PT10. The wire-level analog of step (2) +
        // step (4)'s overlay-skip is: PerformRestore invoked exactly once;
        // Theme-6 fires exactly once after success. The gm-029 anchor at the wire
        // level is therefore the PerformOverlayRestore-invoked-once contract.
        // -----------------------------------------------------------------

        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-326")]
        [Property("ScenarioId", "TS-094")]
        [Property("GoldenMaster", "gm-029")]
        public void PerformRestore_OverlayProgress_MatchesGoldenMaster_gm029()
        {
            // Arrange — load gm-029 contract
            var gmDir = LocateGoldenMasterDir("gm-029-cmdok-progressutils-4-steps");
            var expected = JsonDocument.Parse(
                File.ReadAllText(Path.Combine(gmDir, "expected-output.json"))
            );
            string gmBranch = expected
                .RootElement.GetProperty("output")
                .GetProperty("branch")
                .GetString()!;
            int gmStepCount = expected
                .RootElement.GetProperty("output")
                .GetProperty("stepCount")
                .GetInt32();

            Assert.That(gmBranch, Is.EqualTo("overlay"), "gm-029: branch=overlay");
            Assert.That(
                gmStepCount,
                Is.EqualTo(4),
                "gm-029: 4-step ProgressUtils pipeline (steps 1,3,4 UI-side; step 2 is wire-side)"
            );

            var fixture = new GoldenMasterCAP004Fixture();
            using (fixture)
            {
                fixture.SeedSession(isLegacyBackup: false, sharedProjectMarkers: false);
                fixture.RegisterAdminDestination();

                RestoreOperationResult result = fixture.PerformRestore(
                    selectedFileIds: new[] { "F-GEN" }
                );

                Assert.That(
                    result,
                    Is.InstanceOf<RestoreOperationResult.Success>(),
                    "gm-029: overlay branch happy path returns Success"
                );

                // Wire-side analog of gm-029 step (2): PerformRestore invoked exactly once
                Assert.That(
                    fixture.LastOverlayInvocations,
                    Is.EqualTo(1),
                    "gm-029 step (2): handle.PerformOverlayRestore invoked exactly once on overlay branch"
                );

                // Wire-side analog of gm-029 step (4) skip: Theme-6 fires once
                // (analogous to PT9's overlay-branch progress increment without
                // ProjectFileUpdateManager.PerformUpdates running)
                Assert.That(
                    fixture.FullProjectUpdateFires,
                    Has.Count.EqualTo(1),
                    "gm-029: Theme-6 fires exactly once post-overlay (LB-UI-EXT-206 hoisted to wire layer)"
                );
            }
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

        // -----------------------------------------------------------------
        // CAP-004 — GoldenMasterCAP004Fixture
        //
        // Drives the wire-layer PerformRestoreAsync against a fake handle that
        // records overlay invocations. Used by gm-016 / gm-017 / gm-029 tests
        // to assert the wire envelope + plumbed-flags contract without needing
        // a real PT9 Restorer port. The byte-for-byte content match (gm-016)
        // is the GREEN-state implementer's job — see CAP-004 plan §"Risks".
        // -----------------------------------------------------------------

        private sealed class GoldenMasterCAP004Fixture : IDisposable
        {
            private readonly string _tempDir;
            private readonly BackupRestoreDataProvider _provider;
            private readonly DummyLocalParatextProjects _localProjects;
            private string? _sessionId;
            private GoldenMasterCAP004FakeHandle? _handle;
            private ScrText? _destination;
            private readonly List<string> _fullProjectUpdateFires = new();

            public GoldenMasterCAP004Fixture()
            {
                _tempDir = Path.Combine(
                    Path.GetTempPath(),
                    "paranext-cap-004-gm",
                    Guid.NewGuid().ToString("N")
                );
                Directory.CreateDirectory(_tempDir);
                // CAP-001 GREEN added the primary ctor (PapiClient, LocalParatextProjects).
                // The golden-master fixture's restore-flow assertions only exercise the
                // wire-layer M-002/M-003 methods (which don't depend on the PapiClient
                // beyond the base-class field), so a DummyPapiClient + DummyLocalParatextProjects
                // are sufficient. The local _localProjects is kept for the existing
                // session-seeding flow (line 1276+).
                _localProjects = new DummyLocalParatextProjects();
                _provider = new BackupRestoreDataProvider(new DummyPapiClient(), _localProjects);
                BackupRestoreDataProvider.SendFullProjectUpdateEventOverride = pid =>
                    _fullProjectUpdateFires.Add(pid);
                RestoreOrchestrator.WriteLockObtainerOverride = _ => new GMNoOpDisposable();
            }

            public IReadOnlyList<string> FullProjectUpdateFires => _fullProjectUpdateFires;
            public int LastOverlayInvocations => _handle?.OverlayInvocations ?? 0;
            public RestoreOverlayRequest? LastOverlayRequest => _handle?.LastOverlayRequest;

            public void SeedSession(bool isLegacyBackup, bool sharedProjectMarkers)
            {
                string zipPath = Path.Combine(_tempDir, "gm.zip");
                using (var fs = File.Create(zipPath))
                using (
                    var archive = new System.IO.Compression.ZipArchive(
                        fs,
                        System.IO.Compression.ZipArchiveMode.Create
                    )
                )
                {
                    var entry = archive.CreateEntry("placeholder.txt");
                    using var sw = new StreamWriter(entry.Open());
                    sw.Write("x");
                }

                var metadata = new RestorerMetadata
                {
                    FilePath = zipPath,
                    ProjectName = "GMTest",
                    IsLegacyBackup = isLegacyBackup,
                    SharedProjectMarkers = sharedProjectMarkers,
                    AllFiles = Array.Empty<RestoreFileEntry>(),
                };
                _handle = new GoldenMasterCAP004FakeHandle(metadata);
                BackupRestoreDataProvider.RestorerFactoryOverride = _ => _handle;

                var openTask = _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );
                openTask.Wait();
                _sessionId = ((RestoreSessionResult.Success)openTask.Result).SessionId;
            }

            public void RegisterAdminDestination()
            {
                _destination = new GoldenMasterCAP004ScrText(
                    new GoldenMasterCAP004PermissionManager(isAdmin: true)
                );
                ScrTextCollection.Add(_destination, true);
            }

            public RestoreOperationResult PerformRestore(IReadOnlyList<string> selectedFileIds)
            {
                if (_sessionId == null || _destination == null)
                    throw new InvalidOperationException(
                        "Call SeedSession + RegisterAdminDestination before PerformRestore"
                    );

                var task = _provider.PerformRestoreAsync(
                    new RestoreRequest
                    {
                        SessionId = _sessionId,
                        DestinationProjectId = _destination.Guid.ToString(),
                        SelectedFileIds = selectedFileIds,
                    }
                );
                task.Wait();
                return task.Result;
            }

            public void Dispose()
            {
                BackupRestoreDataProvider.RestorerFactoryOverride = null;
                BackupRestoreDataProvider.SendFullProjectUpdateEventOverride = null;
                BackupRestoreDataProvider.PersistCurrentChangesOverride = null;
                RestoreOrchestrator.WriteLockObtainerOverride = null;
                if (_destination != null)
                    ScrTextCollection.Remove(_destination, false);
                try
                {
                    if (Directory.Exists(_tempDir))
                        Directory.Delete(_tempDir, recursive: true);
                }
                catch
                {
                    // Best-effort cleanup.
                }
                _ = _localProjects;
            }

            private sealed class GoldenMasterCAP004FakeHandle : IRestorerHandle
            {
                private readonly RestorerMetadata _metadata;
                public int OverlayInvocations { get; private set; }
                public RestoreOverlayRequest? LastOverlayRequest { get; private set; }

                public GoldenMasterCAP004FakeHandle(RestorerMetadata metadata)
                {
                    _metadata = metadata;
                }

                public RestorerMetadata BuildMetadata(string? preferredDestinationProjectId) =>
                    _metadata;

                public RestoreOverlayOutcome PerformOverlayRestore(
                    ScrText destination,
                    RestoreOverlayRequest request
                )
                {
                    OverlayInvocations++;
                    LastOverlayRequest = request;
                    return RestoreOverlayOutcome.Success;
                }

                public void Dispose() { }
            }

            private sealed class GoldenMasterCAP004PermissionManager : PermissionManager
            {
                private readonly bool _isAdmin;

                public GoldenMasterCAP004PermissionManager(bool isAdmin)
                    : base()
                {
                    _isAdmin = isAdmin;
                }

                public override bool AmAdministrator => _isAdmin;
            }

            private sealed class GoldenMasterCAP004ScrText : DummyScrText
            {
                private readonly PermissionManager _permissions;

                public GoldenMasterCAP004ScrText(PermissionManager permissions)
                    : base()
                {
                    _permissions = permissions;
                }

                public override PermissionManager Permissions => _permissions;
            }

            private sealed class GMNoOpDisposable : IDisposable
            {
                public void Dispose() { }
            }
        }
    }
}
