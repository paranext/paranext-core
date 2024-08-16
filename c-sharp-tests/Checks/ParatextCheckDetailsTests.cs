using Paranext.DataProvider.Checks;
using Paranext.DataProvider.JsonUtils;
using Paratext.Data.Checking;

namespace TestParanextDataProvider.Checks;

public class ParatextCheckDetailsTests
{
    [Test]
    public void Serialization_Json_MatchesExpectations()
    {
        var checkDetails = new ParatextCheckDetails(CheckType.Capitalization);
        checkDetails.EnabledProjectIds.Add("testProjectId");
        Assert.That(
            checkDetails.SerializeToJson(),
            Is.EqualTo(
                """{"checkName":"Capitalization","checkDescription":"Capitalization","checkId":"Capitalization","enabledProjectIds":["testProjectId"]}"""
            )
        );
    }
}
