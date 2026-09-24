using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Low-level information describing a project that Platform.Bible directly manages and uses to load
/// project data
///
/// Returned from Project Data Provider Factories in order to inform others about what projects they
/// support in what form.
/// </summary>
/// <remarks>
/// The six display fields (<see cref="Name"/>, <see cref="FullName"/>, <see cref="Language"/>,
/// <see cref="LanguageTag"/>, <see cref="IsEditable"/>, <see cref="IsPublished"/>) are populated at
/// project enumeration time (see <c>ScrTextExtensions.GetProjectDetails</c>) so the renderer can show
/// project lists (e.g. the project picker, Home) without opening a project data provider per project.
///
/// Canonical parity invariant (other docs point here): each populated value matches what the
/// corresponding <c>platform.*</c> project setting getter in
/// <c>ParatextProjectDataProvider.GetProjectSetting</c> returns today, with narrow, deliberate
/// divergences documented on <c>ScrTextExtensions</c>: enumeration never loads LDML files, so
/// LanguageTag is derived from the stored language settings directly and side-effect-free (a
/// project whose LDML is missing/corrupt keeps its stored tag instead of the getter's English
/// fallback, and no settings are mutated); and enumeration never throws per-field (a malformed
/// Editable reports false). The optional fields are omitted from the wire when unset (see each
/// property) so existing construction call sites (which don't know about display data) are
/// unaffected.
/// </remarks>
public class ProjectMetadata(
    string id,
    List<string> projectInterfaces,
    string? name = null,
    string? fullName = null,
    string? language = null,
    string? languageTag = null,
    bool? isEditable = null,
    bool? isPublished = null
)
{
    /// <summary>
    /// ID of the project (must be unique and case-insensitive)
    /// </summary>
    public string Id { get; } = id.ToUpperInvariant();

    /// <summary>
    /// Indicates what sort of project this is which implies its data shape (e.g., what data streams should be available)
    /// </summary>
    public List<string> ProjectInterfaces { get; } = projectInterfaces;

    /// <summary>
    /// Short display name of the project. Same source as the <c>platform.name</c> project setting
    /// (<c>scrText.Name</c>).
    /// </summary>
    /// <remarks>
    /// The four nullable display fields are omitted from the wire (not serialized as JSON
    /// <c>null</c>) when unset: the TS contract declares them as optional (<c>fullName?: string</c>
    /// etc.), and the repo bans <c>null</c> in TS.
    /// </remarks>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Name { get; } = name;

    /// <summary>
    /// Long/full display name of the project. Same source as the <c>platform.fullName</c> project
    /// setting. Null if that Paratext setting is not present (matching what the PDP's default would
    /// return requires live, localized extension-host state not available at enumeration time).
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? FullName { get; } = fullName;

    /// <summary>
    /// Human-readable language name of the project. Same source as the <c>platform.language</c>
    /// project setting. Null if that Paratext setting is not present (see <see cref="FullName"/>).
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Language { get; } = language;

    /// <summary>
    /// BCP-47 language tag of the project's writing system. Same value as the
    /// <c>platform.languageTag</c> project setting (see <c>ScrTextExtensions.GetLanguageTag</c>).
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? LanguageTag { get; } = languageTag;

    /// <summary>
    /// Whether the project's primary content (e.g. Scripture text) is editable. Same source as the
    /// <c>platform.isEditable</c> project setting: always <c>false</c> for resource projects,
    /// otherwise the project's <c>Editable</c> Paratext setting.
    /// </summary>
    /// <remarks>
    /// Nullable and omitted from the wire when unset (like the display strings above): the TS
    /// contract declares it optional (<c>isEditable?: boolean</c>) with "absent means the
    /// registered default (true)" semantics, which is distinct from an explicit <c>false</c>. A
    /// bare <c>new ProjectMetadata(id, interfaces)</c> therefore leaves it absent rather than
    /// silently wire-encoding <c>false</c> (which TS would read as explicitly non-editable and hide
    /// the project). See <c>ProjectMetadataWithoutFactoryInfo</c> in
    /// <c>project-metadata.model.ts</c> for the per-field absence semantics.
    /// </remarks>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsEditable { get; } = isEditable;

    /// <summary>
    /// Whether the project has been published as a read-only reference/resource. Same source as the
    /// <c>platform.isPublished</c> project setting (<c>scrText.IsResourceProject</c>).
    /// </summary>
    /// <remarks>Nullable and omitted from the wire when unset; see <see cref="IsEditable"/>.</remarks>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsPublished { get; } = isPublished;

    public override string ToString()
    {
        return $"[({Id}): {string.Join(',', ProjectInterfaces)}]";
    }
}
