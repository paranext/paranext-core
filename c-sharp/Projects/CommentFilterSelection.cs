using System.Xml.Linq;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// One user's comment-filter selection for one project. Stored per user in
/// <c>{projectDirectory}/Extensions/UserSettings-{userId}.xml</c>, so two people on the same
/// project keep independent selections.
/// </summary>
public record CommentFilterSelection
{
    /// <summary>The current data version written for a new or updated selection.</summary>
    public const string CurrentDataVersion = "1.0.0";

    /// <summary>
    /// Not serialized by <see cref="ToXml"/>/<see cref="FromXml"/>: the schema version travels
    /// alongside the <c>&lt;Items&gt;</c> element as <see cref="UserProjectSettings"/>'s own
    /// <c>dataSchemaVersion</c> attribute (see <see cref="UserProjectSettings.GetSetting"/> /
    /// <see cref="UserProjectSettings.SetSetting"/>), the same split <see cref="ResourceReferenceList"/>
    /// uses. This property carries the version between the provider and that store.
    /// </summary>
    public string DataVersion { get; init; } = CurrentDataVersion;

    /// <summary>The named filter preset, e.g. <c>unresolved</c>. Defaults to <c>all</c>.</summary>
    public string Preset { get; init; } = "all";

    /// <summary>The Scripture scope, e.g. <c>current-chapter</c>. Defaults to <c>all-books</c>.</summary>
    public string ScopeFilter { get; init; } = "all-books";

    /// <summary>Serializes a <see cref="CommentFilterSelection"/> to an <c>&lt;Items&gt;</c> XElement.</summary>
    public static XElement ToXml(CommentFilterSelection selection) =>
        new(
            "Items",
            new XElement("Preset", selection.Preset),
            new XElement("ScopeFilter", selection.ScopeFilter)
        );

    /// <summary>
    /// Reads a selection, pairing it with the schema version it was stored under. An absent
    /// <c>Preset</c> or <c>ScopeFilter</c> element falls back to the default view. A present
    /// element's value — including an empty one, and one this build does not recognize — is
    /// passed through as-is rather than validated: the preset set lives in TypeScript, and the
    /// frontend owns resolving an unrecognized value to its default.
    /// </summary>
    public static CommentFilterSelection FromXml(XElement? items, string dataVersion) =>
        new()
        {
            DataVersion = dataVersion,
            Preset = items?.Element("Preset")?.Value ?? "all",
            ScopeFilter = items?.Element("ScopeFilter")?.Value ?? "all-books",
        };
}
