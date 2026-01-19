namespace Paranext.DataProvider.CreatingProjects
{
    /// <summary>
    /// Error codes for project name validation.
    /// </summary>
    public enum ValidationErrorCode
    {
        /// <summary>
        /// Name length is outside valid range (3-8 characters).
        /// </summary>
        InvalidLength,

        /// <summary>
        /// Name contains a space character.
        /// </summary>
        ContainsSpace,

        /// <summary>
        /// Name contains an invalid character (not A-Z, a-z, 0-9, or underscore).
        /// </summary>
        InvalidCharacter,

        /// <summary>
        /// Name exactly matches an existing project name.
        /// </summary>
        DuplicateName,

        /// <summary>
        /// Name matches an existing project name when compared case-insensitively.
        /// </summary>
        CaseInsensitiveDuplicate,

        /// <summary>
        /// A folder with this name already exists in the projects directory.
        /// </summary>
        ExistingFolder,

        /// <summary>
        /// Name is a Windows reserved name (CON, PRN, AUX, NUL, COM1-9, LPT1-9).
        /// </summary>
        ReservedName,
    }

    /// <summary>
    /// Result of project name validation.
    /// </summary>
    /// <seealso cref="EXT-007 in extraction-plan.md"/>
    public record ValidationResult
    {
        /// <summary>
        /// Whether the validation passed.
        /// </summary>
        public bool IsValid { get; init; }

        /// <summary>
        /// Error code if validation failed, null if successful.
        /// </summary>
        public ValidationErrorCode? ErrorCode { get; init; }

        /// <summary>
        /// Additional error details (e.g., the specific invalid character found).
        /// </summary>
        public string? ErrorDetails { get; init; }

        /// <summary>
        /// Creates a successful validation result.
        /// </summary>
        public static ValidationResult Success() => new() { IsValid = true };

        /// <summary>
        /// Creates a failed validation result with the specified error.
        /// </summary>
        /// <param name="code">The error code indicating what failed</param>
        /// <param name="details">Optional additional details about the error</param>
        public static ValidationResult Error(ValidationErrorCode code, string? details = null) =>
            new()
            {
                IsValid = false,
                ErrorCode = code,
                ErrorDetails = details,
            };
    }
}
