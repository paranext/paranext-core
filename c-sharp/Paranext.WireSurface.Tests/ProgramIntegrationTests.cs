using System.Diagnostics;
using System.Text.Json;
using NUnit.Framework;
using Paranext.WireSurface.Tests.Fixtures;

namespace Paranext.WireSurface.Tests;

/// <summary>
/// The one test suite that touches the real <c>MSBuildWorkspace</c> path end to end: a temp
/// SDK-style project, restored and loaded exactly the way <c>run-wire-surface-scanner.ts</c> invokes
/// <c>Program.Run</c>. Every other test in this project scans an in-memory fixture compilation; this
/// is the cross-platform proof that MSBuild resolution, project loading and compilation actually
/// work on the CI image running it.
/// </summary>
[Category("Integration")]
public class ProgramIntegrationTests
{
    private string _tempDir = null!;

    [SetUp]
    public void SetUp()
    {
        _tempDir = Directory.CreateTempSubdirectory("wire-surface-integration-").FullName;
    }

    [TearDown]
    public void TearDown()
    {
        if (Directory.Exists(_tempDir))
            Directory.Delete(_tempDir, recursive: true);
    }

    [Test]
    public async Task LoadsAndScansARealMSBuildProject()
    {
        var projectPath = WriteFixtureProject(includeProvider: true);
        var trackedFilesPath = Path.Combine(_tempDir, "tracked.txt");
        File.WriteAllText(trackedFilesPath, "Stubs.cs\nProvider.cs\n");
        var outputPath = Path.Combine(_tempDir, "out.json");
        await RestoreAsync(projectPath);

        var stdout = new StringWriter();
        var stderr = new StringWriter();
        var exitCode = Program.Run(
            [
                "--project",
                projectPath,
                "--repo-root",
                _tempDir,
                "--tracked-files",
                trackedFilesPath,
                "--out",
                outputPath,
            ],
            stdout,
            stderr
        );

        Assert.That(exitCode, Is.EqualTo(0), $"stderr:\n{stderr}");
        Assert.That(stderr.ToString(), Does.Contain("SDK"));

        using var document = JsonDocument.Parse(File.ReadAllText(outputPath));
        var dataProviderEntries = document
            .RootElement.GetProperty("registrations")
            .EnumerateArray()
            .Where(entry => entry.GetProperty("category").GetString() == "dataProvider")
            .ToList();
        Assert.That(dataProviderEntries, Has.Count.EqualTo(1));
        Assert.That(
            dataProviderEntries[0].GetProperty("name").GetString(),
            Is.EqualTo("integration.provider")
        );
        Assert.That(
            dataProviderEntries[0].GetProperty("file").GetString(),
            Is.EqualTo("Provider.cs")
        );

        var dynamicExpressions = document
            .RootElement.GetProperty("dynamicRegistrations")
            .EnumerateArray()
            .Select(entry => entry.GetProperty("expression").GetString())
            .ToList();
        Assert.That(
            dynamicExpressions,
            Is.EquivalentTo(new[] { "DataProviderName", "$\"platform.{_pdpfName}-pdpf\"" })
        );
    }

    [Test]
    public async Task TrackedFileNotInCompilationExitsThree()
    {
        var projectPath = WriteFixtureProject(includeProvider: false);
        var trackedFilesPath = Path.Combine(_tempDir, "tracked.txt");
        File.WriteAllText(trackedFilesPath, "Stubs.cs\nMissing.cs\n");
        var outputPath = Path.Combine(_tempDir, "out.json");
        await RestoreAsync(projectPath);

        var stderr = new StringWriter();
        var exitCode = Program.Run(
            [
                "--project",
                projectPath,
                "--repo-root",
                _tempDir,
                "--tracked-files",
                trackedFilesPath,
                "--out",
                outputPath,
            ],
            new StringWriter(),
            stderr
        );

        Assert.That(exitCode, Is.EqualTo(3));
        Assert.That(stderr.ToString(), Does.Contain("Missing.cs"));
        Assert.That(File.Exists(outputPath), Is.False);
    }

    /// <summary>
    /// Writes a minimal SDK-style project to <see cref="_tempDir"/>: the framework stubs plus,
    /// optionally, one primary-constructor <c>DataProvider</c> subclass -- enough surface to exercise
    /// Rule A/B/C/D/E's framework-fan-out entries and one real recognised registration, without
    /// pulling in any package.
    /// </summary>
    private string WriteFixtureProject(bool includeProvider)
    {
        File.WriteAllText(
            Path.Combine(_tempDir, "Fixture.csproj"),
            """
            <Project Sdk="Microsoft.NET.Sdk">
              <PropertyGroup>
                <TargetFramework>net8.0</TargetFramework>
                <ImplicitUsings>enable</ImplicitUsings>
                <Nullable>enable</Nullable>
              </PropertyGroup>
            </Project>
            """
        );
        File.WriteAllText(Path.Combine(_tempDir, "Stubs.cs"), FrameworkStubs.Source);
        if (includeProvider)
        {
            File.WriteAllText(
                Path.Combine(_tempDir, "Provider.cs"),
                """
                using Paranext.DataProvider;
                using Paranext.DataProvider.NetworkObjects;

                namespace Fixture;

                internal sealed class IntegrationProvider(PapiClient papiClient)
                    : DataProvider("integration.provider", papiClient) { }
                """
            );
        }
        return Path.Combine(_tempDir, "Fixture.csproj");
    }

    private static readonly TimeSpan RestoreTimeout = TimeSpan.FromMinutes(5);

    /// <summary>
    /// A design-time build needs a restore first -- a freshly written SDK-style project has no
    /// <c>obj/project.assets.json</c> yet, and <c>MSBuildWorkspace</c> fails to resolve even the
    /// implicit framework reference without one.
    /// </summary>
    private static async Task RestoreAsync(string projectPath)
    {
        using var restore = Process.Start(
            new ProcessStartInfo("dotnet", ["restore", projectPath])
            {
                RedirectStandardOutput = true,
                RedirectStandardError = true,
            }
        )!;
        var stdoutTask = restore.StandardOutput.ReadToEndAsync();
        var stderrTask = restore.StandardError.ReadToEndAsync();

        using var timeoutCts = new CancellationTokenSource(RestoreTimeout);
        try
        {
            await restore.WaitForExitAsync(timeoutCts.Token);
        }
        catch (OperationCanceledException)
        {
            restore.Kill(entireProcessTree: true);
            Assert.Fail(
                $"dotnet restore {projectPath} did not exit within {RestoreTimeout}; killed the process tree."
            );
        }

        Assert.That(
            restore.ExitCode,
            Is.EqualTo(0),
            $"dotnet restore failed:\nstdout:\n{await stdoutTask}\nstderr:\n{await stderrTask}"
        );
    }
}
