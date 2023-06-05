using System.ComponentModel;
using System.Reflection;
using Paranext.DataProvider;
using Paratext.Data;
using PtxUtils;

namespace TestParanextDataProvider
{
    internal class ParatextDataConnectionTests
    {
        /// <summary>
        /// This test is to try figure out if ParatextData will work on Linux and Mac.
        /// It may be removed in the future for a more useful test.
        /// </summary>
        [Test]
        public void LoadPackagedWEB_LoadsProject()
        {
            Alert.Implementation = new DummyAlert();

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
            protected override AlertResult ShowInternal(IComponent? owner, string text, string caption, AlertButtons alertButtons,
                AlertLevel alertLevel, AlertDefaultButton defaultButton, bool showInTaskbar)
            {
                Assert.Fail("Unexpected dialog box:\n" + text);
                return AlertResult.Negative;
            }

            protected override void ShowLaterInternal(string text, string caption, AlertLevel alertLevel)
            {
                ShowInternal(null, text, caption, AlertButtons.Ok, alertLevel, AlertDefaultButton.Button1, false);
            }
        }
        #endregion
    }
}
