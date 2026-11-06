using System.Diagnostics.CodeAnalysis;
using Paratext.Checks;
using Paratext.Data;
using Paratext.Data.Checking;
using PtxUtils;

namespace TestParanextDataProvider.Checks;

/// <summary>
/// A check that throws an exception that is not a settings problem, optionally only for some books.
/// </summary>
[ExcludeFromCodeCoverage]
internal sealed class ThrowingCheck : ScriptureCheckBase
{
    public const string Message = "The test check failed on purpose.";

    public const string InitializeMessage = "The test check failed to initialize on purpose.";

    /// <summary>The message <see cref="Run"/> throws with instead of <see cref="Message"/>, if set.</summary>
    public string? MessageOverride { get; set; }

    /// <summary>Whether <see cref="Initialize"/> throws; off by default.</summary>
    public bool ThrowInInitialize { get; set; }

    /// <summary>Books to throw for; empty means every book.</summary>
    public HashSet<int> BooksToThrowFor { get; } = [];

    public override Enum<CheckType> Type => CheckType.RepeatedWord;
    public override CheckDataFormat NeededFormat => CheckDataFormat.TextTokens;
    public override string CheckMarkSettingsKey => "TestThrowingCheck";
    public override bool SetupComplete => true;
    public override string LocalizedSetupCommand => "";

    public override void Initialize(ChecksDataSource source)
    {
        if (ThrowInInitialize)
            throw new InvalidOperationException(InitializeMessage);
    }

    public override void Run(int bookNum, ChecksDataSource source, IRecordCheckError recordError)
    {
        if (BooksToThrowFor.Count == 0 || BooksToThrowFor.Contains(bookNum))
            throw new InvalidOperationException(MessageOverride ?? Message);
    }
}
