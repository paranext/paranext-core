using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using NUnit.Framework;
using Paranext.WireSurface.RegistrationRules;
using Paranext.WireSurface.Tests.Fixtures;

namespace Paranext.WireSurface.Tests.RegistrationRules;

public class DataProviderSubclassRuleTests
{
    private static readonly DataProviderSubclassRule Rule = new();

    private static List<ScanEntry> Scan(CSharpCompilation compilation, SyntaxTree tree) =>
        Rule.Scan(tree, compilation.GetSemanticModel(tree), RuleContextFactory.Create(compilation))
            .ToList();

    private static List<ScanEntry> ScanFixtureTree(string source)
    {
        var compilation = FixtureCompilation.Create(source);
        return Scan(compilation, compilation.SyntaxTrees.Last());
    }

    private static StaticRegistration Static(string name) =>
        new(
            RegistrationCategory.DataProvider,
            name,
            "c-sharp/Fixtures/Fixture1.cs",
            RegisteredVia.DataProviderConstructor,
            Documented: false,
            DocsStaticallyResolved: true,
            Experimental: false
        );

    [Test]
    public void PrimaryConstructorProvider()
    {
        var entries = ScanFixtureTree(
            """
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;

            internal sealed class FixturePrimaryProvider(PapiClient papiClient)
                : DataProvider("fixture.primary-provider", papiClient) { }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(new[] { new ScanEntry.Static(Static("fixture.primary-provider")) })
        );
    }

    [Test]
    public void TraditionalConstructorProvider()
    {
        var entries = ScanFixtureTree(
            """
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;

            internal sealed class FixtureTraditionalProvider : DataProvider
            {
                public FixtureTraditionalProvider(PapiClient papiClient)
                    : base("fixture.traditional-provider", papiClient) { }
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(new[] { new ScanEntry.Static(Static("fixture.traditional-provider")) })
        );
    }

    [Test]
    public void GenericProvider()
    {
        var entries = ScanFixtureTree(
            """
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;

            internal sealed class FixtureGenericProvider<T>(PapiClient papiClient)
                : DataProvider("fixture.generic-provider", papiClient) { }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(new[] { new ScanEntry.Static(Static("fixture.generic-provider")) })
        );
    }

    [Test]
    public void NestedParenthesesInParameterList()
    {
        var entries = ScanFixtureTree(
            """
            using System;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;

            internal sealed class FixtureNestedParens(Func<int, (int, int)> selector, PapiClient papiClient)
                : DataProvider("fixture.nested-parens", papiClient) { }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(new[] { new ScanEntry.Static(Static("fixture.nested-parens")) })
        );
    }

    [Test]
    public void TwoProvidersInOneFileBothReported()
    {
        var entries = ScanFixtureTree(
            """
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;

            internal sealed class FixtureFirstProvider(PapiClient papiClient)
                : DataProvider("fixture.first-provider", papiClient) { }

            internal sealed class FixtureSecondProvider(PapiClient papiClient)
                : DataProvider("fixture.second-provider", papiClient) { }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(Static("fixture.first-provider")),
                    new ScanEntry.Static(Static("fixture.second-provider")),
                }
            )
        );
    }

    [Test]
    public void TraditionalBesidePrimaryBothReported()
    {
        var entries = ScanFixtureTree(
            """
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;

            internal sealed class FixturePrimaryBeside(PapiClient papiClient)
                : DataProvider("fixture.primary-beside", papiClient) { }

            internal sealed class FixtureTraditionalBeside : DataProvider
            {
                public FixtureTraditionalBeside(PapiClient papiClient)
                    : base("fixture.traditional-beside", papiClient) { }
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(Static("fixture.primary-beside")),
                    new ScanEntry.Static(Static("fixture.traditional-beside")),
                }
            )
        );
    }

    [Test]
    public void IntermediateAbstractProviderPassesNameThrough()
    {
        var entries = ScanFixtureTree(
            """
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;

            internal abstract class FixtureIntermediateBase(string name, PapiClient papiClient)
                : DataProvider(name + "-pdp", papiClient) { }

            internal sealed class FixtureLeaf(PapiClient papiClient)
                : FixtureIntermediateBase("x", papiClient) { }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Dynamic(
                        new DynamicRegistration(
                            RegistrationCategory.DataProvider,
                            "c-sharp/Fixtures/Fixture1.cs",
                            RegisteredVia.DataProviderConstructor,
                            "name + \"-pdp\""
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void TwoHopPrimaryConstructorChainResolvesThroughBaseTypeArgument()
    {
        // FixtureMid passes its own primary-constructor parameter straight through to DataProvider;
        // that parameter's value comes from FixtureLeaf's primary-constructor base type argument list
        // (`: FixtureMid("fixture.two-hop-provider", papiClient)`), not an object-creation,
        // invocation, or `: base(...)` initializer.
        var entries = ScanFixtureTree(
            """
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;

            internal abstract class FixtureMid(string label, PapiClient papiClient)
                : DataProvider(label, papiClient) { }

            internal sealed class FixtureLeaf(PapiClient papiClient)
                : FixtureMid("fixture.two-hop-provider", papiClient) { }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(new[] { new ScanEntry.Static(Static("fixture.two-hop-provider")) })
        );
    }

    [Test]
    public void DerivedClassWithoutOwnBaseCallContributesNothing()
    {
        var entries = ScanFixtureTree(
            """
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;

            internal abstract class FixtureIntermediateTraditional : DataProvider
            {
                protected FixtureIntermediateTraditional(string name, PapiClient papiClient)
                    : base(name + "-intermediate", papiClient) { }
            }

            internal sealed class FixtureDerivedNoOwnBaseCall : FixtureIntermediateTraditional
            {
                public FixtureDerivedNoOwnBaseCall(PapiClient papiClient)
                    : base("ignored", papiClient) { }
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Dynamic(
                        new DynamicRegistration(
                            RegistrationCategory.DataProvider,
                            "c-sharp/Fixtures/Fixture1.cs",
                            RegisteredVia.DataProviderConstructor,
                            "name + \"-intermediate\""
                        )
                    ),
                }
            )
        );
    }
}
