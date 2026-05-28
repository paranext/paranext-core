using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.BackupRestore;

namespace TestParanextDataProvider.BackupRestore
{
    /// <summary>
    /// Tests for <see cref="BackupValidationService"/> (CAP-014 / EXT-102 + EXT-103 / BHV-308).
    ///
    /// Two pure-function rule chains:
    /// <list type="bullet">
    ///   <item><see cref="BackupValidationService.ValidateData"/> — 3-rule chain returning
    ///   the first failing rule's <c>(ErrorKey, ErrorField)</c> or the all-pass sentinel.</item>
    ///   <item><see cref="BackupValidationService.IsOkGateOpen"/> — composite cmdOK gate
    ///   layering Notes-bypass + non-empty-dest on top of <c>ValidateData</c>.</item>
    /// </list>
    ///
    /// Specification sources:
    /// <list type="bullet">
    ///   <item>strategic-plan-backend.md §CAP-014 — acceptance test line + contracts (line 388-389)</item>
    ///   <item>strategic-plan-backend.md §Cross-Capability Interfaces (line 641) — record ownership</item>
    ///   <item>implementation/extraction-plan.md §EXT-102 + EXT-103 — extraction stubs (line 145-192)</item>
    ///   <item>implementation/backend-alignment.md §"BackupForm UI strings" (line 603-605) — PT9→PT10 localize key map</item>
    ///   <item>business-rules.md §INV-B01..B04 / VAL-B01..B04 — invariants</item>
    ///   <item>behavior-catalog.md §BHV-308 — cmdOK composite gate</item>
    ///   <item>characterization/test-scenarios.json — TS-054..TS-061</item>
    ///   <item>golden-masters/gm-023-backupform-okgate-notes-bypass — Notes-bypass GM</item>
    /// </list>
    ///
    /// PT9 sources:
    /// <list type="bullet">
    ///   <item><c>Paratext/Paratext/BackupRestore/BackupForm.cs:220-249</c> (<c>ValidateData</c>)
    ///   — three <c>ErrorProvider.SetError</c> side-effects collapsed into a single returned
    ///   <see cref="BackupValidationResult"/>.</item>
    ///   <item><c>Paratext/Paratext/BackupRestore/BackupForm.cs:98-115</c>
    ///   (<c>EnableDisableControls</c>, gate at 112-114) — the cmdOK boolean.</item>
    /// </list>
    ///
    /// PT10 deltas vs PT9:
    /// <list type="bullet">
    ///   <item><b>Side-effect → return value</b>: PT9 uses <c>ErrorProvider.SetError</c> +
    ///   imperative early returns; PT10 returns a <see cref="BackupValidationResult"/>.</item>
    ///   <item><b>Localize-key placeholders</b>: PT9 surfaces pre-localized English; PT10
    ///   returns <c>%backup_*%</c> placeholders resolved at the wire boundary
    ///   (per Localization-Guide.md).</item>
    ///   <item><b>Field-name canonicalization</b>: PT9 attaches errors to WinForms control
    ///   names (<c>cmbProject</c>, <c>txtUserName</c>, <c>txtTo</c>); PT10 uses the
    ///   wire-side field names from data-contracts.md §3.13 nested-error shape
    ///   (<c>projectId</c>, <c>userName</c>, <c>destinationPath</c>).</item>
    /// </list>
    ///
    /// The <c>destFileSpec</c> "invalid" check (rule 3 of <c>ValidateData</c>) uses
    /// <c>&lt;illegal:chars&gt;</c> as a definitively-invalid path string. Angle brackets and
    /// colons are illegal path characters across Windows, and the leading angle bracket plus
    /// embedded colon defeat any reasonable file-spec validator. The exact validation
    /// strategy in PT10 (port of PT9 <c>FileUtils.FileSpecIsValid</c> vs <c>Path.GetInvalidPathChars()</c>
    /// vs custom) is the implementer's choice — the tests pin behaviour, not implementation.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class BackupValidationServiceTests
    {
        // Stable test fixtures — give names to the strings + booleans the rules consume.
        // Documented constants help reviewers (and the implementer) read each test's
        // intent without re-deriving "why this value passes" from the rule definitions.
        private const string ValidUserName = "Alice";
        private const string ValidDestSpec = "/tmp/proj.zip";
        private const string EmptyString = "";

        // Definitively-invalid path string. Angle brackets + colon are illegal across
        // Windows (and macOS volume-name conventions); any reasonable port of
        // PT9 FileUtils.FileSpecIsValid rejects this.
        private const string InvalidDestSpec = "<illegal:chars>";

        // PT9→PT10 localize-key map (backend-alignment.md §"BackupForm UI strings"
        // line 603-605). These are %key% placeholders — the wire-boundary Loc helper
        // in BackupRestoreDataProvider resolves them on the way out.
        private const string ResourceProjectErrorKey = "%backup_resourceProjectNotBackupable%";
        private const string UserNameRequiredErrorKey = "%backup_userNameRequired%";
        private const string InvalidDestPathErrorKey = "%backup_invalidDestPath%";

        // Wire-side error field names (data-contracts.md §3.13 nested-error shape).
        private const string ProjectIdField = "projectId";
        private const string UserNameField = "userName";
        private const string DestinationPathField = "destinationPath";

        // ===================================================================
        // ValidateData — rule 1: resource project (isProtectedText=true).
        // TS-057 / INV-B01 / VAL-B01.
        //
        // PT9 source — BackupForm.cs:225-232:
        //   if (scrText.IsProtectedText) {
        //     errorProvider.SetError(cmbProject,
        //       Localizer.Str("BackupForm_6") + "\n" + Localizer.Str("BackupForm_7"));
        //     return false;
        //   }
        // ===================================================================

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-014")]
        [Property("ExtractionId", "EXT-102")]
        [Property("BehaviorId", "BHV-308")]
        [Property("InvariantId", "INV-B01")]
        [Property("ValidationRule", "VAL-B01")]
        [Property("ScenarioId", "TS-057")]
        public void ValidateData_WithResourceProject_ReturnsResourceProjectError()
        {
            // Arrange — isProtectedText=true (resource project)

            // Act — pass valid userName and destSpec to prove the first rule short-circuits
            // independently of later rules.
            BackupValidationResult actual = BackupValidationService.ValidateData(
                isProtectedText: true,
                userName: ValidUserName,
                destFileSpec: ValidDestSpec
            );

            // Assert — first failing rule's (key, field) pair is returned; IsValid=false.
            Assert.That(actual.IsValid, Is.False, "Resource project must fail validation");
            Assert.That(
                actual.ErrorKey,
                Is.EqualTo(ResourceProjectErrorKey),
                "ErrorKey must be the %backup_resourceProjectNotBackupable% localize-key placeholder"
            );
            Assert.That(
                actual.ErrorField,
                Is.EqualTo(ProjectIdField),
                "ErrorField must be the 'projectId' wire-side field name"
            );
        }

        // ===================================================================
        // ValidateData — rule 1 takes precedence over rules 2 and 3.
        //
        // Even when userName is empty AND destSpec is invalid, the resource-project
        // rule MUST fire first — short-circuit semantics from PT9 BackupForm.cs:225-249
        // (each branch ends with `return false;`).
        // ===================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-014")]
        [Property("ExtractionId", "EXT-102")]
        [Property("BehaviorId", "BHV-308")]
        [Property("InvariantId", "INV-B01")]
        [Property("ScenarioId", "TS-057")]
        public void ValidateData_WithResourceProjectAndOtherFailures_ReturnsResourceProjectErrorFirst()
        {
            // Arrange — isProtectedText=true AND userName empty AND destSpec invalid.

            // Act
            BackupValidationResult actual = BackupValidationService.ValidateData(
                isProtectedText: true,
                userName: EmptyString,
                destFileSpec: InvalidDestSpec
            );

            // Assert — rule 1 wins; rules 2 + 3 are not surfaced.
            Assert.That(actual.IsValid, Is.False);
            Assert.That(actual.ErrorKey, Is.EqualTo(ResourceProjectErrorKey));
            Assert.That(actual.ErrorField, Is.EqualTo(ProjectIdField));
        }

        // ===================================================================
        // ValidateData — rule 2: empty userName.
        // TS-058 / INV-B02 / VAL-B02 / BHV-T003.
        //
        // PT9 source — BackupForm.cs:234-238:
        //   if (txtUserName.Text == "") {
        //     errorProvider.SetError(txtUserName, Localizer.Str("BackupForm_8"));
        //     return false;
        //   }
        // ===================================================================

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-014")]
        [Property("ExtractionId", "EXT-102")]
        [Property("BehaviorId", "BHV-308")]
        [Property("InvariantId", "INV-B02")]
        [Property("ValidationRule", "VAL-B02")]
        [Property("ScenarioId", "TS-058")]
        public void ValidateData_WithEmptyUserName_ReturnsUserNameRequiredError()
        {
            // Arrange — userName="" (rule 1 must pass for rule 2 to be reached)

            // Act
            BackupValidationResult actual = BackupValidationService.ValidateData(
                isProtectedText: false,
                userName: EmptyString,
                destFileSpec: ValidDestSpec
            );

            // Assert
            Assert.That(actual.IsValid, Is.False, "Empty userName must fail validation");
            Assert.That(
                actual.ErrorKey,
                Is.EqualTo(UserNameRequiredErrorKey),
                "ErrorKey must be the %backup_userNameRequired% localize-key placeholder"
            );
            Assert.That(
                actual.ErrorField,
                Is.EqualTo(UserNameField),
                "ErrorField must be the 'userName' wire-side field name"
            );
        }

        // ===================================================================
        // ValidateData — rule 2 takes precedence over rule 3.
        //
        // userName empty + destSpec invalid → rule 2 wins (short-circuit).
        // ===================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-014")]
        [Property("ExtractionId", "EXT-102")]
        [Property("BehaviorId", "BHV-308")]
        [Property("ScenarioId", "TS-058")]
        public void ValidateData_WithEmptyUserNameAndInvalidDest_ReturnsUserNameErrorFirst()
        {
            // Act
            BackupValidationResult actual = BackupValidationService.ValidateData(
                isProtectedText: false,
                userName: EmptyString,
                destFileSpec: InvalidDestSpec
            );

            // Assert — rule 2 wins; rule 3 is not surfaced.
            Assert.That(actual.IsValid, Is.False);
            Assert.That(actual.ErrorKey, Is.EqualTo(UserNameRequiredErrorKey));
            Assert.That(actual.ErrorField, Is.EqualTo(UserNameField));
        }

        // ===================================================================
        // ValidateData — rule 2 edge case: single period accepted.
        // TS-059 / BHV-T003 — "any non-empty value passes; no format validation".
        //
        // PT9 source — BackupForm.cs:234-238 uses `== ""` only; no character check.
        // ===================================================================

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-014")]
        [Property("ExtractionId", "EXT-102")]
        [Property("BehaviorId", "BHV-308")]
        [Property("InvariantId", "INV-B02")]
        [Property("ScenarioId", "TS-059")]
        public void ValidateData_WithSinglePeriodUserName_PassesUserNameRule()
        {
            // Arrange — userName="." (the minimum-content edge case from BHV-T003)

            // Act
            BackupValidationResult actual = BackupValidationService.ValidateData(
                isProtectedText: false,
                userName: ".",
                destFileSpec: ValidDestSpec
            );

            // Assert — rule 2 must pass, so the overall result is success
            // (rules 1 and 3 are constructed to pass).
            Assert.That(
                actual.IsValid,
                Is.True,
                "userName='.' must pass — rule 2 has no format check, only emptiness"
            );
            Assert.That(actual.ErrorKey, Is.EqualTo(EmptyString));
            Assert.That(actual.ErrorField, Is.EqualTo(EmptyString));
        }

        // ===================================================================
        // ValidateData — rule 3: invalid destFileSpec.
        // TS-060 / INV-B04 / VAL-B03.
        //
        // PT9 source — BackupForm.cs:241-245:
        //   if (!FileUtils.FileSpecIsValid(txtTo.Text)) {
        //     errorProvider.SetError(txtTo, Localizer.Str("BackupForm_9"));
        //     return false;
        //   }
        // ===================================================================

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-014")]
        [Property("ExtractionId", "EXT-102")]
        [Property("BehaviorId", "BHV-308")]
        [Property("InvariantId", "INV-B04")]
        [Property("ValidationRule", "VAL-B03")]
        [Property("ScenarioId", "TS-060")]
        public void ValidateData_WithInvalidDestSpec_ReturnsInvalidDestPathError()
        {
            // Arrange — rule 1 + rule 2 pass; rule 3 must fail.

            // Act
            BackupValidationResult actual = BackupValidationService.ValidateData(
                isProtectedText: false,
                userName: ValidUserName,
                destFileSpec: InvalidDestSpec
            );

            // Assert
            Assert.That(actual.IsValid, Is.False, "Invalid dest file spec must fail validation");
            Assert.That(
                actual.ErrorKey,
                Is.EqualTo(InvalidDestPathErrorKey),
                "ErrorKey must be the %backup_invalidDestPath% localize-key placeholder"
            );
            Assert.That(
                actual.ErrorField,
                Is.EqualTo(DestinationPathField),
                "ErrorField must be the 'destinationPath' wire-side field name"
            );
        }

        // ===================================================================
        // ValidateData — happy path: all three rules pass.
        // TS-054 (partial — full TS-054 composite covered by IsOkGateOpen tests below).
        //
        // PT9 source — BackupForm.cs:247-249:
        //   // (all three checks passed)
        //   return true;
        // ===================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-014")]
        [Property("ExtractionId", "EXT-102")]
        [Property("BehaviorId", "BHV-308")]
        [Property("ScenarioId", "TS-054")]
        public void ValidateData_WithAllRulesPassing_ReturnsValidSentinel()
        {
            // Act
            BackupValidationResult actual = BackupValidationService.ValidateData(
                isProtectedText: false,
                userName: ValidUserName,
                destFileSpec: ValidDestSpec
            );

            // Assert — the all-pass sentinel: IsValid=true and BOTH error fields empty.
            Assert.That(actual.IsValid, Is.True);
            Assert.That(
                actual.ErrorKey,
                Is.EqualTo(EmptyString),
                "ErrorKey must be empty on success — no localize key surfaces"
            );
            Assert.That(
                actual.ErrorField,
                Is.EqualTo(EmptyString),
                "ErrorField must be empty on success — no wire-side field name surfaces"
            );
        }

        // ===================================================================
        // ValidateData — determinism. Same inputs → same output across calls.
        // ===================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-014")]
        [Property("ExtractionId", "EXT-102")]
        [Property("BehaviorId", "BHV-308")]
        public void ValidateData_CalledTwiceWithSameInputs_ReturnsSameResult()
        {
            // Act — two identical calls
            BackupValidationResult first = BackupValidationService.ValidateData(
                isProtectedText: false,
                userName: ValidUserName,
                destFileSpec: ValidDestSpec
            );
            BackupValidationResult second = BackupValidationService.ValidateData(
                isProtectedText: false,
                userName: ValidUserName,
                destFileSpec: ValidDestSpec
            );

            // Assert — record value-equality
            Assert.That(second, Is.EqualTo(first));
        }

        // ===================================================================
        // IsOkGateOpen — happy path: all gates open.
        // TS-054 (composite) / BHV-308.
        //
        // Inputs from TS-054: standard project, non-empty userName, valid path,
        // 5 books selected. ValidateData has already returned IsValid=true.
        //
        // PT9 source — BackupForm.cs:112-114 (inside EnableDisableControls):
        //   cmdOK.Enabled =
        //     ValidateData()
        //     && (selectedBooks.Count > 0 || scrText.Settings.TranslationInfo.Type.IsNoteType())
        //     && txtTo.Text != "";
        // ===================================================================

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-014")]
        [Property("ExtractionId", "EXT-103")]
        [Property("BehaviorId", "BHV-308")]
        [Property("ScenarioId", "TS-054")]
        public void IsOkGateOpen_WithAllConditionsMet_ReturnsTrue()
        {
            // Arrange — pre-computed valid ValidateData result, 5 books, non-notes, dest non-empty
            BackupValidationResult validateOk = new BackupValidationResult(
                true,
                EmptyString,
                EmptyString
            );

            // Act
            bool actual = BackupValidationService.IsOkGateOpen(
                result: validateOk,
                selectedBookCount: 5,
                isNoteType: false,
                destFileSpec: ValidDestSpec
            );

            // Assert
            Assert.That(actual, Is.True, "All gates open → cmdOK enabled");
        }

        // ===================================================================
        // IsOkGateOpen — Notes-bypass (the headline INV-B03 / VAL-B04 invariant).
        // TS-055 / gm-023 (BackupForm OK-gate — Notes-type with 0 books → enabled).
        //
        // gm-023 input.json:
        //   isNoteType: true, selectedBookCount: 0,
        //   txtToText: "C:\\Users\\test\\Documents\\notes-backup.zip",
        //   validateDataReturns: true
        // gm-023 expected-output.json:
        //   canSubmit: true, notesBypassActive: true
        //
        // gm-023 metadata.json capture-instructions:
        //   okEnabled = validateDataReturns
        //     && (selectedBookCount > 0 || isNoteType)
        //     && !string.IsNullOrEmpty(txtToText)
        //
        // PT9 source — BackupForm.cs:112-114 (same as TS-054 above), specifically the
        // `(selectedBooks.Count > 0 || IsNoteType())` disjunction.
        // ===================================================================

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-014")]
        [Property("ExtractionId", "EXT-103")]
        [Property("BehaviorId", "BHV-308")]
        [Property("InvariantId", "INV-B03")]
        [Property("ValidationRule", "VAL-B04")]
        [Property("ScenarioId", "TS-055")]
        [Property("GoldenMasterId", "gm-023")]
        public void IsOkGateOpen_WithNotesTypeAndZeroBooks_ReturnsTrue()
        {
            // Arrange — exact gm-023 input.json values
            BackupValidationResult validateOk = new BackupValidationResult(
                true,
                EmptyString,
                EmptyString
            );
            const string GmDestPath = "C:\\Users\\test\\Documents\\notes-backup.zip";

            // Act
            bool actual = BackupValidationService.IsOkGateOpen(
                result: validateOk,
                selectedBookCount: 0,
                isNoteType: true,
                destFileSpec: GmDestPath
            );

            // Assert — matches gm-023 expected-output.canSubmit
            Assert.That(
                actual,
                Is.True,
                "Notes-type with 0 selected books must bypass the book-count gate (INV-B03 / gm-023)"
            );
        }

        // ===================================================================
        // IsOkGateOpen — Translation-type with 0 books → DISABLED.
        // TS-056. The book-count gate engages when isNoteType=false.
        //
        // PT9 source — BackupForm.cs:112-114, the `selectedBooks.Count > 0` branch.
        // ===================================================================

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-014")]
        [Property("ExtractionId", "EXT-103")]
        [Property("BehaviorId", "BHV-308")]
        [Property("InvariantId", "INV-B03")]
        [Property("ScenarioId", "TS-056")]
        public void IsOkGateOpen_WithTranslationTypeAndZeroBooks_ReturnsFalse()
        {
            // Arrange — Translation-type, 0 books (other gates pass)
            BackupValidationResult validateOk = new BackupValidationResult(
                true,
                EmptyString,
                EmptyString
            );

            // Act
            bool actual = BackupValidationService.IsOkGateOpen(
                result: validateOk,
                selectedBookCount: 0,
                isNoteType: false,
                destFileSpec: ValidDestSpec
            );

            // Assert — book-count gate disables cmdOK
            Assert.That(
                actual,
                Is.False,
                "Translation-type with 0 selected books must disable cmdOK"
            );
        }

        // ===================================================================
        // IsOkGateOpen — empty destFileSpec disables OK silently.
        // TS-061 / VAL-B04 — "gate only; no message".
        //
        // The empty-dest case differs from rule 3 of ValidateData (invalid-spec):
        //   - Invalid spec → ValidateData returns IsValid=false + InvalidDestPath ErrorKey.
        //   - Empty spec   → ValidateData rule 3 passes (FileUtils.FileSpecIsValid("") may
        //                    return either way — but in practice the UI treats empty
        //                    differently); IsOkGateOpen's own non-empty check kills the gate.
        //
        // This test asserts ONLY IsOkGateOpen's behavior — given a valid ValidateData
        // result but empty destFileSpec, the gate must return false WITHOUT producing
        // an error (the boolean alone is the signal).
        //
        // PT9 source — BackupForm.cs:114 — `&& txtTo.Text != ""`.
        // ===================================================================

        [Test]
        [Category("Contract")]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-014")]
        [Property("ExtractionId", "EXT-103")]
        [Property("BehaviorId", "BHV-308")]
        [Property("ValidationRule", "VAL-B04")]
        [Property("ScenarioId", "TS-061")]
        public void IsOkGateOpen_WithEmptyDestSpec_ReturnsFalse()
        {
            // Arrange — every gate but the non-empty-dest check passes
            BackupValidationResult validateOk = new BackupValidationResult(
                true,
                EmptyString,
                EmptyString
            );

            // Act
            bool actual = BackupValidationService.IsOkGateOpen(
                result: validateOk,
                selectedBookCount: 5,
                isNoteType: false,
                destFileSpec: EmptyString
            );

            // Assert — empty dest disables OK; the gate alone is the signal (no ErrorKey path).
            Assert.That(
                actual,
                Is.False,
                "Empty destFileSpec must disable cmdOK with no error message (VAL-B04 / TS-061)"
            );
        }

        // ===================================================================
        // IsOkGateOpen — invalid ValidateData short-circuits the gate.
        //
        // If ValidateData returned IsValid=false (for ANY reason), the composite gate
        // MUST return false regardless of book-count, Notes-type, or dest values.
        //
        // This pins the AND-semantics of the PT9 gate at BackupForm.cs:112:
        //   cmdOK.Enabled = ValidateData() && (...books...) && (...dest...);
        // ===================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-014")]
        [Property("ExtractionId", "EXT-103")]
        [Property("BehaviorId", "BHV-308")]
        public void IsOkGateOpen_WithInvalidValidateResult_ReturnsFalse()
        {
            // Arrange — ValidateData returned failure (any field); every other gate would pass
            BackupValidationResult validateFailed = new BackupValidationResult(
                false,
                ResourceProjectErrorKey,
                ProjectIdField
            );

            // Act
            bool actual = BackupValidationService.IsOkGateOpen(
                result: validateFailed,
                selectedBookCount: 5,
                isNoteType: false,
                destFileSpec: ValidDestSpec
            );

            // Assert — invalid ValidateData propagates through (AND-semantics).
            Assert.That(
                actual,
                Is.False,
                "Failed ValidateData must short-circuit the composite gate to false"
            );
        }

        // ===================================================================
        // IsOkGateOpen — parameterised matrix.
        //
        // Truth-table form of the composite gate. Each row pins one configuration of
        // (validateOK, bookCount, isNoteType, destNonEmpty) → expected gate value.
        // Acts as a belt-and-braces summary alongside the named tests above.
        //
        // Rows cover all 4 input dimensions' "edge of true/false" combinations relevant
        // to BHV-308. The named tests above carry the spec-level evidence; this matrix
        // catches degenerate implementations (e.g. ignoring a parameter).
        // ===================================================================

        [TestCase(true, 5, false, ValidDestSpec, true, TestName = "Happy path → enabled (TS-054)")]
        [TestCase(
            true,
            0,
            true,
            ValidDestSpec,
            true,
            TestName = "Notes-bypass with 0 books → enabled (TS-055 / gm-023)"
        )]
        [TestCase(
            true,
            0,
            false,
            ValidDestSpec,
            false,
            TestName = "Translation with 0 books → disabled (TS-056)"
        )]
        [TestCase(true, 5, false, EmptyString, false, TestName = "Empty dest → disabled (TS-061)")]
        [TestCase(
            false,
            5,
            false,
            ValidDestSpec,
            false,
            TestName = "ValidateData failure → disabled (short-circuit)"
        )]
        [TestCase(
            false,
            0,
            true,
            ValidDestSpec,
            false,
            TestName = "ValidateData failure even with Notes-bypass → disabled"
        )]
        [TestCase(
            false,
            5,
            false,
            EmptyString,
            false,
            TestName = "ValidateData failure AND empty dest → disabled"
        )]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-014")]
        [Property("ExtractionId", "EXT-103")]
        [Property("BehaviorId", "BHV-308")]
        public void IsOkGateOpen_TruthTableMatrix_ReturnsExpected(
            bool validateOK,
            int selectedBookCount,
            bool isNoteType,
            string destFileSpec,
            bool expected
        )
        {
            // Arrange — synthesize a ValidateData result with the given IsValid value.
            // The ErrorKey/ErrorField contents do not matter to IsOkGateOpen's contract;
            // only the IsValid bit is read.
            BackupValidationResult validateResult = new BackupValidationResult(
                validateOK,
                validateOK ? EmptyString : ResourceProjectErrorKey,
                validateOK ? EmptyString : ProjectIdField
            );

            // Act
            bool actual = BackupValidationService.IsOkGateOpen(
                result: validateResult,
                selectedBookCount: selectedBookCount,
                isNoteType: isNoteType,
                destFileSpec: destFileSpec
            );

            // Assert
            Assert.That(actual, Is.EqualTo(expected));
        }

        // ===================================================================
        // BackupValidationResult — record value-equality.
        //
        // Pins the record semantics so downstream capabilities (CAP-010 wraps it
        // into the wire shape; CAP-022 reads it in the BackupOrchestrator pre-flight)
        // can rely on value-based equality + the (IsValid, ErrorKey, ErrorField)
        // positional shape.
        // ===================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-014")]
        public void BackupValidationResult_TwoInstancesWithSameValues_AreEqual()
        {
            // Arrange — two records with identical field values
            BackupValidationResult a = new BackupValidationResult(true, EmptyString, EmptyString);
            BackupValidationResult b = new BackupValidationResult(true, EmptyString, EmptyString);

            // Act + Assert — value-equality (record semantics)
            Assert.That(b, Is.EqualTo(a));
            Assert.That(b.GetHashCode(), Is.EqualTo(a.GetHashCode()));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-014")]
        public void BackupValidationResult_PositionalFields_AreReadable()
        {
            // Arrange
            BackupValidationResult r = new BackupValidationResult(
                false,
                UserNameRequiredErrorKey,
                UserNameField
            );

            // Assert — positional → named property access works (record contract)
            Assert.That(r.IsValid, Is.False);
            Assert.That(r.ErrorKey, Is.EqualTo(UserNameRequiredErrorKey));
            Assert.That(r.ErrorField, Is.EqualTo(UserNameField));
        }
    }
}
