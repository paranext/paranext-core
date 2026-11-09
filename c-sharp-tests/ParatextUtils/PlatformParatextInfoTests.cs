using System.Diagnostics.CodeAnalysis;
using System.Security.Cryptography;
using Paranext.DataProvider.ParatextUtils;
using Paratext.Data;

namespace TestParanextDataProvider.ParatextUtils
{
    [TestFixture]
    [NonParallelizable]
    [ExcludeFromCodeCoverage]
    internal class PlatformParatextInfoTests
    {
        private string _root = "";

        [SetUp]
        public void SetUp()
        {
            _root = Path.Combine(Path.GetTempPath(), $"platform-paratext-info-{Guid.NewGuid():N}");
            Directory.CreateDirectory(_root);
        }

        [TearDown]
        public void TearDown()
        {
            if (Directory.Exists(_root))
                Directory.Delete(_root, recursive: true);
        }

        private string MakeParatextFolder(string name, string registrationContent = "<reg/>")
        {
            var folder = Path.Combine(_root, name);
            Directory.CreateDirectory(folder);
            File.WriteAllText(Path.Combine(folder, "RegistrationInfo.xml"), registrationContent);
            File.WriteAllText(
                Path.Combine(folder, "InternetSettings.xml"),
                $"<net from=\"{name}\"/>"
            );
            return folder;
        }

        private static string HashFolder(string folder) =>
            string.Join(
                "|",
                Directory
                    .EnumerateFiles(folder)
                    .OrderBy(path => path, StringComparer.Ordinal)
                    .Select(path =>
                        $"{Path.GetFileName(path)}:{Convert.ToHexString(SHA256.HashData(File.ReadAllBytes(path)))}"
                    )
            );

        [Test]
        public void ResolvedAppDataFolder_IsPinnedRegardlessOfParatextVersion()
        {
            var previousVersion = ParatextInfo.ParatextVersion;
            try
            {
                foreach (
                    var version in new[] { new Version(10, 1, 0, 0), new Version(11, 0, 0, 0) }
                )
                {
                    ParatextInfo.ParatextVersion = version;
                    var info = new PlatformParatextInfo(_root);
                    Assert.That(
                        info.ResolvedAppDataFolder,
                        Is.EqualTo(Path.Combine(_root, "Paratext100")),
                        $"version {version}"
                    );
                }
            }
            finally
            {
                ParatextInfo.ParatextVersion = previousVersion;
            }
        }

        [Test]
        public void Install_RoutesParatextDataToThePinnedFolder()
        {
            var info = new PlatformParatextInfo(_root);
            var previous = PlatformParatextInfo.Install(info);
            try
            {
                Assert.That(ParatextInfo.AppDataFolder, Is.EqualTo(info.AppDataFolderPath));
            }
            finally
            {
                PlatformParatextInfo.Restore(previous);
            }
        }

        [Test]
        public void Seeds_FromTheNewestParatext8Or9FolderWithARegistration()
        {
            MakeParatextFolder("Paratext75", "<reg from=\"75\"/>");
            MakeParatextFolder("Paratext94", "<reg from=\"94\"/>");
            MakeParatextFolder("Paratext95", "<reg from=\"95\"/>");
            // A newer-named folder without a registration is not a source.
            Directory.CreateDirectory(Path.Combine(_root, "Paratext96"));
            // Platform.Bible's own folders from other versions are never a source.
            MakeParatextFolder("Paratext101", "<reg from=\"101\"/>");

            var folder = new PlatformParatextInfo(_root).ResolvedAppDataFolder;

            Assert.That(
                File.ReadAllText(Path.Combine(folder, "RegistrationInfo.xml")),
                Is.EqualTo("<reg from=\"95\"/>")
            );
            Assert.That(
                File.ReadAllText(Path.Combine(folder, "InternetSettings.xml")),
                Is.EqualTo("<net from=\"Paratext95\"/>")
            );
        }

