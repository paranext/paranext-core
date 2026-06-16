using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

internal sealed class MarbleBookXmlSource : IMarbleBookXmlSource
{
    private readonly IReadOnlyDictionary<string, IMarblePackage> _biblePackagesByName;

    public MarbleBookXmlSource(IReadOnlyDictionary<string, IMarblePackage> biblePackagesByName)
    {
        _biblePackagesByName =
            biblePackagesByName ?? throw new ArgumentNullException(nameof(biblePackagesByName));
    }

    public string? ReadBookXml(string resourceId, int bookNum)
    {
        if (!_biblePackagesByName.TryGetValue(resourceId, out var package))
            return null;

        var bookId = Canon.BookNumberToId(bookNum, errorValue: "");
        if (string.IsNullOrEmpty(bookId))
            return null;

        var fileName = bookId + ".usx";
        if (!package.Exists(fileName))
            return null;

        return package.ReadAllText(fileName);
    }
}
