import {
  CONTENT_ZOOM_AREA_ID_PATTERN,
  CONTENT_ZOOM_AREA_ID_PLACEHOLDER,
  CONTENT_ZOOM_COMMANDS,
  CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
  CONTENT_ZOOM_MAIN_AREA_ATTRIBUTE_VALUES,
  CONTENT_ZOOM_NAMED_AREA_RULE_TEMPLATE,
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
  CONTENT_ZOOM_STYLE_ELEMENT_ID,
  CONTENT_ZOOM_UNNESTED_CLAUSE,
  DEFAULT_ZOOM_FACTOR,
  getContentZoomCssVariable,
  RESERVED_CONTENT_ZOOM_AREA_ID,
} from '@shared/models/content-zoom.model';
import { MAIN_CONTENT_ZOOM_AREA } from '@shared/models/web-view.model';
import { isValidContentZoomAreaId, isValidZoomFactor } from '@shared/utils/content-zoom.util';

const INDICATOR_ID = 'platform-content-zoom-indicator';
/** Id of the live region the indicator announces through, separate from the visible badge. */
const INDICATOR_STATUS_ID = 'platform-content-zoom-indicator-status';
const INDICATOR_VISIBLE_MS = 1100;
/**
 * Quiet time before the indicator's settled level reaches the live region: long enough that one
 * wheel gesture announces once, short enough to land well inside {@link INDICATOR_VISIBLE_MS}.
 */
const INDICATOR_ANNOUNCE_QUIET_MS = 500;

/**
 * The rule that scales one zoom area: its own variable, else the default. The `main` area's rule
 * names every spelling of its marker — {@link CONTENT_ZOOM_MAIN_AREA_ATTRIBUTE_VALUES}: the empty
 * value a view writes when it names no area, the id itself, and the `"true"` React serializes a
 * bare JSX prop to — so that a marker carrying an id no rule was generated for (an invalid id, or
 * one this pane has neither a remembered level for nor the bootstrap accepted at runtime) is left
 * unscaled instead of quietly following `main`. The list is shared with the bootstrap's `idOf`, so
 * a spelling the report calls `main` is always a spelling this rule scales. Every clause also
 * carries {@link CONTENT_ZOOM_UNNESTED_CLAUSE}, so a marker nested inside another marker matches no
 * rule at all — the same marker the runtime `collectAreas` refuses to report, keeping the CSS and
 * the report in agreement about which markers are areas. Without that clause a nested marker would
 * match whenever its id also has a rule (always true for `main`/the empty value, and true for any
 * named id that is also a legitimate area elsewhere in the view), and CSS `zoom` compounds, so it
 * would scale by the product of its own area's factor and its ancestor area's while the report
 * never reflected that level. A named (non-`main`) area's rule comes from
 * {@link CONTENT_ZOOM_NAMED_AREA_RULE_TEMPLATE}, the same template the bootstrap's own runtime
 * `ensureRule` substitutes into, so the two never spell a named area's rule differently.
 */
