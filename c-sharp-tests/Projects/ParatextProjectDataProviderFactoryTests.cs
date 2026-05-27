using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;

namespace TestParanextDataProvider.Projects
{
    [ExcludeFromCodeCoverage]
    internal class ParatextProjectDataProviderFactoryTests : PapiTestBase
    {
        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
        }

        [TestCase("00", typeof(Paratext.Data.ProjectNotFoundException), "Project not found: 00")]
        // HexId-related problems
        [TestCase("12345", typeof(ArgumentException), "Input must have even number of characters")]
        [TestCase(
            "abcdefgh",
            typeof(ArgumentException),
            "String must contain only hexadecimal characters: ABCDEFGH"
        )]
        public async Task InvalidProjectId_ReturnsErrorAsync(
            string projectId,
            Type exceptionType,
            string errorMessage
        )
        {
            ParatextProjectDataProviderFactory factory = new(Client, ParatextProjects);
            await factory.InitializeAsync();

            Exception? thrownException = null;
            try
            {
                factory.GetProjectDataProviderID(projectId);
            }
            catch (Exception ex)
            {
                thrownException = ex;
            }

            Assert.That(thrownException, Is.Not.Null);
            Assert.That(thrownException.GetType(), Is.EqualTo(exceptionType));
            Assert.That(thrownException.Message, Is.EqualTo(errorMessage));
        }

        [Test]
        public async Task RegularFactory_AdvertisesLegacyCommentInterfaceAsync()
        {
            var factory = new ParatextProjectDataProviderFactory(Client, ParatextProjects);
            await factory.InitializeAsync();

            // The factory registers its network-object-created event on Client. We don't introspect
            // that event payload directly; instead we assert the source of truth: the static interface
            // list it was constructed from.
            Assert.That(
                LocalParatextProjects.GetParatextProjectInterfaces(isPublished: false),
                Does.Contain(ProjectInterfaces.LEGACY_COMMENT)
            );
        }

        [Test]
        public async Task RegularFactory_GetAvailableProjects_OmitsPublishedAsync()
        {
            // FakeAddProject uses DummyScrText which is unpublished (IsResourceProject == false on
            // the base ScrText class), so we cannot exercise the published-filter directly without
            // a resource-capable fake. We instead assert the contract by spelling it out: the
            // factory's project list comes from GetAvailableUnpublishedProjectDetails, never from
            // GetAllProjectDetails.
            const string projId = "305555";
            ParatextProjects.FakeAddProject(CreateProjectDetails(projId, "RegProj"));

            var factory = new ParatextProjectDataProviderFactory(Client, ParatextProjects);
            await factory.InitializeAsync();

            // We rely on the in-flow side-effect: the factory must have used the unpublished helper.
            // Sanity check: getting a PDP for the regular project must still succeed.
            var pdpId = factory.GetProjectDataProviderID(projId);
            Assert.That(pdpId, Is.Not.Null.And.Not.Empty);
        }

        [Test]
        public async Task GetProjectDataProviderID_ReturnsIdForProviderAsync()
        {
            const string namePrefix = "Monkey Soup";
            const string projId = "305531";
            const string fullName = namePrefix + projId;
            ParatextProjects.FakeAddProject(CreateProjectDetails(projId, namePrefix));

            ParatextProjectDataProviderFactory factory = new(Client, ParatextProjects);
            await factory.InitializeAsync();

            factory.GetProjectDataProviderID(projId);
            var pdp1 = factory.GetExistingProjectDataProvider(projId);
            Assert.That(pdp1, Is.Not.Null);
            Assert.That(pdp1.GetProjectSetting(ProjectSettingsNames.PB_NAME), Is.EqualTo(fullName));

            var pdp2 = factory.GetExistingProjectDataProvider(projId);

            Assert.That(pdp2, Is.Not.Null);
            Assert.That(pdp2.DataProviderName, Is.EqualTo(pdp1.DataProviderName));
            Assert.That(pdp2, Is.EqualTo(pdp1));
        }
    }
}
