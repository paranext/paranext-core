using Paranext.DataProvider.Scripture;
using SIL.Scripture;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// A scripture range used by <see cref="CommentThreadSelector"/> to filter note threads — the
/// canonical <see cref="ScriptureRange"/> plus an optional <see cref="Granularity"/>
/// (<c>"verse"</c> — the default — <c>"chapter"</c>, or <c>"book"</c>) consumed by note-thread
/// matching. Constructed by <c>CommentThreadSelectorConverter</c>. <c>End</c> is nullable
/// (inherited from the canonical range); the converter always supplies it.
/// </summary>
public sealed record CommentScriptureRange(VerseRef Start, VerseRef? End, string? Granularity)
    : ScriptureRange(Start, End);
