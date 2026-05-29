using System;
using System.Collections.Generic;
using System.Text.Json;
using Paranext.DataProvider.BackupRestore;
using Paranext.DataProvider.JsonUtils;

namespace TestParanextDataProvider.BackupRestore;

/// <summary>
/// DELTA-005 regression tests for the 6 polymorphic wire envelopes returned by
/// the M-001/M-002/M-003/M-004/M-010/M-011 methods of
/// <see cref="BackupRestoreDataProvider"/>.
///
/// <para>
/// Before DELTA-005, the 6 abstract base records lacked <c>[JsonPolymorphic]</c> +
/// <c>[JsonDerivedType]</c> attributes. When serialized through the JSON-RPC
/// formatter against their abstract base type (the typed return shape on the
/// wire), System.Text.Json saw no properties on the base and emitted a bare
/// <c>{}</c> envelope. The React UI then read <c>status</c>, <c>destinationPath</c>,
/// <c>errorCode</c>, etc. as undefined — the bug surfaced by the runtime
/// feature-explorer harness as <c>wire-envelope-empty</c> on six methods.
/// </para>
///
/// <para>
/// These tests serialize each result via its abstract base type (not the concrete
/// subtype) using the production <see cref="SerializationOptions.CreateSerializationOptions"/>
/// options, then assert that the resulting JSON contains both the discriminator
/// (<c>status</c>) and the subtype's fields. They round-trip back via the
/// abstract base type to prove deserialization restores the concrete subtype.
/// </para>
///
/// <para>
/// At least one non-Success variant is covered for every envelope that has one
/// (BackupResult OverwriteRequired + Error, RestoreSessionResult Error,
/// RestoreOperationResult ConfirmationRequired + Error, CompareBackupFileResult
/// Error, GetCompareSourceContentResult Error). CloseRestoreSessionResult has
/// only Success in the contract today; its test exercises the discriminator
/// for the Success case.
/// </para>
///
/// Traceability:
///   - Delta: DELTA-005 (backend-implementation-deltas.json)
///   - Precedent: c-sharp/Checklists/ChecklistContentItem.cs:30
///   - Contracts: data-contracts.md §3.1, §3.2, §3.7, §3.8, §3.12, §4.6
/// </summary>
[TestFixture]
internal class WireSerializationTests
{
    private JsonSerializerOptions _options = null!;

    [SetUp]
    public void SetUp()
    {
        _options = SerializationOptions.CreateSerializationOptions();
    }

