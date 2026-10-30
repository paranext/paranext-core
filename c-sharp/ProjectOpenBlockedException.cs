namespace Paranext.DataProvider;

/// <summary>
/// Thrown when something asks for the Scripture text of a project that Platform.Bible can't open,
/// such as a Study Bible Additions project. See <c>ScrTextExtensions.ThrowIfOpenBlocked</c>.
/// </summary>
/// <remarks>
/// IMPORTANT: TypeScript depends on the shape of this message. It ends with the reason's localize
/// key, one space, then <see cref="Sentinel"/>:
/// <c>Project 'ABC123' can't be opened in Platform.Bible: %project_unsupported_studyBibleAdditions% (PROJECT_OPEN_BLOCKED)</c>.
/// The UI detects the refusal by the sentinel and shows the localized form of the key just before
/// it. The words before the key may change; the key and the sentinel must stay last.
/// <c>OpenBlockedReasonTests</c> pins this.
/// <para>
/// It also carries <see cref="PlatformErrorCodes.FailedPrecondition"/> in <c>Exception.Data</c>, for
/// C# callers that read it with <see cref="PlatformErrorCodes.TryGetCode"/>. The code also crosses
/// JSON-RPC (see <c>PapiJsonRpc</c>), but TypeScript still keys on <see cref="Sentinel"/>, because
/// <c>FAILED_PRECONDITION</c> alone does not identify this refusal.
/// </para>
/// </remarks>
public class ProjectOpenBlockedException : InvalidOperationException
{
    /// <summary>
    /// Marks every message of this exception. Stable: TypeScript matches it.
    /// </summary>
    public const string Sentinel = "(PROJECT_OPEN_BLOCKED)";

    public ProjectOpenBlockedException(string projectId, string reasonKey)
        : base($"Project '{projectId}' can't be opened in Platform.Bible: {reasonKey} {Sentinel}")
    {
        ProjectId = projectId;
        ReasonKey = reasonKey;
        Data[PlatformErrorCodes.PlatformErrorCodeDataKey] = PlatformErrorCodes.FailedPrecondition;
    }

    /// <summary>
    /// The ID of the project that can't be opened.
    /// </summary>
    public string ProjectId { get; }

    /// <summary>
    /// Why the project can't be opened, as a localize key.
    /// </summary>
    public string ReasonKey { get; }
}
