using System.Collections.Immutable;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace Paranext.Analyzers.Rules;

/// <summary>
/// PNX008: Methods should not return 'object' or 'dynamic' - use concrete types.
/// Weakly-typed returns lose type safety and can cause serialization issues over JSON-RPC.
/// See: phase-3-implementation-backend.md "Smoke Test 3: Serialization &amp; Parameter Alignment Audit"
/// </summary>
[DiagnosticAnalyzer(LanguageNames.CSharp)]
public sealed class ConcreteReturnTypesAnalyzer : DiagnosticAnalyzer
{
    private static readonly DiagnosticDescriptor Rule =
        new(
            DiagnosticIds.ConcreteReturnTypes,
            title: "Methods should return concrete types",
            messageFormat: "Method '{0}' returns '{1}'; use a concrete type instead for type safety and proper JSON-RPC serialization",
            category: "Paranext.Serialization",
            DiagnosticSeverity.Warning,
            isEnabledByDefault: true,
            description: "Returning 'object' or 'dynamic' loses type safety and can cause serialization issues. Use concrete types (classes, records, or interfaces).",
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

        // Skip test classes
        var containingType = methodSymbol.ContainingType;
        if (containingType != null && IsTestClass(containingType))
            return;

        // Check if return type is object or dynamic
        var returnType = methodSymbol.ReturnType;
        var returnTypeName = returnType.ToDisplayString();

        if (IsWeaklyTypedReturn(returnType, returnTypeName))
        {
            // Check for allowed exceptions
            if (IsAllowedException(methodSymbol))
                return;

            context.ReportDiagnostic(
                Diagnostic.Create(
                    Rule,
                    methodDeclaration.ReturnType.GetLocation(),
                    methodSymbol.Name,
                    returnTypeName
                )
            );
        }
    }

    private static bool IsWeaklyTypedReturn(ITypeSymbol returnType, string returnTypeName)
    {
        // Check for 'object'
        if (returnType.SpecialType == SpecialType.System_Object)
            return true;

        // Check for 'dynamic'
        if (returnType.TypeKind == TypeKind.Dynamic)
            return true;

        // Check for nullable object (object?)
        if (returnTypeName == "object?" || returnTypeName == "System.Object?")
            return true;

        // Check for Task<object> or Task<object?>
        if (
            returnType is INamedTypeSymbol namedType
            && namedType.IsGenericType
            && namedType.Name == "Task"
        )
        {
            var typeArg = namedType.TypeArguments[0];
            if (
                typeArg.SpecialType == SpecialType.System_Object
                || typeArg.TypeKind == TypeKind.Dynamic
            )
                return true;
        }

        return false;
    }

    private static bool IsTestClass(INamedTypeSymbol containingType)
    {
        var typeName = containingType.Name;
        return typeName.EndsWith("Tests")
            || typeName.EndsWith("Test")
            || typeName.StartsWith("Test")
            || typeName.StartsWith("Fake")
            || typeName.StartsWith("Mock")
            || typeName.StartsWith("Dummy");
    }

    private static bool IsAllowedException(IMethodSymbol methodSymbol)
    {
        // Allow in GetFunctions() which returns delegates
        if (methodSymbol.Name == "GetFunctions")
            return true;

        // Allow override methods from external interfaces/base classes
        if (methodSymbol.IsOverride)
            return true;

        // Allow explicit interface implementations
        if (!methodSymbol.ExplicitInterfaceImplementations.IsEmpty)
            return true;

        return false;
    }
}
