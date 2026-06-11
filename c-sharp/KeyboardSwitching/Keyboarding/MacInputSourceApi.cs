using System.Reflection;
using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using System.Text;

namespace Paranext.DataProvider.KeyboardSwitching.Keyboarding;

// === NEW IN PT10 ===
// Reason: PT10-only HIToolbox Text Input Services P/Invoke adapter — PT9 is
// Windows-only and reaches keyboards through SIL.Windows.Forms.Keyboarding; PT10's
// headless net8.0 data provider calls TIS directly. First-ever macOS [DllImport]
// interop in c-sharp/ (keyboarding-macos.md §1); entitlements NOT required (same doc).
// Framework-load strategy and input-source filtering choices documented in
// .context/features/keyboard-switching/implementation/decisions/keyboarding-macos.md.
// Maps to: CAP-006
/// <summary>
/// Real macOS implementation of <see cref="IMacInputSourceApi"/>: P/Invokes
/// <c>HIToolbox.framework</c> Text Input Services (<c>TISCreateInputSourceList</c>,
/// <c>TISCopyCurrentKeyboardInputSource</c>, <c>TISSelectInputSource</c>,
/// <c>TISGetInputSourceProperty</c>) per data-contracts.md §9 "Cross-Platform
/// Keyboarding → macOS". Enumeration is filtered to keyboard-category, select-capable
/// input sources (<c>kTISPropertyInputSourceCategory</c> ==
/// <c>kTISCategoryKeyboardInputSource</c> and
/// <c>kTISPropertyInputSourceIsSelectCapable</c>) so only sources TIS will actually
/// switch to reach the dropdown.
/// <br />
/// Core Foundation memory discipline (the Create/Copy vs Get rule): the two
/// Create/Copy-rule results this adapter receives (<c>TISCreateInputSourceList</c>'s
/// array, <c>TISCopyCurrentKeyboardInputSource</c>'s input source) are released in
/// <c>finally</c> blocks; Get-rule results (<c>TISGetInputSourceProperty</c>,
/// <c>CFArrayGetValueAtIndex</c>) and the exported <c>CFStringRef</c> property-key
/// constants are owned by their containers/the framework and are never released.
/// <br />
/// No interop happens at construction: the framework handle and the property-key
/// constants resolve lazily on first member call, so interop failures surface as
/// member throws (which <see cref="MacKeyboardingPrimitive"/> contains per VAL-B-04),
/// never as construction failures.
/// <br />
/// <c>[DllImport]</c> (runtime marshalling) is used instead of source-generated
/// <c>[LibraryImport]</c>, matching <see cref="User32KeyboardLayoutApi"/>: this
/// project does not enable <c>AllowUnsafeBlocks</c> and the process is not
/// AOT-compiled, so runtime marshalling is fully supported.
/// </summary>
[SupportedOSPlatform("macos")]
internal sealed class MacInputSourceApi : IMacInputSourceApi
{
    // EXPLANATION (framework load paths — keyboarding-macos.md §3):
    // HIToolbox is a sub-framework of the Carbon umbrella. Framework paths are
    // arch-neutral (the same dyld shared cache mechanism serves osx-x64 and
    // osx-arm64). dyld resolves these paths from the shared cache even though the
    // files no longer exist on disk (macOS 11+). The DllImport below uses the logical
    // name "HIToolbox"; the resolver registered in the static constructor maps it to
    // the first candidate that loads:
    //   1. the direct sub-framework path (symlink-style, shortest),
    //   2. the canonical versioned install name (LC_ID_DYLIB — always in the cache),
    //   3. the Carbon umbrella, which re-exports all HIToolbox symbols.
    private const string HI_TOOLBOX = "HIToolbox";
    private static readonly string[] s_hiToolboxCandidatePaths =
    [
        "/System/Library/Frameworks/Carbon.framework/Frameworks/HIToolbox.framework/HIToolbox",
        "/System/Library/Frameworks/Carbon.framework/Versions/A/Frameworks/HIToolbox.framework/Versions/A/HIToolbox",
        "/System/Library/Frameworks/Carbon.framework/Carbon",
    ];

    // The unversioned CoreFoundation path is the one the .NET runtime itself
    // P/Invokes on macOS, so it is known-good on every supported runtime/arch.
    private const string CORE_FOUNDATION =
        "/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation";

    private const uint K_CF_STRING_ENCODING_UTF8 = 0x08000100;

    // Exported CFStringRef globals from HIToolbox (Get rule — never released). Lazy so
    // no interop happens at construction; Lazy<T> caches a thrown load failure, which
    // keeps "TIS unavailable" surfacing consistently as member throws.
    private static readonly Lazy<IntPtr> s_hiToolboxHandle = new(LoadHiToolbox);
    private static readonly Lazy<IntPtr> s_propertyInputSourceIdKey =
        new(() => ReadCfStringConstant("kTISPropertyInputSourceID"));
    private static readonly Lazy<IntPtr> s_propertyLocalizedNameKey =
        new(() => ReadCfStringConstant("kTISPropertyLocalizedName"));
    private static readonly Lazy<IntPtr> s_propertyCategoryKey =
        new(() => ReadCfStringConstant("kTISPropertyInputSourceCategory"));
    private static readonly Lazy<IntPtr> s_propertyIsSelectCapableKey =
        new(() => ReadCfStringConstant("kTISPropertyInputSourceIsSelectCapable"));
    private static readonly Lazy<IntPtr> s_categoryKeyboardValue =
        new(() => ReadCfStringConstant("kTISCategoryKeyboardInputSource"));

