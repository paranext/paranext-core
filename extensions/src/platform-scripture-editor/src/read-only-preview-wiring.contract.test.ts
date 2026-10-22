import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * The web view is too large to mount in jsdom (see `content-zoom-markers.contract.test.ts`), so this
 * source-reading contract test pins how the web view wires the read-only Preview: Preview (the
 * formatted view in Power) and the wait for `platform.interfaceMode` make the editor read-only, the
 * `\` key opens the inline marker menu only in editable text, and a never-saved Power tab shows
 * Standard view from its first frame.
 */

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));
const WEB_VIEW_FILE = path.join(SRC_DIR, 'platform-scripture-editor.web-view.tsx');

const source = readFileSync(WEB_VIEW_FILE, 'utf-8').replace(/\s+/g, ' ');

/**
 * Returns the source of `const <name> = useMemo(...)`, from the declaration through the closing
 * parenthesis after its dependency list.
 */
function sliceUseMemo(text: string, name: string): string {
  const opening = `const ${name} = useMemo(`;
  const start = text.indexOf(opening);
  if (start < 0) throw new Error(`No \`${opening}\` in the web view source`);
  let depth = 0;
  for (let index = start + opening.length - 1; index < text.length; index += 1) {
    if (text[index] === '(') depth += 1;
    else if (text[index] === ')') {
      depth -= 1;
      if (depth === 0) return text.slice(start, index + 1);
    }
  }
  throw new Error(`\`${opening}\` is never closed in the web view source`);
}

describe('the web view read-only wiring', () => {
  it('folds read-only Preview and the interface-mode wait into isReadOnlyEffective', () => {
    const body = sliceUseMemo(source, 'isReadOnlyEffective');
    expect(body).toContain('showsReadOnlyPreview(');
    expect(body).toContain('isInterfaceModeLoading');
    expect(body).not.toContain("'markers'");
  });

  it('folds read-only Preview into isDurablyReadOnly', () => {
    const body = sliceUseMemo(source, 'isDurablyReadOnly');
    expect(body).toContain('showsReadOnlyPreview(');
    expect(body).not.toContain("'markers'");
  });

  it('waits for the interface mode before titling', () => {
    expect(sliceUseMemo(source, 'isReadOnlyForTitle')).toContain('isInterfaceModeLoading');
  });

  it('chooses the caller model through usesPaneNoteModel', () => {
    const calls = source.split('usesPaneNoteModel(viewTypeRef.current, isPowerModeRef.current)');
    // noteCallerOnClick, handleFootnoteSelected and applyCallerHighlight
    expect(calls.length - 1).toBeGreaterThanOrEqual(3);
    expect(source).not.toContain("viewTypeRef.current === 'standard'");
  });

  it('focuses the pane row on a caller click in read-only Preview as in Standard view', () => {
    expect(source).toContain(
      "focusRowOnFocusRequest={ usesPaneNoteModel(viewType, isPowerMode) && noteEditingSurface === 'none' }",
    );
    expect(source).not.toContain("viewType === 'standard' && noteEditingSurface");
  });

  it('has no editable-markers dev switch', () => {
    expect(source).not.toContain('dev-editableMarkersView');
  });

  it('opens the inline marker menu only in editable text', () => {
    const handlerStart = source.indexOf('const handleKeyDown = (event: KeyboardEvent) => {');
    expect(handlerStart).toBeGreaterThanOrEqual(0);
    const handler = source.slice(handlerStart);
    const branch = handler.slice(0, handler.indexOf('showInlineMarkersMenu()'));
    expect(branch).toContain('!isReadOnlyEffective');
  });

  it('shows a never-saved Power tab as Standard view', () => {
    expect(source).toContain('isPowerMode && !isViewTypeSaved');
    // every writer goes through saveViewType: its own body holds the one remaining call
    expect(source.match(/\bsetViewType\(/g)).toHaveLength(1);
  });
});
