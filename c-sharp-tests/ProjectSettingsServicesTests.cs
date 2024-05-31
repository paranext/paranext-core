using System.Diagnostics.CodeAnalysis;
using Newtonsoft.Json;
using TestParanextDataProvider;

namespace Paranext.DataProvider.Projects.Tests
{
    [ExcludeFromCodeCoverage]
    public class ProjectSettingsServicesTests
    {
        // TODO:
        [Test]
        public void IsValid_ValidLanguage_ReturnsTrue()
        {
            DummyPapiClient papiClient = new DummyPapiClient();
            var newValueJson = JsonConvert.SerializeObject("Spanish");
            var currentValueJson = JsonConvert.SerializeObject("German");
            papiClient.AddSettingValueToTreatAsValid(
                ProjectSettings.PB_LANGUAGE,
                newValueJson,
                currentValueJson
            );
            var result = ProjectSettingsService.IsValid(
                papiClient,
                newValueJson,
                currentValueJson,
                ProjectSettings.PT_LANGUAGE,
                "",
                [ProjectInterface.Paratext]
            );

            Assert.That(result, Is.True);
        }

        [Test]
        public void IsValid_InvalidSetting_ReturnsFalse()
        {
            DummyPapiClient papiClient = new DummyPapiClient();
            var newValueJson = JsonConvert.SerializeObject("Spanish");
            var currentValueJson = JsonConvert.SerializeObject("German");
            var result = ProjectSettingsService.IsValid(
                papiClient,
                newValueJson,
                currentValueJson,
                ProjectSettings.PT_LANGUAGE,
                "",
                [ProjectInterface.Paratext]
            );

            Assert.That(result, Is.False);
        }

        [Test]
        public void IsValid_UnexpectedProjectInterfaces_ReturnsFalse()
        {
            DummyPapiClient papiClient = new DummyPapiClient();
            var newValueJson = JsonConvert.SerializeObject("Spanish");
            var currentValueJson = JsonConvert.SerializeObject("German");
            papiClient.AddSettingValueToTreatAsValid(
                ProjectSettings.PB_LANGUAGE,
                newValueJson,
                currentValueJson
            );
            var result = ProjectSettingsService.IsValid(
                papiClient,
                newValueJson,
                currentValueJson,
                ProjectSettings.PT_LANGUAGE,
                "",
                ["SomethingElse"]
            );

            Assert.That(result, Is.False);
        }

        // TODO:
        [Test]
        public void GetDefault_KnownProperty_ReturnsDefaultValue()
        {
            DummyPapiClient papiClient = new DummyPapiClient();
            var result = ProjectSettingsService.GetDefault(
                papiClient,
                ProjectSettings.PT_LANGUAGE,
                [ProjectInterface.Paratext]
            );

            Assert.That(result, Is.EqualTo($"default value for {ProjectSettings.PB_LANGUAGE}"));
        }

        [Test]
        public void GetDefault_UnknownProperty_ReturnsNull()
        {
            DummyPapiClient papiClient = new DummyPapiClient();
            var result = ProjectSettingsService.GetDefault(
                papiClient,
                "wonky.setting",
                [ProjectInterface.Paratext]
            );

            Assert.That(result, Is.Null);
        }

        // TODO:
        [Test]
        public void RegisterValidator_NewProperty_ReturnsTrue()
        {
            const string settingKey = "testScripture.MonkeyCount";
            (bool result, string? error) MonkeyCountValidator(
                (
                    string newValueJson,
                    string currentValueJson,
                    string allChangesJson,
                    List<string> projectInterfaces
                ) data
            )
            {
                try
                {
                    var value = JsonConvert.DeserializeObject(data.newValueJson);
                    var result = true;
                    string? error = null;
                    if (value == null)
                    {
                        result = false;
                        error = "New value must be an integer. It cannot be null";
                    }
                    else if ((long)value <= 4)
                    {
                        result = false;
                        error =
                            "Mama called the doctor, and the doctor said, you must have at"
                            + "least 4 monkeys jumping on the bed!";
                    }
                    return (result, error);
                }
                catch (Exception ex)
                {
                    return (false, ex.Message);
                }
            }

            DummyPapiClient papiClient = new DummyPapiClient();

            // Before registering the validator, IsValid should return true.
            Assert.That(
                ProjectSettingsService.IsValid(
                    papiClient,
                    JsonConvert.SerializeObject(2),
                    JsonConvert.SerializeObject(5),
                    settingKey,
                    "",
                    [ProjectInterface.Paratext]
                ),
                Is.True
            );

            var result = ProjectSettingsService.RegisterValidator(
                papiClient,
                settingKey,
                MonkeyCountValidator
            );

            Assert.That(result, Is.EqualTo(true));

            Assert.That(
                ProjectSettingsService.IsValid(
                    papiClient,
                    JsonConvert.SerializeObject(1),
                    JsonConvert.SerializeObject(5),
                    settingKey,
                    "",
                    [ProjectInterface.Paratext]
                ),
                Is.False
            );
            Assert.That(
                ProjectSettingsService.IsValid(
                    papiClient,
                    JsonConvert.SerializeObject(6),
                    JsonConvert.SerializeObject(5),
                    settingKey,
                    "",
                    [ProjectInterface.Paratext]
                ),
                Is.True
            );
        }

        [Test]
        public void RegisterValidator_ExistingProperty_ReturnsFalse()
        {
            const string settingKey = "testScripture.Oops";
            (bool result, string? error) OopsValidator(
                (
                    string newValueJson,
                    string currentValueJson,
                    string allChangesJson,
                    List<string> projectInterfaces
                ) data
            )
            {
                return (false, "The Oops property has no valid values. Ha Ha!");
            }

            DummyPapiClient papiClient = new DummyPapiClient();

            var result = ProjectSettingsService.RegisterValidator(
                papiClient,
                settingKey,
                OopsValidator
            );

            Assert.That(result, Is.EqualTo(true));

            Assert.That(
                ProjectSettingsService.RegisterValidator(papiClient, settingKey, OopsValidator),
                Is.EqualTo(false)
            );
        }
    }
}
