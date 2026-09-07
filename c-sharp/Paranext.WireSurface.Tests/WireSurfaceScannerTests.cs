using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using NUnit.Framework;
using Paranext.WireSurface.Tests.Fixtures;

namespace Paranext.WireSurface.Tests;

public class WireSurfaceScannerTests
{
    private const string StubPath = "c-sharp/Framework/Stubs.cs";
    private const string Fixture1Path = "c-sharp/Fixtures/Fixture1.cs";

    [Test]
    public void EndToEndFixtureProducesAllFiveCategories()
    {
        var compilation = FixtureCompilation.Create(
            """
            using System;
            using System.Threading.Tasks;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureNetworkObject : NetworkObject
            {
                public FixtureNetworkObject(PapiClient papiClient) : base(papiClient) { }

                public Task RegisterAsync() =>
                    RegisterNetworkObjectAsync(
                        "fixture.end-to-end.network-object",
                        [],
                        new NetworkObjectCreatedDetails()
                    );
            }

            internal sealed class FixtureDataProvider(PapiClient papiClient)
                : DataProvider("fixture.end-to-end.data-provider", papiClient)
            {
                protected override NetworkObjectDocumentation? GetNetworkObjectDocumentation() =>
                    new() { Experimental = true };
            }

            internal static class FixtureStandaloneHandler
            {
                public static void Register(PapiClient papi, Delegate handler) =>
                    papi.RegisterRequestHandlerAsync("command:fixture.end-to-end.standalone", handler);
            }

            internal sealed class FixtureNetworkEvent(PapiClient papiClient)
            {
                public Task RegisterAsync() =>
                    papiClient.SendRequestAsync<bool>(
                        "network:registerEvent",
                        ["fixture.end-to-end.network-event", new OpenRpcSingleNotificationDocumentation()]
                    );
            }
            """
        );
        var tracked = new HashSet<string>(StringComparer.Ordinal) { StubPath, Fixture1Path };

        var report = WireSurfaceScanner.Scan(compilation, tracked, repoRoot: "");

        Assert.That(report.CompiledButUntracked, Is.Empty);
        Assert.That(report.TrackedButNotCompiled, Is.Empty);
        Assert.That(
            ScanResultSerializer.Serialize(report.Result),
            Is.EqualTo(
                "{\"registrations\":["
                    + "{\"category\":\"dataProvider\",\"name\":\"FixtureDataProvider\",\"file\":\"c-sharp/Fixtures/Fixture1.cs\","
                    + "\"registeredVia\":\"DataProvider.GetNetworkObjectDocumentation override\",\"documented\":true,"
                    + "\"docsStaticallyResolved\":true,\"experimental\":true,\"language\":\"csharp\"},"
                    + "{\"category\":\"dataProvider\",\"name\":\"fixture.end-to-end.data-provider\",\"file\":\"c-sharp/Fixtures/Fixture1.cs\","
                    + "\"registeredVia\":\"DataProvider(name, papiClient) constructor\",\"documented\":false,"
                    + "\"docsStaticallyResolved\":true,\"experimental\":false,\"language\":\"csharp\"},"
                    + "{\"category\":\"networkEvent\",\"name\":\"fixture.end-to-end.network-event\",\"file\":\"c-sharp/Fixtures/Fixture1.cs\","
                    + "\"registeredVia\":\"PapiClient.SendRequestAsync(\\u0022network:registerEvent\\u0022)\",\"documented\":true,"
                    + "\"docsStaticallyResolved\":true,\"experimental\":false,\"language\":\"csharp\"},"
                    + "{\"category\":\"networkObject\",\"name\":\"fixture.end-to-end.network-object\",\"file\":\"c-sharp/Fixtures/Fixture1.cs\","
                    + "\"registeredVia\":\"NetworkObject.RegisterNetworkObjectAsync\",\"documented\":false,"
                    + "\"docsStaticallyResolved\":true,\"experimental\":false,\"language\":\"csharp\"},"
                    + "{\"category\":\"standaloneMethod\",\"name\":\"command:fixture.end-to-end.standalone\",\"file\":\"c-sharp/Fixtures/Fixture1.cs\","
                    + "\"registeredVia\":\"PapiClient.RegisterRequestHandlerAsync\",\"documented\":false,"
                    + "\"docsStaticallyResolved\":true,\"experimental\":false,\"language\":\"csharp\"}"
                    + "],\"dynamicRegistrations\":["
                    + "{\"category\":\"dataProvider\",\"file\":\"c-sharp/Framework/Stubs.cs\","
                    + "\"registeredVia\":\"DataProvider.RegisterDataProviderAsync\",\"expression\":\"DataProviderName\","
                    + "\"language\":\"csharp\"},"
                    + "{\"category\":\"pdpFactory\",\"file\":\"c-sharp/Framework/Stubs.cs\","
                    + "\"registeredVia\":\"ProjectDataProviderFactory.InitializeAsync\",\"expression\":\"$\\u0022platform.{_pdpfName}-pdpf\\u0022\","
                    + "\"language\":\"csharp\"}"
                    + "]}"
            )
        );
    }

