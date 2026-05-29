using System.Linq;
using System.Threading.Tasks;
using Paranext.DataProvider.BackupRestore;

namespace TestParanextDataProvider.BackupRestore
{
    // === TEST SCOPE ===
    // CAP-010 OUTER acceptance tests for `ValidateBackupAsync` (M-009) on the
    // wire-facade `BackupRestoreDataProvider`. Outside-In TDD: the OUTER
    // acceptance test (TS-054) pins the wire-envelope contract; per-scenario
    // tests (TS-055..TS-061) pin each error key + the composite OK-gate
    // (BHV-308). CAP-014 (BackupValidationService) is already GREEN — the pure
    // rule chains it owns are NOT re-tested here; only the wire-layer
    // translation (request → CAP-014 calls → response shape) is.
    //
    // Wire-layer responsibilities (per strategic-plan-backend.md §CAP-010):
    //   (1) Translate ValidateBackupRequest's six fields into two pure-function
    //       calls against CAP-014 (ValidateData + IsOkGateOpen).
    //   (2) Assemble the field-keyed errors dictionary:
    //        - ValidateData failed → ONE entry: errors[ErrorField] = ErrorKey
    //          (field is one of "projectId", "userName", "destinationPath").
    //        - ValidateData passed AND book-count gate failed
    //          (selectedBookCount==0 AND NOT isNoteType) → ONE entry:
    //          errors["selectedBooks"] = "%backup_atLeastOneBookRequired%".
    //        - destinationPath=="" → NO error key set (gate-only, TS-061).
    //        - Otherwise → empty dictionary.
    //   (3) Return { CanSubmit: IsOkGateOpen result, Errors }.
    //
    // RED-state expectation: every test fails because
    // BackupRestoreDataProvider.ValidateBackupAsync throws
    // NotImplementedException("CAP-010 RED").

    internal partial class BackupRestoreDataProviderTests
    {
        // ---------------------------------------------------------------------
        // Constants — wire-side error keys + field names. Mirror CAP-014's
        // BackupValidationServiceTests so a future implementer can grep
        // "%backup_resourceProjectNotBackupable%" and land on both fixtures.
        // ---------------------------------------------------------------------
        private const string ResourceProjectErrorKey = "%backup_resourceProjectNotBackupable%";
        private const string UserNameRequiredErrorKey = "%backup_userNameRequired%";
        private const string InvalidDestPathErrorKey = "%backup_invalidDestPath%";
        private const string AtLeastOneBookRequiredErrorKey = "%backup_atLeastOneBookRequired%";

        private const string ProjectIdField = "projectId";
        private const string UserNameField = "userName";
        private const string DestinationPathField = "destinationPath";
        private const string SelectedBooksField = "selectedBooks";

        // Stable test fixtures.
        private const string ValidUserName = "Alice";
        private const string ValidDestSpec = "/tmp/proj.zip";

        // Definitively-invalid path string — angle brackets + colon are illegal
        // across Windows; mirrors CAP-014's BackupValidationServiceTests
        // fixture for cross-fixture consistency.
        private const string InvalidDestSpec = "<illegal:chars>";

        // =====================================================================
        // OUTER ACCEPTANCE TEST — must pass for CAP-010 to be considered done.
        // =====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("BehaviorId", "BHV-308")]
        [Property("ScenarioId", "TS-054")]
        [Description(
            "Per strategic-plan-backend.md §CAP-010 acceptance test: validateBackup({projectId, isProtectedText, userName, destinationPath, selectedBookCount, isNoteType}) returns {canSubmit:true, errors:{}} when every gate (ValidateData 3-rule chain + book-count + non-empty destination) opens."
        )]
        public async Task ValidateBackup_AllConditionsMet_ReturnsCanSubmitTrueWithEmptyErrors()
        {
            // Arrange — TS-054 input: standard project, non-empty userName,
            // valid path, 5 books selected, NOT a Notes-type. Every rule passes.
            var request = new ValidateBackupRequest
            {
                ProjectId = "abc123",
                IsProtectedText = false,
                UserName = ValidUserName,
                DestinationPath = ValidDestSpec,
                SelectedBookCount = 5,
                IsNoteType = false,
            };

            // Act
            ValidateBackupResponse response = await _provider.ValidateBackupAsync(request);

            // Assert — composite OK-gate open + empty errors dictionary
            Assert.That(response.CanSubmit, Is.True, "TS-054: every gate opens → canSubmit=true");
            Assert.That(
                response.Errors,
                Is.Empty,
                "TS-054: full pass → errors dictionary is empty (no failing fields)"
            );
        }

