using Microsoft.CodeAnalysis.CSharp.Testing;
using Paranext.Analyzers.Rules;

namespace Paranext.Analyzers.Tests.Rules;

using Verifier = CSharpAnalyzerVerifier<BanTraceAnalyzer, DefaultVerifier>;

[TestFixture]
public class BanTraceAnalyzerTests
{
    [Test]
    public async Task ConsoleWriteLine_NoDiagnostic()
    {
        const string source = """
            using System;

            class Program
            {
                void M() { Console.WriteLine("hello"); }
            }
            """;

        await Verifier.VerifyAnalyzerAsync(source);
    }

    [Test]
    public async Task TraceWriteLine_Diagnostic()
    {
        const string source = """
            using System.Diagnostics;

            class Program
            {
                void M() { {|#0:Trace.WriteLine("bad")|}; }
            }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.BanTrace)
            .WithLocation(0)
            .WithArguments("WriteLine");

        await Verifier.VerifyAnalyzerAsync(source, expected);
    }

    [Test]
    public async Task DebugWriteLine_Diagnostic()
    {
        const string source = """
            using System.Diagnostics;

            class Program
            {
                void M() { {|#0:Debug.WriteLine("bad")|}; }
            }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.BanTrace)
            .WithLocation(0)
            .WithArguments("WriteLine");

        await Verifier.VerifyAnalyzerAsync(source, expected);
    }

    [Test]
    public async Task DebugAssert_Diagnostic()
    {
        const string source = """
            using System.Diagnostics;

            class Program
            {
                void M() { {|#0:Debug.Assert(true)|}; }
            }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.BanTrace)
            .WithLocation(0)
            .WithArguments("Assert");

        await Verifier.VerifyAnalyzerAsync(source, expected);
    }

    [Test]
    public async Task TraceListeners_PropertyAccess_Diagnostic()
    {
        const string source = """
            using System.Diagnostics;

            class Program
            {
                void M() { var x = {|#0:Trace.Listeners|}; }
            }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.BanTrace)
            .WithLocation(0)
            .WithArguments("Listeners");

        await Verifier.VerifyAnalyzerAsync(source, expected);
    }

    [Test]
    public async Task InvocationDoesNotDoubleReport()
    {
        // A method call like Trace.WriteLine should produce exactly one diagnostic
        // (from the invocation handler), not two (invocation + member access).
        const string source = """
            using System.Diagnostics;

            class Program
            {
                void M() { {|#0:Trace.WriteLine("x")|}; }
            }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.BanTrace)
            .WithLocation(0)
            .WithArguments("WriteLine");

        await Verifier.VerifyAnalyzerAsync(source, expected);
    }

    [Test]
    public async Task CustomTraceClass_NoDiagnostic()
    {
        const string source = """
            namespace MyApp
            {
                class Trace
                {
                    public static void WriteLine(string s) { }
                }

                class Program
                {
                    void M() { Trace.WriteLine("ok"); }
                }
            }
            """;

        await Verifier.VerifyAnalyzerAsync(source);
    }

    [Test]
    public async Task MultipleTraceCalls_MultipleDiagnostics()
    {
        const string source = """
            using System.Diagnostics;

            class Program
            {
                void M()
                {
                    {|#0:Trace.WriteLine("a")|};
                    {|#1:Debug.WriteLine("b")|};
                }
            }
            """;

        var expected = new[]
        {
            Verifier.Diagnostic(DiagnosticIds.BanTrace).WithLocation(0).WithArguments("WriteLine"),
            Verifier.Diagnostic(DiagnosticIds.BanTrace).WithLocation(1).WithArguments("WriteLine"),
        };

        await Verifier.VerifyAnalyzerAsync(source, expected);
    }
}
