using Paratext.Data.ProjectFileAccess;

namespace Paranext.DataProvider.Projects.DigitalBibleLibrary;

internal class DblResourcePasswordProvider : IZippedResourcePasswordProvider
{
    public string GetPassword()
    {
        return "This is not the real password, so resources cannot be opened with it.";
    }
}
