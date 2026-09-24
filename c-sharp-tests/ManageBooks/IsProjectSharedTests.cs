using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.ManageBooks;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.Users;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Wire-level tests for <see cref="ManageBooksService.IsProjectSharedAsync"/>
    /// (CAP-011 utility — added 2026-05-01 per FN-008 Theme C2).
    ///
    /// Contract: returns <c>true</c> iff the project is shared (S/R, registered)
    /// AND has more than one user-of-record. Mirrors the PT9 idiom in
    /// <c>Paratext/ToolsMenu/DeleteBooksForm.cs:77</c>:
    /// <c>scrText.IsProjectShared &amp;&amp; scrText.Permissions.UserCount &gt; 1</c>.
    ///
    /// Edge: unknown project id returns <c>false</c> (not throws) — the React
    /// caller invokes this on every project-change event and a thrown rejection
    /// would stall the dialog.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class IsProjectSharedTests : PapiTestBase
    {
        private ParatextProjectDataProviderFactory _pdpFactory = null!;
        private ManageBooksService _service = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _pdpFactory = new ParatextProjectDataProviderFactory(Client, ParatextProjects);
            await _pdpFactory.InitializeAsync();
            _service = new ManageBooksService(Client, ParatextProjects, _pdpFactory);
        }

        // ====================================================================
        // GROUP A — Unshared projects
        // ====================================================================

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-312")]
        [Description(
            "Default DummyScrText is unshared (no permission Data) — IsProjectShared=false."
        )]
        public async Task IsProjectSharedAsync_DefaultProject_ReturnsFalse()
        {
            using var scrText = (DummyScrText)CreateDummyProject();
            var projectDetails = CreateProjectDetails(scrText);
            ParatextProjects.FakeAddProject(projectDetails, scrText);

            bool actual = await _service.IsProjectSharedAsync(projectDetails.Metadata.Id);

            Assert.That(
                actual,
                Is.False,
                "Default DummyScrText has no permission Data, so IsProjectShared must be false."
            );
        }

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-312")]
        [Description(
            "Shared project with exactly one user (just the current user) — IsProjectShared=false because the >1 condition fails."
        )]
        public async Task IsProjectSharedAsync_SharedSingleUser_ReturnsFalse()
        {
            using var scrText = new SharedScrText(userCount: 1);
            var projectDetails = CreateProjectDetails(scrText);
            ParatextProjects.FakeAddProject(projectDetails, scrText);

            bool actual = await _service.IsProjectSharedAsync(projectDetails.Metadata.Id);

            Assert.That(
                actual,
                Is.False,
                "PT9 idiom requires UserCount > 1 — a one-user shared project returns false "
                    + "(matches DeleteBooksForm.cs:77 behavior)."
            );
        }

        // ====================================================================
        // GROUP B — Shared multi-user projects (the positive case)
        // ====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-312")]
        [Description(
            "Shared project with multiple users — IsProjectShared=true. This is the case that drives the BHV-312 enhanced delete-confirm copy."
        )]
        public async Task IsProjectSharedAsync_SharedMultiUser_ReturnsTrue()
        {
            using var scrText = new SharedScrText(userCount: 2);
            var projectDetails = CreateProjectDetails(scrText);
            ParatextProjects.FakeAddProject(projectDetails, scrText);

            bool actual = await _service.IsProjectSharedAsync(projectDetails.Metadata.Id);

            Assert.That(
                actual,
                Is.True,
                "A shared project with >1 user must return true so the dialog can show enhanced "
                    + "'others will see this change' delete-confirm copy."
            );
        }

        // ====================================================================
        // GROUP C — Unknown project ids (returns false rather than throwing)
        // ====================================================================

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-011")]
        [Property("BehaviorId", "BHV-312")]
        [Description(
            "Unknown project id returns false rather than throwing — the React caller invokes this on every project-change event and a rejection would stall the dialog."
        )]
        public async Task IsProjectSharedAsync_UnknownProjectId_ReturnsFalseDoesNotThrow()
        {
            // Arrange: no project added — the service must look up an id that doesn't resolve.
            const string unknownId = "deadbeefdeadbeefdeadbeefdeadbeef";

            // Act + Assert: must not throw; must return false.
            bool actual = await _service.IsProjectSharedAsync(unknownId);

            Assert.That(
                actual,
                Is.False,
                "Unknown ids must coerce to false rather than propagating ProjectNotFoundException — "
                    + "the React caller treats false as the safe default."
            );
        }

        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-011")]
        [Description(
            "Malformed HexId (causing ArgumentException in HexId.FromStr) returns false rather than throwing."
        )]
        public async Task IsProjectSharedAsync_MalformedProjectId_ReturnsFalseDoesNotThrow()
        {
            // 'zzz' is non-hex — HexId.FromStr → StringUtils.HexToByteArr throws ArgumentException.
            const string malformedId = "zzz";

            bool actual = await _service.IsProjectSharedAsync(malformedId);

            Assert.That(
                actual,
                Is.False,
                "Malformed ids (which throw ArgumentException through the HexId path) must coerce to "
                    + "false — same safe-default rationale as the unknown-id case."
            );
        }

        // ====================================================================
        // Test helpers
        // ====================================================================

        /// <summary>
        /// Test-local <see cref="ScrText"/> subclass that injects a permission
        /// manager with non-null <c>Data</c> (so <c>IsProjectShared = true</c>)
        /// and a fixed user count. Uses the natural ScrText seam: overrides
        /// <see cref="ScrText.Permissions"/>. Mirrors the pattern from
        /// <see cref="DeleteBooksServiceTests"/> (NonAdminSharedScrText).
        /// </summary>
        private sealed class SharedScrText : DummyScrText
        {
            private readonly SeededPermissionManager _permissions;

            public SharedScrText(int userCount)
            {
                _permissions = new SeededPermissionManager(userCount);
            }

            public override PermissionManager Permissions => _permissions;

            private sealed class SeededPermissionManager : PermissionManager
            {
                public SeededPermissionManager(int userCount)
                {
                    var data = new InternalProjectUserAccessData();
                    for (int i = 0; i < userCount; i++)
                    {
                        data.Users.Add(
                            new InternalProjectUserAccess($"user{i}", UserRoles.TeamMember)
                        );
                    }
                    Data = data;
                }

                // Make the inherited protected setter visible to the constructor above.
                protected override InternalProjectUserAccessData Data { get; set; }
            }
        }
    }
}
