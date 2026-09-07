using Microsoft.CodeAnalysis;
using Paranext.WireSurface.RegistrationRules;

namespace Paranext.WireSurface;

/// <summary>
/// Runs every registration rule over a compilation's tracked syntax trees and produces a
/// deterministic, sorted report, plus the two tracked/compiled file-set differences that indicate
/// the tracked-file list and the project's actual sources have drifted apart.
/// </summary>
public static class WireSurfaceScanner
{
    private static readonly IReadOnlyList<IRegistrationRule> Rules =
    [
        new NetworkObjectRegistrationRule(),
        new DataProviderSubclassRule(),
        new DocumentationOverrideRule(),
        new StandaloneRequestHandlerRule(),
        new NetworkEventRule(),
    ];

    public static ScanReport Scan(
        Compilation compilation,
        IReadOnlySet<string> trackedRepoRelativePaths,
        string repoRoot
    )
    {
        var symbols = FrameworkSymbols.Resolve(compilation);
        var names = new NameResolver(compilation);
        var docs = new DocumentationResolver(compilation, symbols);

        var pathsByTree = new Dictionary<SyntaxTree, string>();
        string RepoRelativePath(SyntaxTree t)
        {
            if (!pathsByTree.TryGetValue(t, out var path))
            {
                path = RepoPaths.Relative(repoRoot, t.FilePath);
                pathsByTree[t] = path;
            }
            return path;
        }

        var context = new RuleContext(symbols, names, docs, RepoRelativePath);

        var statics = new List<StaticRegistration>();
        var dynamics = new List<DynamicRegistration>();
        var compiledPaths = new HashSet<string>(StringComparer.Ordinal);

        foreach (var tree in compilation.SyntaxTrees)
        {
            var relativePath = RepoRelativePath(tree);
            compiledPaths.Add(relativePath);

            if (!trackedRepoRelativePaths.Contains(relativePath))
                continue;

            var model = names.GetSemanticModel(tree);
            foreach (var rule in Rules)
            {
                foreach (var entry in rule.Scan(tree, model, context))
                {
                    switch (entry)
                    {
                        case ScanEntry.Static s:
                            statics.Add(s.Registration);
                            break;
                        case ScanEntry.Dynamic d:
                            dynamics.Add(d.Registration);
                            break;
                    }
                }
            }
        }

        var compiledButUntracked = compiledPaths
            .Except(trackedRepoRelativePaths)
            .OrderBy(p => p, StringComparer.Ordinal)
            .ToList();
        var trackedButNotCompiled = trackedRepoRelativePaths
            .Except(compiledPaths)
            .OrderBy(p => p, StringComparer.Ordinal)
            .ToList();

        return new ScanReport(
            WireSurfaceScanResult.Sorted(statics, dynamics),
            compiledButUntracked,
            trackedButNotCompiled
        );
    }
}
