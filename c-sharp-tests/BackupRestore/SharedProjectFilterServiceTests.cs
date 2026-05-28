using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using Paranext.DataProvider.BackupRestore;

namespace TestParanextDataProvider.BackupRestore
{
    /// <summary>
    /// Tests for <see cref="SharedProjectFilterService.Filter"/>
    /// (CAP-018 / EXT-201 / BHV-323 / INV-B06).
    ///
    /// Pure-function-with-callback service:
    /// <c>(fileList, userConfirmsContinue) -> SharedProjectFilterResult(HasSharedFiles, FilteredList)</c>.
    /// Detection set = 2 filenames; removal set = 3 filenames (asymmetric per EXT-201).
    ///
    /// Specification sources:
    /// <list type="bullet">
    ///   <item>data-contracts.md §9 line 2266 (file table — SharedProjectFilterService.cs)</item>
    ///   <item>implementation/backend-alignment.md §EXT-201 (line 238-249) — full signature + asymmetry note</item>
    ///   <item>implementation/extraction-plan.md §EXT-201 (line 349-376) — extraction stub</item>
    ///   <item>characterization/test-scenarios.json TS-090 (No path), TS-091 (Yes path — all 3 removed)</item>
    ///   <item>behavior-catalog.md §BHV-323 (line 480-485) — Shared-project warning + exclusion rule</item>
    ///   <item>business-rules.md INV-B06 (line 59) — "shared project backup never installs permission files"</item>
    ///   <item>strategic-plan-backend.md §CAP-018 (line 458-475) — acceptance test + edge cases</item>
    /// </list>
    ///
    /// PT9 source: <c>Paratext/BackupRestore/RestoreForm.cs:365-390</c>
    /// (<c>WarnUserAboutUsingRestoreWithSharedProjects</c>) — see the
    /// <c>// === PORTED FROM PT9 ===</c> block in <c>SharedProjectFilterService.cs</c>
    /// for the full pasted source. Filename constants come from
    /// <c>ParatextData/Users/ProjectPermissionManager.cs:17-19</c>:
    /// <code>
    /// public const string fileName                       = "ProjectUserAccess.xml";
    /// public const string legacyProjectUsersFileName     = "ProjectUsers.xml";
    /// public const string legacyProjectUserFieldsFileName = "ProjectUserFields.xml";
    /// </code>
    ///
    /// PT10 deltas vs PT9:
    /// <list type="bullet">
    ///   <item><b>Alert.Show hoisted out</b>: PT9 mixed model + dialog in one method. PT10 receives
    ///   a <c>Func&lt;bool&gt;</c> callback so the wire-side caller owns the dialog. The callback
    ///   contract: <c>true</c> = Yes/Continue, <c>false</c> = No/Cancel.</item>
    ///   <item><b>Result hoisted into record</b>: PT9 mutated <c>RestoreForm.fileList</c> + set
    ///   <c>DialogResult.Cancel</c> directly. PT10 returns a <see cref="SharedProjectFilterResult"/>.
    ///   Input-list mutation parity is preserved (PT9's <c>RemoveAll</c> mutates; PT10 follows the
    ///   same model — see <see cref="Filter_WithSharedFilesAndUserConfirms_AlsoMutatesInputList"/>).
    ///   </item>
    ///   <item><b>PT10 owns its own <c>RestoreFileInfo</c></b>: ParatextData.dll does NOT export PT9's
    ///   <c>RestoreFileInfo</c> (it lives in the PT9 WinForms project). PT10's minimum-surface
    ///   port exposes <c>SourceFile.FileName</c> only — see <c>c-sharp/BackupRestore/RestoreFileInfo.cs</c>.</item>
    /// </list>
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class SharedProjectFilterServiceTests
    {
        // Filename constants — match ParatextData.Users.ProjectPermissionManager constants at
        // ParatextData/Users/ProjectPermissionManager.cs:17-19. Repeated here as literals (not as
        // references to ProjectPermissionManager.fileName etc.) for two reasons:
        //   1. RED-state isolation — the tests do not depend on any ParatextData symbol that the
        //      Implementer might or might not import; they assert on the actual STRING values that
        //      the contract requires.
        //   2. Documentation — the strings make the asymmetry self-evident: the detection set is
        //      explicitly enumerated separately from the removal set.
        private const string PROJECT_USER_ACCESS_XML = "ProjectUserAccess.xml";
        private const string PROJECT_USERS_XML = "ProjectUsers.xml";
        private const string PROJECT_USER_FIELDS_XML = "ProjectUserFields.xml";

        // -------------------------------------------------------------------
        // Edge case (strategic-plan §CAP-018 edge-case bullet): empty fileList.
        // No markers possible ⇒ HasSharedFiles=false; FilteredList empty.
        // Callback MUST NOT be invoked.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ExtractionId", "EXT-201")]
        [Property("BehaviorId", "BHV-323")]
        [Property("InvariantId", "INV-B06")]
        [Property("ScenarioId", "TS-090")]
        public void Filter_WithEmptyList_ReturnsHasSharedFilesFalseAndEmptyList()
        {
            // Arrange
            var emptyList = new List<RestoreFileInfo>();
            bool callbackInvoked = false;

            // Act
            var result = SharedProjectFilterService.Filter(
                emptyList,
                () =>
                {
                    callbackInvoked = true;
                    return true;
                }
            );

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.HasSharedFiles, Is.False, "empty list has no detection-set markers");
            Assert.That(result.FilteredList, Is.Empty, "filtered list is empty");
            Assert.That(
                callbackInvoked,
                Is.False,
                "callback must NOT be invoked when there are no markers"
            );
        }

