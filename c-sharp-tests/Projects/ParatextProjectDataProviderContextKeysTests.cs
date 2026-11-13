using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;
using Paranext.DataProvider.Services.Tests;
using Paratext.Data;

namespace TestParanextDataProvider.Projects
{
    [ExcludeFromCodeCoverage]
    internal class ParatextProjectDataProviderContextKeysTests : PapiTestBase
    {
        private FakeSharedStore _store = null!;
        private ContextKeys _contextKeys = null!;
        private readonly List<ScrText> _scrTexts = [];

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _store = new FakeSharedStore();
            _contextKeys = new ContextKeys(_store);
            await Client.RegisterRequestHandlerAsync(
                "object:ProjectSettingsService.isValid",
                new Func<string, object?, object?, object?, bool>((k, n, c, a) => true),
                null
            );
        }

        [TearDown]
        public void TearDown()
        {
            foreach (var scrText in _scrTexts)
                scrText.Dispose();
            _scrTexts.Clear();
        }

        private DummyParatextProjectDataProvider CreateProvider(ScrText scrText)
        {
            _scrTexts.Add(scrText);
            var details = CreateProjectDetails(scrText);
            ParatextProjects.FakeAddProject(details, scrText);
            return new DummyParatextProjectDataProvider(
                "contextKeysTestProject" + _scrTexts.Count,
                Client,
                details,
                ParatextProjects,
                _contextKeys
            );
        }

        private static string Key(ScrText scrText, string prefix, string name) =>
            $"contextKeys.{prefix}.project.{CreateProjectDetails(scrText).Metadata.Id}.{name}";

        private object? Value(ScrText scrText, string prefix, string name) =>
            _store.Values.GetValueOrDefault(Key(scrText, prefix, name));

        [Test]
        public void PublishContextKeys_EditableProject_PublishesFourTrueFalseFacts()
        {
            var scrText = CreateDummyProject();
            var provider = CreateProvider(scrText);

            provider.PublishContextKeys();

            Assert.That(Value(scrText, "platform", "isResource"), Is.EqualTo(false));
            Assert.That(Value(scrText, "platform", "isEditable"), Is.EqualTo(true));
            Assert.That(Value(scrText, "platformScripture", "canEditScripture"), Is.EqualTo(true));
            Assert.That(Value(scrText, "platformScripture", "canCreateComments"), Is.EqualTo(true));
        }

        private sealed class ResourceDummyScrText : DummyScrText
        {
            public override bool IsResourceProject => true;
        }

        [Test]
        public void PublishContextKeys_PublishedProject_IsResourceTrueAndIsEditableFalse()
        {
            var resourceScrText = new ResourceDummyScrText();
            _scrTexts.Add(resourceScrText);
            var resourceDetails = CreateProjectDetails(resourceScrText);
            ParatextProjects.FakeAddProject(resourceDetails, resourceScrText);
            var resourceProvider = new DummyParatextProjectDataProvider(
                "contextKeysResource",
                Client,
                resourceDetails,
                ParatextProjects,
                _contextKeys
            );

            resourceProvider.PublishContextKeys();

            Assert.That(Value(resourceScrText, "platform", "isResource"), Is.EqualTo(true));
            Assert.That(Value(resourceScrText, "platform", "isEditable"), Is.EqualTo(false));
            Assert.That(
                Value(resourceScrText, "platformScripture", "canCreateComments"),
                Is.EqualTo(false)
            );
        }

        [Test]
        public void PublishContextKeys_StudyBibleAdditions_CanCreateCommentsFalse()
        {
            var scrText = CreateDummyProject();
            MakeStudyBibleAdditions(scrText);
            var provider = CreateProvider(scrText);

            provider.PublishContextKeys();

            Assert.That(
                Value(scrText, "platformScripture", "canCreateComments"),
                Is.EqualTo(false)
            );
        }

        [Test]
        public void SetProjectSetting_EditableChanged_RepublishesIsEditable()
        {
            var scrText = CreateDummyProject();
            var provider = CreateProvider(scrText);
            provider.PublishContextKeys();
            Assert.That(Value(scrText, "platform", "isEditable"), Is.EqualTo(true));

            provider.SetProjectSetting(ProjectSettingsNames.PB_IS_EDITABLE, false);

            Assert.That(Value(scrText, "platform", "isEditable"), Is.EqualTo(false));
        }

        [Test]
        public void SendFullProjectUpdateEvent_Republishes()
        {
            var scrText = CreateDummyProject();
            var provider = CreateProvider(scrText);

            provider.SendFullProjectUpdateEvent();

            Assert.That(Value(scrText, "platform", "isEditable"), Is.EqualTo(true));
        }

        [Test]
        public void PublishContextKeys_InvalidProjectId_LogsAndDoesNotThrow()
        {
            var scrText = CreateDummyProject();
            _scrTexts.Add(scrText);
            var details = CreateProjectDetails("bad id", scrText.Name);
            ParatextProjects.FakeAddProject(details, scrText);
            var provider = new DummyParatextProjectDataProvider(
                "contextKeysBadId",
                Client,
                details,
                ParatextProjects,
                _contextKeys
            );

            Assert.DoesNotThrow(() => provider.PublishContextKeys());
            Assert.That(_store.Values.Keys, Is.Empty);
        }
    }
}
