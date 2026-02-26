using Microsoft.CodeAnalysis.CSharp.Testing;
using Paranext.Analyzers.Rules;
using Paranext.Analyzers.Tests.Helpers;

namespace Paranext.Analyzers.Tests.Rules;

using Verifier = CSharpAnalyzerVerifier<NoTupleReturnTypesAnalyzer, DefaultVerifier>;

[TestFixture]
public class NoTupleReturnTypesAnalyzerTests
{
    private static async Task VerifyWithStubsAsync(
        string source,
        params DiagnosticResult[] expected
    )
    {
        var test = new CSharpAnalyzerTest<NoTupleReturnTypesAnalyzer, DefaultVerifier>
        {
            ReferenceAssemblies = ReferenceAssemblies.Net.Net80,
        };
        test.TestState.Sources.Add(source);
        test.TestState.Sources.Add(AnalyzerTestHelper.NetworkObjectStubs);
        test.ExpectedDiagnostics.AddRange(expected);
        await test.RunAsync();
    }

    // --- Valid cases ---

    [Test]
    public async Task RegularClass_ReturningTuple_NoDiagnostic()
    {
        const string source = """
            namespace TestProject;

            class NotAProvider
            {
                public (int, string) GetPair() => (1, "x");
            }
            """;

        await VerifyWithStubsAsync(source);
    }

    [Test]
    public async Task DataProvider_StringReturn_NoDiagnostic()
    {
        const string source = """
            namespace TestProject;

            class MyProvider : DataProvider
            {
                public string GetName() => "hello";
            }
            """;

        await VerifyWithStubsAsync(source);
    }

    [Test]
    public async Task DataProvider_PrivateMethodReturningTuple_NoDiagnostic()
    {
        const string source = """
            namespace TestProject;

            class MyProvider : DataProvider
            {
                private (int, string) InternalHelper() => (1, "x");
            }
            """;

        await VerifyWithStubsAsync(source);
    }

    [Test]
    public async Task DataProvider_GetFunctions_NoDiagnostic()
    {
        const string source = """
            using System.Collections.Generic;

            namespace TestProject;

            class MyProvider : DataProvider
            {
                public (int, string) GetFunctions() => (1, "x");
            }
            """;

        await VerifyWithStubsAsync(source);
    }

    [Test]
    public async Task AbstractDataProvider_Skipped_NoDiagnostic()
    {
        const string source = """
            namespace TestProject;

            abstract class MyBase : DataProvider
            {
                public (int, string) GetPair() => (1, "x");
            }
            """;

        await VerifyWithStubsAsync(source);
    }

    [Test]
    public async Task DataProvider_TaskStringReturn_NoDiagnostic()
    {
        const string source = """
            using System.Threading.Tasks;

            namespace TestProject;

            class MyProvider : DataProvider
            {
                public Task<string> GetNameAsync() => Task.FromResult("hello");
            }
            """;

        await VerifyWithStubsAsync(source);
    }

    // --- Violations ---

    [Test]
    public async Task DataProvider_TupleReturn_Diagnostic()
    {
        const string source = """
            namespace TestProject;

            class MyProvider : DataProvider
            {
                public {|#0:(int, string)|} GetPair() => (1, "x");
            }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.NoTupleReturnTypes)
            .WithLocation(0)
            .WithArguments("GetPair");

        await VerifyWithStubsAsync(source, expected);
    }

    [Test]
    public async Task DataProvider_NamedTupleReturn_Diagnostic()
    {
        const string source = """
            namespace TestProject;

            class MyProvider : DataProvider
            {
                public {|#0:(int Id, string Name)|} GetPair() => (1, "x");
            }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.NoTupleReturnTypes)
            .WithLocation(0)
            .WithArguments("GetPair");

        await VerifyWithStubsAsync(source, expected);
    }

    [Test]
    public async Task DataProvider_TaskTupleReturn_Diagnostic()
    {
        const string source = """
            using System.Threading.Tasks;

            namespace TestProject;

            class MyProvider : DataProvider
            {
                public {|#0:Task<(int, string)>|} GetPairAsync() => Task.FromResult((1, "x"));
            }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.NoTupleReturnTypes)
            .WithLocation(0)
            .WithArguments("GetPairAsync");

        await VerifyWithStubsAsync(source, expected);
    }

    [Test]
    public async Task NetworkObject_TupleReturn_Diagnostic()
    {
        const string source = """
            namespace TestProject;

            class MyNetObj : NetworkObject
            {
                public {|#0:(int, string)|} GetPair() => (1, "x");
            }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.NoTupleReturnTypes)
            .WithLocation(0)
            .WithArguments("GetPair");

        await VerifyWithStubsAsync(source, expected);
    }

    [Test]
    public async Task ProjectDataProvider_TupleReturn_Diagnostic()
    {
        const string source = """
            namespace TestProject;

            class MyPDP : ProjectDataProvider
            {
                public {|#0:(int, string)|} GetPair() => (1, "x");
            }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.NoTupleReturnTypes)
            .WithLocation(0)
            .WithArguments("GetPair");

        await VerifyWithStubsAsync(source, expected);
    }

    [Test]
    public async Task ProtectedMethod_TupleReturn_Diagnostic()
    {
        const string source = """
            namespace TestProject;

            class MyProvider : DataProvider
            {
                protected {|#0:(int, string)|} GetPair() => (1, "x");
            }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.NoTupleReturnTypes)
            .WithLocation(0)
            .WithArguments("GetPair");

        await VerifyWithStubsAsync(source, expected);
    }

    [Test]
    public async Task InternalMethod_TupleReturn_Diagnostic()
    {
        const string source = """
            namespace TestProject;

            class MyProvider : DataProvider
            {
                internal {|#0:(int, string)|} GetPair() => (1, "x");
            }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.NoTupleReturnTypes)
            .WithLocation(0)
            .WithArguments("GetPair");

        await VerifyWithStubsAsync(source, expected);
    }

    [Test]
    public async Task DeepInheritance_TupleReturn_Diagnostic()
    {
        const string source = """
            namespace TestProject;

            class MiddleProvider : DataProvider { }
            class MyProvider : MiddleProvider
            {
                public {|#0:(int, string)|} GetPair() => (1, "x");
            }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.NoTupleReturnTypes)
            .WithLocation(0)
            .WithArguments("GetPair");

        await VerifyWithStubsAsync(source, expected);
    }
}
