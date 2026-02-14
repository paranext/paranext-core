namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Error codes for book operations.
/// </summary>
/// <remarks>
/// === NEW IN PT10 ===
/// Reason: Type definition for PAPI command contract error handling
/// Maps to: CAP-016, data-contracts.md
/// </remarks>
public enum BookErrorCode
{
    /// <summary>User does not have permission for the operation.</summary>
    PermissionDenied,

    /// <summary>Could not obtain write lock for project.</summary>
    LockNotObtained,

    /// <summary>Book number is invalid (outside 1-124 range).</summary>
    InvalidBookNumber,

    /// <summary>Book does not exist in project.</summary>
    BookNotFound,

    /// <summary>Book already exists in project.</summary>
    BookAlreadyExists,

    /// <summary>Invalid USFM content.</summary>
    InvalidUsfm,

    /// <summary>Chapter-related error.</summary>
    ChapterError,

    /// <summary>File encoding is incompatible.</summary>
    EncodingError,

    /// <summary>Book does not exist in model project.</summary>
    ModelBookMissing,

    /// <summary>Model project not selected when required.</summary>
    ModelNotSelected,

    /// <summary>Project types are incompatible for operation.</summary>
    ProjectTypeIncompatible,

    /// <summary>Validation failed.</summary>
    ValidationFailed,

    /// <summary>Project not found.</summary>
    ProjectNotFound,
}
