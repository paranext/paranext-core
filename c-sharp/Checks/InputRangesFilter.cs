using Paratext.Data.Filters;
using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

internal sealed class InputRangesFilter<T> : LocationFilter<T>
{
    private readonly InputRange[] _inputRanges;
    private readonly List<(int min, int max)> _bcvRanges = [];

    /// <summary>
    /// Convert a VerseRef to a comparable integer, handling the special case of verse/chapter 999.
    /// VerseRef.BBBCCCVVV normalizes 999 in a way that doesn't work for our purposes, so we need
    /// to create our own representation.
    /// </summary>
    private static int ToComparableBCV(VerseRef vref)
    {
        int bookNum = vref.BookNum;
        int chapterNum = vref.ChapterNum;
        int verseNum = vref.VerseNum;

        if (
            bookNum < 0
            || bookNum > 999
            || chapterNum < 0
            || chapterNum > 999
            || verseNum < 0
            || verseNum > 999
        )
            throw new ArgumentOutOfRangeException(
                nameof(vref),
                "Book, Chapter, and Verse numbers must be between 0 and 999 inclusive"
            );

        return (bookNum * 1000000) + (chapterNum * 1000) + verseNum;
    }

    public InputRangesFilter(InputRange[] inputRanges, GetReferencesHandler refForItem)
        : base(refForItem)
    {
        _inputRanges = inputRanges;
        foreach (var inputRange in _inputRanges)
        {
            int min = ToComparableBCV(inputRange.Start);
            int max = inputRange.End.HasValue ? ToComparableBCV(inputRange.End.Value) : min;
            _bcvRanges.Add((min, max));
        }
        _bcvRanges.Sort((a, b) => a.min.CompareTo(b.min));
        for (int i = _bcvRanges.Count - 1; i > 0; i--)
        {
            // If a range starts with chapter 1 verse 0, adjust it to chapter 0 for merging purposes
            int adjustedMin = _bcvRanges[i].min;
            if (adjustedMin % 1000000 == 1000)
                adjustedMin -= 1000;
            // If the ranges overlap or are contiguous, merge them
            if (adjustedMin <= _bcvRanges[i - 1].max + 1)
            {
                int mergedMin = _bcvRanges[i - 1].min;
                int mergedMax = Math.Max(_bcvRanges[i - 1].max, _bcvRanges[i].max);
                _bcvRanges[i - 1] = (mergedMin, mergedMax);
                _bcvRanges.RemoveAt(i);
            }
        }
    }

    // Not used in Paratext 10
    public override CustomLocationFilterBase FilterState => throw new NotImplementedException();

    // Not used in Paratext 10
    public override string Description => throw new NotImplementedException();

    // Not used in Paratext 10
    public override string Tooltip => throw new NotImplementedException();

    public override bool IsFactoryFilter => false;

    // Exposed for testing
    public int RangeCount => _bcvRanges.Count;

    public override bool Accept(T item)
    {
        var references = refForItem(item);
        return references.Any(AcceptReference);
    }

    public override bool AcceptReference(VerseRef reference)
    {
        int bcv = ToComparableBCV(reference);
        return _bcvRanges.Any((range) => bcv >= range.min && bcv <= range.max);
    }

    public override LocationFilter<T> Clone()
    {
        return new InputRangesFilter<T>(_inputRanges, refForItem);
    }

    public override bool RefChangesFilteredItems(VerseRef verseRef, bool projectTextChanged)
    {
        // Filter doesn't change when the VerseRef changes
        return false;
    }

    public override void Update(VerseRef verseRef, bool projectTextChanged)
    {
        // Filter doesn't change when the VerseRef changes
    }

    protected override bool Equals(LocationFilter<T> other)
    {
        if (other is not InputRangesFilter<T> otherFilter)
            return false;
        if (_inputRanges.Length != otherFilter._inputRanges.Length)
            return false;

        for (int i = 0; i < _inputRanges.Length; i++)
        {
            if (!_inputRanges[i].Equals(otherFilter._inputRanges[i]))
                return false;
        }

        return true;
    }
}