        [Test]
        public void DoesNotReseed_WhenThePinnedFolderHasAnyFileSeedingCopies()
        {
            MakeParatextFolder("Paratext95", "<reg from=\"95\"/>");
            var pinned = Path.Combine(_root, "Paratext100");
            Directory.CreateDirectory(pinned);
            File.WriteAllText(Path.Combine(pinned, "InternetSettings.xml"), "<net own=\"true\"/>");

            var folder = new PlatformParatextInfo(_root).ResolvedAppDataFolder;

            // A Platform.Bible folder with no registration (e.g. the user cleared it) stays that way.
            Assert.That(File.Exists(Path.Combine(folder, "RegistrationInfo.xml")), Is.False);
            Assert.That(
                File.ReadAllText(Path.Combine(folder, "InternetSettings.xml")),
                Is.EqualTo("<net own=\"true\"/>")
            );
        }

        [Test]
        public void Seeds_WhenThePinnedFolderHasOnlyFilesSeedingDoesNotCopy()
        {
            MakeParatextFolder("Paratext95", "<reg from=\"95\"/>");
            var pinned = Path.Combine(_root, "Paratext100");
            Directory.CreateDirectory(pinned);
            File.WriteAllText(Path.Combine(pinned, "autoReplace.txt"), "own list");

            var folder = new PlatformParatextInfo(_root).ResolvedAppDataFolder;

            Assert.That(
                File.ReadAllText(Path.Combine(folder, "RegistrationInfo.xml")),
                Is.EqualTo("<reg from=\"95\"/>")
            );
            Assert.That(
                File.ReadAllText(Path.Combine(folder, "autoReplace.txt")),
                Is.EqualTo("own list")
            );
        }

        [Test]
        public void DoesNotThrow_WhenTheFolderCannotBeCreated()
        {
            // The "local app data" root is a file, so nothing can be created under it.
            var fileAsRoot = Path.Combine(_root, "not-a-folder");
            File.WriteAllText(fileAsRoot, "");
            var info = new PlatformParatextInfo(fileAsRoot);

            Assert.That(info.ResolvedAppDataFolder, Is.EqualTo(info.AppDataFolderPath));
        }

        [Test]
        public void RecordsThatTheRegistrationWasCopiedFromParatext9()
        {
            MakeParatextFolder("Paratext95", "<reg from=\"95\"/>");

            Assert.That(new PlatformParatextInfo(_root).IsRegistrationCopiedFromParatext9, Is.True);
        }

        [Test]
        public void ForgetsTheCopyOnceTheRegistrationIsReplaced()
        {
            MakeParatextFolder("Paratext95", "<reg from=\"95\"/>");
            var info = new PlatformParatextInfo(_root);
            Assert.That(info.IsRegistrationCopiedFromParatext9, Is.True);

            info.ForgetCopiedFromParatext9();

            Assert.That(info.IsRegistrationCopiedFromParatext9, Is.False);
            Assert.That(
                File.Exists(Path.Combine(info.ResolvedAppDataFolder, "RegistrationInfo.xml")),
                Is.True
            );
        }

        [Test]
        public void ForgetCopiedFromParatext9_DoesNotThrow_WhenTheMarkerCannotBeDeleted()
        {
            MakeParatextFolder("Paratext95", "<reg from=\"95\"/>");
            var info = new PlatformParatextInfo(_root);
            var folder = info.ResolvedAppDataFolder;
            var marker = Path.Combine(folder, "CopiedFromParatext9.txt");
            Assert.That(File.Exists(marker), Is.True);

            // Windows refuses to delete a file held open without delete sharing; Unix refuses to
            // delete from a folder without write permission.
            FileStream? held = null;
            UnixFileMode? folderMode = null;
            if (OperatingSystem.IsWindows())
                held = new FileStream(marker, FileMode.Open, FileAccess.Read, FileShare.None);
            else
            {
                folderMode = File.GetUnixFileMode(folder);
                File.SetUnixFileMode(folder, UnixFileMode.UserRead | UnixFileMode.UserExecute);
            }
            try
            {
                Assert.DoesNotThrow(info.ForgetCopiedFromParatext9);
                if (!File.Exists(marker))
                    Assert.Inconclusive("Could not make the marker undeletable on this machine");
            }
            finally
            {
                held?.Dispose();
                if (folderMode is { } mode)
                    File.SetUnixFileMode(folder, mode);
            }
        }

