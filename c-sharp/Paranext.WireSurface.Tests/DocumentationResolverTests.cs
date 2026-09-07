using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using NUnit.Framework;
using Paranext.WireSurface.Tests.Fixtures;

namespace Paranext.WireSurface.Tests;

public class DocumentationResolverTests
{
    private const string ProbeSource = """
        internal static class Probe
        {
            public static void Use(object? value) { }
        }
        """;

    private static (ExpressionSyntax expression, SemanticModel model) FindMarkedExpression(
        CSharpCompilation compilation
    )
    {
        foreach (var tree in compilation.SyntaxTrees)
        {
            var invocation = tree.GetRoot()
                .DescendantNodes()
                .OfType<InvocationExpressionSyntax>()
                .FirstOrDefault(i =>
                    i.Expression is MemberAccessExpressionSyntax { Name.Identifier.Text: "Use" }
                );
            if (invocation is not null)
                return (
                    invocation.ArgumentList.Arguments[0].Expression,
                    compilation.GetSemanticModel(tree)
                );
        }
        throw new InvalidOperationException("no Probe.Use(...) call found in fixture");
    }

    private static DocumentationResolution Resolve(params string[] sources)
    {
        var compilation = FixtureCompilation.Create([ProbeSource, .. sources]);
        var resolver = new DocumentationResolver(
            compilation,
            FrameworkSymbols.Resolve(compilation)
        );
        var (expression, model) = FindMarkedExpression(compilation);
        return resolver.Resolve(expression, model);
    }

    private static DocumentationResolution ResolveAbsentArgument()
    {
        var compilation = FixtureCompilation.Create(ProbeSource);
        var resolver = new DocumentationResolver(
            compilation,
            FrameworkSymbols.Resolve(compilation)
        );
        var model = compilation.GetSemanticModel(compilation.SyntaxTrees.First());
        return resolver.Resolve(null, model);
    }

