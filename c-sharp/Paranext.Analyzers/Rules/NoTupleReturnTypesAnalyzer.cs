using System.Collections.Immutable;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace Paranext.Analyzers.Rules;

/// <summary>
/// PNX007: DataProvider/NetworkObject methods should not return tuples - use record types instead.
/// Tuples (ValueTuple) serialize as empty objects {} over JSON-RPC, causing runtime failures.
/// Only applies to classes that inherit from DataProvider or NetworkObject (serialization boundaries).
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
            title: "DataProvider/NetworkObject methods should not return tuples",
            messageFormat: "Method '{0}' returns a tuple type; use a record type instead because tuples serialize as {{}} over JSON-RPC",
            category: "Paranext.Serialization",
            DiagnosticSeverity.Warning,
            isEnabledByDefault: true,
            description: "C# tuples (ValueTuple) serialize as empty objects {} over JSON-RPC, causing data loss. Use record types for structured return values. Only applies to DataProvider/NetworkObject classes.",
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

        // Only check classes that inherit from DataProvider/NetworkObject (serialization boundary)
        var containingType = methodSymbol.ContainingType;
        if (containingType == null || !InheritsFromSerializationBoundary(containingType))
            return;

        // Skip abstract base classes - only check concrete implementations
        if (containingType.IsAbstract)
            return;

        // Skip GetFunctions() which returns delegates with tuple signatures
        if (methodSymbol.Name == "GetFunctions")
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

    /// <summary>
    /// Check if the class inherits from DataProvider, NetworkObject, or ProjectDataProvider.
    /// These are the classes whose public methods cross JSON-RPC serialization boundaries.
    /// </summary>
    private static bool InheritsFromSerializationBoundary(INamedTypeSymbol classSymbol)
    {
        var baseType = classSymbol.BaseType;
        while (baseType != null)
        {
            var name = baseType.Name;
            if (name == "DataProvider" || name == "NetworkObject" || name == "ProjectDataProvider")
                return true;
            baseType = baseType.BaseType;
        }
        return false;
    }
}
