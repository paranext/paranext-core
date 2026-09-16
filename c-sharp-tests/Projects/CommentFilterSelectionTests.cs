using System.Xml.Linq;
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
            Preset = "unread-and-unresolved",
            ScopeFilter = "current-verse",
        };

        // Deliberately not the default version, so a FromXml that ignored its dataVersion
        // argument and fell back to the default would be caught here.
        var restored = CommentFilterSelection.FromXml(
            CommentFilterSelection.ToXml(selection),
            "1.2.3"
        );

        Assert.That(restored.Preset, Is.EqualTo("unread-and-unresolved"));
        Assert.That(restored.ScopeFilter, Is.EqualTo("current-verse"));
        Assert.That(restored.DataVersion, Is.EqualTo("1.2.3"));
    }

    [Test]
    public void ReadsDefaultsWhenElementsAreAbsent()
    {
        // A file written by an older build, or a hand-edited one, must not throw — an absent
        // selection is simply the default view rather than a corrupt setting.
        var restored = CommentFilterSelection.FromXml(
            new XElement("Items"),
            CommentFilterSelection.CurrentDataVersion
        );

        Assert.That(restored.Preset, Is.EqualTo("all"));
        Assert.That(restored.ScopeFilter, Is.EqualTo("all-books"));
    }

    [Test]
    public void PassesThroughAPresentButBlankValueRatherThanDefaulting()
    {
        // Distinguishes "absent" from "present but blank": a hand-edited or truncated write can
        // leave an empty element. C# does not validate preset/scope values against the known sets
        // — those sets live in TypeScript — so it passes a blank value through unchanged for both
        // fields and lets the frontend resolve it, the same as it would any other value this build
        // doesn't recognize.
        var items = new XElement(
            "Items",
            new XElement("Preset", ""),
            new XElement("ScopeFilter", "")
        );

        var restored = CommentFilterSelection.FromXml(
            items,
            CommentFilterSelection.CurrentDataVersion
        );

        Assert.That(restored.Preset, Is.EqualTo(""));
        Assert.That(restored.ScopeFilter, Is.EqualTo(""));
    }
}
