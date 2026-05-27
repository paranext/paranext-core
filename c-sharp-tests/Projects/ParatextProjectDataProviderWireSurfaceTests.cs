using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects
{
    [ExcludeFromCodeCoverage]
    internal class ParatextProjectDataProviderWireSurfaceTests : PapiTestBase
    {
        private static readonly string[] AllCommentWireMethodSuffixes =
        [
            ".getCommentThreads",
            ".createComment",
            ".addCommentToThread",
            ".deleteComment",
            ".updateComment",
            ".setIsCommentThreadRead",
            ".findAssignableUsers",
            ".canUserCreateComments",
            ".canUserAddCommentToThread",
            ".canUserAssignThread",
            ".canUserResolveThread",
            ".canUserEditOrDeleteComment",
        ];

        [Test]
        public async Task UnpublishedPdp_RegistersAllCommentMethodsAsync()
        {
            // Arrange: unpublished project advertises the full interface list including
            // legacyCommentManager.comments
            const string projId = "117777";
            var details = CreateProjectDetails(
                projId,
                "RegProj",
                LocalParatextProjects.GetParatextProjectInterfaces(isPublished: false)
            );
            ParatextProjects.FakeAddProject(details);

            // Act: construct PPDP and register it on the wire
            var pdp = new ParatextProjectDataProvider("PdpA", Client, details, ParatextProjects);
            await pdp.RegisterDataProviderAsync();

            // Assert: every comment method is on the wire
            foreach (var suffix in AllCommentWireMethodSuffixes)
            {
                Assert.That(
                    Client.RegisteredRequestTypes.Any(k => k.EndsWith(suffix)),
                    Is.True,
                    $"Expected unpublished PDP to register a wire method ending in '{suffix}'"
                );
            }
        }

        [Test]
        public async Task PublishedPdp_DoesNotRegisterAnyCommentMethodAsync()
        {
            // Arrange: published project advertises only the published interface list (no
            // legacyCommentManager.comments)
            const string projId = "227777";
            var details = CreateProjectDetails(
                projId,
                "PublishedProj",
                LocalParatextProjects.GetParatextProjectInterfaces(isPublished: true)
            );
            ParatextProjects.FakeAddProject(details);

            // Act: construct PPDP and register it on the wire
            var pdp = new ParatextProjectDataProvider("PdpB", Client, details, ParatextProjects);
            await pdp.RegisterDataProviderAsync();

            // Assert: no comment method appears on the wire
            foreach (var suffix in AllCommentWireMethodSuffixes)
            {
                Assert.That(
                    Client.RegisteredRequestTypes.Any(k => k.EndsWith(suffix)),
                    Is.False,
                    $"Published PDP must NOT register a wire method ending in '{suffix}'"
                );
            }

            // Sanity: scripture methods ARE registered (the published project is still readable)
            Assert.That(
                Client.RegisteredRequestTypes.Any(k => k.EndsWith(".getChapterUSFM")),
                Is.True,
                "Published PDP must still register scripture read methods"
            );
        }
    }
}