        [Test]
        public void Reseeds_WhenRequested_EvenIfASeededFileWasRecreatedSince()
        {
            MakeParatextFolder("Paratext95", "<reg from=\"95\"/>");
            var info = new PlatformParatextInfo(_root);
            var folder = info.ResolvedAppDataFolder;
            File.WriteAllText(Path.Combine(folder, "RegistrationInfo.xml"), "<reg own=\"true\"/>");
            File.WriteAllText(Path.Combine(folder, "autoReplace.txt"), "own list");

            info.RequestReseedFromParatext9();
            // ParatextData rewrites internet settings whenever they are saved.
            File.WriteAllText(Path.Combine(folder, "InternetSettings.xml"), "<net own=\"true\"/>");

            var nextStartup = new PlatformParatextInfo(_root);
            _ = nextStartup.ResolvedAppDataFolder;

            Assert.That(
                File.ReadAllText(Path.Combine(folder, "RegistrationInfo.xml")),
                Is.EqualTo("<reg from=\"95\"/>")
            );
            Assert.That(
                File.ReadAllText(Path.Combine(folder, "InternetSettings.xml")),
                Is.EqualTo("<net from=\"Paratext95\"/>")
            );
            Assert.That(
                File.ReadAllText(Path.Combine(folder, "autoReplace.txt")),
                Is.EqualTo("own list")
            );
            Assert.That(nextStartup.IsRegistrationCopiedFromParatext9, Is.True);

            // Honored once: a registration entered afterwards survives later startups.
            File.WriteAllText(Path.Combine(folder, "RegistrationInfo.xml"), "<reg own=\"again\"/>");
            _ = new PlatformParatextInfo(_root).ResolvedAppDataFolder;
            Assert.That(
                File.ReadAllText(Path.Combine(folder, "RegistrationInfo.xml")),
                Is.EqualTo("<reg own=\"again\"/>")
            );
        }

        [Test]
        public void DoesNotReseed_WhenTheRequestWasCancelled()
        {
            MakeParatextFolder("Paratext95", "<reg from=\"95\"/>");
            var info = new PlatformParatextInfo(_root);
            var folder = info.ResolvedAppDataFolder;
            File.WriteAllText(Path.Combine(folder, "RegistrationInfo.xml"), "<reg own=\"true\"/>");

            info.RequestReseedFromParatext9();
            info.CancelReseedFromParatext9();
            _ = new PlatformParatextInfo(_root).ResolvedAppDataFolder;

            Assert.That(
                File.ReadAllText(Path.Combine(folder, "RegistrationInfo.xml")),
                Is.EqualTo("<reg own=\"true\"/>")
            );
        }

        [Test]
        public void DoesNotClaimARegistrationEnteredInPlatformBibleWasCopied()
        {
            MakeParatextFolder("Paratext95", "<reg from=\"95\"/>");
            MakeParatextFolder("Paratext100", "<reg own=\"true\"/>");

            Assert.That(
                new PlatformParatextInfo(_root).IsRegistrationCopiedFromParatext9,
                Is.False
            );
        }

        [Test]
        public void CreatesAnEmptyFolder_WhenThereIsNoParatext9Registration()
        {
            Directory.CreateDirectory(Path.Combine(_root, "Paratext95"));

            var folder = new PlatformParatextInfo(_root).ResolvedAppDataFolder;

            Assert.That(Directory.Exists(folder), Is.True);
            Assert.That(Directory.EnumerateFiles(folder), Is.Empty);
        }

