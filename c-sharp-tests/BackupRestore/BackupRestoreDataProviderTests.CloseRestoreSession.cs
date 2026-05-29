using System;
using System.IO;
using System.IO.Compression;
using System.Threading.Tasks;
using Paranext.DataProvider.BackupRestore;

namespace TestParanextDataProvider.BackupRestore
{
    // === TEST SCOPE ===
    // CAP-011 OUTER acceptance tests for `CloseRestoreSessionAsync` (M-010) on
    // the wire-facade `BackupRestoreDataProvider`. Outside-In TDD: the OUTER
    // test pins the wire envelope contract (data-contracts.md §4.10); the
    // registry-level invariants (INV-REGISTRY-DISPOSE-SAFETY,
    // INV-REGISTRY-IDEMPOTENT-CLOSE) are CAP-003-owned and re-asserted in
    // RestoreSessionRegistryTests.cs.
    //
    // Wire-layer responsibilities (per data-contracts.md §4.10):
    //   (1) Always return CloseRestoreSessionResult.Success — no preconditions,
    //       no error matrix. The contract is idempotent.
    //   (2) Delegate to SessionRegistry.Close — the registry handles dispose
    //       and entry removal; CAP-003 INV-REGISTRY-DISPOSE-SAFETY guarantees
    //       the entry is removed even if Restorer.Dispose() throws.
    //   (3) Single-session scope — closing one session must not affect any
    //       other live session.
    //
    // Test seam: BackupRestoreDataProvider.RestorerFactoryOverride (CAP-003).
    // Tests seed sessions by calling OpenRestoreSessionAsync with a fake
    // Restorer factory, then call CloseRestoreSessionAsync to verify the
    // wire-envelope contract + dispose + registry eviction.
    //
    // RED-state expectation: every test fails because
    // BackupRestoreDataProvider.CloseRestoreSessionAsync throws
    // NotImplementedException("CAP-011 RED").

    internal partial class BackupRestoreDataProviderTests
    {
        // =====================================================================
        // OUTER ACCEPTANCE TEST — must pass for CAP-011 to be considered done.
        // =====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-652")]
        [Property("ScenarioId", "TS-108")]
        [Description(
            "Per strategic-plan-backend.md §CAP-011 acceptance test: closeRestoreSession({sessionId}) on a live session returns Success, disposes the Restorer exactly once, and removes the registry entry"
        )]
        public async Task CloseRestoreSession_ExistingSession_ReturnsSuccessAndDisposesAndRemovesFromRegistry()
        {
            // Arrange — open a session via CAP-003 (GREEN) so we have a real
            // entry in the registry pointing at a tracked FakeRestorerHandle.
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "close-existing.zip"));
            var fakeRestorer = new FakeRestorerHandle(MakeBareMetadata(zipPath));
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            RestoreSessionResult openResult = await _provider.OpenRestoreSessionAsync(
                new OpenRestoreSessionRequest { ZipPath = zipPath }
            );
            var openSuccess = (RestoreSessionResult.Success)openResult;
            string sessionId = openSuccess.SessionId;
            Assert.That(
                _provider.SessionRegistry.Count,
                Is.EqualTo(1),
                "Pre-condition: session is registered before close"
            );
            Assert.That(
                fakeRestorer.DisposeCount,
                Is.EqualTo(0),
                "Pre-condition: Restorer has not been disposed yet"
            );

            // Act — call the wire-layer close method (CAP-011 RED — throws)
            CloseRestoreSessionResult result = await _provider.CloseRestoreSessionAsync(
                new CloseRestoreSessionRequest { SessionId = sessionId }
            );

