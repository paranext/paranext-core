using System.ComponentModel;
using System.Configuration;
using System.IO;
using System.Reflection;
using Paranext.DataProvider;
using Paratext.Data;
using PtxUtils;

namespace TestParanextDataProvider
{
    internal class ParatextDataConnectionTests
    {
        // Work around a known issue where NUnit doesn't pick up config files
        // https://github.com/nunit/nunit3-vs-adapter/issues/356
        private void EnsureIcuConfigFileIsInPlace()
        {
            string appConfigFile = ConfigurationManager
                .OpenExeConfiguration(ConfigurationUserLevel.None)
                .FilePath;
            string? appConfigDirectory = Path.GetDirectoryName(appConfigFile);
            string icuConfigFile = Path.Join(appConfigDirectory, "icu.net.dll.config");
            if (!File.Exists(icuConfigFile))
            {
                // It's a bit hacky to hard code the config file here, but there isn't a great
                // source that we can reliably get to from within a test.
                File.WriteAllText(
                    icuConfigFile,
                    @"<?xml version=""1.0"" encoding=""utf-8"" ?>
<configuration>
  <dllmap os=""!windows,osx"" dll=""libdl.so"" target=""libdl.so.2"" />
  <dllmap os=""osx"" dll=""libdl.so"" target=""libdl.dylib""/>
</configuration>"
                );
            }
        }

        /// <summary>
        /// This test is to try figure out if ParatextData will work on Linux and Mac.
        /// It may be removed in the future for a more useful test.
        /// </summary>
        [Test]
        public void LoadPackagedWEB_LoadsProject()
        {
            Alert.Implementation = new DummyAlert();
            EnsureIcuConfigFileIsInPlace();

            Console.WriteLine(Assembly.GetExecutingAssembly().Location);
            Program.InitializeParatextData("../../../../assets");

            ScrText scrText = ScrTextCollection.Find("WEB");
            Assert.That(scrText, Is.Not.Null);
            Assert.That(scrText.Name, Is.EqualTo("WEB"));
            Assert.That(scrText.Settings.BooksPresentSet.Count, Is.EqualTo(83));
        }

        #region DummyAlert class
        private sealed class DummyAlert : Alert
        {
            protected override AlertResult ShowInternal(
                IComponent? owner,
                string text,
                string caption,
                AlertButtons alertButtons,
                AlertLevel alertLevel,
                AlertDefaultButton defaultButton,
                bool showInTaskbar
            )
            {
                if (text.Contains("unable to find a language definition file for English"))
                    return AlertResult.Positive;

                Assert.Fail("Unexpected dialog box:\n" + text);
                return AlertResult.Negative;
            }

            protected override void ShowLaterInternal(
                string text,
                string caption,
                AlertLevel alertLevel
            )
            {
                ShowInternal(
                    null,
                    text,
                    caption,
                    AlertButtons.Ok,
                    alertLevel,
                    AlertDefaultButton.Button1,
                    false
                );
            }
        }
        #endregion
    }
}
