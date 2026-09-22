using System.Text.RegularExpressions;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using NUnit.Framework;
using Paranext.WireSurface.Tests.Fixtures;

namespace Paranext.WireSurface.Tests;

public class FrameworkSymbolsTests
{
    [Test]
    public void ResolvesEverySymbolFromStubs()
    {
        var compilation = FixtureCompilation.Create();

        var symbols = FrameworkSymbols.Resolve(compilation);

        Assert.That(symbols.NetworkObject.Name, Is.EqualTo("NetworkObject"));
        Assert.That(symbols.DataProvider.Name, Is.EqualTo("DataProvider"));
        Assert.That(
            symbols.ProjectDataProviderFactory.Name,
            Is.EqualTo("ProjectDataProviderFactory")
        );
        Assert.That(symbols.PapiClient.Name, Is.EqualTo("PapiClient"));
        Assert.That(
            symbols.ExperimentalMethodDocumentation.Name,
            Is.EqualTo("ExperimentalMethodDocumentation")
        );
        Assert.That(
            symbols.NetworkObjectDocumentation.Name,
            Is.EqualTo("NetworkObjectDocumentation")
        );
        Assert.That(
            symbols.OpenRpcSingleMethodDocumentation.Name,
            Is.EqualTo("OpenRpcSingleMethodDocumentation")
        );
        Assert.That(
            symbols.OpenRpcMethodDocumentation.Name,
            Is.EqualTo("OpenRpcMethodDocumentation")
        );
        Assert.That(
            symbols.OpenRpcSingleNotificationDocumentation.Name,
            Is.EqualTo("OpenRpcSingleNotificationDocumentation")
        );
        Assert.That(
            symbols.OpenRpcNotificationDocumentation.Name,
            Is.EqualTo("OpenRpcNotificationDocumentation")
        );

        Assert.That(
            symbols.RegisterNetworkObjectAsync.Name,
            Is.EqualTo("RegisterNetworkObjectAsync")
        );
        Assert.That(
            symbols.GetNetworkObjectDocumentation.Name,
            Is.EqualTo("GetNetworkObjectDocumentation")
        );
        Assert.That(
            symbols.RegisterRequestHandlerAsync.Name,
            Is.EqualTo("RegisterRequestHandlerAsync")
        );

        Assert.That(symbols.SendRequestAsyncOverloads, Has.Count.EqualTo(2));
        Assert.That(
            symbols.SendRequestAsyncOverloads.Select(m => m.Name),
            Is.All.EqualTo("SendRequestAsync")
        );

        Assert.That(
            symbols.AlwaysExperimentalHelpers.Select(m => m.Name),
            Is.EqualTo(new[] { "Create", "Marker", "ExistenceMarker" })
        );

        Assert.That(symbols.ExperimentalProperties, Has.Length.EqualTo(3));
        Assert.That(
            symbols.ExperimentalProperties.Select(p => p.Name),
            Is.All.EqualTo("Experimental")
        );

        Assert.That(symbols.DerivesFrom(symbols.DataProvider, symbols.NetworkObject), Is.True);
        Assert.That(
            symbols.DerivesFrom(symbols.ProjectDataProviderFactory, symbols.NetworkObject),
            Is.True
        );
        Assert.That(symbols.DerivesFrom(symbols.NetworkObject, symbols.DataProvider), Is.False);
    }

    [Test]
    public void ThrowsNamingTheMissingType()
    {
        var brokenSource = Regex.Replace(
            FrameworkStubs.Source,
            @"\bNetworkObjectDocumentation\b",
            "RenamedNetworkObjectDocumentation"
        );
        var tree = CSharpSyntaxTree.ParseText(brokenSource, path: "c-sharp/Framework/Stubs.cs");
        var compilation = CSharpCompilation.Create(
            "BrokenFixture",
            [tree],
            Basic.Reference.Assemblies.Net80.References.All,
            new CSharpCompilationOptions(
                OutputKind.DynamicallyLinkedLibrary,
                nullableContextOptions: NullableContextOptions.Enable
            )
        );
        var compileErrors = compilation
            .GetDiagnostics()
            .Where(d => d.Severity == DiagnosticSeverity.Error)
            .ToList();
        Assert.That(compileErrors, Is.Empty, "the renamed fixture must still compile");

        var exception = Assert.Throws<InvalidOperationException>(
            () => FrameworkSymbols.Resolve(compilation)
        );

        Assert.That(
            exception.Message,
            Does.Contain(
                "Paranext.DataProvider.NetworkObjects.Documentation.NetworkObjectDocumentation"
            )
        );
    }
}
