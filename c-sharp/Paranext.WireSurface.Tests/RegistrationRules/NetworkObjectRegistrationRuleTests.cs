using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using NUnit.Framework;
using Paranext.WireSurface.RegistrationRules;
using Paranext.WireSurface.Tests.Fixtures;

namespace Paranext.WireSurface.Tests.RegistrationRules;

public class NetworkObjectRegistrationRuleTests
{
    private static readonly NetworkObjectRegistrationRule Rule = new();

    private static List<ScanEntry> Scan(CSharpCompilation compilation, SyntaxTree tree) =>
        Rule.Scan(tree, compilation.GetSemanticModel(tree), RuleContextFactory.Create(compilation))
            .ToList();

    [Test]
    public void DirectSubclassIsNetworkObject()
    {
        var compilation = FixtureCompilation.Create(
            """
            using System.Threading.Tasks;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureDirectSubclass : NetworkObject
            {
                public FixtureDirectSubclass(PapiClient papiClient) : base(papiClient) { }

                public Task RegisterAsync() =>
                    RegisterNetworkObjectAsync(
                        "fixture.direct-subclass",
                        [],
                        new NetworkObjectCreatedDetails(),
                        new NetworkObjectDocumentation { Experimental = true }
                    );
            }
            """
        );

        var entries = Scan(compilation, compilation.SyntaxTrees.Last());

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        new StaticRegistration(
                            RegistrationCategory.NetworkObject,
                            "fixture.direct-subclass",
                            "c-sharp/Fixtures/Fixture1.cs",
                            RegisteredVia.NetworkObjectRegisterNetworkObjectAsync,
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
    public void UndocumentedCall()
    {
        var compilation = FixtureCompilation.Create(
            """
            using System.Threading.Tasks;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;

            internal class FixtureUndocumented : NetworkObject
            {
                public FixtureUndocumented(PapiClient papiClient) : base(papiClient) { }

                public Task RegisterAsync() =>
                    RegisterNetworkObjectAsync(
                        "fixture.undocumented",
                        [],
                        new NetworkObjectCreatedDetails()
                    );
            }
            """
        );

        var entries = Scan(compilation, compilation.SyntaxTrees.Last());

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        new StaticRegistration(
                            RegistrationCategory.NetworkObject,
                            "fixture.undocumented",
                            "c-sharp/Fixtures/Fixture1.cs",
                            RegisteredVia.NetworkObjectRegisterNetworkObjectAsync,
                            Documented: false,
                            DocsStaticallyResolved: true,
                            Experimental: false
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void NestedHelperMethodInSubclassStillCounts()
    {
        var compilation = FixtureCompilation.Create(
            """
            using System.Threading.Tasks;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;

            internal class FixtureNestedHelper : NetworkObject
            {
                public FixtureNestedHelper(PapiClient papiClient) : base(papiClient) { }

                public Task RegisterAsync()
                {
                    Task DoRegister() =>
                        RegisterNetworkObjectAsync(
                            "fixture.nested-helper",
                            [],
                            new NetworkObjectCreatedDetails()
                        );

                    return DoRegister();
                }
            }
            """
        );

        var entries = Scan(compilation, compilation.SyntaxTrees.Last());

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        new StaticRegistration(
                            RegistrationCategory.NetworkObject,
                            "fixture.nested-helper",
                            "c-sharp/Fixtures/Fixture1.cs",
                            RegisteredVia.NetworkObjectRegisterNetworkObjectAsync,
                            Documented: false,
                            DocsStaticallyResolved: true,
                            Experimental: false
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void DataProvidersOwnCallIsDynamicDataProvider()
    {
        var compilation = FixtureCompilation.Create();
        var stubTree = compilation.SyntaxTrees.First();

        var entries = Scan(compilation, stubTree);

        var dataProviderEntry = entries
            .OfType<ScanEntry.Dynamic>()
            .Single(e => e.Registration.Category == RegistrationCategory.DataProvider);
        Assert.That(
            dataProviderEntry.Registration,
            Is.EqualTo(
                new DynamicRegistration(
                    RegistrationCategory.DataProvider,
                    "c-sharp/Framework/Stubs.cs",
                    RegisteredVia.DataProviderRegisterDataProviderAsync,
                    "DataProviderName"
                )
            )
        );
    }

    [Test]
    public void FactoryCallIsDynamicPdpFactory()
    {
        var compilation = FixtureCompilation.Create();
        var stubTree = compilation.SyntaxTrees.First();

        var entries = Scan(compilation, stubTree);

        var pdpFactoryEntry = entries
            .OfType<ScanEntry.Dynamic>()
            .Single(e => e.Registration.Category == RegistrationCategory.PdpFactory);
        Assert.That(
            pdpFactoryEntry.Registration,
            Is.EqualTo(
                new DynamicRegistration(
                    RegistrationCategory.PdpFactory,
                    "c-sharp/Framework/Stubs.cs",
                    RegisteredVia.ProjectDataProviderFactoryInitializeAsync,
                    "$\"platform.{_pdpfName}-pdpf\""
                )
            )
        );
    }
}
