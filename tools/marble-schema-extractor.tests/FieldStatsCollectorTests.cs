namespace MarbleSchemaExtractor.Tests;

[TestFixture]
public class FieldStatsCollectorTests
{
    [Test]
    public void Observe_TracksPresenceCount()
    {
        var sut = new FieldStatsCollector();
        sut.Observe("foo.bar", value: "hello");
        sut.Observe("foo.bar", value: null);
        sut.Observe("foo.bar", value: "");

        var stats = sut.ToJson();
        Assert.That(stats, Does.Contain("\"foo.bar\""));
        Assert.That(stats, Does.Contain("\"present\": 3"));
        Assert.That(stats, Does.Contain("\"nonEmpty\": 1"));
    }

    [Test]
    public void ObserveArray_TracksLengths()
    {
        var sut = new FieldStatsCollector();
        sut.ObserveArray("foo.list", lengths: 3);
        sut.ObserveArray("foo.list", lengths: 5);
        sut.ObserveArray("foo.list", lengths: 0);

        var stats = sut.ToJson();
        Assert.That(stats, Does.Contain("\"foo.list\""));
        Assert.That(stats, Does.Contain("\"present\": 3"));
        Assert.That(stats, Does.Contain("\"nonEmptyCount\": 2"));
        Assert.That(stats, Does.Contain("\"avgArrayLen\": 2.6")); // (3+5+0)/3 ≈ 2.67, rounded
        Assert.That(stats, Does.Contain("\"minLen\": 0"));
        Assert.That(stats, Does.Contain("\"maxLen\": 5"));
    }
}
