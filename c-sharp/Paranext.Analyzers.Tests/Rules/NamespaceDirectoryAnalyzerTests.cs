using Microsoft.CodeAnalysis.CSharp.Testing;
using Microsoft.CodeAnalysis.Text;
using Paranext.Analyzers.Rules;

namespace Paranext.Analyzers.Tests.Rules;

using Verifier = CSharpAnalyzerVerifier<NamespaceDirectoryAnalyzer, DefaultVerifier>;

[TestFixture]
public class NamespaceDirectoryAnalyzerTests
{
    private static async Task VerifyWithPathAsync(
        string source,
        string filePath,
        params DiagnosticResult[] expected
    )
    {
        var test = new CSharpAnalyzerTest<NamespaceDirectoryAnalyzer, DefaultVerifier>();
        test.TestState.Sources.Add((filePath, SourceText.From(source)));
        test.ExpectedDiagnostics.AddRange(expected);
        await test.RunAsync();
    }

    // --- Valid cases ---

    [Test]
    public async Task RootFile_CorrectNamespace_NoDiagnostic()
    {
        const string source = """
            namespace Paranext.DataProvider;

            class Foo { }
            """;

        await VerifyWithPathAsync(source, "/repo/c-sharp/Foo.cs");
    }

    [Test]
    public async Task Subdirectory_CorrectNamespace_NoDiagnostic()
    {
        const string source = """
            namespace Paranext.DataProvider.Services;

            class MyService { }
            """;

        await VerifyWithPathAsync(source, "/repo/c-sharp/Services/MyService.cs");
    }

    [Test]
    public async Task NestedSubdirectory_CorrectNamespace_NoDiagnostic()
    {
        const string source = """
            namespace Paranext.DataProvider.Projects.SubDir;

            class Deep { }
            """;

        await VerifyWithPathAsync(source, "/repo/c-sharp/Projects/SubDir/Deep.cs");
    }

    [Test]
    public async Task AnalyzerProject_Skipped_NoDiagnostic()
    {
        const string source = """
            namespace Paranext.Analyzers.Rules;

            class MyAnalyzer { }
            """;

        await VerifyWithPathAsync(source, "/repo/c-sharp/Paranext.Analyzers/Rules/MyAnalyzer.cs");
    }

    [Test]
    public async Task ObjDirectory_Skipped_NoDiagnostic()
    {
        const string source = """
            namespace Whatever;

            class Generated { }
            """;

        await VerifyWithPathAsync(source, "/repo/c-sharp/obj/Generated.cs");
    }

    [Test]
    public async Task BinDirectory_Skipped_NoDiagnostic()
    {
        const string source = """
            namespace Whatever;

            class Generated { }
            """;

        await VerifyWithPathAsync(source, "/repo/c-sharp/bin/Generated.cs");
    }

    [Test]
    public async Task NestedObjDirectory_Skipped_NoDiagnostic()
    {
        const string source = """
            namespace Whatever;

            class Generated { }
            """;

        await VerifyWithPathAsync(source, "/repo/c-sharp/obj/Debug/net8.0/Generated.cs");
    }

    [Test]
    public async Task BlockStyleNamespace_CorrectNamespace_NoDiagnostic()
    {
        const string source = """
            namespace Paranext.DataProvider.Services
            {
                class MyService { }
            }
            """;

        await VerifyWithPathAsync(source, "/repo/c-sharp/Services/MyService.cs");
    }

    [Test]
    public async Task WindowsBackslashPath_CorrectNamespace_NoDiagnostic()
    {
        const string source = """
            namespace Paranext.DataProvider.Services;

            class MyService { }
            """;

        await VerifyWithPathAsync(source, "C:\\Users\\dev\\repo\\c-sharp\\Services\\MyService.cs");
    }

    // --- Violations ---

    [Test]
    public async Task WrongNamespace_Diagnostic()
    {
        const string source = """
            namespace {|#0:Paranext.DataProvider.Wrong|};

            class MyService { }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.NamespaceMatchesDirectory)
            .WithLocation(0)
            .WithArguments("Paranext.DataProvider.Wrong", "Paranext.DataProvider.Services");

        await VerifyWithPathAsync(source, "/repo/c-sharp/Services/MyService.cs", expected);
    }

    [Test]
    public async Task RootFileClaimmingSubdirectory_Diagnostic()
    {
        const string source = """
            namespace {|#0:Paranext.DataProvider.Services|};

            class Foo { }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.NamespaceMatchesDirectory)
            .WithLocation(0)
            .WithArguments("Paranext.DataProvider.Services", "Paranext.DataProvider");

        await VerifyWithPathAsync(source, "/repo/c-sharp/Foo.cs", expected);
    }

    [Test]
    public async Task DirectoryNamedSomeObj_NotSkipped_Diagnostic()
    {
        // Only exact "obj" is skipped, not directories containing "obj" in their name
        const string source = """
            namespace {|#0:Paranext.DataProvider.Wrong|};

            class Foo { }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.NamespaceMatchesDirectory)
            .WithLocation(0)
            .WithArguments("Paranext.DataProvider.Wrong", "Paranext.DataProvider.SomeObj");

        await VerifyWithPathAsync(source, "/repo/c-sharp/SomeObj/Foo.cs", expected);
    }
}
