using System.Diagnostics.CodeAnalysis;
using NUnit.Framework;
using Paranext.DataProvider.EnhancedResources;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class MarbleBookTokenProviderTests
{
    private const string MinimalUsxBook = @"<?xml version=""1.0""?><usx_book code=""GEN""/>";

    [Test]
    public void GetTokens_UnknownResource_ReturnsEmpty()
    {
        var source = new FakeMarbleBookXmlSource();
        var provider = new MarbleBookTokenProvider(source);

        var tokens = provider.GetTokens("UNKNOWN", 1);

        Assert.That(tokens, Is.Empty);
    }

    [Test]
    public void GetTokens_FreshKey_ParsesXml()
    {
        var source = new FakeMarbleBookXmlSource().With("TECLOT", 1, MinimalUsxBook);
        var provider = new MarbleBookTokenProvider(source);

        var tokens = provider.GetTokens("TECLOT", 1);

        Assert.That(tokens, Has.Count.GreaterThan(0));
        Assert.That(tokens[0].Type, Is.EqualTo(MarbleTokenType.Book));
    }

    [Test]
    public void GetTokens_RepeatedCallSameKey_ReturnsSameInstance()
    {
        var source = new FakeMarbleBookXmlSource().With("TECLOT", 1, MinimalUsxBook);
        var provider = new MarbleBookTokenProvider(source);

        var first = provider.GetTokens("TECLOT", 1);
        var second = provider.GetTokens("TECLOT", 1);

        Assert.That(second, Is.SameAs(first), "Cache must return the same instance");
    }

    [Test]
    public void GetTokens_LruCapacityExceeded_OldestEvicted()
    {
        var source = new FakeMarbleBookXmlSource()
            .With("R1", 1, MinimalUsxBook)
            .With("R1", 2, MinimalUsxBook)
            .With("R1", 3, MinimalUsxBook);
        var provider = new MarbleBookTokenProvider(source, capacity: 2);

        var first1 = provider.GetTokens("R1", 1);
        provider.GetTokens("R1", 2);
        provider.GetTokens("R1", 3); // Should evict (R1, 1)
        var first1Again = provider.GetTokens("R1", 1);

        Assert.That(
            first1Again,
            Is.Not.SameAs(first1),
            "Evicted entry must be re-parsed (new instance)"
        );
    }

    [Test]
    public void Constructor_InvalidCapacity_Throws()
    {
        var source = new FakeMarbleBookXmlSource();
        Assert.Throws<ArgumentOutOfRangeException>(() => new MarbleBookTokenProvider(source, 0));
    }
}
