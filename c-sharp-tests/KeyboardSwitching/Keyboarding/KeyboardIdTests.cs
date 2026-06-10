using Paranext.DataProvider.KeyboardSwitching.Keyboarding;

namespace TestParanextDataProvider.KeyboardSwitching.Keyboarding;

/// <summary>
/// CAP-001: KeyboardId normalized format + per-platform translation helpers.
/// PT10-only design (no PT9 TS-XXX / BHV-XXX) — these tests ARE the format specification.
/// Format: "win:&lt;hkl-hex&gt;" / "ibus:&lt;engine&gt;" / "mac:&lt;bundle&gt;"
/// (backend-alignment.md §Cross-Platform Keyboarding, Risks table).
/// Opaque-string semantics per INV-C07 (data-contracts.md §2.1): only KeyboardId.cs may
/// mint/parse this format; unknown prefixes must be tolerated without data loss.
/// </summary>
[TestFixture]
public class KeyboardIdTests
{
    // ===================================================================================
    // Outer acceptance test (Outside-In TDD done signal for CAP-001)
    // ===================================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-001")]
    [Property("InvariantId", "INV-C07")]
    [Description(
        "Acceptance test: KeyboardId parses and round-trips each platform marker; "
            + "opaque string semantics preserved"
    )]
    public void KeyboardId_AcceptanceTest_RoundTripsAllPlatformMarkersAndPreservesOpaqueSemantics()
    {
        // Windows: HKL -> "win:<hkl-hex>" -> HKL, losslessly
        nint hkl = 0x04090409;
        string winId = KeyboardId.FromWindowsHkl(hkl);
        Assert.That(winId, Is.EqualTo("win:4090409"));
        Assert.That(KeyboardId.TryGetWindowsHkl(winId, out nint hklRoundTripped), Is.True);
        Assert.That(hklRoundTripped, Is.EqualTo(hkl));

        // Linux: IBus engine -> "ibus:<engine>" -> engine, losslessly (colons preserved)
        const string engine = "xkb:us::eng";
        string ibusId = KeyboardId.FromIbusEngine(engine);
        Assert.That(ibusId, Is.EqualTo("ibus:xkb:us::eng"));
        Assert.That(KeyboardId.TryGetIbusEngine(ibusId, out string engineRoundTripped), Is.True);
        Assert.That(engineRoundTripped, Is.EqualTo(engine));

        // macOS: input source -> "mac:<bundle>" -> input source, losslessly
        const string inputSource = "com.apple.keylayout.US";
        string macId = KeyboardId.FromMacInputSource(inputSource);
        Assert.That(macId, Is.EqualTo("mac:com.apple.keylayout.US"));
        Assert.That(
            KeyboardId.TryGetMacInputSource(macId, out string inputSourceRoundTripped),
            Is.True
        );
        Assert.That(inputSourceRoundTripped, Is.EqualTo(inputSource));

        // Opaque semantics: an unknown platform prefix is not owned by any helper —
        // every TryGet returns false WITHOUT throwing, and the id itself is untouched
        // (no normalization path exists that could mangle it).
        const string foreignId = "fcitx:pinyin";
        Assert.That(KeyboardId.TryGetWindowsHkl(foreignId, out _), Is.False);
        Assert.That(KeyboardId.TryGetIbusEngine(foreignId, out _), Is.False);
        Assert.That(KeyboardId.TryGetMacInputSource(foreignId, out _), Is.False);
    }