function areaRule(areaId: string): string {
  if (areaId === MAIN_CONTENT_ZOOM_AREA) {
    const selector = CONTENT_ZOOM_MAIN_AREA_ATTRIBUTE_VALUES.map(
      (value) => `[${CONTENT_ZOOM_ROOT_ATTRIBUTE}="${value}"]${CONTENT_ZOOM_UNNESTED_CLAUSE}`,
    ).join(',');
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
    const RESERVED_ID = ${JSON.stringify(RESERVED_CONTENT_ZOOM_AREA_ID)};
    // The reserved id is well-formed but names the pane-wide default variable, so an area of that
    // name would set the default for every other area instead of scaling itself.
    const isAreaId = (value) => AREA_ID.test(value) && value !== RESERVED_ID;
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

    // Every spelling that names the main area. React serialises a bare \`data-*\` JSX prop as the
    // string "true", so a view that marks its main area the documented way arrives here spelled
    // that way rather than with an empty value; the same list builds the main area's CSS rule, so
    // the report and the stylesheet always agree. An area genuinely called "true" is not available.
    const MAIN_AREA_VALUES = ${JSON.stringify(CONTENT_ZOOM_MAIN_AREA_ATTRIBUTE_VALUES)};
    const idOf = (element) => {
      const value = element.getAttribute(ATTR);
      return value === null || MAIN_AREA_VALUES.indexOf(value) !== -1 ? MAIN : value;
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
        if (isAreaId(areaId)) ruled.add(areaId);
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
        if (!isAreaId(areaId)) { warnOnce('ignoring zoom area with invalid id "' + areaId + '"'); return; }
        if (element.parentElement && element.parentElement.closest('[' + ATTR + ']')) { warnOnce('ignoring nested zoom area "' + areaId + '"'); return; }
        if (found.indexOf(areaId) === -1) found.push(areaId);
      });
      return found;
    };
    const setActive = (areaId) => {
      // Only an area this pane reported can become active: a click or focus inside a marker
      // collectAreas rejected (nested, or an ill-formed id) still resolves to that marker's id, and
      // an active area the parent has no record of is a silent no-op for every later action.
      if (!areaId || areaId === activeArea || areas.indexOf(areaId) === -1) return;
      if (!callBound(boundReportActive, 'reporting the active zoom area', areaId)) return;
      activeArea = areaId;
    };
    // A MutationObserver callback already runs as a microtask after its batch of synchronous DOM
    // changes, well before the next paint - refreshing straight from it (no rAF hop) is what lets the
    // parent clear a hidden whole-iframe fallback zoom before the view is ever shown at the wrong scale.
    let reported = false;
    const refresh = () => {
      const next = collectAreas();
      // Rules are ensured before the report: a rule for an area the parent has no record of reads
      // the pane-wide default variable, so it scales nothing on its own.
      next.forEach(ensureRule);
      if (!reported || next.join('\\n') !== areas.join('\\n')) {
        // The list counts as reported only once the parent has taken it, so a report that throws is
        // retried on the next mutation instead of leaving the pane unzoomable for its whole life.
        if (callBound(boundReportAreas, 'reporting the zoom areas', next.slice())) {
          areas = next;
          reported = true;
          syncWheelListener();
        }
      }
      if (!activeArea || areas.indexOf(activeArea) === -1) setActive(areas[0]);
    };
    // The badge and live region live in this document, so writing their text is itself a
    // childList mutation; a zoom step would otherwise pay for a second full-document scan.
    const isIndicatorRecord = (record) =>
      (badge && badge.contains(record.target)) || (liveRegion && liveRegion.contains(record.target));
    let observer;
    const start = () => {
      // Ahead of the observer, so the two nodes it appends are not themselves a mutation to scan.
      ensureIndicatorElements();
      seedRuled();
      // Observing before the first scan is what makes the retry above reachable: a throw out of that
      // scan then still leaves the view watching for the DOM change that tries again.
      observer = new MutationObserver((records) => {
        if (!records.every(isIndicatorRecord)) refresh();
      });
      observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: [ATTR] });
      refresh();
    };

    // Capture phase: the active area must update even when a descendant stops propagation before
    // the bubble phase (the same rule the wheel listener below is deliberately the exception to).
    // Every listener here is a named function so destroy() can take it off again.
    const onPointerDown = (e) => setActive(areaOf(e.target));
    const onFocusIn = (e) => setActive(areaOf(e.target));
    window.addEventListener('pointerdown', onPointerDown, true);
    window.addEventListener('focusin', onFocusIn, true);

    const targetFor = (node) => {
      if (areas.length === 0) return undefined;
      const hit = areaOf(node);
      return hit && areas.indexOf(hit) !== -1 ? hit : (activeArea || areas[0]);
    };
    // One bound helper is one call into the parent's realm, and it can throw (the parent reaches the
    // dock layout and a non-isolated emitter from there). The return value is what lets a caller
    // hold back its own bookkeeping until the parent has really taken the value.
    const callBound = (fn, what, value) => {
      if (!fn) return true;
      try {
        fn(webViewId, value);
        return true;
      } catch (e) {
        warnOnce(what + ' failed: ' + (e && e.message ? e.message : e));
        return false;
      }
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
    const hasModifier = (e) => (e.ctrlKey || e.metaKey) && !e.altKey;

    const onKeyDown = (e) => {
      if (!hasModifier(e)) return;
      const zoomIn = e.key === '=' || e.key === '+' || e.code === 'NumpadAdd';
      // On US and UK layouts the published + is Shift+=, and Chromium's own zoom in accepts
      // Ctrl+Shift+= for the same reason, so the zoom-in chord takes Shift. Zoom out and reset
      // reject it, leaving Ctrl+Shift+- and Ctrl+Shift+0 to whoever else wants them.
      if (e.shiftKey && !zoomIn) return;
      const areaId = targetFor(document.activeElement);
      if (!areaId) return;
      let command;
      if (zoomIn) command = '${CONTENT_ZOOM_COMMANDS.in}';
      else if (e.key === '-' || e.code === 'NumpadSubtract') command = '${CONTENT_ZOOM_COMMANDS.out}';
      else if (e.key === '0' || e.code === 'Numpad0') command = '${CONTENT_ZOOM_COMMANDS.reset}';
      if (!command) return;
      e.preventDefault();
      act(command, areaId);
    };
    window.addEventListener('keydown', onKeyDown);

    // Ctrl or the meta key, and neither Shift nor Alt: a shifted wheel is horizontal scroll on many
    // platforms, and Chromium and the OS give Ctrl+Alt+wheel its own meaning, so both pass through.
    const onWheel = (e) => {
      if (!hasModifier(e) || e.shiftKey) return;
      const areaId = targetFor(e.target);
      if (!areaId) return;
      e.preventDefault();
      if (e.deltaY === 0) return;
      act(e.deltaY < 0 ? '${CONTENT_ZOOM_COMMANDS.in}' : '${CONTENT_ZOOM_COMMANDS.out}', areaId);
    };
    // A non-passive listener is what lets this cancel the gesture, but it also means the compositor
    // consults the main thread for the first event of every scrolling sequence - a cost a pane with
    // no zoom area can never repay, since every gesture there ends in targetFor returning undefined.
    // So it is registered and removed on the 0 <-> n transition of the area list. It stays on the
    // window rather than moving to the marked roots, so a gesture outside every area still reaches
    // the fallback in targetFor.
    const WHEEL_OPTIONS = { passive: false };
    let wheelListening = false;
    const syncWheelListener = () => {
      const wanted = areas.length > 0;
      if (wanted === wheelListening) return;
      wheelListening = wanted;
      if (wanted) window.addEventListener('wheel', onWheel, WHEEL_OPTIONS);
      else window.removeEventListener('wheel', onWheel, WHEEL_OPTIONS);
    };

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
    let announceTimer;
    let badge;
    let liveRegion;
    // Both nodes exist, and the live region is empty, from the moment the view's DOM is ready: a
    // live region that arrives in the same task as its first text is not announced at all by
    // Chromium with NVDA or JAWS, so the region has to be in the accessibility tree before any zoom
    // writes into it. Idempotent, and called from showIndicator as well as from start(), so a view
    // that replaces the body's children gets the nodes back.
    const ensureIndicatorElements = () => {
      if (!document.body) return;
      if (!badge || !document.body.contains(badge)) {
        badge = document.createElement('div');
        badge.id = '${INDICATOR_ID}';
        // The visible badge is not the live region: its text is rewritten on every wheel notch.
        // It starts transparent at the fallback corner, so the first show places it rather than it
        // appearing at the flow position.
        badge.setAttribute('aria-hidden', 'true');
        badge.style.cssText = 'position:fixed;top:12px;right:16px;z-index:2147483647;pointer-events:none;' +
          'padding:4px 10px;border-radius:6px;font:600 13px/1.4 system-ui,sans-serif;' +
          'background:var(--popover,#1c2321);color:var(--popover-foreground,#fff);' +
          'box-shadow:0 2px 8px rgba(0,0,0,.25);opacity:0';
        document.body.appendChild(badge);
      }
      if (!liveRegion || !document.body.contains(liveRegion)) {
        liveRegion = document.createElement('div');
        liveRegion.id = '${INDICATOR_STATUS_ID}';
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');
        // Visually hidden rather than display:none or visibility:hidden, either of which would take
        // the region out of the accessibility tree along with its announcement.
        liveRegion.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;' +
          'clip:rect(0,0,0,0);white-space:nowrap';
        document.body.appendChild(liveRegion);
      }
    };
    const showIndicator = (areaId, text) => {
      ensureIndicatorElements();
      if (!badge) return;
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
      // The badge shows every step of a gesture; the live region only the value it settles on, so
      // one wheel sweep is one announcement rather than one per notch.
      if (announceTimer) clearTimeout(announceTimer);
      announceTimer = setTimeout(() => {
        announceTimer = undefined;
        if (liveRegion) liveRegion.textContent = text;
      }, ${INDICATOR_ANNOUNCE_QUIET_MS});
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        hideTimer = undefined;
        if (badge) badge.style.opacity = '0';
        // A faded badge is still reachable by a screen reader's browse cursor, so the level leaves
        // the accessibility tree with the fade while the region keeps its place in it.
        if (liveRegion) liveRegion.textContent = '';
      }, ${INDICATOR_VISIBLE_MS});
    };
    // Unwinds everything this bootstrap put outside its own closure, so a host that replaces the
    // pane's content (or a test that installs a second bootstrap) leaves no observer, listener or
    // node of the old one behind.
    const destroy = () => {
      document.removeEventListener('DOMContentLoaded', start);
      window.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('focusin', onFocusIn, true);
      window.removeEventListener('keydown', onKeyDown);
      if (wheelListening) { window.removeEventListener('wheel', onWheel, WHEEL_OPTIONS); wheelListening = false; }
      if (observer) { observer.disconnect(); observer = undefined; }
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = undefined; }
      if (announceTimer) { clearTimeout(announceTimer); announceTimer = undefined; }
      if (badge && badge.parentNode) badge.parentNode.removeChild(badge);
      if (liveRegion && liveRegion.parentNode) liveRegion.parentNode.removeChild(liveRegion);
      badge = undefined;
      liveRegion = undefined;
      if (window.__platformContentZoom === api) window.__platformContentZoom = undefined;
    };
    const api = { showIndicator, destroy, get activeArea() { return activeArea; } };
    window.__platformContentZoom = api;

    // Last in the IIFE on purpose: the scan start() runs reaches the parent, and a throw there must
    // not cost the view its listeners or its api. Everything start() touches is initialised by now.
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
  })();
  `;
}
