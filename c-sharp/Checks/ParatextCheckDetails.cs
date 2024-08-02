using Paratext.Data.Checking;
using PtxUtils;

namespace Paranext.DataProvider.Checks;

// Used for serialization/deserialization
public sealed class ParatextCheckDetails(Enum<CheckType> checkType)
{
    public string CheckName { get; } = checkType.ToString();
    public string CheckDescription { get; } = checkType.ToLocalizedString();
    public string CheckId { get; } = checkType.InternalValue;
    public List<string> EnabledProjectIds { get; } = [];
}
