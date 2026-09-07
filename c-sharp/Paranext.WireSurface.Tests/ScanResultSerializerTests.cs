using NUnit.Framework;

namespace Paranext.WireSurface.Tests;

public class ScanResultSerializerTests
{
    [Test]
    public void SerializesFieldNamesExactly()
    {
        var result = new WireSurfaceScanResult(
            [
                new StaticRegistration(
                    "networkObject",
                    "myObj",
                    "c-sharp/Foo.cs",
                    "NetworkObject.RegisterNetworkObjectAsync",
                    true,
                    true,
                    false
                ),
            ],
            [
                new DynamicRegistration(
                    "dataProvider",
                    "c-sharp/Bar.cs",
                    "DataProvider.RegisterDataProviderAsync",
                    "DataProviderName"
                ),
            ]
        );

        var json = ScanResultSerializer.Serialize(result);

        Assert.That(
            json,
            Is.EqualTo(
                "{\"registrations\":[{\"category\":\"networkObject\",\"name\":\"myObj\",\"file\":\"c-sharp/Foo.cs\","
                    + "\"registeredVia\":\"NetworkObject.RegisterNetworkObjectAsync\",\"documented\":true,"
                    + "\"docsStaticallyResolved\":true,\"experimental\":false,\"language\":\"csharp\"}],"
                    + "\"dynamicRegistrations\":[{\"category\":\"dataProvider\",\"file\":\"c-sharp/Bar.cs\","
                    + "\"registeredVia\":\"DataProvider.RegisterDataProviderAsync\",\"expression\":\"DataProviderName\","
                    + "\"language\":\"csharp\"}]}"
            )
        );
    }

    [Test]
    public void SortsByCodeUnitOrder()
    {
        StaticRegistration Reg(string name) =>
            new(
                "networkObject",
                name,
                "c-sharp/Foo.cs",
                "NetworkObject.RegisterNetworkObjectAsync",
                false,
                true,
                false
            );

        var sorted = WireSurfaceScanResult.Sorted([Reg("b"), Reg("B"), Reg("a")], []);

        Assert.That(sorted.Registrations.Select(r => r.Name), Is.EqualTo(new[] { "B", "a", "b" }));
    }
}