        // -------------------------------------------------------------------
        // Canonical "no shared files" case — a normal backup with regular project files,
        // none of which match the detection set.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ExtractionId", "EXT-201")]
        [Property("BehaviorId", "BHV-323")]
        [Property("InvariantId", "INV-B06")]
        [Property("ScenarioId", "TS-090")]
        public void Filter_WithNoSharedFiles_ReturnsHasSharedFilesFalseAndUnchangedList()
        {
            // Arrange — three normal project files; none match detection set
            var fileList = new List<RestoreFileInfo>
            {
                MakeFile("Settings.xml"),
                MakeFile("01GENMyProj.SFM"),
                MakeFile("02EXOMyProj.SFM"),
            };

            // Act
            var result = SharedProjectFilterService.Filter(fileList, () => true);

            // Assert
            Assert.That(result.HasSharedFiles, Is.False);
            Assert.That(result.FilteredList, Has.Count.EqualTo(3));
            Assert.That(
                result.FilteredList.Select(f => f.SourceFile!.FileName),
                Is.EquivalentTo(new[] { "Settings.xml", "01GENMyProj.SFM", "02EXOMyProj.SFM" })
            );
        }

        // -------------------------------------------------------------------
        // TS-091 — Yes path: all 3 permission files removed.
        //
        // Input: backup contains ALL 3 of ProjectUserAccess.xml, ProjectUsers.xml,
        //   ProjectUserFields.xml (plus some unrelated files). User clicks Yes.
        // Expected: HasSharedFiles=true; all 3 permission files removed; unrelated files preserved.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ExtractionId", "EXT-201")]
        [Property("BehaviorId", "BHV-323")]
        [Property("InvariantId", "INV-B06")]
        [Property("ScenarioId", "TS-091")]
        public void Filter_WithSharedFilesAndUserConfirms_RemovesAllThreePermissionFiles()
        {
            // Arrange
            var fileList = new List<RestoreFileInfo>
            {
                MakeFile("Settings.xml"),
                MakeFile(PROJECT_USER_ACCESS_XML),
                MakeFile("01GENMyProj.SFM"),
                MakeFile(PROJECT_USERS_XML),
                MakeFile(PROJECT_USER_FIELDS_XML),
            };

            // Act
            var result = SharedProjectFilterService.Filter(fileList, () => true);

            // Assert
            Assert.That(result.HasSharedFiles, Is.True, "detection set matched 2 of 3");
            var remainingNames = result.FilteredList.Select(f => f.SourceFile!.FileName).ToList();
            Assert.That(
                remainingNames,
                Is.EquivalentTo(new[] { "Settings.xml", "01GENMyProj.SFM" }),
                "all 3 permission files (removal set) stripped; unrelated files preserved"
            );

            // Cross-checks — explicitly assert none of the 3 removal-set names survives.
            Assert.That(remainingNames, Does.Not.Contain(PROJECT_USER_ACCESS_XML));
            Assert.That(remainingNames, Does.Not.Contain(PROJECT_USERS_XML));
            Assert.That(remainingNames, Does.Not.Contain(PROJECT_USER_FIELDS_XML));
        }

