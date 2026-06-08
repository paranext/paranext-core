using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using Paranext.DataProvider.BackupRestore;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.BackupRestore
{
    // === TEST SCOPE ===
    // CAP-024 INNER unit tests for the static
    // `CompareSourceContentResolver.Resolve` service. Outside-In TDD: these
    // tests pin the resolver's token-parse + branch-by-side dispatch in
    // isolation — no wire layer, no PapiTestBase, no JSON-RPC machinery.
    // The outer wire tests
    // (BackupRestoreDataProviderTests.GetCompareSourceContent.cs) cover the
    // session-lookup / destination-lookup orchestration above this layer.
    //
    // Service responsibilities (per backend-alignment.md §CAP-024 +
    // strategic-plan-backend.md §CAP-024):
    //   (A) Parse sourceToken — format:
    //       `(tok-src-|tok-dst-){sessionId(12-hex)}-{fileName}`.
    //       Anything else → Error(INVALID_TOKEN).
    //       sessionId portion must match session.SessionId
    //       → mismatch → Error(INVALID_TOKEN).
    //   (B) Validate verseRef.BookNum > 0
    //       → BookNum == 0 → Error(INVALID_VERSE_REF).
    //   (C) Branch by token prefix:
    //       - tok-src-* → call session.Restorer.ReadFileText(fileName, vref,
    //         singleChapter). IOException → Error(IO_ERROR). Empty string →
    //         Success("") (NOT IO_ERROR).
    //       - tok-dst-* → call destinationProject.GetText(vref, singleChapter,
    //         doMapIn: false). null destination → Error(IO_ERROR). IOException
    //         → Error(IO_ERROR).
    //
    // INV-C01 (read-only): structurally enforced — Resolve's signature does
    //   not accept any writer; the body never invokes a writer on either
    //   collaborator.
    //
    // RED-state expectation: every test fails because
    // CompareSourceContentResolver.Resolve throws
    // NotImplementedException("CAP-024 RED").

    /// <summary>
    /// CAP-024 unit tests for
    /// <see cref="CompareSourceContentResolver.Resolve"/>. Pure static-service
    /// tests — no PapiTestBase, no fixture state beyond per-test arrange.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class CompareSourceContentResolverTests
    {
        // Fixed 12-hex session id used across all tests. Keeps the token format
        // assertions byte-identical and lets the "session mismatch" test use a
        // visibly-different 12-hex id without random collision risk.
        private const string SESSION_ID = "0123456789ab";
        private const string OTHER_SESSION_ID = "cafebabefeed";
        private const string FILE_NAME = "01GENResolverProj.SFM";
        private const string CHAPTER_TEXT = "\\c 3\n\\p\n\\v 1 In the beginning of the test.\n";
        private const string BOOK_TEXT =
            "\\id GEN\n\\c 1\n\\v 1 .\n\\c 2\n\\v 1 .\n\\c 3\n\\v 1 .\n";
        private const string DEST_CHAPTER_TEXT = "\\c 3\n\\p\n\\v 1 Destination canned text.\n";

        // =====================================================================
        // OUTER acceptance: tok-src-* happy path returns Success with backup text
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Property("InvariantId", "INV-C01")]
        [Description(
            "Resolver happy path (backup side): tok-src-* token resolves to the chapter text the IRestorerHandle.ReadFileText returns."
        )]
        public void Resolve_BackupSideChapter_ReturnsSuccessWithText()
        {
            // Arrange
            var handle = new ResolverFakeHandle { ChapterText = CHAPTER_TEXT };
            var session = NewSession(handle);
            string token = $"tok-src-{SESSION_ID}-{FILE_NAME}";
            var vref = new VerseRef("GEN", "3", "0", ScrVers.English);

            // Act
            GetCompareSourceContentResult result = CompareSourceContentResolver.Resolve(
                session,
                destinationProject: null,
                sourceToken: token,
                verseRef: vref,
                singleChapter: true
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Success>());
            var success = (GetCompareSourceContentResult.Success)result;
            Assert.That(success.Text, Is.EqualTo(CHAPTER_TEXT));
            // Forwarding sanity: the resolver invoked ReadFileText with the
            // parsed-out fileName and the original singleChapter flag.
            Assert.That(handle.LastReadFileName, Is.EqualTo(FILE_NAME));
            Assert.That(handle.LastReadSingleChapter, Is.True);
        }

        // =====================================================================
        // tok-src-* with singleChapter=false → whole-book text
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "data-contracts.md §4.7 postcondition: `singleChapter: false → whole-book content`. The resolver forwards SingleChapter through to the underlying read."
        )]
        public void Resolve_BackupSideWholeBook_ReturnsSuccessWithBookText()
        {
            // Arrange
            var handle = new ResolverFakeHandle { BookText = BOOK_TEXT };
            var session = NewSession(handle);
            string token = $"tok-src-{SESSION_ID}-{FILE_NAME}";

            // Act
            GetCompareSourceContentResult result = CompareSourceContentResolver.Resolve(
                session,
                destinationProject: null,
                sourceToken: token,
                verseRef: new VerseRef("GEN", "0", "0", ScrVers.English),
                singleChapter: false
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Success>());
            Assert.That(
                ((GetCompareSourceContentResult.Success)result).Text,
                Is.EqualTo(BOOK_TEXT)
            );
            Assert.That(
                handle.LastReadSingleChapter,
                Is.False,
                "Resolver forwards singleChapter=false through to ReadFileText"
            );
        }

        // =====================================================================
        // tok-dst-* with non-null destination → Success with destination text
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "Right-side resolution: tok-dst-* token resolves via destinationProject.GetText, NOT IRestorerHandle.ReadFileText. The resolver passes `doMapIn: false` (caller's verseRef already in destination versification)."
        )]
        public void Resolve_DestinationSide_NonNullDestination_ReturnsTextFromScrText()
        {
            // Arrange — backup-side fake returns a sentinel we'd notice if the
            // resolver took the wrong branch.
            var handle = new ResolverFakeHandle
            {
                ChapterText = "\\c 99 BACKUP-SHOULD-NOT-BE-CALLED-FOR-TOK-DST",
            };
            var session = NewSession(handle);
            var dest = new ResolverFakeScrText { CannedText = DEST_CHAPTER_TEXT };
            string token = $"tok-dst-{SESSION_ID}-{FILE_NAME}";

            // Act
            GetCompareSourceContentResult result = CompareSourceContentResolver.Resolve(
                session,
                destinationProject: dest,
                sourceToken: token,
                verseRef: new VerseRef("GEN", "3", "0", ScrVers.English),
                singleChapter: true
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Success>());
            Assert.That(
                ((GetCompareSourceContentResult.Success)result).Text,
                Is.EqualTo(DEST_CHAPTER_TEXT)
            );
            Assert.That(
                handle.LastReadFileName,
                Is.Null,
                "Backup-side IRestorerHandle.ReadFileText must NOT be invoked for a tok-dst-* token"
            );
            Assert.That(
                dest.LastSingleChapter,
                Is.True,
                "Resolver forwards SingleChapter=true through to ScrText.GetText"
            );
            Assert.That(
                dest.LastDoMapIn,
                Is.False,
                "Resolver passes doMapIn: false to ScrText.GetText (caller's verseRef already in destination versification)"
            );
        }

        // =====================================================================
        // tok-dst-* with null destination → IO_ERROR
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "Right-side IO_ERROR: a tok-dst-* token paired with a null destinationProject (e.g., LocalParatextProjects returned null for the backup's ProjectGuid) → IO_ERROR. The token itself is well-formed; the destination read simply cannot complete."
        )]
        public void Resolve_DestinationSide_NullDestination_ReturnsIoError()
        {
            // Arrange
            var handle = new ResolverFakeHandle();
            var session = NewSession(handle);
            string token = $"tok-dst-{SESSION_ID}-{FILE_NAME}";

            // Act
            GetCompareSourceContentResult result = CompareSourceContentResolver.Resolve(
                session,
                destinationProject: null,
                sourceToken: token,
                verseRef: new VerseRef("GEN", "3", "0", ScrVers.English),
                singleChapter: true
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Error>());
            var err = (GetCompareSourceContentResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(GetCompareSourceContentErrorCode.IoError));
            Assert.That(err.ErrorKey, Is.EqualTo("%compare_sourceIoError%"));
        }

        // =====================================================================
        // Empty chapter → Success("") (NOT IO_ERROR)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "data-contracts.md §4.7: empty chapter is a valid Success result — caller renders blank pane. Resolver does NOT treat empty backup text as IO_ERROR."
        )]
        public void Resolve_BackupSideEmptyChapter_ReturnsSuccessWithEmptyText()
        {
            // Arrange
            var handle = new ResolverFakeHandle { ChapterText = string.Empty };
            var session = NewSession(handle);
            string token = $"tok-src-{SESSION_ID}-{FILE_NAME}";

            // Act
            GetCompareSourceContentResult result = CompareSourceContentResolver.Resolve(
                session,
                destinationProject: null,
                sourceToken: token,
                verseRef: new VerseRef("GEN", "51", "0", ScrVers.English),
                singleChapter: true
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Success>());
            Assert.That(
                ((GetCompareSourceContentResult.Success)result).Text,
                Is.EqualTo(string.Empty),
                "Empty chapter is Success(text=\"\"), NOT IO_ERROR"
            );
        }

        // =====================================================================
        // INVALID_TOKEN — wrong prefix
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "Resolver token parser: token must start with `tok-src-` or `tok-dst-` — any other prefix returns INVALID_TOKEN."
        )]
        public void Resolve_TokenWithWrongPrefix_ReturnsInvalidTokenError()
        {
            // Arrange
            var handle = new ResolverFakeHandle();
            var session = NewSession(handle);

            // Act
            GetCompareSourceContentResult result = CompareSourceContentResolver.Resolve(
                session,
                destinationProject: null,
                sourceToken: "completely-bogus-token",
                verseRef: new VerseRef("GEN", "3", "0", ScrVers.English),
                singleChapter: true
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Error>());
            var err = (GetCompareSourceContentResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(GetCompareSourceContentErrorCode.InvalidToken));
            Assert.That(err.ErrorKey, Is.EqualTo("%compare_invalidSourceToken%"));
        }

        // =====================================================================
        // INVALID_TOKEN — session-id portion mismatch
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "Resolver token parser: the 12-hex segment between `tok-(src|dst)-` and the final `-` must match session.SessionId — mismatch returns INVALID_TOKEN."
        )]
        public void Resolve_TokenWithMismatchedSessionId_ReturnsInvalidTokenError()
        {
            // Arrange — session has SESSION_ID; token embeds OTHER_SESSION_ID.
            var handle = new ResolverFakeHandle();
            var session = NewSession(handle);
            string token = $"tok-src-{OTHER_SESSION_ID}-{FILE_NAME}";

            // Act
            GetCompareSourceContentResult result = CompareSourceContentResolver.Resolve(
                session,
                destinationProject: null,
                sourceToken: token,
                verseRef: new VerseRef("GEN", "3", "0", ScrVers.English),
                singleChapter: true
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Error>());
            Assert.That(
                ((GetCompareSourceContentResult.Error)result).ErrorCode,
                Is.EqualTo(GetCompareSourceContentErrorCode.InvalidToken)
            );
        }

        // =====================================================================
        // INVALID_TOKEN — short token (missing separator / fileName)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "Resolver token parser: tokens shorter than `tok-src-{12hex}-` are malformed — return INVALID_TOKEN. Guards against off-by-one parsing bugs."
        )]
        public void Resolve_TokenTooShort_ReturnsInvalidTokenError()
        {
            // Arrange — token has prefix + session id but NO trailing dash.
            var handle = new ResolverFakeHandle();
            var session = NewSession(handle);
            string token = $"tok-src-{SESSION_ID}";

            // Act
            GetCompareSourceContentResult result = CompareSourceContentResolver.Resolve(
                session,
                destinationProject: null,
                sourceToken: token,
                verseRef: new VerseRef("GEN", "3", "0", ScrVers.English),
                singleChapter: true
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Error>());
            Assert.That(
                ((GetCompareSourceContentResult.Error)result).ErrorCode,
                Is.EqualTo(GetCompareSourceContentErrorCode.InvalidToken)
            );
        }

        // =====================================================================
        // INVALID_TOKEN — empty string
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description("Resolver token parser: empty token returns INVALID_TOKEN (no prefix match).")]
        public void Resolve_EmptyToken_ReturnsInvalidTokenError()
        {
            // Arrange
            var handle = new ResolverFakeHandle();
            var session = NewSession(handle);

            // Act
            GetCompareSourceContentResult result = CompareSourceContentResolver.Resolve(
                session,
                destinationProject: null,
                sourceToken: string.Empty,
                verseRef: new VerseRef("GEN", "3", "0", ScrVers.English),
                singleChapter: true
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Error>());
            Assert.That(
                ((GetCompareSourceContentResult.Error)result).ErrorCode,
                Is.EqualTo(GetCompareSourceContentErrorCode.InvalidToken)
            );
        }

        // =====================================================================
        // INVALID_VERSE_REF — BookNum == 0
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "Resolver verseRef gate: verseRef.BookNum == 0 (unknown book id) returns INVALID_VERSE_REF. Token is still well-formed; verseRef is the issue."
        )]
        public void Resolve_UnknownBookNum_ReturnsInvalidVerseRefError()
        {
            // Arrange — well-formed tok-src-* token, but a default VerseRef
            // (BookNum 0).
            var handle = new ResolverFakeHandle { ChapterText = CHAPTER_TEXT };
            var session = NewSession(handle);
            string token = $"tok-src-{SESSION_ID}-{FILE_NAME}";

            var badVref = new VerseRef();
            Assert.That(badVref.BookNum, Is.EqualTo(0), "Precondition");

            // Act
            GetCompareSourceContentResult result = CompareSourceContentResolver.Resolve(
                session,
                destinationProject: null,
                sourceToken: token,
                verseRef: badVref,
                singleChapter: true
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Error>());
            var err = (GetCompareSourceContentResult.Error)result;
            Assert.That(
                err.ErrorCode,
                Is.EqualTo(GetCompareSourceContentErrorCode.InvalidVerseRef)
            );
            Assert.That(err.ErrorKey, Is.EqualTo("%compare_invalidVerseRef%"));
            Assert.That(
                handle.LastReadFileName,
                Is.Null,
                "Resolver short-circuits on bad verseRef BEFORE calling ReadFileText"
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
            "Resolver catches IOException from IRestorerHandle.ReadFileText and projects to Error(IO_ERROR, %compare_sourceIoError%)."
        )]
        public void Resolve_BackupSideReadThrowsIoException_ReturnsIoErrorEnvelope()
        {
            // Arrange
            var handle = new ResolverFakeHandle
            {
                ReadException = new IOException("Simulated ZIP read failure"),
            };
            var session = NewSession(handle);
            string token = $"tok-src-{SESSION_ID}-{FILE_NAME}";

            // Act
            GetCompareSourceContentResult result = CompareSourceContentResolver.Resolve(
                session,
                destinationProject: null,
                sourceToken: token,
                verseRef: new VerseRef("GEN", "3", "0", ScrVers.English),
                singleChapter: true
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Error>());
            var err = (GetCompareSourceContentResult.Error)result;
            Assert.That(err.ErrorCode, Is.EqualTo(GetCompareSourceContentErrorCode.IoError));
            Assert.That(err.ErrorKey, Is.EqualTo("%compare_sourceIoError%"));
        }

        // =====================================================================
        // tok-dst-* IO_ERROR — destination ScrText.GetText throws IOException
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Description(
            "Resolver catches IOException from destination ScrText.GetText and projects to Error(IO_ERROR). Mirrors the backup-side IO_ERROR path."
        )]
        public void Resolve_DestinationSideReadThrowsIoException_ReturnsIoErrorEnvelope()
        {
            // Arrange
            var handle = new ResolverFakeHandle();
            var session = NewSession(handle);
            var dest = new ResolverFakeScrText
            {
                GetTextException = new IOException("Simulated destination read failure"),
            };
            string token = $"tok-dst-{SESSION_ID}-{FILE_NAME}";

            // Act
            GetCompareSourceContentResult result = CompareSourceContentResolver.Resolve(
                session,
                destinationProject: dest,
                sourceToken: token,
                verseRef: new VerseRef("GEN", "3", "0", ScrVers.English),
                singleChapter: true
            );

            // Assert
            Assert.That(result, Is.InstanceOf<GetCompareSourceContentResult.Error>());
            Assert.That(
                ((GetCompareSourceContentResult.Error)result).ErrorCode,
                Is.EqualTo(GetCompareSourceContentErrorCode.IoError)
            );
        }

        // =====================================================================
        // INV-C01 read-only — repeated Resolve calls are idempotent
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-024")]
        [Property("BehaviorId", "BHV-500")]
        [Property("InvariantId", "INV-C01")]
        [Description(
            "INV-C01 (read-only): repeated Resolve calls with identical inputs produce identical Success results — no state mutation in the resolver."
        )]
        public void Resolve_RepeatedCalls_ProduceIdenticalResults()
        {
            // Arrange
            var handle = new ResolverFakeHandle { ChapterText = CHAPTER_TEXT };
            var session = NewSession(handle);
            string token = $"tok-src-{SESSION_ID}-{FILE_NAME}";
            var vref = new VerseRef("GEN", "3", "0", ScrVers.English);

            // Act
            GetCompareSourceContentResult first = CompareSourceContentResolver.Resolve(
                session,
                destinationProject: null,
                sourceToken: token,
                verseRef: vref,
                singleChapter: true
            );
            GetCompareSourceContentResult second = CompareSourceContentResolver.Resolve(
                session,
                destinationProject: null,
                sourceToken: token,
                verseRef: vref,
                singleChapter: true
            );

            // Assert
            Assert.That(first, Is.InstanceOf<GetCompareSourceContentResult.Success>());
            Assert.That(second, Is.InstanceOf<GetCompareSourceContentResult.Success>());
            var firstSuccess = (GetCompareSourceContentResult.Success)first;
            var secondSuccess = (GetCompareSourceContentResult.Success)second;
            Assert.That(secondSuccess.Text, Is.EqualTo(firstSuccess.Text));
        }

        // =====================================================================
        // Helpers
        // =====================================================================

        /// <summary>
        /// Build a <see cref="RestoreSession"/> with the fixed
        /// <see cref="SESSION_ID"/> and the supplied
        /// <see cref="ResolverFakeHandle"/>. The metadata is bare — the
        /// resolver does not read it.
        /// </summary>
        private static RestoreSession NewSession(ResolverFakeHandle handle)
        {
            return new RestoreSession(SESSION_ID, handle, new RestorerMetadata());
        }

        /// <summary>
        /// Fake <see cref="IRestorerHandle"/> for resolver unit tests. Records
        /// the parameters of the last <see cref="ReadFileText"/> call and
        /// returns canned text (or throws when configured).
        /// </summary>
        private sealed class ResolverFakeHandle : IRestorerHandle
        {
            public string ChapterText { get; set; } = string.Empty;
            public string BookText { get; set; } = string.Empty;
            public Exception? ReadException { get; set; }

            public string? LastReadFileName { get; private set; }
            public VerseRef LastReadVerseRef { get; private set; }
            public bool? LastReadSingleChapter { get; private set; }

            public RestorerMetadata BuildMetadata(string? preferredDestinationProjectId) =>
                new RestorerMetadata();

            public RestoreOverlayOutcome PerformOverlayRestore(
                ScrText destination,
                RestoreOverlayRequest request
            )
            {
                _ = destination;
                _ = request;
                throw new NotSupportedException(
                    "ResolverFakeHandle does not implement PerformOverlayRestore."
                );
            }

            public string ReadFileText(string fileName, VerseRef verseRef, bool singleChapter)
            {
                LastReadFileName = fileName;
                LastReadVerseRef = verseRef;
                LastReadSingleChapter = singleChapter;
                if (ReadException is not null)
                    throw ReadException;
                return singleChapter ? ChapterText : BookText;
            }

            public void Dispose() { }
        }

        /// <summary>
        /// <see cref="DummyScrText"/> subclass with caller-controlled
        /// <see cref="ScrText.GetText(VerseRef, bool, bool)"/> behavior — returns
        /// canned text or throws <see cref="GetTextException"/> when set. Used by
        /// the destination-side resolver tests.
        /// </summary>
        private sealed class ResolverFakeScrText : DummyScrText
        {
            public string CannedText { get; set; } = string.Empty;
            public Exception? GetTextException { get; set; }

            public VerseRef LastVerseRef { get; private set; }
            public bool LastSingleChapter { get; private set; }
            public bool LastDoMapIn { get; private set; }

            public override string GetText(VerseRef vref, bool singleChapter, bool doMapIn)
            {
                LastVerseRef = vref;
                LastSingleChapter = singleChapter;
                LastDoMapIn = doMapIn;
                if (GetTextException is not null)
                    throw GetTextException;
                return CannedText;
            }
        }
    }
}
