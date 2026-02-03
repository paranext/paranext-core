using System.Collections.Immutable;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace Paranext.Analyzers.Rules;

/// <summary>
/// PNX006: Classes should follow established naming conventions based on their role.
/// - DataProviders: *DataProvider
/// - Services: *Service
/// - Workers: *Worker
/// - Factories: *Factory
/// See: Paranext-Core-Patterns.md "Naming Conventions Summary" section.
/// </summary>
[DiagnosticAnalyzer(LanguageNames.CSharp)]
public sealed class ClassNamingAnalyzer : DiagnosticAnalyzer
{
    private static readonly DiagnosticDescriptor Rule =
        new(
            DiagnosticIds.ClassNamingConvention,
            title: "Class naming does not follow convention",
            messageFormat: "{0}",
            category: "Paranext.Naming",
            DiagnosticSeverity.Warning,
            isEnabledByDefault: true,
            description: "Classes should follow naming conventions: *DataProvider, *Service, *Worker, *Factory based on their inheritance and role.",
            helpLinkUri: $"{DiagnosticIds.HelpLinkBase}#naming-conventions-summary"
        );

    public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics =>
        ImmutableArray.Create(Rule);

    public override void Initialize(AnalysisContext context)
    {
        context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
        context.EnableConcurrentExecution();
        context.RegisterSyntaxNodeAction(AnalyzeClassDeclaration, SyntaxKind.ClassDeclaration);
    }

    private static void AnalyzeClassDeclaration(SyntaxNodeAnalysisContext context)
    {
        var classDeclaration = (ClassDeclarationSyntax)context.Node;

        if (
            context.SemanticModel.GetDeclaredSymbol(classDeclaration)
            is not INamedTypeSymbol classSymbol
        )
            return;

        var className = classSymbol.Name;

        // Skip test classes
        if (IsTestClass(className))
            return;

        // Check DataProvider naming
        if (InheritsFromType(classSymbol, "DataProvider", "ProjectDataProvider"))
        {
            if (
                !className.EndsWith("DataProvider", StringComparison.Ordinal)
                && className != "DataProvider"
                && className != "ProjectDataProvider"
            )
            {
                ReportDiagnostic(
                    context,
                    classDeclaration,
                    $"Class '{className}' inherits from DataProvider but does not end with 'DataProvider'"
                );
            }
            return;
        }

        // Check NetworkObject naming (should end with DataProvider or be a Factory)
        if (InheritsFromType(classSymbol, "NetworkObject"))
        {
            if (
                !className.EndsWith("DataProvider", StringComparison.Ordinal)
                && !className.EndsWith("Factory", StringComparison.Ordinal)
                && className != "NetworkObject"
                && className != "DataProvider"
            )
            {
                ReportDiagnostic(
                    context,
                    classDeclaration,
                    $"Class '{className}' inherits from NetworkObject but does not end with 'DataProvider' or 'Factory'"
                );
            }
            return;
        }

        // Check for Worker pattern (instance class with stateful processing)
        if (className.Contains("Worker") && !className.EndsWith("Worker", StringComparison.Ordinal))
        {
            ReportDiagnostic(
                context,
                classDeclaration,
                $"Class '{className}' contains 'Worker' but does not end with 'Worker'"
            );
            return;
        }

        // Check for Factory pattern
        if (
            className.Contains("Factory")
            && !className.EndsWith("Factory", StringComparison.Ordinal)
        )
        {
            ReportDiagnostic(
                context,
                classDeclaration,
                $"Class '{className}' contains 'Factory' but does not end with 'Factory'"
            );
            return;
        }
    }

    private static bool IsTestClass(string className)
    {
        return className.StartsWith("Fake", StringComparison.Ordinal)
            || className.StartsWith("Mock", StringComparison.Ordinal)
            || className.StartsWith("Test", StringComparison.Ordinal)
            || className.StartsWith("Dummy", StringComparison.Ordinal)
            || className.EndsWith("Tests", StringComparison.Ordinal)
            || className.EndsWith("Test", StringComparison.Ordinal);
    }

    private static bool InheritsFromType(INamedTypeSymbol classSymbol, params string[] typeNames)
    {
        var baseType = classSymbol.BaseType;
        while (baseType != null)
        {
            if (typeNames.Contains(baseType.Name))
                return true;
            baseType = baseType.BaseType;
        }
        return false;
    }

    private static void ReportDiagnostic(
        SyntaxNodeAnalysisContext context,
        ClassDeclarationSyntax classDeclaration,
        string message
    )
    {
        context.ReportDiagnostic(
            Diagnostic.Create(Rule, classDeclaration.Identifier.GetLocation(), message)
        );
    }
}
