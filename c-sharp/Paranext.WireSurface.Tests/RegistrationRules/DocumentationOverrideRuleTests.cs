using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using NUnit.Framework;
using Paranext.WireSurface.RegistrationRules;
using Paranext.WireSurface.Tests.Fixtures;

namespace Paranext.WireSurface.Tests.RegistrationRules;

public class DocumentationOverrideRuleTests
{
    private static readonly DocumentationOverrideRule Rule = new();

    private static List<ScanEntry> ScanFixtureTree(string source)
    {
        var compilation = FixtureCompilation.Create(source);
        var tree = compilation.SyntaxTrees.Last();
        return Rule.Scan(
                tree,
                compilation.GetSemanticModel(tree),
                RuleContextFactory.Create(compilation)
            )
            .ToList();
    }

    private static StaticRegistration Static(
        string name,
        bool documented,
        bool docsStaticallyResolved,
        bool experimental
    ) =>
        new(
            RegistrationCategory.DataProvider,
            name,
            "c-sharp/Fixtures/Fixture1.cs",
            RegisteredVia.DataProviderGetNetworkObjectDocumentationOverride,
            documented,
            docsStaticallyResolved,
            experimental
        );

    [Test]
    public void OverrideAttributedToDeclaringClassWhenSecondInFile()
    {
        var entries = ScanFixtureTree(
            """
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureHelperFirst
            {
                public void DoNothing() { }
            }

            internal sealed class FixtureProviderSecond(PapiClient papiClient)
                : DataProvider("fixture.provider-second", papiClient)
            {
                protected override NetworkObjectDocumentation? GetNetworkObjectDocumentation() => null;
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "FixtureProviderSecond",
                            documented: false,
                            docsStaticallyResolved: true,
                            experimental: false
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void AllHelperMethodsIsExperimental()
    {
        var entries = ScanFixtureTree(
            """
            using System.Collections.Generic;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureAllHelperMethods(PapiClient papiClient)
                : DataProvider("fixture.all-helper-methods", papiClient)
            {
                protected override NetworkObjectDocumentation? GetNetworkObjectDocumentation() =>
                    new()
                    {
                        Methods = new Dictionary<string, OpenRpcSingleMethodDocumentation>
                        {
                            ["get"] = ExperimentalMethodDocumentation.Marker(),
                        },
                    };
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "FixtureAllHelperMethods",
                            documented: true,
                            docsStaticallyResolved: true,
                            experimental: true
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void ObjectLevelExperimental()
    {
        var entries = ScanFixtureTree(
            """
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureObjectLevel(PapiClient papiClient)
                : DataProvider("fixture.object-level", papiClient)
            {
                protected override NetworkObjectDocumentation? GetNetworkObjectDocumentation() =>
                    new() { Experimental = true };
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "FixtureObjectLevel",
                            documented: true,
                            docsStaticallyResolved: true,
                            experimental: true
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void MixedMethodsNotExperimental()
    {
        var entries = ScanFixtureTree(
            """
            using System.Collections.Generic;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureMixedMethods(PapiClient papiClient)
                : DataProvider("fixture.mixed-methods", papiClient)
            {
                protected override NetworkObjectDocumentation? GetNetworkObjectDocumentation() =>
                    new()
                    {
                        Methods = new Dictionary<string, OpenRpcSingleMethodDocumentation>
                        {
                            ["get"] = ExperimentalMethodDocumentation.Marker(),
                            ["set"] = new OpenRpcSingleMethodDocumentation
                            {
                                Method = new() { Experimental = false },
                            },
                        },
                    };
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "FixtureMixedMethods",
                            documented: true,
                            docsStaticallyResolved: true,
                            experimental: false
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void ReturnViaLocalResolved()
    {
        var entries = ScanFixtureTree(
            """
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureReturnViaLocal(PapiClient papiClient)
                : DataProvider("fixture.return-via-local", papiClient)
            {
                protected override NetworkObjectDocumentation? GetNetworkObjectDocumentation()
                {
                    var docs = new NetworkObjectDocumentation { Experimental = true };
                    return docs;
                }
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "FixtureReturnViaLocal",
                            documented: true,
                            docsStaticallyResolved: true,
                            experimental: true
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void ReturnViaMethodCallUnresolved()
    {
        var entries = ScanFixtureTree(
            """
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureReturnViaMethodCall(PapiClient papiClient)
                : DataProvider("fixture.return-via-method-call", papiClient)
            {
                private static NetworkObjectDocumentation? BuildDocs() => new() { Experimental = true };

                protected override NetworkObjectDocumentation? GetNetworkObjectDocumentation() =>
                    BuildDocs();
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "FixtureReturnViaMethodCall",
                            documented: true,
                            docsStaticallyResolved: false,
                            experimental: false
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void MultipleReturnsIsUnresolved()
    {
        var entries = ScanFixtureTree(
            """
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureMultipleReturns(PapiClient papiClient)
                : DataProvider("fixture.multiple-returns", papiClient)
            {
                protected override NetworkObjectDocumentation? GetNetworkObjectDocumentation()
                {
                    if (papiClient is null)
                        return null;
                    return new NetworkObjectDocumentation { Experimental = true };
                }
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "FixtureMultipleReturns",
                            documented: true,
                            docsStaticallyResolved: false,
                            experimental: false
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void ReturnWithNestedLocalFunctionReturnStillSingleReturn()
    {
        var entries = ScanFixtureTree(
            """
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureNestedLocalFunctionReturn(PapiClient papiClient)
                : DataProvider("fixture.nested-local-function-return", papiClient)
            {
                protected override NetworkObjectDocumentation? GetNetworkObjectDocumentation()
                {
                    int Double(int x)
                    {
                        return x * 2;
                    }

                    Double(1);
                    return new NetworkObjectDocumentation { Experimental = true };
                }
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "FixtureNestedLocalFunctionReturn",
                            documented: true,
                            docsStaticallyResolved: true,
                            experimental: true
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void TwoOverridesInOneFileBothReported()
    {
        var entries = ScanFixtureTree(
            """
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureFirstOverride(PapiClient papiClient)
                : DataProvider("fixture.first-override", papiClient)
            {
                protected override NetworkObjectDocumentation? GetNetworkObjectDocumentation() => null;
            }

            internal sealed class FixtureSecondOverride(PapiClient papiClient)
                : DataProvider("fixture.second-override", papiClient)
            {
                protected override NetworkObjectDocumentation? GetNetworkObjectDocumentation() => null;
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "FixtureFirstOverride",
                            documented: false,
                            docsStaticallyResolved: true,
                            experimental: false
                        )
                    ),
                    new ScanEntry.Static(
                        Static(
                            "FixtureSecondOverride",
                            documented: false,
                            docsStaticallyResolved: true,
                            experimental: false
                        )
                    ),
                }
            )
        );
    }
}
