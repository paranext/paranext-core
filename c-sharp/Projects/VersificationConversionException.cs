namespace Paranext.DataProvider.Projects;

/// <summary>
/// Thrown by <see cref="VersificationConversionService.MapVerseRefBetweenProjects"/> when a
/// reference cannot be converted between two projects' versifications — either a named project's
/// versification could not be resolved (e.g. it is not a Scripture project, or is still loading), or
/// libpalaso could not map the reference. This is a best-effort, display-oriented command: callers
/// catch this, fall back to the raw reference, and do NOT cache the result (so a transient failure
/// is retried on the next navigation rather than latched for the session). An unknown source frame
/// (<c>null</c> sourceProjectId) is NOT a failure — that reference is returned unchanged.
/// </summary>
public class VersificationConversionException(
    string? sourceProjectId,
    string targetProjectId,
    string reason,
    Exception? innerException = null
)
    : Exception(
        $"Could not convert reference from project {sourceProjectId ?? "(unknown)"} to project "
            + $"{targetProjectId}: {reason}",
        innerException
    )
{
    /// <summary>Project whose versification the reference was expressed in, if known.</summary>
    public string? SourceProjectId { get; } = sourceProjectId;

    /// <summary>Project whose versification the reference was to be converted into.</summary>
    public string TargetProjectId { get; } = targetProjectId;
}
