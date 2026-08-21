using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// One PT9 interlinear file returned by the <c>platformScripture.Pt9Interlinear</c>
/// projectInterface: its raw text and the SHA-256 hex of the bytes that text was read from. The
/// hash is over the raw bytes, so it matches the manifest hash for the same file and a caller can
/// persist the fingerprint of exactly the content it received.
/// </summary>
public sealed record Pt9InterlinearFile(
    [property: JsonPropertyName("text")] string Text,
    [property: JsonPropertyName("sha256")] string Sha256
);
