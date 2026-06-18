using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects
{
    [ExcludeFromCodeCoverage]
    internal class ParatextPublishedProjectDataProviderFactoryTests : PapiTestBase
    {
        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
        }

        [Test]
        public async Task PublishedFactory_AdvertisesInterfaceListWithoutLegacyCommentAsync()
        {
            var factory = new ParatextPublishedProjectDataProviderFactory(Client, ParatextProjects);
            await factory.InitializeAsync();

            // Truth check on the source of advertised interfaces.
            var advertised = LocalParatextProjects.GetParatextProjectInterfaces(isPublished: true);

            Assert.That(advertised, Does.Not.Contain(ProjectInterfaces.LEGACY_COMMENT));
            Assert.That(advertised, Does.Contain(ProjectInterfaces.USFM_CHAPTER));
            Assert.That(advertised, Does.Contain(ProjectInterfaces.BASE));
        }

        [Test]
        public async Task PublishedFactory_GetAvailableProjects_IsEmptyForDummyUnpublishedFixturesAsync()
        {
            // DummyScrText / FakeAddProject produces unpublished ScrTexts (IsResourceProject ==
            // false on the base ScrText class), so the published factory's available list is empty
            // in the unit-test fixture. This is the partition assertion: unpublished projects go
            // to the other factory, not this one.
            const string projId = "315555";
            ParatextProjects.FakeAddProject(CreateProjectDetails(projId, "RegProj"));

            var factory = new ParatextPublishedProjectDataProviderFactory(Client, ParatextProjects);
            await factory.InitializeAsync();

            Assert.Throws<KeyNotFoundException>(() => factory.GetProjectDataProviderID(projId));
        }
    }
}
