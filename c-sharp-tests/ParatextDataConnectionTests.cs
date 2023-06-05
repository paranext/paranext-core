using System.Reflection;
using Paranext.DataProvider;
using Paratext.Data;

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
            Console.WriteLine(Assembly.GetExecutingAssembly().Location);
            Program.InitializeParatextData("../../../../assets");

            ScrText scrText = ScrTextCollection.Find("WEB");
            Assert.That(scrText, Is.Not.Null);
            Assert.That(scrText.Name, Is.EqualTo("WEB"));
            Assert.That(scrText.Settings.BooksPresentSet.Count, Is.EqualTo(83));
        }
    }
}
