import { describe, expect, test } from 'vitest';
import { isCreateElementCallerAllowed } from '@renderer/services/renderer-create-element-guard.util';

describe('isCreateElementCallerAllowed', () => {
  const RENDERER = 'file:///C:/app.asar/dist/renderer/renderer.js';
  const CHUNK = 'https://resources.usersnap.com/widget-assets/js/chunks/9208/a6b0c749ffd655a6.js';

  test('allows the renderer bundle itself', () => {
    expect(isCreateElementCallerAllowed(RENDERER, RENDERER)).toBe(true);
  });

  test('allows a Usersnap widget chunk', () => {
    expect(isCreateElementCallerAllowed(CHUNK, RENDERER)).toBe(true);
  });

  test.each([
    ['undefined', undefined],
    ['srcdoc document', 'about:srcdoc'],
    ['another build of the renderer bundle', 'http://localhost:1212/renderer.dev.js'],
    ['Usersnap chunk over http', CHUNK.replace('https:', 'http:')],
    ['Usersnap chunk with a query', `${CHUNK}?x=1`],
    ['Usersnap chunk with a fragment', `${CHUNK}#x`],
    [
      'Usersnap lookalike host',
      'https://resources.usersnap.com.evil.example/widget-assets/js/chunks/1/a.js',
    ],
    ['Usersnap other path', 'https://resources.usersnap.com/other/1/a.js'],
    ['renderer bundle with a suffix', `${RENDERER}.evil.js`],
    ['empty string', ''],
  ])('rejects %s', (_name, fileName) => {
    expect(isCreateElementCallerAllowed(fileName, RENDERER)).toBe(false);
  });
});
