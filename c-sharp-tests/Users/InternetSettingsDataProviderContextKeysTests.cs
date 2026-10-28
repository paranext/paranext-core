using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Services;
using Paranext.DataProvider.Services.Tests;
using Paranext.DataProvider.Users;
using Paratext.Data;

namespace TestParanextDataProvider.Users
{
    /// <summary>
    /// Reads the internet-use setting through the provider's seam so no test touches the user's
    /// real <c>InternetSettings.xml</c>.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class InternetSettingsDataProviderContextKeysTests : PapiTestBase
    {
        private const string Key = "contextKeys.platform.internetServicesAllowed";

        private FakeSharedStore _store = null!;
        private InternetUse _rawStatus;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _store = new FakeSharedStore();
            _rawStatus = InternetUse.Enabled;
        }

        private InternetSettingsDataProvider CreateProvider() =>
            new(Client, new ContextKeys(_store), () => _rawStatus);

        [Test]
        public void Ctor_PublishesInternetServicesAllowed()
        {
            CreateProvider();

            Assert.That(_store.Values[Key], Is.EqualTo(true));
        }

        [Test]
        public void Ctor_Disabled_PublishesFalse()
        {
            _rawStatus = InternetUse.Disabled;

            CreateProvider();

            Assert.That(_store.Values[Key], Is.EqualTo(false));
        }

        [Test]
        public void PublishContextKeys_RereadsSavedSetting()
        {
            var provider = CreateProvider();
            _rawStatus = InternetUse.Disabled;

            provider.PublishContextKeys();

            Assert.That(_store.Values[Key], Is.EqualTo(false));

            _rawStatus = InternetUse.Enabled;
            provider.PublishContextKeys();

            Assert.That(_store.Values[Key], Is.EqualTo(true));
        }
    }
}
