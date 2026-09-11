import {
  CONTENT_ZOOM_AREA_ID_PATTERN,
  CONTENT_ZOOM_AREA_ID_PLACEHOLDER,
  CONTENT_ZOOM_COMMANDS,
  CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
  CONTENT_ZOOM_NAMED_AREA_RULE_TEMPLATE,
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
  CONTENT_ZOOM_STYLE_ELEMENT_ID,
  DEFAULT_ZOOM_FACTOR,
  getContentZoomCssVariable,
} from '@shared/models/content-zoom.model';
import { MAIN_CONTENT_ZOOM_AREA } from '@shared/models/web-view.model';
import { isValidContentZoomAreaId, isValidZoomFactor } from '@shared/utils/content-zoom.util';

const INDICATOR_ID = 'platform-content-zoom-indicator';
const INDICATOR_VISIBLE_MS = 1100;

/**
 * The rule that scales one zoom area: its own variable, else the default. The `main` area's rule
 * names both spellings of its marker — the empty value a view writes when it names no area, and the
 * id itself — so that a marker carrying an id no rule was generated for (an invalid id, or an area
 * ignored for nesting inside another) is left unscaled instead of quietly following `main`. A named
 * (non-`main`) area's rule comes from {@link CONTENT_ZOOM_NAMED_AREA_RULE_TEMPLATE}, the same
 * template the bootstrap's own runtime `ensureRule` substitutes into, so the two never spell a
 * named area's rule differently.
 */
function areaRule(areaId: string): string {
  if (areaId === MAIN_CONTENT_ZOOM_AREA) {
    const selector = `[${CONTENT_ZOOM_ROOT_ATTRIBUTE}=""],[${CONTENT_ZOOM_ROOT_ATTRIBUTE}="${MAIN_CONTENT_ZOOM_AREA}"]`;
    return `${selector}{zoom:var(${getContentZoomCssVariable(areaId)},var(${CONTENT_ZOOM_DEFAULT_CSS_VARIABLE},1))}`;
  }
  return CONTENT_ZOOM_NAMED_AREA_RULE_TEMPLATE.split(CONTENT_ZOOM_AREA_ID_PLACEHOLDER).join(areaId);
}

/**
 * The `<style>` element baked into a web view's head: the default and the pane's known levels (so
 * there is no 100 % → level flash), the base rule for the `main` area and a rule per known named
 * area. The bootstrap adds rules for named areas it discovers later. Levels arrive from stored
 * state and from the memory setting, so an id or a factor that no longer passes validation is
 * dropped here rather than written into the markup.
 */
export function getContentZoomStyleElement(
  nonce: string,
  defaultZoom: number,
  levels: { [areaId: string]: number },
): string {
  const areaIds = Object.keys(levels).filter(
    (areaId) => isValidContentZoomAreaId(areaId) && isValidZoomFactor(levels[areaId]),
  );
  const variables = [
    `${CONTENT_ZOOM_DEFAULT_CSS_VARIABLE}:${isValidZoomFactor(defaultZoom) ? defaultZoom : DEFAULT_ZOOM_FACTOR}`,
    ...areaIds.map((areaId) => `${getContentZoomCssVariable(areaId)}:${levels[areaId]}`),
  ].join(';');
  const rules = [
    areaRule(MAIN_CONTENT_ZOOM_AREA),
    ...areaIds
      .filter((areaId) => areaId !== MAIN_CONTENT_ZOOM_AREA)
      .map((areaId) => areaRule(areaId)),
  ].join(' ');
  return `<style nonce="${nonce}" id="${CONTENT_ZOOM_STYLE_ELEMENT_ID}">:root{${variables}} ${rules}</style>`;
}

/**
 * Escapes a `</` sequence so a value interpolated into {@link getContentZoomBootstrapScript}'s
 * source cannot close the `<script>` tag that source is injected into. The web view id is the only
 * free-form value interpolated there; every other interpolation in that script is a constant, a
 * validated area id, or a number.
 */
