using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.BackupRestore;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.Users;
using PtxUtils;

namespace TestParanextDataProvider.BackupRestore
{
    /// <summary>
    /// Tests for <see cref="RestorePermissionGate.CheckAdminGate"/>
    /// (CAP-019 / EXT-203 / BHV-325 / INV-B05 / VAL-B05).
    ///
    /// One-line wrapper around <c>existingProject.Permissions.WarnIfNotAdministrator()</c>:
    /// <c>(ScrText existingProject) -> bool</c>.
    /// Returns <c>true</c> iff the current user is the project administrator (only role
    /// allowed to overlay-restore per ALIGNMENT-005 PO decision / CG-007).
    ///
    /// Specification sources:
    /// <list type="bullet">
    ///   <item>data-contracts.md §9 line 2267 (file table — RestorePermissionGate.cs)</item>
    ///   <item>data-contracts.md §8 line 251-257 (EXT-203 contract block)</item>
    ///   <item>implementation/backend-alignment.md §EXT-203 (line 251-257)</item>
    ///   <item>implementation/extraction-plan.md §EXT-203 (line 407-430)</item>
    ///   <item>characterization/test-scenarios.json TS-093 (non-admin → abort)</item>
    ///   <item>behavior-catalog.md §BHV-325 line 494-500 (cmdOK admin gate)</item>
    ///   <item>business-rules.md INV-B05 line 58 (admin required for overlay restore)</item>
    ///   <item>business-rules.md VAL-B05 line 99 (admin-permissible destination)</item>
    ///   <item>strategic-plan-backend.md §CAP-019 line 477-494 (acceptance + edge cases)</item>
    /// </list>
    ///
    /// PT9 source: <c>Paratext/BackupRestore/RestoreForm.cs:101-107</c> (RestoreForm.cmdOK_Click):
    /// <code>
    /// ScrText scrText = null;
    /// if (restorer.ScrTextDestination != null)
    ///     scrText = ScrTextCollection.GetById(restorer.ScrTextDestination.Guid);
    /// if (scrText != null &amp;&amp; !scrText.Permissions.WarnIfNotAdministrator())
    ///     return; // Project has an administrator and it is not the current user, so they cannot restore
    /// </code>
    ///
    /// PT9 call target: <c>Paratext/ParatextData/Users/PermissionManager.cs:788-798</c>
    /// (<c>PermissionManager.WarnIfNotAdministrator</c>):
    /// <code>
    /// public bool WarnIfNotAdministrator()
    /// {
    ///     if (!AmAdministrator)
    ///     {
    ///         Alert.Show(Localizer.Str("PermissionManager_13", "This is only available to administrators."),
    ///                    Localizer.Str("PermissionManager_14", "Paratext"),
    ///                    AlertButtons.Ok, AlertLevel.Warning);
    ///         return false;
    ///     }
    ///     return true;
    /// }
    /// </code>
    ///
    /// PT10 deltas vs PT9:
    /// <list type="bullet">
    ///   <item><b>PT10 DEFENSIVE-HARDENING DELTA</b>: <c>existingProject.Permissions</c> null →
    ///   returns <c>false</c>, does NOT crash. PT9 has no explicit null-check and would NRE.
    ///   See strategic-plan-backend.md §CAP-019 line 490: "scrText with null Permissions →
    ///   must not crash (defensive null-check); PT9 returns false in that case (parity)."</item>
    ///   <item><b>Alert.Show is a no-op in PT10 backend</b>: ParatextData's
    ///   <see cref="Alert.Implementation"/> defaults to a <c>NoAlert</c> no-op
    ///   (<c>PtxUtils/Alert.cs:104</c>), so the WinForms MessageBox PT9 shows in
    ///   <c>WarnIfNotAdministrator()</c> becomes invisible in NUnit tests AND in the PT10
    ///   headless data-provider process. The web view receives the user-facing message via
    ///   the M-003 caller path (<c>PERMISSION_DENIED</c> envelope; <c>%restore_adminRequired%</c>).</item>
    ///   <item><b>Destination-resolution lives in the caller</b>: PT9's
    ///   <c>ScrText scrText = ScrTextCollection.GetById(restorer.ScrTextDestination.Guid)</c>
    ///   (RestoreForm.cs:101-103) is owned by M-003 (<c>RestoreOrchestrator</c>) in PT10, not
    ///   by this gate. The gate takes the already-resolved <see cref="ScrText"/> as input.</item>
    /// </list>
    ///
    /// <para>
    /// <b>Test seam</b>: <see cref="ScrText.Permissions"/> is <c>virtual</c>
    /// (<c>ParatextData/ScrText.cs:323</c>) and
    /// <see cref="PermissionManager.AmAdministrator"/> is <c>virtual</c>
    /// (<c>ParatextData/Users/PermissionManager.cs:178</c>). We exploit both: a
    /// <see cref="FakePermissionManager"/> overrides <c>AmAdministrator</c>; a
    /// <see cref="DummyScrTextWithFakePermissions"/> (subclass of <see cref="DummyScrText"/>)
    /// overrides <c>Permissions</c>. The real PT9 <c>WarnIfNotAdministrator()</c> body still
    /// runs — only the boolean it keys on is fake.
    /// </para>
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class RestorePermissionGateTests
    {
        // -------------------------------------------------------------------
        // TS-093 happy path — admin user → gate open (true).
        //
        // Strategic-plan §CAP-019 line 483: "CheckAdminGate(scrTextWithAdminPerm) returns true".
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-019")]
        [Property("ExtractionId", "EXT-203")]
        [Property("BehaviorId", "BHV-325")]
        [Property("InvariantId", "INV-B05")]
        [Property("ValidationRule", "VAL-B05")]
        [Property("ScenarioId", "TS-093")]
        public void CheckAdminGate_WhenUserIsAdministrator_ReturnsTrue()
        {
            // Arrange — ScrText whose Permissions reports AmAdministrator=true
            ScrText scrText = NewScrTextWithAdminFlag(isAdmin: true);

            // Act
            bool result = RestorePermissionGate.CheckAdminGate(scrText);

            // Assert
            Assert.That(
                result,
                Is.True,
                "Administrator role → gate open. INV-B05 / VAL-B05 / BHV-325 contract."
            );
        }

        // -------------------------------------------------------------------
        // TS-093 sad path — non-admin user → gate closed (false). This is the
        // canonical scenario described in test-scenarios.json TS-093.
        //
        // Strategic-plan §CAP-019 line 483: "CheckAdminGate(scrTextWithoutAdminPerm) returns false".
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-019")]
        [Property("ExtractionId", "EXT-203")]
        [Property("BehaviorId", "BHV-325")]
        [Property("InvariantId", "INV-B05")]
        [Property("ValidationRule", "VAL-B05")]
        [Property("ScenarioId", "TS-093")]
        public void CheckAdminGate_WhenUserIsNotAdministrator_ReturnsFalse()
        {
            // Arrange — ScrText whose Permissions reports AmAdministrator=false (Translator,
            // Consultant, Observer, Guest, or any role other than Administrator). The PT9
            // WarnIfNotAdministrator() body will Alert.Show into the default NoAlert no-op
            // and return false.
            ScrText scrText = NewScrTextWithAdminFlag(isAdmin: false);

            // Act
            bool result = RestorePermissionGate.CheckAdminGate(scrText);

            // Assert
            Assert.That(
                result,
                Is.False,
                "Non-admin role → gate closed. M-003 caller maps this to PERMISSION_DENIED."
            );
        }

        // -------------------------------------------------------------------
        // Strategic-plan §CAP-019 line 490 edge case: "scrText with null Permissions →
        // must not crash (defensive null-check); PT9 returns false in that case (parity)."
        //
        // PT9 has no explicit null-check (RestoreForm.cs:105 just dereferences
        // `scrText.Permissions.WarnIfNotAdministrator()`). In production PT9 this is
        // unreachable because `cachedPermissionManager` is initialised in ScrText's
        // constructor. PT10 defensively returns false so unanticipated null cases (e.g.
        // a partially-constructed ScrText, a future PT10 refactor that lazies the manager
        // differently) close the gate rather than crash with NRE.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-019")]
        [Property("ExtractionId", "EXT-203")]
        [Property("BehaviorId", "BHV-325")]
        [Property("InvariantId", "INV-B05")]
        [Property("ValidationRule", "VAL-B05")]
        [Property("ScenarioId", "TS-093")]
        public void CheckAdminGate_WhenPermissionsIsNull_ReturnsFalseDoesNotThrow()
        {
            // Arrange — ScrText whose Permissions returns null. This is a PT10 defensive
            // hardening contract — PT9 has no equivalent guard.
            ScrText scrText = NewScrTextWithNullPermissions();

            // Act + Assert — does NOT throw, and returns false (gate closed).
            bool result = false;
            Assert.DoesNotThrow(
                () => result = RestorePermissionGate.CheckAdminGate(scrText),
                "PT10 must not crash on a null Permissions reference — defensive hardening "
                    + "per strategic-plan-backend.md §CAP-019 edge-case bullet."
            );
            Assert.That(
                result,
                Is.False,
                "Null Permissions → gate closed (false), per PT10 defensive-hardening contract."
            );
        }

        // -------------------------------------------------------------------
        // INV-B05 / VAL-B05 lock — re-states the gate contract from the invariant's
        // perspective. The point of having this test alongside the TS-093 sad-path test is
        // to give the traceability validator (and any future regression debugging) a clear
        // invariant-tagged assertion that "non-admin == false" is the enforcement point.
        //
        // INV-B05 is the business-rule invariant; this test independently re-states it so
        // a partial regression (e.g. someone "fixes" the gate to return true on a specific
        // non-admin role) would fail this invariant test in addition to TS-093.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-019")]
        [Property("ExtractionId", "EXT-203")]
        [Property("BehaviorId", "BHV-325")]
        [Property("InvariantId", "INV-B05")]
        [Property("ValidationRule", "VAL-B05")]
        [Property("ScenarioId", "TS-093")]
        public void CheckAdminGate_INV_B05_NonAdmin_ReturnsFalse()
        {
            // Arrange — same as the sad-path test, but assertion is framed invariant-style:
            // "Restoring over an existing project requires admin permission" — therefore
            // a non-admin caller MUST be denied. This is the enforcement point.
            ScrText nonAdminProject = NewScrTextWithAdminFlag(isAdmin: false);

            // Act
            bool gateAllowsRestore = RestorePermissionGate.CheckAdminGate(nonAdminProject);

            // Assert — INV-B05 enforcement: non-admin must NOT be allowed to overlay-restore.
            Assert.That(
                gateAllowsRestore,
                Is.False,
                "INV-B05: Restoring over an existing project requires admin permission. "
                    + "A non-admin caller MUST receive a closed gate here so the M-003 caller "
                    + "path can return PERMISSION_DENIED before write-lock / PerformRestore."
            );
        }

        // -------------------------------------------------------------------
        // Test infrastructure — helpers and private nested classes.
        // -------------------------------------------------------------------

        /// <summary>
        /// Build a <see cref="DummyScrTextWithFakePermissions"/> whose <c>Permissions</c>
        /// returns a <see cref="FakePermissionManager"/> with <c>AmAdministrator</c> overridden
        /// to <paramref name="isAdmin"/>. The real <see cref="PermissionManager.WarnIfNotAdministrator"/>
        /// body still runs — only the boolean it keys on is faked.
        /// </summary>
        private static ScrText NewScrTextWithAdminFlag(bool isAdmin)
        {
            return new DummyScrTextWithFakePermissions(new FakePermissionManager(isAdmin));
        }

        /// <summary>
        /// Build a <see cref="DummyScrTextWithFakePermissions"/> whose <c>Permissions</c>
        /// returns <c>null</c>. Used to exercise the PT10 defensive-null-check delta.
        /// </summary>
        private static ScrText NewScrTextWithNullPermissions()
        {
            return new DummyScrTextWithFakePermissions(permissions: null);
        }

        /// <summary>
        /// A <see cref="PermissionManager"/> subclass that overrides
        /// <see cref="PermissionManager.AmAdministrator"/> to return a fixed value supplied at
        /// construction time. Lets us steer the real
        /// <see cref="PermissionManager.WarnIfNotAdministrator"/> body without touching any
        /// XML / file-backed state.
        /// </summary>
        private sealed class FakePermissionManager : PermissionManager
        {
            private readonly bool _isAdmin;

            public FakePermissionManager(bool isAdmin)
                : base()
            {
                _isAdmin = isAdmin;
            }

            public override bool AmAdministrator => _isAdmin;
        }

        /// <summary>
        /// A <see cref="DummyScrText"/> subclass whose <see cref="ScrText.Permissions"/>
        /// returns a caller-supplied <see cref="PermissionManager"/> (or <c>null</c> for the
        /// defensive-null edge case). Override is on the property itself, bypassing the
        /// base class's <c>cachedPermissionManager</c> LazyInitHelper.
        /// </summary>
        private sealed class DummyScrTextWithFakePermissions : DummyScrText
        {
            private readonly PermissionManager? _permissions;

            public DummyScrTextWithFakePermissions(PermissionManager? permissions)
                : base()
            {
                _permissions = permissions;
            }

#nullable disable
            // Suppression: PermissionManager! returns a non-null reference per the base
            // class contract; the test seam intentionally returns null to exercise the
            // PT10 defensive null-check. The CheckAdminGate_WhenPermissionsIsNull_*
            // test pins this. Production callers never see a null PT9 Permissions.
            public override PermissionManager Permissions => _permissions;
#nullable restore
        }
    }
}
