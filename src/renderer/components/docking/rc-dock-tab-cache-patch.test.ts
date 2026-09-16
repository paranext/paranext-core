// Imports rc-dock's `es/` build on purpose: vitest resolves `rc-dock` via `main` → `lib/`, but
// patch-package (patches/rc-dock+3.3.2.patch) patches only `es/`, the build webpack ships
// (`module` → `es/`). Importing `rc-dock` here would test the unpatched code.
import { TabCache } from 'rc-dock/es/DockTabs';
import { describe, expect, it } from 'vitest';
import { createContext } from './tab-bar-drop-zone-test.util';

/**
 * Builds `parent > child > ...` from the given tag/class specs and returns the innermost element.
 * Each spec is `tag` or `tag.class`.
 */
function buildChain(parent: Element, ...specs: string[]): Element {
  let current = parent;
  specs.forEach((spec) => {
    const [tag, className] = spec.split('.');
    const element = document.createElement(tag);
    if (className) element.className = className;
    current.appendChild(element);
    current = element;
  });
  return current;
}

/** {@link buildChain} for a chain whose innermost spec is a `div`, as `TabCache`'s refs are. */
function buildDivChain(parent: Element, ...specs: string[]): HTMLDivElement {
  const innermost = buildChain(parent, ...specs);
  if (!(innermost instanceof HTMLDivElement)) throw new Error('Innermost spec must be a div');
  return innermost;
}

/**
 * The hidden tab copy rc-tabs renders inside the overflow "more" dropdown: rc-menu's `<li>` wraps a
 * `<span>`, which wraps rc-dock's drag-initiator div, which holds the `.dock-tab-hit-area` div.
 */
function createPopupHitArea(): HTMLDivElement {
  return buildDivChain(document.body, 'ul', 'li', 'span', 'div', 'div.dock-tab-hit-area');
}

/** The same hit area inside the real tab strip, which has no `<li>` between it and the strip. */
function createRealHitArea(root: Element = document.body): HTMLDivElement {
  return buildDivChain(
    root,
    'div.dock-layout',
    'div.dock-nav-list',
    'div.dock-tab',
    'div.dock-tab-btn',
    'div',
    'div.dock-tab-hit-area',
  );
}

/** The tab and hit-area refs `cache` stored from `getRef`/`getHitAreaRef`. */
function getStoredRefs(cache: TabCache): { ref: HTMLDivElement; hitAreaRef: HTMLDivElement } {
  // rc-dock declares these public fields with a leading underscore; the names aren't ours to change
  // eslint-disable-next-line no-underscore-dangle
  return { ref: cache._ref, hitAreaRef: cache._hitAreaRef };
}

describe('patched rc-dock TabCache popup check', () => {
  it('ignores a hit area three levels under an overflow-dropdown <li>', () => {
    const cache = new TabCache(createContext());

    cache.getHitAreaRef(createPopupHitArea());

    expect(getStoredRefs(cache).hitAreaRef).toBeUndefined();
  });

  it('keeps the real hit area when the dropdown copy registers after it', () => {
    const cache = new TabCache(createContext());
    const realHitArea = createRealHitArea();

    cache.getHitAreaRef(realHitArea);
    cache.getHitAreaRef(createPopupHitArea());

    expect(getStoredRefs(cache).hitAreaRef).toBe(realHitArea);
  });

  it('ignores a tab node two levels under an overflow-dropdown <li>', () => {
    const cache = new TabCache(createContext());

    cache.getRef(buildDivChain(document.body, 'ul', 'li', 'span', 'div'));

    expect(getStoredRefs(cache).ref).toBeUndefined();
  });

  it('keeps a real-strip hit area even when an <li> wraps the whole dock layout', () => {
    const cache = new TabCache(createContext());
    const outerListItem = buildChain(document.body, 'ul', 'li');
    const realHitArea = createRealHitArea(outerListItem);

    cache.getHitAreaRef(realHitArea);

    expect(getStoredRefs(cache).hitAreaRef).toBe(realHitArea);
  });
});
