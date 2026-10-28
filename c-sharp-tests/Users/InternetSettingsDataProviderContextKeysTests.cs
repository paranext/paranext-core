using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Services;
using Paranext.DataProvider.Services.Tests;
using Paranext.DataProvider.Users;
using Paratext.Data;

namespace TestParanextDataProvider.Users
{
    [ExcludeFromCodeCoverage]
    internal class InternetSettingsDataProviderContextKeysTests : PapiTestBase
    {
        private const string Key = "contextKeys.platform.internetServicesAllowed";

        private FakeSharedStore _store = null!;
        private InternetAccess.InternetSettingsMemento _originalSettings = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _store = new FakeSharedStore();
            _originalSettings = CreateProvider().GetInternetSettings();
        }

        [TearDown]
        public void TearDown()
        {
            CreateProvider().SetInternetSettings(_originalSettings);
        }

        private InternetSettingsDataProvider CreateProvider() =>
            new(Client, new ContextKeys(_store));

        [Test]
        public void Ctor_PublishesInternetServicesAllowed()
        {
            InternetAccess.RawStatus = InternetUse.Enabled;

            CreateProvider();

            Assert.That(_store.Values[Key], Is.EqualTo(true));
        }

        [Test]
        public void SetInternetSettings_Disabled_PublishesFalse()
        {
            InternetAccess.RawStatus = InternetUse.Enabled;
            var provider = CreateProvider();
            var settings = provider.GetInternetSettings();
            settings.PermittedInternetUse = InternetUse.Disabled;

            provider.SetInternetSettings(settings);

            Assert.That(_store.Values[Key], Is.EqualTo(false));
        }

        [Test]
        public void SetInternetSettings_Enabled_PublishesTrue()
        {
            InternetAccess.RawStatus = InternetUse.Disabled;
            var provider = CreateProvider();
            Assert.That(_store.Values[Key], Is.EqualTo(false));
            var settings = provider.GetInternetSettings();
            settings.PermittedInternetUse = InternetUse.Enabled;

            provider.SetInternetSettings(settings);

            Assert.That(_store.Values[Key], Is.EqualTo(true));
        }
    }
}
