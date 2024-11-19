using Paranext.DataProvider.Checks;
using SIL.Scripture;

namespace TestParanextDataProvider.Checks;

public class CheckRunResultTests
{
    [TestCase("checkId", "resType", "projectId", "msg", false, "GEN 1:1", 1, "GEN 1:2", 5, true)]
    [TestCase("ABC", "resType", "projectId", "msg", false, "GEN 1:1", 1, "GEN 1:2", 5, false)]
    [TestCase("checkId", "ABC", "projectId", "msg", false, "GEN 1:1", 1, "GEN 1:2", 5, false)]
    [TestCase("checkId", "resType", "ABC", "msg", false, "GEN 1:1", 1, "GEN 1:2", 5, false)]
    [TestCase("checkId", "resType", "projectId", "ABC", false, "GEN 1:1", 1, "GEN 1:2", 5, false)]
    [TestCase("checkId", "resType", "projectId", "msg", true, "GEN 1:1", 1, "GEN 1:2", 5, false)]
    [TestCase("checkId", "resType", "projectId", "msg", false, "GEN 1:2", 1, "GEN 1:2", 5, false)]
    [TestCase("checkId", "resType", "projectId", "msg", false, "GEN 1:1", 2, "GEN 1:2", 5, false)]
    [TestCase("checkId", "resType", "projectId", "msg", false, "GEN 1:1", 1, "GEN 1:3", 5, false)]
    [TestCase("checkId", "resType", "projectId", "msg", false, "GEN 1:1", 1, "GEN 1:2", 7, false)]
    public void Equality_Objects_ComparedByValue(
        string checkId2,
        string checkResultType2,
        string projectId2,
        string message2,
        bool isDenied2,
        string verseRefStart2,
        int offsetStart2,
        string verseRefEnd2,
        int offsetEnd2,
        bool expectedResult
    )
    {
        VerseRef vrefStart1 = new("GEN 1:1");
        CheckLocation start1 = new(vrefStart1, 1);
        VerseRef vrefEnd1 = new("GEN 1:2");
        CheckLocation end1 = new(vrefEnd1, 5);
        CheckRunResult checkRunResult1 =
            new("checkId", "resType", "projectId", "msg", "", false, vrefStart1, start1, end1);

        VerseRef vrefStart2 = new(verseRefStart2);
        CheckLocation start2 = new(vrefStart2, offsetStart2);
        VerseRef vrefEnd2 = new(verseRefEnd2);
        CheckLocation end2 = new(vrefEnd2, offsetEnd2);
        CheckRunResult checkRunResult2 =
            new(
                checkId2,
                checkResultType2,
                projectId2,
                message2,
                "",
                isDenied2,
                vrefStart2,
                start2,
                end2
            );

        Assert.That(checkRunResult1 == checkRunResult2, Is.EqualTo(expectedResult));
        Assert.That(checkRunResult1.Equals(checkRunResult2), Is.EqualTo(expectedResult));
        Assert.That(
            checkRunResult1.GetHashCode() == checkRunResult2.GetHashCode(),
            Is.EqualTo(expectedResult)
        );
    }
}
