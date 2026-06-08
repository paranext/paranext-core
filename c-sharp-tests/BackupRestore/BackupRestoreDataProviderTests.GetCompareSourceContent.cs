using System;
using System.IO;
using System.Threading.Tasks;
using Paranext.DataProvider.BackupRestore;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.BackupRestore
{
    // === TEST SCOPE ===
    // CAP-024 OUTER acceptance tests for `GetCompareSourceContentAsync` (M-011)
    // on the wire-facade `BackupRestoreDataProvider`. Outside-In TDD: the OUTER
    // tests pin the wire envelope contract (data-contracts.md §4.7); the
    // underlying token-parse + branch-by-side dispatch is owned by CAP-024's
    // INNER static service `CompareSourceContentResolver` and re-asserted in
    // `CompareSourceContentResolverTests`.
    //
    // Wire-layer responsibilities (per data-contracts.md §4.7):
    //   (1) Session lookup — SessionRegistry.Get(request.SessionId) → null →
    //       Error(InvalidSession, "%restore_invalidSession%").
    //   (2) Destination lookup — for tok-dst-* tokens the resolver needs the
    //       destination ScrText. The wire layer obtains it via the new
    //       BackupRestoreDataProvider.DestinationProjectLookupOverride seam
    //       in tests (production: LocalParatextProjects.GetParatextProject(
    //       session.Metadata.ProjectGuid)).
    //   (3) Delegate to CompareSourceContentResolver.Resolve(session,
    //       destinationProject, request.SourceToken, request.VerseRef,
    //       request.SingleChapter).
    //   (4) Return resolver's result unmodified.
    //
    // Test infrastructure:
    //   * Test seam: BackupRestoreDataProvider.RestorerFactoryOverride (CAP-003).
    //     Tests seed sessions by calling OpenRestoreSessionAsync with a fake
    //     CAP024_FakeRestorerHandle whose ReadFileText returns canned USFM text.
    //   * Test seam: BackupRestoreDataProvider.DestinationProjectLookupOverride
    //     (CAP-024 — new). Tests inject a `Func<string?, ScrText?>` returning a
    //     CannedTextScrText whose GetText returns canned USFM text.
    //   * Token format mirrored from CAP-020 spec literally:
    //         "tok-src-{sessionId}-{fileName}"
    //         "tok-dst-{sessionId}-{fileName}"
    //
    // Golden-master alignment:
    //   * gm-031 — augmented chapter-level round-trip. The OUTER acceptance test
    //     drives a full compareBackupFile (CAP-005) → getCompareSourceContent
    //     (CAP-024) sequence and asserts the leftSourceToken resolves to the
    //     canned USFM chapter the fake handle holds.
    //
    // RED-state expectation: every test fails because
    // BackupRestoreDataProvider.GetCompareSourceContentAsync throws
    // NotImplementedException("CAP-024 RED").

    internal partial class BackupRestoreDataProviderTests
    {
        // Canned chapter / book USFM fixtures shared across tests.
        private const string CAP024_GEN_CHAPTER3 =
            "\\c 3\n\\p\n\\v 1 Now the serpent was more crafty than any beast.\n";
        private const string CAP024_GEN_WHOLE_BOOK =
            "\\id GEN\n\\c 1\n\\p\n\\v 1 In the beginning.\n\\c 2\n\\v 1 .\n\\c 3\n\\v 1 .\n";
        private const string CAP024_DEST_CHAPTER3 =
            "\\c 3\n\\p\n\\v 1 The serpent was more clever than any other creature.\n";

        // =====================================================================
        // OUTER ACCEPTANCE TEST — must pass for CAP-024 to be considered done.
        //
        // Per strategic-plan-backend.md §CAP-024 acceptance criterion: open a
        // restore session → call compareBackupFile → take leftSourceToken →
        // call getCompareSourceContent for chapter GEN 3 with singleChapter:
        // true → expect Success envelope with non-empty USFM text starting
        // with `\c 3`. Mirrors the §7.2.5a wire template.
        // =====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Contract")]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Property("ScenarioId", "TS-097")]
        [Property("GoldenMaster", "gm-031")]
        [Property("InvariantId", "INV-C01")]
        [Description(
            "OUTER acceptance — full CompareBackupFile (CAP-005) → GetCompareSourceContent (CAP-024) round-trip. Per data-contracts.md §7.2.5a wire template + strategic-plan-backend.md §CAP-024 success criterion."
        )]
        public async Task GetCompareSourceContent_HappyPath_BackupSideChapter_ReturnsSuccessWithText()
        {
            // Arrange — seed a session whose fake CAP024_FakeRestorerHandle
            // returns the canned GEN 3 chapter from ReadFileText. The session
            // metadata carries a single CanViewDifferences row for
            // "01GENGmCmpProj.SFM" — mirrors gm-031's source fixture so the
            // token format pin (tok-src-{sessionId}-01GENGmCmpProj.SFM) is
            // byte-identical end-to-end.
            const string fileId = "01GENGmCmpProj.SFM";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap024-happy.zip"));
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
            var fakeRestorer = new CAP024_FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "GmCmpProj", seededRow)
            )
            {
                BackupChapterText = CAP024_GEN_CHAPTER3,
            };
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            RestoreSessionResult openResult = await _provider.OpenRestoreSessionAsync(
                new OpenRestoreSessionRequest { ZipPath = zipPath }
            );
            var openSuccess = (RestoreSessionResult.Success)openResult;
            string sessionId = openSuccess.SessionId;

            CompareBackupFileResult compareResult = await _provider.CompareBackupFileAsync(
                new CompareBackupFileRequest { SessionId = sessionId, FileId = fileId }
            );
            var compareSuccess = (CompareBackupFileResult.Success)compareResult;
            string leftSourceToken = compareSuccess.Config.LeftSourceToken;

            // Act — resolve the leftSourceToken to GEN 3 chapter text
            GetCompareSourceContentResult result = await _provider.GetCompareSourceContentAsync(
                new GetCompareSourceContentRequest
                {
                    SessionId = sessionId,
                    SourceToken = leftSourceToken,
                    VerseRef = new VerseRef("GEN", "3", "0", ScrVers.English),
                    SingleChapter = true,
                }
            );

            // Assert — Success envelope, non-empty text starting with `\c 3`
            Assert.That(
                result,
                Is.InstanceOf<GetCompareSourceContentResult.Success>(),
                "OUTER: full round-trip returns Success envelope"
            );
            var success = (GetCompareSourceContentResult.Success)result;
            Assert.That(
                success.Text,
                Does.StartWith("\\c 3"),
                "§7.2.5a wire template: backup-side GEN 3 chapter text starts with `\\c 3`"
            );
            Assert.That(
                success.Text,
                Is.EqualTo(CAP024_GEN_CHAPTER3),
                "Backup-side text is the canned chapter from IRestorerHandle.ReadFileText (pure read-through)"
            );

            // Sanity — the fake handle was invoked with the expected fileName +
            // singleChapter=true (proves the resolver parsed the token correctly).
            Assert.That(
                fakeRestorer.LastReadFileName,
                Is.EqualTo(fileId),
                "Resolver extracted fileName from `tok-src-{sessionId}-{fileName}` token format per CAP-020 spec"
            );
            Assert.That(
                fakeRestorer.LastReadSingleChapter,
                Is.True,
                "Resolver forwards SingleChapter=true through to IRestorerHandle.ReadFileText"
            );
        }

        // =====================================================================
        // INVALID_SESSION — unknown sessionId
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "data-contracts.md §4.7 error matrix: unknown sessionId → Error(InvalidSession, %restore_invalidSession%)"
        )]
        public async Task GetCompareSourceContent_UnknownSession_ReturnsInvalidSessionError()
        {
            // Arrange — DO NOT open a session. Use a never-issued sessionId.
            // Compose the token from parts (matches CompareToBackupBridgeService's
            // production format) so gitleaks doesn't flag the literal as a
            // high-entropy secret.
            const string unknownSessionId = "ffffffffffff";
            string sourceToken = $"tok-src-{unknownSessionId}-01GENProj.SFM";

            // Act
            GetCompareSourceContentResult result = await _provider.GetCompareSourceContentAsync(
                new GetCompareSourceContentRequest
                {
                    SessionId = unknownSessionId,
                    SourceToken = sourceToken,
                    VerseRef = new VerseRef("GEN", "3", "0", ScrVers.English),
                    SingleChapter = true,
                }
            );

            // Assert
            Assert.That(
                result,
                Is.InstanceOf<GetCompareSourceContentResult.Error>(),
                "Unknown sessionId returns Error envelope"
            );
            var err = (GetCompareSourceContentResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(GetCompareSourceContentErrorCode.InvalidSession),
                "data-contracts.md §4.7: unknown session → INVALID_SESSION"
            );
            Assert.That(
                err.ErrorKey,
                Is.EqualTo("%restore_invalidSession%"),
                "Localize key per data-contracts.md §4.7 error matrix"
            );
        }

        // =====================================================================
        // INVALID_SESSION — closed session (strategic-plan-backend.md §CAP-024
        // edge case: "Token expired after closeRestoreSession → INVALID_SESSION")
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "strategic-plan-backend.md §CAP-024 edge case: 'Token expired after closeRestoreSession → INVALID_SESSION'. Open → compare → close → getCompareSourceContent must return INVALID_SESSION."
        )]
        public async Task GetCompareSourceContent_ClosedSession_ReturnsInvalidSessionError()
        {
            // Arrange — open a session, capture the leftSourceToken, then close
            // the session. The token survives in the test caller's hands but
            // the session it referenced is gone.
            const string fileId = "01GENStaleProj.SFM";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap024-stale.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = fileId,
                CanViewDifferences = true,
                ComparisonResult = ComparisonResult.SourceIsNewer,
            };
            var fakeRestorer = new CAP024_FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "StaleProj", seededRow)
            )
            {
                BackupChapterText = CAP024_GEN_CHAPTER3,
            };
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );
            string staleSessionId = openSuccess.SessionId;

            // Capture the token while the session is still live.
            var compareSuccess = (CompareBackupFileResult.Success)
                await _provider.CompareBackupFileAsync(
                    new CompareBackupFileRequest { SessionId = staleSessionId, FileId = fileId }
                );
            string staleToken = compareSuccess.Config.LeftSourceToken;

            // Close the session — the stale token referencing this session id
            // should now resolve to INVALID_SESSION at the wire layer.
            await _provider.CloseRestoreSessionAsync(
                new CloseRestoreSessionRequest { SessionId = staleSessionId }
            );

            // Act
            GetCompareSourceContentResult result = await _provider.GetCompareSourceContentAsync(
                new GetCompareSourceContentRequest
                {
                    SessionId = staleSessionId,
                    SourceToken = staleToken,
                    VerseRef = new VerseRef("GEN", "3", "0", ScrVers.English),
                    SingleChapter = true,
                }
            );

            // Assert
            Assert.That(
                result,
                Is.InstanceOf<GetCompareSourceContentResult.Error>(),
                "Closed session id returns Error envelope"
            );
            var err = (GetCompareSourceContentResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(GetCompareSourceContentErrorCode.InvalidSession),
                "strategic-plan-backend.md §CAP-024: token expired after closeRestoreSession → INVALID_SESSION"
            );
        }

        // =====================================================================
        // INVALID_TOKEN — token's session-id portion doesn't match this session
        // (strategic-plan-backend.md §CAP-024 edge case: "Token reused from
        // closed-and-reopened session → INVALID_TOKEN")
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "strategic-plan-backend.md §CAP-024 edge case: 'Token reused from closed-and-reopened session → INVALID_TOKEN'. The token embeds an old session id; the (live) request's sessionId is different — resolver maps to INVALID_TOKEN, not INVALID_SESSION."
        )]
        public async Task GetCompareSourceContent_TokenFromDifferentSession_ReturnsInvalidTokenError()
        {
            // Arrange — open a session. Use a token whose sessionId portion is
            // valid 12-hex but DIFFERENT from the request's sessionId.
            const string fileId = "01GENMixedProj.SFM";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap024-mixed.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = fileId,
                CanViewDifferences = true,
                ComparisonResult = ComparisonResult.SourceIsNewer,
            };
            var fakeRestorer = new CAP024_FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "MixedProj", seededRow)
            )
            {
                BackupChapterText = CAP024_GEN_CHAPTER3,
            };
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );

            // A 12-hex session id that is structurally valid but != openSuccess.SessionId.
            const string otherSessionId = "aaaaaaaaaaaa";
            // Guard the test invariant: any randomly minted id should not collide.
            Assert.That(
                openSuccess.SessionId,
                Is.Not.EqualTo(otherSessionId),
                "Test precondition: the minted session id differs from the hard-coded other id"
            );
            string foreignToken = $"tok-src-{otherSessionId}-{fileId}";

            // Act
            GetCompareSourceContentResult result = await _provider.GetCompareSourceContentAsync(
                new GetCompareSourceContentRequest
                {
                    SessionId = openSuccess.SessionId,
                    SourceToken = foreignToken,
                    VerseRef = new VerseRef("GEN", "3", "0", ScrVers.English),
                    SingleChapter = true,
                }
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Error>());
            var err = (GetCompareSourceContentResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(GetCompareSourceContentErrorCode.InvalidToken),
                "Token's session-id portion mismatches → INVALID_TOKEN (NOT INVALID_SESSION — the request's session is live)"
            );
            Assert.That(
                err.ErrorKey,
                Is.EqualTo("%compare_invalidSourceToken%"),
                "Localize key per data-contracts.md §4.7 error matrix"
            );
        }

        // =====================================================================
        // INVALID_TOKEN — malformed token (wrong prefix)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "data-contracts.md §4.7: tokens must match the CAP-020 format `(tok-src-|tok-dst-){sessionId}-{fileName}`. A token with a wrong prefix returns INVALID_TOKEN."
        )]
        public async Task GetCompareSourceContent_MalformedToken_ReturnsInvalidTokenError()
        {
            // Arrange — open a session; supply a token with a wrong prefix.
            const string fileId = "01GENMalformedProj.SFM";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap024-malformed.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = fileId,
                CanViewDifferences = true,
                ComparisonResult = ComparisonResult.SourceIsNewer,
            };
            var fakeRestorer = new CAP024_FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "MalformedProj", seededRow)
            );
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );

            // Act
            GetCompareSourceContentResult result = await _provider.GetCompareSourceContentAsync(
                new GetCompareSourceContentRequest
                {
                    SessionId = openSuccess.SessionId,
                    SourceToken = "completely-unrelated-token",
                    VerseRef = new VerseRef("GEN", "3", "0", ScrVers.English),
                    SingleChapter = true,
                }
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Error>());
            var err = (GetCompareSourceContentResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(GetCompareSourceContentErrorCode.InvalidToken),
                "Token without `tok-src-`/`tok-dst-` prefix → INVALID_TOKEN"
            );
        }

        // =====================================================================
        // INVALID_VERSE_REF — unknown book id
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "data-contracts.md §4.7: `verseRef.BookId` must resolve to a known book number. An unknown book id (BookNum=0) returns INVALID_VERSE_REF."
        )]
        public async Task GetCompareSourceContent_UnknownBookId_ReturnsInvalidVerseRefError()
        {
            // Arrange — open a session, compare to get a real token; supply a
            // verseRef whose bookId is unrecognized.
            const string fileId = "01GENBadVrefProj.SFM";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap024-bad-vref.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = fileId,
                CanViewDifferences = true,
                ComparisonResult = ComparisonResult.SourceIsNewer,
            };
            var fakeRestorer = new CAP024_FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "BadVrefProj", seededRow)
            );
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );
            var compareSuccess = (CompareBackupFileResult.Success)
                await _provider.CompareBackupFileAsync(
                    new CompareBackupFileRequest
                    {
                        SessionId = openSuccess.SessionId,
                        FileId = fileId,
                    }
                );

            // Construct a VerseRef whose book code resolves to BookNum 0.
            // VerseRef ctor with an unknown 3-letter code produces BookNum 0
            // (Canon.BookIdToNumber returns 0 for unrecognized codes).
            var badVerseRef = new VerseRef();
            Assert.That(
                badVerseRef.BookNum,
                Is.EqualTo(0),
                "Default VerseRef has BookNum 0 (unknown book) — the resolver gate"
            );

            // Act
            GetCompareSourceContentResult result = await _provider.GetCompareSourceContentAsync(
                new GetCompareSourceContentRequest
                {
                    SessionId = openSuccess.SessionId,
                    SourceToken = compareSuccess.Config.LeftSourceToken,
                    VerseRef = badVerseRef,
                    SingleChapter = true,
                }
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Error>());
            var err = (GetCompareSourceContentResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(GetCompareSourceContentErrorCode.InvalidVerseRef),
                "VerseRef.BookNum == 0 → INVALID_VERSE_REF per data-contracts.md §4.7"
            );
            Assert.That(
                err.ErrorKey,
                Is.EqualTo("%compare_invalidVerseRef%"),
                "Localize key per data-contracts.md §4.7 error matrix"
            );
        }

        // =====================================================================
        // IO_ERROR — backup-side IRestorerHandle.ReadFileText throws IOException
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "data-contracts.md §4.7: `Underlying I/O error reading from the source (ZIP corrupted mid-session, disk read fault)` → IO_ERROR. The wire layer / resolver catches IOException from IRestorerHandle.ReadFileText and projects to the envelope."
        )]
        public async Task GetCompareSourceContent_BackupSideIoFailure_ReturnsIoErrorEnvelope()
        {
            // Arrange — fake handle's ReadFileText throws IOException.
            const string fileId = "01GENIoFailProj.SFM";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap024-io-fail.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = fileId,
                CanViewDifferences = true,
                ComparisonResult = ComparisonResult.SourceIsNewer,
            };
            var fakeRestorer = new CAP024_FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "IoFailProj", seededRow)
            )
            {
                ReadFileTextException = new IOException(
                    "Simulated ZIP read fault for CAP-024 IO_ERROR test"
                ),
            };
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );
            var compareSuccess = (CompareBackupFileResult.Success)
                await _provider.CompareBackupFileAsync(
                    new CompareBackupFileRequest
                    {
                        SessionId = openSuccess.SessionId,
                        FileId = fileId,
                    }
                );

            // Act
            GetCompareSourceContentResult result = await _provider.GetCompareSourceContentAsync(
                new GetCompareSourceContentRequest
                {
                    SessionId = openSuccess.SessionId,
                    SourceToken = compareSuccess.Config.LeftSourceToken,
                    VerseRef = new VerseRef("GEN", "3", "0", ScrVers.English),
                    SingleChapter = true,
                }
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Error>());
            var err = (GetCompareSourceContentResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(GetCompareSourceContentErrorCode.IoError),
                "Backup-side IOException → IO_ERROR per data-contracts.md §4.7"
            );
            Assert.That(
                err.ErrorKey,
                Is.EqualTo("%compare_sourceIoError%"),
                "Localize key per data-contracts.md §4.7 error matrix"
            );
        }

        // =====================================================================
        // Empty chapter → Success("") (strategic-plan-backend.md §CAP-024 edge
        // case: "Empty chapter (e.g., GEN 51) → success with text=''")
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "strategic-plan-backend.md §CAP-024 edge case: 'Empty chapter (e.g., GEN 51) → success with text=\\\"\\\"' — NOT an error per data-contracts.md §4.7. Caller renders blank pane."
        )]
        public async Task GetCompareSourceContent_EmptyChapter_ReturnsSuccessWithEmptyText()
        {
            // Arrange — fake handle returns "" from ReadFileText.
            const string fileId = "01GENEmptyChapterProj.SFM";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap024-empty-chapter.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = fileId,
                CanViewDifferences = true,
                ComparisonResult = ComparisonResult.SourceIsNewer,
            };
            var fakeRestorer = new CAP024_FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "EmptyChapterProj", seededRow)
            )
            {
                BackupChapterText = string.Empty,
            };
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );
            var compareSuccess = (CompareBackupFileResult.Success)
                await _provider.CompareBackupFileAsync(
                    new CompareBackupFileRequest
                    {
                        SessionId = openSuccess.SessionId,
                        FileId = fileId,
                    }
                );

            // Act — request GEN 51 (a chapter the fake handle treats as absent).
            GetCompareSourceContentResult result = await _provider.GetCompareSourceContentAsync(
                new GetCompareSourceContentRequest
                {
                    SessionId = openSuccess.SessionId,
                    SourceToken = compareSuccess.Config.LeftSourceToken,
                    VerseRef = new VerseRef("GEN", "51", "0", ScrVers.English),
                    SingleChapter = true,
                }
            );

            // Assert — Success, NOT Error
            Assert.That(
                result,
                Is.InstanceOf<GetCompareSourceContentResult.Success>(),
                "Empty chapter is a valid Success result per §4.7 — NOT an IO_ERROR"
            );
            var success = (GetCompareSourceContentResult.Success)result;
            Assert.That(
                success.Text,
                Is.EqualTo(string.Empty),
                "Empty chapter → Success(text=\"\") per data-contracts.md §4.7 postcondition"
            );
        }

        // =====================================================================
        // tok-dst-* token → Success with destination ScrText text
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "Right-side resolution: `tok-dst-` tokens resolve via the destination ScrText.GetText (NOT via the IRestorerHandle). The wire layer obtains the destination via the DestinationProjectLookupOverride seam in tests; production uses LocalParatextProjects.GetParatextProject(session.Metadata.ProjectGuid)."
        )]
        public async Task GetCompareSourceContent_DestinationSideChapter_ReturnsSuccessFromScrText()
        {
            // Arrange — same session setup as the backup-side happy path, but
            // resolve the rightSourceToken instead. The destination lookup
            // override returns a CannedTextScrText that yields a different
            // canned chapter so we can prove the resolver took the dst branch.
            const string fileId = "01GENDstProj.SFM";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap024-dst.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = fileId,
                CanViewDifferences = true,
                ComparisonResult = ComparisonResult.SourceIsNewer,
            };
            var fakeRestorer = new CAP024_FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "DstProj", seededRow)
            )
            {
                // Make sure the backup side is NOT silently substituted — set
                // a sentinel that we'd notice if the resolver took the wrong branch.
                BackupChapterText = "\\c 99 BACKUP-SIDE-WOULD-LEAK-THIS",
            };
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var destinationScrText = new CannedTextScrText(CAP024_DEST_CHAPTER3);
            BackupRestoreDataProvider.DestinationProjectLookupOverride = _ => destinationScrText;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );
            var compareSuccess = (CompareBackupFileResult.Success)
                await _provider.CompareBackupFileAsync(
                    new CompareBackupFileRequest
                    {
                        SessionId = openSuccess.SessionId,
                        FileId = fileId,
                    }
                );
            string rightSourceToken = compareSuccess.Config.RightSourceToken;
            Assert.That(
                rightSourceToken,
                Does.StartWith("tok-dst-"),
                "Test precondition: rightSourceToken uses the `tok-dst-` prefix per CAP-020 spec"
            );

            // Act
            GetCompareSourceContentResult result = await _provider.GetCompareSourceContentAsync(
                new GetCompareSourceContentRequest
                {
                    SessionId = openSuccess.SessionId,
                    SourceToken = rightSourceToken,
                    VerseRef = new VerseRef("GEN", "3", "0", ScrVers.English),
                    SingleChapter = true,
                }
            );

            // Assert — destination-side text, not backup-side
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Success>());
            var success = (GetCompareSourceContentResult.Success)result;
            Assert.That(
                success.Text,
                Is.EqualTo(CAP024_DEST_CHAPTER3),
                "tok-dst-* resolves through destination ScrText.GetText (NOT backup IRestorerHandle.ReadFileText)"
            );
            Assert.That(
                destinationScrText.LastGetTextSingleChapter,
                Is.True,
                "Resolver forwards SingleChapter=true through to ScrText.GetText"
            );
        }

        // =====================================================================
        // tok-dst-* token with null destination lookup → IO_ERROR
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "When the destination project cannot be resolved (LocalParatextProjects returns null / throws), a `tok-dst-` token returns IO_ERROR. The wire layer treats this as a destination-read failure rather than INVALID_TOKEN — the token itself is well-formed and references the live session."
        )]
        public async Task GetCompareSourceContent_DestinationSide_NullDestination_ReturnsIoError()
        {
            // Arrange — wire the destination lookup to null.
            const string fileId = "01GENNullDstProj.SFM";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap024-null-dst.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = fileId,
                CanViewDifferences = true,
                ComparisonResult = ComparisonResult.SourceIsNewer,
            };
            var fakeRestorer = new CAP024_FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "NullDstProj", seededRow)
            );
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;
            BackupRestoreDataProvider.DestinationProjectLookupOverride = _ => null;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );
            var compareSuccess = (CompareBackupFileResult.Success)
                await _provider.CompareBackupFileAsync(
                    new CompareBackupFileRequest
                    {
                        SessionId = openSuccess.SessionId,
                        FileId = fileId,
                    }
                );

            // Act — use the rightSourceToken so we hit the dst branch.
            GetCompareSourceContentResult result = await _provider.GetCompareSourceContentAsync(
                new GetCompareSourceContentRequest
                {
                    SessionId = openSuccess.SessionId,
                    SourceToken = compareSuccess.Config.RightSourceToken,
                    VerseRef = new VerseRef("GEN", "3", "0", ScrVers.English),
                    SingleChapter = true,
                }
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Error>());
            var err = (GetCompareSourceContentResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(GetCompareSourceContentErrorCode.IoError),
                "Null destination project for a tok-dst-* token → IO_ERROR (destination unreadable)"
            );
        }

        // =====================================================================
        // singleChapter=false (whole book) forwards through to ReadFileText
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "data-contracts.md §4.7 postcondition: `singleChapter: false → whole-book content`. Mirrors PT9's IGetText.GetText(vref, singleChapter=false, doMapIn). Wire layer forwards SingleChapter through to the underlying read without modification."
        )]
        public async Task GetCompareSourceContent_SingleChapterFalse_ReturnsWholeBookText()
        {
            // Arrange — fake handle returns the whole-book canned text when
            // SingleChapter=false is forwarded.
            const string fileId = "01GENBookProj.SFM";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap024-book.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = fileId,
                CanViewDifferences = true,
                ComparisonResult = ComparisonResult.SourceIsNewer,
            };
            var fakeRestorer = new CAP024_FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "BookProj", seededRow)
            )
            {
                BackupBookText = CAP024_GEN_WHOLE_BOOK,
            };
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );
            var compareSuccess = (CompareBackupFileResult.Success)
                await _provider.CompareBackupFileAsync(
                    new CompareBackupFileRequest
                    {
                        SessionId = openSuccess.SessionId,
                        FileId = fileId,
                    }
                );

            // Act
            GetCompareSourceContentResult result = await _provider.GetCompareSourceContentAsync(
                new GetCompareSourceContentRequest
                {
                    SessionId = openSuccess.SessionId,
                    SourceToken = compareSuccess.Config.LeftSourceToken,
                    VerseRef = new VerseRef("GEN", "0", "0", ScrVers.English),
                    SingleChapter = false,
                }
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Success>());
            var success = (GetCompareSourceContentResult.Success)result;
            Assert.That(
                success.Text,
                Is.EqualTo(CAP024_GEN_WHOLE_BOOK),
                "SingleChapter=false → whole-book text from IRestorerHandle.ReadFileText"
            );
            Assert.That(
                fakeRestorer.LastReadSingleChapter,
                Is.False,
                "Resolver forwards SingleChapter=false through to IRestorerHandle.ReadFileText"
            );
        }

        // =====================================================================
        // Repeated calls with identical inputs → identical results (read-only,
        // deterministic — INV-C01 sanity check)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Property("InvariantId", "INV-C01")]
        [Description(
            "INV-C01 (read-only): repeated calls with identical inputs MUST produce identical results. Pure read-through — no state mutation."
        )]
        public async Task GetCompareSourceContent_RepeatedCalls_ProduceIdenticalResults()
        {
            // Arrange
            const string fileId = "01GENRepeatProj.SFM";
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "cap024-repeat.zip"));
            var seededRow = new RestoreFileEntry
            {
                Id = fileId,
                CanViewDifferences = true,
                ComparisonResult = ComparisonResult.SourceIsNewer,
            };
            var fakeRestorer = new CAP024_FakeRestorerHandle(
                MakeMetadataWithFiles(zipPath, "RepeatProj", seededRow)
            )
            {
                BackupChapterText = CAP024_GEN_CHAPTER3,
            };
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            var openSuccess = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPath }
                );
            var compareSuccess = (CompareBackupFileResult.Success)
                await _provider.CompareBackupFileAsync(
                    new CompareBackupFileRequest
                    {
                        SessionId = openSuccess.SessionId,
                        FileId = fileId,
                    }
                );
            var request = new GetCompareSourceContentRequest
            {
                SessionId = openSuccess.SessionId,
                SourceToken = compareSuccess.Config.LeftSourceToken,
                VerseRef = new VerseRef("GEN", "3", "0", ScrVers.English),
                SingleChapter = true,
            };

            // Act — two successive calls
            GetCompareSourceContentResult first = await _provider.GetCompareSourceContentAsync(
                request
            );
            GetCompareSourceContentResult second = await _provider.GetCompareSourceContentAsync(
                request
            );

            // Assert — both Success, identical text (INV-C01 read-only invariant)
            Assert.That(first, Is.InstanceOf<GetCompareSourceContentResult.Success>());
            Assert.That(second, Is.InstanceOf<GetCompareSourceContentResult.Success>());
            var firstSuccess = (GetCompareSourceContentResult.Success)first;
            var secondSuccess = (GetCompareSourceContentResult.Success)second;
            Assert.That(
                secondSuccess.Text,
                Is.EqualTo(firstSuccess.Text),
                "INV-C01: repeated reads return identical text — no state mutation"
            );
        }

        // =====================================================================
        // Helpers (CAP-024 test-only)
        // =====================================================================

        /// <summary>
        /// Fake <see cref="IRestorerHandle"/> for CAP-024 wire-layer tests.
        /// Drives <see cref="IRestorerHandle.ReadFileText"/> via three knobs:
        /// <list type="bullet">
        ///   <item><see cref="BackupChapterText"/> — text returned when
        ///     <c>singleChapter == true</c>.</item>
        ///   <item><see cref="BackupBookText"/> — text returned when
        ///     <c>singleChapter == false</c>.</item>
        ///   <item><see cref="ReadFileTextException"/> — when non-null, the next
        ///     <see cref="ReadFileText"/> call throws this exception.</item>
        /// </list>
        /// Also records the last invocation's parameters for assertions.
        /// </summary>
        private sealed class CAP024_FakeRestorerHandle : IRestorerHandle
        {
            private readonly RestorerMetadata _metadata;
            private int _disposeCount;

            public CAP024_FakeRestorerHandle(RestorerMetadata metadata)
            {
                _metadata = metadata;
            }

            public string BackupChapterText { get; set; } = string.Empty;
            public string BackupBookText { get; set; } = string.Empty;
            public Exception? ReadFileTextException { get; set; }

            public string? LastReadFileName { get; private set; }
            public VerseRef LastReadVerseRef { get; private set; }
            public bool LastReadSingleChapter { get; private set; }
            public int DisposeCount => _disposeCount;

            public RestorerMetadata BuildMetadata(string? preferredDestinationProjectId) =>
                _metadata;

            public RestoreOverlayOutcome PerformOverlayRestore(
                ScrText destination,
                RestoreOverlayRequest request
            )
            {
                _ = destination;
                _ = request;
                throw new System.NotSupportedException(
                    "CAP024_FakeRestorerHandle does not implement PerformOverlayRestore."
                );
            }

            public string ReadFileText(string fileName, VerseRef verseRef, bool singleChapter)
            {
                LastReadFileName = fileName;
                LastReadVerseRef = verseRef;
                LastReadSingleChapter = singleChapter;
                if (ReadFileTextException is not null)
                    throw ReadFileTextException;
                return singleChapter ? BackupChapterText : BackupBookText;
            }

            public void Dispose() => _disposeCount++;
        }

        /// <summary>
        /// <see cref="DummyScrText"/> whose <see cref="ScrText.GetText(VerseRef, bool, bool)"/>
        /// returns a single canned chapter string. Used by CAP-024 destination-
        /// side tests to drive the right-pane path without any on-disk project state.
        /// </summary>
        private sealed class CannedTextScrText : DummyScrText
        {
            private readonly string _cannedText;

            public CannedTextScrText(string cannedText)
            {
                _cannedText = cannedText;
            }

            public VerseRef LastGetTextVerseRef { get; private set; }
            public bool LastGetTextSingleChapter { get; private set; }
            public bool LastGetTextDoMapIn { get; private set; }

            public override string GetText(VerseRef vref, bool singleChapter, bool doMapIn)
            {
                LastGetTextVerseRef = vref;
                LastGetTextSingleChapter = singleChapter;
                LastGetTextDoMapIn = doMapIn;
                return _cannedText;
            }
        }
    }
}
