using NUnit.Framework;
using Paranext.WireSurface.RegistrationRules;

namespace Paranext.WireSurface.Tests.RegistrationRules;

public class ScanEntryTests
{
    private static readonly DocumentationResolution Documentation =
        new(Documented: true, DocsStaticallyResolved: true, Experimental: true);

    [Test]
    public void ConstantProducesOneStaticEntry()
    {
        var entries = ScanEntry.FromNameResolution(
            new NameResolution.Constant("fixture.name"),
            "networkObject",
            "c-sharp/Fixtures/Fixture1.cs",
            "NetworkObject.RegisterNetworkObjectAsync",
            Documentation
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        new StaticRegistration(
                            "networkObject",
                            "fixture.name",
                            "c-sharp/Fixtures/Fixture1.cs",
                            "NetworkObject.RegisterNetworkObjectAsync",
                            Documented: true,
                            DocsStaticallyResolved: true,
                            Experimental: true
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void ConstantsProducesOneStaticEntryPerValueInGivenOrder()
    {
        var entries = ScanEntry.FromNameResolution(
            new NameResolution.Constants(["b.value", "a.value"]),
            "dataProvider",
            "c-sharp/Fixtures/Fixture1.cs",
            "DataProvider(name, papiClient) constructor",
            Documentation
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        new StaticRegistration(
                            "dataProvider",
                            "b.value",
                            "c-sharp/Fixtures/Fixture1.cs",
                            "DataProvider(name, papiClient) constructor",
                            Documented: true,
                            DocsStaticallyResolved: true,
                            Experimental: true
                        )
                    ),
                    new ScanEntry.Static(
                        new StaticRegistration(
                            "dataProvider",
                            "a.value",
                            "c-sharp/Fixtures/Fixture1.cs",
                            "DataProvider(name, papiClient) constructor",
                            Documented: true,
                            DocsStaticallyResolved: true,
                            Experimental: true
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void DynamicProducesOneDynamicEntryIgnoringDocumentation()
    {
        var entries = ScanEntry.FromNameResolution(
            new NameResolution.Dynamic("eventName"),
            "standaloneMethod",
            "c-sharp/Fixtures/Fixture1.cs",
            "PapiClient.RegisterRequestHandlerAsync",
            Documentation
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Dynamic(
                        new DynamicRegistration(
                            "standaloneMethod",
                            "c-sharp/Fixtures/Fixture1.cs",
                            "PapiClient.RegisterRequestHandlerAsync",
                            "eventName"
                        )
                    ),
                }
            )
        );
    }
}
