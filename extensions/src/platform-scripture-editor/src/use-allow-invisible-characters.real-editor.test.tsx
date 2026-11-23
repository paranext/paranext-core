// @vitest-environment jsdom
// Drives the real editor (`Editorial`) through the host wiring the web view uses when the project's
// "Allow invisible characters" setting cannot be read and is then read: the chapter is held back
// (`getChapterForEditor`), so no editor mounts, and the editor that mounts once the value arrives
// loads the project's text under it. Run through React's own scheduler (no `act()`), because the
// order of the editor's mount, its own export and the host's load is what is under test.
import { describe, it, expect, vi } from 'vitest';
import { createRef, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Editorial, type EditorRef } from '@eten-tech-foundation/platform-editor';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import {
  AllowInvisibleCharactersSetting,
  getChapterForEditor,
} from './use-allow-invisible-characters.hook';
import { getEditorViewOptions } from './editor-view-options.util';

const usjWithLiteralTilde: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'book', marker: 'id', code: 'GEN' },
    { type: 'chapter', marker: 'c', number: '1' },
    { type: 'para', marker: 'p', content: [{ type: 'verse', marker: 'v', number: '1' }, 'a~b'] },
  ],
};

const unreadable: AllowInvisibleCharactersSetting = {
  value: undefined,
  isLoading: false,
  isUnreadable: true,
};
const readable: AllowInvisibleCharactersSetting = {
  value: true,
  isLoading: false,
  isUnreadable: false,
};

/** The text of the editor's USJ paragraphs, joined. */
function getParagraphText(usj: Usj | undefined): string {
  const texts: string[] = [];
  const visit = (items: Usj['content']) => {
    items.forEach((item) => {
      if (typeof item === 'string') texts.push(item);
      else if ('content' in item && item.content) visit(item.content);
    });
  };
  if (usj) visit(usj.content);
  return texts.join('');
}

describe('holding the chapter back while the allowInvisibleCharacters setting is unreadable', () => {
  it('mounts no editor until the setting is read, and keeps a literal tilde', async () => {
    const editorRef = createRef<EditorRef | null>();
    let setSetting: (setting: AllowInvisibleCharactersSetting) => void = () => {};
    const loadedUsj = vi.fn();

    /** The web view's wiring: the chapter reaches the editor only through `getChapterForEditor`. */
    function Host() {
      const [setting, setSettingState] = useState<AllowInvisibleCharactersSetting>(unreadable);
      setSetting = setSettingState;
      const chapter = getChapterForEditor(usjWithLiteralTilde, setting);
      const options = useMemo(
        () => ({ view: getEditorViewOptions('standard', false, setting.value ?? false) }),
        [setting.value],
      );
      // The project's text arrives with the first mount, as the web view's content sync delivers it.
      useEffect(() => {
        if (!chapter) return undefined;
        const id = setTimeout(() => {
          loadedUsj(chapter);
          editorRef.current?.setUsj(chapter);
        }, 100);
        return () => clearTimeout(id);
      }, [chapter]);
      return chapter ? <Editorial ref={editorRef} options={options} /> : <div role="status" />;
    }

    // React's scheduler drives this test on purpose, so its updates are not wrapped in `act()`.
    const previousActEnvironment = Reflect.get(globalThis, 'IS_REACT_ACT_ENVIRONMENT');
    Reflect.set(globalThis, 'IS_REACT_ACT_ENVIRONMENT', false);
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<Host />);
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 300);
      });
      expect(editorRef.current).toBeNull();
      expect(loadedUsj).not.toHaveBeenCalled();

      setSetting(readable);
      await vi.waitFor(() => {
        expect(getParagraphText(editorRef.current?.getUsj())).toContain('a');
      });
      // Let the editor settle, then check what it would save.
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

      expect(loadedUsj).toHaveBeenCalledOnce();
      expect(getParagraphText(editorRef.current?.getUsj())).toBe('a~b');
    } finally {
      root.unmount();
      container.remove();
      Reflect.set(globalThis, 'IS_REACT_ACT_ENVIRONMENT', previousActEnvironment);
    }
  });
});
