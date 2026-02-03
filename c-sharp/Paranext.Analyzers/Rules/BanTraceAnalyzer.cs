using System.Collections.Immutable;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace Paranext.Analyzers.Rules;

/// <summary>
/// PNX001: Detects usage of System.Diagnostics.Trace and reports an error.
/// Use Console.WriteLine for logging instead.
/// See: Paranext-Core-Patterns.md "Logging" section.
/// </summary>
[DiagnosticAnalyzer(LanguageNames.CSharp)]
public sealed class BanTraceAnalyzer : DiagnosticAnalyzer
{
    private static readonly DiagnosticDescriptor Rule =
        new(
            DiagnosticIds.BanTrace,
            title: "Use Console.WriteLine instead of Trace",
            messageFormat: "Replace '{0}' with Console.WriteLine",
            category: "Paranext.Logging",
            DiagnosticSeverity.Error,
            isEnabledByDefault: true,
            description: "paranext-core uses Console for logging output. Do NOT use System.Diagnostics.Trace.",
            helpLinkUri: $"{DiagnosticIds.HelpLinkBase}#logging"
        );

    public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics =>
        ImmutableArray.Create(Rule);

    public override void Initialize(AnalysisContext context)
    {
        context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
        context.EnableConcurrentExecution();
        context.RegisterSyntaxNodeAction(AnalyzeInvocation, SyntaxKind.InvocationExpression);
        context.RegisterSyntaxNodeAction(
            AnalyzeMemberAccess,
            SyntaxKind.SimpleMemberAccessExpression
        );
    }

    private static void AnalyzeInvocation(SyntaxNodeAnalysisContext context)
    {
        var invocation = (InvocationExpressionSyntax)context.Node;

        if (
            context.SemanticModel.GetSymbolInfo(invocation).Symbol is not IMethodSymbol methodSymbol
        )
            return;

        if (IsTraceType(methodSymbol.ContainingType))
        {
            context.ReportDiagnostic(
                Diagnostic.Create(Rule, invocation.GetLocation(), methodSymbol.Name)
            );
        }
    }

    private static void AnalyzeMemberAccess(SyntaxNodeAnalysisContext context)
    {
        var memberAccess = (MemberAccessExpressionSyntax)context.Node;

        // Skip if this is part of a larger invocation (handled by AnalyzeInvocation)
        if (memberAccess.Parent is InvocationExpressionSyntax)
            return;

        if (context.SemanticModel.GetSymbolInfo(memberAccess).Symbol is not ISymbol symbol)
            return;

        if (symbol.ContainingType != null && IsTraceType(symbol.ContainingType))
        {
            context.ReportDiagnostic(
                Diagnostic.Create(Rule, memberAccess.GetLocation(), symbol.Name)
            );
        }
    }

    private static bool IsTraceType(INamedTypeSymbol? typeSymbol)
    {
        if (typeSymbol == null)
            return false;

        var fullName = typeSymbol.ToDisplayString();
        return fullName == "System.Diagnostics.Trace" || fullName == "System.Diagnostics.Debug"; // Also ban Debug for consistency
    }
}