    [Test]
    public void UntrackedTreeIsSkippedAndReported()
    {
        var compilation = FixtureCompilation.Create(
            """
            using System;
            using Paranext.DataProvider;

            internal static class FixtureUntrackedHandler
            {
                public static void Register(PapiClient papi, Delegate handler) =>
                    papi.RegisterRequestHandlerAsync("command:fixture.untracked", handler);
            }
            """
        );
        var tracked = new HashSet<string>(StringComparer.Ordinal);

        var report = WireSurfaceScanner.Scan(compilation, tracked, repoRoot: "");

        // Nothing is scanned even though the fixture's handler would otherwise be recognised —
        // proving the tree was genuinely skipped, not merely uninteresting.
        Assert.That(report.Result.Registrations, Is.Empty);
        Assert.That(report.Result.DynamicRegistrations, Is.Empty);
        Assert.That(report.CompiledButUntracked, Is.EqualTo(new[] { Fixture1Path, StubPath }));
        Assert.That(report.TrackedButNotCompiled, Is.Empty);
    }

    [Test]
    public void TrackedPathMissingFromCompilationIsReported()
    {
        var compilation = FixtureCompilation.Create(
            """
            namespace Fixture;

            internal static class FixtureUnrelated
            {
                public static void DoNothing() { }
            }
            """
        );
        var tracked = new HashSet<string>(StringComparer.Ordinal)
        {
            Fixture1Path,
            "c-sharp/Fixtures/Missing.cs",
        };

        var report = WireSurfaceScanner.Scan(compilation, tracked, repoRoot: "");

        Assert.That(
            report.TrackedButNotCompiled,
            Is.EqualTo(new[] { "c-sharp/Fixtures/Missing.cs" })
        );
        Assert.That(report.CompiledButUntracked, Is.EqualTo(new[] { StubPath }));
        Assert.That(report.Result.Registrations, Is.Empty);
        Assert.That(report.Result.DynamicRegistrations, Is.Empty);
    }

    [Test]
    public void WindowsSeparatorsNormalised()
    {
        var relative = RepoPaths.Relative(@"C:\r", @"C:\r\c-sharp\A.cs");

        Assert.That(relative, Is.EqualTo("c-sharp/A.cs"));
    }

    [Test]
    public void ScanIsDeterministicAcrossTreeOrder()
    {
        var stubTree = CSharpSyntaxTree.ParseText(FrameworkStubs.Source, path: StubPath);
        var fixtureTree = CSharpSyntaxTree.ParseText(
            """
            using System;
            using Paranext.DataProvider;

            internal static class FixtureDeterminism
            {
                public static void Register(PapiClient papi, Delegate handler) =>
                    papi.RegisterRequestHandlerAsync("command:fixture.determinism", handler);
            }
            """,
            path: Fixture1Path
        );
        var tracked = new HashSet<string>(StringComparer.Ordinal) { StubPath, Fixture1Path };

        CSharpCompilation Compile(params SyntaxTree[] trees) =>
            CSharpCompilation.Create(
                "Fixture",
                trees,
                Basic.Reference.Assemblies.Net80.References.All,
                new CSharpCompilationOptions(
                    OutputKind.DynamicallyLinkedLibrary,
                    nullableContextOptions: NullableContextOptions.Enable
                )
            );

        var forward = WireSurfaceScanner.Scan(
            Compile(stubTree, fixtureTree),
            tracked,
            repoRoot: ""
        );
        var reversed = WireSurfaceScanner.Scan(
            Compile(fixtureTree, stubTree),
            tracked,
            repoRoot: ""
        );

        Assert.That(
            ScanResultSerializer.Serialize(reversed.Result),
            Is.EqualTo(ScanResultSerializer.Serialize(forward.Result))
        );
    }
}
