using Paratext.Data;
using Paratext.Data.Archiving;
using Paratext.Data.Languages;

namespace Paranext.DataProvider.Projects.DigitalBibleLibrary;

public class DblMigrationOperations : IMigrationOperations
{
    /// <summary>
    /// See `Paratext.Migration.PTMigration.Migrate` for steps involved in migrating data
    /// </summary>
    public UnsupportedReason MigrateProjectIfNeeded(ScrText scrText)
    {
        return scrText.NeedsMigration
            ? UnsupportedReason.CannotUpgrade
            : UnsupportedReason.Supported;
    }

    /// <summary>
    /// Adapted from `Paratext.Migration.MigrateLanguage`
    /// </summary>
    public LanguageId DetermineBestLangIdToUseForResource(
        string ldmlLanguageId,
        string dblLanguageId
    )
    {
        LanguageId ethnologueDblLanguageId = LanguageId.FromEthnologueCode(dblLanguageId);
        if (string.IsNullOrEmpty(ldmlLanguageId))
            return ethnologueDblLanguageId;

        LanguageId ethnologueLdmlLanguageId = LanguageId.FromEthnologueCode(ldmlLanguageId);
        if (ethnologueLdmlLanguageId.Code == ethnologueDblLanguageId.Code)
            return ethnologueLdmlLanguageId;
        return ethnologueDblLanguageId;
    }
}