        // -------------------------------------------------------------------
        // TS-090 (backend slice) — No path: HasSharedFiles=true, list unchanged.
        //
        // Strategic-plan §CAP-018 acceptance: "Filter(fileList, () => false) returns
        //   HasSharedFiles=true and an unchanged list (caller responsible for aborting)."
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ExtractionId", "EXT-201")]
        [Property("BehaviorId", "BHV-323")]
        [Property("InvariantId", "INV-B06")]
        [Property("ScenarioId", "TS-090")]
        public void Filter_WithSharedFilesAndUserDeclines_ReturnsHasSharedFilesTrueAndKeepsAll()
        {
            // Arrange
            var fileList = new List<RestoreFileInfo>
            {
                MakeFile("Settings.xml"),
                MakeFile(PROJECT_USER_ACCESS_XML),
                MakeFile(PROJECT_USERS_XML),
                MakeFile(PROJECT_USER_FIELDS_XML),
            };

            // Act
            var result = SharedProjectFilterService.Filter(fileList, () => false);

            // Assert
            Assert.That(result.HasSharedFiles, Is.True);
            Assert.That(result.FilteredList, Has.Count.EqualTo(4), "No path leaves list intact");
            Assert.That(
                result.FilteredList.Select(f => f.SourceFile!.FileName),
                Is.EquivalentTo(
                    new[]
                    {
                        "Settings.xml",
                        PROJECT_USER_ACCESS_XML,
                        PROJECT_USERS_XML,
                        PROJECT_USER_FIELDS_XML,
                    }
                ),
                "caller is responsible for aborting — the list is returned unchanged so a later "
                    + "code path can still inspect it"
            );
        }

        // -------------------------------------------------------------------
        // Asymmetry pin: the detection set has EXACTLY TWO filenames. A backup containing
        // ONLY ProjectUserAccess.xml triggers detection, AND a backup containing ONLY
        // ProjectUsers.xml also triggers detection — proving the detection set has both
        // names, not just one. Likewise, a backup with ONLY ProjectUserFields.xml does NOT
        // trigger detection (covered by the dedicated edge-case test below).
        // -------------------------------------------------------------------

        [TestCase(
            PROJECT_USER_ACCESS_XML,
            TestName = "Detection: ProjectUserAccess.xml alone triggers"
        )]
        [TestCase(PROJECT_USERS_XML, TestName = "Detection: ProjectUsers.xml alone triggers")]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ExtractionId", "EXT-201")]
        [Property("BehaviorId", "BHV-323")]
        [Property("InvariantId", "INV-B06")]
        [Property("ScenarioId", "TS-090")]
        public void Filter_DetectionSetHasTwoFilenames_OnlyTheseTwoTriggerWarning(
            string detectionFilename
        )
        {
            // Arrange — list contains the one detection-set file + an unrelated file
            var fileList = new List<RestoreFileInfo>
            {
                MakeFile("Settings.xml"),
                MakeFile(detectionFilename),
            };
            int callbackInvocations = 0;

            // Act
            var result = SharedProjectFilterService.Filter(
                fileList,
                () =>
                {
                    callbackInvocations++;
                    return true;
                }
            );

            // Assert
            Assert.That(result.HasSharedFiles, Is.True, $"{detectionFilename} is in detection set");
            Assert.That(callbackInvocations, Is.EqualTo(1), "callback invoked exactly once");
        }

