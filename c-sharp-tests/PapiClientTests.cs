using System.Reflection;
using Paranext.DataProvider;

namespace TestParanextDataProvider;

/// <summary>
/// Pins that the real <see cref="PapiClient"/> serves JSON-RPC through <see cref="PapiJsonRpc"/>,
/// the subclass that puts a thrown platform error code on the wire. <c>PapiJsonRpcTests</c> builds
/// the subclass directly, so only this test notices <see cref="PapiClient"/> using a plain
/// <c>JsonRpc</c> instead.
/// </summary>
[TestFixture]
internal class PapiClientTests
{
    [Test]
    public void Constructor_UsesPapiJsonRpc()
    {
        using var client = new PapiClient();

        var field = typeof(PapiClient).GetField(
            "_jsonRpc",
            BindingFlags.Instance | BindingFlags.NonPublic
        );

        Assert.That(field, Is.Not.Null, "PapiClient no longer has a _jsonRpc field to inspect");
        Assert.That(field!.GetValue(client), Is.TypeOf<PapiJsonRpc>());
    }
}
