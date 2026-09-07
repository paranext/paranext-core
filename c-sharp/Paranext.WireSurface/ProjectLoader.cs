using System.Runtime.CompilerServices;
using Microsoft.Build.Locator;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.MSBuild;

namespace Paranext.WireSurface;

/// <summary>
/// Loads the data provider project through <see cref="MSBuildWorkspace"/> and returns its
/// compilation, or null once every workspace failure and compile error has been written to the
/// caller's stderr.
///
/// Registering MSBuild (<see cref="EnsureMSBuildRegistered"/>) and touching workspace types
/// (<see cref="LoadCoreAsync"/>) are kept in separate, <see cref="MethodImplOptions.NoInlining"/>
/// methods on purpose: the JIT resolves an assembly the moment it compiles a method referencing one
/// of its types, so <see cref="MSBuildLocator.RegisterDefaults()"/> must finish running, in a method
/// that itself references no <c>Microsoft.CodeAnalysis.MSBuild</c> or <c>Microsoft.Build</c> type,
/// before any method that does is even compiled -- let alone invoked.
/// </summary>
public static class ProjectLoader
{
    private static readonly object s_registrationLock = new();
    private static bool s_registered;
    private static string? s_msbuildPath;

    public static Task<Compilation?> LoadCompilationAsync(string projectPath, TextWriter stderr)
    {
        EnsureMSBuildRegistered(stderr);
        return LoadCoreAsync(projectPath, stderr);
    }

    /// <summary>
    /// Registers the MSBuild SDK at most once per process (<see cref="MSBuildLocator.RegisterDefaults"/>
    /// throws if called twice), but writes a resolved-SDK line to <paramref name="stderr"/> on every
    /// call -- including one that finds registration already done -- so a caller that scans this
    /// process's stderr for that line sees it regardless of how many times, or in what order, this
    /// method has already run.
    /// </summary>
    [MethodImpl(MethodImplOptions.NoInlining)]
    private static void EnsureMSBuildRegistered(TextWriter stderr)
    {
        lock (s_registrationLock)
        {
            if (s_registered)
            {
                stderr.WriteLine($"wire-surface: MSBuild SDK already resolved at {s_msbuildPath}");
                return;
            }

            var instance = MSBuildLocator.RegisterDefaults();
            s_msbuildPath = instance.MSBuildPath;
            stderr.WriteLine($"wire-surface: resolved MSBuild SDK at {s_msbuildPath}");
            s_registered = true;
        }
    }

    [MethodImpl(MethodImplOptions.NoInlining)]
    private static async Task<Compilation?> LoadCoreAsync(string projectPath, TextWriter stderr)
    {
        var failed = false;

        try
        {
            using var workspace = MSBuildWorkspace.Create();
            workspace.WorkspaceFailed += (_, e) =>
            {
                if (e.Diagnostic.Kind == WorkspaceDiagnosticKind.Failure)
                {
                    failed = true;
                    stderr.WriteLine($"wire-surface: {e.Diagnostic.Message}");
                }
                else
                {
                    stderr.WriteLine($"wire-surface: warning: {e.Diagnostic.Message}");
                }
            };

            var project = await workspace.OpenProjectAsync(projectPath);
            var compilation = await project.GetCompilationAsync();

            var errors =
                compilation
                    ?.GetDiagnostics()
                    .Where(d => d.Severity == DiagnosticSeverity.Error)
                    .ToList() ?? [];
            foreach (var error in errors)
                stderr.WriteLine($"wire-surface: {error}");

            if (!failed && compilation is not null && errors.Count == 0)
                return compilation;
        }
        catch (Exception ex) when (ex is not OutOfMemoryException)
        {
            stderr.WriteLine($"wire-surface: {ex.Message}");
        }

        stderr.WriteLine(
            "wire-surface: the data provider project does not load/compile; run `npm run build:data` "
                + "first if this is a fresh checkout."
        );
        return null;
    }
}
