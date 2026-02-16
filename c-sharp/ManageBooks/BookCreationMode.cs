namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Mode for creating a new book.
/// </summary>
/// <remarks>
/// === NEW IN PT10 ===
/// Reason: Type definition for PAPI command contract
/// Maps to: CAP-016, data-contracts.md
/// </remarks>
public enum BookCreationMode
{
    /// <summary>Create empty book with \id line only.</summary>
    Empty = 0,

    /// <summary>Create book with chapter and verse markers based on versification.</summary>
    WithCV = 1,

    /// <summary>Create book based on structure from a model project.</summary>
    BasedOnModel = 2,
}