    // -----------------------------------------------------------------------
    // BackupResult — data-contracts.md §3.1 — 3 variants
    // -----------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("Delta", "DELTA-005")]
    [Property("Contract", "BackupResult.Success")]
    public void BackupResult_Success_RoundTripsViaBase_PreservesDiscriminatorAndFields()
    {
        BackupResult value = new BackupResult.Success(
            DestinationPath: "/tmp/backup.zip",
            FileSizeBytes: 1234,
            BackupLogEntryWritten: true
        );

        var json = JsonSerializer.Serialize(value, _options);
        Assert.That(json, Does.Contain("\"status\":\"success\""), "discriminator missing");
        Assert.That(json, Does.Contain("\"destinationPath\":\"/tmp/backup.zip\""));
        Assert.That(json, Does.Contain("\"fileSizeBytes\":1234"));
        Assert.That(json, Does.Contain("\"backupLogEntryWritten\":true"));

        var actual = JsonSerializer.Deserialize<BackupResult>(json, _options);
        Assert.That(actual, Is.TypeOf<BackupResult.Success>());
        var success = (BackupResult.Success)actual!;
        Assert.That(success.DestinationPath, Is.EqualTo("/tmp/backup.zip"));
        Assert.That(success.FileSizeBytes, Is.EqualTo(1234));
        Assert.That(success.BackupLogEntryWritten, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("Delta", "DELTA-005")]
    [Property("Contract", "BackupResult.OverwriteRequired")]
    public void BackupResult_OverwriteRequired_RoundTripsViaBase_PreservesDiscriminatorAndFields()
    {
        BackupResult value = new BackupResult.OverwriteRequired(ExistingPath: "/tmp/existing.zip");

        var json = JsonSerializer.Serialize(value, _options);
        Assert.That(
            json,
            Does.Contain("\"status\":\"overwrite-required\""),
            "kebab-case discriminator missing"
        );
        Assert.That(json, Does.Contain("\"existingPath\":\"/tmp/existing.zip\""));

        var actual = JsonSerializer.Deserialize<BackupResult>(json, _options);
        Assert.That(actual, Is.TypeOf<BackupResult.OverwriteRequired>());
        Assert.That(
            ((BackupResult.OverwriteRequired)actual!).ExistingPath,
            Is.EqualTo("/tmp/existing.zip")
        );
    }

    [Test]
    [Category("Contract")]
    [Property("Delta", "DELTA-005")]
    [Property("Contract", "BackupResult.Error")]
    public void BackupResult_Error_RoundTripsViaBase_PreservesDiscriminatorAndFields()
    {
        BackupResult value = new BackupResult.Error(
            ErrorCode: BackupErrorCode.InvalidDestPath,
            ErrorKey: "%backup_invalidDestPath%",
            ErrorField: "destinationPath",
            ErrorArgs: new List<string> { "/bad/path" }
        );

        var json = JsonSerializer.Serialize(value, _options);
        Assert.That(json, Does.Contain("\"status\":\"error\""), "discriminator missing");
        Assert.That(json, Does.Contain("\"errorCode\":\"invalidDestPath\""));
        Assert.That(json, Does.Contain("\"errorKey\":\"%backup_invalidDestPath%\""));
        Assert.That(json, Does.Contain("\"errorField\":\"destinationPath\""));
        Assert.That(json, Does.Contain("\"/bad/path\""));

        var actual = JsonSerializer.Deserialize<BackupResult>(json, _options);
        Assert.That(actual, Is.TypeOf<BackupResult.Error>());
        var error = (BackupResult.Error)actual!;
        Assert.That(error.ErrorCode, Is.EqualTo(BackupErrorCode.InvalidDestPath));
        Assert.That(error.ErrorKey, Is.EqualTo("%backup_invalidDestPath%"));
        Assert.That(error.ErrorField, Is.EqualTo("destinationPath"));
        Assert.That(error.ErrorArgs, Is.EqualTo(new[] { "/bad/path" }));
    }

    // -----------------------------------------------------------------------
    // RestoreSessionResult — data-contracts.md §3.2 — 2 variants
    // -----------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("Delta", "DELTA-005")]
    [Property("Contract", "RestoreSessionResult.Success")]
    public void RestoreSessionResult_Success_RoundTripsViaBase_PreservesDiscriminatorAndFields()
    {
        var metadata = new RestorerMetadata
        {
            FilePath = "/tmp/backup.zip",
            Description = "test backup",
            ProjectName = "TEST",
            ProjectGuid = "f8c4f3e2-1234-5678-abcd-ef0123456789",
            IsLegacyBackup = false,
            SharedProjectMarkers = false,
            AllFiles = Array.Empty<RestoreFileEntry>(),
            HasFigures = false,
        };
        RestoreSessionResult value = new RestoreSessionResult.Success(
            SessionId: "abcdef012345",
            Metadata: metadata
        );

        var json = JsonSerializer.Serialize(value, _options);
        Assert.That(json, Does.Contain("\"status\":\"success\""));
        Assert.That(json, Does.Contain("\"sessionId\":\"abcdef012345\""));
        Assert.That(json, Does.Contain("\"projectName\":\"TEST\""));

        var actual = JsonSerializer.Deserialize<RestoreSessionResult>(json, _options);
        Assert.That(actual, Is.TypeOf<RestoreSessionResult.Success>());
        var success = (RestoreSessionResult.Success)actual!;
        Assert.That(success.SessionId, Is.EqualTo("abcdef012345"));
        Assert.That(success.Metadata.ProjectName, Is.EqualTo("TEST"));
    }

    [Test]
    [Category("Contract")]
    [Property("Delta", "DELTA-005")]
    [Property("Contract", "RestoreSessionResult.Error")]
    public void RestoreSessionResult_Error_RoundTripsViaBase_PreservesDiscriminatorAndFields()
    {
        RestoreSessionResult value = new RestoreSessionResult.Error(
            ErrorCode: RestoreSessionErrorCode.InvalidBackupFile,
            ErrorKey: "%restore_invalidBackupFile%",
            ErrorArgs: new List<string> { "/tmp/corrupt.zip" }
        );

        var json = JsonSerializer.Serialize(value, _options);
        Assert.That(json, Does.Contain("\"status\":\"error\""));
        Assert.That(json, Does.Contain("\"errorCode\":\"invalidBackupFile\""));
        Assert.That(json, Does.Contain("\"errorKey\":\"%restore_invalidBackupFile%\""));
        Assert.That(json, Does.Contain("\"/tmp/corrupt.zip\""));

        var actual = JsonSerializer.Deserialize<RestoreSessionResult>(json, _options);
        Assert.That(actual, Is.TypeOf<RestoreSessionResult.Error>());
        var error = (RestoreSessionResult.Error)actual!;
        Assert.That(error.ErrorCode, Is.EqualTo(RestoreSessionErrorCode.InvalidBackupFile));
        Assert.That(error.ErrorKey, Is.EqualTo("%restore_invalidBackupFile%"));
    }

    // -----------------------------------------------------------------------
    // RestoreOperationResult — data-contracts.md §3.7 — 3 variants
    // -----------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("Delta", "DELTA-005")]
    [Property("Contract", "RestoreOperationResult.Success")]
    public void RestoreOperationResult_Success_RoundTripsViaBase_PreservesDiscriminatorAndFields()
    {
        RestoreOperationResult value = new RestoreOperationResult.Success(
            RestoredProjectId: "project-001",
            IsNoteType: false
        );

        var json = JsonSerializer.Serialize(value, _options);
        Assert.That(json, Does.Contain("\"status\":\"success\""));
        Assert.That(json, Does.Contain("\"restoredProjectId\":\"project-001\""));
        Assert.That(json, Does.Contain("\"isNoteType\":false"));

        var actual = JsonSerializer.Deserialize<RestoreOperationResult>(json, _options);
        Assert.That(actual, Is.TypeOf<RestoreOperationResult.Success>());
        var success = (RestoreOperationResult.Success)actual!;
        Assert.That(success.RestoredProjectId, Is.EqualTo("project-001"));
        Assert.That(success.IsNoteType, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("Delta", "DELTA-005")]
    [Property("Contract", "RestoreOperationResult.ConfirmationRequired")]
    public void RestoreOperationResult_ConfirmationRequired_RoundTripsViaBase_PreservesDiscriminatorAndFields()
    {
        RestoreOperationResult value = new RestoreOperationResult.ConfirmationRequired(
            Kind: ConfirmationKind.DowngradeFiles,
            MessageKey: "%restore_downgradeWarning%",
            RequiresDowngradeConfirmation: new List<string> { "file-001", "file-002" }
        );

        var json = JsonSerializer.Serialize(value, _options);
        Assert.That(
            json,
            Does.Contain("\"status\":\"confirmation-required\""),
            "kebab-case discriminator missing"
        );
        Assert.That(json, Does.Contain("\"kind\":\"downgradeFiles\""));
        Assert.That(json, Does.Contain("\"messageKey\":\"%restore_downgradeWarning%\""));
        Assert.That(json, Does.Contain("\"file-001\""));
        Assert.That(json, Does.Contain("\"file-002\""));

        var actual = JsonSerializer.Deserialize<RestoreOperationResult>(json, _options);
        Assert.That(actual, Is.TypeOf<RestoreOperationResult.ConfirmationRequired>());
        var conf = (RestoreOperationResult.ConfirmationRequired)actual!;
        Assert.That(conf.Kind, Is.EqualTo(ConfirmationKind.DowngradeFiles));
        Assert.That(conf.MessageKey, Is.EqualTo("%restore_downgradeWarning%"));
        Assert.That(
            conf.RequiresDowngradeConfirmation,
            Is.EqualTo(new[] { "file-001", "file-002" })
        );
    }

    [Test]
    [Category("Contract")]
    [Property("Delta", "DELTA-005")]
    [Property("Contract", "RestoreOperationResult.Error")]
    public void RestoreOperationResult_Error_RoundTripsViaBase_PreservesDiscriminatorAndFields()
    {
        RestoreOperationResult value = new RestoreOperationResult.Error(
            ErrorCode: RestoreOperationErrorCode.MigrationFailed,
            ErrorKey: "%restore_migrationFailed%",
            ErrorArgs: null
        );

        var json = JsonSerializer.Serialize(value, _options);
        Assert.That(json, Does.Contain("\"status\":\"error\""));
        Assert.That(json, Does.Contain("\"errorCode\":\"migrationFailed\""));
        Assert.That(json, Does.Contain("\"errorKey\":\"%restore_migrationFailed%\""));

        var actual = JsonSerializer.Deserialize<RestoreOperationResult>(json, _options);
        Assert.That(actual, Is.TypeOf<RestoreOperationResult.Error>());
        var error = (RestoreOperationResult.Error)actual!;
        Assert.That(error.ErrorCode, Is.EqualTo(RestoreOperationErrorCode.MigrationFailed));
        Assert.That(error.ErrorKey, Is.EqualTo("%restore_migrationFailed%"));
    }

    // -----------------------------------------------------------------------
    // CompareBackupFileResult — data-contracts.md §3.8 — 2 variants
    // -----------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("Delta", "DELTA-005")]
    [Property("Contract", "CompareBackupFileResult.Success")]
    public void CompareBackupFileResult_Success_RoundTripsViaBase_PreservesDiscriminatorAndFields()
    {
        var config = new FileCompareConfig
        {
            LeftLabelKey = "%restore_fileFromZip%",
            RightLabelKey = "%restore_fileInProject%",
            InitialBookId = "GEN",
            InitialChapter = 1,
            InitialVerse = 1,
            LeftSourceToken = "token-left-001",
            RightSourceToken = "token-right-001",
            DisplayOptions = DiffToolDisplayOptions.ShowToolbar,
        };
        CompareBackupFileResult value = new CompareBackupFileResult.Success(config);

        var json = JsonSerializer.Serialize(value, _options);
        Assert.That(json, Does.Contain("\"status\":\"success\""));
        Assert.That(json, Does.Contain("\"leftSourceToken\":\"token-left-001\""));
        Assert.That(json, Does.Contain("\"rightSourceToken\":\"token-right-001\""));
        Assert.That(json, Does.Contain("\"initialBookId\":\"GEN\""));

        var actual = JsonSerializer.Deserialize<CompareBackupFileResult>(json, _options);
        Assert.That(actual, Is.TypeOf<CompareBackupFileResult.Success>());
        var success = (CompareBackupFileResult.Success)actual!;
        Assert.That(success.Config.LeftSourceToken, Is.EqualTo("token-left-001"));
        Assert.That(success.Config.InitialBookId, Is.EqualTo("GEN"));
    }

    [Test]
    [Category("Contract")]
    [Property("Delta", "DELTA-005")]
    [Property("Contract", "CompareBackupFileResult.Error")]
    public void CompareBackupFileResult_Error_RoundTripsViaBase_PreservesDiscriminatorAndFields()
    {
        CompareBackupFileResult value = new CompareBackupFileResult.Error(
            ErrorCode: CompareBackupFileErrorCode.InvalidSession,
            ErrorKey: "%restore_invalidSession%"
        );

        var json = JsonSerializer.Serialize(value, _options);
        Assert.That(json, Does.Contain("\"status\":\"error\""));
        Assert.That(json, Does.Contain("\"errorCode\":\"invalidSession\""));
        Assert.That(json, Does.Contain("\"errorKey\":\"%restore_invalidSession%\""));

        var actual = JsonSerializer.Deserialize<CompareBackupFileResult>(json, _options);
        Assert.That(actual, Is.TypeOf<CompareBackupFileResult.Error>());
        var error = (CompareBackupFileResult.Error)actual!;
        Assert.That(error.ErrorCode, Is.EqualTo(CompareBackupFileErrorCode.InvalidSession));
        Assert.That(error.ErrorKey, Is.EqualTo("%restore_invalidSession%"));
    }

    // -----------------------------------------------------------------------
    // CloseRestoreSessionResult — data-contracts.md §4.6 — 1 variant
    // -----------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("Delta", "DELTA-005")]
    [Property("Contract", "CloseRestoreSessionResult.Success")]
    public void CloseRestoreSessionResult_Success_RoundTripsViaBase_PreservesDiscriminator()
    {
        CloseRestoreSessionResult value = new CloseRestoreSessionResult.Success();

        var json = JsonSerializer.Serialize(value, _options);
        Assert.That(
            json,
            Does.Contain("\"status\":\"success\""),
            "Without the polymorphism attributes this would be '{}' (DELTA-005)."
        );

        var actual = JsonSerializer.Deserialize<CloseRestoreSessionResult>(json, _options);
        Assert.That(actual, Is.TypeOf<CloseRestoreSessionResult.Success>());
    }

    // -----------------------------------------------------------------------
    // GetCompareSourceContentResult — data-contracts.md §3.12 — 2 variants
    // -----------------------------------------------------------------------

    [Test]
    [Category("Contract")]
    [Property("Delta", "DELTA-005")]
    [Property("Contract", "GetCompareSourceContentResult.Success")]
    public void GetCompareSourceContentResult_Success_RoundTripsViaBase_PreservesDiscriminatorAndFields()
    {
        GetCompareSourceContentResult value = new GetCompareSourceContentResult.Success(
            Text: "\\c 1\n\\p\n\\v 1 In the beginning..."
        );

        var json = JsonSerializer.Serialize(value, _options);
        Assert.That(json, Does.Contain("\"status\":\"success\""));
        Assert.That(json, Does.Contain("In the beginning"));

        var actual = JsonSerializer.Deserialize<GetCompareSourceContentResult>(json, _options);
        Assert.That(actual, Is.TypeOf<GetCompareSourceContentResult.Success>());
        var success = (GetCompareSourceContentResult.Success)actual!;
        Assert.That(success.Text, Does.Contain("In the beginning"));
    }

    [Test]
    [Category("Contract")]
    [Property("Delta", "DELTA-005")]
    [Property("Contract", "GetCompareSourceContentResult.Error")]
    public void GetCompareSourceContentResult_Error_RoundTripsViaBase_PreservesDiscriminatorAndFields()
    {
        GetCompareSourceContentResult value = new GetCompareSourceContentResult.Error(
            ErrorCode: GetCompareSourceContentErrorCode.InvalidToken,
            ErrorKey: "%compare_invalidSourceToken%"
        );

        var json = JsonSerializer.Serialize(value, _options);
        Assert.That(json, Does.Contain("\"status\":\"error\""));
        // GetCompareSourceContentErrorCode uses [EnumMember] with SCREAMING_SNAKE_CASE
        // values per data-contracts §3.12 — but those EnumMember attrs are honored only
        // by DataContractJsonSerializer, not System.Text.Json's JsonStringEnumConverter,
        // which still emits the camelCase form. The JSON value is therefore
        // "invalidToken" — exactly what the TypeScript wire union ("INVALID_TOKEN")
        // doesn't quite match. We assert the actual System.Text.Json output here; any
        // future mapping fix is out of scope for DELTA-005 (this delta is only about
        // the discriminator).
        Assert.That(json, Does.Contain("\"errorCode\""));
        Assert.That(json, Does.Contain("\"errorKey\":\"%compare_invalidSourceToken%\""));

        var actual = JsonSerializer.Deserialize<GetCompareSourceContentResult>(json, _options);
        Assert.That(actual, Is.TypeOf<GetCompareSourceContentResult.Error>());
        var error = (GetCompareSourceContentResult.Error)actual!;
        Assert.That(error.ErrorCode, Is.EqualTo(GetCompareSourceContentErrorCode.InvalidToken));
        Assert.That(error.ErrorKey, Is.EqualTo("%compare_invalidSourceToken%"));
    }

    // -----------------------------------------------------------------------
    // Flagship regression test — DELTA-005 happy-path proof
    //
    // The bug surfaced because the abstract base type, when serialized, omitted
    // every subtype field. This test asserts that the serialized JSON for a
    // non-Success variant (the case the runtime feature-explorer flagged) is
    // strictly NOT the empty object — this is the smoke that catches a
    // future regression if someone removes the attributes.
    // -----------------------------------------------------------------------

    [Test]
    [Category("Regression")]
    [Property("Delta", "DELTA-005")]
    public void NonSuccessVariants_DoNotSerializeAsEmptyEnvelope()
    {
        var samples = new BackupResult[]
        {
            new BackupResult.OverwriteRequired("/tmp/x.zip"),
            new BackupResult.Error(BackupErrorCode.IoError, "%backup_ioError%"),
        };

        foreach (var sample in samples)
        {
            var json = JsonSerializer.Serialize(sample, _options);
            Assert.That(
                json,
                Is.Not.EqualTo("{}"),
                $"variant {sample.GetType().Name} serialized as bare {{}} — DELTA-005 regressed"
            );
            Assert.That(
                json,
                Does.Contain("\"status\""),
                $"variant {sample.GetType().Name} missing discriminator — DELTA-005 regressed"
            );
        }
    }
}
