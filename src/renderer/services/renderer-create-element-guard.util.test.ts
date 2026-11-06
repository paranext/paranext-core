import { describe, expect, test } from 'vitest';
import { isCreateElementAllowedByStack } from '@renderer/services/renderer-create-element-guard.util';

const DEV_CREATE_ELEMENT_FRAME =
  'at document.createElement (http://localhost:1212/renderer.dev.js:136213:36)';
const PACKAGED_CREATE_ELEMENT_FRAME =
  'at Qt.document.createElement (file:///C:/Users/app.asar/dist/renderer/renderer.js:2:12345)';

const USERSNAP_CHUNK =
  'https://resources.usersnap.com/widget-assets/js/chunks/9208/a6b0c749ffd655a6.js';

/** Builds a stack trace the way V8 formats `Error().stack` */
const stack = (...frames: string[]) =>
  ['Error', ...frames.map((frame) => `    ${frame}`)].join('\n');

/** Frames Usersnap's widget produces after its first frame, captured from a live dev app */
const USERSNAP_TAIL_FRAMES = [
  `at sx (${USERSNAP_CHUNK}:3:126885)`,
  `at sw (${USERSNAP_CHUNK}:3:118673)`,
  `at ${USERSNAP_CHUNK}:3:118457`,
  `at sv (${USERSNAP_CHUNK}:3:118465)`,
  `at ss (${USERSNAP_CHUNK}:3:114621)`,
  `at sX (${USERSNAP_CHUNK}:3:136973)`,
  `at N (${USERSNAP_CHUNK}:3:187001)`,
  'at T.<computed> (https://resources.usersnap.com/widget-assets/js/entries/globalSetup/5db1532558c74f3c.js:2:64915)',
];

describe.each([
  {
    mode: 'development',
    isPackaged: false,
    createElementFrame: DEV_CREATE_ELEMENT_FRAME,
    rendererScriptFrame: 'at __webpack_require__.l (http://localhost:1212/renderer.dev.js:1:2)',
    foreignFirstFrame:
      'at document.createElement (http://localhost:1212/evil.web-view.html.js:1:2)',
  },
  {
    mode: 'packaged',
    isPackaged: true,
    createElementFrame: PACKAGED_CREATE_ELEMENT_FRAME,
    rendererScriptFrame: 'at i.l (file:///C:/Users/app.asar/dist/renderer/renderer.js:1:2)',
    foreignFirstFrame:
      'at Qt.document.createElement (file:///C:/Users/app.asar/dist/renderer/stuffnthings:1:2)',
  },
])(
  'isCreateElementAllowedByStack ($mode)',
  ({ isPackaged, createElementFrame, rendererScriptFrame, foreignFirstFrame }) => {
    test('allows a call from the renderer script', () => {
      expect(
        isCreateElementAllowedByStack(stack(createElementFrame, rendererScriptFrame), isPackaged),
      ).toBe(true);
    });

    test('allows a call from a named Usersnap frame', () => {
      const stackTrace = stack(
        createElementFrame,
        'at Kl (https://resources.usersnap.com/widget-assets/js/chunks/6057/cf91460f62d8c495661e.js:1:2)',
      );
      expect(isCreateElementAllowedByStack(stackTrace, isPackaged)).toBe(true);
    });

    test('allows a call from an anonymous Usersnap frame', () => {
      const stackTrace = stack(
        createElementFrame,
        `at ${USERSNAP_CHUNK}:3:122681`,
        ...USERSNAP_TAIL_FRAMES,
      );
      expect(isCreateElementAllowedByStack(stackTrace, isPackaged)).toBe(true);
    });

    test('rejects a web view frame between createElement and a Usersnap frame', () => {
      const stackTrace = stack(
        createElementFrame,
        'at evil.web-view.html (about:srcdoc:1:1)',
        `at ${USERSNAP_CHUNK}:3:122681`,
        ...USERSNAP_TAIL_FRAMES,
      );
      expect(isCreateElementAllowedByStack(stackTrace, isPackaged)).toBe(false);
    });

    test.each([
      [
        'a look-alike host (anonymous)',
        'https://resources.usersnap.com.evil.example/widget-assets/js/chunks/1/a.js:1:2',
      ],
      [
        'a look-alike host (named)',
        'Kl (https://resources.usersnap.com.evil.example/widget-assets/js/chunks/1/a.js:1:2)',
      ],
      ['another path (anonymous)', 'https://resources.usersnap.com/other/1/a.js:1:2'],
      ['another path (named)', 'Kl (https://resources.usersnap.com/other/1/a.js:1:2)'],
    ])('rejects a Usersnap-like frame on %s', (_description, frame) => {
      expect(
        isCreateElementAllowedByStack(stack(createElementFrame, `at ${frame}`), isPackaged),
      ).toBe(false);
    });

    test('rejects a caller whose single-line function name imitates an anonymous Usersnap frame', () => {
      const stackTrace = stack(
        createElementFrame,
        `at ${USERSNAP_CHUNK}:3:122681 (about:srcdoc:1:1)`,
        ...USERSNAP_TAIL_FRAMES,
      );
      expect(isCreateElementAllowedByStack(stackTrace, isPackaged)).toBe(false);
    });

    test('rejects a stack with no createElement frame', () => {
      const stackTrace = stack(rendererScriptFrame, `at ${USERSNAP_CHUNK}:3:122681`);
      expect(isCreateElementAllowedByStack(stackTrace, isPackaged)).toBe(false);
    });

    test.each([
      ['the renderer script', rendererScriptFrame],
      ['an anonymous Usersnap frame', `at ${USERSNAP_CHUNK}:3:122681`],
    ])(
      'rejects a createElement frame outside the renderer script followed by %s',
      (_description, secondFrame) => {
        expect(
          isCreateElementAllowedByStack(stack(foreignFirstFrame, secondFrame), isPackaged),
        ).toBe(false);
      },
    );

    test('rejects the stack shape of the other build mode', () => {
      const otherCreateElementFrame = isPackaged
        ? DEV_CREATE_ELEMENT_FRAME
        : PACKAGED_CREATE_ELEMENT_FRAME;
      expect(
        isCreateElementAllowedByStack(
          stack(otherCreateElementFrame, `at ${USERSNAP_CHUNK}:3:122681`),
          isPackaged,
        ),
      ).toBe(false);
    });
  },
);
