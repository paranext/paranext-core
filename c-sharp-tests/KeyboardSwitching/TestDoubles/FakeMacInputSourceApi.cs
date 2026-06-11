using Paranext.DataProvider.KeyboardSwitching.Keyboarding;

namespace TestParanextDataProvider.KeyboardSwitching.TestDoubles;

/// <summary>
/// Hand-rolled configurable fake of the CAP-006 Text Input Services seam
/// (<see cref="IMacInputSourceApi"/>) so the macOS primitive's mapping and guard
/// logic is testable on any OS. Records selection calls and can be armed to throw
/// synchronously from any member (TIS interop fault / concurrent input-source
/// mutation surfacing as an exception) to verify VAL-B-04 error containment. The
/// seam is fully synchronous (TIS is a synchronous C API — plan decision D1), so no
/// faulted-task injection is needed.
/// </summary>
internal sealed class FakeMacInputSourceApi : IMacInputSourceApi
{
    /// <summary>Input sources returned by <see cref="ListInputSources"/>.</summary>
    public List<MacInputSourceDescriptor> InputSources { get; } = [];

    /// <summary>
    /// Input source ID returned by <see cref="GetCurrentInputSourceId"/>; null =
    /// cannot be determined.
    /// </summary>
    public string? CurrentInputSourceId { get; set; }

    /// <summary>Result returned by <see cref="SelectInputSource"/>.</summary>
    public bool SelectInputSourceResult { get; set; } = true;

    /// <summary>
    /// When set, every member throws this exception synchronously — models a TIS
    /// interop fault (framework load failure, CF marshaling error, concurrent
    /// input-source mutation surfacing as an exception).
    /// </summary>
    public Exception? ThrowOnAnyCall { get; set; }

    /// <summary>Every input source ID passed to <see cref="SelectInputSource"/>, in call order.</summary>
    public List<string> SelectInputSourceCalls { get; } = [];

    public IReadOnlyList<MacInputSourceDescriptor> ListInputSources()
    {
        ThrowIfArmed();
        return InputSources;
    }

    public string? GetCurrentInputSourceId()
    {
        ThrowIfArmed();
        return CurrentInputSourceId;
    }

    public bool SelectInputSource(string inputSourceId)
    {
        ThrowIfArmed();
        SelectInputSourceCalls.Add(inputSourceId);
        return SelectInputSourceResult;
    }

    private void ThrowIfArmed()
    {
        if (ThrowOnAnyCall != null)
            throw ThrowOnAnyCall;
    }
}
