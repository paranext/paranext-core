using System.IO;
using System.Threading.Tasks;
using Paranext.DataProvider.BackupRestore;

namespace TestParanextDataProvider.BackupRestore
{
    // === TEST SCOPE ===
    // CAP-005 OUTER acceptance tests for `CompareBackupFileAsync` (M-004) on the
    // wire-facade `BackupRestoreDataProvider`. Outside-In TDD: the OUTER tests pin
    // the wire envelope contract (data-contracts.md §4.4); the underlying
    // FileCompareConfig construction is owned by CAP-020 (DONE) and re-asserted in
    // `CompareToBackupBridgeServiceTests`.
    //
    // Wire-layer responsibilities (per data-contracts.md §4.4):
    //   (1) Session lookup — SessionRegistry.Get(request.SessionId) → null →
    //       Error(InvalidSession, "%restore_invalidSession%")
    //   (2) File lookup — find session.Metadata.AllFiles row with Id ==
    //       request.FileId → null → Error(FileNotFound,
    //       "%restore_fileNotFoundInBackup%")
    //   (3) CANNOT_COMPARE gate — DestDoesNotExist OR !CanViewDifferences →
    //       Error(CannotCompare, "%restore_cannotCompareFiles%")
    //   (4) Delegate to CompareToBackupBridgeService.BuildCompareConfig (CAP-020)
    //   (5) Return Success(config) — wire layer adds NO post-processing.
    //
    // Test seam: BackupRestoreDataProvider.RestorerFactoryOverride (CAP-003).
    // Tests seed sessions by calling OpenRestoreSessionAsync with a fake
    // Restorer factory whose canned RestorerMetadata.AllFiles contains the
    // wire-side rows the test wants to exercise, then call
    // CompareBackupFileAsync to verify the wire-envelope contract.
    //
    // Golden-master alignment:
    //   * gm-031 (FN-001 CompareFiles bridge) — captured PT9 ForGetPutTexts call
    //     shape. The OUTER acceptance test asserts the wire-side FileCompareConfig
    //     mirrors gm-031's expected-output.json: scrText1==scrText2 (no ScrText
    //     field in FileCompareConfig — INV-C02 structural), putters null (no
    //     putter fields — INV-C01 structural), paneCaption1="File from Zip" →
    //     LeftLabelKey == "%restoreForm_fileFromZip%", paneCaption2="File in
    //     Project" → RightLabelKey == "%restoreForm_fileInProject%",
    //     displayOptions="ShowToolbar", verseRef="GEN 1:1" → (InitialBookId,
    //     InitialChapter, InitialVerse) = ("GEN", 1, 0), sourceZipMember=
    //     "01GENGmCmpProj.SFM" → LeftSourceToken format
    //     "tok-src-{sessionId}-01GENGmCmpProj.SFM".
    //   * gm-027 (right-click "View differences" menu) — captured PT9 menu
    //     states. The wire-side equivalent: for non-DestDoesNotExist + CanViewDiff
    //     row → Success (CAP-005 returns config). For DestDoesNotExist row →
    //     CANNOT_COMPARE (PT9 shows "Cannot compare files" no-handler — PT10's
    //     wire layer rejects via the error envelope per TS-087).
    //
    // RED-state expectation: every test fails because
    // BackupRestoreDataProvider.CompareBackupFileAsync throws
    // NotImplementedException("CAP-005 RED").

    internal partial class BackupRestoreDataProviderTests
    {
        // Constants from data-contracts.md §3.8 / §4.4 / gm-031 expected output.
        // PT9 source: Localizer.Str("RestoreForm_25", "File from Zip") / RestoreForm_26.
        private const string CAP005_LEFT_LABEL_KEY = "%restoreForm_fileFromZip%";
        private const string CAP005_RIGHT_LABEL_KEY = "%restoreForm_fileInProject%";

