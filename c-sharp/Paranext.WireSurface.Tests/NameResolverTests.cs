using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using NUnit.Framework;
using Paranext.WireSurface.Tests.Fixtures;

namespace Paranext.WireSurface.Tests;

public class NameResolverTests
{
    private const string MarkerSource = """
        internal static class Marker
        {
            public static void Use(string value) { }
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
        throw new InvalidOperationException("no Marker.Use(...) call found in fixture");
    }

    private static NameResolution Resolve(params string[] sources)
    {
        var compilation = FixtureCompilation.Create([MarkerSource, .. sources]);
        var resolver = new NameResolver(compilation);
        var (expression, model) = FindMarkedExpression(compilation);
        return resolver.Resolve(expression, model);
    }

    /// <summary>
    /// A record's compiler-generated equality compares <see cref="NameResolution.Constants.Values"/>
    /// by reference (it is an <see cref="IReadOnlyList{T}"/>, not a value type), so asserting against
    /// a freshly-constructed <see cref="NameResolution.Constants"/> would fail even for a correct
    /// result. Assert the list contents through NUnit's sequence-aware comparer instead.
    /// </summary>
    private static void AssertConstants(NameResolution resolution, params string[] expectedValues)
    {
        Assert.That(resolution, Is.InstanceOf<NameResolution.Constants>());
        Assert.That(((NameResolution.Constants)resolution).Values, Is.EqualTo(expectedValues));
    }

    [Test]
    public void LiteralIsConstant()
    {
        var resolution = Resolve(
            """
            internal class FixtureLiteral
            {
                public void Go() => Marker.Use("literal.value");
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new NameResolution.Constant("literal.value")));
    }

    [Test]
    public void InterpolatedConstIsConstant()
    {
        var resolution = Resolve(
            """
            internal class FixtureInterpolated
            {
                private const string Prefix = "x";
                public void Go() => Marker.Use($"platform.{Prefix}");
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new NameResolution.Constant("platform.x")));
    }

    [Test]
    public void ConstInAnotherClassIsConstant()
    {
        var resolution = Resolve(
            """
            internal static class Names
            {
                public const string Event = "x.y";
            }

            internal class FixtureUsesNames
            {
                public void Go() => Marker.Use(Names.Event);
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new NameResolution.Constant("x.y")));
    }

    [Test]
    public void StaticReadonlyWithConstantInitializerIsConstant()
    {
        var resolution = Resolve(
            """
            internal class FixtureStaticReadonly
            {
                private static readonly string s_name = "static.readonly.value";
                public void Go() => Marker.Use(s_name);
            }
            """
        );

        AssertConstants(resolution, "static.readonly.value");
    }

    [Test]
    public void SameNameInTwoClassesBindsToOwnDeclaration()
    {
        var compilation = FixtureCompilation.Create(
            [
                MarkerSource,
                """
                internal class FixtureFirst
                {
                    private const string Name = "first.value";
                    public void Go() => Marker.Use(Name);
                }
                """,
            ]
        );
        var second = FixtureCompilation.Create(
            [
                MarkerSource,
                """
                internal class FixtureSecond
                {
                    private const string Name = "second.value";
                    public void Go() => Marker.Use(Name);
                }
                """,
            ]
        );

        var resolverFirst = new NameResolver(compilation);
        var (firstExpression, firstModel) = FindMarkedExpression(compilation);
        var resolverSecond = new NameResolver(second);
        var (secondExpression, secondModel) = FindMarkedExpression(second);

        Assert.That(
            resolverFirst.Resolve(firstExpression, firstModel),
            Is.EqualTo(new NameResolution.Constant("first.value"))
        );
        Assert.That(
            resolverSecond.Resolve(secondExpression, secondModel),
            Is.EqualTo(new NameResolution.Constant("second.value"))
        );
    }

    [Test]
    public void CtorParameterWithTwoConstantSitesGivesConstants()
    {
        var resolution = Resolve(
            """
            internal class N(string eventName)
            {
                public void Touch() => Marker.Use(eventName);
            }

            internal class Caller
            {
                public void Go()
                {
                    _ = new N("z.y");
                    _ = new N("a.b");
                }
            }
            """
        );

        AssertConstants(resolution, "a.b", "z.y");
    }

    [Test]
    public void CtorParameterViaReadonlyFieldAssignment()
    {
        var resolution = Resolve(
            """
            internal class M
            {
                private readonly string _name;

                public M(string name)
                {
                    _name = name;
                }

                public void Touch() => Marker.Use(_name);
            }

            internal class Caller
            {
                public void Go() => new M("assigned.value");
            }
            """
        );

        AssertConstants(resolution, "assigned.value");
    }

    [Test]
    public void CtorParameterViaFieldInitializer()
    {
        // A field initializer that reads directly from a primary-constructor parameter
        // (as opposed to a constructor-body assignment) must propagate the same way.
        var resolution = Resolve(
            """
            internal class N(string eventName)
            {
                private readonly string _name = eventName;

                public void Touch() => Marker.Use(_name);
            }

            internal class Caller
            {
                public void Go()
                {
                    _ = new N("z.y");
                    _ = new N("a.b");
                }
            }
            """
        );

        AssertConstants(resolution, "a.b", "z.y");
    }

    [Test]
    public void CtorParameterSiteViaReadonlyFieldIsConstant()
    {
        // Design §5 rule 2: a propagation-site argument may itself resolve via rule 2's
        // non-propagating field case (a readonly field with a constant initializer), not only rule 1.
        var resolution = Resolve(
            """
            internal class N(string eventName)
            {
                public void Touch() => Marker.Use(eventName);
            }

            internal class Caller
            {
                private static readonly string s_name = "field.value";

                public void Go() => new N(s_name);
            }
            """
        );

        AssertConstants(resolution, "field.value");
    }

    [Test]
    public void CtorParameterWithNonConstantSiteIsDynamic()
    {
        var resolution = Resolve(
            """
            internal class N(string eventName)
            {
                public void Touch() => Marker.Use(eventName);
            }

            internal class Caller
            {
                public void Go() => new N(System.Guid.NewGuid().ToString());
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new NameResolution.Dynamic("eventName")));
    }

    [Test]
    public void CtorParameterWithNoSitesIsDynamic()
    {
        var resolution = Resolve(
            """
            internal class N(string eventName)
            {
                public void Touch() => Marker.Use(eventName);
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new NameResolution.Dynamic("eventName")));
    }

    [Test]
    public void MethodParameterPropagatesThroughStaticFactory()
    {
        var resolution = Resolve(
            """
            internal static class Factory
            {
                public static void ForEvent(string e)
                {
                    Marker.Use(e);
                }
            }

            internal class Caller
            {
                public void Go() => Factory.ForEvent("q.r");
            }
            """
        );

        AssertConstants(resolution, "q.r");
    }

    [Test]
    public void RuntimeExpressionIsDynamicWithCollapsedText()
    {
        var resolution = Resolve(
            """
            internal class FixtureRuntime
            {
                public void Go(string name) => Marker.Use(name +
                   "-pdp");
            }
            """
        );

        Assert.That(resolution, Is.EqualTo(new NameResolution.Dynamic("name + \"-pdp\"")));
    }
}