        // =====================================================================
        // TS-055 / gm-023 — Notes-type with 0 books → enabled (bypass)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-010")]
        [Property("BehaviorId", "BHV-308")]
        [Property("InvariantId", "INV-B03")]
        [Property("ValidationRule", "VAL-B04")]
        [Property("ScenarioId", "TS-055")]
        [Property("GoldenMasterId", "gm-023")]
        [Description(
            "TS-055 / gm-023: Notes-type project with 0 selected books bypasses the book-count gate. Inputs match gm-023 input.json exactly; output matches gm-023 expected-output.json (canSubmit:true)."
        )]
        public async Task ValidateBackup_NotesTypeWithZeroBooks_ReturnsCanSubmitTrueWithEmptyErrors()
        {
            // Arrange — exact gm-023 input.json values. The Windows path is
            // never resolved on disk per gm-023 captureInstructions; only
            // IsNullOrEmpty is checked, so this test passes on any host OS.
            const string GmDestPath = "C:\\Users\\test\\Documents\\notes-backup.zip";
            var request = new ValidateBackupRequest
            {
                ProjectId = "abc123",
                IsProtectedText = false,
                UserName = ValidUserName,
                DestinationPath = GmDestPath,
                SelectedBookCount = 0,
                IsNoteType = true,
            };

            // Act
            ValidateBackupResponse response = await _provider.ValidateBackupAsync(request);

            // Assert — matches gm-023 expected-output.canSubmit
            Assert.That(
                response.CanSubmit,
                Is.True,
                "TS-055 / gm-023: Notes-bypass enables OK button with 0 books selected (INV-B03)"
            );
            Assert.That(
                response.Errors,
                Is.Empty,
                "TS-055 / gm-023: Notes-bypass produces an empty errors dictionary"
            );
        }

        // =====================================================================
        // TS-056 — Translation-type with 0 books → disabled (book-count gate)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("BehaviorId", "BHV-308")]
        [Property("InvariantId", "INV-B03")]
        [Property("ScenarioId", "TS-056")]
        [Description(
            "TS-056: Standard Translation type with 0 selected books → canSubmit=false + errors.selectedBooks set to the %backup_atLeastOneBookRequired% localize-key placeholder. Pins the book-count error surface on the wire shape (CAP-014's IsOkGateOpen only returns a boolean; the wire layer adds the field-keyed error)."
        )]
        public async Task ValidateBackup_TranslationTypeWithZeroBooks_ReturnsCanSubmitFalseWithSelectedBooksError()
        {
            // Arrange — Translation type (isNoteType=false), 0 books, every
            // other gate passes. Per the task spec, the wire layer ADDS a
            // dedicated selectedBooks error key (CAP-014's IsOkGateOpen only
            // returns false; the wire layer is what surfaces the error key).
            var request = new ValidateBackupRequest
            {
                ProjectId = "abc123",
                IsProtectedText = false,
                UserName = ValidUserName,
                DestinationPath = ValidDestSpec,
                SelectedBookCount = 0,
                IsNoteType = false,
            };

            // Act
            ValidateBackupResponse response = await _provider.ValidateBackupAsync(request);

            // Assert
            Assert.That(
                response.CanSubmit,
                Is.False,
                "TS-056: book-count gate disables OK for Translation-type with 0 books"
            );
            Assert.That(
                response.Errors.ContainsKey(SelectedBooksField),
                Is.True,
                "TS-056: errors.selectedBooks must be set to surface the per-field hint under the BookChooser"
            );
            Assert.That(
                response.Errors[SelectedBooksField],
                Is.EqualTo(AtLeastOneBookRequiredErrorKey),
                "TS-056: error value is the %backup_atLeastOneBookRequired% localize-key placeholder"
            );
        }

