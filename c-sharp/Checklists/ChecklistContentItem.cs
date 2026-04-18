namespace Paranext.DataProvider.Checklists;

/// <summary>
/// RED-phase skeleton for the polymorphic checklist content-item hierarchy.
///
/// <para>
/// The implementer MUST add <c>[JsonDerivedType]</c> attributes to this base record
/// (one per subtype) with a type discriminator so the <c>SerializationOptions</c>
/// pipeline preserves subtype identity on a <c>List&lt;ChecklistContentItem&gt;</c>.
/// The BE-1 polymorphism test in
/// <c>c-sharp-tests/Checklists/ChecklistContentItemPolymorphismTests.cs</c>
/// fails until that wiring is in place — this is the explicit early-verification
/// checkpoint called out by the CAP-001 strategic plan.
/// </para>
///
/// <para>
/// If <c>[JsonDerivedType]</c> on positional records does not round-trip cleanly
/// under System.Text.Json 8, the fallback is an explicit type-discriminator DTO;
/// escalate that choice before BE-2 starts so downstream capabilities plan against
/// the right shape.
/// </para>
/// </summary>
public abstract record ChecklistContentItem;