    static MacInputSourceApi()
    {
        // Maps the "HIToolbox" logical [DllImport] name to whichever candidate path
        // loads. Registration itself performs no interop and cannot fail; a resolver
        // miss (IntPtr.Zero) makes the runtime throw DllNotFoundException from the
        // calling member — exactly the "TIS unavailable surfaces as member throws"
        // seam contract. Note: SetDllImportResolver is once-per-assembly; this is the
        // only resolver in the data-provider assembly.
        NativeLibrary.SetDllImportResolver(
            typeof(MacInputSourceApi).Assembly,
            (string libraryName, Assembly _, DllImportSearchPath? _) =>
                libraryName == HI_TOOLBOX && TryLoadHiToolbox(out IntPtr handle)
                    ? handle
                    : IntPtr.Zero
        );
    }

    public IReadOnlyList<MacInputSourceDescriptor> ListInputSources()
    {
        var descriptors = new List<MacInputSourceDescriptor>();
        ForEachSelectableKeyboardInputSource(
            (IntPtr inputSource, string inputSourceId) =>
            {
                descriptors.Add(
                    new MacInputSourceDescriptor(
                        inputSourceId,
                        GetStringProperty(inputSource, s_propertyLocalizedNameKey.Value) ?? ""
                    )
                );
                return true; // keep iterating
            }
        );
        return descriptors;
    }

    public string? GetCurrentInputSourceId()
    {
        // Copy rule: this adapter owns the returned input source and must release it.
        IntPtr currentInputSource = TISCopyCurrentKeyboardInputSource();
        if (currentInputSource == IntPtr.Zero)
            return null;
        try
        {
            return GetStringProperty(currentInputSource, s_propertyInputSourceIdKey.Value);
        }
        finally
        {
            CFRelease(currentInputSource);
        }
    }

    public bool SelectInputSource(string inputSourceId)
    {
        // Look the input source up by id in a fresh enumeration (the same filtered
        // view ListInputSources exposes — only sources we enumerate are selectable
        // through this seam). Bundle-style ids are case-sensitive: ordinal compare.
        // An id that vanished between enumeration and selection is simply not found
        // — the seam's "rejected" value, not a fault.
        bool selected = false;
        bool found = ForEachSelectableKeyboardInputSource(
            (IntPtr inputSource, string candidateId) =>
            {
                if (!string.Equals(candidateId, inputSourceId, StringComparison.Ordinal))
                    return true; // keep iterating
                selected = TISSelectInputSource(inputSource) == 0; // 0 == noErr
                return false; // stop iterating
            }
        );
        return found && selected;
    }

    /// <summary>
    /// Enumerates the selectable keyboard-category input sources TIS lists, invoking
    /// <paramref name="visit"/> with each input source ref (Get rule — valid only
    /// during the callback) and its non-empty input source ID. The callback returns
    /// whether to keep iterating. Returns true when iteration was stopped by the
    /// callback (the visit target was found), false when the list was exhausted.
    /// </summary>
    private static bool ForEachSelectableKeyboardInputSource(Func<IntPtr, string, bool> visit)
    {
        // Create rule: this adapter owns the returned list and must release it.
        // NULL properties + includeAllInstalled=false lists all ENABLED input
        // sources; the keyboard-category / select-capable filter is applied below in
        // managed code (keyboarding-macos.md §3 — equivalent to a CFDictionary
        // filter without the dictionary-callback interop).
        IntPtr inputSourceList = TISCreateInputSourceList(IntPtr.Zero, false);
        if (inputSourceList == IntPtr.Zero)
            return false; // TIS found nothing matching — the empty steady state
        try
        {
            nint count = CFArrayGetCount(inputSourceList);
            for (nint i = 0; i < count; i++)
            {
                // Get rule: the array owns its elements — no release.
                IntPtr inputSource = CFArrayGetValueAtIndex(inputSourceList, i);
                if (inputSource == IntPtr.Zero || !IsSelectableKeyboard(inputSource))
                    continue;

                string? inputSourceId = GetStringProperty(
                    inputSource,
                    s_propertyInputSourceIdKey.Value
                );
                // An input source TIS cannot identify by id is not a keyboard option.
                if (string.IsNullOrEmpty(inputSourceId))
                    continue;

                if (!visit(inputSource, inputSourceId))
                    return true;
            }
            return false;
        }
        finally
        {
            CFRelease(inputSourceList);
        }
    }

