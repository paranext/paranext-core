using Paranext.DataProvider.KeyboardSwitching.Keyboarding;

namespace TestParanextDataProvider.KeyboardSwitching.TestDoubles;

/// <summary>
/// Hand-rolled configurable fake of the CAP-004 user32 seam
/// (<see cref="IWindowsKeyboardLayoutApi"/>) so the Windows primitive's mapping and
/// guard logic is testable on any OS. Records activation calls and can be armed to
/// throw from any member to verify VAL-B-04 error containment.
/// </summary>
internal sealed class FakeWindowsKeyboardLayoutApi : IWindowsKeyboardLayoutApi
{
    /// <summary>HKLs returned by <see cref="GetInstalledLayouts"/>.</summary>
    public List<nint> InstalledLayouts { get; } = [];

    /// <summary>HKL returned by <see cref="GetCurrentLayout"/>; 0 = none/unknown.</summary>
    public nint CurrentLayout { get; set; }

    /// <summary>Result returned by <see cref="ActivateLayout"/>.</summary>
    public bool ActivateResult { get; set; } = true;

    /// <summary>When set, every member throws this exception (VAL-B-04 containment tests).</summary>
    public Exception? ThrowOnAnyCall { get; set; }

    /// <summary>Every HKL passed to <see cref="ActivateLayout"/>, in call order.</summary>
    public List<nint> ActivateCalls { get; } = [];

    /// <summary>Display-name lookup used by <see cref="GetLayoutDisplayName"/>.</summary>
    public Func<nint, string> DisplayNameFor { get; set; } = hkl => $"Fake Layout {(nuint)hkl:x}";

    public IReadOnlyList<nint> GetInstalledLayouts()
    {
        ThrowIfArmed();
        return InstalledLayouts;
    }

    public nint GetCurrentLayout()
    {
        ThrowIfArmed();
        return CurrentLayout;
    }

    public bool ActivateLayout(nint hkl)
    {
        ThrowIfArmed();
        ActivateCalls.Add(hkl);
        return ActivateResult;
    }

    public string GetLayoutDisplayName(nint hkl)
    {
        ThrowIfArmed();
        return DisplayNameFor(hkl);
    }

    private void ThrowIfArmed()
    {
        if (ThrowOnAnyCall != null)
            throw ThrowOnAnyCall;
    }
}