        // ----- ReadParatext9InternetUse -----

        /// <summary>A Paratext app-data folder holding only an InternetSettings.xml.</summary>
        private string MakeFolderWithInternetSettings(string name, string permittedInternetUse)
        {
            var folder = Path.Combine(_root, name);
            Directory.CreateDirectory(folder);
            File.WriteAllText(
                Path.Combine(folder, "InternetSettings.xml"),
                "<?xml version=\"1.0\" encoding=\"utf-8\"?><InternetSettingsMemento>"
                    + $"<PermittedInternetUse>{permittedInternetUse}</PermittedInternetUse>"
                    + "</InternetSettingsMemento>"
            );
            return folder;
        }

        // A Paratext 9 user who never registered still has an internet setting, so no
        // registration is needed, unlike seeding.
        [Test]
        public void ReadParatext9InternetUse_ReadsTheNewestParatext8Or9Folder()
        {
            MakeFolderWithInternetSettings("Paratext84", "Enabled");
            MakeFolderWithInternetSettings("Paratext95", "VpnRequired");
            MakeFolderWithInternetSettings("Paratext100", "Disabled");

            var result = new PlatformParatextInfo(_root).ReadParatext9InternetUse();

            Assert.That(result, Is.EqualTo(InternetUse.VpnRequired));
        }

        [Test]
        public void ReadParatext9InternetUse_SkipsAParatext9FolderWithoutInternetSettings()
        {
            MakeFolderWithInternetSettings("Paratext94", "ProxyOnly");
            Directory.CreateDirectory(Path.Combine(_root, "Paratext96"));

            var result = new PlatformParatextInfo(_root).ReadParatext9InternetUse();

            Assert.That(result, Is.EqualTo(InternetUse.ProxyOnly));
        }

        // Platform.Bible's own copy is not Paratext 9's setting: startup migrates it, and a new
        // user's copy holds ParatextData's default.
        [Test]
        public void ReadParatext9InternetUse_NoParatext9_ReturnsNull()
        {
            MakeFolderWithInternetSettings("Paratext100", "Disabled");

            Assert.That(new PlatformParatextInfo(_root).ReadParatext9InternetUse(), Is.Null);
        }

        [Test]
        public void ReadParatext9InternetUse_NoLocalAppDataRoot_ReturnsNull()
        {
            var missingRoot = Path.Combine(_root, "missing");

            Assert.That(new PlatformParatextInfo(missingRoot).ReadParatext9InternetUse(), Is.Null);
        }

        [Test]
        public void ReadParatext9InternetUse_UnreadableValue_ReturnsNull()
        {
            MakeFolderWithInternetSettings("Paratext95", "Sometimes");

            Assert.That(new PlatformParatextInfo(_root).ReadParatext9InternetUse(), Is.Null);
        }

        [Test]
        public void ReadParatext9InternetUse_LeavesBothFoldersAlone()
        {
            var paratext9 = MakeFolderWithInternetSettings("Paratext95", "Disabled");
            var before = HashFolder(paratext9);

            new PlatformParatextInfo(_root).ReadParatext9InternetUse();

            Assert.That(HashFolder(paratext9), Is.EqualTo(before));
            // Reading Paratext 9's setting must not seed Platform.Bible's folder as a side effect.
            Assert.That(Directory.Exists(Path.Combine(_root, "Paratext100")), Is.False);
        }

        [Test]
        public void NeverChangesTheParatext9Folder()
        {
            var paratext9 = MakeParatextFolder("Paratext95", "<reg from=\"95\"/>");
            var before = HashFolder(paratext9);

            var folder = new PlatformParatextInfo(_root).ResolvedAppDataFolder;
            File.WriteAllText(
                Path.Combine(folder, "RegistrationInfo.xml"),
                "<reg changed=\"true\"/>"
            );

            Assert.That(HashFolder(paratext9), Is.EqualTo(before));
        }
    }
}
