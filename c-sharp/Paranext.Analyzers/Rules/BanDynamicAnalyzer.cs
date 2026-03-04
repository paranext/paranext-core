using System.Collections.Immutable;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace Paranext.Analyzers.Rules;

/// <summary>
/// PNX008: Ban 'dynamic' keyword everywhere — use concrete types instead.
/// The 'dynamic' keyword bypasses compile-time type checking and causes serialization issues.
/// </summary>
[DiagnosticAnalyzer(LanguageNames.CSharp)]
public sealed class BanDynamicAnalyzer : DiagnosticAnalyzer
{
    private static readonly DiagnosticDescriptor Rule =
        new(
            DiagnosticIds.BanDynamic,
            title: "Do not use 'dynamic' — use concrete types",
            messageFormat: "Do not use 'dynamic'; use a concrete type instead",
            category: "Paranext.TypeSafety",
            DiagnosticSeverity.Warning,
            isEnabledByDefault: true,
            description: "The 'dynamic' keyword bypasses compile-time type checking and causes serialization issues. Use concrete types (classes, records, or interfaces) instead."
        );

    public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics =>
        ImmutableArray.Create(Rule);

    public override void Initialize(AnalysisContext context)
    {
        context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
        context.EnableConcurrentExecution();
        context.RegisterSyntaxNodeAction(AnalyzeIdentifier, SyntaxKind.IdentifierName);
    }

    private static void AnalyzeIdentifier(SyntaxNodeAnalysisContext context)
    {
        var identifier = (IdentifierNameSyntax)context.Node;

        if (identifier.Identifier.Text != "dynamic")
            return;

        var typeInfo = context.SemanticModel.GetTypeInfo(identifier, context.CancellationToken);
        if (typeInfo.Type?.TypeKind == TypeKind.Dynamic)
        {
            context.ReportDiagnostic(Diagnostic.Create(Rule, identifier.GetLocation()));
        }
    }
}