            // Assert — Success envelope + Restorer disposed + registry empty
            Assert.That(
                result,
                Is.InstanceOf<CloseRestoreSessionResult.Success>(),
                "Wire layer returns Success envelope for an existing session"
            );
            Assert.That(
                fakeRestorer.DisposeCount,
                Is.EqualTo(1),
                "Restorer.Dispose() invoked exactly once during close"
            );
            Assert.That(
                _provider.SessionRegistry.Count,
                Is.EqualTo(0),
                "Registry entry removed after successful close"
            );
            Assert.That(
                _provider.SessionRegistry.Get(sessionId),
                Is.Null,
                "Registry.Get returns null for the closed session id"
            );
        }

        // =====================================================================
        // Idempotency — unknown sessionId (TS-108 edge case "unknown session")
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-652")]
        [Description(
            "Unknown sessionId → Success (no-op idempotent) per data-contracts.md §4.10 'sessionId may be a stale, already-closed, or never-issued handle'"
        )]
        public async Task CloseRestoreSession_UnknownSessionId_ReturnsSuccessNoSideEffects()
        {
            // Arrange — open a real session so we can verify the close call
            // for the UNKNOWN id does not accidentally evict the real one.
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "close-unknown.zip"));
            var realRestorer = new FakeRestorerHandle(MakeBareMetadata(zipPath));
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => realRestorer;

            RestoreSessionResult openResult = await _provider.OpenRestoreSessionAsync(
                new OpenRestoreSessionRequest { ZipPath = zipPath }
            );
            var openSuccess = (RestoreSessionResult.Success)openResult;
            string realSessionId = openSuccess.SessionId;

            // Act — close a NEVER-ISSUED session id
            CloseRestoreSessionResult result = await _provider.CloseRestoreSessionAsync(
                new CloseRestoreSessionRequest { SessionId = "ffffffffffff" }
            );

            // Assert — Success envelope + no side effects on the real session
            Assert.That(
                result,
                Is.InstanceOf<CloseRestoreSessionResult.Success>(),
                "Wire layer returns Success envelope even for unknown sessionId"
            );
            Assert.That(
                realRestorer.DisposeCount,
                Is.EqualTo(0),
                "Real session's Restorer is NOT disposed by an unknown-id close"
            );
            Assert.That(
                _provider.SessionRegistry.Count,
                Is.EqualTo(1),
                "Real session remains in the registry after an unknown-id close"
            );
            Assert.That(
                _provider.SessionRegistry.Get(realSessionId),
                Is.Not.Null,
                "Real session is still retrievable by its id"
            );
        }

        // =====================================================================
        // Idempotency — double-close (TS-108 edge case "already closed")
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-652")]
        [Description(
            "Double-close on the same sessionId: both calls return Success; Restorer.Dispose() runs exactly ONCE (the second close is a no-op because the registry already evicted the entry on the first close)"
        )]
        public async Task CloseRestoreSession_DoubleClose_ReturnsSuccessOnSecondCallAndDisposeCalledOnce()
        {
            // Arrange — open a session, then close it once.
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "close-double.zip"));
            var fakeRestorer = new FakeRestorerHandle(MakeBareMetadata(zipPath));
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => fakeRestorer;

            RestoreSessionResult openResult = await _provider.OpenRestoreSessionAsync(
                new OpenRestoreSessionRequest { ZipPath = zipPath }
            );
            var openSuccess = (RestoreSessionResult.Success)openResult;
            string sessionId = openSuccess.SessionId;

            // Act — close twice
            CloseRestoreSessionResult firstClose = await _provider.CloseRestoreSessionAsync(
                new CloseRestoreSessionRequest { SessionId = sessionId }
            );
            CloseRestoreSessionResult secondClose = await _provider.CloseRestoreSessionAsync(
                new CloseRestoreSessionRequest { SessionId = sessionId }
            );

            // Assert — both Success envelopes; Dispose called exactly once total
            Assert.That(
                firstClose,
                Is.InstanceOf<CloseRestoreSessionResult.Success>(),
                "First close returns Success"
            );
            Assert.That(
                secondClose,
                Is.InstanceOf<CloseRestoreSessionResult.Success>(),
                "Second close returns Success (idempotent — data-contracts.md §4.10)"
            );
            Assert.That(
                fakeRestorer.DisposeCount,
                Is.EqualTo(1),
                "Restorer.Dispose() called exactly once across two close calls (registry evicted the entry on first close)"
            );
            Assert.That(
                _provider.SessionRegistry.Count,
                Is.EqualTo(0),
                "Registry empty after double-close"
            );
        }

        // =====================================================================
        // Idempotency — empty sessionId (wire-stability edge case)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-652")]
        [Description(
            "Empty sessionId → Success (no preconditions per data-contracts.md §4.10). The wire layer must not validate; the registry's TryRemove for an empty key returns false; the wire result is still Success."
        )]
        public async Task CloseRestoreSession_EmptySessionId_ReturnsSuccess()
        {
            // Arrange — pre-existing live session must remain untouched.
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "close-empty.zip"));
            var realRestorer = new FakeRestorerHandle(MakeBareMetadata(zipPath));
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => realRestorer;

            RestoreSessionResult openResult = await _provider.OpenRestoreSessionAsync(
                new OpenRestoreSessionRequest { ZipPath = zipPath }
            );
            _ = (RestoreSessionResult.Success)openResult;

            // Act — close with empty sessionId
            CloseRestoreSessionResult result = await _provider.CloseRestoreSessionAsync(
                new CloseRestoreSessionRequest { SessionId = string.Empty }
            );

            // Assert
            Assert.That(
                result,
                Is.InstanceOf<CloseRestoreSessionResult.Success>(),
                "Empty sessionId returns Success — data-contracts.md §4.10 'Preconditions: None'"
            );
            Assert.That(
                realRestorer.DisposeCount,
                Is.EqualTo(0),
                "Real session's Restorer is NOT disposed by an empty-id close"
            );
            Assert.That(
                _provider.SessionRegistry.Count,
                Is.EqualTo(1),
                "Real session remains in the registry after empty-id close"
            );
        }

        // =====================================================================
        // INV-REGISTRY-DISPOSE-SAFETY relay — Dispose throws, wire still Success
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-652")]
        [Description(
            "Edge case from strategic-plan-backend.md §CAP-011: 'session whose Restorer.Dispose() throws → still removed from registry (registry-eviction is best-effort)'. The wire layer relies on CAP-003 INV-REGISTRY-DISPOSE-SAFETY and MUST return Success — the Dispose exception must not propagate across the wire boundary."
        )]
        public async Task CloseRestoreSession_DisposeThrows_StillReturnsSuccessAndRemovesEntry()
        {
            // Arrange — seed a session whose Restorer throws on Dispose.
            string zipPath = WriteEmptyZip(Path.Combine(_testTempDir, "close-dispose-throws.zip"));
            var throwingRestorer = new ThrowingFakeRestorerHandle(MakeBareMetadata(zipPath));
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => throwingRestorer;

            RestoreSessionResult openResult = await _provider.OpenRestoreSessionAsync(
                new OpenRestoreSessionRequest { ZipPath = zipPath }
            );
            var openSuccess = (RestoreSessionResult.Success)openResult;
            string sessionId = openSuccess.SessionId;

            // Act
            CloseRestoreSessionResult result = await _provider.CloseRestoreSessionAsync(
                new CloseRestoreSessionRequest { SessionId = sessionId }
            );

            // Assert — Success envelope despite Dispose throwing; entry gone.
            Assert.That(
                result,
                Is.InstanceOf<CloseRestoreSessionResult.Success>(),
                "Wire layer returns Success even when Restorer.Dispose() throws (CAP-003 INV-REGISTRY-DISPOSE-SAFETY swallows the exception inside the registry)"
            );
            Assert.That(
                throwingRestorer.DisposeAttempts,
                Is.EqualTo(1),
                "Dispose was attempted exactly once before the throw"
            );
            Assert.That(
                _provider.SessionRegistry.Count,
                Is.EqualTo(0),
                "Registry entry removed even though Dispose threw (TryRemove-before-Dispose ordering)"
            );
        }

        // =====================================================================
        // Single-session scope — other sessions unaffected
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-652")]
        [Description(
            "Closing one session does not affect any other live session — pins single-session scope. Two independent sessions open; close only the first; second session remains intact in the registry with DisposeCount == 0."
        )]
        public async Task CloseRestoreSession_OnlyClosesRequestedSession_OtherSessionsUnaffected()
        {
            // Arrange — open two sessions with two independent FakeRestorerHandles.
            string zipPathA = WriteEmptyZip(Path.Combine(_testTempDir, "close-scope-a.zip"));
            string zipPathB = WriteEmptyZip(Path.Combine(_testTempDir, "close-scope-b.zip"));
            var restorerA = new FakeRestorerHandle(MakeBareMetadata(zipPathA));
            var restorerB = new FakeRestorerHandle(MakeBareMetadata(zipPathB));

            // Sequential opens: set the factory just before each call so we can
            // hand out different handles per session without coupling to the
            // factory invocation order.
            BackupRestoreDataProvider.RestorerFactoryOverride = _ => restorerA;
            var openA = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPathA }
                );

            BackupRestoreDataProvider.RestorerFactoryOverride = _ => restorerB;
            var openB = (RestoreSessionResult.Success)
                await _provider.OpenRestoreSessionAsync(
                    new OpenRestoreSessionRequest { ZipPath = zipPathB }
                );

            Assert.That(
                _provider.SessionRegistry.Count,
                Is.EqualTo(2),
                "Pre-condition: two sessions registered"
            );

            // Act — close only session A
            CloseRestoreSessionResult result = await _provider.CloseRestoreSessionAsync(
                new CloseRestoreSessionRequest { SessionId = openA.SessionId }
            );

            // Assert — A disposed and gone; B untouched.
            Assert.That(result, Is.InstanceOf<CloseRestoreSessionResult.Success>());
            Assert.That(restorerA.DisposeCount, Is.EqualTo(1), "Session A's Restorer disposed");
            Assert.That(
                restorerB.DisposeCount,
                Is.EqualTo(0),
                "Session B's Restorer NOT disposed — single-session scope"
            );
            Assert.That(
                _provider.SessionRegistry.Count,
                Is.EqualTo(1),
                "Only one session remains in registry"
            );
            Assert.That(
                _provider.SessionRegistry.Get(openA.SessionId),
                Is.Null,
                "Session A no longer retrievable"
            );
            Assert.That(
                _provider.SessionRegistry.Get(openB.SessionId),
                Is.Not.Null,
                "Session B still retrievable"
            );
        }

        // =====================================================================
        // Helpers (CloseRestoreSession test-only)
        // =====================================================================

        /// <summary>
        /// Fake IRestorerHandle whose <see cref="Dispose"/> always throws.
        /// Used by the CAP-011 INV-REGISTRY-DISPOSE-SAFETY relay test to
        /// verify the wire layer still returns Success even when the
        /// underlying Restorer's Dispose throws (CAP-003 owns the
        /// TryRemove-before-Dispose-and-catch ordering inside the registry).
        /// </summary>
        private sealed class ThrowingFakeRestorerHandle : IRestorerHandle
        {
            private readonly RestorerMetadata _metadata;
            private int _disposeAttempts;

            public ThrowingFakeRestorerHandle(RestorerMetadata metadata)
            {
                _metadata = metadata;
            }

            public int DisposeAttempts => _disposeAttempts;

            public RestorerMetadata BuildMetadata(string? preferredDestinationProjectId) =>
                _metadata;

            public void Dispose()
            {
                _disposeAttempts++;
                throw new InvalidOperationException(
                    "CAP-011 test: simulated Restorer.Dispose() failure to exercise INV-REGISTRY-DISPOSE-SAFETY"
                );
            }
        }
    }
}
