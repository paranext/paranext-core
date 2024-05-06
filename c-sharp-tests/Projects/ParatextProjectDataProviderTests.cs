using System.ComponentModel;
using System.Configuration;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using Newtonsoft.Json;
using Paranext.DataProvider.ParatextUtils;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using PtxUtils;

namespace TestParanextDataProvider
{
    [ExcludeFromCodeCoverage]
    internal class ParatextProjectDataProviderTests
    {
        /// <summary>
        /// Tests that the ParatextProjectDataProvider has successfully registered a validator for
        /// the Validity property and that the validator is called to determine that the new value
        /// for that property is indeed valid.
        /// </summary>
        [Test]
        public void SetProjectSetting_ValidVisibility_Succeeds()
        {
            var pdp = GetParatextProjectDataProviderForFirstLocalProject();

            var result = pdp.SetProjectSetting(
                JsonConvert.SerializeObject(pdp.DataProviderName + ".Visibility"),
                JsonConvert.SerializeObject(ProjectVisibility.Public.ToString()));

            Assert.That(result.Success, Is.True);
        }

        /// <summary>
        /// Tests that the ParatextProjectDataProvider has successfully registered a validator for
        /// the Validity property and that the validator is called to determine that the new value
        /// for that property is indeed invalid.
        /// </summary>
        [Test]
        public void SetProjectSetting_InvalidVisibility_DoesNotSucceed()
        {
            var pdp = GetParatextProjectDataProviderForFirstLocalProject();

            var result = pdp.SetProjectSetting(
                JsonConvert.SerializeObject(pdp.DataProviderName + ".Visibility"),
                JsonConvert.SerializeObject(89));

            Assert.That(result.Success, Is.False);
        }

        private ParatextProjectDataProvider GetParatextProjectDataProviderForFirstLocalProject()
        {
            var localProjects = new LocalParatextProjects();
            localProjects.Initialize();
            var details = localProjects.GetAllProjectDetails().FirstOrDefault();
            if (details == null)
                Assert.Inconclusive("No local project details available.");
            var metadata = details.Metadata;
            return new ParatextProjectDataProvider(metadata.Name, new DummyPapiClient(), details,
                localProjects);
        }
    }
}