function escapeClosingTags(jsSourceLiteral: string): string {
  return jsSourceLiteral.replace(/<\//g, '<\\/');
}

/**
 * JavaScript run inside every non-URL web view (appended to the platform's import script). It
 * discovers the view's zoom areas, tracks the active one, turns Ctrl/⌘+`+`/`-`/`0` and Ctrl/⌘+wheel
 * into content-zoom actions for THIS web view and one of its areas, and provides the on-area
 * indicator. Bubble phase on purpose: a view that owns Ctrl+wheel for a sub-region (the Text
 * Collection grid's per-resource zoom) stops propagation in capture phase and this listener never
 * sees the event. A view without areas ignores the input.
 */
export function getContentZoomBootstrapScript(webViewId: string): string {
  const id = escapeClosingTags(JSON.stringify(webViewId));
  const attr = CONTENT_ZOOM_ROOT_ATTRIBUTE;
  return `
  (() => {
    const webViewId = ${id};
    const ATTR = '${attr}';
    const MAIN = '${MAIN_CONTENT_ZOOM_AREA}';
    const AREA_ID = new RegExp(${JSON.stringify(CONTENT_ZOOM_AREA_ID_PATTERN.source)});
    const NAMED_AREA_RULE_TEMPLATE = ${JSON.stringify(CONTENT_ZOOM_NAMED_AREA_RULE_TEMPLATE)};
    const AREA_ID_PLACEHOLDER = ${JSON.stringify(CONTENT_ZOOM_AREA_ID_PLACEHOLDER)};
    const bind = (name) => (typeof window[name] === 'function' ? window[name] : undefined);
    // Hot path: the shard binds in-process functions for this web view (like the state helpers) so a
    // wheel burst does not make a network round trip per tick; the commands remain for the tab menu,
    // macOS and extensions. Fall back to the command when the bound function is absent.
    const boundAdjust = bind('adjustContentZoomById');
    const boundReset = bind('resetContentZoomById');
    const boundReportAreas = bind('reportContentZoomAreasById');
    const boundReportActive = bind('reportContentZoomActiveAreaById');

    // window.papi may not exist yet (or ever, for a view loaded before PAPI's import script runs) -
    // every access goes through these so a missing papi never throws out of an event handler.
    const getPapi = () => (window.papi && typeof window.papi === 'object' ? window.papi : undefined);
    const warnPapi = (message) => {
      const papi = getPapi();
      if (papi && papi.logger && typeof papi.logger.warn === 'function') papi.logger.warn(message);
    };
    const warned = new Set();
    const warnOnce = (message) => {
      if (warned.has(message)) return;
      warned.add(message);
      warnPapi('Content zoom: ' + message);
    };

    const idOf = (element) => {
      const value = element.getAttribute(ATTR);
      return value ? value : MAIN;
    };
    // The area an element belongs to: its closest marked ancestor (itself included).
    const areaOf = (node) => {
      const element = node && node.nodeType === 1 ? node : node && node.parentElement;
      const marked = element && element.closest ? element.closest('[' + ATTR + ']') : undefined;
      return marked ? idOf(marked) : undefined;
    };

    let areas = [];
    let activeArea;
    const styleElement = () => document.getElementById('${CONTENT_ZOOM_STYLE_ELEMENT_ID}');
    // The main area's rule is always the style element's base rule; a named area's rule may already
    // be baked into the markup too (a pane reopening with a persisted per-area zoom level) - seed
    // those from the sheet before the first refresh so ensureRule below never inserts a second,
    // functionally-identical rule for one it did not itself insert. Only well-formed ids are
    // seeded, matching the rule that only an accepted area ever gets a rule of its own.
    const ruled = new Set([MAIN]);
    const seedRuled = () => {
      const element = styleElement();
      const sheet = element && element.sheet;
      if (!sheet) return;
      const prefix = '[' + ATTR + '="';
      Array.from(sheet.cssRules).forEach((rule) => {
        const text = rule.cssText || '';
        const start = text.indexOf(prefix);
        if (start === -1) return;
        const end = text.indexOf('"]', start);
        if (end === -1) return;
        const areaId = text.slice(start + prefix.length, end);
        if (AREA_ID.test(areaId)) ruled.add(areaId);
      });
    };
    const ensureRule = (areaId) => {
      if (ruled.has(areaId)) return;
      const element = styleElement();
      const sheet = element && element.sheet;
      if (!sheet) return;
      sheet.insertRule(NAMED_AREA_RULE_TEMPLATE.split(AREA_ID_PLACEHOLDER).join(areaId), sheet.cssRules.length);
      ruled.add(areaId);
    };
    const collectAreas = () => {
      const found = [];
      document.querySelectorAll('[' + ATTR + ']').forEach((element) => {
        const areaId = idOf(element);
        if (!AREA_ID.test(areaId)) { warnOnce('ignoring zoom area with invalid id "' + areaId + '"'); return; }
        if (element.parentElement && element.parentElement.closest('[' + ATTR + ']')) { warnOnce('ignoring nested zoom area "' + areaId + '"'); return; }
        if (found.indexOf(areaId) === -1) found.push(areaId);
      });
      return found;
    };
    const setActive = (areaId) => {
      if (!areaId || areaId === activeArea) return;
      activeArea = areaId;
      if (boundReportActive) boundReportActive(webViewId, areaId);
    };
    // A MutationObserver callback already runs as a microtask after its batch of synchronous DOM
    // changes, well before the next paint - refreshing straight from it (no rAF hop) is what lets the
    // parent clear a hidden whole-iframe fallback zoom before the view is ever shown at the wrong scale.
    let reported = false;
    const refresh = () => {
      const next = collectAreas();
      next.forEach(ensureRule);
      if (!reported || next.join('\\n') !== areas.join('\\n')) {
        areas = next;
        reported = true;
        if (boundReportAreas) boundReportAreas(webViewId, areas.slice());
      }
      if (!activeArea || areas.indexOf(activeArea) === -1) setActive(areas[0]);
    };
    const start = () => {
      seedRuled();
      refresh();
      new MutationObserver(refresh).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: [ATTR] });
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();

    // Capture phase: the active area must update even when a descendant stops propagation before
    // the bubble phase (the same rule the wheel listener below is deliberately the exception to).
    window.addEventListener('pointerdown', (e) => setActive(areaOf(e.target)), true);
    window.addEventListener('focusin', (e) => setActive(areaOf(e.target)), true);

    const targetFor = (node) => {
      if (areas.length === 0) return undefined;
      const hit = areaOf(node);
      return hit && areas.indexOf(hit) !== -1 ? hit : (activeArea || areas[0]);
    };
    const act = (command, areaId) => {
      try {
        if (command === '${CONTENT_ZOOM_COMMANDS.reset}' && boundReset) { boundReset(webViewId, areaId); return; }
        if (command === '${CONTENT_ZOOM_COMMANDS.in}' && boundAdjust) { boundAdjust(webViewId, 1, areaId); return; }
        if (command === '${CONTENT_ZOOM_COMMANDS.out}' && boundAdjust) { boundAdjust(webViewId, -1, areaId); return; }
        const papi = getPapi();
        if (!papi || !papi.commands || typeof papi.commands.sendCommand !== 'function') {
          warnPapi('Content zoom command ' + command + ' could not run: papi is unavailable');
          return;
        }
        papi.commands.sendCommand(command, webViewId, areaId).catch((e) => {
          warnPapi('Content zoom command ' + command + ' failed: ' + (e && e.message ? e.message : e));
        });
      } catch (e) {
        warnPapi('Content zoom command ' + command + ' threw: ' + (e && e.message ? e.message : e));
      }
    };
    const hasModifier = (e) => (e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey;

    window.addEventListener('keydown', (e) => {
      if (!hasModifier(e)) return;
      const areaId = targetFor(document.activeElement);
      if (!areaId) return;
      let command;
      if (e.key === '=' || e.key === '+' || e.code === 'NumpadAdd') command = '${CONTENT_ZOOM_COMMANDS.in}';
      else if (e.key === '-' || e.code === 'NumpadSubtract') command = '${CONTENT_ZOOM_COMMANDS.out}';
      else if (e.key === '0' || e.code === 'Numpad0') command = '${CONTENT_ZOOM_COMMANDS.reset}';
      if (!command) return;
      e.preventDefault();
      act(command, areaId);
    });

    // Same modifier rule as the chords: Ctrl or the meta key, and neither Shift nor Alt. Chromium
    // and the OS give Ctrl+Shift+wheel and Ctrl+Alt+wheel their own meanings, so those pass through.
    window.addEventListener('wheel', (e) => {
      if (!hasModifier(e)) return;
      const areaId = targetFor(e.target);
      if (!areaId) return;
      e.preventDefault();
      if (e.deltaY === 0) return;
      act(e.deltaY < 0 ? '${CONTENT_ZOOM_COMMANDS.in}' : '${CONTENT_ZOOM_COMMANDS.out}', areaId);
    }, { passive: false });

    // An area's own text direction, read off one of its marked elements (falling back to the
    // document's when the area currently has no elements) so a marker inside an otherwise-LTR
    // document (or vice versa) still anchors on its own inline-end, not the document's.
    const directionOf = (element) => {
      const style = window.getComputedStyle ? window.getComputedStyle(element) : undefined;
      return style && style.direction === 'rtl' ? 'rtl' : 'ltr';
    };
    // Top inline-end corner of the union of one area's elements, in viewport pixels: top-right for
    // an LTR area, top-left for an RTL one.
    const cornerOf = (areaId) => {
      let top = Infinity; let left = Infinity; let right = -Infinity; let anchor;
      document.querySelectorAll('[' + ATTR + ']').forEach((element) => {
        if (idOf(element) !== areaId) return;
        if (!anchor) anchor = element;
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) return;
        top = Math.min(top, rect.top); left = Math.min(left, rect.left); right = Math.max(right, rect.right);
      });
      const rtl = directionOf(anchor || document.documentElement) === 'rtl';
      if (top === Infinity) return rtl ? { top: 12, left: 16, rtl } : { top: 12, right: 16, rtl };
      const topOffset = Math.max(0, top) + 12;
      return rtl
        ? { top: topOffset, left: Math.max(0, left) + 16, rtl }
        : { top: topOffset, right: Math.max(0, window.innerWidth - right) + 16, rtl };
    };
    let hideTimer;
    const showIndicator = (areaId, text) => {
      let badge = document.getElementById('${INDICATOR_ID}');
      if (!badge) {
        badge = document.createElement('div');
        badge.id = '${INDICATOR_ID}';
        badge.setAttribute('role', 'status');
        badge.setAttribute('aria-live', 'polite');
        badge.style.cssText = 'position:fixed;z-index:2147483647;pointer-events:none;' +
          'padding:4px 10px;border-radius:6px;font:600 13px/1.4 system-ui,sans-serif;' +
          'background:var(--popover,#1c2321);color:var(--popover-foreground,#fff);' +
          'box-shadow:0 2px 8px rgba(0,0,0,.25);opacity:1';
        document.body.appendChild(badge);
      }
      const corner = cornerOf(areaId);
      badge.style.top = corner.top + 'px';
      if (corner.rtl) {
        badge.style.left = corner.left + 'px';
        badge.style.right = '';
      } else {
        badge.style.right = corner.right + 'px';
        badge.style.left = '';
      }
      badge.dataset.area = areaId;
      badge.textContent = text;
      // Reduced motion still hides the badge on schedule, as a hard cut instead of a fade (an
      // opacity-0 pointer-events:none box left in place would otherwise sit at the corner forever).
      // Computed fresh on every call so a badge element reused across shows picks up a live
      // preference change rather than the transition it was first created with.
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      badge.style.transition = reduce ? 'none' : 'opacity .25s ease';
      badge.style.opacity = '1';
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        badge.style.opacity = '0';
      }, ${INDICATOR_VISIBLE_MS});
    };
    window.__platformContentZoom = { showIndicator, get activeArea() { return activeArea; } };
  })();
  `;
}
