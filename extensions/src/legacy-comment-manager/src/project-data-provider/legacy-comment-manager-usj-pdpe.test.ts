import { Usj, USJ_TYPE, USJ_VERSION } from '@eten-tech-foundation/scripture-utilities';
import { describe, expect, it } from 'vitest';
import { UsjDocumentLocation } from 'platform-bible-utils';
import { extractCommentScriptureText } from './legacy-comment-manager-usj.utils';

/**
 * Sample USJ document for Genesis 1:1-3.
 *
 * This represents a minimal but realistic USJ structure with:
 *
 * - Book and chapter markers
 * - Multiple verses
 * - Simple text content
 */
const sampleGenesisUsj: Usj = {
  type: USJ_TYPE,
  version: USJ_VERSION,
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['Genesis'] },
    { type: 'para', marker: 'h', content: ['Genesis'] },
    {
      type: 'chapter',
      marker: 'c',
      number: '1',
      sid: 'GEN 1',
    },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' },
        'In the beginning God created the heavens and the earth. ',
        { type: 'verse', marker: 'v', number: '2', sid: 'GEN 1:2' },
        'The earth was formless and empty. Darkness was on the surface of the deep and ',
        "God's Spirit was hovering over the surface of the waters. ",
        { type: 'verse', marker: 'v', number: '3', sid: 'GEN 1:3' },
        'God said, "Let there be light," and there was light.',
      ],
    },
  ],
};

/** USJ document with nested character markers (e.g., emphasis within text). */
const sampleUsjWithMarkers: Usj = {
  type: USJ_TYPE,
  version: USJ_VERSION,
  content: [
    { type: 'book', marker: 'id', code: 'JHN', content: ['John'] },
    { type: 'para', marker: 'h', content: ['John'] },
    {
      type: 'chapter',
      marker: 'c',
      number: '1',
      sid: 'JHN 1',
    },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1', sid: 'JHN 1:1' },
        'In the beginning was the ',
        { type: 'char', marker: 'nd', content: ['Word'] },
        ', and the Word was with God.',
      ],
    },
  ],
};