        // =====================================================================
        // OUTER ACCEPTANCE TEST — must pass for CAP-005 to be considered done.
        //
        // Strategic-plan-backend.md §CAP-005 acceptance criterion (line 211):
        //   "compareBackupFile({sessionId, fileId}) returns
        //    {status: 'success', config: FileCompareConfig} whose leftSourceToken
        //    / rightSourceToken are opaque session-scoped strings that the UI
        //    passes back to DifferencesToolView to fetch left/right text on
        //    demand."
        //
        // Golden master gm-031 alignment — field-by-field per expected-output.json:
        //   - scrText1EqualsScrText2: true        → FileCompareConfig has NO ScrText
        //                                            field (INV-C02 structural)
        //   - textPutter1IsNull: true             → FileCompareConfig has NO putter
        //                                            field (INV-C01 structural)
        //   - paneCaption1: "File from Zip"       → LeftLabelKey == "%restoreForm_fileFromZip%"
        //   - paneCaption2: "File in Project"     → RightLabelKey == "%restoreForm_fileInProject%"
        //   - displayOptions: "ShowToolbar"        → DisplayOptions == ShowToolbar
        //   - verseRef: "GEN 1:1" → (InitialBookId, InitialChapter, InitialVerse)
        //                          == ("GEN", 1, 0)
        //   - sourceZipMember: "01GENGmCmpProj.SFM" → LeftSourceToken ==
        //                          $"tok-src-{sessionId}-01GENGmCmpProj.SFM"
        //                          (RightSourceToken with tok-dst- prefix)
        // =====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Contract")]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-320")]
        [Property("ScenarioId", "TS-085")]
        [Property("GoldenMaster", "gm-031")]
        [Property("InvariantId", "INV-C01")]
        public async Task CompareBackupFile_HappyPath_ReturnsSuccessEnvelopeWithFileCompareConfig()
        {
            // Arrange — seed a session whose metadata contains a single non-
            // DestDoesNotExist + CanViewDifferences row for GEN. gm-031 source
            // fixture uses "01GENGmCmpProj.SFM"; we mirror that filename so the
            // wire-side token format pin is byte-identical.
            const string fileId = "01GENGmCmpProj.SFM";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap005-happy.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = fileId,
                SourceDisplayName = "GEN",
                DestinationDisplayName = "GEN",
                ComparisonResult = ComparisonResult.SourceIsNewer,
                IsNormallyRestored = true,
                CanViewDifferences = true,
                TooltipKey = "",
                SourceCrc = 0xABCDu,
                DestinationCrc = 0xDCBAu,
            };
            var fakeRestorer = new FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "GmCmpProj", seededRow)
            );
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            RestoreSessionResult openResult = await _provider.OpenRestoreSessionAsync(
                new OpenRestoreSessionRequest { ZipPath = zipPath }
            );
            var openSuccess = (RestoreSessionResult.Success)openResult;
            string sessionId = openSuccess.SessionId;

            // Act
            CompareBackupFileResult result = await _provider.CompareBackupFileAsync(
                new CompareBackupFileRequest { SessionId = sessionId, FileId = fileId }
            );

            // Assert — Success envelope shape
            Assert.That(
                result,
                Is.InstanceOf<CompareBackupFileResult.Success>(),
                "Wire layer returns Success envelope for non-DestDoesNotExist + CanViewDifferences row"
            );
            var success = (CompareBackupFileResult.Success)result;
            FileCompareConfig config = success.Config;

            // gm-031 — paneCaption1 / paneCaption2 → localize keys per data-contracts.md §3.8 line 793-796
            Assert.That(
                config.LeftLabelKey,
                Is.EqualTo(CAP005_LEFT_LABEL_KEY),
                "gm-031 paneCaption1='File from Zip' → LeftLabelKey is the PT9 RestoreForm_25 localize key"
            );
            Assert.That(
                config.RightLabelKey,
                Is.EqualTo(CAP005_RIGHT_LABEL_KEY),
                "gm-031 paneCaption2='File in Project' → RightLabelKey is the PT9 RestoreForm_26 localize key"
            );

            // gm-031 — sourceZipMember → LeftSourceToken format per strategic-plan-backend.md §CAP-020 line 502
            Assert.That(
                config.LeftSourceToken,
                Is.EqualTo($"tok-src-{sessionId}-{fileId}"),
                "LeftSourceToken format: tok-src-{sessionId}-{fileId} per strategic-plan §CAP-020 line 502"
            );
            Assert.That(
                config.RightSourceToken,
                Is.EqualTo($"tok-dst-{sessionId}-{fileId}"),
                "RightSourceToken format: tok-dst-{sessionId}-{fileId} per strategic-plan §CAP-020 line 502"
            );

            // gm-031 — verseRef='GEN 1:1' → (InitialBookId, InitialChapter, InitialVerse) primitives
            Assert.That(
                config.InitialBookId,
                Is.EqualTo("GEN"),
                "InitialBookId derived from the file's source book (PT9 parity — VerseRef(BookNum=1, ...))"
            );
            Assert.That(
                config.InitialChapter,
                Is.EqualTo(1),
                "InitialChapter == 1 (PT9 parity — new VerseRef(BookNum, 1, 0))"
            );
            Assert.That(
                config.InitialVerse,
                Is.EqualTo(0),
                "InitialVerse == 0 (PT9 parity — new VerseRef(BookNum, 1, 0))"
            );

            // gm-031 — displayOptions='ShowToolbar' (BHV-502 — Restore uses ShowToolbar)
            Assert.That(
                config.DisplayOptions,
                Is.EqualTo(DiffToolDisplayOptions.ShowToolbar),
                "DisplayOptions == ShowToolbar (BHV-502 — PT9 RestoreForm.cs:692 parity)"
            );
        }

        // =====================================================================
        // INVALID_SESSION — unknown sessionId
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-320")]
        [Description(
            "data-contracts.md §4.4 error matrix: unknown sessionId → Error(InvalidSession, %restore_invalidSession%)"
        )]
        public async Task CompareBackupFile_UnknownSession_ReturnsInvalidSessionError()
        {
            // Arrange — DO NOT open a session. Use a never-issued sessionId.

            // Act
            CompareBackupFileResult result = await _provider.CompareBackupFileAsync(
                new CompareBackupFileRequest
                {
                    SessionId = "ffffffffffff",
                    FileId = "01GENProj.SFM",
                }
            );

            // Assert
            Assert.That(
                result,
                Is.InstanceOf<CompareBackupFileResult.Error>(),
                "Unknown sessionId returns Error envelope"
            );
            var err = (CompareBackupFileResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(CompareBackupFileErrorCode.InvalidSession),
                "data-contracts.md §4.4: unknown session → INVALID_SESSION"
            );
            Assert.That(
                err.ErrorKey,
                Is.EqualTo("%restore_invalidSession%"),
                "Localize key per data-contracts.md §4.4 error matrix"
            );
        }

        // =====================================================================
        // INVALID_SESSION — closed/stale session (strategic-plan-backend.md §CAP-005
        // line 223 success criterion: "tokens become invalid after closeRestoreSession
        // (INVALID_SESSION)")
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-320")]
        [Description(
            "Strategic-plan-backend.md §CAP-005 success criterion (line 223): tokens become invalid after closeRestoreSession (INVALID_SESSION). Open + close + compareBackupFile must return INVALID_SESSION."
        )]
        public async Task CompareBackupFile_ClosedSession_ReturnsInvalidSessionError()
        {
            // Arrange — open a session, seed a single row, then close the session.
            const string fileId = "01GENStaleProj.SFM";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap005-stale.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = fileId,
                CanViewDifferences = true,
                ComparisonResult = ComparisonResult.SourceIsNewer,
            };
            var fakeRestorer = new FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "StaleProj", seededRow)
            );
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );
            string staleSessionId = openSuccess.SessionId;

            // Close the session — relies on CAP-011 GREEN (CloseRestoreSessionAsync delegates to
            // SessionRegistry.Close which removes the entry from the registry).
            await _provider.CloseRestoreSessionAsync(
                new CloseRestoreSessionRequest { SessionId = staleSessionId }
            );

            // Act — call CompareBackupFileAsync with the now-stale sessionId
            CompareBackupFileResult result = await _provider.CompareBackupFileAsync(
                new CompareBackupFileRequest { SessionId = staleSessionId, FileId = fileId }
            );

            // Assert — INVALID_SESSION per strategic-plan-backend.md §CAP-005 line 223
            Assert.That(
                result,
                Is.InstanceOf<CompareBackupFileResult.Error>(),
                "Closed session id returns Error envelope"
            );
            var err = (CompareBackupFileResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(CompareBackupFileErrorCode.InvalidSession),
                "Strategic-plan-backend.md §CAP-005 line 223: tokens become invalid after closeRestoreSession (INVALID_SESSION)"
            );
        }

        // =====================================================================
        // FILE_NOT_FOUND — unknown fileId
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-320")]
        [Description(
            "data-contracts.md §2.4 validation rule: fileId must exist in session's file list → Error(FileNotFound, %restore_fileNotFoundInBackup%)"
        )]
        public async Task CompareBackupFile_UnknownFileId_ReturnsFileNotFoundError()
        {
            // Arrange — open a session with one seeded row; call with a different fileId.
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap005-no-file.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = "01GENNoFileProj.SFM",
                CanViewDifferences = true,
                ComparisonResult = ComparisonResult.SourceIsNewer,
            };
            var fakeRestorer = new FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "NoFileProj", seededRow)
            );
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );

            // Act — request a fileId that is NOT in metadata.AllFiles
            CompareBackupFileResult result = await _provider.CompareBackupFileAsync(
                new CompareBackupFileRequest
                {
                    SessionId = openSuccess.SessionId,
                    FileId = "02EXONoFileProj.SFM",
                }
            );

            // Assert
            Assert.That(result, Is.InstanceOf<CompareBackupFileResult.Error>());
            var err = (CompareBackupFileResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(CompareBackupFileErrorCode.FileNotFound),
                "Unknown fileId → FILE_NOT_FOUND"
            );
            Assert.That(
                err.ErrorKey,
                Is.EqualTo("%restore_fileNotFoundInBackup%"),
                "Localize key per data-contracts.md §4.4 error matrix"
            );
        }

        // =====================================================================
        // FILE_NOT_FOUND — empty fileId (wire-stability edge)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-320")]
        [Description(
            "Edge case for wire stability: empty fileId never matches any AllFiles entry → FILE_NOT_FOUND (not a thrown exception)"
        )]
        public async Task CompareBackupFile_EmptyFileId_ReturnsFileNotFoundError()
        {
            // Arrange — open a session with one row.
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap005-empty-fid.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = "01GENEmptyFidProj.SFM",
                CanViewDifferences = true,
                ComparisonResult = ComparisonResult.SourceIsNewer,
            };
            var fakeRestorer = new FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "EmptyFidProj", seededRow)
            );
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );

            // Act
            CompareBackupFileResult result = await _provider.CompareBackupFileAsync(
                new CompareBackupFileRequest
                {
                    SessionId = openSuccess.SessionId,
                    FileId = string.Empty,
                }
            );

            // Assert
            Assert.That(result, Is.InstanceOf<CompareBackupFileResult.Error>());
            var err = (CompareBackupFileResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(CompareBackupFileErrorCode.FileNotFound),
                "Empty fileId → FILE_NOT_FOUND (wire-stability — never throws past the wire boundary)"
            );
        }

        // =====================================================================
        // CANNOT_COMPARE — DestDoesNotExist row (TS-087)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-320")]
        [Property("ScenarioId", "TS-087")]
        [Property("GoldenMaster", "gm-027")]
        [Description(
            "TS-087 + gm-027 disabled state: DestDoesNotExist row — PT9 UI shows 'Cannot compare files' (no-handler menu item); PT10 wire layer enforces the same gate at the C# boundary by returning CANNOT_COMPARE. Per data-contracts.md §2.4 validation rule + strategic-plan-backend.md §CAP-005 line 219 ('CAP-005 throws CANNOT_COMPARE before reaching this service in production')."
        )]
        public async Task CompareBackupFile_DestDoesNotExistRow_ReturnsCannotCompareError()
        {
            // Arrange — open a session with a DestDoesNotExist row (the row's
            // source-side file exists in the backup but no corresponding file
            // exists on disk). PT9's UI hides "View differences" for this row;
            // the wire layer's C# parity is to reject with CANNOT_COMPARE.
            const string fileId = "41MATDestMissingProj.SFM";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap005-dest-missing.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = fileId,
                SourceDisplayName = "MAT",
                DestinationDisplayName = null,
                ComparisonResult = ComparisonResult.DestDoesNotExist,
                IsNormallyRestored = true,
                CanViewDifferences = true, // even with this true, DestDoesNotExist alone gates
                TooltipKey = "",
                SourceCrc = 0xABCDu,
                DestinationCrc = null,
            };
            var fakeRestorer = new FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "DestMissingProj", seededRow)
            );
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );

            // Act
            CompareBackupFileResult result = await _provider.CompareBackupFileAsync(
                new CompareBackupFileRequest { SessionId = openSuccess.SessionId, FileId = fileId }
            );

            // Assert
            Assert.That(
                result,
                Is.InstanceOf<CompareBackupFileResult.Error>(),
                "TS-087: DestDoesNotExist row returns Error envelope (PT10 wire-layer parity for gm-027 disabled state)"
            );
            var err = (CompareBackupFileResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(CompareBackupFileErrorCode.CannotCompare),
                "data-contracts.md §2.4 + §4.4: DestDoesNotExist → CANNOT_COMPARE"
            );
            Assert.That(
                err.ErrorKey,
                Is.EqualTo("%restore_cannotCompareFiles%"),
                "Localize key per data-contracts.md §4.4 error matrix"
            );
        }

        // =====================================================================
        // CANNOT_COMPARE — !CanViewDifferences (BHV-320 source-property gate)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-320")]
        [Description(
            "data-contracts.md §2.4 validation rule: File's source side must report `canViewDifferences === true` (BHV-320 source-property gate) → CANNOT_COMPARE"
        )]
        public async Task CompareBackupFile_NotCanViewDifferencesRow_ReturnsCannotCompareError()
        {
            // Arrange — a row where SourceFile.CanViewDifferences == false (e.g.,
            // a settings.xml or other non-comparable ZIP entry). PT9 parity per
            // BHV-320: "Cannot compare files" no-handler menu item.
            const string fileId = "Settings.xml";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap005-no-diff.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = fileId,
                SourceDisplayName = "Settings.xml",
                DestinationDisplayName = "Settings.xml",
                ComparisonResult = ComparisonResult.SourceIsNewer,
                IsNormallyRestored = true,
                CanViewDifferences = false, // source side reports no diff capability
                TooltipKey = "",
                SourceCrc = 0xABCDu,
                DestinationCrc = 0xDCBAu,
            };
            var fakeRestorer = new FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "NoDiffProj", seededRow)
            );
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );

            // Act
            CompareBackupFileResult result = await _provider.CompareBackupFileAsync(
                new CompareBackupFileRequest { SessionId = openSuccess.SessionId, FileId = fileId }
            );

            // Assert
            Assert.That(result, Is.InstanceOf<CompareBackupFileResult.Error>());
            var err = (CompareBackupFileResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(CompareBackupFileErrorCode.CannotCompare),
                "data-contracts.md §2.4 BHV-320 source-property gate: !CanViewDifferences → CANNOT_COMPARE"
            );
        }

        // =====================================================================
        // FilesAreSame row → Success (TS-086 — suffix is UI-only)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-320")]
        [Property("ScenarioId", "TS-086")]
        [Description(
            "TS-086 (strategic-plan-backend.md §CAP-005 line 219): FilesAreIdentical row → submenu label changes [Files Are Identical]; config still returned with label suffix. The suffix is UI-only; the wire layer returns Success(config) unchanged for a FilesAreSame row."
        )]
        public async Task CompareBackupFile_FilesAreSameRow_ReturnsSuccessEnvelope()
        {
            // Arrange — FilesAreSame row + CanViewDifferences=true. PT9 UI
            // appends "[Files Are Identical]" to the menu label; the wire
            // layer's return value is unaffected — Success(config) per
            // data-contracts.md §4.4 (no error condition matches FilesAreSame).
            const string fileId = "01GENSameProj.SFM";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap005-files-same.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = fileId,
                SourceDisplayName = "GEN",
                DestinationDisplayName = "GEN",
                ComparisonResult = ComparisonResult.FilesAreSame,
                IsNormallyRestored = false,
                CanViewDifferences = true,
                TooltipKey = "",
                SourceCrc = 0xABCDu,
                DestinationCrc = 0xABCDu, // identical CRCs — files are same
            };
            var fakeRestorer = new FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "SameProj", seededRow)
            );
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );

            // Act
            CompareBackupFileResult result = await _provider.CompareBackupFileAsync(
                new CompareBackupFileRequest { SessionId = openSuccess.SessionId, FileId = fileId }
            );

            // Assert
            Assert.That(
                result,
                Is.InstanceOf<CompareBackupFileResult.Success>(),
                "TS-086: FilesAreSame row → Success envelope (the suffix is UI-only; wire layer returns config unchanged)"
            );
            var success = (CompareBackupFileResult.Success)result;
            // Sanity check — the FileCompareConfig is still well-formed.
            Assert.That(
                success.Config.LeftLabelKey,
                Is.EqualTo(CAP005_LEFT_LABEL_KEY),
                "FilesAreSame row config carries the same LeftLabelKey — the UI applies the suffix client-side"
            );
        }

        // =====================================================================
        // Token determinism (strategic-plan-backend.md §CAP-005 line 223 success
        // criterion: "tokens are stable across repeated compareBackupFile calls
        // within the same session")
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-320")]
        [Description(
            "Strategic-plan-backend.md §CAP-005 line 223 success criterion: tokens are stable across repeated compareBackupFile calls within the same session. Two successive calls with identical inputs MUST emit byte-identical LeftSourceToken / RightSourceToken."
        )]
        public async Task CompareBackupFile_RepeatedCalls_ProduceIdenticalTokens()
        {
            // Arrange — single seeded row.
            const string fileId = "01GENDeterministicProj.SFM";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap005-deterministic.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = fileId,
                CanViewDifferences = true,
                ComparisonResult = ComparisonResult.SourceIsNewer,
            };
            var fakeRestorer = new FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "DeterministicProj", seededRow)
            );
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );
            var request = new CompareBackupFileRequest
            {
                SessionId = openSuccess.SessionId,
                FileId = fileId,
            };

            // Act — two successive calls with identical inputs
            CompareBackupFileResult firstResult = await _provider.CompareBackupFileAsync(request);
            CompareBackupFileResult secondResult = await _provider.CompareBackupFileAsync(request);

            // Assert — both Success; tokens byte-identical
            Assert.That(firstResult, Is.InstanceOf<CompareBackupFileResult.Success>());
            Assert.That(secondResult, Is.InstanceOf<CompareBackupFileResult.Success>());
            var first = (CompareBackupFileResult.Success)firstResult;
            var second = (CompareBackupFileResult.Success)secondResult;
            Assert.That(
                second.Config.LeftSourceToken,
                Is.EqualTo(first.Config.LeftSourceToken),
                "Strategic-plan §CAP-005 line 223: LeftSourceToken deterministic across repeated calls within the same session"
            );
            Assert.That(
                second.Config.RightSourceToken,
                Is.EqualTo(first.Config.RightSourceToken),
                "Strategic-plan §CAP-005 line 223: RightSourceToken deterministic across repeated calls within the same session"
            );
        }

        // =====================================================================
        // Different file ids in the same session → different tokens
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-005")]
        [Property("BehaviorId", "BHV-320")]
        [Description(
            "Token format embeds the fileId (per CAP-020 strategic-plan §CAP-020 line 502: tok-src-{sessionId}-{fileId}). Different fileIds in the same session MUST emit different tokens — otherwise the M-011 getCompareSourceContent resolver cannot disambiguate."
        )]
        public async Task CompareBackupFile_DifferentFilesInSameSession_ProduceDifferentTokens()
        {
            // Arrange — two seeded rows.
            const string fileIdA = "01GENMultiProj.SFM";
            const string fileIdB = "40MATMultiProj.SFM";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap005-multi.zip"));
            var rowA = new RestoreFileEntry
            {
                Id = fileIdA,
                CanViewDifferences = true,
                ComparisonResult = ComparisonResult.SourceIsNewer,
            };
            var rowB = new RestoreFileEntry
            {
                Id = fileIdB,
                CanViewDifferences = true,
                ComparisonResult = ComparisonResult.SourceIsNewer,
            };
            var fakeRestorer = new FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "MultiProj", rowA, rowB)
            );
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );

            // Act — call once per fileId.
            var resultA = (CompareBackupFileResult.Success)
                await _provider.CompareBackupFileAsync(
                    new CompareBackupFileRequest
                    {
                        SessionId = openSuccess.SessionId,
                        FileId = fileIdA,
                    }
                );
            var resultB = (CompareBackupFileResult.Success)
                await _provider.CompareBackupFileAsync(
                    new CompareBackupFileRequest
                    {
                        SessionId = openSuccess.SessionId,
                        FileId = fileIdB,
                    }
                );

            // Assert — tokens disambiguate by fileId
            Assert.That(
                resultA.Config.LeftSourceToken,
                Is.Not.EqualTo(resultB.Config.LeftSourceToken),
                "Two fileIds in the same session must yield distinct LeftSourceToken values (M-011 resolver dependency)"
            );
            Assert.That(
                resultA.Config.RightSourceToken,
                Is.Not.EqualTo(resultB.Config.RightSourceToken),
                "Two fileIds in the same session must yield distinct RightSourceToken values"
            );
            // The token format spec also says they embed the fileId itself.
            Assert.That(
                resultA.Config.LeftSourceToken,
                Does.Contain(fileIdA),
                "LeftSourceToken format: tok-src-{sessionId}-{fileId} per strategic-plan §CAP-020 line 502"
            );
            Assert.That(
                resultB.Config.LeftSourceToken,
                Does.Contain(fileIdB),
                "LeftSourceToken format: tok-src-{sessionId}-{fileId} per strategic-plan §CAP-020 line 502"
            );
        }

        // =====================================================================
        // Helpers (CompareBackupFile test-only)
        // =====================================================================

        /// <summary>
        /// Build a <see cref="RestorerMetadata"/> instance seeded with the
        /// supplied <paramref name="rows"/> as the <c>AllFiles</c> projection.
        /// Used by CAP-005 tests to control which rows the wire layer can
        /// resolve via fileId.
        /// </summary>
        private static RestorerMetadata MakeMetadataWithFiles(
            string filePath,
            string projectName,
            params RestoreFileEntry[] rows
        )
        {
            return new RestorerMetadata
            {
                FilePath = filePath,
                Description = string.Empty,
                ProjectName = projectName,
                ProjectGuid = null,
                IsLegacyBackup = false,
                SharedProjectMarkers = false,
                AllFiles = rows,
                HasFigures = false,
            };
        }
    }
}