        // -------------------------------------------------------------------
        // Strategic-plan §CAP-018 edge case (line 471): "only legacyProjectUserFieldsFileName
        // (removal-only, not detection) → HasSharedFiles=false".
        //
        // The strategic plan's flavour text says "but file still removed if present in the
        // input (per PT9 parity)" — but the PT9 source code (RestoreForm.cs:367-388) gates
        // the entire RemoveAll branch on the detection-set Any(...). So without a positive
        // detection, the file is NOT removed. PT9 source wins; this test pins that exact
        // semantics. See test-writer-CAP-018.md §Resolved Ambiguities §2 for the rationale.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ExtractionId", "EXT-201")]
        [Property("BehaviorId", "BHV-323")]
        [Property("InvariantId", "INV-B06")]
        [Property("ScenarioId", "TS-090")]
        public void Filter_WithOnlyLegacyUserFieldsFileNoOther_DoesNotTriggerWarning()
        {
            // Arrange — removal-only file, with no detection-set siblings
            var fileList = new List<RestoreFileInfo>
            {
                MakeFile("Settings.xml"),
                MakeFile(PROJECT_USER_FIELDS_XML),
            };
            bool callbackInvoked = false;

            // Act
            var result = SharedProjectFilterService.Filter(
                fileList,
                () =>
                {
                    callbackInvoked = true;
                    return true;
                }
            );

            // Assert
            Assert.That(
                result.HasSharedFiles,
                Is.False,
                "ProjectUserFields.xml is in removal set but NOT in detection set — "
                    + "detection gates removal per PT9 parity"
            );
            Assert.That(callbackInvoked, Is.False, "callback must NOT be invoked");
            Assert.That(
                result.FilteredList.Select(f => f.SourceFile!.FileName),
                Is.EquivalentTo(new[] { "Settings.xml", PROJECT_USER_FIELDS_XML }),
                "without a detection hit, no removal pass runs — ProjectUserFields.xml stays"
            );
        }

        // -------------------------------------------------------------------
        // PT9 parity: filename comparisons use StringComparison.OrdinalIgnoreCase. A backup
        // produced on Windows whose ZIP central directory casing differs from canonical
        // (e.g. "ProjectUserAccess.XML" with uppercase suffix, or "PROJECTUSERS.XML" all
        // caps) must still trigger detection AND removal.
        // -------------------------------------------------------------------

        [TestCase("PROJECTUSERACCESS.XML")]
        [TestCase("projectuseraccess.xml")]
        [TestCase("ProjectUserAccess.XML")]
        [TestCase("PROJECTUSERS.XML")]
        [TestCase("projectusers.xml")]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ExtractionId", "EXT-201")]
        [Property("BehaviorId", "BHV-323")]
        [Property("InvariantId", "INV-B06")]
        [Property("ScenarioId", "TS-090")]
        public void Filter_FilenameComparisonIsCaseInsensitive(string variantCasing)
        {
            // Arrange
            var fileList = new List<RestoreFileInfo> { MakeFile(variantCasing) };

            // Act
            var result = SharedProjectFilterService.Filter(fileList, () => true);

            // Assert
            Assert.That(
                result.HasSharedFiles,
                Is.True,
                $"'{variantCasing}' must match detection set case-insensitively (PT9 parity)"
            );
            Assert.That(
                result.FilteredList,
                Is.Empty,
                $"'{variantCasing}' must also be removed (removal pass case-insensitive)"
            );
        }