    [Test]
    public void AbsentIsUndocumentedResolved()
    {
        var resolution = ResolveAbsentArgument();

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(false, true, false)));
    }

    [Test]
    public void NullLiteralIsUndocumentedResolved()
    {
        var resolution = Resolve(
            """
            internal class FixtureNull
            {
                public void Go() => Probe.Use(null);
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(false, true, false)));
    }

    [Test]
    public void HelperCreateIsExperimental()
    {
        var resolution = Resolve(
            """
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureHelperCreate
            {
                public void Go() => Probe.Use(ExperimentalMethodDocumentation.Create("does a thing"));
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, true, true)));
    }

    [Test]
    public void HelperMarkerIsExperimental()
    {
        var resolution = Resolve(
            """
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureHelperMarker
            {
                public void Go() => Probe.Use(ExperimentalMethodDocumentation.Marker());
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, true, true)));
    }

    [Test]
    public void HelperViaUsingStaticIsExperimental()
    {
        var resolution = Resolve(
            """
            using static Paranext.DataProvider.NetworkObjects.Documentation.ExperimentalMethodDocumentation;

            internal class FixtureHelperUsingStatic
            {
                public void Go() => Probe.Use(Marker());
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, true, true)));
    }

    [Test]
    public void ObjectInitializerTrueIsExperimental()
    {
        var resolution = Resolve(
            """
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureObjectInitializer
            {
                public void Go() =>
                    Probe.Use(new OpenRpcSingleMethodDocumentation { Method = new() { Experimental = true } });
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, true, true)));
    }

    [Test]
    public void ParenthesisedNewWithInitializer()
    {
        var resolution = Resolve(
            """
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureParenthesised
            {
                public void Go() => Probe.Use(new OpenRpcMethodDocumentation() { Experimental = true });
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, true, true)));
    }

    [Test]
    public void TrailingCommentAfterValue()
    {
        var resolution = Resolve(
            """
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureTrailingComment
            {
                public void Go() =>
                    Probe.Use(
                        new OpenRpcMethodDocumentation
                        {
                            Experimental = true, // note
                        }
                    );
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, true, true)));
    }

    [Test]
    public void CommaInsideGenericArgument()
    {
        var resolution = Resolve(
            """
            using System.Collections.Generic;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureGenericComma
            {
                public void Go() =>
                    Probe.Use(
                        new NetworkObjectDocumentation
                        {
                            Methods = new Dictionary<string, OpenRpcSingleMethodDocumentation>(),
                            Experimental = true,
                        }
                    );
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, true, true)));
    }

    [Test]
    public void ExperimentalFalseIsNotExperimental()
    {
        var resolution = Resolve(
            """
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureFalse
            {
                public void Go() => Probe.Use(new OpenRpcMethodDocumentation { Experimental = false });
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, true, false)));
    }

    [Test]
    public void ExperimentalFromNonConstantIsUnresolved()
    {
        var resolution = Resolve(
            """
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureNonConstant
            {
                public void Go(bool flag) => Probe.Use(new OpenRpcMethodDocumentation { Experimental = flag });
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, false, false)));
    }

    [Test]
    public void ViaStaticReadonlyField()
    {
        var resolution = Resolve(
            """
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureStaticField
            {
                private static readonly OpenRpcMethodDocumentation s_docs = new() { Experimental = true };

                public void Go() => Probe.Use(s_docs);
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, true, true)));
    }

    [Test]
    public void ViaLocalVariable()
    {
        var resolution = Resolve(
            """
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureLocalVariable
            {
                public void Go()
                {
                    var docs = new OpenRpcMethodDocumentation { Experimental = true };
                    Probe.Use(docs);
                }
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, true, true)));
    }

    [Test]
    public void NetworkObjectDocumentationObjectLevelTrue()
    {
        var resolution = Resolve(
            """
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureObjectLevel
            {
                public void Go() => Probe.Use(new NetworkObjectDocumentation { Experimental = true });
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, true, true)));
    }

    [Test]
    public void ExplicitNullExperimentalIsNotExperimental()
    {
        var resolution = Resolve(
            """
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureExplicitNull
            {
                public void Go() => Probe.Use(new OpenRpcMethodDocumentation { Experimental = null });
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, true, false)));
    }

    [Test]
    public void NetworkObjectDocumentationExplicitNullIgnoresMethods()
    {
        var resolution = Resolve(
            """
            using System.Collections.Generic;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureExplicitNullObjectLevel
            {
                public void Go() =>
                    Probe.Use(
                        new NetworkObjectDocumentation
                        {
                            Experimental = null,
                            Methods = new Dictionary<string, OpenRpcSingleMethodDocumentation>
                            {
                                ["exists"] = ExperimentalMethodDocumentation.Marker(),
                            },
                        }
                    );
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, true, false)));
    }

    [Test]
    public void NetworkObjectDocumentationOpaqueMethodsIsIgnored()
    {
        var resolution = Resolve(
            """
            using System.Collections.Generic;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureOpaqueMethods
            {
                private static IReadOnlyDictionary<
                    string,
                    OpenRpcSingleMethodDocumentation
                > BuildMethods() => new Dictionary<string, OpenRpcSingleMethodDocumentation>();

                public void Go() => Probe.Use(new NetworkObjectDocumentation { Methods = BuildMethods() });
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, true, false)));
    }

    [Test]
    public void NetworkObjectDocumentationAllMethodsWithoutObjectFlagIsNotExperimental()
    {
        var resolution = Resolve(
            """
            using System.Collections.Generic;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureAllMethodsHelper
            {
                public void Go() =>
                    Probe.Use(
                        new NetworkObjectDocumentation
                        {
                            Methods = new Dictionary<string, OpenRpcSingleMethodDocumentation>
                            {
                                ["exists"] = ExperimentalMethodDocumentation.Marker(),
                            },
                        }
                    );
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, true, false)));
    }

    [Test]
    public void NetworkObjectDocumentationPartialMethodsAnnotationIsNotExperimental()
    {
        // Mirrors ParatextProjectDataProvider.GetNetworkObjectDocumentation: only some of the
        // network object's methods are annotated experimental via `Methods`, and the object-level
        // `Experimental` flag is deliberately left unset so the rest of the object stays stable.
        var resolution = Resolve(
            """
            using System.Collections.Generic;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixturePartialMethodsAnnotation
            {
                public void Go() =>
                    Probe.Use(
                        new NetworkObjectDocumentation
                        {
                            Methods = new Dictionary<string, OpenRpcSingleMethodDocumentation>
                            {
                                ["getFinalVerseNumber"] = ExperimentalMethodDocumentation.Create(
                                    "Get the final verse number."
                                ),
                                ["setFinalVerseNumber"] = ExperimentalMethodDocumentation.Create(
                                    "Set the final verse number."
                                ),
                            },
                        }
                    );
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, true, false)));
    }

    [Test]
    public void NetworkObjectDocumentationOneMethodPlain()
    {
        var resolution = Resolve(
            """
            using System.Collections.Generic;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureOneMethodPlain
            {
                public void Go() =>
                    Probe.Use(
                        new NetworkObjectDocumentation
                        {
                            Methods = new Dictionary<string, OpenRpcSingleMethodDocumentation>
                            {
                                ["get"] = new OpenRpcSingleMethodDocumentation
                                {
                                    Method = new() { Experimental = false },
                                },
                            },
                        }
                    );
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, true, false)));
    }

    [Test]
    public void MethodCallReturningDocsIsUnresolved()
    {
        var resolution = Resolve(
            """
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal class FixtureMethodCall
            {
                private static OpenRpcMethodDocumentation BuildDocs() => new() { Experimental = true };

                public void Go() => Probe.Use(BuildDocs());
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new DocumentationResolution(true, false, false)));
    }
}
