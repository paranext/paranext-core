using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ParatextUtils;
using Paranext.DataProvider.Users;
using Paratext.Data.Users;

namespace TestParanextDataProvider.Users
{
    [TestFixture]
    [NonParallelizable]
    [ExcludeFromCodeCoverage]
    internal class ParatextRegistrationResetTests
    {
        private string _root = "";

        [SetUp]
        public void SetUp()
        {
            _root = Path.Combine(Path.GetTempPath(), $"registration-reset-{Guid.NewGuid():N}");
            Directory.CreateDirectory(_root);
        }

        [TearDown]
        public void TearDown()
        {
            if (Directory.Exists(_root))
                Directory.Delete(_root, recursive: true);
        }

        [Test]
        public void CopyFromParatext9_DeletesOnlyTheCopiedFiles_SoTheNextStartupReseeds()
        {
            var paratext9 = Path.Combine(_root, "Paratext95");
            Directory.CreateDirectory(paratext9);
            File.WriteAllText(
                Path.Combine(paratext9, "RegistrationInfo.xml"),
                "<reg from=\"95\"/>"
            );
            var info = new PlatformParatextInfo(_root);
            var pinned = info.ResolvedAppDataFolder;
            File.WriteAllText(Path.Combine(pinned, "RegistrationInfo.xml"), "<reg own=\"true\"/>");
            File.WriteAllText(
                Path.Combine(pinned, "RegistrationInfo.xml.BAK"),
                "<reg old=\"true\"/>"
            );
            File.WriteAllText(Path.Combine(pinned, "autoReplace.txt"), "own list");

            var previous = PlatformParatextInfo.Install(info);
            try
            {
                ParatextRegistrationService.ResetForFirstRun("copyFromParatext9");
            }
            finally
            {
                PlatformParatextInfo.Restore(previous);
            }

            Assert.That(
                Directory.EnumerateFiles(pinned).Select(Path.GetFileName),
                Is.EquivalentTo(new[] { "autoReplace.txt" })
            );
            Assert.That(
                File.ReadAllText(Path.Combine(paratext9, "RegistrationInfo.xml")),
                Is.EqualTo("<reg from=\"95\"/>")
            );
            // What the next startup sees: an empty pinned folder, seeded from Paratext 9 again.
            Assert.That(
                File.ReadAllText(
                    Path.Combine(
                        new PlatformParatextInfo(_root).ResolvedAppDataFolder,
                        "RegistrationInfo.xml"
                    )
                ),
                Is.EqualTo("<reg from=\"95\"/>")
            );
        }

        [Test]
        public void Clear_RemovesOnlyTheRegistration_AndForgetsItWasCopied()
        {
            var paratext9 = Path.Combine(_root, "Paratext95");
            Directory.CreateDirectory(paratext9);
            File.WriteAllText(
                Path.Combine(paratext9, "RegistrationInfo.xml"),
                "<reg from=\"95\"/>"
            );
            File.WriteAllText(Path.Combine(paratext9, "InternetSettings.xml"), "<net/>");
            var info = new PlatformParatextInfo(_root);
            var pinned = info.ResolvedAppDataFolder;

            var previous = PlatformParatextInfo.Install(info);
            var previousRegistration = RegistrationInfo.Implementation;
            // A fresh implementation so it reads and deletes through the installed folder.
            RegistrationInfo.Implementation = new ParatextRegistrationInfo();
            try
            {
                ParatextRegistrationService.ResetForFirstRun("clear");
            }
            finally
            {
                RegistrationInfo.Implementation = previousRegistration;
                PlatformParatextInfo.Restore(previous);
            }

            Assert.That(File.Exists(Path.Combine(pinned, "RegistrationInfo.xml")), Is.False);
            Assert.That(File.Exists(Path.Combine(pinned, "InternetSettings.xml")), Is.True);
            Assert.That(info.IsRegistrationCopiedFromParatext9, Is.False);
            Assert.That(File.Exists(Path.Combine(paratext9, "RegistrationInfo.xml")), Is.True);
        }

        [TestCase("copyFromParatext9")]
        [TestCase("clear")]
        public void Refuses_WhenParatextDataIsNotUsingThePinnedFolder(string mode)
        {
            // The test run never installs PlatformParatextInfo, so ParatextData is on its own folder.
            Assert.Throws<InvalidOperationException>(
                () => ParatextRegistrationService.ResetForFirstRun(mode)
            );
        }

        [Test]
        public void Keep_DoesNothing()
        {
            Assert.DoesNotThrow(() => ParatextRegistrationService.ResetForFirstRun("keep"));
        }

        [Test]
        public void RejectsAnUnknownMode()
        {
            var previous = PlatformParatextInfo.Install(new PlatformParatextInfo(_root));
            try
            {
                Assert.Throws<ArgumentException>(
                    () => ParatextRegistrationService.ResetForFirstRun("wipe")
                );
            }
            finally
            {
                PlatformParatextInfo.Restore(previous);
            }
        }
    }
}
