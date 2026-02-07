using System.Collections.Immutable;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace Paranext.Analyzers.Rules;

/// <summary>
/// PNX008: DataProvider/NetworkObject methods should not return 'dynamic' - use concrete types.
/// The 'dynamic' keyword is problematic for serialization and was removed from the codebase.
/// Only applies to classes that inherit from DataProvider or NetworkObject (serialization boundaries).
/// See: phase-3-implementation-backend.md "Smoke Test 3: Serialization &amp; Parameter Alignment Audit"
/// </summary>
[DiagnosticAnalyzer(LanguageNames.CSharp)]
public sealed class ConcreteReturnTypesAnalyzer : DiagnosticAnalyzer
{
    private static readonly DiagnosticDescriptor Rule =
        new(
            DiagnosticIds.ConcreteReturnTypes,
            title: "DataProvider/NetworkObject methods should not return 'dynamic'",
            messageFormat: "Method '{0}' returns '{1}'; use a concrete type instead — 'dynamic' is problematic for serialization",
            category: "Paranext.Serialization",
            DiagnosticSeverity.Warning,
            isEnabledByDefault: true,
            description: "Returning 'dynamic' causes serialization issues and was removed from the codebase. Use concrete types (classes, records, or interfaces). Only applies to DataProvider/NetworkObject classes.",
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

        // Skip test classes
        if (IsTestClass(containingType))
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
        // Check for 'dynamic'
        if (returnType.TypeKind == TypeKind.Dynamic)
            return true;

        // Check for Task<dynamic>
        if (
            returnType is INamedTypeSymbol namedType
            && namedType.IsGenericType
            && namedType.Name == "Task"
        )
        {
            var typeArg = namedType.TypeArguments[0];
            if (typeArg.TypeKind == TypeKind.Dynamic)
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
