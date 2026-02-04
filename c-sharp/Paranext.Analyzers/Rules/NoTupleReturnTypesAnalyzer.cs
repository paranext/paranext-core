using System.Collections.Immutable;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace Paranext.Analyzers.Rules;

/// <summary>
/// PNX007: Methods should not return tuples - use record types instead.
/// Tuples (ValueTuple) serialize as empty objects {} over JSON-RPC, causing runtime failures.
/// See: phase-3-implementation-backend.md "Smoke Test 3: Serialization &amp; Parameter Alignment Audit"
/// </summary>
[DiagnosticAnalyzer(LanguageNames.CSharp)]
public sealed class NoTupleReturnTypesAnalyzer : DiagnosticAnalyzer
{
    // Warning (not Error) so existing code can build. The AI pre-commit hook treats
    // warnings as blocking for newly staged files via run_ai_lint_csharp().
    private static readonly DiagnosticDescriptor Rule =
        new(
            DiagnosticIds.NoTupleReturnTypes,
            title: "Methods should not return tuples",
            messageFormat: "Method '{0}' returns a tuple type; use a record type instead because tuples serialize as {{}} over JSON-RPC",
            category: "Paranext.Serialization",
            DiagnosticSeverity.Warning,
            isEnabledByDefault: true,
            description: "C# tuples (ValueTuple) serialize as empty objects {} over JSON-RPC, causing data loss. Use record types for structured return values.",
            helpLinkUri: $"{DiagnosticIds.HelpLinkBase}#json-serialization-converters"
        );

    public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics =>
        ImmutableArray.Create(Rule);

    public override void Initialize(AnalysisContext context)
    {
        context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
        context.EnableConcurrentExecution();
        context.RegisterSyntaxNodeAction(AnalyzeMethodDeclaration, SyntaxKind.MethodDeclaration);
    }

    private static void AnalyzeMethodDeclaration(SyntaxNodeAnalysisContext context)
    {
        var methodDeclaration = (MethodDeclarationSyntax)context.Node;

        if (
            context.SemanticModel.GetDeclaredSymbol(methodDeclaration)
            is not IMethodSymbol methodSymbol
        )
            return;

        // Skip private methods - they're implementation details
        if (methodSymbol.DeclaredAccessibility == Accessibility.Private)
            return;

        // Check if return type is a tuple
        if (IsTupleType(methodSymbol.ReturnType))
        {
            context.ReportDiagnostic(
                Diagnostic.Create(
                    Rule,
                    methodDeclaration.ReturnType.GetLocation(),
                    methodSymbol.Name
                )
            );
        }
    }

    private static bool IsTupleType(ITypeSymbol typeSymbol)
    {
        // Check for ValueTuple types
        if (typeSymbol is INamedTypeSymbol namedType)
        {
            // Check if it's a ValueTuple
            if (namedType.IsTupleType)
                return true;

            // Check the full name for System.ValueTuple
            var fullName = namedType.ToDisplayString();
            if (
                fullName.StartsWith("System.ValueTuple")
                || fullName.StartsWith("(") && fullName.Contains(",")
            )
                return true;

            // Check generic type arguments for nested tuples (e.g., Task<(int, string)>)
            if (namedType.IsGenericType)
            {
                foreach (var typeArg in namedType.TypeArguments)
                {
                    if (IsTupleType(typeArg))
                        return true;
                }
            }
        }

        return false;
    }
}