    private static bool IsSelectableKeyboard(IntPtr inputSource)
    {
        // Get rule on both properties — no release. A missing property (defensive;
        // TIS documents both for every input source) counts as "not selectable".
        IntPtr category = TISGetInputSourceProperty(inputSource, s_propertyCategoryKey.Value);
        if (category == IntPtr.Zero || !CFEqual(category, s_categoryKeyboardValue.Value))
            return false;

        IntPtr isSelectCapable = TISGetInputSourceProperty(
            inputSource,
            s_propertyIsSelectCapableKey.Value
        );
        return isSelectCapable != IntPtr.Zero && CFBooleanGetValue(isSelectCapable);
    }

    private static string? GetStringProperty(IntPtr inputSource, IntPtr propertyKey)
    {
        // Get rule: the returned CFStringRef is owned by the input source — no release.
        return CfStringToString(TISGetInputSourceProperty(inputSource, propertyKey));
    }

    private static string? CfStringToString(IntPtr cfString)
    {
        if (cfString == IntPtr.Zero)
            return null;

        nint length = CFStringGetLength(cfString);
        if (length == 0)
            return "";

        // Worst-case UTF-8 byte budget (+1 for the NUL terminator CFStringGetCString
        // writes). The copy-out path works for every CFString; the zero-copy
        // CFStringGetCStringPtr fast path is deliberately skipped to keep one path.
        nint bufferSize = CFStringGetMaximumSizeForEncoding(length, K_CF_STRING_ENCODING_UTF8) + 1;
        var buffer = new byte[bufferSize];
        if (!CFStringGetCString(cfString, buffer, bufferSize, K_CF_STRING_ENCODING_UTF8))
            return null;

        int terminatorIndex = Array.IndexOf(buffer, (byte)0);
        return Encoding.UTF8.GetString(
            buffer,
            0,
            terminatorIndex < 0 ? buffer.Length : terminatorIndex
        );
    }

    /// <summary>
    /// Reads one exported <c>const CFStringRef</c> global out of HIToolbox:
    /// <c>GetExport</c> returns the address OF the global, so one pointer-sized read
    /// dereferences it to the actual <c>CFStringRef</c> (Get rule — never released).
    /// </summary>
    private static IntPtr ReadCfStringConstant(string symbolName)
    {
        IntPtr value = Marshal.ReadIntPtr(
            NativeLibrary.GetExport(s_hiToolboxHandle.Value, symbolName)
        );
        return value != IntPtr.Zero
            ? value
            : throw new InvalidOperationException(
                $"HIToolbox exported constant '{symbolName}' resolved to NULL"
            );
    }

    private static IntPtr LoadHiToolbox()
    {
        return TryLoadHiToolbox(out IntPtr handle)
            ? handle
            : throw new DllNotFoundException(
                "HIToolbox.framework could not be loaded from any candidate path: "
                    + string.Join("; ", s_hiToolboxCandidatePaths)
            );
    }

    private static bool TryLoadHiToolbox(out IntPtr handle)
    {
        foreach (string candidatePath in s_hiToolboxCandidatePaths)
        {
            if (NativeLibrary.TryLoad(candidatePath, out handle))
                return true;
        }
        handle = IntPtr.Zero;
        return false;
    }

    // --- HIToolbox Text Input Services ---
    // C `Boolean` is one byte — marshal explicitly as I1 (the DllImport default for
    // bool is the 4-byte Win32 BOOL).

    [DllImport(HI_TOOLBOX)]
    private static extern IntPtr TISCreateInputSourceList(
        IntPtr properties,
        [MarshalAs(UnmanagedType.I1)] bool includeAllInstalled
    );

    [DllImport(HI_TOOLBOX)]
    private static extern IntPtr TISCopyCurrentKeyboardInputSource();

    [DllImport(HI_TOOLBOX)]
    private static extern int TISSelectInputSource(IntPtr inputSource);

    [DllImport(HI_TOOLBOX)]
    private static extern IntPtr TISGetInputSourceProperty(IntPtr inputSource, IntPtr propertyKey);

    // --- CoreFoundation ---

    [DllImport(CORE_FOUNDATION)]
    private static extern void CFRelease(IntPtr cf);

    [DllImport(CORE_FOUNDATION)]
    private static extern nint CFArrayGetCount(IntPtr array);

    [DllImport(CORE_FOUNDATION)]
    private static extern IntPtr CFArrayGetValueAtIndex(IntPtr array, nint index);

    [DllImport(CORE_FOUNDATION)]
    [return: MarshalAs(UnmanagedType.I1)]
    private static extern bool CFEqual(IntPtr cf1, IntPtr cf2);

    [DllImport(CORE_FOUNDATION)]
    [return: MarshalAs(UnmanagedType.I1)]
    private static extern bool CFBooleanGetValue(IntPtr boolean);

    [DllImport(CORE_FOUNDATION)]
    private static extern nint CFStringGetLength(IntPtr cfString);

    [DllImport(CORE_FOUNDATION)]
    private static extern nint CFStringGetMaximumSizeForEncoding(nint length, uint encoding);

    [DllImport(CORE_FOUNDATION)]
    [return: MarshalAs(UnmanagedType.I1)]
    private static extern bool CFStringGetCString(
        IntPtr cfString,
        byte[] buffer,
        nint bufferSize,
        uint encoding
    );
}
