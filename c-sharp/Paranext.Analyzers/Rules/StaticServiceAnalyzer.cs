using System.Collections.Immutable;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace Paranext.Analyzers.Rules;

/// <summary>
/// PNX003: Classes with names ending in 'Service' must be declared as 'internal static'.
/// See: Paranext-Core-Patterns.md "Static Services" section.
/// </summary>
[DiagnosticAnalyzer(LanguageNames.CSharp)]
public sealed class StaticServiceAnalyzer : DiagnosticAnalyzer
{
    private static readonly DiagnosticDescriptor Rule =
        new(
            DiagnosticIds.StaticService,
            title: "Service class must be internal static",
            messageFormat: "Class '{0}' ends with 'Service' and must be declared as 'internal static'",
            category: "Paranext.Architecture",
            DiagnosticSeverity.Error,
            isEnabledByDefault: true,
            description: "Service classes are stateless wrappers for PAPI calls and should be 'internal static'.",
            helpLinkUri: $"{DiagnosticIds.HelpLinkBase}#service-patterns"
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

        // Only check classes ending with "Service"
        if (!classSymbol.Name.EndsWith("Service", StringComparison.Ordinal))
            return;

        // Exclude test classes (e.g., FakeService, MockService, TestService)
        var className = classSymbol.Name;
        if (
            className.StartsWith("Fake", StringComparison.Ordinal)
            || className.StartsWith("Mock", StringComparison.Ordinal)
            || className.StartsWith("Test", StringComparison.Ordinal)
            || className.StartsWith("Dummy", StringComparison.Ordinal)
        )
            return;

        // Check if static
        bool isStatic = classSymbol.IsStatic;

        // Check if internal
        bool isInternal = classSymbol.DeclaredAccessibility == Accessibility.Internal;

        if (!isStatic || !isInternal)
        {
            context.ReportDiagnostic(
                Diagnostic.Create(Rule, classDeclaration.Identifier.GetLocation(), classSymbol.Name)
            );
        }
    }
}
