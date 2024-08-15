using Paratext.Data.Checking;
using PtxUtils;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Represents metadata about an individual check. This class must serialize/deserialize to the
/// CheckRunnerCheckDetails type defined in TypeScript.
/// </summary>
public sealed class ParatextCheckDetails(Enum<CheckType> checkType)
{
    public string CheckName { get; } = checkType.ToString();
    public string CheckDescription { get; } = checkType.ToLocalizedString();
    public string CheckId { get; } = checkType.InternalValue;
    public List<string> EnabledProjectIds { get; } = [];
}
