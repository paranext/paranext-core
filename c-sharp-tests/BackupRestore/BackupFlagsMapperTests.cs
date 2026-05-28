using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.BackupRestore;

namespace TestParanextDataProvider.BackupRestore
{
    /// <summary>
    /// Tests for <see cref="BackupFlagsMapper.MapFromCheckbox"/>
    /// (CAP-016 / EXT-106 / BHV-309).
    ///
    /// Pure-function mapper:
    /// <c>(bool includeFullSizeFigures) -> IncludeFiguresFlags</c>.
    /// <c>false -&gt; Figures</c>; <c>true -&gt; Figures | LocalFigures</c>.
    ///
    /// Specification sources:
    /// <list type="bullet">
    ///   <item>data-contracts.md §3.6 — IncludeFiguresFlags enum mapping (line 676-686)</item>
    ///   <item>data-contracts.md §2.1 — C# enum block (line 145-154) — locks the PT10 value layout (Figures=1, LocalFigures=2)</item>
    ///   <item>implementation/backend-alignment.md §EXT-106 — full signature (line 209-215)</item>
    ///   <item>implementation/extraction-plan.md §EXT-106 — extraction stub (line 238-259)</item>
    ///   <item>implementation/shared-types.md — IncludeFiguresFlags enum + BackupRequest record</item>
    ///   <item>behavior-catalog.md §BHV-309 — chkIncludeFullSizeFigures enabled-state</item>
    ///   <item>business-rules.md §INV-A06 — Figures inclusion independent of BookSet (verified downstream in CAP-022, not here — see test-writer-CAP-016.md §Resolved Ambiguities)</item>
    ///   <item>strategic-plan-backend.md §CAP-016 — acceptance test line + edge cases</item>
    /// </list>
    ///
    /// PT9 source: <c>Paratext/BackupRestore/BackupForm.cs:204-208</c> (cmdOK_Click):
    /// <code>
    /// Backup.BackupScrText(scrText, txtTo.Text, backupFolder,
    ///         selectedBooks, chkIncludeFullSizeFigures.Checked ?
    ///             Backup.IncludeFiguresFlags.LocalFigures | Backup.IncludeFiguresFlags.Figures :
    ///             Backup.IncludeFiguresFlags.Figures,
    ///         txtGeneralDescription.Text + " - " + txtUserComment.Text, false);
    /// </code>
    ///
    /// PT9 source: <c>Paratext/BackupRestore/Backup.cs:19-28</c> (PT9 enum — DIFFERENT layout):
    /// <code>
    /// [Flags]
    /// public enum IncludeFiguresFlags
    /// {
    ///     None = 0,
    ///     LocalFigures = 1,     // ← PT9 ordering
    ///     Figures      = 2      // ← PT9 ordering
    /// }
    /// </code>
    ///
    /// PT10 deltas vs PT9:
    /// <list type="bullet">
    ///   <item><b>Enum value layout SWAPPED</b>: PT10 declares <c>Figures = 1, LocalFigures = 2</c>
    ///   (data-contracts.md §2.1) — the SEMANTICS (which bits mean what) match PT9, but the numeric
    ///   layout is owned by PT10's wire contract. The TypeScript counterpart locks the layout via
    ///   numeric literals. Tests in this file assert on FLAG SEMANTICS (<c>.HasFlag(...)</c>) AND
    ///   enum-equality so the contract is pinned at both layers.</item>
    ///   <item><b>Pure function extracted</b>: PT9 inlines the ternary directly into the
    ///   <c>Backup.BackupScrText</c> call site; PT10 names the operation
    ///   <see cref="BackupFlagsMapper.MapFromCheckbox"/> so the wire-boundary CAP-002 (M-001) and
    ///   the orchestrator CAP-022 share a single source of truth.</item>
    /// </list>
    ///
    /// Scenarios TS-062 and TS-063 are listed in strategic-plan-backend.md §CAP-016 but their
    /// <c>logicLayer: UI</c> tag + <c>coverageNote</c> in characterization/test-scenarios.json
    /// defer their actual coverage to the Phase 3 UI work (ui-spec-backup-form.md).
    /// They are referenced transitively here because BHV-309 is their parent behavior and the
    /// backend mapper is the boolean-state-to-flag derivative.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class BackupFlagsMapperTests
    {
        // -------------------------------------------------------------------
        // Strategic-plan acceptance test #1 — checkbox UNCHECKED → Figures only.
        //
        // From strategic-plan-backend.md §CAP-016 acceptance-test line:
        //   "MapFromCheckbox(false) returns IncludeFiguresFlags.Figures"
        //
        // PT9 source — the `false` branch of the ternary at BackupForm.cs:207:
        //   chkIncludeFullSizeFigures.Checked ? ... : Backup.IncludeFiguresFlags.Figures
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-016")]
        [Property("ExtractionId", "EXT-106")]
        [Property("BehaviorId", "BHV-309")]
        [Property("ScenarioId", "TS-062")]
        [Property("ScenarioId", "TS-063")]
        public void MapFromCheckbox_WithFalse_ReturnsFiguresOnly()
        {
            // Arrange — checkbox unchecked

            // Act
            IncludeFiguresFlags actual = BackupFlagsMapper.MapFromCheckbox(false);

            // Assert — single-flag value Figures only
            Assert.That(actual, Is.EqualTo(IncludeFiguresFlags.Figures));
        }

        // -------------------------------------------------------------------
        // Strategic-plan acceptance test #2 — checkbox CHECKED → Figures + LocalFigures.
        //
        // From strategic-plan-backend.md §CAP-016 acceptance-test line:
        //   "MapFromCheckbox(true) returns IncludeFiguresFlags.Figures | IncludeFiguresFlags.LocalFigures"
        //
        // PT9 source — the `true` branch of the ternary at BackupForm.cs:206:
        //   Backup.IncludeFiguresFlags.LocalFigures | Backup.IncludeFiguresFlags.Figures
        // (Note: PT9 lists LocalFigures first; bitwise OR is commutative, so the result is the
        //  same set of bits — equivalent to PT10's `Figures | LocalFigures`.)
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Category("Extraction")]
        [Property("CapabilityId", "CAP-016")]
        [Property("ExtractionId", "EXT-106")]
        [Property("BehaviorId", "BHV-309")]
        [Property("ScenarioId", "TS-062")]
        [Property("ScenarioId", "TS-063")]
        public void MapFromCheckbox_WithTrue_ReturnsFiguresAndLocalFigures()
        {
            // Arrange — checkbox checked

            // Act
            IncludeFiguresFlags actual = BackupFlagsMapper.MapFromCheckbox(true);

            // Assert — both-flag value (Figures | LocalFigures)
            Assert.That(
                actual,
                Is.EqualTo(IncludeFiguresFlags.Figures | IncludeFiguresFlags.LocalFigures)
            );
        }

