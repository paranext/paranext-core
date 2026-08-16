using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Text.RegularExpressions;

namespace TestParanextDataProvider;

/// <summary>
/// Enforcement test: every Paratext-published NuGet package (<c>ParatextData</c>,
/// <c>ParatextChecks</c>) must be pinned to the SAME version in every project file in the repo.
/// </summary>
/// <remarks>
/// <c>ParatextChecks</c> is built from the same Paratext 9 source tree as <c>ParatextData</c> and
/// references its types, so a mismatched pair is an ABI hazard rather than a cosmetic
/// inconsistency. The pins also live in more than one file, which makes a partial bump an easy
/// mistake to make and a hard one to spot in review — this test turns that into a red build.
/// </remarks>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class ParatextPackagePinTests
{
    private static readonly string[] s_projectFilesToCheck =
    [
        Path.Combine("c-sharp", "ParanextDataProvider.csproj"),
        Path.Combine("c-sharp-tests", "c-sharp-tests.csproj"),
    ];

    private static readonly Regex s_paratextPackageReference =
        new(
            @"<PackageReference\s+Include=""(?<id>Paratext[A-Za-z]*)""\s+Version=""(?<version>[^""]+)""",
            RegexOptions.Compiled
        );

    [Test]
    public void AllParatextPackagePins_UseTheSameVersion()
    {
        var repoRoot = ResolveRepoRoot();
        var pins = new List<(string File, string Package, string Version)>();

        foreach (var relativePath in s_projectFilesToCheck)
        {
            var fullPath = Path.Combine(repoRoot, relativePath);
            Assert.That(
                File.Exists(fullPath),
                Is.True,
                $"Expected to find a project file at '{fullPath}'."
            );

            foreach (Match match in s_paratextPackageReference.Matches(File.ReadAllText(fullPath)))
            {
                pins.Add((relativePath, match.Groups["id"].Value, match.Groups["version"].Value));
            }
        }

        Assert.That(
            pins,
            Is.Not.Empty,
            "Found no Paratext* PackageReference entries. Either the pins moved to a file this "
                + "test does not know about, or the PackageReference format changed — update "
                + "s_projectFilesToCheck / s_paratextPackageReference."
        );

        var distinctVersions = pins.Select(pin => pin.Version)
            .Distinct(StringComparer.Ordinal)
            .ToList();

        Assert.That(
            distinctVersions,
            Has.Count.EqualTo(1),
            "Paratext package pins must move in lockstep. Found:\n"
                + string.Join(
                    "\n",
                    pins.Select(pin => $"  {pin.File}: {pin.Package} = {pin.Version}")
                )
        );
    }

    private static string ResolveRepoRoot()
    {
        string? walk = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
        for (var i = 0; i < 10 && walk != null; i++)
        {
            if (
                Directory.Exists(Path.Combine(walk, "c-sharp"))
                && Directory.Exists(Path.Combine(walk, "c-sharp-tests"))
            )
                return Path.GetFullPath(walk);
            walk = Path.GetDirectoryName(walk);
        }

        Assert.Fail(
            "Could not locate the repository root by walking up from the test assembly at "
                + $"'{Assembly.GetExecutingAssembly().Location}'."
        );
        return string.Empty; // unreachable; Assert.Fail throws
    }
}
