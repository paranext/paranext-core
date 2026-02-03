using System.Collections.Immutable;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace Paranext.Analyzers.Rules;

/// <summary>
/// PNX002: Classes inheriting from DataProvider must be declared as 'internal sealed'.
/// See: Paranext-Core-Patterns.md "Visibility and Access Modifiers" section.
/// </summary>
[DiagnosticAnalyzer(LanguageNames.CSharp)]
public sealed class SealedDataProviderAnalyzer : DiagnosticAnalyzer
{
    private static readonly DiagnosticDescriptor Rule =
        new(
            DiagnosticIds.SealedDataProvider,
            title: "DataProvider must be internal sealed",
            messageFormat: "Class '{0}' inherits from DataProvider and must be declared as 'internal sealed'",
            category: "Paranext.Architecture",
            DiagnosticSeverity.Error,
            isEnabledByDefault: true,
            description: "DataProvider classes should be 'internal sealed' to prevent inheritance and external access.",
            helpLinkUri: $"{DiagnosticIds.HelpLinkBase}#visibility-and-access-modifiers"
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

        // Check if class inherits from DataProvider (directly or indirectly)
        if (!InheritsFromDataProvider(classSymbol))
            return;

        // Skip abstract classes - they are allowed to not be sealed
        if (classSymbol.IsAbstract)
            return;

        // Skip the base DataProvider and ProjectDataProvider classes themselves
        var className = classSymbol.Name;
        if (
            className == "DataProvider"
            || className == "ProjectDataProvider"
            || className == "NetworkObject"
        )
            return;

        // Check if sealed
        bool isSealed = classSymbol.IsSealed;

        // Check if internal
        bool isInternal = classSymbol.DeclaredAccessibility == Accessibility.Internal;

        if (!isSealed || !isInternal)
        {
            context.ReportDiagnostic(
                Diagnostic.Create(Rule, classDeclaration.Identifier.GetLocation(), classSymbol.Name)
            );
        }
    }

    private static bool InheritsFromDataProvider(INamedTypeSymbol classSymbol)
    {
        var baseType = classSymbol.BaseType;
        while (baseType != null)
        {
            var baseTypeName = baseType.Name;
            if (baseTypeName == "DataProvider" || baseTypeName == "ProjectDataProvider")
                return true;

            baseType = baseType.BaseType;
        }
        return false;
    }
}
