namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Request to create one or more books in a project.
/// </summary>
/// <remarks>
/// === NEW IN PT10 ===
/// Reason: Type definition for PAPI command contract
/// Maps to: CAP-016, data-contracts.md
/// </remarks>
public record CreateBooksRequest
{
    /// <summary>Project ID where books will be created.</summary>
    public required string ProjectId { get; init; }

    /// <summary>Array of book numbers (1-124) to create.</summary>
    public required int[] BookNumbers { get; init; }

    /// <summary>How to create the books.</summary>
    public required BookCreationMode Mode { get; init; }

    /// <summary>Model project ID (required when mode is BasedOnModel).</summary>
    public string? ModelProjectId { get; init; }
}
