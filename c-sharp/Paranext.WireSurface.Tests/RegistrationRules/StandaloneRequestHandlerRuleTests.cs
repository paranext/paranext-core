using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using NUnit.Framework;
using Paranext.WireSurface.RegistrationRules;
using Paranext.WireSurface.Tests.Fixtures;

namespace Paranext.WireSurface.Tests.RegistrationRules;

public class StandaloneRequestHandlerRuleTests
{
    private static readonly StandaloneRequestHandlerRule Rule = new();

    private static List<ScanEntry> Scan(CSharpCompilation compilation, SyntaxTree tree) =>
        Rule.Scan(tree, compilation.GetSemanticModel(tree), RuleContextFactory.Create(compilation))
            .ToList();

    private static List<ScanEntry> ScanFixtureTree(string source)
    {
        var compilation = FixtureCompilation.Create(source);
        return Scan(compilation, compilation.SyntaxTrees.Last());
    }

    private static StaticRegistration Static(
        string name,
        bool documented = false,
        bool docsStaticallyResolved = true,
        bool experimental = false
    ) =>
        new(
            RegistrationCategory.StandaloneMethod,
            name,
            "c-sharp/Fixtures/Fixture1.cs",
            RegisteredVia.PapiClientRegisterRequestHandlerAsync,
            documented,
            docsStaticallyResolved,
            experimental
        );

    [Test]
    public void ProgramLevelLiteral()
    {
        var entries = ScanFixtureTree(
            """
            using System;
            using Paranext.DataProvider;

            internal static class FixtureProgramLevel
            {
                public static void Register(PapiClient papi, Delegate handler) =>
                    papi.RegisterRequestHandlerAsync("command:test.addOne", handler);
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(new[] { new ScanEntry.Static(Static("command:test.addOne")) })
        );
    }

    [Test]
    public void ServiceWithSharedConstantsClass()
    {
        var entries = ScanFixtureTree(
            """
            using System;
            using Paranext.DataProvider;

            internal static class FixtureCommandNames
            {
                public const string AddOne = "command:test.addOne";
            }

            internal sealed class FixtureService(PapiClient papi)
            {
                public void Register(Delegate handler) =>
                    papi.RegisterRequestHandlerAsync(FixtureCommandNames.AddOne, handler);
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(new[] { new ScanEntry.Static(Static("command:test.addOne")) })
        );
    }

    [Test]
    public void NamedDocumentationArgument()
    {
        var entries = ScanFixtureTree(
            """
            using System;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureNamedDocs(PapiClient papi)
            {
                public void Register(Delegate handler) =>
                    papi.RegisterRequestHandlerAsync(
                        "command:test.namedDocs",
                        handler,
                        documentation: ExperimentalMethodDocumentation.Marker()
                    );
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
                            "command:test.namedDocs",
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
    public void NetworkObjectFanOutExcluded()
    {
        var compilation = FixtureCompilation.Create();
        var stubTree = compilation.SyntaxTrees.First();

        var entries = Scan(compilation, stubTree);

        Assert.That(entries, Is.Empty);
    }

    [Test]
    public void SubclassHelperNotExcluded()
    {
        var entries = ScanFixtureTree(
            """
            using System;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;

            internal sealed class FixtureSubclassHelper : NetworkObject
            {
                public FixtureSubclassHelper(PapiClient papiClient) : base(papiClient) { }

                public void RegisterExtra(Delegate handler) =>
                    PapiClient.RegisterRequestHandlerAsync("command:test.extra", handler);
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(new[] { new ScanEntry.Static(Static("command:test.extra")) })
        );
    }

    [Test]
    public void ComputedNameIsDynamic()
    {
        var entries = ScanFixtureTree(
            """
            using System;
            using Paranext.DataProvider;

            internal sealed class FixtureComputedName(PapiClient papi)
            {
                public void Register(string key, Delegate handler) =>
                    papi.RegisterRequestHandlerAsync(GetValidatorKey(key), handler);

                private static string GetValidatorKey(string key) => $"command:validator.{key}";
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
                            RegistrationCategory.StandaloneMethod,
                            "c-sharp/Fixtures/Fixture1.cs",
                            RegisteredVia.PapiClientRegisterRequestHandlerAsync,
                            "GetValidatorKey(key)"
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void NotifierCtorParameterPropagates()
    {
        var entries = ScanFixtureTree(
            """
            using System;
            using System.Threading.Tasks;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureNotifier(
                PapiClient papiClient,
                string commandName,
                OpenRpcSingleMethodDocumentation documentation
            )
            {
                public Task RegisterAsync(Delegate handler) =>
                    papiClient.RegisterRequestHandlerAsync(commandName, handler, null, documentation);
            }

            internal static class FixtureNotifierSites
            {
                public static void RegisterBoth(PapiClient papiClient, Delegate handler)
                {
                    _ = new FixtureNotifier(
                        papiClient,
                        "command:notifier.a",
                        ExperimentalMethodDocumentation.Marker()
                    );
                    _ = new FixtureNotifier(
                        papiClient,
                        "command:notifier.b",
                        ExperimentalMethodDocumentation.Marker()
                    );
                }
            }
            """
        );

        // The notifier's own `documentation` parameter is referenced from a non-constructor method,
        // same as `commandName` — but DocumentationResolver does not propagate through parameters
        // (design §6 only follows fields/properties/locals), so both entries are unresolved rather
        // than experimental, even though every instantiation site passes a constant marker.
        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "command:notifier.a",
                            documented: true,
                            docsStaticallyResolved: false,
                            experimental: false
                        )
                    ),
                    new ScanEntry.Static(
                        Static(
                            "command:notifier.b",
                            documented: true,
                            docsStaticallyResolved: false,
                            experimental: false
                        )
                    ),
                }
            )
        );
    }
}
