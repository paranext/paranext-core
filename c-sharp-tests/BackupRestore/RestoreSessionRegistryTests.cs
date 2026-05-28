using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Paranext.DataProvider.BackupRestore;

namespace TestParanextDataProvider.BackupRestore
{
    // === TEST SCOPE ===
    // CAP-003 inner unit tests of `RestoreSessionRegistry` — the
    // ConcurrentDictionary-backed Worker that tracks live restore sessions for
    // the data provider. Pure in-memory behavior — no PAPI / no ScrTextCollection /
    // no SharpZipLib. Fake IDisposable / fake IRestorerHandle stand in for the
    // real Restorer port (which is not yet ported in PT10 — see
    // BackupRestoreDataProvider.RestoreSession.cs header for rationale).
    //
    // Invariants pinned (per CAP-003 strategic plan success criteria):
    //   INV-REGISTRY-UNIQUE          — Open returns a distinct sessionId for every
    //                                  concurrent call (200-element parallel loop)
    //   INV-REGISTRY-FORMAT          — sessionId is a 12-char lowercase hex string
    //   INV-REGISTRY-DISPOSE-SAFETY  — Close removes the entry from the dict even
    //                                  if the underlying Restorer's Dispose throws
    //   INV-REGISTRY-IDEMPOTENT-CLOSE— Close on an unknown id is a no-op;
    //                                  Close on the same id twice returns false
    //                                  the second time
    //
    // RED-state expectation: every test fails because RestoreSessionRegistry's
    // public methods throw NotImplementedException (see RestoreSessionRegistry.cs).

