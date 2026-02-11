# Plan: Scripture Replacement Method with USFM Caching

Add a new `replace` method to `ScriptureFinderProjectDataProviderEngine` that replaces text at specified Scripture ranges with new USFM content, using a caching layer for performance.

## Steps

1. **Add USFM overlay project interfaces to ScriptureFinderProjectDataProviderEngine**: Extend `SCRIPTURE_FINDER_OVERLAY_PROJECT_INTERFACES` in [platform-scripture-finder-pdpe.model.ts](extensions/src/platform-scripture/src/project-data-provider/platform-scripture-finder-pdpe.model.ts) to include `platformScripture.USFM_Book` and `platformScripture.USFM_Chapter` for reading/writing USFM data.

2. **Create USJ/USFM cache infrastructure**: Add private `Map` caches for book and chapter `UsjReaderWriter` instances (`#bookCache`, `#chapterCache`) with keys like `{bookId}` and `{bookId}:{chapter}`. Implement `#getOrCreateCachedReaderWriter` helper that checks caches, fetches USX → converts to USJ → creates `UsjReaderWriter` if not cached.

3. **Add cache invalidation subscriptions**: In constructor, subscribe to `platformScripture.USX_Book` and `platformScripture.USX_Chapter` changes using `{ whichUpdates: '*', retrieveDataImmediately: false }` pattern. Clear relevant cache entries in callbacks. Store unsubscriber promises and implement `dispose()` method.

4. **Refactor `#findInScope` to use cache**: Replace direct USX fetching with calls to `#getOrCreateCachedReaderWriter`. Use cached `UsjReaderWriter` for search operations.

5. **Define new project interface and types**: Add `platformScripture.replaceWithUsfm` interface in [platform-scripture.d.ts](extensions/src/platform-scripture/src/types/platform-scripture.d.ts) with `replace(rangesToReplace: ScriptureRangeUsjChapterOrUsfmVerseLocation[], usfmToInsert: string | string[]): Promise<void>` method signature. Update `SCRIPTURE_FINDER_PROJECT_INTERFACES` array.

6. **Implement `replace` method**:

   - Validate that `usfmToInsert` array length matches `rangesToReplace` length (if array); throw descriptive error if mismatched.
   - For each range, validate both endpoints are in the same book; throw if spanning multiple books.
   - Handle location type conversion: If either endpoint is a `UsjChapterLocation`, get the chapter `UsjReaderWriter` to convert it to a `UsfmVerseLocation` first. Then use the book `UsjReaderWriter` for all USFM index calculations.
   - Support ranges spanning multiple chapters by using the book-level `UsjReaderWriter` and USFM for index calculation and replacement.
   - Convert start/end to USFM indices using `UsjReaderWriter.usfmVerseLocationToIndexInUsfm()`.
   - Group ranges by book, perform string replacements in reverse index order (to preserve indices).
   - Collect all modified USFM strings, then batch-set via USFM PDPs at the end.

7. **Write unit tests before implementation**: Create [platform-scripture-finder-pdpe.test.ts](extensions/src/platform-scripture/src/project-data-provider/platform-scripture-finder-pdpe.test.ts) with tests covering: single range replacement, multiple ranges in same chapter, range spanning multiple chapters, array of replacement strings, mismatched array lengths error, cross-book validation error, `UsjChapterLocation` to `UsfmVerseLocation` conversion, cache hit/miss scenarios, and index calculation edge cases.
