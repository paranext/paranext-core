using Paranext.DataProvider.Checks;
using Paranext.DataProvider.JsonUtils;
using Paratext.Data.Checking;

namespace TestParanextDataProvider.Checks;

public class CheckRunnerCheckDetailsTests
{
    [Test]
    public void Serialization_Json_MatchesExpectations()
    {
        var checkDetails = new CheckRunnerCheckDetails(CheckType.Capitalization);
        Assert.That(
            checkDetails.SerializeToJson(),
            Is.EqualTo(
                """{"checkName":"Capitalization","checkDescription":"Capitalization","checkId":"Capitalization"}"""
            )
        );
    }
}
