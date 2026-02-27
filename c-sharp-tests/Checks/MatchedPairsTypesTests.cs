using System.Text.Json;
using Paranext.DataProvider.Checks;
using Paranext.DataProvider.JsonUtils;

namespace TestParanextDataProvider.Checks;

/// <summary>
/// Tests for CAP-013 MatchedPairsTypes: all shared record types used by the matched pairs
/// inventory feature. Verifies structural correctness via JSON serialization round-trip
/// and enum string serialization.
///
/// These are structural tests for types with no behavior. They confirm:
/// - All record types compile and can be instantiated
/// - JSON serialization round-trip preserves all field values
/// - Enum values serialize to the correct camelCase string representations
/// - Default values match the data-contracts specification
///
/// INV-011: Setting names are serialization-sensitive (case-sensitive enum serialization).
/// </summary>
[TestFixture]
public class MatchedPairsTypesTests
{
    private JsonSerializerOptions _serializerOptions = null!;

    [SetUp]
    public void SetUp()
    {
        _serializerOptions = SerializationOptions.CreateSerializationOptions();
    }

    #region Input Types - Serialization Round-Trip

    /// <summary>
    /// BuildInventoryInput (Section 2.1): Verifies all fields survive JSON round-trip
    /// including the optional SelectedBooks array.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void BuildInventoryInput_SerializationRoundTrip_PreservesAllFields()
    {
        var input = new BuildInventoryInput(
            ProjectId: "proj-123",
            IsSba: true,
            IsSeparated: false,
            SelectedBooks: new[] { 1, 2, 40 }
        );

        string json = JsonSerializer.Serialize(input, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<BuildInventoryInput>(json, _serializerOptions);

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.ProjectId, Is.EqualTo("proj-123"));
        Assert.That(deserialized.IsSba, Is.True);
        Assert.That(deserialized.IsSeparated, Is.False);
        Assert.That(deserialized.SelectedBooks, Is.EqualTo(new[] { 1, 2, 40 }));
    }

    /// <summary>
    /// BuildInventoryInput (Section 2.1): SelectedBooks defaults to null when omitted.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    public void BuildInventoryInput_DefaultSelectedBooks_IsNull()
    {
        var input = new BuildInventoryInput(
            ProjectId: "proj-123",
            IsSba: false,
            IsSeparated: true
        );

        Assert.That(input.SelectedBooks, Is.Null);
    }

    /// <summary>
    /// BuildInventoryInput (Section 2.1): Verifies camelCase JSON property names
    /// per SerializationOptions.CreateSerializationOptions() policy.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void BuildInventoryInput_Serialization_UsesCamelCasePropertyNames()
    {
        var input = new BuildInventoryInput("proj-1", true, false);

        string json = JsonSerializer.Serialize(input, _serializerOptions);

        Assert.That(json, Does.Contain("\"projectId\""));
        Assert.That(json, Does.Contain("\"isSba\""));
        Assert.That(json, Does.Contain("\"isSeparated\""));
    }

    /// <summary>
    /// SetStatusInput (Section 2.2): Verifies all fields survive JSON round-trip
    /// including the ItemStatus enum and string array of selected items.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void SetStatusInput_SerializationRoundTrip_PreservesAllFields()
    {
        var input = new SetStatusInput(
            DesiredStatus: ItemStatus.Valid,
            Category: "versetext",
            SelectedItems: new[] { "(", ")" },
            ProjectId: "proj-456",
            IsSeparated: true,
            IsSba: false
        );

        string json = JsonSerializer.Serialize(input, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<SetStatusInput>(json, _serializerOptions);

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.DesiredStatus, Is.EqualTo(ItemStatus.Valid));
        Assert.That(deserialized.Category, Is.EqualTo("versetext"));
        Assert.That(deserialized.SelectedItems, Is.EqualTo(new[] { "(", ")" }));
        Assert.That(deserialized.ProjectId, Is.EqualTo("proj-456"));
        Assert.That(deserialized.IsSeparated, Is.True);
        Assert.That(deserialized.IsSba, Is.False);
    }