    // ===================================================================================
    // Windows: HKL <-> "win:<hkl-hex>"
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    public void FromWindowsHkl_WithTypicalHkl_FormatsAsLowercaseUnpaddedHex()
    {
        // 0x04090409 = en-US layout on en-US locale; leading zero NOT padded, hex lowercase.
        Assert.That(KeyboardId.FromWindowsHkl(0x04090409), Is.EqualTo("win:4090409"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    public void FromWindowsHkl_WithZeroHkl_ThrowsArgumentException()
    {
        // HKL 0 is a NULL handle — minting an id for it would smuggle an invalid
        // keyboard through the opaque layer (plan decision D4).
        Assert.That(() => KeyboardId.FromWindowsHkl(0), Throws.InstanceOf<ArgumentException>());
    }

    [TestCase(0x04090409L)] // typical en-US HKL
    [TestCase(0x0000040DL)] // Hebrew layout, small value (leading zeros in 32-bit form)
    [TestCase(0xF0010409L)] // IME-style HKL with high bit set in low DWORD
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("InvariantId", "INV-C07")]
    public void TryGetWindowsHkl_AfterFromWindowsHkl_RoundTripsLosslessly(long hklValue)
    {
        var hkl = (nint)hklValue;

        string keyboardId = KeyboardId.FromWindowsHkl(hkl);

        Assert.That(KeyboardId.TryGetWindowsHkl(keyboardId, out nint roundTripped), Is.True);
        Assert.That(roundTripped, Is.EqualTo(hkl));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("InvariantId", "INV-C07")]
    public void TryGetWindowsHkl_WithNegativeHkl_RoundTripsLosslessly()
    {
        // Sign-extended HKLs occur on 64-bit Windows. The round-trip must not lose the
        // sign extension (CAP-001 success criterion: "no information loss"). Tested as a
        // round-trip property — the string form depends on native pointer width, so no
        // literal is asserted here (plan decision D2).
        nint hkl = -1;

        string keyboardId = KeyboardId.FromWindowsHkl(hkl);

        Assert.That(KeyboardId.TryGetWindowsHkl(keyboardId, out nint roundTripped), Is.True);
        Assert.That(roundTripped, Is.EqualTo(hkl));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    public void TryGetWindowsHkl_WithUppercaseHexDigits_ParsesCaseInsensitively()
    {
        // Canonical emission is lowercase, but parse tolerates uppercase hex digits —
        // ids may round-trip through user-edited settings files (plan decision D3).
        Assert.That(KeyboardId.TryGetWindowsHkl("win:F0010409", out nint hkl), Is.True);
        // unchecked: silences CS8778 — on a 32-bit nint this constant conversion would wrap,
        // which is exactly the lossless low-DWORD round-trip behavior under test.
        Assert.That(hkl, Is.EqualTo(unchecked((nint)0xF0010409L)));
    }

    [TestCase(null)] // null keyboardId
    [TestCase("")] // empty keyboardId — rejected at boundary (data-contracts §2.1)
    [TestCase("win:")] // empty payload
    [TestCase("win:xyz")] // malformed hex
    [TestCase("win:123456789abcdef01")] // 17 hex digits — overflows 64 bits
    [TestCase("WIN:4090409")] // prefix must be exact lowercase (canonical)
    [TestCase("ibus:anthy")] // cross-platform mismatch
    [TestCase("mac:com.apple.keylayout.US")] // cross-platform mismatch
    [TestCase("fcitx:pinyin")] // unknown platform prefix — tolerated, not owned
    [TestCase("4090409")] // bare payload without any prefix
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    public void TryGetWindowsHkl_WithNonWindowsOrMalformedId_ReturnsFalse(string? keyboardId)
    {
        Assert.That(KeyboardId.TryGetWindowsHkl(keyboardId, out _), Is.False);
    }

    // ===================================================================================
    // Linux: IBus engine <-> "ibus:<engine>"
    // ===================================================================================

    [TestCase("anthy", "ibus:anthy")] // simple engine name
    [TestCase("xkb:us::eng", "ibus:xkb:us::eng")] // embedded colons preserved verbatim
    [TestCase("m17n:ar:kbd", "ibus:m17n:ar:kbd")] // m17n engine
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    public void FromIbusEngine_WithEngineName_PrependsIbusMarker(
        string engineName,
        string expectedKeyboardId
    )
    {
        Assert.That(KeyboardId.FromIbusEngine(engineName), Is.EqualTo(expectedKeyboardId));
    }

    [TestCase("anthy")]
    [TestCase("xkb:us::eng")] // prefix split on FIRST colon only; payload verbatim
    [TestCase("table:中文")] // non-ASCII payload preserved exactly
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("InvariantId", "INV-C07")]
    public void TryGetIbusEngine_AfterFromIbusEngine_RoundTripsLosslessly(string engineName)
    {
        string keyboardId = KeyboardId.FromIbusEngine(engineName);

        Assert.That(KeyboardId.TryGetIbusEngine(keyboardId, out string roundTripped), Is.True);
        Assert.That(roundTripped, Is.EqualTo(engineName));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    public void FromIbusEngine_WithNullOrEmptyEngineName_ThrowsArgumentException()
    {
        // Empty string rejected at boundary (strategic-plan edge case; data-contracts §2.1).
        // ArgumentNullException derives from ArgumentException, so one constraint covers both.
        Assert.That(() => KeyboardId.FromIbusEngine(null!), Throws.InstanceOf<ArgumentException>());
        Assert.That(() => KeyboardId.FromIbusEngine(""), Throws.InstanceOf<ArgumentException>());
    }

    [TestCase(null)]
    [TestCase("")]
    [TestCase("ibus:")] // empty payload — an empty engine name is not a keyboard
    [TestCase("win:4090409")] // cross-platform mismatch
    [TestCase("fcitx:pinyin")] // unknown platform prefix — tolerated, not owned
    [TestCase("anthy")] // bare engine name without marker is NOT a normalized id
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    public void TryGetIbusEngine_WithNonIbusOrMalformedId_ReturnsFalse(string? keyboardId)
    {
        Assert.That(KeyboardId.TryGetIbusEngine(keyboardId, out _), Is.False);
    }

    // ===================================================================================
    // macOS: TIS input source <-> "mac:<bundle>"
    // ===================================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    public void FromMacInputSource_WithBundleId_PrependsMacMarker()
    {
        Assert.That(
            KeyboardId.FromMacInputSource("com.apple.keylayout.US"),
            Is.EqualTo("mac:com.apple.keylayout.US")
        );
    }

    [TestCase("com.apple.keylayout.US")]
    [TestCase("com.apple.inputmethod.Kotoeri.RomajiTyping.Japanese")] // dotted IM id
    [TestCase("Com.Vendor.MixedCase.Layout")] // case preserved exactly — no normalization
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("InvariantId", "INV-C07")]
    public void TryGetMacInputSource_AfterFromMacInputSource_RoundTripsLosslessly(
        string inputSourceId
    )
    {
        string keyboardId = KeyboardId.FromMacInputSource(inputSourceId);

        Assert.That(KeyboardId.TryGetMacInputSource(keyboardId, out string roundTripped), Is.True);
        Assert.That(roundTripped, Is.EqualTo(inputSourceId));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    public void FromMacInputSource_WithNullOrEmptyInputSourceId_ThrowsArgumentException()
    {
        Assert.That(
            () => KeyboardId.FromMacInputSource(null!),
            Throws.InstanceOf<ArgumentException>()
        );
        Assert.That(
            () => KeyboardId.FromMacInputSource(""),
            Throws.InstanceOf<ArgumentException>()
        );
    }

    [TestCase(null)]
    [TestCase("")]
    [TestCase("mac:")] // empty payload
    [TestCase("ibus:anthy")] // cross-platform mismatch
    [TestCase("fcitx:pinyin")] // unknown platform prefix — tolerated, not owned
    [TestCase("com.apple.keylayout.US")] // bare bundle id without marker is NOT normalized
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    public void TryGetMacInputSource_WithNonMacOrMalformedId_ReturnsFalse(string? keyboardId)
    {
        Assert.That(KeyboardId.TryGetMacInputSource(keyboardId, out _), Is.False);
    }
}
