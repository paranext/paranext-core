namespace Paranext.DataProvider.Projects.DigitalBibleLibrary;

/// <summary>
/// The texts licensing terms prohibit using as a model or base for a new translation, for pickers
/// to disable: traditionally licensed Biblica texts (see <see cref="BiblicaLicensing"/>).
/// </summary>
/// <param name="DblIds">
/// DBL ids, lower case, of Biblica's list. Covers catalog rows whether or not they are installed.
/// </param>
/// <param name="ProjectIds">
/// Project ids, upper case, of installed resources that are restricted, including any the list
/// does not name yet
/// </param>
public record ModelTextRestrictions(IReadOnlyList<string> DblIds, IReadOnlyList<string> ProjectIds);
