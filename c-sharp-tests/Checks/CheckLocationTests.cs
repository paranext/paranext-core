using Paranext.DataProvider.Checks;
using SIL.Scripture;

namespace TestParanextDataProvider.Checks;

public class CheckLocationTests
{
    [TestCase("GEN 1:1", 2, "GEN 1:1", 2, true)]
    [TestCase("GEN 1:1", 2, "NUM 1:1", 2, false)]
    [TestCase("GEN 1:1", 1, "GEN 1:1", 2, false)]
    public void Equality_Objects_ComparedByValue(
        string verseRef1,
        int offset1,
        string verseRef2,
        int offset2,
        bool expectedResult
    )
    {
        VerseRef vref1 = new(verseRef1);
        CheckLocation item1 = new(vref1, offset1);
        VerseRef vref2 = new(verseRef2);
        CheckLocation item2 = new(vref2, offset2);
        Assert.That(item1 == item2, Is.EqualTo(expectedResult));
        Assert.That(item1.Equals(item2), Is.EqualTo(expectedResult));
        Assert.That(item1.GetHashCode() == item2.GetHashCode(), Is.EqualTo(expectedResult));
    }
}