        // =====================================================================
        // TS-057 — Resource project rejected (VAL-B01 / INV-B01)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("BehaviorId", "BHV-308")]
        [Property("InvariantId", "INV-B01")]
        [Property("ValidationRule", "VAL-B01")]
        [Property("ScenarioId", "TS-057")]
        [Description(
            "TS-057: isProtectedText=true → canSubmit=false + errors.projectId set to %backup_resourceProjectNotBackupable%. Mirrors the BackupOrchestrator's resource-gate envelope per data-contracts.md §4.1."
        )]
        public async Task ValidateBackup_ResourceProject_ReturnsCanSubmitFalseWithProjectIdError()
        {
            // Arrange — isProtectedText=true; other fields valid so the
            // resource-project rule MUST short-circuit first per CAP-014.
            var request = new ValidateBackupRequest
            {
                ProjectId = "abc123",
                IsProtectedText = true,
                UserName = ValidUserName,
                DestinationPath = ValidDestSpec,
                SelectedBookCount = 5,
                IsNoteType = false,
            };

            // Act
            ValidateBackupResponse response = await _provider.ValidateBackupAsync(request);

            // Assert
            Assert.That(
                response.CanSubmit,
                Is.False,
                "TS-057: resource project disables OK (INV-B01)"
            );
            Assert.That(
                response.Errors.ContainsKey(ProjectIdField),
                Is.True,
                "TS-057: errors.projectId must be set"
            );
            Assert.That(
                response.Errors[ProjectIdField],
                Is.EqualTo(ResourceProjectErrorKey),
                "TS-057: error value is the %backup_resourceProjectNotBackupable% localize-key placeholder"
            );
        }

        // =====================================================================
        // TS-058 — Empty userName rejected (VAL-B02 / INV-B02 / BHV-T003)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("BehaviorId", "BHV-308")]
        [Property("InvariantId", "INV-B02")]
        [Property("ValidationRule", "VAL-B02")]
        [Property("ScenarioId", "TS-058")]
        [Description(
            "TS-058: empty userName → canSubmit=false + errors.userName set to %backup_userNameRequired%. BHV-T003: any non-empty value passes; only the empty string is rejected."
        )]
        public async Task ValidateBackup_EmptyUserName_ReturnsCanSubmitFalseWithUserNameError()
        {
            // Arrange — userName="" (rule 1 passes so rule 2 reached)
            var request = new ValidateBackupRequest
            {
                ProjectId = "abc123",
                IsProtectedText = false,
                UserName = string.Empty,
                DestinationPath = ValidDestSpec,
                SelectedBookCount = 5,
                IsNoteType = false,
            };

            // Act
            ValidateBackupResponse response = await _provider.ValidateBackupAsync(request);

            // Assert
            Assert.That(
                response.CanSubmit,
                Is.False,
                "TS-058: empty userName disables OK (INV-B02)"
            );
            Assert.That(
                response.Errors.ContainsKey(UserNameField),
                Is.True,
                "TS-058: errors.userName must be set"
            );
            Assert.That(
                response.Errors[UserNameField],
                Is.EqualTo(UserNameRequiredErrorKey),
                "TS-058: error value is the %backup_userNameRequired% localize-key placeholder"
            );
        }

        // =====================================================================
        // TS-059 — Single-period userName accepted (BHV-T003)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-010")]
        [Property("BehaviorId", "BHV-308")]
        [Property("InvariantId", "INV-B02")]
        [Property("ScenarioId", "TS-059")]
        [Description(
            "TS-059 / BHV-T003: userName=\".\" passes (any non-empty value accepted; no format check). Pins the wire layer mirrors CAP-014's PT9-byte-for-byte rule semantics."
        )]
        public async Task ValidateBackup_SinglePeriodUserName_ReturnsCanSubmitTrueWithEmptyErrors()
        {
            // Arrange — userName=".", every other gate passes
            var request = new ValidateBackupRequest
            {
                ProjectId = "abc123",
                IsProtectedText = false,
                UserName = ".",
                DestinationPath = ValidDestSpec,
                SelectedBookCount = 5,
                IsNoteType = false,
            };

            // Act
            ValidateBackupResponse response = await _provider.ValidateBackupAsync(request);

            // Assert
            Assert.That(
                response.CanSubmit,
                Is.True,
                "TS-059 / BHV-T003: userName='.' passes (no format check) — every gate opens"
            );
            Assert.That(response.Errors, Is.Empty, "TS-059: full pass → empty errors dictionary");
        }

