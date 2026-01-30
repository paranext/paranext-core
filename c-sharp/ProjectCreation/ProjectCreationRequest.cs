namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Request payload for creating or updating a project.
/// Maps to BHV-105, BHV-106, EXT-003.
/// </summary>
public record ProjectCreationRequest
{
    // Basic identification
    public required string ShortName { get; init; }
    public required string FullName { get; init; }
    public string? Copyright { get; init; }

    // Language and encoding
    public required string LanguageId { get; init; }
    public int Encoding { get; init; } = 65001; // UTF-8
    public NormalizationForm NormalizationForm { get; init; } = NormalizationForm.NFC;

    // Type and relationships
    public required ProjectType ProjectType { get; init; }
    public string? BaseProjectName { get; init; }
    public string? BaseProjectGuid { get; init; }
    public string? Versification { get; init; }

    // Books
    public IReadOnlyList<string>? BooksPresent { get; init; }

    // File naming
    public string? FileNamePrePart { get; init; }
    public FileNameForm FileNameForm { get; init; } = FileNameForm.Form41MAT;
    public string? FileNamePostPart { get; init; }

    // USFM version
    public UsfmVersion UsfmVersion { get; init; } = UsfmVersion.Version3;

    // Flags
    public bool Editable { get; init; } = true;

    // Existing project (for updates)
    public string? ExistingProjectName { get; init; }
}
