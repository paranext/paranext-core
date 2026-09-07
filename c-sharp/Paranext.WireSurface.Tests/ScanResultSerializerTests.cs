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

    [Test]
    public void SortsStaticRegistrationsByCategoryBeforeName()
    {
        StaticRegistration Reg(string category, string name) =>
            new(
                category,
                name,
                "c-sharp/Foo.cs",
                "NetworkObject.RegisterNetworkObjectAsync",
                false,
                true,
                false
            );

        // "networkEvent" < "networkObject" ordinally, so a "networkEvent" entry named "z" must still
        // sort before a "networkObject" entry named "a" — category is the primary key, not name.
        var sorted = WireSurfaceScanResult.Sorted(
            [Reg("networkObject", "a"), Reg("networkEvent", "z")],
            []
        );

        Assert.That(
            sorted.Registrations.Select(r => (r.Category, r.Name)),
            Is.EqualTo(new[] { ("networkEvent", "z"), ("networkObject", "a") })
        );
    }

    [Test]
    public void SortsStaticRegistrationsByFileWhenCategoryAndNameMatch()
    {
        StaticRegistration Reg(string file) =>
            new(
                "networkObject",
                "sameName",
                file,
                "NetworkObject.RegisterNetworkObjectAsync",
                false,
                true,
                false
            );

        var sorted = WireSurfaceScanResult.Sorted([Reg("c-sharp/Z.cs"), Reg("c-sharp/A.cs")], []);

        Assert.That(
            sorted.Registrations.Select(r => r.File),
            Is.EqualTo(new[] { "c-sharp/A.cs", "c-sharp/Z.cs" })
        );
    }

    [Test]
    public void SortsDynamicRegistrationsByCategoryThenFileThenExpression()
    {
        DynamicRegistration Dyn(string category, string file, string expression) =>
            new(category, file, "PapiClient.RegisterRequestHandlerAsync", expression);

        var sorted = WireSurfaceScanResult.Sorted(
            [],
            [
                Dyn("standaloneMethod", "c-sharp/B.cs", "z"),
                Dyn("networkEvent", "c-sharp/B.cs", "a"),
                Dyn("networkEvent", "c-sharp/A.cs", "b"),
                Dyn("networkEvent", "c-sharp/A.cs", "a"),
            ]
        );

        Assert.That(
            sorted.DynamicRegistrations.Select(r => (r.Category, r.File, r.Expression)),
            Is.EqualTo(
                new[]
                {
                    ("networkEvent", "c-sharp/A.cs", "a"),
                    ("networkEvent", "c-sharp/A.cs", "b"),
                    ("networkEvent", "c-sharp/B.cs", "a"),
                    ("standaloneMethod", "c-sharp/B.cs", "z"),
                }
            )
        );
    }
}
