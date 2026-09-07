using System.Text;

namespace Paranext.WireSurface;

/// <summary>
/// CLI entry point: parses arguments (<see cref="ScanOptions"/>), loads the data provider project
/// through MSBuildWorkspace (<see cref="ProjectLoader"/>), runs <see cref="WireSurfaceScanner"/>
/// over its tracked syntax trees, and writes the result as JSON.
/// </summary>
public static class Program
{
    private static int Main(string[] args) => Run(args, Console.Out, Console.Error);

    public static int Run(string[] args, TextWriter stdout, TextWriter stderr)
    {
        var options = ScanOptions.Parse(args, stderr);
        if (options is null)
            return 64;

        var compilation = ProjectLoader
            .LoadCompilationAsync(options.ProjectPath, stderr)
            .GetAwaiter()
            .GetResult();
        if (compilation is null)
            return 2;

        var report = WireSurfaceScanner.Scan(compilation, options.TrackedFiles, options.RepoRoot);

        if (report.TrackedButNotCompiled.Count > 0)
        {
            stderr.WriteLine(
                "wire-surface: these tracked files were not found in the compiled project (the "
                    + ".csproj excludes them, or the tracked-file list is stale):"
            );
            foreach (var path in report.TrackedButNotCompiled)
                stderr.WriteLine($"  {path}");
            return 3;
        }

        if (report.CompiledButUntracked.Count > 0)
        {
            stderr.WriteLine(
                "wire-surface: these compiled files are not in the tracked-file list and were skipped:"
            );
            foreach (var path in report.CompiledButUntracked)
                stderr.WriteLine($"  {path}");
        }

        var json = ScanResultSerializer.Serialize(report.Result);
        File.WriteAllText(
            options.OutputPath,
            json,
            new UTF8Encoding(encoderShouldEmitUTF8Identifier: false)
        );

        stdout.WriteLine(
            $"wire-surface: wrote {report.Result.Registrations.Count} declared and "
                + $"{report.Result.DynamicRegistrations.Count} dynamic registrations to {options.OutputPath}"
        );
        return 0;
    }
}
