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
    /// Wire-level tests for <see cref="ManageBooksService.FilterProjectsAsync"/>
    /// (CAP-011).
    ///
    /// These are the OUTER wire acceptance tests — they prove the
    /// <c>("filterProjects", FilterProjectsAsync)</c> entry in
    /// <c>ManageBooksService.RegisterNetworkObjectAsync</c>'s function table is
    /// reachable, takes a <c>ProjectFilterInput</c>, and returns a
    /// <c>ProjectListResult</c> (Section 4.13, M-013).
    ///
    /// Orchestrator-layer predicate logic (the 5 purposes) is verified in
    /// <see cref="ProjectFilterServiceTests"/>. These tests assert the
    /// <b>wire shape only</b>: registration + dispatch + round-trip of the
    /// contract types. CAP-011 has no mutation and no events.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class FilterProjectsServiceTests : PapiTestBase
    {
        private DummyScrText _std = null!;
        private ParatextProjectDataProviderFactory _pdpFactory = null!;
        private ManageBooksService _service = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _std = CreateScrText("StdEditable", ProjectType.Standard, editable: true);
            AddProject(_std);

            _pdpFactory = new ParatextProjectDataProviderFactory(Client, ParatextProjects);
            await _pdpFactory.InitializeAsync();

            _service = new ManageBooksService(Client, ParatextProjects, _pdpFactory);
            await _service.RegisterNetworkObjectAsync();
        }

        [TearDown]
        public void TestTearDownScrText()
        {
            _std?.Dispose();
        }

        // -------------------------------------------------------------------
        // ACCEPTANCE: wire entry is reachable and returns contract shape
        // -------------------------------------------------------------------

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-011")]
        [Property("ScenarioId", "TS-082")]
        [Property("BehaviorId", "BHV-411")]
        [Description(
            "OUTER wire acceptance: ManageBooksService.FilterProjectsAsync takes ProjectFilterInput and returns a non-null ProjectListResult (Section 4.13)."
        )]
        public async Task FilterProjectsAsync_AllScripture_ReturnsProjectListResult()
        {
            var input = new ProjectFilterInput(ProjectFilterPurpose.AllScripture, null);

            ProjectListResult result = await _service.FilterProjectsAsync(input);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Projects, Is.Not.Null);
            Assert.That(
                result.Projects.Any(p => p.Name == _std.Name),
                Is.True,
                "Standard editable scripture project must appear in AllScripture result"
            );
        }

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-411")]
        [Description("Wire acceptance: EditableTexts purpose returned from the wire entry point.")]
        public async Task FilterProjectsAsync_EditableTexts_ReturnsResult()
        {
            var input = new ProjectFilterInput(ProjectFilterPurpose.EditableTexts, null);

            ProjectListResult result = await _service.FilterProjectsAsync(input);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Projects, Is.Not.Null);
            Assert.That(
                result.Projects.All(p => p.IsEditable),
                Is.True,
                "EditableTexts via wire must report every entry as editable"
            );
        }

        // -------------------------------------------------------------------
        // Error path — INVALID_ARGUMENT propagates through the wire layer
        // -------------------------------------------------------------------

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-411")]
        [Description(
            "Section 4.13 error table: unknown filter purpose throws with platformErrorCode=INVALID_ARGUMENT at the wire layer."
        )]
        public void FilterProjectsAsync_UnknownPurpose_ThrowsInvalidArgument()
        {
            var input = new ProjectFilterInput((ProjectFilterPurpose)int.MaxValue, null);

            Exception? caught = null;
            try
            {
                _service.FilterProjectsAsync(input).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                caught = ex;
            }

            Assert.That(caught, Is.Not.Null);
            Assert.That(
                caught!.Data["platformErrorCode"],
                Is.EqualTo(PlatformErrorCodes.InvalidArgument),
                "Unknown purpose must round-trip through the wire as INVALID_ARGUMENT (Theme 7)."
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-411")]
        [Description(
            "Section 2.8 validation: CopyDestination requires SourceProjectType; missing -> INVALID_ARGUMENT."
        )]
        public void FilterProjectsAsync_CopyDestinationMissingSourceType_ThrowsInvalidArgument()
        {
            var input = new ProjectFilterInput(ProjectFilterPurpose.CopyDestination, null);

            Exception? caught = null;
            try
            {
                _service.FilterProjectsAsync(input).GetAwaiter().GetResult();
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
        // Read-only: wire entry does NOT fire project update events
        // -------------------------------------------------------------------

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-411")]
        [Description(
            "CAP-011 is read-only per strategic plan: FilterProjectsAsync must NOT emit SendFullProjectUpdateEvent (no AlertCapture needed, no mutation)."
        )]
        public async Task FilterProjectsAsync_DoesNotEmitProjectUpdateEvent()
        {
            // Ensure there IS a PDP so any spurious SendFullProjectUpdateEvent would
            // actually fire an event on the client and be detectable.
            _pdpFactory.GetProjectDataProviderID(_std.Guid.ToString());
            var eventsBefore = Client.SentEventCount;

            await _service.FilterProjectsAsync(
                new ProjectFilterInput(ProjectFilterPurpose.AllScripture, null)
            );

            Assert.That(
                Client.SentEventCount,
                Is.EqualTo(eventsBefore),
                "Filtering is read-only; no project-update events may fire."
            );
        }

        // -------------------------------------------------------------------
        // Helpers
        // -------------------------------------------------------------------

        private DummyScrText CreateScrText(string name, Enum<ProjectType> type, bool editable)
        {
            var details = new ProjectDetails(
                name,
                new ProjectMetadata(HexId.CreateNew().ToString(), []),
                ""
            );
            var scrText = new DummyScrText(details);
            // Derived types require a non-empty base project name.
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
    }
}
