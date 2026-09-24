using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;

namespace Pt9CssExtractor;

/// <summary>
/// CLI entry point. Keeps Paratext-using code out of <see cref="Main"/> so the
/// AssemblyResolve handler can be installed before the CLR JIT-compiles the
/// method that touches Paratext types.
/// </summary>
internal static class Program
{
    internal const string DefaultParatextInstallDir = @"C:\Program Files\Paratext 9";
    internal const string DefaultProjectsDir = @"C:\My Paratext 9 Projects";

    private static int Main(string[] args)
    {
        try
        {
            CliOptions opts = CliOptions.Parse(args);
            InstallAssemblyResolver(opts.ParatextInstallDir);
            return RunExtraction(opts);
        }
        catch (CliUsageException ex)
        {
            if (!string.IsNullOrEmpty(ex.Message))
                Console.Error.WriteLine(ex.Message);
            Console.Error.WriteLine(CliOptions.Usage);
            return 2;
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"ERROR: {ex.Message}");
            Console.Error.WriteLine(ex);
            return 1;
        }
    }

    /// <summary>
    /// Wrapped in <see cref="MethodImplOptions.NoInlining"/> so the JIT does not pull
    /// it into <see cref="Main"/>; Paratext assemblies are loaded only when this method
    /// is JIT-compiled, by which time the AssemblyResolve handler is installed.
    /// </summary>
    [MethodImpl(MethodImplOptions.NoInlining)]
    private static int RunExtraction(CliOptions opts) =>
        ParatextExtractor.Run(opts);

    /// <summary>
    /// Paratext has many transitive DLLs in its install directory that aren't direct project
    /// references. Resolve them on demand from <paramref name="paratextInstallDir"/>.
    /// </summary>
    private static void InstallAssemblyResolver(string paratextInstallDir)
    {
        if (!Directory.Exists(paratextInstallDir))
            throw new DirectoryNotFoundException(
                $"Paratext install directory not found: {paratextInstallDir}");

        AppDomain.CurrentDomain.AssemblyResolve += (_, e) =>
        {
            var requested = new AssemblyName(e.Name);
            string candidate = Path.Combine(paratextInstallDir, requested.Name + ".dll");
            return File.Exists(candidate) ? Assembly.LoadFrom(candidate) : null;
        };
    }
}

internal sealed class CliOptions
{
    public string ProjectName { get; private set; } = "";
    public string OutPath { get; private set; } = "";
    public string ParatextInstallDir { get; private set; } =
        Environment.GetEnvironmentVariable("PARATEXT_INSTALL_DIR")
        ?? Program.DefaultParatextInstallDir;
    public string ProjectsDir { get; private set; } =
        Environment.GetEnvironmentVariable("PARATEXT_PROJECTS_DIR")
        ?? Program.DefaultProjectsDir;

    public static readonly string Usage =
        "Usage: dotnet run -- --project <NAME> --out <PATH> "
        + "[--projects-dir <DIR>] [--paratext-install-dir <DIR>]\n\n"
        + "  --project              Short name of the Paratext project or resource (e.g. HBKENG).\n"
        + "  --out                  Path of the .css file to write.\n"
        + "  --projects-dir         Paratext projects/_Resources root\n"
        + "                         (default: " + Program.DefaultProjectsDir + ",\n"
        + "                          or $env:PARATEXT_PROJECTS_DIR).\n"
        + "  --paratext-install-dir Paratext 9 install directory\n"
        + "                         (default: " + Program.DefaultParatextInstallDir + ",\n"
        + "                          or $env:PARATEXT_INSTALL_DIR).";

    public static CliOptions Parse(string[] args)
    {
        var opts = new CliOptions();
        for (int i = 0; i < args.Length; i++)
        {
            string key = args[i];
            string? value = i + 1 < args.Length ? args[i + 1] : null;
            switch (key)
            {
                case "--project":
                    opts.ProjectName = Require(key, value);
                    i++;
                    break;
                case "--out":
                    opts.OutPath = Require(key, value);
                    i++;
                    break;
                case "--projects-dir":
                    opts.ProjectsDir = Require(key, value);
                    i++;
                    break;
                case "--paratext-install-dir":
                    opts.ParatextInstallDir = Require(key, value);
                    i++;
                    break;
                case "-h":
                case "--help":
                    throw new CliUsageException("");
                default:
                    throw new CliUsageException($"Unknown argument: {key}");
            }
        }

        if (string.IsNullOrEmpty(opts.ProjectName))
            throw new CliUsageException("--project is required.");
        if (string.IsNullOrEmpty(opts.OutPath))
            throw new CliUsageException("--out is required.");

        return opts;
    }

    private static string Require(string key, string? value)
    {
        if (string.IsNullOrEmpty(value))
            throw new CliUsageException($"{key} requires a value.");
        return value!;
    }
}

internal sealed class CliUsageException : Exception
{
    public CliUsageException(string message) : base(message) { }
}