        // -------------------------------------------------------------------
        // PT9 parity: RemoveAll preserves relative order of surviving elements. PT10's
        // contract isn't explicit on ordering but PT9 uses List.RemoveAll which is
        // stable. Locking this so the implementer can't accidentally reshuffle.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ExtractionId", "EXT-201")]
        [Property("BehaviorId", "BHV-323")]
        [Property("InvariantId", "INV-B06")]
        [Property("ScenarioId", "TS-091")]
        public void Filter_PreservesNonPermissionFilesOrderAfterRemoval()
        {
            // Arrange — interleaved permission and non-permission files
            var fileList = new List<RestoreFileInfo>
            {
                MakeFile("A.xml"),
                MakeFile(PROJECT_USER_ACCESS_XML),
                MakeFile("B.xml"),
                MakeFile(PROJECT_USERS_XML),
                MakeFile("C.xml"),
                MakeFile(PROJECT_USER_FIELDS_XML),
                MakeFile("D.xml"),
            };

            // Act
            var result = SharedProjectFilterService.Filter(fileList, () => true);

            // Assert — surviving files in the original relative order
            Assert.That(
                result.FilteredList.Select(f => f.SourceFile!.FileName),
                Is.EqualTo(new[] { "A.xml", "B.xml", "C.xml", "D.xml" }),
                "removal must preserve relative order of survivors (PT9 List.RemoveAll parity)"
            );
        }

        // -------------------------------------------------------------------
        // INV-B06 lock — explicit assertion that ZERO of the 3 permission filenames
        // appears in the FilteredList after a Yes confirmation, regardless of how
        // the input was assembled. This is the invariant test (separate from the
        // canonical TS-091 contract test) — it explicitly enumerates the forbidden
        // set so a future regression that removed only 2 of 3 (or removed the wrong
        // names) would fail this test independently.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ExtractionId", "EXT-201")]
        [Property("BehaviorId", "BHV-323")]
        [Property("InvariantId", "INV-B06")]
        [Property("ScenarioId", "TS-091")]
        public void Filter_INV_B06_AfterYesConfirmation_NoneOfTheThreePermissionFilesRemain()
        {
            // Arrange — input with ALL 3 permission files PLUS at least one non-permission file
            var fileList = new List<RestoreFileInfo>
            {
                MakeFile(PROJECT_USER_ACCESS_XML),
                MakeFile(PROJECT_USERS_XML),
                MakeFile(PROJECT_USER_FIELDS_XML),
                MakeFile("Settings.xml"),
            };

            // Act
            var result = SharedProjectFilterService.Filter(fileList, () => true);

            // Assert — INV-B06 enforcement at this layer: no permission file may appear
            // in the FilteredList. Each filename is asserted independently so a partial
            // regression (e.g. only 2 of 3 removed) is diagnosed precisely.
            var remainingNames = result.FilteredList.Select(f => f.SourceFile!.FileName).ToList();
            Assert.That(
                remainingNames,
                Does.Not.Contain(PROJECT_USER_ACCESS_XML),
                "INV-B06: ProjectUserAccess.xml must NOT be in FilteredList"
            );
            Assert.That(
                remainingNames,
                Does.Not.Contain(PROJECT_USERS_XML),
                "INV-B06: ProjectUsers.xml must NOT be in FilteredList"
            );
            Assert.That(
                remainingNames,
                Does.Not.Contain(PROJECT_USER_FIELDS_XML),
                "INV-B06: ProjectUserFields.xml must NOT be in FilteredList"
            );
        }

