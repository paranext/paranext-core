using NUnit.Framework;

namespace Paranext.WireSurface.Tests.Fixtures;

public class FixtureCompilationTests
{
    [Test]
    public void StubsCompileAndExposeFrameworkTypes()
    {
        var compilation = FixtureCompilation.Create();

        var dataProvider = compilation.GetTypeByMetadataName(
            "Paranext.DataProvider.NetworkObjects.DataProvider"
        );
        var networkObject = compilation.GetTypeByMetadataName(
            "Paranext.DataProvider.NetworkObjects.NetworkObject"
        );

        Assert.That(dataProvider, Is.Not.Null);
        Assert.That(networkObject, Is.Not.Null);
        Assert.That(dataProvider!.BaseType, Is.EqualTo(networkObject));
    }
}
