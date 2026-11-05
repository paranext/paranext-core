using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Text.Json;
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

    [Test]
    public async Task Set_AfterTypeScriptReleasedTheKey_PublishesTheValue()
    {
        const string key = "contextKeys.a.b";
        await _client.RegisterRequestHandlerAsync(
            "shared-store:get",
            () => JsonDocument.Parse("{}").RootElement
        );
        await _store.InitializeAsync();

        // A released tombstone from TypeScript carries no value, so its JSON element has no kind.
        DeliverRemoteChange(key, default, counter: 5, processId: "ts-process");

        _store.Set(key, true);

        Assert.That(_client.SentEventCount, Is.EqualTo(1));
        Assert.That(_store.TryGetValue<bool>(key, out var value), Is.True);
        Assert.That(value, Is.True);
    }

    private void DeliverRemoteChange(string key, JsonElement value, int counter, string processId)
    {
        const BindingFlags flags =
            BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic;
        var storeType = typeof(SharedStore);
        var clockType = storeType.GetNestedType("LamportClock", BindingFlags.NonPublic)!;
        var eventType = storeType.GetNestedType("StoreChangeEvent", BindingFlags.NonPublic)!;
        var clock = Activator.CreateInstance(clockType, flags, null, [counter, processId], null);
        var changeEvent = Activator.CreateInstance(
            eventType,
            flags,
            null,
            [key, value, clock],
            null
        );
        _client.InvokeEventHandler("shared-store:change", changeEvent);
    }
}
