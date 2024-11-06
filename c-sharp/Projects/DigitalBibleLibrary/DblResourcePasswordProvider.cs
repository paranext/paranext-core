using Paratext.Data.ProjectFileAccess;

namespace Paranext.DataProvider.Projects.DigitalBibleLibrary;

internal class DblResourcePasswordProvider : IZippedResourcePasswordProvider
{
    public string GetPassword()
    {
        /*
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        WARNING: DO NOT set the real password here in this repo, even in a PR. That should only be
        done in the Paratext 10 Studio repository. Leave this password as-is for all PRs in the
        Platform.Bible repository.
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        */

        return "This is not the real password, so resources cannot be opened with it.";
    }
}
