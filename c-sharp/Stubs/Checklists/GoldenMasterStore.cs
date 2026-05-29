using System.Reflection;
using System.Text.Json;
using System.Text.RegularExpressions;
using SIL.Scripture;

namespace Paranext.DataProvider.Stubs.Checklists;

/// <summary>
/// Loads the punctuation golden-master <c>expected-output.json</c> fixtures (embedded resources) and
/// translates a matched scenario into the live CL* model. Backs the <see cref="CLDataSource"/> stub.
/// </summary>
/// <remarks>
/// Depends on: ParatextChecks relocated checklist data logic (not yet shipped)
/// Created: 2026-05-29
/// Replace when: ParatextChecks ships the relocated checklist data logic
///
/// Matching mechanism: fixtures are keyed by scenario id (e.g. "gm-001"). The
/// <see cref="CLDataSource"/> stub looks up a scenario by finding the id token embedded in the first
/// project's <c>ScrText.Name</c>. This keeps the public BuildRows signature identical to PT9 while
/// avoiding the need to fabricate real USFM-loaded projects: a test simply names its
/// <c>DummyScrText</c> after the scenario it wants to replay.
/// </remarks>
internal static class GoldenMasterStore
{
    private const string ExpectedOutputSuffix = ".expected-output.json";

    // Scenario id "gm-NNN" embedded in resource names / project names. MSBuild rewrites hyphens to
    // underscores in embedded-resource logical names (golden-masters -> golden_masters,
    // gm-001-... -> gm_001_...), so the separator class accepts both '-' and '_'.
    private static readonly Regex s_scenarioIdRegex =
        new(@"gm[-_](\d+)", RegexOptions.Compiled | RegexOptions.IgnoreCase);

    private static readonly JsonSerializerOptions s_jsonOptions =
        new() { PropertyNameCaseInsensitive = true };

    // Lazily-built map of scenario id (e.g. "gm-001") -> embedded resource name.
    private static readonly Lazy<Dictionary<string, string>> s_resourcesByScenarioId =
        new(BuildResourceIndex);

    /// <summary>
    /// Finds the scenario whose id token appears in <paramref name="scrTextName"/> and returns the
    /// captured rows translated into the CL* model, or <c>null</c> if no scenario matches.
    /// </summary>
    public static GoldenReplay? TryGetReplayForScrTextName(
        string? scrTextName,
        ScrVers versification
    )
    {
        if (string.IsNullOrEmpty(scrTextName))
            return null;

        // The scenario id is embedded in the project name (e.g. "gm-001-cell-shape<hexid>").
        var scenarioId = ExtractScenarioId(scrTextName);
        if (scenarioId == null)
            return null;

        var index = s_resourcesByScenarioId.Value;
        if (!index.TryGetValue(scenarioId, out var resourceName))
            return null;

        var output = LoadOutput(resourceName);
        if (output?.Output == null)
            return null;

        return TranslateOutput(scenarioId, output.Output, versification);
    }

    private static GoldenReplay TranslateOutput(
        string scenarioId,
        GoldenOutput output,
        ScrVers versification
    )
    {
        var rows = new List<CLRow>();
        foreach (var goldenRow in output.Rows ?? [])
        {
            var row = new CLRow { IsMatch = goldenRow.IsMatch };
            foreach (var goldenCell in goldenRow.Cells ?? [])
            {
                row.Cells.Add(TranslateCell(goldenCell, versification));
            }
            rows.Add(row);
        }

        return new GoldenReplay(scenarioId, rows, output.ExcludedCount);
    }

    private static CLCell TranslateCell(GoldenCell goldenCell, ScrVers versification)
    {
        // Punctuation scenarios always produce CLPunctuationCells; populate the sequence key.
        var cell = new CLPunctuationCell
        {
            ScrTextName = goldenCell.ScrTextName,
            Language = goldenCell.Language,
            PunctuationSequence = goldenCell.PunctuationSequence,
        };

        if (
            !string.IsNullOrEmpty(goldenCell.Reference)
            && VerseRef.TryParse(goldenCell.Reference, out var vref)
        )
        {
            vref.Versification = versification;
            // Set Reference/DisplayedReference via the VerseRef property to mirror PT9 wiring.
            cell.VerseRef = vref;
        }
        else
        {
            cell.Reference = goldenCell.Reference ?? "";
        }

        foreach (var goldenPara in goldenCell.Paragraphs ?? [])
        {
            cell.Paragraphs.Add(TranslateParagraph(goldenPara));
        }

        return cell;
    }

    private static CLParagraph TranslateParagraph(GoldenParagraph goldenPara)
    {
        var paragraph = new CLParagraph { Marker = goldenPara.Marker };
        foreach (var item in goldenPara.Items ?? [])
        {
            var translated = TranslateItem(item);
            if (translated != null)
                paragraph.Items.Add(translated);
        }
        return paragraph;
    }

    private static CLParagraphContents? TranslateItem(GoldenItem item)
    {
        return item.Type switch
        {
            "CLText" => new CLText(item.Text ?? "", item.Marker ?? ""),
            "CLVerse" => new CLVerse(
                item.ScrTextName ?? "",
                item.Book ?? "",
                item.Chapter ?? "",
                item.Verse ?? "",
                item.ShowInDisplay
            ),
            "CLLink" => new CLLink { Reference = item.Reference, LinkText = item.LinkText },
            "CLEditLink" => new CLEditLink
            {
                Reference = item.Reference,
                EditLinkText = item.EditLinkText,
            },
            "CLParagraphMarker" => new CLParagraphMarker { Marker = item.Marker ?? "" },
            _ => null,
        };
    }

    private static GoldenExpectedOutput? LoadOutput(string resourceName)
    {
        var assembly = typeof(GoldenMasterStore).Assembly;
        using var stream = assembly.GetManifestResourceStream(resourceName);
        if (stream == null)
            return null;
        return JsonSerializer.Deserialize<GoldenExpectedOutput>(stream, s_jsonOptions);
    }

    private static Dictionary<string, string> BuildResourceIndex()
    {
        var index = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        var assembly = typeof(GoldenMasterStore).Assembly;
        foreach (var resourceName in assembly.GetManifestResourceNames())
        {
            if (!resourceName.EndsWith(ExpectedOutputSuffix, StringComparison.OrdinalIgnoreCase))
                continue;

            var scenarioId = ExtractScenarioId(resourceName);
            if (scenarioId != null)
                index[scenarioId] = resourceName;
        }
        return index;
    }

    /// <summary>
    /// Extracts the canonical "gm-NNN" scenario id from a string that contains it (an embedded
    /// resource name such as "...golden_masters.gm_001_cell_shape.expected-output.json", or a project
    /// name such as "gm-001-cell-shape&lt;hexid&gt;"). Always returns the hyphenated canonical form.
    /// </summary>
    private static string? ExtractScenarioId(string value)
    {
        var match = s_scenarioIdRegex.Match(value);
        return match.Success ? $"gm-{match.Groups[1].Value}" : null;
    }
}