        // -------------------------------------------------------------------
        // Defensive: flag SEMANTICS for the `false` branch.
        //
        // Asserts on .HasFlag(...) — orthogonal to the enum-equality test above.
        // If a future regression swapped the enum's numeric values, the equality
        // test would still pass (the enum members re-bind to the swapped values)
        // — but a wire-serialization test would fail. Asserting BOTH layers
        // documents the contract twice: by name AND by semantic.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-016")]
        [Property("ExtractionId", "EXT-106")]
        [Property("BehaviorId", "BHV-309")]
        public void MapFromCheckbox_WithFalse_HasFiguresFlagButNotLocalFiguresFlag()
        {
            // Act
            IncludeFiguresFlags actual = BackupFlagsMapper.MapFromCheckbox(false);

            // Assert — Figures set, LocalFigures NOT set
            Assert.That(
                actual.HasFlag(IncludeFiguresFlags.Figures),
                Is.True,
                "Figures bit must be set when checkbox is unchecked"
            );
            Assert.That(
                actual.HasFlag(IncludeFiguresFlags.LocalFigures),
                Is.False,
                "LocalFigures bit must NOT be set when checkbox is unchecked"
            );
        }

        // -------------------------------------------------------------------
        // Defensive: flag SEMANTICS for the `true` branch.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-016")]
        [Property("ExtractionId", "EXT-106")]
        [Property("BehaviorId", "BHV-309")]
        public void MapFromCheckbox_WithTrue_HasBothFiguresAndLocalFiguresFlags()
        {
            // Act
            IncludeFiguresFlags actual = BackupFlagsMapper.MapFromCheckbox(true);

            // Assert — both bits set
            Assert.That(
                actual.HasFlag(IncludeFiguresFlags.Figures),
                Is.True,
                "Figures bit must be set when checkbox is checked"
            );
            Assert.That(
                actual.HasFlag(IncludeFiguresFlags.LocalFigures),
                Is.True,
                "LocalFigures bit must be set when checkbox is checked"
            );
        }