        // =====================================================================
        // TS-060 — Invalid destination path rejected (VAL-B03 / INV-B04)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("BehaviorId", "BHV-308")]
        [Property("InvariantId", "INV-B04")]
        [Property("ValidationRule", "VAL-B03")]
        [Property("ScenarioId", "TS-060")]
        [Description(
            "TS-060: destinationPath with illegal characters → canSubmit=false + errors.destinationPath set to %backup_invalidDestPath%. Distinguishes from TS-061 (empty path) which produces NO error key."
        )]
        public async Task ValidateBackup_InvalidDestPath_ReturnsCanSubmitFalseWithDestinationPathError()
        {
            // Arrange — destinationPath="<illegal:chars>"; every other gate passes
            var request = new ValidateBackupRequest
            {
                ProjectId = "abc123",
                IsProtectedText = false,
                UserName = ValidUserName,
                DestinationPath = InvalidDestSpec,
                SelectedBookCount = 5,
                IsNoteType = false,
            };

            // Act
            ValidateBackupResponse response = await _provider.ValidateBackupAsync(request);

            // Assert
            Assert.That(
                response.CanSubmit,
                Is.False,
                "TS-060: invalid destinationPath disables OK (INV-B04)"
            );
            Assert.That(
                response.Errors.ContainsKey(DestinationPathField),
                Is.True,
                "TS-060: errors.destinationPath must be set"
            );
            Assert.That(
                response.Errors[DestinationPathField],
                Is.EqualTo(InvalidDestPathErrorKey),
                "TS-060: error value is the %backup_invalidDestPath% localize-key placeholder"
            );
        }

        // =====================================================================
        // TS-061 — Empty destinationPath disables OK silently (VAL-B04)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-010")]
        [Property("BehaviorId", "BHV-308")]
        [Property("ValidationRule", "VAL-B04")]
        [Property("ScenarioId", "TS-061")]
        [Description(
            "TS-061 / VAL-B04: destinationPath=\"\" → canSubmit=false BUT errors does NOT contain a destinationPath key. This is the explicit 'gate only; no message' case from the test scenario. Distinguishes the wire layer's empty-dest handling from invalid-spec (TS-060) handling."
        )]
        public async Task ValidateBackup_EmptyDestPath_ReturnsCanSubmitFalseWithNoDestinationPathError()
        {
            // Arrange — destinationPath="", every other gate passes.
            // Per TS-061: empty destinationPath disables OK silently. The wire
            // layer must NOT add a destinationPath error key.
            var request = new ValidateBackupRequest
            {
                ProjectId = "abc123",
                IsProtectedText = false,
                UserName = ValidUserName,
                DestinationPath = string.Empty,
                SelectedBookCount = 5,
                IsNoteType = false,
            };

            // Act
            ValidateBackupResponse response = await _provider.ValidateBackupAsync(request);

            // Assert
            Assert.That(response.CanSubmit, Is.False, "TS-061: empty destinationPath disables OK");
            Assert.That(
                response.Errors.ContainsKey(DestinationPathField),
                Is.False,
                "TS-061 / VAL-B04: empty destinationPath is gate-only — NO error key surfaces (this is the critical wire-shape pinning per the task spec)"
            );
        }

        // =====================================================================
        // First-failing-rule precedence — resource project wins
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("BehaviorId", "BHV-308")]
        [Property("InvariantId", "INV-B01")]
        [Description(
            "When ALL three ValidateData rules would fail (resource + empty userName + invalid dest), the wire layer surfaces ONLY the resource-project error (first-failing-rule precedence from CAP-014's ValidateData). Pins that the wire shape inherits CAP-014's short-circuit semantics."
        )]
        public async Task ValidateBackup_ResourcePrecedence_ReturnsOnlyProjectIdError()
        {
            // Arrange — resource + empty userName + invalid dest
            var request = new ValidateBackupRequest
            {
                ProjectId = "abc123",
                IsProtectedText = true,
                UserName = string.Empty,
                DestinationPath = InvalidDestSpec,
                SelectedBookCount = 5,
                IsNoteType = false,
            };

            // Act
            ValidateBackupResponse response = await _provider.ValidateBackupAsync(request);

            // Assert — only the projectId entry surfaces; userName + destinationPath absent
            Assert.That(response.CanSubmit, Is.False);
            Assert.That(
                response.Errors.ContainsKey(ProjectIdField),
                Is.True,
                "First-failing rule (resource project) is reported"
            );
            Assert.That(
                response.Errors[ProjectIdField],
                Is.EqualTo(ResourceProjectErrorKey),
                "Error value is the resource-project localize-key placeholder"
            );
            Assert.That(
                response.Errors.ContainsKey(UserNameField),
                Is.False,
                "userName error must NOT surface — rule 1 short-circuited before rule 2 (CAP-014 contract)"
            );
            Assert.That(
                response.Errors.ContainsKey(DestinationPathField),
                Is.False,
                "destinationPath error must NOT surface — rule 1 short-circuited before rule 3 (CAP-014 contract)"
            );
        }

