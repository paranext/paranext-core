using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using TestParanextDataProvider;

namespace Paranext.DataProvider.Services.Tests
{
    [ExcludeFromCodeCoverage]
    public class ProjectSettingsServicesTests
    {
        [Test]
        public void IsValid_ValidLanguage_ReturnsTrue()
        {
            DummyPapiClient papiClient = new();
            var newValueJson = "Spanish".SerializeToJson();
            var currentValueJson = "German".SerializeToJson();
            papiClient.AddSettingValueToTreatAsValid(
                ProjectSettingsNames.PB_LANGUAGE,
                newValueJson,
                currentValueJson
            );
            var result = ProjectSettingsService.IsValid(
                papiClient,
                newValueJson,
                currentValueJson,
                ProjectSettingsNames.PT_LANGUAGE,
                ""
            );

            Assert.That(result, Is.True);
        }

        [Test]
        public void IsValid_InvalidSetting_ReturnsFalse()
        {
            DummyPapiClient papiClient = new DummyPapiClient();
            var newValueJson = "Spanish".SerializeToJson();
            var currentValueJson = "German".SerializeToJson();
            var result = ProjectSettingsService.IsValid(
                papiClient,
                newValueJson,
                currentValueJson,
                ProjectSettingsNames.PT_LANGUAGE,
                ""
            );

            Assert.That(result, Is.False);
        }

        [Test]
        public void GetDefault_KnownProperty_ReturnsDefaultValue()
        {
            DummyPapiClient papiClient = new DummyPapiClient();
            var result = ProjectSettingsService.GetDefault(
                papiClient,
                ProjectSettingsNames.PT_LANGUAGE
            );

            Assert.That(
                result,
                Is.EqualTo($"default value for {ProjectSettingsNames.PB_LANGUAGE}")
            );
        }

        [Test]
        public void GetDefault_UnknownProperty_ReturnsNull()
        {
            DummyPapiClient papiClient = new DummyPapiClient();
            var result = ProjectSettingsService.GetDefault(papiClient, "wonky.setting");

            Assert.That(result, Is.Null);
        }

        [Test]
        public void RegisterValidator_NewProperty_ReturnsTrue()
        {
            const string settingKey = "testScripture.MonkeyCount";
            (bool result, string? error) MonkeyCountValidator(
                (string newValueJson, string currentValueJson, string allChangesJson) data
            )
            {
                try
                {
                    var value = data.newValueJson.DeserializeFromJson<int?>();
                    var result = true;
                    string? error = null;
                    if (value == null)
                    {
                        result = false;
                        error = "New value must be an integer. It cannot be null";
                    }
                    else if (value <= 4)
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
                    2.SerializeToJson(),
                    5.SerializeToJson(),
                    settingKey,
                    ""
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
                    1.SerializeToJson(),
                    5.SerializeToJson(),
                    settingKey,
                    ""
                ),
                Is.False
            );
            Assert.That(
                ProjectSettingsService.IsValid(
                    papiClient,
                    6.SerializeToJson(),
                    5.SerializeToJson(),
                    settingKey,
                    ""
                ),
                Is.True
            );
        }

        [Test]
        public void RegisterValidator_ExistingProperty_ReturnsFalse()
        {
            const string settingKey = "testScripture.Oops";
            (bool result, string? error) OopsValidator(
                (string newValueJson, string currentValueJson, string allChangesJson) data
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
