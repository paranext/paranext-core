using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Reflection;
using Paranext.DataProvider.BackupRestore;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.BackupRestore
{
    /// <summary>
    /// Tests for <see cref="CompareToBackupBridgeService.BuildCompareConfig"/>
    /// (CAP-020 / EXT-204 / BHV-320 / BHV-500 / BHV-501 / BHV-502 / INV-C01 / INV-C02).
    ///
    /// CAP-020 is the FN-001 cross-feature surface bridge that PT9's
    /// <c>RestoreForm.CompareFiles</c> (<c>RestoreForm.cs:680-694</c>) feeds into via
    /// <c>DiffToolConfigurationInfo.ForGetPutTexts</c>. PT10 returns a thin
    /// <see cref="FileCompareConfig"/> record the React DifferencesToolView component
    /// consumes.
    ///
    /// Specification sources:
    /// <list type="bullet">
    ///   <item>data-contracts.md §3.8 line 822-842 (FileCompareConfig / DiffToolDisplayOptions /
    ///   CompareBackupFileErrorCode)</item>
    ///   <item>data-contracts.md §4.4 line 1260-1300 (M-004 compareBackupFile method)</item>
    ///   <item>data-contracts.md §9 line 2268 (file table — CompareToBackupBridgeService.cs)</item>
    ///   <item>implementation/extraction-plan.md §EXT-204 line 432-488 (extraction stub + PT9
    ///   source for both CompareFiles consumer and ForGetPutTexts factory)</item>
    ///   <item>characterization/test-scenarios.json — TS-085, TS-086, TS-087, TS-097, TS-098</item>
    ///   <item>behavior-catalog.md §BHV-320 line 459-465 (right-click "View differences" entry
    ///   point), §BHV-500 line 524-540 (FN-001 canonical factory; 5 callers all pass null
    ///   IPutText), §BHV-501 line 542-547 (single-anchor quirk; PT10 should NOT replicate),
    ///   §BHV-502 line 549-555 (DiffToolDisplayOptions flag enum)</item>
    ///   <item>business-rules.md line 68-69 (INV-C01 read-only diff; INV-C02 single-anchor quirk)</item>
    ///   <item>strategic-plan-backend.md §CAP-020 line 496-513 (acceptance + token-format spec)</item>
    ///   <item>golden-masters/gm-031-fn001-comparefiles-bridge/ — captured against PT9
    ///   ForGetPutTexts factory (the gm-031 fixture in
    ///   <c>BackupRestoreGoldenMasterTests.cs</c> validates the mapping)</item>
    /// </list>
    ///
    /// PT9 source (entry point — RestoreForm.cs:680-694, RestoreForm.CompareFiles):
    /// <code>
    /// public void CompareFiles(RestoreFileInfo sdfi)
    /// {
    ///     VerseRef vref = new VerseRef(sdfi.SourceFile.BookNum, 1, 0,
    ///         restorer.SourceSettings.Versification);
    ///     using (DifferencesToolForm form = new DifferencesToolForm(false))
    ///     {
    ///         DiffToolConfigurationInfo configuration = DiffToolConfigurationInfo.ForGetPutTexts(
    ///             restorer.ScrTextDestination,
    ///             Localizer.Str("RestoreForm_25", "File from Zip"),
    ///             sdfi.SourceFile, null,                  // null IPutText (INV-C01)
    ///             Localizer.Str("RestoreForm_26", "File in Project"),
    ///             sdfi.DestinationFile, null,             // null IPutText (INV-C01)
    ///             vref,
    ///             DiffToolDisplayOptions.ShowToolbar);
    ///         form.Setup(configuration);
    ///         form.ShowDialog();
    ///     }
    /// }
    /// </code>
    ///
    /// PT10 deltas vs PT9 — see <c>// === PORTED FROM PT9 ===</c> blocks in
    /// <see cref="CompareToBackupBridgeService"/> and <see cref="FileCompareConfig"/> source.
    /// The key shape change: PT9 returns a heavyweight <c>DiffToolConfigurationInfo</c> with
    /// IGetText / IPutText / ScrText baked in; PT10 returns a thin <see cref="FileCompareConfig"/>
    /// with opaque session-scoped source tokens for content fetching via M-011 later. The
    /// invariants INV-C01 / INV-C02 are STRUCTURALLY enforced by FileCompareConfig's field
    /// shape (no putter / no ScrText fields) rather than runtime field-value assertions.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class CompareToBackupBridgeServiceTests
    {
        // Localize-key constants per data-contracts.md §3.8 line 793-796.
        // PT9 source: Localizer.Str("RestoreForm_25", "File from Zip") / RestoreForm_26.
        private const string LEFT_LABEL_KEY = "%restoreForm_fileFromZip%";
        private const string RIGHT_LABEL_KEY = "%restoreForm_fileInProject%";

        // -------------------------------------------------------------------
        // TS-085 happy path — Right-click "View differences" on non-DestDoesNotExist /
        // canViewDifferences row → service builds the FileCompareConfig with all 7 fields
        // populated to spec.
        //
        // Strategic-plan §CAP-020 line 502 (acceptance test):
        //   "BuildCompareConfig(selectedRow, destination, sourceVersification, sessionId)
        //   returns a `FileCompareConfig` whose
        //     leftLabelKey='%restoreForm_fileFromZip%',
        //     rightLabelKey='%restoreForm_fileInProject%',
        //     leftSourceToken='tok-src-{sessionId}-{fileId}',
        //     rightSourceToken='tok-dst-{sessionId}-{fileId}',
        //     initialBookId derived from the row's book scope."
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-020")]
        [Property("ExtractionId", "EXT-204")]
        [Property("BehaviorId", "BHV-320")]
        [Property("ScenarioId", "TS-085")]
        public void BuildCompareConfig_ForCanViewDiffRow_PopulatesAllFields()
        {
            // Arrange — a "SourceIsNewer" row with GEN as the source book (PT9 parity from gm-031).
            string sessionId = "session-abc-123";
            string fileName = "01GENGmCmpProj.SFM";
            var selectedRow = new RestoreFileInfo
            {
                SourceFile = new RestoreZipMember { FileName = fileName, BookNum = 1 },
                DestinationFile = new RestoreZipMember { FileName = fileName, BookNum = 1 },
                ComparisonResult = PtwFileComparisonStates.SourceIsNewer,
                IsNormallyRestored = true,
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

            // Assert — all 7 contract-defined fields populated per strategic-plan §CAP-020 line 502
            Assert.That(
                config.LeftLabelKey,
                Is.EqualTo(LEFT_LABEL_KEY),
                "LeftLabelKey must be the localize key for PT9 RestoreForm_25"
            );
            Assert.That(
                config.RightLabelKey,
                Is.EqualTo(RIGHT_LABEL_KEY),
                "RightLabelKey must be the localize key for PT9 RestoreForm_26"
            );
            Assert.That(
                config.LeftSourceToken,
                Is.EqualTo($"tok-src-{sessionId}-{fileName}"),
                "LeftSourceToken must follow the tok-src-{sessionId}-{fileId} format per "
                    + "strategic-plan §CAP-020 line 502"
            );
            Assert.That(
                config.RightSourceToken,
                Is.EqualTo($"tok-dst-{sessionId}-{fileName}"),
                "RightSourceToken must follow the tok-dst-{sessionId}-{fileId} format per "
                    + "strategic-plan §CAP-020 line 502"
            );
            Assert.That(
                config.InitialBookId,
                Is.EqualTo("GEN"),
                "InitialBookId for BookNum=1 must be 'GEN' (Canon.BookNumberToId(1))"
            );
            Assert.That(
                config.InitialChapter,
                Is.EqualTo(1),
                "InitialChapter must be 1 (PT9 parity — new VerseRef(BookNum, 1, 0))"
            );
            Assert.That(
                config.InitialVerse,
                Is.EqualTo(0),
                "InitialVerse must be 0 (PT9 parity — new VerseRef(BookNum, 1, 0))"
            );
            Assert.That(
                config.DisplayOptions,
                Is.EqualTo(DiffToolDisplayOptions.ShowToolbar),
                "DisplayOptions must be ShowToolbar (BHV-502 — Restore uses ShowToolbar)"
            );
        }

        // -------------------------------------------------------------------
        // Token determinism — repeated calls with the same (selectedRow, sessionId) inputs
        // yield byte-identical tokens. This is the strategic-plan §CAP-020 line 513 success
        // criterion: "source-token format is opaque (no PII), session-scoped, and stable
        // across repeated calls within the session".
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-020")]
        [Property("ExtractionId", "EXT-204")]
        [Property("BehaviorId", "BHV-320")]
        [Property("ScenarioId", "TS-085")]
        public void BuildCompareConfig_RepeatedCalls_ProduceIdenticalTokens()
        {
            // Arrange
            string sessionId = "session-xyz-456";
            var selectedRow = new RestoreFileInfo
            {
                SourceFile = new RestoreZipMember { FileName = "40MATGmCmpProj.SFM", BookNum = 40 },
                DestinationFile = new RestoreZipMember
                {
                    FileName = "40MATGmCmpProj.SFM",
                    BookNum = 40,
                },
                ComparisonResult = PtwFileComparisonStates.SourceIsNewer,
            };
            ScrText destination = new DummyScrText();

            // Act — two independent calls
            FileCompareConfig first = CompareToBackupBridgeService.BuildCompareConfig(
                selectedRow,
                destination,
                ScrVers.English,
                sessionId
            );
            FileCompareConfig second = CompareToBackupBridgeService.BuildCompareConfig(
                selectedRow,
                destination,
                ScrVers.English,
                sessionId
            );

            // Assert — tokens are byte-identical (no nonce, no timestamp)
            Assert.That(
                second.LeftSourceToken,
                Is.EqualTo(first.LeftSourceToken),
                "LeftSourceToken must be deterministic across repeated calls within a session"
            );
            Assert.That(
                second.RightSourceToken,
                Is.EqualTo(first.RightSourceToken),
                "RightSourceToken must be deterministic across repeated calls within a session"
            );
        }

        // -------------------------------------------------------------------
        // InitialBookId — derived from SourceFile.BookNum via Canon.BookNumberToId.
        // PT9 parity: RestoreForm.cs:681 builds the verse-ref from sdfi.SourceFile.BookNum.
        // Test with both GEN (book 1) and MAT (book 40) to lock the derivation path.
        // -------------------------------------------------------------------

        [TestCase(1, "GEN")]
        [TestCase(40, "MAT")]
        [TestCase(66, "REV")]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-020")]
        [Property("ExtractionId", "EXT-204")]
        [Property("BehaviorId", "BHV-320")]
        [Property("ScenarioId", "TS-085")]
        public void BuildCompareConfig_InitialBookId_DerivedFromSourceFileBookNum(
            int bookNum,
            string expectedBookId
        )
        {
            // Arrange
            var selectedRow = new RestoreFileInfo
            {
                SourceFile = new RestoreZipMember
                {
                    FileName = $"{bookNum:D2}{expectedBookId}.SFM",
                    BookNum = bookNum,
                },
                DestinationFile = new RestoreZipMember
                {
                    FileName = $"{bookNum:D2}{expectedBookId}.SFM",
                    BookNum = bookNum,
                },
                ComparisonResult = PtwFileComparisonStates.SourceIsNewer,
            };

            // Act
            FileCompareConfig config = CompareToBackupBridgeService.BuildCompareConfig(
                selectedRow,
                new DummyScrText(),
                ScrVers.English,
                "any-session-id"
            );

            // Assert
            Assert.That(
                config.InitialBookId,
                Is.EqualTo(expectedBookId),
                $"InitialBookId for BookNum={bookNum} must be '{expectedBookId}' "
                    + "(Canon.BookNumberToId)"
            );
        }

        // -------------------------------------------------------------------
        // TS-086 edge case — FilesAreSame row.
        //
        // Strategic-plan §CAP-020 edge-case bullet: "TS-086 FilesAreIdentical row still
        // returns config (UI suffixes label)". The UI applies the "[Files Are Identical]"
        // suffix to the menu LABEL via BHV-320 — by the time the click reaches CAP-020,
        // the config must still be built (the diff view itself happens to render no
        // differences, which is fine).
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-020")]
        [Property("ExtractionId", "EXT-204")]
        [Property("BehaviorId", "BHV-320")]
        [Property("ScenarioId", "TS-086")]
        public void BuildCompareConfig_FilesAreSameRow_StillReturnsConfig()
        {
            // Arrange — FilesAreSame row; PT9 still shows "View differences between files
            // [Files Are Identical]" (BHV-320), so the click handler reaches this service.
            var selectedRow = new RestoreFileInfo
            {
                SourceFile = new RestoreZipMember { FileName = "01GEN.SFM", BookNum = 1 },
                DestinationFile = new RestoreZipMember { FileName = "01GEN.SFM", BookNum = 1 },
                ComparisonResult = PtwFileComparisonStates.FilesAreSame,
            };

            // Act + Assert — does NOT throw, config is populated
            FileCompareConfig config = CompareToBackupBridgeService.BuildCompareConfig(
                selectedRow,
                new DummyScrText(),
                ScrVers.English,
                "session-files-are-same"
            );

            Assert.That(
                config,
                Is.Not.Null,
                "TS-086: FilesAreSame row must still return a config (UI applies the "
                    + "[Files Are Identical] suffix to the menu label upstream)"
            );
            Assert.That(
                config.InitialBookId,
                Is.EqualTo("GEN"),
                "TS-086: config.InitialBookId is still populated from the source file's BookNum"
            );
        }

        // -------------------------------------------------------------------
        // TS-087 edge case — DestDoesNotExist row (DestinationFile == null).
        //
        // Strategic-plan §CAP-020 edge-case bullet: "TS-087 DestDoesNotExist — CAP-005 throws
        // CANNOT_COMPARE before reaching this service". So in production CAP-020 is NEVER
        // invoked with a DestDoesNotExist row. But CAP-020 is a stateless static — a future
        // caller that bypasses CAP-005 (e.g., a unit test of the wire layer, or a future
        // alternative entry point) might call CAP-020 with a null DestinationFile.
        //
        // This test pins the defensive contract: CAP-020 stays robust (no NRE) when
        // DestinationFile == null. The output token is built off SourceFile.FileName
        // (which is non-null for any restorable row), so no crash.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-020")]
        [Property("ExtractionId", "EXT-204")]
        [Property("BehaviorId", "BHV-320")]
        [Property("ScenarioId", "TS-087")]
        public void BuildCompareConfig_DestDoesNotExistRow_DefensivelyReturnsConfig()
        {
            // Arrange — DestDoesNotExist row (DestinationFile is null). PT9's UI guards this
            // before the click (BHV-320 shows "Cannot compare files" with no handler), and
            // CAP-005 has its own CANNOT_COMPARE guard in front of M-004. CAP-020 itself
            // does NOT enforce the guard — but it must not crash if called defensively.
            var selectedRow = new RestoreFileInfo
            {
                SourceFile = new RestoreZipMember { FileName = "01GEN.SFM", BookNum = 1 },
                DestinationFile = null,
                ComparisonResult = PtwFileComparisonStates.DestDoesNotExist,
            };

            // Act + Assert — does NOT throw on the null DestinationFile
            FileCompareConfig? config = null;
            Assert.DoesNotThrow(
                () =>
                    config = CompareToBackupBridgeService.BuildCompareConfig(
                        selectedRow,
                        new DummyScrText(),
                        ScrVers.English,
                        "session-dest-missing"
                    ),
                "TS-087: CAP-020 must stay robust to DestinationFile==null even though "
                    + "CAP-005 / BHV-320 guard production callers from reaching here"
            );
            Assert.That(config, Is.Not.Null);
            Assert.That(
                config!.LeftSourceToken,
                Is.EqualTo("tok-src-session-dest-missing-01GEN.SFM"),
                "TS-087: LeftSourceToken still derives from SourceFile.FileName"
            );
        }

        // -------------------------------------------------------------------
        // BHV-502 lock — DisplayOptions is ShowToolbar for the B/R flow.
        //
        // PT9 parity: RestoreForm.cs:692 passes DiffToolDisplayOptions.ShowToolbar.
        // BHV-502 line 555: "Restore + ParallelPassages + TextForm use ShowToolbar".
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-020")]
        [Property("ExtractionId", "EXT-204")]
        [Property("BehaviorId", "BHV-502")]
        [Property("ScenarioId", "TS-085")]
        public void BuildCompareConfig_DisplayOptions_IsShowToolbar()
        {
            // Arrange
            var selectedRow = new RestoreFileInfo
            {
                SourceFile = new RestoreZipMember { FileName = "01GEN.SFM", BookNum = 1 },
                DestinationFile = new RestoreZipMember { FileName = "01GEN.SFM", BookNum = 1 },
                ComparisonResult = PtwFileComparisonStates.SourceIsNewer,
            };

            // Act
            FileCompareConfig config = CompareToBackupBridgeService.BuildCompareConfig(
                selectedRow,
                new DummyScrText(),
                ScrVers.English,
                "session-display-opts"
            );

            // Assert
            Assert.That(
                config.DisplayOptions,
                Is.EqualTo(DiffToolDisplayOptions.ShowToolbar),
                "BHV-502: B/R flow uses ShowToolbar — PT9 RestoreForm.cs:692 parity"
            );
        }

        // -------------------------------------------------------------------
        // INV-C01 structural lock — FileCompareConfig has no putter fields.
        //
        // INV-C01 (FN-001): "All 5 callers of ForGetPutTexts pass null IPutText (read-only
        // diff). PT10 may ship a read-only-only equivalent without parity loss."
        //
        // PT10 enforces this STRUCTURALLY — FileCompareConfig declares no putter / writer /
        // setter-side fields at all. This test asserts that property via reflection so any
        // future addition of a putter-like field is caught by a regression failure here.
        // -------------------------------------------------------------------

        [Test]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-020")]
        [Property("ExtractionId", "EXT-204")]
        [Property("BehaviorId", "BHV-500")]
        [Property("InvariantId", "INV-C01")]
        [Property("ScenarioId", "TS-097")]
        public void BuildCompareConfig_OutputHasNoPutterFields_StructurallyReadOnly()
        {
            // Arrange — call BuildCompareConfig with canonical inputs so the test exercises
            // BOTH the production code path (it can fail in RED) AND the structural invariant
            // (when GREEN, the output record's type must have no putter fields). This dual
            // check pins INV-C01 against future implementer regressions.
            var selectedRow = new RestoreFileInfo
            {
                SourceFile = new RestoreZipMember { FileName = "01GEN.SFM", BookNum = 1 },
                DestinationFile = new RestoreZipMember { FileName = "01GEN.SFM", BookNum = 1 },
                ComparisonResult = PtwFileComparisonStates.SourceIsNewer,
            };

            // Act — invoke the service; the returned record's TYPE is what we inspect
            FileCompareConfig config = CompareToBackupBridgeService.BuildCompareConfig(
                selectedRow,
                new DummyScrText(),
                ScrVers.English,
                "session-inv-c01-structural"
            );

            // Reflect on the returned record's declared properties
            PropertyInfo[] props = config
                .GetType()
                .GetProperties(
                    BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly
                );

            // Collect any property whose name suggests it's a putter / writer
            string[] putterLikeProps = props
                .Where(p => p.Name.Contains("Putter") || p.Name.Contains("Writer"))
                .Select(p => p.Name)
                .ToArray();

            // Assert — none
            Assert.That(
                putterLikeProps,
                Is.Empty,
                $"INV-C01: FileCompareConfig must structurally enforce read-only diff by "
                    + $"declaring no putter / writer fields. Found: [{string.Join(", ", putterLikeProps)}]"
            );
        }

        // -------------------------------------------------------------------
        // INV-C02 differential lock — destination ScrText does NOT bleed into the output.
        //
        // INV-C02 (FN-001): "PT9's ForGetPutTexts anchors both ScrText1 and ScrText2 panes
        // to a single ScrText (info.ScrText1 = info.ScrText2 = scrText). Implementation
        // quirk; PT10 should NOT replicate."
        //
        // PT10 enforces this DIFFERENTIALLY — FileCompareConfig carries no ScrText fields,
        // so two calls with DIFFERENT destination ScrTexts but otherwise identical inputs
        // MUST produce byte-identical FileCompareConfig records. This pins the "no ScrText
        // bleed" property as a behavioural assertion.
        // -------------------------------------------------------------------

        [Test]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-020")]
        [Property("ExtractionId", "EXT-204")]
        [Property("BehaviorId", "BHV-501")]
        [Property("InvariantId", "INV-C02")]
        [Property("ScenarioId", "TS-098")]
        public void BuildCompareConfig_DifferentDestinations_ProduceIdenticalConfigs()
        {
            // Arrange — two different ScrText destinations, same row and session inputs
            ScrText destinationA = new DummyScrText();
            ScrText destinationB = new DummyScrText();
            Assert.That(
                ReferenceEquals(destinationA, destinationB),
                Is.False,
                "Sanity: the two DummyScrText instances must be distinct references"
            );

            var selectedRow = new RestoreFileInfo
            {
                SourceFile = new RestoreZipMember { FileName = "01GEN.SFM", BookNum = 1 },
                DestinationFile = new RestoreZipMember { FileName = "01GEN.SFM", BookNum = 1 },
                ComparisonResult = PtwFileComparisonStates.SourceIsNewer,
            };

            // Act
            FileCompareConfig configA = CompareToBackupBridgeService.BuildCompareConfig(
                selectedRow,
                destinationA,
                ScrVers.English,
                "session-inv-c02"
            );
            FileCompareConfig configB = CompareToBackupBridgeService.BuildCompareConfig(
                selectedRow,
                destinationB,
                ScrVers.English,
                "session-inv-c02"
            );

            // Assert — record-equality on the two configs (records support structural ==)
            Assert.That(
                configB,
                Is.EqualTo(configA),
                "INV-C02: PT10 does NOT replicate PT9's single-anchor quirk. Two calls with "
                    + "different destination ScrTexts but otherwise identical inputs must "
                    + "produce identical FileCompareConfig records — i.e., no ScrText fields "
                    + "leak into the output."
            );
        }

        // -------------------------------------------------------------------
        // INV-C01 behavioural lock — destination ScrText carrying a putter-eqvialent does
        // not change the output. This is an additional behavioural assertion on top of the
        // structural reflection check above. Two calls with identical inputs produce
        // identical FileCompareConfig records (record equality).
        // -------------------------------------------------------------------

        [Test]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-020")]
        [Property("ExtractionId", "EXT-204")]
        [Property("BehaviorId", "BHV-500")]
        [Property("InvariantId", "INV-C01")]
        [Property("ScenarioId", "TS-097")]
        public void BuildCompareConfig_TwoIdenticalCalls_ProduceEqualConfigRecords()
        {
            // Arrange
            var selectedRow = new RestoreFileInfo
            {
                SourceFile = new RestoreZipMember { FileName = "65JUDE.SFM", BookNum = 65 },
                DestinationFile = new RestoreZipMember { FileName = "65JUDE.SFM", BookNum = 65 },
                ComparisonResult = PtwFileComparisonStates.SourceIsNewer,
            };
            ScrText destination = new DummyScrText();

            // Act
            FileCompareConfig first = CompareToBackupBridgeService.BuildCompareConfig(
                selectedRow,
                destination,
                ScrVers.English,
                "session-equality"
            );
            FileCompareConfig second = CompareToBackupBridgeService.BuildCompareConfig(
                selectedRow,
                destination,
                ScrVers.English,
                "session-equality"
            );

            // Assert
            Assert.That(
                second,
                Is.EqualTo(first),
                "INV-C01 behavioural lock: identical inputs → record-equal outputs (the "
                    + "service is pure-function over its inputs; no IPutText / state leak)"
            );
        }
    }
}
