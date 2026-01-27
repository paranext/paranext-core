using System.Text.Json.Serialization;

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Windows reserved filenames that cannot be used as project short names or language IDs.
/// Shared across ProjectNameService and LanguageService.
/// </summary>
internal static class ReservedNames
{
    internal static readonly HashSet<string> WindowsReservedFileNames =
        new(StringComparer.OrdinalIgnoreCase)
        {
            "CON",
            "PRN",
            "AUX",
            "NUL",
            "COM1",
            "COM2",
            "COM3",
            "COM4",
            "COM5",
            "COM6",
            "COM7",
            "COM8",
            "COM9",
            "LPT1",
            "LPT2",
            "LPT3",
            "LPT4",
            "LPT5",
            "LPT6",
            "LPT7",
            "LPT8",
            "LPT9",
        };
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ProjectType
{
    NotSelected = 0,
    Standard = 1,
    BackTranslation = 2,
    Daughter = 3,
    TransliterationManual = 4,
    TransliterationWithEncoder = 5,
    StudyBible = 6,
    ConsultantNotes = 7,
    StudyBibleAdditions = 8,
    Auxiliary = 9,
    AuxiliaryResource = 10,
    XmlResource = 11,
    XmlDictionary = 12,
    Resource = 13,
    MarbleResource = 14,
    SourceLanguage = 15,
    Dictionary = 16,
    EnhancedResource = 17,
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ProjectNormalization
{
    Undefined = 0,
    NFC = 1,
    NFD = 2,
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum RegistrationStatus
{
    NotSelected,
    Registered,
    Unregistered,
    InheritsFromBase,
    NotApplicable,
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum BookCreationMode
{
    Empty = 0,
    ChapterVerse = 1,
    BasedOnModel = 2,
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum VersificationType
{
    Unknown = 0,
    Original = 1,
    Septuagint = 2,
    Vulgate = 3,
    English = 4,
    RussianOrthodox = 5,
    RussianProtestant = 6,
}

public record ValidationResult(
    bool IsValid,
    string? ErrorCode = null,
    IReadOnlyDictionary<string, string>? ErrorParams = null
);

public record ProjectReference
{
    public required string Guid { get; init; }
    public required string ShortName { get; init; }
    public required string FullName { get; init; }
    public required VersificationType Versification { get; init; }
    public required ProjectType ProjectType { get; init; }
    public required bool IsScripture { get; init; }
    public required bool IsResource { get; init; }
    public required bool IsRegistered { get; init; }
}

public record ProjectMetadata
{
    public required string RegistryId { get; init; }
    public required string FullName { get; init; }
    public required string Visibility { get; init; }
    public string? License { get; init; }
}

public record LanguageSelection
{
    public required string LanguageId { get; init; }
    public required string LanguageName { get; init; }
    public required string BaseCode { get; init; }
    public string? Script { get; init; }
    public string? Region { get; init; }
    public string? Variant { get; init; }
}

public record ProjectTypeConfiguration
{
    public required ProjectType ProjectType { get; init; }
    public required bool BaseProjectRequired { get; init; }
    public required bool EditableDefault { get; init; }
    public required bool AutoNameFromUser { get; init; }
    public required ProjectNormalization NormalizationDefault { get; init; }
    public required bool RegistrationRequired { get; init; }
    public required bool SharesParentRegistration { get; init; }
    public required bool BooksTabVisible { get; init; }
    public required bool EncodingConverterRequired { get; init; }
    public required IReadOnlyList<ProjectType> AllowedBaseTypes { get; init; }
    public required bool IsDerivedType { get; init; }
    public required bool IsScripture { get; init; }
}

public record RegistrationState
{
    public required RegistrationStatus Status { get; init; }
    public string? MessageKey { get; init; }
    public required bool CanRegisterOnline { get; init; }
    public required bool CanOptOutOfInheritance { get; init; }
    public ProjectMetadata? Metadata { get; init; }
    public required bool RegistryServerAvailable { get; init; }
}
