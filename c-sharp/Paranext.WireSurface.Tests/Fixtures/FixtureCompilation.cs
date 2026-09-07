using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;

namespace Paranext.WireSurface.Tests.Fixtures;

/// <summary>
/// Builds an in-memory <see cref="CSharpCompilation"/> from fixture source text plus
/// <see cref="FrameworkStubs.Source"/>, so scanner tests exercise real symbol binding without an SDK
/// or the filesystem.
/// </summary>
public static class FixtureCompilation
{
    public static CSharpCompilation Create(params string[] sources)
    {
        var trees = new[] { FrameworkStubs.Source }
            .Concat(sources)
            .Select(
                (text, i) =>
                    CSharpSyntaxTree.ParseText(
                        text,
                        path: i == 0
                            ? "c-sharp/Framework/Stubs.cs"
                            : $"c-sharp/Fixtures/Fixture{i}.cs"
                    )
            )
            .ToList();
        var compilation = CSharpCompilation.Create(
            "Fixture",
            trees,
            Basic.Reference.Assemblies.Net80.References.All,
            new CSharpCompilationOptions(
                OutputKind.DynamicallyLinkedLibrary,
                nullableContextOptions: NullableContextOptions.Enable
            )
        );
        var errors = compilation
            .GetDiagnostics()
            .Where(d => d.Severity == DiagnosticSeverity.Error)
            .ToList();
        if (errors.Count > 0)
            throw new InvalidOperationException(
                "Fixture does not compile:\n" + string.Join("\n", errors)
            );
        return compilation;
    }
}
