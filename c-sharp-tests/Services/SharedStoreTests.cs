using System.Diagnostics.CodeAnalysis;
using TestParanextDataProvider;

namespace Paranext.DataProvider.Services.Tests;

[ExcludeFromCodeCoverage]
[TestFixture]
public class SharedStoreTests
{
    private DummyPapiClient _client = null!;
    private SharedStore _store = null!;

    [SetUp]
    public void Setup()
    {
        _client = new DummyPapiClient();
        _store = new SharedStore(_client);
    }

    [TearDown]
    public void TearDown()
    {
        _client.Dispose();
    }

    [Test]
    public void Set_SameValueTwice_SendsOnce()
    {
        _store.Set("contextKeys.a.b", true);
        _store.Set("contextKeys.a.b", true);
        Assert.That(_client.SentEventCount, Is.EqualTo(1));
    }

    [Test]
    public void Set_DifferentValue_Sends()
    {
        _store.Set("contextKeys.a.b", true);
        _store.Set("contextKeys.a.b", false);
        Assert.That(_client.SentEventCount, Is.EqualTo(2));
    }

    [Test]
    public void Set_AfterRemove_Sends()
    {
        _store.Set("contextKeys.a.b", true);
        _store.Remove<bool>("contextKeys.a.b");
        _store.Set("contextKeys.a.b", true);
        Assert.That(_client.SentEventCount, Is.EqualTo(3));
    }

    [Test]
    public void Remove_Twice_SendsOnce()
    {
        _store.Set("contextKeys.a.b", true);
        _store.Remove<bool>("contextKeys.a.b");
        _store.Remove<bool>("contextKeys.a.b");
        Assert.That(_client.SentEventCount, Is.EqualTo(2));
    }
}
