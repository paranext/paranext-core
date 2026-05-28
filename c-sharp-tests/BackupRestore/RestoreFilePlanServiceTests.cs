using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using Paranext.DataProvider.BackupRestore;
using Paratext.Data;

namespace TestParanextDataProvider.BackupRestore
{
    /// <summary>
    /// Tests for <see cref="RestoreFilePlanService"/>
    /// (CAP-017 / EXT-200 / BHV-318 / BHV-319 / BHV-322 /
    /// INV-A08 / INV-A09 / INV-A10 / VAL-B07).
    ///
    /// Worker-pattern service: builds the per-file restore plan from a sequence of
    /// <see cref="RestoreFileInfo"/> entries, and gates the user's checkbox-toggle
    /// interactions through <see cref="RestoreFilePlanService.OkToToggleOn"/>.
    ///
    /// Specification sources:
    /// <list type="bullet">
    ///   <item>data-contracts.md §3.4 line 584-616 (wire-side <c>RestoreFileEntry</c>)</item>
    ///   <item>data-contracts.md §3.5 line 636-674 (9-state <c>ComparisonResult</c> enum)</item>
    ///   <item>extraction-plan.md §EXT-200 line 261-347 (Worker stub + 9-state PT9 source)</item>
    ///   <item>backend-alignment.md §EXT-200 line 217-236 (Worker pattern + signature)</item>
    ///   <item>strategic-plan-backend.md §CAP-017 line 439-456 (REVIEW-FLAG-2 anchor)</item>
    ///   <item>test-specifications/spec-007 (9-state classifier — feeds the plan service)</item>
    ///   <item>characterization/test-scenarios.json TS-073..TS-084, TS-088 (matrix + flows)</item>
    ///   <item>golden-masters/gm-001..gm-010 (full styling matrix + auto-tick + downgrade-decline)</item>
    ///   <item>business-rules.md INV-A08, INV-A09, INV-A10, VAL-B07</item>
    /// </list>
    ///
    /// PT9 source:
    /// <list type="bullet">
    ///   <item><c>RestoreForm.cs:579-616</c> (<c>SetRestorableItemAppearance</c> — per-state column styling)</item>
    ///   <item><c>RestoreForm.cs:623-670</c> (<c>DetermineRestoreEligibilityZip</c> — tooltip keys + REVIEW-FLAG-2 override at line 669)</item>
    ///   <item><c>RestoreForm.cs:765-774</c> (<c>OkToRestoreFile</c> — downgrade-confirm gate)</item>
    /// </list>
    ///
    /// REVIEW-FLAG-2 anchor (extraction-plan.md §EXT-200 line 288-290): <c>ShouldRestore</c>
    /// MUST be sourced from <see cref="RestoreFileInfo.IsNormallyRestored"/> — NOT from the
    /// per-state defaults PT9 sets in the tooltip switch. Test
    /// <see cref="Build_ShouldRestore_IsSourcedFromIsNormallyRestored_NotPerStateDefaults"/>
    /// pins this explicitly with a fabricated "inconsistent" input.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class RestoreFilePlanServiceTests
    {
        // Localize keys per PT9 RestoreForm.cs:629-660 (DetermineRestoreEligibilityZip switch).
        private const string KEY_DEST_DOES_NOT_EXIST = "RestoreForm_18";
        private const string KEY_FILES_ARE_SAME = "RestoreForm_19";
        private const string KEY_FILES_ARE_SAME_VERSION = "RestoreForm_20";
        private const string KEY_SOURCE_IS_HIGHER_VERSION = "RestoreForm_21";
        private const string KEY_DEST_IS_HIGHER_VERSION = "RestoreForm_22";
        private const string KEY_SOURCE_IS_NEWER = "RestoreForm_23";
        private const string KEY_SOURCE_IS_OLDER = "RestoreForm_24";

        // PT9 downgrade prompt localize key — RestoreForm.cs:770
        private const string KEY_DOWNGRADE_PROMPT = "RestoreForm_33";

        // -----------------------------------------------------------------
        // Group A — 9-state column-styling matrix (BHV-318)
        //
        // Each test pins one row of the gm-001..gm-008 matrix as a unit test, so a
        // regression that breaks a single state can be diagnosed precisely without
        // needing to consult the golden master harness. The 9th state (SourceDoesNotExist)
        // is NOT in gm-001..gm-008 but its rendering is pinned here per the PT9 source
        // (RestoreForm.cs:579-616 has no `case SourceDoesNotExist` — falls through to
        // regular/regular; see test-writer plan Resolved Ambiguity §3).
        // -----------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-318")]
        [Property("ScenarioId", "TS-073")]
        public void Build_StateDestDoesNotExist_Col1IsBold_Col2IsGrayed()
        {
            // Arrange — DestDoesNotExist row (auto-ticked per INV-A09)
            var input = new[]
            {
                MakeFile(
                    "01GENMyProj.SFM",
                    PtwFileComparisonStates.DestDoesNotExist,
                    isNormallyRestored: true
                ),
            };

            // Act
            var rows = new RestoreFilePlanService().Build(input);

            // Assert
            Assert.That(rows, Has.Count.EqualTo(1));
            Assert.That(rows[0].State, Is.EqualTo(PtwFileComparisonStates.DestDoesNotExist));
            Assert.That(rows[0].Col1Style, Is.EqualTo("bold"));
            Assert.That(rows[0].Col2Style, Is.EqualTo("grayed"));
        }

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-318")]
        [Property("ScenarioId", "TS-074")]
        public void Build_StateFilesAreSame_BothColumnsGrayed()
        {
            var input = new[]
            {
                MakeFile(
                    "Settings.xml",
                    PtwFileComparisonStates.FilesAreSame,
                    isNormallyRestored: false
                ),
            };

            var rows = new RestoreFilePlanService().Build(input);

            Assert.That(rows[0].Col1Style, Is.EqualTo("grayed"));
            Assert.That(rows[0].Col2Style, Is.EqualTo("grayed"));
        }

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-318")]
        [Property("ScenarioId", "TS-075")]
        public void Build_StateSourceIsNewer_Col1BoldCol2Regular()
        {
            var input = new[]
            {
                MakeFile(
                    "custom.sty",
                    PtwFileComparisonStates.SourceIsNewer,
                    isNormallyRestored: true
                ),
            };

            var rows = new RestoreFilePlanService().Build(input);

            Assert.That(rows[0].Col1Style, Is.EqualTo("bold"));
            Assert.That(rows[0].Col2Style, Is.EqualTo("regular"));
        }

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-318")]
        [Property("ScenarioId", "TS-076")]
        public void Build_StateSourceIsOlder_Col1RegularCol2Bold()
        {
            var input = new[]
            {
                MakeFile(
                    "custom.sty",
                    PtwFileComparisonStates.SourceIsOlder,
                    isNormallyRestored: false
                ),
            };

            var rows = new RestoreFilePlanService().Build(input);

            Assert.That(rows[0].Col1Style, Is.EqualTo("regular"));
            Assert.That(rows[0].Col2Style, Is.EqualTo("bold"));
        }

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-318")]
        [Property("ScenarioId", "TS-077")]
        public void Build_StateSourceIsHigherVersion_Col1BoldCol2Regular()
        {
            var input = new[]
            {
                MakeFile(
                    "custom.sty",
                    PtwFileComparisonStates.SourceIsHigherVersion,
                    isNormallyRestored: true
                ),
            };

            var rows = new RestoreFilePlanService().Build(input);

            Assert.That(rows[0].Col1Style, Is.EqualTo("bold"));
            Assert.That(rows[0].Col2Style, Is.EqualTo("regular"));
        }

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-318")]
        [Property("ScenarioId", "TS-078")]
        public void Build_StateDestIsHigherVersion_Col1GrayedCol2Bold()
        {
            var input = new[]
            {
                MakeFile(
                    "custom.sty",
                    PtwFileComparisonStates.DestIsHigherVersion,
                    isNormallyRestored: false
                ),
            };

            var rows = new RestoreFilePlanService().Build(input);

            Assert.That(rows[0].Col1Style, Is.EqualTo("grayed"));
            Assert.That(rows[0].Col2Style, Is.EqualTo("bold"));
        }

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-318")]
        [Property("ScenarioId", "TS-079")]
        public void Build_StateFilesAreSameVersion_BothColumnsGrayed()
        {
            var input = new[]
            {
                MakeFile(
                    "custom.sty",
                    PtwFileComparisonStates.FilesAreSameVersion,
                    isNormallyRestored: false
                ),
            };

            var rows = new RestoreFilePlanService().Build(input);

            Assert.That(rows[0].Col1Style, Is.EqualTo("grayed"));
            Assert.That(rows[0].Col2Style, Is.EqualTo("grayed"));
        }

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-318")]
        [Property("ScenarioId", "TS-080")]
        public void Build_StateUndetermined_BothColumnsRegular()
        {
            var input = new[]
            {
                MakeFile(
                    "Settings.xml",
                    PtwFileComparisonStates.Undetermined,
                    isNormallyRestored: false
                ),
            };

            var rows = new RestoreFilePlanService().Build(input);

            Assert.That(rows[0].Col1Style, Is.EqualTo("regular"));
            Assert.That(rows[0].Col2Style, Is.EqualTo("regular"));
        }

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-318")]
        [Property("ScenarioId", "TS-080")]
        public void Build_StateSourceDoesNotExist_BothColumnsRegular()
        {
            // PT9 SetRestorableItemAppearance (RestoreForm.cs:579-616) has NO explicit case
            // for SourceDoesNotExist — the switch falls through, leaving both columns at
            // their default font (regular) and default color (no GrayText override). The
            // extraction-plan.md line 327 comment incorrectly says `col2Bold = true` for
            // this state; the PT9 source is the canonical truth. See test-writer plan
            // Resolved Ambiguity §3 for the full audit trail.
            var input = new[]
            {
                MakeFile(
                    "01GENMyProj.SFM",
                    PtwFileComparisonStates.SourceDoesNotExist,
                    isNormallyRestored: false
                ),
            };

            var rows = new RestoreFilePlanService().Build(input);

            Assert.That(
                rows[0].Col1Style,
                Is.EqualTo("regular"),
                "PT9 SetRestorableItemAppearance has no `case SourceDoesNotExist` — col1 retains default 'regular'"
            );
            Assert.That(
                rows[0].Col2Style,
                Is.EqualTo("regular"),
                "PT9 SetRestorableItemAppearance has no `case SourceDoesNotExist` — col2 retains default 'regular'"
            );
        }

        // -----------------------------------------------------------------
        // Group B — Auto-tick / REVIEW-FLAG-2 (BHV-319, INV-A09)
        //
        // The most important test in the fixture. REVIEW-FLAG-2 (extraction-plan.md
        // §EXT-200 line 288-290) requires that ShouldRestore be sourced from
        // RestoreFileInfo.IsNormallyRestored — NOT from the per-state defaults PT9
        // sets in DetermineRestoreEligibilityZip at lines 630/636/640/645/650/656/661.
        // PT9 itself overrides those defaults at line 669; PT10 must skip the
        // intermediate step entirely.
        //
        // The "inconsistent fabrication" test feeds a row with State=FilesAreSame
        // (whose per-state default is RestoreThisFile=false at PT9 line 636) BUT
        // IsNormallyRestored=true. A per-state-defaults implementation would yield
        // ShouldRestore=false; an IsNormallyRestored-sourced implementation yields
        // ShouldRestore=true. The test pins the latter.
        // -----------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-319")]
        [Property("InvariantId", "INV-A09")]
        [Property("ScenarioId", "TS-081")]
        public void Build_ShouldRestore_IsSourcedFromIsNormallyRestored_NotPerStateDefaults()
        {
            // Arrange — fabricated INCONSISTENT inputs that distinguish the two implementations.
            //
            //   Row 1: State=FilesAreSame, IsNormallyRestored=true.
            //          Per-state default at PT9 line 636 = false. IsNormallyRestored = true.
            //          Expected ShouldRestore = true (REVIEW-FLAG-2).
            //
            //   Row 2: State=DestDoesNotExist, IsNormallyRestored=false.
            //          Per-state default at PT9 line 630 = true. IsNormallyRestored = false.
            //          Expected ShouldRestore = false (REVIEW-FLAG-2).
            //
            //   Row 3: State=DestIsHigherVersion, IsNormallyRestored=true.
            //          Per-state default at PT9 line 650 = false. IsNormallyRestored = true.
            //          Expected ShouldRestore = true (REVIEW-FLAG-2).
            //
            // A per-state-defaults implementation produces (false, true, false);
            // an IsNormallyRestored-sourced implementation produces (true, false, true).
            // The test pins the latter for all three rows.
            var input = new[]
            {
                MakeFile("a.sfm", PtwFileComparisonStates.FilesAreSame, isNormallyRestored: true),
                MakeFile(
                    "b.sfm",
                    PtwFileComparisonStates.DestDoesNotExist,
                    isNormallyRestored: false
                ),
                MakeFile(
                    "c.sty",
                    PtwFileComparisonStates.DestIsHigherVersion,
                    isNormallyRestored: true
                ),
            };

            // Act
            var rows = new RestoreFilePlanService().Build(input);

            // Assert
            Assert.That(
                rows[0].ShouldRestore,
                Is.True,
                "REVIEW-FLAG-2: ShouldRestore tracks IsNormallyRestored (=true), NOT the FilesAreSame per-state default (=false)"
            );
            Assert.That(
                rows[1].ShouldRestore,
                Is.False,
                "REVIEW-FLAG-2: ShouldRestore tracks IsNormallyRestored (=false), NOT the DestDoesNotExist per-state default (=true)"
            );
            Assert.That(
                rows[2].ShouldRestore,
                Is.True,
                "REVIEW-FLAG-2: ShouldRestore tracks IsNormallyRestored (=true), NOT the DestIsHigherVersion per-state default (=false)"
            );
        }

        [Test]
        [Category("Contract")]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-319")]
        [Property("InvariantId", "INV-A09")]
        [Property("ScenarioId", "TS-081")]
        public void Build_ShouldRestore_TrueForCanonicalAutoTickStates_FalseForOthers()
        {
            // Per INV-A09, the canonical auto-tick set is exactly
            // {DestDoesNotExist, SourceIsNewer, SourceIsHigherVersion}.
            // This test feeds CANONICAL inputs (IsNormallyRestored set per spec-007's classifier)
            // and pins that ShouldRestore mirrors the canonical set.
            var canonicalAutoTickStates = new[]
            {
                PtwFileComparisonStates.DestDoesNotExist,
                PtwFileComparisonStates.SourceIsNewer,
                PtwFileComparisonStates.SourceIsHigherVersion,
            };
            var allNineStates = new[]
            {
                PtwFileComparisonStates.FilesAreSame,
                PtwFileComparisonStates.SourceDoesNotExist,
                PtwFileComparisonStates.SourceIsNewer,
                PtwFileComparisonStates.SourceIsOlder,
                PtwFileComparisonStates.DestDoesNotExist,
                PtwFileComparisonStates.FilesAreSameVersion,
                PtwFileComparisonStates.SourceIsHigherVersion,
                PtwFileComparisonStates.DestIsHigherVersion,
                PtwFileComparisonStates.Undetermined,
            };
            var input = allNineStates
                .Select(state =>
                    MakeFile(
                        fileName: $"file-{state}.txt",
                        state: state,
                        isNormallyRestored: canonicalAutoTickStates.Contains(state)
                    )
                )
                .ToList();

            var rows = new RestoreFilePlanService().Build(input);

            for (var i = 0; i < allNineStates.Length; i++)
            {
                var expected = canonicalAutoTickStates.Contains(allNineStates[i]);
                Assert.That(
                    rows[i].ShouldRestore,
                    Is.EqualTo(expected),
                    $"State {allNineStates[i]}: ShouldRestore should be {expected} per INV-A09 canonical auto-tick set"
                );
            }
        }

        // -----------------------------------------------------------------
        // Group C — TooltipKey per-state mapping (BHV-319)
        //
        // Per PT9 RestoreForm.cs:629-666 (DetermineRestoreEligibilityZip), each state maps
        // to a specific Localize key (or empty string for Undetermined). The 9th state
        // (SourceDoesNotExist) has no PT9 mapping — also empty string.
        // -----------------------------------------------------------------

        [TestCase(PtwFileComparisonStates.DestDoesNotExist, KEY_DEST_DOES_NOT_EXIST)]
        [TestCase(PtwFileComparisonStates.FilesAreSame, KEY_FILES_ARE_SAME)]
        [TestCase(PtwFileComparisonStates.FilesAreSameVersion, KEY_FILES_ARE_SAME_VERSION)]
        [TestCase(PtwFileComparisonStates.SourceIsHigherVersion, KEY_SOURCE_IS_HIGHER_VERSION)]
        [TestCase(PtwFileComparisonStates.DestIsHigherVersion, KEY_DEST_IS_HIGHER_VERSION)]
        [TestCase(PtwFileComparisonStates.SourceIsNewer, KEY_SOURCE_IS_NEWER)]
        [TestCase(PtwFileComparisonStates.SourceIsOlder, KEY_SOURCE_IS_OLDER)]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-319")]
        [Property("ScenarioId", "TS-081")]
        public void Build_TooltipKey_MatchesPt9SwitchMapping(
            PtwFileComparisonStates state,
            string expectedKey
        )
        {
            var input = new[] { MakeFile("file.txt", state, isNormallyRestored: false) };

            var rows = new RestoreFilePlanService().Build(input);

            Assert.That(
                rows[0].TooltipKey,
                Is.EqualTo(expectedKey),
                $"State {state} must map to '{expectedKey}' per PT9 RestoreForm.cs:629-660"
            );
        }

        [TestCase(
            PtwFileComparisonStates.Undetermined,
            TestName = "TooltipKey: Undetermined → empty (PT9 RestoreForm.cs:665)"
        )]
        [TestCase(
            PtwFileComparisonStates.SourceDoesNotExist,
            TestName = "TooltipKey: SourceDoesNotExist → empty (no PT9 case)"
        )]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-319")]
        [Property("ScenarioId", "TS-081")]
        public void Build_TooltipKey_IsEmptyString_ForStatesWithNoMapping(
            PtwFileComparisonStates state
        )
        {
            var input = new[] { MakeFile("file.txt", state, isNormallyRestored: false) };

            var rows = new RestoreFilePlanService().Build(input);

            Assert.That(
                rows[0].TooltipKey,
                Is.EqualTo(string.Empty),
                $"State {state} has no PT9 ToolTipInfo mapping — must emit empty string"
            );
        }

        // -----------------------------------------------------------------
        // Group D — OkToToggleOn flow (BHV-319, VAL-B07)
        // -----------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-319")]
        [Property("InvariantId", "VAL-B07")]
        [Property("ScenarioId", "TS-082")]
        public void OkToToggleOn_DestIsHigherVersion_UserDeclines_ReturnsFalse()
        {
            // VAL-B07 — DestIsHigherVersion toggle requires downgrade confirmation;
            // user declines (callback returns false) ⇒ OkToToggleOn returns false.
            // PT9: RestoreForm.cs:765-774; gm-010 (downgrade-decline).
            var file = MakeFile(
                "custom.sty",
                PtwFileComparisonStates.DestIsHigherVersion,
                isNormallyRestored: false
            );
            bool callbackInvoked = false;
            string? receivedKey = null;

            var result = new RestoreFilePlanService().OkToToggleOn(
                file,
                key =>
                {
                    callbackInvoked = true;
                    receivedKey = key;
                    return false; // user clicks No
                }
            );

            Assert.That(
                result,
                Is.False,
                "User declined the downgrade — OkToToggleOn must return false"
            );
            Assert.That(
                callbackInvoked,
                Is.True,
                "DestIsHigherVersion MUST invoke the downgrade-confirm callback"
            );
            Assert.That(
                receivedKey,
                Is.EqualTo(KEY_DOWNGRADE_PROMPT),
                "Callback must receive the localize key 'RestoreForm_33' (PT9 RestoreForm.cs:770)"
            );
        }

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-319")]
        [Property("InvariantId", "VAL-B07")]
        [Property("ScenarioId", "TS-083")]
        public void OkToToggleOn_DestIsHigherVersion_UserConfirms_ReturnsTrue()
        {
            // VAL-B07 — DestIsHigherVersion toggle + user confirms (callback returns true)
            // ⇒ OkToToggleOn returns true. PT9: RestoreForm.cs:765-774; gm-010.userAccepts.
            var file = MakeFile(
                "custom.sty",
                PtwFileComparisonStates.DestIsHigherVersion,
                isNormallyRestored: false
            );
            int callbackInvocations = 0;

            var result = new RestoreFilePlanService().OkToToggleOn(
                file,
                _ =>
                {
                    callbackInvocations++;
                    return true; // user clicks Yes
                }
            );

            Assert.That(
                result,
                Is.True,
                "User confirmed the downgrade — OkToToggleOn must return true"
            );
            Assert.That(
                callbackInvocations,
                Is.EqualTo(1),
                "Callback must be invoked EXACTLY ONCE for a DestIsHigherVersion toggle (no double-prompt)"
            );
        }

        // For all 8 non-DestIsHigherVersion states, OkToToggleOn returns true without invoking
        // the callback. PT9 RestoreForm.cs:767-768: `if (sdfi.ComparisonResult != DestIsHigherVersion)
        //   return true;` — the prompt is gated entirely on that one state.
        [TestCase(PtwFileComparisonStates.FilesAreSame)]
        [TestCase(PtwFileComparisonStates.SourceDoesNotExist)]
        [TestCase(PtwFileComparisonStates.SourceIsNewer)]
        [TestCase(PtwFileComparisonStates.SourceIsOlder)]
        [TestCase(PtwFileComparisonStates.DestDoesNotExist)]
        [TestCase(PtwFileComparisonStates.FilesAreSameVersion)]
        [TestCase(PtwFileComparisonStates.SourceIsHigherVersion)]
        [TestCase(PtwFileComparisonStates.Undetermined)]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-319")]
        [Property("InvariantId", "VAL-B07")]
        [Property("ScenarioId", "TS-084")]
        public void OkToToggleOn_NonDowngradeStates_ReturnsTrueWithoutInvokingCallback(
            PtwFileComparisonStates state
        )
        {
            var file = MakeFile("file.txt", state, isNormallyRestored: false);
            bool callbackInvoked = false;

            var result = new RestoreFilePlanService().OkToToggleOn(
                file,
                _ =>
                {
                    callbackInvoked = true;
                    return false; // would decline if asked — but must NOT be asked
                }
            );

            Assert.That(
                result,
                Is.True,
                $"State {state} is NOT a downgrade — OkToToggleOn must return true unconditionally"
            );
            Assert.That(
                callbackInvoked,
                Is.False,
                $"State {state} is NOT a downgrade — callback must NOT be invoked (PT9 RestoreForm.cs:767-768)"
            );
        }

        // -----------------------------------------------------------------
        // Group E — Build shape invariants (one row per input file, order preserved,
        //           FileName carried through from SourceFile.FileName)
        // -----------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-318")]
        [Property("ScenarioId", "TS-073")]
        public void Build_EmitsOneRowPerInputFile_InInputOrder()
        {
            var input = new[]
            {
                MakeFile(
                    "aaa.sfm",
                    PtwFileComparisonStates.DestDoesNotExist,
                    isNormallyRestored: true
                ),
                MakeFile(
                    "bbb.sfm",
                    PtwFileComparisonStates.FilesAreSame,
                    isNormallyRestored: false
                ),
                MakeFile(
                    "ccc.sty",
                    PtwFileComparisonStates.SourceIsNewer,
                    isNormallyRestored: true
                ),
                MakeFile(
                    "ddd.sty",
                    PtwFileComparisonStates.Undetermined,
                    isNormallyRestored: false
                ),
            };

            var rows = new RestoreFilePlanService().Build(input);

            Assert.That(rows, Has.Count.EqualTo(4), "One row per input file");
            Assert.That(
                rows.Select(r => r.FileName),
                Is.EqualTo(new[] { "aaa.sfm", "bbb.sfm", "ccc.sty", "ddd.sty" }),
                "Row order must match input order — caller owns sort (PT9 RestoreForm.ShowFileList sorts first)"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-318")]
        [Property("ScenarioId", "TS-073")]
        public void Build_FileName_IsCarriedThroughFrom_SourceFile_FileName()
        {
            // The row.FileName field is the column-1 display key — must be the source ZIP entry's
            // filename verbatim. PT9 parity: RestoreForm.ShowFileList uses SourceFile.FileTitle
            // for display, but the wire contract here uses FileName as the stable key (see
            // data-contracts.md §3.4 line 596-598 — display name comes via a separate field).
            var input = new[]
            {
                MakeFile(
                    "01GENMyProj.SFM",
                    PtwFileComparisonStates.SourceIsNewer,
                    isNormallyRestored: true
                ),
            };

            var rows = new RestoreFilePlanService().Build(input);

            Assert.That(rows[0].FileName, Is.EqualTo("01GENMyProj.SFM"));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-318")]
        [Property("ScenarioId", "TS-073")]
        public void Build_State_IsCarriedThroughFromInputComparisonResult()
        {
            var input = new[]
            {
                MakeFile(
                    "a.sfm",
                    PtwFileComparisonStates.SourceIsHigherVersion,
                    isNormallyRestored: true
                ),
                MakeFile(
                    "b.sfm",
                    PtwFileComparisonStates.FilesAreSameVersion,
                    isNormallyRestored: false
                ),
            };

            var rows = new RestoreFilePlanService().Build(input);

            Assert.That(rows[0].State, Is.EqualTo(PtwFileComparisonStates.SourceIsHigherVersion));
            Assert.That(rows[1].State, Is.EqualTo(PtwFileComparisonStates.FilesAreSameVersion));
        }

        // -----------------------------------------------------------------
        // Group F — Edge cases
        // -----------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-318")]
        [Property("ScenarioId", "TS-073")]
        public void Build_EmptyInput_ReturnsEmptyList()
        {
            var input = Array.Empty<RestoreFileInfo>();

            var rows = new RestoreFilePlanService().Build(input);

            Assert.That(rows, Is.Not.Null);
            Assert.That(rows, Is.Empty);
        }

        // -----------------------------------------------------------------
        // Group G — BHV-322 / REVIEW-FLAG-7 — Hide Same Files filter data exposure
        //
        // The service does NOT apply the filter (that's a UI concern). It DOES ensure the
        // raw CRC values on the row's underlying SourceFile / DestinationFile are accessible
        // to the UI. This test pins the data-shape part of the contract: a row built from
        // RestoreFileInfo with explicit CRCs preserves access to those CRCs through the row's
        // identity (which the UI uses to look up the underlying file).
        //
        // Implementation note: the public RestoreFilePlanRow record does NOT directly expose
        // CRC — the UI applies the filter via a side-channel (the data-provider holds the
        // RestoreFileInfo[] and exposes raw CRC per row through the wire-side RestoreFileEntry
        // at data-contracts.md §3.4 line 613). This test pins that the service-internal
        // RestoreFileInfo objects are NOT corrupted: their CRC values are still readable
        // after Build (i.e., the service does not unset or overwrite them).
        // -----------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-017")]
        [Property("ExtractionId", "EXT-200")]
        [Property("BehaviorId", "BHV-322")]
        [Property("ScenarioId", "TS-088")]
        public void Build_DoesNotMutate_InputFile_CRCValues()
        {
            // BHV-322 / REVIEW-FLAG-7: the Hide Same Files filter uses raw CRC equality.
            // The data-provider exposes these via the wire-side RestoreFileEntry; the
            // service must not clobber them while computing the plan.
            var file = new RestoreFileInfo
            {
                SourceFile = new RestoreZipMember { FileName = "f.sfm", CRC = 0xABCDEF01u },
                DestinationFile = new RestoreZipMember { FileName = "f.sfm", CRC = 0xABCDEF01u },
                ComparisonResult = PtwFileComparisonStates.Undetermined, // CRC-equal but Undetermined per mtime
                IsNormallyRestored = false,
            };

            _ = new RestoreFilePlanService().Build(new[] { file });

            Assert.That(
                file.SourceFile!.CRC,
                Is.EqualTo(0xABCDEF01u),
                "Source CRC must survive Build (BHV-322 / REVIEW-FLAG-7 — filter reads raw CRC)"
            );
            Assert.That(
                file.DestinationFile!.CRC,
                Is.EqualTo(0xABCDEF01u),
                "Destination CRC must survive Build (BHV-322 / REVIEW-FLAG-7 — filter reads raw CRC)"
            );
        }

        // -----------------------------------------------------------------
        // Helper — construct a RestoreFileInfo with a filename + comparison state + auto-tick.
        // -----------------------------------------------------------------

        private static RestoreFileInfo MakeFile(
            string fileName,
            PtwFileComparisonStates state,
            bool isNormallyRestored
        )
        {
            return new RestoreFileInfo
            {
                SourceFile = new RestoreZipMember { FileName = fileName },
                DestinationFile =
                    state == PtwFileComparisonStates.DestDoesNotExist
                        ? null
                        : new RestoreZipMember { FileName = fileName },
                ComparisonResult = state,
                IsNormallyRestored = isNormallyRestored,
            };
        }
    }
}
