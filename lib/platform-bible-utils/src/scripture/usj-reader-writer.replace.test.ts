import { describe, test, expect } from 'vitest';
import UsjReaderWriter from './usj-reader-writer';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { USFM_MARKERS_MAP as USFM_MARKERS_MAP_3_0 } from './markers-maps/markers-map-3.0.model';
import { UsjMarkerLocation, UsjNodeAndDocumentLocation } from './usj-reader-writer.model';

describe('UsjReaderWriter.replace (basic cases)', () => {
  test('throws for non-node locations', () => {
    const usj: Usj = { type: 'USJ', version: '3.1', content: [] };
    const start: UsjNodeAndDocumentLocation<UsjMarkerLocation> = {
      // @ts-expect-error: intentionally malformed location for test
      node: {},
      // @ts-expect-error: intentionally malformed location for test
      documentLocation: { jsonPath: '$.content[0]', propertyOffset: 1 },
    };
    const end: UsjNodeAndDocumentLocation<UsjMarkerLocation> = {
      // @ts-expect-error: intentionally malformed location for test
      node: {},
      // @ts-expect-error: intentionally malformed location for test
      documentLocation: { jsonPath: '$.content[0]', propertyOffset: 2 },
    };
    const doc = new UsjReaderWriter(usj, { markersMap: USFM_MARKERS_MAP_3_0 });
    expect(() => doc.replace(start, end, 'x')).toThrow(/does not yet support other location types/);
  });

  test('throws when contentToInsert contains backslashes', () => {
    const usj: Usj = { type: 'USJ', version: '3.1', content: ['abc'] };
    const doc = new UsjReaderWriter(usj, { markersMap: USFM_MARKERS_MAP_3_0 });
    const start = { node: 'abc', documentLocation: { jsonPath: '$.content[0]', offset: 1 } } as any;
    const end = { node: 'abc', documentLocation: { jsonPath: '$.content[0]', offset: 2 } } as any;
    expect(() => doc.replace(start, end, 'bad\\usfm')).toThrow(
      /does not yet support replacing with USFM markers/,
    );
  });

  test('no-op when start and end same and no content', () => {
    const usj: Usj = { type: 'USJ', version: '3.1', content: ['abc'] };
    const doc = new UsjReaderWriter(usj, { markersMap: USFM_MARKERS_MAP_3_0 });
    const start = { node: 'abc', documentLocation: { jsonPath: '$.content[0]', offset: 1 } } as any;
    const end = { node: 'abc', documentLocation: { jsonPath: '$.content[0]', offset: 1 } } as any;
    doc.replace(start, end);
    expect(usj.content[0]).toBe('abc');
  });

  test('replace within same text node', () => {
    const usj: Usj = { type: 'USJ', version: '3.1', content: ['hello world'] };
    const doc = new UsjReaderWriter(usj, { markersMap: USFM_MARKERS_MAP_3_0 });
    const start = {
      node: 'hello world',
      documentLocation: { jsonPath: '$.content[0]', offset: 6 },
    } as any;
    const end = {
      node: 'hello world',
      documentLocation: { jsonPath: '$.content[0]', offset: 11 },
    } as any;
    doc.replace(start, end, 'universe');
    expect(usj.content[0]).toBe('hello universe');
  });

  test('replace across multiple sibling text nodes', () => {
    const usj: Usj = { type: 'USJ', version: '3.1', content: ['ab', 'middle', 'cd'] };
    const doc = new UsjReaderWriter(usj, { markersMap: USFM_MARKERS_MAP_3_0 });
    const start = { node: 'ab', documentLocation: { jsonPath: '$.content[0]', offset: 1 } } as any;
    const end = { node: 'cd', documentLocation: { jsonPath: '$.content[2]', offset: 1 } } as any;
    doc.replace(start, end, 'X');
    // Expect kept prefix 'a' + 'X' + kept suffix 'd' => single string 'aXd'
    expect(usj.content.length).toBe(1);
    expect(usj.content[0]).toBe('aXd');
  });

  test('replace text inside nested marker keeps the marker wrapper', () => {
    // USJ: para marker with text content
    const usj: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para', marker: 'p', content: ['hello world'] }],
    };
    const doc = new UsjReaderWriter(usj, { markersMap: USFM_MARKERS_MAP_3_0 });
    // Replace 'world' with 'universe'
    const start = {
      node: 'hello world',
      documentLocation: { jsonPath: '$.content[0].content[0]', offset: 6 },
    } as any;
    const end = {
      node: 'hello world',
      documentLocation: { jsonPath: '$.content[0].content[0]', offset: 11 },
    } as any;
    doc.replace(start, end, 'universe');
    // Marker structure should remain, text replaced
    expect((usj.content[0] as any).content[0]).toBe('hello universe');
  });

  test('delete entire text within a single node', () => {
    const usj: Usj = { type: 'USJ', version: '3.1', content: ['remove me'] };
    const doc = new UsjReaderWriter(usj, { markersMap: USFM_MARKERS_MAP_3_0 });
    const start = {
      node: 'remove me',
      documentLocation: { jsonPath: '$.content[0]', offset: 0 },
    } as any;
    const end = {
      node: 'remove me',
      documentLocation: { jsonPath: '$.content[0]', offset: 9 },
    } as any;
    doc.replace(start, end);
    // Entire node removed
    expect(usj.content.length).toBe(0);
  });

  test('replace from marker start to inside text removes marker content', () => {
    // Simulating replacing the content of a marker from its start
    // When start is a marker location and end is inside the marker's content,
    // we should remove content from the beginning up to the end position
    const usj: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para', marker: 'p', content: ['some', 'text'] }],
    };
    const doc = new UsjReaderWriter(usj, { markersMap: USFM_MARKERS_MAP_3_0 });
    // Start at the first text's end, end in the second text at offset 2
    const start = {
      node: 'some',
      documentLocation: { jsonPath: '$.content[0].content[0]', offset: 4 },
    } as any;
    const end = {
      node: 'text',
      documentLocation: { jsonPath: '$.content[0].content[1]', offset: 2 },
    } as any;
    doc.replace(start, end, 'NEW');
    // Expect the marker to now contain merged string 'someNEWxt'
    expect((usj.content[0] as any).content.length).toBe(1);
    expect((usj.content[0] as any).content[0]).toBe('someNEWxt');
  });

  test('merges identical adjacent markers after replacement', () => {
    // Two nd markers with text in between
    const usj: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        { type: 'char', marker: 'nd', content: ['Lord'] },
        'middle',
        { type: 'char', marker: 'nd', content: ['God'] },
      ],
    };
    const doc = new UsjReaderWriter(usj, { markersMap: USFM_MARKERS_MAP_3_0 });
    // Delete middle entirely by selecting from last char of first nd to first char of second nd
    // This crosses node boundaries and should merge the nd markers
    const start = {
      node: 'Lord',
      documentLocation: { jsonPath: '$.content[0].content[0]', offset: 4 },
    } as any;
    const end = {
      node: 'God',
      documentLocation: { jsonPath: '$.content[2].content[0]', offset: 0 },
    } as any;
    doc.replace(start, end);
    // Since start is in nd[0] at end and end is in nd[2] at start,
    // we should remove content[1] (middle) and merge the nd markers
    expect(usj.content.length).toBe(1);
    expect((usj.content[0] as any).marker).toBe('nd');
    // Merged content
    expect((usj.content[0] as any).content).toEqual(['LordGod']);
  });
});

