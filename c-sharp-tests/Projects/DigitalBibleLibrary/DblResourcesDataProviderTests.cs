using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects.DigitalBibleLibrary;

namespace TestParanextDataProvider.Projects.DigitalBibleLibrary
{
    [ExcludeFromCodeCoverage]
    internal class DblResourcesDataProviderTests : PapiTestBase
    {
        /// <summary>
        /// The front end calls this on every resource-list refresh, including before the background
        /// catalog fetch has finished on startup. It has to answer without reaching the DBL, because
        /// the TypeScript side treats an absent entry as "unknown" and keeps its cached value — an
        /// exception or a network call here would instead stall or break the refresh.
        /// </summary>
        [Test]
        public async Task RecomputeDblResourcesUpdateStatus_ReturnsEmptyBeforeCatalogIsFetched()
        {
            DblResourcesDataProvider provider = new(Client, ParatextProjects);

            var updateStatus = await provider.RecomputeDblResourcesUpdateStatus();

            Assert.That(updateStatus, Is.Empty);
        }

        /// <summary>
        /// The TypeScript side calls this by name through `IDblResourcesProvider`, so the registered
        /// wire name is a cross-language contract: renaming the C# method without updating
        /// `platform-get-resources.d.ts` would break the refresh silently at runtime rather than at
        /// compile time. The name also deliberately avoids the `get`/`set`/`subscribe` prefixes
        /// reserved for data-type accessors.
        /// </summary>
        [Test]
        public async Task RecomputeDblResourcesUpdateStatus_IsRegisteredUnderItsContractName()
        {
            DblResourcesDataProvider provider = new(Client, ParatextProjects);

            await provider.RegisterDataProviderAsync();

            Assert.That(
                Client.RegisteredRequestTypes.Any(requestType =>
                    requestType.EndsWith(".recomputeDblResourcesUpdateStatus")
                ),
                Is.True,
                "Expected the DBL resources provider to register "
                    + "'recomputeDblResourcesUpdateStatus' on the wire; "
                    + $"registered: {string.Join(", ", Client.RegisteredRequestTypes)}"
            );
        }
    }
}