describe('extractCommentScriptureText', () => {
  describe('basic text extraction', () => {
    it('should extract text from a simple verse selection', async () => {
      // Select "beginning" from "In the beginning God created..."
      // In the USJ, this is in the first text node after verse 1 marker
      const selectedTextStart: UsjDocumentLocation = {
        // Path to the paragraph content
        jsonPath: '$.content[3].content[1]',
        // Offset within "In the beginning God created the heavens and the earth. "
        offset: 7, // Start of "beginning"
      };
      const selectedTextEnd: UsjDocumentLocation = {
        jsonPath: '$.content[3].content[1]',
        offset: 16, // End of "beginning"
      };

      const result = await extractCommentScriptureText(
        selectedTextStart,
        selectedTextEnd,
        sampleGenesisUsj,
        'GEN',
      );

      expect(result).toBeDefined();
      expect(result?.selectedText).toBe('beginning');
      expect(typeof result?.startPosition).toBe('number');
    });

    it('should extract text spanning across a verse boundary', async () => {
      // Select text that spans from end of verse 1 into verse 2
      // This tests the common scenario of selecting across verse markers
      const selectedTextStart: UsjDocumentLocation = {
        jsonPath: '$.content[3].content[1]',
        // Near end of "In the beginning God created the heavens and the earth. "
        offset: 50, // "earth"
      };
      const selectedTextEnd: UsjDocumentLocation = {
        jsonPath: '$.content[3].content[3]',
        // In "The earth was formless and empty..."
        offset: 10, // After "The earth "
      };

      const result = await extractCommentScriptureText(
        selectedTextStart,
        selectedTextEnd,
        sampleGenesisUsj,
        'GEN',
      );

      expect(result).toBeDefined();
      // The result should include text spanning both verses plus the verse marker
      expect(result?.selectedText).toContain('earth');
    });

    it('should handle selection of entire verse text', () => {
      // Select the entire text of verse 3
      const selectedTextStart: UsjDocumentLocation = {
        jsonPath: '$.content[3].content[6]',
        offset: 0,
      };
      const selectedTextEnd: UsjDocumentLocation = {
        jsonPath: '$.content[3].content[6]',
        offset: 52, // Length of 'God said, "Let there be light," and there was light.'
      };

      const result = extractCommentScriptureText(
        selectedTextStart,
        selectedTextEnd,
        sampleGenesisUsj,
        'GEN',
      );

      expect(result).toBeDefined();
      expect(result?.selectedText).toBe('God said, "Let there be light," and there was light.');
    });
  });

  describe('character markers', () => {
    it('should extract text that includes character markers', async () => {
      // Select "the Word" which spans across the \nd marker
      const selectedTextStart: UsjDocumentLocation = {
        jsonPath: '$.content[3].content[1]',
        offset: 22, // At "the "
      };
      const selectedTextEnd: UsjDocumentLocation = {
        // Inside the \nd marker content
        jsonPath: '$.content[3].content[2].content[0]',
        offset: 4, // End of "Word"
      };

      const result = await extractCommentScriptureText(
        selectedTextStart,
        selectedTextEnd,
        sampleUsjWithMarkers,
        'JHN',
      );

      expect(result).toBeDefined();
      // The USFM output should include the \nd marker
      expect(result?.selectedText).toContain('Word');
    });
  });

  describe('edge cases', () => {
    it('should return correct startPosition for start of verse', async () => {
      // Select from the very beginning of verse 1 text
      const selectedTextStart: UsjDocumentLocation = {
        jsonPath: '$.content[3].content[1]',
        offset: 0, // Start of "In the beginning..."
      };
      const selectedTextEnd: UsjDocumentLocation = {
        jsonPath: '$.content[3].content[1]',
        offset: 2, // "In"
      };

      const result = await extractCommentScriptureText(
        selectedTextStart,
        selectedTextEnd,
        sampleGenesisUsj,
        'GEN',
      );

      expect(result).toBeDefined();
      expect(result?.selectedText).toBe('In');
      // startPosition should be the offset from the verse marker
      expect(result?.startPosition).toBeGreaterThanOrEqual(0);
    });

    it('should handle zero-length selection (cursor position)', async () => {
      // Select nothing (same start and end)
      const selectedTextStart: UsjDocumentLocation = {
        jsonPath: '$.content[3].content[1]',
        offset: 10,
      };
      const selectedTextEnd: UsjDocumentLocation = {
        jsonPath: '$.content[3].content[1]',
        offset: 10,
      };

      const result = await extractCommentScriptureText(
        selectedTextStart,
        selectedTextEnd,
        sampleGenesisUsj,
        'GEN',
      );

      expect(result).toBeDefined();
      expect(result?.selectedText).toBe('');
    });
  });

  describe('error handling', () => {
    it('should throw on invalid USJ document', () => {
      const invalidUsj: Usj = {
        type: USJ_TYPE,
        version: USJ_VERSION,
        content: [], // Empty content - no verses
      };

      const selectedTextStart: UsjDocumentLocation = {
        jsonPath: '$.content[0].content[0]',
        offset: 0,
      };
      const selectedTextEnd: UsjDocumentLocation = {
        jsonPath: '$.content[0].content[0]',
        offset: 5,
      };

      expect(() =>
        extractCommentScriptureText(selectedTextStart, selectedTextEnd, invalidUsj, 'GEN'),
      ).toThrow();
    });

    it('should throw on invalid jsonPath', () => {
      // Use a valid jsonPath format that points to a non-existent location in the document
      // This simulates what would happen if the editor sends stale location data
      const selectedTextStart: UsjDocumentLocation = {
        // Valid format but points to content index 999 which doesn't exist
        jsonPath: '$.content[999].content[0]',
        offset: 0,
      };
      const selectedTextEnd: UsjDocumentLocation = {
        jsonPath: '$.content[999].content[0]',
        offset: 5,
      };

      expect(() =>
        extractCommentScriptureText(selectedTextStart, selectedTextEnd, sampleGenesisUsj, 'GEN'),
      ).toThrow();
    });
  });
});