        // -------------------------------------------------------------------
        // Callback discipline — callback MUST NOT be invoked when no markers are detected.
        // PT9 parity: the entire Alert.Show + RemoveAll branch is inside an `if (fileList.Any(...))`
        // gate. PT10 contract preserves this so the wire layer doesn't show a spurious dialog.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ExtractionId", "EXT-201")]
        [Property("BehaviorId", "BHV-323")]
        [Property("InvariantId", "INV-B06")]
        [Property("ScenarioId", "TS-090")]
        public void Filter_DoesNotInvokeCallback_WhenNoSharedMarkersDetected()
        {
            // Arrange — no permission files at all
            var fileList = new List<RestoreFileInfo>
            {
                MakeFile("Settings.xml"),
                MakeFile("BookNames.xml"),
            };
            int callbackInvocations = 0;

            // Act
            var result = SharedProjectFilterService.Filter(
                fileList,
                () =>
                {
                    callbackInvocations++;
                    return true;
                }
            );

            // Assert
            Assert.That(result.HasSharedFiles, Is.False);
            Assert.That(
                callbackInvocations,
                Is.EqualTo(0),
                "callback must NOT be invoked when no markers are detected"
            );
        }

        // -------------------------------------------------------------------
        // Callback discipline — exactly ONCE when markers are detected. PT9 calls
        // Alert.Show exactly once. PT10 mustn't double-prompt (e.g. once per detection
        // hit) or skip the prompt entirely.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ExtractionId", "EXT-201")]
        [Property("BehaviorId", "BHV-323")]
        [Property("InvariantId", "INV-B06")]
        [Property("ScenarioId", "TS-090")]
        public void Filter_InvokesCallbackExactlyOnce_WhenMarkersDetected()
        {
            // Arrange — list with BOTH detection-set files (so a naive impl might prompt twice)
            var fileList = new List<RestoreFileInfo>
            {
                MakeFile(PROJECT_USER_ACCESS_XML),
                MakeFile(PROJECT_USERS_XML),
            };
            int callbackInvocations = 0;

            // Act
            SharedProjectFilterService.Filter(
                fileList,
                () =>
                {
                    callbackInvocations++;
                    return true;
                }
            );

            // Assert
            Assert.That(
                callbackInvocations,
                Is.EqualTo(1),
                "callback must be invoked exactly once even when MULTIPLE detection-set files "
                    + "are present (PT9 calls Alert.Show once at RestoreForm.cs:377)"
            );
        }

        // -------------------------------------------------------------------
        // PT9 mutation parity — RestoreForm.fileList is mutated by RemoveAll. The PT10
        // contract returns a new SharedProjectFilterResult but the underlying IList<>
        // input is mutated. This test pins the parity. If a future change wants
        // non-mutating semantics (return a fresh List, leave input alone), this test
        // must be revisited deliberately — that's the discipline this red-test enforces.
        //
        // Note: assertion uses the input variable directly, not via FilteredList.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-018")]
        [Property("ExtractionId", "EXT-201")]
        [Property("BehaviorId", "BHV-323")]
        [Property("InvariantId", "INV-B06")]
        [Property("ScenarioId", "TS-091")]
        public void Filter_WithSharedFilesAndUserConfirms_AlsoMutatesInputList()
        {
            // Arrange — keep a direct reference to the original list
            var inputList = new List<RestoreFileInfo>
            {
                MakeFile(PROJECT_USER_ACCESS_XML),
                MakeFile("Settings.xml"),
                MakeFile(PROJECT_USERS_XML),
                MakeFile(PROJECT_USER_FIELDS_XML),
            };

            // Act
            SharedProjectFilterService.Filter(inputList, () => true);

            // Assert — INPUT list (not just the returned FilteredList) reflects removal
            Assert.That(
                inputList.Select(f => f.SourceFile!.FileName),
                Is.EquivalentTo(new[] { "Settings.xml" }),
                "PT9 parity: List.RemoveAll mutates the input list directly"
            );
        }

        // -------------------------------------------------------------------
        // Helper — construct a RestoreFileInfo with just a filename. The minimum
        // surface CAP-018 reads is SourceFile.FileName.
        // -------------------------------------------------------------------

        private static RestoreFileInfo MakeFile(string fileName)
        {
            return new RestoreFileInfo
            {
                SourceFile = new RestoreZipMember { FileName = fileName },
            };
        }
    }
}
