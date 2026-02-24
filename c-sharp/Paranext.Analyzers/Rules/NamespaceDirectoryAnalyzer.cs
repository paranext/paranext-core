using System.Collections.Immutable;
using System.IO;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace Paranext.Analyzers.Rules;

/// <summary>
/// PNX005: Namespace must match the directory structure.
/// Expected pattern: Paranext.DataProvider.{Directory}
/// See: Paranext-Core-Patterns.md "Namespaces" section.
/// </summary>
[DiagnosticAnalyzer(LanguageNames.CSharp)]
public sealed class NamespaceDirectoryAnalyzer : DiagnosticAnalyzer
{
    private const string RootNamespace = "Paranext.DataProvider";

    private static readonly DiagnosticDescriptor Rule =
        new(
            DiagnosticIds.NamespaceMatchesDirectory,
            title: "Namespace must match directory structure",
            messageFormat: "Namespace '{0}' does not match expected namespace '{1}' based on directory structure",
            category: "Paranext.FileOrganization",
            DiagnosticSeverity.Error,
            isEnabledByDefault: true,
            description: "The namespace should follow the pattern 'Paranext.DataProvider.{Directory}' matching the file's location.",
            helpLinkUri: $"{DiagnosticIds.HelpLinkBase}#namespaces"
        );

    public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics =>
        ImmutableArray.Create(Rule);

    public override void Initialize(AnalysisContext context)
    {
        context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
        context.EnableConcurrentExecution();
        context.RegisterSyntaxNodeAction(
            AnalyzeNamespace,
            SyntaxKind.NamespaceDeclaration,
            SyntaxKind.FileScopedNamespaceDeclaration
        );
    }

    private static void AnalyzeNamespace(SyntaxNodeAnalysisContext context)
    {
        var filePath = context.Node.SyntaxTree.FilePath;
        if (string.IsNullOrEmpty(filePath))
            return;

        // Skip analyzer project itself
        if (filePath.Contains("Paranext.Analyzers"))
            return;

        // Get the actual namespace from the syntax node
        string? actualNamespace = context.Node switch
        {
            NamespaceDeclarationSyntax ns => ns.Name.ToString(),
            FileScopedNamespaceDeclarationSyntax ns => ns.Name.ToString(),
            _ => null,
        };

        if (actualNamespace == null)
            return;

        // Calculate expected namespace from file path
        var expectedNamespace = GetExpectedNamespace(filePath);
        if (expectedNamespace == null)
            return;

        // Compare namespaces
        if (!string.Equals(actualNamespace, expectedNamespace, StringComparison.Ordinal))
        {
            var location = context.Node switch
            {
                NamespaceDeclarationSyntax ns => ns.Name.GetLocation(),
                FileScopedNamespaceDeclarationSyntax ns => ns.Name.GetLocation(),
                _ => context.Node.GetLocation(),
            };

            context.ReportDiagnostic(
                Diagnostic.Create(Rule, location, actualNamespace, expectedNamespace)
            );
        }
    }

    private static string? GetExpectedNamespace(string filePath)
    {
        // Normalize path separators
        filePath = filePath.Replace('\\', '/');

        // Find the c-sharp directory in the path
        var csharpIndex = filePath.LastIndexOf("/c-sharp/", StringComparison.OrdinalIgnoreCase);
        if (csharpIndex < 0)
            return null;

        // Get the relative path after c-sharp/
        var relativePath = filePath.Substring(csharpIndex + "/c-sharp/".Length);

        // Get directory path (remove filename)
        var lastSlash = relativePath.LastIndexOf('/');
        if (lastSlash < 0)
        {
            // File is in root c-sharp directory
            return RootNamespace;
        }

        var directoryPath = relativePath.Substring(0, lastSlash);

        // Skip if this is a special directory
        if (
            directoryPath.StartsWith("obj/", StringComparison.OrdinalIgnoreCase)
            || directoryPath.StartsWith("bin/", StringComparison.OrdinalIgnoreCase)
        )
            return null;

        // Convert directory path to namespace
        // e.g., "Services" -> "Paranext.DataProvider.Services"
        // e.g., "Projects/SubDir" -> "Paranext.DataProvider.Projects.SubDir"
        var namespaceSuffix = directoryPath.Replace('/', '.');

        return $"{RootNamespace}.{namespaceSuffix}";
    }
}
