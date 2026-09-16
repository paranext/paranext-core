using NUnit.Framework;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

[TestFixture]
public class CommentFilterSelectionTests
{
    [Test]
    public void RoundTripsThroughXml()
    {
        var selection = new CommentFilterSelection
        {
            DataVersion = "1.0.0",
            Preset = "unread-and-unresolved",
            ScopeFilter = "current-verse",
        };

        var restored = CommentFilterSelection.FromXml(CommentFilterSelection.ToXml(selection));

        Assert.That(restored.Preset, Is.EqualTo("unread-and-unresolved"));
        Assert.That(restored.ScopeFilter, Is.EqualTo("current-verse"));
    }

    [Test]
    public void ReadsDefaultsWhenElementsAreAbsent()
    {
        // A file written by an older build, or a hand-edited one, must not throw — an absent
        // selection is simply the default view rather than a corrupt setting.
        var restored = CommentFilterSelection.FromXml(new System.Xml.Linq.XElement("Items"));

        Assert.That(restored.Preset, Is.EqualTo("all"));
        Assert.That(restored.ScopeFilter, Is.EqualTo("all-books"));
    }

    [Test]
    public void PassesThroughAPresentButBlankValueRatherThanDefaulting()
    {
        // Distinguishes "absent" from "present but blank": a hand-edited or truncated write can
        // leave an empty element. C# does not validate preset values against the known set — that
        // set lives in TypeScript — so it passes the blank value through unchanged and lets the
        // frontend resolve it, the same as it would any other value this build doesn't recognize.
        var items = new System.Xml.Linq.XElement(
            "Items",
            new System.Xml.Linq.XElement("Preset", "")
        );

        var restored = CommentFilterSelection.FromXml(items);

        Assert.That(restored.Preset, Is.EqualTo(""));
    }
}
