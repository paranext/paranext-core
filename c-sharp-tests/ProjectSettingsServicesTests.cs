using System.Diagnostics.CodeAnalysis;
using Newtonsoft.Json;
using TestParanextDataProvider;

namespace Paranext.DataProvider.Projects.Tests
{
    [ExcludeFromCodeCoverage]
    public class ProjectSettingsServicesTests
    {
        [Test]
        public void IsValid_ValidLanguage_ReturnsTrue()
        {
            DummyPapiClient papiClient = new DummyPapiClient();
            var newValueJson = JsonConvert.SerializeObject("Spanish");
            var currentValueJson = JsonConvert.SerializeObject("German");
            papiClient.AddSettingValueToTreatAsValid(ProjectSettings.PB_LANGUAGE,
                newValueJson, currentValueJson);
            var result = ProjectSettingsService.IsValid(papiClient, newValueJson,
                currentValueJson, ProjectSettings.PT_LANGUAGE, "",
                ProjectType.Paratext);

            Assert.That(result, Is.True);
        }

        [Test]
        public void IsValid_InvalidSetting_ReturnsFalse()
        {
            DummyPapiClient papiClient = new DummyPapiClient();
            var newValueJson = JsonConvert.SerializeObject("Spanish");
            var currentValueJson = JsonConvert.SerializeObject("German");
            var result = ProjectSettingsService.IsValid(papiClient, newValueJson,
                currentValueJson, ProjectSettings.PT_LANGUAGE, "",
                ProjectType.Paratext);

            Assert.That(result, Is.False);
        }

        [Test]
        public void IsValid_UnexpectedProjectType_ReturnsFalse()
        {
            DummyPapiClient papiClient = new DummyPapiClient();
            var newValueJson = JsonConvert.SerializeObject("Spanish");
            var currentValueJson = JsonConvert.SerializeObject("German");
            papiClient.AddSettingValueToTreatAsValid(ProjectSettings.PB_LANGUAGE,
                newValueJson, currentValueJson);
            var result = ProjectSettingsService.IsValid(papiClient, newValueJson,
                currentValueJson, ProjectSettings.PT_LANGUAGE, "",
                "SomethingElse");

            Assert.That(result, Is.False);
        }

        [Test]
        public void GetDefault_KnownProperty_ReturnsDefaultValue()
        {
            DummyPapiClient papiClient = new DummyPapiClient();
            var result = ProjectSettingsService.GetDefault(papiClient, ProjectSettings.PT_LANGUAGE,
                ProjectType.Paratext);

            Assert.That(result, Is.EqualTo($"default value for {ProjectSettings.PB_LANGUAGE}"));
        }
    }
}
