using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.ManageBooks;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using PtxUtils;
using ProjectType = Paratext.Data.ProjectType;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Orchestrator-level tests for <see cref="ProjectFilterService"/> (CAP-011, EXT-014).
    ///
    /// Capability: CAP-011 ProjectFilter
    /// Contracts:
    /// - <c>ProjectFilterInput</c> (Section 2.8)
    /// - <c>ProjectListResult</c> (Section 3.8)
    /// - <c>FilterProjects(ProjectFilterInput)</c> (Section 4.13)
    ///
    /// Tests derive expected behavior from:
    /// - PT9 source: ParatextBase/ScrTextComboxBox.cs:15-167 (Load* predicates)
    /// - Specifications: test-scenarios.json TS-082
    /// - Behavior: BHV-411 (ScrTextComboBox Project Filtering)
    /// - Extraction: EXT-014
    ///
    /// Five purposes exercised here:
    ///   AllScripture    -> all scripture projects
    ///   EditableTexts   -> scripture projects where IsEditable == true
    ///   ModelProject    -> all scripture projects (same predicate as AllScripture for the
    ///                      "pick a model" use case; read-only access is sufficient)
    ///   DeleteSource    -> editable scripture projects (admin is checked separately at
    ///                      the call site; the filter only narrows the picker)
    ///   CopyDestination -> delegates to CAP-008 GetToProjectFilter (BE-3). Tested here
    ///                      only for dispatch — full BHV-603/606 rules belong to CAP-008.
    ///
    /// NOTE: Scope per strategic plan — "Test that CAP-011 dispatches correctly, but the
    /// actual CopyDestination logic is CAP-008's responsibility (will be tested there in
    /// BE-3)". We assert only the dispatch contract for CopyDestination here.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class ProjectFilterServiceTests : PapiTestBase
    {
        // Seeded projects — built in SetUp so each purpose can inspect the mix.
        // Naming: _std = Standard editable scripture; _stdReadOnly = Standard non-editable scripture;
        //         _bt = BackTranslation editable scripture; _notes = ConsultantNotes (non-scripture);
        //         _marble = MarbleResource (non-scripture).
        private DummyScrText _std = null!;
        private DummyScrText _stdReadOnly = null!;
        private DummyScrText _bt = null!;
        private DummyScrText _notes = null!;
        private DummyScrText _marble = null!;
        private ResourceDummyScrText _resource = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _std = CreateScrText(name: "StdEditable", type: ProjectType.Standard, editable: true);
            _stdReadOnly = CreateScrText(
                name: "StdReadOnly",
                type: ProjectType.Standard,
                editable: false
            );
            _bt = CreateScrText(
                name: "BtEditable",
                type: ProjectType.BackTranslation,
                editable: true
            );
            _notes = CreateScrText(
                name: "NotesProj",
                type: ProjectType.ConsultantNotes,
                editable: true
            );
            _marble = CreateScrText(
                name: "MarbleRes",
                type: ProjectType.MarbleResource,
                editable: false
            );
            // Sebastian/Mike review item #29 follow-up (2026-05-11): a scripture-typed
            // resource project — surfaces ProjectSummary.IsResource = true so the Copy
            // "From" / Create "Based on" pickers can hide resources without an extra API
            // call. We need a scripture type here (not MarbleResource) so the filter's
            // IsScripture() predicate keeps it in the AllScripture result.
            _resource = CreateResourceScrText(
                name: "StdResource",
                type: ProjectType.Standard,
                editable: false
            );

            AddProject(_std);
            AddProject(_stdReadOnly);
            AddProject(_bt);
            AddProject(_notes);
            AddProject(_marble);
            AddProject(_resource);
        }

        [TearDown]
        public void TestTearDownScrTexts()
        {
            _std?.Dispose();
            _stdReadOnly?.Dispose();
            _bt?.Dispose();
            _notes?.Dispose();
            _marble?.Dispose();
            _resource?.Dispose();
        }

        // -------------------------------------------------------------------
        // ACCEPTANCE: AllScripture — all scripture-typed projects
        // -------------------------------------------------------------------

        [Test]
        [Category("Acceptance")]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("ScenarioId", "TS-082")]
        [Property("BehaviorId", "BHV-411")]
        [Description(
            "OUTER acceptance (TS-082): AllScripture purpose returns all scripture projects (editable and non-editable), excludes ConsultantNotes and MarbleResource."
        )]
        public void FilterProjects_AllScripture_ReturnsAllScriptureProjects()
        {
            var input = new ProjectFilterInput(ProjectFilterPurpose.AllScripture, null);

            ProjectListResult result = ProjectFilterService.FilterProjects(input);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Projects, Is.Not.Null);
            var names = result.Projects.Select(p => p.Name).ToList();

            // Expected: Standard (editable) + Standard (read-only) + BackTranslation.
            // Excluded: ConsultantNotes (note type) + MarbleResource (excluded by IsScripture).
            Assert.That(names, Has.Member(_std.Name), "StdEditable is a scripture project");
            Assert.That(names, Has.Member(_stdReadOnly.Name), "StdReadOnly is a scripture project");
            Assert.That(names, Has.Member(_bt.Name), "BtEditable is a scripture project");
            Assert.That(
                names,
                Has.No.Member(_notes.Name),
                "ConsultantNotes must be excluded (not scripture)"
            );
            Assert.That(
                names,
                Has.No.Member(_marble.Name),
                "MarbleResource must be excluded (not scripture per IsScripture())"
            );
        }

        // -------------------------------------------------------------------
        // EditableTexts — scripture projects with IsEditable = true
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-411")]
        [Description("EditableTexts purpose returns only editable scripture projects.")]
        public void FilterProjects_EditableTexts_ReturnsOnlyEditableScriptureProjects()
        {
            var input = new ProjectFilterInput(ProjectFilterPurpose.EditableTexts, null);

            ProjectListResult result = ProjectFilterService.FilterProjects(input);

            var names = result.Projects.Select(p => p.Name).ToList();
            Assert.That(names, Has.Member(_std.Name), "StdEditable should be included");
            Assert.That(names, Has.Member(_bt.Name), "BtEditable should be included");
            Assert.That(
                names,
                Has.No.Member(_stdReadOnly.Name),
                "StdReadOnly is scripture but not editable — must be excluded"
            );
            Assert.That(names, Has.No.Member(_notes.Name));
            Assert.That(names, Has.No.Member(_marble.Name));

            // Every returned entry must report IsEditable = true.
            Assert.That(
                result.Projects.All(p => p.IsEditable),
                Is.True,
                "All EditableTexts results must report IsEditable = true"
            );
        }

        // -------------------------------------------------------------------
        // ModelProject — all scripture projects (read-only sufficient)
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-411")]
        [Description(
            "ModelProject purpose returns all scripture projects (read-only access is sufficient for a model)."
        )]
        public void FilterProjects_ModelProject_ReturnsAllScriptureProjects()
        {
            var input = new ProjectFilterInput(ProjectFilterPurpose.ModelProject, null);

            ProjectListResult result = ProjectFilterService.FilterProjects(input);

            var names = result.Projects.Select(p => p.Name).ToList();
            Assert.That(names, Has.Member(_std.Name));
            Assert.That(
                names,
                Has.Member(_stdReadOnly.Name),
                "Non-editable scripture projects ARE valid models (read-only is enough)"
            );
            Assert.That(names, Has.Member(_bt.Name));
            Assert.That(names, Has.No.Member(_notes.Name));
            Assert.That(names, Has.No.Member(_marble.Name));
        }

        // -------------------------------------------------------------------
        // DeleteSource — editable scripture projects (admin check is separate)
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-411")]
        [Description(
            "DeleteSource purpose returns editable scripture projects only (admin check is performed separately at call site)."
        )]
        public void FilterProjects_DeleteSource_ReturnsEditableScriptureProjects()
        {
            var input = new ProjectFilterInput(ProjectFilterPurpose.DeleteSource, null);

            ProjectListResult result = ProjectFilterService.FilterProjects(input);

            var names = result.Projects.Select(p => p.Name).ToList();
            Assert.That(names, Has.Member(_std.Name));
            Assert.That(names, Has.Member(_bt.Name));
            Assert.That(
                names,
                Has.No.Member(_stdReadOnly.Name),
                "A non-editable project cannot be a delete source"
            );
            Assert.That(names, Has.No.Member(_notes.Name));
            Assert.That(names, Has.No.Member(_marble.Name));

            Assert.That(
                result.Projects.All(p => p.IsEditable),
                Is.True,
                "Every DeleteSource entry must be editable"
            );
        }

        // -------------------------------------------------------------------
        // CopyDestination — dispatch only; full CAP-008 logic is out of scope here
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-411")]
        [Description(
            "CopyDestination dispatch: with SourceProjectType = 'Standard', the call completes (does NOT throw NotImplementedException / ArgumentException) and returns a ProjectListResult. Full BHV-603/606 source-type rules are CAP-008's responsibility (BE-3)."
        )]
        public void FilterProjects_CopyDestinationWithSourceType_DispatchesSuccessfully()
        {
            var input = new ProjectFilterInput(
                ProjectFilterPurpose.CopyDestination,
                SourceProjectType: "Standard"
            );

            // Dispatch-only: the method must return a non-null ProjectListResult.
            // We deliberately do NOT assert content — that is CAP-008's contract.
            ProjectListResult result = ProjectFilterService.FilterProjects(input);

            Assert.That(
                result,
                Is.Not.Null,
                "CopyDestination dispatch must return a ProjectListResult (delegation to CAP-008)"
            );
            Assert.That(
                result.Projects,
                Is.Not.Null,
                "Projects list must be a concrete List<ProjectSummary>, not null"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-411")]
        [Description(
            "CopyDestination validation: missing SourceProjectType must throw INVALID_ARGUMENT (contract Section 2.8 validation rule)."
        )]
        public void FilterProjects_CopyDestinationWithoutSourceType_ThrowsInvalidArgument()
        {
            var input = new ProjectFilterInput(ProjectFilterPurpose.CopyDestination, null);

            Exception? caught = null;
            try
            {
                ProjectFilterService.FilterProjects(input);
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(
                caught,
                Is.Not.Null,
                "CopyDestination without SourceProjectType must throw."
            );
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.InvalidArgument),
                "Missing required SourceProjectType maps to INVALID_ARGUMENT (Theme 7)."
            );
        }

        // -------------------------------------------------------------------
        // Invalid/unmapped purpose — INVALID_ARGUMENT per contract Section 4.13 error table
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-411")]
        [Description(
            "Contract Section 4.13: unrecognized purpose value (out-of-range enum) maps to INVALID_ARGUMENT / INVALID_FILTER_PURPOSE."
        )]
        public void FilterProjects_UnknownPurpose_ThrowsInvalidArgument()
        {
            // Force an out-of-range enum value through the cast escape hatch. The
            // service must defend against this at the boundary.
            var invalidPurpose = (ProjectFilterPurpose)int.MaxValue;
            var input = new ProjectFilterInput(invalidPurpose, null);

            Exception? caught = null;
            try
            {
                ProjectFilterService.FilterProjects(input);
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null, "Out-of-range purpose must throw.");
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.InvalidArgument),
                "Unknown filter purpose maps to INVALID_ARGUMENT."
            );
        }

        // -------------------------------------------------------------------
        // ProjectSummary shape — each field populated from the underlying ScrText
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-411")]
        [Description(
            "Contract Section 3.8: every ProjectSummary has a non-empty ProjectId, Name, ProjectType, and a correct IsEditable reading."
        )]
        public void FilterProjects_Summary_PopulatesAllFieldsFromScrText()
        {
            var input = new ProjectFilterInput(ProjectFilterPurpose.AllScripture, null);

            ProjectListResult result = ProjectFilterService.FilterProjects(input);

            Assert.That(
                result.Projects,
                Is.Not.Empty,
                "precondition: we seeded scripture projects"
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

            var stdSummary = result.Projects.FirstOrDefault(p => p.Name == _std.Name);
            Assert.That(stdSummary, Is.Not.Null);
            Assert.That(
                stdSummary!.IsEditable,
                Is.True,
                "StdEditable must report IsEditable = true"
            );
            // Sebastian/Mike review item #29 follow-up (2026-05-11): IsResource must be
            // populated for every summary so the picker can filter. Non-resource
            // ScrTexts (DummyScrText doesn't override IsResourceProject) → false.
            Assert.That(
                stdSummary.IsResource,
                Is.False,
                "non-resource ScrText must report IsResource = false"
            );

            var readOnlySummary = result.Projects.FirstOrDefault(p => p.Name == _stdReadOnly.Name);
            Assert.That(readOnlySummary, Is.Not.Null);
            Assert.That(
                readOnlySummary!.IsEditable,
                Is.False,
                "StdReadOnly must report IsEditable = false"
            );
            Assert.That(
                readOnlySummary.IsResource,
                Is.False,
                "non-resource read-only ScrText must report IsResource = false"
            );
        }

        // -------------------------------------------------------------------
        // ACCEPTANCE: ProjectSummary.IsResource — populated from ScrText.IsResourceProject
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-411")]
        [Description(
            "Sebastian/Mike review item #29 follow-up: a scripture-typed project whose ScrText.IsResourceProject returns true must surface ProjectSummary.IsResource = true so the Copy/Create pickers can hide resources without an extra API call."
        )]
        public void FilterProjects_Summary_ResourceProject_IsResourceTrue()
        {
            var input = new ProjectFilterInput(ProjectFilterPurpose.AllScripture, null);

            ProjectListResult result = ProjectFilterService.FilterProjects(input);

            var resourceSummary = result.Projects.FirstOrDefault(p => p.Name == _resource.Name);
            Assert.That(
                resourceSummary,
                Is.Not.Null,
                "scripture-typed resource project must appear in AllScripture filter result (IncludeProjects.ScriptureOnly includes resources)"
            );
            Assert.That(
                resourceSummary!.IsResource,
                Is.True,
                "ScrText.IsResourceProject == true must flow through to ProjectSummary.IsResource"
            );
        }

        // -------------------------------------------------------------------
        // Empty environment — no projects
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-411")]
        [Description(
            "Edge case: with no projects loaded, every purpose returns an empty list (never null)."
        )]
        public void FilterProjects_NoProjects_ReturnsEmptyList()
        {
            // Clear the ScrTextCollection set up in [SetUp].
            foreach (
                var existing in Paratext
                    .Data.ScrTextCollection.ScrTexts(Paratext.Data.IncludeProjects.Everything)
                    .ToList()
            )
            {
                Paratext.Data.ScrTextCollection.Remove(existing, false);
            }

            foreach (
                var purpose in new[]
                {
                    ProjectFilterPurpose.AllScripture,
                    ProjectFilterPurpose.EditableTexts,
                    ProjectFilterPurpose.ModelProject,
                    ProjectFilterPurpose.DeleteSource,
                }
            )
            {
                var result = ProjectFilterService.FilterProjects(
                    new ProjectFilterInput(purpose, null)
                );
                Assert.That(result, Is.Not.Null, $"purpose {purpose}: result must not be null");
                Assert.That(
                    result.Projects,
                    Is.Not.Null,
                    $"purpose {purpose}: Projects must be a concrete list, not null"
                );
                Assert.That(
                    result.Projects,
                    Is.Empty,
                    $"purpose {purpose}: empty environment -> empty projects list"
                );
            }
        }

        // -------------------------------------------------------------------
        // Helpers
        // -------------------------------------------------------------------

        private DummyScrText CreateScrText(string name, Enum<ProjectType> type, bool editable)
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
            // Derived types (BackTranslation, Daughter, Auxiliary, StudyBible variants,
            // Transliteration*) require a non-empty base project name in the
            // TranslationInformation constructor. We pass a placeholder name — the
            // filter-service under test does not read BaseProjectName, only Type and
            // Editable.
            string baseName = type.IsDerivedType() ? "PlaceholderBase" : "";
            scrText.Settings.TranslationInfo = new TranslationInformation(type, baseName);
            scrText.Settings.Editable = editable;
            return scrText;
        }

        private void AddProject(DummyScrText scrText)
        {
            var details = CreateProjectDetails(scrText);
            ParatextProjects.FakeAddProject(details, scrText);
        }

        // ResourceDummyScrText overrides IsResourceProject so we can exercise the
        // ProjectSummary.IsResource plumbing without needing a real ResourceScrText
        // (which depends on a zipped-resource file on disk).
        private ResourceDummyScrText CreateResourceScrText(
            string name,
            Enum<ProjectType> type,
            bool editable
        )
        {
            var details = new Paranext.DataProvider.Projects.ProjectDetails(
                name,
                new Paranext.DataProvider.Projects.ProjectMetadata(
                    HexId.CreateNew().ToString(),
                    []
                ),
                ""
            );
            var scrText = new ResourceDummyScrText(details);
            string baseName = type.IsDerivedType() ? "PlaceholderBase" : "";
            scrText.Settings.TranslationInfo = new TranslationInformation(type, baseName);
            scrText.Settings.Editable = editable;
            return scrText;
        }

        // -----------------------------------------------------------------
        // Support: marker subclass for review item #29 follow-up.
        //
        // ScrText.IsResourceProject is `virtual` and defaults to false on
        // DummyScrText. Resources in production override it to true (see
        // ResourceScrText.cs and JoinedScrText.cs). This subclass mirrors that
        // override so the filter-service IsResource plumbing can be tested
        // without needing a real on-disk zipped resource.
        // -----------------------------------------------------------------
        private sealed class ResourceDummyScrText : DummyScrText
        {
            public ResourceDummyScrText(Paranext.DataProvider.Projects.ProjectDetails details)
                : base(details) { }

            public override bool IsResourceProject => true;
        }
    }
}
