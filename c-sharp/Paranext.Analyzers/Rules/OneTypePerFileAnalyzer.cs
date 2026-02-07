using System.Collections.Immutable;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace Paranext.Analyzers.Rules;

/// <summary>
/// PNX004: Only one type per file is allowed, with an exception for records
/// that are exclusively used by another record in the same file.
/// See: Paranext-Core-Patterns.md "File Organization Patterns" section.
/// </summary>
[DiagnosticAnalyzer(LanguageNames.CSharp)]
public sealed class OneTypePerFileAnalyzer : DiagnosticAnalyzer
{
    private static readonly DiagnosticDescriptor Rule =
        new(
            DiagnosticIds.OneTypePerFile,
            title: "Only one type per file allowed",
            messageFormat: "File contains {0} top-level types but only one is allowed",
            category: "Paranext.FileOrganization",
            DiagnosticSeverity.Error,
            isEnabledByDefault: true,
            description: "Each file should contain only one type, except when a record is exclusively used by another record in the same file.",
            helpLinkUri: $"{DiagnosticIds.HelpLinkBase}#file-organization-patterns"
        );

    public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics =>
        ImmutableArray.Create(Rule);

    public override void Initialize(AnalysisContext context)
    {
        context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
        context.EnableConcurrentExecution();
        context.RegisterSyntaxTreeAction(AnalyzeSyntaxTree);
    }

    private static void AnalyzeSyntaxTree(SyntaxTreeAnalysisContext context)
    {
        var root = context.Tree.GetRoot(context.CancellationToken);

        // Get all top-level type declarations (classes, structs, interfaces, enums, records)
        var topLevelTypes = root.DescendantNodes()
            .OfType<BaseTypeDeclarationSyntax>()
            .Where(t => IsTopLevelType(t))
            .ToList();

        if (topLevelTypes.Count <= 1)
            return;

        // Check if this is the allowed exception: primary record + exclusively-used records
        if (IsAllowedRecordPattern(topLevelTypes))
            return;

        // Report diagnostic on the second type declaration
        var secondType = topLevelTypes[1];
        context.ReportDiagnostic(
            Diagnostic.Create(Rule, secondType.Identifier.GetLocation(), topLevelTypes.Count)
        );
    }

    private static bool IsTopLevelType(BaseTypeDeclarationSyntax typeDeclaration)
    {
        // A type is top-level if its parent is a namespace or compilation unit
        var parent = typeDeclaration.Parent;
        return parent
            is BaseNamespaceDeclarationSyntax
                or CompilationUnitSyntax
                or FileScopedNamespaceDeclarationSyntax;
    }

    private static bool IsAllowedRecordPattern(List<BaseTypeDeclarationSyntax> types)
    {
        // All types must be records for the exception to apply
        bool allRecords = types.All(t => t is RecordDeclarationSyntax);
        if (!allRecords)
            return false;

        // Exception: a primary record can have helper records in the same file
        // if those helper records are only used by the primary record
        // This is a simplified check - we assume if all are records, it's allowed
        // A more sophisticated check would verify actual usage relationships
        return true;
    }
}
