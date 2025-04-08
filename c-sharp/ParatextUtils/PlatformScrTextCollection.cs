using Paranext.DataProvider.Projects.DigitalBibleLibrary;
using Paratext.Data;
using Paratext.Data.Users;
using SIL.WritingSystems;

namespace Paranext.DataProvider.ParatextUtils;

/// <summary>
/// Adapted from ParatextScrTextCollection
/// </summary>
public class PlatformScrTextCollection : ScrTextCollection
{
    // keep track of languages that weren't found in SLDR so we don't call over and over for the same bad code
    private static readonly HashSet<string> s_sldrLookupFailed = [];

    protected override ScrText CreateResourceProject(ProjectName name)
    {
        return new ResourceScrText(
            name,
            RegistrationInfo.DefaultUser,
            new DblResourcePasswordProvider()
        );
    }

    protected override ScrText CreateXmlResourceProject(ProjectName name)
    {
        return new XmlResourceScrText(
            name,
            RegistrationInfo.DefaultUser,
            new DblResourcePasswordProvider()
        );
    }

    protected override UnsupportedReason MigrateProjectIfNeeded(ScrText scrText)
    {
        return scrText.NeedsMigration
            ? UnsupportedReason.CannotUpgrade
            : UnsupportedReason.Supported;
    }

    protected override WritingSystemDefinition CreateWsDef(string languageId, bool allowSldr)
    {
        // only check SLDR if allowed for this call and all internet access is enabled - SLDR isn't set up to use proxy
        WritingSystemDefinition? wsDef = null;
        if (
            allowSldr
            && InternetAccess.Status == InternetUse.Enabled
            && !s_sldrLookupFailed.Contains(languageId)
        )
        {
            try
            {
                var sldrFactory = new SldrWritingSystemFactory();
                sldrFactory.Create(languageId, out wsDef);
            }
            catch (Exception e)
            {
                // ignore any SLDR errors - there have been problems with entries on the server failing to parse.
                // also the id being provided may not be valid
                Console.WriteLine("Getting {0} from SLDR failed: {1}", languageId, e);
                s_sldrLookupFailed.Add(languageId);
            }
        }
        return wsDef!;
    }
}
