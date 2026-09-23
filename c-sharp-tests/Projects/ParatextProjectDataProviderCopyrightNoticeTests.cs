using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;
using Paratext.Data;

namespace TestParanextDataProvider.Projects
{
    [ExcludeFromCodeCoverage]
    internal class ParatextProjectDataProviderCopyrightNoticeTests : PapiTestBase
    {
        private const string PdpName = "copyrightNoticeTestProject";
        private const string NivCopyright =
            "The Holy Bible, New International Version® NIV® Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.® Used by Permission of Biblica, Inc.® All rights reserved worldwide.";

        private ScrText _scrText = null!;
        private DummyParatextProjectDataProvider _provider = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _scrText = CreateDummyProject();
            ProjectDetails projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(projectDetails, _scrText);

            _provider = new DummyParatextProjectDataProvider(
                PdpName,
                Client,
                projectDetails,
                ParatextProjects
            );
            await _provider.RegisterDataProviderAsync();
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
        }

        private CopyrightNotice GetNotice() =>
            (CopyrightNotice)_provider.GetProjectSetting(ProjectSettingsNames.PB_COPYRIGHT_NOTICE)!;

        [Test]
        public void GetProjectSetting_NoCopyright_ReturnsNone()
        {
            Assert.That(GetNotice().Kind, Is.EqualTo(CopyrightNoticeKind.None));
        }

        [Test]
        public void GetProjectSetting_OrdinaryCopyright_ReturnsNone()
        {
            _scrText.Settings.Copyright = "© 2001 Example Bible Society. Used by permission.";

            Assert.That(GetNotice().Kind, Is.EqualTo(CopyrightNoticeKind.None));
        }

        [Test]
        public void GetProjectSetting_PlainTextNotification_SplitsBannerFromDetails()
        {
            _scrText.Settings.Copyright =
                "Notification: The text may not be translated.\nCopyright © 2016 Example.\nAll rights reserved.";

            Assert.That(
                GetNotice(),
                Is.EqualTo(
                    new CopyrightNotice(
                        CopyrightNoticeKind.Notification,
                        "The text may not be translated.",
                        "Copyright © 2016 Example.\nAll rights reserved."
                    )
                )
            );
        }

        [Test]
        public void GetProjectSetting_NotificationPrefixIgnoresCase()
        {
            _scrText.Settings.Copyright = "NOTIFICATION: Banner text\nDetails";

            Assert.That(GetNotice().Kind, Is.EqualTo(CopyrightNoticeKind.Notification));
        }

        [Test]
        public void GetProjectSetting_HtmlNotification_UsesParagraphsAsLines()
        {
            _scrText.Settings.Copyright =
                "<p>Notification: Banner text</p><p>First detail</p><p>Second <b>detail</b></p>";

            Assert.That(
                GetNotice(),
                Is.EqualTo(
                    new CopyrightNotice(
                        CopyrightNoticeKind.Notification,
                        "Banner text",
                        "First detail\nSecond detail"
                    )
                )
            );
        }

        [Test]
        public void GetProjectSetting_BiblicaTraditionalLicense_ReturnsRestrictedLicenseWithCopyrightYears()
        {
            _scrText.Settings.Copyright = NivCopyright;

            Assert.That(
                GetNotice(),
                Is.EqualTo(
                    new CopyrightNotice(
                        CopyrightNoticeKind.RestrictedLicense,
                        CopyrightYears: "1973, 1978, 1984, 2011"
                    )
                )
            );
        }

        [Test]
        public void GetProjectSetting_TextOnBiblicasListWithNoCopyright_IsStillRestricted()
        {
            // NIV11
            _scrText.Settings.DBLId = HexId.FromStr("71c6eab17ae5b667");

            Assert.That(
                GetNotice(),
                Is.EqualTo(
                    new CopyrightNotice(CopyrightNoticeKind.RestrictedLicense, CopyrightYears: "")
                )
            );
        }

        [Test]
        public void GetProjectSetting_BiblicaOpen_ReturnsNone()
        {
            _scrText.Settings.Copyright = "Copyright © 2020 by Biblica, Inc.";
            _scrText.Settings.FullName = "Biblica® Open Example Contemporary Bible 2020";

            Assert.That(GetNotice().Kind, Is.EqualTo(CopyrightNoticeKind.None));
        }

        [Test]
        public void GetProjectSetting_BiblicaOpenIdentifiedOnlyById_ReturnsNone()
        {
            // Open Basic Turkish New Testament: Biblica Open, but its name and copyright do not say
            // so.
            _scrText.Settings.Copyright =
                "Open Basic Turkish New Testament™ Copyright © 2023 by Biblica, Inc., The Translation Trust, OM UK and Global Nomads";
            _scrText.Settings.DBLId = HexId.FromStr("f6a5ef6e2e75a8b4");

            Assert.That(GetNotice().Kind, Is.EqualTo(CopyrightNoticeKind.None));
        }

        [Test]
        public void GetProjectSetting_NotificationOnBiblicaText_PrefersTheResourcesOwnNotification()
        {
            _scrText.Settings.Copyright = "Notification: Own words\n" + NivCopyright;

            Assert.That(GetNotice().Kind, Is.EqualTo(CopyrightNoticeKind.Notification));
        }

        [Test]
        public void CopyrightNotice_SerializesToTheShapeTheFrontEndReads()
        {
            var options = SerializationOptions.CreateSerializationOptions();

            Assert.Multiple(() =>
            {
                Assert.That(
                    JsonSerializer.Serialize(
                        new CopyrightNotice(CopyrightNoticeKind.None),
                        options
                    ),
                    Is.EqualTo("""{"kind":"none"}""")
                );
                Assert.That(
                    JsonSerializer.Serialize(
                        new CopyrightNotice(
                            CopyrightNoticeKind.RestrictedLicense,
                            CopyrightYears: "Y"
                        ),
                        options
                    ),
                    Is.EqualTo("""{"kind":"restrictedLicense","copyrightYears":"Y"}""")
                );
                Assert.That(
                    JsonSerializer.Serialize(
                        new CopyrightNotice(CopyrightNoticeKind.Notification, "B", "C"),
                        options
                    ),
                    Is.EqualTo("""{"kind":"notification","bannerText":"B","details":"C"}""")
                );
            });
        }

        [Test]
        public void SetProjectSetting_CopyrightNotice_ThrowsInvalidOperationException()
        {
            var ex = Assert.Throws<InvalidOperationException>(
                () =>
                    _provider.SetProjectSetting(
                        ProjectSettingsNames.PB_COPYRIGHT_NOTICE,
                        new CopyrightNotice(CopyrightNoticeKind.None)
                    )
            );

            Assert.That(ex!.Message, Does.Contain(ProjectSettingsNames.PB_COPYRIGHT_NOTICE));
            Assert.That(ex.Message, Does.Contain("read-only"));
        }
    }
}
