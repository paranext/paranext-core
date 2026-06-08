namespace Paranext.DataProvider.BackupRestore;

/// <summary>
/// The flat, in-process result of the <see cref="BackupValidationService.ValidateData"/>
/// 3-rule chain (EXT-102). Carries the first failing rule's key + field, or the
/// "all rules pass" sentinel when <see cref="IsValid"/> is <c>true</c>.
/// </summary>
/// <remarks>
/// <para>
/// CAP-014 (Cross-Capability Interfaces table, strategic-plan-backend.md §line 641):
/// this record is OWNED by CAP-014's <see cref="BackupValidationService"/> and is the
/// shared contract consumed by:
/// </para>
/// <list type="bullet">
///   <item>CAP-010 — M-009 <c>validateBackup</c> wire method (wraps this into the
///   nested <c>{ canSubmit, errors: { ... } }</c> wire shape per data-contracts.md §3.13).</item>
///   <item>CAP-022 — BackupOrchestrator pre-flight check before invoking
///   <c>Backup.BackupScrText</c>.</item>
/// </list>
///
/// <para>
/// On success: <c>IsValid=true</c>, <c>ErrorKey=""</c>, <c>ErrorField=""</c>.<br/>
/// On failure: <c>IsValid=false</c>, <c>ErrorKey="%backup_*%"</c> (a localize-key
/// placeholder per Localization-Guide.md, resolved at the wire boundary by the
/// <c>Loc</c> helper in <c>BackupRestoreDataProvider</c>), <c>ErrorField</c> is one of
/// <c>"projectId"</c>, <c>"userName"</c>, <c>"destinationPath"</c> — matching the
/// nested-error field names from data-contracts.md §3.13.
/// </para>
///
/// <para>
/// PT9 origin: <c>BackupForm.ValidateData</c> at
/// <c>Paratext/BackupRestore/BackupForm.cs:220-249</c> uses three separate
/// <c>ErrorProvider.SetError(control, message)</c> calls instead of a return value;
/// the PT10 port collapses those into this record's <c>(ErrorKey, ErrorField)</c>
/// pair so the validation is callable as a pure function.
/// </para>
/// </remarks>
/// <param name="IsValid">
/// <c>true</c> when all three rules pass; <c>false</c> when at least one rule fails.
/// </param>
/// <param name="ErrorKey">
/// Empty string when <see cref="IsValid"/> is <c>true</c>; otherwise the
/// <c>%localize-key%</c> placeholder for the first failing rule.
/// </param>
/// <param name="ErrorField">
/// Empty string when <see cref="IsValid"/> is <c>true</c>; otherwise the wire-side
/// field name (<c>"projectId"</c>, <c>"userName"</c>, or <c>"destinationPath"</c>)
/// the failing rule applies to.
/// </param>
public record BackupValidationResult(bool IsValid, string ErrorKey, string ErrorField);
