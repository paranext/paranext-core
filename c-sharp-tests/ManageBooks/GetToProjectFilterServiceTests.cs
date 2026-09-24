using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.ManageBooks;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using PtxUtils;
using ProjectType = Paratext.Data.ProjectType;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Wire-level tests for CAP-008
    /// <see cref="ManageBooksService.GetToProjectFilterAsync"/> (M-009).
    ///
    /// These are the OUTER wire acceptance tests for CAP-008 — they prove the
    /// <c>("getToProjectFilter", GetToProjectFilterAsync)</c> entry in
    /// <c>ManageBooksService.RegisterNetworkObjectAsync</c>'s function table is
    /// reachable, takes a <see cref="ProjectFilterInput"/>, and returns a
    /// non-null <see cref="ProjectListResult"/> matching gm-007 (Section 4.9).
    ///
    /// Orchestrator-layer decision-tree logic (9 source-type branches) lives in
    /// <see cref="CopyProjectFilteringTests"/>. These tests assert the
    /// <b>wire shape + preconditions + CAP-011 integration</b>:
    /// registration, source-type validation, error-code mapping, the read-only
    /// invariant (no SendFullProjectUpdateEvent), and equivalence between
    /// M-009 and M-013's CopyDestination path.
    ///
    /// Error codes (Theme 7, FN-002): Section 4.9 names MISSING_SOURCE_TYPE;
    /// per the PlatformError taxonomy adoption it maps to
    /// <see cref="PlatformErrorCodes.InvalidArgument"/>.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class GetToProjectFilterServiceTests : PapiTestBase
    {
        private DummyScrText _standard = null!;
        private DummyScrText _auxiliary = null!;
        private DummyScrText _backTranslation = null!;
        private DummyScrText _studyBible = null!;
        private DummyScrText _consultantNotes = null!;
        private DummyScrText _transliterationWithEncoder = null!;
        private ParatextProjectDataProviderFactory _pdpFactory = null!;
        private ManageBooksService _service = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _standard = CreateScrText("ProjStandard", ProjectType.Standard);
            _auxiliary = CreateScrText("ProjAuxiliary", ProjectType.Auxiliary);
            _backTranslation = CreateScrText("ProjBackTranslation", ProjectType.BackTranslation);
            _studyBible = CreateScrText("ProjStudyBible", ProjectType.StudyBible);
            _consultantNotes = CreateScrText("ProjConsultantNotes", ProjectType.ConsultantNotes);
            _transliterationWithEncoder = CreateScrText(
                "ProjTransliterationWithEncoder",
                ProjectType.TransliterationWithEncoder
            );

            AddProject(_standard);
            AddProject(_auxiliary);
            AddProject(_backTranslation);
            AddProject(_studyBible);
            AddProject(_consultantNotes);
            AddProject(_transliterationWithEncoder);

            _pdpFactory = new ParatextProjectDataProviderFactory(Client, ParatextProjects);
            await _pdpFactory.InitializeAsync();

            _service = new ManageBooksService(Client, ParatextProjects, _pdpFactory);
            await _service.RegisterNetworkObjectAsync();
        }

        [TearDown]
        public void TestTearDownScrTexts()
        {
            _standard?.Dispose();
            _auxiliary?.Dispose();
            _backTranslation?.Dispose();
            _studyBible?.Dispose();
            _consultantNotes?.Dispose();
            _transliterationWithEncoder?.Dispose();
        }

        // -------------------------------------------------------------------
        // ACCEPTANCE: wire entry is reachable and returns contract shape
        // -------------------------------------------------------------------

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-008")]
        [Property("ScenarioId", "TS-065")]
        [Property("BehaviorId", "BHV-603")]
        [Property("GoldenMaster", "gm-007")]
        [Description(
            "OUTER wire acceptance (gm-007 / TS-065): "
                + "GetToProjectFilterAsync takes a ProjectFilterInput with "
                + "SourceProjectType='Standard' and returns a ProjectListResult "
                + "containing Standard, Auxiliary, BackTranslation, StudyBible "
                + "entries; ConsultantNotes and TransliterationWithEncoder are "
                + "excluded (Section 4.9)."
        )]
        public async Task GetToProjectFilterAsync_StandardSource_ReturnsGm007AllowedSet()
        {
            var input = new ProjectFilterInput(
                ProjectFilterPurpose.CopyDestination,
                ProjectType.Standard.InternalValue
            );

            ProjectListResult result = await _service.GetToProjectFilterAsync(input);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Projects, Is.Not.Null);

            var names = result.Projects.Select(p => p.Name).ToList();
            Assert.That(names, Has.Member(_standard.Name));
            Assert.That(names, Has.Member(_auxiliary.Name));
            Assert.That(names, Has.Member(_backTranslation.Name));
            Assert.That(names, Has.Member(_studyBible.Name));

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
        [Property("CapabilityId", "CAP-008")]
        [Property("ScenarioId", "TS-066")]
        [Property("BehaviorId", "BHV-606")]
        [Property("GoldenMaster", "gm-008")]
        [Description(
            "Wire acceptance (gm-008 Auxiliary case): SourceProjectType='Auxiliary' "
                + "returns the parameterized-types set; ConsultantNotes and "
                + "TransliterationWithEncoder are excluded."
        )]
        public async Task GetToProjectFilterAsync_AuxiliarySource_ReturnsGm008AuxiliarySet()
        {
            var input = new ProjectFilterInput(
                ProjectFilterPurpose.CopyDestination,
                ProjectType.Auxiliary.InternalValue
            );

            ProjectListResult result = await _service.GetToProjectFilterAsync(input);

            var names = result.Projects.Select(p => p.Name).ToList();
            Assert.That(names, Has.Member(_auxiliary.Name));
            Assert.That(names, Has.Member(_standard.Name));
            Assert.That(names, Has.Member(_backTranslation.Name));
            Assert.That(names, Has.Member(_studyBible.Name));
            Assert.That(names, Has.No.Member(_consultantNotes.Name));
            Assert.That(names, Has.No.Member(_transliterationWithEncoder.Name));
        }

        // -------------------------------------------------------------------
        // Validation — SourceProjectType required (Section 4.9 error table)
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-603")]
        [Description(
            "Section 4.9 error: missing SourceProjectType maps to INVALID_ARGUMENT "
                + "(MISSING_SOURCE_TYPE in the contract; adopts PlatformErrorCode "
                + "taxonomy per Theme 7)."
        )]
        public void GetToProjectFilterAsync_NullSourceType_ThrowsInvalidArgument()
        {
            var input = new ProjectFilterInput(ProjectFilterPurpose.CopyDestination, null);

            Exception? caught = null;
            try
            {
                _service.GetToProjectFilterAsync(input).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null, "Missing SourceProjectType must throw.");
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.InvalidArgument),
                "Missing required SourceProjectType maps to INVALID_ARGUMENT (Theme 7)."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-603")]
        [Description(
            "Empty SourceProjectType is treated identically to null — "
                + "INVALID_ARGUMENT per Section 4.9."
        )]
        public void GetToProjectFilterAsync_EmptySourceType_ThrowsInvalidArgument()
        {
            var input = new ProjectFilterInput(ProjectFilterPurpose.CopyDestination, "");

            Exception? caught = null;
            try
            {
                _service.GetToProjectFilterAsync(input).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null);
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.InvalidArgument)
            );
        }

        // -------------------------------------------------------------------
        // Read-only invariant: wire entry does NOT fire project update events
        // -------------------------------------------------------------------

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-008")]
        [Property("BehaviorId", "BHV-603")]
        [Description(
            "CAP-008 is read-only per strategic plan: GetToProjectFilterAsync "
                + "must NOT emit SendFullProjectUpdateEvent (no mutation, no "
                + "event)."
        )]
        public async Task GetToProjectFilterAsync_DoesNotEmitProjectUpdateEvent()
        {
            // Ensure a live PDP so any spurious SendFullProjectUpdateEvent would
            // actually fire on the client and be detectable.
            _pdpFactory.GetProjectDataProviderID(_standard.Guid.ToString());
            var eventsBefore = Client.SentEventCount;

            await _service.GetToProjectFilterAsync(
                new ProjectFilterInput(
                    ProjectFilterPurpose.CopyDestination,
                    ProjectType.Standard.InternalValue
                )
            );

            Assert.That(
                Client.SentEventCount,
                Is.EqualTo(eventsBefore),
                "CAP-008 is read-only; no project-update events may fire."
            );
        }

        // -------------------------------------------------------------------
        // CAP-011 ↔ CAP-008 INTEGRATION: filterProjects({ CopyDestination })
        // must return the same result as getToProjectFilter.
        //
        // CAP-011's BuildCopyDestinationProjectList was a BE-1 placeholder
        // returning empty; CAP-008 re-wires it to delegate into
        // CopyBooksOrchestrator.GetToProjectFilterProjects. This test proves
        // both wire surfaces now converge on the same decision tree.
        // -------------------------------------------------------------------

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-008")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-603")]
        [Property("BehaviorId", "BHV-411")]
        [Description(
            "Integration: filterProjects({ purpose: CopyDestination, "
                + "sourceProjectType: 'Standard' }) returns the same "
                + "ProjectListResult as getToProjectFilter for the same input. "
                + "Proves CAP-011's BuildCopyDestinationProjectList now "
                + "delegates into CAP-008 (strategic plan §515)."
        )]
        public async Task FilterProjectsAsync_CopyDestinationStandard_MatchesGetToProjectFilter()
        {
            var m009Input = new ProjectFilterInput(
                ProjectFilterPurpose.CopyDestination,
                ProjectType.Standard.InternalValue
            );
            var m013Input = new ProjectFilterInput(
                ProjectFilterPurpose.CopyDestination,
                ProjectType.Standard.InternalValue
            );

            ProjectListResult m009Result = await _service.GetToProjectFilterAsync(m009Input);
            ProjectListResult m013Result = await _service.FilterProjectsAsync(m013Input);

            var m009Names = m009Result.Projects.Select(p => p.Name).OrderBy(n => n).ToList();
            var m013Names = m013Result.Projects.Select(p => p.Name).OrderBy(n => n).ToList();

            Assert.That(
                m013Names,
                Is.EqualTo(m009Names),
                "CAP-011's filterProjects({ CopyDestination, Standard }) must "
                    + "return the same set as CAP-008's getToProjectFilter."
            );
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-008")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-606")]
        [Property("BehaviorId", "BHV-411")]
        [Description(
            "Integration: filterProjects({ CopyDestination, 'StudyBible' }) "
                + "matches getToProjectFilter for the same input (same-type "
                + "short-circuit at both wire surfaces). Proves the CAP-011 "
                + "delegation carries BHV-606 edge cases."
        )]
        public async Task FilterProjectsAsync_CopyDestinationStudyBible_MatchesGetToProjectFilter()
        {
            var input = new ProjectFilterInput(
                ProjectFilterPurpose.CopyDestination,
                ProjectType.StudyBible.InternalValue
            );

            ProjectListResult m009Result = await _service.GetToProjectFilterAsync(input);
            ProjectListResult m013Result = await _service.FilterProjectsAsync(input);

            var m009Names = m009Result.Projects.Select(p => p.Name).OrderBy(n => n).ToList();
            var m013Names = m013Result.Projects.Select(p => p.Name).OrderBy(n => n).ToList();

            Assert.That(m013Names, Is.EqualTo(m009Names));
        }

        // -------------------------------------------------------------------
        // Helpers
        // -------------------------------------------------------------------

        private static DummyScrText CreateScrText(string name, Enum<ProjectType> type)
        {
            var details = new ProjectDetails(
                name,
                new ProjectMetadata(HexId.CreateNew().ToString(), []),
                ""
            );
            var scrText = new DummyScrText(details);
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
