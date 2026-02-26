using Microsoft.CodeAnalysis.CSharp.Testing;
using Paranext.Analyzers.Rules;

namespace Paranext.Analyzers.Tests.Rules;

using Verifier = CSharpAnalyzerVerifier<OneTypePerFileAnalyzer, DefaultVerifier>;

[TestFixture]
public class OneTypePerFileAnalyzerTests
{
    private static async Task VerifyNet80Async(string source, params DiagnosticResult[] expected)
    {
        var test = new CSharpAnalyzerTest<OneTypePerFileAnalyzer, DefaultVerifier>
        {
            TestCode = source,
            ReferenceAssemblies = ReferenceAssemblies.Net.Net80,
        };
        test.ExpectedDiagnostics.AddRange(expected);
        await test.RunAsync();
    }

    // --- Valid cases (no diagnostic) ---

    [Test]
    public async Task SingleClass_NoDiagnostic()
    {
        const string source = """
            namespace TestProject;

            class Foo { }
            """;

        await Verifier.VerifyAnalyzerAsync(source);
    }

    [Test]
    public async Task SingleRecord_NoDiagnostic()
    {
        const string source = """
            namespace TestProject;

            record Foo(int X);
            """;

        await VerifyNet80Async(source);
    }

    [Test]
    public async Task SingleInterface_NoDiagnostic()
    {
        const string source = """
            namespace TestProject;

            interface IFoo { }
            """;

        await Verifier.VerifyAnalyzerAsync(source);
    }

    [Test]
    public async Task SingleEnum_NoDiagnostic()
    {
        const string source = """
            namespace TestProject;

            enum Color { Red, Green, Blue }
            """;

        await Verifier.VerifyAnalyzerAsync(source);
    }

    [Test]
    public async Task SingleStruct_NoDiagnostic()
    {
        const string source = """
            namespace TestProject;

            struct Point { public int X; public int Y; }
            """;

        await Verifier.VerifyAnalyzerAsync(source);
    }

    [Test]
    public async Task NestedClass_NoDiagnostic()
    {
        const string source = """
            namespace TestProject;

            class Outer
            {
                class Inner { }
            }
            """;

        await Verifier.VerifyAnalyzerAsync(source);
    }

    [Test]
    public async Task TwoRecords_PrimaryReferencesHelper_NoDiagnostic()
    {
        const string source = """
            namespace TestProject;

            record Primary(Helper H);
            record Helper(int X);
            """;

        await VerifyNet80Async(source);
    }

    [Test]
    public async Task ThreeRecordChain_NoDiagnostic()
    {
        // A uses B, B uses C — C doesn't need to appear in A directly
        const string source = """
            namespace TestProject;

            record A(B Item);
            record B(C Inner);
            record C(int Value);
            """;

        await VerifyNet80Async(source);
    }

    [Test]
    public async Task TwoRecords_CrossReferences_NoDiagnostic()
    {
        const string source = """
            namespace TestProject;

            record Alpha(Beta B);
            record Beta(Alpha A);
            """;

        await VerifyNet80Async(source);
    }

    [Test]
    public async Task Record_ReferencesHelperViaPropertyType_NoDiagnostic()
    {
        const string source = """
            namespace TestProject;

            record Primary
            {
                public Helper? H { get; init; }
            }
            record Helper(int X);
            """;

        await VerifyNet80Async(source);
    }

    // --- Violations ---

    [Test]
    public async Task TwoClasses_Diagnostic()
    {
        const string source = """
            namespace TestProject;

            class Foo { }
            class {|#0:Bar|} { }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.OneTypePerFile)
            .WithLocation(0)
            .WithArguments(2);

        await Verifier.VerifyAnalyzerAsync(source, expected);
    }

    [Test]
    public async Task ClassAndInterface_Diagnostic()
    {
        const string source = """
            namespace TestProject;

            class Foo { }
            interface {|#0:IBar|} { }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.OneTypePerFile)
            .WithLocation(0)
            .WithArguments(2);

        await Verifier.VerifyAnalyzerAsync(source, expected);
    }

    [Test]
    public async Task ThreeClasses_MessageSaysThree()
    {
        const string source = """
            namespace TestProject;

            class A { }
            class {|#0:B|} { }
            class C { }
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.OneTypePerFile)
            .WithLocation(0)
            .WithArguments(3);

        await Verifier.VerifyAnalyzerAsync(source, expected);
    }

    [Test]
    public async Task ClassAndRecord_NotAllRecords_Diagnostic()
    {
        const string source = """
            namespace TestProject;

            class Foo { }
            record {|#0:Bar|}(int X);
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.OneTypePerFile)
            .WithLocation(0)
            .WithArguments(2);

        await VerifyNet80Async(source, expected);
    }

    [Test]
    public async Task TwoUnrelatedRecords_Diagnostic()
    {
        // Both are records but neither references the other
        const string source = """
            namespace TestProject;

            record Foo(int X);
            record {|#0:Bar|}(int Y);
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.OneTypePerFile)
            .WithLocation(0)
            .WithArguments(2);

        await VerifyNet80Async(source, expected);
    }

    [Test]
    public async Task ThreeRecords_OrphanedThird_Diagnostic()
    {
        // A references B, but C is not referenced by anyone
        const string source = """
            namespace TestProject;

            record A(B Item);
            record {|#0:B|}(int X);
            record C(int Y);
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.OneTypePerFile)
            .WithLocation(0)
            .WithArguments(3);

        await VerifyNet80Async(source, expected);
    }

    [Test]
    public async Task TwoRecords_SubstringNameCollision_Diagnostic()
    {
        // "Bar" is a substring of "BarCode" but not an actual type reference.
        // Must still produce a diagnostic — these records are unrelated.
        const string source = """
            namespace TestProject;

            record MyData(string BarCode);
            record {|#0:Bar|}(int Value);
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.OneTypePerFile)
            .WithLocation(0)
            .WithArguments(2);

        await VerifyNet80Async(source, expected);
    }

    [Test]
    public async Task TwoRecords_ShortNameSubstringCollision_Diagnostic()
    {
        // "Id" appears as a substring in "IdValue" but is not a type reference
        const string source = """
            namespace TestProject;

            record Config(int IdValue);
            record {|#0:Id|}(int Value);
            """;

        var expected = Verifier
            .Diagnostic(DiagnosticIds.OneTypePerFile)
            .WithLocation(0)
            .WithArguments(2);

        await VerifyNet80Async(source, expected);
    }
}
