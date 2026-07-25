using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using Paratext.Data;

namespace TestParanextDataProvider.ParatextUtils
{
    /// <summary>
    /// Pins the private <c>ScrTextCollection.UpdateJoinedTexts</c> member that
    /// <c>PlatformScrTextCollection</c> invokes via reflection after a deferred initial project
    /// refresh (the base refresh only builds joined HEB/GRK texts on an initial load, which a
    /// pre-scan targeted project add defeats by making the index non-empty). If a ParatextData
    /// upgrade renames or removes the member, this test fails loudly instead of the joined texts
    /// silently going missing at runtime.
    /// </summary>
    [ExcludeFromCodeCoverage]
    [TestFixture]
    public class PlatformScrTextCollectionUpdateJoinedTextsPinTests
    {
        [Test]
        public void UpdateJoinedTexts_PrivateParameterlessInstanceMethod_ExistsOnScrTextCollection()
        {
            MethodInfo? updateJoinedTexts = typeof(ScrTextCollection).GetMethod(
                "UpdateJoinedTexts",
                BindingFlags.Instance | BindingFlags.NonPublic
            );

            Assert.That(
                updateJoinedTexts,
                Is.Not.Null,
                "ScrTextCollection.UpdateJoinedTexts was not found on the referenced ParatextData "
                    + "assembly. PlatformScrTextCollection.RefreshScrTextsInternal invokes it via "
                    + "reflection; update that call to match the new ParatextData shape."
            );
            Assert.That(updateJoinedTexts!.GetParameters(), Is.Empty);
        }
    }
}
