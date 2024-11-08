using Paratext.Data.ProjectFileAccess;

namespace Paranext.DataProvider.Projects.DigitalBibleLibrary;

internal class DblResourcePasswordProvider : IZippedResourcePasswordProvider
{
    public string GetPassword()
    {
        return "NotTheRealPassword";
    }
}