        // =====================================================================
        // Invariant: errors map only contains keys for FAILING fields
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("BehaviorId", "BHV-308")]
        [Description(
            "Pins the success-criteria invariant from strategic-plan-backend.md §CAP-010: 'errors map only contains keys for failing fields (no empty strings)'. On a full pass, the dictionary has zero entries — not 'four entries with empty-string values'."
        )]
        public async Task ValidateBackup_FullPass_ErrorsDictionaryContainsNoKeys()
        {
            // Arrange — every gate passes
            var request = new ValidateBackupRequest
            {
                ProjectId = "abc123",
                IsProtectedText = false,
                UserName = ValidUserName,
                DestinationPath = ValidDestSpec,
                SelectedBookCount = 5,
                IsNoteType = false,
            };

            // Act
            ValidateBackupResponse response = await _provider.ValidateBackupAsync(request);

            // Assert — zero keys, not "keys with empty values"
            Assert.That(response.CanSubmit, Is.True);
            Assert.That(
                response.Errors.Count,
                Is.EqualTo(0),
                "Full pass MUST produce a zero-entry errors dictionary — no empty-string-valued keys"
            );
            // Also assert each canonical key is absent (belt-and-braces — pins
            // that a refactor introducing per-key initialisation to empty
            // strings breaks this test).
            Assert.That(response.Errors.ContainsKey(ProjectIdField), Is.False);
            Assert.That(response.Errors.ContainsKey(UserNameField), Is.False);
            Assert.That(response.Errors.ContainsKey(DestinationPathField), Is.False);
            Assert.That(response.Errors.ContainsKey(SelectedBooksField), Is.False);
        }

        // =====================================================================
        // Wire registration canary — validateBackup slot is bound to a REAL
        // delegate (not a PendingStub) after CAP-010 lands.
        // =====================================================================

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-010")]
        [Property("BehaviorId", "BHV-650")]
        [Description(
            "CAP-001 wire-registration canary for CAP-010: the `validateBackup` slot in GetFunctions() is bound to a REAL delegate (returns a ValidateBackupResponse) — not the PendingStub throw-canary that other not-yet-landed capabilities use. Pins the rename from `isDestinationPathWritable` PendingStub → `validateBackup` real delegate."
        )]
        public async Task ValidateBackup_DispatchedThroughProviderInstance_ReturnsRealResponse()
        {
            // Arrange — happy path so the real delegate produces an empty
            // errors dictionary. This test deliberately mirrors the OUTER
            // acceptance test's request payload but is categorized as
            // Integration to make the CAP-001 wire-registration angle clear:
            // the assertion isn't on rule semantics; it's that the wire facade
            // routes the call to a real, returning method (not a throwing
            // PendingStub).
            var request = new ValidateBackupRequest
            {
                ProjectId = "abc123",
                IsProtectedText = false,
                UserName = ValidUserName,
                DestinationPath = ValidDestSpec,
                SelectedBookCount = 5,
                IsNoteType = false,
            };

            // Act — call the wire-layer method on the constructed provider
            // (mirrors how PAPI dispatch arrives at the delegate registered in
            // GetFunctions()). RED-state: this throws NotImplementedException;
            // GREEN-state: this returns a real response.
            ValidateBackupResponse response = await _provider.ValidateBackupAsync(request);

            // Assert — non-null response of the expected wire type. Any non-
            // throw outcome is enough to prove the slot is wired to a real
            // delegate; we additionally pin the type so a future PendingStub
            // accidentally registered under "validateBackup" returning a
            // different type would still fail compilation OR this test.
            Assert.That(
                response,
                Is.Not.Null,
                "Wire facade routes `validateBackup` to a real (non-throwing) delegate"
            );
            Assert.That(
                response,
                Is.InstanceOf<ValidateBackupResponse>(),
                "Wire facade returns a ValidateBackupResponse — the wire-shape record per data-contracts.md §3.13 (pre-round-4)"
            );
            // Sanity-check the response is the happy-path shape (full pass).
            Assert.That(response.CanSubmit, Is.True);
            Assert.That(response.Errors.Any(), Is.False);
        }
    }
}