    /// <summary>
    /// CAP-003 unit tests for <see cref="RestoreSessionRegistry"/> — the
    /// concurrent-dict-backed Worker that tracks live restore sessions across
    /// JSON-RPC calls. Does NOT inherit <c>PapiTestBase</c> — registry tests have
    /// no PAPI / ScrTextCollection dependencies.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class RestoreSessionRegistryTests
    {
        private RestoreSessionRegistry _registry = null!;

        [SetUp]
        public void SetUp()
        {
            _registry = new RestoreSessionRegistry();
        }

        // =====================================================================
        // Group A — Open: id generation + insertion semantics
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-104")]
        [Description(
            "Registry.Open returns a non-empty sessionId per the data-contracts.md §3.2 RestoreSessionResult.Success contract"
        )]
        public void Open_ReturnsNonEmptySessionId()
        {
            // Arrange — fake IDisposable Restorer + minimal metadata
            var restorer = new FakeRestorer();
            var metadata = MakeMetadata("/tmp/test.zip");

            // Act
            string sessionId = _registry.Open(restorer, metadata);

            // Assert
            Assert.That(sessionId, Is.Not.Null);
            Assert.That(sessionId, Is.Not.Empty, "sessionId must be non-empty");
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-104")]
        [Property("InvariantId", "INV-REGISTRY-FORMAT")]
        [Description(
            "Registry.Open's sessionId is exactly 12 lowercase hex characters — strategic-plan-backend.md §CAP-003 success criterion (\"session ID format is a 12-char hex string\")"
        )]
        public void SessionId_Format_Is12CharLowercaseHex()
        {
            // Arrange
            var restorer = new FakeRestorer();
            var metadata = MakeMetadata("/tmp/test.zip");

            // Act
            string sessionId = _registry.Open(restorer, metadata);

            // Assert — must be 12 chars, lowercase hex
            Assert.That(sessionId.Length, Is.EqualTo(12), "12-char hex sessionId");
            Assert.That(
                Regex.IsMatch(sessionId, "^[0-9a-f]{12}$"),
                Is.True,
                $"sessionId must match ^[0-9a-f]{{12}}$ but was '{sessionId}'"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-104")]
        [Description(
            "Registry.Open stores the session keyed by the returned sessionId — subsequent Get(returnedId) retrieves the same session"
        )]
        public void Open_StoresSessionInDictKeyedBySessionId()
        {
            // Arrange
            var restorer = new FakeRestorer();
            var metadata = MakeMetadata("/tmp/test.zip");

            // Act
            string sessionId = _registry.Open(restorer, metadata);
            RestoreSession? session = _registry.Get(sessionId);

            // Assert
            Assert.That(session, Is.Not.Null, "Get(returnedId) must find the session");
            Assert.That(
                session!.SessionId,
                Is.EqualTo(sessionId),
                "Session.SessionId echoes the registry-minted id"
            );
            Assert.That(
                session.Metadata,
                Is.SameAs(metadata),
                "Session.Metadata is the same instance passed in"
            );
        }

        // =====================================================================
        // Group B — Concurrent uniqueness (INV-REGISTRY-UNIQUE)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Category("Concurrency")]
        [Property("CapabilityId", "CAP-003")]
        [Property("InvariantId", "INV-REGISTRY-UNIQUE")]
        [Description(
            "200 concurrent Open calls each produce a distinct sessionId — strategic-plan-backend.md §CAP-003 success criterion (\"RestoreSessionRegistry concurrent open + close test passes\")"
        )]
        public void Open_GeneratesDistinctSessionIds_AcrossConcurrentCalls()
        {
            // Arrange
            const int parallelOpens = 200;
            var ids = new ConcurrentBag<string>();

            // Act — 200 parallel Open calls
            Parallel.For(
                0,
                parallelOpens,
                _ =>
                {
                    var restorer = new FakeRestorer();
                    var metadata = MakeMetadata($"/tmp/concurrent.zip");
                    string sessionId = _registry.Open(restorer, metadata);
                    ids.Add(sessionId);
                }
            );

            // Assert — every id is unique
            var set = new HashSet<string>(ids);
            Assert.That(set.Count, Is.EqualTo(parallelOpens), "All 200 sessionIds must be unique");
            Assert.That(
                _registry.Count,
                Is.EqualTo(parallelOpens),
                "Registry Count tracks all 200 inserts"
            );
        }

        // =====================================================================
        // Group C — Get semantics
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-104")]
        [Description(
            "Get on an unknown sessionId returns null — the precondition that maps to the INVALID_SESSION error code at the wire layer"
        )]
        public void Get_UnknownSessionId_ReturnsNull()
        {
            // Arrange — registry has no sessions

            // Act
            RestoreSession? session = _registry.Get("000000000000");

            // Assert
            Assert.That(session, Is.Null, "Unknown sessionId returns null (TryGetValue miss)");
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-104")]
        [Description("Get after Close returns null — the closed session is no longer retrievable")]
        public void Get_AfterClose_ReturnsNull()
        {
            // Arrange
            var restorer = new FakeRestorer();
            var metadata = MakeMetadata("/tmp/test.zip");
            string sessionId = _registry.Open(restorer, metadata);

            // Act
            bool removed = _registry.Close(sessionId);
            RestoreSession? session = _registry.Get(sessionId);

            // Assert
            Assert.That(removed, Is.True, "Close returned true for the live session");
            Assert.That(session, Is.Null, "Get after Close returns null");
        }

        // =====================================================================
        // Group D — Close: removal + dispose semantics
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-104")]
        [Description(
            "Close removes the entry from the dict AND disposes the underlying Restorer — INV-RESTORER-DISPOSABLE per spec-004"
        )]
        public void Close_ExistingSession_RemovesEntryAndDisposesRestorer()
        {
            // Arrange
            var restorer = new FakeRestorer();
            var metadata = MakeMetadata("/tmp/test.zip");
            string sessionId = _registry.Open(restorer, metadata);
            Assert.That(_registry.Count, Is.EqualTo(1), "Pre-condition: one session registered");
            Assert.That(restorer.DisposeCount, Is.EqualTo(0), "Pre-condition: not disposed");

            // Act
            bool removed = _registry.Close(sessionId);

            // Assert
            Assert.That(removed, Is.True, "Close returns true for a live session");
            Assert.That(_registry.Count, Is.EqualTo(0), "Registry Count drops to 0");
            Assert.That(
                restorer.DisposeCount,
                Is.EqualTo(1),
                "Restorer.Dispose called exactly once"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-104")]
        [Property("InvariantId", "INV-REGISTRY-IDEMPOTENT-CLOSE")]
        [Description(
            "Close on an unknown sessionId returns false and has no side effects — idempotent contract"
        )]
        public void Close_UnknownSessionId_ReturnsFalseAndNoSideEffect()
        {
            // Arrange — registry has no sessions

            // Act
            bool removed = _registry.Close("ffffffffffff");

            // Assert
            Assert.That(removed, Is.False, "Close on unknown id returns false");
            Assert.That(_registry.Count, Is.EqualTo(0), "Count remains 0");
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-104")]
        [Property("InvariantId", "INV-REGISTRY-IDEMPOTENT-CLOSE")]
        [Description(
            "Calling Close twice on the same sessionId is idempotent — second call returns false, no second Dispose"
        )]
        public void Close_TwiceIsIdempotent()
        {
            // Arrange
            var restorer = new FakeRestorer();
            var metadata = MakeMetadata("/tmp/test.zip");
            string sessionId = _registry.Open(restorer, metadata);

            // Act
            bool firstClose = _registry.Close(sessionId);
            bool secondClose = _registry.Close(sessionId);

            // Assert
            Assert.That(firstClose, Is.True, "First Close removes the entry");
            Assert.That(secondClose, Is.False, "Second Close is a no-op");
            Assert.That(
                restorer.DisposeCount,
                Is.EqualTo(1),
                "Restorer.Dispose still called only once across the two Close calls"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-104")]
        [Property("InvariantId", "INV-REGISTRY-DISPOSE-SAFETY")]
        [Description(
            "If the Restorer's Dispose throws, Close MUST still remove the entry from the dict — strategic-plan-backend.md §CAP-003 success criterion (\"registry survives a Restorer.Dispose() failure without leaking the dict entry\")"
        )]
        public void Open_DisposeFailure_DoesNotLeakDictEntry()
        {
            // Arrange — Restorer.Dispose throws
            var restorer = new ThrowingFakeRestorer();
            var metadata = MakeMetadata("/tmp/throw.zip");
            string sessionId = _registry.Open(restorer, metadata);
            Assert.That(_registry.Count, Is.EqualTo(1), "Pre-condition: one session registered");

            // Act — Close MUST NOT propagate the dispose exception AND the entry
            // MUST still be removed
            Assert.DoesNotThrow(
                () => _registry.Close(sessionId),
                "Close swallows / does not propagate Dispose failures"
            );

            // Assert
            Assert.That(
                _registry.Count,
                Is.EqualTo(0),
                "Registry Count drops to 0 even when Dispose threw"
            );
            Assert.That(
                _registry.Get(sessionId),
                Is.Null,
                "Closed session is not retrievable after a dispose failure"
            );
            Assert.That(
                restorer.DisposeAttempted,
                Is.True,
                "Dispose was attempted (the exception is best-effort caught)"
            );
        }

        // =====================================================================
        // Group E — Count + concurrent Open/Close
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Description("Count tracks the current number of registered sessions")]
        public void Count_TracksOpenSessions()
        {
            Assert.That(_registry.Count, Is.EqualTo(0), "Empty registry");

            string id1 = _registry.Open(new FakeRestorer(), MakeMetadata("/tmp/a.zip"));
            string id2 = _registry.Open(new FakeRestorer(), MakeMetadata("/tmp/b.zip"));
            string id3 = _registry.Open(new FakeRestorer(), MakeMetadata("/tmp/c.zip"));
            Assert.That(_registry.Count, Is.EqualTo(3), "3 sessions after 3 Opens");

            _registry.Close(id2);
            Assert.That(_registry.Count, Is.EqualTo(2), "2 sessions after closing the middle one");

            _registry.Close(id1);
            _registry.Close(id3);
            Assert.That(_registry.Count, Is.EqualTo(0), "0 sessions after closing all");
        }

        [Test]
        [Category("Contract")]
        [Category("Concurrency")]
        [Property("CapabilityId", "CAP-003")]
        [Description(
            "Many parallel Open + Close calls leave the registry in a consistent state — strategic-plan-backend.md §CAP-003 success criterion (\"RestoreSessionRegistry concurrent open + close test passes\")"
        )]
        public void Open_ConcurrentOpensAndCloses_DoNotCorruptCount()
        {
            // Arrange — 100 parallel Opens followed by 100 parallel Closes
            const int n = 100;
            var ids = new ConcurrentBag<string>();

            // Act 1 — concurrent Opens
            Parallel.For(
                0,
                n,
                _ =>
                {
                    string id = _registry.Open(new FakeRestorer(), MakeMetadata("/tmp/x.zip"));
                    ids.Add(id);
                }
            );
            Assert.That(_registry.Count, Is.EqualTo(n), "After N opens, Count == N");

            // Act 2 — concurrent Closes of all opened ids
            var idArray = new string[ids.Count];
            int idx = 0;
            foreach (string id in ids)
                idArray[idx++] = id;

            Parallel.For(0, n, i => _registry.Close(idArray[i]));

            // Assert
            Assert.That(_registry.Count, Is.EqualTo(0), "After N closes, Count back to 0");
        }

        // =====================================================================
        // Helpers
        // =====================================================================

        private static RestorerMetadata MakeMetadata(string filePath)
        {
            return new RestorerMetadata
            {
                FilePath = filePath,
                Description = "test",
                ProjectName = "TEST",
                ProjectGuid = null,
                IsLegacyBackup = false,
                SharedProjectMarkers = false,
                AllFiles = Array.Empty<RestoreFileEntry>(),
                HasFigures = false,
            };
        }

        /// <summary>
        /// Minimal fake IDisposable Restorer for registry tests. Tracks
        /// Dispose-call count so tests can assert "called once" and "not called
        /// after second Close".
        /// </summary>
        private sealed class FakeRestorer : IDisposable
        {
            private int _disposeCount;
            public int DisposeCount => Interlocked.CompareExchange(ref _disposeCount, 0, 0);

            public void Dispose() => Interlocked.Increment(ref _disposeCount);
        }

        /// <summary>
        /// Fake IDisposable Restorer whose Dispose throws — used to pin the
        /// INV-REGISTRY-DISPOSE-SAFETY invariant (Close must still remove the
        /// entry when Dispose throws).
        /// </summary>
        private sealed class ThrowingFakeRestorer : IDisposable
        {
            public bool DisposeAttempted { get; private set; }

            public void Dispose()
            {
                DisposeAttempted = true;
                throw new InvalidOperationException("Simulated Dispose failure");
            }
        }
    }
}