describe('UsjReaderWriter.replace (advanced marker cases)', () => {
  test('removes inline marker without newline when deleted entirely', () => {
    // Inline markers like 'nd' (divine name) have hasNewlineBefore = false
    const usj: Usj = {
      type: 'USJ',
      version: '3.1',
      content: ['before', { type: 'char', marker: 'nd', content: ['Lord'] }, 'after'],
    };
    const doc = new UsjReaderWriter(usj, { markersMap: USFM_MARKERS_MAP_3_0 });
    // Delete entire nd marker by selecting from end of 'before' to start of 'after'
    const start = {
      node: 'before',
      documentLocation: { jsonPath: '$.content[0]', offset: 6 },
    } as any;
    const end = {
      node: 'after',
      documentLocation: { jsonPath: '$.content[2]', offset: 0 },
    } as any;
    doc.replace(start, end);
    // nd marker and its content removed, before and after merged
    expect(usj.content.length).toBe(1);
    expect(usj.content[0]).toBe('beforeafter');
  });

  test('insert text at cursor position (same start and end)', () => {
    const usj: Usj = { type: 'USJ', version: '3.1', content: ['hello world'] };
    const doc = new UsjReaderWriter(usj, { markersMap: USFM_MARKERS_MAP_3_0 });
    const pos = {
      node: 'hello world',
      documentLocation: { jsonPath: '$.content[0]', offset: 6 },
    } as any;
    doc.replace(pos, pos, 'beautiful ');
    expect(usj.content[0]).toBe('hello beautiful world');
  });
});
