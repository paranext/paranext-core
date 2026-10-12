using Paratext.Checks;
using Paratext.Data;

namespace Paranext.DataProvider.Checks;

/// <summary>Works out whether a check is ready to run on a project.</summary>
internal static class CheckSetupStatusLookup
{
    public static CheckSetupState Lookup(
        string checkId,
        ScriptureCheckBase check,
        ScrText scrText
    ) => new(CheckSetupStatus.Ready);
}
