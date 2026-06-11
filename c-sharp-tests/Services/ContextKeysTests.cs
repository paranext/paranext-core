using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Services;

namespace Paranext.DataProvider.Services.Tests;

[ExcludeFromCodeCoverage]
[TestFixture]
public class ContextKeysTests
{
    private FakeSharedStore _fakeStore = new();
    private ContextKeys _contextKeys = null!;

    [SetUp]
    public void SetUp()
    {
        _fakeStore = new FakeSharedStore();
        _contextKeys = new ContextKeys(_fakeStore);
    }

    [TestCase("myExtension.someProperty", ExpectedResult = true)]
    [TestCase("platformScripture.project.abc-123.isEditable", ExpectedResult = true)]
    [TestCase("a.b", ExpectedResult = true)]
    [TestCase("singleSegment", ExpectedResult = false)]
    [TestCase("", ExpectedResult = false)]
    [TestCase("a..b", ExpectedResult = false)]
    [TestCase("a.b c.d", ExpectedResult = false)]
    [TestCase("a.{b}.c", ExpectedResult = false)]
    public bool IsValidKey_MatchesTypeScriptValidation(string key)
    {
        return ContextKeys.IsValidKey(key);
    }

    [Test]
    public void Set_StoresValueUnderContextKeysPrefix()
    {
        _contextKeys.Set("myExt.someFlag", true);
        Assert.That(_fakeStore.Values, Does.ContainKey("contextKeys.myExt.someFlag"));
        Assert.That(_fakeStore.Values["contextKeys.myExt.someFlag"], Is.True);
    }

    [Test]
    public void Set_SupportsStringNumberAndBool()
    {
        _contextKeys.Set("myExt.mode", "formatted");
        _contextKeys.Set("myExt.count", 3);
        _contextKeys.Set("myExt.ratio", 1.5);
        _contextKeys.Set("myExt.flag", false);
        Assert.That(_fakeStore.Values["contextKeys.myExt.mode"], Is.EqualTo("formatted"));
        Assert.That(_fakeStore.Values["contextKeys.myExt.count"], Is.EqualTo(3));
        Assert.That(_fakeStore.Values["contextKeys.myExt.ratio"], Is.EqualTo(1.5));
        Assert.That(_fakeStore.Values["contextKeys.myExt.flag"], Is.False);
    }

    [Test]
    public void Set_ThrowsOnInvalidKey()
    {
        Assert.Throws<ArgumentException>(() => _contextKeys.Set("singleSegment", true));
    }

    [Test]
    public void TryGetValue_RoundTripsThroughPrefix()
    {
        _contextKeys.Set("myExt.someFlag", true);
        Assert.That(_contextKeys.TryGetValue<bool>("myExt.someFlag", out var value), Is.True);
        Assert.That(value, Is.True);
        Assert.That(_contextKeys.TryGetValue<bool>("myExt.missing", out _), Is.False);
    }

    [Test]
    public void Remove_SetsUnderlyingValueToDefault()
    {
        _contextKeys.Set("myExt.someFlag", true);
        _contextKeys.Remove("myExt.someFlag");
        Assert.That(_fakeStore.Values["contextKeys.myExt.someFlag"], Is.Null);
    }
}
