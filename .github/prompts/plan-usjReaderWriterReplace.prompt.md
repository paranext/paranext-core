## Plan: Implement `replace` method in UsjReaderWriter

Add a `replace` method that removes content between two USJ locations and optionally inserts plaintext, handling partial markers and merging identical sibling markers.

### Steps

1. **Add interface declaration** in [usj-reader-writer.model.ts](lib/platform-bible-utils/src/scripture/usj-reader-writer.model.ts#L580) - add `replace(start: UsjNodeAndDocumentLocation<UsjMarkerLocation | UsjTextContentLocation>, end: UsjNodeAndDocumentLocation<UsjMarkerLocation | UsjTextContentLocation>, contentToInsert?: string): void` to `IUsjReaderWriter`

2. **Implement validation logic** in [usj-reader-writer.ts](lib/platform-bible-utils/src/scripture/usj-reader-writer.ts) - use `isUsjDocumentLocationForNode` to validate both `start` and `end` locations; throw if invalid or if `contentToInsert` contains backslashes; return early if same location and no content

3. **Implement content removal** - use `convertJsonPathToWorkingStack` to get parent/index info for both locations; handle three cases: same text node (substring splice), same parent (array splice), different parents (traverse and remove intermediate nodes, close partial markers)

4. **Implement marker cleanup logic** - use `getInfoForMarker` to check `markerTypeInfo.hasNewlineBefore`; remove `start` marker if it has no newline before and `end` is beyond it; remove any empty markers without newline before

5. **Implement sibling marker merging** - after removal, check if start's and end's containing markers are now siblings with identical properties (except `content`); if so, merge their content arrays with `contentToInsert` at the join point

6. **Call `usjChanged()`** at method end to invalidate caches (`parentMapInternal`, `fragmentsByIndexInUsfmInternal`, etc.)

### Further Considerations

1. **Test data complexity?** Should tests use existing test files like `testUSFM-2SA-1.usj` or create minimal inline USJ objects for clarity? Recommend inline objects for unit tests.

2. **Edge case: replacing across chapter boundaries?** The current spec doesn't address this; should we throw an error or allow it? Recommend allowing it but documenting the behavior.

3. **Edge case: start after end?** Should we swap them automatically or throw an error? Recommend throwing an error with a clear message.
