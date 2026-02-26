using Microsoft.CodeAnalysis.CSharp.Testing;
using Paranext.Analyzers.Rules;

namespace Paranext.Analyzers.Tests.Rules;

using Verifier = CSharpAnalyzerVerifier<BanDynamicAnalyzer, DefaultVerifier>;

[TestFixture]
public class BanDynamicAnalyzerTests
{
    private static async Task VerifyAsync(string source, params DiagnosticResult[] expected)
    {
        var test = new CSharpAnalyzerTest<BanDynamicAnalyzer, DefaultVerifier>
        {
            ReferenceAssemblies = ReferenceAssemblies.Net.Net80,
        };
        test.TestState.Sources.Add(source);
        test.ExpectedDiagnostics.AddRange(expected);
        await test.RunAsync();
    }

    // --- Valid cases ---

    [Test]
    public async Task StringReturn_NoDiagnostic()
    {
        const string source = """
            namespace TestProject;

            class MyClass
            {
                public string GetName() => "hello";
            }
            """;

        await VerifyAsync(source);
    }

    [Test]
    public async Task ObjectReturn_NoDiagnostic()
    {
        const string source = """
            namespace TestProject;

            class MyClass
            {
                public object GetValue() => 42;
            }
            """;

        await VerifyAsync(source);
    }

    // --- Violations ---

    [Test]
    public async Task DynamicReturnType_Diagnostic()
    {
        const string source = """
            namespace TestProject;

            class MyClass
            {
                public {|#0:dynamic|} GetValue() => 42;
            }
            """;

        var expected = Verifier.Diagnostic(DiagnosticIds.BanDynamic).WithLocation(0);

        await VerifyAsync(source, expected);
    }

    [Test]
    public async Task DynamicParameter_Diagnostic()
    {
        const string source = """
            namespace TestProject;

            class MyClass
            {
                public void DoWork({|#0:dynamic|} value) { }
            }
            """;

        var expected = Verifier.Diagnostic(DiagnosticIds.BanDynamic).WithLocation(0);

        await VerifyAsync(source, expected);
    }

    [Test]
    public async Task DynamicLocalVariable_Diagnostic()
    {
        const string source = """
            namespace TestProject;

            class MyClass
            {
                public void DoWork()
                {
                    {|#0:dynamic|} x = 42;
                }
            }
            """;

        var expected = Verifier.Diagnostic(DiagnosticIds.BanDynamic).WithLocation(0);

        await VerifyAsync(source, expected);
    }

    [Test]
    public async Task DynamicField_Diagnostic()
    {
        const string source = """
            namespace TestProject;

            class MyClass
            {
                private {|#0:dynamic|} _value = 42;
            }
            """;

        var expected = Verifier.Diagnostic(DiagnosticIds.BanDynamic).WithLocation(0);

        await VerifyAsync(source, expected);
    }

    [Test]
    public async Task TaskOfDynamic_Diagnostic()
    {
        const string source = """
            using System.Threading.Tasks;

            namespace TestProject;

            class MyClass
            {
                public Task<{|#0:dynamic|}> GetValueAsync() => Task.FromResult<{|#1:dynamic|}>(42);
            }
            """;

        var expected0 = Verifier.Diagnostic(DiagnosticIds.BanDynamic).WithLocation(0);
        var expected1 = Verifier.Diagnostic(DiagnosticIds.BanDynamic).WithLocation(1);

        await VerifyAsync(source, expected0, expected1);
    }

    [Test]
    public async Task MultipleDynamicUsages_MultipleDiagnostics()
    {
        const string source = """
            namespace TestProject;

            class MyClass
            {
                private {|#0:dynamic|} _field = null;
                public {|#1:dynamic|} GetValue() => _field;
                public void SetValue({|#2:dynamic|} value) { _field = value; }
            }
            """;

        var expected0 = Verifier.Diagnostic(DiagnosticIds.BanDynamic).WithLocation(0);
        var expected1 = Verifier.Diagnostic(DiagnosticIds.BanDynamic).WithLocation(1);
        var expected2 = Verifier.Diagnostic(DiagnosticIds.BanDynamic).WithLocation(2);

        await VerifyAsync(source, expected0, expected1, expected2);
    }
}