        // -------------------------------------------------------------------
        // Mapper NEVER returns None — the Figures bit is ALWAYS set.
        //
        // BHV-309 + PT9 source make this explicit: the ternary's `false` branch is
        // `Figures`, NOT `None`. A defensive impl that mistakenly returns `None`
        // for unchecked (e.g. "if checkbox is unchecked, include nothing") would
        // be a regression.
        //
        // Note: the actual values produced are covered by the equality tests above;
        // this test exists purely to pin "never None" as a separate, named contract.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-016")]
        [Property("ExtractionId", "EXT-106")]
        [Property("BehaviorId", "BHV-309")]
        public void MapFromCheckbox_BothInputs_NeverReturnsNone()
        {
            // Act
            IncludeFiguresFlags forFalse = BackupFlagsMapper.MapFromCheckbox(false);
            IncludeFiguresFlags forTrue = BackupFlagsMapper.MapFromCheckbox(true);

            // Assert — the Figures bit is always set (BHV-309 invariant: the
            // checkbox only controls LocalFigures, not whether ANY figures are
            // included).
            Assert.That(
                forFalse,
                Is.Not.EqualTo(IncludeFiguresFlags.None),
                "MapFromCheckbox(false) must never return None — Figures is always included"
            );
            Assert.That(
                forTrue,
                Is.Not.EqualTo(IncludeFiguresFlags.None),
                "MapFromCheckbox(true) must never return None — both bits are set"
            );
        }

        // -------------------------------------------------------------------
        // Distinct input → distinct output. Catches a degenerate impl like
        // `return IncludeFiguresFlags.Figures;` that ignores the parameter.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-016")]
        [Property("ExtractionId", "EXT-106")]
        [Property("BehaviorId", "BHV-309")]
        public void MapFromCheckbox_WithFalseVsTrue_ProducesDistinctOutputs()
        {
            // Act
            IncludeFiguresFlags forFalse = BackupFlagsMapper.MapFromCheckbox(false);
            IncludeFiguresFlags forTrue = BackupFlagsMapper.MapFromCheckbox(true);

            // Assert — the two outputs must differ. A constant-returning impl
            // (ignoring the parameter) would fail this.
            Assert.That(
                forTrue,
                Is.Not.EqualTo(forFalse),
                "MapFromCheckbox must observe its parameter — outputs for true vs false must differ"
            );
        }

        // -------------------------------------------------------------------
        // Determinism / function purity — two calls with identical input return
        // identical output. Catches an impl with hidden state, randomness, or
        // a time-dependent path.
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-016")]
        [Property("ExtractionId", "EXT-106")]
        [Property("BehaviorId", "BHV-309")]
        public void MapFromCheckbox_CalledTwiceWithSameInput_ReturnsSameOutput()
        {
            // Act — two calls per branch
            IncludeFiguresFlags firstFalse = BackupFlagsMapper.MapFromCheckbox(false);
            IncludeFiguresFlags secondFalse = BackupFlagsMapper.MapFromCheckbox(false);
            IncludeFiguresFlags firstTrue = BackupFlagsMapper.MapFromCheckbox(true);
            IncludeFiguresFlags secondTrue = BackupFlagsMapper.MapFromCheckbox(true);

            // Assert — identical outputs for identical inputs
            Assert.That(
                secondFalse,
                Is.EqualTo(firstFalse),
                "MapFromCheckbox(false) must be deterministic"
            );
            Assert.That(
                secondTrue,
                Is.EqualTo(firstTrue),
                "MapFromCheckbox(true) must be deterministic"
            );
        }

        // -------------------------------------------------------------------
        // Parameterised matrix — full input/output table per BHV-309.
        //
        // Pins both legs of the contract in a single test method, making the
        // contract trivially readable as a 2-row truth table. Acts as a
        // belt-and-braces check next to the two acceptance tests above.
        // -------------------------------------------------------------------

        [TestCase(false, IncludeFiguresFlags.Figures, TestName = "Unchecked → Figures only")]
        [TestCase(
            true,
            IncludeFiguresFlags.Figures | IncludeFiguresFlags.LocalFigures,
            TestName = "Checked → Figures | LocalFigures"
        )]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-016")]
        [Property("ExtractionId", "EXT-106")]
        [Property("BehaviorId", "BHV-309")]
        public void MapFromCheckbox_WithMatrixInput_ReturnsExpectedFlagCombination(
            bool includeFullSizeFigures,
            IncludeFiguresFlags expected
        )
        {
            // Act
            IncludeFiguresFlags actual = BackupFlagsMapper.MapFromCheckbox(includeFullSizeFigures);

            // Assert
            Assert.That(actual, Is.EqualTo(expected));
        }
    }
}
