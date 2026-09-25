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
        private const string NivCopyright =
            "The Holy Bible, New International Version® NIV® Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.® Used by Permission of Biblica, Inc.® All rights reserved worldwide.";

        // NIV11
        private const string ListedDblId = "71c6eab17ae5b667";

        /// <summary>An editable project, as a translation team has</summary>
        private ScrText _project = null!;
        private DummyParatextProjectDataProvider _projectProvider = null!;

        /// <summary>An installed resource, as Biblica's texts are</summary>
        private ScrText _resource = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _project = CreateDummyProject();
            _projectProvider = await RegisterProviderAsync("copyrightNoticeProject", _project);

            _resource = new ResourceDummyScrText();
        }

        private async Task<DummyParatextProjectDataProvider> RegisterProviderAsync(
            string name,
            ScrText scrText
        )
        {
            ProjectDetails projectDetails = CreateProjectDetails(scrText);
            ParatextProjects.FakeAddProject(projectDetails, scrText);
            DummyParatextProjectDataProvider provider =
                new(name, Client, projectDetails, ParatextProjects);
            await provider.RegisterDataProviderAsync();
            return provider;
        }

        [TearDown]
        public void TearDown()
        {
            _project?.Dispose();
            _resource?.Dispose();
        }

        private static CopyrightNotice GetNotice(DummyParatextProjectDataProvider provider) =>
            (CopyrightNotice)provider.GetProjectSetting(ProjectSettingsNames.PB_COPYRIGHT_NOTICE)!;

        private CopyrightNotice GetProjectNotice() => GetNotice(_projectProvider);

        // The provider refuses to open a resource unless the machine has a valid Paratext
        // registration, which test machines need not have, so resources ask CopyrightNotice
        // directly. The project tests cover the provider routing the setting to it.
        private CopyrightNotice GetResourceNotice() => CopyrightNotice.FromScrText(_resource);

        [Test]
        public void GetProjectSetting_NoCopyright_ReturnsNone()
        {
            Assert.That(GetProjectNotice(), Is.EqualTo(CopyrightNotice.None()));
        }

        [Test]
        public void GetProjectSetting_OrdinaryCopyright_ReturnsNone()
        {
            _resource.Settings.Copyright = "© 2001 Example Bible Society. Used by permission.";

            Assert.That(GetResourceNotice(), Is.EqualTo(CopyrightNotice.None()));
        }

        [Test]
        public void GetProjectSetting_PlainTextNotification_SplitsBannerFromDetails()
        {
            _project.Settings.Copyright =
                "Notification: The text may not be translated.\nCopyright © 2016 Example.\nAll rights reserved.";
            _project.Settings.FullName = "Example Standard Version";

            Assert.That(
                GetProjectNotice(),
                Is.EqualTo(
                    CopyrightNotice.Notification(
                        _project.Name,
                        "Example Standard Version",
                        "The text may not be translated.",
                        "Copyright © 2016 Example.\nAll rights reserved."
                    )
                )
            );
        }

        [Test]
        public void GetProjectSetting_NotificationPrefixIgnoresCase()
        {
            _project.Settings.Copyright = "NOTIFICATION: Banner text\nDetails";

            Assert.That(GetProjectNotice().Kind, Is.EqualTo(CopyrightNoticeKind.Notification));
        }

        [Test]
        public void GetProjectSetting_HtmlNotification_UsesParagraphsAsLinesAndDecodesEntities()
        {
            _project.Settings.Copyright =
                "<p>Notification: Banner &amp; text</p><p>First detail</p><p>Second <b>detail</b> &#169; 2016</p>";

            Assert.That(
                GetProjectNotice(),
                Is.EqualTo(
                    CopyrightNotice.Notification(
                        _project.Name,
                        _project.Settings.FullName,
                        "Banner & text",
                        "First detail\nSecond detail © 2016"
                    )
                )
            );
        }

        [Test]
        public void GetProjectSetting_BiblicaResource_ReturnsRestrictedLicenseWithNamesAndCopyrightYears()
        {
            _resource.Settings.Copyright = NivCopyright;
            _resource.Settings.FullName = " New International Version 2011 ";

            Assert.That(
                GetResourceNotice(),
                Is.EqualTo(
                    CopyrightNotice.RestrictedLicense(
                        _resource.Name,
                        "New International Version 2011",
                        "1973, 1978, 1984, 2011"
                    )
                )
            );
        }

        [Test]
        public void GetProjectSetting_EmptyFullName_FallsBackToTheShortName()
        {
            _resource.Settings.Copyright = NivCopyright;
            _resource.Settings.FullName = "  ";

            CopyrightNotice notice = GetResourceNotice();

            Assert.That(notice.FullName, Is.EqualTo(_resource.Name));
        }

        [Test]
        public void GetProjectSetting_HtmlBiblicaCopyright_TakesYearsFromTheDecodedText()
        {
            // Undecoded, "&copy;" hides where the text's own statement ends, and the quoted NIV
            // years would be read as this text's
            _resource.Settings.Copyright =
                "<p>The Life of Christ&#8482; Copyright &copy; 2004 by Biblica, Inc.</p>"
                + "<p>Scripture from the NIV&#174; Copyright &copy; 1984 by Biblica, Inc.</p>";

            Assert.That(GetResourceNotice().CopyrightYears, Is.EqualTo("2004"));
        }

        [Test]
        public void GetProjectSetting_ResourceOnBiblicasListWithNoCopyright_IsStillRestricted()
        {
            _resource.Settings.DBLId = HexId.FromStr(ListedDblId);

            Assert.That(
                GetResourceNotice(),
                Is.EqualTo(
                    CopyrightNotice.RestrictedLicense(
                        _resource.Name,
                        _resource.Settings.FullName,
                        ""
                    )
                )
            );
        }

        [Test]
        public void GetProjectSetting_EditableProjectWithBiblicaCopyright_ReturnsNone()
        {
            // A Biblica translation team's own project carries Biblica's copyright
            _project.Settings.Copyright = NivCopyright;

            Assert.That(GetProjectNotice(), Is.EqualTo(CopyrightNotice.None()));
        }

        [Test]
        public void GetProjectSetting_EditableProjectWithListedDblId_ReturnsNone()
        {
            // Biblica's master project has the DBL id of the resource published from it
            _project.Settings.DBLId = HexId.FromStr(ListedDblId);

            Assert.That(GetProjectNotice(), Is.EqualTo(CopyrightNotice.None()));
        }

        [Test]
        public void GetProjectSetting_BiblicaOpen_ReturnsNone()
        {
            _resource.Settings.Copyright = "Copyright © 2020 by Biblica, Inc.";
            _resource.Settings.FullName = "Biblica® Open Example Contemporary Bible 2020";

            Assert.That(GetResourceNotice(), Is.EqualTo(CopyrightNotice.None()));
        }

        [Test]
        public void GetProjectSetting_BiblicaOpenIdentifiedOnlyById_ReturnsNone()
        {
            // Open Basic Turkish New Testament: Biblica Open, but its name and copyright do not say
            // so.
            _resource.Settings.Copyright =
                "Open Basic Turkish New Testament™ Copyright © 2023 by Biblica, Inc., The Translation Trust, OM UK and Global Nomads";
            _resource.Settings.DBLId = HexId.FromStr("f6a5ef6e2e75a8b4");

            Assert.That(GetResourceNotice(), Is.EqualTo(CopyrightNotice.None()));
        }

        [Test]
        public void GetProjectSetting_NotificationOnBiblicaText_PrefersTheResourcesOwnNotification()
        {
            _resource.Settings.Copyright = "Notification: Own words\n" + NivCopyright;

            Assert.That(GetResourceNotice().Kind, Is.EqualTo(CopyrightNoticeKind.Notification));
        }

        [Test]
        public void CopyrightNotice_SerializesToTheShapeTheFrontEndReads()
        {
            var options = SerializationOptions.CreateSerializationOptions();

            Assert.Multiple(() =>
            {
                Assert.That(
                    JsonSerializer.Serialize(CopyrightNotice.None(), options),
                    Is.EqualTo("""{"kind":"none"}""")
                );
                Assert.That(
                    JsonSerializer.Serialize(
                        CopyrightNotice.Notification("N", "F", "B", "D"),
                        options
                    ),
                    Is.EqualTo(
                        """{"kind":"notification","name":"N","fullName":"F","bannerText":"B","details":"D"}"""
                    )
                );
                Assert.That(
                    JsonSerializer.Serialize(
                        CopyrightNotice.RestrictedLicense("N", "F", "Y"),
                        options
                    ),
                    Is.EqualTo(
                        """{"kind":"restrictedLicense","name":"N","fullName":"F","copyrightYears":"Y"}"""
                    )
                );
            });
        }

        [Test]
        public void SetProjectSetting_CopyrightNotice_ThrowsInvalidOperationException()
        {
            var ex = Assert.Throws<InvalidOperationException>(
                () =>
                    _projectProvider.SetProjectSetting(
                        ProjectSettingsNames.PB_COPYRIGHT_NOTICE,
                        CopyrightNotice.None()
                    )
            );

            Assert.That(ex!.Message, Does.Contain(ProjectSettingsNames.PB_COPYRIGHT_NOTICE));
            Assert.That(ex.Message, Does.Contain("read-only"));
        }
    }
}
