using Paratext.Data.Filters;
using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

internal sealed class InputRangesFilter<T> : LocationFilter<T>
{
    private readonly InputRange[] _inputRanges;
    private readonly List<(int min, int max)> _bcvRanges = [];

    public InputRangesFilter(InputRange[] inputRanges, GetReferencesHandler refForItem)
        : base(refForItem)
    {
        _inputRanges = inputRanges;
        foreach (var inputRange in _inputRanges)
        {
            int min = inputRange.Start.BBBCCCVVV;

            // If End was not provided, assume the end of the book
            int max = inputRange.End?.BBBCCCVVV ?? (min - (min % 1000000) + 999999);

            // If we are intending to include an entire chapter, make sure the verse value is 999
            // This will ensure the range merging logic works correctly
            if (min % 1000 == InputRange.MAX_VERSE_NUM)
                min++;
            if (max % 1000 == InputRange.MAX_VERSE_NUM)
                max++;

            _bcvRanges.Add((min, max));
        }
        _bcvRanges.Sort((a, b) => a.min.CompareTo(b.min));
        for (int i = _bcvRanges.Count - 1; i > 0; i--)
        {
            // If a range starts with chapter 1 verse 0, adjust it chapter 0 for merging purposes
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
        int bcv = reference.BBBCCCVVV;
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
