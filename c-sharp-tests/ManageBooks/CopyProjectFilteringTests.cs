using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ManageBooks;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using PtxUtils;
using ProjectType = Paratext.Data.ProjectType;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Orchestrator-level tests for CAP-008
    /// <see cref="CopyBooksOrchestrator.GetToProjectFilter(Enum{ProjectType})"/> and
    /// <see cref="CopyBooksOrchestrator.GetToProjectFilterProjects(Enum{ProjectType})"/>.
    ///
    /// Capability: CAP-008 CopyProjectFiltering (Outside-In TDD)
    /// Contracts:
    /// - Section 2.8 <c>ProjectFilterInput</c>
    /// - Section 3.8 <c>ProjectListResult</c> / <c>ProjectSummary</c>
    /// - Section 4.9 <c>GetToProjectFilter</c> (M-009)
    ///
    /// Extraction: EXT-009 (<c>CopyBooksForm.LoadToComboboxOptions</c>,
    /// PT9 <c>Paratext/ToolsMenu/CopyBooksForm.cs:533-571</c>).
    ///
    /// Tests derive expected behavior from:
    /// - PT9 source: <c>Paratext/ToolsMenu/CopyBooksForm.cs:533-571</c>
    /// - Golden masters: gm-007 (Standard source), gm-008 (Aux/BT/Daughter + StudyBible + SBA + ConsultantNotes)
    /// - Scenarios: TS-065 (Standard excludes ConsultantNotes + TransliterationWithEncoder),
    ///   TS-066 (Auxiliary allowed set)
    /// - Behaviors: BHV-603 (Standard/null source), BHV-606 (parameterized types)
    /// - Data contract Section 4.9 "Business Logic"
    ///
    /// PT9 DECISION TREE (CopyBooksForm.cs:539-553):
    ///
    ///   fromScrText == null
    ///       → scrText.IsNonProtectedText() && type != TransliterationWithEncoder
    ///           && !scrText.Settings.IsStudyBiblePublication
    ///
    ///   fromProjectType in { StudyBibleAdditions, StudyBible, ConsultantNotes }
    ///       → scrText.Type == fromProjectType (same-type only)
    ///
    ///   otherwise (Standard, Auxiliary, BackTranslation, Daughter,
    ///              TransliterationManual, TransliterationWithEncoder)
    ///       → scrText.Type in { Standard, Auxiliary, BackTranslation,
    ///                           Daughter, StudyBible, TransliterationManual }
    ///
    /// NOTE ON gm-007 / §4.9 DIVERGENCE:
    /// - gm-007/expected-output.json lists allowed = [Standard, BackTranslation,
    ///   Daughter, Auxiliary, TransliterationManual, StudyBible] for a Standard
    ///   source — i.e. SBA is excluded. This aligns with PT9's
    ///   !IsStudyBiblePublication predicate.
    /// - §4.9 Business Logic simplifies to "Standard/null source: all except
    ///   ConsultantNotes and TransliterationWithEncoder", leaving SBA ambiguous.
    /// - We follow gm-007 + PT9 source: Standard source excludes ConsultantNotes,
    ///   TransliterationWithEncoder, AND SBA (via IsStudyBiblePublication).
    /// - A Standard `fromProjectType` argument drives the "parameterized types"
    ///   branch in PT9 (it is NOT the null-source branch). So Standard-source
    ///   behavior here = parameterized branch, which also excludes SBA.
    ///   gm-007's allowed list matches the parameterized branch set.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class CopyProjectFilteringTests : PapiTestBase
    {
        // Canonical project naming: name is `"Proj{ProjectType}"` so test
        // assertions read cleanly. One DummyScrText per ProjectType seeded in
        // SetUp so every decision-tree branch has a candidate to accept or reject.
        private DummyScrText _standard = null!;
        private DummyScrText _auxiliary = null!;
        private DummyScrText _backTranslation = null!;
        private DummyScrText _daughter = null!;
        private DummyScrText _studyBible = null!;
        private DummyScrText _studyBibleAdditions = null!;
        private DummyScrText _transliterationManual = null!;
        private DummyScrText _transliterationWithEncoder = null!;
        private DummyScrText _consultantNotes = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _standard = CreateScrText("ProjStandard", ProjectType.Standard);
            _auxiliary = CreateScrText("ProjAuxiliary", ProjectType.Auxiliary);
            _backTranslation = CreateScrText("ProjBackTranslation", ProjectType.BackTranslation);
            _daughter = CreateScrText("ProjDaughter", ProjectType.Daughter);
            _studyBible = CreateScrText("ProjStudyBible", ProjectType.StudyBible);
            _studyBibleAdditions = CreateScrText(
                "ProjStudyBibleAdditions",
                ProjectType.StudyBibleAdditions
            );
            _transliterationManual = CreateScrText(
                "ProjTransliterationManual",
                ProjectType.TransliterationManual
            );
            _transliterationWithEncoder = CreateScrText(
                "ProjTransliterationWithEncoder",
                ProjectType.TransliterationWithEncoder
            );
            _consultantNotes = CreateScrText("ProjConsultantNotes", ProjectType.ConsultantNotes);

            AddProject(_standard);
            AddProject(_auxiliary);
            AddProject(_backTranslation);
            AddProject(_daughter);
            AddProject(_studyBible);
            AddProject(_studyBibleAdditions);
            AddProject(_transliterationManual);
            AddProject(_transliterationWithEncoder);
            AddProject(_consultantNotes);
        }

        [TearDown]
        public void TestTearDownScrTexts()
        {
            _standard?.Dispose();
            _auxiliary?.Dispose();
            _backTranslation?.Dispose();
            _daughter?.Dispose();
            _studyBible?.Dispose();
            _studyBibleAdditions?.Dispose();
            _transliterationManual?.Dispose();
            _transliterationWithEncoder?.Dispose();
            _consultantNotes?.Dispose();
        }

        // =====================================================================
        // GetToProjectFilter (predicate form) — per-source-type decision tree.
        //
        // BHV-606: Standard/Auxiliary/BackTranslation/Daughter/Transliteration*
        // all share the parameterized-types set.
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-008")]
        [Property("ScenarioId", "TS-065")]
        [Property("BehaviorId", "BHV-603")]
        [Property("BehaviorId", "BHV-606")]
        [Property("GoldenMaster", "gm-007")]
        [Description(
            "TS-065 / BHV-603 / gm-007: Standard source -> parameterized-types "
                + "set. The predicate accepts Standard, Auxiliary, BackTranslation, "
                + "Daughter, StudyBible, TransliterationManual; rejects "
                + "ConsultantNotes, StudyBibleAdditions, and "
                + "TransliterationWithEncoder."
        )]
        public void GetToProjectFilter_StandardSource_AllowsParameterizedSet()
        {
            Predicate<ScrText> predicate = CopyBooksOrchestrator.GetToProjectFilter(
                ProjectType.Standard
            );

            Assert.That(predicate(_standard), Is.True, "Standard allowed for Standard source");
            Assert.That(predicate(_auxiliary), Is.True, "Auxiliary allowed for Standard source");
            Assert.That(
                predicate(_backTranslation),
                Is.True,
                "BackTranslation allowed for Standard source"
            );
            Assert.That(predicate(_daughter), Is.True, "Daughter allowed for Standard source");
            Assert.That(predicate(_studyBible), Is.True, "StudyBible allowed for Standard source");
            Assert.That(
                predicate(_transliterationManual),
                Is.True,
                "TransliterationManual allowed for Standard source"
            );

            Assert.That(
                predicate(_consultantNotes),
                Is.False,
                "BHV-603: ConsultantNotes excluded for Standard source"
            );
            Assert.That(
                predicate(_studyBibleAdditions),
                Is.False,
                "StudyBibleAdditions excluded for Standard source (parameterized set)"
            );
            Assert.That(
                predicate(_transliterationWithEncoder),
                Is.False,
                "BHV-603: TransliterationWithEncoder excluded for Standard source"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-008")]
        [Property("ScenarioId", "TS-066")]
        [Property("BehaviorId", "BHV-606")]
        [Property("GoldenMaster", "gm-008")]
        [Description(
            "TS-066 / BHV-606 / gm-008: Auxiliary source -> parameterized-types "
                + "set (same as Standard)."
        )]
        public void GetToProjectFilter_AuxiliarySource_AllowsParameterizedSet()
        {
            Predicate<ScrText> predicate = CopyBooksOrchestrator.GetToProjectFilter(
                ProjectType.Auxiliary
            );

            Assert.That(predicate(_standard), Is.True);
            Assert.That(predicate(_auxiliary), Is.True);
            Assert.That(predicate(_backTranslation), Is.True);
            Assert.That(predicate(_daughter), Is.True);
            Assert.That(predicate(_studyBible), Is.True);
            Assert.That(predicate(_transliterationManual), Is.True);

            Assert.That(predicate(_consultantNotes), Is.False);
            Assert.That(predicate(_studyBibleAdditions), Is.False);
            Assert.That(predicate(_transliterationWithEncoder), Is.False);
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-606")]
        [Description(
            "BHV-606: BackTranslation source uses the same parameterized-types "
                + "set as Standard/Auxiliary. PT9 CopyBooksForm.cs:550-553 — all "
                + "non-SBA/non-StudyBible/non-ConsultantNotes sources fall into "
                + "the same else branch."
        )]
        public void GetToProjectFilter_BackTranslationSource_AllowsParameterizedSet()
        {
            Predicate<ScrText> predicate = CopyBooksOrchestrator.GetToProjectFilter(
                ProjectType.BackTranslation
            );

            Assert.That(predicate(_standard), Is.True);
            Assert.That(predicate(_backTranslation), Is.True);
            Assert.That(predicate(_daughter), Is.True);
            Assert.That(predicate(_studyBible), Is.True);
            Assert.That(predicate(_transliterationManual), Is.True);
            Assert.That(predicate(_auxiliary), Is.True);

            Assert.That(predicate(_consultantNotes), Is.False);
            Assert.That(predicate(_transliterationWithEncoder), Is.False);
            Assert.That(predicate(_studyBibleAdditions), Is.False);
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-606")]
        [Description(
            "BHV-606: Daughter source uses the same parameterized-types set "
                + "as Standard/Auxiliary/BackTranslation."
        )]
        public void GetToProjectFilter_DaughterSource_AllowsParameterizedSet()
        {
            Predicate<ScrText> predicate = CopyBooksOrchestrator.GetToProjectFilter(
                ProjectType.Daughter
            );

            Assert.That(predicate(_standard), Is.True);
            Assert.That(predicate(_backTranslation), Is.True);
            Assert.That(predicate(_daughter), Is.True);
            Assert.That(predicate(_studyBible), Is.True);
            Assert.That(predicate(_transliterationManual), Is.True);
            Assert.That(predicate(_auxiliary), Is.True);

            Assert.That(predicate(_consultantNotes), Is.False);
            Assert.That(predicate(_transliterationWithEncoder), Is.False);
            Assert.That(predicate(_studyBibleAdditions), Is.False);
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-606")]
        [Description(
            "BHV-606: TransliterationManual source falls into the parameterized-"
                + "types branch (PT9 else clause at CopyBooksForm.cs:549-553)."
        )]
        public void GetToProjectFilter_TransliterationManualSource_AllowsParameterizedSet()
        {
            Predicate<ScrText> predicate = CopyBooksOrchestrator.GetToProjectFilter(
                ProjectType.TransliterationManual
            );

            Assert.That(predicate(_standard), Is.True);
            Assert.That(predicate(_auxiliary), Is.True);
            Assert.That(predicate(_backTranslation), Is.True);
            Assert.That(predicate(_daughter), Is.True);
            Assert.That(predicate(_studyBible), Is.True);
            Assert.That(predicate(_transliterationManual), Is.True);

            Assert.That(predicate(_consultantNotes), Is.False);
            Assert.That(predicate(_transliterationWithEncoder), Is.False);
            Assert.That(predicate(_studyBibleAdditions), Is.False);
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-606")]
        [Description(
            "PT9 else branch (CopyBooksForm.cs:549-553) accepts "
                + "TransliterationWithEncoder as a from-type and routes it to the "
                + "parameterized-types set. This documents the PT9 fall-through "
                + "behavior for a TransliterationWithEncoder-as-source."
        )]
        public void GetToProjectFilter_TransliterationWithEncoderSource_AllowsParameterizedSet()
        {
            Predicate<ScrText> predicate = CopyBooksOrchestrator.GetToProjectFilter(
                ProjectType.TransliterationWithEncoder
            );

            Assert.That(predicate(_standard), Is.True);
            Assert.That(predicate(_auxiliary), Is.True);
            Assert.That(predicate(_backTranslation), Is.True);
            Assert.That(predicate(_daughter), Is.True);
            Assert.That(predicate(_studyBible), Is.True);
            Assert.That(predicate(_transliterationManual), Is.True);

            Assert.That(predicate(_consultantNotes), Is.False);
            Assert.That(predicate(_transliterationWithEncoder), Is.False);
            Assert.That(predicate(_studyBibleAdditions), Is.False);
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-606")]
        [Property("GoldenMaster", "gm-008")]
        [Description(
            "gm-008 StudyBible case: StudyBible source -> only StudyBible "
                + "destinations. PT9 CopyBooksForm.cs:546-549 — StudyBible / SBA "
                + "/ ConsultantNotes all copy same-type only."
        )]
        public void GetToProjectFilter_StudyBibleSource_AllowsOnlyStudyBible()
        {
            Predicate<ScrText> predicate = CopyBooksOrchestrator.GetToProjectFilter(
                ProjectType.StudyBible
            );

            Assert.That(
                predicate(_studyBible),
                Is.True,
                "StudyBible allowed for StudyBible source"
            );

            Assert.That(predicate(_standard), Is.False);
            Assert.That(predicate(_auxiliary), Is.False);
            Assert.That(predicate(_backTranslation), Is.False);
            Assert.That(predicate(_daughter), Is.False);
            Assert.That(predicate(_studyBibleAdditions), Is.False);
            Assert.That(predicate(_transliterationManual), Is.False);
            Assert.That(predicate(_transliterationWithEncoder), Is.False);
            Assert.That(predicate(_consultantNotes), Is.False);
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-606")]
        [Description(
            "PT9 same-type short-circuit (CopyBooksForm.cs:546-549): "
                + "StudyBibleAdditions source -> only StudyBibleAdditions "
                + "destinations. SBA source filtering is partially out of scope "
                + "per BHV-604/605 (OUT_OF_SCOPE), but the decision tree must "
                + "remain total — unknown/SBA sources still route cleanly."
        )]
        public void GetToProjectFilter_StudyBibleAdditionsSource_AllowsOnlyStudyBibleAdditions()
        {
            Predicate<ScrText> predicate = CopyBooksOrchestrator.GetToProjectFilter(
                ProjectType.StudyBibleAdditions
            );

            Assert.That(predicate(_studyBibleAdditions), Is.True);

            Assert.That(predicate(_standard), Is.False);
            Assert.That(predicate(_auxiliary), Is.False);
            Assert.That(predicate(_backTranslation), Is.False);
            Assert.That(predicate(_daughter), Is.False);
            Assert.That(predicate(_studyBible), Is.False);
            Assert.That(predicate(_transliterationManual), Is.False);
            Assert.That(predicate(_transliterationWithEncoder), Is.False);
            Assert.That(predicate(_consultantNotes), Is.False);
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-606")]
        [Description(
            "PT9 same-type short-circuit (CopyBooksForm.cs:546-549): "
                + "ConsultantNotes source -> only ConsultantNotes destinations. "
                + "Preserves PT9 parity; keeps the decision tree total."
        )]
        public void GetToProjectFilter_ConsultantNotesSource_AllowsOnlyConsultantNotes()
        {
            Predicate<ScrText> predicate = CopyBooksOrchestrator.GetToProjectFilter(
                ProjectType.ConsultantNotes
            );

            Assert.That(predicate(_consultantNotes), Is.True);

            Assert.That(predicate(_standard), Is.False);
            Assert.That(predicate(_auxiliary), Is.False);
            Assert.That(predicate(_backTranslation), Is.False);
            Assert.That(predicate(_daughter), Is.False);
            Assert.That(predicate(_studyBible), Is.False);
            Assert.That(predicate(_studyBibleAdditions), Is.False);
            Assert.That(predicate(_transliterationManual), Is.False);
            Assert.That(predicate(_transliterationWithEncoder), Is.False);
        }

        // =====================================================================
        // GetToProjectFilterProjects (ScrTextCollection integration) —
        // gm-007 / gm-008 acceptance at the orchestrator level.
        // =====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-008")]
        [Property("ScenarioId", "TS-065")]
        [Property("BehaviorId", "BHV-603")]
        [Property("GoldenMaster", "gm-007")]
        [Description(
            "gm-007 ACCEPTANCE: Standard source returns ProjectListResult "
                + "containing exactly the gm-007 allowed types (Standard, "
                + "BackTranslation, Daughter, Auxiliary, TransliterationManual, "
                + "StudyBible). ConsultantNotes and TransliterationWithEncoder "
                + "are excluded."
        )]
        public void GetToProjectFilterProjects_StandardSource_MatchesGm007AllowedTypes()
        {
            ProjectListResult result = CopyBooksOrchestrator.GetToProjectFilterProjects(
                ProjectType.Standard
            );

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Projects, Is.Not.Null);
            var names = result.Projects.Select(p => p.Name).ToList();

            Assert.That(names, Has.Member(_standard.Name), "Standard is allowed (gm-007)");
            Assert.That(
                names,
                Has.Member(_backTranslation.Name),
                "BackTranslation is allowed (gm-007)"
            );
            Assert.That(names, Has.Member(_daughter.Name), "Daughter is allowed (gm-007)");
            Assert.That(names, Has.Member(_auxiliary.Name), "Auxiliary is allowed (gm-007)");
            Assert.That(
                names,
                Has.Member(_transliterationManual.Name),
                "TransliterationManual is allowed (gm-007)"
            );
            Assert.That(names, Has.Member(_studyBible.Name), "StudyBible is allowed (gm-007)");

            Assert.That(
                names,
                Has.No.Member(_consultantNotes.Name),
                "gm-007: ConsultantNotes excluded for Standard source"
            );
            Assert.That(
                names,
                Has.No.Member(_transliterationWithEncoder.Name),
                "gm-007: TransliterationWithEncoder excluded for Standard source"
            );
        }

        [Test]
        [Category("Acceptance")]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-008")]
        [Property("ScenarioId", "TS-066")]
        [Property("BehaviorId", "BHV-606")]
        [Property("GoldenMaster", "gm-008")]
        [Description(
            "gm-008 ACCEPTANCE (Auxiliary test case): Auxiliary source returns "
                + "ProjectListResult with allowed = [Auxiliary, BackTranslation, "
                + "Daughter, Standard, StudyBible, TransliterationManual]; "
                + "excluded = [ConsultantNotes, StudyBibleAdditions, "
                + "TransliterationWithEncoder]."
        )]
        public void GetToProjectFilterProjects_AuxiliarySource_MatchesGm008AuxiliaryCase()
        {
            ProjectListResult result = CopyBooksOrchestrator.GetToProjectFilterProjects(
                ProjectType.Auxiliary
            );

            var names = result.Projects.Select(p => p.Name).ToList();

            Assert.That(names, Has.Member(_auxiliary.Name));
            Assert.That(names, Has.Member(_backTranslation.Name));
            Assert.That(names, Has.Member(_daughter.Name));
            Assert.That(names, Has.Member(_standard.Name));
            Assert.That(names, Has.Member(_studyBible.Name));
            Assert.That(names, Has.Member(_transliterationManual.Name));

            Assert.That(names, Has.No.Member(_consultantNotes.Name));
            Assert.That(
                names,
                Has.No.Member(_studyBibleAdditions.Name),
                "gm-008 (Aux case): SBA is excluded"
            );
            Assert.That(names, Has.No.Member(_transliterationWithEncoder.Name));
        }

        [Test]
        [Category("Acceptance")]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-606")]
        [Property("GoldenMaster", "gm-008")]
        [Description(
            "gm-008 (StudyBible case): StudyBible source returns ProjectListResult "
                + "with allowed = [StudyBible]; all other types excluded."
        )]
        public void GetToProjectFilterProjects_StudyBibleSource_MatchesGm008StudyBibleCase()
        {
            ProjectListResult result = CopyBooksOrchestrator.GetToProjectFilterProjects(
                ProjectType.StudyBible
            );

            var names = result.Projects.Select(p => p.Name).ToList();

            Assert.That(names, Has.Member(_studyBible.Name), "Only StudyBible accepted");

            Assert.That(names, Has.No.Member(_standard.Name));
            Assert.That(names, Has.No.Member(_auxiliary.Name));
            Assert.That(names, Has.No.Member(_backTranslation.Name));
            Assert.That(names, Has.No.Member(_daughter.Name));
            Assert.That(names, Has.No.Member(_studyBibleAdditions.Name));
            Assert.That(names, Has.No.Member(_transliterationManual.Name));
            Assert.That(names, Has.No.Member(_transliterationWithEncoder.Name));
            Assert.That(names, Has.No.Member(_consultantNotes.Name));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-603")]
        [Property("BehaviorId", "BHV-606")]
        [Description(
            "Contract Section 3.8: every returned ProjectSummary has "
                + "ProjectId, Name, ProjectType, and IsEditable populated from "
                + "the underlying ScrText."
        )]
        public void GetToProjectFilterProjects_Summary_PopulatesAllFields()
        {
            ProjectListResult result = CopyBooksOrchestrator.GetToProjectFilterProjects(
                ProjectType.Standard
            );

            Assert.That(
                result.Projects,
                Is.Not.Empty,
                "Precondition: we seeded allowed project types"
            );

            foreach (var summary in result.Projects)
            {
                Assert.That(summary.ProjectId, Is.Not.Null.And.Not.Empty, "ProjectId must be set");
                Assert.That(summary.Name, Is.Not.Null.And.Not.Empty, "Name must be set");
                Assert.That(
                    summary.ProjectType,
                    Is.Not.Null.And.Not.Empty,
                    "ProjectType must be set"
                );
            }
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-606")]
        [Description(
            "Edge case: empty ScrTextCollection yields an empty (never null) "
                + "ProjectListResult. CAP-008's decision tree is total."
        )]
        public void GetToProjectFilterProjects_EmptyCollection_ReturnsEmptyList()
        {
            // Clear the seeded collection.
            foreach (
                var existing in ScrTextCollection.ScrTexts(IncludeProjects.Everything).ToList()
            )
            {
                ScrTextCollection.Remove(existing, false);
            }

            ProjectListResult result = CopyBooksOrchestrator.GetToProjectFilterProjects(
                ProjectType.Standard
            );

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Projects, Is.Not.Null, "Projects list must be a concrete list");
            Assert.That(result.Projects, Is.Empty, "Empty collection -> empty result list");
        }

        // =====================================================================
        // Helpers — mirror ProjectFilterServiceTests.CreateScrText exactly so
        // the two CAP-008 / CAP-011 test suites stay source-compatible.
        // =====================================================================

        private static DummyScrText CreateScrText(string name, Enum<ProjectType> type)
        {
            var details = new Paranext.DataProvider.Projects.ProjectDetails(
                name,
                new Paranext.DataProvider.Projects.ProjectMetadata(
                    HexId.CreateNew().ToString(),
                    []
                ),
                ""
            );
            var scrText = new DummyScrText(details);
            // Derived types (BackTranslation, Daughter, Auxiliary, StudyBible
            // variants, Transliteration*) require a non-empty base project name
            // in TranslationInformation — mirrors
            // ProjectFilterServiceTests.CreateScrText. The decision tree only
            // reads Type, not BaseProjectName.
            string baseName = type.IsDerivedType() ? "PlaceholderBase" : "";
            scrText.Settings.TranslationInfo = new TranslationInformation(type, baseName);
            scrText.Settings.Editable = true;
            return scrText;
        }

        private void AddProject(DummyScrText scrText)
        {
            var details = CreateProjectDetails(scrText);
            ParatextProjects.FakeAddProject(details, scrText);
        }
    }
}
