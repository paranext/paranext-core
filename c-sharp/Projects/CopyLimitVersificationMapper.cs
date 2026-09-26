using System.Collections.Concurrent;
using SIL.Scripture;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Re-indexes per-chapter copy limits from a project's own versification into the versification a
/// caller works in.
/// </summary>
internal static class CopyLimitVersificationMapper
{
    /// <summary>
    /// Maps the copy limits of <paramref name="bookNum"/>, indexed by chapter in
    /// <paramref name="projectVersification"/>, to an array indexed by chapter in
    /// <paramref name="requestVersification"/> (index 0 unused). Each requested chapter takes the
    /// smallest limit among the project chapters its verses map to, in whichever book each verse
    /// lands in, and among the project chapters, of any book, whose own verses map into it; it has
    /// no limit (<c>null</c>) only if none of those chapters has one.
    /// </summary>
    /// <param name="getProjectLimits">
    /// Returns the copy limits of a book, indexed by chapter in
    /// <paramref name="projectVersification"/>, or <c>null</c> if the book has no limit. Called at
    /// most once per book, and only for books with verses that map into or out of
    /// <paramref name="bookNum"/>.
    /// </param>
    /// <param name="bookNum">The book being requested.</param>
    /// <param name="projectVersification">The project's own versification.</param>
    /// <param name="requestVersification">The versification the caller works in.</param>
    /// <returns>
    /// <c>null</c> if no book the requested chapters map to has limits; the limits of
    /// <paramref name="bookNum"/> themselves if the two versifications are the same; otherwise a
    /// new array.
    /// </returns>
    internal static int?[]? MapToVersification(
        Func<int, int?[]?> getProjectLimits,
        int bookNum,
        ScrVers projectVersification,
        ScrVers requestVersification
    )
    {
        if (projectVersification == requestVersification)
            return getProjectLimits(bookNum);

        var limitsByBook = new Dictionary<int, int?[]?>();
        int?[]? LimitsOf(int book)
        {
            if (!limitsByBook.TryGetValue(book, out var limits))
            {
                limits = getProjectLimits(book);
                limitsByBook[book] = limits;
            }
            return limits;
        }

        var requestLimits = new int?[requestVersification.GetLastChapter(bookNum) + 1];
        var topology = GetTopology(projectVersification, requestVersification);
        // The mapping is not always symmetric, so a request chapter takes the limits of the project
        // chapters its own verses map to, and of the project chapters whose verses map into it.
        var links = topology
            .RequestToProject(bookNum)
            .Concat(topology.ProjectToRequest(bookNum))
            .Where(link => link.RequestChapter >= 1 && link.RequestChapter < requestLimits.Length);
        foreach (var (requestChapter, projectBook, projectChapter) in links)
        {
            if (
                LimitAt(LimitsOf(projectBook), projectChapter) is int limit
                && (requestLimits[requestChapter] == null || limit < requestLimits[requestChapter])
            )
                requestLimits[requestChapter] = limit;
        }
        return limitsByBook.Values.All(limits => limits == null) ? null : requestLimits;
    }

    /// <summary>
    /// A request chapter of some book, and a project chapter it shares at least one verse with.
    /// </summary>
    private readonly record struct ChapterLink(
        int RequestChapter,
        int ProjectBook,
        int ProjectChapter
    );

    /// <summary>
    /// Which chapters share verses between a project versification and a request versification.
    /// It depends only on the two versifications, not on any limit, so it is kept per pair.
    /// </summary>
    private sealed class VersificationTopology(
        ScrVers projectVersification,
        ScrVers requestVersification
    )
    {
        private readonly ConcurrentDictionary<int, ChapterLink[]> _requestToProject = new();
        private readonly Lazy<Dictionary<int, ChapterLink[]>> _projectToRequest =
            new(() => MapProjectVerses(projectVersification, requestVersification));

        /// <summary>
        /// The project chapters each verse of request book <paramref name="bookNum"/> maps to.
        /// </summary>
        public ChapterLink[] RequestToProject(int bookNum) =>
            _requestToProject.GetOrAdd(
                bookNum,
                book => MapRequestVerses(book, projectVersification, requestVersification)
            );

        /// <summary>
        /// The project chapters, of any canonical book, with verses that map into request book
        /// <paramref name="bookNum"/>.
        /// </summary>
        public ChapterLink[] ProjectToRequest(int bookNum) =>
            _projectToRequest.Value.TryGetValue(bookNum, out var links) ? links : [];

        private static ChapterLink[] MapRequestVerses(
            int bookNum,
            ScrVers projectVersification,
            ScrVers requestVersification
        )
        {
            var links = new HashSet<ChapterLink>();
            int lastChapter = requestVersification.GetLastChapter(bookNum);
            for (int chapter = 1; chapter <= lastChapter; chapter++)
            {
                int lastVerse = requestVersification.GetLastVerse(bookNum, chapter);
                for (int verse = 1; verse <= lastVerse; verse++)
                {
                    var verseRef = new VerseRef(bookNum, chapter, verse, requestVersification);
                    verseRef.ChangeVersification(projectVersification);
                    links.Add(new ChapterLink(chapter, verseRef.BookNum, verseRef.ChapterNum));
                }
            }
            return [.. links];
        }

        private static Dictionary<int, ChapterLink[]> MapProjectVerses(
            ScrVers projectVersification,
            ScrVers requestVersification
        )
        {
            var linksByRequestBook = new Dictionary<int, HashSet<ChapterLink>>();
            // Only canonical books: the other book numbers are placeholders with huge ranges.
            for (int book = 1; book <= Canon.LastBook; book++)
            {
                if (!Canon.IsCanonical(book))
                    continue;
                int lastChapter = projectVersification.GetLastChapter(book);
                for (int chapter = 1; chapter <= lastChapter; chapter++)
                {
                    int lastVerse = projectVersification.GetLastVerse(book, chapter);
                    for (int verse = 1; verse <= lastVerse; verse++)
                    {
                        var verseRef = new VerseRef(book, chapter, verse, projectVersification);
                        verseRef.ChangeVersification(requestVersification);
                        if (!linksByRequestBook.TryGetValue(verseRef.BookNum, out var links))
                        {
                            links = [];
                            linksByRequestBook[verseRef.BookNum] = links;
                        }
                        links.Add(new ChapterLink(verseRef.ChapterNum, book, chapter));
                    }
                }
            }
            return linksByRequestBook.ToDictionary(
                entry => entry.Key,
                entry => entry.Value.ToArray()
            );
        }
    }

    /// <summary>
    /// Topologies of built-in versification pairs. A customized versification can change while the
    /// app runs, so its topology is built for each request instead.
    /// </summary>
    private static readonly ConcurrentDictionary<
        (string ProjectVersification, string RequestVersification),
        VersificationTopology
    > s_topologies = new();

    private static VersificationTopology GetTopology(
        ScrVers projectVersification,
        ScrVers requestVersification
    )
    {
        if (projectVersification.IsCustomized || requestVersification.IsCustomized)
            return new VersificationTopology(projectVersification, requestVersification);
        return s_topologies.GetOrAdd(
            (projectVersification.Name, requestVersification.Name),
            _ => new VersificationTopology(projectVersification, requestVersification)
        );
    }

    /// <summary>
    /// The entry of <paramref name="limits"/> for <paramref name="chapter"/>, or <c>null</c> if
    /// <paramref name="limits"/> is <c>null</c> or has no such chapter.
    /// </summary>
    private static int? LimitAt(int?[]? limits, int chapter) =>
        limits != null && chapter >= 1 && chapter < limits.Length ? limits[chapter] : null;
}