    /// <summary>
    /// SaveInventoryStatusInput (Section 2.3): Verifies all fields survive JSON round-trip.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void SaveInventoryStatusInput_SerializationRoundTrip_PreservesAllFields()
    {
        var input = new SaveInventoryStatusInput(
            ProjectId: "proj-789",
            IsSba: true,
            IsSeparated: true
        );

        string json = JsonSerializer.Serialize(input, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<SaveInventoryStatusInput>(
            json,
            _serializerOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.ProjectId, Is.EqualTo("proj-789"));
        Assert.That(deserialized.IsSba, Is.True);
        Assert.That(deserialized.IsSeparated, Is.True);
    }

    /// <summary>
    /// ToggleSeparationInput (Section 2.4): Verifies all fields survive JSON round-trip.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void ToggleSeparationInput_SerializationRoundTrip_PreservesAllFields()
    {
        var input = new ToggleSeparationInput(Enable: true, ProjectId: "proj-toggle");

        string json = JsonSerializer.Serialize(input, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<ToggleSeparationInput>(
            json,
            _serializerOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.Enable, Is.True);
        Assert.That(deserialized.ProjectId, Is.EqualTo("proj-toggle"));
    }

    /// <summary>
    /// GetDisplayedColumnsInput (Section 2.5): Verifies all fields survive JSON round-trip.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void GetDisplayedColumnsInput_SerializationRoundTrip_PreservesAllFields()
    {
        var input = new GetDisplayedColumnsInput(
            IsSba: false,
            IsSeparated: true,
            SupportsSeparateInventories: true
        );

        string json = JsonSerializer.Serialize(input, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<GetDisplayedColumnsInput>(
            json,
            _serializerOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.IsSba, Is.False);
        Assert.That(deserialized.IsSeparated, Is.True);
        Assert.That(deserialized.SupportsSeparateInventories, Is.True);
    }

    /// <summary>
    /// GetContentTypeFilterInput (Section 2.6): Verifies all fields survive JSON round-trip.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void GetContentTypeFilterInput_SerializationRoundTrip_PreservesAllFields()
    {
        var input = new GetContentTypeFilterInput(IsSba: true, IsSeparated: false);

        string json = JsonSerializer.Serialize(input, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<GetContentTypeFilterInput>(
            json,
            _serializerOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.IsSba, Is.True);
        Assert.That(deserialized.IsSeparated, Is.False);
    }

    /// <summary>
    /// SaveInventoryOptionsInput (Section 2.7): Verifies all fields survive JSON round-trip
    /// including Dictionary fields for old/new option values.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void SaveInventoryOptionsInput_SerializationRoundTrip_PreservesAllFields()
    {
        var input = new SaveInventoryOptionsInput(
            ProjectId: "proj-opts",
            OldValues: new Dictionary<string, string> { { "Pairs", "()[]" } },
            NewValues: new Dictionary<string, string> { { "Pairs", "()[]{}" } }
        );

        string json = JsonSerializer.Serialize(input, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<SaveInventoryOptionsInput>(
            json,
            _serializerOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.ProjectId, Is.EqualTo("proj-opts"));
        Assert.That(deserialized.OldValues["Pairs"], Is.EqualTo("()[]"));
        Assert.That(deserialized.NewValues["Pairs"], Is.EqualTo("()[]{}"));
    }

    /// <summary>
    /// GetOptionParameterTypeInput (Section 2.8): Verifies all fields survive JSON round-trip.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void GetOptionParameterTypeInput_SerializationRoundTrip_PreservesAllFields()
    {
        var input = new GetOptionParameterTypeInput(
            OptionName: "Pairs",
            CurrentValue: "()[]{}<>",
            DefaultValue: "()[]",
            IsErrorStorage: false
        );

        string json = JsonSerializer.Serialize(input, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<GetOptionParameterTypeInput>(
            json,
            _serializerOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.OptionName, Is.EqualTo("Pairs"));
        Assert.That(deserialized.CurrentValue, Is.EqualTo("()[]{}<>"));
        Assert.That(deserialized.DefaultValue, Is.EqualTo("()[]"));
        Assert.That(deserialized.IsErrorStorage, Is.False);
    }

    /// <summary>
    /// ExecuteBasicChecksInput (Section 2.9): Verifies all fields survive JSON round-trip
    /// including List types and default parameter values.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void ExecuteBasicChecksInput_SerializationRoundTrip_PreservesAllFields()
    {
        var input = new ExecuteBasicChecksInput(
            ProjectId: "proj-exec",
            ChecksToRun: new List<string> { "MatchedPairs" },
            BooksToCheck: new List<int> { 1, 2, 3 },
            FirstChapter: 1,
            LastChapter: 10
        );

        string json = JsonSerializer.Serialize(input, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<ExecuteBasicChecksInput>(
            json,
            _serializerOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.ProjectId, Is.EqualTo("proj-exec"));
        Assert.That(deserialized.ChecksToRun, Is.EqualTo(new List<string> { "MatchedPairs" }));
        Assert.That(deserialized.BooksToCheck, Is.EqualTo(new List<int> { 1, 2, 3 }));
        Assert.That(deserialized.FirstChapter, Is.EqualTo(1));
        Assert.That(deserialized.LastChapter, Is.EqualTo(10));
    }

    /// <summary>
    /// ExecuteBasicChecksInput (Section 2.9): Default chapter values are 0.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    public void ExecuteBasicChecksInput_DefaultChapterValues_AreZero()
    {
        var input = new ExecuteBasicChecksInput(
            ProjectId: "proj-exec",
            ChecksToRun: new List<string> { "MatchedPairs" },
            BooksToCheck: new List<int> { 1 }
        );

        Assert.That(input.FirstChapter, Is.EqualTo(0));
        Assert.That(input.LastChapter, Is.EqualTo(0));
    }

    /// <summary>
    /// InitializeInventoryInput (Section 2.10): Verifies all fields survive JSON round-trip.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void InitializeInventoryInput_SerializationRoundTrip_PreservesAllFields()
    {
        var input = new InitializeInventoryInput(
            ProjectId: "proj-init",
            CheckType: "MatchedPairs"
        );

        string json = JsonSerializer.Serialize(input, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<InitializeInventoryInput>(
            json,
            _serializerOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.ProjectId, Is.EqualTo("proj-init"));
        Assert.That(deserialized.CheckType, Is.EqualTo("MatchedPairs"));
    }

    #endregion

    #region Output Types - Serialization Round-Trip

    /// <summary>
    /// InventoryBuildResult (Section 3.1): Verifies all fields survive JSON round-trip
    /// including nested InventoryItemData list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void InventoryBuildResult_SerializationRoundTrip_PreservesAllFields()
    {
        var result = new InventoryBuildResult
        {
            Success = true,
            Error = null,
            Items = new List<InventoryItemData>
            {
                new()
                {
                    Text = "(",
                    Counts = new Dictionary<string, int> { { "versetext", 42 } },
                    Statuses = new Dictionary<string, ItemStatus>
                    {
                        { "versetext", ItemStatus.Valid },
                    },
                    References = new List<int> { 1001001, 1001002 },
                    TotalCount = 42,
                },
            },
            VersePopulated = true,
            NonVersePopulated = false,
            RegularPopulated = false,
            StudyBiblePopulated = false,
            CombinedIsMerge = false,
            SetupComplete = true,
        };

        string json = JsonSerializer.Serialize(result, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<InventoryBuildResult>(
            json,
            _serializerOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.Success, Is.True);
        Assert.That(deserialized.Error, Is.Null);
        Assert.That(deserialized.Items, Has.Count.EqualTo(1));
        Assert.That(deserialized.Items[0].Text, Is.EqualTo("("));
        Assert.That(deserialized.Items[0].Counts["versetext"], Is.EqualTo(42));
        Assert.That(deserialized.Items[0].Statuses["versetext"], Is.EqualTo(ItemStatus.Valid));
        Assert.That(
            deserialized.Items[0].References,
            Is.EqualTo(new List<int> { 1001001, 1001002 })
        );
        Assert.That(deserialized.Items[0].TotalCount, Is.EqualTo(42));
        Assert.That(deserialized.VersePopulated, Is.True);
        Assert.That(deserialized.NonVersePopulated, Is.False);
        Assert.That(deserialized.RegularPopulated, Is.False);
        Assert.That(deserialized.StudyBiblePopulated, Is.False);
        Assert.That(deserialized.CombinedIsMerge, Is.False);
        Assert.That(deserialized.SetupComplete, Is.True);
    }

    /// <summary>
    /// InventoryBuildResult (Section 3.1): Default collections are empty, not null.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    public void InventoryBuildResult_DefaultValues_CollectionsAreEmpty()
    {
        var result = new InventoryBuildResult();

        Assert.That(result.Items, Is.Not.Null);
        Assert.That(result.Items, Is.Empty);
        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Null);
    }

    /// <summary>
    /// StatusChangeResult (Section 3.2): Verifies all fields survive JSON round-trip
    /// including nullable WarningMessage.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void StatusChangeResult_SerializationRoundTrip_PreservesAllFields()
    {
        var result = new StatusChangeResult
        {
            Success = true,
            Error = null,
            StatusChanged = true,
            AllChanged = false,
            SkippedCount = 2,
            WarningMessage = "2 items are always valid",
        };

        string json = JsonSerializer.Serialize(result, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<StatusChangeResult>(
            json,
            _serializerOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.Success, Is.True);
        Assert.That(deserialized.Error, Is.Null);
        Assert.That(deserialized.StatusChanged, Is.True);
        Assert.That(deserialized.AllChanged, Is.False);
        Assert.That(deserialized.SkippedCount, Is.EqualTo(2));
        Assert.That(deserialized.WarningMessage, Is.EqualTo("2 items are always valid"));
    }

    /// <summary>
    /// SeparationToggleResult (Section 3.3): Verifies all fields survive JSON round-trip.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void SeparationToggleResult_SerializationRoundTrip_PreservesAllFields()
    {
        var result = new SeparationToggleResult
        {
            Success = true,
            Error = null,
            Enabled = true,
            RebuildRequired = true,
        };

        string json = JsonSerializer.Serialize(result, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<SeparationToggleResult>(
            json,
            _serializerOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.Success, Is.True);
        Assert.That(deserialized.Enabled, Is.True);
        Assert.That(deserialized.RebuildRequired, Is.True);
    }

    /// <summary>
    /// ColumnDefinition (Section 3.4): Verifies all fields survive JSON round-trip.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void ColumnDefinition_SerializationRoundTrip_PreservesAllFields()
    {
        var column = new ColumnDefinition(
            Id: "versetext",
            Label: "Verse Text",
            Type: "count",
            DefaultSortDescending: true
        );

        string json = JsonSerializer.Serialize(column, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<ColumnDefinition>(json, _serializerOptions);

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.Id, Is.EqualTo("versetext"));
        Assert.That(deserialized.Label, Is.EqualTo("Verse Text"));
        Assert.That(deserialized.Type, Is.EqualTo("count"));
        Assert.That(deserialized.DefaultSortDescending, Is.True);
    }

    /// <summary>
    /// ContentTypeFilterResult (Section 3.5): Verifies all fields survive JSON round-trip
    /// including nested ContentTypeOption list with InventoryTextType enum.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void ContentTypeFilterResult_SerializationRoundTrip_PreservesAllFields()
    {
        var result = new ContentTypeFilterResult
        {
            Visible = true,
            Options = new List<ContentTypeOption>
            {
                new("All Text", InventoryTextType.AllText),
                new("Verse Text", InventoryTextType.VerseText),
                new("Non-Verse Text", InventoryTextType.NonVerseText),
            },
        };

        string json = JsonSerializer.Serialize(result, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<ContentTypeFilterResult>(
            json,
            _serializerOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.Visible, Is.True);
        Assert.That(deserialized.Options, Has.Count.EqualTo(3));
        Assert.That(deserialized.Options![0].Label, Is.EqualTo("All Text"));
        Assert.That(deserialized.Options[0].TextType, Is.EqualTo(InventoryTextType.AllText));
        Assert.That(deserialized.Options[1].TextType, Is.EqualTo(InventoryTextType.VerseText));
        Assert.That(
            deserialized.Options[2].TextType,
            Is.EqualTo(InventoryTextType.NonVerseText)
        );
    }

    /// <summary>
    /// ContentTypeFilterResult (Section 3.5): When not visible, Options must be null.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    public void ContentTypeFilterResult_WhenNotVisible_OptionsAreNull()
    {
        var result = new ContentTypeFilterResult { Visible = false, Options = null };

        string json = JsonSerializer.Serialize(result, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<ContentTypeFilterResult>(
            json,
            _serializerOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.Visible, Is.False);
        Assert.That(deserialized.Options, Is.Null);
    }

    /// <summary>
    /// OptionParameterInfo (Section 3.6): Verifies all fields survive JSON round-trip
    /// including OptionControlType enum and nullable AvailableValues.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void OptionParameterInfo_SerializationRoundTrip_PreservesAllFields()
    {
        var info = new OptionParameterInfo
        {
            ControlType = OptionControlType.EditableCombo,
            AvailableValues = new List<string> { "()[]", "()[]{}", "()[]{}<>" },
            CurrentValue = "()[]{}",
        };

        string json = JsonSerializer.Serialize(info, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<OptionParameterInfo>(
            json,
            _serializerOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.ControlType, Is.EqualTo(OptionControlType.EditableCombo));
        Assert.That(deserialized.AvailableValues, Has.Count.EqualTo(3));
        Assert.That(deserialized.CurrentValue, Is.EqualTo("()[]{}"));
    }

    /// <summary>
    /// OptionParameterInfo (Section 3.6): Default CurrentValue is empty string.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    public void OptionParameterInfo_DefaultValues_CurrentValueIsEmptyString()
    {
        var info = new OptionParameterInfo();

        Assert.That(info.CurrentValue, Is.EqualTo(string.Empty));
        Assert.That(info.AvailableValues, Is.Null);
    }

    /// <summary>
    /// CheckExecutionResult (Section 3.7): Verifies all fields survive JSON round-trip
    /// including nested CheckError list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void CheckExecutionResult_SerializationRoundTrip_PreservesAllFields()
    {
        var result = new CheckExecutionResult
        {
            Success = true,
            Error = null,
            Results = new List<CheckError>
            {
                new(
                    Reference: "GEN 1:1",
                    CheckType: "MatchedPairs",
                    Message: "Unmatched punctuation: (",
                    SelectedText: "("
                ),
            },
            Overflow = false,
            TotalCount = 1,
        };

        string json = JsonSerializer.Serialize(result, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<CheckExecutionResult>(
            json,
            _serializerOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.Success, Is.True);
        Assert.That(deserialized.Results, Has.Count.EqualTo(1));
        Assert.That(deserialized.Results[0].Reference, Is.EqualTo("GEN 1:1"));
        Assert.That(deserialized.Results[0].CheckType, Is.EqualTo("MatchedPairs"));
        Assert.That(
            deserialized.Results[0].Message,
            Is.EqualTo("Unmatched punctuation: (")
        );
        Assert.That(deserialized.Results[0].SelectedText, Is.EqualTo("("));
        Assert.That(deserialized.Overflow, Is.False);
        Assert.That(deserialized.TotalCount, Is.EqualTo(1));
    }

    /// <summary>
    /// CheckExecutionResult (Section 3.7): Default collections are empty, not null.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    public void CheckExecutionResult_DefaultValues_ResultsAreEmpty()
    {
        var result = new CheckExecutionResult();

        Assert.That(result.Results, Is.Not.Null);
        Assert.That(result.Results, Is.Empty);
        Assert.That(result.TotalCount, Is.EqualTo(0));
        Assert.That(result.Overflow, Is.False);
    }

    /// <summary>
    /// InventoryInitResult (Section 3.8): Verifies all fields survive JSON round-trip
    /// including nested InventoryOption list and PermissionState.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void InventoryInitResult_SerializationRoundTrip_PreservesAllFields()
    {
        var result = new InventoryInitResult
        {
            Success = true,
            Error = null,
            Title = "Unmatched Pairs of Punctuation inventory: MyProject",
            IsSba = false,
            IsSeparated = true,
            SupportsSeparateInventories = true,
            Options = new List<InventoryOption>
            {
                new(
                    Name: "Pairs",
                    Value: "()[]{}",
                    DefaultValue: "()[]",
                    Label: "Pairs"
                ),
            },
            Permissions = new PermissionState
            {
                CanMakeChanges = true,
                ToggleEnabled = true,
                ButtonsEnabled = true,
            },
        };

        string json = JsonSerializer.Serialize(result, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<InventoryInitResult>(
            json,
            _serializerOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.Success, Is.True);
        Assert.That(
            deserialized.Title,
            Is.EqualTo("Unmatched Pairs of Punctuation inventory: MyProject")
        );
        Assert.That(deserialized.IsSba, Is.False);
        Assert.That(deserialized.IsSeparated, Is.True);
        Assert.That(deserialized.SupportsSeparateInventories, Is.True);
        Assert.That(deserialized.Options, Has.Count.EqualTo(1));
        Assert.That(deserialized.Options[0].Name, Is.EqualTo("Pairs"));
        Assert.That(deserialized.Options[0].Value, Is.EqualTo("()[]{}"));
        Assert.That(deserialized.Options[0].DefaultValue, Is.EqualTo("()[]"));
        Assert.That(deserialized.Options[0].Label, Is.EqualTo("Pairs"));
        Assert.That(deserialized.Permissions.CanMakeChanges, Is.True);
        Assert.That(deserialized.Permissions.ToggleEnabled, Is.True);
        Assert.That(deserialized.Permissions.ButtonsEnabled, Is.True);
    }

    /// <summary>
    /// InventoryInitResult (Section 3.8): Default collections and nested objects are initialized.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    public void InventoryInitResult_DefaultValues_CollectionsAndPermissionsInitialized()
    {
        var result = new InventoryInitResult();

        Assert.That(result.Title, Is.EqualTo(string.Empty));
        Assert.That(result.Options, Is.Not.Null);
        Assert.That(result.Options, Is.Empty);
        Assert.That(result.Permissions, Is.Not.Null);
        Assert.That(result.Permissions.CanMakeChanges, Is.False);
    }

    /// <summary>
    /// InventoryItemData (Section 3.9): Verifies all fields survive JSON round-trip.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void InventoryItemData_SerializationRoundTrip_PreservesAllFields()
    {
        var item = new InventoryItemData
        {
            Text = "(",
            Counts = new Dictionary<string, int>
            {
                { "versetext", 15 },
                { "nonversetext", 3 },
            },
            Statuses = new Dictionary<string, ItemStatus>
            {
                { "versetext", ItemStatus.Valid },
                { "nonversetext", ItemStatus.Unknown },
            },
            References = new List<int> { 1001001, 1001002, 2003005 },
            TotalCount = 18,
        };

        string json = JsonSerializer.Serialize(item, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<InventoryItemData>(json, _serializerOptions);

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.Text, Is.EqualTo("("));
        Assert.That(deserialized.Counts["versetext"], Is.EqualTo(15));
        Assert.That(deserialized.Counts["nonversetext"], Is.EqualTo(3));
        Assert.That(deserialized.Statuses["versetext"], Is.EqualTo(ItemStatus.Valid));
        Assert.That(deserialized.Statuses["nonversetext"], Is.EqualTo(ItemStatus.Unknown));
        Assert.That(
            deserialized.References,
            Is.EqualTo(new List<int> { 1001001, 1001002, 2003005 })
        );
        Assert.That(deserialized.TotalCount, Is.EqualTo(18));
    }

    /// <summary>
    /// InventoryItemData (Section 3.9): Default collections are empty.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    public void InventoryItemData_DefaultValues_CollectionsAreEmpty()
    {
        var item = new InventoryItemData();

        Assert.That(item.Text, Is.EqualTo(string.Empty));
        Assert.That(item.Counts, Is.Not.Null);
        Assert.That(item.Counts, Is.Empty);
        Assert.That(item.Statuses, Is.Not.Null);
        Assert.That(item.Statuses, Is.Empty);
        Assert.That(item.References, Is.Not.Null);
        Assert.That(item.References, Is.Empty);
        Assert.That(item.TotalCount, Is.EqualTo(0));
    }

    /// <summary>
    /// InventoryInstanceData (Section 3.10): Verifies all fields survive JSON round-trip.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void InventoryInstanceData_SerializationRoundTrip_PreservesAllFields()
    {
        var instance = new InventoryInstanceData(
            Reference: "GEN 1:1",
            VerseRef: 1001001,
            ContextBefore: "In the beginning ",
            ItemText: "(",
            ContextAfter: "God created"
        );

        string json = JsonSerializer.Serialize(instance, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<InventoryInstanceData>(
            json,
            _serializerOptions
        );

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.Reference, Is.EqualTo("GEN 1:1"));
        Assert.That(deserialized.VerseRef, Is.EqualTo(1001001));
        Assert.That(deserialized.ContextBefore, Is.EqualTo("In the beginning "));
        Assert.That(deserialized.ItemText, Is.EqualTo("("));
        Assert.That(deserialized.ContextAfter, Is.EqualTo("God created"));
    }

    /// <summary>
    /// PermissionState (Section 3.11): Verifies all fields survive JSON round-trip.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void PermissionState_SerializationRoundTrip_PreservesAllFields()
    {
        var perms = new PermissionState
        {
            CanMakeChanges = true,
            ToggleEnabled = false,
            ButtonsEnabled = true,
        };

        string json = JsonSerializer.Serialize(perms, _serializerOptions);
        var deserialized = JsonSerializer.Deserialize<PermissionState>(json, _serializerOptions);

        Assert.That(deserialized, Is.Not.Null);
        Assert.That(deserialized!.CanMakeChanges, Is.True);
        Assert.That(deserialized.ToggleEnabled, Is.False);
        Assert.That(deserialized.ButtonsEnabled, Is.True);
    }

    /// <summary>
    /// PermissionState (Section 3.11): Default values are all false.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    public void PermissionState_DefaultValues_AllFalse()
    {
        var perms = new PermissionState();

        Assert.That(perms.CanMakeChanges, Is.False);
        Assert.That(perms.ToggleEnabled, Is.False);
        Assert.That(perms.ButtonsEnabled, Is.False);
    }

    #endregion

    #region Enum Serialization - INV-011

    /// <summary>
    /// ItemStatus enum (Section 2.2): Verifies all enum values exist and are defined.
    /// INV-011: Setting names are serialization-sensitive.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void ItemStatus_AllValuesAreDefined()
    {
        var values = Enum.GetValues<ItemStatus>();

        Assert.That(values, Has.Length.EqualTo(3));
        Assert.That(values, Does.Contain(ItemStatus.Valid));
        Assert.That(values, Does.Contain(ItemStatus.Invalid));
        Assert.That(values, Does.Contain(ItemStatus.Unknown));
    }

    /// <summary>
    /// ItemStatus enum (Section 2.2): Verifies each value serializes to correct camelCase string
    /// via System.Text.Json with CamelCase policy.
    /// INV-011: Setting names are serialization-sensitive.
    /// </summary>
    [TestCase(ItemStatus.Valid, "valid")]
    [TestCase(ItemStatus.Invalid, "invalid")]
    [TestCase(ItemStatus.Unknown, "unknown")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void ItemStatus_SerializesToCorrectString(
        ItemStatus status,
        string expectedSerialized
    )
    {
        string json = JsonSerializer.Serialize(status, _serializerOptions);

        // The enum should serialize to a lowercase string matching the TypeScript type
        // Note: The exact format depends on whether JsonStringEnumConverter is configured
        // or a custom converter is used. The test verifies the expected wire format.
        Assert.That(
            json,
            Does.Contain(expectedSerialized),
            $"ItemStatus.{status} should serialize containing '{expectedSerialized}'"
        );
    }

    /// <summary>
    /// OptionControlType enum (Section 3.6): Verifies all enum values exist and are defined.
    /// INV-011: Setting names are serialization-sensitive.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void OptionControlType_AllValuesAreDefined()
    {
        var values = Enum.GetValues<OptionControlType>();

        Assert.That(values, Has.Length.EqualTo(3));
        Assert.That(values, Does.Contain(OptionControlType.YesNo));
        Assert.That(values, Does.Contain(OptionControlType.ProjectList));
        Assert.That(values, Does.Contain(OptionControlType.EditableCombo));
    }

    /// <summary>
    /// OptionControlType enum (Section 3.6): Verifies each value serializes to correct
    /// camelCase string for the TypeScript side.
    /// INV-011: Setting names are serialization-sensitive.
    /// </summary>
    [TestCase(OptionControlType.YesNo, "yesNo")]
    [TestCase(OptionControlType.ProjectList, "projectList")]
    [TestCase(OptionControlType.EditableCombo, "editableCombo")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void OptionControlType_SerializesToCorrectString(
        OptionControlType controlType,
        string expectedSerialized
    )
    {
        string json = JsonSerializer.Serialize(controlType, _serializerOptions);

        Assert.That(
            json,
            Does.Contain(expectedSerialized),
            $"OptionControlType.{controlType} should serialize containing '{expectedSerialized}'"
        );
    }

    /// <summary>
    /// InventoryTextType enum: Verifies all 5 values exist as defined in data-contracts Section 3.5.
    /// The InventoryTextType is already defined in Paratext.Checks and has an existing converter.
    /// INV-011: Setting names are serialization-sensitive.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void InventoryTextType_AllValuesAreDefined()
    {
        var values = Enum.GetValues<InventoryTextType>();

        Assert.That(values, Has.Length.EqualTo(5));
        Assert.That(values, Does.Contain(InventoryTextType.AllText));
        Assert.That(values, Does.Contain(InventoryTextType.VerseText));
        Assert.That(values, Does.Contain(InventoryTextType.NonVerseText));
        Assert.That(values, Does.Contain(InventoryTextType.RegularContent));
        Assert.That(values, Does.Contain(InventoryTextType.StudyBibleContent));
    }

    /// <summary>
    /// InventoryTextType enum: Verifies serialization matches the existing
    /// InventoryTextTypeConverter wire format (camelCase strings).
    /// INV-011: Setting names are serialization-sensitive.
    /// </summary>
    [TestCase(InventoryTextType.AllText, "allText")]
    [TestCase(InventoryTextType.VerseText, "verseText")]
    [TestCase(InventoryTextType.NonVerseText, "nonVerseText")]
    [TestCase(InventoryTextType.RegularContent, "regularContent")]
    [TestCase(InventoryTextType.StudyBibleContent, "studyBibleContent")]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void InventoryTextType_SerializesToCorrectString(
        InventoryTextType textType,
        string expectedSerialized
    )
    {
        string json = JsonSerializer.Serialize(textType, _serializerOptions);

        Assert.That(
            json,
            Does.Contain(expectedSerialized),
            $"InventoryTextType.{textType} should serialize containing '{expectedSerialized}'"
        );
    }

    #endregion

    #region Cross-Type JSON Compatibility

    /// <summary>
    /// Verifies that InventoryBuildResult with nested InventoryItemData containing ItemStatus
    /// values produces valid JSON that can be deserialized from a TypeScript-compatible format.
    /// This ensures cross-process (C# to TypeScript) serialization compatibility.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void NestedTypes_CrossProcessSerialization_RoundTripsCorrectly()
    {
        // Build a complex nested object matching what the PAPI wire format would look like
        var result = new InventoryBuildResult
        {
            Success = true,
            Items = new List<InventoryItemData>
            {
                new()
                {
                    Text = "(",
                    Counts = new Dictionary<string, int>
                    {
                        { "versetext", 10 },
                        { "nonversetext", 5 },
                    },
                    Statuses = new Dictionary<string, ItemStatus>
                    {
                        { "versetext", ItemStatus.Valid },
                        { "nonversetext", ItemStatus.Invalid },
                    },
                    References = new List<int> { 1001001 },
                    TotalCount = 15,
                },
                new()
                {
                    Text = ")",
                    Counts = new Dictionary<string, int>
                    {
                        { "versetext", 10 },
                        { "nonversetext", 5 },
                    },
                    Statuses = new Dictionary<string, ItemStatus>
                    {
                        { "versetext", ItemStatus.Valid },
                        { "nonversetext", ItemStatus.Invalid },
                    },
                    References = new List<int> { 1001001 },
                    TotalCount = 15,
                },
            },
            VersePopulated = true,
            NonVersePopulated = true,
            CombinedIsMerge = true,
            SetupComplete = false,
        };

        string json = JsonSerializer.Serialize(result, _serializerOptions);
        var roundTripped = JsonSerializer.Deserialize<InventoryBuildResult>(
            json,
            _serializerOptions
        );

        Assert.That(roundTripped, Is.Not.Null);
        Assert.That(roundTripped!.Items, Has.Count.EqualTo(2));
        Assert.That(roundTripped.Items[0].Text, Is.EqualTo("("));
        Assert.That(roundTripped.Items[1].Text, Is.EqualTo(")"));
        Assert.That(roundTripped.CombinedIsMerge, Is.True);
    }

    /// <summary>
    /// Verifies that InventoryInitResult with nested PermissionState and InventoryOption list
    /// produces valid JSON that round-trips correctly.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-013")]
    [Property("InvariantId", "INV-011")]
    public void InventoryInitResult_WithFullNestedStructure_RoundTripsCorrectly()
    {
        var result = new InventoryInitResult
        {
            Success = true,
            Title = "Unmatched Pairs of Punctuation inventory: TestProject",
            IsSba = false,
            IsSeparated = true,
            SupportsSeparateInventories = true,
            Options = new List<InventoryOption>
            {
                new("Pairs", "()[]{}", "()[]", "Pairs"),
                new("ClosedByParagraph", "true", "true", "Closed by paragraph"),
                new("PoeticStyles", "", "", "Poetic styles"),
                new(
                    "IntroductionOutlineStyles",
                    "",
                    "",
                    "Introduction outline styles"
                ),
            },
            Permissions = new PermissionState
            {
                CanMakeChanges = true,
                ToggleEnabled = true,
                ButtonsEnabled = true,
            },
        };

        string json = JsonSerializer.Serialize(result, _serializerOptions);
        var roundTripped = JsonSerializer.Deserialize<InventoryInitResult>(
            json,
            _serializerOptions
        );

        Assert.That(roundTripped, Is.Not.Null);
        Assert.That(roundTripped!.Options, Has.Count.EqualTo(4));
        Assert.That(roundTripped.Options[0].Name, Is.EqualTo("Pairs"));
        Assert.That(roundTripped.Options[1].Name, Is.EqualTo("ClosedByParagraph"));
        Assert.That(roundTripped.Options[2].Name, Is.EqualTo("PoeticStyles"));
        Assert.That(roundTripped.Options[3].Name, Is.EqualTo("IntroductionOutlineStyles"));
        Assert.That(roundTripped.Permissions.CanMakeChanges, Is.True);
    }

    #endregion
}
